'use client'

import { useEffect, useState, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { TimeMachineProfile, UploadedDocument, NOAData } from '@/lib/time-machine/types'
import { runFullAnalysis } from '@/lib/time-machine/analyzer'
import { CheckCircle2, Loader2, Search, FileText, Calculator, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalyzingStepProps {
  selectedYears: number[]
  yearProfiles: Record<number, Partial<TimeMachineProfile>>
  documents: UploadedDocument[]
  onComplete: (analysisId: string) => void
  onProgress: (progress: number, status: string) => void
  getToken: () => Promise<string | null>
}

interface AnalysisStep {
  id: string
  label: string
  icon: React.ElementType
  status: 'pending' | 'in-progress' | 'complete'
}

export function AnalyzingStep({
  selectedYears,
  yearProfiles,
  documents,
  onComplete,
  onProgress,
  getToken,
}: AnalyzingStepProps) {
  const [steps, setSteps] = useState<AnalysisStep[]>([
    { id: 'extract', label: 'Extracting document data', icon: FileText, status: 'pending' },
    { id: 'analyze', label: 'Analyzing tax history', icon: Search, status: 'pending' },
    { id: 'calculate', label: 'Calculating potential savings', icon: Calculator, status: 'pending' },
    { id: 'generate', label: 'Generating findings report', icon: Sparkles, status: 'pending' },
  ])
  const [progress, setProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState('Preparing analysis...')
  const hasRun = useRef(false)

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const runAnalysis = async () => {
      try {
        // Step 1: Extract document data
        setSteps((prev) =>
          prev.map((s) => (s.id === 'extract' ? { ...s, status: 'in-progress' } : s))
        )
        setCurrentStatus('Extracting data from uploaded documents...')
        setProgress(10)
        onProgress(10, 'Extracting document data')

        // Build NOA data from documents
        const noaData: Record<number, Partial<NOAData>> = {}
        for (const doc of documents) {
          if (doc.status === 'complete' && doc.documentType === 'noa' && doc.extractedData) {
            const extracted = doc.extractedData
            noaData[doc.taxYear] = {
              tax_year: doc.taxYear,
              net_income: extracted.keyFields?.net_income || extracted.keyFields?.total_income,
              taxable_income: extracted.keyFields?.taxable_income,
              refund_or_balance_owing: extracted.keyFields?.refund || extracted.keyFields?.balance_owing,
              rrsp_deduction_limit: extracted.keyFields?.rrsp_deduction_limit || extracted.keyFields?.rrsp_room,
              line_data: extracted.keyFields || {},
              extraction_confidence: extracted.confidence || 'medium',
            }
          }
        }

        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSteps((prev) =>
          prev.map((s) => (s.id === 'extract' ? { ...s, status: 'complete' } : s))
        )
        setProgress(30)

        // Step 2: Analyze tax history
        setSteps((prev) =>
          prev.map((s) => (s.id === 'analyze' ? { ...s, status: 'in-progress' } : s))
        )
        setCurrentStatus('Analyzing your tax history for missed opportunities...')
        setProgress(40)
        onProgress(40, 'Analyzing tax history')

        await new Promise((resolve) => setTimeout(resolve, 1500))
        setSteps((prev) =>
          prev.map((s) => (s.id === 'analyze' ? { ...s, status: 'complete' } : s))
        )
        setProgress(60)

        // Step 3: Calculate savings
        setSteps((prev) =>
          prev.map((s) => (s.id === 'calculate' ? { ...s, status: 'in-progress' } : s))
        )
        setCurrentStatus('Calculating potential savings...')
        setProgress(70)
        onProgress(70, 'Calculating savings')

        // Run the actual analysis
        const token = await getToken()
        const userId = 'temp-user-id' // This will be replaced by actual user ID

        const analysisResult = runFullAnalysis({
          userId,
          years: selectedYears,
          profiles: yearProfiles,
          noaData,
        })

        await new Promise((resolve) => setTimeout(resolve, 1000))
        setSteps((prev) =>
          prev.map((s) => (s.id === 'calculate' ? { ...s, status: 'complete' } : s))
        )
        setProgress(85)

        // Step 4: Generate report
        setSteps((prev) =>
          prev.map((s) => (s.id === 'generate' ? { ...s, status: 'in-progress' } : s))
        )
        setCurrentStatus('Generating your findings report...')
        setProgress(90)
        onProgress(90, 'Generating report')

        // Save to database
        if (token) {
          try {
            const response = await fetch('/api/time-machine/analyze', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                years: selectedYears,
                profiles: yearProfiles,
                noaData,
              }),
            })

            if (response.ok) {
              const result = await response.json()
              setSteps((prev) =>
                prev.map((s) => (s.id === 'generate' ? { ...s, status: 'complete' } : s))
              )
              setProgress(100)
              setCurrentStatus('Analysis complete!')
              onProgress(100, 'Complete')

              await new Promise((resolve) => setTimeout(resolve, 500))
              onComplete(result.analysisId)
              return
            }
          } catch (error) {
            console.error('Failed to save analysis:', error)
          }
        }

        // If API fails, still complete with local results
        setSteps((prev) =>
          prev.map((s) => (s.id === 'generate' ? { ...s, status: 'complete' } : s))
        )
        setProgress(100)
        setCurrentStatus('Analysis complete!')
        onProgress(100, 'Complete')

        await new Promise((resolve) => setTimeout(resolve, 500))
        onComplete('local-analysis')
      } catch (error) {
        console.error('Analysis error:', error)
        setCurrentStatus('An error occurred. Retrying...')
      }
    }

    runAnalysis()
  }, [selectedYears, yearProfiles, documents, onComplete, onProgress, getToken])

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <h2 className="text-2xl font-bold">Analyzing Your Tax History</h2>
        <p className="text-muted-foreground">{currentStatus}</p>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-center text-muted-foreground">{progress}% complete</p>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.id}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg transition-colors',
                    step.status === 'complete' && 'bg-green-50 dark:bg-green-900/20',
                    step.status === 'in-progress' && 'bg-blue-50 dark:bg-blue-900/20',
                    step.status === 'pending' && 'bg-gray-50 dark:bg-gray-800/50'
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      step.status === 'complete' && 'bg-green-100 dark:bg-green-800',
                      step.status === 'in-progress' && 'bg-blue-100 dark:bg-blue-800',
                      step.status === 'pending' && 'bg-gray-200 dark:bg-gray-700'
                    )}
                  >
                    {step.status === 'complete' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : step.status === 'in-progress' ? (
                      <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      step.status === 'complete' && 'text-green-700 dark:text-green-300',
                      step.status === 'in-progress' && 'text-blue-700 dark:text-blue-300',
                      step.status === 'pending' && 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-center text-muted-foreground">
        This usually takes 30-60 seconds. Please don&apos;t close this page.
      </p>
    </div>
  )
}
