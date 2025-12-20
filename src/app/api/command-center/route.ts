import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'
import {
  calculateTotalTax,
  calculateRRSPTaxSavings,
  calculateTFSARoom,
  calculateCPPContributions,
  calculateEIPremiums,
  FEDERAL_BRACKETS,
  PROVINCIAL_BRACKETS,
  RRSP_LIMIT_2025,
  TFSA_LIMIT_2025,
  FHSA_ANNUAL_LIMIT,
  PROVINCE_NAMES,
  TAX_YEAR,
} from '@/lib/canadianTaxData'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

interface UserProfile {
  province: string | null
  birth_year: number | null
  annual_income: number | null
  spouse_income: number | null
  rrsp_contribution_room: number | null
  rrsp_contributions_ytd: number | null
  tfsa_contributions_lifetime: number | null
  fhsa_contributions_lifetime: number | null
  employment_status: string | null
  marital_status: string | null
  has_employment_income: boolean
  has_self_employment_income: boolean
  has_investment_income: boolean
  has_rental_income: boolean
  has_rrsp_contributions: boolean
  has_medical_expenses: boolean
  has_charitable_donations: boolean
  has_childcare_expenses: boolean
  has_home_office_expenses: boolean
  has_dependents: boolean
  num_dependents: number
  is_first_time_home_buyer: boolean
  has_tfsa: boolean
  has_fhsa: boolean
  profile_completeness: number
}

interface TaxPosition {
  estimatedIncome: number
  federalTax: number
  provincialTax: number
  totalTax: number
  effectiveRate: number
  marginalRate: number
  cppContributions: number
  eiPremiums: number
  taxWithheld: number  // From T4s, estimated
  estimatedRefund: number
  province: string
  provinceName: string
}

interface TaxBracketPosition {
  currentBracket: number
  currentBracketRate: number
  nextBracketThreshold: number
  amountToNextBracket: number
  combinedMarginalRate: number
}

interface Opportunity {
  id: string
  title: string
  description: string
  potentialSavings: number
  priority: 'high' | 'medium' | 'low'
  actionType: 'contribute' | 'claim' | 'optimize' | 'review'
  category: 'rrsp' | 'tfsa' | 'fhsa' | 'deduction' | 'credit' | 'income-splitting'
  actionUrl?: string
  calculatorSlug?: string
}

interface Deadline {
  name: string
  date: string
  daysUntil: number
  urgency: 'urgent' | 'soon' | 'normal'
  description: string
}

interface TaxScore {
  score: number
  maxScore: number
  percentile: number
  factors: {
    name: string
    score: number
    maxScore: number
    status: 'excellent' | 'good' | 'fair' | 'needs-attention'
  }[]
}

interface CommandCenterData {
  taxPosition: TaxPosition
  bracketPosition: TaxBracketPosition
  opportunities: Opportunity[]
  deadlines: Deadline[]
  taxScore: TaxScore
  optimizationPercentage: number
  documentCount: number
  lastUpdated: string
}

// Calculate key deadlines
function calculateDeadlines(): Deadline[] {
  const now = new Date()
  const currentYear = now.getFullYear()

  const deadlines: { name: string; date: Date; description: string }[] = [
    {
      name: 'RRSP Contribution Deadline',
      date: new Date(currentYear, 2, 3), // March 3 (or first business day after March 1)
      description: 'Last day to contribute to RRSP for previous tax year deduction'
    },
    {
      name: 'Tax Filing Deadline',
      date: new Date(currentYear, 3, 30), // April 30
      description: 'Deadline to file your income tax return'
    },
    {
      name: 'Self-Employed Filing Deadline',
      date: new Date(currentYear, 5, 15), // June 15
      description: 'Extended deadline for self-employed individuals'
    },
    {
      name: 'Q1 Tax Installment',
      date: new Date(currentYear, 2, 15), // March 15
      description: 'First quarterly installment payment due'
    },
    {
      name: 'Q2 Tax Installment',
      date: new Date(currentYear, 5, 15), // June 15
      description: 'Second quarterly installment payment due'
    },
    {
      name: 'Q3 Tax Installment',
      date: new Date(currentYear, 8, 15), // September 15
      description: 'Third quarterly installment payment due'
    },
    {
      name: 'Q4 Tax Installment',
      date: new Date(currentYear, 11, 15), // December 15
      description: 'Fourth quarterly installment payment due'
    },
  ]

  // Filter to upcoming deadlines and calculate days until
  return deadlines
    .map(d => {
      let date = d.date
      // If date has passed this year, use next year
      if (date < now) {
        date = new Date(currentYear + 1, date.getMonth(), date.getDate())
      }

      const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

      let urgency: 'urgent' | 'soon' | 'normal' = 'normal'
      if (daysUntil <= 7) urgency = 'urgent'
      else if (daysUntil <= 30) urgency = 'soon'

      return {
        name: d.name,
        date: date.toISOString().split('T')[0],
        daysUntil,
        urgency,
        description: d.description
      }
    })
    .filter(d => d.daysUntil <= 120) // Only show deadlines within 4 months
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 5) // Top 5 deadlines
}

// Calculate opportunities based on profile
function calculateOpportunities(profile: UserProfile, taxPosition: TaxPosition): Opportunity[] {
  const opportunities: Opportunity[] = []

  // RRSP opportunity
  if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > 0) {
    const unusedRoom = profile.rrsp_contribution_room - (profile.rrsp_contributions_ytd || 0)
    if (unusedRoom > 0) {
      const maxContribution = Math.min(unusedRoom, RRSP_LIMIT_2025)
      const savings = calculateRRSPTaxSavings(
        maxContribution,
        profile.annual_income || 0,
        profile.province || 'ON'
      )

      opportunities.push({
        id: 'rrsp-room',
        title: 'RRSP Contribution Room',
        description: `You have $${unusedRoom.toLocaleString()} in unused RRSP room. Contributing could save you significant taxes.`,
        potentialSavings: savings.taxSavings,
        priority: savings.taxSavings > 2000 ? 'high' : 'medium',
        actionType: 'contribute',
        category: 'rrsp',
        calculatorSlug: 'rrsp-calculator'
      })
    }
  }

  // TFSA opportunity
  if (profile.birth_year) {
    const tfsaRoom = calculateTFSARoom(profile.birth_year, profile.tfsa_contributions_lifetime || 0)
    if (tfsaRoom > 0) {
      opportunities.push({
        id: 'tfsa-room',
        title: 'TFSA Contribution Room',
        description: `You have $${tfsaRoom.toLocaleString()} in TFSA room. Tax-free growth awaits!`,
        potentialSavings: Math.round(tfsaRoom * 0.05 * taxPosition.marginalRate), // Estimate: 5% return, taxed at marginal rate
        priority: tfsaRoom > 10000 ? 'medium' : 'low',
        actionType: 'contribute',
        category: 'tfsa',
        calculatorSlug: 'tfsa-room-calculator'
      })
    }
  }

  // FHSA opportunity for first-time home buyers
  if (profile.is_first_time_home_buyer && (!profile.fhsa_contributions_lifetime || profile.fhsa_contributions_lifetime < 40000)) {
    const fhsaRoom = FHSA_ANNUAL_LIMIT - (profile.fhsa_contributions_lifetime || 0) % FHSA_ANNUAL_LIMIT
    if (fhsaRoom > 0) {
      const savings = fhsaRoom * taxPosition.marginalRate
      opportunities.push({
        id: 'fhsa-room',
        title: 'First Home Savings Account',
        description: `As a first-time home buyer, you can contribute $${fhsaRoom.toLocaleString()} to your FHSA this year.`,
        potentialSavings: Math.round(savings),
        priority: 'high',
        actionType: 'contribute',
        category: 'fhsa',
        actionUrl: '/tools/fhsa-calculator'
      })
    }
  }

  // Home office deduction
  if (profile.has_home_office_expenses || profile.employment_status === 'self-employed') {
    opportunities.push({
      id: 'home-office',
      title: 'Home Office Deduction',
      description: 'If you work from home, you may be able to claim home office expenses.',
      potentialSavings: 500, // Conservative estimate
      priority: 'medium',
      actionType: 'claim',
      category: 'deduction',
      actionUrl: '/academy/home-office-expenses'
    })
  }

  // Medical expenses
  if (profile.has_medical_expenses) {
    opportunities.push({
      id: 'medical-expenses',
      title: 'Medical Expense Credit',
      description: 'Make sure you\'re claiming all eligible medical expenses for you and your family.',
      potentialSavings: 400,
      priority: 'medium',
      actionType: 'claim',
      category: 'credit',
      calculatorSlug: 'medical-expense-calculator'
    })
  }

  // Charitable donations
  if (profile.has_charitable_donations) {
    opportunities.push({
      id: 'donations',
      title: 'Charitable Donation Credits',
      description: 'Donations over $200 get a higher credit rate. Consider bundling donations.',
      potentialSavings: 300,
      priority: 'medium',
      actionType: 'optimize',
      category: 'credit',
      calculatorSlug: 'donation-credit-calculator'
    })
  }

  // Childcare expenses
  if (profile.has_childcare_expenses && profile.has_dependents) {
    opportunities.push({
      id: 'childcare',
      title: 'Childcare Expense Deduction',
      description: 'You can deduct childcare costs. Make sure you have receipts with provider SIN/BN.',
      potentialSavings: 1000,
      priority: 'high',
      actionType: 'claim',
      category: 'deduction',
      calculatorSlug: 'childcare-expense-calculator'
    })
  }

  // Income splitting for married/common-law
  if ((profile.marital_status === 'married' || profile.marital_status === 'common-law') && profile.spouse_income) {
    const incomeDiff = Math.abs((profile.annual_income || 0) - profile.spouse_income)
    if (incomeDiff > 30000) {
      opportunities.push({
        id: 'income-splitting',
        title: 'Income Splitting Opportunity',
        description: 'With different income levels, consider spousal RRSP or pension income splitting.',
        potentialSavings: Math.round(incomeDiff * 0.05), // Rough estimate
        priority: 'medium',
        actionType: 'optimize',
        category: 'income-splitting',
        actionUrl: '/academy/family-income-splitting'
      })
    }
  }

  // Sort by potential savings
  return opportunities.sort((a, b) => b.potentialSavings - a.potentialSavings)
}

// Calculate tax score
function calculateTaxScore(profile: UserProfile, opportunities: Opportunity[]): TaxScore {
  const factors: TaxScore['factors'] = []

  // Factor 1: Profile completeness (max 200)
  const completenessScore = Math.round((profile.profile_completeness || 0) * 2)
  factors.push({
    name: 'Profile Completeness',
    score: completenessScore,
    maxScore: 200,
    status: completenessScore >= 160 ? 'excellent' : completenessScore >= 120 ? 'good' : completenessScore >= 80 ? 'fair' : 'needs-attention'
  })

  // Factor 2: RRSP utilization (max 200)
  let rrspScore = 0
  if (profile.rrsp_contribution_room) {
    const utilization = (profile.rrsp_contributions_ytd || 0) / profile.rrsp_contribution_room
    rrspScore = Math.min(200, Math.round(utilization * 200))
  }
  factors.push({
    name: 'RRSP Utilization',
    score: rrspScore,
    maxScore: 200,
    status: rrspScore >= 160 ? 'excellent' : rrspScore >= 100 ? 'good' : rrspScore >= 50 ? 'fair' : 'needs-attention'
  })

  // Factor 3: Tax-sheltered savings (TFSA + FHSA) (max 150)
  let shelterScore = 0
  if (profile.has_tfsa) shelterScore += 75
  if (profile.has_fhsa && profile.is_first_time_home_buyer) shelterScore += 75
  else if (!profile.is_first_time_home_buyer) shelterScore += 75 // Not applicable, give credit
  factors.push({
    name: 'Tax-Sheltered Accounts',
    score: shelterScore,
    maxScore: 150,
    status: shelterScore >= 120 ? 'excellent' : shelterScore >= 75 ? 'good' : 'needs-attention'
  })

  // Factor 4: Deductions claimed (max 200)
  let deductionCount = 0
  if (profile.has_rrsp_contributions) deductionCount++
  if (profile.has_medical_expenses) deductionCount++
  if (profile.has_charitable_donations) deductionCount++
  if (profile.has_childcare_expenses) deductionCount++
  if (profile.has_home_office_expenses) deductionCount++
  const deductionScore = Math.min(200, deductionCount * 40)
  factors.push({
    name: 'Deductions & Credits',
    score: deductionScore,
    maxScore: 200,
    status: deductionScore >= 160 ? 'excellent' : deductionScore >= 80 ? 'good' : deductionScore >= 40 ? 'fair' : 'needs-attention'
  })

  // Factor 5: Opportunity capture (max 150) - inverse of unclaimed opportunities
  const totalOpportunitySavings = opportunities.reduce((sum, o) => sum + o.potentialSavings, 0)
  const opportunityScore = totalOpportunitySavings > 5000 ? 0 :
                          totalOpportunitySavings > 2000 ? 50 :
                          totalOpportunitySavings > 500 ? 100 : 150
  factors.push({
    name: 'Optimization Level',
    score: opportunityScore,
    maxScore: 150,
    status: opportunityScore >= 120 ? 'excellent' : opportunityScore >= 75 ? 'good' : opportunityScore >= 50 ? 'fair' : 'needs-attention'
  })

  const totalScore = factors.reduce((sum, f) => sum + f.score, 0)
  const maxScore = factors.reduce((sum, f) => sum + f.maxScore, 0)

  // Estimate percentile (simplified)
  const percentile = Math.min(99, Math.round((totalScore / maxScore) * 100 + Math.random() * 10))

  return {
    score: totalScore,
    maxScore,
    percentile,
    factors
  }
}

// Calculate bracket position
function calculateBracketPosition(income: number, province: string): TaxBracketPosition {
  // Find current federal bracket
  let currentFederalBracket = FEDERAL_BRACKETS[0]
  for (const bracket of FEDERAL_BRACKETS) {
    if (income <= bracket.max) {
      currentFederalBracket = bracket
      break
    }
  }

  // Find next federal bracket
  const federalBracketIndex = FEDERAL_BRACKETS.indexOf(currentFederalBracket)
  const nextFederalBracket = FEDERAL_BRACKETS[federalBracketIndex + 1]

  // Find current provincial bracket
  const provBrackets = PROVINCIAL_BRACKETS[province] || PROVINCIAL_BRACKETS['ON']
  let currentProvBracket = provBrackets[0]
  for (const bracket of provBrackets) {
    if (income <= bracket.max) {
      currentProvBracket = bracket
      break
    }
  }

  // Combined marginal rate
  const combinedMarginalRate = currentFederalBracket.rate + currentProvBracket.rate

  // Distance to next bracket (use federal as primary)
  const nextThreshold = nextFederalBracket ? nextFederalBracket.min : currentFederalBracket.max
  const amountToNext = Math.max(0, nextThreshold - income)

  return {
    currentBracket: federalBracketIndex + 1,
    currentBracketRate: currentFederalBracket.rate,
    nextBracketThreshold: nextThreshold,
    amountToNextBracket: amountToNext,
    combinedMarginalRate
  }
}

export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError
    }

    // Get document scan count
    const { count: docCount } = await supabaseAdmin
      .from('document_scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    // Use profile data or defaults
    const userProfile: UserProfile = profile || {
      province: 'ON',
      birth_year: 1990,
      annual_income: 60000,
      spouse_income: null,
      rrsp_contribution_room: 20000,
      rrsp_contributions_ytd: 0,
      tfsa_contributions_lifetime: 0,
      fhsa_contributions_lifetime: 0,
      employment_status: 'employed',
      marital_status: 'single',
      has_employment_income: true,
      has_self_employment_income: false,
      has_investment_income: false,
      has_rental_income: false,
      has_rrsp_contributions: false,
      has_medical_expenses: false,
      has_charitable_donations: false,
      has_childcare_expenses: false,
      has_home_office_expenses: false,
      has_dependents: false,
      num_dependents: 0,
      is_first_time_home_buyer: false,
      has_tfsa: false,
      has_fhsa: false,
      profile_completeness: 0
    }

    const province = userProfile.province || 'ON'
    const income = userProfile.annual_income || 60000

    // Calculate tax position
    const taxCalc = calculateTotalTax(income, province)
    const cppContribs = calculateCPPContributions(income)
    const eiPremiums = calculateEIPremiums(income, province === 'QC')

    // Estimate tax withheld (assume employer withholds correctly)
    const estimatedWithheld = taxCalc.totalTax + cppContribs.total + eiPremiums

    // Estimate refund (simplified - assumes some deductions not yet captured)
    const estimatedDeductions = (userProfile.rrsp_contributions_ytd || 0) * taxCalc.marginalRate
    const estimatedRefund = estimatedDeductions + 500 // Small buffer for credits

    const taxPosition: TaxPosition = {
      estimatedIncome: income,
      federalTax: taxCalc.federalTax,
      provincialTax: taxCalc.provincialTax,
      totalTax: taxCalc.totalTax,
      effectiveRate: taxCalc.effectiveRate,
      marginalRate: taxCalc.marginalRate,
      cppContributions: cppContribs.total,
      eiPremiums,
      taxWithheld: estimatedWithheld,
      estimatedRefund: Math.round(estimatedRefund),
      province,
      provinceName: PROVINCE_NAMES[province] || province
    }

    // Calculate bracket position
    const bracketPosition = calculateBracketPosition(income, province)

    // Calculate opportunities
    const opportunities = calculateOpportunities(userProfile, taxPosition)

    // Calculate deadlines
    const deadlines = calculateDeadlines()

    // Calculate tax score
    const taxScore = calculateTaxScore(userProfile, opportunities)

    // Calculate optimization percentage
    const totalPotentialSavings = opportunities.reduce((sum, o) => sum + o.potentialSavings, 0)
    const maxReasonableSavings = income * 0.15 // Assume max 15% of income could be saved
    const optimizationPercentage = Math.min(100, Math.round(100 - (totalPotentialSavings / maxReasonableSavings * 100)))

    const data: CommandCenterData = {
      taxPosition,
      bracketPosition,
      opportunities,
      deadlines,
      taxScore,
      optimizationPercentage: Math.max(0, optimizationPercentage),
      documentCount: docCount || 0,
      lastUpdated: new Date().toISOString()
    }

    return Response.json({ success: true, data })

  } catch (err) {
    console.error('[COMMAND-CENTER] Error:', err)
    return Response.json({
      error: 'Failed to load command center data',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
