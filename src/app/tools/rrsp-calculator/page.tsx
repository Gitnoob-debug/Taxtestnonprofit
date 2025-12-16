'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, TrendingUp } from 'lucide-react'
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
  calculateRRSPRoom,
  calculateRRSPTaxSavings,
  calculateTotalTax,
  PROVINCE_NAMES,
  RRSP_LIMIT_2024,
  RRSP_CONTRIBUTION_RATE,
  TAX_YEAR,
} from '@/lib/canadianTaxData'

export default function RRSPCalculatorPage() {
  const [income, setIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [unusedRoom, setUnusedRoom] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0
    const contributionNum = parseFloat(contribution) || 0
    const unusedRoomNum = parseFloat(unusedRoom) || 0

    if (incomeNum <= 0) return null

    // Calculate RRSP room based on previous year income
    const newRoom = Math.min(incomeNum * RRSP_CONTRIBUTION_RATE, RRSP_LIMIT_2024)
    const totalRoom = newRoom + unusedRoomNum

    // Calculate tax savings from contribution
    const actualContribution = Math.min(contributionNum, totalRoom)
    const { taxSavings, effectiveReturn } = calculateRRSPTaxSavings(actualContribution, incomeNum, province)

    // Get marginal rate for display
    const taxInfo = calculateTotalTax(incomeNum, province)

    return {
      newRoom,
      totalRoom,
      actualContribution,
      taxSavings,
      effectiveReturn,
      marginalRate: taxInfo.marginalRate,
      remainingRoom: totalRoom - actualContribution,
      excessContribution: contributionNum > totalRoom ? contributionNum - totalRoom : 0,
    }
  }, [income, contribution, unusedRoom, province])

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            RRSP Contribution Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Calculate your RRSP contribution room and see your tax savings from contributing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Your Information
            </h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="income">Previous Year Earned Income</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Employment, self-employment, or rental income from {TAX_YEAR - 1}
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="80,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="unusedRoom">Unused RRSP Room (Optional)</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  Carried forward from previous years
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="unusedRoom"
                    type="number"
                    placeholder="0"
                    value={unusedRoom}
                    onChange={(e) => setUnusedRoom(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contribution">Planned Contribution</Label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                  How much you want to contribute
                </p>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="contribution"
                    type="number"
                    placeholder="10,000"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
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
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">{TAX_YEAR} RRSP Limits</p>
                  <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• Maximum contribution: {formatCurrency(RRSP_LIMIT_2024)}</li>
                    <li>• Contribution rate: {formatPercent(RRSP_CONTRIBUTION_RATE)} of earned income</li>
                    <li>• Deadline: March 3, {TAX_YEAR + 1} (for {TAX_YEAR} tax year)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Contribution Room Card */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Your RRSP Room
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">New room from {TAX_YEAR - 1} income</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.newRoom)}
                      </span>
                    </div>
                    {parseFloat(unusedRoom) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Unused room carried forward</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          +{formatCurrency(parseFloat(unusedRoom))}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">Total Available Room</span>
                        <span className="font-bold text-xl text-teal-600 dark:text-teal-400">
                          {formatCurrency(results.totalRoom)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Savings Card */}
                {results.actualContribution > 0 && (
                  <div className="bg-teal-50 dark:bg-teal-950 rounded-xl border border-teal-200 dark:border-teal-800 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                      <h3 className="font-semibold text-teal-900 dark:text-teal-100">
                        Your Tax Savings
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-teal-700 dark:text-teal-300">Contribution amount</span>
                        <span className="font-medium text-teal-900 dark:text-teal-100">
                          {formatCurrency(results.actualContribution)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-700 dark:text-teal-300">Your marginal tax rate</span>
                        <span className="font-medium text-teal-900 dark:text-teal-100">
                          {formatPercent(results.marginalRate)}
                        </span>
                      </div>
                      <div className="border-t border-teal-300 dark:border-teal-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-teal-900 dark:text-teal-100">
                            Estimated Tax Savings
                          </span>
                          <span className="font-bold text-2xl text-teal-600 dark:text-teal-400">
                            {formatCurrency(results.taxSavings)}
                          </span>
                        </div>
                        <p className="text-sm text-teal-600 dark:text-teal-400 mt-1">
                          That's {formatPercent(results.effectiveReturn)} return on your contribution!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warning for excess contribution */}
                {results.excessContribution > 0 && (
                  <div className="bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800 p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      <strong>Warning:</strong> Your planned contribution exceeds your available room by {formatCurrency(results.excessContribution)}. Over-contributions beyond $2,000 are subject to a 1% per month penalty.
                    </p>
                  </div>
                )}

                {/* Remaining Room */}
                {results.remainingRoom > 0 && results.actualContribution > 0 && (
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Remaining room after contribution</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {formatCurrency(results.remainingRoom)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      This will carry forward to next year
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
                <p className="text-slate-500 dark:text-slate-400">
                  Enter your income to calculate your RRSP room
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
          <h2>Understanding RRSP Contributions</h2>
          <p>
            A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account that helps Canadians save for retirement. Contributions are tax-deductible, meaning they reduce your taxable income for the year.
          </p>

          <h3>How RRSP Contribution Room Works</h3>
          <p>
            Your RRSP contribution room is calculated as 18% of your previous year's earned income, up to the annual maximum ({formatCurrency(RRSP_LIMIT_2024)} for {TAX_YEAR}). Unused room carries forward indefinitely.
          </p>

          <h3>Why Contribute to an RRSP?</h3>
          <ul>
            <li><strong>Tax deduction:</strong> Contributions reduce your taxable income</li>
            <li><strong>Tax-deferred growth:</strong> Investments grow without annual taxation</li>
            <li><strong>Lower tax in retirement:</strong> Withdrawals are taxed at your retirement rate, which is often lower</li>
            <li><strong>Home Buyers' Plan:</strong> Withdraw up to $35,000 tax-free for a first home</li>
            <li><strong>Lifelong Learning Plan:</strong> Withdraw up to $10,000/year for education</li>
          </ul>

          <h3>RRSP vs TFSA</h3>
          <p>
            Both accounts offer tax advantages, but work differently. RRSPs give you a tax deduction now but withdrawals are taxed. TFSAs are funded with after-tax dollars but withdrawals are tax-free. Your choice depends on your current vs. expected retirement tax rate.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
            <p className="text-amber-800 dark:text-amber-200 text-sm m-0">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance only. Consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
