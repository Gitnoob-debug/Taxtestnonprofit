'use client'

import { UserProfile } from '@/hooks/useProfile'
import { Sparkles, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PROVINCE_NAMES } from '@/lib/canadianTaxData'

interface PersonalizedBannerProps {
  profile: UserProfile | null
  isLoggedIn: boolean
  loading: boolean
  calculatorName: string
  prefilledFields?: string[]
}

export function PersonalizedBanner({
  profile,
  isLoggedIn,
  loading,
  calculatorName,
  prefilledFields = [],
}: PersonalizedBannerProps) {
  // Don't show anything while loading
  if (loading) return null

  // Not logged in - show sign in prompt
  if (!isLoggedIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <User className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300">
                Sign in for personalized results
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We'll pre-fill your income, province, and more
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 flex items-center gap-1"
          >
            Sign in <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    )
  }

  // Logged in but no profile data
  if (!profile || (!profile.annual_income && !profile.province && !profile.birth_year)) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/50 dark:to-yellow-950/50 rounded-xl p-4 border border-amber-200 dark:border-amber-800"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">
                Complete your profile for instant results
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                Add your income and province to auto-fill calculators
              </p>
            </div>
          </div>
          <Link
            href="/profile"
            className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      </motion.div>
    )
  }

  // Logged in with profile data - show personalized message
  const displayName = profile.display_name || 'there'
  const provinceName = profile.province ? PROVINCE_NAMES[profile.province] || profile.province : null

  // Build the "pre-filled" message
  const filledItems: string[] = []
  if (prefilledFields.includes('income') && profile.annual_income) {
    filledItems.push(`$${profile.annual_income.toLocaleString()} income`)
  }
  if (prefilledFields.includes('province') && provinceName) {
    filledItems.push(provinceName)
  }
  if (prefilledFields.includes('birthYear') && profile.birth_year) {
    filledItems.push(`born ${profile.birth_year}`)
  }
  if (prefilledFields.includes('tfsa') && profile.tfsa_contributions_lifetime) {
    filledItems.push(`$${profile.tfsa_contributions_lifetime.toLocaleString()} TFSA contributions`)
  }
  if (prefilledFields.includes('rrsp') && profile.rrsp_contribution_room) {
    filledItems.push(`$${profile.rrsp_contribution_room.toLocaleString()} RRSP room`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
          <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-emerald-800 dark:text-emerald-200">
            Hey {displayName}! Your {calculatorName} is ready.
          </p>
          {filledItems.length > 0 && (
            <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
              Pre-filled with: {filledItems.join(' • ')}
            </p>
          )}
          <Link
            href="/profile"
            className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 mt-2"
          >
            Update profile <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
