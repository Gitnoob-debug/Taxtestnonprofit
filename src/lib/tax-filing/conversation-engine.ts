/**
 * Conversational Tax Filing Engine
 * Manages the AI-driven conversation flow and extracts data from responses
 */

import { TaxReturn, Province, MaritalStatus, T4Slip, T5Slip, SelfEmploymentIncome } from './types'

// ============================================
// Conversation State
// ============================================

export type ConversationPhase =
  | 'discovery'        // NEW: Open-ended "tell me about yourself" phase
  | 'personal_info'
  | 'employment_status'
  | 'income_t4'
  | 'income_self_employed'
  | 'income_investment'
  | 'income_rental'
  | 'income_other'
  | 'deductions_rrsp'
  | 'deductions_other'
  | 'credits'
  | 'review'
  | 'complete'

// Life situation flags - comprehensive list of tax-relevant situations
export interface LifeSituationFlags {
  // Income sources
  hasEmployment: boolean         // T4 income
  hasSelfEmployment: boolean     // T2125 business income
  hasInvestments: boolean        // T5, T3, T5008
  hasRentalIncome: boolean       // Rental property
  hasOtherIncome: boolean        // EI, pension, social assistance

  // Family situation
  hasSpouse: boolean             // Married/common-law
  hasChildren: boolean           // Dependents under 18
  hasDependents: boolean         // Other dependents (elderly parent, etc.)

  // Deductions & credits
  hasRRSP: boolean               // RRSP contributions
  hasTuition: boolean            // T2202 education
  hasChildcare: boolean          // Childcare expenses
  hasMedicalExpenses: boolean    // Medical/dental not covered
  hasDonations: boolean          // Charitable donations
  hasMovingExpenses: boolean     // Moved 40km+ for work/school
  hasHomeOffice: boolean         // Work from home
  hasDisability: boolean         // DTC eligible
  hasStudentLoans: boolean       // Student loan interest

  // Special situations
  isFirstTimeHomeBuyer: boolean  // First home purchase (HBP)
  isStudent: boolean             // Full/part-time student
  isNewToCanada: boolean         // Immigration in tax year
  leftCanada: boolean            // Emigration in tax year

  // Discovery complete flag
  discoveryComplete: boolean     // Have we gathered enough info?
}

export interface ConversationState {
  phase: ConversationPhase
  subStep: number
  waitingFor: string | null // What data we're expecting next
  collectedData: Partial<ExtractedData>
  flags: LifeSituationFlags
}

// Document requirement based on flags
export interface DocumentRequirement {
  id: string
  name: string
  description: string
  status: 'required' | 'recommended' | 'optional' | 'not_needed'
  completed: boolean
  flagsRequired: (keyof LifeSituationFlags)[]
}

// Determine what documents are needed based on life situation
export function getRequiredDocuments(flags: LifeSituationFlags): DocumentRequirement[] {
  const docs: DocumentRequirement[] = [
    {
      id: 'personal_info',
      name: 'Personal Information',
      description: 'Name, SIN, date of birth, address',
      status: 'required',
      completed: false,
      flagsRequired: []
    },
    {
      id: 't4',
      name: 'T4 - Employment Income',
      description: 'Statement of Remuneration from employer',
      status: flags.hasEmployment ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasEmployment']
    },
    {
      id: 't2125',
      name: 'Self-Employment Records',
      description: 'Business income and expenses',
      status: flags.hasSelfEmployment ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasSelfEmployment']
    },
    {
      id: 't5',
      name: 'T5 - Investment Income',
      description: 'Interest and dividend slips',
      status: flags.hasInvestments ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasInvestments']
    },
    {
      id: 'rental',
      name: 'Rental Income Records',
      description: 'Rental income and expenses',
      status: flags.hasRentalIncome ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasRentalIncome']
    },
    {
      id: 'rrsp',
      name: 'RRSP Contribution Receipts',
      description: 'From financial institution',
      status: flags.hasRRSP ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasRRSP']
    },
    {
      id: 't2202',
      name: 'T2202 - Tuition',
      description: 'Tuition and education amounts',
      status: flags.hasTuition || flags.isStudent ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasTuition', 'isStudent']
    },
    {
      id: 'childcare',
      name: 'Childcare Receipts',
      description: 'Daycare, camps, nanny expenses',
      status: flags.hasChildcare ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasChildcare']
    },
    {
      id: 'medical',
      name: 'Medical Expense Receipts',
      description: 'Out-of-pocket medical/dental costs',
      status: flags.hasMedicalExpenses ? 'recommended' : 'not_needed',
      completed: false,
      flagsRequired: ['hasMedicalExpenses']
    },
    {
      id: 'donations',
      name: 'Donation Receipts',
      description: 'Charitable donation receipts',
      status: flags.hasDonations ? 'recommended' : 'not_needed',
      completed: false,
      flagsRequired: ['hasDonations']
    },
    {
      id: 'home_office',
      name: 'Home Office Expenses',
      description: 'T2200 or simplified method records',
      status: flags.hasHomeOffice ? 'recommended' : 'not_needed',
      completed: false,
      flagsRequired: ['hasHomeOffice']
    },
    {
      id: 'spouse_info',
      name: 'Spouse Information',
      description: 'Spouse SIN and income',
      status: flags.hasSpouse ? 'required' : 'not_needed',
      completed: false,
      flagsRequired: ['hasSpouse']
    },
    {
      id: 'moving',
      name: 'Moving Expense Receipts',
      description: 'Moving costs for work/school',
      status: flags.hasMovingExpenses ? 'recommended' : 'not_needed',
      completed: false,
      flagsRequired: ['hasMovingExpenses']
    },
    {
      id: 'noa',
      name: 'Notice of Assessment (Prior Year)',
      description: 'For RRSP room and carry-forwards',
      status: 'recommended',
      completed: false,
      flagsRequired: []
    }
  ]

  return docs.filter(d => d.status !== 'not_needed')
}

export interface ExtractedData {
  // Personal
  firstName: string
  lastName: string
  sin: string
  dateOfBirth: string
  province: Province
  city: string
  street: string
  postalCode: string
  maritalStatus: MaritalStatus

  // Spouse
  spouseFirstName?: string
  spouseLastName?: string
  spouseIncome?: number

  // Employment
  employerName?: string
  employmentIncome?: number
  taxDeducted?: number
  cppDeducted?: number
  eiDeducted?: number

  // Self-employment
  businessName?: string
  businessIncome?: number
  businessExpenses?: number

  // Investments
  interestIncome?: number
  dividendIncome?: number
  capitalGains?: number

  // Deductions
  rrspContribution?: number
  childcareExpenses?: number

  // Credits
  medicalExpenses?: number
  donations?: number
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  extractedData?: Partial<ExtractedData>
  fieldsUpdated?: string[]
}

// ============================================
// Question Flow Definition
// ============================================

export interface QuestionNode {
  phase: ConversationPhase
  subStep: number
  question: string
  waitingFor: string
  extractionHints: string[]
  followUp?: (data: ExtractedData, flags: ConversationState['flags']) => string | null
  nextPhase: (data: ExtractedData, flags: ConversationState['flags']) => { phase: ConversationPhase; subStep: number }
}

export const QUESTION_FLOW: QuestionNode[] = [
  // Discovery Phase - Open-ended questions to understand tax situation
  {
    phase: 'discovery',
    subStep: 0,
    question: "Hi! I'm here to help you file your 2024 tax return. To make sure I get you all the deductions you deserve, tell me a bit about yourself - what do you do for work, your family situation, any big life changes this year? The more you share, the better I can help!",
    waitingFor: 'lifeSituation',
    extractionHints: ['employed', 'self-employed', 'married', 'kids', 'children', 'student', 'retired', 'work from home'],
    nextPhase: (data, flags) => {
      // Stay in discovery until we have enough info
      if (!flags.discoveryComplete) {
        return { phase: 'discovery', subStep: 1 }
      }
      return { phase: 'personal_info', subStep: 0 }
    }
  },
  {
    phase: 'discovery',
    subStep: 1,
    question: "Great! And what about deductions - did you contribute to RRSP, have medical expenses, childcare costs, or make any charitable donations?",
    waitingFor: 'deductionSituation',
    extractionHints: ['rrsp', 'medical', 'dental', 'donations', 'childcare', 'daycare'],
    nextPhase: (data, flags) => {
      if (!flags.discoveryComplete) {
        return { phase: 'discovery', subStep: 2 }
      }
      return { phase: 'personal_info', subStep: 0 }
    }
  },
  {
    phase: 'discovery',
    subStep: 2,
    question: "Perfect! Based on what you've told me, I have a good picture of your tax situation. Let's get your return started - first, what's your full name?",
    waitingFor: 'firstName',
    extractionHints: ['name', 'first name', 'last name'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 0 })
  },

  // Personal Info - now we ask for specific details
  {
    phase: 'personal_info',
    subStep: 0,
    question: "Nice to meet you, {firstName}! And your last name?",
    waitingFor: 'lastName',
    extractionHints: ['last name', 'surname'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 1 })
  },
  {
    phase: 'personal_info',
    subStep: 1,
    question: "Got it. Now I need your Social Insurance Number (SIN). Don't worry - this stays secure and encrypted.",
    waitingFor: 'sin',
    extractionHints: ['sin', 'social insurance', '9 digits'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 2 })
  },
  {
    phase: 'personal_info',
    subStep: 2,
    question: "What's your date of birth? (You can say something like 'March 15, 1990' or '1990-03-15')",
    waitingFor: 'dateOfBirth',
    extractionHints: ['date', 'birth', 'born'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 3 })
  },
  {
    phase: 'personal_info',
    subStep: 3,
    question: "Which province or territory did you live in on December 31, 2024?",
    waitingFor: 'province',
    extractionHints: ['province', 'territory', 'ON', 'BC', 'AB', 'QC'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 4 })
  },
  {
    phase: 'personal_info',
    subStep: 4,
    question: "What's your current mailing address? Just give me the street address.",
    waitingFor: 'street',
    extractionHints: ['street', 'address', 'road', 'avenue'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 5 })
  },
  {
    phase: 'personal_info',
    subStep: 5,
    question: "And the city?",
    waitingFor: 'city',
    extractionHints: ['city', 'town'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 6 })
  },
  {
    phase: 'personal_info',
    subStep: 6,
    question: "What's the postal code?",
    waitingFor: 'postalCode',
    extractionHints: ['postal', 'code', 'zip'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 7 })
  },
  {
    phase: 'personal_info',
    subStep: 7,
    question: "What was your marital status on December 31, 2024? (Single, Married, Common-law, Separated, Divorced, or Widowed)",
    waitingFor: 'maritalStatus',
    extractionHints: ['single', 'married', 'common-law', 'separated', 'divorced', 'widowed'],
    followUp: (data, flags) => {
      if (data.maritalStatus === 'married' || data.maritalStatus === 'common-law') {
        return "What's your spouse's/partner's first name?"
      }
      return null
    },
    nextPhase: (data, flags) => {
      if (data.maritalStatus === 'married' || data.maritalStatus === 'common-law') {
        return { phase: 'personal_info', subStep: 8 }
      }
      return { phase: 'employment_status', subStep: 0 }
    }
  },
  {
    phase: 'personal_info',
    subStep: 8,
    question: "What's your spouse's/partner's first name?",
    waitingFor: 'spouseFirstName',
    extractionHints: ['name', 'spouse', 'partner'],
    nextPhase: () => ({ phase: 'personal_info', subStep: 9 })
  },
  {
    phase: 'personal_info',
    subStep: 9,
    question: "And their net income for 2024? (An estimate is fine - this affects certain credits)",
    waitingFor: 'spouseIncome',
    extractionHints: ['income', 'salary', 'earnings', '$', 'k'],
    nextPhase: () => ({ phase: 'employment_status', subStep: 0 })
  },

  // Employment Status
  {
    phase: 'employment_status',
    subStep: 0,
    question: "Now let's talk about your income in 2024. Were you employed by a company (you'd have a T4 slip)?",
    waitingFor: 'hasEmployment',
    extractionHints: ['yes', 'no', 'employed', 't4', 'work'],
    nextPhase: (data, flags) => {
      if (flags.hasEmployment) {
        return { phase: 'income_t4', subStep: 0 }
      }
      return { phase: 'employment_status', subStep: 1 }
    }
  },
  {
    phase: 'employment_status',
    subStep: 1,
    question: "Did you have any self-employment or freelance income?",
    waitingFor: 'hasSelfEmployment',
    extractionHints: ['yes', 'no', 'self', 'freelance', 'business', 'contractor'],
    nextPhase: (data, flags) => {
      if (flags.hasSelfEmployment) {
        return { phase: 'income_self_employed', subStep: 0 }
      }
      return { phase: 'employment_status', subStep: 2 }
    }
  },
  {
    phase: 'employment_status',
    subStep: 2,
    question: "Did you earn any investment income - like interest from bank accounts, dividends, or capital gains from selling stocks?",
    waitingFor: 'hasInvestments',
    extractionHints: ['yes', 'no', 'interest', 'dividend', 'stocks', 'investment'],
    nextPhase: (data, flags) => {
      if (flags.hasInvestments) {
        return { phase: 'income_investment', subStep: 0 }
      }
      return { phase: 'deductions_rrsp', subStep: 0 }
    }
  },

  // T4 Income
  {
    phase: 'income_t4',
    subStep: 0,
    question: "Great! Let's enter your T4. What's the employer name on the slip?",
    waitingFor: 'employerName',
    extractionHints: ['employer', 'company', 'name'],
    nextPhase: () => ({ phase: 'income_t4', subStep: 1 })
  },
  {
    phase: 'income_t4',
    subStep: 1,
    question: "What's Box 14 - Employment Income? (This is your gross pay before deductions)",
    waitingFor: 'employmentIncome',
    extractionHints: ['box 14', 'income', '$', 'salary'],
    nextPhase: () => ({ phase: 'income_t4', subStep: 2 })
  },
  {
    phase: 'income_t4',
    subStep: 2,
    question: "And Box 22 - Income Tax Deducted?",
    waitingFor: 'taxDeducted',
    extractionHints: ['box 22', 'tax', 'deducted', '$'],
    nextPhase: () => ({ phase: 'income_t4', subStep: 3 })
  },
  {
    phase: 'income_t4',
    subStep: 3,
    question: "Box 16 - CPP Contributions?",
    waitingFor: 'cppDeducted',
    extractionHints: ['box 16', 'cpp', '$'],
    nextPhase: () => ({ phase: 'income_t4', subStep: 4 })
  },
  {
    phase: 'income_t4',
    subStep: 4,
    question: "Box 18 - EI Premiums?",
    waitingFor: 'eiDeducted',
    extractionHints: ['box 18', 'ei', '$'],
    nextPhase: (data, flags) => {
      if (flags.hasSelfEmployment) {
        return { phase: 'income_self_employed', subStep: 0 }
      }
      if (flags.hasInvestments) {
        return { phase: 'income_investment', subStep: 0 }
      }
      return { phase: 'deductions_rrsp', subStep: 0 }
    }
  },

  // Self-Employment Income
  {
    phase: 'income_self_employed',
    subStep: 0,
    question: "Tell me about your self-employment. What kind of business or freelance work do you do?",
    waitingFor: 'businessName',
    extractionHints: ['business', 'consulting', 'freelance', 'contractor'],
    nextPhase: () => ({ phase: 'income_self_employed', subStep: 1 })
  },
  {
    phase: 'income_self_employed',
    subStep: 1,
    question: "What was your total gross revenue from this business in 2024?",
    waitingFor: 'businessIncome',
    extractionHints: ['revenue', 'income', 'gross', '$'],
    nextPhase: () => ({ phase: 'income_self_employed', subStep: 2 })
  },
  {
    phase: 'income_self_employed',
    subStep: 2,
    question: "And roughly how much did you spend on business expenses? (supplies, software, advertising, etc.)",
    waitingFor: 'businessExpenses',
    extractionHints: ['expenses', 'costs', 'deductions', '$'],
    nextPhase: (data, flags) => {
      if (flags.hasInvestments) {
        return { phase: 'income_investment', subStep: 0 }
      }
      return { phase: 'deductions_rrsp', subStep: 0 }
    }
  },

  // Investment Income
  {
    phase: 'income_investment',
    subStep: 0,
    question: "Did you earn any interest income from bank accounts or GICs?",
    waitingFor: 'interestIncome',
    extractionHints: ['interest', 'bank', 'gic', '$', 'no', 'none'],
    nextPhase: () => ({ phase: 'income_investment', subStep: 1 })
  },
  {
    phase: 'income_investment',
    subStep: 1,
    question: "Any dividend income from Canadian stocks?",
    waitingFor: 'dividendIncome',
    extractionHints: ['dividend', 'stocks', '$', 'no', 'none'],
    nextPhase: () => ({ phase: 'income_investment', subStep: 2 })
  },
  {
    phase: 'income_investment',
    subStep: 2,
    question: "Did you sell any stocks, ETFs, or property at a profit (capital gains)?",
    waitingFor: 'capitalGains',
    extractionHints: ['capital', 'gains', 'sold', 'stocks', '$', 'no', 'none'],
    nextPhase: () => ({ phase: 'deductions_rrsp', subStep: 0 })
  },

  // Deductions - RRSP
  {
    phase: 'deductions_rrsp',
    subStep: 0,
    question: "Now for deductions that can save you money. Did you contribute to an RRSP between March 2024 and March 1, 2025?",
    waitingFor: 'hasRRSP',
    extractionHints: ['yes', 'no', 'rrsp', '$'],
    nextPhase: (data, flags) => {
      if (flags.hasRRSP) {
        return { phase: 'deductions_rrsp', subStep: 1 }
      }
      return { phase: 'credits', subStep: 0 }
    }
  },
  {
    phase: 'deductions_rrsp',
    subStep: 1,
    question: "How much did you contribute to your RRSP?",
    waitingFor: 'rrspContribution',
    extractionHints: ['rrsp', 'contribution', '$'],
    nextPhase: () => ({ phase: 'credits', subStep: 0 })
  },

  // Credits
  {
    phase: 'credits',
    subStep: 0,
    question: "Did you have any medical expenses in 2024 that weren't covered by insurance? (prescriptions, dental, etc.)",
    waitingFor: 'hasMedicalExpenses',
    extractionHints: ['yes', 'no', 'medical', 'dental', '$'],
    nextPhase: (data, flags) => {
      if (flags.hasMedicalExpenses) {
        return { phase: 'credits', subStep: 1 }
      }
      return { phase: 'credits', subStep: 2 }
    }
  },
  {
    phase: 'credits',
    subStep: 1,
    question: "Roughly how much did you spend on medical expenses?",
    waitingFor: 'medicalExpenses',
    extractionHints: ['medical', 'expenses', '$'],
    nextPhase: () => ({ phase: 'credits', subStep: 2 })
  },
  {
    phase: 'credits',
    subStep: 2,
    question: "Did you make any charitable donations to registered charities?",
    waitingFor: 'hasDonations',
    extractionHints: ['yes', 'no', 'donation', 'charity', '$'],
    nextPhase: (data, flags) => {
      if (flags.hasDonations) {
        return { phase: 'credits', subStep: 3 }
      }
      return { phase: 'review', subStep: 0 }
    }
  },
  {
    phase: 'credits',
    subStep: 3,
    question: "How much did you donate in total?",
    waitingFor: 'donations',
    extractionHints: ['donation', '$'],
    nextPhase: () => ({ phase: 'review', subStep: 0 })
  },

  // Review
  {
    phase: 'review',
    subStep: 0,
    question: "Great! I've got everything I need. Take a look at the form on the right - I've filled it all in based on our conversation. Does everything look correct?",
    waitingFor: 'confirmation',
    extractionHints: ['yes', 'no', 'correct', 'change', 'fix'],
    nextPhase: (data, flags) => ({ phase: 'complete', subStep: 0 })
  }
]

// ============================================
// Utility Functions
// ============================================

export function getCurrentQuestion(state: ConversationState): QuestionNode | null {
  return QUESTION_FLOW.find(
    q => q.phase === state.phase && q.subStep === state.subStep
  ) || null
}

export function getNextQuestion(
  state: ConversationState,
  extractedData: ExtractedData
): QuestionNode | null {
  const current = getCurrentQuestion(state)
  if (!current) return null

  const next = current.nextPhase(extractedData, state.flags)
  return QUESTION_FLOW.find(
    q => q.phase === next.phase && q.subStep === next.subStep
  ) || null
}

export function formatQuestion(question: string, data: Partial<ExtractedData>): string {
  let formatted = question
  Object.entries(data).forEach(([key, value]) => {
    formatted = formatted.replace(`{${key}}`, String(value || ''))
  })
  return formatted
}

export function createInitialState(): ConversationState {
  return {
    phase: 'discovery',
    subStep: 0,
    waitingFor: 'lifeSituation',
    collectedData: {},
    flags: {
      // Income sources
      hasEmployment: false,
      hasSelfEmployment: false,
      hasInvestments: false,
      hasRentalIncome: false,
      hasOtherIncome: false,
      // Family
      hasSpouse: false,
      hasChildren: false,
      hasDependents: false,
      // Deductions & credits
      hasRRSP: false,
      hasTuition: false,
      hasChildcare: false,
      hasMedicalExpenses: false,
      hasDonations: false,
      hasMovingExpenses: false,
      hasHomeOffice: false,
      hasDisability: false,
      hasStudentLoans: false,
      // Special situations
      isFirstTimeHomeBuyer: false,
      isStudent: false,
      isNewToCanada: false,
      leftCanada: false,
      // Discovery status
      discoveryComplete: false
    }
  }
}

// Default empty flags for initialization
export function createEmptyFlags(): LifeSituationFlags {
  return {
    hasEmployment: false,
    hasSelfEmployment: false,
    hasInvestments: false,
    hasRentalIncome: false,
    hasOtherIncome: false,
    hasSpouse: false,
    hasChildren: false,
    hasDependents: false,
    hasRRSP: false,
    hasTuition: false,
    hasChildcare: false,
    hasMedicalExpenses: false,
    hasDonations: false,
    hasMovingExpenses: false,
    hasHomeOffice: false,
    hasDisability: false,
    hasStudentLoans: false,
    isFirstTimeHomeBuyer: false,
    isStudent: false,
    isNewToCanada: false,
    leftCanada: false,
    discoveryComplete: false
  }
}

// Province mapping
export const PROVINCE_MAP: Record<string, Province> = {
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
  'nl': 'NL',
  'pei': 'PE',
  'prince edward island': 'PE',
  'pe': 'PE',
  'northwest territories': 'NT',
  'nt': 'NT',
  'yukon': 'YT',
  'yt': 'YT',
  'nunavut': 'NU',
  'nu': 'NU'
}

export const MARITAL_STATUS_MAP: Record<string, MaritalStatus> = {
  'single': 'single',
  'married': 'married',
  'common-law': 'common-law',
  'common law': 'common-law',
  'commonlaw': 'common-law',
  'separated': 'separated',
  'divorced': 'divorced',
  'widowed': 'widowed'
}
