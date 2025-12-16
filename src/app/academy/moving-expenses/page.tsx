import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Truck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Moving Expense Deduction Canada 2024 | Claim Work & School Relocation Costs',
  description: 'Complete guide to claiming moving expenses in Canada. Learn eligibility rules, what costs you can deduct, the 40km requirement, and how to maximize your claim.',
  keywords: 'moving expense deduction Canada, claim moving costs CRA, work relocation tax deduction, 40km rule moving expenses',
}

export default function MovingExpensesPage() {
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
              <Truck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Moving Expense Deduction: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Deduction, Not a Credit</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Moving expenses are a deduction (reduces taxable income), not a credit. This makes them more valuable for higher-income earners. You can deduct eligible moving costs when relocating for work or full-time post-secondary studies.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Eligibility Requirements</h2>

          <h3>The 40 Kilometer Rule</h3>
          <p>Your new home must be at least 40 kilometers closer to your new work or school location than your old home. This is measured by the shortest normal route, not straight-line distance.</p>

          <h3>Qualifying Moves</h3>
          <ul>
            <li><strong>Employment:</strong> Moving to start a new job or work at a new location for your current employer</li>
            <li><strong>Self-employment:</strong> Moving to operate a business at a new location</li>
            <li><strong>Post-secondary education:</strong> Moving to attend full-time college or university</li>
            <li><strong>Returning to Canada:</strong> Moving back to work or study after living abroad</li>
          </ul>

          <h3>What Doesn't Qualify</h3>
          <ul>
            <li>Moving to retire</li>
            <li>Moving without a job or school destination</li>
            <li>Moving for personal reasons unrelated to work or study</li>
            <li>Moves where the 40km rule isn't met</li>
          </ul>

          <h2>Eligible Moving Expenses</h2>

          <h3>Transportation & Travel</h3>
          <ul>
            <li>Cost of moving household items (movers, truck rental)</li>
            <li>Vehicle costs to drive to new home (fuel, per-km rate)</li>
            <li>Airfare, bus, or train tickets for family members</li>
            <li>Meals and accommodation during the move</li>
            <li>Cost of moving pets</li>
          </ul>

          <h3>Temporary Living Expenses</h3>
          <ul>
            <li>Up to 15 days of meals and temporary lodging near old or new home</li>
            <li>Applies when you can't move directly into your new home</li>
            <li>Can use simplified or detailed method for meals</li>
          </ul>

          <h3>Old Residence Costs</h3>
          <ul>
            <li>Legal fees for selling your old home</li>
            <li>Real estate commission</li>
            <li>Mortgage prepayment penalty (limited)</li>
            <li>Costs of cancelling a lease</li>
            <li>Advertising costs to sell your home</li>
          </ul>

          <h3>New Residence Costs</h3>
          <ul>
            <li>Legal fees for buying new home (up to limit)</li>
            <li>Land transfer tax (if selling old home)</li>
            <li>Connecting/disconnecting utilities</li>
            <li>Changing address on legal documents</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Legal fees and land transfer taxes for a new home are only deductible if you also sold your old home. You can't claim these costs if you were a renter.
            </p>
          </div>

          <h2>Expenses You Cannot Claim</h2>
          <ul>
            <li>Costs for house-hunting trips</li>
            <li>Cleaning or repairing your old residence</li>
            <li>Losses on selling your old home</li>
            <li>Mortgage default insurance</li>
            <li>Interest on bridge loans</li>
            <li>Expenses reimbursed by your employer (unless included in income)</li>
          </ul>

          <h2>How to Calculate Moving Expenses</h2>

          <h3>Simplified Method for Meals</h3>
          <p>You can claim a flat rate for meals without receipts:</p>
          <ul>
            <li><strong>2024 rate:</strong> $23 per meal, maximum $69 per day per person</li>
            <li>No receipts required</li>
            <li>Must be reasonable for the distance traveled</li>
          </ul>

          <h3>Simplified Method for Vehicle</h3>
          <p>Claim per-kilometer rate for driving to your new location:</p>
          <ul>
            <li><strong>2024 rates vary by province:</strong> Generally $0.59-$0.72 per km</li>
            <li>No receipts required for fuel</li>
            <li>Based on most direct route</li>
          </ul>

          <h3>Detailed Method</h3>
          <p>Track and claim actual costs with receipts. May result in higher deduction if your actual expenses exceed the simplified rates.</p>

          <h2>Income Limitation</h2>
          <p>Moving expenses can only be deducted against income earned at the new location:</p>
          <ul>
            <li><strong>Employment move:</strong> Deduct against employment income from new job</li>
            <li><strong>Self-employment move:</strong> Deduct against self-employment income at new location</li>
            <li><strong>Student move:</strong> Deduct against scholarships, bursaries, and research grants</li>
          </ul>

          <h3>Carry Forward</h3>
          <p>If your moving expenses exceed your qualifying income at the new location, carry forward unused amounts to future years. This is common for students who move but have limited scholarship income.</p>

          <h2>Employer Reimbursements</h2>
          <p>If your employer reimburses or pays for moving expenses:</p>
          <ul>
            <li><strong>Non-taxable reimbursement:</strong> You cannot claim those expenses</li>
            <li><strong>Taxable allowance:</strong> Include allowance in income, claim full expenses</li>
            <li><strong>Partial reimbursement:</strong> Claim only the unreimbursed portion</li>
          </ul>

          <h2>Form T1-M: Moving Expenses Deduction</h2>
          <p>Calculate your moving expense deduction using Form T1-M, which requires:</p>
          <ul>
            <li>Old and new address</li>
            <li>Distance to work/school from each location</li>
            <li>Itemized list of expenses</li>
            <li>Supporting calculations</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Students</h3>
          <ul>
            <li>Must be full-time student at post-secondary institution</li>
            <li>Can only deduct against taxable scholarship/bursary income, grants, or employment income at new location</li>
            <li>Can carry forward unused expenses</li>
          </ul>

          <h3>Multiple Moves in One Year</h3>
          <p>You can claim multiple qualifying moves in the same year, each with its own 40km requirement and income limitation.</p>

          <h3>Moving Back for Work After School</h3>
          <p>If you move to another location for work after completing studies, you may be able to use carried-forward moving expenses from your original school move.</p>

          <h2>Documentation Requirements</h2>
          <p>Keep receipts and records for 6 years:</p>
          <ul>
            <li>Moving company invoices or truck rental receipts</li>
            <li>Hotel and meal receipts (if using detailed method)</li>
            <li>Fuel receipts and odometer readings</li>
            <li>Legal fees and real estate statements</li>
            <li>Proof of old and new addresses</li>
            <li>Employment records showing new work location</li>
          </ul>

          <h2>Example Calculation</h2>
          <p>Sarah moves from Toronto to Ottawa for a new job. Her expenses:</p>
          <ul>
            <li>Moving company: $2,500</li>
            <li>Driving (450 km × $0.70): $315</li>
            <li>One night hotel: $150</li>
            <li>Meals (simplified, 2 days × $69): $138</li>
            <li>Temporary lodging (10 days): $1,500</li>
            <li>Legal fees (selling old home): $1,000</li>
            <li><strong>Total eligible expenses: $5,603</strong></li>
          </ul>
          <p>If her new job income is $50,000, she can deduct the full $5,603, reducing taxable income to $44,397.</p>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Moving Expenses?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about your moving expense deduction.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Moving expense rules can be complex, especially for cross-border moves or multiple relocations. Consult a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
