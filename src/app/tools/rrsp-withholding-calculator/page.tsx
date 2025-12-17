'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, AlertTriangle } from 'lucide-react'
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
  TAX_YEAR,
  calculateRRSPWithholding,
  RRSP_WITHHOLDING_RATES,
} from '@/lib/canadianTaxData'

export default function RRSPWithholdingCalculatorPage() {
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('')
  const [isQuebec, setIsQuebec] = useState<'no' | 'yes'>('no')

  const results = useMemo(() => {
    const amount = parseFloat(withdrawalAmount) || 0

    if (amount <= 0) return null

    return calculateRRSPWithholding(amount, isQuebec === 'yes')
  }, [withdrawalAmount, isQuebec])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(0) + '%'
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
            RRSP Withholding Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            See how much tax will be withheld when you withdraw from your RRSP early.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Withdrawal Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="withdrawalAmount">Withdrawal Amount</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="withdrawalAmount"
                    type="number"
                    placeholder="10,000"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="isQuebec">Province of Residence</Label>
                <Select value={isQuebec} onValueChange={(v) => setIsQuebec(v as 'no' | 'yes')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Outside Quebec</SelectItem>
                    <SelectItem value="yes">Quebec Resident</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Quebec has additional provincial withholding
                </p>
              </div>
            </div>

            {/* Withholding Rate Table */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">
                Federal Withholding Rates
              </h3>
              <div className="space-y-2 text-sm">
                {RRSP_WITHHOLDING_RATES.federal.map((bracket, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-slate-600">
                      {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '+' : formatCurrency(bracket.max)}
                    </span>
                    <span className="font-medium text-slate-900">
                      {formatPercent(bracket.rate)}
                    </span>
                  </div>
                ))}
              </div>

              {isQuebec === 'yes' && (
                <>
                  <h3 className="font-medium text-slate-900 mb-3 mt-4">
                    Quebec Provincial Rates (Additional)
                  </h3>
                  <div className="space-y-2 text-sm">
                    {RRSP_WITHHOLDING_RATES.quebec.map((bracket, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-slate-600">
                          {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '+' : formatCurrency(bracket.max)}
                        </span>
                        <span className="font-medium text-slate-900">
                          {formatPercent(bracket.rate)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Summary */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <h2 className="font-semibold text-amber-900">Withholding Tax Applied</h2>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Withdrawal Amount</span>
                      <span className="font-medium text-amber-900">{formatCurrency(parseFloat(withdrawalAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Federal Withholding</span>
                      <span className="font-medium text-amber-900">-{formatCurrency(results.federalWithholding)}</span>
                    </div>
                    {results.provincialWithholding > 0 && (
                      <div className="flex justify-between">
                        <span className="text-amber-700">Quebec Withholding</span>
                        <span className="font-medium text-amber-900">-{formatCurrency(results.provincialWithholding)}</span>
                      </div>
                    )}
                    <div className="border-t border-amber-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-amber-900">You Receive</span>
                        <span className="font-bold text-xl text-amber-900">{formatCurrency(results.netAmount)}</span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        Total withholding: {formatCurrency(results.totalWithholding)} ({((results.totalWithholding / parseFloat(withdrawalAmount)) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium mb-1">Withholding May Not Cover Your Tax</p>
                      <p>
                        The withholding tax is just a prepayment. The withdrawal is added to your
                        income and taxed at your marginal rate. If you're in a higher tax bracket,
                        you may owe more when you file your return.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Example Scenario */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Example: Actual Tax Owed</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    If you're in the 30% marginal tax bracket and withdraw {formatCurrency(parseFloat(withdrawalAmount))}:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Withdrawal amount</span>
                      <span>{formatCurrency(parseFloat(withdrawalAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Actual tax (30% example)</span>
                      <span className="text-red-600">{formatCurrency(parseFloat(withdrawalAmount) * 0.30)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Withholding already paid</span>
                      <span className="text-green-600">-{formatCurrency(results.totalWithholding)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Additional tax owed at filing</span>
                      <span className="text-red-600">
                        {formatCurrency(Math.max(0, parseFloat(withdrawalAmount) * 0.30 - results.totalWithholding))}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter a withdrawal amount to calculate withholding tax</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Ways to Minimize RRSP Withdrawal Tax</p>
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li>Withdraw in years with low income (retirement, sabbatical)</li>
                    <li>Make multiple smaller withdrawals to stay in lower withholding brackets</li>
                    <li>Consider RRSP meltdown strategies in retirement</li>
                    <li>Use Home Buyers' Plan (up to $60,000 tax-free)</li>
                    <li>Use Lifelong Learning Plan (up to $20,000 tax-free)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            RRSP Withholding Tax Explained
          </h2>
          <p className="text-slate-600 mb-4">
            When you withdraw from your RRSP before retirement (or convert it to a RRIF),
            your financial institution must withhold tax at source. The withholding rate
            depends on the withdrawal amount and whether you live in Quebec.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Federal Withholding Rates</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>10% on withdrawals up to $5,000</li>
            <li>20% on withdrawals from $5,001 to $15,000</li>
            <li>30% on withdrawals over $15,000</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Quebec Residents</h3>
          <p className="text-slate-600 mb-4">
            Quebec residents pay additional provincial withholding tax of 5%, 10%, or 15%
            depending on the withdrawal amount.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Home Buyers' Plan (HBP)</h3>
          <p className="text-slate-600">
            First-time home buyers can withdraw up to $60,000 from their RRSP tax-free to buy
            a home. You have 15 years to repay the amount, starting 2 years after withdrawal.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Withholding tax is not your final tax. The withdrawal is added
              to your income and may push you into a higher tax bracket. Consider consulting a
              tax professional before making large RRSP withdrawals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
