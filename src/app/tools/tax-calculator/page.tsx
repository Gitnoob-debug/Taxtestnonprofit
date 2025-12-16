'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  FEDERAL_BRACKETS,
  PROVINCIAL_BRACKETS,
  FEDERAL_BPA,
  PROVINCIAL_BPA,
  CPP_MAX_CONTRIBUTION_EMPLOYEE,
  EI_MAX_PREMIUM_EMPLOYEE,
  TAX_YEAR,
} from '@/lib/canadianTaxData'

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0
    if (incomeNum <= 0) return null

    const tax = calculateTotalTax(incomeNum, province)

    // Estimate CPP and EI (simplified)
    const cpp = Math.min(incomeNum * 0.0595, CPP_MAX_CONTRIBUTION_EMPLOYEE)
    const ei = Math.min(incomeNum * 0.0166, EI_MAX_PREMIUM_EMPLOYEE)

    const totalDeductions = tax.totalTax + cpp + ei
    const netIncome = incomeNum - totalDeductions

    return {
      ...tax,
      cpp,
      ei,
      totalDeductions,
      netIncome,
      monthlyNet: netIncome / 12,
      biweeklyNet: netIncome / 26,
    }
  }, [income, province])

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
            Canadian Income Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Calculate your federal and provincial income tax, marginal rate, and take-home pay.
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
                <Label htmlFor="income">Annual Income (before tax)</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="income"
                    type="number"
                    placeholder="75,000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
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

            {/* Tax Brackets Reference */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Info className="h-4 w-4" />
                {TAX_YEAR} Tax Brackets
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">Federal:</p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {FEDERAL_BRACKETS.map((bracket, i) => (
                      <li key={i}>
                        {formatPercent(bracket.rate)} on {formatCurrency(bracket.min)}
                        {bracket.max === Infinity ? '+' : ` - ${formatCurrency(bracket.max)}`}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {PROVINCE_NAMES[province]}:
                  </p>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {PROVINCIAL_BRACKETS[province]?.map((bracket, i) => (
                      <li key={i}>
                        {formatPercent(bracket.rate)} on {formatCurrency(bracket.min)}
                        {bracket.max === Infinity ? '+' : ` - ${formatCurrency(bracket.max)}`}
                      </li>
                    ))}
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
                <div className="bg-teal-50 dark:bg-teal-950 rounded-2xl border border-teal-200 dark:border-teal-800 p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-teal-900 dark:text-teal-100 mb-6">
                    Your Tax Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-teal-700 dark:text-teal-300">Gross Income</span>
                      <span className="font-semibold text-teal-900 dark:text-teal-100">
                        {formatCurrency(parseFloat(income))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-700 dark:text-teal-300">Federal Tax</span>
                      <span className="font-medium text-teal-900 dark:text-teal-100">
                        -{formatCurrency(results.federalTax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-700 dark:text-teal-300">Provincial Tax</span>
                      <span className="font-medium text-teal-900 dark:text-teal-100">
                        -{formatCurrency(results.provincialTax)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-700 dark:text-teal-300">CPP Contribution</span>
                      <span className="font-medium text-teal-900 dark:text-teal-100">
                        -{formatCurrency(results.cpp)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-teal-700 dark:text-teal-300">EI Premium</span>
                      <span className="font-medium text-teal-900 dark:text-teal-100">
                        -{formatCurrency(results.ei)}
                      </span>
                    </div>
                    <div className="border-t border-teal-300 dark:border-teal-700 pt-3 mt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-teal-900 dark:text-teal-100">Net Income</span>
                        <span className="font-bold text-xl text-teal-900 dark:text-teal-100">
                          {formatCurrency(results.netIncome)}
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
                        Tax on next dollar earned
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Effective Rate</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {formatPercent(results.effectiveRate)}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        Average tax paid
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pay Breakdown */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Take-Home Pay</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Monthly</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(results.monthlyNet)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Bi-Weekly</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(results.biweeklyNet)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  Enter your income to see your tax breakdown
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            How Canadian Income Tax Works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Canada uses a progressive tax system where higher income is taxed at higher rates. You pay federal tax plus provincial/territorial tax based on where you live on December 31st of the tax year.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Basic Personal Amount (BPA)
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The Basic Personal Amount is a non-refundable tax credit that every Canadian can claim. For {TAX_YEAR}, the federal BPA is {formatCurrency(FEDERAL_BPA)}. Provincial BPAs vary—{PROVINCE_NAMES[province]}'s BPA is {formatCurrency(PROVINCIAL_BPA[province])}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            CPP and EI
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            In addition to income tax, most employees pay Canada Pension Plan (CPP) contributions (5.95% up to ${CPP_MAX_CONTRIBUTION_EMPLOYEE.toLocaleString()} max) and Employment Insurance (EI) premiums (1.66% up to ${EI_MAX_PREMIUM_EMPLOYEE.toLocaleString()} max).
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance only. Your actual tax situation may vary based on deductions, credits, and other factors. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
