import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Banknote, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Severance Pay Tax Canada 2024 | How Severance Is Taxed',
  description: 'Complete guide to severance pay taxation in Canada. Learn how severance is taxed, RRSP transfer options, retiring allowance rules, and tax planning strategies.',
  keywords: 'severance pay tax Canada, retiring allowance, severance RRSP transfer, termination pay tax, lump sum severance tax',
}

export default function SeverancePayTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Banknote className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Severance Pay Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Severance Is Taxable</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Severance pay (also called retiring allowance) is fully taxable as income. However, special RRSP transfer rules may allow you to shelter some or all of it from immediate taxation.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Qualifies as Severance?</h2>

          <h3>Retiring Allowance Includes</h3>
          <ul>
            <li>Severance or termination pay</li>
            <li>Payment for loss of office</li>
            <li>Retirement incentive payments</li>
            <li>Damages for wrongful dismissal</li>
            <li>Payment for unused sick leave (in some cases)</li>
          </ul>

          <h3>Not Included</h3>
          <ul>
            <li>Payment in lieu of notice (regular salary)</li>
            <li>Vacation pay (regular income)</li>
            <li>Pension benefits</li>
            <li>Death benefits (different rules)</li>
          </ul>

          <h2>How Severance Is Taxed</h2>

          <h3>Lump Sum Payment</h3>
          <ul>
            <li>Employer withholds tax at source</li>
            <li>Withholding rates for lump sums:</li>
          </ul>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Withholding Rate</th>
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
          <p>Quebec: Add provincial withholding</p>

          <h3>Actual Tax Rate</h3>
          <ul>
            <li>Withholding is not final tax</li>
            <li>Actual tax at your marginal rate</li>
            <li>May owe more or get refund</li>
            <li>Depends on total annual income</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Large severance in a high-income year can push you into top tax brackets. A $100,000 severance could result in $45,000+ in taxes without planning.
            </p>
          </div>

          <h2>RRSP Transfer Rules</h2>

          <h3>Eligible Rollover Amount</h3>
          <p>You can transfer severance directly to RRSP for:</p>
          <ul>
            <li><strong>$2,000</strong> per year of service before 1996</li>
            <li><strong>Plus $1,500</strong> per year before 1989 if no pension</li>
            <li>This is IN ADDITION to regular RRSP room</li>
          </ul>

          <h3>Example Calculation</h3>
          <p>Employee worked from 1985 to 2024:</p>
          <ul>
            <li>Years before 1996: 11 (1985-1995)</li>
            <li>Years before 1989 (no pension): 4 (1985-1988)</li>
            <li>Eligible transfer:</li>
            <li>11 × $2,000 = $22,000</li>
            <li>Plus 4 × $1,500 = $6,000 (if no pension)</li>
            <li>Total eligible: $28,000</li>
          </ul>

          <h3>Direct Transfer Requirement</h3>
          <ul>
            <li>Must transfer directly to RRSP</li>
            <li>Employer transfers on your behalf</li>
            <li>No tax withheld on transferred amount</li>
            <li>Report on T4A but offset by RRSP deduction</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Important:</strong> You have until 60 days after year-end to transfer, but direct transfer from employer is much simpler. Coordinate with HR before your departure.
            </p>
          </div>

          <h2>Using Regular RRSP Room</h2>

          <h3>Beyond the Eligible Amount</h3>
          <ul>
            <li>Use existing RRSP contribution room</li>
            <li>Receive severance, contribute to RRSP</li>
            <li>Claim deduction to offset income</li>
            <li>Reduces tax on severance</li>
          </ul>

          <h3>Strategic Approach</h3>
          <ol>
            <li>Calculate eligible rollover (pre-1996 service)</li>
            <li>Have employer transfer that amount directly</li>
            <li>Receive balance as taxable</li>
            <li>Contribute from taxable portion using RRSP room</li>
            <li>Claim deductions on return</li>
          </ol>

          <h2>Spreading Severance Over Years</h2>

          <h3>Salary Continuance</h3>
          <ul>
            <li>Receive severance as ongoing payments</li>
            <li>Spreads income over multiple tax years</li>
            <li>May keep you in lower brackets</li>
            <li>Negotiate with employer if possible</li>
          </ul>

          <h3>Structured Settlements</h3>
          <ul>
            <li>Court awards may be spread over time</li>
            <li>Tax planning opportunity</li>
            <li>Professional advice recommended</li>
          </ul>

          <h2>Severance and EI</h2>

          <h3>Impact on EI Eligibility</h3>
          <ul>
            <li>Severance doesn't disqualify from EI</li>
            <li>But may delay start date</li>
            <li>Allocated over insurable weeks</li>
            <li>Contact Service Canada for specifics</li>
          </ul>

          <h3>Tax Planning</h3>
          <ul>
            <li>Severance in Year 1</li>
            <li>EI benefits possibly in Year 2</li>
            <li>May result in lower total tax</li>
          </ul>

          <h2>Reporting Severance</h2>

          <h3>T4A Slip</h3>
          <p>Employer issues T4A showing:</p>
          <ul>
            <li><strong>Box 26:</strong> Retiring allowance (eligible for transfer)</li>
            <li><strong>Box 27:</strong> Retiring allowance (non-eligible)</li>
            <li><strong>Box 22:</strong> Income tax deducted</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 13000:</strong> Other income (from Box 26, 27)</li>
            <li><strong>Line 20800:</strong> RRSP deduction (if contributed)</li>
            <li>Net effect reduces taxable income</li>
          </ul>

          <h2>Tax Planning Strategies</h2>

          <h3>Maximize RRSP Transfers</h3>
          <ul>
            <li>Calculate your eligible amount</li>
            <li>Use all pre-1996 service room</li>
            <li>Coordinate with employer</li>
          </ul>

          <h3>Time Your Departure</h3>
          <ul>
            <li>January termination spreads income</li>
            <li>December receives all in one year</li>
            <li>Consider your total annual income</li>
          </ul>

          <h3>Negotiate Payment Structure</h3>
          <ul>
            <li>Lump sum vs salary continuance</li>
            <li>Direct RRSP transfer</li>
            <li>Timing of payments</li>
          </ul>

          <h3>Consider TFSA</h3>
          <ul>
            <li>After-tax severance to TFSA</li>
            <li>Grows tax-free</li>
            <li>Available for emergencies</li>
          </ul>

          <h2>Wrongful Dismissal Awards</h2>

          <h3>Court Awards</h3>
          <ul>
            <li>Damages for wrongful dismissal = retiring allowance</li>
            <li>Generally taxable</li>
            <li>Legal fees may be deductible</li>
            <li>Interest component may be taxable</li>
          </ul>

          <h3>Settlements</h3>
          <ul>
            <li>Settlement payments typically taxable</li>
            <li>Allocate between different components</li>
            <li>Legal advice recommended</li>
          </ul>

          <h2>Legal Fees</h2>
          <ul>
            <li>Fees to collect severance may be deductible</li>
            <li>Claim on Line 23200</li>
            <li>Limited to retiring allowance received (minus transfers)</li>
            <li>Keep detailed receipts</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Severance Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about severance pay taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Severance situations vary significantly. Professional tax and legal advice is recommended for large amounts.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
