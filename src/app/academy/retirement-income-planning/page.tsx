import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Retirement Income Planning Canada 2024 | Tax-Efficient Strategies',
  description: 'Complete guide to retirement income planning in Canada. Learn how to draw income from different sources, minimize taxes, and maximize government benefits.',
  keywords: 'retirement income planning Canada, retirement tax strategies, RRIF withdrawal strategy, retirement income sources, tax-efficient retirement',
}

export default function RetirementIncomePlanningPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-2.5 rounded-xl">
              <Target className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Retirement Income Planning Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Order Matters</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            The order and timing of withdrawing from different retirement accounts can significantly impact your lifetime tax bill. Strategic planning can save tens of thousands of dollars.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Sources of Retirement Income</h2>

          <h3>Government Programs</h3>
          <ul>
            <li><strong>CPP/QPP:</strong> Based on contributions, starts 60-70</li>
            <li><strong>OAS:</strong> Based on residency, starts 65-70</li>
            <li><strong>GIS:</strong> For low-income seniors</li>
          </ul>

          <h3>Personal Savings</h3>
          <ul>
            <li><strong>RRSP/RRIF:</strong> Tax-deferred, taxable when withdrawn</li>
            <li><strong>TFSA:</strong> Tax-free growth and withdrawals</li>
            <li><strong>Non-registered:</strong> Taxed on income annually</li>
          </ul>

          <h3>Employer Pensions</h3>
          <ul>
            <li><strong>Defined Benefit:</strong> Guaranteed payments</li>
            <li><strong>Defined Contribution:</strong> Depends on returns</li>
            <li><strong>Group RRSP:</strong> Similar to personal RRSP</li>
          </ul>

          <h2>The Retirement Income Puzzle</h2>

          <h3>Typical Phases</h3>
          <ul>
            <li><strong>Age 60-64:</strong> Bridge period, may need more from savings</li>
            <li><strong>Age 65-71:</strong> Government benefits start, plan RRSP meltdown</li>
            <li><strong>Age 71+:</strong> Mandatory RRIF withdrawals, manage clawbacks</li>
          </ul>

          <h3>Key Tax Brackets (2024 Federal)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Income</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0-$55,867</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>$55,867-$111,733</td>
                <td>20.5%</td>
              </tr>
              <tr>
                <td>$111,733-$173,205</td>
                <td>26%</td>
              </tr>
            </tbody>
          </table>

          <h2>RRSP/RRIF Meltdown Strategy</h2>

          <h3>The Problem</h3>
          <ul>
            <li>Large RRSP = large mandatory RRIF withdrawals</li>
            <li>Combined with CPP/OAS = high income</li>
            <li>Potential OAS clawback</li>
            <li>Higher tax brackets</li>
          </ul>

          <h3>The Solution</h3>
          <ul>
            <li>Withdraw from RRSP before age 65</li>
            <li>Fill up lower tax brackets</li>
            <li>Reduce RRSP balance before RRIF conversion</li>
            <li>Move funds to TFSA after tax</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example:</strong> Withdraw $40,000/year from RRSP at age 60-65, pay ~15% tax. Put after-tax in TFSA. At 71, smaller RRIF with OAS/CPP stays below clawback.
            </p>
          </div>

          <h2>TFSA vs RRIF Withdrawals</h2>

          <h3>TFSA Advantages</h3>
          <ul>
            <li>No tax on withdrawals</li>
            <li>Doesn't affect OAS/GIS</li>
            <li>No mandatory minimums</li>
            <li>Flexible timing</li>
          </ul>

          <h3>RRIF Advantages</h3>
          <ul>
            <li>May be larger balance</li>
            <li>Qualifies for pension income splitting</li>
            <li>Pension income amount credit</li>
          </ul>

          <h3>Optimal Strategy</h3>
          <ul>
            <li>Use RRIF to fill lower brackets</li>
            <li>Top up with TFSA to avoid higher brackets</li>
            <li>TFSA for large one-time expenses</li>
          </ul>

          <h2>CPP Timing Decision</h2>

          <h3>Start at 60</h3>
          <ul>
            <li>36% permanent reduction</li>
            <li>More total payments if shorter life expectancy</li>
            <li>Good if high other income until 65</li>
          </ul>

          <h3>Start at 65</h3>
          <ul>
            <li>Standard benefit</li>
            <li>Middle ground approach</li>
          </ul>

          <h3>Delay to 70</h3>
          <ul>
            <li>42% permanent increase</li>
            <li>Better if expect longevity</li>
            <li>Higher guaranteed income</li>
          </ul>

          <h2>OAS Timing Decision</h2>

          <h3>Start at 65</h3>
          <ul>
            <li>If income below clawback threshold</li>
            <li>If uncertain about longevity</li>
            <li>If need the income</li>
          </ul>

          <h3>Delay to 70</h3>
          <ul>
            <li>36% increase</li>
            <li>If income would be clawed back anyway</li>
            <li>Good health, expect longevity</li>
          </ul>

          <h2>Managing OAS Clawback</h2>

          <h3>Key Strategies</h3>
          <ul>
            <li>Pension income splitting with spouse</li>
            <li>RRSP meltdown before 65</li>
            <li>TFSA withdrawals don't count</li>
            <li>Timing capital gains</li>
          </ul>

          <h3>What Counts for Clawback</h3>
          <ul>
            <li>All taxable income (Line 23400)</li>
            <li>Including capital gains (50%)</li>
            <li>Including dividend gross-up</li>
            <li>NOT TFSA withdrawals</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Dividend Alert:</strong> Canadian dividend gross-up increases reported income significantly. $60,000 in eligible dividends reports as $82,800 income, potentially triggering clawback.
            </p>
          </div>

          <h2>Order of Withdrawals</h2>

          <h3>General Framework</h3>
          <ol>
            <li>CPP/OAS when eligible (or delayed strategically)</li>
            <li>RRIF minimum (mandatory after 71)</li>
            <li>Additional RRSP/RRIF to fill lower brackets</li>
            <li>Non-registered accounts</li>
            <li>TFSA for large expenses or to avoid high brackets</li>
          </ol>

          <h3>Adjust Based On</h3>
          <ul>
            <li>Your specific income sources</li>
            <li>Spouse's income</li>
            <li>Expected expenses</li>
            <li>Tax bracket goals</li>
          </ul>

          <h2>Pension Income Splitting</h2>

          <h3>What Can Be Split</h3>
          <ul>
            <li>RPP pension (any age)</li>
            <li>RRIF/annuity income (age 65+)</li>
            <li>Up to 50% to spouse</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>Lower combined tax</li>
            <li>Both can claim pension credit</li>
            <li>May eliminate OAS clawback</li>
          </ul>

          <h2>Income Layering Example</h2>

          <h3>Couple, Both 70</h3>
          <p>Goal: $100,000 total income, minimize tax</p>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Source</th>
                <th>Spouse A</th>
                <th>Spouse B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OAS</td>
                <td>$8,500</td>
                <td>$8,500</td>
              </tr>
              <tr>
                <td>CPP</td>
                <td>$12,000</td>
                <td>$6,000</td>
              </tr>
              <tr>
                <td>RRIF (before split)</td>
                <td>$40,000</td>
                <td>$5,000</td>
              </tr>
              <tr>
                <td>After pension split</td>
                <td>$25,000</td>
                <td>$20,000</td>
              </tr>
              <tr>
                <td>TFSA top-up</td>
                <td>$0</td>
                <td>$15,000</td>
              </tr>
            </tbody>
          </table>
          <p>Result: Both stay under $50,000 taxable, minimal OAS clawback, lower brackets.</p>

          <h2>Estate Considerations</h2>

          <h3>RRIF at Death</h3>
          <ul>
            <li>Full value taxed on final return (unless to spouse)</li>
            <li>Can be significant tax bill</li>
            <li>Consider drawing down strategically</li>
          </ul>

          <h3>TFSA at Death</h3>
          <ul>
            <li>Transfers tax-free to spouse</li>
            <li>To others: FMV tax-free, growth after death taxable</li>
          </ul>

          <h2>Annual Review Checklist</h2>
          <ul>
            <li>Review income vs OAS clawback threshold</li>
            <li>Optimize pension splitting election</li>
            <li>Plan RRIF withdrawals</li>
            <li>Consider TFSA vs taxable sources</li>
            <li>Review investment allocation</li>
            <li>Update beneficiary designations</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Retirement Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about retirement income planning.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Retirement income planning is complex and personal. Consider working with a financial planner for a comprehensive strategy.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
