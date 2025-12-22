'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  DollarSign,
  Receipt,
  Gift,
  FileText,
  AlertCircle,
  Calculator
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { useTaxReturn, TaxReturnHook } from '../useTaxReturn'
import { WIZARD_STEPS, WizardStep } from '../types'
import { formatCurrency, formatPercent } from '../tax-engine'

// Step Components
import { SituationStep } from './steps/SituationStep'
import { IncomeStep } from './steps/IncomeStep'
import { DeductionsStep } from './steps/DeductionsStep'
import { CreditsStep } from './steps/CreditsStep'
import { ReviewStep } from './steps/ReviewStep'

const stepIcons: Record<WizardStep, React.ReactNode> = {
  situation: <User className="h-5 w-5" />,
  income: <DollarSign className="h-5 w-5" />,
  deductions: <Receipt className="h-5 w-5" />,
  credits: <Gift className="h-5 w-5" />,
  review: <FileText className="h-5 w-5" />
}

interface FilingWizardProps {
  userId?: string
  taxYear?: number
}

export function FilingWizard({ userId, taxYear = 2024 }: FilingWizardProps) {
  const taxReturnHook = useTaxReturn({ userId, taxYear })
  const {
    currentStep,
    currentStepConfig,
    progress,
    quickEstimate,
    taxReturn,
    nextStep,
    prevStep,
    goToStep,
    errors
  } = taxReturnHook

  const [showEstimate, setShowEstimate] = useState(true)

  // Render current step
  const renderStep = () => {
    switch (currentStepConfig.id) {
      case 'situation':
        return <SituationStep hook={taxReturnHook} />
      case 'income':
        return <IncomeStep hook={taxReturnHook} />
      case 'deductions':
        return <DeductionsStep hook={taxReturnHook} />
      case 'credits':
        return <CreditsStep hook={taxReturnHook} />
      case 'review':
        return <ReviewStep hook={taxReturnHook} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tax Filing Assistant</h1>
              <p className="text-sm text-muted-foreground">
                {taxYear} Tax Return
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-lg font-semibold">{progress}% Complete</p>
              </div>
              <Progress value={progress} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Step Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {WIZARD_STEPS.map((step, index) => {
                    const isActive = index === currentStep
                    const isCompleted = taxReturn.stepsCompleted[index]
                    const isPast = index < currentStep

                    return (
                      <button
                        key={step.id}
                        onClick={() => goToStep(index)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : isCompleted || isPast
                            ? 'bg-muted hover:bg-muted/80'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          isActive
                            ? 'bg-primary-foreground/20'
                            : isCompleted
                            ? 'bg-green-500/20 text-green-600'
                            : 'bg-muted-foreground/20'
                        }`}>
                          {isCompleted && !isActive ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            stepIcons[step.id]
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            isActive ? '' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {step.title}
                          </p>
                          <p className={`text-xs truncate ${
                            isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Live Estimate Panel */}
            {showEstimate && quickEstimate && (
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Calculator className="h-4 w-4" />
                      Live Estimate
                    </h3>
                    <button
                      onClick={() => setShowEstimate(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">Hide</span>
                      &times;
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Income</span>
                      <span className="font-medium">{formatCurrency(quickEstimate.totalIncome)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Tax</span>
                      <span className="font-medium">{formatCurrency(quickEstimate.totalTax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax Deducted</span>
                      <span className="font-medium">{formatCurrency(quickEstimate.taxDeductedAtSource)}</span>
                    </div>

                    <div className="border-t pt-3">
                      {quickEstimate.refund > 0 ? (
                        <div className="flex justify-between">
                          <span className="font-semibold text-green-600">Refund</span>
                          <span className="font-bold text-green-600 text-lg">
                            {formatCurrency(quickEstimate.refund)}
                          </span>
                        </div>
                      ) : quickEstimate.balanceOwing > 0 ? (
                        <div className="flex justify-between">
                          <span className="font-semibold text-red-600">Balance Owing</span>
                          <span className="font-bold text-red-600 text-lg">
                            {formatCurrency(quickEstimate.balanceOwing)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <span className="font-semibold">Balance</span>
                          <span className="font-bold text-lg">$0.00</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>Effective Rate</span>
                      <span>{formatPercent(quickEstimate.effectiveRate)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Marginal Rate</span>
                      <span>{formatPercent(quickEstimate.marginalRate)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Step Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                      {stepIcons[currentStepConfig.id]}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{currentStepConfig.title}</h2>
                      <p className="text-sm text-muted-foreground">{currentStepConfig.description}</p>
                    </div>
                  </div>
                </div>

                {/* Errors */}
                {Object.keys(errors).length > 0 && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-destructive">Please fix the following errors:</p>
                        <ul className="mt-1 text-sm text-destructive/80 list-disc list-inside">
                          {Object.values(errors).map((error, i) => (
                            <li key={i}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    Step {currentStep + 1} of {WIZARD_STEPS.length}
                  </div>

                  {currentStep < WIZARD_STEPS.length - 1 ? (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={() => taxReturnHook.recalculate()}>
                      Generate T1
                      <FileText className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
