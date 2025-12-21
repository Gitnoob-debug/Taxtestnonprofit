// Tax Time Machine Core Analyzer
// Orchestrates the analysis process across multiple years

import { runDetection, DetectionResult } from './detectionRules'
import {
  TimeMachineAnalysis,
  TimeMachineFinding,
  TimeMachineProfile,
  NOAData,
  FindingType,
} from './types'

export interface AnalysisInput {
  userId: string
  years: number[]
  profiles: Record<number, Partial<TimeMachineProfile>>
  noaData: Record<number, Partial<NOAData>>
}

export interface AnalysisOutput {
  analysis: Omit<TimeMachineAnalysis, 'id' | 'created_at' | 'updated_at'>
  findings: Omit<TimeMachineFinding, 'id' | 'analysis_id' | 'created_at' | 'updated_at'>[]
  yearBreakdowns: YearAnalysisBreakdown[]
}

export interface YearAnalysisBreakdown {
  year: number
  findingsCount: number
  totalRecoveryMin: number
  totalRecoveryMax: number
  hasNOA: boolean
  profileAnswered: boolean
  findingTypes: FindingType[]
}

export function runFullAnalysis(input: AnalysisInput): AnalysisOutput {
  const { userId, years, profiles, noaData } = input
  const allFindings: Omit<TimeMachineFinding, 'id' | 'analysis_id' | 'created_at' | 'updated_at'>[] = []
  const yearBreakdowns: YearAnalysisBreakdown[] = []

  let totalRecoveryMin = 0
  let totalRecoveryMax = 0

  for (const year of years.sort((a, b) => b - a)) { // Most recent first
    const profile = profiles[year] || {}
    const noa = noaData[year] || null

    // Run detection rules for this year
    const detectionResults = runDetection(profile, noa, year)

    // Convert detection results to findings
    const yearFindings = detectionResults.map((result) => ({
      user_id: userId,
      tax_year: year,
      finding_type: result.findingType,
      title: result.title,
      description: result.description,
      potential_recovery_min: result.potentialRecoveryMin,
      potential_recovery_max: result.potentialRecoveryMax,
      confidence: result.confidence,
      priority: result.priority,
      evidence: result.evidence,
      requirements: result.requirements,
      status: 'new' as const,
      amendment_filed_at: null,
      amendment_result: null,
    }))

    allFindings.push(...yearFindings)

    // Calculate year totals
    const yearRecoveryMin = yearFindings.reduce((sum, f) => sum + f.potential_recovery_min, 0)
    const yearRecoveryMax = yearFindings.reduce((sum, f) => sum + f.potential_recovery_max, 0)

    totalRecoveryMin += yearRecoveryMin
    totalRecoveryMax += yearRecoveryMax

    yearBreakdowns.push({
      year,
      findingsCount: yearFindings.length,
      totalRecoveryMin: yearRecoveryMin,
      totalRecoveryMax: yearRecoveryMax,
      hasNOA: noa !== null && Object.keys(noa).length > 0,
      profileAnswered: Object.keys(profile).length > 5,
      findingTypes: yearFindings.map(f => f.finding_type),
    })
  }

  const analysis: Omit<TimeMachineAnalysis, 'id' | 'created_at' | 'updated_at'> = {
    user_id: userId,
    tax_years: years,
    total_potential_recovery_min: totalRecoveryMin,
    total_potential_recovery_max: totalRecoveryMax,
    status: 'complete',
    findings_count: allFindings.length,
  }

  return {
    analysis,
    findings: allFindings,
    yearBreakdowns,
  }
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format recovery range for display
export function formatRecoveryRange(min: number, max: number): string {
  if (min === max) {
    return formatCurrency(min)
  }
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

// Get finding type display info
export function getFindingTypeInfo(type: FindingType): { label: string; icon: string; color: string } {
  const info: Record<FindingType, { label: string; icon: string; color: string }> = {
    home_office: { label: 'Home Office', icon: 'Home', color: 'blue' },
    medical_expenses: { label: 'Medical Expenses', icon: 'Heart', color: 'red' },
    rrsp_room: { label: 'RRSP Room', icon: 'PiggyBank', color: 'green' },
    childcare: { label: 'Childcare', icon: 'Baby', color: 'purple' },
    moving_expenses: { label: 'Moving Expenses', icon: 'Truck', color: 'orange' },
    tuition_credits: { label: 'Tuition Credits', icon: 'GraduationCap', color: 'indigo' },
    charitable_donations: { label: 'Charitable Donations', icon: 'Gift', color: 'pink' },
    union_dues: { label: 'Union Dues', icon: 'Users', color: 'gray' },
    employment_expenses: { label: 'Employment Expenses', icon: 'Briefcase', color: 'blue' },
    student_loan_interest: { label: 'Student Loan Interest', icon: 'GraduationCap', color: 'indigo' },
    disability_tax_credit: { label: 'Disability Tax Credit', icon: 'Accessibility', color: 'teal' },
    caregiver_credit: { label: 'Caregiver Credit', icon: 'HeartHandshake', color: 'rose' },
    foreign_tax_credit: { label: 'Foreign Tax Credit', icon: 'Globe', color: 'cyan' },
    climate_action_incentive: { label: 'Climate Action Incentive', icon: 'Leaf', color: 'emerald' },
    canada_workers_benefit: { label: 'Canada Workers Benefit', icon: 'Wallet', color: 'yellow' },
    other: { label: 'Other', icon: 'FileText', color: 'gray' },
  }
  return info[type] || info.other
}

// Get priority badge color
export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  }
}

// Get confidence indicator
export function getConfidenceIndicator(confidence: 'high' | 'medium' | 'low'): { dots: number; label: string } {
  switch (confidence) {
    case 'high': return { dots: 4, label: 'High confidence' }
    case 'medium': return { dots: 3, label: 'Medium confidence' }
    case 'low': return { dots: 2, label: 'Low confidence - verify details' }
  }
}
