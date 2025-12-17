'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, Building2, Wallet } from 'lucide-react'
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
  calculateDividendTax,
  CPP_RATE_SELF_EMPLOYED,
  CPP_MAX_CONTRIBUTION_SELF_EMPLOYED,
  CPP_BASIC_EXEMPTION,
  CPP_MAX_PENSIONABLE_EARNINGS,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

// Small business corporate tax rates by province (2025)
const SMALL_BUSINESS_RATES: Record<string, number> = {
  AB: 0.11,   // 2% provincial + 9% federal = 11%
  BC: 0.11,   // 2% provincial + 9% federal = 11%
  MB: 0.09,   // 0% provincial + 9% federal = 9%
  NB: 0.115,  // 2.5% provincial + 9% federal = 11.5%
  NL: 0.12,   // 3% provincial + 9% federal = 12%
  NS: 0.115,  // 2.5% provincial + 9% federal = 11.5%
  NT: 0.11,   // 2% provincial + 9% federal = 11%
  NU: 0.12,   // 3% provincial + 9% federal = 12%
  ON: 0.122,  // 3.2% provincial + 9% federal = 12.2%
  PE: 0.10,   // 1% provincial + 9% federal = 10%
  QC: 0.123,  // 3.3% provincial + 9% federal = 12.3% (varies based on hours)
  SK: 0.10,   // 1% provincial + 9% federal = 10%
  YT: 0.11,   // 2% territorial + 9% federal = 11%
}

export default function SalaryVsDividendCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [corporateProfit, setCorporateProfit] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const profit = parseFloat(corporateProfit) || 0
    if (profit <= 0) return null

    const corpRate = SMALL_BUSINESS_RATES[province] || 0.12

    // SCENARIO 1: All Salary
    // Salary is deductible, so corporate income = 0
    // But we need to pay employer CPP (5.95%) on top of salary
    // Salary + Employer CPP = Available funds
    // Employer CPP is an expense, so: Salary * (1 + 0.0595) = profit for CPP-eligible portion

    // Calculate max salary that can be paid with employer CPP
    // Employer pays CPP on salary up to YMPE ($71,300 for 2025)
    const maxCPPEarnings = CPP_MAX_PENSIONABLE_EARNINGS - CPP_BASIC_EXEMPTION
    const employerCPP = Math.min(maxCPPEarnings * CPP_RATE_SELF_EMPLOYED / 2, CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2)

    // If profit covers salary up to CPP max plus employer portion
    let salaryGross = profit
    let employerCPPCost = 0

    if (profit > CPP_MAX_PENSIONABLE_EARNINGS) {
      // Salary up to YMPE has CPP; beyond that, no employer CPP
      // profit = salary + employer_cpp_cost
      // employer_cpp_cost = min(salary - 3500, 67800) * 0.0595
      // For simplicity: salary = profit - employer_cpp
      salaryGross = profit - employerCPP
      employerCPPCost = employerCPP
    } else if (profit > CPP_BASIC_EXEMPTION) {
      // Employer CPP applies to (salary - 3500) * 5.95%
      // profit = salary + (salary - 3500) * 0.0595
      // profit = salary * 1.0595 - 3500 * 0.0595
      // profit + 208.25 = salary * 1.0595
      salaryGross = (profit + CPP_BASIC_EXEMPTION * 0.0595) / 1.0595
      employerCPPCost = profit - salaryGross
    }

    // Employee CPP contribution
    const employeeCPP = Math.min(
      Math.max(0, salaryGross - CPP_BASIC_EXEMPTION) * 0.0595,
      CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
    )

    const salaryTax = calculateTotalTax(salaryGross, province)
    const salaryAfterTax = salaryGross - salaryTax.totalTax - employeeCPP
    const salaryTotalTax = salaryTax.totalTax + employeeCPP + employerCPPCost

    // SCENARIO 2: All Dividends (non-eligible from CCPC)
    const corpTax = profit * corpRate
    const afterCorpTax = profit - corpTax

    // Pay as non-eligible dividend
    const dividendResult = calculateDividendTax(afterCorpTax, false, 0, province)
    const dividendPersonalTax = dividendResult.netTax
    const dividendAfterTax = afterCorpTax - dividendPersonalTax
    const dividendTotalTax = corpTax + dividendPersonalTax

    // SCENARIO 3: Optimal Mix (salary up to CPP max, rest as dividends)
    const optimalSalary = Math.min(profit, CPP_MAX_PENSIONABLE_EARNINGS)

    // Calculate employer CPP for optimal salary
    let optimalEmployerCPP = 0
    if (optimalSalary > CPP_BASIC_EXEMPTION) {
      optimalEmployerCPP = Math.min(
        (optimalSalary - CPP_BASIC_EXEMPTION) * 0.0595,
        CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
      )
    }

    // Actual salary after employer CPP
    const actualOptimalSalary = optimalSalary - optimalEmployerCPP

    // Remaining profit after salary for dividends
    const remainingForDividends = profit - optimalSalary

    let optimalCorpTax = 0
    let optimalDividendAmount = 0
    let optimalDividendTax = 0

    if (remainingForDividends > 0) {
      optimalCorpTax = remainingForDividends * corpRate
      optimalDividendAmount = remainingForDividends - optimalCorpTax
      const optDivResult = calculateDividendTax(optimalDividendAmount, false, actualOptimalSalary, province)
      optimalDividendTax = optDivResult.netTax
    }

    const optimalEmployeeCPP = Math.min(
      Math.max(0, actualOptimalSalary - CPP_BASIC_EXEMPTION) * 0.0595,
      CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
    )

    const optimalSalaryTax = calculateTotalTax(actualOptimalSalary + (optimalDividendAmount * 1.15), province)
    const optimalPersonalTax = optimalSalaryTax.totalTax

    // Recalculate for combined income
    const combinedIncome = actualOptimalSalary + optimalDividendAmount
    const optimalAfterTax = combinedIncome - optimalEmployeeCPP - (optimalPersonalTax - (calculateDividendTax(optimalDividendAmount, false, actualOptimalSalary, province).federalCredit + calculateDividendTax(optimalDividendAmount, false, actualOptimalSalary, province).provincialCredit))

    // Simplified optimal calculation
    const simplifiedOptimalSalaryTax = calculateTotalTax(actualOptimalSalary, province).totalTax
    const simplifiedOptimalDivResult = calculateDividendTax(optimalDividendAmount, false, actualOptimalSalary, province)
    const simplifiedOptimalTotalTax = optimalCorpTax + simplifiedOptimalSalaryTax + optimalEmployeeCPP + optimalEmployerCPP + simplifiedOptimalDivResult.netTax
    const simplifiedOptimalAfterTax = profit - simplifiedOptimalTotalTax

    return {
      corporateProfit: profit,
      corpRate,

      // Salary scenario
      salary: {
        gross: salaryGross,
        employerCPP: employerCPPCost,
        employeeCPP,
        personalTax: salaryTax.totalTax,
        totalTax: salaryTotalTax,
        afterTax: salaryAfterTax,
        effectiveRate: salaryTotalTax / profit,
        cpBenefits: true,
      },

      // Dividend scenario
      dividend: {
        corpTax,
        dividendAmount: afterCorpTax,
        personalTax: dividendPersonalTax,
        totalTax: dividendTotalTax,
        afterTax: dividendAfterTax,
        effectiveRate: dividendTotalTax / profit,
        cppBenefits: false,
      },

      // Optimal mix scenario
      optimal: {
        salaryPortion: actualOptimalSalary,
        dividendPortion: optimalDividendAmount,
        employerCPP: optimalEmployerCPP,
        employeeCPP: optimalEmployeeCPP,
        corpTax: optimalCorpTax,
        totalTax: simplifiedOptimalTotalTax,
        afterTax: simplifiedOptimalAfterTax,
        effectiveRate: simplifiedOptimalTotalTax / profit,
        cppBenefits: true,
      },

      // Best option
      bestOption: salaryAfterTax >= dividendAfterTax && salaryAfterTax >= simplifiedOptimalAfterTax
        ? 'salary'
        : simplifiedOptimalAfterTax >= dividendAfterTax
          ? 'optimal'
          : 'dividend',
    }
  }, [corporateProfit, province])

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
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Salary vs Dividend Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Compare taking income as salary vs dividends from your corporation. See which option leaves more money in your pocket.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Your Corporation</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="corporateProfit">Corporate Profit Before Pay</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="corporateProfit"
                      type="number"
                      placeholder="100,000"
                      value={corporateProfit}
                      onChange={(e) => setCorporateProfit(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Available funds to pay yourself
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
              </div>

              {results && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-900 mb-3">Tax Rates</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Small business rate:</span>
                      <span className="font-medium">{formatPercent(results.corpRate)}</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Applies to first $500K of active business income
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Comparison Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Salary Card */}
                  <div className={`rounded-xl p-5 border-2 ${
                    results.bestOption === 'salary'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Wallet className={`h-5 w-5 ${results.bestOption === 'salary' ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <h3 className="font-semibold text-slate-900">All Salary</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Tax</span>
                        <span className="text-red-600">{formatCurrency(results.salary.totalTax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>You Keep</span>
                        <span className="text-emerald-600">{formatCurrency(results.salary.afterTax)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-xs text-slate-500">
                          Effective rate: {formatPercent(results.salary.effectiveRate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-blue-600">
                      <Info className="h-3 w-3" />
                      <span>Builds CPP benefits</span>
                    </div>
                    {results.bestOption === 'salary' && (
                      <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-center">
                        Best Option
                      </div>
                    )}
                  </div>

                  {/* Dividend Card */}
                  <div className={`rounded-xl p-5 border-2 ${
                    results.bestOption === 'dividend'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className={`h-5 w-5 ${results.bestOption === 'dividend' ? 'text-emerald-600' : 'text-slate-400'}`} />
                      <h3 className="font-semibold text-slate-900">All Dividends</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Tax</span>
                        <span className="text-red-600">{formatCurrency(results.dividend.totalTax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>You Keep</span>
                        <span className="text-emerald-600">{formatCurrency(results.dividend.afterTax)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-xs text-slate-500">
                          Effective rate: {formatPercent(results.dividend.effectiveRate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
                      <Info className="h-3 w-3" />
                      <span>No CPP contributions</span>
                    </div>
                    {results.bestOption === 'dividend' && (
                      <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-center">
                        Best Option
                      </div>
                    )}
                  </div>

                  {/* Optimal Mix Card */}
                  <div className={`rounded-xl p-5 border-2 ${
                    results.bestOption === 'optimal'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`h-5 w-5 flex items-center justify-center ${results.bestOption === 'optimal' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        ⚡
                      </div>
                      <h3 className="font-semibold text-slate-900">Optimal Mix</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Tax</span>
                        <span className="text-red-600">{formatCurrency(results.optimal.totalTax)}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>You Keep</span>
                        <span className="text-emerald-600">{formatCurrency(results.optimal.afterTax)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <span className="text-xs text-slate-500">
                          Effective rate: {formatPercent(results.optimal.effectiveRate)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-blue-600">
                      <Info className="h-3 w-3" />
                      <span>Salary to CPP max + dividends</span>
                    </div>
                    {results.bestOption === 'optimal' && (
                      <div className="mt-2 text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-1 rounded text-center">
                        Best Option
                      </div>
                    )}
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 font-medium text-slate-600"></th>
                          <th className="text-right py-2 font-medium text-slate-600">Salary</th>
                          <th className="text-right py-2 font-medium text-slate-600">Dividends</th>
                          <th className="text-right py-2 font-medium text-slate-600">Mix</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-2 text-slate-600">Starting Amount</td>
                          <td className="py-2 text-right">{formatCurrency(results.corporateProfit)}</td>
                          <td className="py-2 text-right">{formatCurrency(results.corporateProfit)}</td>
                          <td className="py-2 text-right">{formatCurrency(results.corporateProfit)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-slate-600">Corporate Tax</td>
                          <td className="py-2 text-right">$0</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.dividend.corpTax)}</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.optimal.corpTax)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-slate-600">Employer CPP</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.salary.employerCPP)}</td>
                          <td className="py-2 text-right">$0</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.optimal.employerCPP)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-slate-600">Employee CPP</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.salary.employeeCPP)}</td>
                          <td className="py-2 text-right">$0</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.optimal.employeeCPP)}</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-slate-600">Personal Tax</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.salary.personalTax)}</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.dividend.personalTax)}</td>
                          <td className="py-2 text-right text-red-600">-{formatCurrency(results.optimal.totalTax - results.optimal.corpTax - results.optimal.employerCPP - results.optimal.employeeCPP)}</td>
                        </tr>
                        <tr className="font-semibold">
                          <td className="py-2">Total Tax</td>
                          <td className="py-2 text-right text-red-600">{formatCurrency(results.salary.totalTax)}</td>
                          <td className="py-2 text-right text-red-600">{formatCurrency(results.dividend.totalTax)}</td>
                          <td className="py-2 text-right text-red-600">{formatCurrency(results.optimal.totalTax)}</td>
                        </tr>
                        <tr className="font-bold bg-slate-50">
                          <td className="py-2">Net to You</td>
                          <td className="py-2 text-right text-emerald-600">{formatCurrency(results.salary.afterTax)}</td>
                          <td className="py-2 text-right text-emerald-600">{formatCurrency(results.dividend.afterTax)}</td>
                          <td className="py-2 text-right text-emerald-600">{formatCurrency(results.optimal.afterTax)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Important Considerations */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-2">Important Considerations</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li><strong>CPP Benefits:</strong> Salary builds CPP retirement benefits; dividends don't</li>
                        <li><strong>RRSP Room:</strong> Only salary creates RRSP contribution room</li>
                        <li><strong>EI Benefits:</strong> Shareholders controlling 40%+ may not qualify for EI</li>
                        <li><strong>Integration:</strong> The tax system aims for similar total tax regardless of method</li>
                        <li><strong>Other Income:</strong> Your optimal choice depends on all income sources</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Enter your corporate profit to compare salary vs dividend options</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Salary vs Dividends: Which is Better?
          </h2>
          <p className="text-slate-600 mb-4">
            As a Canadian business owner, you can pay yourself through salary, dividends, or a combination.
            Each has different tax implications and affects your CPP benefits, RRSP room, and overall tax burden.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Salary Benefits</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Creates RRSP contribution room (18% of salary, up to {formatCurrency(32490)})</li>
            <li>Builds CPP retirement benefits</li>
            <li>Fully deductible for the corporation</li>
            <li>May help qualify for certain loans and mortgages</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Dividend Benefits</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>No CPP contributions required (lower immediate cost)</li>
            <li>Dividend tax credit reduces personal tax</li>
            <li>More flexibility in timing of payments</li>
            <li>Can be split with family members (with restrictions)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Tax Integration</h3>
          <p className="text-slate-600">
            Canada's tax system is designed so that income earned through a corporation and paid as dividends
            should be taxed similarly to salary income. However, imperfect integration means the optimal
            choice can vary by province and income level.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates and
              assumes your corporation qualifies for the small business deduction. Actual results may vary.
              Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
