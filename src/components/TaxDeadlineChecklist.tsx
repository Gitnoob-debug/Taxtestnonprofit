'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserProfile } from '@/hooks/useProfile'

interface TaxDeadlineChecklistProps {
  profile: UserProfile | null
  isLoggedIn: boolean
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  deadline: Date | null
  category: 'filing' | 'contribution' | 'payment' | 'document'
  relevantFor?: string[] // employment statuses this applies to
  profileCondition?: (profile: UserProfile | null) => boolean
}

const TAX_YEAR = 2024 // Tax year being filed

// Dynamic deadline calculations
const getDeadlines = () => {
  const year = new Date().getFullYear()
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  // RRSP deadline is 60 days into the year (Feb 29 or Mar 1)
  const rrspDeadline = isLeapYear
    ? new Date(year, 1, 29) // Feb 29
    : new Date(year, 2, 1)   // Mar 1

  return {
    rrspDeadline,
    taxFilingDeadline: new Date(year, 3, 30), // April 30
    selfEmployedFilingDeadline: new Date(year, 5, 15), // June 15
    taxPaymentDeadline: new Date(year, 3, 30), // April 30 (payment due even if filing June 15)
    q1Installment: new Date(year, 2, 15), // Mar 15
    q2Installment: new Date(year, 5, 15), // Jun 15
    q3Installment: new Date(year, 8, 15), // Sep 15
    q4Installment: new Date(year, 11, 15), // Dec 15
  }
}

export function TaxDeadlineChecklist({ profile, isLoggedIn }: TaxDeadlineChecklistProps) {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [isExpanded, setIsExpanded] = useState(true)

  const deadlines = useMemo(() => getDeadlines(), [])

  // Load completed items from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`tax-checklist-${TAX_YEAR}`)
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)))
    }
  }, [])

  // Save completed items to localStorage
  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      localStorage.setItem(`tax-checklist-${TAX_YEAR}`, JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }

  const isSelfEmployed = profile?.employment_status === 'self-employed' ||
                         profile?.has_self_employment_income

  // Build checklist items based on profile
  const checklistItems: ChecklistItem[] = useMemo(() => {
    const items: ChecklistItem[] = [
      // Document gathering
      {
        id: 'gather-t4',
        title: 'Gather T4 slips',
        description: 'Employment income slips from all employers',
        deadline: new Date(deadlines.taxFilingDeadline.getFullYear(), 1, 28), // End of Feb
        category: 'document',
        profileCondition: (p) => !p || p.has_employment_income !== false,
      },
      {
        id: 'gather-t5',
        title: 'Gather T5/T3 slips',
        description: 'Investment income from banks and brokerages',
        deadline: new Date(deadlines.taxFilingDeadline.getFullYear(), 1, 28),
        category: 'document',
        profileCondition: (p) => !p || p.has_investment_income,
      },
      {
        id: 'gather-rrsp-receipts',
        title: 'Gather RRSP contribution receipts',
        description: 'Receipts for contributions made in the tax year or first 60 days',
        deadline: deadlines.rrspDeadline,
        category: 'document',
        profileCondition: (p) => !p || p.has_rrsp_contributions,
      },
      {
        id: 'gather-medical',
        title: 'Compile medical expense receipts',
        description: 'Prescriptions, dental, vision, and other eligible medical expenses',
        deadline: deadlines.taxFilingDeadline,
        category: 'document',
        profileCondition: (p) => !p || p.has_medical_expenses,
      },
      {
        id: 'gather-donations',
        title: 'Gather charitable donation receipts',
        description: 'Official receipts from registered charities',
        deadline: deadlines.taxFilingDeadline,
        category: 'document',
        profileCondition: (p) => !p || p.has_charitable_donations,
      },
      {
        id: 'gather-childcare',
        title: 'Gather childcare receipts',
        description: 'Receipts from daycare, camps, or caregivers',
        deadline: deadlines.taxFilingDeadline,
        category: 'document',
        profileCondition: (p) => p?.has_childcare_expenses === true,
      },

      // Contributions
      {
        id: 'rrsp-contribution',
        title: 'Make final RRSP contribution',
        description: `Deadline: ${deadlines.rrspDeadline.toLocaleDateString('en-CA', { month: 'long', day: 'numeric' })} for ${TAX_YEAR} tax year`,
        deadline: deadlines.rrspDeadline,
        category: 'contribution',
      },
      {
        id: 'fhsa-contribution',
        title: 'Maximize FHSA contribution',
        description: 'Up to $8,000/year if eligible first-time home buyer',
        deadline: new Date(TAX_YEAR, 11, 31), // Dec 31 of tax year
        category: 'contribution',
        profileCondition: (p) => !!(p?.has_fhsa || p?.is_first_time_home_buyer),
      },

      // Filing
      {
        id: 'file-tax-return',
        title: 'File tax return',
        description: isSelfEmployed
          ? `Extended deadline: June 15 (but taxes owed due April 30)`
          : `Deadline: April 30`,
        deadline: isSelfEmployed ? deadlines.selfEmployedFilingDeadline : deadlines.taxFilingDeadline,
        category: 'filing',
      },

      // Payments
      {
        id: 'pay-taxes-owed',
        title: 'Pay any taxes owed',
        description: 'Interest charges begin after April 30',
        deadline: deadlines.taxPaymentDeadline,
        category: 'payment',
      },
    ]

    // Add quarterly installments for self-employed
    if (isSelfEmployed || profile?.has_self_employment_income) {
      items.push(
        {
          id: 'q1-installment',
          title: 'Q1 Tax Installment',
          description: 'First quarterly tax payment',
          deadline: deadlines.q1Installment,
          category: 'payment',
        },
        {
          id: 'q2-installment',
          title: 'Q2 Tax Installment',
          description: 'Second quarterly tax payment',
          deadline: deadlines.q2Installment,
          category: 'payment',
        },
        {
          id: 'q3-installment',
          title: 'Q3 Tax Installment',
          description: 'Third quarterly tax payment',
          deadline: deadlines.q3Installment,
          category: 'payment',
        },
        {
          id: 'q4-installment',
          title: 'Q4 Tax Installment',
          description: 'Fourth quarterly tax payment',
          deadline: deadlines.q4Installment,
          category: 'payment',
        }
      )
    }

    // Filter based on profile conditions
    return items.filter(item => {
      if (!item.profileCondition) return true
      return item.profileCondition(profile)
    })
  }, [profile, isSelfEmployed, deadlines])

  // Sort by deadline (soonest first), with null deadlines at the end
  const sortedItems = useMemo(() => {
    return [...checklistItems].sort((a, b) => {
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      return a.deadline.getTime() - b.deadline.getTime()
    })
  }, [checklistItems])

  // Calculate progress
  const progress = checklistItems.length > 0
    ? Math.round((completedItems.size / checklistItems.length) * 100)
    : 0

  // Get status badge for deadline
  const getDeadlineStatus = (deadline: Date | null) => {
    if (!deadline) return null

    const now = new Date()
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    if (daysUntil < 0) {
      return { label: 'Overdue', variant: 'destructive' as const, urgent: true }
    } else if (daysUntil <= 7) {
      return { label: `${daysUntil} days left`, variant: 'destructive' as const, urgent: true }
    } else if (daysUntil <= 30) {
      return { label: `${daysUntil} days left`, variant: 'outline' as const, urgent: false, isWarning: true }
    } else {
      return { label: deadline.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' }), variant: 'secondary' as const, urgent: false }
    }
  }

  const categoryIcons = {
    filing: '📄',
    contribution: '💰',
    payment: '💳',
    document: '📋',
  }

  const categoryColors = {
    filing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    contribution: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    payment: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    document: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  }

  return (
    <Card className="border-slate-200 dark:border-slate-700 overflow-hidden">
      <CardHeader
        className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <CardTitle className="text-lg">Tax Season Checklist</CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {TAX_YEAR} tax year • {completedItems.size}/{checklistItems.length} completed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Progress value={progress} className="w-24 h-2" />
              <span className="text-sm font-medium text-teal-600">{progress}%</span>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-400" />
            )}
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="p-0">
              {/* Progress bar for mobile */}
              <div className="sm:hidden px-4 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Progress value={progress} className="flex-1 h-2" />
                  <span className="text-sm font-medium text-teal-600">{progress}%</span>
                </div>
              </div>

              {/* Checklist items */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {sortedItems.map((item) => {
                  const isCompleted = completedItems.has(item.id)
                  const deadlineStatus = getDeadlineStatus(item.deadline)

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 transition-colors ${
                        isCompleted
                          ? 'bg-slate-50/50 dark:bg-slate-800/30'
                          : deadlineStatus?.urgent
                            ? 'bg-red-50/50 dark:bg-red-950/20'
                            : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={isCompleted}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <label
                              htmlFor={item.id}
                              className={`font-medium cursor-pointer ${
                                isCompleted
                                  ? 'text-slate-400 line-through'
                                  : 'text-slate-900 dark:text-slate-100'
                              }`}
                            >
                              <span className="mr-2">{categoryIcons[item.category]}</span>
                              {item.title}
                            </label>
                            {deadlineStatus && !isCompleted && (
                              <Badge
                                variant={deadlineStatus.variant}
                                className={`shrink-0 ${
                                  'isWarning' in deadlineStatus && deadlineStatus.isWarning
                                    ? 'border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30'
                                    : ''
                                }`}
                              >
                                {deadlineStatus.urgent && (
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                )}
                                {deadlineStatus.label}
                              </Badge>
                            )}
                            {isCompleted && (
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            isCompleted
                              ? 'text-slate-400'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Personalization prompt for logged out users */}
              {!isLoggedIn && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-t border-amber-200 dark:border-amber-800">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Sign in</strong> to get a personalized checklist based on your tax situation
                    </p>
                  </div>
                </div>
              )}

              {/* All done celebration */}
              {progress === 100 && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-t border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        All done! You're ready for tax season.
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Your {TAX_YEAR} tax preparation is complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
