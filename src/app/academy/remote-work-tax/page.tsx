import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Remote Work Tax Deductions Canada 2024 | Work From Home Guide',
  description: 'Complete guide to work from home tax deductions in Canada. Learn about the simplified method, detailed method, T2200 requirements, and what expenses you can claim.',
  keywords: 'work from home tax deduction Canada, remote work taxes, home office deduction, T2200 work from home, WFH tax Canada',
}

export default function RemoteWorkTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2.5 rounded-xl">
              <Home className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Remote Work Tax Deductions Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Two Ways to Claim</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            If you work from home, you can claim expenses using either the simplified flat rate method ($2/day up to $500) or the detailed method with actual expenses. Each has different requirements.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Eligibility Requirements</h2>

          <h3>General Requirements</h3>
          <ul>
            <li>Worked from home due to employment duties</li>
            <li>Not reimbursed by employer for expenses</li>
            <li>Worked from home more than 50% of the time OR</li>
            <li>Used the space exclusively for work</li>
          </ul>

          <h3>Not Eligible If:</h3>
          <ul>
            <li>Self-employed (different rules apply)</li>
            <li>Employer reimbursed you</li>
            <li>Chose to work from home (not required)</li>
          </ul>

          <h2>Method 1: Simplified (Flat Rate)</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Claim $2 for each day worked from home</li>
            <li>Maximum $500 per year (250 days)</li>
            <li>No receipts required</li>
            <li>No T2200 required</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>Worked from home due to COVID or other reason</li>
            <li>Worked from home more than 50% of time</li>
            <li>Track days worked from home</li>
          </ul>

          <h3>Pros and Cons</h3>
          <ul>
            <li><strong>Pros:</strong> Simple, no paperwork, guaranteed claim</li>
            <li><strong>Cons:</strong> Maximum $500, may be less than actual costs</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Quick Math:</strong> If your annual rent/utilities × workspace % exceeds $500, the detailed method may be better. If under, simplified is easier.
            </p>
          </div>

          <h2>Method 2: Detailed (Actual Expenses)</h2>

          <h3>Requirements</h3>
          <ul>
            <li>Form T2200 from employer (or T2200S simplified)</li>
            <li>Keep all receipts</li>
            <li>Calculate workspace percentage</li>
            <li>Determine work-use proportion</li>
          </ul>

          <h3>Eligible Expenses (Employees)</h3>
          <ul>
            <li>Rent (if renting)</li>
            <li>Electricity</li>
            <li>Heat</li>
            <li>Water</li>
            <li>Home internet access</li>
            <li>Minor repairs to workspace</li>
            <li>Maintenance supplies for workspace</li>
          </ul>

          <h3>Additional for Commission Employees</h3>
          <ul>
            <li>Property taxes</li>
            <li>Home insurance</li>
            <li>Mortgage interest (not principal)</li>
          </ul>

          <h3>NOT Eligible</h3>
          <ul>
            <li>Mortgage principal</li>
            <li>Furniture (generally)</li>
            <li>Home purchase price</li>
            <li>Renovations</li>
            <li>Capital cost allowance (unless commission)</li>
          </ul>

          <h2>Calculating Your Deduction</h2>

          <h3>Step 1: Calculate Workspace Percentage</h3>
          <p>Method A: Square footage</p>
          <ul>
            <li>Workspace area ÷ total home area</li>
            <li>Example: 100 sq ft ÷ 1,000 sq ft = 10%</li>
          </ul>
          <p>Method B: Number of rooms</p>
          <ul>
            <li>1 room ÷ total rooms</li>
            <li>Example: 1 ÷ 8 rooms = 12.5%</li>
          </ul>

          <h3>Step 2: Shared vs Dedicated Space</h3>
          <p>If workspace is shared (e.g., dining room):</p>
          <ul>
            <li>Calculate work hours ÷ total hours used</li>
            <li>Example: 40 hrs work ÷ 168 hrs week = 24%</li>
            <li>Apply this to workspace percentage</li>
          </ul>

          <h3>Step 3: Calculate Total</h3>
          <ul>
            <li>Total eligible expenses × workspace %</li>
            <li>× shared space % (if applicable)</li>
            <li>= Deductible amount</li>
          </ul>

          <h3>Example Calculation</h3>
          <p>Dedicated home office:</p>
          <ul>
            <li>Annual rent: $24,000</li>
            <li>Utilities (heat, electric, water): $3,600</li>
            <li>Internet: $1,200</li>
            <li>Total: $28,800</li>
            <li>Workspace: 10% of home</li>
            <li>Deduction: $2,880</li>
          </ul>

          <p>Shared space (dining table):</p>
          <ul>
            <li>Same expenses: $28,800</li>
            <li>Space: 10% of home</li>
            <li>Work use: 24% of time</li>
            <li>Deduction: $28,800 × 10% × 24% = $691</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Your deduction cannot exceed your employment income. You can't use home office expenses to create a loss from employment.
            </p>
          </div>

          <h2>T2200 Form Requirements</h2>

          <h3>What Employer Certifies</h3>
          <ul>
            <li>Required to work from home</li>
            <li>Not reimbursed for expenses</li>
            <li>Nature of employment conditions</li>
            <li>Commission vs salaried status</li>
          </ul>

          <h3>T2200S (Simplified)</h3>
          <ul>
            <li>Shorter version for home office only</li>
            <li>Fewer questions</li>
            <li>Sufficient for most WFH claims</li>
          </ul>

          <h3>How to Get It</h3>
          <ul>
            <li>Request from employer/HR</li>
            <li>They must sign and date</li>
            <li>Keep with your records</li>
            <li>Don't submit with return (CRA may request)</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Part-Year Remote Work</h3>
          <ul>
            <li>Pro-rate expenses for months worked from home</li>
            <li>Simplified method: Count only WFH days</li>
            <li>Detailed method: Annual expenses × (WFH months ÷ 12)</li>
          </ul>

          <h3>Multiple Jobs</h3>
          <ul>
            <li>Can claim for each job if eligible</li>
            <li>Need T2200 from each employer</li>
            <li>Be reasonable in allocations</li>
          </ul>

          <h3>Hybrid Work</h3>
          <ul>
            <li>Can claim for days worked from home</li>
            <li>Simplified: $2 × actual home days</li>
            <li>Detailed: May need to adjust calculations</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>What to Keep</h3>
          <ul>
            <li>Signed T2200 or T2200S</li>
            <li>All expense receipts</li>
            <li>Lease agreement (for rent)</li>
            <li>Utility bills</li>
            <li>Internet bills</li>
            <li>Home measurements</li>
            <li>Calendar of days worked from home</li>
          </ul>

          <h3>How Long to Keep</h3>
          <ul>
            <li>6 years from end of tax year</li>
            <li>CRA may request at any time</li>
          </ul>

          <h2>Which Method Is Better?</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Situation</th>
                <th>Best Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Low expenses, no T2200</td>
                <td>Simplified</td>
              </tr>
              <tr>
                <td>High rent/utilities, have T2200</td>
                <td>Detailed</td>
              </tr>
              <tr>
                <td>Worked 200+ days from home</td>
                <td>Compare both</td>
              </tr>
              <tr>
                <td>Commission employee</td>
                <td>Usually detailed</td>
              </tr>
              <tr>
                <td>Don't want paperwork</td>
                <td>Simplified</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About WFH Deductions?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about work from home tax deductions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CRA rules for home office expenses can be complex. Keep detailed records and consult CRA guides for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
