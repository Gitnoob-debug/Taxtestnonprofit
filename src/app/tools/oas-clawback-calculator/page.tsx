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
  calculateOASClawback,
  OAS_CLAWBACK_THRESHOLD,
  OAS_CLAWBACK_RATE,
  OAS_MAX_ANNUAL_65_74,
  OAS_MAX_ANNUAL_75_PLUS,
  OAS_FULL_CLAWBACK_65_74,
  OAS_FULL_CLAWBACK_75_PLUS,
} from '@/lib/canadianTaxData'

export default function OASClawbackCalculatorPage() {
  const [income, setIncome] = useState<string>('')
  const [ageGroup, setAgeGroup] = useState<'65-74' | '75+'>('65-74')

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0
    const age = ageGroup === '65-74' ? 65 : 75

    if (incomeNum <= 0) return null

    const calculation = calculateOASClawback(incomeNum, age)

    // Calculate threshold amounts
    const maxOAS = ageGroup === '65-74' ? OAS_MAX_ANNUAL_65_74 : OAS_MAX_ANNUAL_75_PLUS
    const fullClawbackThreshold = ageGroup === '65-74' ? OAS_FULL_CLAWBACK_65_74 : OAS_FULL_CLAWBACK_75_PLUS

    // Calculate room before clawback starts
    const roomBeforeClawback = Math.max(0, OAS_CLAWBACK_THRESHOLD - incomeNum)

    // Calculate how much more income until full clawback
    const roomUntilFullClawback = Math.max(0, fullClawbackThreshold - incomeNum)

    return {
      ...calculation,
      maxOAS,
      fullClawbackThreshold,
      roomBeforeClawback,
      roomUntilFullClawback,
      clawbackPercent: calculation.oasBenefit > 0 ? calculation.clawback / calculation.oasBenefit : 0,
      monthlyNetOAS: calculation.netOAS / 12,
    }
  }, [income, ageGroup])

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
            OAS Clawback Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate how much of your Old Age Security pension will be clawed back based on your income.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Your Information</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="income">Net Income (Line 23600)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="95,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Your total income from all sources before OAS clawback
                </p>
              </div>

              <div>
                <Label htmlFor="ageGroup">Age Group</Label>
                <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as '65-74' | '75+')}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="65-74">65 to 74 years old</SelectItem>
                    <SelectItem value="75+">75 years or older</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  OAS is 10% higher for those 75+
                </p>
              </div>
            </div>

            {/* Key Thresholds */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">{TAX_YEAR} OAS Thresholds</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Clawback starts at:</span>
                  <span className="font-medium text-slate-900">{formatCurrency(OAS_CLAWBACK_THRESHOLD)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Full clawback at:</span>
                  <span className="font-medium text-slate-900">
                    {formatCurrency(ageGroup === '65-74' ? OAS_FULL_CLAWBACK_65_74 : OAS_FULL_CLAWBACK_75_PLUS)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Max annual OAS:</span>
                  <span className="font-medium text-slate-900">
                    ~{formatCurrency(ageGroup === '65-74' ? OAS_MAX_ANNUAL_65_74 : OAS_MAX_ANNUAL_75_PLUS)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Main Result */}
                <div className={`rounded-xl p-6 ${
                  results.clawback === 0
                    ? 'bg-green-50 border border-green-200'
                    : results.netOAS === 0
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-amber-50 border border-amber-200'
                }`}>
                  <h2 className={`font-semibold mb-4 ${
                    results.clawback === 0 ? 'text-green-900' :
                    results.netOAS === 0 ? 'text-red-900' : 'text-amber-900'
                  }`}>
                    Your OAS Result
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={results.clawback === 0 ? 'text-green-700' : results.netOAS === 0 ? 'text-red-700' : 'text-amber-700'}>
                        Maximum OAS Pension
                      </span>
                      <span className="font-medium">{formatCurrency(results.oasBenefit)}/year</span>
                    </div>
                    {results.clawback > 0 && (
                      <div className="flex justify-between">
                        <span className={results.netOAS === 0 ? 'text-red-700' : 'text-amber-700'}>
                          Recovery Tax (Clawback)
                        </span>
                        <span className="font-medium text-red-600">-{formatCurrency(results.clawback)}/year</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Net OAS You Receive</span>
                        <span className="font-bold text-xl">
                          {formatCurrency(results.netOAS)}/year
                        </span>
                      </div>
                      <p className="text-sm mt-1 opacity-75">
                        {formatCurrency(results.monthlyNetOAS)}/month
                      </p>
                    </div>
                  </div>

                  {results.clawback > 0 && results.netOAS > 0 && (
                    <div className="mt-4 flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-amber-800">
                        {formatPercent(results.clawbackPercent)} of your OAS is being clawed back.
                        You have {formatCurrency(results.roomUntilFullClawback)} more income
                        room before full clawback.
                      </p>
                    </div>
                  )}

                  {results.clawback === 0 && (
                    <p className="mt-4 text-sm text-green-700">
                      Your income is below the clawback threshold. You keep 100% of your OAS!
                      You have {formatCurrency(results.roomBeforeClawback)} of income room
                      before clawback starts.
                    </p>
                  )}

                  {results.netOAS === 0 && (
                    <p className="mt-4 text-sm text-red-700">
                      Your income exceeds the full clawback threshold.
                      Your entire OAS pension is clawed back.
                    </p>
                  )}
                </div>

                {/* How It Works */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Calculation Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Your net income</span>
                      <span className="font-medium">{formatCurrency(parseFloat(income))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Minus threshold</span>
                      <span className="font-medium">-{formatCurrency(OAS_CLAWBACK_THRESHOLD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Income over threshold</span>
                      <span className="font-medium">
                        {formatCurrency(Math.max(0, parseFloat(income) - OAS_CLAWBACK_THRESHOLD))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">× Clawback rate</span>
                      <span className="font-medium">{formatPercent(OAS_CLAWBACK_RATE)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-medium">
                      <span>Clawback amount</span>
                      <span className="text-red-600">{formatCurrency(results.clawback)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter your income to calculate OAS clawback</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Strategies to Reduce OAS Clawback</p>
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li>Income split with spouse (pension income splitting)</li>
                    <li>Contribute to TFSA instead of RRSP (TFSA withdrawals don't count as income)</li>
                    <li>Defer CPP to reduce income in early retirement years</li>
                    <li>Plan RRSP/RRIF withdrawals strategically</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Understanding the OAS Clawback (Recovery Tax)
          </h2>
          <p className="text-slate-600 mb-4">
            The Old Age Security (OAS) pension recovery tax, commonly called the "OAS clawback,"
            reduces your OAS benefits if your net income exceeds a certain threshold. For {TAX_YEAR},
            the clawback starts when your income exceeds {formatCurrency(OAS_CLAWBACK_THRESHOLD)}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">How the Clawback Works</h3>
          <p className="text-slate-600 mb-4">
            For every dollar your income exceeds the threshold, you must repay 15 cents of your OAS.
            This continues until your entire OAS benefit is repaid. For those aged 65-74, the complete
            clawback occurs at {formatCurrency(OAS_FULL_CLAWBACK_65_74)}. For those 75+, it's
            {formatCurrency(OAS_FULL_CLAWBACK_75_PLUS)} (because they receive 10% more OAS).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Important Timing Note</h3>
          <p className="text-slate-600">
            The clawback for OAS payments from July {TAX_YEAR} to June {TAX_YEAR + 1} is based on
            your {TAX_YEAR - 1} tax return. Plan ahead to manage your income in years before
            you start receiving OAS.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> OAS amounts are adjusted quarterly based on the Consumer
              Price Index. The amounts shown are estimates for {TAX_YEAR}. Your actual OAS may vary.
              Consult Service Canada for exact benefit amounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
