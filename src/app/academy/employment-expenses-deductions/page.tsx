import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Employment Expenses Deductions Canada 2024 | T2200 Guide',
  description: 'Complete guide to employment expense deductions in Canada. Learn about T2200 requirements, work from home deductions, vehicle expenses, and what employees can claim.',
  keywords: 'employment expenses Canada, T2200 form, employee deductions, work from home tax deduction, employment expense claims',
}

export default function EmploymentExpensesDeductionsPage() {
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
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Employment Expense Deductions Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Employees Can Claim Too</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Unlike self-employed individuals, employees have limited deductions. However, if you're required to pay work expenses that aren't reimbursed, you may be able to claim them—with the right documentation.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>The T2200 Requirement</h2>

          <h3>What Is Form T2200?</h3>
          <p>The T2200 (Declaration of Conditions of Employment) is completed by your employer to certify:</p>
          <ul>
            <li>You're required to pay expenses as a condition of employment</li>
            <li>You're not reimbursed for these expenses</li>
            <li>Specific conditions of your job</li>
          </ul>

          <h3>When You Need It</h3>
          <ul>
            <li>To claim employment expenses on Line 22900</li>
            <li>Must be signed by your employer</li>
            <li>Keep with your records (don't submit with return)</li>
            <li>CRA may request it for verification</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Ask your employer for a T2200 early. Some employers have policies about signing them—knowing early avoids surprises at tax time.
            </p>
          </div>

          <h2>Common Employment Expense Deductions</h2>

          <h3>Home Office Expenses</h3>
          <p>If you work from home regularly:</p>
          <ul>
            <li><strong>Detailed method:</strong> Calculate actual costs</li>
            <li><strong>Simplified method:</strong> $2/day (max $500)</li>
            <li>Requires T2200 for detailed method</li>
            <li>Space must be used regularly for work</li>
          </ul>

          <h4>What You Can Claim (Home Office)</h4>
          <ul>
            <li>Portion of rent or maintenance costs</li>
            <li>Electricity, heat, water</li>
            <li>Home internet</li>
            <li>Minor repairs to workspace</li>
            <li>Office supplies</li>
          </ul>

          <h4>What You Can't Claim</h4>
          <ul>
            <li>Mortgage payments (principal)</li>
            <li>Furniture (unless specific conditions)</li>
            <li>Internet if employer reimburses</li>
            <li>Property taxes (usually)</li>
          </ul>

          <h3>Vehicle Expenses</h3>
          <p>If you use your vehicle for work (not commuting):</p>
          <ul>
            <li>Keep detailed mileage log</li>
            <li>Track all vehicle costs</li>
            <li>Deduct employment-use percentage</li>
            <li>Need T2200 confirmation</li>
          </ul>

          <h4>Deductible Vehicle Costs</h4>
          <ul>
            <li>Fuel</li>
            <li>Insurance</li>
            <li>Maintenance and repairs</li>
            <li>License and registration</li>
            <li>Lease payments or CCA on purchase</li>
            <li>Interest on car loan</li>
            <li>Parking (for work, not commuting)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Commuting from home to regular workplace is NOT deductible. Only travel required for work duties (client visits, job sites, etc.) qualifies.
            </p>
          </div>

          <h3>Supplies and Materials</h3>
          <ul>
            <li>Office supplies you purchase for work</li>
            <li>Cell phone if required for work</li>
            <li>Computer supplies</li>
            <li>Must be consumed in employment</li>
          </ul>

          <h3>Professional Fees and Memberships</h3>
          <ul>
            <li>Professional dues required for employment</li>
            <li>Union dues (often deducted at source)</li>
            <li>Liability insurance premiums</li>
          </ul>

          <h2>Special Employee Categories</h2>

          <h3>Commission Salespeople</h3>
          <p>Additional deductions if you earn commission income:</p>
          <ul>
            <li>Advertising and promotion</li>
            <li>Entertainment (50% limit)</li>
            <li>Meals while traveling (50%)</li>
            <li>Home office even if not exclusive workspace</li>
            <li>Computer and equipment lease</li>
          </ul>

          <h3>Transport Employees</h3>
          <ul>
            <li>Meals when away from home</li>
            <li>Lodging when required</li>
            <li>Simplified method: $23/meal</li>
            <li>Must be away 12+ hours</li>
          </ul>

          <h3>Tradespersons</h3>
          <ul>
            <li>Cost of tools over $1,348 (2024)</li>
            <li>Apprentice mechanic tools deduction</li>
            <li>Need employer certification</li>
          </ul>

          <h3>Artists</h3>
          <ul>
            <li>Can deduct related expenses</li>
            <li>Limited to employment income from art</li>
            <li>Different rules than self-employed artists</li>
          </ul>

          <h2>How to Claim</h2>

          <h3>Form T777</h3>
          <p>Complete Form T777 (Statement of Employment Expenses):</p>
          <ul>
            <li>List all eligible expenses</li>
            <li>Calculate deductible amount</li>
            <li>Transfer total to Line 22900</li>
          </ul>

          <h3>Form T777S (Simplified)</h3>
          <p>For home office expenses using simplified method:</p>
          <ul>
            <li>$2 per day worked from home</li>
            <li>Maximum $500 per year</li>
            <li>No receipts or T2200 required</li>
            <li>Can't claim other home office expenses</li>
          </ul>

          <h2>Calculating Home Office Deduction</h2>

          <h3>Detailed Method</h3>
          <ol>
            <li>Calculate total eligible expenses</li>
            <li>Determine workspace percentage (area/total home)</li>
            <li>Calculate work-use hours percentage</li>
            <li>Apply both percentages to expenses</li>
          </ol>

          <h3>Example</h3>
          <ul>
            <li>Home office: 100 sq ft / 1,000 sq ft = 10%</li>
            <li>Work hours: 40 hrs/168 hrs = 24% (if shared space)</li>
            <li>Annual rent: $24,000</li>
            <li>Annual utilities: $3,600</li>
            <li>Annual internet: $1,200</li>
            <li>Total eligible: $28,800</li>
            <li>Dedicated space: $28,800 × 10% = $2,880</li>
            <li>Shared space: $28,800 × 10% × 24% = $691</li>
          </ul>

          <h2>Record Keeping</h2>
          <p>Keep for 6 years:</p>
          <ul>
            <li>Signed T2200 form</li>
            <li>All receipts for claimed expenses</li>
            <li>Vehicle mileage log</li>
            <li>Home office measurements and calculations</li>
            <li>Records showing employment requirement</li>
          </ul>

          <h2>Limitations and Rules</h2>

          <h3>Can't Create a Loss</h3>
          <ul>
            <li>Employment expenses can't exceed employment income</li>
            <li>Can't use expenses to reduce other income</li>
            <li>Excess not carried forward (except limited cases)</li>
          </ul>

          <h3>No Double-Dipping</h3>
          <ul>
            <li>Can't claim expenses reimbursed by employer</li>
            <li>Allowance received? May reduce claim</li>
            <li>Report allowances as income if claiming expenses</li>
          </ul>

          <h2>GST/HST Rebate</h2>
          <p>If you claim employment expenses:</p>
          <ul>
            <li>May be eligible for GST/HST rebate</li>
            <li>Complete Form GST370</li>
            <li>Rebate on GST/HST portion of expenses</li>
            <li>Adds to taxable income next year</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Employment Expenses?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about employee deductions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Employment expense rules are specific. Ensure you meet all conditions before claiming.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
