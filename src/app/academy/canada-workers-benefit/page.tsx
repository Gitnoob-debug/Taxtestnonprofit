import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canada Workers Benefit (CWB) 2024 | Refundable Tax Credit Guide',
  description: 'Complete guide to the Canada Workers Benefit. Learn eligibility, income thresholds, disability supplement, advance payments, and how to maximize your CWB.',
  keywords: 'Canada Workers Benefit, CWB 2024, working income tax benefit, low income tax credit Canada, CWB disability supplement',
}

export default function CanadaWorkersBenefitPage() {
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
              <Briefcase className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Canada Workers Benefit (CWB): Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Refundable Tax Credit</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            The CWB is a refundable tax credit—you receive it even if you owe no taxes. It's designed to encourage low-income Canadians to enter and stay in the workforce by supplementing their earnings.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>2024 Maximum Benefits</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Category</th>
                <th>Maximum Basic</th>
                <th>Disability Supplement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single individual</td>
                <td>$1,518</td>
                <td>$784</td>
              </tr>
              <tr>
                <td>Family (couple or single parent)</td>
                <td>$2,616</td>
                <td>$784</td>
              </tr>
            </tbody>
          </table>

          <h2>Eligibility Requirements</h2>
          <p>To qualify for the CWB, you must:</p>
          <ul>
            <li>Be a Canadian resident throughout the year</li>
            <li>Be 19 years old or older on December 31, OR have a spouse/common-law partner, OR be a parent living with your child</li>
            <li>Have working income (employment or self-employment)</li>
            <li>Not be a full-time student for more than 13 weeks (unless you have a dependant)</li>
            <li>Not be in prison for 90+ days during the year</li>
          </ul>

          <h3>Income Limits (2024)</h3>
          <p>For most provinces (excluding Alberta, Quebec, and Nunavut which have variations):</p>
          <ul>
            <li><strong>Single:</strong> Net income under ~$33,000</li>
            <li><strong>Family:</strong> Family net income under ~$43,000</li>
          </ul>

          <h2>How the CWB Is Calculated</h2>

          <h3>Phase-In</h3>
          <p>The benefit increases as your working income rises:</p>
          <ul>
            <li><strong>Single:</strong> 27% of working income over $3,000</li>
            <li><strong>Family:</strong> 27% of working income over $3,000</li>
          </ul>

          <h3>Maximum Benefit</h3>
          <p>You receive the maximum when working income reaches:</p>
          <ul>
            <li><strong>Single:</strong> Around $9,000</li>
            <li><strong>Family:</strong> Around $13,000</li>
          </ul>

          <h3>Phase-Out</h3>
          <p>The benefit decreases as adjusted net income exceeds threshold:</p>
          <ul>
            <li><strong>Single:</strong> Reduced by 15% of income over ~$23,000</li>
            <li><strong>Family:</strong> Reduced by 15% of family income over ~$26,000</li>
          </ul>

          <h2>Disability Supplement</h2>
          <p>If you're approved for the Disability Tax Credit (DTC), you may also receive the CWB Disability Supplement:</p>
          <ul>
            <li><strong>Maximum:</strong> $784 for 2024</li>
            <li>Both spouses can claim if both have DTC approval</li>
            <li>Same phase-in/phase-out structure as basic CWB</li>
          </ul>

          <h2>Example Calculations</h2>

          <h3>Single Worker</h3>
          <p>Sarah earns $18,000 at her job and has net income of $18,000:</p>
          <ul>
            <li>Working income over $3,000: $15,000</li>
            <li>Phase-in: $15,000 × 27% = $4,050</li>
            <li>Capped at maximum: $1,518</li>
            <li>No phase-out yet (income under $23,000)</li>
            <li><strong>CWB received: $1,518</strong></li>
          </ul>

          <h3>Single Worker with Higher Income</h3>
          <p>James earns $28,000:</p>
          <ul>
            <li>Starts with maximum: $1,518</li>
            <li>Income over phase-out threshold: $28,000 - $23,000 = $5,000</li>
            <li>Phase-out: $5,000 × 15% = $750</li>
            <li><strong>CWB received: $1,518 - $750 = $768</strong></li>
          </ul>

          <h2>Advance Payments (ACWB)</h2>
          <p>You can receive up to 50% of your expected CWB in advance quarterly payments:</p>

          <h3>How to Apply</h3>
          <ul>
            <li>Complete Schedule 6 with your tax return</li>
            <li>Check box for advance payments</li>
            <li>CRA calculates and sends payments throughout the year</li>
          </ul>

          <h3>Payment Schedule</h3>
          <ul>
            <li><strong>July:</strong> First advance payment</li>
            <li><strong>October:</strong> Second payment</li>
            <li><strong>January:</strong> Third payment</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Caution:</strong> If your income increases during the year, you may receive more advance payments than you're entitled to. This creates a balance owing on your next tax return.
            </p>
          </div>

          <h2>Provincial Variations</h2>
          <p>Some provinces have modified CWB programs:</p>

          <h3>Alberta</h3>
          <p>Higher thresholds but same maximum benefits.</p>

          <h3>Quebec</h3>
          <p>Quebec has its own program called the Work Premium (Prime au travail) instead of the CWB.</p>

          <h3>Nunavut</h3>
          <p>Modified thresholds reflecting higher cost of living.</p>

          <h2>Second Earner Exemption</h2>
          <p>For couples, the lower-earning spouse can exclude up to $14,000 of their working income when calculating the family's adjusted net income for the phase-out. This helps families where both spouses work.</p>

          <h2>How to Claim</h2>
          <ol>
            <li>Complete your tax return with all income reported</li>
            <li>Fill out Schedule 6 (Canada Workers Benefit)</li>
            <li>CRA automatically calculates your entitlement</li>
            <li>Credit is applied to your refund or balance owing</li>
          </ol>

          <h2>CWB vs. Other Benefits</h2>

          <h3>Impact on Other Credits</h3>
          <p>The CWB is separate from and doesn't reduce:</p>
          <ul>
            <li>GST/HST Credit</li>
            <li>Canada Child Benefit</li>
            <li>Provincial benefits</li>
          </ul>

          <h3>Interaction with EI</h3>
          <p>EI benefits count as income for phase-out purposes but not as "working income" for the phase-in calculation.</p>

          <h2>Common Questions</h2>

          <h3>What counts as "working income"?</h3>
          <p>Employment income (before deductions), self-employment income, and certain taxable benefits. EI, pensions, and investment income do not count.</p>

          <h3>Can students claim CWB?</h3>
          <p>Only if enrolled full-time for 13 weeks or less during the year, or if you have an eligible dependant.</p>

          <h3>Do I need to apply?</h3>
          <p>No separate application—complete Schedule 6 with your tax return. CRA calculates automatically.</p>

          <h2>Tips to Maximize Your CWB</h2>
          <ul>
            <li><strong>File your taxes:</strong> You must file to receive the CWB</li>
            <li><strong>Apply for DTC:</strong> Disability supplement adds significant value</li>
            <li><strong>Consider advance payments:</strong> If income is stable and predictable</li>
            <li><strong>Contribute to RRSP:</strong> Reduces adjusted net income, potentially increasing CWB</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CWB?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about the Canada Workers Benefit.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CWB amounts and thresholds change annually. This guide uses 2024 figures. Always check CRA's current figures when filing.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
