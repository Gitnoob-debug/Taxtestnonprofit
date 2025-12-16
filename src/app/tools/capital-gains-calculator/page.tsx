'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, Info, User } from 'lucide-react'
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
  CAPITAL_GAINS_INCLUSION_RATE,
  CAPITAL_GAINS_INCLUSION_RATE_HIGH,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

export default function CapitalGainsCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [otherIncome, setOtherIncome] = useState<string>('')
  const [capitalGain, setCapitalGain] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  // Auto-populate province from profile
  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const otherIncomeNum = parseFloat(otherIncome) || 0
    const gainNum = parseFloat(capitalGain) || 0

    if (gainNum <= 0) return null

    // Calculate inclusion amounts (2024 rules with $250K threshold)
    const threshold = 250000
    let taxableGain: number
    let inclusionDetails: string

    if (gainNum <= threshold) {
      taxableGain = gainNum * CAPITAL_GAINS_INCLUSION_RATE
      inclusionDetails = `${(CAPITAL_GAINS_INCLUSION_RATE * 100).toFixed(0)}% inclusion on entire gain`
    } else {
      const lowerPortion = threshold * CAPITAL_GAINS_INCLUSION_RATE
      const higherPortion = (gainNum - threshold) * CAPITAL_GAINS_INCLUSION_RATE_HIGH
      taxableGain = lowerPortion + higherPortion
      inclusionDetails = `50% on first $250K, 66.67% on remainder`
    }

    // Calculate tax
    const totalIncomeWithGain = otherIncomeNum + taxableGain
    const taxWithGain = calculateTotalTax(totalIncomeWithGain, province)
    const taxWithoutGain = calculateTotalTax(otherIncomeNum, province)
    const capitalGainsTax = taxWithGain.totalTax - taxWithoutGain.totalTax

    // Effective rate on the gain
    const effectiveRate = gainNum > 0 ? capitalGainsTax / gainNum : 0

    // Net proceeds
    const netProceeds = gainNum - capitalGainsTax

    return {
      capitalGain: gainNum,
      taxableGain,
      inclusionDetails,
      marginalRate: taxWithGain.marginalRate,
      capitalGainsTax,
      effectiveRate,
      netProceeds,
    }
  }, [otherIncome, capitalGain, province])

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
            Capital Gains Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Calculate the tax on your investment gains including the 2024 inclusion rate changes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              Your Information
            </h2>

            <div className="space-y-6">
              <div>
                <Label htmlFor="otherIncome">Other Annual Income</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Employment, pension, rental, etc. (excluding this gain)
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="otherIncome"
                    type="number"
                    placeholder="60,000"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="capitalGain">Capital Gain Amount</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Sale price minus adjusted cost base (ACB)
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="capitalGain"
                    type="number"
                    placeholder="50,000"
                    value={capitalGain}
                    onChange={(e) => setCapitalGain(e.target.value)}
                    className="pl-7"
                  />
                </div>
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

            {/* Info Box */}
            <div className="mt-8 p-5 bg-orange-50 dark:bg-orange-950 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  <p className="font-medium mb-2">{TAX_YEAR} Capital Gains Rules</p>
                  <ul className="space-y-2 text-orange-700 dark:text-orange-300">
                    <li>• First $250,000: 50% inclusion rate</li>
                    <li>• Above $250,000: 66.67% inclusion rate</li>
                    <li>• Changes effective June 25, 2024</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6 lg:space-y-8">
            {results ? (
              <>
                {/* Summary Card */}
                <div className="bg-orange-50 dark:bg-orange-950 rounded-2xl border border-orange-200 dark:border-orange-800 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    <h3 className="font-semibold text-orange-900 dark:text-orange-100">
                      Capital Gains Tax Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Total Capital Gain</span>
                      <span className="font-medium text-orange-900 dark:text-orange-100">
                        {formatCurrency(results.capitalGain)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Taxable Amount</span>
                      <span className="font-medium text-orange-900 dark:text-orange-100">
                        {formatCurrency(results.taxableGain)}
                      </span>
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400">
                      ({results.inclusionDetails})
                    </p>
                    <div className="border-t border-orange-300 dark:border-orange-700 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-orange-900 dark:text-orange-100">
                          Tax on Capital Gain
                        </span>
                        <span className="font-bold text-2xl text-orange-600 dark:text-orange-400">
                          {formatCurrency(results.capitalGainsTax)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rates Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Tax Rates</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Marginal Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPercent(results.marginalRate)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        On taxable income
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Effective Rate on Gain</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPercent(results.effectiveRate)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Actual tax / total gain
                      </p>
                    </div>
                  </div>
                </div>

                {/* Net Proceeds Card */}
                <div className="bg-green-50 dark:bg-green-950 rounded-2xl border border-green-200 dark:border-green-800 p-6 sm:p-8">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-900 dark:text-green-100">
                      Net Proceeds After Tax
                    </span>
                    <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                      {formatCurrency(results.netProceeds)}
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                    This is what you keep from your {formatCurrency(results.capitalGain)} gain
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
                <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Enter your capital gain to calculate your tax
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Understanding Canadian Capital Gains Tax
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            In Canada, when you sell an investment (stocks, crypto, real estate, etc.) for more than you paid, the profit is called a capital gain. Only a portion of this gain is added to your taxable income.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            2024 Capital Gains Inclusion Rate Changes
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            As of June 25, 2024, the capital gains inclusion rate has changed:
          </p>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li><strong>First $250,000:</strong> 50% inclusion rate (unchanged)</li>
            <li><strong>Above $250,000:</strong> 66.67% inclusion rate (increased from 50%)</li>
          </ul>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            This means if you have a $300,000 capital gain, the first $250,000 has 50% included ($125,000) and the remaining $50,000 has 66.67% included ($33,335), for a total taxable amount of $158,335.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            What Qualifies as a Capital Gain?
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li>Selling stocks, ETFs, or mutual funds</li>
            <li>Selling cryptocurrency</li>
            <li>Selling investment real estate</li>
            <li>Selling a business</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            What Doesn't Trigger Capital Gains Tax?
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li>Selling your principal residence (tax-exempt)</li>
            <li>Investments held in RRSP or TFSA</li>
            <li>Unrealized gains (you haven't sold yet)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Capital Losses
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Capital losses can be used to offset capital gains. If your losses exceed gains, you can carry them back 3 years or forward indefinitely to offset future gains.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance. Capital gains tax calculations can be complex, especially for real estate or business sales. Consult a tax professional for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
