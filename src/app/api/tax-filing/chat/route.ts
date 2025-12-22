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
  createInitialState,
  getRequiredDocuments,
  LifeSituationFlags
} from '@/lib/tax-filing/conversation-engine'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

// System prompt for the tax filing assistant
const SYSTEM_PROMPT = `You are a friendly, expert Canadian tax filing assistant. Your job is to:

1. Extract ALL relevant data from user responses - be SMART about parsing natural language
2. VALIDATE everything - ensure data is COMPLETE and CORRECT before accepting it
3. Respond naturally and conversationally
4. Keep responses SHORT - 1-2 sentences max

=== CRITICAL VALIDATION RULES (DO NOT ACCEPT INVALID DATA) ===

DATES - Must be COMPLETE:
- "feb 1989" is INVALID - ask for the DAY: "I need the full date - what day in February 1989?"
- "March 15" is INVALID - need the year
- Only accept YYYY-MM-DD format internally (e.g., 1989-02-15)
- If date is incomplete, set extractedData to {} and ask for missing part

SIN - Must be exactly 9 digits:
- "519007686" is VALID - format as "519-007-686"
- "51900768" (8 digits) is INVALID - ask them to check
- Only store as XXX-XXX-XXX format

POSTAL CODE - Must be valid Canadian format:
- "M5V1A1" or "M5V 1A1" are VALID - store as "M5V 1A1"
- "12345" is INVALID - that's a US zip code

CURRENCY - Extract as numbers:
- "65k" = 65000
- "$65,000.00" = 65000
- "about 65 thousand" = 65000

NAMES - Must have BOTH parts for full name:
- "John Smith" = firstName: "John", lastName: "Smith"
- "John" alone is fine if we already have lastName

=== DISCOVERY PHASE (VERY IMPORTANT) ===

When the phase is "discovery", your job is to understand the user's COMPLETE tax situation.
Ask open-ended questions and extract LIFE SITUATION FLAGS:

- hasEmployment: Did they work for an employer? (T4)
- hasSelfEmployment: Freelance, contract, business income? (T2125)
- hasInvestments: Interest, dividends, capital gains? (T5, T3, T5008)
- hasRentalIncome: Rental property income?
- hasSpouse: Married or common-law?
- hasChildren: Children under 18, or in school?
- hasTuition: Post-secondary education? (T2202)
- hasChildcare: Daycare, camps, nanny expenses?
- hasMedicalExpenses: Out-of-pocket medical/dental?
- hasDonations: Charitable donations?
- hasRRSP: RRSP contributions?
- hasMovingExpenses: Moved 40km+ for work/school?
- hasHomeOffice: Work from home?
- isFirstTimeHomeBuyer: Bought first home?
- hasDisability: Disability tax credit eligible?
- isStudent: Full or part-time student?
- hasOtherIncome: EI, pension, social assistance, etc.?

From the discovery, build a picture of what documents they need.

=== HANDLING GENERAL TAX QUESTIONS (VERY IMPORTANT) ===

Users may ask general tax questions during the filing process. DO NOT get confused or try to extract data from questions!

DETECT QUESTIONS BY:
- Starts with "what", "how", "can I", "do I", "is it", "should I", "why"
- Contains "?" at the end
- Asking about rules, limits, eligibility, deadlines, etc.

WHEN USER ASKS A QUESTION:
1. ANSWER the question helpfully and accurately (you're a tax expert!)
2. Keep the answer concise (2-3 sentences max)
3. Then GENTLY redirect back to where you were in the filing process
4. Set "isQuestion": true in your response
5. Do NOT extract any data from questions

Common questions to handle:
- "What's the RRSP contribution limit?" → Answer: 18% of previous year's income, max $31,560 for 2024
- "Can I claim my dog/pet?" → Answer: Generally no, pets aren't tax deductible in Canada
- "What's the deadline?" → Answer: April 30, 2025 for most people (June 15 if self-employed, but payment still due April 30)
- "How much can I claim for home office?" → Answer: $2/day simplified method (max $500) or detailed method with T2200
- "What medical expenses qualify?" → Answer: Prescriptions, dental, vision, travel for medical care, etc.

=== RESPONSE FORMAT ===
{
  "extractedData": {
    "fieldName": "validatedValue"
  },
  "lifeSituationFlags": {
    "hasEmployment": true,
    "hasSelfEmployment": false,
    ...
  },
  "message": "Your response",
  "confidence": "high" | "medium" | "low",
  "validationIssue": "Optional - explain what's wrong with their input",
  "isQuestion": false
}

=== EXAMPLES ===

User: "What's the RRSP limit for 2024?"
{
  "extractedData": {},
  "message": "The 2024 RRSP contribution limit is 18% of your 2023 earned income, up to a maximum of $31,560. Your personal limit is on your Notice of Assessment. Now, back to your return - did you contribute to an RRSP this year?",
  "confidence": "high",
  "isQuestion": true
}

User: "Can I claim my cat as a dependent?"
{
  "extractedData": {},
  "message": "Ha! Unfortunately pets don't qualify as dependents for tax purposes in Canada - only humans count. Speaking of dependents, do you have any children or other family members you support?",
  "confidence": "high",
  "isQuestion": true
}

User: "What's the deadline to file?"
{
  "extractedData": {},
  "message": "The deadline is April 30, 2025 for most people. If you're self-employed, you have until June 15 but any taxes owing are still due April 30. Let's keep going - where were we?",
  "confidence": "high",
  "isQuestion": true
}

User: "feb 1989"
{
  "extractedData": {},
  "message": "I need the complete date - what day in February 1989 were you born?",
  "confidence": "low",
  "validationIssue": "Date missing day"
}

User: "I'm a software developer, married with 2 kids, I work from home"
{
  "extractedData": {},
  "lifeSituationFlags": {
    "hasEmployment": true,
    "hasSpouse": true,
    "hasChildren": true,
    "hasHomeOffice": true
  },
  "message": "Great! As a software developer working from home with a spouse and 2 kids, you'll likely have home office expenses to claim and may be eligible for childcare deductions. Do you also have any investments, RRSP contributions, or medical expenses?",
  "confidence": "high"
}

User: "I made 85k at Google, got married last year, contribute to RRSP"
{
  "extractedData": { "employerName": "Google", "employmentIncome": 85000 },
  "lifeSituationFlags": {
    "hasEmployment": true,
    "hasSpouse": true,
    "hasRRSP": true
  },
  "message": "Got it! Working at Google with $85,000 income, newly married, and contributing to RRSP. What about investments, medical expenses, or charitable donations?",
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
  // Discovery phase - stay here until complete
  if (!flags.discoveryComplete) {
    // Check if we have enough info to move on
    const hasAnyIncomeFlag = flags.hasEmployment || flags.hasSelfEmployment || flags.hasInvestments || flags.hasRentalIncome
    const hasAskedAboutDeductions = flags.hasRRSP !== undefined || flags.hasMedicalExpenses !== undefined

    // If user already gave their name during discovery, we can move on
    if (data.firstName && data.lastName && hasAnyIncomeFlag) {
      // Mark discovery as complete and move to personal info (skip name since we have it)
      return { phase: 'personal_info', subStep: 1 } // Go to SIN
    }

    // If we have some flags but no name yet, ask for name
    if (hasAnyIncomeFlag && hasAskedAboutDeductions) {
      return { phase: 'discovery', subStep: 2 } // Ask for name to transition
    }

    // Still in discovery - continue based on subStep
    return { phase: 'discovery', subStep: 1 }
  }

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
  lifeSituationFlags?: Partial<ConversationState['flags']>
  message: string
  confidence: 'high' | 'medium' | 'low'
  validationIssue?: string
  isQuestion?: boolean  // True if user asked a general tax question
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

    // Build the context for the AI - different based on phase
    const missingFields = getMissingFields(extractedData)
    const isDiscoveryPhase = conversationState.phase === 'discovery'

    let contextPrompt: string
    if (isDiscoveryPhase) {
      contextPrompt = `
CURRENT PHASE: DISCOVERY (Understanding user's tax situation)
- Current flags: ${JSON.stringify(conversationState.flags)}

USER'S MESSAGE: "${message}"

YOUR TASK IN DISCOVERY PHASE:
1. Extract LIFE SITUATION FLAGS from what they share (hasEmployment, hasSpouse, hasChildren, hasRRSP, etc.)
2. Ask follow-up questions to understand their complete tax picture
3. After 2-3 exchanges, you should have enough info - set discoveryComplete: true in lifeSituationFlags
4. Then transition to asking for specific personal details

CRITICAL: In discovery phase, focus on FLAGS not data fields. Extract:
- Income types: hasEmployment (T4), hasSelfEmployment, hasInvestments, hasRentalIncome
- Family: hasSpouse, hasChildren, hasDependents
- Deductions: hasRRSP, hasChildcare, hasMedicalExpenses, hasDonations, hasHomeOffice
- Special: isStudent, isFirstTimeHomeBuyer, hasMovingExpenses

If they already shared a lot, you can extract data AND set discoveryComplete: true to move on.`
    } else {
      contextPrompt = `
CURRENT PHASE: ${conversationState.phase}
- Data collected so far: ${JSON.stringify(extractedData)}
- Life situation flags: ${JSON.stringify(conversationState.flags)}
- Missing fields we still need: ${missingFields.slice(0, 5).join(', ')}

USER'S MESSAGE: "${message}"

INSTRUCTIONS:
1. VALIDATE the input - dates need day/month/year, SIN needs 9 digits, etc.
2. If invalid, return empty extractedData and ask for correction
3. If valid, extract ALL data you can
4. Be smart: "John Smith" = firstName + lastName, "Toronto" = city + province (ON), etc.
5. After extracting, ask about the NEXT missing field we need

Remember: Keep your response SHORT. Acknowledge what you extracted and ask for the next piece of info.`
    }


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

    // If user asked a general question, don't change state - just answer and stay where we are
    if (aiResponse.isQuestion) {
      // Get required documents based on current flags (no change)
      const requiredDocuments = getRequiredDocuments(conversationState.flags as LifeSituationFlags)

      return Response.json({
        message: aiResponse.message,
        extractedData: {},
        fieldsUpdated: [],
        newState: conversationState, // Keep the same state!
        allExtractedData: extractedData,
        confidence: aiResponse.confidence,
        isQuestion: true,
        requiredDocuments,
        lifeSituationFlags: conversationState.flags
      })
    }

    // Process extracted data and update state
    const newExtractedData = { ...extractedData, ...aiResponse.extractedData }

    // Merge AI-provided life situation flags with existing flags
    let newFlags = { ...conversationState.flags }
    if (aiResponse.lifeSituationFlags) {
      newFlags = { ...newFlags, ...aiResponse.lifeSituationFlags }
    }
    // Also update flags based on message parsing
    newFlags = updateFlags(newFlags, aiResponse.extractedData, message)

    // Determine next phase using smart logic based on what data we have
    const next = findNextPhase(newExtractedData, newFlags)
    const nextState: ConversationState = {
      phase: next.phase,
      subStep: next.subStep,
      waitingFor: QUESTION_FLOW.find(q => q.phase === next.phase && q.subStep === next.subStep)?.waitingFor || null,
      collectedData: newExtractedData,
      flags: newFlags
    }

    // Get required documents based on current flags
    const requiredDocuments = getRequiredDocuments(newFlags as LifeSituationFlags)

    // Return the response
    return Response.json({
      message: aiResponse.message,
      extractedData: aiResponse.extractedData,
      fieldsUpdated: Object.keys(aiResponse.extractedData || {}),
      newState: nextState,
      allExtractedData: newExtractedData,
      confidence: aiResponse.confidence,
      validationIssue: aiResponse.validationIssue,
      requiredDocuments,
      lifeSituationFlags: newFlags
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
  if (lowerMessage.includes('t4') || lowerMessage.includes('employed') || lowerMessage.includes('employer') ||
      lowerMessage.includes('work at') || lowerMessage.includes('job') || lowerMessage.includes('company')) {
    if (isYes || extractedData.employerName || extractedData.employmentIncome) {
      newFlags.hasEmployment = true
    }
  }
  if (lowerMessage.includes('employment') && isNo) {
    newFlags.hasEmployment = false
  }

  // Self-employment flag
  if (lowerMessage.includes('self') || lowerMessage.includes('freelance') || lowerMessage.includes('business') ||
      lowerMessage.includes('contractor') || lowerMessage.includes('consulting') || lowerMessage.includes('own business')) {
    if (isYes || extractedData.businessName || extractedData.businessIncome) {
      newFlags.hasSelfEmployment = true
    }
  }
  if ((lowerMessage.includes('self-employ') || lowerMessage.includes('freelance')) && isNo) {
    newFlags.hasSelfEmployment = false
  }

  // Investment flag
  if (lowerMessage.includes('invest') || lowerMessage.includes('interest') || lowerMessage.includes('dividend') ||
      lowerMessage.includes('stock') || lowerMessage.includes('tfsa') || lowerMessage.includes('gic')) {
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
  if (lowerMessage.includes('medical') || lowerMessage.includes('dental') || lowerMessage.includes('prescription') ||
      lowerMessage.includes('health') || lowerMessage.includes('doctor')) {
    if (isYes || extractedData.medicalExpenses) {
      newFlags.hasMedicalExpenses = true
    }
    if (isNo) {
      newFlags.hasMedicalExpenses = false
    }
  }

  // Donations flag
  if (lowerMessage.includes('donat') || lowerMessage.includes('charit') || lowerMessage.includes('give to')) {
    if (isYes || extractedData.donations) {
      newFlags.hasDonations = true
    }
    if (isNo) {
      newFlags.hasDonations = false
    }
  }

  // Children flag
  if (lowerMessage.includes('kid') || lowerMessage.includes('child') || lowerMessage.includes('son') ||
      lowerMessage.includes('daughter') || lowerMessage.includes('dependent')) {
    newFlags.hasChildren = true
  }

  // Spouse/married flag
  if (lowerMessage.includes('married') || lowerMessage.includes('wife') || lowerMessage.includes('husband') ||
      lowerMessage.includes('spouse') || lowerMessage.includes('partner') || lowerMessage.includes('common-law')) {
    newFlags.hasSpouse = true
  }
  if (lowerMessage.includes('single') || lowerMessage.includes('not married')) {
    newFlags.hasSpouse = false
  }

  // Home office flag
  if (lowerMessage.includes('work from home') || lowerMessage.includes('home office') || lowerMessage.includes('wfh') ||
      lowerMessage.includes('remote work')) {
    newFlags.hasHomeOffice = true
  }

  // Childcare flag
  if (lowerMessage.includes('daycare') || lowerMessage.includes('childcare') || lowerMessage.includes('nanny') ||
      lowerMessage.includes('summer camp') || lowerMessage.includes('babysit')) {
    newFlags.hasChildcare = true
  }

  // Student flag
  if (lowerMessage.includes('student') || lowerMessage.includes('university') || lowerMessage.includes('college') ||
      lowerMessage.includes('school') || lowerMessage.includes('tuition')) {
    newFlags.isStudent = true
    newFlags.hasTuition = true
  }

  // Rental income flag
  if (lowerMessage.includes('rental') || lowerMessage.includes('rent out') || lowerMessage.includes('landlord') ||
      lowerMessage.includes('tenant') || lowerMessage.includes('investment property')) {
    newFlags.hasRentalIncome = true
  }

  // First time home buyer
  if (lowerMessage.includes('first home') || lowerMessage.includes('first house') || lowerMessage.includes('bought a home') ||
      lowerMessage.includes('bought a house') || lowerMessage.includes('first-time buyer')) {
    newFlags.isFirstTimeHomeBuyer = true
  }

  // Moving expenses
  if (lowerMessage.includes('moved') || lowerMessage.includes('moving') || lowerMessage.includes('relocation') ||
      lowerMessage.includes('relocated')) {
    newFlags.hasMovingExpenses = true
  }

  return newFlags
}

export const runtime = 'nodejs'
export const maxDuration = 30
