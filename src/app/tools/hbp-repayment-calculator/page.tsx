'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, Calendar, AlertTriangle, Home } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  TAX_YEAR,
  HBP_WITHDRAWAL_LIMIT,
  HBP_REPAYMENT_PERIOD,
  HBP_REPAYMENT_START_YEAR,
} from '@/lib/canadianTaxData'

export default function HBPRepaymentCalculatorPage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('')
  const [withdrawalYear, setWithdrawalYear] = useState<string>((TAX_YEAR - 2).toString())
  const [amountRepaid, setAmountRepaid] = useState<string>('0')

  const results = useMemo(() => {
    const withdrawal = parseFloat(withdrawalAmount) || 0
    const year = parseInt(withdrawalYear) || TAX_YEAR - 2
    const repaid = parseFloat(amountRepaid) || 0

    if (withdrawal <= 0) return null

    // Validate withdrawal amount
    const effectiveWithdrawal = Math.min(withdrawal, HBP_WITHDRAWAL_LIMIT)

    // Calculate repayment start year (2 years after withdrawal)
    const repaymentStartYear = year + HBP_REPAYMENT_START_YEAR
    const repaymentEndYear = repaymentStartYear + HBP_REPAYMENT_PERIOD - 1

    // Calculate minimum annual repayment
    const minimumAnnualRepayment = effectiveWithdrawal / HBP_REPAYMENT_PERIOD

    // Calculate remaining balance
    const remainingBalance = Math.max(0, effectiveWithdrawal - repaid)

    // Calculate years remaining
    const currentYear = TAX_YEAR
    const yearsElapsed = Math.max(0, currentYear - repaymentStartYear + 1)
    const yearsRemaining = Math.max(0, HBP_REPAYMENT_PERIOD - yearsElapsed)

    // Check if repayments have started
    const repaymentsStarted = currentYear >= repaymentStartYear

    // Calculate required repayment for current year
    let requiredThisYear = 0
    if (repaymentsStarted && remainingBalance > 0) {
      if (yearsRemaining > 0) {
        requiredThisYear = remainingBalance / yearsRemaining
      } else {
        requiredThisYear = remainingBalance // All remaining due
      }
    }

    // Calculate what happens if minimum not met
    const shortfall = Math.max(0, minimumAnnualRepayment * yearsElapsed - repaid)

    // Generate repayment schedule
    const schedule = []
    let runningBalance = effectiveWithdrawal
    for (let y = repaymentStartYear; y <= repaymentEndYear; y++) {
      const yearRepayment = effectiveWithdrawal / HBP_REPAYMENT_PERIOD
      const isPast = y < currentYear
      const isCurrent = y === currentYear
      const isFuture = y > currentYear

      // For past years, calculate based on actual repayments
      let actualPayment = 0
      if (isPast) {
        const yearsBeforeCurrent = currentYear - repaymentStartYear
        if (yearsBeforeCurrent > 0) {
          actualPayment = repaid / yearsBeforeCurrent
        }
      } else if (isCurrent) {
        actualPayment = requiredThisYear
      } else {
        actualPayment = yearRepayment
      }

      runningBalance = Math.max(0, runningBalance - yearRepayment)

      schedule.push({
        year: y,
        requiredPayment: yearRepayment,
        remainingAfter: runningBalance,
        isPast,
        isCurrent,
        isFuture,
      })
    }

    return {
      withdrawal: effectiveWithdrawal,
      withdrawalYear: year,
      repaymentStartYear,
      repaymentEndYear,
      minimumAnnualRepayment,
      remainingBalance,
      amountRepaid: repaid,
      yearsElapsed,
      yearsRemaining,
      repaymentsStarted,
      requiredThisYear,
      shortfall,
      schedule,
      wasOverLimit: withdrawal > HBP_WITHDRAWAL_LIMIT,
    }
  }, [withdrawalAmount, withdrawalYear, amountRepaid])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
            HBP Repayment Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Track your Home Buyers' Plan repayments and see your required RRSP contributions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Your HBP Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="withdrawalAmount">HBP Withdrawal Amount</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="withdrawalAmount"
                    type="number"
                    placeholder="35,000"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Maximum withdrawal: {formatCurrency(HBP_WITHDRAWAL_LIMIT)} (as of 2024)
                </p>
              </div>

              <div>
                <Label htmlFor="withdrawalYear">Year of Withdrawal</Label>
                <Input
                  id="withdrawalYear"
                  type="number"
                  min="1992"
                  max={TAX_YEAR}
                  value={withdrawalYear}
                  onChange={(e) => setWithdrawalYear(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="amountRepaid">Total Amount Already Repaid</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="amountRepaid"
                    type="number"
                    placeholder="0"
                    value={amountRepaid}
                    onChange={(e) => setAmountRepaid(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  RRSP contributions designated as HBP repayments
                </p>
              </div>
            </div>

            {/* HBP Rules */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">HBP Rules</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Max withdrawal:</span>
                  <span className="font-medium">{formatCurrency(HBP_WITHDRAWAL_LIMIT)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Repayment period:</span>
                  <span className="font-medium">{HBP_REPAYMENT_PERIOD} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Repayments start:</span>
                  <span className="font-medium">{HBP_REPAYMENT_START_YEAR} years after</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Status Card */}
                <div className={`rounded-xl p-6 ${
                  !results.repaymentsStarted
                    ? 'bg-blue-50 border border-blue-200'
                    : results.shortfall > 0
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-emerald-50 border border-emerald-200'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <Home className={`h-5 w-5 mt-0.5 ${
                      !results.repaymentsStarted ? 'text-blue-600' :
                      results.shortfall > 0 ? 'text-red-600' : 'text-emerald-600'
                    }`} />
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        {!results.repaymentsStarted
                          ? 'Repayments Not Yet Required'
                          : results.shortfall > 0
                            ? 'Behind on Repayments'
                            : 'On Track'
                        }
                      </h2>
                      {results.wasOverLimit && (
                        <p className="text-sm text-amber-700 mt-1">
                          Note: Only {formatCurrency(HBP_WITHDRAWAL_LIMIT)} of your withdrawal qualifies for HBP
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Original withdrawal</span>
                      <span className="font-medium">{formatCurrency(results.withdrawal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount repaid</span>
                      <span className="font-medium text-green-600">-{formatCurrency(results.amountRepaid)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Remaining balance</span>
                        <span className="font-bold text-xl">{formatCurrency(results.remainingBalance)}</span>
                      </div>
                    </div>
                  </div>

                  {!results.repaymentsStarted && (
                    <p className="text-sm text-blue-700 mt-4">
                      Your first repayment is due when you file your {results.repaymentStartYear} tax return
                      (in early {results.repaymentStartYear + 1}).
                    </p>
                  )}
                </div>

                {/* Annual Requirement */}
                {results.repaymentsStarted && results.remainingBalance > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">
                      {TAX_YEAR} Repayment Required
                    </h3>
                    <div className="text-center mb-4">
                      <p className="text-3xl font-bold text-emerald-600">
                        {formatCurrency(results.requiredThisYear)}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Minimum RRSP contribution to designate as HBP repayment
                      </p>
                    </div>

                    {results.shortfall > 0 && (
                      <div className="bg-red-50 rounded-lg p-3 mt-4">
                        <div className="flex gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                          <div className="text-sm text-red-800">
                            <p className="font-medium">You're {formatCurrency(results.shortfall)} behind</p>
                            <p className="mt-1">
                              Shortfall is added to your income and taxed. Make catch-up repayments to avoid additional tax.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Repayment Schedule */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-900">Repayment Schedule</h3>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 font-medium text-slate-600">Tax Year</th>
                          <th className="text-right py-2 font-medium text-slate-600">Required</th>
                          <th className="text-right py-2 font-medium text-slate-600">Balance After</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.map((row) => (
                          <tr
                            key={row.year}
                            className={`border-b border-slate-100 ${
                              row.isCurrent ? 'bg-emerald-50' : row.isPast ? 'opacity-60' : ''
                            }`}
                          >
                            <td className="py-2">
                              {row.year}
                              {row.isCurrent && (
                                <span className="ml-2 text-xs bg-emerald-600 text-white px-1.5 py-0.5 rounded">
                                  Current
                                </span>
                              )}
                            </td>
                            <td className="py-2 text-right">{formatCurrency(row.requiredPayment)}</td>
                            <td className="py-2 text-right">{formatCurrency(row.remainingAfter)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">How HBP Repayments Work</p>
                      <ul className="list-disc pl-4 space-y-1 mt-2">
                        <li>Make RRSP contributions as normal</li>
                        <li>Designate part or all as HBP repayment on your tax return (Schedule 7)</li>
                        <li>Repayment amounts don't get RRSP deduction (you already got it)</li>
                        <li>Miss a payment? The amount is added to your taxable income</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter your HBP details to see your repayment schedule</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Understanding the Home Buyers' Plan (HBP)
          </h2>
          <p className="text-slate-600 mb-4">
            The Home Buyers' Plan allows first-time home buyers to withdraw up to {formatCurrency(HBP_WITHDRAWAL_LIMIT)} from
            their RRSPs tax-free to buy or build a qualifying home. In return, you must repay the
            amount to your RRSP over {HBP_REPAYMENT_PERIOD} years.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Repayment Rules</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Repayments start the second year after your withdrawal</li>
            <li>You must repay at least 1/15 of the total each year</li>
            <li>Any shortfall is added to your income and taxed</li>
            <li>You can repay more than the minimum to finish early</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">2024 HBP Increase</h3>
          <p className="text-slate-600 mb-4">
            As of April 2024, the HBP withdrawal limit was increased from $35,000 to $60,000.
            The repayment grace period was also temporarily extended to 5 years for withdrawals
            made between January 1, 2022 and December 31, 2025.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Missing a Repayment</h3>
          <p className="text-slate-600">
            If you don't make the minimum repayment in a year, the shortfall is included in your
            income for that year. You'll owe tax on it at your marginal rate, and you lose that
            RRSP contribution room permanently.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Tip:</strong> Even if you can't contribute to your RRSP this year, consider
              making the minimum HBP repayment to avoid the amount being added to your taxable income.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
