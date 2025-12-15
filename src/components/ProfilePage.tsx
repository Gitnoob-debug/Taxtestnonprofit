'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, User, DollarSign, Loader2, Building2, Home, Users } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface ProfileData {
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

const PROVINCES = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
]

const AGE_RANGES = [
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45-54', label: '45-54' },
  { value: '55-64', label: '55-64' },
  { value: '65+', label: '65+' },
]

const EMPLOYMENT_STATUSES = [
  { value: 'employed', label: 'Employed' },
  { value: 'self-employed', label: 'Self-Employed' },
  { value: 'unemployed', label: 'Unemployed' },
  { value: 'student', label: 'Student' },
  { value: 'retired', label: 'Retired' },
  { value: 'other', label: 'Other' },
]

const MARITAL_STATUSES = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married' },
  { value: 'common-law', label: 'Common-Law' },
  { value: 'separated', label: 'Separated' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
]

const BUSINESS_TYPES = [
  { value: 'sole-proprietor', label: 'Sole Proprietor' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'none', label: 'None / Not Applicable' },
]

function calculateCompleteness(profile: ProfileData): number {
  const dropdownFields = ['province', 'age_range', 'employment_status', 'marital_status']

  let filled = 0
  const total = dropdownFields.length

  for (const field of dropdownFields) {
    if (profile[field as keyof ProfileData]) filled++
  }

  return Math.round((filled / total) * 100)
}

export function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  )

  const [profile, setProfile] = useState<ProfileData>({
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
  })

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/')
      return
    }

    let isMounted = true

    async function loadProfile() {
      try {
        const token = await getToken()
        if (!token || !isMounted) {
          if (isMounted) setIsLoading(false)
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
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    loadProfile()

    return () => {
      isMounted = false
    }
  }, [user?.id, authLoading, router, getToken])

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const token = await getToken()
      if (!token) {
        setSaveMessage({ type: 'error', text: 'Not authenticated' })
        return
      }

      const completeness = calculateCompleteness(profile)

      const profilePayload = {
        ...profile,
        num_dependents: profile.has_dependents ? profile.num_dependents : 0,
        business_type: profile.employment_status === 'self-employed' ? profile.business_type : null,
        profile_completeness: completeness,
      }

      const res = await fetch('/api/supabase/profile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profilePayload),
      })

      if (res.ok) {
        setProfile((prev) => ({ ...prev, profile_completeness: completeness }))
        setSaveMessage({ type: 'success', text: 'Profile saved successfully!' })
      } else {
        const error = await res.json()
        setSaveMessage({ type: 'error', text: error.details || 'Failed to save profile' })
      }
    } catch (error) {
      setSaveMessage({ type: 'error', text: 'Failed to save profile' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  const updateProfile = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Profile
          </Button>
        </div>

        {saveMessage && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              saveMessage.type === 'success'
                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Profile Completeness</CardTitle>
            <CardDescription>
              A complete profile helps us personalize tax advice for your situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={profile.profile_completeness} className="flex-1" />
              <span className="text-sm font-medium text-teal-600">
                {profile.profile_completeness}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              <CardTitle>Basic Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select
                  value={profile.province || ''}
                  onValueChange={(v) => updateProfile('province', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROVINCES.map((p) => (
                      <SelectItem key={p.code} value={p.code}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age_range">Age Range</Label>
                <Select
                  value={profile.age_range || ''}
                  onValueChange={(v) => updateProfile('age_range', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_RANGES.map((a) => (
                      <SelectItem key={a.value} value={a.value}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employment_status">Employment Status</Label>
                <Select
                  value={profile.employment_status || ''}
                  onValueChange={(v) => updateProfile('employment_status', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_STATUSES.map((e) => (
                      <SelectItem key={e.value} value={e.value}>
                        {e.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="marital_status">Marital Status</Label>
                <Select
                  value={profile.marital_status || ''}
                  onValueChange={(v) => updateProfile('marital_status', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {MARITAL_STATUSES.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {profile.employment_status === 'self-employed' && (
              <div className="space-y-2">
                <Label htmlFor="business_type">Business Type</Label>
                <Select
                  value={profile.business_type || ''}
                  onValueChange={(v) => updateProfile('business_type', v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((b) => (
                      <SelectItem key={b.value} value={b.value}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-teal-600" />
              <CardTitle>Income Sources</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'has_employment_income', label: 'I have T4 employment income' },
                { key: 'has_self_employment_income', label: 'I have self-employment/freelance income' },
                { key: 'has_investment_income', label: 'I have investment income (dividends, interest)' },
                { key: 'has_rental_income', label: 'I have rental property income' },
                { key: 'has_pension_income', label: 'I receive pension/retirement income' },
                { key: 'has_ei_benefits', label: 'I received Employment Insurance (EI) benefits' },
                { key: 'has_foreign_income', label: 'I have foreign income' },
              ].map((item) => (
                <div key={item.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.key}
                    checked={profile[item.key as keyof ProfileData] as boolean}
                    onCheckedChange={(c) =>
                      updateProfile(item.key as keyof ProfileData, c === true)
                    }
                  />
                  <Label htmlFor={item.key} className="cursor-pointer text-sm">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-teal-600" />
              <CardTitle>Deductions & Credits</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'has_rrsp_contributions', label: 'I made RRSP contributions' },
                { key: 'has_medical_expenses', label: 'I have medical expenses to claim' },
                { key: 'has_charitable_donations', label: 'I made charitable donations' },
                { key: 'has_childcare_expenses', label: 'I have childcare expenses' },
                { key: 'has_moving_expenses', label: 'I have moving expenses (for work/school)' },
                { key: 'has_home_office_expenses', label: 'I have home office expenses' },
                { key: 'has_student_loans', label: 'I paid student loan interest' },
                { key: 'has_tuition_credits', label: 'I have tuition credits' },
              ].map((item) => (
                <div key={item.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.key}
                    checked={profile[item.key as keyof ProfileData] as boolean}
                    onCheckedChange={(c) =>
                      updateProfile(item.key as keyof ProfileData, c === true)
                    }
                  />
                  <Label htmlFor={item.key} className="cursor-pointer text-sm">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-600" />
              <CardTitle>Family Situation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_dependents"
                checked={profile.has_dependents}
                onCheckedChange={(c) => updateProfile('has_dependents', c === true)}
              />
              <Label htmlFor="has_dependents" className="cursor-pointer">
                I have dependents
              </Label>
            </div>

            {profile.has_dependents && (
              <div className="pl-6 border-l-2 border-teal-200 dark:border-teal-800">
                <div className="space-y-2">
                  <Label htmlFor="num_dependents">Number of dependents</Label>
                  <Input
                    id="num_dependents"
                    type="number"
                    min={0}
                    max={10}
                    value={profile.num_dependents}
                    onChange={(e) => updateProfile('num_dependents', parseInt(e.target.value) || 0)}
                    className="w-24"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has_disability"
                checked={profile.has_disability}
                onCheckedChange={(c) => updateProfile('has_disability', c === true)}
              />
              <Label htmlFor="has_disability" className="cursor-pointer">
                I or a dependent have a disability
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Home className="h-5 w-5 text-teal-600" />
              <CardTitle>Investments & Property</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'has_tfsa', label: 'I have a TFSA' },
                { key: 'has_fhsa', label: 'I have a FHSA (First Home Savings Account)' },
                { key: 'is_first_time_home_buyer', label: 'I am a first-time home buyer' },
                { key: 'has_sold_property', label: 'I sold property this year' },
                { key: 'has_capital_gains', label: 'I have capital gains/losses' },
                { key: 'has_crypto_transactions', label: 'I have cryptocurrency transactions' },
              ].map((item) => (
                <div key={item.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={item.key}
                    checked={profile[item.key as keyof ProfileData] as boolean}
                    onCheckedChange={(c) =>
                      updateProfile(item.key as keyof ProfileData, c === true)
                    }
                  />
                  <Label htmlFor={item.key} className="cursor-pointer text-sm">
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
