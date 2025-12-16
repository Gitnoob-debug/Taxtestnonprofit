import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Landmark, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RRSP Guide Canada 2025 | Contribution Limits, Rules & Strategies',
  description: 'Complete RRSP guide for Canadians. Learn about contribution limits ($32,490 for 2025), deadline, deduction rules, withdrawal options, and strategies to maximize your retirement savings.',
  keywords: 'RRSP contribution limit 2025, RRSP deadline, RRSP deduction, Home Buyers Plan, RRSP withdrawal rules',
}

export default function RRSPGuidePage() {
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
              <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            RRSP Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Tax-Deferred Retirement Savings</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            RRSPs let you defer taxes to retirement when you'll likely be in a lower tax bracket. Contributions reduce your taxable income now, and investments grow tax-free until withdrawal.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>RRSP Contribution Limits</h2>

          <h3>2025 Limits</h3>
          <ul>
            <li><strong>Maximum:</strong> $32,490 (2024: $31,560)</li>
            <li><strong>Or:</strong> 18% of previous year's earned income</li>
            <li>Whichever is less</li>
          </ul>

          <h3>Your Deduction Limit</h3>
          <p>Found on your Notice of Assessment:</p>
          <ul>
            <li>Base contribution room</li>
            <li>Plus unused room from previous years</li>
            <li>Minus pension adjustment (PA)</li>
            <li>Plus pension adjustment reversal (PAR)</li>
          </ul>

          <h3>2024 Deadline</h3>
          <p>For the 2024 tax year:</p>
          <ul>
            <li><strong>Deadline:</strong> March 3, 2025 (first 60 days of 2025)</li>
            <li>Contributions in first 60 days can apply to previous year</li>
            <li>Or current year—your choice</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Check your RRSP deduction limit in CRA My Account. It's updated after your return is assessed. Unused room carries forward indefinitely.
            </p>
          </div>

          <h2>How RRSP Tax Deduction Works</h2>

          <h3>The Tax Benefit</h3>
          <ul>
            <li>Contribution reduces taxable income</li>
            <li>Tax savings = contribution × marginal rate</li>
            <li>Example: $10,000 at 40% rate = $4,000 tax savings</li>
          </ul>

          <h3>Strategic Deduction Timing</h3>
          <ul>
            <li>Can contribute now, deduct later</li>
            <li>Useful if expecting higher income next year</li>
            <li>Carry forward deduction to better year</li>
          </ul>

          <h2>Types of RRSPs</h2>

          <h3>Individual RRSP</h3>
          <ul>
            <li>Most common type</li>
            <li>You contribute, you deduct</li>
            <li>Your retirement savings</li>
          </ul>

          <h3>Spousal RRSP</h3>
          <ul>
            <li>You contribute, spouse owns</li>
            <li>You get the deduction</li>
            <li>Spouse withdraws (their income)</li>
            <li>Income splitting strategy</li>
            <li>3-year attribution rule applies</li>
          </ul>

          <h3>Group RRSP</h3>
          <ul>
            <li>Through employer</li>
            <li>Often with matching contributions</li>
            <li>Payroll deductions</li>
            <li>Uses your RRSP room</li>
          </ul>

          <h2>RRSP Investments</h2>

          <h3>Qualified Investments</h3>
          <ul>
            <li>Cash and GICs</li>
            <li>Stocks (Canadian and foreign)</li>
            <li>Bonds</li>
            <li>Mutual funds and ETFs</li>
            <li>Some mortgages</li>
          </ul>

          <h3>Investment Strategy</h3>
          <ul>
            <li>Good for interest-bearing investments</li>
            <li>Interest fully taxable outside RRSP</li>
            <li>Foreign dividends avoid withholding issues</li>
            <li>Consider asset allocation across accounts</li>
          </ul>

          <h2>RRSP Withdrawals</h2>

          <h3>Regular Withdrawals</h3>
          <ul>
            <li>Taxed as income when withdrawn</li>
            <li>Withholding tax at source</li>
            <li>Added to taxable income</li>
            <li>Can affect government benefits</li>
          </ul>

          <h3>Withholding Tax Rates</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Amount</th>
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
          <p>Quebec rates differ. Withholding is not final tax—settle at filing.</p>

          <h2>Home Buyers' Plan (HBP)</h2>
          <p>Withdraw for first home purchase:</p>
          <ul>
            <li><strong>Maximum:</strong> $35,000 per person ($70,000 per couple)</li>
            <li>Must be first-time buyer</li>
            <li>Repay over 15 years (1/15 per year)</li>
            <li>No tax if repaid on time</li>
            <li>Miss repayment = added to income</li>
          </ul>

          <h2>Lifelong Learning Plan (LLP)</h2>
          <p>Withdraw for education:</p>
          <ul>
            <li><strong>Maximum:</strong> $10,000/year, $20,000 total</li>
            <li>For you or spouse's education</li>
            <li>Full-time qualifying program</li>
            <li>Repay over 10 years</li>
          </ul>

          <h2>Over-Contributions</h2>

          <h3>$2,000 Buffer</h3>
          <ul>
            <li>Can over-contribute up to $2,000</li>
            <li>No penalty on this buffer</li>
            <li>But no deduction either</li>
            <li>Grows tax-sheltered</li>
          </ul>

          <h3>Penalty for Excess</h3>
          <ul>
            <li>1% per month on amount over $2,000</li>
            <li>Must withdraw excess</li>
            <li>File T1-OVP form</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Track your contributions carefully. Group RRSP contributions through payroll use your room too. Check CRA My Account regularly.
            </p>
          </div>

          <h2>Converting RRSP to RRIF</h2>

          <h3>RRIF Deadline</h3>
          <ul>
            <li>Must convert by December 31 of year you turn 71</li>
            <li>Can convert earlier</li>
            <li>Minimum withdrawal required annually</li>
          </ul>

          <h3>RRIF Alternatives at 71</h3>
          <ul>
            <li>Convert to RRIF (most common)</li>
            <li>Buy an annuity</li>
            <li>Withdraw entire amount (big tax hit)</li>
          </ul>

          <h2>RRSP Strategies</h2>

          <h3>Maximize Employer Matching</h3>
          <ul>
            <li>Free money—always contribute enough to get full match</li>
            <li>Often 50-100% match up to limit</li>
            <li>Immediate 50-100% return</li>
          </ul>

          <h3>High Income Years</h3>
          <ul>
            <li>Maximize contributions in high-earning years</li>
            <li>Deduction worth more at higher rates</li>
            <li>Carry forward room for peak earning years</li>
          </ul>

          <h3>Use Refund Wisely</h3>
          <ul>
            <li>Reinvest tax refund into RRSP</li>
            <li>Or into TFSA</li>
            <li>Pay down high-interest debt</li>
          </ul>

          <h3>RRSP Meltdown</h3>
          <ul>
            <li>Strategic withdrawals in low-income years</li>
            <li>Before OAS begins (to avoid clawback)</li>
            <li>Equalizes income across retirement</li>
          </ul>

          <h2>RRSP vs TFSA</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Situation</th>
                <th>Best Choice</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>High income now</td>
                <td>RRSP</td>
              </tr>
              <tr>
                <td>Low income now</td>
                <td>TFSA</td>
              </tr>
              <tr>
                <td>Employer matching</td>
                <td>RRSP</td>
              </tr>
              <tr>
                <td>Emergency fund</td>
                <td>TFSA</td>
              </tr>
              <tr>
                <td>Near retirement</td>
                <td>Depends</td>
              </tr>
              <tr>
                <td>Want flexibility</td>
                <td>TFSA</td>
              </tr>
            </tbody>
          </table>

          <h2>RRSP at Death</h2>

          <h3>To Spouse</h3>
          <ul>
            <li>Transfers tax-free to spouse's RRSP/RRIF</li>
            <li>No tax until spouse withdraws</li>
            <li>Designate spouse as beneficiary</li>
          </ul>

          <h3>To Others</h3>
          <ul>
            <li>Full value included in final return</li>
            <li>Can be substantial tax hit</li>
            <li>May need to plan around this</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About RRSPs?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about your RRSP strategy.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> RRSP strategies depend on your individual circumstances. Consider consulting a financial advisor.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
