// Tax Time Machine Detection Rules
// These rules identify missed deductions and credits based on NOA data and profile answers

import {
  FindingType,
  Confidence,
  Priority,
  TimeMachineProfile,
  NOAData,
  FindingEvidence,
} from './types'

export interface DetectionRule {
  id: FindingType
  name: string
  description: string
  // Which years this rule applies to (some are year-specific like COVID home office)
  applicableYears?: number[]
  // Check if this rule should run based on profile/NOA data
  shouldCheck: (profile: Partial<TimeMachineProfile>, noa: Partial<NOAData> | null, year: number) => boolean
  // Run the detection and return potential finding
  detect: (profile: Partial<TimeMachineProfile>, noa: Partial<NOAData> | null, year: number) => DetectionResult | null
}

export interface DetectionResult {
  findingType: FindingType
  title: string
  description: string
  potentialRecoveryMin: number
  potentialRecoveryMax: number
  confidence: Confidence
  priority: Priority
  evidence: FindingEvidence
  requirements: string[]
}

// COVID Home Office (2020-2024) - Simplified $2/day method
const homeOfficeRule: DetectionRule = {
  id: 'home_office',
  name: 'Home Office Expenses',
  description: 'Work from home deduction (simplified method)',
  applicableYears: [2020, 2021, 2022, 2023, 2024],
  shouldCheck: (profile, _noa, year) => {
    // Check if worked from home and year is applicable
    return profile.worked_from_home === true && year >= 2020
  },
  detect: (profile, noa, year) => {
    const workDays = profile.work_from_home_days || 200 // Default to ~200 working days
    const ratePerDay = year >= 2023 ? 2 : 2 // $2/day for all COVID years
    const maxDeduction = year >= 2023 ? 500 : 500 // Max $500

    // Check if home office was already claimed (Line 22900)
    const claimedAmount = noa?.line_data?.['line_22900'] || 0

    if (claimedAmount > 0) {
      return null // Already claimed
    }

    const potentialDeduction = Math.min(workDays * ratePerDay, maxDeduction)

    // Calculate tax savings (estimate based on income)
    const income = profile.net_income || noa?.net_income || 50000
    const marginalRate = getMarginalRate(income, profile.province || 'ON')
    const minSavings = Math.round(potentialDeduction * 0.2) // Conservative 20% rate
    const maxSavings = Math.round(potentialDeduction * marginalRate)

    return {
      findingType: 'home_office',
      title: `Home Office Expenses - ${year}`,
      description: `You indicated working from home in ${year}, but we don't see a home office deduction claimed. The CRA's simplified method allows $2/day up to $500 without receipts.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'high' : 'medium',
      priority: 'high',
      evidence: {
        profile_answers: [
          { question: 'Worked from home', answer: true },
          { question: 'Estimated work days', answer: workDays },
        ],
        noa_data: noa ? {
          line_number: 'Line 22900',
          claimed_amount: claimedAmount,
          expected_amount: potentialDeduction,
        } : undefined,
        calculation: {
          method: 'simplified_home_office',
          inputs: { workDays, ratePerDay, maxDeduction },
          result: potentialDeduction,
        },
      },
      requirements: [
        'Confirm number of days worked from home',
        year <= 2022 ? 'T2200S or T2200 form from employer (or use simplified method)' : 'T2200 form from employer (or use flat rate method)',
        'File T1-ADJ amendment request',
      ],
    }
  },
}

// Medical Expenses
const medicalExpensesRule: DetectionRule = {
  id: 'medical_expenses',
  name: 'Medical Expenses',
  description: 'Unclaimed medical expenses credit',
  shouldCheck: (profile) => profile.had_medical_expenses === true,
  detect: (profile, noa, year) => {
    const medicalAmount = profile.medical_expense_amount || 3000
    const income = profile.net_income || noa?.net_income || 50000

    // Check if medical expenses were claimed (Line 33099)
    const claimedAmount = noa?.line_data?.['line_33099'] || 0

    // Medical expense threshold is 3% of net income or $2,759 (2024), whichever is less
    const thresholdPercent = 0.03
    const fixedThreshold = year >= 2024 ? 2759 : year >= 2023 ? 2635 : 2479
    const threshold = Math.min(income * thresholdPercent, fixedThreshold)

    // If already claimed a significant amount, skip
    if (claimedAmount > threshold) {
      return null
    }

    const claimableAmount = Math.max(0, medicalAmount - threshold)
    if (claimableAmount <= 0) {
      return null
    }

    // Medical credit is 15% federal + provincial rate
    const creditRate = 0.15 + getProvincialCreditRate(profile.province || 'ON')
    const minSavings = Math.round(claimableAmount * 0.15)
    const maxSavings = Math.round(claimableAmount * creditRate)

    return {
      findingType: 'medical_expenses',
      title: `Medical Expenses - ${year}`,
      description: `You indicated having medical expenses of $${medicalAmount.toLocaleString()} in ${year}. After the ${(thresholdPercent * 100).toFixed(0)}% threshold, you could claim $${claimableAmount.toLocaleString()} as a non-refundable tax credit.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'medium' : 'low',
      priority: medicalAmount > 5000 ? 'high' : 'medium',
      evidence: {
        profile_answers: [
          { question: 'Had medical expenses', answer: true },
          { question: 'Medical expense amount', answer: medicalAmount },
        ],
        noa_data: noa ? {
          line_number: 'Line 33099',
          claimed_amount: claimedAmount,
          expected_amount: medicalAmount,
        } : undefined,
        calculation: {
          method: 'medical_expense_credit',
          inputs: { medicalAmount, threshold, creditRate },
          result: claimableAmount,
        },
      },
      requirements: [
        'Gather medical receipts and documentation',
        'Calculate total eligible medical expenses',
        'File T1-ADJ with Line 33099 claim',
      ],
    }
  },
}

// RRSP Contribution Room
const rrspRoomRule: DetectionRule = {
  id: 'rrsp_room',
  name: 'RRSP Contribution Room',
  description: 'Unused RRSP contribution room accumulating',
  shouldCheck: (_profile, noa) => {
    // Check if there's significant unused RRSP room
    const rrspLimit = noa?.rrsp_deduction_limit || 0
    return rrspLimit > 10000
  },
  detect: (profile, noa, year) => {
    const rrspLimit = noa?.rrsp_deduction_limit || profile.rrsp_limit || 0
    const contributed = noa?.rrsp_contributions_available || profile.rrsp_contributed || 0
    const unusedRoom = rrspLimit - contributed

    if (unusedRoom <= 5000) {
      return null // Not significant enough
    }

    const income = profile.net_income || noa?.net_income || 50000
    const marginalRate = getMarginalRate(income, profile.province || 'ON')

    // Estimate potential contribution (assume they could contribute 50% of unused room)
    const potentialContribution = Math.min(unusedRoom, income * 0.18, 31560) // 2024 max
    const minSavings = Math.round(potentialContribution * 0.2)
    const maxSavings = Math.round(potentialContribution * marginalRate)

    return {
      findingType: 'rrsp_room',
      title: `Unused RRSP Room - ${year}`,
      description: `Your NOA shows $${unusedRoom.toLocaleString()} in unused RRSP contribution room. Contributing to your RRSP reduces taxable income dollar-for-dollar, and at your income level, you're in the ${(marginalRate * 100).toFixed(0)}% marginal tax bracket.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'high' : 'medium',
      priority: unusedRoom > 20000 ? 'high' : 'medium',
      evidence: {
        noa_data: {
          line_number: 'RRSP Deduction Limit',
          claimed_amount: contributed,
          expected_amount: rrspLimit,
        },
        calculation: {
          method: 'rrsp_contribution_savings',
          inputs: { unusedRoom, marginalRate, potentialContribution },
          result: maxSavings,
        },
      },
      requirements: [
        'This is a prospective opportunity (future tax savings)',
        'Consider contributing before March 3 RRSP deadline',
        'Consult with financial advisor for optimal strategy',
      ],
    }
  },
}

// Charitable Donations
const donationsRule: DetectionRule = {
  id: 'charitable_donations',
  name: 'Charitable Donations',
  description: 'Unclaimed charitable donation credits',
  shouldCheck: (profile) => profile.made_donations === true,
  detect: (profile, noa, year) => {
    const donationAmount = profile.donation_amount || 500

    // Check if donations were claimed (Line 34900)
    const claimedAmount = noa?.line_data?.['line_34900'] || 0

    if (claimedAmount >= donationAmount * 0.8) {
      return null // Already claimed most of it
    }

    const unclaimedAmount = donationAmount - claimedAmount
    if (unclaimedAmount < 100) {
      return null // Too small
    }

    // Donation credit: 15% on first $200, 29% on rest (federal)
    const federalCredit = Math.min(unclaimedAmount, 200) * 0.15 +
                          Math.max(0, unclaimedAmount - 200) * 0.29
    const provincialCredit = unclaimedAmount * getProvincialCreditRate(profile.province || 'ON')

    const minSavings = Math.round(federalCredit)
    const maxSavings = Math.round(federalCredit + provincialCredit)

    return {
      findingType: 'charitable_donations',
      title: `Charitable Donations - ${year}`,
      description: `You indicated making charitable donations of $${donationAmount.toLocaleString()} in ${year}. Charitable donations provide a tax credit of 15% on the first $200 and 29% on amounts above that, plus provincial credits.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'medium' : 'low',
      priority: donationAmount > 1000 ? 'medium' : 'low',
      evidence: {
        profile_answers: [
          { question: 'Made charitable donations', answer: true },
          { question: 'Donation amount', answer: donationAmount },
        ],
        noa_data: noa ? {
          line_number: 'Line 34900',
          claimed_amount: claimedAmount,
          expected_amount: donationAmount,
        } : undefined,
        calculation: {
          method: 'donation_credit',
          inputs: { unclaimedAmount, federalRate: 0.29 },
          result: maxSavings,
        },
      },
      requirements: [
        'Gather official donation receipts from registered charities',
        'Ensure receipts have charity registration number',
        'File T1-ADJ with Line 34900 claim',
      ],
    }
  },
}

// Childcare Expenses
const childcareRule: DetectionRule = {
  id: 'childcare',
  name: 'Childcare Expenses',
  description: 'Unclaimed childcare expense deduction',
  shouldCheck: (profile) => profile.had_childcare === true,
  detect: (profile, noa, year) => {
    const childcareAmount = profile.childcare_amount || 5000

    // Check if childcare was claimed (Line 21400)
    const claimedAmount = noa?.line_data?.['line_21400'] || 0

    if (claimedAmount >= childcareAmount * 0.8) {
      return null // Already claimed
    }

    const unclaimedAmount = childcareAmount - claimedAmount
    if (unclaimedAmount < 500) {
      return null
    }

    // Childcare is a deduction, so savings = amount * marginal rate
    const income = profile.net_income || noa?.net_income || 50000
    const marginalRate = getMarginalRate(income, profile.province || 'ON')

    const minSavings = Math.round(unclaimedAmount * 0.2)
    const maxSavings = Math.round(unclaimedAmount * marginalRate)

    return {
      findingType: 'childcare',
      title: `Childcare Expenses - ${year}`,
      description: `You indicated paying $${childcareAmount.toLocaleString()} in childcare expenses in ${year}. Childcare expenses are deductible up to certain limits based on the child's age.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'medium' : 'low',
      priority: 'high',
      evidence: {
        profile_answers: [
          { question: 'Had childcare expenses', answer: true },
          { question: 'Childcare amount', answer: childcareAmount },
        ],
        noa_data: noa ? {
          line_number: 'Line 21400',
          claimed_amount: claimedAmount,
          expected_amount: childcareAmount,
        } : undefined,
        calculation: {
          method: 'childcare_deduction',
          inputs: { unclaimedAmount, marginalRate },
          result: maxSavings,
        },
      },
      requirements: [
        'Gather childcare receipts with provider SIN or business number',
        'Verify childcare provider information',
        'Note: Usually claimed by lower-income spouse',
        'File T1-ADJ with Line 21400 claim',
      ],
    }
  },
}

// Student Loan Interest
const studentLoanRule: DetectionRule = {
  id: 'student_loan_interest',
  name: 'Student Loan Interest',
  description: 'Unclaimed student loan interest credit',
  shouldCheck: (profile) => profile.had_student_loans === true,
  detect: (profile, noa, year) => {
    const interestAmount = profile.student_loan_interest || 1000

    // Check if student loan interest was claimed (Line 31900)
    const claimedAmount = noa?.line_data?.['line_31900'] || 0

    if (claimedAmount >= interestAmount * 0.8) {
      return null
    }

    const unclaimedAmount = interestAmount - claimedAmount
    if (unclaimedAmount < 100) {
      return null
    }

    // Student loan interest credit = 15% federal + provincial
    const creditRate = 0.15 + getProvincialCreditRate(profile.province || 'ON')
    const minSavings = Math.round(unclaimedAmount * 0.15)
    const maxSavings = Math.round(unclaimedAmount * creditRate)

    return {
      findingType: 'student_loan_interest',
      title: `Student Loan Interest - ${year}`,
      description: `You indicated paying student loan interest in ${year}. Interest paid on qualifying student loans (Canada Student Loans, provincial student loans) is eligible for a non-refundable tax credit.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: noa ? 'medium' : 'low',
      priority: 'medium',
      evidence: {
        profile_answers: [
          { question: 'Had student loans', answer: true },
          { question: 'Interest paid', answer: interestAmount },
        ],
        noa_data: noa ? {
          line_number: 'Line 31900',
          claimed_amount: claimedAmount,
          expected_amount: interestAmount,
        } : undefined,
        calculation: {
          method: 'student_loan_credit',
          inputs: { unclaimedAmount, creditRate },
          result: maxSavings,
        },
      },
      requirements: [
        'Obtain interest statements from NSLSC or provincial loan servicer',
        'Only interest on government student loans qualifies',
        'Can carry forward unused amounts for 5 years',
        'File T1-ADJ with Line 31900 claim',
      ],
    }
  },
}

// Moving Expenses
const movingExpensesRule: DetectionRule = {
  id: 'moving_expenses',
  name: 'Moving Expenses',
  description: 'Unclaimed moving expense deduction',
  shouldCheck: (profile) => profile.moved_for_work === true,
  detect: (profile, noa, year) => {
    const distance = profile.moving_distance_km || 50

    if (distance < 40) {
      return null // Must move at least 40km closer to new work/school
    }

    // Check if moving expenses were claimed (Line 21900)
    const claimedAmount = noa?.line_data?.['line_21900'] || 0

    if (claimedAmount > 0) {
      return null // Already claimed
    }

    // Estimate moving expenses based on distance
    const estimatedExpenses = Math.min(distance * 10 + 1000, 5000) // Rough estimate

    const income = profile.net_income || noa?.net_income || 50000
    const marginalRate = getMarginalRate(income, profile.province || 'ON')

    const minSavings = Math.round(estimatedExpenses * 0.2)
    const maxSavings = Math.round(estimatedExpenses * marginalRate)

    return {
      findingType: 'moving_expenses',
      title: `Moving Expenses - ${year}`,
      description: `You indicated moving ${distance}km for work or school in ${year}. If your new home is at least 40km closer to your new work or school location, you may be able to deduct moving expenses.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: 'low',
      priority: 'medium',
      evidence: {
        profile_answers: [
          { question: 'Moved for work/school', answer: true },
          { question: 'Moving distance (km)', answer: distance },
        ],
        noa_data: noa ? {
          line_number: 'Line 21900',
          claimed_amount: claimedAmount,
          expected_amount: estimatedExpenses,
        } : undefined,
        calculation: {
          method: 'moving_expense_estimate',
          inputs: { distance, estimatedExpenses },
          result: maxSavings,
        },
      },
      requirements: [
        'Gather moving receipts (transportation, storage, travel)',
        'Document old and new addresses',
        'Calculate 40km minimum distance requirement',
        'Can only deduct against income from new location',
        'File T1-ADJ with Line 21900 claim',
      ],
    }
  },
}

// Disability Tax Credit
const disabilityRule: DetectionRule = {
  id: 'disability_tax_credit',
  name: 'Disability Tax Credit',
  description: 'Unclaimed disability tax credit',
  shouldCheck: (profile) => profile.had_disability === true,
  detect: (profile, noa, year) => {
    // Check if DTC was claimed (Line 31600)
    const claimedAmount = noa?.line_data?.['line_31600'] || 0

    if (claimedAmount > 0) {
      return null // Already claimed
    }

    // DTC amounts vary by year
    const dtcAmount = year >= 2024 ? 9428 : year >= 2023 ? 9039 : 8870
    const supplementAmount = 5500 // Additional amount for those under 18

    const creditRate = 0.15 + getProvincialCreditRate(profile.province || 'ON')
    const minSavings = Math.round(dtcAmount * 0.15)
    const maxSavings = Math.round(dtcAmount * creditRate)

    return {
      findingType: 'disability_tax_credit',
      title: `Disability Tax Credit - ${year}`,
      description: `You indicated having a disability in ${year}. The Disability Tax Credit (DTC) provides a significant non-refundable tax credit. The DTC can also be transferred to a supporting family member if you don't need it to reduce your own taxes.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: 'low',
      priority: 'high',
      evidence: {
        profile_answers: [
          { question: 'Has disability', answer: true },
        ],
        noa_data: noa ? {
          line_number: 'Line 31600',
          claimed_amount: claimedAmount,
          expected_amount: dtcAmount,
        } : undefined,
        calculation: {
          method: 'dtc_credit',
          inputs: { dtcAmount, creditRate },
          result: maxSavings,
        },
      },
      requirements: [
        'Form T2201 (Disability Tax Credit Certificate) completed by medical practitioner',
        'Submit T2201 to CRA for approval',
        'Once approved, can claim for current and previous years (up to 10)',
        'May also qualify for Registered Disability Savings Plan (RDSP)',
      ],
    }
  },
}

// Caregiver Credit
const caregiverRule: DetectionRule = {
  id: 'caregiver_credit',
  name: 'Canada Caregiver Credit',
  description: 'Unclaimed caregiver credit for supporting dependents',
  shouldCheck: (profile) => profile.cared_for_dependent === true,
  detect: (profile, noa, year) => {
    // Check if caregiver credit was claimed (Line 30425, 30450, 30500)
    const claimedAmount = (noa?.line_data?.['line_30425'] || 0) +
                          (noa?.line_data?.['line_30450'] || 0) +
                          (noa?.line_data?.['line_30500'] || 0)

    if (claimedAmount > 0) {
      return null
    }

    // Caregiver credit base amount
    const caregiverAmount = year >= 2024 ? 7999 : year >= 2023 ? 7679 : 7525
    const additionalAmount = profile.dependent_disability ? 2499 : 0
    const totalAmount = caregiverAmount + additionalAmount

    const creditRate = 0.15 + getProvincialCreditRate(profile.province || 'ON')
    const minSavings = Math.round(totalAmount * 0.15)
    const maxSavings = Math.round(totalAmount * creditRate)

    return {
      findingType: 'caregiver_credit',
      title: `Canada Caregiver Credit - ${year}`,
      description: `You indicated caring for a dependent family member in ${year}. The Canada Caregiver Credit provides tax relief for those supporting a spouse, common-law partner, or dependent with a physical or mental impairment.`,
      potentialRecoveryMin: minSavings,
      potentialRecoveryMax: maxSavings,
      confidence: 'low',
      priority: 'medium',
      evidence: {
        profile_answers: [
          { question: 'Cared for dependent', answer: true },
          { question: 'Dependent has disability', answer: profile.dependent_disability || false },
        ],
        calculation: {
          method: 'caregiver_credit',
          inputs: { caregiverAmount, additionalAmount },
          result: maxSavings,
        },
      },
      requirements: [
        'Dependent must have a physical or mental impairment',
        'May need medical certification depending on relationship',
        'Different rules for spouse vs parent vs other dependents',
        'File T1-ADJ with appropriate caregiver credit lines',
      ],
    }
  },
}

// All detection rules
export const DETECTION_RULES: DetectionRule[] = [
  homeOfficeRule,
  medicalExpensesRule,
  rrspRoomRule,
  donationsRule,
  childcareRule,
  studentLoanRule,
  movingExpensesRule,
  disabilityRule,
  caregiverRule,
]

// Helper function to get marginal tax rate
function getMarginalRate(income: number, province: string): number {
  // Simplified combined federal + provincial marginal rates
  // These are approximate and vary by province
  const provincialAdder: Record<string, number> = {
    AB: 0.10, BC: 0.12, MB: 0.12, NB: 0.12, NL: 0.13,
    NS: 0.14, NT: 0.09, NU: 0.09, ON: 0.12, PE: 0.13,
    QC: 0.15, SK: 0.11, YT: 0.09,
  }

  const provRate = provincialAdder[province] || 0.12

  if (income <= 55867) return 0.15 + provRate * 0.8
  if (income <= 111733) return 0.205 + provRate
  if (income <= 173205) return 0.26 + provRate
  if (income <= 246752) return 0.29 + provRate
  return 0.33 + provRate
}

// Helper function to get provincial credit rate
function getProvincialCreditRate(province: string): number {
  const rates: Record<string, number> = {
    AB: 0.10, BC: 0.0506, MB: 0.108, NB: 0.094, NL: 0.087,
    NS: 0.0879, NT: 0.059, NU: 0.04, ON: 0.0505, PE: 0.098,
    QC: 0.15, SK: 0.105, YT: 0.064,
  }
  return rates[province] || 0.10
}

// Run all applicable detection rules
export function runDetection(
  profile: Partial<TimeMachineProfile>,
  noa: Partial<NOAData> | null,
  year: number
): DetectionResult[] {
  const results: DetectionResult[] = []

  for (const rule of DETECTION_RULES) {
    // Check if rule applies to this year
    if (rule.applicableYears && !rule.applicableYears.includes(year)) {
      continue
    }

    // Check if rule should run based on data
    if (!rule.shouldCheck(profile, noa, year)) {
      continue
    }

    // Run detection
    const result = rule.detect(profile, noa, year)
    if (result) {
      results.push(result)
    }
  }

  // Sort by priority and potential recovery
  results.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return b.potentialRecoveryMax - a.potentialRecoveryMax
  })

  return results
}
