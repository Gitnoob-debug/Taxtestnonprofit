'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { useCommandCenterContext } from '@/hooks/usePageContext'
import {
  ArrowLeft,
  Loader2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Zap,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Sparkles,
  PiggyBank,
  Calculator,
  FileText,
  Clock,
  Trophy,
  Flame,
  AlertCircle,
  Info,
  BarChart3,
  Gauge,
  Star,
  Upload,
  MessageSquare
} from 'lucide-react'

interface TaxPosition {
  estimatedIncome: number
  federalTax: number
  provincialTax: number
  totalTax: number
  effectiveRate: number
  marginalRate: number
  cppContributions: number
  eiPremiums: number
  taxWithheld: number
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

interface TaxScoreFactor {
  name: string
  score: number
  maxScore: number
  status: 'excellent' | 'good' | 'fair' | 'needs-attention'
}

interface TaxScore {
  score: number
  maxScore: number
  percentile: number
  factors: TaxScoreFactor[]
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}

// Tax Bracket Visualizer
function BracketVisualizer({ bracketPosition, income }: { bracketPosition: TaxBracketPosition; income: number }) {
  const brackets = [
    { rate: '14.5%', label: '1st' },
    { rate: '20.5%', label: '2nd' },
    { rate: '26%', label: '3rd' },
    { rate: '29%', label: '4th' },
    { rate: '33%', label: '5th' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>Federal Tax Brackets</span>
        <span className="font-medium text-teal-600">You: Bracket {bracketPosition.currentBracket}</span>
      </div>
      <div className="flex gap-1 h-10">
        {brackets.map((bracket, idx) => {
          const isActive = idx + 1 === bracketPosition.currentBracket
          const isPast = idx + 1 < bracketPosition.currentBracket
          return (
            <div
              key={idx}
              className={`flex-1 rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-300'
                  : isPast
                  ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {bracket.rate}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
        <span className="text-sm text-blue-800 dark:text-blue-200">
          You're <span className="font-semibold">{formatCurrency(bracketPosition.amountToNextBracket)}</span> away from the next bracket
        </span>
      </div>
    </div>
  )
}

// Tax Score Display
function TaxScoreDisplay({ score }: { score: TaxScore }) {
  const percentage = (score.score / score.maxScore) * 100
  const getScoreLabel = () => {
    if (percentage >= 80) return { label: 'Excellent', color: 'text-emerald-600' }
    if (percentage >= 60) return { label: 'Good', color: 'text-teal-600' }
    if (percentage >= 40) return { label: 'Fair', color: 'text-amber-600' }
    return { label: 'Needs Work', color: 'text-red-600' }
  }
  const scoreInfo = getScoreLabel()

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-5xl font-bold text-slate-900 dark:text-white">{score.score}</div>
        <div className="text-sm text-slate-500">out of {score.maxScore}</div>
        <div className={`text-lg font-semibold ${scoreInfo.color} mt-1`}>{scoreInfo.label}</div>
      </div>

      <div className="flex items-center justify-center gap-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
        <Trophy className="h-4 w-4 text-amber-500" />
        <span className="text-sm text-amber-800 dark:text-amber-200">
          Top <span className="font-semibold">{100 - score.percentile}%</span> of Canadians
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {score.factors.map((factor, idx) => {
          const statusColors = {
            'excellent': 'bg-emerald-500',
            'good': 'bg-teal-500',
            'fair': 'bg-amber-500',
            'needs-attention': 'bg-red-500'
          }
          return (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600 dark:text-slate-400">{factor.name}</span>
                <span className="text-slate-900 dark:text-white font-medium">{factor.score}/{factor.maxScore}</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${statusColors[factor.status]} transition-all duration-500`}
                  style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Opportunity Card
function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const priorityStyles = {
    high: 'border-red-200 bg-red-50 dark:bg-red-950/20',
    medium: 'border-amber-200 bg-amber-50 dark:bg-amber-950/20',
    low: 'border-blue-200 bg-blue-50 dark:bg-blue-950/20'
  }

  const priorityBadges = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-blue-100 text-blue-700'
  }

  const actionIcons = {
    contribute: PiggyBank,
    claim: FileText,
    optimize: Zap,
    review: Target
  }

  const ActionIcon = actionIcons[opportunity.actionType]

  return (
    <Card className={`${priorityStyles[opportunity.priority]} border`}>
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border">
            <ActionIcon className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-slate-900 dark:text-white">{opportunity.title}</h4>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityBadges[opportunity.priority]}`}>
                {opportunity.priority}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{opportunity.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Save up to {formatCurrency(opportunity.potentialSavings)}
                </span>
              </div>
              {(opportunity.actionUrl || opportunity.calculatorSlug) && (
                <Link href={opportunity.actionUrl || `/tools/${opportunity.calculatorSlug}`}>
                  <Button size="sm" variant="outline" className="gap-1">
                    Take Action
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Deadline Item
function DeadlineItem({ deadline }: { deadline: Deadline }) {
  const urgencyStyles = {
    urgent: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300',
    soon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    normal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300'
  }

  const urgencyIcons = {
    urgent: AlertTriangle,
    soon: Clock,
    normal: Calendar
  }

  const UrgencyIcon = urgencyIcons[deadline.urgency]

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className={`p-2 rounded-lg ${urgencyStyles[deadline.urgency]}`}>
        <UrgencyIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-900 dark:text-white text-sm">{deadline.name}</p>
        <p className="text-xs text-slate-500">{deadline.description}</p>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${deadline.urgency === 'urgent' ? 'text-red-600' : deadline.urgency === 'soon' ? 'text-amber-600' : 'text-slate-600'}`}>
          {deadline.daysUntil} days
        </p>
        <p className="text-xs text-slate-500">{deadline.date}</p>
      </div>
    </div>
  )
}

export function CommandCenter() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const { setCommandCenterData } = useCommandCenterContext()
  const [data, setData] = useState<CommandCenterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  // Update sidebar context when data changes
  useEffect(() => {
    if (data) {
      const moneyOnTable = data.opportunities.reduce((sum, o) => sum + o.potentialSavings, 0)
      setCommandCenterData({
        taxPosition: data.taxPosition,
        opportunities: data.opportunities.map(o => ({
          id: o.id,
          title: o.title,
          description: o.description,
          potentialSavings: o.potentialSavings,
          priority: o.priority,
          category: o.category
        })),
        taxScore: {
          score: data.taxScore.score,
          maxScore: data.taxScore.maxScore,
          percentile: data.taxScore.percentile,
          factors: data.taxScore.factors.map(f => ({
            name: f.name,
            score: f.score,
            maxScore: f.maxScore,
            description: f.status
          }))
        },
        bracketPosition: {
          currentBracket: `Bracket ${data.bracketPosition.currentBracket}`,
          currentBracketRate: data.bracketPosition.currentBracketRate * 100,
          nextBracketThreshold: data.bracketPosition.nextBracketThreshold,
          amountToNextBracket: data.bracketPosition.amountToNextBracket,
          combinedMarginalRate: data.bracketPosition.combinedMarginalRate * 100
        },
        deadlines: data.deadlines,
        moneyLeftOnTable: moneyOnTable
      })
    }
  }, [data, setCommandCenterData])

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      const res = await fetch('/api/command-center', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error('Failed to load data')

      const result = await res.json()
      setData(result.data)
    } catch (err) {
      console.error('Failed to load command center:', err)
      setError(err instanceof Error ? err.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    router.push('/')
    return null
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Unable to Load</h2>
            <p className="text-slate-600 mb-4">{error || 'Something went wrong'}</p>
            <Button onClick={loadData} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const moneyOnTable = data.opportunities.reduce((sum, o) => sum + o.potentialSavings, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button variant="ghost" onClick={() => router.push('/profile/dashboard')} className="gap-2 mb-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl">
                <Gauge className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Tax Command Center</h1>
                <p className="text-slate-600 dark:text-slate-400">Your complete financial control room</p>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={loadData} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/profile/scanner"
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <Upload className="h-4 w-4" />
            Scan Document
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
            Calculators
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            Update Profile
          </Link>
        </div>

        {/* Main Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Refund/Owing Card */}
          <Card className={`${data.taxPosition.estimatedRefund >= 0 ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20' : 'border-red-200 bg-red-50 dark:bg-red-950/20'}`}>
            <CardContent className="py-6">
              <div className="flex items-center gap-2 mb-2">
                {data.taxPosition.estimatedRefund >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                <span className={`text-sm font-medium ${data.taxPosition.estimatedRefund >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                  {data.taxPosition.estimatedRefund >= 0 ? 'Estimated Refund' : 'Estimated Owing'}
                </span>
              </div>
              <div className={`text-4xl font-bold ${data.taxPosition.estimatedRefund >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatCurrency(Math.abs(data.taxPosition.estimatedRefund))}
              </div>
              <p className="text-sm text-slate-500 mt-1">Based on your profile</p>
            </CardContent>
          </Card>

          {/* Income & Tax Rate */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Total Income</span>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {formatCurrency(data.taxPosition.estimatedIncome)}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Effective Rate</p>
                  <p className="text-slate-900 dark:text-white font-semibold">{formatPercent(data.taxPosition.effectiveRate)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Marginal Rate</p>
                  <p className="text-slate-900 dark:text-white font-semibold">{formatPercent(data.taxPosition.marginalRate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optimization Level */}
          <Card>
            <CardContent className="py-6">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-teal-600" />
                <span className="text-sm font-medium text-slate-600">Tax Optimization</span>
              </div>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">{data.optimizationPercentage}%</span>
                <span className="text-slate-500 mb-1">optimized</span>
              </div>
              <Progress value={data.optimizationPercentage} className="h-2" />
              <p className="text-sm text-slate-500 mt-2">
                {data.optimizationPercentage < 50 ? 'Room for improvement!' :
                 data.optimizationPercentage < 80 ? 'Getting there!' : 'Great job!'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Money Left on Table Alert */}
        {moneyOnTable > 0 && (
          <Card className="mb-6 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-xl">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200">
                    Money Left on the Table: {formatCurrency(moneyOnTable)}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm">
                    You have {data.opportunities.length} optimization opportunities waiting
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tax Bracket Position */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-600" />
                  Your Tax Bracket Position
                </CardTitle>
              </CardHeader>
              <CardContent>
                <BracketVisualizer
                  bracketPosition={data.bracketPosition}
                  income={data.taxPosition.estimatedIncome}
                />
              </CardContent>
            </Card>

            {/* Top Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Top Actions to Save Money
                </CardTitle>
                <CardDescription>Personalized recommendations based on your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.opportunities.slice(0, 5).map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
                {data.opportunities.length === 0 && (
                  <div className="py-8 text-center">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">You're Fully Optimized!</h3>
                    <p className="text-slate-500">Great job! You're making the most of your tax situation.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Tax Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Your Tax Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaxScoreDisplay score={data.taxScore} />
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-600" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {data.deadlines.map((deadline, idx) => (
                  <DeadlineItem key={idx} deadline={deadline} />
                ))}
                {data.deadlines.length === 0 && (
                  <div className="py-6 text-center">
                    <Calendar className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500">No upcoming deadlines</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <FileText className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.documentCount}</p>
                    <p className="text-xs text-slate-500">Documents Scanned</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <BarChart3 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{data.taxPosition.provinceName.slice(0, 2)}</p>
                    <p className="text-xs text-slate-500">Province</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
