import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Laptop, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home Office Deduction Canada 2024 | Work From Home Tax Guide',
  description: 'Complete guide to home office tax deductions in Canada. Learn about the simplified method, detailed method, eligible expenses, and T2200 requirements.',
  keywords: 'home office deduction Canada, work from home tax, T2200 form, home office expenses, simplified method home office',
}

export default function HomeOfficeDeductionPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-900 p-2.5 rounded-xl">
              <Laptop className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Employment & Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Home Office Deduction Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">Different Rules Apply</h2>
          <p className="text-cyan-700 dark:text-cyan-300 text-sm">
            Home office deductions work differently for employees vs self-employed. Employees need a T2200 from their employer and face more restrictions. Self-employed have more flexibility.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Employee vs Self-Employed</h2>

          <h3>Key Differences</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Employee</th>
                <th>Self-Employed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Form required</td>
                <td>T2200 from employer</td>
                <td>None</td>
              </tr>
              <tr>
                <td>Rent/mortgage interest</td>
                <td>Only if commission sales</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Property taxes</td>
                <td>Only if commission sales</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Can create loss</td>
                <td>No</td>
                <td>No (carry forward)</td>
              </tr>
            </tbody>
          </table>

          <h2>Employee Home Office</h2>

          <h3>Eligibility Requirements</h3>
          <ul>
            <li>Required to work from home by employer</li>
            <li>Work from home more than 50% of time, OR</li>
            <li>Use workspace exclusively for work and meet clients regularly</li>
            <li>Employer provides T2200 or T2200S</li>
          </ul>

          <h3>T2200 Form</h3>
          <ul>
            <li>Employer certifies work-from-home requirement</li>
            <li>Indicates what expenses you can claim</li>
            <li>T2200S is simplified short form</li>
            <li>Keep—don't submit with return</li>
          </ul>

          <h3>Eligible Expenses (Salaried Employees)</h3>
          <ul>
            <li>Utilities (heat, electricity, water)</li>
            <li>Internet access fees</li>
            <li>Minor maintenance/supplies</li>
            <li>Home insurance (workspace portion)</li>
          </ul>

          <h3>Additional for Commission Employees</h3>
          <ul>
            <li>Everything salaried can claim PLUS</li>
            <li>Rent</li>
            <li>Property taxes</li>
            <li>Home insurance</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>No Mortgage Interest:</strong> Salaried employees cannot deduct mortgage interest even for home office. Only rent (if renting) and only for commission salespeople.
            </p>
          </div>

          <h2>Self-Employed Home Office</h2>

          <h3>Eligibility</h3>
          <ul>
            <li>Principal place of business, OR</li>
            <li>Used exclusively for business AND meet clients regularly</li>
          </ul>

          <h3>Eligible Expenses</h3>
          <ul>
            <li>Rent (if renting)</li>
            <li>Mortgage interest (not principal)</li>
            <li>Property taxes</li>
            <li>Home insurance</li>
            <li>Utilities (heat, electricity, water)</li>
            <li>Internet</li>
            <li>Maintenance and repairs (reasonable portion)</li>
          </ul>

          <h3>Cannot Claim</h3>
          <ul>
            <li>Mortgage principal</li>
            <li>CCA on home (creates recapture issues)</li>
            <li>Personal portion of expenses</li>
          </ul>

          <h2>Calculating the Deduction</h2>

          <h3>Business-Use Percentage</h3>
          <ul>
            <li><strong>Square footage method:</strong> Office sq ft / Total sq ft</li>
            <li><strong>Room method:</strong> 1 room / Total rooms (if similar size)</li>
            <li>Apply percentage to eligible expenses</li>
          </ul>

          <h3>Example Calculation</h3>
          <p>Home: 1,500 sq ft, Office: 150 sq ft = 10%</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Expense</th>
                <th>Annual Total</th>
                <th>Deductible (10%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rent/mortgage interest</td>
                <td>$18,000</td>
                <td>$1,800</td>
              </tr>
              <tr>
                <td>Property tax</td>
                <td>$4,000</td>
                <td>$400</td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td>$3,600</td>
                <td>$360</td>
              </tr>
              <tr>
                <td>Insurance</td>
                <td>$1,200</td>
                <td>$120</td>
              </tr>
              <tr>
                <td>Internet</td>
                <td>$1,200</td>
                <td>$120</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td><strong>$2,800</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Time-Based Adjustment:</strong> If workspace is shared (living room used as office), also factor in hours used for business vs personal.
            </p>
          </div>

          <h2>Simplified Method (Employees)</h2>

          <h3>Temporary Flat Rate Method</h3>
          <ul>
            <li>Originally for COVID—may be extended</li>
            <li>$2 per day worked from home</li>
            <li>Maximum $500 per year</li>
            <li>No receipts or T2200 needed</li>
            <li>No detailed calculation required</li>
          </ul>

          <h3>When to Use</h3>
          <ul>
            <li>Worked from home 50%+ of time</li>
            <li>At least 4 consecutive weeks</li>
            <li>Simple, no tracking required</li>
            <li>Compare to detailed method</li>
          </ul>

          <h3>Limitations</h3>
          <ul>
            <li>Maximum $500 benefit</li>
            <li>May leave money on table if expenses high</li>
            <li>Cannot combine with detailed method</li>
          </ul>

          <h2>Detailed Method (Employees)</h2>

          <h3>When to Use</h3>
          <ul>
            <li>Home office expenses exceed $500</li>
            <li>Have T2200 from employer</li>
            <li>Willing to track and calculate</li>
          </ul>

          <h3>Process</h3>
          <ol>
            <li>Get T2200/T2200S from employer</li>
            <li>Calculate workspace percentage</li>
            <li>Total eligible expenses for year</li>
            <li>Apply percentage</li>
            <li>Complete Form T777 or T777S</li>
          </ol>

          <h3>Documentation</h3>
          <ul>
            <li>T2200 or T2200S (keep—don't submit)</li>
            <li>All expense receipts</li>
            <li>Calculation of workspace %</li>
            <li>Keep 6 years</li>
          </ul>

          <h2>Cannot Create or Increase Loss</h2>

          <h3>The Rule</h3>
          <ul>
            <li>Home office expenses limited to business/employment income</li>
            <li>Cannot create loss from these expenses alone</li>
            <li>Unused amounts carry forward</li>
          </ul>

          <h3>Self-Employed Example</h3>
          <p>Business income: $1,000, Home office expenses: $3,000</p>
          <ul>
            <li>Can claim: $1,000 (reduces income to $0)</li>
            <li>Carry forward: $2,000 to next year</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Part-Year Work From Home</h3>
          <ul>
            <li>Prorate expenses for months worked from home</li>
            <li>Track start/end dates</li>
            <li>Simplified method: $2/day actually worked from home</li>
          </ul>

          <h3>Multiple Jobs</h3>
          <ul>
            <li>Can claim for each if requirements met</li>
            <li>Separate T2200 for each employer</li>
            <li>Don't double-count same expenses</li>
          </ul>

          <h3>Shared Workspace</h3>
          <ul>
            <li>Multiple people working from same home</li>
            <li>Split expenses reasonably</li>
            <li>Each person tracks their own time</li>
          </ul>

          <h2>Common Eligible Expenses</h2>

          <h3>Utilities</h3>
          <ul>
            <li>Electricity</li>
            <li>Heat (natural gas, oil, etc.)</li>
            <li>Water</li>
            <li>Business portion deductible</li>
          </ul>

          <h3>Internet and Phone</h3>
          <ul>
            <li>Internet access fees</li>
            <li>Cell phone (business portion)</li>
            <li>Separate business line (100%)</li>
          </ul>

          <h3>Supplies</h3>
          <ul>
            <li>Office supplies (pens, paper, etc.)</li>
            <li>Printer ink, toner</li>
            <li>Minor equipment</li>
          </ul>

          <h2>What You Cannot Claim</h2>

          <h3>Always Excluded</h3>
          <ul>
            <li>Mortgage principal payments</li>
            <li>Furniture (employees)</li>
            <li>Computer equipment (usually—see T2200)</li>
            <li>Capital expenses (employees)</li>
            <li>Home decorating/improvements</li>
          </ul>

          <h3>CCA Warning (Self-Employed)</h3>
          <ul>
            <li>Can claim CCA on home, but shouldn't</li>
            <li>Creates "change in use" issues</li>
            <li>Triggers partial capital gain on sale</li>
            <li>Loses principal residence exemption portion</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>What to Track</h3>
          <ul>
            <li>Days worked from home</li>
            <li>All expense receipts</li>
            <li>Home measurements (for %)</li>
            <li>T2200 form (employees)</li>
          </ul>

          <h3>How Long</h3>
          <ul>
            <li>6 years from tax year</li>
            <li>Digital copies acceptable</li>
            <li>Organize by category and year</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Home Office Deductions?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about claiming home office expenses.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Home office rules differ for employees and self-employed. Employees need T2200 from employer. Keep all documentation for CRA review.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
