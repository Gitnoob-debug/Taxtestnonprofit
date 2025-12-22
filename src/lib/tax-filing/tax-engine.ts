/**
 * Tax Calculation Engine
 * Calculates federal and provincial taxes, credits, and generates T1 form data
 */

import {
  TaxReturn,
  TaxCalculation,
  T1FormData,
  TaxOptimization,
  Province,
  T4Slip,
  T5Slip,
  CapitalGain,
  SelfEmploymentIncome,
  RentalIncome
} from './types'

import {
  FEDERAL_BRACKETS,
  PROVINCIAL_BRACKETS,
  FEDERAL_BPA,
  FEDERAL_BPA_MAX,
  FEDERAL_BPA_MIN,
  FEDERAL_BPA_PHASE_OUT_START,
  FEDERAL_BPA_PHASE_OUT_END,
  PROVINCIAL_BPA,
  ONTARIO_SURTAX,
  CAPITAL_GAINS_INCLUSION_RATE,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_BASIC_EXEMPTION,
  CPP_RATE_EMPLOYEE,
  CPP_MAX_CONTRIBUTION_EMPLOYEE,
  CPP2_MAX_EARNINGS,
  CPP2_RATE,
  CPP2_MAX_CONTRIBUTION_EMPLOYEE,
  CPP_RATE_SELF_EMPLOYED,
  CPP_MAX_CONTRIBUTION_SELF_EMPLOYED,
  EI_MAX_INSURABLE_EARNINGS,
  EI_RATE_EMPLOYEE,
  EI_MAX_PREMIUM_EMPLOYEE,
  EI_RATE_EMPLOYEE_QC,
  EI_MAX_PREMIUM_EMPLOYEE_QC,
  RRSP_LIMIT_2025,
  DIVIDEND_ELIGIBLE_GROSSUP,
  DIVIDEND_ELIGIBLE_CREDIT,
  DIVIDEND_NON_ELIGIBLE_GROSSUP,
  DIVIDEND_NON_ELIGIBLE_CREDIT,
  PROVINCIAL_DIVIDEND_CREDITS
} from '../canadianTaxData'

// ============================================
// Income Calculations
// ============================================

export function calculateTotalEmploymentIncome(t4Slips: T4Slip[]): number {
  return t4Slips.reduce((sum, slip) => sum + (slip.box14_employmentIncome || 0), 0)
}

export function calculateTotalT4TaxDeducted(t4Slips: T4Slip[]): number {
  return t4Slips.reduce((sum, slip) => sum + (slip.box22_incomeTaxDeducted || 0), 0)
}

export function calculateTotalCPPDeducted(t4Slips: T4Slip[]): number {
  return t4Slips.reduce((sum, slip) => sum + (slip.box16_cpp || 0) + (slip.box17_cpp2 || 0), 0)
}

export function calculateTotalEIDeducted(t4Slips: T4Slip[]): number {
  return t4Slips.reduce((sum, slip) => sum + (slip.box18_ei || 0), 0)
}

export function calculateDividendIncome(t5Slips: T5Slip[]): {
  actualEligible: number
  taxableEligible: number
  actualNonEligible: number
  taxableNonEligible: number
  totalTaxable: number
  interest: number
} {
  let actualEligible = 0
  let taxableEligible = 0
  let actualNonEligible = 0
  let taxableNonEligible = 0
  let interest = 0

  for (const slip of t5Slips) {
    actualEligible += slip.box10_actualDividends || 0
    taxableEligible += slip.box11_taxableDividends || 0
    actualNonEligible += slip.box24_actualNonEligibleDividends || 0
    taxableNonEligible += slip.box25_taxableNonEligibleDividends || 0
    interest += (slip.box13_interestFromBonds || 0) + (slip.box14_otherInterest || 0)
  }

  // If taxable amounts not provided, calculate gross-up
  if (taxableEligible === 0 && actualEligible > 0) {
    taxableEligible = actualEligible * (1 + DIVIDEND_ELIGIBLE_GROSSUP)
  }
  if (taxableNonEligible === 0 && actualNonEligible > 0) {
    taxableNonEligible = actualNonEligible * (1 + DIVIDEND_NON_ELIGIBLE_GROSSUP)
  }

  return {
    actualEligible,
    taxableEligible,
    actualNonEligible,
    taxableNonEligible,
    totalTaxable: taxableEligible + taxableNonEligible,
    interest
  }
}

export function calculateCapitalGainsIncome(gains: CapitalGain[]): {
  totalGains: number
  totalLosses: number
  netGain: number
  taxableGain: number
} {
  let totalGains = 0
  let totalLosses = 0

  for (const gain of gains) {
    const netGain = gain.proceeds - gain.acb - (gain.outlays || 0)
    if (netGain > 0) {
      totalGains += netGain
    } else {
      totalLosses += Math.abs(netGain)
    }
  }

  const netGain = Math.max(0, totalGains - totalLosses)
  const taxableGain = netGain * CAPITAL_GAINS_INCLUSION_RATE

  return {
    totalGains,
    totalLosses,
    netGain,
    taxableGain
  }
}

export function calculateSelfEmploymentIncome(businesses: SelfEmploymentIncome[]): {
  grossIncome: number
  totalExpenses: number
  netIncome: number
} {
  let grossIncome = 0
  let totalExpenses = 0
  let netIncome = 0

  for (const biz of businesses) {
    grossIncome += biz.grossRevenue
    const expenses = Object.values(biz.expenses || {}).reduce((sum, val) => sum + (val || 0), 0)
    totalExpenses += expenses
    netIncome += biz.grossRevenue - expenses - (biz.ccaClaimed || 0)
  }

  return { grossIncome, totalExpenses, netIncome }
}

export function calculateRentalIncome(properties: RentalIncome[]): {
  grossRents: number
  totalExpenses: number
  netIncome: number
} {
  let grossRents = 0
  let totalExpenses = 0
  let netIncome = 0

  for (const prop of properties) {
    grossRents += prop.grossRents * (prop.ownershipPercentage / 100)
    const expenses = Object.values(prop.expenses || {}).reduce((sum, val) => sum + (val || 0), 0)
    totalExpenses += expenses * (prop.ownershipPercentage / 100)
    netIncome += (prop.grossRents - expenses) * (prop.ownershipPercentage / 100)
  }

  return { grossRents, totalExpenses, netIncome }
}

// ============================================
// Tax Bracket Calculations
// ============================================

export function calculateFederalTaxOnIncome(taxableIncome: number): number {
  let tax = 0
  let remaining = taxableIncome

  for (const bracket of FEDERAL_BRACKETS) {
    if (remaining <= 0) break
    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remaining -= taxableInBracket
  }

  return tax
}

export function calculateProvincialTaxOnIncome(taxableIncome: number, province: Province): number {
  const brackets = PROVINCIAL_BRACKETS[province]
  if (!brackets) return 0

  let tax = 0
  let remaining = taxableIncome

  for (const bracket of brackets) {
    if (remaining <= 0) break
    const taxableInBracket = Math.min(remaining, bracket.max - bracket.min)
    tax += taxableInBracket * bracket.rate
    remaining -= taxableInBracket
  }

  // Ontario surtax
  if (province === 'ON') {
    let surtax = 0
    if (tax > ONTARIO_SURTAX.threshold1) {
      surtax += (tax - ONTARIO_SURTAX.threshold1) * ONTARIO_SURTAX.rate1
    }
    if (tax > ONTARIO_SURTAX.threshold2) {
      surtax += (tax - ONTARIO_SURTAX.threshold2) * ONTARIO_SURTAX.rate2
    }
    tax += surtax
  }

  return tax
}

export function getFederalBPA(netIncome: number): number {
  if (netIncome <= FEDERAL_BPA_PHASE_OUT_START) {
    return FEDERAL_BPA_MAX
  }
  if (netIncome >= FEDERAL_BPA_PHASE_OUT_END) {
    return FEDERAL_BPA_MIN
  }
  const ratio = (netIncome - FEDERAL_BPA_PHASE_OUT_START) / (FEDERAL_BPA_PHASE_OUT_END - FEDERAL_BPA_PHASE_OUT_START)
  return FEDERAL_BPA_MAX - (FEDERAL_BPA_MAX - FEDERAL_BPA_MIN) * ratio
}

export function getProvincialBPA(province: Province): number {
  return PROVINCIAL_BPA[province] || 0
}

export function getMarginalRate(taxableIncome: number, province: Province): number {
  const federalBracket = FEDERAL_BRACKETS.find(b => taxableIncome <= b.max) || FEDERAL_BRACKETS[FEDERAL_BRACKETS.length - 1]
  const provincialBrackets = PROVINCIAL_BRACKETS[province] || []
  const provincialBracket = provincialBrackets.find(b => taxableIncome <= b.max) || provincialBrackets[provincialBrackets.length - 1]

  return (federalBracket?.rate || 0) + (provincialBracket?.rate || 0)
}

// ============================================
// Credit Calculations
// ============================================

export function calculateDividendTaxCredit(
  taxableEligible: number,
  taxableNonEligible: number,
  province: Province
): { federal: number; provincial: number } {
  const federalEligibleCredit = taxableEligible * DIVIDEND_ELIGIBLE_CREDIT
  const federalNonEligibleCredit = taxableNonEligible * DIVIDEND_NON_ELIGIBLE_CREDIT

  const provCredits = PROVINCIAL_DIVIDEND_CREDITS[province] || { eligible: 0, nonEligible: 0 }
  const provincialEligibleCredit = taxableEligible * provCredits.eligible
  const provincialNonEligibleCredit = taxableNonEligible * provCredits.nonEligible

  return {
    federal: federalEligibleCredit + federalNonEligibleCredit,
    provincial: provincialEligibleCredit + provincialNonEligibleCredit
  }
}

export function calculateMedicalExpenseCredit(
  medicalExpenses: number,
  netIncome: number,
  province: Province
): { federal: number; provincial: number } {
  // Threshold is lesser of 3% of net income or $2,759 (2024)
  const threshold = Math.min(netIncome * 0.03, 2759)
  const claimableAmount = Math.max(0, medicalExpenses - threshold)

  // Federal credit at 15%
  const federal = claimableAmount * 0.15

  // Provincial credit at lowest bracket rate
  const provBrackets = PROVINCIAL_BRACKETS[province]
  const provRate = provBrackets?.[0]?.rate || 0
  const provincial = claimableAmount * provRate

  return { federal, provincial }
}

export function calculateDonationCredit(
  donations: number,
  taxableIncome: number,
  province: Province
): { federal: number; provincial: number } {
  // Federal: 15% on first $200, 29% or 33% on rest
  let federal = 0
  if (donations > 0) {
    const first200 = Math.min(donations, 200)
    const over200 = Math.max(0, donations - 200)

    federal = first200 * 0.15

    // 33% rate applies if taxable income > $253,414 (top bracket)
    if (taxableIncome > 253414) {
      federal += over200 * 0.33
    } else {
      federal += over200 * 0.29
    }
  }

  // Provincial rates vary - simplified calculation
  const provBrackets = PROVINCIAL_BRACKETS[province]
  const provLowRate = provBrackets?.[0]?.rate || 0
  const provHighRate = provBrackets?.[provBrackets.length - 1]?.rate || 0

  let provincial = 0
  if (donations > 0) {
    const first200 = Math.min(donations, 200)
    const over200 = Math.max(0, donations - 200)
    provincial = first200 * provLowRate + over200 * provHighRate
  }

  return { federal, provincial }
}

// ============================================
// CPP/EI for Self-Employed
// ============================================

export function calculateSelfEmployedCPP(netSelfEmploymentIncome: number): {
  baseCPP: number
  cpp2: number
  total: number
  deductiblePortion: number
} {
  const pensionableEarnings = Math.max(0, Math.min(netSelfEmploymentIncome, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)
  const baseCPP = Math.min(pensionableEarnings * CPP_RATE_SELF_EMPLOYED, CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)

  let cpp2 = 0
  if (netSelfEmploymentIncome > CPP_MAX_PENSIONABLE_EARNINGS) {
    const cpp2Earnings = Math.min(netSelfEmploymentIncome, CPP2_MAX_EARNINGS) - CPP_MAX_PENSIONABLE_EARNINGS
    cpp2 = Math.min(cpp2Earnings * CPP2_RATE * 2, CPP2_MAX_CONTRIBUTION_EMPLOYEE * 2) // Self-employed pays both portions
  }

  const total = baseCPP + cpp2
  // Half of self-employed CPP is deductible from income
  const deductiblePortion = total / 2

  return { baseCPP, cpp2, total, deductiblePortion }
}

// ============================================
// Main Tax Calculation
// ============================================

export function calculateTaxReturn(taxReturn: TaxReturn): TaxCalculation {
  const { income, deductions, credits, personalInfo, spouse } = taxReturn
  const province = personalInfo.provinceOfResidence

  // ============================================
  // Step 1: Calculate Total Income (Line 15000)
  // ============================================

  // Employment income (T4s)
  const employmentIncome = calculateTotalEmploymentIncome(income.t4Slips)

  // Pension income (T4A, T4A(OAS), T4A(P))
  const pensionT4A = income.t4aSlips.reduce((sum, s) => sum + (s.box016_pension || 0) + (s.box024_annuities || 0), 0)
  const oasPension = income.t4aoasSlips.reduce((sum, s) => sum + (s.box21_netOas || 0), 0)
  const cppBenefits = income.t4apSlips.reduce((sum, s) => sum + (s.box20_cppRetirement || 0) + (s.box14_cppDisability || 0), 0)

  // EI benefits
  const eiBenefits = income.t4eSlips.reduce((sum, s) => sum + (s.box21_totalBenefits || 0), 0)

  // Investment income
  const dividendCalc = calculateDividendIncome(income.t5Slips)
  const capitalGainsCalc = calculateCapitalGainsIncome(income.capitalGains)

  // Self-employment
  const selfEmpCalc = calculateSelfEmploymentIncome(income.selfEmployment)

  // Rental income
  const rentalCalc = calculateRentalIncome(income.rental)

  // RRSP/RRIF income
  const rrifIncome = income.other.line12900_rrifIncome || 0
  const rrspIncome = income.other.line15000_rrspIncome || 0

  // Other income
  const otherIncome = (income.other.line13000_otherEmployment || 0) +
    (income.other.line14300_otherTaxable || 0)

  // Total Income (Line 15000)
  const totalIncome =
    employmentIncome +
    pensionT4A +
    oasPension +
    cppBenefits +
    eiBenefits +
    dividendCalc.totalTaxable +
    dividendCalc.interest +
    capitalGainsCalc.taxableGain +
    selfEmpCalc.netIncome +
    rentalCalc.netIncome +
    rrifIncome +
    rrspIncome +
    otherIncome

  // ============================================
  // Step 2: Calculate Net Income (Line 23600)
  // ============================================

  // RRSP deduction
  const rrspDeduction = Math.min(
    deductions.line20800_rrspContribution || 0,
    deductions.rrspContributionRoom || RRSP_LIMIT_2025
  )

  // Self-employed CPP deductible portion
  const selfEmpCPP = calculateSelfEmployedCPP(selfEmpCalc.netIncome)

  // Other deductions
  const totalDeductions =
    rrspDeduction +
    (deductions.line20810_fhsaContribution || 0) +
    (deductions.line21200_unionDues || 0) +
    (deductions.line21400_childCareExpenses || 0) +
    (deductions.line21500_disabilitySupports || 0) +
    (deductions.line21900_movingExpenses || 0) +
    (deductions.line22000_supportPayments || 0) +
    (deductions.line22100_carryingCharges || 0) +
    selfEmpCPP.deductiblePortion +
    (deductions.line22900_employmentExpenses || 0) +
    (deductions.line23200_otherDeductions || 0)

  const netIncome = Math.max(0, totalIncome - totalDeductions)

  // ============================================
  // Step 3: Calculate Taxable Income (Line 26000)
  // ============================================

  // For simplicity, taxable income = net income (no loss carryforwards, etc.)
  const taxableIncome = netIncome

  // ============================================
  // Step 4: Calculate Federal Tax
  // ============================================

  const grossFederalTax = calculateFederalTaxOnIncome(taxableIncome)

  // Non-refundable credits
  const federalBPA = getFederalBPA(netIncome)

  // CPP/EI credits from T4s
  const cppFromT4 = calculateTotalCPPDeducted(income.t4Slips)
  const eiFromT4 = calculateTotalEIDeducted(income.t4Slips)

  // Pension income amount (max $2000 on eligible pension income)
  const eligiblePensionIncome = pensionT4A + rrifIncome + cppBenefits
  const pensionAmount = Math.min(eligiblePensionIncome, 2000)

  // Age amount (if 65+)
  const birthYear = personalInfo.dateOfBirth ? parseInt(personalInfo.dateOfBirth.split('-')[0]) : 0
  const age = taxReturn.taxYear - birthYear
  let ageAmount = 0
  if (age >= 65) {
    const maxAgeAmount = 8790 // 2024
    const threshold = 44325
    if (netIncome <= threshold) {
      ageAmount = maxAgeAmount
    } else {
      ageAmount = Math.max(0, maxAgeAmount - (netIncome - threshold) * 0.15)
    }
  }

  // Spouse amount
  let spouseAmount = 0
  if (spouse && (personalInfo.maritalStatus === 'married' || personalInfo.maritalStatus === 'common-law')) {
    const spouseNetIncome = spouse.netIncome || 0
    if (spouseNetIncome < federalBPA) {
      spouseAmount = federalBPA - spouseNetIncome
    }
  }

  // Medical expenses credit
  const medicalCredit = calculateMedicalExpenseCredit(
    credits.line33099_medicalExpenses || 0,
    netIncome,
    province
  )

  // Donation credit
  const donationCredit = calculateDonationCredit(
    credits.line34900_donations || 0,
    taxableIncome,
    province
  )

  // Dividend tax credit
  const dividendCredit = calculateDividendTaxCredit(
    dividendCalc.taxableEligible,
    dividendCalc.taxableNonEligible,
    province
  )

  // Total federal non-refundable credits
  const totalFederalCredits =
    federalBPA * 0.15 +
    ageAmount * 0.15 +
    spouseAmount * 0.15 +
    pensionAmount * 0.15 +
    cppFromT4 * 0.15 +
    selfEmpCPP.total * 0.5 * 0.15 + // Creditable portion of self-emp CPP
    eiFromT4 * 0.15 +
    (credits.line31600_disabilitySelf || 0) * 0.15 +
    (credits.line32300_tuition || 0) * 0.15 +
    medicalCredit.federal +
    donationCredit.federal +
    dividendCredit.federal

  const netFederalTax = Math.max(0, grossFederalTax - totalFederalCredits)

  // ============================================
  // Step 5: Calculate Provincial Tax
  // ============================================

  const grossProvincialTax = calculateProvincialTaxOnIncome(taxableIncome, province)

  const provincialBPA = getProvincialBPA(province)
  const provLowestRate = PROVINCIAL_BRACKETS[province]?.[0]?.rate || 0

  const totalProvincialCredits =
    provincialBPA * provLowestRate +
    ageAmount * provLowestRate +
    spouseAmount * provLowestRate +
    pensionAmount * provLowestRate +
    cppFromT4 * provLowestRate +
    eiFromT4 * provLowestRate +
    medicalCredit.provincial +
    donationCredit.provincial +
    dividendCredit.provincial

  const netProvincialTax = Math.max(0, grossProvincialTax - totalProvincialCredits)

  // ============================================
  // Step 6: Total Tax and Balance
  // ============================================

  const totalTax = netFederalTax + netProvincialTax + selfEmpCPP.total

  // Tax already deducted at source
  const taxDeductedAtSource =
    calculateTotalT4TaxDeducted(income.t4Slips) +
    income.t4aSlips.reduce((sum, s) => sum + (s.box022_incomeTaxDeducted || 0), 0) +
    income.t4aoasSlips.reduce((sum, s) => sum + (s.box18_taxDeducted || 0), 0) +
    income.t4apSlips.reduce((sum, s) => sum + (s.box22_incomeTaxDeducted || 0), 0) +
    income.t4eSlips.reduce((sum, s) => sum + (s.box22_incomeTaxDeducted || 0), 0)

  // Balance owing or refund
  const balanceOwing = totalTax - taxDeductedAtSource
  const refund = balanceOwing < 0 ? Math.abs(balanceOwing) : 0

  // Rates
  const effectiveRate = totalIncome > 0 ? totalTax / totalIncome : 0
  const marginalRate = getMarginalRate(taxableIncome, province)

  // ============================================
  // Step 7: Optimization Suggestions
  // ============================================

  const optimizations: TaxOptimization[] = []

  // RRSP suggestion
  const rrspRoom = deductions.rrspContributionRoom || RRSP_LIMIT_2025
  const rrspUsed = deductions.line20800_rrspContribution || 0
  const unusedRRSP = rrspRoom - rrspUsed
  if (unusedRRSP > 1000 && balanceOwing > 0) {
    const potentialSavings = unusedRRSP * marginalRate
    optimizations.push({
      type: 'rrsp',
      description: `You have $${unusedRRSP.toLocaleString()} in unused RRSP room`,
      potentialSavings,
      actionRequired: `Contribute to your RRSP before March 1 to reduce your ${taxReturn.taxYear} taxes`
    })
  }

  // FHSA suggestion (if no contribution and eligible)
  if (!deductions.line20810_fhsaContribution && age < 71) {
    optimizations.push({
      type: 'fhsa',
      description: 'First Home Savings Account not used',
      potentialSavings: 8000 * marginalRate,
      actionRequired: 'Consider opening an FHSA for up to $8,000/year tax deduction'
    })
  }

  return {
    totalIncome,
    netIncome,
    taxableIncome,
    federalTax: netFederalTax,
    provincialTax: netProvincialTax,
    totalTax,
    totalNonRefundableCredits: totalFederalCredits + totalProvincialCredits,
    federalCreditsValue: totalFederalCredits,
    provincialCreditsValue: totalProvincialCredits,
    taxDeductedAtSource,
    cppContributed: cppFromT4 + selfEmpCPP.total,
    eiContributed: eiFromT4,
    balanceOwing: Math.max(0, balanceOwing),
    refund,
    effectiveRate,
    marginalRate,
    optimizations
  }
}

// ============================================
// Generate T1 Form Data
// ============================================

export function generateT1FormData(taxReturn: TaxReturn, calculation: TaxCalculation): T1FormData {
  const { income, deductions, credits, personalInfo, spouse } = taxReturn
  const province = personalInfo.provinceOfResidence

  // Employment income
  const employmentIncome = calculateTotalEmploymentIncome(income.t4Slips)

  // Investment income
  const dividendCalc = calculateDividendIncome(income.t5Slips)
  const capitalGainsCalc = calculateCapitalGainsIncome(income.capitalGains)

  // Self-employment
  const selfEmpCalc = calculateSelfEmploymentIncome(income.selfEmployment)
  const selfEmpCPP = calculateSelfEmployedCPP(selfEmpCalc.netIncome)

  // Pension income
  const pensionT4A = income.t4aSlips.reduce((sum, s) => sum + (s.box016_pension || 0) + (s.box024_annuities || 0), 0)
  const oasPension = income.t4aoasSlips.reduce((sum, s) => sum + (s.box21_netOas || 0), 0)
  const cppBenefits = income.t4apSlips.reduce((sum, s) => sum + (s.box20_cppRetirement || 0), 0)
  const eiBenefits = income.t4eSlips.reduce((sum, s) => sum + (s.box21_totalBenefits || 0), 0)

  // CPP/EI from T4s
  const cppFromT4 = calculateTotalCPPDeducted(income.t4Slips)
  const eiFromT4 = calculateTotalEIDeducted(income.t4Slips)

  // Federal BPA
  const federalBPA = getFederalBPA(calculation.netIncome)

  return {
    identification: personalInfo,
    spouse,

    income: {
      line10100_employmentIncome: employmentIncome,
      line10400_otherEmployment: income.other.line13000_otherEmployment || 0,
      line11300_oasPension: oasPension,
      line11400_cppBenefits: cppBenefits,
      line11500_otherPensions: pensionT4A,
      line11900_eiBenefits: eiBenefits,
      line12000_taxableDividends: dividendCalc.totalTaxable,
      line12100_interestIncome: dividendCalc.interest,
      line12200_partnershipIncome: income.other.line13700_partnershipIncome || 0,
      line12700_capitalGains: capitalGainsCalc.taxableGain,
      line12900_rrifIncome: income.other.line12900_rrifIncome || 0,
      line13000_otherIncome: income.other.line14300_otherTaxable || 0,
      line13500_selfEmploymentGross: selfEmpCalc.grossIncome,
      line13700_selfEmploymentNet: selfEmpCalc.netIncome,
      line14100_workersComp: income.other.line14400_workersCompensation || 0,
      line14300_socialAssistance: income.other.line14500_socialAssistance || 0,
      line15000_totalIncome: calculation.totalIncome
    },

    netIncome: {
      line20800_rrspDeduction: deductions.line20800_rrspContribution || 0,
      line21000_splittingDeduction: 0, // Pension income splitting - complex
      line21200_unionDues: deductions.line21200_unionDues || 0,
      line21400_childCare: deductions.line21400_childCareExpenses || 0,
      line21500_disabilitySupports: deductions.line21500_disabilitySupports || 0,
      line21700_businessLosses: 0,
      line21900_movingExpenses: deductions.line21900_movingExpenses || 0,
      line22000_supportPayments: deductions.line22000_supportPayments || 0,
      line22100_carryingCharges: deductions.line22100_carryingCharges || 0,
      line22200_cppSelfEmployed: selfEmpCPP.deductiblePortion,
      line22400_explorationExpenses: deductions.line22400_explorationExpenses || 0,
      line22900_otherEmploymentExpenses: deductions.line22900_employmentExpenses || 0,
      line23200_otherDeductions: deductions.line23200_otherDeductions || 0,
      line23400_netIncomeBeforeAdj: calculation.netIncome,
      line23500_socialBenefitsRepay: 0,
      line23600_netIncome: calculation.netIncome
    },

    taxableIncome: {
      line24400_canadianForcesRelief: 0,
      line24900_securityOptionsDeduction: 0,
      line25000_otherPaymentsDeduction: 0,
      line25100_limitedPartnershipLosses: 0,
      line25200_nonCapitalLosses: 0,
      line25300_netCapitalLosses: 0,
      line25400_capitalGainsDeduction: 0,
      line25500_northernResidentsDeduction: 0,
      line25600_additionalDeductions: 0,
      line26000_taxableIncome: calculation.taxableIncome
    },

    summary: {
      line30000_basicPersonalAmount: federalBPA,
      line35000_totalNonRefundableCredits: calculation.totalNonRefundableCredits,
      line42000_netFederalTax: calculation.federalTax,
      line42100_cppSelfEmployedContrib: selfEmpCPP.total,
      line42120_eiSelfEmployedPremiums: 0,
      line43500_totalPayable: calculation.totalTax,
      line43700_totalIncomeDeducted: calculation.taxDeductedAtSource,
      line44000_refundableCredits: 0,
      line48200_totalCredits: calculation.taxDeductedAtSource,
      line48400_refundOrOwing: calculation.balanceOwing > 0 ? calculation.balanceOwing : -calculation.refund
    }
  }
}

// ============================================
// Export for use in components
// ============================================

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount)
}

export function formatPercent(rate: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(rate)
}
