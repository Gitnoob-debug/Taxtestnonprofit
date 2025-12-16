import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home Office Tax Deduction Canada 2024 | WFH Expense Guide',
  description: 'Complete guide to claiming home office expenses in Canada. Learn about T2200, eligible expenses, detailed vs flat rate methods, and employee vs self-employed rules.',
  keywords: 'home office tax deduction Canada, work from home expenses, T2200 form, home office deduction 2024',
}

export default function HomeOfficeExpensesPage() {
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
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Home Office Tax Deduction: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Two Methods Available</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Employees can use either the Flat Rate Method (simplified) or the Detailed Method (requires Form T2200). Self-employed individuals must use the detailed method to claim home office expenses.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Eligibility Requirements</h2>
          <p>To claim home office expenses, you must meet one of these conditions:</p>
          <ul>
            <li><strong>Principally performed:</strong> More than 50% of your work was done from home, OR</li>
            <li><strong>Exclusively used:</strong> Your home office is used exclusively for work and to meet clients/customers on a regular basis</li>
          </ul>

          <h2>Method 1: Flat Rate (Temporary Simplified)</h2>
          <p>The simplified flat rate method was introduced during COVID and continues for the 2024 tax year:</p>

          <h3>How It Works</h3>
          <ul>
            <li><strong>Rate:</strong> $2 per day worked from home</li>
            <li><strong>Maximum:</strong> $500 per year (250 days)</li>
            <li><strong>No T2200 required</strong></li>
            <li><strong>No receipts required</strong></li>
          </ul>

          <h3>Who Should Use Flat Rate</h3>
          <ul>
            <li>Employees with modest home office costs</li>
            <li>Those who prefer simplicity over maximizing deductions</li>
            <li>Anyone who can't get Form T2200 from their employer</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Note:</strong> The flat rate method may change or end for future tax years. Check CRA guidelines annually for current rules.
            </p>
          </div>

          <h2>Method 2: Detailed Method</h2>
          <p>The detailed method allows you to claim actual home office expenses but requires Form T2200 from your employer.</p>

          <h3>Form T2200 Requirements</h3>
          <ul>
            <li>Employer must complete and sign Form T2200</li>
            <li>Confirms you were required to work from home</li>
            <li>Lists which expenses you're allowed to claim</li>
            <li>Keep the form but don't submit with your return</li>
          </ul>

          <h3>Eligible Expenses for Employees</h3>
          <ul>
            <li><strong>Utilities:</strong> Electricity, heat, water</li>
            <li><strong>Internet:</strong> Proportionate share of monthly cost</li>
            <li><strong>Rent:</strong> If you rent your home</li>
            <li><strong>Maintenance:</strong> Minor repairs to home office area</li>
            <li><strong>Office supplies:</strong> Pens, paper, ink cartridges</li>
          </ul>

          <h3>Commission Employees: Additional Expenses</h3>
          <p>If you earn commission income, you can also claim:</p>
          <ul>
            <li>Property taxes</li>
            <li>Home insurance</li>
          </ul>

          <h3>Expenses Employees Cannot Claim</h3>
          <ul>
            <li>Mortgage interest (only self-employed)</li>
            <li>Mortgage principal payments</li>
            <li>Capital cost allowance (depreciation)</li>
            <li>Furniture or equipment (unless specifically listed on T2200)</li>
          </ul>

          <h2>Calculating Your Home Office Percentage</h2>
          <p>Calculate the percentage of your home used for work:</p>

          <h3>Method A: Square Footage</h3>
          <ul>
            <li>Home office: 150 sq ft</li>
            <li>Total home: 1,500 sq ft</li>
            <li>Percentage: 150 ÷ 1,500 = 10%</li>
          </ul>

          <h3>Method B: Number of Rooms</h3>
          <ul>
            <li>Home office: 1 room</li>
            <li>Total rooms: 8 rooms</li>
            <li>Percentage: 1 ÷ 8 = 12.5%</li>
          </ul>

          <p>Then multiply eligible expenses by this percentage. If you don't work from home year-round, also prorate for the months used.</p>

          <h2>Self-Employed Home Office</h2>
          <p>Self-employed individuals have broader deduction options but stricter rules:</p>

          <h3>Additional Eligible Expenses</h3>
          <ul>
            <li>Mortgage interest (portion attributable to office)</li>
            <li>Property taxes</li>
            <li>Home insurance</li>
            <li>Capital cost allowance (use with caution)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>CCA Warning:</strong> Claiming capital cost allowance (CCA) on your home may create a taxable capital gain when you sell. Most tax professionals advise against claiming CCA to preserve your principal residence exemption.
            </p>
          </div>

          <h3>Self-Employed Limitations</h3>
          <ul>
            <li>Home office expenses cannot create or increase a business loss</li>
            <li>Must have business income to offset expenses</li>
            <li>Unused expenses can be carried forward</li>
          </ul>

          <h2>Detailed Method Example</h2>
          <p>Maria works from home 3 days per week in a dedicated 12% of her home:</p>

          <p><strong>Annual household expenses:</strong></p>
          <ul>
            <li>Electricity: $1,800</li>
            <li>Heat: $1,200</li>
            <li>Internet: $960</li>
            <li>Rent: $18,000</li>
            <li><strong>Total: $21,960</strong></li>
          </ul>

          <p><strong>Home office deduction:</strong></p>
          <ul>
            <li>$21,960 × 12% = $2,635</li>
            <li>Prorated for 3/5 days: $2,635 × 60% = $1,581</li>
          </ul>

          <p><strong>Flat rate comparison:</strong></p>
          <ul>
            <li>156 days × $2 = $312</li>
          </ul>

          <p>In this case, the detailed method saves Maria over $1,200 more in deductions.</p>

          <h2>Shared Home Office</h2>
          <p>If multiple household members work from home in the same space:</p>
          <ul>
            <li>Each person calculates their own usage percentage</li>
            <li>Total claims cannot exceed 100% of actual expenses</li>
            <li>Both need T2200 forms from their employers</li>
          </ul>

          <h2>Documentation Requirements</h2>
          <p>Keep these records for 6 years:</p>
          <ul>
            <li>Form T2200 (detailed method only)</li>
            <li>Receipts for all claimed expenses</li>
            <li>Measurements of your home and office space</li>
            <li>Record of days worked from home</li>
            <li>Floor plan or sketch showing office location</li>
          </ul>

          <h2>Comparing Your Options</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Flat Rate</th>
                <th>Detailed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maximum claim</td>
                <td>$500</td>
                <td>No limit</td>
              </tr>
              <tr>
                <td>Requires T2200</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Requires receipts</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Best for</td>
                <td>Occasional WFH</td>
                <td>Full-time WFH</td>
              </tr>
            </tbody>
          </table>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Not getting T2200:</strong> Ask your employer early—they're required to provide if you qualify</li>
            <li><strong>Overestimating space:</strong> Be reasonable with your percentage calculation</li>
            <li><strong>Claiming personal items:</strong> A new desk used partly for personal use isn't fully deductible</li>
            <li><strong>Missing the deadline:</strong> Request T2200 before your employer's payroll cutoff</li>
            <li><strong>Not comparing methods:</strong> Calculate both to see which is better for you</li>
          </ul>

          <h2>Tips for Maximizing Your Claim</h2>
          <ul>
            <li>Track every day you work from home</li>
            <li>Keep receipts organized by category</li>
            <li>Measure your home office precisely</li>
            <li>Include all eligible utility costs</li>
            <li>Don't forget internet expenses</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Home Office?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about claiming work-from-home expenses.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Home office rules may change annually. Consult a tax professional for complex situations or self-employment scenarios.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
