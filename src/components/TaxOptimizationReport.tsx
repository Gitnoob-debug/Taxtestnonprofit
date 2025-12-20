'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Loader2,
  Sparkles,
  DollarSign,
  TrendingUp,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Lightbulb,
  Target,
  Clock,
  ArrowRight,
  FileText,
  Calculator,
  BookOpen,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile, UserProfile } from '@/hooks/useProfile'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface TaxOpportunity {
  id: string
  title: string
  description: string
  estimatedSavings: number | null
  savingsRange?: { min: number; max: number }
  priority: 'high' | 'medium' | 'low'
  category: 'deduction' | 'credit' | 'strategy' | 'timing' | 'account'
  actionItems: string[]
  relevantCalculator?: string
  relevantArticle?: string
  deadline?: string
}

interface OptimizationReport {
  generatedAt: string
  taxYear: number
  totalEstimatedSavings: { min: number; max: number }
  profileCompleteness: number
  opportunities: TaxOpportunity[]
  warnings: string[]
  summary: string
}

// Generate optimization opportunities based on profile
function generateOpportunities(profile: UserProfile): TaxOpportunity[] {
  const opportunities: TaxOpportunity[] = []
  const currentYear = new Date().getFullYear()

  // RRSP Optimization
  if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > 0) {
    const room = profile.rrsp_contribution_room
    const ytd = profile.rrsp_contributions_ytd || 0
    const remaining = room - ytd

    if (remaining > 0) {
      // Estimate tax savings based on income bracket
      const income = profile.annual_income || 60000
      let marginalRate = 0.2
      if (income > 250000) marginalRate = 0.53
      else if (income > 175000) marginalRate = 0.48
      else if (income > 100000) marginalRate = 0.43
      else if (income > 55000) marginalRate = 0.30

      const maxSavings = Math.round(remaining * marginalRate)

      opportunities.push({
        id: 'rrsp-contribution',
        title: 'Maximize RRSP Contributions',
        description: `You have $${remaining.toLocaleString()} in unused RRSP contribution room. Contributing before the deadline (March 3, 2025 for 2024 tax year) reduces your taxable income dollar-for-dollar.`,
        estimatedSavings: null,
        savingsRange: { min: Math.round(maxSavings * 0.7), max: maxSavings },
        priority: remaining > 10000 ? 'high' : 'medium',
        category: 'deduction',
        actionItems: [
          `Contribute up to $${remaining.toLocaleString()} to your RRSP`,
          'Set up automatic monthly contributions to maximize room',
          'Consider a spousal RRSP if your spouse has lower income',
        ],
        relevantCalculator: '/tools/rrsp-calculator',
        relevantArticle: '/academy/rrsp-contribution-guide',
        deadline: 'March 3, 2025',
      })
    }
  }

  // TFSA Optimization
  if (profile.has_tfsa || profile.has_investment_income) {
    const tfsaRoom = 102000 - (profile.tfsa_contributions_lifetime || 0) // Approximate max room
    if (tfsaRoom > 7000) {
      opportunities.push({
        id: 'tfsa-contribution',
        title: 'Maximize TFSA Contributions',
        description: `Tax-free growth inside a TFSA means you never pay tax on investment gains. With an estimated $${Math.min(tfsaRoom, 50000).toLocaleString()}+ in available room, this is a powerful wealth-building tool.`,
        estimatedSavings: null,
        priority: 'medium',
        category: 'account',
        actionItems: [
          'Calculate your exact TFSA contribution room via CRA My Account',
          'Consider moving taxable investments into your TFSA',
          'Prioritize high-growth investments in TFSA (tax-free gains)',
        ],
        relevantCalculator: '/tools/tfsa-calculator',
        relevantArticle: '/academy/tfsa-guide',
      })
    }
  }

  // FHSA for first-time buyers
  if (profile.is_first_time_home_buyer) {
    const fhsaContributed = profile.fhsa_contributions_lifetime || 0
    const fhsaRoom = 40000 - fhsaContributed

    if (fhsaRoom > 0) {
      const income = profile.annual_income || 60000
      let marginalRate = income > 100000 ? 0.43 : income > 55000 ? 0.30 : 0.20
      const annualContrib = Math.min(8000, fhsaRoom)
      const savings = Math.round(annualContrib * marginalRate)

      opportunities.push({
        id: 'fhsa-contribution',
        title: 'Open or Maximize FHSA',
        description: `The First Home Savings Account combines RRSP-like tax deductions with TFSA-like tax-free withdrawals. You can contribute up to $8,000/year ($40,000 lifetime) for a first home purchase.`,
        estimatedSavings: savings,
        priority: 'high',
        category: 'account',
        actionItems: [
          fhsaContributed === 0 ? 'Open an FHSA at your bank or brokerage' : 'Maximize your annual $8,000 contribution',
          'Invest contributions for growth (withdrawals are tax-free)',
          'Plan your home purchase timeline (account must be open 1+ year)',
        ],
        relevantCalculator: '/tools/fhsa-calculator',
        relevantArticle: '/academy/first-time-home-buyer-tax-benefits',
      })
    }
  }

  // Spousal RRSP for income splitting
  if (profile.marital_status === 'married' || profile.marital_status === 'common-law') {
    const userIncome = profile.annual_income || 0
    const spouseIncome = profile.spouse_income || 0

    if (userIncome > spouseIncome + 30000) {
      const incomeDiff = userIncome - spouseIncome
      const potentialSavings = Math.round(Math.min(incomeDiff * 0.1, 5000))

      opportunities.push({
        id: 'spousal-rrsp',
        title: 'Consider Spousal RRSP',
        description: `With a significant income difference between you and your spouse, contributing to a Spousal RRSP can reduce family taxes in retirement by equalizing income.`,
        estimatedSavings: null,
        savingsRange: { min: potentialSavings * 0.5, max: potentialSavings * 2 },
        priority: 'medium',
        category: 'strategy',
        actionItems: [
          'Contribute to spousal RRSP using your contribution room',
          'Plan withdrawals for after 3-year attribution period',
          'Model retirement income splitting scenarios',
        ],
        relevantArticle: '/academy/pension-income-splitting',
      })
    }
  }

  // Income Splitting - Pension
  if (profile.has_pension_income && (profile.marital_status === 'married' || profile.marital_status === 'common-law')) {
    opportunities.push({
      id: 'pension-splitting',
      title: 'Split Pension Income',
      description: `You can allocate up to 50% of eligible pension income to your spouse, potentially moving income to a lower tax bracket.`,
      estimatedSavings: null,
      savingsRange: { min: 500, max: 5000 },
      priority: 'medium',
      category: 'strategy',
      actionItems: [
        'Complete Form T1032 with your tax return',
        'Calculate optimal split percentage (not always 50%)',
        'Consider impact on each spouse\'s credits and OAS',
      ],
      relevantArticle: '/academy/pension-income-splitting',
    })
  }

  // Capital Gains Timing
  if (profile.has_capital_gains || profile.has_investment_income) {
    opportunities.push({
      id: 'capital-gains-timing',
      title: 'Optimize Capital Gains Timing',
      description: `Only 50% of capital gains are taxable. Strategic timing of sales and harvesting losses can significantly reduce your tax bill.`,
      estimatedSavings: null,
      priority: 'medium',
      category: 'timing',
      actionItems: [
        'Review unrealized gains and losses before year-end',
        'Harvest losses to offset gains (watch superficial loss rules)',
        'Consider deferring gains to a lower-income year',
      ],
      relevantCalculator: '/tools/capital-gains-calculator',
      relevantArticle: '/academy/capital-gains-tax-canada',
    })
  }

  // Home Office Expenses
  if (profile.has_home_office_expenses) {
    opportunities.push({
      id: 'home-office',
      title: 'Claim Home Office Expenses',
      description: `Working from home? You may be able to claim a portion of rent, utilities, internet, and supplies. The simplified method allows $2/day up to $500.`,
      estimatedSavings: null,
      savingsRange: { min: 100, max: 1500 },
      priority: 'medium',
      category: 'deduction',
      actionItems: [
        'Choose between simplified ($2/day) or detailed method',
        'Get Form T2200 from employer if using detailed method',
        'Track home office expenses with receipts',
      ],
      relevantArticle: '/academy/home-office-expenses',
    })
  }

  // Medical Expenses
  if (profile.has_medical_expenses) {
    opportunities.push({
      id: 'medical-expenses',
      title: 'Claim Medical Expenses',
      description: `Medical expenses over 3% of income (or $2,759) are eligible for a 15% federal credit. Combine family expenses on one return for maximum benefit.`,
      estimatedSavings: null,
      savingsRange: { min: 200, max: 2000 },
      priority: 'medium',
      category: 'credit',
      actionItems: [
        'Gather all medical receipts (prescriptions, dental, vision, etc.)',
        'Include travel costs for medical appointments (40+ km)',
        'Claim on the lower-income spouse\'s return',
      ],
      relevantArticle: '/academy/medical-expenses',
    })
  }

  // Charitable Donations
  if (profile.has_charitable_donations) {
    opportunities.push({
      id: 'charitable-donations',
      title: 'Optimize Charitable Donations',
      description: `Donations over $200 get a higher credit (29-33%). Combine 5 years of donations for maximum benefit, or donate appreciated securities to avoid capital gains.`,
      estimatedSavings: null,
      priority: 'low',
      category: 'credit',
      actionItems: [
        'Combine smaller donations across years to exceed $200',
        'Consider donating publicly traded securities directly',
        'Keep official receipts from registered charities',
      ],
      relevantArticle: '/academy/charitable-donations',
    })
  }

  // Childcare Expenses
  if (profile.has_childcare_expenses && profile.has_dependents) {
    const numKids = profile.num_dependents || 1
    const maxDeduction = numKids * 8000 // Simplified estimate

    opportunities.push({
      id: 'childcare-expenses',
      title: 'Claim Childcare Expenses',
      description: `Childcare expenses are deductible up to $8,000 per child under 7 ($5,000 for ages 7-16). Must be claimed by the lower-income spouse.`,
      estimatedSavings: null,
      savingsRange: { min: Math.round(maxDeduction * 0.2), max: Math.round(maxDeduction * 0.4) },
      priority: 'high',
      category: 'deduction',
      actionItems: [
        'Gather receipts from daycare, camps, and babysitters',
        'Get SIN or business number from care providers',
        'Claim on lower-income spouse\'s return',
      ],
      relevantArticle: '/academy/childcare-expenses',
    })
  }

  // Tuition Credits
  if (profile.has_tuition_credits) {
    opportunities.push({
      id: 'tuition-credits',
      title: 'Transfer or Carry Forward Tuition',
      description: `Unused tuition credits can be transferred to a spouse/parent (up to $5,000) or carried forward indefinitely for future years.`,
      estimatedSavings: null,
      savingsRange: { min: 500, max: 2500 },
      priority: 'medium',
      category: 'credit',
      actionItems: [
        'Get T2202 from educational institution',
        'Calculate if transfer or carry-forward is optimal',
        'Complete Schedule 11 with your return',
      ],
      relevantArticle: '/academy/education-tax-credits',
    })
  }

  // Disability Tax Credit
  if (profile.has_disability) {
    opportunities.push({
      id: 'disability-credit',
      title: 'Claim Disability Tax Credit',
      description: `The DTC provides a significant non-refundable credit and opens doors to other programs like RDSP. Worth approximately $1,500-2,500 in tax savings.`,
      estimatedSavings: null,
      savingsRange: { min: 1500, max: 2500 },
      priority: 'high',
      category: 'credit',
      actionItems: [
        'Apply for DTC certification (Form T2201) if not already approved',
        'Consider opening an RDSP for additional benefits',
        'Review eligibility for provincial disability credits',
      ],
      relevantArticle: '/academy/disability-tax-credit',
    })
  }

  // Self-Employment Deductions
  if (profile.has_self_employment_income) {
    opportunities.push({
      id: 'self-employment-deductions',
      title: 'Maximize Business Deductions',
      description: `Self-employed? Deduct business-use portion of vehicle, phone, supplies, professional fees, and home office. Proper tracking is key.`,
      estimatedSavings: null,
      savingsRange: { min: 1000, max: 10000 },
      priority: 'high',
      category: 'deduction',
      actionItems: [
        'Track all business expenses with receipts',
        'Keep a vehicle log for business-use percentage',
        'Consider incorporation if income exceeds $100K',
      ],
      relevantCalculator: '/tools/self-employment-tax-calculator',
      relevantArticle: '/academy/gig-economy-taxes',
    })
  }

  // Rental Property Deductions
  if (profile.has_rental_income) {
    opportunities.push({
      id: 'rental-deductions',
      title: 'Claim Rental Property Expenses',
      description: `Rental property owners can deduct mortgage interest, property taxes, insurance, repairs, and CCA (depreciation). Track expenses carefully.`,
      estimatedSavings: null,
      savingsRange: { min: 1000, max: 8000 },
      priority: 'high',
      category: 'deduction',
      actionItems: [
        'Track all rental expenses with receipts',
        'Consider CCA claims (weigh against future recapture)',
        'Report on Form T776 with your tax return',
      ],
      relevantCalculator: '/tools/rental-property-calculator',
    })
  }

  // CPP Enhancement for self-employed
  if (profile.has_self_employment_income) {
    opportunities.push({
      id: 'cpp-planning',
      title: 'Plan CPP Contributions',
      description: `Self-employed individuals pay both employee and employer CPP portions. Consider optimal timing for starting CPP benefits (60-70 years old).`,
      estimatedSavings: null,
      priority: 'low',
      category: 'strategy',
      actionItems: [
        'Review your CPP statement on My Service Canada',
        'Model early (60) vs late (70) start scenarios',
        'Consider working income impact on early CPP',
      ],
      relevantCalculator: '/tools/cpp-retirement-calculator',
      relevantArticle: '/academy/cpp-benefits-tax',
    })
  }

  // OAS Optimization for seniors
  if (profile.age_range === '65+' || profile.has_pension_income) {
    opportunities.push({
      id: 'oas-clawback',
      title: 'Manage OAS Clawback',
      description: `OAS benefits are clawed back at 15% for income above $93,454. Strategic income planning can preserve more of your OAS.`,
      estimatedSavings: null,
      savingsRange: { min: 500, max: 8000 },
      priority: 'high',
      category: 'strategy',
      actionItems: [
        'Calculate if income splitting reduces clawback',
        'Consider TFSA withdrawals vs RRSP/RRIF (non-taxable)',
        'Time large capital gains to minimize clawback',
      ],
      relevantCalculator: '/tools/oas-clawback-calculator',
      relevantArticle: '/academy/oas-benefits-tax',
    })
  }

  // Sort by priority and estimated savings
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  opportunities.sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority]
    if (priorityDiff !== 0) return priorityDiff

    const aSavings = a.estimatedSavings || a.savingsRange?.max || 0
    const bSavings = b.estimatedSavings || b.savingsRange?.max || 0
    return bSavings - aSavings
  })

  return opportunities
}

// Generate warnings based on profile
function generateWarnings(profile: UserProfile): string[] {
  const warnings: string[] = []

  if (!profile.province) {
    warnings.push('Set your province to get accurate provincial tax calculations.')
  }

  if (!profile.annual_income) {
    warnings.push('Add your annual income for more accurate savings estimates.')
  }

  if (profile.has_self_employment_income && !profile.business_type) {
    warnings.push('Specify your business type for relevant self-employment advice.')
  }

  if (profile.profile_completeness < 50) {
    warnings.push('Complete more of your profile for personalized recommendations.')
  }

  return warnings
}

export function TaxOptimizationReport() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [report, setReport] = useState<OptimizationReport | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!user) {
      router.push('/profile')
      return
    }

    // Auto-generate report when profile loads
    if (profile && !report) {
      generateReport()
    }
  }, [user, authLoading, profileLoading, profile])

  const generateReport = () => {
    if (!profile) return

    setIsGenerating(true)

    // Simulate brief loading for UX
    setTimeout(() => {
      const opportunities = generateOpportunities(profile)
      const warnings = generateWarnings(profile)

      // Calculate total estimated savings
      let minSavings = 0
      let maxSavings = 0
      for (const opp of opportunities) {
        if (opp.estimatedSavings) {
          minSavings += opp.estimatedSavings * 0.8
          maxSavings += opp.estimatedSavings
        } else if (opp.savingsRange) {
          minSavings += opp.savingsRange.min
          maxSavings += opp.savingsRange.max
        }
      }

      const summaryParts = []
      if (opportunities.filter(o => o.priority === 'high').length > 0) {
        summaryParts.push(`${opportunities.filter(o => o.priority === 'high').length} high-priority opportunities`)
      }
      if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > (profile.rrsp_contributions_ytd || 0)) {
        summaryParts.push('unused RRSP room')
      }
      if (profile.is_first_time_home_buyer) {
        summaryParts.push('FHSA eligibility')
      }

      setReport({
        generatedAt: new Date().toISOString(),
        taxYear: 2024,
        totalEstimatedSavings: { min: Math.round(minSavings), max: Math.round(maxSavings) },
        profileCompleteness: profile.profile_completeness,
        opportunities,
        warnings,
        summary: summaryParts.length > 0
          ? `Based on your profile, we found ${summaryParts.join(', ')}.`
          : 'Complete more of your profile to unlock personalized recommendations.',
      })

      setIsGenerating(false)
    }, 800)
  }

  const getCategoryIcon = (category: TaxOpportunity['category']) => {
    switch (category) {
      case 'deduction': return <DollarSign className="h-4 w-4" />
      case 'credit': return <CheckCircle2 className="h-4 w-4" />
      case 'strategy': return <Target className="h-4 w-4" />
      case 'timing': return <Clock className="h-4 w-4" />
      case 'account': return <PiggyBank className="h-4 w-4" />
      default: return <Lightbulb className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: TaxOpportunity['category']) => {
    switch (category) {
      case 'deduction': return 'Tax Deduction'
      case 'credit': return 'Tax Credit'
      case 'strategy': return 'Strategy'
      case 'timing': return 'Timing'
      case 'account': return 'Account'
      default: return 'Opportunity'
    }
  }

  const getPriorityColor = (priority: TaxOpportunity['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          {report && (
            <Button variant="outline" onClick={generateReport} disabled={isGenerating} className="gap-2">
              <RefreshCw className={cn("h-4 w-4", isGenerating && "animate-spin")} />
              Refresh
            </Button>
          )}
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Sparkles className="h-6 w-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Tax Optimization Report</h1>
          </div>
          <p className="text-slate-500">
            Personalized tax-saving strategies based on your profile for the 2024 tax year.
          </p>
        </div>

        {/* Loading State */}
        {isGenerating && !report && (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing your tax situation...</h3>
                <p className="text-slate-500">Finding optimization opportunities based on your profile.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report Content */}
        {report && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-2">
                      Potential Tax Savings
                    </h2>
                    <p className="text-3xl font-bold text-emerald-700">
                      {report.totalEstimatedSavings.min > 0 ? (
                        <>
                          ${report.totalEstimatedSavings.min.toLocaleString()} - ${report.totalEstimatedSavings.max.toLocaleString()}
                        </>
                      ) : (
                        'Complete profile for estimates'
                      )}
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      {report.opportunities.length} optimization {report.opportunities.length === 1 ? 'opportunity' : 'opportunities'} found
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 mb-1">Profile Completeness</p>
                    <div className="flex items-center gap-3">
                      <Progress value={report.profileCompleteness} className="w-32 h-2" />
                      <span className="text-sm font-medium text-slate-700">{report.profileCompleteness}%</span>
                    </div>
                    {report.profileCompleteness < 70 && (
                      <Link href="/profile" className="text-xs text-emerald-600 hover:underline mt-1 inline-block">
                        Complete profile for better recommendations
                      </Link>
                    )}
                  </div>
                </div>

                {report.summary && (
                  <p className="mt-4 text-sm text-slate-700 bg-white/50 p-3 rounded-lg">
                    {report.summary}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Warnings */}
            {report.warnings.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-medium text-amber-900 mb-2">Improve Your Recommendations</h3>
                      <ul className="space-y-1">
                        {report.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-amber-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Priority Legend */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-500">Priority:</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">High</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">Medium</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">Low</span>
            </div>

            {/* Opportunities List */}
            <div className="space-y-4">
              {report.opportunities.map((opportunity) => {
                const isExpanded = expandedOpportunity === opportunity.id
                return (
                  <Card
                    key={opportunity.id}
                    className={cn(
                      "transition-all hover:shadow-md cursor-pointer",
                      isExpanded && "ring-2 ring-emerald-200"
                    )}
                    onClick={() => setExpandedOpportunity(isExpanded ? null : opportunity.id)}
                  >
                    <CardContent className="p-4">
                      {/* Header Row */}
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "p-2 rounded-lg shrink-0",
                          opportunity.priority === 'high' ? 'bg-red-100' :
                          opportunity.priority === 'medium' ? 'bg-amber-100' : 'bg-blue-100'
                        )}>
                          {getCategoryIcon(opportunity.category)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-slate-900">
                              {opportunity.title}
                            </h3>
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full border",
                              getPriorityColor(opportunity.priority)
                            )}>
                              {opportunity.priority}
                            </span>
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              {getCategoryLabel(opportunity.category)}
                            </span>
                          </div>

                          <p className="text-sm text-slate-600 line-clamp-2">
                            {opportunity.description}
                          </p>

                          {/* Savings Estimate */}
                          {(opportunity.estimatedSavings || opportunity.savingsRange) && (
                            <div className="mt-2 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-emerald-600" />
                              <span className="text-sm font-medium text-emerald-700">
                                Potential savings:{' '}
                                {opportunity.estimatedSavings
                                  ? `$${opportunity.estimatedSavings.toLocaleString()}`
                                  : opportunity.savingsRange
                                    ? `$${opportunity.savingsRange.min.toLocaleString()} - $${opportunity.savingsRange.max.toLocaleString()}`
                                    : 'Varies'}
                              </span>
                            </div>
                          )}

                          {opportunity.deadline && (
                            <div className="mt-1 flex items-center gap-2">
                              <Clock className="h-4 w-4 text-amber-600" />
                              <span className="text-sm text-amber-700">
                                Deadline: {opportunity.deadline}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="shrink-0 text-slate-400">
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <h4 className="text-sm font-medium text-slate-700 mb-3">Action Items</h4>
                          <ul className="space-y-2 mb-4">
                            {opportunity.actionItems.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                <ArrowRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>

                          {/* Related Resources */}
                          <div className="flex flex-wrap gap-2">
                            {opportunity.relevantCalculator && (
                              <Link
                                href={opportunity.relevantCalculator}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                              >
                                <Calculator className="h-4 w-4" />
                                Open Calculator
                              </Link>
                            )}
                            {opportunity.relevantArticle && (
                              <Link
                                href={opportunity.relevantArticle}
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1 text-sm px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                <BookOpen className="h-4 w-4" />
                                Learn More
                              </Link>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Empty State */}
            {report.opportunities.length === 0 && (
              <Card>
                <CardContent className="py-16">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No opportunities found yet</h3>
                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                      Complete more of your profile to unlock personalized tax optimization recommendations.
                    </p>
                    <Button onClick={() => router.push('/profile')} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                      Complete Your Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA Card */}
            {report.opportunities.length > 0 && (
              <Card className="bg-slate-900 text-white">
                <CardContent className="py-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Need personalized advice?</h3>
                      <p className="text-sm text-slate-300">
                        Ask our AI assistant for detailed guidance on any of these strategies.
                      </p>
                    </div>
                    <Button
                      onClick={() => router.push('/chat')}
                      variant="secondary"
                      className="gap-2 shrink-0"
                    >
                      <Sparkles className="h-4 w-4" />
                      Ask Tax Assistant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Footer */}
            <p className="text-xs text-slate-400 text-center">
              Generated on {new Date(report.generatedAt).toLocaleDateString('en-CA', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}. Estimates are approximate and based on your profile data. Consult a tax professional for specific advice.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
