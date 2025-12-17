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
    let desc = `- ${f.name}: ${f.type}`
    if (f.type === 'select' && f.options) {
      desc += ` (${f.options.map(o => o.value).join(', ')})`
    }
    if (f.currentValue !== undefined && f.currentValue !== '') {
      desc += ` = ${f.currentValue}`
    }
    return desc
  }).join('\n')

  const calculatorDescriptions: Record<string, string> = {
    'tax-calculator': 'Income Tax Calculator',
    'rrsp-calculator': 'RRSP Calculator',
    'tfsa-room-calculator': 'TFSA Room Calculator',
    'capital-gains-calculator': 'Capital Gains Calculator',
    'fhsa-calculator': 'FHSA Calculator',
    'rrsp-vs-tfsa': 'RRSP vs TFSA Comparison',
    'marginal-tax-calculator': 'Marginal Tax Calculator',
    'dividend-tax-calculator': 'Dividend Tax Calculator',
    'self-employment-tax-calculator': 'Self-Employment Tax Calculator',
  }

  const calcDesc = calculatorDescriptions[calculatorType] || 'Tax Calculator'

  return `You are a Canadian tax assistant for the ${calcDesc}. Be brief and direct.

Fields:
${fieldDescriptions}

RESPOND WITH JSON ONLY:
{"message": "short response", "fieldUpdates": {"field": value} or null, "needsMoreInfo": true/false}

RULES:
- Keep messages SHORT (1-2 sentences max)
- When you have values, just confirm briefly: "Done! Check your results on the right."
- Only ask ONE question at a time if info is missing
- Never repeat back all the values - the UI shows them
- Province codes: ON, BC, AB, QC, MB, SK, NS, NB, NL, PE, NT, NU, YT
- City mapping: Vancouver/Victoria=BC, Toronto/Ottawa=ON, Montreal=QC, Calgary/Edmonton=AB

Examples:
User: "75k in Ontario, 8000 contribution" → {"message": "Done! Your FHSA savings are showing.", "fieldUpdates": {"income": 75000, "province": "ON", "contribution": 8000}, "needsMoreInfo": false}
User: "what about BC?" → {"message": "Updated to BC.", "fieldUpdates": {"province": "BC"}, "needsMoreInfo": false}
User: "max out my FHSA" → {"message": "Set to $8,000 annual max. What's your income?", "fieldUpdates": {"contribution": 8000}, "needsMoreInfo": true}`
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
    responseMessage = `Done! Check your results.`
  } else {
    responseMessage = `What's your income and province?`
  }

  return NextResponse.json({
    message: responseMessage,
    fieldUpdates: Object.keys(fieldUpdates).length > 0 ? fieldUpdates : undefined,
    needsMoreInfo: Object.keys(fieldUpdates).length === 0
  })
}
