'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Check,
  AlertTriangle,
  Clock,
  ChevronRight,
  ChevronLeft,
  User,
  Building2,
  Laptop,
  KeyRound,
  ShieldCheck,
  FileText,
  ArrowRight,
  Info,
  RefreshCw,
  HelpCircle,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'

interface CRAAutoFillGuideProps {
  onComplete?: () => void
  onDismiss?: () => void
  mode?: 'self' | 'preparer' // Are you filing for yourself or helping someone?
}

type Step = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  content: React.ReactNode
}

export function CRAAutoFillGuide({ onComplete, onDismiss, mode = 'self' }: CRAAutoFillGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [hasCRAAccount, setHasCRAAccount] = useState<boolean | null>(null)
  const [selectedSoftware, setSelectedSoftware] = useState<string | null>(null)

  const taxSoftwareOptions = [
    { id: 'turbotax', name: 'TurboTax', buttonLabel: 'Auto-fill my return' },
    { id: 'wealthsimple', name: 'Wealthsimple Tax', buttonLabel: 'Import from CRA' },
    { id: 'hrblock', name: 'H&R Block', buttonLabel: 'Import CRA data' },
    { id: 'taxcycle', name: 'TaxCycle (Pro)', buttonLabel: 'CRA Auto-fill' },
    { id: 'profile', name: 'Profile (Pro)', buttonLabel: 'Auto-fill' },
    { id: 'studiotax', name: 'StudioTax', buttonLabel: 'AFR - Auto-fill' },
    { id: 'other', name: 'Other software', buttonLabel: 'Auto-fill / Import CRA' },
  ]

  const isPreparerMode = mode === 'preparer'
  const personText = isPreparerMode ? 'your client' : 'you'
  const possessiveText = isPreparerMode ? "your client's" : 'your'
  const theyText = isPreparerMode ? 'they' : 'you'
  const themText = isPreparerMode ? 'them' : 'yourself'

  const steps: Step[] = [
    // Step 0: Check if they have CRA My Account
    {
      id: 'check-account',
      title: 'CRA My Account Status',
      description: `First, let's check if ${personText} ${isPreparerMode ? 'has' : 'have'} a CRA My Account`,
      icon: <User className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            CRA My Account is required to use the Auto-fill feature. It's a secure portal that stores all tax slips (T4, T5, etc.), RRSP room, and previous return data.
          </p>

          <div className="grid gap-3">
            <Button
              variant={hasCRAAccount === true ? 'default' : 'outline'}
              className="justify-start h-auto py-3 px-4"
              onClick={() => setHasCRAAccount(true)}
            >
              <Check className="h-4 w-4 mr-3" />
              <div className="text-left">
                <p className="font-medium">Yes, {theyText} have a CRA My Account</p>
                <p className="text-xs text-muted-foreground">{isPreparerMode ? 'They can' : 'I can'} log in to canada.ca/my-cra-account</p>
              </div>
            </Button>

            <Button
              variant={hasCRAAccount === false ? 'default' : 'outline'}
              className="justify-start h-auto py-3 px-4"
              onClick={() => setHasCRAAccount(false)}
            >
              <X className="h-4 w-4 mr-3" />
              <div className="text-left">
                <p className="font-medium">No / Not sure</p>
                <p className="text-xs text-muted-foreground">Need to register or check</p>
              </div>
            </Button>
          </div>

          {hasCRAAccount === false && (
            <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800 dark:text-amber-200">Registration Required</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-300 space-y-3">
                <p>
                  {isPreparerMode ? 'Your client needs' : 'You need'} to register for CRA My Account first.
                  This is a <strong>one-time setup</strong> that {isPreparerMode ? 'they must do themselves' : 'you must do'} —
                  {isPreparerMode ? " you can't do it for them" : ''}.
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Estimated time: 5-15 minutes (or 5-10 days if waiting for security code by mail)</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open('https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Go to CRA My Account Registration
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )
    },

    // Step 1: Registration guide (only shown if no account)
    {
      id: 'registration',
      title: 'CRA Registration Options',
      description: 'Three ways to register for CRA My Account',
      icon: <KeyRound className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid gap-3">
            {/* Option 1: Sign-in Partner */}
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Fastest</Badge>
                  <CardTitle className="text-base">Option 1: Sign-In Partner (Bank)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Use {possessiveText} online banking credentials to verify identity:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Select {possessiveText} bank from the list</li>
                  <li>Log in with banking credentials (CRA never sees the password)</li>
                  <li>Bank verifies identity instantly</li>
                  <li><strong>Immediate access</strong> in most cases</li>
                </ul>
                <p className="text-green-700 dark:text-green-400 text-xs flex items-center gap-1">
                  <Check className="h-3 w-3" /> Recommended - no waiting for mail
                </p>
              </CardContent>
            </Card>

            {/* Option 2: CRA User ID */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">5-10 Days Wait</Badge>
                  <CardTitle className="text-base">Option 2: CRA User ID</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Create a CRA-specific login:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Need SIN, date of birth, postal code</li>
                  <li>Enter exact amount from line 15000 of last year's return</li>
                  <li>Create username and password</li>
                  <li><strong>CRA mails a security code</strong> to verify</li>
                </ul>
                <p className="text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Wait 5-10 business days for mailed code
                </p>
              </CardContent>
            </Card>

            {/* Option 3: Provincial Partner */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Option 3: Provincial Partner</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>BC Services Card</li>
                  <li>Alberta.ca Account</li>
                  <li>Other provincial digital IDs where available</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Important:</strong> {isPreparerMode ? 'Your client must register themselves.' : 'Only you can register for your own account.'}
              {isPreparerMode && ' You cannot create an account on their behalf for security reasons.'}
            </AlertDescription>
          </Alert>
        </div>
      )
    },

    // Step 2: Choose tax software
    {
      id: 'software',
      title: 'Select Tax Software',
      description: 'Which software are you using?',
      icon: <Laptop className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The Auto-fill feature works with all NETFILE-certified tax software. Select the one you're using:
          </p>

          <div className="grid gap-2">
            {taxSoftwareOptions.map((software) => (
              <Button
                key={software.id}
                variant={selectedSoftware === software.id ? 'default' : 'outline'}
                className="justify-between h-auto py-2.5 px-4"
                onClick={() => setSelectedSoftware(software.id)}
              >
                <span className="font-medium">{software.name}</span>
                <span className="text-xs text-muted-foreground">"{software.buttonLabel}"</span>
              </Button>
            ))}
          </div>
        </div>
      )
    },

    // Step 3: The Link Process
    {
      id: 'link-process',
      title: 'The Auto-fill Process',
      description: 'Step-by-step walkthrough',
      icon: <RefreshCw className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> This is a <strong>one-time fetch per session</strong> —
              it's not a permanent link. {isPreparerMode ? 'Your client must' : 'You must'} enter
              {possessiveText} CRA credentials each time.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            {/* Step 1 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <p className="font-medium">Open the tax software</p>
                <p className="text-sm text-muted-foreground">
                  Start a new return {isPreparerMode && 'for your client'} or open an existing one.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <p className="font-medium">Find the Auto-fill button</p>
                <p className="text-sm text-muted-foreground">
                  Look for {selectedSoftware ? `"${taxSoftwareOptions.find(s => s.id === selectedSoftware)?.buttonLabel}"` : '"Auto-fill my return" or "Import from CRA"'} —
                  usually in the income section or main menu.
                </p>
              </div>
            </div>

            {/* Step 3 - The Handover */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <p className="font-medium text-amber-700 dark:text-amber-400">The Handover (Critical Step)</p>
                <p className="text-sm text-muted-foreground">
                  A browser popup opens to the CRA login page.
                </p>
                {isPreparerMode && (
                  <Alert className="mt-2 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
                      <strong>Hand the keyboard to your client.</strong> They must type their own CRA
                      username and password. You should NOT ask for or enter their credentials.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <p className="font-medium">{isPreparerMode ? 'Client logs' : 'Log'} into CRA</p>
                <p className="text-sm text-muted-foreground">
                  {isPreparerMode ? 'They enter' : 'Enter'} {possessiveText} CRA username/password or use Sign-in Partner.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <p className="font-medium">Authorize the data share</p>
                <p className="text-sm text-muted-foreground">
                  CRA asks: "Do you want to share your data with {selectedSoftware ? taxSoftwareOptions.find(s => s.id === selectedSoftware)?.name : '[Software Name]'}?"
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {isPreparerMode ? 'Client clicks' : 'Click'} <strong>"Next"</strong> or <strong>"Authorize"</strong>.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">Data imports automatically</p>
                <p className="text-sm text-muted-foreground">
                  The browser closes and all available data appears in the software:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                  <li>T4 slips (employment income)</li>
                  <li>T5 slips (interest/dividends)</li>
                  <li>RRSP contribution room</li>
                  <li>Previous return carryforwards</li>
                  <li>And more...</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Step 4: What to Review
    {
      id: 'review',
      title: 'Review Imported Data',
      description: 'Always verify what was imported',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800 dark:text-amber-200">Auto-fill isn't always complete!</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              Some slips may be missing if employers/issuers haven't filed yet. Always cross-reference with physical slips.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium">Verify these were imported:</h4>
            <div className="grid gap-2">
              {[
                { label: 'T4 - Employment Income', note: 'Check against paper slip from employer' },
                { label: 'T5 - Investment Income', note: 'Interest, dividends from banks' },
                { label: 'T3 - Trust Income', note: 'Mutual funds, ETFs' },
                { label: 'RRSP Contribution Room', note: 'Compare to Notice of Assessment' },
                { label: 'Previous Year Carryforwards', note: 'Tuition, capital losses, donations' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded border bg-muted/30">
                  <Check className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-amber-700 dark:text-amber-400">These are NOT auto-filled:</h4>
            <div className="grid gap-2">
              {[
                'Medical expenses',
                'Childcare expenses',
                'Charitable donations',
                'Moving expenses',
                'Home office expenses',
                'Self-employment income (T2125)',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="h-3 w-3 text-red-500" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              These must be entered manually with receipts.
            </p>
          </div>
        </div>
      )
    },

    // Step 5: Complete
    {
      id: 'complete',
      title: 'Ready to File!',
      description: "You're all set to use Auto-fill",
      icon: <ShieldCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>

          <div>
            <h3 className="text-lg font-semibold">You're ready!</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isPreparerMode
                ? "Guide your client through the auto-fill process in the tax software."
                : "Open your tax software and use the Auto-fill feature to import your CRA data."}
            </p>
          </div>

          <div className="grid gap-2">
            <Button onClick={onComplete} className="w-full">
              <Check className="h-4 w-4 mr-2" />
              Got it, I'm ready
            </Button>
            <Button variant="outline" onClick={onDismiss} className="w-full">
              Close guide
            </Button>
          </div>

          <div className="text-xs text-muted-foreground pt-4 border-t">
            <p>Need more help?</p>
            <a
              href="https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/account-individuals.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              Visit CRA My Account Help <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      )
    },
  ]

  // Filter steps based on account status
  const activeSteps = hasCRAAccount === true
    ? steps.filter(s => s.id !== 'registration')
    : steps

  const totalSteps = activeSteps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const canGoNext = () => {
    if (currentStep === 0 && hasCRAAccount === null) return false
    if (activeSteps[currentStep]?.id === 'software' && !selectedSoftware) return false
    return currentStep < totalSteps - 1
  }

  const canGoBack = () => currentStep > 0

  const goNext = () => {
    if (canGoNext()) {
      // Skip registration step if they have an account
      if (hasCRAAccount === true && activeSteps[currentStep + 1]?.id === 'registration') {
        setCurrentStep(currentStep + 2)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const goBack = () => {
    if (canGoBack()) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = activeSteps[currentStep]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {currentStepData?.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{currentStepData?.title}</CardTitle>
              <CardDescription>{currentStepData?.description}</CardDescription>
            </div>
          </div>
          {onDismiss && (
            <Button variant="ghost" size="icon" onClick={onDismiss}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Progress value={progress} className="h-1.5 mt-4" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStepData?.content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {currentStepData?.id !== 'complete' && (
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={!canGoBack()}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={goNext}
              disabled={!canGoNext()}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Compact trigger button to open the guide
export function CRAAutoFillTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="gap-2"
    >
      <Building2 className="h-4 w-4" />
      CRA Auto-fill Guide
      <ArrowRight className="h-4 w-4" />
    </Button>
  )
}
