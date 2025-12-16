import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canada Child Benefit (CCB) 2024 | Payment Calculator & Eligibility Guide',
  description: 'Complete guide to the Canada Child Benefit. Learn eligibility, payment amounts, income thresholds, disability supplement, and how to maximize your family benefits.',
  keywords: 'Canada Child Benefit, CCB 2024, child tax benefit Canada, CCB calculator, child benefit payment dates',
}

export default function CanadaChildBenefitPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 dark:bg-rose-900 p-2.5 rounded-xl">
              <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Canada Child Benefit (CCB): Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 dark:text-rose-100 mb-3">Tax-Free Monthly Benefit</h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            The CCB is a tax-free monthly payment to help families with the cost of raising children under 18. It's income-tested—lower-income families receive more—and includes extra support for children with disabilities.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>2024-2025 Maximum Amounts</h2>
          <p>For the July 2024 to June 2025 benefit year:</p>
          <ul>
            <li><strong>Under 6 years:</strong> Up to $7,787 per year ($648.91/month)</li>
            <li><strong>6 to 17 years:</strong> Up to $6,570 per year ($547.50/month)</li>
            <li><strong>Child Disability Benefit:</strong> Additional $3,173 per year ($264.41/month)</li>
          </ul>

          <h2>Eligibility Requirements</h2>
          <p>To receive CCB, you must:</p>
          <ul>
            <li>Live with a child under 18</li>
            <li>Be primarily responsible for the child's care and upbringing</li>
            <li>Be a Canadian resident for tax purposes</li>
            <li>You or your spouse must be a Canadian citizen, permanent resident, protected person, or temporary resident who lived in Canada for at least 18 months</li>
          </ul>

          <h3>Who Is "Primarily Responsible"?</h3>
          <p>The person who:</p>
          <ul>
            <li>Supervises daily activities and needs</li>
            <li>Makes arrangements for childcare when necessary</li>
            <li>Participates in educational and recreational activities</li>
            <li>Attends to health needs and medical appointments</li>
          </ul>

          <h2>How CCB Is Calculated</h2>

          <h3>Income Thresholds (2024-2025)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Family Income</th>
                <th>Reduction Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under $36,502</td>
                <td>Full benefit</td>
              </tr>
              <tr>
                <td>$36,502 - $79,087</td>
                <td>Reduced by 7% (1 child) to 23% (4+ children)</td>
              </tr>
              <tr>
                <td>Over $79,087</td>
                <td>Further reduced by 3.2% (1 child) to 9.5% (4+ children)</td>
              </tr>
            </tbody>
          </table>

          <h3>Example Calculation</h3>
          <p>Family with 2 children (ages 4 and 8), income $60,000:</p>
          <ul>
            <li>Maximum benefit: $7,787 + $6,570 = $14,357</li>
            <li>Income over $36,502: $23,498</li>
            <li>Reduction (13.5% for 2 children): $23,498 × 13.5% = $3,172</li>
            <li><strong>Annual CCB: $14,357 - $3,172 = $11,185</strong></li>
            <li><strong>Monthly payment: ~$932</strong></li>
          </ul>

          <h2>Child Disability Benefit (CDB)</h2>
          <p>If your child is approved for the Disability Tax Credit (DTC):</p>
          <ul>
            <li>Additional $3,173 per year per eligible child</li>
            <li>Also income-tested but with separate calculation</li>
            <li>Apply for DTC first with Form T2201</li>
            <li>CDB is added automatically once DTC is approved</li>
          </ul>

          <h2>Payment Schedule</h2>
          <p>CCB is paid monthly, usually on the 20th:</p>
          <ul>
            <li>Payments cover July to June (benefit year)</li>
            <li>Based on previous year's tax return</li>
            <li>If payment is under $20/year, paid as annual lump sum in July</li>
          </ul>

          <h3>2024 Payment Dates</h3>
          <p>January 19, February 20, March 20, April 19, May 17, June 20, July 19, August 20, September 20, October 18, November 20, December 13</p>

          <h2>How to Apply</h2>

          <h3>New Baby</h3>
          <ul>
            <li>Register at birth through provincial birth registration</li>
            <li>Or use Form RC66 (Canada Child Benefits Application)</li>
            <li>Apply within 11 months of birth for retroactive payments</li>
          </ul>

          <h3>New to Canada</h3>
          <ul>
            <li>Wait until you've been in Canada for 18 months, OR</li>
            <li>Apply immediately if you're a permanent resident, citizen, or protected person</li>
            <li>Use Form RC66 with required documents</li>
          </ul>

          <h3>Custody Changes</h3>
          <ul>
            <li>Notify CRA immediately of custody changes</li>
            <li>Both parents may receive CCB in shared custody (see below)</li>
          </ul>

          <h2>Shared Custody</h2>
          <p>When parents share custody relatively equally:</p>
          <ul>
            <li>Each parent receives 50% of the CCB amount</li>
            <li>Each amount calculated based on that parent's family income</li>
            <li>Both parents must file tax returns</li>
            <li>CRA determines shared custody based on living arrangements</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> If you have primary custody (child lives with you more than 60% of the time), you receive 100% of the CCB. Notify CRA of the actual living arrangement.
            </p>
          </div>

          <h2>Income Definition</h2>
          <p>CCB is based on adjusted family net income (AFNI):</p>
          <ul>
            <li>Your net income (Line 23600)</li>
            <li>Plus spouse's net income</li>
            <li>Minus certain adjustments (UCCB, RDSP, split pension income)</li>
          </ul>

          <h2>Strategies to Maximize CCB</h2>

          <h3>RRSP Contributions</h3>
          <p>RRSP contributions reduce net income, potentially increasing CCB. The "marginal effective tax rate" can exceed 50% when accounting for CCB phase-out.</p>

          <h3>Income Splitting</h3>
          <p>Spousal RRSP contributions can help balance incomes and potentially increase CCB over time.</p>

          <h3>Self-Employment Deductions</h3>
          <p>If self-employed, maximize legitimate business deductions to reduce net income.</p>

          <h2>Keeping CCB Current</h2>
          <ul>
            <li><strong>File taxes on time:</strong> Late filing can stop payments</li>
            <li><strong>Update marital status:</strong> Within 11 months of change</li>
            <li><strong>Report custody changes:</strong> Immediately</li>
            <li><strong>Update address:</strong> Keep CRA records current</li>
            <li><strong>Register new children:</strong> Within 11 months of birth</li>
          </ul>

          <h2>When CCB Stops</h2>
          <p>CCB payments end when:</p>
          <ul>
            <li>Child turns 18 (payment for month of 18th birthday)</li>
            <li>Child no longer lives with you</li>
            <li>Child or parent dies</li>
            <li>Parent no longer resident of Canada</li>
          </ul>

          <h2>Provincial Programs</h2>
          <p>Many provinces add their own child benefits:</p>
          <ul>
            <li><strong>Ontario:</strong> Ontario Child Benefit</li>
            <li><strong>BC:</strong> BC Family Benefit</li>
            <li><strong>Alberta:</strong> Alberta Child and Family Benefit</li>
            <li><strong>Quebec:</strong> Quebec Family Allowance (separate program)</li>
          </ul>
          <p>Provincial benefits are typically combined with CCB payments.</p>

          <h2>Common Questions</h2>

          <h3>Is CCB taxable?</h3>
          <p>No, CCB is completely tax-free and not reported as income.</p>

          <h3>Can two people claim for same child?</h3>
          <p>Only through shared custody arrangement. Otherwise, only the primarily responsible parent receives CCB.</p>

          <h3>What if my income changes?</h3>
          <p>CCB is recalculated each July based on previous year's tax return. You can't request adjustment for current-year income changes.</p>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CCB?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about Canada Child Benefit eligibility and calculations.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CCB amounts are indexed annually. This guide uses 2024-2025 figures. Use CRA's CCB calculator for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
