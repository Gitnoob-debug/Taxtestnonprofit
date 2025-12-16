'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export interface UserProfile {
  province: string | null
  age_range: string | null
  employment_status: string | null
  marital_status: string | null
  has_employment_income: boolean
  has_self_employment_income: boolean
  has_investment_income: boolean
  has_rental_income: boolean
  has_pension_income: boolean
  has_ei_benefits: boolean
  has_foreign_income: boolean
  has_rrsp_contributions: boolean
  has_medical_expenses: boolean
  has_charitable_donations: boolean
  has_childcare_expenses: boolean
  has_moving_expenses: boolean
  has_home_office_expenses: boolean
  has_student_loans: boolean
  has_tuition_credits: boolean
  has_dependents: boolean
  num_dependents: number
  has_disability: boolean
  is_first_time_home_buyer: boolean
  has_sold_property: boolean
  has_capital_gains: boolean
  has_crypto_transactions: boolean
  has_tfsa: boolean
  has_fhsa: boolean
  business_type: string | null
  profile_completeness: number
}

const defaultProfile: UserProfile = {
  province: null,
  age_range: null,
  employment_status: null,
  marital_status: null,
  has_employment_income: false,
  has_self_employment_income: false,
  has_investment_income: false,
  has_rental_income: false,
  has_pension_income: false,
  has_ei_benefits: false,
  has_foreign_income: false,
  has_rrsp_contributions: false,
  has_medical_expenses: false,
  has_charitable_donations: false,
  has_childcare_expenses: false,
  has_moving_expenses: false,
  has_home_office_expenses: false,
  has_student_loans: false,
  has_tuition_credits: false,
  has_dependents: false,
  num_dependents: 0,
  has_disability: false,
  is_first_time_home_buyer: false,
  has_sold_property: false,
  has_capital_gains: false,
  has_crypto_transactions: false,
  has_tfsa: false,
  has_fhsa: false,
  business_type: null,
  profile_completeness: 0,
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
            setProfile({
              province: data.profile.province || null,
              age_range: data.profile.age_range || null,
              employment_status: data.profile.employment_status || null,
              marital_status: data.profile.marital_status || null,
              has_employment_income: data.profile.has_employment_income || false,
              has_self_employment_income: data.profile.has_self_employment_income || false,
              has_investment_income: data.profile.has_investment_income || false,
              has_rental_income: data.profile.has_rental_income || false,
              has_pension_income: data.profile.has_pension_income || false,
              has_ei_benefits: data.profile.has_ei_benefits || false,
              has_foreign_income: data.profile.has_foreign_income || false,
              has_rrsp_contributions: data.profile.has_rrsp_contributions || false,
              has_medical_expenses: data.profile.has_medical_expenses || false,
              has_charitable_donations: data.profile.has_charitable_donations || false,
              has_childcare_expenses: data.profile.has_childcare_expenses || false,
              has_moving_expenses: data.profile.has_moving_expenses || false,
              has_home_office_expenses: data.profile.has_home_office_expenses || false,
              has_student_loans: data.profile.has_student_loans || false,
              has_tuition_credits: data.profile.has_tuition_credits || false,
              has_dependents: data.profile.has_dependents || false,
              num_dependents: data.profile.num_dependents || 0,
              has_disability: data.profile.has_disability || false,
              is_first_time_home_buyer: data.profile.is_first_time_home_buyer || false,
              has_sold_property: data.profile.has_sold_property || false,
              has_capital_gains: data.profile.has_capital_gains || false,
              has_crypto_transactions: data.profile.has_crypto_transactions || false,
              has_tfsa: data.profile.has_tfsa || false,
              has_fhsa: data.profile.has_fhsa || false,
              business_type: data.profile.business_type || null,
              profile_completeness: data.profile.profile_completeness || 0,
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
