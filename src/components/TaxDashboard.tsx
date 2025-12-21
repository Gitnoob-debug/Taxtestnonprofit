'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { useSidebar } from '@/contexts/SidebarContext'
import {
  ArrowLeft,
  Loader2,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Calculator,
  MessageSquare,
  Lightbulb,
  Bell,
  Target,
  Percent,
  PiggyBank,
  RefreshCw,
  Sparkles,
  Upload,
  Zap,
  Building2,
  Landmark,
  Briefcase,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  Heart,
  GraduationCap,
  Home,
  Circle,
  X,
  Mail,
  Scan,
  Gauge,
  History
} from 'lucide-react'
import { calculateTotalTax } from '@/lib/canadianTaxData'

// TFSA contribution room by year
const TFSA_ANNUAL_LIMITS: Record<number, number> = {
  2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000, 2013: 5500,
  2014: 5500, 2015: 10000, 2016: 5500, 2017: 5500, 2018: 5500,
  2019: 6000, 2020: 6000, 2021: 6000, 2022: 6000, 2023: 6500,
  2024: 7000, 2025: 7000
}

interface ProfileData {
  province: string | null
  birth_year: number | null
  employment_status: string | null
  marital_status: string | null
  display_name: string | null
  annual_income: number | null
  spouse_income: number | null
  rrsp_contribution_room: number | null
  rrsp_contributions_ytd: number | null
  tfsa_contributions_lifetime: number | null
  has_self_employment_income: boolean
  has_investment_income: boolean
  has_rental_income: boolean
  has_employment_income: boolean
  has_medical_expenses: boolean
  has_charitable_donations: boolean
  has_childcare_expenses: boolean
  profile_completeness: number
}

interface DocumentData {
  id: string
  file_name: string
  document_type: string
  tax_year: number
  extracted_data: {
    income_amount?: number
    tax_withheld?: number
    issuer_name?: string
    document_type?: string
  } | null
  created_at: string
}

interface ConversationSummary {
  id: string
  title: string | null
  topics: string[]
  created_at: string
  updated_at: string
}

// Personalized tips based on profile (Facebook feed style)
interface TaxTip {
  id: string
  icon: 'gift' | 'heart' | 'graduation' | 'home' | 'briefcase' | 'trending' | 'piggy' | 'zap'
  title: string
  description: string
  action?: { label: string; href: string }
  priority: 'high' | 'medium' | 'low'
  category: string
}

function getPersonalizedTips(profile: ProfileData, documents: DocumentData[]): TaxTip[] {
  const tips: TaxTip[] = []
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  // RRSP optimization tips
  if (profile.rrsp_contribution_room && profile.annual_income) {
    const remaining = profile.rrsp_contribution_room - (profile.rrsp_contributions_ytd || 0)
    if (remaining > 5000) {
      const marginalRate = profile.annual_income > 235675 ? 0.53 :
                          profile.annual_income > 155625 ? 0.48 :
                          profile.annual_income > 106717 ? 0.43 :
                          profile.annual_income > 55867 ? 0.30 : 0.20
      const potentialSavings = Math.round(remaining * marginalRate)
      tips.push({
        id: 'rrsp-room',
        icon: 'piggy',
        title: `You have ${remaining.toLocaleString()} in RRSP room`,
        description: `Contributing the max could save you up to $${potentialSavings.toLocaleString()} in taxes this year.`,
        action: { label: 'Calculate savings', href: '/tools/rrsp-calculator' },
        priority: 'high',
        category: 'Savings'
      })
    }
  }

  // TFSA tips
  if (profile.birth_year) {
    tips.push({
      id: 'tfsa-growth',
      icon: 'trending',
      title: 'TFSA investments grow tax-free',
      description: 'Unlike RRSPs, TFSA withdrawals are completely tax-free. Consider using it for high-growth investments.',
      action: { label: 'RRSP vs TFSA', href: '/tools/rrsp-vs-tfsa' },
      priority: 'medium',
      category: 'Strategy'
    })
  }

  // Self-employment tips
  if (profile.has_self_employment_income) {
    tips.push({
      id: 'self-emp-expenses',
      icon: 'briefcase',
      title: 'Track all business expenses',
      description: 'Home office, vehicle, equipment, and professional fees can all be deducted from self-employment income.',
      action: { label: 'Learn more', href: '/academy/self-employment-taxes' },
      priority: 'high',
      category: 'Deductions'
    })

    // Quarterly installment reminder
    if (currentMonth === 2 || currentMonth === 5 || currentMonth === 8 || currentMonth === 11) {
      tips.push({
        id: 'installments',
        icon: 'zap',
        title: 'Quarterly tax installment due soon',
        description: 'Self-employed individuals may need to pay taxes quarterly to avoid interest charges.',
        action: { label: 'Learn about installments', href: '/academy/instalment-payments' },
        priority: 'high',
        category: 'Deadlines'
      })
    }
  }

  // Investment income tips
  if (profile.has_investment_income) {
    tips.push({
      id: 'dividend-credit',
      icon: 'gift',
      title: 'Canadian dividends get special treatment',
      description: 'Eligible Canadian dividends qualify for the dividend tax credit, making them more tax-efficient than interest.',
      action: { label: 'Calculate dividend tax', href: '/tools/dividend-tax-calculator' },
      priority: 'medium',
      category: 'Investments'
    })

    // Year-end tax-loss harvesting
    if (currentMonth >= 9) {
      tips.push({
        id: 'tax-loss',
        icon: 'trending',
        title: 'Consider tax-loss harvesting',
        description: 'Selling investments at a loss before year-end can offset capital gains and reduce your tax bill.',
        action: { label: 'Learn how', href: '/academy/tax-loss-harvesting' },
        priority: 'high',
        category: 'Year-End'
      })
    }
  }

  // Medical expenses
  if (profile.has_medical_expenses) {
    tips.push({
      id: 'medical-12mo',
      icon: 'heart',
      title: 'Medical expenses: Pick your 12-month period',
      description: 'You can claim any 12-month period ending in the tax year. Choose the period with the highest expenses!',
      action: { label: 'What qualifies', href: '/academy/medical-expenses' },
      priority: 'medium',
      category: 'Credits'
    })
  }

  // Childcare
  if (profile.has_childcare_expenses) {
    tips.push({
      id: 'childcare-claim',
      icon: 'heart',
      title: 'Childcare: Lower-income spouse claims',
      description: 'Generally, the lower-income spouse must claim childcare expenses. This maximizes the tax benefit.',
      action: { label: 'Childcare rules', href: '/academy/childcare-expenses' },
      priority: 'medium',
      category: 'Credits'
    })
  }

  // Charitable donations
  if (profile.has_charitable_donations) {
    tips.push({
      id: 'donation-combine',
      icon: 'gift',
      title: 'Combine donations with your spouse',
      description: 'Either spouse can claim all donations. The first $200 gets 15% credit, amounts above get 29% or more.',
      action: { label: 'Donation strategy', href: '/academy/charitable-donations' },
      priority: 'medium',
      category: 'Credits'
    })
  }

  // Rental income
  if (profile.has_rental_income) {
    tips.push({
      id: 'rental-cca',
      icon: 'home',
      title: 'Rental CCA: Use wisely',
      description: 'Capital Cost Allowance reduces rental income but can trigger recapture when you sell. Plan carefully.',
      action: { label: 'CCA explained', href: '/academy/rental-income-tax' },
      priority: 'medium',
      category: 'Real Estate'
    })
  }

  // Marriage/common-law tips
  if (profile.marital_status === 'married' || profile.marital_status === 'common-law') {
    if (profile.spouse_income !== null && profile.annual_income) {
      const diff = Math.abs(profile.annual_income - (profile.spouse_income || 0))
      if (diff > 30000) {
        tips.push({
          id: 'income-split',
          icon: 'heart',
          title: 'Income splitting opportunity',
          description: 'With different income levels, spousal RRSP or pension splitting could save your family thousands.',
          action: { label: 'Family optimizer', href: '/profile/family' },
          priority: 'high',
          category: 'Family'
        })
      }
    }
  }

  // Age-based tips
  if (profile.birth_year) {
    const age = currentYear - profile.birth_year
    if (age >= 65) {
      tips.push({
        id: 'pension-split',
        icon: 'gift',
        title: 'Pension income splitting available',
        description: 'At 65+, you can split up to 50% of eligible pension income with your spouse, potentially saving thousands.',
        action: { label: 'Learn how', href: '/academy/pension-income-splitting' },
        priority: 'high',
        category: 'Retirement'
      })
    } else if (age >= 60) {
      tips.push({
        id: 'cpp-timing',
        icon: 'trending',
        title: 'CPP: Start at 60, 65, or 70?',
        description: 'Taking CPP early reduces payments by 0.6%/month. Waiting until 70 increases them by 0.7%/month.',
        action: { label: 'CPP calculator', href: '/tools/cpp-retirement-calculator' },
        priority: 'medium',
        category: 'Retirement'
      })
    } else if (age < 35) {
      tips.push({
        id: 'fhsa-first-home',
        icon: 'home',
        title: 'First-time home buyer? Open an FHSA',
        description: 'The FHSA combines RRSP and TFSA benefits: tax-deductible contributions AND tax-free withdrawals for your first home.',
        action: { label: 'FHSA calculator', href: '/tools/fhsa-calculator' },
        priority: 'high',
        category: 'Home'
      })
    }
  }

  // Document-based tips
  const hasT4 = documents.some(d => d.document_type === 'T4')
  if (!hasT4 && profile.has_employment_income && currentMonth >= 1 && currentMonth <= 3) {
    tips.push({
      id: 'get-t4',
      icon: 'briefcase',
      title: 'Upload your T4 when you receive it',
      description: 'Employers must provide T4s by end of February. Upload yours to get an accurate tax estimate.',
      action: { label: 'Upload documents', href: '/profile/documents' },
      priority: 'high',
      category: 'Documents'
    })
  }

  // General seasonal tips
  if (currentMonth >= 0 && currentMonth <= 3) {
    tips.push({
      id: 'rrsp-deadline',
      icon: 'zap',
      title: 'RRSP deadline is March 1',
      description: 'Contributions made by March 1 can be deducted on your previous year return.',
      priority: 'high',
      category: 'Deadlines'
    })
  }

  if (currentMonth === 11) {
    tips.push({
      id: 'year-end-planning',
      icon: 'zap',
      title: 'Year-end tax planning',
      description: 'December is your last chance for charitable donations, TFSA contributions, and tax-loss harvesting for this year.',
      action: { label: 'Optimization report', href: '/profile/optimization' },
      priority: 'high',
      category: 'Year-End'
    })
  }

  // Sort by priority
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return tips.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]).slice(0, 8)
}

// Get document sources and what's needed from each
function getDocumentsBySource(profile: ProfileData, documents: DocumentData[]): Array<{
  source: string
  icon: 'building' | 'landmark' | 'briefcase' | 'home'
  needed: Array<{ type: string; name: string; have: boolean }>
}> {
  const sources: Array<{
    source: string
    icon: 'building' | 'landmark' | 'briefcase' | 'home'
    needed: Array<{ type: string; name: string; have: boolean }>
  }> = []

  const currentYear = new Date().getFullYear()
  const relevantDocs = documents.filter(d => d.tax_year === currentYear - 1)

  // Employer documents
  if (profile.has_employment_income) {
    const employerDocs = [
      { type: 'T4', name: 'T4 - Employment Income', have: relevantDocs.some(d => d.document_type.includes('T4') && !d.document_type.includes('T4A')) },
      { type: 'T2200', name: 'T2200 - Work from Home', have: relevantDocs.some(d => d.document_type.includes('T2200')) },
    ]
    sources.push({
      source: 'Employer',
      icon: 'building',
      needed: employerDocs
    })
  }

  // Financial institutions
  if (profile.has_investment_income || profile.rrsp_contribution_room) {
    const bankDocs = [
      { type: 'T5', name: 'T5 - Investment Income', have: relevantDocs.some(d => d.document_type.includes('T5') && !d.document_type.includes('T5008')) },
      { type: 'T3', name: 'T3 - Trust Income', have: relevantDocs.some(d => d.document_type.includes('T3')) },
      { type: 'T5008', name: 'T5008 - Securities Transactions', have: relevantDocs.some(d => d.document_type.includes('T5008')) },
      { type: 'RRSP', name: 'RRSP Contribution Receipt', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('rrsp')) },
    ]
    sources.push({
      source: 'Bank / Brokerage',
      icon: 'landmark',
      needed: bankDocs.filter(d => d.type === 'RRSP' || profile.has_investment_income)
    })
  }

  // Self-employment / Business
  if (profile.has_self_employment_income) {
    const bizDocs = [
      { type: 'Income', name: 'Business Income Records', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('business') || d.document_type.toLowerCase().includes('invoice')) },
      { type: 'Expenses', name: 'Business Expense Receipts', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('expense') || d.document_type.toLowerCase().includes('receipt')) },
      { type: 'T4A', name: 'T4A - Contract Income', have: relevantDocs.some(d => d.document_type.includes('T4A')) },
    ]
    sources.push({
      source: 'Self-Employment',
      icon: 'briefcase',
      needed: bizDocs
    })
  }

  // Rental property
  if (profile.has_rental_income) {
    const rentalDocs = [
      { type: 'Rental', name: 'Rental Income Records', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('rental')) },
      { type: 'Expenses', name: 'Property Expense Receipts', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('property') || d.document_type.toLowerCase().includes('maintenance')) },
      { type: 'Mortgage', name: 'Mortgage Interest Statement', have: relevantDocs.some(d => d.document_type.toLowerCase().includes('mortgage')) },
    ]
    sources.push({
      source: 'Rental Property',
      icon: 'home',
      needed: rentalDocs
    })
  }

  return sources
}

// Calculate year-over-year comparison from documents
function calculateYearOverYear(documents: DocumentData[], currentYear: number): {
  thisYear: { income: number; withheld: number; docCount: number }
  lastYear: { income: number; withheld: number; docCount: number }
  incomeChange: number
  incomeChangePercent: number
  withheldChange: number
  hasData: boolean
} {
  const thisYearDocs = documents.filter(d => d.tax_year === currentYear - 1)
  const lastYearDocs = documents.filter(d => d.tax_year === currentYear - 2)

  const thisYear = {
    income: thisYearDocs.reduce((sum, d) => sum + (d.extracted_data?.income_amount || 0), 0),
    withheld: thisYearDocs.reduce((sum, d) => sum + (d.extracted_data?.tax_withheld || 0), 0),
    docCount: thisYearDocs.length
  }

  const lastYear = {
    income: lastYearDocs.reduce((sum, d) => sum + (d.extracted_data?.income_amount || 0), 0),
    withheld: lastYearDocs.reduce((sum, d) => sum + (d.extracted_data?.tax_withheld || 0), 0),
    docCount: lastYearDocs.length
  }

  const incomeChange = thisYear.income - lastYear.income
  const incomeChangePercent = lastYear.income > 0 ? (incomeChange / lastYear.income) * 100 : 0
  const withheldChange = thisYear.withheld - lastYear.withheld

  return {
    thisYear,
    lastYear,
    incomeChange,
    incomeChangePercent,
    withheldChange,
    hasData: thisYear.income > 0 && lastYear.income > 0
  }
}

// Calculate RRSP optimization - how much to contribute to drop a bracket
function calculateRRSPOptimization(profile: ProfileData): {
  currentBracket: string
  currentRate: number
  nextBracketDown: string
  amountToNextBracket: number
  potentialSavings: number
} | null {
  if (!profile.annual_income || !profile.rrsp_contribution_room) return null

  const income = profile.annual_income
  const remaining = profile.rrsp_contribution_room - (profile.rrsp_contributions_ytd || 0)
  if (remaining <= 0) return null

  // Federal tax brackets for 2024
  const brackets = [
    { min: 0, max: 55867, rate: 0.15, name: '15%' },
    { min: 55867, max: 111733, rate: 0.205, name: '20.5%' },
    { min: 111733, max: 173205, rate: 0.26, name: '26%' },
    { min: 173205, max: 246752, rate: 0.29, name: '29%' },
    { min: 246752, max: Infinity, rate: 0.33, name: '33%' },
  ]

  // Find current bracket
  const currentBracketIdx = brackets.findIndex(b => income <= b.max)
  if (currentBracketIdx <= 0) return null // Already in lowest bracket

  const currentBracket = brackets[currentBracketIdx]
  const nextBracketDown = brackets[currentBracketIdx - 1]
  const amountToNextBracket = Math.min(income - nextBracketDown.max, remaining)

  if (amountToNextBracket <= 0) return null

  // Calculate savings from contributing to drop a bracket
  const savingsRate = currentBracket.rate - nextBracketDown.rate
  const potentialSavings = Math.round(amountToNextBracket * savingsRate)

  return {
    currentBracket: currentBracket.name,
    currentRate: currentBracket.rate * 100,
    nextBracketDown: nextBracketDown.name,
    amountToNextBracket,
    potentialSavings
  }
}

// Smart question suggestions based on profile
function getSmartQuestions(profile: ProfileData, documents: DocumentData[]): string[] {
  const questions: string[] = []
  const currentYear = new Date().getFullYear()

  // Income-based questions
  if (profile.annual_income && profile.annual_income > 100000) {
    questions.push("What are the best tax-deferred investment strategies for high earners?")
  }

  if (profile.has_self_employment_income) {
    questions.push("What home office expenses can I deduct as a self-employed person?")
    questions.push("Should I incorporate my business or stay as a sole proprietor?")
  }

  if (profile.has_investment_income) {
    questions.push("How can I minimize taxes on my investment income?")
    questions.push("What's the difference between capital gains and dividend taxation?")
  }

  if (profile.has_rental_income) {
    questions.push("What expenses can I deduct from my rental income?")
    questions.push("How does CCA work for rental properties?")
  }

  // RRSP questions
  if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > 10000) {
    const remaining = profile.rrsp_contribution_room - (profile.rrsp_contributions_ytd || 0)
    if (remaining > 5000) {
      questions.push(`I have $${remaining.toLocaleString()} in RRSP room. How much should I contribute?`)
    }
  }

  // Family-based questions
  if (profile.marital_status === 'married' || profile.marital_status === 'common-law') {
    if (profile.spouse_income && profile.annual_income) {
      const diff = Math.abs(profile.annual_income - profile.spouse_income)
      if (diff > 30000) {
        questions.push("How can we split income between spouses to reduce taxes?")
      }
    }
    questions.push("What are the benefits of a spousal RRSP?")
  }

  if (profile.has_childcare_expenses) {
    questions.push("How do I claim childcare expenses? Who should claim them?")
  }

  if (profile.has_medical_expenses) {
    questions.push("What medical expenses can I claim on my taxes?")
  }

  // Document-based questions
  const hasT4 = documents.some(d => d.document_type === 'T4')
  const hasT5 = documents.some(d => d.document_type === 'T5')

  if (!hasT4 && profile.has_employment_income) {
    questions.push("When will I receive my T4 slip from my employer?")
  }

  if (!hasT5 && profile.has_investment_income) {
    questions.push("Do I need a T5 slip for my investment income?")
  }

  // Age-based questions
  if (profile.birth_year) {
    const age = currentYear - profile.birth_year
    if (age >= 60 && age < 65) {
      questions.push("When should I start taking CPP benefits?")
      questions.push("How should I plan for RRSP to RRIF conversion?")
    }
    if (age >= 65) {
      questions.push("How do I maximize my OAS benefits?")
      questions.push("What is pension income splitting and how does it work?")
    }
  }

  // Default questions if we have few specific ones
  if (questions.length < 3) {
    questions.push("What tax credits might I be missing?")
    questions.push("How can I reduce my taxes before year-end?")
  }

  return questions.slice(0, 6)
}

// Get relevant calculator based on profile
function getRelevantCalculators(profile: ProfileData): Array<{name: string, slug: string, reason: string}> {
  const calculators: Array<{name: string, slug: string, reason: string}> = []

  if (profile.annual_income) {
    calculators.push({
      name: "Tax Calculator",
      slug: "tax-calculator",
      reason: `Calculate taxes on your $${profile.annual_income.toLocaleString()} income`
    })
    calculators.push({
      name: "Marginal Tax Rate",
      slug: "marginal-tax-calculator",
      reason: "See how your next dollar of income is taxed"
    })
  }

  if (profile.rrsp_contribution_room && profile.rrsp_contribution_room > 0) {
    calculators.push({
      name: "RRSP Calculator",
      slug: "rrsp-calculator",
      reason: `Optimize your $${profile.rrsp_contribution_room.toLocaleString()} RRSP room`
    })
  }

  if (profile.has_investment_income) {
    calculators.push({
      name: "Capital Gains Calculator",
      slug: "capital-gains-calculator",
      reason: "Calculate tax on investment sales"
    })
    calculators.push({
      name: "Dividend Tax Calculator",
      slug: "dividend-tax-calculator",
      reason: "See your dividend tax credit"
    })
  }

  if (profile.has_rental_income) {
    calculators.push({
      name: "Rental Property Calculator",
      slug: "rental-property-calculator",
      reason: "Calculate net rental income and CCA"
    })
  }

  if (profile.has_self_employment_income) {
    calculators.push({
      name: "Self-Employment Tax",
      slug: "self-employment-tax-calculator",
      reason: "Calculate CPP contributions and taxes"
    })
  }

  if (profile.birth_year) {
    const age = new Date().getFullYear() - profile.birth_year
    if (age >= 55) {
      calculators.push({
        name: "CPP Calculator",
        slug: "cpp-retirement-calculator",
        reason: "Plan your CPP retirement benefits"
      })
      calculators.push({
        name: "OAS Calculator",
        slug: "oas-clawback-calculator",
        reason: "Check OAS eligibility and clawback"
      })
    }
  }

  return calculators.slice(0, 4)
}

// Tax deadlines for the year
function getUpcomingDeadlines(profile: ProfileData): Array<{date: Date, title: string, description: string, urgent: boolean}> {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const deadlines: Array<{date: Date, title: string, description: string, urgent: boolean}> = []

  // RRSP deadline (first 60 days of year)
  const rrspDeadline = new Date(currentYear, 2, 1) // March 1st (or Feb 29 in leap year)
  if (currentYear % 4 === 0) {
    rrspDeadline.setDate(29)
    rrspDeadline.setMonth(1) // February
  }
  if (rrspDeadline > currentDate) {
    const daysUntil = Math.ceil((rrspDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    deadlines.push({
      date: rrspDeadline,
      title: `RRSP Contribution Deadline`,
      description: `Last day to contribute for ${currentYear - 1} tax year`,
      urgent: daysUntil <= 14
    })
  }

  // Tax filing deadline - April 30 or June 15 for self-employed
  const isSelEmployed = profile.employment_status === 'self-employed' || profile.has_self_employment_income
  const taxDeadline = new Date(currentYear, isSelEmployed ? 5 : 3, isSelEmployed ? 15 : 30)
  if (taxDeadline > currentDate) {
    const daysUntil = Math.ceil((taxDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    deadlines.push({
      date: taxDeadline,
      title: `Tax Filing Deadline`,
      description: isSelEmployed ? 'Self-employed filing deadline' : 'Personal tax return due',
      urgent: daysUntil <= 14
    })
  }

  // Quarterly installments (for self-employed or those who owe)
  if (isSelEmployed) {
    const installmentDates = [
      new Date(currentYear, 2, 15),  // March 15
      new Date(currentYear, 5, 15),  // June 15
      new Date(currentYear, 8, 15),  // September 15
      new Date(currentYear, 11, 15), // December 15
    ]

    for (const date of installmentDates) {
      if (date > currentDate) {
        const daysUntil = Math.ceil((date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
        deadlines.push({
          date,
          title: 'Tax Installment Due',
          description: 'Quarterly tax payment deadline',
          urgent: daysUntil <= 7
        })
        break // Only show next installment
      }
    }
  }

  // Year-end deadline
  const yearEnd = new Date(currentYear, 11, 31)
  if (yearEnd > currentDate) {
    const daysUntil = Math.ceil((yearEnd.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    if (daysUntil <= 60) { // Only show in last 60 days of year
      deadlines.push({
        date: yearEnd,
        title: 'Year-End Tax Planning',
        description: 'Last day for donations, TFSA, and tax-loss harvesting',
        urgent: daysUntil <= 14
      })
    }
  }

  return deadlines.sort((a, b) => a.date.getTime() - b.date.getTime())
}

export function TaxDashboard() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const { setPageContext } = useSidebar()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [documents, setDocuments] = useState<DocumentData[]>([])
  const [conversations, setConversations] = useState<ConversationSummary[]>([])

  const currentYear = new Date().getFullYear()
  const currentDate = new Date()

  // Load data
  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/')
      return
    }

    let isMounted = true

    async function loadData() {
      try {
        const token = await getToken()
        if (!token || !isMounted) {
          if (isMounted) setIsLoading(false)
          return
        }

        // Load profile, documents, and conversations in parallel
        const [profileRes, docsRes, convsRes] = await Promise.all([
          fetch('/api/supabase/profile', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('/api/supabase/documents', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch('/api/conversations/recent', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ])

        if (profileRes.ok && isMounted) {
          const data = await profileRes.json()
          if (data.profile) {
            setProfile(data.profile)
          }
        }

        if (docsRes.ok && isMounted) {
          const data = await docsRes.json()
          if (data.documents) {
            setDocuments(data.documents.filter((d: DocumentData) => d.tax_year === currentYear || d.tax_year === currentYear - 1))
          }
        }

        if (convsRes.ok && isMounted) {
          const data = await convsRes.json()
          if (data.conversations) {
            setConversations(data.conversations)
          }
        }

      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadData()

    return () => { isMounted = false }
  }, [user?.id, authLoading, router, getToken, currentYear])

  // Calculate TFSA room
  const tfsaRoom = useMemo(() => {
    if (!profile?.birth_year) return null
    const eligibleYear = Math.max(2009, profile.birth_year + 18)
    let totalRoom = 0
    for (let year = eligibleYear; year <= currentYear; year++) {
      totalRoom += TFSA_ANNUAL_LIMITS[year] || 7000
    }
    const used = profile.tfsa_contributions_lifetime || 0
    return totalRoom - used
  }, [profile?.birth_year, profile?.tfsa_contributions_lifetime, currentYear])

  // Calculate tax estimates
  const taxEstimates = useMemo(() => {
    if (!profile?.annual_income || !profile?.province) return null

    const income = profile.annual_income
    const province = profile.province

    const taxResult = calculateTotalTax(income, province)

    // Calculate from documents
    const docsThisYear = documents.filter(d => d.tax_year === currentYear - 1)
    let totalIncome = 0
    let totalWithheld = 0

    for (const doc of docsThisYear) {
      if (doc.extracted_data?.income_amount) {
        totalIncome += doc.extracted_data.income_amount
      }
      if (doc.extracted_data?.tax_withheld) {
        totalWithheld += doc.extracted_data.tax_withheld
      }
    }

    // If we have document data, use that for more accurate estimate
    let estimatedOwing = 0
    let estimatedRefund = 0

    if (totalIncome > 0 && totalWithheld > 0) {
      const actualTaxResult = calculateTotalTax(totalIncome, province)
      if (totalWithheld > actualTaxResult.totalTax) {
        estimatedRefund = totalWithheld - actualTaxResult.totalTax
      } else {
        estimatedOwing = actualTaxResult.totalTax - totalWithheld
      }
    }

    return {
      totalTax: taxResult.totalTax,
      marginalRate: taxResult.marginalRate * 100, // Convert to percentage
      effectiveRate: taxResult.effectiveRate * 100, // Convert to percentage
      documentIncome: totalIncome,
      documentWithheld: totalWithheld,
      estimatedRefund,
      estimatedOwing,
      hasDocumentData: totalIncome > 0
    }
  }, [profile?.annual_income, profile?.province, documents, currentYear])

  // Document readiness score
  const documentReadiness = useMemo(() => {
    if (!profile) return { score: 0, missing: [], have: [] }

    const requiredDocs: Array<{type: string, name: string, condition: boolean}> = [
      { type: 'T4', name: 'T4 - Employment Income', condition: profile.has_employment_income },
      { type: 'T5', name: 'T5 - Investment Income', condition: profile.has_investment_income },
      { type: 'T4A', name: 'T4A - Pension/Other Income', condition: false }, // Check pension
      { type: 'T3', name: 'T3 - Trust Income', condition: profile.has_investment_income },
      { type: 'T2202', name: 'T2202 - Tuition', condition: false },
      { type: 'Rental', name: 'Rental Income Records', condition: profile.has_rental_income },
    ]

    const needed = requiredDocs.filter(d => d.condition)
    const have: string[] = []
    const missing: string[] = []

    for (const doc of needed) {
      const hasDoc = documents.some(d =>
        d.document_type.toLowerCase().includes(doc.type.toLowerCase()) &&
        (d.tax_year === currentYear - 1 || d.tax_year === currentYear)
      )
      if (hasDoc) {
        have.push(doc.name)
      } else {
        missing.push(doc.name)
      }
    }

    const score = needed.length > 0 ? Math.round((have.length / needed.length) * 100) : 100

    return { score, missing, have }
  }, [profile, documents, currentYear])

  // Smart questions
  const smartQuestions = useMemo(() => {
    if (!profile) return []
    return getSmartQuestions(profile, documents)
  }, [profile, documents])

  // Relevant calculators
  const relevantCalculators = useMemo(() => {
    if (!profile) return []
    return getRelevantCalculators(profile)
  }, [profile])

  // Upcoming deadlines
  const deadlines = useMemo(() => {
    if (!profile) return []
    return getUpcomingDeadlines(profile)
  }, [profile])

  // Year-end countdown
  const yearEndCountdown = useMemo(() => {
    const yearEnd = new Date(currentYear, 11, 31)
    const daysLeft = Math.ceil((yearEnd.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, daysLeft)
  }, [currentYear, currentDate])

  // Personalized tips feed
  const personalizedTips = useMemo(() => {
    if (!profile) return []
    return getPersonalizedTips(profile, documents)
  }, [profile, documents])

  // Document sources checklist
  const documentSources = useMemo(() => {
    if (!profile) return []
    return getDocumentsBySource(profile, documents)
  }, [profile, documents])

  // Update sidebar context with dashboard data
  useEffect(() => {
    if (profile && !isLoading) {
      setPageContext({
        page: '/profile/dashboard',
        pageName: 'Tax Dashboard',
        timestamp: Date.now(),
        data: {
          dashboardData: {
            rrspRoom: profile.rrsp_contribution_room || undefined,
            rrspContributionsYTD: profile.rrsp_contributions_ytd || undefined,
            tfsaRoom: tfsaRoom || undefined,
            annualIncome: profile.annual_income || undefined,
            spouseIncome: profile.spouse_income || undefined,
            province: profile.province || undefined,
            employmentStatus: profile.employment_status || undefined,
            maritalStatus: profile.marital_status || undefined,
            profileCompleteness: profile.profile_completeness || undefined,
            documentsNeeded: documentSources.map(source => ({
              source: source.source,
              documents: source.needed.map(doc => ({
                type: doc.type,
                name: doc.name,
                have: doc.have
              }))
            })),
            taxTips: personalizedTips.slice(0, 5).map(tip => ({
              title: tip.title,
              description: tip.description,
              priority: tip.priority,
              category: tip.category
            })),
            hasEmploymentIncome: profile.has_employment_income,
            hasSelfEmploymentIncome: profile.has_self_employment_income,
            hasInvestmentIncome: profile.has_investment_income,
            hasRentalIncome: profile.has_rental_income
          }
        }
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isLoading, tfsaRoom, documentSources, personalizedTips])

  // RRSP optimization calculation
  const rrspOptimization = useMemo(() => {
    if (!profile) return null
    return calculateRRSPOptimization(profile)
  }, [profile])

  // Year-over-year comparison
  const yearOverYear = useMemo(() => {
    return calculateYearOverYear(documents, currentYear)
  }, [documents, currentYear])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const greeting = profile?.display_name
    ? `Welcome back, ${profile.display_name}!`
    : 'Welcome to your Tax Dashboard!'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={() => router.push('/')} className="gap-2 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Chat
            </Button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{greeting}</h1>
            <p className="text-slate-600 dark:text-slate-400">Your personalized tax command center</p>
          </div>
          <Button variant="outline" onClick={() => router.push('/profile')} className="gap-2">
            Edit Profile
          </Button>
        </div>

        {/* Quick Actions Bar */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/profile/documents"
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <Upload className="h-4 w-4" />
            Upload Document
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            <MessageSquare className="h-4 w-4 text-teal-600" />
            Ask a Question
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            <Calculator className="h-4 w-4 text-blue-600" />
            Run Calculator
          </Link>
          <Link
            href="/profile/optimization"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            <Zap className="h-4 w-4 text-amber-500" />
            View Tax Tips
          </Link>
          <Link
            href="/profile/time-machine"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <History className="h-4 w-4" />
            Tax Time Machine
          </Link>
        </div>

        {/* Tax Time Machine Promo Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-800">
                <History className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-100">
                  Discover Money You Left on the Table
                </p>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Our AI analyzes your past 10 years of tax returns to find missed deductions and credits.
                  Average Canadian recovery: $1,200+
                </p>
              </div>
            </div>
            <Link href="/profile/time-machine">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white whitespace-nowrap">
                Scan My History
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Alert Banner for urgent deadlines */}
        {deadlines.some(d => d.urgent) && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">Upcoming Deadline!</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {deadlines.find(d => d.urgent)?.title} - {deadlines.find(d => d.urgent)?.date.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Top Row: Your Numbers + Year-End Countdown + Document Readiness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Your Numbers Card */}
          <Card className="border-teal-200 dark:border-teal-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Percent className="h-4 w-4 text-teal-600" />
                Your Tax Numbers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {taxEstimates ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Marginal Rate</span>
                    <span className="font-bold text-lg text-teal-600">{taxEstimates.marginalRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Effective Rate</span>
                    <span className="font-semibold">{taxEstimates.effectiveRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Est. Tax</span>
                    <span className="font-semibold">{formatCurrency(taxEstimates.totalTax)}</span>
                  </div>
                  {profile?.rrsp_contribution_room && (
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-slate-600 dark:text-slate-400">RRSP Room</span>
                      <span className="font-semibold text-emerald-600">{formatCurrency(profile.rrsp_contribution_room - (profile.rrsp_contributions_ytd || 0))}</span>
                    </div>
                  )}
                  {tfsaRoom !== null && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">TFSA Room</span>
                      <span className="font-semibold text-blue-600">{formatCurrency(tfsaRoom)}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-slate-500">Complete your profile to see your numbers</p>
                  <Button variant="link" size="sm" onClick={() => router.push('/profile')}>
                    Complete Profile
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Year-End Countdown */}
          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                {currentYear} Tax Year Countdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-2">
                <div className="text-4xl font-bold text-purple-600">{yearEndCountdown}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mb-3">days left to optimize</div>
                <div className="space-y-2 text-xs text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Max out RRSP/TFSA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Tax-loss harvesting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    <span>Charitable donations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Readiness */}
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600" />
                Filing Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-3">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke={documentReadiness.score >= 80 ? '#10b981' : documentReadiness.score >= 50 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="6"
                      strokeDasharray={`${documentReadiness.score * 1.76} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{documentReadiness.score}%</span>
                  </div>
                </div>
                <div className="flex-1 text-sm">
                  {documentReadiness.missing.length > 0 ? (
                    <div>
                      <p className="font-medium text-amber-600">Missing:</p>
                      {documentReadiness.missing.slice(0, 2).map((doc, i) => (
                        <p key={i} className="text-slate-600 dark:text-slate-400 text-xs">{doc}</p>
                      ))}
                      {documentReadiness.missing.length > 2 && (
                        <p className="text-xs text-slate-500">+{documentReadiness.missing.length - 2} more</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-green-600 font-medium">All documents ready!</p>
                  )}
                </div>
              </div>
              <Link href="/profile/documents" className="text-xs text-teal-600 hover:underline flex items-center gap-1">
                Manage Documents <ChevronRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Tax Summary Card - Visual Breakdown */}
        {taxEstimates && profile?.annual_income && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-teal-600" />
                {currentYear} Tax Summary
              </CardTitle>
              <CardDescription>Based on your profile: {formatCurrency(profile.annual_income)} income in {profile.province?.toUpperCase() || 'ON'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Gross Income */}
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Gross Income</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(profile.annual_income)}</p>
                </div>

                {/* Estimated Tax */}
                <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                  <p className="text-xs text-red-600 uppercase tracking-wide">Total Tax</p>
                  <p className="text-xl font-bold text-red-600">{formatCurrency(taxEstimates.totalTax)}</p>
                  <p className="text-xs text-slate-500">{taxEstimates.effectiveRate.toFixed(1)}% effective</p>
                </div>

                {/* Take Home */}
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-xs text-green-600 uppercase tracking-wide">Take Home</p>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(profile.annual_income - taxEstimates.totalTax)}</p>
                  <p className="text-xs text-slate-500">{formatCurrency((profile.annual_income - taxEstimates.totalTax) / 12)}/month</p>
                </div>

                {/* Marginal Rate */}
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-xs text-purple-600 uppercase tracking-wide">Marginal Rate</p>
                  <p className="text-xl font-bold text-purple-600">{taxEstimates.marginalRate.toFixed(1)}%</p>
                  <p className="text-xs text-slate-500">Next dollar taxed</p>
                </div>
              </div>

              {/* Visual Tax Breakdown Bar */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Where your money goes:</p>
                <div className="h-6 rounded-full overflow-hidden flex">
                  <div
                    className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${((profile.annual_income - taxEstimates.totalTax) / profile.annual_income) * 100}%` }}
                  >
                    Take Home
                  </div>
                  <div
                    className="bg-red-400 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${(taxEstimates.totalTax / profile.annual_income) * 100}%` }}
                  >
                    Tax
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Year-over-Year Comparison */}
        {yearOverYear.hasData && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Year-over-Year Comparison
              </CardTitle>
              <CardDescription>Based on uploaded tax documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Income Comparison */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Total Income</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${yearOverYear.incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {yearOverYear.incomeChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {yearOverYear.incomeChangePercent >= 0 ? '+' : ''}{yearOverYear.incomeChangePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs text-slate-400">{currentYear - 2}</p>
                      <p className="font-medium">{formatCurrency(yearOverYear.lastYear.income)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{currentYear - 1}</p>
                      <p className="font-bold text-lg">{formatCurrency(yearOverYear.thisYear.income)}</p>
                    </div>
                  </div>
                </div>

                {/* Tax Withheld Comparison */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Tax Withheld</span>
                    <span className={`flex items-center gap-1 text-sm font-medium ${yearOverYear.withheldChange >= 0 ? 'text-amber-600' : 'text-green-600'}`}>
                      {yearOverYear.withheldChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {yearOverYear.lastYear.withheld > 0 ? `${yearOverYear.withheldChange >= 0 ? '+' : ''}${((yearOverYear.withheldChange / yearOverYear.lastYear.withheld) * 100).toFixed(1)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs text-slate-400">{currentYear - 2}</p>
                      <p className="font-medium">{formatCurrency(yearOverYear.lastYear.withheld)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{currentYear - 1}</p>
                      <p className="font-bold text-lg">{formatCurrency(yearOverYear.thisYear.withheld)}</p>
                    </div>
                  </div>
                </div>

                {/* Documents Uploaded */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-500">Documents Uploaded</span>
                    <span className="text-sm text-slate-400">Tax Year</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-xs text-slate-400">{currentYear - 2}</p>
                      <p className="font-medium">{yearOverYear.lastYear.docCount} docs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{currentYear - 1}</p>
                      <p className="font-bold text-lg">{yearOverYear.thisYear.docCount} docs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Summary */}
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm text-center">
                {yearOverYear.incomeChange > 0 ? (
                  <span>Your income increased by <span className="font-bold text-green-600">{formatCurrency(yearOverYear.incomeChange)}</span> ({yearOverYear.incomeChangePercent.toFixed(1)}%) from {currentYear - 2} to {currentYear - 1}</span>
                ) : yearOverYear.incomeChange < 0 ? (
                  <span>Your income decreased by <span className="font-bold text-red-600">{formatCurrency(Math.abs(yearOverYear.incomeChange))}</span> ({Math.abs(yearOverYear.incomeChangePercent).toFixed(1)}%) from {currentYear - 2} to {currentYear - 1}</span>
                ) : (
                  <span>Your income remained stable from {currentYear - 2} to {currentYear - 1}</span>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* RRSP Optimizer Widget */}
        {rrspOptimization && (
          <Card className="mb-6 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full">
                    <TrendingDown className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                      Drop to the {rrspOptimization.nextBracketDown} tax bracket
                      <ArrowDownRight className="h-4 w-4" />
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Contribute <span className="font-bold text-emerald-600">{formatCurrency(rrspOptimization.amountToNextBracket)}</span> to your RRSP
                      to save <span className="font-bold text-emerald-600">{formatCurrency(rrspOptimization.potentialSavings)}</span> in taxes
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Currently in the {rrspOptimization.currentBracket} bracket ({rrspOptimization.currentRate.toFixed(0)}% federal)
                    </p>
                  </div>
                </div>
                <Link href="/tools/rrsp-calculator">
                  <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                    Calculate <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Refund/Owing Estimator */}
        {taxEstimates?.hasDocumentData && (
          <Card className="mb-6 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${taxEstimates.estimatedRefund > 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-amber-100 dark:bg-amber-900'}`}>
                    {taxEstimates.estimatedRefund > 0 ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-amber-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Estimated {currentYear - 1} Tax Result</p>
                    <p className="text-2xl font-bold">
                      {taxEstimates.estimatedRefund > 0 ? (
                        <span className="text-green-600">Refund: {formatCurrency(taxEstimates.estimatedRefund)}</span>
                      ) : taxEstimates.estimatedOwing > 0 ? (
                        <span className="text-amber-600">Owing: {formatCurrency(taxEstimates.estimatedOwing)}</span>
                      ) : (
                        <span className="text-slate-600">Balanced</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm text-slate-500">
                  <p>Based on {documents.filter(d => d.tax_year === currentYear - 1).length} uploaded documents</p>
                  <p className="text-xs">Income: {formatCurrency(taxEstimates.documentIncome)} | Withheld: {formatCurrency(taxEstimates.documentWithheld)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upcoming Deadlines */}
        {deadlines.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {deadlines.map((deadline, idx) => {
                  const daysUntil = Math.ceil((deadline.date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border ${deadline.urgent ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/30' : 'border-slate-200 dark:border-slate-700'}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{deadline.title}</p>
                          <p className="text-xs text-slate-500">{deadline.description}</p>
                        </div>
                        {deadline.urgent && <Bell className="h-4 w-4 text-amber-500" />}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {deadline.date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className={`text-xs font-medium ${deadline.urgent ? 'text-amber-600' : 'text-slate-600'}`}>
                          {daysUntil} days
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Two Column: Smart Questions + Calculators */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Smart Question Suggestions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Questions For You
              </CardTitle>
              <CardDescription>Personalized based on your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {smartQuestions.length > 0 ? (
                smartQuestions.map((question, idx) => (
                  <Link
                    key={idx}
                    href={`/chat?q=${encodeURIComponent(question)}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <MessageSquare className="h-4 w-4 text-teal-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-teal-600">{question}</span>
                    <ChevronRight className="h-4 w-4 text-slate-300 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  Complete your profile to get personalized questions
                </p>
              )}
            </CardContent>
          </Card>

          {/* Relevant Calculators */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-500" />
                Your Calculators
              </CardTitle>
              <CardDescription>Pre-filled with your profile data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {relevantCalculators.length > 0 ? (
                relevantCalculators.map((calc, idx) => (
                  <Link
                    key={idx}
                    href={`/tools/${calc.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <Calculator className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600">{calc.name}</p>
                      <p className="text-xs text-slate-500">{calc.reason}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-500 text-center py-4">
                  Complete your profile to see relevant calculators
                </p>
              )}
              <Link
                href="/tools"
                className="flex items-center justify-center gap-2 p-2 mt-2 text-sm text-teal-600 hover:underline"
              >
                View all calculators <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Tax Planning Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Link
                href="/profile/command-center"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg transition-all border-2 border-teal-500 ring-2 ring-teal-500/20"
              >
                <Gauge className="h-6 w-6 text-teal-400 mb-2" />
                <span className="text-sm font-bold text-white text-center">Command Center</span>
              </Link>
              <Link
                href="/profile/scanner"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 hover:shadow-md transition-shadow"
              >
                <Scan className="h-6 w-6 text-teal-600 mb-2" />
                <span className="text-sm font-medium text-center">Document Scanner</span>
              </Link>
              <Link
                href="/profile/optimization"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 hover:shadow-md transition-shadow"
              >
                <TrendingUp className="h-6 w-6 text-amber-600 mb-2" />
                <span className="text-sm font-medium text-center">Tax Optimization</span>
              </Link>
              <Link
                href="/profile/scenarios"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 hover:shadow-md transition-shadow"
              >
                <Target className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-center">What-If Scenarios</span>
              </Link>
              <Link
                href="/profile/planner"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 hover:shadow-md transition-shadow"
              >
                <RefreshCw className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-center">Multi-Year Planner</span>
              </Link>
              <Link
                href="/profile/family"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 hover:shadow-md transition-shadow"
              >
                <PiggyBank className="h-6 w-6 text-pink-600 mb-2" />
                <span className="text-sm font-medium text-center">Family Optimizer</span>
              </Link>
              <Link
                href="/profile/cra-letters"
                className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 hover:shadow-md transition-shadow"
              >
                <Mail className="h-6 w-6 text-red-600 mb-2" />
                <span className="text-sm font-medium text-center">CRA Letter Decoder</span>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Document Checklist by Source */}
        {documentSources.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Documents by Source
              </CardTitle>
              <CardDescription>Track what you need from each source for {currentYear - 1} taxes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentSources.map((source, idx) => {
                  const IconComponent = source.icon === 'building' ? Building2 :
                                       source.icon === 'landmark' ? Landmark :
                                       source.icon === 'briefcase' ? Briefcase : Home
                  const haveCount = source.needed.filter(d => d.have).length
                  const totalCount = source.needed.length
                  return (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{source.source}</p>
                          <p className="text-xs text-slate-500">{haveCount}/{totalCount} documents</p>
                        </div>
                        <div className={`text-sm font-medium ${haveCount === totalCount ? 'text-green-600' : 'text-amber-600'}`}>
                          {Math.round((haveCount / totalCount) * 100)}%
                        </div>
                      </div>
                      <div className="space-y-2">
                        {source.needed.map((doc, docIdx) => (
                          <div key={docIdx} className="flex items-center gap-2 text-sm">
                            {doc.have ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-300" />
                            )}
                            <span className={doc.have ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-300'}>
                              {doc.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
              <Link href="/profile/documents" className="flex items-center justify-center gap-2 p-2 mt-4 text-sm text-teal-600 hover:underline">
                Manage all documents <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Personalized Tips Feed - Facebook style */}
        {personalizedTips.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Your Tax Tips
              </CardTitle>
              <CardDescription>Personalized recommendations based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalizedTips.map((tip) => {
                  const IconComponent = tip.icon === 'gift' ? Gift :
                                       tip.icon === 'heart' ? Heart :
                                       tip.icon === 'graduation' ? GraduationCap :
                                       tip.icon === 'home' ? Home :
                                       tip.icon === 'briefcase' ? Briefcase :
                                       tip.icon === 'trending' ? TrendingUp :
                                       tip.icon === 'piggy' ? PiggyBank : Zap
                  return (
                    <div
                      key={tip.id}
                      className={`p-4 rounded-lg border ${
                        tip.priority === 'high'
                          ? 'border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-800'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          tip.priority === 'high'
                            ? 'bg-amber-100 dark:bg-amber-900/50'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}>
                          <IconComponent className={`h-5 w-5 ${
                            tip.priority === 'high' ? 'text-amber-600' : 'text-slate-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{tip.title}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              tip.priority === 'high'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                            }`}>
                              {tip.category}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{tip.description}</p>
                          {tip.action && (
                            <Link
                              href={tip.action.href}
                              className="inline-flex items-center gap-1 mt-2 text-sm text-teal-600 hover:underline"
                            >
                              {tip.action.label} <ChevronRight className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conversation Memory */}
        {conversations.length > 0 && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-indigo-500" />
                Recent Conversations
              </CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversations.slice(0, 4).map((conv) => {
                  const daysAgo = Math.floor((new Date().getTime() - new Date(conv.updated_at).getTime()) / (1000 * 60 * 60 * 24))
                  const timeLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`
                  return (
                    <Link
                      key={conv.id}
                      href={`/chat?conversation=${conv.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate group-hover:text-teal-600">
                          {conv.title || 'Tax conversation'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {conv.topics.slice(0, 3).map((topic, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-600 dark:text-slate-300">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{timeLabel}</span>
                        <ChevronRight className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  )
                })}
              </div>
              {conversations.length > 4 && (
                <Link href="/chat" className="flex items-center justify-center gap-2 p-2 mt-3 text-sm text-teal-600 hover:underline">
                  View all conversations <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </CardContent>
          </Card>
        )}

        {/* Profile completeness reminder */}
        {profile && profile.profile_completeness < 80 && (
          <Card className="border-teal-200 dark:border-teal-800 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                    <Target className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">Complete Your Profile</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {profile.profile_completeness}% complete - Add more details for better recommendations
                    </p>
                  </div>
                </div>
                <Button onClick={() => router.push('/profile')} className="bg-teal-600 hover:bg-teal-700">
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
