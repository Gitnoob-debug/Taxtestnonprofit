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
import { ArrowLeft, Save, User, DollarSign, Loader2, Building2, Home, Users, PiggyBank, Sparkles, Bell, FileText, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

interface ProfileData {
  // Basic info
  province: string | null
  age_range: string | null
  birth_year: number | null
  employment_status: string | null
  marital_status: string | null
  display_name: string | null

  // Financial data
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

  // Notification preferences
  notification_preferences: {
    tax_deadline_reminders: boolean
    rrsp_deadline_reminder: boolean
    quarterly_installment_reminders: boolean
    tax_tips: boolean
  }

  // Meta
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
  const coreFields = ['province', 'birth_year', 'employment_status', 'marital_status']
  const financialFields = ['annual_income']

  let filled = 0
  let total = coreFields.length + financialFields.length

  for (const field of coreFields) {
    if (profile[field as keyof ProfileData]) filled++
  }
  for (const field of financialFields) {
    if (profile[field as keyof ProfileData]) filled++
  }

  return Math.round((filled / total) * 100)
}

const currentYear = new Date().getFullYear()

export function ProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const [profile, setProfile] = useState<ProfileData>({
    province: null,
    age_range: null,
    birth_year: null,
    employment_status: null,
    marital_status: null,
    display_name: null,
    annual_income: null,
    spouse_income: null,
    rrsp_contribution_room: null,
    rrsp_contributions_ytd: null,
    tfsa_contributions_lifetime: null,
    fhsa_contributions_lifetime: null,
    expected_retirement_age: null,
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
    notification_preferences: {
      tax_deadline_reminders: true,
      rrsp_deadline_reminder: true,
      quarterly_installment_reminders: false,
      tax_tips: true,
    },
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
            const p = data.profile
            setProfile({
              province: p.province || null,
              age_range: p.age_range || null,
              birth_year: p.birth_year || null,
              employment_status: p.employment_status || null,
              marital_status: p.marital_status || null,
              display_name: p.display_name || null,
              annual_income: p.annual_income || null,
              spouse_income: p.spouse_income || null,
              rrsp_contribution_room: p.rrsp_contribution_room || null,
              rrsp_contributions_ytd: p.rrsp_contributions_ytd || null,
              tfsa_contributions_lifetime: p.tfsa_contributions_lifetime || null,
              fhsa_contributions_lifetime: p.fhsa_contributions_lifetime || null,
              expected_retirement_age: p.expected_retirement_age || null,
              has_employment_income: p.has_employment_income || false,
              has_self_employment_income: p.has_self_employment_income || false,
              has_investment_income: p.has_investment_income || false,
              has_rental_income: p.has_rental_income || false,
              has_pension_income: p.has_pension_income || false,
              has_ei_benefits: p.has_ei_benefits || false,
              has_foreign_income: p.has_foreign_income || false,
              has_rrsp_contributions: p.has_rrsp_contributions || false,
              has_medical_expenses: p.has_medical_expenses || false,
              has_charitable_donations: p.has_charitable_donations || false,
              has_childcare_expenses: p.has_childcare_expenses || false,
              has_moving_expenses: p.has_moving_expenses || false,
              has_home_office_expenses: p.has_home_office_expenses || false,
              has_student_loans: p.has_student_loans || false,
              has_tuition_credits: p.has_tuition_credits || false,
              has_dependents: p.has_dependents || false,
              num_dependents: p.num_dependents || 0,
              has_disability: p.has_disability || false,
              is_first_time_home_buyer: p.is_first_time_home_buyer || false,
              has_sold_property: p.has_sold_property || false,
              has_capital_gains: p.has_capital_gains || false,
              has_crypto_transactions: p.has_crypto_transactions || false,
              has_tfsa: p.has_tfsa || false,
              has_fhsa: p.has_fhsa || false,
              business_type: p.business_type || null,
              notification_preferences: p.notification_preferences || {
                tax_deadline_reminders: true,
                rrsp_deadline_reminder: true,
                quarterly_installment_reminders: false,
                tax_tips: true,
              },
              profile_completeness: p.profile_completeness || 0,
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

  const updateNumericField = (key: keyof ProfileData, value: string) => {
    const numValue = value === '' ? null : parseFloat(value)
    updateProfile(key, numValue as any)
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

  const isMarriedOrCommonLaw = profile.marital_status === 'married' || profile.marital_status === 'common-law'

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

        {/* Quick Links */}
        <Card className="mb-6 border-emerald-200">
          <CardContent className="p-4">
            <Link
              href="/profile/documents"
              className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FileText className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">My Documents</p>
                  <p className="text-sm text-slate-500">View and manage your uploaded tax documents</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </Link>
          </CardContent>
        </Card>

        {/* Profile Completeness */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              Profile Completeness
            </CardTitle>
            <CardDescription>
              Complete your profile to get personalized calculator pre-fills and tax recommendations
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

        {/* Basic Information */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-teal-600" />
              <CardTitle>Basic Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Display Name (optional)</Label>
              <Input
                id="display_name"
                placeholder="How should we greet you?"
                value={profile.display_name || ''}
                onChange={(e) => updateProfile('display_name', e.target.value || null)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
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
                <Label htmlFor="birth_year">Year of Birth *</Label>
                <Input
                  id="birth_year"
                  type="number"
                  placeholder="1990"
                  min={1920}
                  max={currentYear - 18}
                  value={profile.birth_year || ''}
                  onChange={(e) => updateNumericField('birth_year', e.target.value)}
                />
                <p className="text-xs text-slate-500">Used for TFSA room & CPP calculations</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employment_status">Employment Status *</Label>
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
                <Label htmlFor="marital_status">Marital Status *</Label>
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

        {/* Financial Information - NEW SECTION */}
        <Card className="mb-6 border-emerald-200 dark:border-emerald-800">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <CardTitle>Financial Information</CardTitle>
            </div>
            <CardDescription>
              This data pre-fills calculators so you get instant personalized results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="annual_income">Annual Income *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="annual_income"
                    type="number"
                    placeholder="75,000"
                    className="pl-7"
                    value={profile.annual_income || ''}
                    onChange={(e) => updateNumericField('annual_income', e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500">Your gross annual income before taxes</p>
              </div>

              {isMarriedOrCommonLaw && (
                <div className="space-y-2">
                  <Label htmlFor="spouse_income">Spouse/Partner Income</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="spouse_income"
                      type="number"
                      placeholder="60,000"
                      className="pl-7"
                      value={profile.spouse_income || ''}
                      onChange={(e) => updateNumericField('spouse_income', e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-slate-500">Used for family tax optimization</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rrsp_contribution_room">RRSP Contribution Room</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="rrsp_contribution_room"
                    type="number"
                    placeholder="50,000"
                    className="pl-7"
                    value={profile.rrsp_contribution_room || ''}
                    onChange={(e) => updateNumericField('rrsp_contribution_room', e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500">From your CRA Notice of Assessment</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rrsp_contributions_ytd">RRSP Contributions This Year</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="rrsp_contributions_ytd"
                    type="number"
                    placeholder="5,000"
                    className="pl-7"
                    value={profile.rrsp_contributions_ytd || ''}
                    onChange={(e) => updateNumericField('rrsp_contributions_ytd', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tfsa_contributions_lifetime">TFSA Contributions (Lifetime)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="tfsa_contributions_lifetime"
                    type="number"
                    placeholder="40,000"
                    className="pl-7"
                    value={profile.tfsa_contributions_lifetime || ''}
                    onChange={(e) => updateNumericField('tfsa_contributions_lifetime', e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500">Total you've ever contributed to TFSA</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fhsa_contributions_lifetime">FHSA Contributions (Lifetime)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="fhsa_contributions_lifetime"
                    type="number"
                    placeholder="8,000"
                    className="pl-7"
                    value={profile.fhsa_contributions_lifetime || ''}
                    onChange={(e) => updateNumericField('fhsa_contributions_lifetime', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expected_retirement_age">Expected Retirement Age</Label>
              <Input
                id="expected_retirement_age"
                type="number"
                placeholder="65"
                min={55}
                max={75}
                className="w-32"
                value={profile.expected_retirement_age || ''}
                onChange={(e) => updateNumericField('expected_retirement_age', e.target.value)}
              />
              <p className="text-xs text-slate-500">Used for CPP/OAS calculations</p>
            </div>
          </CardContent>
        </Card>

        {/* Registered Accounts */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5 text-teal-600" />
              <CardTitle>Registered Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { key: 'has_tfsa', label: 'I have a TFSA' },
                { key: 'has_fhsa', label: 'I have a FHSA (First Home Savings Account)' },
                { key: 'has_rrsp_contributions', label: 'I make RRSP contributions' },
                { key: 'is_first_time_home_buyer', label: 'I am a first-time home buyer' },
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

        {/* Income Sources */}
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

        {/* Deductions & Credits */}
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

        {/* Family Situation */}
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

        {/* Investments & Property */}
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

        {/* Notification Preferences */}
        <Card className="mb-6 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>
              Get reminders for important tax deadlines and tips
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="tax_deadline_reminders"
                  checked={profile.notification_preferences.tax_deadline_reminders}
                  onCheckedChange={(c) =>
                    updateProfile('notification_preferences', {
                      ...profile.notification_preferences,
                      tax_deadline_reminders: c === true,
                    })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="tax_deadline_reminders" className="cursor-pointer font-medium">
                    Tax Filing Deadline Reminders
                  </Label>
                  <p className="text-sm text-slate-500">
                    Get reminded before April 30 (or June 15 for self-employed)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="rrsp_deadline_reminder"
                  checked={profile.notification_preferences.rrsp_deadline_reminder}
                  onCheckedChange={(c) =>
                    updateProfile('notification_preferences', {
                      ...profile.notification_preferences,
                      rrsp_deadline_reminder: c === true,
                    })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="rrsp_deadline_reminder" className="cursor-pointer font-medium">
                    RRSP Contribution Deadline
                  </Label>
                  <p className="text-sm text-slate-500">
                    Reminder before the first 60 days deadline (usually March 1)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="quarterly_installment_reminders"
                  checked={profile.notification_preferences.quarterly_installment_reminders}
                  onCheckedChange={(c) =>
                    updateProfile('notification_preferences', {
                      ...profile.notification_preferences,
                      quarterly_installment_reminders: c === true,
                    })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="quarterly_installment_reminders" className="cursor-pointer font-medium">
                    Quarterly Tax Installment Reminders
                  </Label>
                  <p className="text-sm text-slate-500">
                    For self-employed or those who owe taxes: Mar 15, Jun 15, Sep 15, Dec 15
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="tax_tips"
                  checked={profile.notification_preferences.tax_tips}
                  onCheckedChange={(c) =>
                    updateProfile('notification_preferences', {
                      ...profile.notification_preferences,
                      tax_tips: c === true,
                    })
                  }
                />
                <div className="space-y-1">
                  <Label htmlFor="tax_tips" className="cursor-pointer font-medium">
                    Tax Saving Tips
                  </Label>
                  <p className="text-sm text-slate-500">
                    Occasional tips based on your profile to help reduce your taxes
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Note:</strong> Email notifications will be sent to your account email.
                Make sure your email is verified in your account settings.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button at Bottom */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Profile
          </Button>
        </div>
      </div>
    </div>
  )
}
