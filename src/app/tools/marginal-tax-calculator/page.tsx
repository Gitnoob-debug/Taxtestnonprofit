'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User } from 'lucide-react'
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
  PROVINCE_NAMES,
  FEDERAL_BRACKETS,
  PROVINCIAL_BRACKETS,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

export default function MarginalTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [income, setIncome] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0

    // Get all combined brackets for this province
    const provincialBrackets = PROVINCIAL_BRACKETS[province] || []

    // Create combined bracket table
    const allThresholds = new Set<number>([0])
    FEDERAL_BRACKETS.forEach(b => {
      allThresholds.add(b.min)
      if (b.max !== Infinity) allThresholds.add(b.max)
    })
    provincialBrackets.forEach(b => {
      allThresholds.add(b.min)
      if (b.max !== Infinity) allThresholds.add(b.max)
    })

    const sortedThresholds = Array.from(allThresholds).sort((a, b) => a - b)

    const combinedBrackets = []
    for (let i = 0; i < sortedThresholds.length; i++) {
      const min = sortedThresholds[i]
      const max = sortedThresholds[i + 1] || Infinity

      const federalRate = FEDERAL_BRACKETS.find(b => min >= b.min && min < b.max)?.rate || 0
      const provincialRate = provincialBrackets.find(b => min >= b.min && min < b.max)?.rate || 0

      combinedBrackets.push({
        min,
        max,
        federalRate,
        provincialRate,
        combinedRate: federalRate + provincialRate,
      })
    }

    // Find current bracket
    const currentBracket = combinedBrackets.find(b => incomeNum >= b.min && incomeNum < b.max)

    return {
      income: incomeNum,
      brackets: combinedBrackets,
      currentBracket,
      marginalRate: currentBracket?.combinedRate || 0,
      federalMarginal: currentBracket?.federalRate || 0,
      provincialMarginal: currentBracket?.provincialRate || 0,
    }
  }, [income, province])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%'
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Marginal Tax Rate Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            See your marginal tax rate for every bracket. Know how much tax you'll pay on your next dollar earned.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Your Details</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="income">Annual Income</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="income"
                      type="number"
                      placeholder="75,000"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="province">Province</Label>
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
                    <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                      <User className="h-3 w-3" />
                      From your profile
                    </p>
                  )}
                </div>
              </div>

              {results.currentBracket && parseFloat(income) > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-1">Your Marginal Rate</p>
                    <p className="text-4xl font-bold text-emerald-600">
                      {formatPercent(results.marginalRate)}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Federal: {formatPercent(results.federalMarginal)} + Provincial: {formatPercent(results.provincialMarginal)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bracket Table */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                <h2 className="font-semibold text-slate-900">
                  {TAX_YEAR} Tax Brackets - {PROVINCE_NAMES[province]}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                      <th className="text-left px-4 py-3 font-medium text-slate-600">Income Range</th>
                      <th className="text-right px-4 py-3 font-medium text-slate-600">Federal</th>
                      <th className="text-right px-4 py-3 font-medium text-slate-600">Provincial</th>
                      <th className="text-right px-4 py-3 font-medium text-slate-600">Combined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.brackets.map((bracket, i) => {
                      const isCurrentBracket = results.currentBracket &&
                        bracket.min === results.currentBracket.min
                      const incomeNum = parseFloat(income) || 0
                      const isAboveIncome = bracket.min > incomeNum

                      return (
                        <tr
                          key={i}
                          className={`border-b border-slate-100 ${
                            isCurrentBracket
                              ? 'bg-emerald-50'
                              : isAboveIncome
                                ? 'opacity-50'
                                : ''
                          }`}
                        >
                          <td className="px-4 py-3">
                            <span className={isCurrentBracket ? 'font-semibold text-emerald-700' : 'text-slate-900'}>
                              {formatCurrency(bracket.min)}
                              {bracket.max === Infinity ? '+' : ` - ${formatCurrency(bracket.max)}`}
                            </span>
                            {isCurrentBracket && (
                              <span className="ml-2 text-xs bg-emerald-600 text-white px-2 py-0.5 rounded">
                                You're here
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            {formatPercent(bracket.federalRate)}
                          </td>
                          <td className="px-4 py-3 text-right text-slate-600">
                            {formatPercent(bracket.provincialRate)}
                          </td>
                          <td className={`px-4 py-3 text-right font-semibold ${
                            isCurrentBracket ? 'text-emerald-700' : 'text-slate-900'
                          }`}>
                            {formatPercent(bracket.combinedRate)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Understanding Marginal Tax Rates</p>
                  <p>
                    Your marginal tax rate is the tax you pay on your <em>next</em> dollar of income.
                    It's not the rate on all your income—that's your effective rate.
                    Knowing your marginal rate helps with decisions like RRSP contributions
                    (which save tax at your marginal rate) or whether to earn extra income.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Marginal Tax Rates Work in Canada
          </h2>
          <p className="text-slate-600 mb-6">
            Canada uses a progressive tax system with multiple tax brackets. Each bracket has a different rate,
            and you only pay that rate on income within that bracket—not on all your income.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            {TAX_YEAR} Federal Tax Changes
          </h3>
          <p className="text-slate-600 mb-6">
            For {TAX_YEAR}, the federal government reduced the lowest tax bracket rate from 15% to 14%
            effective July 1, {TAX_YEAR}. This means the effective rate for {TAX_YEAR} is 14.5% on the
            first $57,375 of taxable income. Starting in 2026, the full-year rate will be 14%.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates.
              Your actual tax situation may vary. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
