import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CRA Instalment Payments 2024 | Quarterly Tax Payments Canada',
  description: 'Complete guide to CRA instalment payments. Learn when you need to pay, calculation methods, due dates, and how to avoid interest charges on quarterly tax instalments.',
  keywords: 'CRA instalment payments, quarterly tax payments Canada, tax instalments due dates, self-employed instalments',
}

export default function InstalmentPaymentsPage() {
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
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            CRA Instalment Payments Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Pay-As-You-Go System</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            If you don't have enough tax withheld at source (self-employed, rental income, investments), CRA may require quarterly instalment payments to avoid a large balance owing at tax time.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Do I Need to Pay Instalments?</h2>

          <h3>General Rule</h3>
          <p>You may need to pay instalments if your net tax owing is more than:</p>
          <ul>
            <li><strong>$3,000</strong> in the current year AND either of the two previous years</li>
            <li><strong>$1,800</strong> for Quebec residents</li>
          </ul>

          <h3>Common Situations Requiring Instalments</h3>
          <ul>
            <li>Self-employment income</li>
            <li>Rental income</li>
            <li>Investment income (dividends, capital gains)</li>
            <li>Pension income without tax withheld</li>
            <li>Multiple income sources</li>
          </ul>

          <h2>Instalment Due Dates</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Quarter</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q1</td>
                <td>March 15</td>
              </tr>
              <tr>
                <td>Q2</td>
                <td>June 15</td>
              </tr>
              <tr>
                <td>Q3</td>
                <td>September 15</td>
              </tr>
              <tr>
                <td>Q4</td>
                <td>December 15</td>
              </tr>
            </tbody>
          </table>

          <h2>Three Calculation Methods</h2>

          <h3>Option 1: No-Calculation (CRA Tells You)</h3>
          <ul>
            <li>Use amounts on instalment reminder from CRA</li>
            <li>Easiest option</li>
            <li>Based on your previous years' tax</li>
            <li>No interest if you follow their amounts</li>
          </ul>

          <h3>Option 2: Prior-Year Method</h3>
          <ul>
            <li>Pay 1/4 of last year's net tax owing each quarter</li>
            <li>Good if income is similar year-to-year</li>
            <li>May result in balance owing or refund</li>
          </ul>

          <h3>Option 3: Current-Year Method</h3>
          <ul>
            <li>Estimate current year's tax owing</li>
            <li>Pay 1/4 each quarter</li>
            <li>Best if income decreased significantly</li>
            <li>Risk: Underestimate = interest charges</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> The CRA instalment reminder (mailed or in My Account) calculates your required instalments. Following these amounts guarantees no interest charges, even if you ultimately owe more.
            </p>
          </div>

          <h2>How to Pay Instalments</h2>

          <h3>Online Banking</h3>
          <ul>
            <li>Add CRA as payee</li>
            <li>Use your SIN as account number</li>
            <li>Select "Personal Tax Instalments"</li>
          </ul>

          <h3>CRA My Payment</h3>
          <ul>
            <li>Pay through CRA website</li>
            <li>Uses Interac or credit card (fees apply)</li>
            <li>Immediate confirmation</li>
          </ul>

          <h3>Pre-Authorized Debit</h3>
          <ul>
            <li>Set up automatic payments</li>
            <li>Never miss a deadline</li>
            <li>Manage through My Account</li>
          </ul>

          <h2>Interest and Penalties</h2>

          <h3>Instalment Interest</h3>
          <ul>
            <li>Charged if instalments are late or insufficient</li>
            <li>Prescribed rate + 2% (currently ~7-8%)</li>
            <li>Calculated daily, compounded daily</li>
          </ul>

          <h3>When Interest Is NOT Charged</h3>
          <ul>
            <li>Total instalments + withholdings ≥ required amount</li>
            <li>Net tax owing is ≤ $3,000</li>
            <li>You paid CRA's suggested amounts</li>
          </ul>

          <h2>First Year of Instalments</h2>
          <p>If you didn't pay instalments last year but need to this year:</p>
          <ul>
            <li>You may not receive a reminder</li>
            <li>Estimate your tax and pay quarterly</li>
            <li>First-time payers sometimes get leniency</li>
          </ul>

          <h2>Strategies to Manage Instalments</h2>

          <h3>Increase Source Deductions</h3>
          <ul>
            <li>Ask employer to withhold extra tax (Form TD1)</li>
            <li>Increases withholding on employment income</li>
            <li>Reduces or eliminates instalment requirement</li>
          </ul>

          <h3>Set Money Aside</h3>
          <ul>
            <li>Transfer 25-30% of non-employment income to savings</li>
            <li>Use for quarterly payments</li>
            <li>Earn interest while you wait</li>
          </ul>

          <h3>Pay Early If Possible</h3>
          <ul>
            <li>Early payments reduce interest charges</li>
            <li>Can offset late payments in other quarters</li>
          </ul>

          <h2>What If You Can't Pay?</h2>

          <h3>Pay What You Can</h3>
          <p>Partial payment is better than no payment. Interest only charged on unpaid portion.</p>

          <h3>Contact CRA</h3>
          <ul>
            <li>Explain your situation</li>
            <li>May arrange payment plan</li>
            <li>Financial hardship provisions exist</li>
          </ul>

          <h2>Instalments for Corporations</h2>
          <p>Different rules apply:</p>
          <ul>
            <li>Monthly instalments (larger corporations)</li>
            <li>Quarterly for small CCPCs</li>
            <li>Based on previous year or estimated current year</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Ignoring reminders:</strong> Interest adds up quickly</li>
            <li><strong>Wrong payment type:</strong> Ensure it's "instalments" not "balance owing"</li>
            <li><strong>Forgetting December:</strong> Q4 is often missed</li>
            <li><strong>Not adjusting for income changes:</strong> Update estimates as needed</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Instalments?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about instalment payments.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Instalment requirements depend on your specific situation. Consult CRA or a tax professional if unsure.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
