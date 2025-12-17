/**
 * Canadian Tax Data 2025
 * Official rates from CRA and provincial tax authorities
 * For tax returns filed in early 2026 (2025 tax year)
 *
 * Sources:
 * - CRA: https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html
 * - TaxTips.ca: https://www.taxtips.ca/taxrates/canada.htm
 * - Provincial tax authorities
 *
 * Note: The federal lowest bracket rate was reduced from 15% to 14% effective July 1, 2025,
 * resulting in an effective rate of 14.5% for the 2025 tax year.
 */

export const TAX_YEAR = 2025

// Federal Tax Brackets 2025
// Note: 14.5% is the effective rate for 2025 (15% Jan-Jun, 14% Jul-Dec)
export const FEDERAL_BRACKETS = [
  { min: 0, max: 57375, rate: 0.145 },        // 14.5% effective rate for 2025
  { min: 57375, max: 114750, rate: 0.205 },
  { min: 114750, max: 177882, rate: 0.26 },
  { min: 177882, max: 253414, rate: 0.29 },
  { min: 253414, max: Infinity, rate: 0.33 },
]

// Provincial Tax Brackets 2025
export const PROVINCIAL_BRACKETS: Record<string, { min: number; max: number; rate: number }[]> = {
  // Alberta - New 8% bracket introduced in 2025
  AB: [
    { min: 0, max: 60000, rate: 0.08 },        // NEW 8% bracket for 2025
    { min: 60000, max: 151234, rate: 0.10 },
    { min: 151234, max: 181481, rate: 0.12 },
    { min: 181481, max: 241974, rate: 0.13 },
    { min: 241974, max: 362961, rate: 0.14 },
    { min: 362961, max: Infinity, rate: 0.15 },
  ],
  // British Columbia
  BC: [
    { min: 0, max: 49279, rate: 0.0506 },
    { min: 49279, max: 98560, rate: 0.077 },
    { min: 98560, max: 113158, rate: 0.105 },
    { min: 113158, max: 137407, rate: 0.1229 },
    { min: 137407, max: 186306, rate: 0.147 },
    { min: 186306, max: 259829, rate: 0.168 },
    { min: 259829, max: Infinity, rate: 0.205 },
  ],
  // Manitoba
  MB: [
    { min: 0, max: 47564, rate: 0.108 },
    { min: 47564, max: 101200, rate: 0.1275 },
    { min: 101200, max: Infinity, rate: 0.174 },
  ],
  // New Brunswick
  NB: [
    { min: 0, max: 51306, rate: 0.094 },
    { min: 51306, max: 102614, rate: 0.14 },
    { min: 102614, max: 190060, rate: 0.16 },
    { min: 190060, max: Infinity, rate: 0.195 },
  ],
  // Newfoundland and Labrador
  NL: [
    { min: 0, max: 44192, rate: 0.087 },
    { min: 44192, max: 88382, rate: 0.145 },
    { min: 88382, max: 157792, rate: 0.158 },
    { min: 157792, max: 220910, rate: 0.178 },
    { min: 220910, max: 282214, rate: 0.198 },
    { min: 282214, max: 564429, rate: 0.208 },
    { min: 564429, max: 1128858, rate: 0.213 },
    { min: 1128858, max: Infinity, rate: 0.218 },
  ],
  // Nova Scotia
  NS: [
    { min: 0, max: 29590, rate: 0.0879 },
    { min: 29590, max: 59180, rate: 0.1495 },
    { min: 59180, max: 93000, rate: 0.1667 },
    { min: 93000, max: 150000, rate: 0.175 },
    { min: 150000, max: Infinity, rate: 0.21 },
  ],
  // Northwest Territories
  NT: [
    { min: 0, max: 51964, rate: 0.059 },
    { min: 51964, max: 103930, rate: 0.086 },
    { min: 103930, max: 168967, rate: 0.122 },
    { min: 168967, max: Infinity, rate: 0.1405 },
  ],
  // Nunavut
  NU: [
    { min: 0, max: 54707, rate: 0.04 },
    { min: 54707, max: 109413, rate: 0.07 },
    { min: 109413, max: 177882, rate: 0.09 },
    { min: 177882, max: Infinity, rate: 0.115 },
  ],
  // Ontario
  ON: [
    { min: 0, max: 52886, rate: 0.0505 },
    { min: 52886, max: 105775, rate: 0.0915 },
    { min: 105775, max: 150000, rate: 0.1116 },
    { min: 150000, max: 220000, rate: 0.1216 },
    { min: 220000, max: Infinity, rate: 0.1316 },
  ],
  // Prince Edward Island
  PE: [
    { min: 0, max: 33328, rate: 0.0965 },
    { min: 33328, max: 64656, rate: 0.1363 },
    { min: 64656, max: 105000, rate: 0.1665 },
    { min: 105000, max: 140000, rate: 0.18 },
    { min: 140000, max: Infinity, rate: 0.1875 },
  ],
  // Quebec (Note: Quebec has its own tax system - federal abatement of 16.5% applies)
  QC: [
    { min: 0, max: 53255, rate: 0.14 },
    { min: 53255, max: 106495, rate: 0.19 },
    { min: 106495, max: 129590, rate: 0.24 },
    { min: 129590, max: Infinity, rate: 0.2575 },
  ],
  // Saskatchewan
  SK: [
    { min: 0, max: 53463, rate: 0.105 },
    { min: 53463, max: 152750, rate: 0.125 },
    { min: 152750, max: Infinity, rate: 0.145 },
  ],
  // Yukon
  YT: [
    { min: 0, max: 57375, rate: 0.064 },
    { min: 57375, max: 114750, rate: 0.09 },
    { min: 114750, max: 177882, rate: 0.109 },
    { min: 177882, max: 500000, rate: 0.128 },
    { min: 500000, max: Infinity, rate: 0.15 },
  ],
}

// Ontario Surtax thresholds 2025
export const ONTARIO_SURTAX = {
  threshold1: 7307,  // 20% surtax on tax over this
  threshold2: 9367,  // Additional 36% surtax on tax over this
  rate1: 0.20,
  rate2: 0.36,
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

// ============================================
// RRSP/TFSA/FHSA Limits 2025
// ============================================

export const RRSP_LIMIT_2025 = 32490
export const RRSP_CONTRIBUTION_RATE = 0.18 // 18% of previous year's earned income
export const TFSA_LIMIT_2025 = 7000
export const TFSA_CUMULATIVE_ROOM_2025 = 102000 // Total since 2009 for someone 18+ since 2009

// TFSA annual limits by year (for room calculation)
export const TFSA_ANNUAL_LIMITS: Record<number, number> = {
  2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000,
  2013: 5500, 2014: 5500, 2015: 10000, 2016: 5500,
  2017: 5500, 2018: 5500, 2019: 6000, 2020: 6000,
  2021: 6000, 2022: 6000, 2023: 6500, 2024: 7000,
  2025: 7000,
}

// FHSA (First Home Savings Account) 2025
export const FHSA_ANNUAL_LIMIT = 8000
export const FHSA_LIFETIME_LIMIT = 40000

// ============================================
// Capital Gains 2025
// ============================================
// NOTE: The proposed increase to 66.67% was CANCELLED in March 2025
// Capital gains inclusion rate remains at 50% for all gains
export const CAPITAL_GAINS_INCLUSION_RATE = 0.5
export const LIFETIME_CAPITAL_GAINS_EXEMPTION = 1250000 // Increased to $1.25M in 2024

// ============================================
// Basic Personal Amount 2025
// ============================================
// Federal BPA is income-dependent: $16,129 for income ≤$177,882, phasing out to $14,538 for income >$253,414
export const FEDERAL_BPA_MAX = 16129
export const FEDERAL_BPA_MIN = 14538
export const FEDERAL_BPA_PHASE_OUT_START = 177882
export const FEDERAL_BPA_PHASE_OUT_END = 253414

// For simplicity in calculations, use the base amount
export const FEDERAL_BPA = 16129

export const PROVINCIAL_BPA: Record<string, number> = {
  AB: 22323,  // Increased for 2025
  BC: 13194,
  MB: 15969,
  NB: 13396,
  NL: 10818,
  NS: 8744,
  NT: 17842,
  NU: 19274,
  ON: 12747,
  PE: 14250,
  QC: 18571, // Quebec has its own system
  SK: 18991,
  YT: 16129,
}

// ============================================
// CPP/QPP 2025
// ============================================
export const CPP_MAX_PENSIONABLE_EARNINGS = 71300    // YMPE 2025
export const CPP_BASIC_EXEMPTION = 3500
export const CPP_RATE_EMPLOYEE = 0.0595
export const CPP_MAX_CONTRIBUTION_EMPLOYEE = 4034.10

// CPP2 (Second additional CPP) - on earnings between YMPE and YAMPE
export const CPP2_MAX_EARNINGS = 81200               // YAMPE 2025
export const CPP2_RATE = 0.04
export const CPP2_MAX_CONTRIBUTION_EMPLOYEE = 396.00

// Self-employed rates (double employee rate)
export const CPP_RATE_SELF_EMPLOYED = 0.1190
export const CPP_MAX_CONTRIBUTION_SELF_EMPLOYED = 8068.20
export const CPP2_RATE_SELF_EMPLOYED = 0.08
export const CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED = 792.00

// QPP (Quebec) - slightly different rates
export const QPP_RATE_EMPLOYEE = 0.064
export const QPP_MAX_CONTRIBUTION_EMPLOYEE = 4348.80

// ============================================
// EI 2025
// ============================================
export const EI_MAX_INSURABLE_EARNINGS = 65700
export const EI_RATE_EMPLOYEE = 0.0164              // $1.64 per $100
export const EI_MAX_PREMIUM_EMPLOYEE = 1077.48

// Quebec has reduced EI rate (QPIP handles parental benefits)
export const EI_RATE_EMPLOYEE_QC = 0.0131           // $1.31 per $100
export const EI_MAX_PREMIUM_EMPLOYEE_QC = 860.67

// Employer rates
export const EI_RATE_EMPLOYER = 0.023               // 1.4x employee rate
export const EI_MAX_PREMIUM_EMPLOYER = 1508.47

// Maximum weekly EI benefit (as of Dec 29, 2024)
export const EI_MAX_WEEKLY_BENEFIT = 695

// ============================================
// OAS (Old Age Security) 2025
// ============================================
export const OAS_CLAWBACK_THRESHOLD = 93454         // Clawback starts here
export const OAS_CLAWBACK_RATE = 0.15               // 15 cents per dollar over threshold
export const OAS_MAX_ANNUAL_65_74 = 8820            // Approximate annual max (varies quarterly)
export const OAS_MAX_ANNUAL_75_PLUS = 9702          // 10% higher for 75+
export const OAS_FULL_CLAWBACK_65_74 = 151668       // Full clawback at this income
export const OAS_FULL_CLAWBACK_75_PLUS = 157490     // Full clawback for 75+

// ============================================
// RRSP Withholding Tax Rates (on early withdrawal)
// ============================================
export const RRSP_WITHHOLDING_RATES = {
  federal: [
    { min: 0, max: 5000, rate: 0.10 },
    { min: 5000, max: 15000, rate: 0.20 },
    { min: 15000, max: Infinity, rate: 0.30 },
  ],
  quebec: [
    { min: 0, max: 5000, rate: 0.05 },
    { min: 5000, max: 15000, rate: 0.10 },
    { min: 15000, max: Infinity, rate: 0.15 },
  ],
}

// ============================================
// Home Buyers' Plan (HBP) 2025
// ============================================
export const HBP_WITHDRAWAL_LIMIT = 60000           // Increased from $35,000 in 2024
export const HBP_REPAYMENT_PERIOD = 15              // Years to repay
export const HBP_REPAYMENT_START_YEAR = 2           // Start repaying 2 years after withdrawal

// ============================================
// Dividend Tax Credit Rates 2025 (Federal)
// ============================================
export const DIVIDEND_ELIGIBLE_GROSSUP = 0.38       // 38% gross-up
export const DIVIDEND_ELIGIBLE_CREDIT = 0.150198    // 15.0198% of grossed-up amount (6/11 of gross-up)
export const DIVIDEND_NON_ELIGIBLE_GROSSUP = 0.15   // 15% gross-up
export const DIVIDEND_NON_ELIGIBLE_CREDIT = 0.090301 // 9.0301% of grossed-up amount (9/13 of gross-up)

// Provincial dividend tax credit rates
export const PROVINCIAL_DIVIDEND_CREDITS: Record<string, { eligible: number; nonEligible: number }> = {
  AB: { eligible: 0.0812, nonEligible: 0.0218 },
  BC: { eligible: 0.12, nonEligible: 0.0196 },
  MB: { eligible: 0.08, nonEligible: 0.007835 },
  NB: { eligible: 0.14, nonEligible: 0.0275 },
  NL: { eligible: 0.063, nonEligible: 0.032 },
  NS: { eligible: 0.0885, nonEligible: 0.0299 },
  NT: { eligible: 0.115, nonEligible: 0.06 },
  NU: { eligible: 0.0551, nonEligible: 0.0261 },
  ON: { eligible: 0.10, nonEligible: 0.029863 },
  PE: { eligible: 0.105, nonEligible: 0.026 },
  QC: { eligible: 0.117, nonEligible: 0.0342 },
  SK: { eligible: 0.11, nonEligible: 0.02105 },
  YT: { eligible: 0.1512, nonEligible: 0.0067 },
}

// ============================================
// CPP Retirement Benefit Estimates 2025
// ============================================
export const CPP_MAX_MONTHLY_BENEFIT_65 = 1433.00   // Maximum at age 65 (2025)
export const CPP_AVERAGE_MONTHLY_BENEFIT = 831.92   // Average benefit
export const CPP_EARLY_REDUCTION_PER_MONTH = 0.006  // 0.6% per month before 65 (max 36%)
export const CPP_DELAY_INCREASE_PER_MONTH = 0.007   // 0.7% per month after 65 (max 42%)
export const CPP_EARLIEST_AGE = 60
export const CPP_LATEST_AGE = 70

// ============================================
// Backward Compatibility Exports
// ============================================
export const RRSP_LIMIT_2024 = RRSP_LIMIT_2025
export const TFSA_LIMIT_2024 = TFSA_LIMIT_2025

// ============================================
// Tax Calculation Functions
// ============================================

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
 * Calculate income-dependent federal BPA
 */
export function calculateFederalBPA(income: number): number {
  if (income <= FEDERAL_BPA_PHASE_OUT_START) {
    return FEDERAL_BPA_MAX
  }
  if (income >= FEDERAL_BPA_PHASE_OUT_END) {
    return FEDERAL_BPA_MIN
  }
  // Linear phase-out
  const phaseOutRange = FEDERAL_BPA_PHASE_OUT_END - FEDERAL_BPA_PHASE_OUT_START
  const incomeOverThreshold = income - FEDERAL_BPA_PHASE_OUT_START
  const reduction = (FEDERAL_BPA_MAX - FEDERAL_BPA_MIN) * (incomeOverThreshold / phaseOutRange)
  return FEDERAL_BPA_MAX - reduction
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

  // Apply Ontario surtax
  if (province === 'ON') {
    const provincialBPA = PROVINCIAL_BPA['ON']
    const bpaCredit = provincialBPA * 0.0505
    const taxAfterBPA = Math.max(0, tax - bpaCredit)

    let surtax = 0
    if (taxAfterBPA > ONTARIO_SURTAX.threshold1) {
      surtax += (taxAfterBPA - ONTARIO_SURTAX.threshold1) * ONTARIO_SURTAX.rate1
    }
    if (taxAfterBPA > ONTARIO_SURTAX.threshold2) {
      surtax += (taxAfterBPA - ONTARIO_SURTAX.threshold2) * ONTARIO_SURTAX.rate2
    }
    tax += surtax
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
  // Calculate gross taxes
  const grossFederalTax = calculateFederalTax(income)
  const grossProvincialTax = calculateProvincialTax(income, province)

  // Calculate BPA credits
  const federalBPA = calculateFederalBPA(income)
  const provincialBPA = PROVINCIAL_BPA[province] || 0

  // Federal BPA credit at 14.5% (2025 effective rate)
  const federalBPACredit = federalBPA * 0.145
  // Provincial BPA credit at lowest bracket rate
  const provincialLowestRate = PROVINCIAL_BRACKETS[province]?.[0]?.rate || 0
  const provincialBPACredit = provincialBPA * provincialLowestRate

  // Net taxes after BPA credits (can't go below 0)
  const federalTax = Math.max(0, grossFederalTax - federalBPACredit)
  const provincialTax = Math.max(0, grossProvincialTax - provincialBPACredit)
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
  const newRoom = Math.min(previousYearIncome * RRSP_CONTRIBUTION_RATE, RRSP_LIMIT_2025)
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
  // 50% inclusion rate (proposed increase was cancelled)
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

/**
 * Calculate CPP contributions for an employee
 */
export function calculateCPPContributions(income: number): {
  baseCPP: number
  cpp2: number
  total: number
} {
  // Base CPP on earnings up to YMPE
  const pensionableEarnings = Math.max(0, Math.min(income, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)
  const baseCPP = Math.min(pensionableEarnings * CPP_RATE_EMPLOYEE, CPP_MAX_CONTRIBUTION_EMPLOYEE)

  // CPP2 on earnings between YMPE and YAMPE
  let cpp2 = 0
  if (income > CPP_MAX_PENSIONABLE_EARNINGS) {
    const cpp2Earnings = Math.min(income, CPP2_MAX_EARNINGS) - CPP_MAX_PENSIONABLE_EARNINGS
    cpp2 = Math.min(cpp2Earnings * CPP2_RATE, CPP2_MAX_CONTRIBUTION_EMPLOYEE)
  }

  return {
    baseCPP,
    cpp2,
    total: baseCPP + cpp2,
  }
}

/**
 * Calculate EI premiums
 */
export function calculateEIPremiums(income: number, isQuebec: boolean = false): number {
  const rate = isQuebec ? EI_RATE_EMPLOYEE_QC : EI_RATE_EMPLOYEE
  const max = isQuebec ? EI_MAX_PREMIUM_EMPLOYEE_QC : EI_MAX_PREMIUM_EMPLOYEE
  const insurable = Math.min(income, EI_MAX_INSURABLE_EARNINGS)
  return Math.min(insurable * rate, max)
}

/**
 * Calculate OAS clawback
 */
export function calculateOASClawback(income: number, age: number): {
  oasBenefit: number
  clawback: number
  netOAS: number
} {
  const maxOAS = age >= 75 ? OAS_MAX_ANNUAL_75_PLUS : OAS_MAX_ANNUAL_65_74
  const fullClawbackThreshold = age >= 75 ? OAS_FULL_CLAWBACK_75_PLUS : OAS_FULL_CLAWBACK_65_74

  if (income <= OAS_CLAWBACK_THRESHOLD) {
    return { oasBenefit: maxOAS, clawback: 0, netOAS: maxOAS }
  }

  if (income >= fullClawbackThreshold) {
    return { oasBenefit: maxOAS, clawback: maxOAS, netOAS: 0 }
  }

  const clawback = Math.min((income - OAS_CLAWBACK_THRESHOLD) * OAS_CLAWBACK_RATE, maxOAS)
  return {
    oasBenefit: maxOAS,
    clawback,
    netOAS: maxOAS - clawback,
  }
}

/**
 * Calculate dividend tax
 */
export function calculateDividendTax(
  dividendAmount: number,
  isEligible: boolean,
  otherIncome: number,
  province: string
): {
  grossedUpAmount: number
  federalTax: number
  federalCredit: number
  provincialTax: number
  provincialCredit: number
  netTax: number
  effectiveRate: number
} {
  const grossUp = isEligible ? DIVIDEND_ELIGIBLE_GROSSUP : DIVIDEND_NON_ELIGIBLE_GROSSUP
  const federalCreditRate = isEligible ? DIVIDEND_ELIGIBLE_CREDIT : DIVIDEND_NON_ELIGIBLE_CREDIT

  const grossedUpAmount = dividendAmount * (1 + grossUp)
  const totalIncome = otherIncome + grossedUpAmount

  // Calculate taxes
  const taxWithDiv = calculateTotalTax(totalIncome, province)
  const taxWithoutDiv = calculateTotalTax(otherIncome, province)

  // Federal dividend tax credit
  const federalCredit = grossedUpAmount * federalCreditRate

  // Provincial dividend tax credit
  const provCredits = PROVINCIAL_DIVIDEND_CREDITS[province]
  const provincialCreditRate = isEligible ? provCredits?.eligible || 0 : provCredits?.nonEligible || 0
  const provincialCredit = grossedUpAmount * provincialCreditRate

  const grossTax = taxWithDiv.totalTax - taxWithoutDiv.totalTax
  const netTax = Math.max(0, grossTax - federalCredit - provincialCredit)

  return {
    grossedUpAmount,
    federalTax: taxWithDiv.federalTax - taxWithoutDiv.federalTax,
    federalCredit,
    provincialTax: taxWithDiv.provincialTax - taxWithoutDiv.provincialTax,
    provincialCredit,
    netTax,
    effectiveRate: dividendAmount > 0 ? netTax / dividendAmount : 0,
  }
}

/**
 * Calculate RRSP withholding tax on withdrawal
 */
export function calculateRRSPWithholding(amount: number, isQuebec: boolean = false): {
  federalWithholding: number
  provincialWithholding: number
  totalWithholding: number
  netAmount: number
} {
  const federalRates = RRSP_WITHHOLDING_RATES.federal
  let federalWithholding = 0

  for (const bracket of federalRates) {
    if (amount <= bracket.min) continue
    const taxableInBracket = Math.min(amount, bracket.max) - bracket.min
    federalWithholding = taxableInBracket * bracket.rate
  }

  let provincialWithholding = 0
  if (isQuebec) {
    const qcRates = RRSP_WITHHOLDING_RATES.quebec
    for (const bracket of qcRates) {
      if (amount <= bracket.min) continue
      const taxableInBracket = Math.min(amount, bracket.max) - bracket.min
      provincialWithholding = taxableInBracket * bracket.rate
    }
  }

  const totalWithholding = federalWithholding + provincialWithholding

  return {
    federalWithholding,
    provincialWithholding,
    totalWithholding,
    netAmount: amount - totalWithholding,
  }
}

/**
 * Estimate CPP retirement benefit
 */
export function estimateCPPBenefit(
  startAge: number,
  yearsContributed: number,
  avgEarningsPercentOfYMPE: number = 1 // 1 = max earnings each year
): number {
  // Base calculation assumes starting at 65
  const baseAmount = CPP_MAX_MONTHLY_BENEFIT_65 * avgEarningsPercentOfYMPE * (yearsContributed / 39)

  // Adjust for early/late start
  let adjustment = 1
  if (startAge < 65) {
    const monthsEarly = (65 - startAge) * 12
    adjustment = 1 - (monthsEarly * CPP_EARLY_REDUCTION_PER_MONTH)
  } else if (startAge > 65) {
    const monthsLate = (startAge - 65) * 12
    adjustment = 1 + (monthsLate * CPP_DELAY_INCREASE_PER_MONTH)
  }

  return Math.min(baseAmount * adjustment, CPP_MAX_MONTHLY_BENEFIT_65 * adjustment)
}
