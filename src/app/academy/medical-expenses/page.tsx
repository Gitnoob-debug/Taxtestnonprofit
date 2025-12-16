import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Medical Expense Tax Credit Canada 2024 | Eligible Expenses & Claim Guide',
  description: 'Complete guide to claiming medical expenses on Canadian taxes. Learn what qualifies, how to calculate the credit, and maximize your medical expense claims.',
  keywords: 'medical expense tax credit Canada, eligible medical expenses CRA, claim medical expenses, healthcare tax deduction Canada',
}

export default function MedicalExpensesPage() {
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
              <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Medical Expense Tax Credit: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Non-Refundable Tax Credit</h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            The medical expense tax credit reduces your taxes owed but won't result in a refund if you don't owe taxes. You can claim eligible medical expenses for yourself, your spouse, and dependent children.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How the Credit Is Calculated</h2>
          <p>The federal medical expense tax credit is calculated as 15% of eligible medical expenses that exceed the lesser of:</p>
          <ul>
            <li>3% of your net income (Line 23600), OR</li>
            <li>$2,759 (for 2024 tax year)</li>
          </ul>
          <p>Each province also has its own medical expense tax credit with similar but varying thresholds.</p>

          <h3>Example Calculation</h3>
          <p>If your net income is $60,000 and you have $4,000 in medical expenses:</p>
          <ul>
            <li>3% of $60,000 = $1,800</li>
            <li>Lesser of $1,800 or $2,759 = $1,800</li>
            <li>Claimable amount: $4,000 - $1,800 = $2,200</li>
            <li>Federal credit: $2,200 × 15% = $330</li>
          </ul>

          <h2>12-Month Claim Period</h2>
          <p>You can claim medical expenses for any 12-month period ending in the tax year. This provides flexibility:</p>
          <ul>
            <li>The period must end in 2024 to claim on your 2024 return</li>
            <li>You can choose any 12-month period (e.g., April 2023 to March 2024)</li>
            <li>Strategically choose the period to maximize your claim</li>
            <li>Cannot overlap with a period claimed in a previous year</li>
          </ul>

          <h2>Eligible Medical Expenses</h2>

          <h3>Prescription Items</h3>
          <ul>
            <li>Prescription medications</li>
            <li>Prescription glasses and contact lenses</li>
            <li>Prescription orthotics and orthopedic shoes</li>
            <li>Insulin and diabetes supplies</li>
          </ul>

          <h3>Dental Care</h3>
          <ul>
            <li>Dental treatments and cleanings</li>
            <li>Dentures and dental implants</li>
            <li>Orthodontic work (braces)</li>
            <li>Dental surgery</li>
          </ul>

          <h3>Vision Care</h3>
          <ul>
            <li>Eye exams</li>
            <li>Prescription eyeglasses and contact lenses</li>
            <li>Laser eye surgery</li>
            <li>Guide dogs for the blind</li>
          </ul>

          <h3>Medical Practitioners</h3>
          <ul>
            <li>Doctors and specialists</li>
            <li>Chiropractors and physiotherapists</li>
            <li>Psychologists and psychotherapists</li>
            <li>Occupational therapists</li>
            <li>Naturopaths (in some provinces)</li>
            <li>Registered massage therapists (with prescription)</li>
          </ul>

          <h3>Hospital & Facility Costs</h3>
          <ul>
            <li>Hospital expenses not covered by provincial health</li>
            <li>Private hospital room upgrades</li>
            <li>Ambulance services</li>
            <li>Nursing home care (medical portion)</li>
          </ul>

          <h3>Medical Devices & Equipment</h3>
          <ul>
            <li>Hearing aids and cochlear implants</li>
            <li>Wheelchairs and walkers</li>
            <li>Hospital beds for home use</li>
            <li>CPAP machines for sleep apnea</li>
            <li>Blood glucose monitors</li>
            <li>Oxygen concentrators</li>
          </ul>

          <h3>Travel for Medical Care</h3>
          <ul>
            <li>Travel to access medical treatment not available locally</li>
            <li>Must travel at least 40 km one way</li>
            <li>Meals and accommodations if traveling 80+ km</li>
            <li>Can claim per-kilometer rate or actual vehicle costs</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> The 2024 CRA mileage rate for medical travel is $0.70/km for the first 5,000 km and $0.64/km after that.
            </p>
          </div>

          <h2>Expenses That Don't Qualify</h2>
          <ul>
            <li>Over-the-counter medications (unless prescribed)</li>
            <li>Vitamins and supplements (unless prescribed for specific condition)</li>
            <li>Cosmetic procedures</li>
            <li>Gym memberships and fitness expenses</li>
            <li>Health insurance premiums (claimed separately if paid through payroll)</li>
            <li>Amounts reimbursed by insurance</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Disability Supports Deduction</h3>
          <p>If you have a disability, some expenses may qualify as a deduction (more valuable than a credit) under the Disability Supports Deduction (Line 21500).</p>

          <h3>Fertility Treatments</h3>
          <p>IVF and other fertility treatments are eligible, including:</p>
          <ul>
            <li>Medical procedures and monitoring</li>
            <li>Medications prescribed for fertility</li>
            <li>Some associated laboratory costs</li>
          </ul>

          <h3>Medical Cannabis</h3>
          <p>Eligible if:</p>
          <ul>
            <li>Purchased from a licensed producer</li>
            <li>You have a medical document from a healthcare practitioner</li>
            <li>Used for a diagnosed medical condition</li>
          </ul>

          <h3>Attendant Care</h3>
          <p>If you or a dependant requires full-time attendant care due to a mental or physical impairment, you may claim these costs.</p>

          <h2>Who Can Claim What</h2>

          <h3>Your Expenses</h3>
          <p>You can claim your own medical expenses on your return.</p>

          <h3>Spouse's Expenses</h3>
          <p>Either spouse can claim both partners' medical expenses. Usually, the lower-income spouse should claim to maximize the credit (lower 3% threshold).</p>

          <h3>Dependent Children</h3>
          <p>Claim expenses for children who were under 18 at any point during the tax year and dependent on you for support.</p>

          <h3>Other Dependants</h3>
          <p>You may claim medical expenses for other dependent relatives (parents, grandparents, adult children, siblings) if they depended on you for support and had net income under $7,999 (2024).</p>

          <h2>Refundable Medical Expense Supplement</h2>
          <p>Low-income working Canadians may qualify for the Refundable Medical Expense Supplement (RMES):</p>
          <ul>
            <li>Maximum $1,465 for 2024</li>
            <li>Must have employment income of at least $4,282</li>
            <li>Family net income must be below $32,797 for full benefit</li>
            <li>Claimed automatically when you file your return</li>
          </ul>

          <h2>Documentation Requirements</h2>
          <p>Keep these records for 6 years:</p>
          <ul>
            <li>Receipts for all medical expenses</li>
            <li>Prescriptions from medical practitioners</li>
            <li>Proof of payment (credit card statements, cancelled cheques)</li>
            <li>Insurance reimbursement statements</li>
            <li>Travel log if claiming medical travel expenses</li>
          </ul>

          <h2>Common Claiming Strategies</h2>
          <ul>
            <li><strong>Bundle expenses:</strong> Schedule elective procedures in the same 12-month period</li>
            <li><strong>Choose the right claimant:</strong> Lower-income spouse often benefits more</li>
            <li><strong>Select optimal 12-month period:</strong> Choose dates that capture most expenses</li>
            <li><strong>Don't forget travel:</strong> Keep mileage log for medical appointments</li>
            <li><strong>Check insurance statements:</strong> Only claim the net amount after reimbursement</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Medical Expenses?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about eligible medical expenses.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Medical expense eligibility can be complex. Check CRA's list of eligible medical expenses or consult a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
