'use client'

import { useState, useCallback } from 'react'
import { WizardState, WizardStep, UploadedDocument, TimeMachineProfile } from '@/lib/time-machine/types'
import { IntroStep } from './steps/IntroStep'
import { YearSelectorStep } from './steps/YearSelectorStep'
import { DocumentUploadStep } from './steps/DocumentUploadStep'
import { QuickQuestionsStep } from './steps/QuickQuestionsStep'
import { AnalyzingStep } from './steps/AnalyzingStep'
import { ResultsStep } from './steps/ResultsStep'
import { useAuth } from '@/hooks/useAuth'

const STEP_ORDER: WizardStep[] = ['intro', 'years', 'documents', 'questions', 'analyzing', 'results']

export function TimeMachineWizard() {
  const { user, getToken } = useAuth()

  const [state, setState] = useState<WizardState>({
    step: 'intro',
    selectedYears: [],
    uploadedDocuments: [],
    yearProfiles: {},
    analysisId: null,
    analysisProgress: 0,
    analysisStatus: '',
  })

  const goToStep = useCallback((step: WizardStep) => {
    setState((prev) => ({ ...prev, step }))
  }, [])

  const goNext = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(state.step)
    if (currentIndex < STEP_ORDER.length - 1) {
      goToStep(STEP_ORDER[currentIndex + 1])
    }
  }, [state.step, goToStep])

  const goBack = useCallback(() => {
    const currentIndex = STEP_ORDER.indexOf(state.step)
    if (currentIndex > 0) {
      goToStep(STEP_ORDER[currentIndex - 1])
    }
  }, [state.step, goToStep])

  const setSelectedYears = useCallback((years: number[]) => {
    setState((prev) => ({
      ...prev,
      selectedYears: years.sort((a, b) => b - a), // Most recent first
    }))
  }, [])

  const addDocument = useCallback((doc: UploadedDocument) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: [...prev.uploadedDocuments, doc],
    }))
  }, [])

  const updateDocument = useCallback((id: string, updates: Partial<UploadedDocument>) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: prev.uploadedDocuments.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    }))
  }, [])

  const removeDocument = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      uploadedDocuments: prev.uploadedDocuments.filter((doc) => doc.id !== id),
    }))
  }, [])

  const updateYearProfile = useCallback((year: number, profile: Partial<TimeMachineProfile>) => {
    setState((prev) => ({
      ...prev,
      yearProfiles: {
        ...prev.yearProfiles,
        [year]: { ...prev.yearProfiles[year], ...profile },
      },
    }))
  }, [])

  const setAnalysisState = useCallback((updates: Partial<Pick<WizardState, 'analysisId' | 'analysisProgress' | 'analysisStatus'>>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const resetWizard = useCallback(() => {
    setState({
      step: 'intro',
      selectedYears: [],
      uploadedDocuments: [],
      yearProfiles: {},
      analysisId: null,
      analysisProgress: 0,
      analysisStatus: '',
    })
  }, [])

  // Render current step
  const renderStep = () => {
    switch (state.step) {
      case 'intro':
        return <IntroStep onStart={goNext} />

      case 'years':
        return (
          <YearSelectorStep
            selectedYears={state.selectedYears}
            onYearsChange={setSelectedYears}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'documents':
        return (
          <DocumentUploadStep
            selectedYears={state.selectedYears}
            documents={state.uploadedDocuments}
            onAddDocument={addDocument}
            onUpdateDocument={updateDocument}
            onRemoveDocument={removeDocument}
            onNext={goNext}
            onBack={goBack}
            getToken={getToken}
          />
        )

      case 'questions':
        return (
          <QuickQuestionsStep
            selectedYears={state.selectedYears}
            yearProfiles={state.yearProfiles}
            onUpdateProfile={updateYearProfile}
            onNext={goNext}
            onBack={goBack}
          />
        )

      case 'analyzing':
        return (
          <AnalyzingStep
            selectedYears={state.selectedYears}
            yearProfiles={state.yearProfiles}
            documents={state.uploadedDocuments}
            onComplete={(analysisId) => {
              setAnalysisState({ analysisId })
              goNext()
            }}
            onProgress={(progress, status) => {
              setAnalysisState({ analysisProgress: progress, analysisStatus: status })
            }}
            getToken={getToken}
          />
        )

      case 'results':
        return (
          <ResultsStep
            analysisId={state.analysisId}
            selectedYears={state.selectedYears}
            onReset={resetWizard}
            getToken={getToken}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      {state.step !== 'intro' && state.step !== 'results' && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {STEP_ORDER.indexOf(state.step)} of {STEP_ORDER.length - 2}</span>
            <span className="capitalize">{state.step.replace('-', ' ')}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((STEP_ORDER.indexOf(state.step) - 1) / (STEP_ORDER.length - 3)) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {renderStep()}
    </div>
  )
}
