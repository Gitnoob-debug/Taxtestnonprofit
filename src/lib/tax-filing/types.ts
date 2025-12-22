/**
 * Tax Filing System Types
 * Complete data model for T1 General tax return
 */

// ============================================
// Core Types
// ============================================

export type Province = 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT'

export type MaritalStatus = 'single' | 'married' | 'common-law' | 'separated' | 'divorced' | 'widowed'

export type FilingStatus = 'draft' | 'in_progress' | 'review' | 'complete' | 'filed'

// ============================================
// Personal Information (Page 1 of T1)
// ============================================

export interface PersonalInfo {
  firstName: string
  lastName: string
  sin: string  // Social Insurance Number (xxx-xxx-xxx)
  dateOfBirth: string  // YYYY-MM-DD
  maritalStatus: MaritalStatus
  maritalStatusDate?: string  // Date if status changed during year

  // Address
  address: {
    street: string
    city: string
    province: Province
    postalCode: string
  }

  // Contact
  email?: string
  phone?: string

  // Residency
  provinceOfResidence: Province
  residencyDate?: string  // If moved during year

  // CRA Info
  cRAAccountNumber?: string

  // Elections
  electionsCanada?: boolean  // Authorize CRA to provide info to Elections Canada
  isCanadianCitizen?: boolean
}

// ============================================
// Spouse/Common-law Partner Info
// ============================================

export interface SpouseInfo {
  firstName: string
  lastName: string
  sin: string
  dateOfBirth: string
  netIncome: number  // Line 23600 of spouse's return
  selfEmploymentIncome?: number
  universalChildCareBenefit?: number
  isFilingReturn: boolean
}

// ============================================
// Income Sources
// ============================================

// T4 - Employment Income
export interface T4Slip {
  id: string
  employerName: string
  employerAccount: string  // Employer's payroll account number
  box14_employmentIncome: number
  box16_cpp: number
  box17_cpp2?: number  // CPP2 (new for 2024+)
  box18_ei: number
  box20_rppContributions?: number
  box22_incomeTaxDeducted: number
  box24_eiInsurableEarnings?: number
  box26_cppPensionableEarnings?: number
  box40_otherTaxableAllowances?: number
  box42_employmentCommissions?: number
  box44_unionDues?: number
  box46_charitableDonations?: number
  box52_pensionAdjustment?: number
  box55_employerPpip?: number  // Quebec only
  box56_ppipInsurableEarnings?: number  // Quebec only
}

// T4A - Pension, Retirement, Annuity, Other Income
export interface T4ASlip {
  id: string
  payerName: string
  box016_pension?: number
  box018_lumpSum?: number
  box020_selfEmployedCommissions?: number
  box022_incomeTaxDeducted?: number
  box024_annuities?: number
  box028_otherIncome?: number
  box105_scholarship?: number
  box135_rrspWithdrawal?: number  // Recipient contributions
}

// T4A(OAS) - Old Age Security
export interface T4AOASSlip {
  id: string
  box18_taxDeducted?: number
  box19_oasPension: number
  box20_clawback?: number  // Recovery tax
  box21_netOas: number
}

// T4A(P) - CPP/QPP Benefits
export interface T4APSlip {
  id: string
  box14_cppDisability?: number
  box15_cppChildDisability?: number
  box16_cppDeath?: number
  box17_cppChildDeath?: number
  box18_cppSurvivor?: number
  box20_cppRetirement: number
  box21_cppPostRetirement?: number
  box22_incomeTaxDeducted?: number
}

// T4E - Employment Insurance
export interface T4ESlip {
  id: string
  box14_eiRegular?: number
  box15_eiMaternityParental?: number
  box17_eiFishing?: number
  box18_eiSickness?: number
  box21_totalBenefits: number
  box22_incomeTaxDeducted?: number
}

// T5 - Investment Income
export interface T5Slip {
  id: string
  payerName: string
  box10_actualDividends?: number  // Actual amount of eligible dividends
  box11_taxableDividends?: number  // Taxable amount (grossed-up)
  box12_dividendTaxCredit?: number
  box13_interestFromBonds?: number
  box14_otherInterest?: number  // Most common - bank interest
  box15_foreignIncome?: number
  box16_foreignTaxPaid?: number
  box18_capitalGainsEligible?: number
  box24_actualNonEligibleDividends?: number
  box25_taxableNonEligibleDividends?: number
  box26_nonEligibleDividendCredit?: number
}

// T3 - Trust Income
export interface T3Slip {
  id: string
  trustName: string
  box21_capitalGains?: number
  box23_actualDividends?: number
  box26_otherIncome?: number
  box32_taxableDividends?: number
  box38_foreignBusinessIncome?: number
  box39_foreignNonBusinessIncome?: number
  box49_actualEligibleDividends?: number
  box50_taxableEligibleDividends?: number
}

// T2125 - Self-Employment Income
export interface SelfEmploymentIncome {
  id: string
  businessName: string
  businessNumber?: string
  industry: string  // NAICS code or description
  fiscalYearEnd: string  // Usually Dec 31

  // Revenue
  grossRevenue: number

  // Expenses (common categories)
  expenses: {
    advertising?: number
    meals?: number  // 50% deductible
    badDebts?: number
    insurance?: number
    interest?: number
    professionalFees?: number
    officeExpenses?: number
    supplies?: number
    licences?: number
    travel?: number
    telephone?: number
    utilities?: number
    vehicleExpenses?: number
    wages?: number
    workspaceCost?: number
    other?: number
  }

  netIncome: number  // Calculated

  // CCA (Capital Cost Allowance) - Optional
  ccaClaimed?: number
}

// Rental Income (T776)
export interface RentalIncome {
  id: string
  propertyAddress: string
  ownershipPercentage: number  // 0-100

  grossRents: number

  expenses: {
    advertising?: number
    insurance?: number
    interest?: number
    maintenance?: number
    managementFees?: number
    officeExpenses?: number
    professionalFees?: number
    propertyTax?: number
    travel?: number
    utilities?: number
    other?: number
  }

  netIncome: number
}

// Capital Gains/Losses (Schedule 3)
export interface CapitalGain {
  id: string
  description: string  // e.g., "100 shares of ABC Corp"
  dateAcquired?: string
  dateSold: string
  proceeds: number  // Selling price
  acb: number  // Adjusted Cost Base
  outlays?: number  // Selling expenses
  gain: number  // Calculated: proceeds - acb - outlays
  isEligibleForExemption?: boolean  // LCGE for QSBC shares, farm property
}

// Other Income
export interface OtherIncome {
  line13000_otherEmployment?: number  // Tips, gratuities not on T4
  line13010_scholarships?: number
  line14400_workersCompensation?: number  // Not taxable but reported
  line14500_socialAssistance?: number  // Not taxable but reported
  line14600_netFederalSupplements?: number
  line14700_uccb?: number  // Universal Child Care Benefit
  line15000_rrspIncome?: number
  line12900_rrifIncome?: number
  line21700_workersCompRepaid?: number
  line13500_gstCredit?: number
  line13700_partnershipIncome?: number
  line14300_otherTaxable?: number
}

// ============================================
// All Income Combined
// ============================================

export interface IncomeSection {
  t4Slips: T4Slip[]
  t4aSlips: T4ASlip[]
  t4aoasSlips: T4AOASSlip[]
  t4apSlips: T4APSlip[]
  t4eSlips: T4ESlip[]
  t5Slips: T5Slip[]
  t3Slips: T3Slip[]
  selfEmployment: SelfEmploymentIncome[]
  rental: RentalIncome[]
  capitalGains: CapitalGain[]
  other: OtherIncome
}

// ============================================
// Deductions (Lines 20700 - 23200)
// ============================================

export interface Deductions {
  // RRSP
  line20800_rrspContribution?: number
  rrspContributionRoom?: number  // From NOA
  rrspUnusedPrior?: number

  // FHSA (new)
  line20810_fhsaContribution?: number

  // Union/Professional Dues (if not on T4)
  line21200_unionDues?: number

  // Child Care
  line21400_childCareExpenses?: number
  childCareReceipts?: {
    providerName: string
    providerSin?: string
    amount: number
    childName: string
  }[]

  // Disability Supports
  line21500_disabilitySupports?: number

  // Moving Expenses
  line21900_movingExpenses?: number

  // Support Payments Made
  line22000_supportPayments?: number
  supportPaymentsDeductible?: number  // Pre-May 1997 agreements

  // Carrying Charges
  line22100_carryingCharges?: number  // Interest on investment loans, etc.

  // CPP/QPP on Self-Employment
  line22200_cppSelfEmployed?: number

  // Exploration/Development Expenses
  line22400_explorationExpenses?: number

  // Other Employment Expenses (T777)
  line22900_employmentExpenses?: number
  hasT777?: boolean

  // Clergy Residence
  line23100_clergyResidence?: number

  // Other Deductions
  line23200_otherDeductions?: number
  otherDeductionsDetails?: string
}

// ============================================
// Non-Refundable Tax Credits (Schedule 1)
// ============================================

export interface TaxCredits {
  // Line 30000 - Basic Personal Amount (automatic)

  // Line 30100 - Age Amount (65+)
  line30100_ageAmount?: number

  // Line 30300 - Spouse/Common-law Amount
  line30300_spouseAmount?: number

  // Line 30400 - Eligible Dependant Amount
  line30400_eligibleDependant?: number
  eligibleDependantInfo?: {
    name: string
    relationship: string
    dateOfBirth: string
    netIncome: number
  }

  // Line 30425 - Canada Caregiver for Children Under 18
  line30425_caregiverChildren?: number

  // Line 30450 - Canada Caregiver Amount
  line30450_caregiverAmount?: number

  // Line 30500 - Canada Caregiver for Spouse
  line30500_caregiverSpouse?: number

  // Line 31200 - CPP/QPP Contributions (from T4s)
  line31200_cppContributions?: number

  // Line 31217 - CPP2 Contributions
  line31217_cpp2Contributions?: number

  // Line 31220 - CPP/QPP Self-Employment
  line31220_cppSelfEmployed?: number

  // Line 31240 - QPP Self-Employment
  line31240_qppSelfEmployed?: number

  // Line 31260 - EI Premiums (from T4s)
  line31260_eiPremiums?: number

  // Line 31270 - PPIP Premiums (Quebec)
  line31270_ppipPremiums?: number

  // Line 31285 - Volunteer Firefighter
  line31285_volunteerFirefighter?: number

  // Line 31300 - Search and Rescue Volunteer
  line31300_searchRescue?: number

  // Line 31350 - Digital News Subscription
  line31350_digitalNews?: number

  // Line 31400 - Pension Income Amount (max $2000)
  line31400_pensionAmount?: number

  // Line 31600 - Disability Amount for Self
  line31600_disabilitySelf?: number
  hasDTC?: boolean  // Has approved Disability Tax Credit

  // Line 31800 - Disability Amount Transferred
  line31800_disabilityTransferred?: number

  // Line 32300 - Tuition (carry-forward or current)
  line32300_tuition?: number
  tuitionCarryForward?: number

  // Line 32400 - Tuition Transferred from Child
  line32400_tuitionTransferred?: number

  // Line 33099 - Medical Expenses for Self/Spouse/Dependants
  line33099_medicalExpenses?: number
  medicalExpensesList?: {
    description: string
    amount: number
    forWhom: string
  }[]

  // Line 33199 - Medical Expenses for Other Dependants
  line33199_medicalOther?: number

  // Line 34900 - Donations and Gifts
  line34900_donations?: number
  donationReceipts?: {
    charityName: string
    registrationNumber: string
    amount: number
    date: string
  }[]

  // Line 35000 - Cultural and Ecological Gifts
  line35000_culturalGifts?: number
}

// ============================================
// Tax Summary / Results
// ============================================

export interface TaxCalculation {
  // Income totals
  totalIncome: number  // Line 15000
  netIncome: number  // Line 23600
  taxableIncome: number  // Line 26000

  // Tax calculated
  federalTax: number
  provincialTax: number
  totalTax: number

  // Credits
  totalNonRefundableCredits: number
  federalCreditsValue: number
  provincialCreditsValue: number

  // Payroll deductions already made
  taxDeductedAtSource: number  // From T4s, etc.
  cppContributed: number
  eiContributed: number

  // Refundable credits
  gstHstCredit?: number
  canadaWorkersBenefit?: number
  canadaChildBenefit?: number
  climateActionIncentive?: number

  // Balance
  balanceOwing: number  // Positive = owes, Negative = refund
  refund: number

  // Rates
  effectiveRate: number
  marginalRate: number

  // Optimization suggestions
  optimizations?: TaxOptimization[]
}

export interface TaxOptimization {
  type: 'rrsp' | 'fhsa' | 'donation' | 'medical' | 'income_split' | 'other'
  description: string
  potentialSavings: number
  actionRequired: string
}

// ============================================
// T1 Form Line Mappings
// ============================================

export interface T1FormData {
  // Page 1 - Identification
  identification: PersonalInfo
  spouse?: SpouseInfo

  // Page 2 - Total Income
  income: {
    line10100_employmentIncome: number  // T4 box 14
    line10400_otherEmployment: number
    line11300_oasPension: number
    line11400_cppBenefits: number
    line11500_otherPensions: number
    line11900_eiBenefits: number
    line12000_taxableDividends: number
    line12100_interestIncome: number
    line12200_partnershipIncome: number
    line12700_capitalGains: number
    line12900_rrifIncome: number
    line13000_otherIncome: number
    line13500_selfEmploymentGross: number
    line13700_selfEmploymentNet: number
    line14100_workersComp: number
    line14300_socialAssistance: number
    line15000_totalIncome: number
  }

  // Page 3 - Net Income
  netIncome: {
    line20800_rrspDeduction: number
    line21000_splittingDeduction: number
    line21200_unionDues: number
    line21400_childCare: number
    line21500_disabilitySupports: number
    line21700_businessLosses: number
    line21900_movingExpenses: number
    line22000_supportPayments: number
    line22100_carryingCharges: number
    line22200_cppSelfEmployed: number
    line22400_explorationExpenses: number
    line22900_otherEmploymentExpenses: number
    line23200_otherDeductions: number
    line23400_netIncomeBeforeAdj: number
    line23500_socialBenefitsRepay: number
    line23600_netIncome: number
  }

  // Page 4 - Taxable Income
  taxableIncome: {
    line24400_canadianForcesRelief: number
    line24900_securityOptionsDeduction: number
    line25000_otherPaymentsDeduction: number
    line25100_limitedPartnershipLosses: number
    line25200_nonCapitalLosses: number
    line25300_netCapitalLosses: number
    line25400_capitalGainsDeduction: number
    line25500_northernResidentsDeduction: number
    line25600_additionalDeductions: number
    line26000_taxableIncome: number
  }

  // Page 5 - Refund or Balance Owing
  summary: {
    line30000_basicPersonalAmount: number
    line35000_totalNonRefundableCredits: number
    line42000_netFederalTax: number
    line42100_cppSelfEmployedContrib: number
    line42120_eiSelfEmployedPremiums: number
    line43500_totalPayable: number
    line43700_totalIncomeDeducted: number
    line44000_refundableCredits: number
    line48200_totalCredits: number
    line48400_refundOrOwing: number
  }
}

// ============================================
// Main Tax Return Type
// ============================================

export interface TaxReturn {
  id: string
  userId: string
  taxYear: number
  status: FilingStatus

  // Wizard progress
  currentStep: number
  stepsCompleted: boolean[]

  // All data
  personalInfo: PersonalInfo
  spouse?: SpouseInfo
  income: IncomeSection
  deductions: Deductions
  credits: TaxCredits

  // Calculated results
  calculation?: TaxCalculation

  // Form output
  t1FormData?: T1FormData

  // Metadata
  createdAt: string
  updatedAt: string
  filedAt?: string
}

// ============================================
// Wizard Step Types
// ============================================

export type WizardStep =
  | 'situation'
  | 'income'
  | 'deductions'
  | 'credits'
  | 'review'

export interface WizardStepConfig {
  id: WizardStep
  title: string
  description: string
  isRequired: boolean
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  {
    id: 'situation',
    title: 'Your Situation',
    description: 'Personal info, province, marital status',
    isRequired: true
  },
  {
    id: 'income',
    title: 'Income',
    description: 'Employment, self-employment, investments',
    isRequired: true
  },
  {
    id: 'deductions',
    title: 'Deductions',
    description: 'RRSP, childcare, moving expenses',
    isRequired: false
  },
  {
    id: 'credits',
    title: 'Credits',
    description: 'Medical, donations, education',
    isRequired: false
  },
  {
    id: 'review',
    title: 'Review & Generate',
    description: 'Review your return and generate forms',
    isRequired: true
  }
]

// ============================================
// Initial/Empty State
// ============================================

export function createEmptyTaxReturn(userId: string, taxYear: number = 2024): TaxReturn {
  return {
    id: crypto.randomUUID(),
    userId,
    taxYear,
    status: 'draft',
    currentStep: 0,
    stepsCompleted: [false, false, false, false, false],
    personalInfo: {
      firstName: '',
      lastName: '',
      sin: '',
      dateOfBirth: '',
      maritalStatus: 'single',
      address: {
        street: '',
        city: '',
        province: 'ON',
        postalCode: ''
      },
      provinceOfResidence: 'ON'
    },
    income: {
      t4Slips: [],
      t4aSlips: [],
      t4aoasSlips: [],
      t4apSlips: [],
      t4eSlips: [],
      t5Slips: [],
      t3Slips: [],
      selfEmployment: [],
      rental: [],
      capitalGains: [],
      other: {}
    },
    deductions: {},
    credits: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
