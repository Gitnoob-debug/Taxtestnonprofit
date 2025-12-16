import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Receipt, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Deductions and Credits 2024 | Canadian Tax Guide',
  description: 'Discover tax deductions and credits every Canadian should know for 2024. Home office, medical expenses, charitable donations, RRSP, and more. Don\'t leave money on the table.',
  keywords: 'Canadian tax deductions, tax credits Canada, home office deduction, medical expense tax credit, charitable donation tax credit, RRSP deduction',
}

export default function TaxDeductionsPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-xl">
              <Receipt className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Tax Filing
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Tax Deductions and Credits Every Canadian Should Know (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              15 min read
            </span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Intro Box */}
        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Deductions vs Credits: What's the Difference?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Tax Deductions</p>
              <p className="text-purple-700 dark:text-purple-300">Reduce your taxable income. The tax savings depends on your marginal rate.</p>
            </div>
            <div>
              <p className="font-semibold text-purple-800 dark:text-purple-200 mb-1">Tax Credits</p>
              <p className="text-purple-700 dark:text-purple-300">Directly reduce the tax you owe. A $100 credit saves you $100 in tax.</p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">In This Guide</h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Deductions</p>
              <ol className="space-y-1">
                <li><a href="#rrsp" className="text-teal-600 dark:text-teal-400 hover:underline">RRSP Contributions</a></li>
                <li><a href="#home-office" className="text-teal-600 dark:text-teal-400 hover:underline">Home Office Expenses</a></li>
                <li><a href="#moving" className="text-teal-600 dark:text-teal-400 hover:underline">Moving Expenses</a></li>
                <li><a href="#childcare" className="text-teal-600 dark:text-teal-400 hover:underline">Childcare Expenses</a></li>
                <li><a href="#employment" className="text-teal-600 dark:text-teal-400 hover:underline">Employment Expenses</a></li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Credits</p>
              <ol className="space-y-1">
                <li><a href="#bpa" className="text-teal-600 dark:text-teal-400 hover:underline">Basic Personal Amount</a></li>
                <li><a href="#medical" className="text-teal-600 dark:text-teal-400 hover:underline">Medical Expenses</a></li>
                <li><a href="#donations" className="text-teal-600 dark:text-teal-400 hover:underline">Charitable Donations</a></li>
                <li><a href="#climate" className="text-teal-600 dark:text-teal-400 hover:underline">Climate Action Incentive</a></li>
                <li><a href="#disability" className="text-teal-600 dark:text-teal-400 hover:underline">Disability Tax Credit</a></li>
              </ol>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">
          <h2 className="text-2xl font-bold border-b pb-2">Tax Deductions</h2>

          <section id="rrsp">
            <h3>RRSP Contributions</h3>
            <p>
              The most impactful deduction for most Canadians. RRSP contributions directly reduce your taxable income, and the tax savings depends on your marginal rate.
            </p>
            <ul>
              <li><strong>2024 limit:</strong> $31,560 or 18% of previous year's earned income</li>
              <li><strong>Deadline:</strong> March 3, 2025 (for 2024 tax year)</li>
              <li><strong>Tax savings:</strong> At a 40% marginal rate, a $10,000 contribution saves $4,000</li>
            </ul>
            <p>
              <Link href="/academy/rrsp-complete-guide" className="text-teal-600 dark:text-teal-400">Read our complete RRSP guide →</Link>
            </p>
          </section>

          <section id="home-office">
            <h3>Home Office Expenses</h3>
            <p>
              If you work from home, you can claim a portion of your home expenses. There are two methods:
            </p>

            <h4>Temporary Flat Rate Method</h4>
            <ul>
              <li>Claim $2 per day worked from home (up to $500/year)</li>
              <li>No receipts or T2200 required</li>
              <li>Simple but may not maximize your deduction</li>
            </ul>

            <h4>Detailed Method</h4>
            <p>Requires T2200 from employer. You can claim a portion of:</p>
            <ul>
              <li>Rent (if renting) or utilities</li>
              <li>Internet</li>
              <li>Home insurance</li>
              <li>Maintenance and minor repairs</li>
            </ul>
            <p>
              The portion is based on the size of your workspace relative to your home, multiplied by the percentage of time used for work.
            </p>
          </section>

          <section id="moving">
            <h3>Moving Expenses</h3>
            <p>
              If you moved at least 40 km closer to a new job, school, or business, you can deduct moving expenses:
            </p>
            <ul>
              <li>Transportation and storage costs</li>
              <li>Travel expenses (including meals and lodging)</li>
              <li>Temporary living expenses (up to 15 days)</li>
              <li>Cost of selling your old home (real estate commissions, legal fees)</li>
              <li>Cost of buying your new home (legal fees, transfer taxes)</li>
            </ul>
            <p>
              Moving expenses can only be deducted against income from the new location.
            </p>
          </section>

          <section id="childcare">
            <h3>Childcare Expenses</h3>
            <p>
              Costs for childcare that allowed you or your spouse to work, run a business, or attend school can be deducted.
            </p>
            <p><strong>Eligible expenses include:</strong></p>
            <ul>
              <li>Daycare centers and nursery schools</li>
              <li>Caregivers (babysitters, nannies)</li>
              <li>Day camps and day sports schools</li>
              <li>Boarding schools, overnight camps (limited amounts)</li>
            </ul>
            <p><strong>Annual limits per child:</strong></p>
            <ul>
              <li>Under 7: $8,000</li>
              <li>Ages 7-16: $5,000</li>
              <li>Disabled child (with DTC): $11,000</li>
            </ul>
            <p>
              The lower-income spouse must generally claim childcare expenses.
            </p>
          </section>

          <section id="employment">
            <h3>Employment Expenses</h3>
            <p>
              If your employer requires you to pay for certain work expenses and provides a signed T2200, you may be able to deduct:
            </p>
            <ul>
              <li>Vehicle expenses (if required to travel for work)</li>
              <li>Supplies consumed in your work</li>
              <li>Professional dues and union fees</li>
              <li>Tools (for tradespersons and apprentice mechanics)</li>
            </ul>
          </section>

          <h2 className="text-2xl font-bold border-b pb-2 mt-12">Tax Credits</h2>

          <section id="bpa">
            <h3>Basic Personal Amount (BPA)</h3>
            <p>
              Everyone gets this credit—it's the amount of income you can earn tax-free at the federal level.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 my-4 not-prose">
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">$15,705</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm">2024 Federal Basic Personal Amount</p>
            </div>

            <p>
              Provincial BPAs vary. The credit is calculated at 15% federally, giving everyone approximately $2,355 in federal tax savings.
            </p>
          </section>

          <section id="medical">
            <h3>Medical Expense Tax Credit</h3>
            <p>
              You can claim medical expenses for yourself, your spouse, and dependent children that exceed the lesser of:
            </p>
            <ul>
              <li>3% of your net income, or</li>
              <li>$2,759 (2024 threshold)</li>
            </ul>

            <p><strong>Eligible expenses include:</strong></p>
            <ul>
              <li>Prescription medications</li>
              <li>Dental work not covered by insurance</li>
              <li>Eyeglasses and contact lenses</li>
              <li>Laser eye surgery</li>
              <li>Medical devices (hearing aids, wheelchairs)</li>
              <li>Private health insurance premiums</li>
              <li>Therapy (physio, chiro, massage if prescribed)</li>
              <li>Travel expenses for medical treatment (if not available locally)</li>
            </ul>

            <p><strong>Pro tip:</strong> You can choose any 12-month period ending in the tax year. This flexibility helps you group expenses to exceed the threshold.</p>
          </section>

          <section id="donations">
            <h3>Charitable Donations Tax Credit</h3>
            <p>
              Donations to registered Canadian charities qualify for a generous two-tier credit:
            </p>
            <ul>
              <li><strong>First $200:</strong> 15% federal credit</li>
              <li><strong>Over $200:</strong> 29% federal credit (33% if income exceeds $246,752)</li>
            </ul>
            <p>
              Provincial credits are added on top. In total, high-income donors can receive credits worth nearly 50% of donations over $200.
            </p>

            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 my-4 not-prose">
              <p className="font-semibold text-green-800 dark:text-green-200 mb-1">First-Time Donor's Super Credit</p>
              <p className="text-green-700 dark:text-green-300 text-sm">
                If you (or your spouse) haven't claimed donations since 2007, you may be eligible for an additional 25% credit on up to $1,000 in donations.
              </p>
            </div>

            <p>
              You can carry forward unused donations for up to 5 years.
            </p>
          </section>

          <section id="climate">
            <h3>Climate Action Incentive (CAI)</h3>
            <p>
              Residents of Alberta, Saskatchewan, Manitoba, Ontario, New Brunswick, Nova Scotia, PEI, and Newfoundland receive quarterly payments to offset carbon pricing costs.
            </p>
            <p><strong>2024 base amounts (single adult):</strong></p>
            <ul>
              <li>Alberta: $450/year</li>
              <li>Saskatchewan: $376/year</li>
              <li>Manitoba: $300/year</li>
              <li>Ontario: $280/year</li>
            </ul>
            <p>
              Amounts are higher for families. Rural residents get a 20% bonus. You must file a tax return to receive payments.
            </p>
          </section>

          <section id="disability">
            <h3>Disability Tax Credit (DTC)</h3>
            <p>
              A significant credit for individuals with a severe and prolonged impairment in physical or mental functions.
            </p>
            <ul>
              <li><strong>2024 base credit:</strong> Approximately $9,000 in tax savings</li>
              <li><strong>Supplement:</strong> Additional amount for those under 18</li>
            </ul>
            <p>
              Requires Form T2201 certified by a medical practitioner. The credit can be transferred to a supporting family member. Also opens eligibility for the RDSP.
            </p>
          </section>

          {/* Checklist Section */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Checklist: Commonly Missed Claims</h3>
            <ul className="space-y-2">
              {[
                'RRSP contributions (check if room available)',
                'Home office expenses (even part-time WFH)',
                'Medical expenses (12-month period strategy)',
                'Student loan interest',
                'Public transit passes (some provinces)',
                'Professional dues and union fees',
                'Moving expenses for work or school',
                'Childcare receipts',
                'Charitable donation receipts',
                'Northern residents deduction (if applicable)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>Deductions reduce taxable income; credits directly reduce tax owed</li>
              <li>RRSP contributions are the biggest deduction for most people</li>
              <li>Keep receipts for medical expenses, donations, and childcare</li>
              <li>Many credits are "use it or lose it"—file your return even if you owe nothing</li>
              <li>Some credits (donations, tuition) can be carried forward</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Have a Specific Tax Question?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">
              Our AI tax assistant can answer questions about your specific situation using official CRA sources.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Ask the Tax Assistant
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes only. Tax rules change frequently and individual situations vary. Consult a qualified tax professional for advice specific to your circumstances.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-700 pt-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/academy/self-employment-taxes" className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Self-Employment Taxes</h3>
              <p className="text-slate-600 dark:text-slate-400">Business deductions for freelancers</p>
            </Link>
            <Link href="/tools/tax-calculator" className="p-5 sm:p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Income Tax Calculator</h3>
              <p className="text-slate-600 dark:text-slate-400">See your tax owing after deductions</p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
