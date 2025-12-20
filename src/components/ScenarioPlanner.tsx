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
  Plus,
  X,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Equal,
  Copy,
  RotateCcw,
  Lightbulb,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import {
  calculateTotalTax,
  calculateRRSPTaxSavings,
  PROVINCE_NAMES,
  RRSP_LIMIT_2025,
} from '@/lib/canadianTaxData'

interface Scenario {
  id: string
  name: string
  income: number
  province: string
  rrspContribution: number
  capitalGains: number
  dividendsEligible: number
  rentalIncome: number
  selfEmploymentIncome: number
}

interface ScenarioResults {
  federalTax: number
  provincialTax: number
  totalTax: number
  effectiveRate: number
  marginalRate: number
  afterTaxIncome: number
  rrspTaxSavings: number
}

const PROVINCES = Object.entries(PROVINCE_NAMES).map(([code, name]) => ({
  code,
  name,
}))

function calculateScenarioResults(scenario: Scenario): ScenarioResults {
  // Calculate total taxable income
  const taxableCapitalGains = scenario.capitalGains * 0.5 // 50% inclusion
  const grossedUpDividends = scenario.dividendsEligible * 1.38 // 38% gross-up for eligible

  const totalIncome =
    scenario.income +
    taxableCapitalGains +
    grossedUpDividends +
    scenario.rentalIncome +
    scenario.selfEmploymentIncome

  // Subtract RRSP contribution
  const taxableIncome = Math.max(0, totalIncome - scenario.rrspContribution)

  // Calculate taxes
  const taxResult = calculateTotalTax(taxableIncome, scenario.province)

  // Calculate RRSP tax savings
  const rrspSavings = calculateRRSPTaxSavings(
    scenario.rrspContribution,
    totalIncome,
    scenario.province
  )

  // Simple dividend tax credit calculation (approximate)
  const dividendCredit = scenario.dividendsEligible * 0.15 // Approximate combined credit

  const adjustedTotalTax = Math.max(0, taxResult.totalTax - dividendCredit)

  return {
    federalTax: taxResult.federalTax,
    provincialTax: taxResult.provincialTax,
    totalTax: adjustedTotalTax,
    effectiveRate: totalIncome > 0 ? adjustedTotalTax / totalIncome : 0,
    marginalRate: taxResult.marginalRate,
    afterTaxIncome: totalIncome - adjustedTotalTax,
    rrspTaxSavings: rrspSavings.taxSavings,
  }
}

function createDefaultScenario(id: string, name: string, profile: any): Scenario {
  return {
    id,
    name,
    income: profile?.annual_income || 75000,
    province: profile?.province || 'ON',
    rrspContribution: profile?.rrsp_contributions_ytd || 0,
    capitalGains: 0,
    dividendsEligible: 0,
    rentalIncome: 0,
    selfEmploymentIncome: 0,
  }
}

export function ScenarioPlanner() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (authLoading || profileLoading) return

    if (!user) {
      router.push('/profile')
      return
    }

    // Initialize with two default scenarios
    if (!initialized && profile) {
      const baseScenario = createDefaultScenario('base', 'Current Situation', profile)
      const altScenario = {
        ...createDefaultScenario('alt1', 'Max RRSP Contribution', profile),
        rrspContribution: Math.min(
          profile.rrsp_contribution_room || RRSP_LIMIT_2025,
          RRSP_LIMIT_2025
        ),
      }
      setScenarios([baseScenario, altScenario])
      setInitialized(true)
    }
  }, [user, authLoading, profileLoading, profile, initialized])

  const results = useMemo(() => {
    return scenarios.map((scenario) => ({
      scenario,
      results: calculateScenarioResults(scenario),
    }))
  }, [scenarios])

  const updateScenario = (id: string, updates: Partial<Scenario>) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    )
  }

  const addScenario = () => {
    if (scenarios.length >= 4) return
    const newId = `scenario-${Date.now()}`
    const newScenario = createDefaultScenario(newId, `Scenario ${scenarios.length + 1}`, profile)
    setScenarios((prev) => [...prev, newScenario])
  }

  const removeScenario = (id: string) => {
    if (scenarios.length <= 1) return
    setScenarios((prev) => prev.filter((s) => s.id !== id))
  }

  const duplicateScenario = (scenario: Scenario) => {
    if (scenarios.length >= 4) return
    const newId = `scenario-${Date.now()}`
    setScenarios((prev) => [
      ...prev,
      { ...scenario, id: newId, name: `${scenario.name} (Copy)` },
    ])
  }

  const resetToProfile = (id: string) => {
    const scenario = scenarios.find((s) => s.id === id)
    if (!scenario || !profile) return
    updateScenario(id, {
      income: profile.annual_income || 75000,
      province: profile.province || 'ON',
      rrspContribution: profile.rrsp_contributions_ytd || 0,
      capitalGains: 0,
      dividendsEligible: 0,
      rentalIncome: 0,
      selfEmploymentIncome: 0,
    })
  }

  // Find best and worst scenarios
  const sortedByTax = [...results].sort((a, b) => a.results.totalTax - b.results.totalTax)
  const bestScenarioId = sortedByTax[0]?.scenario.id
  const worstScenarioId = sortedByTax[sortedByTax.length - 1]?.scenario.id

  // Calculate savings between best and worst
  const potentialSavings =
    sortedByTax.length > 1
      ? sortedByTax[sortedByTax.length - 1].results.totalTax - sortedByTax[0].results.totalTax
      : 0

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
          {scenarios.length < 4 && (
            <Button onClick={addScenario} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              Add Scenario
            </Button>
          )}
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">What-If Scenario Planner</h1>
          <p className="text-slate-500">
            Compare different tax strategies side-by-side. Adjust income, deductions, and see how they affect your tax bill.
          </p>
        </div>

        {/* Savings Summary */}
        {potentialSavings > 100 && (
          <Card className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
            <CardContent className="py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-emerald-900">
                    Potential savings of ${potentialSavings.toLocaleString()} found!
                  </p>
                  <p className="text-sm text-emerald-700">
                    &quot;{sortedByTax[0].scenario.name}&quot; saves the most compared to other scenarios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scenarios Grid */}
        <div className={cn(
          "grid gap-6",
          scenarios.length === 1 && "grid-cols-1 max-w-lg",
          scenarios.length === 2 && "grid-cols-1 md:grid-cols-2",
          scenarios.length === 3 && "grid-cols-1 md:grid-cols-3",
          scenarios.length === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {results.map(({ scenario, results: r }, index) => (
            <Card
              key={scenario.id}
              className={cn(
                "relative",
                scenario.id === bestScenarioId && scenarios.length > 1 && "ring-2 ring-emerald-400",
                scenario.id === worstScenarioId && scenarios.length > 1 && "ring-2 ring-red-300"
              )}
            >
              {/* Best/Worst Badge */}
              {scenarios.length > 1 && scenario.id === bestScenarioId && (
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-500 text-white text-xs font-medium rounded-full">
                  Best Option
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Input
                    value={scenario.name}
                    onChange={(e) => updateScenario(scenario.id, { name: e.target.value })}
                    className="font-semibold text-lg border-0 p-0 h-auto focus-visible:ring-0 bg-transparent"
                  />
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => duplicateScenario(scenario)}
                      title="Duplicate"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => resetToProfile(scenario.id)}
                      title="Reset to profile"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    {scenarios.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-600"
                        onClick={() => removeScenario(scenario.id)}
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Inputs */}
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-slate-500">Province</Label>
                    <Select
                      value={scenario.province}
                      onValueChange={(v) => updateScenario(scenario.id, { province: v })}
                    >
                      <SelectTrigger className="h-9">
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
                    <Label className="text-xs text-slate-500">Employment Income</Label>
                    <Input
                      type="number"
                      value={scenario.income}
                      onChange={(e) => updateScenario(scenario.id, { income: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">RRSP Contribution</Label>
                    <Input
                      type="number"
                      value={scenario.rrspContribution}
                      onChange={(e) => updateScenario(scenario.id, { rrspContribution: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Capital Gains</Label>
                    <Input
                      type="number"
                      value={scenario.capitalGains}
                      onChange={(e) => updateScenario(scenario.id, { capitalGains: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Eligible Dividends</Label>
                    <Input
                      type="number"
                      value={scenario.dividendsEligible}
                      onChange={(e) => updateScenario(scenario.id, { dividendsEligible: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Rental Income</Label>
                    <Input
                      type="number"
                      value={scenario.rentalIncome}
                      onChange={(e) => updateScenario(scenario.id, { rentalIncome: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-slate-500">Self-Employment Income</Label>
                    <Input
                      type="number"
                      value={scenario.selfEmploymentIncome}
                      onChange={(e) => updateScenario(scenario.id, { selfEmploymentIncome: Number(e.target.value) || 0 })}
                      className="h-9"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Federal Tax</span>
                    <span className="font-medium">${r.federalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Provincial Tax</span>
                    <span className="font-medium">${r.provincialTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                    <span className="text-slate-900">Total Tax</span>
                    <span className={cn(
                      scenario.id === bestScenarioId && scenarios.length > 1 ? "text-emerald-600" : "text-slate-900"
                    )}>
                      ${r.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Effective Rate</span>
                    <span className="font-medium">{(r.effectiveRate * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Marginal Rate</span>
                    <span className="font-medium">{(r.marginalRate * 100).toFixed(1)}%</span>
                  </div>

                  {scenario.rrspContribution > 0 && (
                    <div className="flex justify-between text-sm pt-2 border-t text-emerald-600">
                      <span>RRSP Tax Savings</span>
                      <span className="font-medium">${r.rrspTaxSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-slate-700 font-medium">After-Tax Income</span>
                    <span className="font-bold text-lg text-slate-900">
                      ${r.afterTaxIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Comparison to first scenario */}
                {index > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    {(() => {
                      const baseTax = results[0].results.totalTax
                      const diff = r.totalTax - baseTax
                      if (Math.abs(diff) < 10) {
                        return (
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Equal className="h-4 w-4" />
                            <span>Same as base scenario</span>
                          </div>
                        )
                      }
                      return diff < 0 ? (
                        <div className="flex items-center gap-2 text-sm text-emerald-600">
                          <TrendingDown className="h-4 w-4" />
                          <span>Saves ${Math.abs(diff).toLocaleString(undefined, { maximumFractionDigits: 0 })} vs {results[0].scenario.name}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-red-500">
                          <TrendingUp className="h-4 w-4" />
                          <span>Costs ${diff.toLocaleString(undefined, { maximumFractionDigits: 0 })} more vs {results[0].scenario.name}</span>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Adjust the values in each scenario to see how different strategies affect your taxes.
            Add up to 4 scenarios for comparison.
          </p>
        </div>
      </div>
    </div>
  )
}
