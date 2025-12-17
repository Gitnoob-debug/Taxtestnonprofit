'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, TrendingUp, TrendingDown } from 'lucide-react'
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
  CPP_MAX_MONTHLY_BENEFIT_65,
  CPP_AVERAGE_MONTHLY_BENEFIT,
  CPP_EARLY_REDUCTION_PER_MONTH,
  CPP_DELAY_INCREASE_PER_MONTH,
  estimateCPPBenefit,
} from '@/lib/canadianTaxData'

export default function CPPRetirementCalculatorPage() {
  const [startAge, setStartAge] = useState<string>('65')
  const [yearsContributed, setYearsContributed] = useState<string>('39')
  const [earningsLevel, setEarningsLevel] = useState<'max' | 'average' | 'custom'>('max')
  const [customPercent, setCustomPercent] = useState<string>('75')

  const results = useMemo(() => {
    const age = parseInt(startAge) || 65
    const years = Math.min(parseInt(yearsContributed) || 0, 47)
    const percent = earningsLevel === 'max'
      ? 1
      : earningsLevel === 'average'
        ? CPP_AVERAGE_MONTHLY_BENEFIT / CPP_MAX_MONTHLY_BENEFIT_65
        : (parseFloat(customPercent) || 0) / 100

    if (age < 60 || age > 70 || years <= 0) return null

    // Calculate benefits at different ages for comparison
    const benefitAt60 = estimateCPPBenefit(60, years, percent)
    const benefitAt65 = estimateCPPBenefit(65, years, percent)
    const benefitAt70 = estimateCPPBenefit(70, years, percent)
    const chosenBenefit = estimateCPPBenefit(age, years, percent)

    // Calculate adjustment percentage
    let adjustmentPercent = 0
    if (age < 65) {
      adjustmentPercent = -(65 - age) * 12 * CPP_EARLY_REDUCTION_PER_MONTH * 100
    } else if (age > 65) {
      adjustmentPercent = (age - 65) * 12 * CPP_DELAY_INCREASE_PER_MONTH * 100
    }

    // Calculate break-even ages (when total received equals starting at different ages)
    const calculateTotalReceived = (startAge: number, yearsReceiving: number, monthlyBenefit: number) => {
      return yearsReceiving * 12 * monthlyBenefit
    }

    // Break-even age comparison with age 65
    let breakEvenWithAge65 = null
    if (age < 65) {
      // Extra years of payments before 65
      const extraMonths = (65 - age) * 12
      const earlyTotal = chosenBenefit * extraMonths
      const monthlyDifference = benefitAt65 - chosenBenefit
      if (monthlyDifference > 0) {
        const monthsToBreakEven = earlyTotal / monthlyDifference
        breakEvenWithAge65 = 65 + Math.ceil(monthsToBreakEven / 12)
      }
    } else if (age > 65) {
      // Missed payments from 65 to start age
      const missedMonths = (age - 65) * 12
      const missedTotal = benefitAt65 * missedMonths
      const monthlyGain = chosenBenefit - benefitAt65
      if (monthlyGain > 0) {
        const monthsToBreakEven = missedTotal / monthlyGain
        breakEvenWithAge65 = age + Math.ceil(monthsToBreakEven / 12)
      }
    }

    // Lifetime projections to age 85 and 90
    const projectLifetime = (toAge: number) => {
      const yearsReceiving60 = Math.max(0, toAge - 60)
      const yearsReceiving65 = Math.max(0, toAge - 65)
      const yearsReceiving70 = Math.max(0, toAge - 70)
      const yearsReceivingChosen = Math.max(0, toAge - age)

      return {
        at60: calculateTotalReceived(60, yearsReceiving60, benefitAt60),
        at65: calculateTotalReceived(65, yearsReceiving65, benefitAt65),
        at70: calculateTotalReceived(70, yearsReceiving70, benefitAt70),
        chosen: calculateTotalReceived(age, yearsReceivingChosen, chosenBenefit),
      }
    }

    return {
      startAge: age,
      yearsContributed: years,
      earningsPercent: percent,
      monthlyBenefit: chosenBenefit,
      annualBenefit: chosenBenefit * 12,
      adjustmentPercent,
      benefitAt60,
      benefitAt65,
      benefitAt70,
      breakEvenWithAge65,
      lifetimeTo85: projectLifetime(85),
      lifetimeTo90: projectLifetime(90),
    }
  }, [startAge, yearsContributed, earningsLevel, customPercent])

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
            CPP Retirement Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Estimate your CPP retirement pension and compare the impact of starting early (60) vs late (70).
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-slate-50 rounded-xl p-6">
            <h2 className="font-semibold text-slate-900 mb-4">Your CPP Details</h2>

            <div className="space-y-5">
              <div>
                <Label htmlFor="startAge">When will you start CPP?</Label>
                <Select value={startAge} onValueChange={setStartAge}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70].map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        Age {age} {age === 65 ? '(Standard)' : age < 65 ? '(Early)' : '(Delayed)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsContributed">Years of CPP Contributions</Label>
                <div className="relative mt-1">
                  <Input
                    id="yearsContributed"
                    type="number"
                    min="1"
                    max="47"
                    value={yearsContributed}
                    onChange={(e) => setYearsContributed(e.target.value)}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Maximum 39 years counted for full pension (47 working years minus 8 dropout years)
                </p>
              </div>

              <div>
                <Label>Average Earnings Level</Label>
                <div className="space-y-2 mt-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="earningsLevel"
                      value="max"
                      checked={earningsLevel === 'max'}
                      onChange={() => setEarningsLevel('max')}
                      className="text-emerald-600"
                    />
                    <div>
                      <span className="font-medium">Maximum (YMPE)</span>
                      <p className="text-xs text-slate-500">Earned at or above $71,300/year</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="earningsLevel"
                      value="average"
                      checked={earningsLevel === 'average'}
                      onChange={() => setEarningsLevel('average')}
                      className="text-emerald-600"
                    />
                    <div>
                      <span className="font-medium">Average Canadian</span>
                      <p className="text-xs text-slate-500">~58% of maximum</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-pointer">
                    <input
                      type="radio"
                      name="earningsLevel"
                      value="custom"
                      checked={earningsLevel === 'custom'}
                      onChange={() => setEarningsLevel('custom')}
                      className="text-emerald-600"
                    />
                    <div className="flex-1">
                      <span className="font-medium">Custom percentage</span>
                      {earningsLevel === 'custom' && (
                        <div className="mt-2 flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={customPercent}
                            onChange={(e) => setCustomPercent(e.target.value)}
                            className="w-20"
                          />
                          <span className="text-sm text-slate-500">% of maximum</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Current CPP Info */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="font-medium text-slate-900 mb-3">{TAX_YEAR} CPP Maximums</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Max monthly (at 65):</span>
                  <span className="font-medium">{formatCurrency(CPP_MAX_MONTHLY_BENEFIT_65)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Average monthly:</span>
                  <span className="font-medium">{formatCurrency(CPP_AVERAGE_MONTHLY_BENEFIT)}</span>
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
                  results.adjustmentPercent > 0
                    ? 'bg-emerald-50 border border-emerald-200'
                    : results.adjustmentPercent < 0
                      ? 'bg-amber-50 border border-amber-200'
                      : 'bg-blue-50 border border-blue-200'
                }`}>
                  <h2 className="font-semibold text-slate-900 mb-4">Your Estimated CPP Pension</h2>

                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-slate-900">
                      {formatCurrency(results.monthlyBenefit)}/month
                    </p>
                    <p className="text-slate-600">
                      {formatCurrency(results.annualBenefit)}/year
                    </p>
                  </div>

                  {results.adjustmentPercent !== 0 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {results.adjustmentPercent > 0 ? (
                        <>
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">
                            +{results.adjustmentPercent.toFixed(1)}% for delaying
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-5 w-5 text-amber-600" />
                          <span className="text-amber-700 font-medium">
                            {results.adjustmentPercent.toFixed(1)}% for starting early
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {results.breakEvenWithAge65 && (
                    <p className="text-sm text-center mt-3 text-slate-600">
                      {parseInt(startAge) < 65 ? (
                        <>Break-even with starting at 65: Age {results.breakEvenWithAge65}</>
                      ) : (
                        <>Break-even with starting at 65: Age {results.breakEvenWithAge65}</>
                      )}
                    </p>
                  )}
                </div>

                {/* Comparison Table */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Age Comparison</h3>
                  <div className="space-y-3">
                    <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(startAge) === 60 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div>
                        <span className="font-medium">Age 60</span>
                        <p className="text-xs text-slate-500">-36% permanent reduction</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.benefitAt60)}/mo</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(startAge) === 65 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div>
                        <span className="font-medium">Age 65</span>
                        <p className="text-xs text-slate-500">Standard retirement age</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.benefitAt65)}/mo</span>
                    </div>
                    <div className={`flex justify-between items-center p-3 rounded-lg ${parseInt(startAge) === 70 ? 'bg-emerald-50' : 'bg-slate-50'}`}>
                      <div>
                        <span className="font-medium">Age 70</span>
                        <p className="text-xs text-slate-500">+42% permanent increase</p>
                      </div>
                      <span className="font-semibold">{formatCurrency(results.benefitAt70)}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Lifetime Projections */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Lifetime Total Comparison</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Total CPP received by age (your choice: Age {results.startAge})
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-2 font-medium text-slate-600">Start Age</th>
                          <th className="text-right py-2 font-medium text-slate-600">By Age 85</th>
                          <th className="text-right py-2 font-medium text-slate-600">By Age 90</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-100">
                          <td className="py-2">Age 60</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo85.at60)}</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo90.at60)}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-2">Age 65</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo85.at65)}</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo90.at65)}</td>
                        </tr>
                        <tr className="border-b border-slate-100">
                          <td className="py-2">Age 70</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo85.at70)}</td>
                          <td className="py-2 text-right">{formatCurrency(results.lifetimeTo90.at70)}</td>
                        </tr>
                        {results.startAge !== 60 && results.startAge !== 65 && results.startAge !== 70 && (
                          <tr className="bg-emerald-50 font-medium">
                            <td className="py-2">Age {results.startAge} (Your choice)</td>
                            <td className="py-2 text-right">{formatCurrency(results.lifetimeTo85.chosen)}</td>
                            <td className="py-2 text-right">{formatCurrency(results.lifetimeTo90.chosen)}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">When Should You Start CPP?</p>
                      <ul className="list-disc pl-4 space-y-1 mt-2">
                        <li><strong>Start early (60)</strong> if you need the income or have health concerns</li>
                        <li><strong>Start at 65</strong> for a balanced approach</li>
                        <li><strong>Delay to 70</strong> if you can afford to wait and expect to live long</li>
                        <li>Consider your other income sources and tax situation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-xl p-8 text-center">
                <p className="text-slate-500">Adjust the settings to estimate your CPP retirement pension</p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How CPP Retirement Benefits Work
          </h2>
          <p className="text-slate-600 mb-4">
            The Canada Pension Plan (CPP) provides a monthly retirement pension to Canadians who have
            contributed during their working years. The amount you receive depends on how much and
            how long you contributed, plus when you choose to start.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Early vs Late Start</h3>
          <p className="text-slate-600 mb-4">
            You can start CPP as early as 60 or as late as 70. Starting early permanently reduces
            your monthly benefit by 0.6% per month (7.2% per year) before age 65. Delaying increases
            it by 0.7% per month (8.4% per year) after age 65.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">{TAX_YEAR} CPP Changes</h3>
          <p className="text-slate-600 mb-4">
            The maximum monthly CPP retirement pension for new recipients starting at age 65 in {TAX_YEAR} is
            {' '}{formatCurrency(CPP_MAX_MONTHLY_BENEFIT_65)}. However, the average new pension is around
            {' '}{formatCurrency(CPP_AVERAGE_MONTHLY_BENEFIT)} as most people don't contribute the maximum
            for 39+ years.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The 8-Year Dropout Rule</h3>
          <p className="text-slate-600">
            CPP allows you to drop up to 8 years of your lowest earnings from the calculation.
            This means that out of a potential 47 contributing years (18 to 65), only your best
            39 years count. This helps if you had years of school, child-rearing, or low income.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Your actual CPP
              pension depends on your complete contribution history. For accurate figures,
              check your CPP Statement of Contributions on My Service Canada Account.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
