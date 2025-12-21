'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, Lightbulb, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface YearSelectorStepProps {
  selectedYears: number[]
  onYearsChange: (years: number[]) => void
  onNext: () => void
  onBack: () => void
}

const CURRENT_YEAR = new Date().getFullYear()
const AVAILABLE_YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 1 - i)

// COVID years get special highlighting
const COVID_YEARS = [2020, 2021, 2022]

export function YearSelectorStep({
  selectedYears,
  onYearsChange,
  onNext,
  onBack,
}: YearSelectorStepProps) {
  const toggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      onYearsChange(selectedYears.filter((y) => y !== year))
    } else {
      onYearsChange([...selectedYears, year])
    }
  }

  const selectRecentYears = () => {
    onYearsChange([CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3])
  }

  const selectCovidYears = () => {
    onYearsChange(COVID_YEARS)
  }

  const selectAll = () => {
    onYearsChange(AVAILABLE_YEARS)
  }

  const clearAll = () => {
    onYearsChange([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Which tax years should we analyze?
          </CardTitle>
          <CardDescription>
            Select the years you want to check for missed deductions and credits.
            You can amend returns for the past 10 years.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick select buttons */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={selectRecentYears}>
              Last 3 Years
            </Button>
            <Button variant="outline" size="sm" onClick={selectCovidYears}>
              COVID Years (2020-2022)
            </Button>
            <Button variant="outline" size="sm" onClick={selectAll}>
              All Years
            </Button>
            {selectedYears.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear
              </Button>
            )}
          </div>

          {/* Year checkboxes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {AVAILABLE_YEARS.map((year) => {
              const isSelected = selectedYears.includes(year)
              const isCovid = COVID_YEARS.includes(year)

              return (
                <div
                  key={year}
                  className={cn(
                    'relative flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50',
                    isCovid && !isSelected && 'border-orange-200 dark:border-orange-800'
                  )}
                  onClick={() => toggleYear(year)}
                >
                  <Checkbox
                    id={`year-${year}`}
                    checked={isSelected}
                    onCheckedChange={() => toggleYear(year)}
                    className="mr-3"
                  />
                  <Label
                    htmlFor={`year-${year}`}
                    className="cursor-pointer font-medium"
                  >
                    {year}
                  </Label>
                  {isCovid && (
                    <span className="absolute -top-2 -right-2 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 px-1.5 py-0.5 rounded-full">
                      WFH
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Tip box */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Focus on recent years first
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                Recent years have the highest success rate for amendments. 2020-2022 are
                especially valuable due to COVID work-from-home deductions many Canadians missed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={onNext} disabled={selectedYears.length === 0}>
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {selectedYears.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">
          Please select at least one tax year to continue
        </p>
      )}
    </div>
  )
}
