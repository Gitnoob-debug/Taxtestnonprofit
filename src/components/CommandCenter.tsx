'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
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
  ArrowUpRight,
  AlertCircle,
  Info,
  BarChart3,
  Gauge,
  Star,
  Shield
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

// Animated number component
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const stepValue = value / steps
    let current = 0
    const interval = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(interval)
      } else {
        setDisplayValue(Math.round(current))
      }
    }, duration / steps)

    return () => clearInterval(interval)
  }, [value])

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

// Tax Bracket Visualizer
function BracketVisualizer({ bracketPosition, income }: { bracketPosition: TaxBracketPosition; income: number }) {
  const brackets = [
    { rate: '14.5%', max: 57375, label: '1st' },
    { rate: '20.5%', max: 114750, label: '2nd' },
    { rate: '26%', max: 177882, label: '3rd' },
    { rate: '29%', max: 253414, label: '4th' },
    { rate: '33%', max: Infinity, label: '5th' },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>Federal Tax Brackets</span>
        <span className="font-medium">You: Bracket {bracketPosition.currentBracket}</span>
      </div>
      <div className="flex gap-1 h-8">
        {brackets.map((bracket, idx) => {
          const isActive = idx + 1 === bracketPosition.currentBracket
          const isPast = idx + 1 < bracketPosition.currentBracket
          return (
            <div
              key={idx}
              className={`flex-1 rounded-md flex items-center justify-center text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white ring-2 ring-teal-400 ring-offset-2'
                  : isPast
                  ? 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {bracket.rate}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Info className="h-4 w-4 text-teal-600" />
        <span className="text-slate-600 dark:text-slate-400">
          You're <span className="font-semibold text-teal-600">{formatCurrency(bracketPosition.amountToNextBracket)}</span> away from the next bracket
        </span>
      </div>
    </div>
  )
}

// Tax Score Gauge
function TaxScoreGauge({ score }: { score: TaxScore }) {
  const percentage = (score.score / score.maxScore) * 100
  const scoreColor = percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-teal-500' : percentage >= 40 ? 'text-amber-500' : 'text-red-500'
  const bgColor = percentage >= 80 ? 'from-emerald-500 to-green-500' : percentage >= 60 ? 'from-teal-500 to-emerald-500' : percentage >= 40 ? 'from-amber-500 to-orange-500' : 'from-red-500 to-orange-500'

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 3.52} 352`}
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`${bgColor.split(' ')[0].replace('from-', 'stop-')}`} />
              <stop offset="100%" className={`${bgColor.split(' ')[1].replace('to-', 'stop-')}`} />
            </linearGradient>
          </defs>
        </svg>
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${scoreColor}`}>{score.score}</span>
          <span className="text-xs text-slate-500">/ {score.maxScore}</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm">
        <Trophy className="h-4 w-4 text-amber-500" />
        <span className="text-slate-600 dark:text-slate-400">
          Top <span className="font-semibold text-slate-900 dark:text-white">{100 - score.percentile}%</span> of Canadians
        </span>
      </div>
    </div>
  )
}

// Opportunity Card
function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const priorityColors = {
    high: 'border-red-200 bg-red-50/50 dark:bg-red-950/20',
    medium: 'border-amber-200 bg-amber-50/50 dark:bg-amber-950/20',
    low: 'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20'
  }

  const priorityBadges = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
  }

  const actionIcons = {
    contribute: PiggyBank,
    claim: FileText,
    optimize: Zap,
    review: Target
  }

  const ActionIcon = actionIcons[opportunity.actionType]

  return (
    <Card className={`${priorityColors[opportunity.priority]} border hover:shadow-md transition-shadow`}>
      <CardContent className="py-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm">
            <ActionIcon className="h-5 w-5 text-teal-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-slate-900 dark:text-white">{opportunity.title}</h4>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityBadges[opportunity.priority]}`}>
                {opportunity.priority}
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{opportunity.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-600">
                  Save up to {formatCurrency(opportunity.potentialSavings)}
                </span>
              </div>
              {(opportunity.actionUrl || opportunity.calculatorSlug) && (
                <Link href={opportunity.actionUrl || `/tools/${opportunity.calculatorSlug}`}>
                  <Button size="sm" variant="ghost" className="gap-1 text-teal-600 hover:text-teal-700">
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
  const urgencyColors = {
    urgent: 'text-red-600 bg-red-100 dark:bg-red-900/50',
    soon: 'text-amber-600 bg-amber-100 dark:bg-amber-900/50',
    normal: 'text-teal-600 bg-teal-100 dark:bg-teal-900/50'
  }

  const urgencyIcons = {
    urgent: AlertTriangle,
    soon: Clock,
    normal: Calendar
  }

  const UrgencyIcon = urgencyIcons[deadline.urgency]

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <div className={`p-2 rounded-lg ${urgencyColors[deadline.urgency]}`}>
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
  const [data, setData] = useState<CommandCenterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

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
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-teal-500/20 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full">
              <Gauge className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="text-white font-medium">Loading Command Center...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/')
    return null
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => router.push('/profile/dashboard')} className="gap-2 text-slate-300 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={loadData} className="gap-2 border-slate-700 text-slate-300 hover:text-white">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-lg shadow-teal-500/25">
              <Gauge className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Tax Command Center</h1>
              <p className="text-slate-400">Your complete financial control room</p>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Refund Meter - THE BIG ONE */}
            <Card className="md:col-span-1 bg-gradient-to-br from-emerald-500 to-teal-600 border-0 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <CardContent className="py-6 relative">
                <div className="flex items-center gap-2 mb-2">
                  {data.taxPosition.estimatedRefund >= 0 ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : (
                    <TrendingDown className="h-5 w-5" />
                  )}
                  <span className="text-sm font-medium text-white/80">
                    {data.taxPosition.estimatedRefund >= 0 ? 'Estimated Refund' : 'Estimated Owing'}
                  </span>
                </div>
                <div className="text-4xl font-bold mb-1">
                  <AnimatedNumber
                    value={Math.abs(data.taxPosition.estimatedRefund)}
                    prefix="$"
                  />
                </div>
                <p className="text-sm text-white/70">Based on your profile data</p>
              </CardContent>
            </Card>

            {/* Income & Tax */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-6">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-teal-400" />
                  <span className="text-sm font-medium text-slate-400">Total Income</span>
                </div>
                <div className="text-3xl font-bold text-white mb-3">
                  {formatCurrency(data.taxPosition.estimatedIncome)}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Effective Rate</p>
                    <p className="text-white font-semibold">{formatPercent(data.taxPosition.effectiveRate)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Marginal Rate</p>
                    <p className="text-white font-semibold">{formatPercent(data.taxPosition.marginalRate)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Meter */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-teal-400" />
                  <span className="text-sm font-medium text-slate-400">Tax Optimization</span>
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-bold text-white">{data.optimizationPercentage}%</span>
                  <span className="text-slate-500 mb-1">optimized</span>
                </div>
                <Progress value={data.optimizationPercentage} className="h-2 mb-2" />
                <p className="text-sm text-slate-500">
                  {data.optimizationPercentage < 50 ? 'Room for improvement!' :
                   data.optimizationPercentage < 80 ? 'Getting there!' : 'Great job!'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Money Left on Table Alert */}
        {moneyOnTable > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30">
            <CardContent className="py-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <Flame className="h-6 w-6 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-amber-200">
                    Money Left on the Table: {formatCurrency(moneyOnTable)}
                  </h3>
                  <p className="text-amber-300/70 text-sm">
                    You have {data.opportunities.length} optimization opportunities waiting
                  </p>
                </div>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  See Opportunities
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tax Bracket Position */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-teal-400" />
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
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Top Actions to Save Money
                </h2>
              </div>
              <div className="space-y-3">
                {data.opportunities.slice(0, 5).map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
                {data.opportunities.length === 0 && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="py-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">You're Fully Optimized!</h3>
                      <p className="text-slate-400">Great job! You're making the most of your tax situation.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Score & Deadlines */}
          <div className="space-y-6">
            {/* Tax Score */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  Your Tax Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TaxScoreGauge score={data.taxScore} />
                <div className="mt-6 space-y-3">
                  {data.taxScore.factors.map((factor, idx) => {
                    const statusColors = {
                      'excellent': 'bg-emerald-500',
                      'good': 'bg-teal-500',
                      'fair': 'bg-amber-500',
                      'needs-attention': 'bg-red-500'
                    }
                    return (
                      <div key={idx}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-slate-400">{factor.name}</span>
                          <span className="text-white font-medium">{factor.score}/{factor.maxScore}</span>
                        </div>
                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${statusColors[factor.status]} transition-all duration-500`}
                            style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-teal-400" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-700">
                  {data.deadlines.map((deadline, idx) => (
                    <DeadlineItem key={idx} deadline={deadline} />
                  ))}
                  {data.deadlines.length === 0 && (
                    <div className="py-8 text-center">
                      <Calendar className="h-10 w-10 text-slate-600 mx-auto mb-2" />
                      <p className="text-slate-500">No upcoming deadlines</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-slate-900/50">
                    <FileText className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{data.documentCount}</p>
                    <p className="text-xs text-slate-500">Documents Scanned</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-slate-900/50">
                    <Shield className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">{data.taxPosition.provinceName.slice(0, 2)}</p>
                    <p className="text-xs text-slate-500">Province</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border-teal-500/30">
              <CardContent className="py-4">
                <div className="space-y-2">
                  <Link href="/profile/scanner" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-teal-400" />
                      <span className="text-white font-medium">Scan Document</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Link>
                  <Link href="/tools/tax-calculator" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Calculator className="h-5 w-5 text-teal-400" />
                      <span className="text-white font-medium">Tax Calculator</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Link>
                  <Link href="/profile" className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-teal-400" />
                      <span className="text-white font-medium">Update Profile</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
