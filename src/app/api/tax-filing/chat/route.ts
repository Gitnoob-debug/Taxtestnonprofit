/**
 * Tax Filing Conversational API
 * Handles AI-driven conversation for tax filing with data extraction
 */

import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'
import {
  ConversationState,
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

1. Extract specific data from user responses (names, numbers, dates, etc.)
2. Respond naturally and conversationally
3. Ask the next question in the sequence
4. Keep responses SHORT - 1-2 sentences max for acknowledgment, then the next question

CRITICAL RULES:
- ALWAYS extract the requested data from the user's message
- Format dates as YYYY-MM-DD
- Format SIN as XXX-XXX-XXX (with dashes)
- Format currency as numbers only (no $ or commas)
- Recognize province names and abbreviations
- Be encouraging and friendly but BRIEF
- If the user's response is unclear, ask for clarification

You will receive context about what data to extract and what question to ask next.

RESPONSE FORMAT:
Always respond with valid JSON in this exact format:
{
  "extractedData": {
    "fieldName": "extracted value"
  },
  "message": "Your conversational response including the next question",
  "confidence": "high" | "medium" | "low"
}

Example - if waiting for firstName and user says "I'm John":
{
  "extractedData": { "firstName": "John" },
  "message": "Nice to meet you, John! And your last name?",
  "confidence": "high"
}

Example - if waiting for province and user says "I live in Toronto":
{
  "extractedData": { "province": "ON" },
  "message": "Ontario, great! What's your mailing address? Just the street address is fine.",
  "confidence": "high"
}

Example - if waiting for employmentIncome and user says "about 65 thousand":
{
  "extractedData": { "employmentIncome": 65000 },
  "message": "$65,000 - got it! And Box 22, the income tax deducted?",
  "confidence": "high"
}`

interface ChatRequest {
  message: string
  conversationState: ConversationState
  conversationHistory: ConversationMessage[]
  extractedData: Partial<ExtractedData>
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
    const contextPrompt = `
CURRENT CONTEXT:
- Waiting for: ${currentQuestion.waitingFor}
- Extraction hints: ${currentQuestion.extractionHints.join(', ')}
- Current phase: ${conversationState.phase}
- Data collected so far: ${JSON.stringify(extractedData)}

USER'S MESSAGE: "${message}"

NEXT QUESTION TO ASK (if data is extracted successfully):
${nextQuestionNode ? formatQuestion(nextQuestionNode.question, extractedData) : "You've completed the conversation! Summarize what was collected and ask if everything looks correct."}

Extract the "${currentQuestion.waitingFor}" field from the user's message and respond conversationally.
Remember: Keep your response SHORT. Just acknowledge what they said and ask the next question.`

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

    // Determine next phase
    let nextState: ConversationState
    if (Object.keys(aiResponse.extractedData).length > 0) {
      const next = currentQuestion.nextPhase(newExtractedData as ExtractedData, newFlags)
      nextState = {
        phase: next.phase,
        subStep: next.subStep,
        waitingFor: QUESTION_FLOW.find(q => q.phase === next.phase && q.subStep === next.subStep)?.waitingFor || null,
        collectedData: newExtractedData,
        flags: newFlags
      }
    } else {
      // No data extracted, stay on same question
      nextState = {
        ...conversationState,
        collectedData: newExtractedData,
        flags: newFlags
      }
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
