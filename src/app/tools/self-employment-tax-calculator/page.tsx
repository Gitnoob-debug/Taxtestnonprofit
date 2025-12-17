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
  TAX_YEAR,
  calculateTotalTax,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_BASIC_EXEMPTION,
  CPP_RATE_SELF_EMPLOYED,
  CPP_MAX_CONTRIBUTION_SELF_EMPLOYED,
  CPP2_MAX_EARNINGS,
  CPP2_RATE_SELF_EMPLOYED,
  CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED,
  EI_MAX_INSURABLE_EARNINGS,
  EI_RATE_EMPLOYEE,
  EI_MAX_PREMIUM_EMPLOYEE,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

export default function SelfEmploymentTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [grossRevenue, setGrossRevenue] = useState<string>('')
  const [businessExpenses, setBusinessExpenses] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [optIntoEI, setOptIntoEI] = useState<boolean>(false)
  const [profileApplied, setProfileApplied] = useState(false)

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const revenue = parseFloat(grossRevenue) || 0
    const expenses = parseFloat(businessExpenses) || 0

    if (revenue <= 0) return null

    const netBusinessIncome = Math.max(0, revenue - expenses)

    // Calculate CPP for self-employed (both employee and employer portions)
    const pensionableEarnings = Math.max(0, Math.min(netBusinessIncome, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)
    const baseCPP = Math.min(pensionableEarnings * CPP_RATE_SELF_EMPLOYED, CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)

    // CPP2 for self-employed
    let cpp2 = 0
    if (netBusinessIncome > CPP_MAX_PENSIONABLE_EARNINGS) {
      const cpp2Earnings = Math.min(netBusinessIncome, CPP2_MAX_EARNINGS) - CPP_MAX_PENSIONABLE_EARNINGS
      cpp2 = Math.min(cpp2Earnings * CPP2_RATE_SELF_EMPLOYED, CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED)
    }
    const totalCPP = baseCPP + cpp2

    // EI is optional for self-employed
    let eiPremium = 0
    if (optIntoEI) {
      const insurable = Math.min(netBusinessIncome, EI_MAX_INSURABLE_EARNINGS)
      eiPremium = Math.min(insurable * EI_RATE_EMPLOYEE, EI_MAX_PREMIUM_EMPLOYEE)
    }

    // Half of CPP is deductible
    const cppDeduction = totalCPP / 2

    // Taxable income after CPP deduction
    const taxableIncome = netBusinessIncome - cppDeduction

    // Calculate income tax
    const taxCalc = calculateTotalTax(taxableIncome, province)

    // CPP credit (the employee portion generates a credit)
    const cppCredit = (baseCPP / 2) * 0.15 // 15% non-refundable credit on employee portion

    // Total tax payable
    const totalTax = Math.max(0, taxCalc.totalTax - cppCredit) + totalCPP + eiPremium

    // Net income after all taxes
    const netIncome = netBusinessIncome - totalTax

    return {
      grossRevenue: revenue,
      businessExpenses: expenses,
      netBusinessIncome,
      cppDeduction,
      taxableIncome,
      federalTax: taxCalc.federalTax,
      provincialTax: taxCalc.provincialTax,
      incomeTax: taxCalc.totalTax,
      baseCPP,
      cpp2,
      totalCPP,
      eiPremium,
      cppCredit,
      totalTax,
      netIncome,
      effectiveRate: netBusinessIncome > 0 ? totalTax / netBusinessIncome : 0,
      marginalRate: taxCalc.marginalRate,
      monthlyNet: netIncome / 12,
    }
  }, [grossRevenue, businessExpenses, province, optIntoEI])

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
            Self-Employment Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate your income tax and CPP contributions as a self-employed Canadian.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Business Income</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="grossRevenue">Gross Business Revenue</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="grossRevenue"
                    type="number"
                    placeholder="100,000"
                    value={grossRevenue}
                    onChange={(e) => setGrossRevenue(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="businessExpenses">Business Expenses</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="businessExpenses"
                    type="number"
                    placeholder="20,000"
                    value={businessExpenses}
                    onChange={(e) => setBusinessExpenses(e.target.value)}
                    className="pl-7"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Office, supplies, travel, professional fees, etc.
                </p>
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

              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                <input
                  type="checkbox"
                  id="optIntoEI"
                  checked={optIntoEI}
                  onChange={(e) => setOptIntoEI(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <div>
                  <Label htmlFor="optIntoEI" className="cursor-pointer font-medium">
                    Opt into EI Special Benefits
                  </Label>
                  <p className="text-xs text-slate-500">
                    For maternity, parental, sickness, compassionate care benefits
                  </p>
                </div>
              </div>
            </div>

            {/* Key Info */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">{TAX_YEAR} Self-Employment Rates</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">CPP rate (both portions):</span>
                  <span className="font-medium text-slate-900">{formatPercent(CPP_RATE_SELF_EMPLOYED)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Max CPP contribution:</span>
                  <span className="font-medium text-slate-900">{formatCurrency(CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Max CPP2 contribution:</span>
                  <span className="font-medium text-slate-900">{formatCurrency(CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED)}</span>
                </div>
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
                      <span className="text-emerald-700">Net Business Income</span>
                      <span className="font-medium text-emerald-900">{formatCurrency(results.netBusinessIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">Income Tax</span>
                      <span className="font-medium text-emerald-900">-{formatCurrency(results.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-700">CPP Contributions</span>
                      <span className="font-medium text-emerald-900">-{formatCurrency(results.totalCPP)}</span>
                    </div>
                    {results.eiPremium > 0 && (
                      <div className="flex justify-between">
                        <span className="text-emerald-700">EI Premiums</span>
                        <span className="font-medium text-emerald-900">-{formatCurrency(results.eiPremium)}</span>
                      </div>
                    )}
                    <div className="border-t border-emerald-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-emerald-900">Net Income After Tax</span>
                        <span className="font-bold text-xl text-emerald-900">{formatCurrency(results.netIncome)}</span>
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">
                        {formatCurrency(results.monthlyNet)}/month
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-slate-600 mb-1">Effective Tax Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{formatPercent(results.effectiveRate)}</p>
                    <p className="text-xs text-slate-500 mt-1">Total tax ÷ net income</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-slate-600 mb-1">Marginal Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{formatPercent(results.marginalRate)}</p>
                    <p className="text-xs text-slate-500 mt-1">Tax on next dollar</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross Revenue</span>
                      <span>{formatCurrency(results.grossRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Business Expenses</span>
                      <span className="text-red-600">-{formatCurrency(results.businessExpenses)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Net Business Income</span>
                      <span>{formatCurrency(results.netBusinessIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPP Deduction (50%)</span>
                      <span className="text-green-600">-{formatCurrency(results.cppDeduction)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Taxable Income</span>
                      <span>{formatCurrency(results.taxableIncome)}</span>
                    </div>
                    <div className="border-t pt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Federal Tax</span>
                        <span>{formatCurrency(results.federalTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Provincial Tax</span>
                        <span>{formatCurrency(results.provincialTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Base CPP ({formatPercent(CPP_RATE_SELF_EMPLOYED)})</span>
                        <span>{formatCurrency(results.baseCPP)}</span>
                      </div>
                      {results.cpp2 > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">CPP2 ({formatPercent(CPP2_RATE_SELF_EMPLOYED)})</span>
                          <span>{formatCurrency(results.cpp2)}</span>
                        </div>
                      )}
                      {results.eiPremium > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">EI Premium</span>
                          <span>{formatCurrency(results.eiPremium)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between font-bold border-t pt-2">
                      <span>Total Tax & Contributions</span>
                      <span className="text-red-600">{formatCurrency(results.totalTax)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter your business income to calculate taxes</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Self-Employment CPP Notes</p>
                  <ul className="list-disc pl-4 space-y-1 mt-2">
                    <li>You pay both the employee and employer portions (11.90% total in {TAX_YEAR})</li>
                    <li>Half of your CPP contribution is deductible from income</li>
                    <li>The other half provides a 15% non-refundable tax credit</li>
                    <li>EI is optional but gives access to special benefits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Self-Employment Taxes in Canada
          </h2>
          <p className="text-slate-600 mb-4">
            As a self-employed individual in Canada, you're responsible for paying both the
            employee and employer portions of CPP contributions—a total of {formatPercent(CPP_RATE_SELF_EMPLOYED)}.
            This is in addition to federal and provincial income tax.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">CPP for Self-Employed ({TAX_YEAR})</h3>
          <p className="text-slate-600 mb-4">
            The maximum CPP contribution for self-employed individuals is {formatCurrency(CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)}.
            If your income exceeds {formatCurrency(CPP_MAX_PENSIONABLE_EARNINGS)}, you also pay CPP2 contributions
            of {formatPercent(CPP2_RATE_SELF_EMPLOYED)} up to {formatCurrency(CPP2_MAX_EARNINGS)}, with a maximum
            of {formatCurrency(CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED)}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">EI for Self-Employed</h3>
          <p className="text-slate-600">
            Unlike employees, self-employed individuals don't have to pay EI. However, you can opt
            in to the EI special benefits program to receive maternity, parental, sickness,
            and compassionate care benefits. You only pay the employee portion.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates. Your actual tax may vary
              based on other income sources, deductions, and credits. Consider consulting a tax professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
