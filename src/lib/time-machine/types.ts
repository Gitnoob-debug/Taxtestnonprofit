// Tax Time Machine Types

export type FindingType =
  | 'home_office'
  | 'medical_expenses'
  | 'rrsp_room'
  | 'childcare'
  | 'moving_expenses'
  | 'tuition_credits'
  | 'charitable_donations'
  | 'union_dues'
  | 'employment_expenses'
  | 'student_loan_interest'
  | 'disability_tax_credit'
  | 'caregiver_credit'
  | 'foreign_tax_credit'
  | 'climate_action_incentive'
  | 'canada_workers_benefit'
  | 'other'

export type Confidence = 'high' | 'medium' | 'low'
export type Priority = 'high' | 'medium' | 'low'
export type AnalysisStatus = 'pending' | 'analyzing' | 'complete' | 'error'
export type FindingStatus = 'new' | 'reviewing' | 'dismissed' | 'filed' | 'approved' | 'rejected'

export interface TimeMachineAnalysis {
  id: string
  user_id: string
  tax_years: number[]
  total_potential_recovery_min: number | null
  total_potential_recovery_max: number | null
  status: AnalysisStatus
  findings_count: number
  created_at: string
  updated_at: string
}

export interface TimeMachineFinding {
  id: string
  analysis_id: string
  user_id: string
  tax_year: number
  finding_type: FindingType
  title: string
  description: string
  potential_recovery_min: number
  potential_recovery_max: number
  confidence: Confidence
  priority: Priority
  evidence: FindingEvidence
  requirements: string[]
  status: FindingStatus
  amendment_filed_at: string | null
  amendment_result: AmendmentResult | null
  created_at: string
  updated_at: string
}

export interface FindingEvidence {
  noa_data?: {
    line_number?: string
    claimed_amount?: number
    expected_amount?: number
  }
  profile_answers?: {
    question: string
    answer: boolean | string | number
  }[]
  document_refs?: {
    document_id: string
    document_type: string
    relevant_field: string
  }[]
  calculation?: {
    method: string
    inputs: Record<string, number>
    result: number
  }
}

export interface AmendmentResult {
  filed_date: string
  cra_reference?: string
  status: 'pending' | 'approved' | 'rejected' | 'partial'
  amount_approved?: number
  notes?: string
}

export interface TimeMachineProfile {
  id: string
  user_id: string
  tax_year: number
  worked_from_home: boolean | null
  work_from_home_days: number | null
  had_medical_expenses: boolean | null
  medical_expense_amount: number | null
  made_donations: boolean | null
  donation_amount: number | null
  had_childcare: boolean | null
  childcare_amount: number | null
  was_student: boolean | null
  had_student_loans: boolean | null
  student_loan_interest: number | null
  moved_for_work: boolean | null
  moving_distance_km: number | null
  had_disability: boolean | null
  cared_for_dependent: boolean | null
  dependent_disability: boolean | null
  employment_status: string | null
  had_employment_expenses: boolean | null
  had_union_dues: boolean | null
  province: string | null
  net_income: number | null
  taxable_income: number | null
  total_tax_paid: number | null
  rrsp_limit: number | null
  rrsp_contributed: number | null
  refund_or_owing: number | null
  created_at: string
  updated_at: string
}

export interface NOAData {
  id: string
  user_id: string
  tax_year: number
  document_id: string | null
  net_income: number | null
  taxable_income: number | null
  total_income_tax_deducted: number | null
  federal_tax: number | null
  provincial_tax: number | null
  cpp_contributions: number | null
  ei_premiums: number | null
  rrsp_deduction_limit: number | null
  unused_rrsp_contributions: number | null
  rrsp_contributions_available: number | null
  refund_or_balance_owing: number | null
  line_data: Record<string, number>
  cra_adjustments: Record<string, any>
  extraction_confidence: Confidence | null
  raw_extracted_text: string | null
  created_at: string
  updated_at: string
}

// Wizard state types
export interface WizardState {
  step: WizardStep
  selectedYears: number[]
  uploadedDocuments: UploadedDocument[]
  yearProfiles: Record<number, Partial<TimeMachineProfile>>
  analysisId: string | null
  analysisProgress: number
  analysisStatus: string
}

export type WizardStep = 'intro' | 'years' | 'documents' | 'questions' | 'analyzing' | 'results'

export interface UploadedDocument {
  id: string
  taxYear: number
  documentType: 'noa' | 't1' | 'supporting'
  fileName: string
  status: 'uploading' | 'processing' | 'complete' | 'error'
  extractedData?: any
  error?: string
}

// Quick questions for each year
export interface YearQuestion {
  id: string
  question: string
  field: keyof TimeMachineProfile
  type: 'boolean' | 'amount' | 'select'
  options?: { value: string; label: string }[]
  helpText?: string
  showIf?: (profile: Partial<TimeMachineProfile>) => boolean
}

// Year breakdown for results display
export interface YearBreakdown {
  year: number
  findings: TimeMachineFinding[]
  totalRecoveryMin: number
  totalRecoveryMax: number
  hasNOA: boolean
  profileComplete: boolean
}
