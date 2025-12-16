'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Info, Check, X } from 'lucide-react'
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
  FHSA_ANNUAL_LIMIT,
  FHSA_LIFETIME_LIMIT,
  TAX_YEAR,
} from '@/lib/canadianTaxData'

export default function FHSACalculatorPage() {
  const [income, setIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [yearsOpen, setYearsOpen] = useState<string>('1')
  const [province, setProvince] = useState<string>('ON')

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0
    const contributionNum = parseFloat(contribution) || 0
    const yearsNum = parseInt(yearsOpen) || 1

    if (incomeNum <= 0 || contributionNum <= 0) return null

    // Calculate contribution room
    const usedRoom = (yearsNum - 1) * FHSA_ANNUAL_LIMIT // Room from previous years (assuming max unused)
    const currentYearRoom = FHSA_ANNUAL_LIMIT
    const totalAvailableRoom = Math.min(usedRoom + currentYearRoom, FHSA_LIFETIME_LIMIT)

    const actualContribution = Math.min(contributionNum, totalAvailableRoom)

    // Tax savings
    const taxInfo = calculateTotalTax(incomeNum, province)
    const taxSavings = actualContribution * taxInfo.marginalRate

    // Compare to RRSP HBP
    const rrspHBPLimit = 35000
    const rrspTaxSavings = Math.min(contributionNum, rrspHBPLimit) * taxInfo.marginalRate

    return {
      totalAvailableRoom,
      actualContribution,
      marginalRate: taxInfo.marginalRate,
      taxSavings,
      remainingRoom: totalAvailableRoom - actualContribution,
      lifetimeRemaining: FHSA_LIFETIME_LIMIT - actualContribution,
      rrspHBPTaxSavings: rrspTaxSavings,
      fhsaAdvantage: taxSavings, // FHSA withdrawals are tax-free, RRSP HBP must be repaid
    }
  }, [income, contribution, yearsOpen, province])

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
            FHSA Calculator (First Home Savings Account)
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Calculate your FHSA contribution room and tax savings for buying your first home.
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
                <Label htmlFor="income">Annual Income</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="70,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contribution">Planned Contribution</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="contribution"
                    type="number"
                    placeholder="8,000"
                    value={contribution}
                    onChange={(e) => setContribution(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="yearsOpen">Years FHSA Has Been Open</Label>
                <Select value={yearsOpen} onValueChange={setYearsOpen}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year} year{year > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div className="text-sm text-red-800 dark:text-red-200">
                  <p className="font-medium mb-1">FHSA Key Limits</p>
                  <ul className="space-y-1 text-red-700 dark:text-red-300">
                    <li>• Annual limit: {formatCurrency(FHSA_ANNUAL_LIMIT)}</li>
                    <li>• Lifetime limit: {formatCurrency(FHSA_LIFETIME_LIMIT)}</li>
                    <li>• Unused room carries forward (up to $8K/year)</li>
                    <li>• Must use within 15 years of opening</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Summary Card */}
                <div className="bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-semibold text-red-900 dark:text-red-100">
                      Your FHSA Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Available contribution room</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatCurrency(results.totalAvailableRoom)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Your contribution</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatCurrency(results.actualContribution)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Your marginal tax rate</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatPercent(results.marginalRate)}
                      </span>
                    </div>
                    <div className="border-t border-red-300 dark:border-red-700 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-red-900 dark:text-red-100">
                          Tax Savings
                        </span>
                        <span className="font-bold text-2xl text-red-600 dark:text-red-400">
                          {formatCurrency(results.taxSavings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Remaining */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                    Remaining Room
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Lifetime limit remaining</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.lifetimeRemaining)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(results.actualContribution / FHSA_LIFETIME_LIMIT) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatCurrency(results.actualContribution)} of {formatCurrency(FHSA_LIFETIME_LIMIT)} lifetime limit used
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
                <Home className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-slate-500 dark:text-slate-400">
                  Enter your information to calculate your FHSA benefits
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FHSA vs RRSP HBP Comparison */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              FHSA vs RRSP Home Buyers' Plan
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                <th className="text-center p-4 font-semibold text-red-600 dark:text-red-400">FHSA</th>
                <th className="text-center p-4 font-semibold text-blue-600 dark:text-blue-400">RRSP HBP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Maximum for home purchase</td>
                <td className="p-4 text-center font-medium">{formatCurrency(FHSA_LIFETIME_LIMIT)}</td>
                <td className="p-4 text-center font-medium">$35,000</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax deduction on contribution</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax-free withdrawal</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Must repay to account</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-green-500 mx-auto" /> No</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-red-400 mx-auto" /> Yes, over 15 years</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Can combine with each other</td>
                <td className="p-4 text-center" colSpan={2}>
                  <Check className="h-5 w-5 text-green-500 mx-auto" /> Yes! Up to $75,000 total
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content */}
        <div className="mt-12 prose prose-slate dark:prose-invert max-w-none">
          <h2>What is the FHSA (First Home Savings Account)?</h2>
          <p>
            The First Home Savings Account (FHSA) is a registered account introduced in 2023 that combines the best features of an RRSP and TFSA for first-time home buyers. Contributions are tax-deductible like an RRSP, and withdrawals for a qualifying home purchase are tax-free like a TFSA.
          </p>

          <h3>FHSA Eligibility Requirements</h3>
          <ul>
            <li>Must be a Canadian resident</li>
            <li>Must be at least 18 years old</li>
            <li>Must be a first-time home buyer (haven't owned a home in the past 4 years)</li>
            <li>Must have a valid Social Insurance Number (SIN)</li>
          </ul>

          <h3>How FHSA Contribution Room Works</h3>
          <ul>
            <li><strong>Annual limit:</strong> $8,000 per year</li>
            <li><strong>Lifetime limit:</strong> $40,000 total</li>
            <li><strong>Carry forward:</strong> Unused room carries forward up to $8,000 per year</li>
            <li><strong>Maximum single year:</strong> $16,000 if you have carry-forward room</li>
          </ul>

          <h3>Combining FHSA with RRSP HBP</h3>
          <p>
            You can use both the FHSA and the RRSP Home Buyers' Plan together! This allows you to withdraw up to $75,000 tax-free for your first home ($40,000 from FHSA + $35,000 from RRSP HBP). The key difference is that FHSA withdrawals never need to be repaid, while RRSP HBP withdrawals must be repaid over 15 years.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
            <p className="text-amber-800 dark:text-amber-200 text-sm m-0">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance. FHSA rules can be complex and individual situations vary. Consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
