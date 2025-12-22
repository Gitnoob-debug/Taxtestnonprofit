/**
 * Tax Filing Conversational API
 * Handles AI-driven conversation for tax filing with data extraction
 */

import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'
import {
  ConversationState,
  ConversationPhase,
  ExtractedData,
  ConversationMessage,
  getCurrentQuestion,
  formatQuestion,
  QUESTION_FLOW,
  PROVINCE_MAP,
  MARITAL_STATUS_MAP,
  createInitialState
} from '@/lib/tax-filing/conversation-engine'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

// System prompt for the tax filing assistant
const SYSTEM_PROMPT = `You are a friendly, conversational Canadian tax filing assistant. Your job is to:

1. Extract ALL relevant data from user responses - be smart about parsing natural language
2. Respond naturally and conversationally
3. Skip questions for data you've already collected
4. Keep responses SHORT - 1-2 sentences max

CRITICAL INTELLIGENCE RULES:
- EXTRACT EVERYTHING you can from each response
- If user says "John Smith" - extract BOTH firstName: "John" AND lastName: "Smith"
- If user says "I'm 45 and married" - extract dateOfBirth (estimate year) AND maritalStatus
- If user says "I live at 123 Main St, Toronto ON M5V 1A1" - extract street, city, province, AND postalCode
- If user mentions their job and salary together - extract employerName AND employmentIncome
- If user says "I made about $65k at RBC" - extract employerName: "RBC" AND employmentIncome: 65000
- Don't be stupid - understand natural language and extract multiple fields at once
- Format dates as YYYY-MM-DD
- Format SIN as XXX-XXX-XXX (with dashes)
- Format currency as numbers only (no $ or commas)
- Recognize province names AND cities (Toronto=ON, Vancouver=BC, Calgary=AB, etc.)

RESPONSE FORMAT:
Always respond with valid JSON in this exact format:
{
  "extractedData": {
    "fieldName1": "value1",
    "fieldName2": "value2"
  },
  "message": "Your conversational response with the NEXT question for data you don't have yet",
  "confidence": "high" | "medium" | "low"
}

AVAILABLE FIELDS TO EXTRACT:
- firstName, lastName (personal)
- dateOfBirth (YYYY-MM-DD), sin (XXX-XXX-XXX)
- maritalStatus (single, married, common-law, divorced, separated, widowed)
- street, city, province (2-letter code), postalCode
- employerName, employmentIncome, taxDeducted, cppContributions, eiPremiums
- businessName, businessIncome, businessExpenses
- interestIncome, dividendIncome, capitalGains
- rrspContribution, rrspLimit
- childcareExpenses, medicalExpenses, donations

Example - if user says "I'm John Smith":
{
  "extractedData": { "firstName": "John", "lastName": "Smith" },
  "message": "Nice to meet you, John! What's your date of birth?",
  "confidence": "high"
}

Example - if user says "I work at TD Bank making 75k":
{
  "extractedData": { "employerName": "TD Bank", "employmentIncome": 75000 },
  "message": "Got it - TD Bank at $75,000. How much tax was deducted (Box 22 on your T4)?",
  "confidence": "high"
}

Example - if user says "I'm married, 2 kids, live in Vancouver":
{
  "extractedData": { "maritalStatus": "married", "province": "BC", "city": "Vancouver" },
  "message": "Perfect! What's your street address in Vancouver?",
  "confidence": "high"
}`

interface ChatRequest {
  message: string
  conversationState: ConversationState
  conversationHistory: ConversationMessage[]
  extractedData: Partial<ExtractedData>
}

// Get missing fields in priority order
function getMissingFields(data: Partial<ExtractedData>): string[] {
  const priorityFields = [
    // Personal (required)
    'firstName', 'lastName', 'sin', 'dateOfBirth', 'province', 'street', 'city', 'postalCode', 'maritalStatus',
    // Employment (if applicable)
    'employerName', 'employmentIncome', 'taxDeducted', 'cppDeducted', 'eiDeducted',
    // Self-employment (if applicable)
    'businessName', 'businessIncome', 'businessExpenses',
    // Investments (if applicable)
    'interestIncome', 'dividendIncome', 'capitalGains',
    // Deductions
    'rrspContribution',
    // Credits
    'medicalExpenses', 'donations'
  ]

  return priorityFields.filter(field => {
    const value = data[field as keyof ExtractedData]
    return value === undefined || value === null || value === ''
  })
}

// Find the next appropriate phase based on collected data
function findNextPhase(data: Partial<ExtractedData>, flags: ConversationState['flags']): { phase: ConversationPhase; subStep: number } {
  // Personal info incomplete?
  if (!data.firstName || !data.lastName) return { phase: 'personal_info', subStep: 0 }
  if (!data.sin) return { phase: 'personal_info', subStep: 1 }
  if (!data.dateOfBirth) return { phase: 'personal_info', subStep: 2 }
  if (!data.province) return { phase: 'personal_info', subStep: 3 }
  if (!data.street) return { phase: 'personal_info', subStep: 4 }
  if (!data.city) return { phase: 'personal_info', subStep: 5 }
  if (!data.postalCode) return { phase: 'personal_info', subStep: 6 }
  if (!data.maritalStatus) return { phase: 'personal_info', subStep: 7 }

  // Spouse info if married
  if ((data.maritalStatus === 'married' || data.maritalStatus === 'common-law') && !data.spouseFirstName) {
    return { phase: 'personal_info', subStep: 8 }
  }

  // Employment status - need to determine if they have employment
  if (flags.hasEmployment === false && flags.hasSelfEmployment === false && flags.hasInvestments === false) {
    // Haven't asked about income yet
    return { phase: 'employment_status', subStep: 0 }
  }

  // T4 income if they have employment
  if (flags.hasEmployment && !data.employmentIncome) {
    if (!data.employerName) return { phase: 'income_t4', subStep: 0 }
    return { phase: 'income_t4', subStep: 1 }
  }
  if (flags.hasEmployment && data.employmentIncome && !data.taxDeducted) {
    return { phase: 'income_t4', subStep: 2 }
  }

  // Self-employment
  if (flags.hasSelfEmployment && !data.businessIncome) {
    if (!data.businessName) return { phase: 'income_self_employed', subStep: 0 }
    return { phase: 'income_self_employed', subStep: 1 }
  }

  // Investments
  if (flags.hasInvestments && data.interestIncome === undefined) {
    return { phase: 'income_investment', subStep: 0 }
  }

  // RRSP
  if (flags.hasRRSP && !data.rrspContribution) {
    return { phase: 'deductions_rrsp', subStep: 1 }
  }

  // Medical
  if (flags.hasMedicalExpenses && !data.medicalExpenses) {
    return { phase: 'credits', subStep: 1 }
  }

  // Donations
  if (flags.hasDonations && !data.donations) {
    return { phase: 'credits', subStep: 3 }
  }

  // All collected - go to review
  return { phase: 'review', subStep: 0 }
}

interface AIResponse {
  extractedData: Partial<ExtractedData>
  message: string
  confidence: 'high' | 'medium' | 'low'
}

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return Response.json({ error: 'AI service not configured' }, { status: 503 })
  }

  try {
    const body: ChatRequest = await request.json()
    const { message, conversationState, conversationHistory, extractedData } = body

    // Get current question context
    const currentQuestion = getCurrentQuestion(conversationState)
    if (!currentQuestion) {
      return Response.json({
        error: 'Invalid conversation state'
      }, { status: 400 })
    }

    // Find next question for context
    const nextQuestionNode = QUESTION_FLOW.find(
      q => q.phase === currentQuestion.nextPhase(extractedData as ExtractedData, conversationState.flags).phase &&
           q.subStep === currentQuestion.nextPhase(extractedData as ExtractedData, conversationState.flags).subStep
    )

    // Build the context for the AI
    const missingFields = getMissingFields(extractedData)
    const contextPrompt = `
CURRENT CONTEXT:
- Current phase: ${conversationState.phase}
- Data collected so far: ${JSON.stringify(extractedData)}
- Missing fields we still need: ${missingFields.slice(0, 5).join(', ')}

USER'S MESSAGE: "${message}"

INSTRUCTIONS:
1. Extract ALL data you can from the user's message (names, numbers, dates, locations - everything)
2. Be smart: "John Smith" = firstName + lastName, "Toronto" = city + province (ON), etc.
3. After extracting, ask about the NEXT missing field we need
4. Priority order: personal info first, then income, then deductions, then credits

Remember: Keep your response SHORT. Acknowledge what you extracted and ask for the next piece of info.`

    // Build messages for the API
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-6).map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: contextPrompt }
    ]

    // Call OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://taxradar.ca',
        'X-Title': 'Tax Radar Filing Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages,
        max_tokens: 500,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[TAX-FILING-CHAT] OpenRouter error:', error)
      return Response.json({ error: 'AI service error' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    // Parse the AI response
    let aiResponse: AIResponse
    try {
      aiResponse = JSON.parse(content)
    } catch (e) {
      console.error('[TAX-FILING-CHAT] Failed to parse AI response:', content)
      // Fallback response
      aiResponse = {
        extractedData: {},
        message: "I didn't quite catch that. Could you please repeat?",
        confidence: 'low'
      }
    }

    // Process extracted data and update state
    const newExtractedData = { ...extractedData, ...aiResponse.extractedData }
    const newFlags = updateFlags(conversationState.flags, aiResponse.extractedData, message)

    // Determine next phase using smart logic based on what data we have
    const next = findNextPhase(newExtractedData, newFlags)
    const nextState: ConversationState = {
      phase: next.phase,
      subStep: next.subStep,
      waitingFor: QUESTION_FLOW.find(q => q.phase === next.phase && q.subStep === next.subStep)?.waitingFor || null,
      collectedData: newExtractedData,
      flags: newFlags
    }

    // Return the response
    return Response.json({
      message: aiResponse.message,
      extractedData: aiResponse.extractedData,
      fieldsUpdated: Object.keys(aiResponse.extractedData),
      newState: nextState,
      allExtractedData: newExtractedData,
      confidence: aiResponse.confidence
    })

  } catch (error) {
    console.error('[TAX-FILING-CHAT] Error:', error)
    return Response.json({
      error: 'Failed to process message',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Update flags based on extracted data and user responses
function updateFlags(
  currentFlags: ConversationState['flags'],
  extractedData: Partial<ExtractedData>,
  userMessage: string
): ConversationState['flags'] {
  const newFlags = { ...currentFlags }
  const lowerMessage = userMessage.toLowerCase()

  // Check for yes/no responses
  const isYes = /\b(yes|yeah|yep|yup|sure|correct|right|i do|i did|i have|i had)\b/i.test(lowerMessage)
  const isNo = /\b(no|nope|nah|none|didn't|don't|haven't|i don't|i didn't|zero|0)\b/i.test(lowerMessage)

  // Update flags based on what was asked
  if (extractedData.maritalStatus) {
    newFlags.hasSpouse = extractedData.maritalStatus === 'married' || extractedData.maritalStatus === 'common-law'
  }

  // Employment flag
  if (lowerMessage.includes('t4') || lowerMessage.includes('employed') || lowerMessage.includes('employer')) {
    if (isYes || extractedData.employerName || extractedData.employmentIncome) {
      newFlags.hasEmployment = true
    }
  }
  if (lowerMessage.includes('employment') && isNo) {
    newFlags.hasEmployment = false
  }

  // Self-employment flag
  if (lowerMessage.includes('self') || lowerMessage.includes('freelance') || lowerMessage.includes('business') || lowerMessage.includes('contractor')) {
    if (isYes || extractedData.businessName || extractedData.businessIncome) {
      newFlags.hasSelfEmployment = true
    }
  }
  if ((lowerMessage.includes('self-employ') || lowerMessage.includes('freelance')) && isNo) {
    newFlags.hasSelfEmployment = false
  }

  // Investment flag
  if (lowerMessage.includes('invest') || lowerMessage.includes('interest') || lowerMessage.includes('dividend') || lowerMessage.includes('stock')) {
    if (isYes || extractedData.interestIncome || extractedData.dividendIncome || extractedData.capitalGains) {
      newFlags.hasInvestments = true
    }
  }
  if ((lowerMessage.includes('invest') || lowerMessage.includes('interest')) && isNo) {
    newFlags.hasInvestments = false
  }

  // RRSP flag
  if (lowerMessage.includes('rrsp')) {
    if (isYes || extractedData.rrspContribution) {
      newFlags.hasRRSP = true
    }
    if (isNo) {
      newFlags.hasRRSP = false
    }
  }

  // Medical expenses flag
  if (lowerMessage.includes('medical') || lowerMessage.includes('dental') || lowerMessage.includes('prescription')) {
    if (isYes || extractedData.medicalExpenses) {
      newFlags.hasMedicalExpenses = true
    }
    if (isNo) {
      newFlags.hasMedicalExpenses = false
    }
  }

  // Donations flag
  if (lowerMessage.includes('donat') || lowerMessage.includes('charit')) {
    if (isYes || extractedData.donations) {
      newFlags.hasDonations = true
    }
    if (isNo) {
      newFlags.hasDonations = false
    }
  }

  return newFlags
}

export const runtime = 'nodejs'
export const maxDuration = 30
