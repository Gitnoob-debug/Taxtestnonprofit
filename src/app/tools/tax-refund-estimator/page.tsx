'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
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
  calculateCPPContributions,
  calculateEIPremiums,
  FEDERAL_BPA,
  PROVINCIAL_BPA,
  RRSP_LIMIT_2025,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'

export default function TaxRefundEstimatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()

  // Income
  const [employmentIncome, setEmploymentIncome] = useState<string>('')
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState<string>('')
  const [otherIncome, setOtherIncome] = useState<string>('')

  // Tax withheld
  const [taxWithheld, setTaxWithheld] = useState<string>('')

  // Deductions
  const [rrspContribution, setRrspContribution] = useState<string>('')
  const [childcareExpenses, setChildcareExpenses] = useState<string>('')
  const [unionDues, setUnionDues] = useState<string>('')
  const [workFromHome, setWorkFromHome] = useState<string>('')

  // Credits
  const [donations, setDonations] = useState<string>('')
  const [medicalExpenses, setMedicalExpenses] = useState<string>('')

  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const employment = parseFloat(employmentIncome) || 0
    const selfEmployment = parseFloat(selfEmploymentIncome) || 0
    const other = parseFloat(otherIncome) || 0
    const withheld = parseFloat(taxWithheld) || 0

    const rrsp = parseFloat(rrspContribution) || 0
    const childcare = parseFloat(childcareExpenses) || 0
    const union = parseFloat(unionDues) || 0
    const wfh = parseFloat(workFromHome) || 0

    const donation = parseFloat(donations) || 0
    const medical = parseFloat(medicalExpenses) || 0

    const grossIncome = employment + selfEmployment + other
    if (grossIncome <= 0) return null

    // Calculate total deductions
    const totalDeductions = rrsp + childcare + union + wfh

    // Net income for tax
    const netIncome = Math.max(0, grossIncome - totalDeductions)

    // Calculate CPP/EI
    const isQuebec = province === 'QC'
    const cppContributions = calculateCPPContributions(employment + selfEmployment)
    const eiPremiums = calculateEIPremiums(employment, isQuebec)

    // Self-employed CPP (both portions)
    let selfEmployedCPP = 0
    if (selfEmployment > 0) {
      selfEmployedCPP = calculateCPPContributions(selfEmployment).total * 2 // Both employee and employer portions
    }

    // Calculate tax owing
    const taxCalc = calculateTotalTax(netIncome, province)

    // Non-refundable credits
    // CPP/EI credits (at lowest federal rate)
    const cppEiCredits = (cppContributions.total + eiPremiums) * 0.15

    // Donation tax credit
    let donationCredit = 0
    if (donation > 0) {
      const donationFirst200 = Math.min(donation, 200) * 0.15 // 15% on first $200
      const donationOver200 = Math.max(0, donation - 200) * 0.29 // 29% on amounts over $200
      donationCredit = donationFirst200 + donationOver200
    }

    // Medical expense credit (3% of net income threshold)
    const medicalThreshold = Math.min(netIncome * 0.03, 2759) // 2025 threshold
    const eligibleMedical = Math.max(0, medical - medicalThreshold)
    const medicalCredit = eligibleMedical * 0.15

    // Total non-refundable credits
    const totalCredits = cppEiCredits + donationCredit + medicalCredit

    // Net tax after credits
    const netTaxBeforeCredits = taxCalc.totalTax
    const netTax = Math.max(0, netTaxBeforeCredits - totalCredits)

    // Add back self-employed CPP (paid on tax return)
    const totalTaxOwing = netTax + selfEmployedCPP

    // Calculate refund or balance owing
    const refundOrOwing = withheld - totalTaxOwing

    // Calculate effective rate
    const effectiveRate = grossIncome > 0 ? totalTaxOwing / grossIncome : 0

    return {
      grossIncome,
      totalDeductions,
      netIncome,
      cppContributions: cppContributions.total,
      selfEmployedCPP,
      eiPremiums,
      federalTax: taxCalc.federalTax,
      provincialTax: taxCalc.provincialTax,
      taxBeforeCredits: netTaxBeforeCredits,
      cppEiCredits,
      donationCredit,
      medicalCredit,
      totalCredits,
      totalTaxOwing,
      taxWithheld: withheld,
      refundOrOwing,
      isRefund: refundOrOwing >= 0,
      effectiveRate,
      marginalRate: taxCalc.marginalRate,

      // Breakdown for display
      breakdown: {
        rrsp,
        childcare,
        union,
        wfh,
        donations: donation,
        medical,
      },
    }
  }, [
    employmentIncome, selfEmploymentIncome, otherIncome, taxWithheld,
    rrspContribution, childcareExpenses, unionDues, workFromHome,
    donations, medicalExpenses, province
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

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tax Refund Estimator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Estimate if you'll get a refund or owe money when you file your {TAX_YEAR} tax return.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Income Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Income</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employmentIncome">Employment Income (T4)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="employmentIncome"
                      type="number"
                      placeholder="75,000"
                      value={employmentIncome}
                      onChange={(e) => setEmploymentIncome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="taxWithheld">Tax Withheld (Box 22)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="taxWithheld"
                      type="number"
                      placeholder="15,000"
                      value={taxWithheld}
                      onChange={(e) => setTaxWithheld(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="selfEmploymentIncome">Self-Employment Income</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="selfEmploymentIncome"
                      type="number"
                      placeholder="0"
                      value={selfEmploymentIncome}
                      onChange={(e) => setSelfEmploymentIncome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="otherIncome">Other Income</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="otherIncome"
                      type="number"
                      placeholder="0"
                      value={otherIncome}
                      onChange={(e) => setOtherIncome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Interest, rental, EI, etc.</p>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="province">Province</Label>
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className="mt-1 w-full md:w-64">
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

            {/* Deductions Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Deductions</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rrspContribution">RRSP Contribution</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="rrspContribution"
                      type="number"
                      placeholder="0"
                      value={rrspContribution}
                      onChange={(e) => setRrspContribution(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Limit: {formatCurrency(RRSP_LIMIT_2025)}</p>
                </div>

                <div>
                  <Label htmlFor="childcareExpenses">Childcare Expenses</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="childcareExpenses"
                      type="number"
                      placeholder="0"
                      value={childcareExpenses}
                      onChange={(e) => setChildcareExpenses(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="unionDues">Union Dues / Professional Fees</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="unionDues"
                      type="number"
                      placeholder="0"
                      value={unionDues}
                      onChange={(e) => setUnionDues(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="workFromHome">Work From Home (T777S)</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="workFromHome"
                      type="number"
                      placeholder="0"
                      value={workFromHome}
                      onChange={(e) => setWorkFromHome(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Credits Section */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Tax Credits</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donations">Charitable Donations</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="donations"
                      type="number"
                      placeholder="0"
                      value={donations}
                      onChange={(e) => setDonations(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="medicalExpenses">Medical Expenses</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="medicalExpenses"
                      type="number"
                      placeholder="0"
                      value={medicalExpenses}
                      onChange={(e) => setMedicalExpenses(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Only expenses over 3% of income count</p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-1 space-y-6">
            {results ? (
              <>
                {/* Main Result */}
                <div className={`rounded-xl p-6 ${
                  results.isRefund
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    {results.isRefund ? (
                      <TrendingUp className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                    <h2 className="font-semibold text-slate-900">
                      {results.isRefund ? 'Estimated Refund' : 'Estimated Balance Owing'}
                    </h2>
                  </div>

                  <div className="text-center">
                    <p className={`text-4xl font-bold ${
                      results.isRefund ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(Math.abs(results.refundOrOwing))}
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      Effective tax rate: {formatPercent(results.effectiveRate)}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross income</span>
                      <span>{formatCurrency(results.grossIncome)}</span>
                    </div>
                    {results.totalDeductions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Deductions</span>
                        <span className="text-green-600">-{formatCurrency(results.totalDeductions)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium">
                      <span>Net income</span>
                      <span>{formatCurrency(results.netIncome)}</span>
                    </div>
                    <div className="border-t pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Federal tax</span>
                        <span>{formatCurrency(results.federalTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Provincial tax</span>
                        <span>{formatCurrency(results.provincialTax)}</span>
                      </div>
                      {results.selfEmployedCPP > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Self-employed CPP</span>
                          <span>{formatCurrency(results.selfEmployedCPP)}</span>
                        </div>
                      )}
                      {results.totalCredits > 0 && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">Tax credits</span>
                          <span className="text-green-600">-{formatCurrency(results.totalCredits)}</span>
                        </div>
                      )}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-medium">
                        <span>Total tax owing</span>
                        <span>{formatCurrency(results.totalTaxOwing)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax withheld</span>
                        <span className="text-green-600">-{formatCurrency(results.taxWithheld)}</span>
                      </div>
                    </div>
                    <div className="border-t pt-3">
                      <div className={`flex justify-between font-bold ${
                        results.isRefund ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        <span>{results.isRefund ? 'Refund' : 'Balance owing'}</span>
                        <span>{formatCurrency(Math.abs(results.refundOrOwing))}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">
                        {results.isRefund ? 'Want a Smaller Refund?' : 'Tips to Reduce Tax Owing'}
                      </p>
                      {results.isRefund ? (
                        <p>
                          A large refund means you're lending money to the government interest-free.
                          Consider filing a T1213 to reduce tax withheld at source.
                        </p>
                      ) : (
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Contribute to RRSP before March 1</li>
                          <li>Claim all eligible deductions</li>
                          <li>Check if you qualify for any credits</li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <DollarSign className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Enter your income to estimate your tax refund or balance owing</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Tax Refunds Work in Canada
          </h2>
          <p className="text-slate-600 mb-4">
            Whether you get a refund or owe money depends on how much tax was withheld from your
            paycheques compared to your actual tax liability. If too much was withheld, you get a refund.
            If not enough, you owe the difference.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Common Reasons for Refunds</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>RRSP contributions (reduce taxable income)</li>
            <li>Tuition tax credits</li>
            <li>Charitable donations</li>
            <li>Child care expenses</li>
            <li>Medical expenses above the threshold</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Common Reasons for Owing</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>Multiple jobs (each withholds at lower rate)</li>
            <li>Self-employment income with no source deductions</li>
            <li>Investment income or capital gains</li>
            <li>RRSP withdrawals</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This is an estimate based on the information provided.
              Your actual tax situation may differ. This calculator does not account for all credits
              and deductions. Consult a tax professional for accurate advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
