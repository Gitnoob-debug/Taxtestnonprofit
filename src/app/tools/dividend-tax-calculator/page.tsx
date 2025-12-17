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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  PROVINCE_NAMES,
  TAX_YEAR,
  calculateDividendTax,
  DIVIDEND_ELIGIBLE_GROSSUP,
  DIVIDEND_NON_ELIGIBLE_GROSSUP,
  DIVIDEND_ELIGIBLE_CREDIT,
  DIVIDEND_NON_ELIGIBLE_CREDIT,
  PROVINCIAL_DIVIDEND_CREDITS,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

export default function DividendTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [dividendAmount, setDividendAmount] = useState<string>('')
  const [otherIncome, setOtherIncome] = useState<string>('')
  const [dividendType, setDividendType] = useState<'eligible' | 'non-eligible'>('eligible')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const dividend = parseFloat(dividendAmount) || 0
    const other = parseFloat(otherIncome) || 0

    if (dividend <= 0) return null

    return calculateDividendTax(dividend, dividendType === 'eligible', other, province)
  }, [dividendAmount, otherIncome, dividendType, province])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
            Dividend Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate the tax on Canadian dividends including the gross-up and dividend tax credit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Dividend Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="dividendAmount">Dividend Amount Received</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="dividendAmount"
                    type="number"
                    placeholder="10,000"
                    value={dividendAmount}
                    onChange={(e) => setDividendAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">The actual cash dividend received</p>
              </div>

              <div>
                <Label>Dividend Type</Label>
                <RadioGroup
                  value={dividendType}
                  onValueChange={(v) => setDividendType(v as 'eligible' | 'non-eligible')}
                  className="mt-2"
                >
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                    <RadioGroupItem value="eligible" id="eligible" className="mt-0.5" />
                    <div>
                      <Label htmlFor="eligible" className="font-medium cursor-pointer">
                        Eligible Dividends
                      </Label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        From large public corporations (38% gross-up)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white">
                    <RadioGroupItem value="non-eligible" id="non-eligible" className="mt-0.5" />
                    <div>
                      <Label htmlFor="non-eligible" className="font-medium cursor-pointer">
                        Non-Eligible Dividends
                      </Label>
                      <p className="text-xs text-slate-500 mt-0.5">
                        From CCPCs / small businesses (15% gross-up)
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="otherIncome">Other Taxable Income</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="otherIncome"
                    type="number"
                    placeholder="50,000"
                    value={otherIncome}
                    onChange={(e) => setOtherIncome(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Employment, business, or other income</p>
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
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {results ? (
              <>
                {/* Summary */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <h2 className="font-semibold text-emerald-900 mb-4">Tax Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Dividend Received</span>
                      <span className="font-medium text-emerald-900">{formatCurrency(parseFloat(dividendAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Grossed-up Amount</span>
                      <span className="font-medium text-emerald-900">{formatCurrency(results.grossedUpAmount)}</span>
                    </div>
                    <div className="border-t border-emerald-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-emerald-700">Net Tax on Dividend</span>
                        <span className="font-bold text-xl text-emerald-900">{formatCurrency(results.netTax)}</span>
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">
                        Effective rate: {formatPercent(results.effectiveRate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-slate-600 mb-2">Gross-up Calculation</p>
                      <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between">
                          <span>Dividend received</span>
                          <span>{formatCurrency(parseFloat(dividendAmount))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>× Gross-up ({formatPercent(dividendType === 'eligible' ? DIVIDEND_ELIGIBLE_GROSSUP : DIVIDEND_NON_ELIGIBLE_GROSSUP)})</span>
                          <span>{formatCurrency(results.grossedUpAmount - parseFloat(dividendAmount))}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                          <span>Taxable amount</span>
                          <span>{formatCurrency(results.grossedUpAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-600 mb-2">Tax Credits</p>
                      <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between text-green-700">
                          <span>Federal dividend tax credit</span>
                          <span>-{formatCurrency(results.federalCredit)}</span>
                        </div>
                        <div className="flex justify-between text-green-700">
                          <span>Provincial dividend tax credit</span>
                          <span>-{formatCurrency(results.provincialCredit)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter a dividend amount to see your tax breakdown</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Eligible vs Non-Eligible Dividends</p>
                  <p>
                    <strong>Eligible dividends</strong> come from public corporations and CCPCs
                    that paid tax at the general corporate rate. They get a larger gross-up (38%)
                    but also a larger tax credit.
                  </p>
                  <p className="mt-2">
                    <strong>Non-eligible dividends</strong> come from CCPCs that used the small
                    business deduction. They have a smaller gross-up (15%) and smaller credit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Canadian Dividend Tax Works
          </h2>
          <p className="text-slate-600 mb-4">
            Canadian dividends receive preferential tax treatment through the dividend gross-up
            and tax credit system. This system is designed to integrate corporate and personal
            taxes, preventing double taxation.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Gross-Up</h3>
          <p className="text-slate-600 mb-4">
            When you receive a dividend, you must "gross up" the amount to reflect the
            pre-tax corporate income. For {TAX_YEAR}, eligible dividends are grossed up by 38%
            and non-eligible dividends by 15%.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Dividend Tax Credit</h3>
          <p className="text-slate-600">
            To compensate for the gross-up, you receive a dividend tax credit that reduces
            your tax. The federal credit is {formatPercent(DIVIDEND_ELIGIBLE_CREDIT)} of the
            grossed-up amount for eligible dividends and {formatPercent(DIVIDEND_NON_ELIGIBLE_CREDIT)} for
            non-eligible dividends. Provincial credits vary by province.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates.
              Your actual tax may vary based on your complete tax situation. Consult a tax professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
