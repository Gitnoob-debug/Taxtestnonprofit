import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Filing Deadlines 2026 | Important Dates & Penalties',
  description: 'Complete guide to Canadian tax deadlines for 2026 (2025 tax year). Learn filing due dates for individuals, self-employed, corporations, RRSP deadlines, and penalties for late filing.',
  keywords: 'tax deadline Canada 2026, CRA filing deadline, when are taxes due Canada, late filing penalty CRA, RRSP deadline 2026, 2025 tax year',
}

export default function TaxFilingDeadlinesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-2.5 rounded-xl">
              <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Canadian Tax Filing Deadlines 2026
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated for 2025 Tax Year</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Key 2026 Deadline</h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            For most Canadians, the 2026 tax return (for 2025 income) is due <strong>April 30, 2026</strong>. Self-employed individuals have until June 15, 2026, but any balance owing is still due April 30.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Key Tax Deadlines for 2026 (Filing 2025 Tax Year)</h2>

          <h3>Personal Tax Return Deadlines</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Who</th>
                <th>Filing Deadline</th>
                <th>Payment Deadline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Employees</td>
                <td>April 30, 2026</td>
                <td>April 30, 2026</td>
              </tr>
              <tr>
                <td>Self-employed</td>
                <td>June 15, 2026</td>
                <td>April 30, 2026</td>
              </tr>
              <tr>
                <td>Deceased (Jan-Oct death)</td>
                <td>April 30 following year</td>
                <td>April 30 following year</td>
              </tr>
              <tr>
                <td>Deceased (Nov-Dec death)</td>
                <td>6 months after death</td>
                <td>6 months after death</td>
              </tr>
            </tbody>
          </table>

          <h3>RRSP Contribution Deadline</h3>
          <ul>
            <li><strong>For 2025 tax year:</strong> March 2, 2026</li>
            <li><strong>For 2026 tax year:</strong> March 1, 2027</li>
            <li>First 60 days of the year count for prior year</li>
          </ul>

          <h3>TFSA Contribution</h3>
          <ul>
            <li>No deadline—contribute anytime during the year</li>
            <li>New room available January 1 each year</li>
            <li>2025 limit: $7,000 (2026 TBD)</li>
          </ul>

          <h2>Quarterly Instalment Deadlines</h2>
          <p>If you owe more than $3,000 in taxes (or $1,800 in Quebec), you may need to pay instalments:</p>
          <ul>
            <li><strong>March 15</strong></li>
            <li><strong>June 15</strong></li>
            <li><strong>September 15</strong></li>
            <li><strong>December 15</strong></li>
          </ul>

          <h2>Business Tax Deadlines</h2>

          <h3>Corporations</h3>
          <ul>
            <li><strong>Filing:</strong> 6 months after fiscal year-end</li>
            <li><strong>Payment:</strong> 2-3 months after fiscal year-end (depending on size)</li>
            <li><strong>T4/T5 slips:</strong> Last day of February</li>
          </ul>

          <h3>GST/HST Returns</h3>
          <ul>
            <li><strong>Annual filers:</strong> 3 months after fiscal year-end</li>
            <li><strong>Quarterly filers:</strong> 1 month after quarter-end</li>
            <li><strong>Monthly filers:</strong> 1 month after month-end</li>
          </ul>

          <h2>Penalties for Late Filing</h2>

          <h3>Late Filing Penalty</h3>
          <ul>
            <li><strong>Initial penalty:</strong> 5% of balance owing</li>
            <li><strong>Plus:</strong> 1% for each full month late (max 12 months)</li>
            <li><strong>Maximum:</strong> 17% of balance owing</li>
            <li><strong>Repeat offenders:</strong> 10% + 2% per month (max 20 months)</li>
          </ul>

          <h3>Late Payment Interest</h3>
          <ul>
            <li>Compound daily interest on unpaid amounts</li>
            <li>CRA prescribed rate + 4%</li>
            <li>Currently around 9-10% annually</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Tip:</strong> Even if you can't pay, file on time. The late filing penalty is much higher than late payment interest. File by the deadline and set up a payment arrangement with CRA.
            </p>
          </div>

          <h2>What Happens If You Miss the Deadline</h2>

          <h3>File Anyway</h3>
          <ul>
            <li>Penalties stop accruing once you file</li>
            <li>You may still get a refund</li>
            <li>Benefits require filing (CCB, GST credit)</li>
          </ul>

          <h3>Request Penalty Relief</h3>
          <p>CRA may waive penalties if you have:</p>
          <ul>
            <li>Serious illness or accident</li>
            <li>Natural disaster</li>
            <li>Death in immediate family</li>
            <li>CRA delays or errors</li>
          </ul>

          <h2>Important 2026 Dates Calendar (2025 Tax Year)</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Date</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January 1, 2026</td>
                <td>New TFSA room available</td>
              </tr>
              <tr>
                <td>February 28, 2026</td>
                <td>T4, T5, T3 slips issued to you</td>
              </tr>
              <tr>
                <td>March 2, 2026</td>
                <td>RRSP deadline for 2025 tax year</td>
              </tr>
              <tr>
                <td>March 15, 2026</td>
                <td>First instalment payment</td>
              </tr>
              <tr>
                <td>April 30, 2026</td>
                <td>Tax return & payment due (most filers)</td>
              </tr>
              <tr>
                <td>June 15, 2026</td>
                <td>Self-employed filing deadline</td>
              </tr>
            </tbody>
          </table>

          <h2>Tips for Meeting Deadlines</h2>
          <ul>
            <li><strong>File electronically:</strong> Faster processing, instant confirmation</li>
            <li><strong>Register for My Account:</strong> Access slips and NOA online</li>
            <li><strong>Set up direct deposit:</strong> Get refunds faster</li>
            <li><strong>Keep records organized:</strong> Easier to file quickly</li>
            <li><strong>Use auto-fill:</strong> CRA pre-populates your return</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Deadlines?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about filing deadlines and penalties.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Deadlines may change. Always verify current dates on the CRA website.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
