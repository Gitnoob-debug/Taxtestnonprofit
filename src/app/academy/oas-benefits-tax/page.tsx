import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Landmark, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'OAS Benefits & Clawback Canada 2024 | Old Age Security Guide',
  description: 'Complete guide to Old Age Security taxation in Canada. Learn about OAS eligibility, clawback thresholds, GIS supplement, and strategies to minimize OAS recovery tax.',
  keywords: 'OAS clawback 2024, Old Age Security tax, OAS recovery tax, GIS supplement, OAS eligibility Canada',
}

export default function OASBenefitsTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-2.5 rounded-xl">
              <Landmark className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            OAS Benefits & Clawback Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">OAS Is Taxable—And Clawable</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            Old Age Security is taxable income and is subject to clawback (recovery tax) if your income exceeds $90,997 (2024). Understanding these rules is crucial for retirement income planning.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>OAS Eligibility</h2>

          <h3>Basic Requirements</h3>
          <ul>
            <li>Age 65 or older</li>
            <li>Canadian citizen or legal resident</li>
            <li>10 years of residence after age 18 (if in Canada)</li>
            <li>20 years residence (if outside Canada)</li>
          </ul>

          <h3>2024 Benefit Amounts</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Age</th>
                <th>Maximum Monthly</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>65-74</td>
                <td>$713.34</td>
              </tr>
              <tr>
                <td>75+</td>
                <td>$784.67</td>
              </tr>
            </tbody>
          </table>

          <h3>Partial OAS</h3>
          <ul>
            <li>If less than 40 years residence</li>
            <li>Receive 1/40 per year of residence</li>
            <li>Minimum 10 years required</li>
          </ul>

          <h2>OAS Clawback (Recovery Tax)</h2>

          <h3>2024 Thresholds</h3>
          <ul>
            <li><strong>Clawback starts:</strong> $90,997 net income</li>
            <li><strong>Full clawback:</strong> ~$148,000+ (no OAS)</li>
            <li><strong>Recovery rate:</strong> 15% of excess income</li>
          </ul>

          <h3>How Clawback Works</h3>
          <ul>
            <li>For every $1 over threshold, lose 15¢ of OAS</li>
            <li>$10,000 over = $1,500 clawback</li>
            <li>Effective marginal rate increased</li>
            <li>Calculated based on Line 23400 net income</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Example:</strong> If net income is $100,997 ($10,000 over threshold), clawback = $10,000 × 15% = $1,500/year. You'll receive $1,500 less in OAS.
            </p>
          </div>

          <h3>Clawback Timing</h3>
          <ul>
            <li>Based on previous year's tax return</li>
            <li>Applies to benefits July-June</li>
            <li>Adjusted at source if known</li>
            <li>Reconciled on next year's return</li>
          </ul>

          <h2>Delaying OAS</h2>

          <h3>Deferral Benefits</h3>
          <ul>
            <li>Can delay OAS up to age 70</li>
            <li>Increase of 0.6% per month delayed</li>
            <li>Maximum 36% increase at age 70</li>
            <li>Permanently higher payments</li>
          </ul>

          <h3>When Deferral Makes Sense</h3>
          <ul>
            <li>High income until 70 (would be clawed back)</li>
            <li>Good health, expect longevity</li>
            <li>Don't need the money immediately</li>
            <li>Break-even around age 82</li>
          </ul>

          <h3>When to Start at 65</h3>
          <ul>
            <li>Need the income now</li>
            <li>Health concerns</li>
            <li>Income under clawback threshold</li>
            <li>Lower life expectancy</li>
          </ul>

          <h2>Guaranteed Income Supplement (GIS)</h2>

          <h3>Eligibility</h3>
          <ul>
            <li>Receive OAS</li>
            <li>Low income (under ~$21,624 single)</li>
            <li>Canadian resident</li>
            <li>Must apply annually</li>
          </ul>

          <h3>Tax Treatment</h3>
          <ul>
            <li><strong>GIS is not taxable</strong></li>
            <li>Doesn't appear on T4A(OAS)</li>
            <li>Still affects benefit calculations</li>
          </ul>

          <h3>GIS Clawback</h3>
          <ul>
            <li>Reduced by 50% of income over threshold</li>
            <li>Very high effective tax rate</li>
            <li>Income planning critical</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>TFSA for GIS:</strong> TFSA withdrawals don't count as income for GIS purposes. Building TFSA before retirement can maximize GIS eligibility.
            </p>
          </div>

          <h2>Strategies to Minimize Clawback</h2>

          <h3>Income Splitting</h3>
          <ul>
            <li>Pension income splitting (up to 50%)</li>
            <li>Split RRIF income with spouse</li>
            <li>Reduce higher earner's income below threshold</li>
          </ul>

          <h3>TFSA Strategy</h3>
          <ul>
            <li>Maximize TFSA contributions before retirement</li>
            <li>TFSA withdrawals don't trigger clawback</li>
            <li>Shift income from RRIF to TFSA earlier</li>
          </ul>

          <h3>RRSP Meltdown</h3>
          <ul>
            <li>Withdraw from RRSP before 65</li>
            <li>When income is lower</li>
            <li>Reduce RRIF minimum amounts later</li>
            <li>Less income in OAS years</li>
          </ul>

          <h3>Timing Capital Gains</h3>
          <ul>
            <li>Capital gains add to net income</li>
            <li>Realize gains in years under threshold</li>
            <li>Or after age 70 if delaying OAS</li>
          </ul>

          <h3>Corporate Retained Earnings</h3>
          <ul>
            <li>For business owners</li>
            <li>Leave money in corporation</li>
            <li>Withdraw strategically in retirement</li>
          </ul>

          <h2>What Counts Toward Clawback</h2>

          <h3>Included in Net Income</h3>
          <ul>
            <li>Employment income</li>
            <li>Pension income (RPP, RRIF)</li>
            <li>CPP/QPP benefits</li>
            <li>Investment income (interest, dividends, capital gains)</li>
            <li>Rental income</li>
            <li>Foreign pension income</li>
          </ul>

          <h3>NOT Included</h3>
          <ul>
            <li>TFSA withdrawals</li>
            <li>GIS payments</li>
            <li>Gifts and inheritances</li>
            <li>Tax-free portion of capital gains (principal residence)</li>
          </ul>

          <h2>Reporting OAS on Tax Return</h2>

          <h3>T4A(OAS) Slip</h3>
          <ul>
            <li><strong>Box 18:</strong> OAS pension</li>
            <li><strong>Box 22:</strong> Tax withheld</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11300:</strong> OAS pension</li>
            <li><strong>Line 23500:</strong> Social benefits repayment (clawback)</li>
          </ul>

          <h2>OAS at Death</h2>

          <h3>Survivor Benefits</h3>
          <ul>
            <li>No survivor OAS (it's individual)</li>
            <li>Allowance for Survivor (if eligible)</li>
            <li>Payment stops at death</li>
          </ul>

          <h3>Final Return</h3>
          <ul>
            <li>Report OAS received to date of death</li>
            <li>May affect clawback calculation</li>
          </ul>

          <h2>Non-Residents</h2>

          <h3>OAS Outside Canada</h3>
          <ul>
            <li>Can receive OAS if 20+ years residence</li>
            <li>Subject to 25% non-resident withholding</li>
            <li>Tax treaties may reduce rate</li>
            <li>No GIS if non-resident</li>
          </ul>

          <h2>2024 Key Numbers</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maximum OAS (65-74)</td>
                <td>$713.34/month</td>
              </tr>
              <tr>
                <td>Maximum OAS (75+)</td>
                <td>$784.67/month</td>
              </tr>
              <tr>
                <td>Clawback threshold</td>
                <td>$90,997</td>
              </tr>
              <tr>
                <td>Full clawback (approx)</td>
                <td>$148,000+</td>
              </tr>
              <tr>
                <td>Deferral increase</td>
                <td>0.6%/month</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About OAS?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about OAS benefits and clawback.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> OAS rules change periodically. Verify current amounts and thresholds with Service Canada.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
