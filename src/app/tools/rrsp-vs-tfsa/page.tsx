'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Scale, Check, X, User } from 'lucide-react'
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
  calculateTotalTax,
  PROVINCE_NAMES,
  RRSP_LIMIT_2024,
  TFSA_LIMIT_2024,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { CalculatorAssistant, CalculatorField } from '@/components/tools/CalculatorAssistant'

export default function RRSPvsTFSAPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [currentIncome, setCurrentIncome] = useState<string>('')
  const [retirementIncome, setRetirementIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [yearsToRetirement, setYearsToRetirement] = useState<string>('25')
  const [expectedReturn, setExpectedReturn] = useState<string>('6')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  // Calculator fields for the AI assistant
  const calculatorFields: CalculatorField[] = useMemo(() => [
    { name: 'currentIncome', label: 'Current Annual Income', type: 'number' as const, currentValue: currentIncome },
    { name: 'retirementIncome', label: 'Expected Retirement Income', type: 'number' as const, currentValue: retirementIncome },
    { name: 'contribution', label: 'Annual Contribution', type: 'number' as const, currentValue: contribution },
    { name: 'yearsToRetirement', label: 'Years to Retirement', type: 'number' as const, currentValue: yearsToRetirement },
    { name: 'expectedReturn', label: 'Expected Annual Return (%)', type: 'number' as const, currentValue: expectedReturn },
    {
      name: 'province', label: 'Province/Territory', type: 'select' as const,
      options: Object.entries(PROVINCE_NAMES).map(([code, name]) => ({ value: code, label: name })),
      currentValue: province
    }
  ], [currentIncome, retirementIncome, contribution, yearsToRetirement, expectedReturn, province])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'currentIncome': setCurrentIncome(strValue); break
      case 'retirementIncome': setRetirementIncome(strValue); break
      case 'contribution': setContribution(strValue); break
      case 'yearsToRetirement': setYearsToRetirement(strValue); break
      case 'expectedReturn': setExpectedReturn(strValue); break
      case 'province': setProvince(strValue); break
    }
  }

  // Auto-populate province from profile
  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const currentIncomeNum = parseFloat(currentIncome) || 0
    const retirementIncomeNum = parseFloat(retirementIncome) || 0
    const contributionNum = parseFloat(contribution) || 0
    const yearsNum = parseFloat(yearsToRetirement) || 25
    const returnRate = (parseFloat(expectedReturn) || 6) / 100

    if (currentIncomeNum <= 0 || contributionNum <= 0) return null

    // Current tax rates
    const currentTax = calculateTotalTax(currentIncomeNum, province)
    const retirementTax = calculateTotalTax(retirementIncomeNum || currentIncomeNum * 0.6, province)

    // RRSP calculation
    const rrspTaxSavingsNow = contributionNum * currentTax.marginalRate
    const rrspGrowth = contributionNum * Math.pow(1 + returnRate, yearsNum)
    const rrspTaxOnWithdrawal = rrspGrowth * retirementTax.marginalRate
    const rrspNetValue = rrspGrowth - rrspTaxOnWithdrawal

    // With RRSP refund reinvested
    const rrspWithReinvest = (contributionNum + rrspTaxSavingsNow) * Math.pow(1 + returnRate, yearsNum)
    const rrspWithReinvestTax = rrspWithReinvest * retirementTax.marginalRate
    const rrspWithReinvestNet = rrspWithReinvest - rrspWithReinvestTax

    // TFSA calculation (after-tax contribution, tax-free growth)
    const tfsaContribution = contributionNum * (1 - currentTax.marginalRate) // Same after-tax cost as RRSP contribution
    const tfsaGrowth = contributionNum * Math.pow(1 + returnRate, yearsNum) // Or compare same dollar amount
    const tfsaNetValue = tfsaGrowth // No tax on withdrawal

    // Determine recommendation
    let recommendation: 'rrsp' | 'tfsa' | 'either'
    let reason: string

    if (currentTax.marginalRate > retirementTax.marginalRate + 0.05) {
      recommendation = 'rrsp'
      reason = `Your current marginal rate (${(currentTax.marginalRate * 100).toFixed(1)}%) is significantly higher than your expected retirement rate (${(retirementTax.marginalRate * 100).toFixed(1)}%). RRSP gives you a bigger tax break now.`
    } else if (retirementTax.marginalRate > currentTax.marginalRate + 0.05) {
      recommendation = 'tfsa'
      reason = `Your expected retirement rate (${(retirementTax.marginalRate * 100).toFixed(1)}%) is higher than your current rate (${(currentTax.marginalRate * 100).toFixed(1)}%). TFSA's tax-free withdrawals will be more valuable.`
    } else {
      recommendation = 'either'
      reason = `Your current and expected retirement rates are similar. Both accounts will perform similarly. Consider TFSA for flexibility or RRSP if you need the deduction now.`
    }

    return {
      currentMarginalRate: currentTax.marginalRate,
      retirementMarginalRate: retirementTax.marginalRate,
      rrspTaxSavingsNow,
      rrspGrowth,
      rrspNetValue,
      rrspWithReinvestNet,
      tfsaGrowth,
      tfsaNetValue,
      recommendation,
      reason,
      yearsNum,
    }
  }, [currentIncome, retirementIncome, contribution, yearsToRetirement, expectedReturn, province])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(1) + '%'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            RRSP vs TFSA Comparison Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Compare these two powerful savings accounts and see which is better for your situation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Input Section */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="currentIncome">Current Annual Income</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="currentIncome"
                    type="number"
                    placeholder="80,000"
                    value={currentIncome}
                    onChange={(e) => setCurrentIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="retirementIncome">Expected Retirement Income</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Leave blank to estimate at 60% of current
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="retirementIncome"
                    type="number"
                    placeholder="50,000"
                    value={retirementIncome}
                    onChange={(e) => setRetirementIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contribution">Annual Contribution Amount</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="contribution"
                    type="number"
                    placeholder="7,000"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="years">Years Until Retirement</Label>
                <Input
                  id="years"
                  type="number"
                  value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="return">Expected Annual Return (%)</Label>
                <Input
                  id="return"
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="province">Province/Territory</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROVINCE_NAMES).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {isLoggedIn && profileApplied && profile?.province && (
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Auto-filled from your profile
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            {results ? (
              <>
                {/* Recommendation Card */}
                <div className={`rounded-2xl border p-6 sm:p-8 ${
                  results.recommendation === 'rrsp'
                    ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                    : results.recommendation === 'tfsa'
                    ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                    : 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Scale className={`h-6 w-6 ${
                      results.recommendation === 'rrsp'
                        ? 'text-blue-600 dark:text-blue-400'
                        : results.recommendation === 'tfsa'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-purple-600 dark:text-purple-400'
                    }`} />
                    <h3 className={`text-xl font-bold ${
                      results.recommendation === 'rrsp'
                        ? 'text-blue-900 dark:text-blue-100'
                        : results.recommendation === 'tfsa'
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-purple-900 dark:text-purple-100'
                    }`}>
                      {results.recommendation === 'rrsp'
                        ? 'RRSP is likely better for you'
                        : results.recommendation === 'tfsa'
                        ? 'TFSA is likely better for you'
                        : 'Either account works well'}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    results.recommendation === 'rrsp'
                      ? 'text-blue-700 dark:text-blue-300'
                      : results.recommendation === 'tfsa'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-purple-700 dark:text-purple-300'
                  }`}>
                    {results.reason}
                  </p>
                </div>

                {/* Side by Side Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* RRSP Card */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                    <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-6 text-xl">RRSP</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Contribution</span>
                        <span className="font-medium">{formatCurrency(parseFloat(contribution))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Tax refund now</span>
                        <span className="font-medium text-green-600">+{formatCurrency(results.rrspTaxSavingsNow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Value in {results.yearsNum} years</span>
                        <span className="font-medium">{formatCurrency(results.rrspGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Tax on withdrawal</span>
                        <span className="font-medium text-red-600">-{formatCurrency(results.rrspGrowth - results.rrspNetValue)}</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-semibold">Net after tax</span>
                        <span className="font-bold text-blue-600">{formatCurrency(results.rrspNetValue)}</span>
                      </div>
                    </div>
                  </div>

                  {/* TFSA Card */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                    <h3 className="font-bold text-green-600 dark:text-green-400 mb-6 text-xl">TFSA</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Contribution</span>
                        <span className="font-medium">{formatCurrency(parseFloat(contribution))}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Tax refund now</span>
                        <span className="font-medium text-slate-400">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Value in {results.yearsNum} years</span>
                        <span className="font-medium">{formatCurrency(results.tfsaGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Tax on withdrawal</span>
                        <span className="font-medium text-green-600">$0 (tax-free!)</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between">
                        <span className="font-semibold">Net after tax</span>
                        <span className="font-bold text-green-600">{formatCurrency(results.tfsaNetValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Rate Comparison */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Tax Rate Comparison</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Marginal Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPercent(results.currentMarginalRate)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Retirement Marginal Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPercent(results.retirementMarginalRate)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
                <Scale className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Enter your information to compare RRSP and TFSA
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                <th className="text-center p-4 font-semibold text-blue-600 dark:text-blue-400">RRSP</th>
                <th className="text-center p-4 font-semibold text-green-600 dark:text-green-400">TFSA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">{TAX_YEAR} Contribution Limit</td>
                <td className="p-4 text-center font-medium">{formatCurrency(RRSP_LIMIT_2024)}</td>
                <td className="p-4 text-center font-medium">{formatCurrency(TFSA_LIMIT_2024)}</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax deduction on contribution</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax-free growth</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax-free withdrawals</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Withdrawal room restored</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Affects government benefits</td>
                <td className="p-4 text-center">Yes (at withdrawal)</td>
                <td className="p-4 text-center">No</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Best if tax rate will be...</td>
                <td className="p-4 text-center font-medium">Lower in retirement</td>
                <td className="p-4 text-center font-medium">Same or higher</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            RRSP vs TFSA: Which is Better?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Both RRSPs and TFSAs are excellent savings vehicles, but they work differently. The best choice depends on your current income, expected retirement income, and financial goals.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Choose RRSP When:
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li>You're in a high tax bracket now</li>
            <li>You expect lower income in retirement</li>
            <li>You want to reduce this year's tax bill</li>
            <li>You're saving for a first home (Home Buyers' Plan)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Choose TFSA When:
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li>You're in a lower tax bracket now</li>
            <li>You expect similar or higher income in retirement</li>
            <li>You want flexibility to withdraw without tax consequences</li>
            <li>You want to protect government benefits like OAS and GIS</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes. Your actual results will vary based on investment returns, tax rates, and other factors. Consult a financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </div>

      <CalculatorAssistant
        calculatorName="rrsp-vs-tfsa"
        fields={calculatorFields}
        onFieldUpdate={handleFieldUpdate}
        examplePrompts={[
          "I make $90k now and expect $50k in retirement",
          "30 years old, $80k income, planning to contribute $10k",
          "Should I use RRSP or TFSA if I'm in a low tax bracket?"
        ]}
      />
    </div>
  )
}
