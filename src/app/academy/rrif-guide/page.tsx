import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingDown, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RRIF Guide Canada 2024 | Minimum Withdrawals & Tax Rules',
  description: 'Complete guide to Registered Retirement Income Funds in Canada. Learn about RRIF minimum withdrawals, conversion from RRSP, tax treatment, and income strategies.',
  keywords: 'RRIF minimum withdrawal 2024, RRSP to RRIF conversion, RRIF tax rules, RRIF withdrawal rates, registered retirement income fund',
}

export default function RRIFGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-xl">
              <TrendingDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            RRIF Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Mandatory Withdrawals</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            A RRIF is the retirement phase of your RRSP. You must convert by December 31 of the year you turn 71, and minimum withdrawals are required each year—all taxable as income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>RRSP to RRIF Conversion</h2>

          <h3>Deadline</h3>
          <ul>
            <li>Must convert by Dec 31 of year you turn 71</li>
            <li>Can convert earlier if desired</li>
            <li>No minimum age to convert</li>
          </ul>

          <h3>Conversion Process</h3>
          <ul>
            <li>Transfer directly to RRIF</li>
            <li>No tax on conversion</li>
            <li>Investments can transfer in-kind</li>
            <li>Same financial institution or transfer out</li>
          </ul>

          <h3>Alternatives to RRIF</h3>
          <ul>
            <li>Life annuity</li>
            <li>Combination of RRIF and annuity</li>
            <li>Cash out (significant tax hit)</li>
          </ul>

          <h2>Minimum Withdrawal Rates</h2>

          <h3>2024 Minimum Percentages</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Age at Jan 1</th>
                <th>Minimum %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>71</td>
                <td>5.28%</td>
              </tr>
              <tr>
                <td>72</td>
                <td>5.40%</td>
              </tr>
              <tr>
                <td>75</td>
                <td>5.82%</td>
              </tr>
              <tr>
                <td>80</td>
                <td>6.82%</td>
              </tr>
              <tr>
                <td>85</td>
                <td>8.51%</td>
              </tr>
              <tr>
                <td>90</td>
                <td>11.92%</td>
              </tr>
              <tr>
                <td>95+</td>
                <td>20.00%</td>
              </tr>
            </tbody>
          </table>

          <h3>How Minimum Is Calculated</h3>
          <ul>
            <li>Based on January 1 account value</li>
            <li>Multiply by percentage for your age</li>
            <li>Can use spouse's age (if younger)</li>
            <li>Election must be made at RRIF setup</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Younger Spouse Strategy:</strong> Using a younger spouse's age for minimum calculation reduces forced withdrawals, allowing more tax-deferred growth.
            </p>
          </div>

          <h2>Tax Treatment</h2>

          <h3>Withdrawals Are Taxable</h3>
          <ul>
            <li>100% of withdrawals are income</li>
            <li>No withholding on minimum amount</li>
            <li>Withholding on excess (10-30%)</li>
            <li>Added to your taxable income</li>
          </ul>

          <h3>Withholding Tax Rates</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Excess Over Minimum</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $5,000</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>$5,001 - $15,000</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Over $15,000</td>
                <td>30%</td>
              </tr>
            </tbody>
          </table>
          <p>Quebec rates differ. Minimum withdrawal has no withholding.</p>

          <h2>Pension Income Amount</h2>

          <h3>Age 65+</h3>
          <ul>
            <li>RRIF income qualifies for pension income amount</li>
            <li>Up to $2,000 credit</li>
            <li>Worth up to ~$300 federal + provincial</li>
            <li>Also qualifies for pension splitting</li>
          </ul>

          <h3>Under Age 65</h3>
          <ul>
            <li>RRIF income does NOT qualify</li>
            <li>Unless from qualified pension</li>
            <li>No pension income splitting</li>
          </ul>

          <h2>Income Splitting</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Transfer up to 50% to spouse's return</li>
            <li>Both must be 65+ (for RRIF)</li>
            <li>Election made on return</li>
            <li>Form T1032</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>Reduce higher earner's tax bracket</li>
            <li>Minimize OAS clawback</li>
            <li>Both can claim pension income amount</li>
          </ul>

          <h2>RRIF Planning Strategies</h2>

          <h3>Withdraw More Than Minimum</h3>
          <p>Consider withdrawing extra when:</p>
          <ul>
            <li>Low income year (before OAS)</li>
            <li>Below OAS clawback threshold</li>
            <li>To fund TFSA contributions</li>
            <li>To equalize income over retirement</li>
          </ul>

          <h3>RRSP Meltdown Before 71</h3>
          <ul>
            <li>Withdraw from RRSP in 60s</li>
            <li>Convert to TFSA (after-tax)</li>
            <li>Reduces forced RRIF minimums</li>
            <li>Less income in 70s/80s</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>OAS Clawback Alert:</strong> RRIF minimums can push you over the OAS clawback threshold ($90,997 in 2024). Plan withdrawals strategically.
            </p>
          </div>

          <h3>Multiple RRIFs</h3>
          <ul>
            <li>Can have multiple RRIF accounts</li>
            <li>Each has its own minimum</li>
            <li>May simplify estate planning</li>
            <li>Consider consolidating for simplicity</li>
          </ul>

          <h2>Investment Considerations</h2>

          <h3>In-Kind Withdrawals</h3>
          <ul>
            <li>Can withdraw securities instead of cash</li>
            <li>FMV counts as withdrawal</li>
            <li>Security transfers to non-registered</li>
            <li>Useful for certain situations</li>
          </ul>

          <h3>Asset Allocation</h3>
          <ul>
            <li>Consider withdrawal needs</li>
            <li>Keep some liquid investments</li>
            <li>Balance growth vs stability</li>
            <li>Plan for decades potentially</li>
          </ul>

          <h2>RRIF at Death</h2>

          <h3>To Spouse</h3>
          <ul>
            <li>Can transfer to spouse's RRSP/RRIF tax-free</li>
            <li>No immediate tax</li>
            <li>Spouse continues withdrawals</li>
            <li>Designate as beneficiary</li>
          </ul>

          <h3>To Others</h3>
          <ul>
            <li>Full value included in final return</li>
            <li>Can be significant tax</li>
            <li>Financially dependent child/grandchild exceptions</li>
            <li>Estate planning important</li>
          </ul>

          <h3>Successor Annuitant</h3>
          <ul>
            <li>Spouse becomes RRIF holder</li>
            <li>Continues receiving payments</li>
            <li>No probate on RRIF assets</li>
          </ul>

          <h2>Common Questions</h2>

          <h3>Can I convert back to RRSP?</h3>
          <p>No. Once converted to RRIF, it cannot be converted back.</p>

          <h3>Can I skip a withdrawal?</h3>
          <p>No. Minimum withdrawal is mandatory each year.</p>

          <h3>What if I need more?</h3>
          <p>Withdraw any amount above minimum. Withholding tax applies on excess.</p>

          <h3>Do I need to withdraw in December of conversion year?</h3>
          <p>No minimum in year of conversion. First minimum due following year.</p>

          <h2>Reporting RRIF Income</h2>

          <h3>T4RIF Slip</h3>
          <ul>
            <li><strong>Box 16:</strong> RRIF income</li>
            <li><strong>Box 22:</strong> Tax withheld</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11500:</strong> Other pensions (RRIF income)</li>
            <li><strong>Line 31400:</strong> Pension income amount (age 65+)</li>
            <li><strong>Form T1032:</strong> For pension splitting</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About RRIFs?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about RRIF withdrawals and taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> RRIF planning involves many factors. Consider consulting a financial advisor for personalized strategies.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
