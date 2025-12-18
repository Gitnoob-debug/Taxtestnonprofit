'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export interface UserProfile {
  // Basic info
  province: string | null
  age_range: string | null
  birth_year: number | null
  employment_status: string | null
  marital_status: string | null
  display_name: string | null

  // Financial data for calculator pre-fill
  annual_income: number | null
  spouse_income: number | null
  rrsp_contribution_room: number | null
  rrsp_contributions_ytd: number | null
  tfsa_contributions_lifetime: number | null
  fhsa_contributions_lifetime: number | null
  expected_retirement_age: number | null

  // Income source flags
  has_employment_income: boolean
  has_self_employment_income: boolean
  has_investment_income: boolean
  has_rental_income: boolean
  has_pension_income: boolean
  has_ei_benefits: boolean
  has_foreign_income: boolean

  // Deductions & credits flags
  has_rrsp_contributions: boolean
  has_medical_expenses: boolean
  has_charitable_donations: boolean
  has_childcare_expenses: boolean
  has_moving_expenses: boolean
  has_home_office_expenses: boolean
  has_student_loans: boolean
  has_tuition_credits: boolean

  // Family
  has_dependents: boolean
  num_dependents: number
  has_disability: boolean

  // Investments & property
  is_first_time_home_buyer: boolean
  has_sold_property: boolean
  has_capital_gains: boolean
  has_crypto_transactions: boolean
  has_tfsa: boolean
  has_fhsa: boolean

  // Business
  business_type: string | null

  // Meta
  profile_completeness: number
  notification_preferences: {
    email_reminders: boolean
    tax_tips: boolean
  } | null
}

const defaultProfile: UserProfile = {
  // Basic info
  province: null,
  age_range: null,
  birth_year: null,
  employment_status: null,
  marital_status: null,
  display_name: null,

  // Financial data
  annual_income: null,
  spouse_income: null,
  rrsp_contribution_room: null,
  rrsp_contributions_ytd: null,
  tfsa_contributions_lifetime: null,
  fhsa_contributions_lifetime: null,
  expected_retirement_age: null,

  // Income source flags
  has_employment_income: false,
  has_self_employment_income: false,
  has_investment_income: false,
  has_rental_income: false,
  has_pension_income: false,
  has_ei_benefits: false,
  has_foreign_income: false,

  // Deductions & credits flags
  has_rrsp_contributions: false,
  has_medical_expenses: false,
  has_charitable_donations: false,
  has_childcare_expenses: false,
  has_moving_expenses: false,
  has_home_office_expenses: false,
  has_student_loans: false,
  has_tuition_credits: false,

  // Family
  has_dependents: false,
  num_dependents: 0,
  has_disability: false,

  // Investments & property
  is_first_time_home_buyer: false,
  has_sold_property: false,
  has_capital_gains: false,
  has_crypto_transactions: false,
  has_tfsa: false,
  has_fhsa: false,

  // Business
  business_type: null,

  // Meta
  profile_completeness: 0,
  notification_preferences: null,
}

export function useProfile() {
  const { user, loading: authLoading, getToken } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    let isMounted = true

    async function loadProfile() {
      try {
        const token = await getToken()
        if (!token || !isMounted) {
          if (isMounted) setLoading(false)
          return
        }

        const res = await fetch('/api/supabase/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (res.ok && isMounted) {
          const data = await res.json()
          if (data.profile) {
            const p = data.profile
            setProfile({
              // Basic info
              province: p.province || null,
              age_range: p.age_range || null,
              birth_year: p.birth_year || null,
              employment_status: p.employment_status || null,
              marital_status: p.marital_status || null,
              display_name: p.display_name || null,

              // Financial data
              annual_income: p.annual_income || null,
              spouse_income: p.spouse_income || null,
              rrsp_contribution_room: p.rrsp_contribution_room || null,
              rrsp_contributions_ytd: p.rrsp_contributions_ytd || null,
              tfsa_contributions_lifetime: p.tfsa_contributions_lifetime || null,
              fhsa_contributions_lifetime: p.fhsa_contributions_lifetime || null,
              expected_retirement_age: p.expected_retirement_age || null,

              // Income source flags
              has_employment_income: p.has_employment_income || false,
              has_self_employment_income: p.has_self_employment_income || false,
              has_investment_income: p.has_investment_income || false,
              has_rental_income: p.has_rental_income || false,
              has_pension_income: p.has_pension_income || false,
              has_ei_benefits: p.has_ei_benefits || false,
              has_foreign_income: p.has_foreign_income || false,

              // Deductions & credits flags
              has_rrsp_contributions: p.has_rrsp_contributions || false,
              has_medical_expenses: p.has_medical_expenses || false,
              has_charitable_donations: p.has_charitable_donations || false,
              has_childcare_expenses: p.has_childcare_expenses || false,
              has_moving_expenses: p.has_moving_expenses || false,
              has_home_office_expenses: p.has_home_office_expenses || false,
              has_student_loans: p.has_student_loans || false,
              has_tuition_credits: p.has_tuition_credits || false,

              // Family
              has_dependents: p.has_dependents || false,
              num_dependents: p.num_dependents || 0,
              has_disability: p.has_disability || false,

              // Investments & property
              is_first_time_home_buyer: p.is_first_time_home_buyer || false,
              has_sold_property: p.has_sold_property || false,
              has_capital_gains: p.has_capital_gains || false,
              has_crypto_transactions: p.has_crypto_transactions || false,
              has_tfsa: p.has_tfsa || false,
              has_fhsa: p.has_fhsa || false,

              // Business
              business_type: p.business_type || null,

              // Meta
              profile_completeness: p.profile_completeness || 0,
              notification_preferences: p.notification_preferences || null,
            })
          } else {
            setProfile(defaultProfile)
          }
        } else if (isMounted) {
          setProfile(defaultProfile)
        }
      } catch (err) {
        console.error('Failed to load profile:', err)
        if (isMounted) {
          setError('Failed to load profile')
          setProfile(defaultProfile)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [user?.id, authLoading, getToken])

  return {
    profile,
    loading: authLoading || loading,
    error,
    isLoggedIn: !!user,
  }
}
