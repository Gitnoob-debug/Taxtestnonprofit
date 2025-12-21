'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { TimeMachineProfile } from '@/lib/time-machine/types'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Heart,
  Gift,
  GraduationCap,
  Truck,
  Baby,
  Accessibility,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickQuestionsStepProps {
  selectedYears: number[]
  yearProfiles: Record<number, Partial<TimeMachineProfile>>
  onUpdateProfile: (year: number, profile: Partial<TimeMachineProfile>) => void
  onNext: () => void
  onBack: () => void
}

interface QuestionConfig {
  id: keyof TimeMachineProfile
  question: string
  icon: React.ElementType
  amountField?: keyof TimeMachineProfile
  amountLabel?: string
  helpText?: string
  showForYears?: number[]
}

const QUESTIONS: QuestionConfig[] = [
  {
    id: 'worked_from_home',
    question: 'Did you work from home?',
    icon: Home,
    amountField: 'work_from_home_days',
    amountLabel: 'Approximate days worked from home',
    helpText: 'Even partial WFH counts. The simplified method allows $2/day up to $500.',
    showForYears: [2020, 2021, 2022, 2023, 2024],
  },
  {
    id: 'had_medical_expenses',
    question: 'Did you have significant medical expenses?',
    icon: Heart,
    amountField: 'medical_expense_amount',
    amountLabel: 'Total medical expenses ($)',
    helpText: 'Include prescriptions, dental, vision, therapy, medical travel, etc.',
  },
  {
    id: 'made_donations',
    question: 'Did you make charitable donations?',
    icon: Gift,
    amountField: 'donation_amount',
    amountLabel: 'Total donations ($)',
    helpText: 'Donations to registered charities are eligible for tax credits.',
  },
  {
    id: 'had_childcare',
    question: 'Did you pay for childcare?',
    icon: Baby,
    amountField: 'childcare_amount',
    amountLabel: 'Total childcare expenses ($)',
    helpText: 'Includes daycare, nanny, summer camps, and before/after school care.',
  },
  {
    id: 'had_student_loans',
    question: 'Did you pay student loan interest?',
    icon: GraduationCap,
    amountField: 'student_loan_interest',
    amountLabel: 'Interest paid ($)',
    helpText: 'Only interest on government student loans (Canada/provincial) qualifies.',
  },
  {
    id: 'moved_for_work',
    question: 'Did you move for work or school?',
    icon: Truck,
    amountField: 'moving_distance_km',
    amountLabel: 'Distance moved (km)',
    helpText: 'You must move at least 40km closer to your new work or school.',
  },
  {
    id: 'had_disability',
    question: 'Do you have a disability?',
    icon: Accessibility,
    helpText: 'The Disability Tax Credit requires a T2201 form certified by a medical practitioner.',
  },
  {
    id: 'cared_for_dependent',
    question: 'Did you care for a dependent with a disability?',
    icon: Users,
    helpText: 'The Canada Caregiver Credit is for those supporting family members with impairments.',
  },
]

// COVID years for home office
const COVID_YEARS = [2020, 2021, 2022]

export function QuickQuestionsStep({
  selectedYears,
  yearProfiles,
  onUpdateProfile,
  onNext,
  onBack,
}: QuickQuestionsStepProps) {
  const [currentYearIndex, setCurrentYearIndex] = useState(0)
  const currentYear = selectedYears[currentYearIndex]
  const profile = yearProfiles[currentYear] || {}

  const handleToggle = (field: keyof TimeMachineProfile, value: boolean) => {
    onUpdateProfile(currentYear, { [field]: value })
  }

  const handleAmountChange = (field: keyof TimeMachineProfile, value: string) => {
    const numValue = parseFloat(value) || null
    onUpdateProfile(currentYear, { [field]: numValue })
  }

  const goToPrevYear = () => {
    if (currentYearIndex > 0) {
      setCurrentYearIndex(currentYearIndex - 1)
    }
  }

  const goToNextYear = () => {
    if (currentYearIndex < selectedYears.length - 1) {
      setCurrentYearIndex(currentYearIndex + 1)
    } else {
      onNext()
    }
  }

  // Filter questions based on year
  const filteredQuestions = QUESTIONS.filter((q) => {
    if (!q.showForYears) return true
    return q.showForYears.includes(currentYear)
  })

  return (
    <div className="space-y-6">
      {/* Year navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevYear}
          disabled={currentYearIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {currentYearIndex > 0 ? selectedYears[currentYearIndex - 1] : 'Back'}
        </Button>
        <div className="text-center">
          <span className="text-2xl font-bold">{currentYear}</span>
          <p className="text-sm text-muted-foreground">
            Year {currentYearIndex + 1} of {selectedYears.length}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextYear}
        >
          {currentYearIndex < selectedYears.length - 1
            ? selectedYears[currentYearIndex + 1]
            : 'Analyze'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Year dots */}
      <div className="flex justify-center gap-2">
        {selectedYears.map((year, index) => (
          <button
            key={year}
            className={cn(
              'w-3 h-3 rounded-full transition-all',
              index === currentYearIndex
                ? 'bg-primary scale-125'
                : index < currentYearIndex
                ? 'bg-primary/50'
                : 'bg-gray-300 dark:bg-gray-600'
            )}
            onClick={() => setCurrentYearIndex(index)}
          />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Questions for {currentYear}</CardTitle>
          <CardDescription>
            Answer these questions to help us identify potential missed deductions and credits.
            {COVID_YEARS.includes(currentYear) && (
              <span className="block mt-1 text-orange-600 dark:text-orange-400">
                This was a COVID year - home office deductions were especially common.
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {filteredQuestions.map((q) => {
            const Icon = q.icon
            const isEnabled = profile[q.id] === true

            return (
              <div key={q.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-lg transition-colors',
                        isEnabled
                          ? 'bg-primary/10 text-primary'
                          : 'bg-gray-100 dark:bg-gray-800 text-muted-foreground'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <Label className="text-base cursor-pointer">
                        {q.question}
                      </Label>
                      {q.helpText && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {q.helpText}
                        </p>
                      )}
                    </div>
                  </div>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggle(q.id, checked)}
                  />
                </div>

                {/* Amount input if applicable and enabled */}
                {q.amountField && isEnabled && (
                  <div className="ml-12 space-y-1">
                    <Label className="text-sm text-muted-foreground">
                      {q.amountLabel}
                    </Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={(profile[q.amountField] as number | undefined) || ''}
                      onChange={(e) => handleAmountChange(q.amountField!, e.target.value)}
                      className="max-w-[200px]"
                    />
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>
        <Button onClick={goToNextYear}>
          {currentYearIndex < selectedYears.length - 1 ? (
            <>
              Next Year
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Analyze My Returns
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
