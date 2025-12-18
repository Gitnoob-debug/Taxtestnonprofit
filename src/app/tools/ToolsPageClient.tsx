'use client'

import { TaxDeadlineChecklist } from '@/components/TaxDeadlineChecklist'
import { useProfile } from '@/hooks/useProfile'
import { useAuth } from '@/hooks/useAuth'

export function ToolsPageClient() {
  const { user } = useAuth()
  const { profile, loading } = useProfile()

  // Don't render checklist while loading to avoid hydration issues
  if (loading) {
    return (
      <div className="h-20 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
    )
  }

  return (
    <TaxDeadlineChecklist
      profile={profile}
      isLoggedIn={!!user}
    />
  )
}
