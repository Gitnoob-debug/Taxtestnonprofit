/**
 * Canadian Tax Data 2024
 * Official rates from CRA and provincial tax authorities
 */

export const TAX_YEAR = 2024

// Federal Tax Brackets 2024
export const FEDERAL_BRACKETS = [
  { min: 0, max: 55867, rate: 0.15 },
  { min: 55867, max: 111733, rate: 0.205 },
  { min: 111733, max: 173205, rate: 0.26 },
  { min: 173205, max: 246752, rate: 0.29 },
  { min: 246752, max: Infinity, rate: 0.33 },
]

// Provincial Tax Brackets 2024
export const PROVINCIAL_BRACKETS: Record<string, { min: number; max: number; rate: number }[]> = {
  AB: [
    { min: 0, max: 148269, rate: 0.10 },
    { min: 148269, max: 177922, rate: 0.12 },
    { min: 177922, max: 237230, rate: 0.13 },
    { min: 237230, max: 355845, rate: 0.14 },
    { min: 355845, max: Infinity, rate: 0.15 },
  ],
  BC: [
    { min: 0, max: 47937, rate: 0.0506 },
    { min: 47937, max: 95875, rate: 0.077 },
    { min: 95875, max: 110076, rate: 0.105 },
    { min: 110076, max: 133664, rate: 0.1229 },
    { min: 133664, max: 181232, rate: 0.147 },
    { min: 181232, max: 252752, rate: 0.168 },
    { min: 252752, max: Infinity, rate: 0.205 },
  ],
  MB: [
    { min: 0, max: 47000, rate: 0.108 },
    { min: 47000, max: 100000, rate: 0.1275 },
    { min: 100000, max: Infinity, rate: 0.174 },
  ],
  NB: [
    { min: 0, max: 49958, rate: 0.094 },
    { min: 49958, max: 99916, rate: 0.14 },
    { min: 99916, max: 185064, rate: 0.16 },
    { min: 185064, max: Infinity, rate: 0.195 },
  ],
  NL: [
    { min: 0, max: 43198, rate: 0.087 },
    { min: 43198, max: 86395, rate: 0.145 },
    { min: 86395, max: 154244, rate: 0.158 },
    { min: 154244, max: 215943, rate: 0.178 },
    { min: 215943, max: 275870, rate: 0.198 },
    { min: 275870, max: 551739, rate: 0.208 },
    { min: 551739, max: 1103478, rate: 0.213 },
    { min: 1103478, max: Infinity, rate: 0.218 },
  ],
  NS: [
    { min: 0, max: 29590, rate: 0.0879 },
    { min: 29590, max: 59180, rate: 0.1495 },
    { min: 59180, max: 93000, rate: 0.1667 },
    { min: 93000, max: 150000, rate: 0.175 },
    { min: 150000, max: Infinity, rate: 0.21 },
  ],
  NT: [
    { min: 0, max: 50597, rate: 0.059 },
    { min: 50597, max: 101198, rate: 0.086 },
    { min: 101198, max: 164525, rate: 0.122 },
    { min: 164525, max: Infinity, rate: 0.1405 },
  ],
  NU: [
    { min: 0, max: 53268, rate: 0.04 },
    { min: 53268, max: 106537, rate: 0.07 },
    { min: 106537, max: 173205, rate: 0.09 },
    { min: 173205, max: Infinity, rate: 0.115 },
  ],
  ON: [
    { min: 0, max: 51446, rate: 0.0505 },
    { min: 51446, max: 102894, rate: 0.0915 },
    { min: 102894, max: 150000, rate: 0.1116 },
    { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: Infinity, rate: 0.1316 },
  ],
  PE: [
    { min: 0, max: 32656, rate: 0.0965 },
    { min: 32656, max: 64313, rate: 0.1363 },
    { min: 64313, max: 105000, rate: 0.1665 },
    { min: 105000, max: 140000, rate: 0.18 },
    { min: 140000, max: Infinity, rate: 0.1875 },
  ],
  QC: [
    { min: 0, max: 51780, rate: 0.14 },
    { min: 51780, max: 103545, rate: 0.19 },
    { min: 103545, max: 126000, rate: 0.24 },
    { min: 126000, max: Infinity, rate: 0.2575 },
  ],
  SK: [
    { min: 0, max: 52057, rate: 0.105 },
    { min: 52057, max: 148734, rate: 0.125 },
    { min: 148734, max: Infinity, rate: 0.145 },
  ],
  YT: [
    { min: 0, max: 55867, rate: 0.064 },
    { min: 55867, max: 111733, rate: 0.09 },
    { min: 111733, max: 173205, rate: 0.109 },
    { min: 173205, max: 500000, rate: 0.128 },
    { min: 500000, max: Infinity, rate: 0.15 },
  ],
}

// Province names for display
export const PROVINCE_NAMES: Record<string, string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon',
}

// RRSP/TFSA Limits 2024
export const RRSP_LIMIT_2024 = 31560
export const RRSP_CONTRIBUTION_RATE = 0.18 // 18% of previous year's earned income
export const TFSA_LIMIT_2024 = 7000
export const TFSA_CUMULATIVE_ROOM_2024 = 95000 // Total since 2009 for someone 18+ since 2009

// TFSA annual limits by year (for room calculation)
export const TFSA_ANNUAL_LIMITS: Record<number, number> = {
  2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000,
  2013: 5500, 2014: 5500, 2015: 10000, 2016: 5500,
  2017: 5500, 2018: 5500, 2019: 6000, 2020: 6000,
  2021: 6000, 2022: 6000, 2023: 6500, 2024: 7000,
}

// FHSA (First Home Savings Account) 2024
export const FHSA_ANNUAL_LIMIT = 8000
export const FHSA_LIFETIME_LIMIT = 40000

// Capital Gains Inclusion Rate (as of June 25, 2024)
export const CAPITAL_GAINS_INCLUSION_RATE = 0.5 // First $250K
export const CAPITAL_GAINS_INCLUSION_RATE_HIGH = 0.6667 // Above $250K

// Basic Personal Amount 2024
export const FEDERAL_BPA = 15705
export const PROVINCIAL_BPA: Record<string, number> = {
  AB: 21003,
  BC: 12580,
  MB: 15780,
  NB: 13044,
  NL: 10818,
  NS: 8481,
  NT: 17373,
  NU: 18767,
  ON: 12399,
  PE: 13500,
  QC: 18056, // Note: Quebec has its own system
  SK: 18491,
  YT: 15705,
}

// CPP/QPP 2024
export const CPP_MAX_PENSIONABLE_EARNINGS = 68500
export const CPP_BASIC_EXEMPTION = 3500
export const CPP_RATE_EMPLOYEE = 0.0595
export const CPP_MAX_CONTRIBUTION_EMPLOYEE = 3867.50
export const CPP2_MAX_EARNINGS = 73200 // Second ceiling
export const CPP2_RATE = 0.04 // Additional 4% on earnings between $68,500 and $73,200

// EI 2024
export const EI_MAX_INSURABLE_EARNINGS = 63200
export const EI_RATE_EMPLOYEE = 0.0166
export const EI_MAX_PREMIUM_EMPLOYEE = 1049.12

/**
 * Calculate federal tax for a given income
 */
export function calculateFederalTax(income: number): number {
  let tax = 0
  let remainingIncome = income

  for (const bracket of FEDERAL_BRACKETS) {
    if (remainingIncome <= 0) break

    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  return tax
}

/**
 * Calculate provincial tax for a given income and province
 */
export function calculateProvincialTax(income: number, province: string): number {
  const brackets = PROVINCIAL_BRACKETS[province]
  if (!brackets) return 0

  let tax = 0
  let remainingIncome = income

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break

    const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remainingIncome -= taxableInBracket
  }

  return tax
}

/**
 * Calculate total tax (federal + provincial) for a given income
 */
export function calculateTotalTax(income: number, province: string): {
  federalTax: number
  provincialTax: number
  totalTax: number
  effectiveRate: number
  marginalRate: number
} {
  const federalTax = calculateFederalTax(income)
  const provincialTax = calculateProvincialTax(income, province)
  const totalTax = federalTax + provincialTax

  // Calculate marginal rate
  const federalMarginal = FEDERAL_BRACKETS.find(b => income <= b.max)?.rate || 0.33
  const provincialBrackets = PROVINCIAL_BRACKETS[province] || []
  const provincialMarginal = provincialBrackets.find(b => income <= b.max)?.rate || 0

  return {
    federalTax,
    provincialTax,
    totalTax,
    effectiveRate: income > 0 ? totalTax / income : 0,
    marginalRate: federalMarginal + provincialMarginal,
  }
}

/**
 * Calculate RRSP contribution room
 */
export function calculateRRSPRoom(previousYearIncome: number, unusedRoom: number = 0): number {
  const newRoom = Math.min(previousYearIncome * RRSP_CONTRIBUTION_RATE, RRSP_LIMIT_2024)
  return newRoom + unusedRoom
}

/**
 * Calculate RRSP tax savings
 */
export function calculateRRSPTaxSavings(
  contribution: number,
  income: number,
  province: string
): { taxSavings: number; effectiveReturn: number } {
  const taxWithoutRRSP = calculateTotalTax(income, province).totalTax
  const taxWithRRSP = calculateTotalTax(income - contribution, province).totalTax
  const taxSavings = taxWithoutRRSP - taxWithRRSP

  return {
    taxSavings,
    effectiveReturn: contribution > 0 ? taxSavings / contribution : 0,
  }
}

/**
 * Calculate TFSA contribution room based on birth year
 */
export function calculateTFSARoom(birthYear: number, previousContributions: number = 0): number {
  const currentYear = TAX_YEAR
  const yearTurned18 = birthYear + 18

  // TFSA started in 2009
  const startYear = Math.max(2009, yearTurned18)

  if (startYear > currentYear) return 0 // Not yet 18

  let totalRoom = 0
  for (let year = startYear; year <= currentYear; year++) {
    totalRoom += TFSA_ANNUAL_LIMITS[year] || 0
  }

  return Math.max(0, totalRoom - previousContributions)
}

/**
 * Calculate capital gains tax
 */
export function calculateCapitalGainsTax(
  gain: number,
  otherIncome: number,
  province: string
): {
  taxableGain: number
  tax: number
  effectiveRate: number
} {
  // Apply inclusion rate (simplified - doesn't account for the $250K threshold change in 2024)
  const taxableGain = gain * CAPITAL_GAINS_INCLUSION_RATE

  // Calculate tax on the gain at marginal rate
  const totalIncome = otherIncome + taxableGain
  const taxWithGain = calculateTotalTax(totalIncome, province).totalTax
  const taxWithoutGain = calculateTotalTax(otherIncome, province).totalTax
  const tax = taxWithGain - taxWithoutGain

  return {
    taxableGain,
    tax,
    effectiveRate: gain > 0 ? tax / gain : 0,
  }
}
