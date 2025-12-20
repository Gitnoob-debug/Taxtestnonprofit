// Calculator detection utility for auto-launching relevant calculators

export interface CalculatorSuggestion {
  slug: string
  name: string
  description: string
  matchScore: number
  matchedKeywords: string[]
}

interface CalculatorPattern {
  slug: string
  name: string
  description: string
  patterns: RegExp[]
  keywords: string[]
}

const CALCULATOR_PATTERNS: CalculatorPattern[] = [
  {
    slug: 'tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Calculate your total federal and provincial taxes',
    patterns: [
      /how much tax (do i|will i|would i|should i)/i,
      /calculate.*tax(es)?/i,
      /what.*my tax/i,
      /income tax on \$?\d+/i,
      /tax on.*income/i,
      /total tax/i,
    ],
    keywords: ['income tax', 'calculate tax', 'tax owing', 'how much tax', 'federal tax', 'provincial tax']
  },
  {
    slug: 'marginal-tax-calculator',
    name: 'Marginal Tax Rate Calculator',
    description: 'See how much tax you pay on your next dollar',
    patterns: [
      /marginal (tax )?rate/i,
      /tax bracket/i,
      /what bracket/i,
      /next dollar/i,
      /tax on.*raise/i,
      /bonus.*tax/i,
    ],
    keywords: ['marginal rate', 'tax bracket', 'bracket', 'next dollar', 'bonus tax']
  },
  {
    slug: 'tax-refund-estimator',
    name: 'Tax Refund Estimator',
    description: 'Estimate your tax refund or amount owing',
    patterns: [
      /refund/i,
      /will i (get|receive|owe)/i,
      /owe taxes/i,
      /tax (owing|owed)/i,
      /expect.*refund/i,
    ],
    keywords: ['refund', 'tax refund', 'owing', 'get back', 'owe']
  },
  {
    slug: 'rrsp-calculator',
    name: 'RRSP Contribution Calculator',
    description: 'Optimize your RRSP contribution strategy',
    patterns: [
      /rrsp.*contribut/i,
      /contribut.*rrsp/i,
      /rrsp.*sav/i,
      /rrsp.*deduction/i,
      /how much.*rrsp/i,
      /rrsp.*room/i,
    ],
    keywords: ['rrsp', 'rrsp contribution', 'rrsp deduction', 'rrsp room', 'retirement savings']
  },
  {
    slug: 'rrsp-vs-tfsa',
    name: 'RRSP vs TFSA Calculator',
    description: 'Compare RRSP and TFSA to find the best fit',
    patterns: [
      /rrsp.*tfsa/i,
      /tfsa.*rrsp/i,
      /rrsp or tfsa/i,
      /tfsa or rrsp/i,
      /which.*rrsp.*tfsa/i,
      /which.*tfsa.*rrsp/i,
      /better.*rrsp.*tfsa/i,
      /compare.*rrsp.*tfsa/i,
    ],
    keywords: ['rrsp vs tfsa', 'tfsa vs rrsp', 'rrsp or tfsa', 'which is better']
  },
  {
    slug: 'tfsa-room-calculator',
    name: 'TFSA Room Calculator',
    description: 'Calculate your available TFSA contribution room',
    patterns: [
      /tfsa.*room/i,
      /tfsa.*limit/i,
      /tfsa.*contribution/i,
      /how much.*tfsa/i,
      /tfsa.*space/i,
      /tfsa.*left/i,
    ],
    keywords: ['tfsa room', 'tfsa limit', 'tfsa contribution', 'tfsa space']
  },
  {
    slug: 'capital-gains-calculator',
    name: 'Capital Gains Calculator',
    description: 'Calculate tax on investment sales',
    patterns: [
      /capital gain/i,
      /sell.*(stock|share|investment|etf|mutual fund)/i,
      /sold.*(stock|share|investment|etf|mutual fund)/i,
      /investment.*tax/i,
      /stock.*tax/i,
      /gain.*tax/i,
      /inclusion rate/i,
    ],
    keywords: ['capital gains', 'sell stock', 'investment tax', 'shares', 'inclusion rate', 'capital loss']
  },
  {
    slug: 'dividend-tax-calculator',
    name: 'Dividend Tax Calculator',
    description: 'Calculate your dividend tax credit and tax owing',
    patterns: [
      /dividend.*tax/i,
      /tax.*dividend/i,
      /dividend.*credit/i,
      /eligible dividend/i,
      /non-eligible dividend/i,
      /dividend gross-?up/i,
    ],
    keywords: ['dividend', 'dividend tax', 'dividend credit', 'eligible dividend', 'gross up']
  },
  {
    slug: 'rental-property-calculator',
    name: 'Rental Property Calculator',
    description: 'Calculate rental income taxes and CCA',
    patterns: [
      /rental.*income/i,
      /rental.*property/i,
      /landlord.*tax/i,
      /cca.*rental/i,
      /rental.*expense/i,
      /rent.*tax/i,
    ],
    keywords: ['rental income', 'rental property', 'landlord', 'cca', 'depreciation']
  },
  {
    slug: 'fhsa-calculator',
    name: 'FHSA Calculator',
    description: 'Calculate First Home Savings Account benefits',
    patterns: [
      /fhsa/i,
      /first home savings/i,
      /home buyer.*savings/i,
      /fhsa.*contribution/i,
    ],
    keywords: ['fhsa', 'first home savings', 'first home buyer']
  },
  {
    slug: 'self-employment-tax-calculator',
    name: 'Self-Employment Tax Calculator',
    description: 'Calculate self-employment taxes and CPP',
    patterns: [
      /self.?employ.*tax/i,
      /freelance.*tax/i,
      /contractor.*tax/i,
      /sole proprietor.*tax/i,
      /business.*income.*tax/i,
      /self.?employ.*cpp/i,
    ],
    keywords: ['self-employed', 'freelance', 'contractor', 'sole proprietor', 'business income']
  },
  {
    slug: 'salary-vs-dividend-calculator',
    name: 'Salary vs Dividend Calculator',
    description: 'Compare salary and dividend tax efficiency',
    patterns: [
      /salary.*dividend/i,
      /dividend.*salary/i,
      /pay.*myself/i,
      /corporation.*compensation/i,
      /owner.*pay/i,
    ],
    keywords: ['salary vs dividend', 'dividend vs salary', 'corporation pay', 'owner compensation']
  },
  {
    slug: 'cpp-retirement-calculator',
    name: 'CPP Retirement Calculator',
    description: 'Estimate your CPP retirement benefits',
    patterns: [
      /cpp.*retire/i,
      /cpp.*benefit/i,
      /cpp.*pension/i,
      /canada pension plan/i,
      /when.*cpp/i,
      /how much.*cpp/i,
      /cpp.*65/i,
      /cpp.*60/i,
      /cpp.*70/i,
    ],
    keywords: ['cpp', 'canada pension plan', 'cpp retirement', 'cpp benefits']
  },
  {
    slug: 'oas-clawback-calculator',
    name: 'OAS Clawback Calculator',
    description: 'Calculate OAS benefits and recovery tax',
    patterns: [
      /oas.*clawback/i,
      /oas.*recovery/i,
      /old age security/i,
      /oas.*benefit/i,
      /oas.*tax/i,
      /gis/i,
    ],
    keywords: ['oas', 'old age security', 'oas clawback', 'recovery tax', 'gis']
  },
  {
    slug: 'hbp-repayment-calculator',
    name: 'HBP Repayment Calculator',
    description: 'Calculate Home Buyers\' Plan repayments',
    patterns: [
      /hbp.*repay/i,
      /home buyer.*plan.*repay/i,
      /rrsp.*home.*repay/i,
      /hbp.*rrsp/i,
    ],
    keywords: ['hbp', 'home buyers plan', 'hbp repayment']
  },
  {
    slug: 'rrsp-withholding-calculator',
    name: 'RRSP Withholding Calculator',
    description: 'Calculate tax withheld on RRSP withdrawals',
    patterns: [
      /rrsp.*withdraw/i,
      /withdraw.*rrsp/i,
      /rrsp.*withholding/i,
      /take.*money.*rrsp/i,
      /rrsp.*early/i,
    ],
    keywords: ['rrsp withdrawal', 'rrsp withholding', 'withdraw from rrsp']
  },
]

/**
 * Detect relevant calculators for a given user query
 */
export function detectCalculators(query: string): CalculatorSuggestion[] {
  const suggestions: CalculatorSuggestion[] = []
  const normalizedQuery = query.toLowerCase()

  for (const calc of CALCULATOR_PATTERNS) {
    let matchScore = 0
    const matchedKeywords: string[] = []

    // Check patterns (regex matches are stronger)
    for (const pattern of calc.patterns) {
      if (pattern.test(query)) {
        matchScore += 10
        const match = query.match(pattern)
        if (match) {
          matchedKeywords.push(match[0])
        }
      }
    }

    // Check keywords (weaker but still relevant)
    for (const keyword of calc.keywords) {
      if (normalizedQuery.includes(keyword.toLowerCase())) {
        matchScore += 5
        matchedKeywords.push(keyword)
      }
    }

    if (matchScore > 0) {
      suggestions.push({
        slug: calc.slug,
        name: calc.name,
        description: calc.description,
        matchScore,
        matchedKeywords: Array.from(new Set(matchedKeywords))
      })
    }
  }

  // Sort by match score (highest first) and limit to top 2
  return suggestions.sort((a, b) => b.matchScore - a.matchScore).slice(0, 2)
}

/**
 * Check if a query is asking for a calculation that could benefit from a calculator
 */
export function shouldSuggestCalculator(query: string): boolean {
  const calculationPatterns = [
    /how much/i,
    /calculate/i,
    /what.*my/i,
    /can you.*figure/i,
    /estimate/i,
    /\$\d+/,  // contains a dollar amount
    /\d+,?\d+.*income/i,  // contains income amount
  ]

  return calculationPatterns.some(pattern => pattern.test(query))
}

/**
 * Get a suggested calculator based on profile data
 */
export function getProfileBasedCalculators(profile: {
  has_self_employment_income?: boolean
  has_investment_income?: boolean
  has_rental_income?: boolean
  annual_income?: number | null
  rrsp_contribution_room?: number | null
  birth_year?: number | null
}): string[] {
  const suggestions: string[] = []
  const currentYear = new Date().getFullYear()

  if (profile.annual_income) {
    suggestions.push('tax-calculator')
    suggestions.push('marginal-tax-calculator')
  }

  if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > 0) {
    suggestions.push('rrsp-calculator')
    suggestions.push('rrsp-vs-tfsa')
  }

  if (profile.has_self_employment_income) {
    suggestions.push('self-employment-tax-calculator')
  }

  if (profile.has_investment_income) {
    suggestions.push('capital-gains-calculator')
    suggestions.push('dividend-tax-calculator')
  }

  if (profile.has_rental_income) {
    suggestions.push('rental-property-calculator')
  }

  if (profile.birth_year) {
    const age = currentYear - profile.birth_year
    if (age >= 55) {
      suggestions.push('cpp-retirement-calculator')
      suggestions.push('oas-clawback-calculator')
    }
  }

  return Array.from(new Set(suggestions))
}
