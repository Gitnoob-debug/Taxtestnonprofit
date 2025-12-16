'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, PiggyBank, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  calculateTFSARoom,
  TFSA_ANNUAL_LIMITS,
  TFSA_LIMIT_2024,
  TAX_YEAR,
} from '@/lib/canadianTaxData'

export default function TFSARoomCalculatorPage() {
  const [birthYear, setBirthYear] = useState<string>('')
  const [previousContributions, setPreviousContributions] = useState<string>('')

  const results = useMemo(() => {
    const birthYearNum = parseInt(birthYear) || 0
    const contributionsNum = parseFloat(previousContributions) || 0

    if (birthYearNum < 1900 || birthYearNum > TAX_YEAR - 18) return null

    const yearTurned18 = birthYearNum + 18
    const startYear = Math.max(2009, yearTurned18)
    const currentAge = TAX_YEAR - birthYearNum

    // Calculate cumulative room
    let cumulativeRoom = 0
    const yearlyBreakdown: { year: number; limit: number; cumulative: number }[] = []

    for (let year = startYear; year <= TAX_YEAR; year++) {
      const limit = TFSA_ANNUAL_LIMITS[year] || 0
      cumulativeRoom += limit
      yearlyBreakdown.push({
        year,
        limit,
        cumulative: cumulativeRoom,
      })
    }

    const availableRoom = Math.max(0, cumulativeRoom - contributionsNum)

    return {
      currentAge,
      yearTurned18,
      startYear,
      cumulativeRoom,
      previousContributions: contributionsNum,
      availableRoom,
      yearlyBreakdown,
    }
  }, [birthYear, previousContributions])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
            TFSA Contribution Room Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Calculate your total TFSA contribution room based on your age and previous contributions.
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
                <Label htmlFor="birthYear">Year of Birth</Label>
                <Input
                  id="birthYear"
                  type="number"
                  placeholder="1990"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="mt-1"
                  min="1900"
                  max={TAX_YEAR - 18}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Must have been 18+ and a Canadian resident to accumulate room
                </p>
              </div>

              <div>
                <Label htmlFor="contributions">Total Previous Contributions</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Total amount you've contributed since 2009 (check CRA My Account)
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="contributions"
                    type="number"
                    placeholder="0"
                    value={previousContributions}
                    onChange={(e) => setPreviousContributions(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-5 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div className="text-sm text-green-800 dark:text-green-200">
                  <p className="font-medium mb-2">TFSA Key Facts</p>
                  <ul className="space-y-2 text-green-700 dark:text-green-300">
                    <li>• {TAX_YEAR} limit: {formatCurrency(TFSA_LIMIT_2024)}</li>
                    <li>• Room accumulates from age 18</li>
                    <li>• Unused room carries forward</li>
                    <li>• Withdrawals restore room next year</li>
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
                <div className="bg-green-50 dark:bg-green-950 rounded-2xl border border-green-200 dark:border-green-800 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <PiggyBank className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-semibold text-green-900 dark:text-green-100">
                      Your TFSA Room
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Your age</span>
                      <span className="font-medium text-green-900 dark:text-green-100">
                        {results.currentAge} years old
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Accumulating room since</span>
                      <span className="font-medium text-green-900 dark:text-green-100">
                        {results.startYear}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700 dark:text-green-300">Lifetime room accumulated</span>
                      <span className="font-medium text-green-900 dark:text-green-100">
                        {formatCurrency(results.cumulativeRoom)}
                      </span>
                    </div>
                    {results.previousContributions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-700 dark:text-green-300">Previous contributions</span>
                        <span className="font-medium text-green-900 dark:text-green-100">
                          -{formatCurrency(results.previousContributions)}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-green-300 dark:border-green-700 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-green-900 dark:text-green-100">
                          Available Room
                        </span>
                        <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                          {formatCurrency(results.availableRoom)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Year by Year Breakdown */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Room Accumulation by Year
                  </h3>

                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white dark:bg-slate-800">
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-2 font-medium text-slate-600 dark:text-slate-400">Year</th>
                          <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Limit</th>
                          <th className="text-right py-2 font-medium text-slate-600 dark:text-slate-400">Cumulative</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyBreakdown.map((row) => (
                          <tr key={row.year} className="border-b border-slate-100 dark:border-slate-700/50">
                            <td className="py-2 text-slate-900 dark:text-white">{row.year}</td>
                            <td className="py-2 text-right text-slate-600 dark:text-slate-400">
                              {formatCurrency(row.limit)}
                            </td>
                            <td className="py-2 text-right font-medium text-slate-900 dark:text-white">
                              {formatCurrency(row.cumulative)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
                <PiggyBank className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Enter your birth year to calculate your TFSA room
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Annual Limits Reference */}
        <div className="mt-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            TFSA Annual Contribution Limits (2009-{TAX_YEAR})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-sm">
            {Object.entries(TFSA_ANNUAL_LIMITS).map(([year, limit]) => (
              <div key={year} className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded">
                <div className="font-medium text-slate-900 dark:text-white">{year}</div>
                <div className="text-slate-600 dark:text-slate-400">${limit.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Understanding TFSA Contribution Room
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The Tax-Free Savings Account (TFSA) is a powerful savings vehicle where investment growth and withdrawals are completely tax-free. Your contribution room accumulates each year starting from age 18 (or 2009, whichever is later).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            How TFSA Room Works
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li><strong>Annual accumulation:</strong> Each year, Canadian residents 18+ gain new contribution room</li>
            <li><strong>Unused room carries forward:</strong> If you don't contribute, the room accumulates indefinitely</li>
            <li><strong>Withdrawals restore room:</strong> Any amount you withdraw is added back to your room on January 1 of the following year</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            TFSA Over-Contribution Penalty
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            If you contribute more than your available room, you'll face a 1% penalty per month on the excess amount. Always check your room on CRA My Account before making contributions.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            TFSA vs RRSP
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Unlike RRSP, TFSA contributions aren't tax-deductible, but withdrawals are completely tax-free. TFSA withdrawals also don't affect government benefits like OAS or GIS, making it especially valuable in retirement.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator assumes Canadian residency for all years. Your actual room may differ if you weren't a resident for some years. Check CRA My Account for your official contribution room.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
