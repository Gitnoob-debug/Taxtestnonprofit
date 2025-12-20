'use client'

import Link from 'next/link'
import { Calculator, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CalculatorSuggestionProps {
  calculators: Array<{
    slug: string
    name: string
    description: string
  }>
  onDismiss?: () => void
  profileData?: Record<string, any>
}

export function CalculatorSuggestion({ calculators, onDismiss, profileData }: CalculatorSuggestionProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || calculators.length === 0) {
    return null
  }

  // Build query params from profile data
  const getCalculatorUrl = (slug: string) => {
    if (!profileData) return `/tools/${slug}`

    const params = new URLSearchParams()

    // Map profile fields to calculator params
    if (profileData.annual_income) {
      params.set('income', profileData.annual_income.toString())
    }
    if (profileData.province) {
      params.set('province', profileData.province)
    }
    if (profileData.rrsp_contribution_room) {
      params.set('rrspRoom', profileData.rrsp_contribution_room.toString())
    }

    const queryString = params.toString()
    return queryString ? `/tools/${slug}?${queryString}` : `/tools/${slug}`
  }

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="my-3 p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Try a calculator
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-blue-400 hover:text-blue-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-300 mb-2">
          Get instant, personalized calculations:
        </p>
        <div className="space-y-2">
          {calculators.map((calc) => (
            <Link
              key={calc.slug}
              href={getCalculatorUrl(calc.slug)}
              className="flex items-center justify-between p-2 rounded-md bg-white dark:bg-slate-800 hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors group"
            >
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-600">
                  {calc.name}
                </p>
                <p className="text-xs text-slate-500">{calc.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </Link>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
