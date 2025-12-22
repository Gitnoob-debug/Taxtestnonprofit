/**
 * Tax Return State Management Hook
 * Manages the complete tax return state throughout the filing wizard
 */

'use client'

import { useState, useCallback, useMemo } from 'react'
import {
  TaxReturn,
  TaxCalculation,
  T1FormData,
  PersonalInfo,
  SpouseInfo,
  IncomeSection,
  Deductions,
  TaxCredits,
  T4Slip,
  T5Slip,
  SelfEmploymentIncome,
  RentalIncome,
  CapitalGain,
  WizardStep,
  WIZARD_STEPS,
  createEmptyTaxReturn
} from './types'
import { calculateTaxReturn, generateT1FormData } from './tax-engine'

interface UseTaxReturnOptions {
  userId?: string
  taxYear?: number
  initialData?: TaxReturn
}

export function useTaxReturn(options: UseTaxReturnOptions = {}) {
  const { userId = 'anonymous', taxYear = 2024, initialData } = options

  // Main state
  const [taxReturn, setTaxReturn] = useState<TaxReturn>(
    initialData || createEmptyTaxReturn(userId, taxYear)
  )

  // Calculation state (computed on demand)
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null)
  const [t1FormData, setT1FormData] = useState<T1FormData | null>(null)

  // UI state
  const [currentStep, setCurrentStep] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // ============================================
  // Step Navigation
  // ============================================

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < WIZARD_STEPS.length) {
      setCurrentStep(step)
      setTaxReturn(prev => ({ ...prev, currentStep: step }))
    }
  }, [])

  const nextStep = useCallback(() => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      setTaxReturn(prev => ({
        ...prev,
        currentStep: newStep,
        stepsCompleted: prev.stepsCompleted.map((completed, i) =>
          i === currentStep ? true : completed
        )
      }))
    }
  }, [currentStep])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const markStepComplete = useCallback((stepIndex: number) => {
    setTaxReturn(prev => ({
      ...prev,
      stepsCompleted: prev.stepsCompleted.map((completed, i) =>
        i === stepIndex ? true : completed
      )
    }))
  }, [])

  // ============================================
  // Personal Info Updates
  // ============================================

  const updatePersonalInfo = useCallback((updates: Partial<PersonalInfo>) => {
    setTaxReturn(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...updates },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const updateAddress = useCallback((updates: Partial<PersonalInfo['address']>) => {
    setTaxReturn(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        address: { ...prev.personalInfo.address, ...updates }
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const updateSpouse = useCallback((spouse: SpouseInfo | undefined) => {
    setTaxReturn(prev => ({
      ...prev,
      spouse,
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // ============================================
  // Income Updates
  // ============================================

  // T4 Slips
  const addT4 = useCallback((t4: Omit<T4Slip, 'id'>) => {
    const newT4: T4Slip = { ...t4, id: crypto.randomUUID() }
    setTaxReturn(prev => ({
      ...prev,
      income: { ...prev.income, t4Slips: [...prev.income.t4Slips, newT4] },
      updatedAt: new Date().toISOString()
    }))
    return newT4.id
  }, [])

  const updateT4 = useCallback((id: string, updates: Partial<T4Slip>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        t4Slips: prev.income.t4Slips.map(t4 =>
          t4.id === id ? { ...t4, ...updates } : t4
        )
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const removeT4 = useCallback((id: string) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        t4Slips: prev.income.t4Slips.filter(t4 => t4.id !== id)
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // T5 Slips
  const addT5 = useCallback((t5: Omit<T5Slip, 'id'>) => {
    const newT5: T5Slip = { ...t5, id: crypto.randomUUID() }
    setTaxReturn(prev => ({
      ...prev,
      income: { ...prev.income, t5Slips: [...prev.income.t5Slips, newT5] },
      updatedAt: new Date().toISOString()
    }))
    return newT5.id
  }, [])

  const updateT5 = useCallback((id: string, updates: Partial<T5Slip>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        t5Slips: prev.income.t5Slips.map(t5 =>
          t5.id === id ? { ...t5, ...updates } : t5
        )
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const removeT5 = useCallback((id: string) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        t5Slips: prev.income.t5Slips.filter(t5 => t5.id !== id)
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // Self Employment
  const addSelfEmployment = useCallback((business: Omit<SelfEmploymentIncome, 'id'>) => {
    const newBiz: SelfEmploymentIncome = { ...business, id: crypto.randomUUID() }
    setTaxReturn(prev => ({
      ...prev,
      income: { ...prev.income, selfEmployment: [...prev.income.selfEmployment, newBiz] },
      updatedAt: new Date().toISOString()
    }))
    return newBiz.id
  }, [])

  const updateSelfEmployment = useCallback((id: string, updates: Partial<SelfEmploymentIncome>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        selfEmployment: prev.income.selfEmployment.map(biz =>
          biz.id === id ? { ...biz, ...updates } : biz
        )
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const removeSelfEmployment = useCallback((id: string) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        selfEmployment: prev.income.selfEmployment.filter(biz => biz.id !== id)
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // Rental Income
  const addRental = useCallback((rental: Omit<RentalIncome, 'id'>) => {
    const newRental: RentalIncome = { ...rental, id: crypto.randomUUID() }
    setTaxReturn(prev => ({
      ...prev,
      income: { ...prev.income, rental: [...prev.income.rental, newRental] },
      updatedAt: new Date().toISOString()
    }))
    return newRental.id
  }, [])

  const updateRental = useCallback((id: string, updates: Partial<RentalIncome>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        rental: prev.income.rental.map(r =>
          r.id === id ? { ...r, ...updates } : r
        )
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const removeRental = useCallback((id: string) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        rental: prev.income.rental.filter(r => r.id !== id)
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // Capital Gains
  const addCapitalGain = useCallback((gain: Omit<CapitalGain, 'id'>) => {
    const newGain: CapitalGain = { ...gain, id: crypto.randomUUID() }
    setTaxReturn(prev => ({
      ...prev,
      income: { ...prev.income, capitalGains: [...prev.income.capitalGains, newGain] },
      updatedAt: new Date().toISOString()
    }))
    return newGain.id
  }, [])

  const updateCapitalGain = useCallback((id: string, updates: Partial<CapitalGain>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        capitalGains: prev.income.capitalGains.map(g =>
          g.id === id ? { ...g, ...updates } : g
        )
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  const removeCapitalGain = useCallback((id: string) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        capitalGains: prev.income.capitalGains.filter(g => g.id !== id)
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // Other Income
  const updateOtherIncome = useCallback((updates: Partial<IncomeSection['other']>) => {
    setTaxReturn(prev => ({
      ...prev,
      income: {
        ...prev.income,
        other: { ...prev.income.other, ...updates }
      },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // ============================================
  // Deductions Updates
  // ============================================

  const updateDeductions = useCallback((updates: Partial<Deductions>) => {
    setTaxReturn(prev => ({
      ...prev,
      deductions: { ...prev.deductions, ...updates },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // ============================================
  // Credits Updates
  // ============================================

  const updateCredits = useCallback((updates: Partial<TaxCredits>) => {
    setTaxReturn(prev => ({
      ...prev,
      credits: { ...prev.credits, ...updates },
      updatedAt: new Date().toISOString()
    }))
  }, [])

  // ============================================
  // Calculation
  // ============================================

  const recalculate = useCallback(() => {
    setIsCalculating(true)
    try {
      const calc = calculateTaxReturn(taxReturn)
      setCalculation(calc)

      const formData = generateT1FormData(taxReturn, calc)
      setT1FormData(formData)

      setTaxReturn(prev => ({
        ...prev,
        calculation: calc,
        t1FormData: formData
      }))

      return calc
    } finally {
      setIsCalculating(false)
    }
  }, [taxReturn])

  // ============================================
  // Validation
  // ============================================

  const validateStep = useCallback((step: WizardStep): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 'situation':
        if (!taxReturn.personalInfo.firstName) newErrors.firstName = 'First name is required'
        if (!taxReturn.personalInfo.lastName) newErrors.lastName = 'Last name is required'
        if (!taxReturn.personalInfo.sin || taxReturn.personalInfo.sin.replace(/\D/g, '').length !== 9) {
          newErrors.sin = 'Valid SIN is required (9 digits)'
        }
        if (!taxReturn.personalInfo.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
        if (!taxReturn.personalInfo.address.street) newErrors.street = 'Street address is required'
        if (!taxReturn.personalInfo.address.city) newErrors.city = 'City is required'
        if (!taxReturn.personalInfo.address.postalCode) newErrors.postalCode = 'Postal code is required'
        break

      case 'income':
        // Income step is valid if at least some income is entered (or explicitly zero)
        break

      case 'deductions':
        // Deductions are optional
        break

      case 'credits':
        // Credits are optional
        break

      case 'review':
        // Review validation - ensure all required fields are complete
        if (!taxReturn.stepsCompleted[0]) {
          newErrors.situation = 'Please complete your personal information'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [taxReturn])

  // ============================================
  // Computed Values
  // ============================================

  const progress = useMemo(() => {
    const completed = taxReturn.stepsCompleted.filter(Boolean).length
    return Math.round((completed / WIZARD_STEPS.length) * 100)
  }, [taxReturn.stepsCompleted])

  const currentStepConfig = useMemo(() => {
    return WIZARD_STEPS[currentStep]
  }, [currentStep])

  const canProceed = useMemo(() => {
    return validateStep(currentStepConfig.id)
  }, [currentStepConfig.id, validateStep])

  // Quick calculation for display purposes
  const quickEstimate = useMemo(() => {
    try {
      return calculateTaxReturn(taxReturn)
    } catch {
      return null
    }
  }, [taxReturn])

  // ============================================
  // Save/Load (for persistence)
  // ============================================

  const exportData = useCallback(() => {
    return JSON.stringify(taxReturn, null, 2)
  }, [taxReturn])

  const importData = useCallback((json: string) => {
    try {
      const data = JSON.parse(json) as TaxReturn
      setTaxReturn(data)
      return true
    } catch {
      return false
    }
  }, [])

  const reset = useCallback(() => {
    setTaxReturn(createEmptyTaxReturn(userId, taxYear))
    setCalculation(null)
    setT1FormData(null)
    setCurrentStep(0)
    setErrors({})
  }, [userId, taxYear])

  // ============================================
  // Return
  // ============================================

  return {
    // State
    taxReturn,
    calculation,
    t1FormData,
    currentStep,
    currentStepConfig,
    isCalculating,
    errors,
    progress,
    canProceed,
    quickEstimate,

    // Navigation
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,

    // Personal Info
    updatePersonalInfo,
    updateAddress,
    updateSpouse,

    // Income
    addT4,
    updateT4,
    removeT4,
    addT5,
    updateT5,
    removeT5,
    addSelfEmployment,
    updateSelfEmployment,
    removeSelfEmployment,
    addRental,
    updateRental,
    removeRental,
    addCapitalGain,
    updateCapitalGain,
    removeCapitalGain,
    updateOtherIncome,

    // Deductions & Credits
    updateDeductions,
    updateCredits,

    // Actions
    recalculate,
    validateStep,
    exportData,
    importData,
    reset
  }
}

export type TaxReturnHook = ReturnType<typeof useTaxReturn>
