import { NextRequest, NextResponse } from 'next/server'

const PROVINCE_MAP: Record<string, string> = {
  'ontario': 'ON',
  'on': 'ON',
  'british columbia': 'BC',
  'bc': 'BC',
  'alberta': 'AB',
  'ab': 'AB',
  'quebec': 'QC',
  'qc': 'QC',
  'manitoba': 'MB',
  'mb': 'MB',
  'saskatchewan': 'SK',
  'sk': 'SK',
  'nova scotia': 'NS',
  'ns': 'NS',
  'new brunswick': 'NB',
  'nb': 'NB',
  'newfoundland': 'NL',
  'newfoundland and labrador': 'NL',
  'nl': 'NL',
  'prince edward island': 'PE',
  'pei': 'PE',
  'pe': 'PE',
  'northwest territories': 'NT',
  'nt': 'NT',
  'nunavut': 'NU',
  'nu': 'NU',
  'yukon': 'YT',
  'yt': 'YT',
}

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

interface RequestBody {
  message: string
  calculatorType: string
  fields: CalculatorField[]
}

function parseIncome(text: string): number | null {
  // Match patterns like: $75,000, 75000, 75k, $120K, 85,000 dollars
  const patterns = [
    /\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)/,  // 75k, $75K
    /\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:thousand|grand)/i,  // 75 thousand
    /\$?\s*([\d,]+(?:\.\d{2})?)/,  // $75,000 or 75000
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      let value = parseFloat(match[1].replace(/,/g, ''))
      // If pattern includes k/K or thousand, multiply by 1000
      if (/k|K|thousand|grand/i.test(match[0])) {
        value *= 1000
      }
      if (value > 0 && value < 10000000) { // Sanity check
        return value
      }
    }
  }
  return null
}

function parseProvince(text: string): string | null {
  const lowerText = text.toLowerCase()

  // Try to find province name or code in text
  for (const [key, code] of Object.entries(PROVINCE_MAP)) {
    if (lowerText.includes(key)) {
      return code
    }
  }

  return null
}

function parseAge(text: string): number | null {
  const patterns = [
    /(\d{1,3})\s*(?:years?\s*old|yo|y\/o)/i,  // 45 years old, 45yo
    /age\s*(?:of\s*)?(\d{1,3})/i,  // age 45, age of 45
    /i(?:'m|am)\s*(\d{1,3})/i,  // I'm 45, I am 45
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const age = parseInt(match[1])
      if (age > 0 && age < 120) {
        return age
      }
    }
  }
  return null
}

function parseBirthYear(text: string): number | null {
  const patterns = [
    /born\s*(?:in\s*)?(\d{4})/i,  // born in 1990
    /birth\s*year\s*(?:is\s*)?(\d{4})/i,  // birth year 1990
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      const year = parseInt(match[1])
      const currentYear = new Date().getFullYear()
      if (year > 1900 && year <= currentYear) {
        return year
      }
    }
  }
  return null
}

function parseRRSPContribution(text: string): number | null {
  const patterns = [
    /rrsp\s*(?:contribution\s*)?(?:of\s*)?\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?/i,
    /contribut(?:e|ing)\s*\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?\s*(?:to\s*)?(?:my\s*)?rrsp/i,
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      let value = parseFloat(match[1].replace(/,/g, ''))
      if (/k|K/.test(match[0])) {
        value *= 1000
      }
      if (value > 0) {
        return value
      }
    }
  }
  return null
}

function parseCapitalGains(text: string): { purchasePrice?: number; salePrice?: number } | null {
  const result: { purchasePrice?: number; salePrice?: number } = {}

  // Match purchase/bought for
  const purchasePatterns = [
    /(?:bought|purchased|paid)\s*(?:for\s*)?\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?/i,
    /(?:cost|purchase\s*price)\s*(?:of\s*)?\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?/i,
  ]

  for (const pattern of purchasePatterns) {
    const match = text.match(pattern)
    if (match) {
      let value = parseFloat(match[1].replace(/,/g, ''))
      if (/k|K/.test(match[0])) value *= 1000
      if (value > 0) {
        result.purchasePrice = value
        break
      }
    }
  }

  // Match sale/sold for
  const salePatterns = [
    /(?:sold|selling)\s*(?:for\s*)?\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?/i,
    /(?:sale\s*price)\s*(?:of\s*)?\$?\s*([\d,]+(?:\.\d{2})?)\s*(?:k|K)?/i,
  ]

  for (const pattern of salePatterns) {
    const match = text.match(pattern)
    if (match) {
      let value = parseFloat(match[1].replace(/,/g, ''))
      if (/k|K/.test(match[0])) value *= 1000
      if (value > 0) {
        result.salePrice = value
        break
      }
    }
  }

  return Object.keys(result).length > 0 ? result : null
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { message, calculatorType, fields } = body

    const fieldUpdates: Record<string, string | number> = {}
    const updates: string[] = []

    // Parse income
    const income = parseIncome(message)
    if (income !== null) {
      const incomeField = fields.find(f =>
        f.name.toLowerCase().includes('income') ||
        f.label.toLowerCase().includes('income') ||
        f.name.toLowerCase().includes('salary') ||
        f.label.toLowerCase().includes('salary')
      )
      if (incomeField) {
        fieldUpdates[incomeField.name] = income
        updates.push(`income to $${income.toLocaleString()}`)
      }
    }

    // Parse province
    const province = parseProvince(message)
    if (province) {
      const provinceField = fields.find(f =>
        f.name.toLowerCase().includes('province') ||
        f.label.toLowerCase().includes('province') ||
        f.type === 'select'
      )
      if (provinceField) {
        fieldUpdates[provinceField.name] = province
        updates.push(`province to ${PROVINCE_NAMES[province]}`)
      }
    }

    // Parse age (for TFSA, RRSP calculators)
    const age = parseAge(message)
    if (age !== null) {
      const ageField = fields.find(f =>
        f.name.toLowerCase().includes('age') ||
        f.label.toLowerCase().includes('age')
      )
      if (ageField) {
        fieldUpdates[ageField.name] = age
        updates.push(`age to ${age}`)
      }
    }

    // Parse birth year
    const birthYear = parseBirthYear(message)
    if (birthYear !== null) {
      const birthYearField = fields.find(f =>
        f.name.toLowerCase().includes('birth') ||
        f.name.toLowerCase().includes('year') ||
        f.label.toLowerCase().includes('birth')
      )
      if (birthYearField) {
        fieldUpdates[birthYearField.name] = birthYear
        updates.push(`birth year to ${birthYear}`)
      }
    }

    // Parse RRSP contribution
    const rrspContribution = parseRRSPContribution(message)
    if (rrspContribution !== null) {
      const rrspField = fields.find(f =>
        f.name.toLowerCase().includes('rrsp') ||
        f.name.toLowerCase().includes('contribution') ||
        f.label.toLowerCase().includes('rrsp')
      )
      if (rrspField) {
        fieldUpdates[rrspField.name] = rrspContribution
        updates.push(`RRSP contribution to $${rrspContribution.toLocaleString()}`)
      }
    }

    // Parse capital gains fields
    const capitalGains = parseCapitalGains(message)
    if (capitalGains) {
      if (capitalGains.purchasePrice !== undefined) {
        const purchaseField = fields.find(f =>
          f.name.toLowerCase().includes('purchase') ||
          f.name.toLowerCase().includes('cost') ||
          f.name.toLowerCase().includes('buy') ||
          f.label.toLowerCase().includes('purchase')
        )
        if (purchaseField) {
          fieldUpdates[purchaseField.name] = capitalGains.purchasePrice
          updates.push(`purchase price to $${capitalGains.purchasePrice.toLocaleString()}`)
        }
      }
      if (capitalGains.salePrice !== undefined) {
        const saleField = fields.find(f =>
          f.name.toLowerCase().includes('sale') ||
          f.name.toLowerCase().includes('sell') ||
          f.label.toLowerCase().includes('sale') ||
          f.label.toLowerCase().includes('selling')
        )
        if (saleField) {
          fieldUpdates[saleField.name] = capitalGains.salePrice
          updates.push(`sale price to $${capitalGains.salePrice.toLocaleString()}`)
        }
      }
    }

    // Build response message
    let responseMessage: string

    if (updates.length > 0) {
      if (updates.length === 1) {
        responseMessage = `Done! I've set your ${updates[0]}. The calculator is now showing your results.`
      } else {
        responseMessage = `Got it! I've updated:\n• ${updates.join('\n• ')}\n\nCheck out your results in the calculator!`
      }
    } else {
      responseMessage = `I couldn't find specific values in your message. Try something like:\n\n• "I make $75,000 in Ontario"\n• "Calculate for $120k income in BC"\n• "I'm 35 years old, born in 1989"\n\nWhat would you like to calculate?`
    }

    return NextResponse.json({
      message: responseMessage,
      fieldUpdates: Object.keys(fieldUpdates).length > 0 ? fieldUpdates : undefined
    })

  } catch (error) {
    console.error('Calculator assistant error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
