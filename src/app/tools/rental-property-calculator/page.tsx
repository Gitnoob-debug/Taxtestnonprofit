'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, Home, Calculator } from 'lucide-react'
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
  CAPITAL_GAINS_INCLUSION_RATE,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'

// CCA Class 1 for buildings (4%)
const CCA_RATE_BUILDING = 0.04

export default function RentalPropertyCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()

  // Property Info
  const [propertyValue, setPropertyValue] = useState<string>('')
  const [landValue, setLandValue] = useState<string>('')

  // Rental Income
  const [monthlyRent, setMonthlyRent] = useState<string>('')
  const [vacancyRate, setVacancyRate] = useState<string>('5')

  // Expenses
  const [mortgageInterest, setMortgageInterest] = useState<string>('')
  const [propertyTax, setPropertyTax] = useState<string>('')
  const [insurance, setInsurance] = useState<string>('')
  const [utilities, setUtilities] = useState<string>('')
  const [maintenance, setMaintenance] = useState<string>('')
  const [propertyManagement, setPropertyManagement] = useState<string>('')
  const [otherExpenses, setOtherExpenses] = useState<string>('')

  // Tax Info
  const [otherIncome, setOtherIncome] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [claimCCA, setClaimCCA] = useState<boolean>(false)

  const [profileApplied, setProfileApplied] = useState(false)

  // Auto-populate from profile (province, income)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.province) setProvince(profile.province)
      if (profile.annual_income) setOtherIncome(profile.annual_income.toString())
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const property = parseFloat(propertyValue) || 0
    const land = parseFloat(landValue) || 0
    const rent = parseFloat(monthlyRent) || 0
    const vacancy = (parseFloat(vacancyRate) || 0) / 100
    const other = parseFloat(otherIncome) || 0

    if (rent <= 0) return null

    // Calculate building value (for CCA)
    const buildingValue = Math.max(0, property - land)

    // Gross rental income
    const grossRentalIncome = rent * 12

    // Effective rental income after vacancy
    const effectiveRentalIncome = grossRentalIncome * (1 - vacancy)

    // Calculate all expenses
    const expenses = {
      mortgageInterest: parseFloat(mortgageInterest) || 0,
      propertyTax: parseFloat(propertyTax) || 0,
      insurance: parseFloat(insurance) || 0,
      utilities: parseFloat(utilities) || 0,
      maintenance: parseFloat(maintenance) || 0,
      propertyManagement: parseFloat(propertyManagement) || 0,
      other: parseFloat(otherExpenses) || 0,
    }

    const totalExpenses = Object.values(expenses).reduce((sum, val) => sum + val, 0)

    // Net rental income before CCA
    const netRentalBeforeCCA = effectiveRentalIncome - totalExpenses

    // CCA calculation (can't exceed net income and can't create a rental loss)
    let ccaAmount = 0
    if (claimCCA && buildingValue > 0 && netRentalBeforeCCA > 0) {
      // Half-year rule applies in first year
      const maxCCA = buildingValue * CCA_RATE_BUILDING
      ccaAmount = Math.min(maxCCA, netRentalBeforeCCA)
    }

    // Net rental income after CCA
    const netRentalIncome = netRentalBeforeCCA - ccaAmount

    // Total taxable income
    const totalTaxableIncome = other + netRentalIncome

    // Tax calculations
    const taxWithRental = calculateTotalTax(totalTaxableIncome, province)
    const taxWithoutRental = calculateTotalTax(other, province)

    // Additional tax on rental income
    const additionalTax = taxWithRental.totalTax - taxWithoutRental.totalTax

    // Effective tax rate on rental income
    const effectiveRentalRate = netRentalIncome > 0 ? additionalTax / netRentalIncome : 0

    // Cash flow calculation
    // Note: This is a simplified cash flow that doesn't include principal payments
    const annualCashFlow = effectiveRentalIncome - totalExpenses - additionalTax

    // ROI calculation (if property value provided)
    const cashOnCashReturn = property > 0 ? annualCashFlow / property : 0

    // CCA recapture warning
    const ccaRecaptureWarning = ccaAmount > 0

    return {
      grossRentalIncome,
      effectiveRentalIncome,
      totalExpenses,
      expenses,
      netRentalBeforeCCA,
      ccaAmount,
      netRentalIncome,
      buildingValue,
      otherIncome: other,
      totalTaxableIncome,
      additionalTax,
      effectiveRentalRate,
      marginalRate: taxWithRental.marginalRate,
      annualCashFlow,
      monthlyCashFlow: annualCashFlow / 12,
      cashOnCashReturn,
      ccaRecaptureWarning,
    }
  }, [
    propertyValue, landValue, monthlyRent, vacancyRate,
    mortgageInterest, propertyTax, insurance, utilities,
    maintenance, propertyManagement, otherExpenses,
    otherIncome, province, claimCCA
  ])

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

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Rental Property Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate the tax on your rental property income and see your after-tax cash flow.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="rental property calculator"
          prefilledFields={['income', 'province']}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Info */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-5 w-5 text-slate-400" />
                <h2 className="font-semibold text-slate-900">Property Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyValue">Property Value (Optional)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="propertyValue"
                      type="number"
                      placeholder="500,000"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">For ROI calculation</p>
                </div>

                <div>
                  <Label htmlFor="landValue">Land Value (Optional)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="landValue"
                      type="number"
                      placeholder="150,000"
                      value={landValue}
                      onChange={(e) => setLandValue(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">For CCA calculation</p>
                </div>

                <div>
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="monthlyRent"
                      type="number"
                      placeholder="2,000"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                  <Input
                    id="vacancyRate"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="5"
                    value={vacancyRate}
                    onChange={(e) => setVacancyRate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Expenses */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-slate-400" />
                <h2 className="font-semibold text-slate-900">Annual Expenses</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mortgageInterest">Mortgage Interest</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="mortgageInterest"
                      type="number"
                      placeholder="15,000"
                      value={mortgageInterest}
                      onChange={(e) => setMortgageInterest(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Interest only, not principal</p>
                </div>

                <div>
                  <Label htmlFor="propertyTax">Property Tax</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="propertyTax"
                      type="number"
                      placeholder="4,000"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="insurance">Insurance</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="insurance"
                      type="number"
                      placeholder="1,500"
                      value={insurance}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="utilities">Utilities (if paid by owner)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="utilities"
                      type="number"
                      placeholder="0"
                      value={utilities}
                      onChange={(e) => setUtilities(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maintenance">Maintenance & Repairs</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="maintenance"
                      type="number"
                      placeholder="2,000"
                      value={maintenance}
                      onChange={(e) => setMaintenance(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="propertyManagement">Property Management</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="propertyManagement"
                      type="number"
                      placeholder="0"
                      value={propertyManagement}
                      onChange={(e) => setPropertyManagement(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="otherExpenses">Other Expenses</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="otherExpenses"
                      type="number"
                      placeholder="0"
                      value={otherExpenses}
                      onChange={(e) => setOtherExpenses(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Info */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Tax Information</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="otherIncome">Your Other Income</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="otherIncome"
                      type="number"
                      placeholder="75,000"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Employment, business, etc.</p>
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

              <div className="mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={claimCCA}
                    onChange={(e) => setClaimCCA(e.target.checked)}
                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <span className="font-medium text-slate-900">Claim CCA (Capital Cost Allowance)</span>
                    <p className="text-xs text-slate-500">4% of building value annually (read warning below)</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {results ? (
              <>
                {/* Cash Flow Summary */}
                <div className={`rounded-xl p-6 ${
                  results.annualCashFlow >= 0
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h2 className="font-semibold text-slate-900 mb-4">After-Tax Cash Flow</h2>

                  <div className="text-center mb-4">
                    <p className={`text-3xl font-bold ${
                      results.annualCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(results.monthlyCashFlow)}/mo
                    </p>
                    <p className="text-sm text-slate-600">
                      {formatCurrency(results.annualCashFlow)}/year
                    </p>
                  </div>

                  {results.cashOnCashReturn !== 0 && (
                    <div className="text-center pt-3 border-t border-slate-200">
                      <p className="text-sm text-slate-600">Cash-on-cash return</p>
                      <p className="text-xl font-semibold">{formatPercent(results.cashOnCashReturn)}</p>
                    </div>
                  )}
                </div>

                {/* Income Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Income Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross rental income</span>
                      <span>{formatCurrency(results.grossRentalIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Less: Vacancy</span>
                      <span className="text-red-600">-{formatCurrency(results.grossRentalIncome - results.effectiveRentalIncome)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Effective income</span>
                      <span>{formatCurrency(results.effectiveRentalIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Less: Expenses</span>
                      <span className="text-red-600">-{formatCurrency(results.totalExpenses)}</span>
                    </div>
                    {results.ccaAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Less: CCA</span>
                        <span className="text-red-600">-{formatCurrency(results.ccaAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Net rental income</span>
                      <span>{formatCurrency(results.netRentalIncome)}</span>
                    </div>
                  </div>
                </div>

                {/* Tax Summary */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Tax Impact</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Other income</span>
                      <span>{formatCurrency(results.otherIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rental income</span>
                      <span>{formatCurrency(results.netRentalIncome)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total taxable income</span>
                      <span>{formatCurrency(results.totalTaxableIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Marginal rate</span>
                      <span>{formatPercent(results.marginalRate)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-red-600 border-t pt-2">
                      <span>Additional tax</span>
                      <span>{formatCurrency(results.additionalTax)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Effective rate on rental</span>
                      <span>{formatPercent(results.effectiveRentalRate)}</span>
                    </div>
                  </div>
                </div>

                {/* CCA Warning */}
                {results.ccaRecaptureWarning && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800">
                        <p className="font-medium mb-1">CCA Recapture Warning</p>
                        <p>
                          When you sell the property, CCA claimed will be "recaptured" and added
                          to your income. Consider carefully before claiming CCA.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Deductible Expenses</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Mortgage interest (not principal)</li>
                        <li>Property taxes & insurance</li>
                        <li>Repairs & maintenance</li>
                        <li>Property management fees</li>
                        <li>Advertising for tenants</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <Home className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Enter your rental details to calculate your tax and cash flow</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Understanding Rental Property Taxes in Canada
          </h2>
          <p className="text-slate-600 mb-4">
            Rental income in Canada is taxed as regular income at your marginal tax rate.
            However, you can deduct many expenses to reduce your taxable rental income.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Deductible Expenses</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li><strong>Mortgage interest</strong> (not principal payments)</li>
            <li><strong>Property taxes</strong> and condo fees</li>
            <li><strong>Insurance</strong> premiums</li>
            <li><strong>Utilities</strong> if paid by landlord</li>
            <li><strong>Repairs and maintenance</strong> (but not improvements)</li>
            <li><strong>Property management</strong> fees</li>
            <li><strong>Advertising</strong> for tenants</li>
            <li><strong>Legal and accounting</strong> fees</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Capital Cost Allowance (CCA)</h3>
          <p className="text-slate-600 mb-4">
            CCA is depreciation you can claim on the building (not land). For residential rental
            properties (Class 1), the rate is 4% per year. However, CCA cannot create or increase
            a rental loss, and it will be "recaptured" when you sell the property.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">When You Sell</h3>
          <p className="text-slate-600">
            When you sell a rental property, you'll pay tax on any capital gain (at a 50% inclusion rate).
            If you claimed CCA, you'll also face "recapture" where all CCA claimed is added back to your income.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Rental property tax
              is complex with many rules around personal use, principal residence exemption, and more.
              Consult a tax professional for accurate advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
