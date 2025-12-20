'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  Loader2,
  Users,
  Baby,
  Heart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import {
  calculateTotalTax,
  calculateRRSPTaxSavings,
  PROVINCE_NAMES,
} from '@/lib/canadianTaxData'

interface FamilyMember {
  id: string
  name: string
  income: number
  age: number
  isSpouse: boolean
}

interface FamilySettings {
  province: string
  members: FamilyMember[]
  childcareExpenses: number
  numChildrenUnder7: number
  numChildren7to16: number
  medicalExpenses: number
  charitableDonations: number
}

interface OptimizationResult {
  strategy: string
  description: string
  currentTax: number
  optimizedTax: number
  savings: number
  recommendation: string
}

const PROVINCES = Object.entries(PROVINCE_NAMES).map(([code, name]) => ({
  code,
  name,
}))

// Calculate childcare deduction limits
function calculateChildcareLimit(numUnder7: number, num7to16: number): number {
  return (numUnder7 * 8000) + (num7to16 * 5000)
}

// Optimize childcare expense claim
function optimizeChildcare(
  settings: FamilySettings
): OptimizationResult | null {
  const { members, childcareExpenses, numChildrenUnder7, numChildren7to16 } = settings

  if (childcareExpenses === 0 || members.length < 2) return null

  const spouse = members.find(m => m.isSpouse)
  const primary = members.find(m => !m.isSpouse)
  if (!spouse || !primary) return null

  const maxDeduction = calculateChildcareLimit(numChildrenUnder7, numChildren7to16)
  const claimableAmount = Math.min(childcareExpenses, maxDeduction)

  // Childcare must be claimed by lower income spouse
  const lowerIncome = Math.min(primary.income, spouse.income)
  const higherIncome = Math.max(primary.income, spouse.income)

  // Also limited to 2/3 of earned income for lower-income spouse
  const earnedIncomeLimit = lowerIncome * (2 / 3)
  const actualClaim = Math.min(claimableAmount, earnedIncomeLimit)

  // Calculate tax savings
  const taxWithoutChildcare = calculateTotalTax(lowerIncome, settings.province).totalTax
  const taxWithChildcare = calculateTotalTax(Math.max(0, lowerIncome - actualClaim), settings.province).totalTax
  const savings = taxWithoutChildcare - taxWithChildcare

  if (savings <= 0) return null

  const correctClaimant = primary.income < spouse.income ? primary.name : spouse.name

  return {
    strategy: 'Childcare Expenses',
    description: `Claim $${actualClaim.toLocaleString()} in childcare expenses on ${correctClaimant}'s return (lower-income spouse).`,
    currentTax: taxWithoutChildcare,
    optimizedTax: taxWithChildcare,
    savings,
    recommendation: `The lower-income spouse should claim childcare to get a deduction of up to $${actualClaim.toLocaleString()}.`,
  }
}

// Optimize spousal RRSP
function optimizeSpousalRRSP(
  settings: FamilySettings
): OptimizationResult | null {
  const { members, province } = settings

  if (members.length < 2) return null

  const spouse = members.find(m => m.isSpouse)
  const primary = members.find(m => !m.isSpouse)
  if (!spouse || !primary) return null

  const incomeDiff = Math.abs(primary.income - spouse.income)
  if (incomeDiff < 20000) return null // Not enough difference to benefit

  const higherEarner = primary.income > spouse.income ? primary : spouse
  const lowerEarner = primary.income > spouse.income ? spouse : primary

  // Estimate RRSP contribution (18% of higher income, capped)
  const suggestedContribution = Math.min(higherEarner.income * 0.18, 32490)

  // Calculate tax savings from spousal RRSP vs regular RRSP
  const regularRRSPSavings = calculateRRSPTaxSavings(
    suggestedContribution,
    higherEarner.income,
    province
  ).taxSavings

  // Future benefit: withdrawals at lower spouse's tax rate
  const estimatedFutureBenefit = suggestedContribution * 0.1 // Rough estimate of rate difference benefit

  if (regularRRSPSavings + estimatedFutureBenefit < 500) return null

  return {
    strategy: 'Spousal RRSP',
    description: `${higherEarner.name} contributes to a Spousal RRSP in ${lowerEarner.name}'s name.`,
    currentTax: calculateTotalTax(higherEarner.income, province).totalTax,
    optimizedTax: calculateTotalTax(higherEarner.income - suggestedContribution, province).totalTax,
    savings: regularRRSPSavings,
    recommendation: `Contributing $${suggestedContribution.toLocaleString()} to a spousal RRSP saves $${regularRRSPSavings.toLocaleString()} now, and withdrawals in retirement will be taxed at ${lowerEarner.name}'s lower rate.`,
  }
}

// Optimize medical expense claim
function optimizeMedicalExpenses(
  settings: FamilySettings
): OptimizationResult | null {
  const { members, medicalExpenses, province } = settings

  if (medicalExpenses === 0 || members.length < 2) return null

  const spouse = members.find(m => m.isSpouse)
  const primary = members.find(m => !m.isSpouse)
  if (!spouse || !primary) return null

  // Medical expense threshold: 3% of net income or $2,759 (whichever is less)
  const primaryThreshold = Math.min(primary.income * 0.03, 2759)
  const spouseThreshold = Math.min(spouse.income * 0.03, 2759)

  // Eligible amount after threshold
  const primaryEligible = Math.max(0, medicalExpenses - primaryThreshold)
  const spouseEligible = Math.max(0, medicalExpenses - spouseThreshold)

  // Credit is 15% of eligible amount
  const primaryCredit = primaryEligible * 0.15
  const spouseCredit = spouseEligible * 0.15

  const bestClaimant = primaryCredit > spouseCredit
    ? { member: primary, credit: primaryCredit }
    : { member: spouse, credit: spouseCredit }

  if (bestClaimant.credit < 100) return null

  return {
    strategy: 'Medical Expenses',
    description: `Claim medical expenses on ${bestClaimant.member.name}'s return.`,
    currentTax: 0,
    optimizedTax: 0,
    savings: Math.round(bestClaimant.credit),
    recommendation: `${bestClaimant.member.name} should claim $${medicalExpenses.toLocaleString()} in medical expenses for a credit of approximately $${Math.round(bestClaimant.credit).toLocaleString()}.`,
  }
}

// Optimize charitable donations
function optimizeCharitableDonations(
  settings: FamilySettings
): OptimizationResult | null {
  const { members, charitableDonations, province } = settings

  if (charitableDonations === 0 || members.length < 2) return null

  const spouse = members.find(m => m.isSpouse)
  const primary = members.find(m => !m.isSpouse)
  if (!spouse || !primary) return null

  // Donations over $200 get higher credit (29-33%)
  // Best to combine on one return to exceed $200 threshold
  const lowRateAmount = Math.min(200, charitableDonations)
  const highRateAmount = Math.max(0, charitableDonations - 200)

  const lowRateCredit = lowRateAmount * 0.15
  const highRateCredit = highRateAmount * 0.29

  const totalCredit = lowRateCredit + highRateCredit

  // Higher earner may get higher provincial credit
  const higherEarner = primary.income > spouse.income ? primary : spouse

  if (totalCredit < 50) return null

  return {
    strategy: 'Charitable Donations',
    description: `Combine and claim all donations on ${higherEarner.name}'s return.`,
    currentTax: 0,
    optimizedTax: 0,
    savings: Math.round(totalCredit),
    recommendation: `Combine donations on one return to exceed the $200 threshold. Total credit: ~$${Math.round(totalCredit).toLocaleString()}. Consider donating appreciated securities to avoid capital gains.`,
  }
}

// Pension income splitting (for those 65+)
function optimizePensionSplitting(
  settings: FamilySettings
): OptimizationResult | null {
  const { members, province } = settings

  if (members.length < 2) return null

  const spouse = members.find(m => m.isSpouse)
  const primary = members.find(m => !m.isSpouse)
  if (!spouse || !primary) return null

  // Only available if one spouse has pension income and is 65+
  const eligibleForSplitting = members.filter(m => m.age >= 65)
  if (eligibleForSplitting.length === 0) return null

  const higherEarner = primary.income > spouse.income ? primary : spouse
  const lowerEarner = primary.income > spouse.income ? spouse : primary

  if (higherEarner.age < 65) return null

  // Assume higher earner has pension income equal to their income
  // Can split up to 50%
  const splitAmount = higherEarner.income * 0.5

  const currentTax = calculateTotalTax(higherEarner.income, province).totalTax +
    calculateTotalTax(lowerEarner.income, province).totalTax

  const newHigherTax = calculateTotalTax(higherEarner.income - splitAmount, province).totalTax
  const newLowerTax = calculateTotalTax(lowerEarner.income + splitAmount, province).totalTax

  const optimizedTax = newHigherTax + newLowerTax
  const savings = currentTax - optimizedTax

  if (savings < 500) return null

  return {
    strategy: 'Pension Income Splitting',
    description: `${higherEarner.name} allocates up to 50% of eligible pension income to ${lowerEarner.name}.`,
    currentTax,
    optimizedTax,
    savings,
    recommendation: `Split up to $${splitAmount.toLocaleString()} of pension income. Use Form T1032 with your tax return. Calculate the optimal split percentage.`,
  }
}

export function FamilyTaxOptimizer() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [initialized, setInitialized] = useState(false)

  const [settings, setSettings] = useState<FamilySettings>({
    province: 'ON',
    members: [
      { id: 'primary', name: 'You', income: 75000, age: 40, isSpouse: false },
    ],
    childcareExpenses: 0,
    numChildrenUnder7: 0,
    numChildren7to16: 0,
    medicalExpenses: 0,
    charitableDonations: 0,
  })

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!user) {
      router.push('/profile')
      return
    }

    // Initialize from profile
    if (!initialized && profile) {
      const currentYear = new Date().getFullYear()
      const birthYear = profile.birth_year || currentYear - 40
      const currentAge = currentYear - birthYear

      const members: FamilyMember[] = [
        {
          id: 'primary',
          name: profile.display_name || 'You',
          income: profile.annual_income || 75000,
          age: currentAge,
          isSpouse: false,
        },
      ]

      // Add spouse if married
      if (profile.marital_status === 'married' || profile.marital_status === 'common-law') {
        members.push({
          id: 'spouse',
          name: 'Spouse',
          income: profile.spouse_income || 50000,
          age: currentAge, // Assume same age
          isSpouse: true,
        })
      }

      setSettings((prev) => ({
        ...prev,
        province: profile.province || 'ON',
        members,
        childcareExpenses: profile.has_childcare_expenses ? 10000 : 0,
        numChildrenUnder7: profile.has_dependents ? Math.min(profile.num_dependents, 2) : 0,
        numChildren7to16: profile.has_dependents ? Math.max(0, profile.num_dependents - 2) : 0,
        medicalExpenses: profile.has_medical_expenses ? 2000 : 0,
        charitableDonations: profile.has_charitable_donations ? 1000 : 0,
      }))
      setInitialized(true)
    }
  }, [user, authLoading, profileLoading, profile, initialized])

  const addSpouse = () => {
    if (settings.members.some(m => m.isSpouse)) return
    setSettings((prev) => ({
      ...prev,
      members: [
        ...prev.members,
        { id: 'spouse', name: 'Spouse', income: 50000, age: 40, isSpouse: true },
      ],
    }))
  }

  const removeSpouse = () => {
    setSettings((prev) => ({
      ...prev,
      members: prev.members.filter(m => !m.isSpouse),
    }))
  }

  const updateMember = (id: string, updates: Partial<FamilyMember>) => {
    setSettings((prev) => ({
      ...prev,
      members: prev.members.map(m => m.id === id ? { ...m, ...updates } : m),
    }))
  }

  // Calculate optimizations
  const optimizations = useMemo(() => {
    const results: OptimizationResult[] = []

    const childcare = optimizeChildcare(settings)
    if (childcare) results.push(childcare)

    const spousalRRSP = optimizeSpousalRRSP(settings)
    if (spousalRRSP) results.push(spousalRRSP)

    const medical = optimizeMedicalExpenses(settings)
    if (medical) results.push(medical)

    const donations = optimizeCharitableDonations(settings)
    if (donations) results.push(donations)

    const pension = optimizePensionSplitting(settings)
    if (pension) results.push(pension)

    // Sort by savings descending
    results.sort((a, b) => b.savings - a.savings)

    return results
  }, [settings])

  const totalSavings = optimizations.reduce((sum, opt) => sum + opt.savings, 0)

  const hasSpouse = settings.members.some(m => m.isSpouse)

  if (authLoading || profileLoading || !initialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Users className="h-6 w-6 text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Family Tax Optimizer</h1>
          </div>
          <p className="text-slate-500">
            Find tax-saving opportunities by optimizing how expenses and income are allocated across family members.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Family Setup */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Family Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Province */}
                <div>
                  <Label className="text-xs text-slate-500">Province</Label>
                  <Select
                    value={settings.province}
                    onValueChange={(v) => setSettings((s) => ({ ...s, province: v }))}
                  >
                    <SelectTrigger className="h-9 mt-1">
                      <SelectValue />
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

                {/* Family Members */}
                {settings.members.map((member) => (
                  <div key={member.id} className="p-4 bg-slate-50 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Input
                        value={member.name}
                        onChange={(e) => updateMember(member.id, { name: e.target.value })}
                        className="font-medium border-0 p-0 h-auto focus-visible:ring-0 bg-transparent w-32"
                      />
                      {member.isSpouse && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeSpouse}
                          className="text-red-500 hover:text-red-600 h-8 px-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-slate-500">Annual Income</Label>
                        <Input
                          type="number"
                          value={member.income}
                          onChange={(e) => updateMember(member.id, { income: Number(e.target.value) || 0 })}
                          className="h-9 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-500">Age</Label>
                        <Input
                          type="number"
                          value={member.age}
                          onChange={(e) => updateMember(member.id, { age: Number(e.target.value) || 0 })}
                          className="h-9 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {!hasSpouse && (
                  <Button
                    variant="outline"
                    onClick={addSpouse}
                    className="w-full gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Add Spouse/Partner
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Children & Expenses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Baby className="h-5 w-5 text-blue-500" />
                  Children & Expenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-slate-500">Children Under 7</Label>
                    <Input
                      type="number"
                      value={settings.numChildrenUnder7}
                      onChange={(e) => setSettings((s) => ({ ...s, numChildrenUnder7: Number(e.target.value) || 0 }))}
                      className="h-9 mt-1"
                      min={0}
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Children 7-16</Label>
                    <Input
                      type="number"
                      value={settings.numChildren7to16}
                      onChange={(e) => setSettings((s) => ({ ...s, numChildren7to16: Number(e.target.value) || 0 }))}
                      className="h-9 mt-1"
                      min={0}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Annual Childcare Expenses</Label>
                  <Input
                    type="number"
                    value={settings.childcareExpenses}
                    onChange={(e) => setSettings((s) => ({ ...s, childcareExpenses: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Medical Expenses</Label>
                  <Input
                    type="number"
                    value={settings.medicalExpenses}
                    onChange={(e) => setSettings((s) => ({ ...s, medicalExpenses: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Charitable Donations</Label>
                  <Input
                    type="number"
                    value={settings.charitableDonations}
                    onChange={(e) => setSettings((s) => ({ ...s, charitableDonations: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Optimization Results */}
          <div className="space-y-6">
            {/* Total Savings */}
            <Card className={cn(
              "bg-gradient-to-r border-2",
              totalSavings > 0
                ? "from-emerald-50 to-teal-50 border-emerald-200"
                : "from-slate-50 to-slate-100 border-slate-200"
            )}>
              <CardContent className="py-6">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-1">Potential Family Tax Savings</p>
                  <p className={cn(
                    "text-4xl font-bold",
                    totalSavings > 0 ? "text-emerald-600" : "text-slate-400"
                  )}>
                    ${totalSavings.toLocaleString()}
                  </p>
                  {optimizations.length > 0 && (
                    <p className="text-sm text-slate-500 mt-2">
                      {optimizations.length} optimization{optimizations.length !== 1 ? 's' : ''} found
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* No Spouse Warning */}
            {!hasSpouse && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-900">Add spouse for more optimizations</p>
                      <p className="text-sm text-amber-700">
                        Many tax-saving strategies require a spouse or common-law partner.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Optimization Strategies */}
            {optimizations.length > 0 ? (
              <div className="space-y-4">
                {optimizations.map((opt, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg shrink-0">
                          <TrendingDown className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-slate-900">{opt.strategy}</h3>
                            <span className="text-lg font-bold text-emerald-600">
                              ${opt.savings.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{opt.description}</p>
                          <div className="bg-slate-50 p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <ArrowRight className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                              <p className="text-sm text-slate-700">{opt.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="text-center text-slate-500">
                    <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p className="font-medium">No additional optimizations found</p>
                    <p className="text-sm">
                      Try adding a spouse, children, or expenses to see optimization opportunities.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="py-4">
                <h3 className="font-medium text-blue-900 mb-2">Family Tax Tips</h3>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <span>Childcare expenses must be claimed by the lower-income spouse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <span>Medical expenses often benefit from being claimed by the lower-income spouse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <span>Donations over $200 get a higher credit rate (29%+ vs 15%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    <span>Pension splitting is available for those 65+ with eligible pension income</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-slate-400 text-center">
          These calculations are estimates based on general tax rules. Individual circumstances may vary.
          Consult a tax professional for personalized advice.
        </p>
      </div>
    </div>
  )
}
