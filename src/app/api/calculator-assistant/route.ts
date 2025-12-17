import { NextRequest, NextResponse } from 'next/server'

const PROVINCE_NAMES: Record<string, string> = {
  'ON': 'Ontario',
  'BC': 'British Columbia',
  'AB': 'Alberta',
  'QC': 'Quebec',
  'MB': 'Manitoba',
  'SK': 'Saskatchewan',
  'NS': 'Nova Scotia',
  'NB': 'New Brunswick',
  'NL': 'Newfoundland and Labrador',
  'PE': 'Prince Edward Island',
  'NT': 'Northwest Territories',
  'NU': 'Nunavut',
  'YT': 'Yukon',
}

interface CalculatorField {
  name: string
  label: string
  type: 'number' | 'select' | 'text'
  options?: { value: string; label: string }[]
  currentValue?: string | number
}

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  message: string
  calculatorType: string
  fields: CalculatorField[]
  conversationHistory?: ConversationMessage[]
}

// Build a dynamic system prompt based on the calculator type and fields
function buildSystemPrompt(calculatorType: string, fields: CalculatorField[]): string {
  const fieldDescriptions = fields.map(f => {
    let desc = `- ${f.name} (${f.label}): ${f.type}`
    if (f.type === 'select' && f.options) {
      desc += ` - options: ${f.options.map(o => `${o.value}="${o.label}"`).join(', ')}`
    }
    if (f.currentValue !== undefined && f.currentValue !== '') {
      desc += ` [current: ${f.currentValue}]`
    }
    return desc
  }).join('\n')

  const calculatorDescriptions: Record<string, string> = {
    'tax-calculator': 'Canadian Income Tax Calculator - calculates federal and provincial income tax, CPP, EI, and take-home pay',
    'rrsp-calculator': 'RRSP Contribution Calculator - calculates RRSP contribution room, tax savings, and refund',
    'tfsa-room-calculator': 'TFSA Room Calculator - calculates available TFSA contribution room based on age/residency',
    'capital-gains-calculator': 'Capital Gains Tax Calculator - calculates taxable capital gains and tax owing',
    'fhsa-calculator': 'FHSA Calculator - First Home Savings Account contribution room and benefits',
    'rrsp-vs-tfsa': 'RRSP vs TFSA Comparison - helps decide between RRSP and TFSA contributions',
  }

  const calcDesc = calculatorDescriptions[calculatorType] || 'Tax Calculator'

  return `You are a helpful Canadian tax assistant helping users fill in the ${calcDesc}.

Available fields to update:
${fieldDescriptions}

Your job is to:
1. Understand what the user wants to calculate, even if they're vague or conversational
2. Extract specific values when provided (income, province, age, amounts, etc.)
3. Ask clarifying questions if you need more information to fill in the calculator
4. Be conversational and helpful, not robotic

IMPORTANT RESPONSE FORMAT:
You must respond with valid JSON in this exact format:
{
  "message": "Your conversational response to the user",
  "fieldUpdates": { "fieldName": value } or null if no updates,
  "needsMoreInfo": true/false
}

For fieldUpdates:
- Use the exact field names from the list above
- Numbers should be numbers (not strings)
- Province codes should be uppercase 2-letter codes (ON, BC, AB, etc.)

Examples of good responses:
- User says "I make 80 grand in Vancouver": {"message": "Got it! I've set your income to $80,000 and province to BC. Your tax breakdown is now showing.", "fieldUpdates": {"income": 80000, "province": "BC"}, "needsMoreInfo": false}
- User says "what if I'm rich": {"message": "I'd be happy to calculate that! What annual income would you consider 'rich'? For example, are you thinking $150,000, $250,000, or higher?", "fieldUpdates": null, "needsMoreInfo": true}
- User says "I'm thinking of moving from Ontario to Alberta": {"message": "Great question! Moving to Alberta could significantly reduce your taxes since there's no provincial sales tax and lower income tax rates. What's your annual income? I can show you the difference.", "fieldUpdates": null, "needsMoreInfo": true}

Be smart about context:
- "BC" or "Vancouver" → province: "BC"
- "Toronto" or "GTA" → province: "ON"
- "Montreal" → province: "QC"
- "Calgary" or "Edmonton" → province: "AB"
- "six figures" → ask what specifically
- "average salary" → suggest ~$60,000 or ask
- "good salary" → ask what they consider good

For RRSP calculator, understand:
- "max out my RRSP" → they want to contribute the maximum
- "I have room from last year" → ask about unused contribution room

For TFSA calculator, understand:
- Age or birth year helps calculate total room
- "I've never contributed" → they have maximum room available

For capital gains, understand:
- They need purchase price AND sale price
- Ask about both if only one is mentioned

Always be helpful and guide them toward a complete calculation!`
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { message, calculatorType, fields, conversationHistory = [] } = body

    const openRouterKey = process.env.OPENROUTER_API_KEY

    if (!openRouterKey) {
      // Fallback to simple parsing if no API key
      return handleSimpleParsing(message, fields)
    }

    const systemPrompt = buildSystemPrompt(calculatorType, fields)

    // Build messages for the LLM
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-6).map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://taxtestnonprofit.vercel.app',
        'X-Title': 'Canadian Tax Calculator Assistant'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-haiku',
        messages,
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      console.error('OpenRouter error:', await response.text())
      return handleSimpleParsing(message, fields)
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return handleSimpleParsing(message, fields)
    }

    // Parse the JSON response
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }

      const parsed = JSON.parse(jsonMatch[0])

      return NextResponse.json({
        message: parsed.message || "I'm not sure how to help with that. Can you tell me more?",
        fieldUpdates: parsed.fieldUpdates || undefined,
        needsMoreInfo: parsed.needsMoreInfo || false
      })
    } catch (parseError) {
      // If JSON parsing fails, use the content as a message
      console.error('JSON parse error:', parseError)
      return NextResponse.json({
        message: content.replace(/```json|```/g, '').trim(),
        fieldUpdates: undefined,
        needsMoreInfo: true
      })
    }

  } catch (error) {
    console.error('Calculator assistant error:', error)
    return NextResponse.json(
      { error: 'Failed to process request', message: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    )
  }
}

// Simple fallback parsing when LLM is not available
function handleSimpleParsing(message: string, fields: CalculatorField[]) {
  const fieldUpdates: Record<string, string | number> = {}
  const updates: string[] = []

  // Parse income
  const incomeMatch = message.match(/\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K|thousand|grand)?/i)
  if (incomeMatch) {
    let value = parseFloat(incomeMatch[1].replace(/,/g, ''))
    if (/k|K|thousand|grand/i.test(incomeMatch[0])) {
      value *= 1000
    }
    if (value > 0 && value < 10000000) {
      const incomeField = fields.find(f =>
        f.name.toLowerCase().includes('income') ||
        f.name.toLowerCase().includes('salary') ||
        f.name.toLowerCase().includes('earned')
      )
      if (incomeField) {
        fieldUpdates[incomeField.name] = value
        updates.push(`income to $${value.toLocaleString()}`)
      }
    }
  }

  // Parse province
  const provinceMap: Record<string, string> = {
    'ontario': 'ON', 'toronto': 'ON', 'gta': 'ON', 'ottawa': 'ON',
    'british columbia': 'BC', 'vancouver': 'BC', 'victoria': 'BC',
    'alberta': 'AB', 'calgary': 'AB', 'edmonton': 'AB',
    'quebec': 'QC', 'montreal': 'QC',
    'manitoba': 'MB', 'winnipeg': 'MB',
    'saskatchewan': 'SK', 'saskatoon': 'SK', 'regina': 'SK',
    'nova scotia': 'NS', 'halifax': 'NS',
    'new brunswick': 'NB',
    'newfoundland': 'NL', 'st johns': 'NL',
    'pei': 'PE', 'prince edward island': 'PE',
  }

  const lowerMessage = message.toLowerCase()
  for (const [key, code] of Object.entries(provinceMap)) {
    if (lowerMessage.includes(key)) {
      const provinceField = fields.find(f => f.name.toLowerCase().includes('province'))
      if (provinceField) {
        fieldUpdates[provinceField.name] = code
        updates.push(`province to ${PROVINCE_NAMES[code]}`)
      }
      break
    }
  }

  // Build response
  let responseMessage: string
  if (updates.length > 0) {
    responseMessage = `Got it! I've updated:\n• ${updates.join('\n• ')}\n\nCheck out your results!`
  } else {
    responseMessage = `I'd love to help! Could you tell me a bit more? For example:\n• Your annual income (e.g., "$80,000" or "80k")\n• Your province (e.g., "Ontario" or "BC")\n\nWhat would you like to calculate?`
  }

  return NextResponse.json({
    message: responseMessage,
    fieldUpdates: Object.keys(fieldUpdates).length > 0 ? fieldUpdates : undefined,
    needsMoreInfo: Object.keys(fieldUpdates).length === 0
  })
}
