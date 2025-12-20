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
  Calendar,
  TrendingUp,
  PiggyBank,
  DollarSign,
  Target,
  AlertCircle,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import {
  calculateTotalTax,
  PROVINCE_NAMES,
  RRSP_LIMIT_2025,
  CPP_MAX_MONTHLY_BENEFIT_65,
  OAS_MAX_ANNUAL_65_74,
  OAS_CLAWBACK_THRESHOLD,
} from '@/lib/canadianTaxData'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

interface YearProjection {
  year: number
  age: number
  income: number
  rrspContribution: number
  rrspBalance: number
  tfsaBalance: number
  totalTax: number
  afterTaxIncome: number
  cppBenefit: number
  oasBenefit: number
  totalRetirementIncome: number
}

interface PlannerSettings {
  currentAge: number
  retirementAge: number
  currentIncome: number
  incomeGrowthRate: number
  province: string
  rrspBalance: number
  annualRRSPContribution: number
  tfsaBalance: number
  annualTFSAContribution: number
  investmentReturn: number
  inflationRate: number
  cppStartAge: number
  oasStartAge: number
  yearsToProject: number
}

const PROVINCES = Object.entries(PROVINCE_NAMES).map(([code, name]) => ({
  code,
  name,
}))

function calculateProjections(settings: PlannerSettings): YearProjection[] {
  const projections: YearProjection[] = []
  const currentYear = new Date().getFullYear()

  let rrspBalance = settings.rrspBalance
  let tfsaBalance = settings.tfsaBalance
  let currentIncome = settings.currentIncome

  for (let i = 0; i <= settings.yearsToProject; i++) {
    const year = currentYear + i
    const age = settings.currentAge + i
    const isRetired = age >= settings.retirementAge

    // Calculate income
    let income = isRetired ? 0 : currentIncome

    // Calculate CPP benefit (simplified)
    let cppBenefit = 0
    if (age >= settings.cppStartAge) {
      // Adjust for early/late start
      const monthsFromAge65 = (settings.cppStartAge - 65) * 12
      let adjustment = 1
      if (settings.cppStartAge < 65) {
        adjustment = 1 - (Math.abs(monthsFromAge65) * 0.006) // 0.6% reduction per month
      } else if (settings.cppStartAge > 65) {
        adjustment = 1 + (monthsFromAge65 * 0.007) // 0.7% increase per month
      }
      cppBenefit = CPP_MAX_MONTHLY_BENEFIT_65 * 12 * adjustment * 0.7 // Assume 70% of max
    }

    // Calculate OAS benefit
    let oasBenefit = 0
    if (age >= settings.oasStartAge) {
      const adjustment = settings.oasStartAge > 65 ? 1 + ((settings.oasStartAge - 65) * 12 * 0.006) : 1
      oasBenefit = OAS_MAX_ANNUAL_65_74 * adjustment

      // Calculate clawback
      const totalIncome = income + cppBenefit + (isRetired ? rrspBalance * 0.04 : 0)
      if (totalIncome > OAS_CLAWBACK_THRESHOLD) {
        const clawback = (totalIncome - OAS_CLAWBACK_THRESHOLD) * 0.15
        oasBenefit = Math.max(0, oasBenefit - clawback)
      }
    }

    // RRSP withdrawal in retirement
    let rrspWithdrawal = 0
    if (isRetired && rrspBalance > 0) {
      // Withdraw 4% of RRSP in retirement
      rrspWithdrawal = rrspBalance * 0.04
    }

    // Calculate taxable income
    const taxableIncome = income + cppBenefit + rrspWithdrawal

    // Calculate RRSP contribution
    const rrspContribution = isRetired ? 0 : Math.min(
      settings.annualRRSPContribution,
      currentIncome * 0.18,
      RRSP_LIMIT_2025
    )

    // Calculate taxes
    const taxResult = calculateTotalTax(Math.max(0, taxableIncome - rrspContribution), settings.province)

    // Update balances
    if (!isRetired) {
      rrspBalance = rrspBalance * (1 + settings.investmentReturn / 100) + rrspContribution
      tfsaBalance = tfsaBalance * (1 + settings.investmentReturn / 100) + settings.annualTFSAContribution
    } else {
      rrspBalance = Math.max(0, rrspBalance * (1 + settings.investmentReturn / 100) - rrspWithdrawal)
      tfsaBalance = tfsaBalance * (1 + settings.investmentReturn / 100)
    }

    // After-tax income
    const afterTaxIncome = taxableIncome - rrspContribution - taxResult.totalTax + oasBenefit

    // Total retirement income (for retired years)
    const totalRetirementIncome = isRetired
      ? cppBenefit + oasBenefit + rrspWithdrawal + (tfsaBalance * 0.04) - taxResult.totalTax
      : 0

    projections.push({
      year,
      age,
      income,
      rrspContribution,
      rrspBalance: Math.round(rrspBalance),
      tfsaBalance: Math.round(tfsaBalance),
      totalTax: Math.round(taxResult.totalTax),
      afterTaxIncome: Math.round(afterTaxIncome),
      cppBenefit: Math.round(cppBenefit),
      oasBenefit: Math.round(oasBenefit),
      totalRetirementIncome: Math.round(totalRetirementIncome),
    })

    // Grow income for next year
    if (!isRetired) {
      currentIncome = currentIncome * (1 + settings.incomeGrowthRate / 100)
    }
  }

  return projections
}

export function MultiYearPlanner() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [initialized, setInitialized] = useState(false)

  const [settings, setSettings] = useState<PlannerSettings>({
    currentAge: 35,
    retirementAge: 65,
    currentIncome: 75000,
    incomeGrowthRate: 2,
    province: 'ON',
    rrspBalance: 50000,
    annualRRSPContribution: 10000,
    tfsaBalance: 20000,
    annualTFSAContribution: 7000,
    investmentReturn: 6,
    inflationRate: 2,
    cppStartAge: 65,
    oasStartAge: 65,
    yearsToProject: 30,
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
      const birthYear = profile.birth_year || currentYear - 35
      const currentAge = currentYear - birthYear

      setSettings((prev) => ({
        ...prev,
        currentAge,
        retirementAge: profile.expected_retirement_age || 65,
        currentIncome: profile.annual_income || 75000,
        province: profile.province || 'ON',
        rrspBalance: (profile.rrsp_contributions_ytd || 0) * 5, // Rough estimate
        annualRRSPContribution: profile.rrsp_contributions_ytd || 10000,
        tfsaBalance: profile.tfsa_contributions_lifetime || 20000,
        yearsToProject: Math.max(10, (profile.expected_retirement_age || 65) - currentAge + 10),
      }))
      setInitialized(true)
    }
  }, [user, authLoading, profileLoading, profile, initialized])

  const projections = useMemo(() => calculateProjections(settings), [settings])

  const retirementYear = projections.find((p) => p.age === settings.retirementAge)
  const finalYear = projections[projections.length - 1]

  const chartData = projections.map((p) => ({
    year: p.year,
    age: p.age,
    'RRSP Balance': p.rrspBalance,
    'TFSA Balance': p.tfsaBalance,
    'Total Savings': p.rrspBalance + p.tfsaBalance,
    'Annual Tax': p.totalTax,
    'After-Tax Income': p.afterTaxIncome,
    'Retirement Income': p.totalRetirementIncome || undefined,
  }))

  const formatCurrency = (value: number) =>
    value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

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
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Multi-Year Tax Planner</h1>
          </div>
          <p className="text-slate-500">
            Project your taxes and retirement savings over time. See how your financial decisions today affect your future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Age Settings */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-slate-700">Age & Retirement</h4>

                <div>
                  <Label className="text-xs text-slate-500">Current Age: {settings.currentAge}</Label>
                  <input
                    type="range"
                    value={settings.currentAge}
                    onChange={(e) => setSettings((s) => ({ ...s, currentAge: Number(e.target.value) }))}
                    min={18}
                    max={75}
                    step={1}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Retirement Age: {settings.retirementAge}</Label>
                  <input
                    type="range"
                    value={settings.retirementAge}
                    onChange={(e) => setSettings((s) => ({ ...s, retirementAge: Number(e.target.value) }))}
                    min={55}
                    max={75}
                    step={1}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Years to Project: {settings.yearsToProject}</Label>
                  <input
                    type="range"
                    value={settings.yearsToProject}
                    onChange={(e) => setSettings((s) => ({ ...s, yearsToProject: Number(e.target.value) }))}
                    min={5}
                    max={40}
                    step={5}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              {/* Income Settings */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-sm font-medium text-slate-700">Income</h4>

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

                <div>
                  <Label className="text-xs text-slate-500">Current Annual Income</Label>
                  <Input
                    type="number"
                    value={settings.currentIncome}
                    onChange={(e) => setSettings((s) => ({ ...s, currentIncome: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Annual Income Growth: {settings.incomeGrowthRate}%</Label>
                  <input
                    type="range"
                    value={settings.incomeGrowthRate}
                    onChange={(e) => setSettings((s) => ({ ...s, incomeGrowthRate: Number(e.target.value) }))}
                    min={0}
                    max={5}
                    step={0.5}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              {/* Savings Settings */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-sm font-medium text-slate-700">Savings</h4>

                <div>
                  <Label className="text-xs text-slate-500">Current RRSP Balance</Label>
                  <Input
                    type="number"
                    value={settings.rrspBalance}
                    onChange={(e) => setSettings((s) => ({ ...s, rrspBalance: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Annual RRSP Contribution</Label>
                  <Input
                    type="number"
                    value={settings.annualRRSPContribution}
                    onChange={(e) => setSettings((s) => ({ ...s, annualRRSPContribution: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Current TFSA Balance</Label>
                  <Input
                    type="number"
                    value={settings.tfsaBalance}
                    onChange={(e) => setSettings((s) => ({ ...s, tfsaBalance: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Annual TFSA Contribution</Label>
                  <Input
                    type="number"
                    value={settings.annualTFSAContribution}
                    onChange={(e) => setSettings((s) => ({ ...s, annualTFSAContribution: Number(e.target.value) || 0 }))}
                    className="h-9 mt-1"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Investment Return: {settings.investmentReturn}%</Label>
                  <input
                    type="range"
                    value={settings.investmentReturn}
                    onChange={(e) => setSettings((s) => ({ ...s, investmentReturn: Number(e.target.value) }))}
                    min={2}
                    max={10}
                    step={0.5}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              {/* CPP/OAS Settings */}
              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-sm font-medium text-slate-700">Government Benefits</h4>

                <div>
                  <Label className="text-xs text-slate-500">CPP Start Age: {settings.cppStartAge}</Label>
                  <input
                    type="range"
                    value={settings.cppStartAge}
                    onChange={(e) => setSettings((s) => ({ ...s, cppStartAge: Number(e.target.value) }))}
                    min={60}
                    max={70}
                    step={1}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <Label className="text-xs text-slate-500">OAS Start Age: {settings.oasStartAge}</Label>
                  <input
                    type="range"
                    value={settings.oasStartAge}
                    onChange={(e) => setSettings((s) => ({ ...s, oasStartAge: Number(e.target.value) }))}
                    min={65}
                    max={70}
                    step={1}
                    className="mt-2 w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts & Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-blue-500" />
                    <p className="text-xs text-slate-500">Retirement Age</p>
                  </div>
                  <p className="text-xl font-bold text-slate-900">{settings.retirementAge}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <PiggyBank className="h-4 w-4 text-emerald-500" />
                    <p className="text-xs text-slate-500">At Retirement</p>
                  </div>
                  <p className="text-xl font-bold text-emerald-600">
                    {retirementYear ? formatCurrency(retirementYear.rrspBalance + retirementYear.tfsaBalance) : '-'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="h-4 w-4 text-amber-500" />
                    <p className="text-xs text-slate-500">Retirement Income</p>
                  </div>
                  <p className="text-xl font-bold text-amber-600">
                    {retirementYear ? formatCurrency(retirementYear.totalRetirementIncome) : '-'}/yr
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <p className="text-xs text-slate-500">Final Balance</p>
                  </div>
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(finalYear.rrspBalance + finalYear.tfsaBalance)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Savings Growth Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Savings Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" tickFormatter={(v) => `Age ${v}`} />
                      <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value) || 0)}
                        labelFormatter={(label) => `Age ${label}`}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="RRSP Balance"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="TFSA Balance"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Income & Tax Chart */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Income & Taxes Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" tickFormatter={(v) => `Age ${v}`} />
                      <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value) || 0)}
                        labelFormatter={(label) => `Age ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="After-Tax Income"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Annual Tax"
                        stroke="#ef4444"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="Retirement Income"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Retirement Info */}
            {retirementYear && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-blue-900 mb-2">At Retirement (Age {settings.retirementAge})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-blue-600">RRSP Balance</p>
                          <p className="font-semibold text-blue-900">{formatCurrency(retirementYear.rrspBalance)}</p>
                        </div>
                        <div>
                          <p className="text-blue-600">TFSA Balance</p>
                          <p className="font-semibold text-blue-900">{formatCurrency(retirementYear.tfsaBalance)}</p>
                        </div>
                        <div>
                          <p className="text-blue-600">CPP Benefit (annual)</p>
                          <p className="font-semibold text-blue-900">{formatCurrency(retirementYear.cppBenefit)}</p>
                        </div>
                        <div>
                          <p className="text-blue-600">OAS Benefit (annual)</p>
                          <p className="font-semibold text-blue-900">{formatCurrency(retirementYear.oasBenefit)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-slate-400 text-center">
          These projections are estimates based on the assumptions provided. Actual results will vary based on market conditions,
          tax law changes, and personal circumstances. Consult a financial advisor for personalized advice.
        </p>
      </div>
    </div>
  )
}
