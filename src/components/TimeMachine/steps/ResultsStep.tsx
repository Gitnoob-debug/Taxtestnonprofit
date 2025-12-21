'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  TimeMachineFinding,
  TimeMachineAnalysis,
  YearBreakdown,
  FindingType,
} from '@/lib/time-machine/types'
import {
  formatCurrency,
  formatRecoveryRange,
  getFindingTypeInfo,
  getPriorityColor,
  getConfidenceIndicator,
} from '@/lib/time-machine/analyzer'
import {
  TrendingUp,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Download,
  Share2,
  Home,
  Heart,
  Gift,
  GraduationCap,
  Truck,
  Baby,
  Accessibility,
  Users,
  PiggyBank,
  Briefcase,
  FileText,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface ResultsStepProps {
  analysisId: string | null
  selectedYears: number[]
  onReset: () => void
  getToken: () => Promise<string | null>
}

// Icon map for finding types
const FINDING_ICONS: Record<FindingType, React.ElementType> = {
  home_office: Home,
  medical_expenses: Heart,
  rrsp_room: PiggyBank,
  childcare: Baby,
  moving_expenses: Truck,
  tuition_credits: GraduationCap,
  charitable_donations: Gift,
  union_dues: Users,
  employment_expenses: Briefcase,
  student_loan_interest: GraduationCap,
  disability_tax_credit: Accessibility,
  caregiver_credit: Users,
  foreign_tax_credit: FileText,
  climate_action_incentive: FileText,
  canada_workers_benefit: FileText,
  other: FileText,
}

export function ResultsStep({
  analysisId,
  selectedYears,
  onReset,
  getToken,
}: ResultsStepProps) {
  const [loading, setLoading] = useState(true)
  const [analysis, setAnalysis] = useState<TimeMachineAnalysis | null>(null)
  const [findings, setFindings] = useState<TimeMachineFinding[]>([])
  const [yearBreakdowns, setYearBreakdowns] = useState<YearBreakdown[]>([])
  const [expandedFinding, setExpandedFinding] = useState<string | null>(null)
  const [expandedYear, setExpandedYear] = useState<number | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!analysisId) {
        setLoading(false)
        return
      }

      try {
        const token = await getToken()
        if (!token) {
          setLoading(false)
          return
        }

        const response = await fetch(`/api/time-machine/findings?analysisId=${analysisId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setAnalysis(data.analysis)
          setFindings(data.findings)
          setYearBreakdowns(data.yearBreakdowns)
        }
      } catch (error) {
        console.error('Failed to fetch results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [analysisId, getToken])

  // Calculate totals from findings
  const totalMin = findings.reduce((sum, f) => sum + f.potential_recovery_min, 0)
  const totalMax = findings.reduce((sum, f) => sum + f.potential_recovery_max, 0)
  const highPriorityCount = findings.filter((f) => f.priority === 'high').length

  // Group findings by year
  const findingsByYear = selectedYears.reduce((acc, year) => {
    acc[year] = findings.filter((f) => f.tax_year === year)
    return acc
  }, {} as Record<number, TimeMachineFinding[]>)

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading your results...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Hero Results Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-800 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-lg font-medium text-muted-foreground mb-2">
            Potential Recovery
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-300 mb-4">
            {formatRecoveryRange(totalMin, totalMax)}
          </p>
          <p className="text-muted-foreground">
            Across {selectedYears.length} tax year{selectedYears.length !== 1 ? 's' : ''} with{' '}
            <span className="font-semibold">{findings.length} finding{findings.length !== 1 ? 's' : ''}</span>
          </p>
          {highPriorityCount > 0 && (
            <Badge className="mt-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              {highPriorityCount} high priority finding{highPriorityCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button variant="outline" size="sm" onClick={onReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          Share Results
        </Button>
      </div>

      {/* Year Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Year-by-Year Breakdown</CardTitle>
          <CardDescription>
            Click on a year to see detailed findings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {selectedYears.map((year) => {
            const yearFindings = findingsByYear[year] || []
            const yearMin = yearFindings.reduce((sum, f) => sum + f.potential_recovery_min, 0)
            const yearMax = yearFindings.reduce((sum, f) => sum + f.potential_recovery_max, 0)
            const isExpanded = expandedYear === year

            return (
              <div
                key={year}
                className={cn(
                  'border rounded-lg overflow-hidden',
                  yearFindings.length > 0
                    ? 'border-green-200 dark:border-green-800'
                    : 'border-border'
                )}
              >
                <button
                  className={cn(
                    'w-full flex items-center justify-between p-4 text-left transition-colors',
                    yearFindings.length > 0
                      ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                  onClick={() => setExpandedYear(isExpanded ? null : year)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">{year}</span>
                    <span className="text-sm text-muted-foreground">
                      {yearFindings.length} finding{yearFindings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {yearFindings.length > 0 && (
                      <span className="font-semibold text-green-700 dark:text-green-300">
                        {formatRecoveryRange(yearMin, yearMax)}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 space-y-3 bg-background border-t">
                    {yearFindings.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No findings for this year based on the information provided.
                      </p>
                    ) : (
                      yearFindings.map((finding) => (
                        <FindingCard
                          key={finding.id}
                          finding={finding}
                          isExpanded={expandedFinding === finding.id}
                          onToggle={() =>
                            setExpandedFinding(
                              expandedFinding === finding.id ? null : finding.id
                            )
                          }
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* All Findings by Priority */}
      {findings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>All Findings</CardTitle>
            <CardDescription>
              Sorted by priority and potential recovery amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {findings
              .sort((a, b) => {
                const priorityOrder = { high: 0, medium: 1, low: 2 }
                if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                  return priorityOrder[a.priority] - priorityOrder[b.priority]
                }
                return b.potential_recovery_max - a.potential_recovery_max
              })
              .map((finding) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  isExpanded={expandedFinding === finding.id}
                  onToggle={() =>
                    setExpandedFinding(
                      expandedFinding === finding.id ? null : finding.id
                    )
                  }
                  showYear
                />
              ))}
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <p className="font-medium">Review high-priority findings</p>
              <p className="text-sm text-muted-foreground">
                Start with findings marked as high priority for the best ROI
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <p className="font-medium">Gather required documents</p>
              <p className="text-sm text-muted-foreground">
                Each finding lists what you&apos;ll need to file an amendment
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <p className="font-medium">File T1-ADJ request</p>
              <p className="text-sm text-muted-foreground">
                Submit amendments through CRA My Account or by mail
              </p>
            </div>
          </div>
          <Button asChild className="w-full mt-4">
            <Link
              href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return/change-your-return.html"
              target="_blank"
            >
              Learn About T1-ADJ Amendments
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground">
        These findings are estimates based on the information you provided. Actual
        recovery amounts may vary. This tool provides educational guidance only and does
        not constitute tax advice. Consult with a qualified tax professional for advice
        specific to your situation.
      </p>
    </div>
  )
}

// Finding Card Component
function FindingCard({
  finding,
  isExpanded,
  onToggle,
  showYear = false,
}: {
  finding: TimeMachineFinding
  isExpanded: boolean
  onToggle: () => void
  showYear?: boolean
}) {
  const Icon = FINDING_ICONS[finding.finding_type] || FileText
  const confidenceInfo = getConfidenceIndicator(finding.confidence)

  return (
    <div
      className={cn(
        'border rounded-lg overflow-hidden transition-all',
        finding.priority === 'high' && 'border-red-200 dark:border-red-800',
        finding.priority === 'medium' && 'border-yellow-200 dark:border-yellow-800',
        finding.priority === 'low' && 'border-gray-200 dark:border-gray-700'
      )}
    >
      <button
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium truncate">{finding.title}</span>
              <Badge className={cn('text-xs', getPriorityColor(finding.priority))}>
                {finding.priority}
              </Badge>
              {showYear && (
                <Badge variant="outline" className="text-xs">
                  {finding.tax_year}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {formatRecoveryRange(finding.potential_recovery_min, finding.potential_recovery_max)}
              </span>
              <span className="text-xs text-muted-foreground">
                potential recovery
              </span>
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {isExpanded && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-t space-y-4">
          {/* Description */}
          <div>
            <h4 className="text-sm font-medium mb-1">What We Found</h4>
            <p className="text-sm text-muted-foreground">{finding.description}</p>
          </div>

          {/* Confidence */}
          <div>
            <h4 className="text-sm font-medium mb-1">Confidence</h4>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-2 h-2 rounded-full',
                      i < confidenceInfo.dots
                        ? 'bg-primary'
                        : 'bg-gray-300 dark:bg-gray-600'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {confidenceInfo.label}
              </span>
            </div>
          </div>

          {/* Requirements */}
          {finding.requirements && finding.requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">What You Need</h4>
              <ul className="space-y-1">
                {finding.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button size="sm">
              Start Amendment
            </Button>
            <Button variant="outline" size="sm">
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
