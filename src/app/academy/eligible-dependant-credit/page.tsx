import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, UserCheck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Eligible Dependant Credit Canada 2024 | Amount for Eligible Dependant',
  description: 'Complete guide to the Eligible Dependant Amount in Canada. Learn who qualifies, how to claim, and maximize this credit for single parents and supporters.',
  keywords: 'eligible dependant credit Canada, amount for eligible dependant, equivalent to spouse amount, single parent tax credit, Line 30400',
}

export default function EligibleDependantCreditPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-sky-100 dark:bg-sky-900 p-2.5 rounded-xl">
              <UserCheck className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Family Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Eligible Dependant Credit Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-sky-900 dark:text-sky-100 mb-3">Equivalent to Spouse Amount</h2>
          <p className="text-sky-700 dark:text-sky-300 text-sm">
            The Eligible Dependant Amount provides single people the same credit married couples get for their spouse. Worth up to $15,705 in 2024 (about $2,355 in federal tax savings), it's a valuable credit for single parents.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>2024 Credit Amounts</h2>

          <h3>Federal Credit</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Maximum eligible dependant amount</td>
                <td>$15,705</td>
              </tr>
              <tr>
                <td>Tax credit (15%)</td>
                <td>$2,356</td>
              </tr>
              <tr>
                <td>Reduced by dependant's income over</td>
                <td>$0</td>
              </tr>
            </tbody>
          </table>

          <h3>Plus Provincial Credits</h3>
          <ul>
            <li>Each province has equivalent credit</li>
            <li>Rates vary by province</li>
            <li>Total savings: $2,500-$3,500 typically</li>
          </ul>

          <h2>Who Can Claim</h2>

          <h3>You Must Be</h3>
          <ul>
            <li>Single, divorced, separated, or widowed</li>
            <li>Not living with spouse/partner</li>
            <li>Supporting the dependant</li>
            <li>Living with dependant in home you maintain</li>
          </ul>

          <h3>You Cannot Claim If</h3>
          <ul>
            <li>You claimed spouse amount (married/common-law)</li>
            <li>Someone else claims this dependant</li>
            <li>You're required to pay child support for them</li>
            <li>Another person in home claims eligible dependant</li>
          </ul>

          <h2>Eligible Dependants</h2>

          <h3>Your Child</h3>
          <ul>
            <li>Under 18 at any time in year</li>
            <li>Or any age if dependent due to impairment</li>
            <li>Natural, adopted, or step-child</li>
          </ul>

          <h3>Your Parent or Grandparent</h3>
          <ul>
            <li>Dependent on you due to infirmity</li>
            <li>Living in your home</li>
            <li>You're not just visiting</li>
          </ul>

          <h3>Other Relatives (If Infirm)</h3>
          <ul>
            <li>Sibling, aunt, uncle, niece, nephew</li>
            <li>Must have mental or physical infirmity</li>
            <li>Dependent on you for support</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Most Common:</strong> Single parents claiming for a child under 18. This is straightforward—child just needs to live with you and be under 18 at some point in the year.
            </p>
          </div>

          <h2>Income Reduction</h2>

          <h3>How Dependant's Income Affects Credit</h3>
          <ul>
            <li>Credit reduced by dependant's net income</li>
            <li>Dollar for dollar reduction</li>
            <li>Eliminated when income reaches $15,705</li>
          </ul>

          <h3>Example Calculation</h3>
          <p>Child has part-time job income of $5,000:</p>
          <ul>
            <li>Base amount: $15,705</li>
            <li>Minus child's income: $5,000</li>
            <li>Eligible dependant amount: $10,705</li>
            <li>Tax credit: $10,705 × 15% = $1,606</li>
          </ul>

          <h2>Shared Custody Rules</h2>

          <h3>Only One Claim Per Household</h3>
          <ul>
            <li>Only one eligible dependant claim per home</li>
            <li>Even if multiple dependants present</li>
            <li>Choose the dependant with lowest income</li>
          </ul>

          <h3>Parents Living Apart</h3>
          <ul>
            <li>Each parent can claim if child lives with each</li>
            <li>But not for same child</li>
            <li>Different children can be claimed by each</li>
            <li>CRA may split if both claim same child</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> You cannot claim the eligible dependant amount for a child if you're required to pay child support. The receiving parent claims instead.
            </p>
          </div>

          <h2>Support Requirement</h2>

          <h3>What "Support" Means</h3>
          <ul>
            <li>Providing necessities of life</li>
            <li>Food, shelter, clothing</li>
            <li>Financial responsibility for care</li>
          </ul>

          <h3>Living Together</h3>
          <ul>
            <li>Must live in dwelling you maintain</li>
            <li>Temporary absences okay (school, hospital)</li>
            <li>You're the one maintaining the home</li>
          </ul>

          <h2>Claiming on Your Return</h2>

          <h3>Where to Claim</h3>
          <ul>
            <li><strong>Line 30400:</strong> Amount for an eligible dependant</li>
            <li>Complete Schedule 5</li>
            <li>Include dependant's information</li>
          </ul>

          <h3>Information Needed</h3>
          <ul>
            <li>Dependant's name</li>
            <li>Date of birth</li>
            <li>Relationship to you</li>
            <li>Their net income</li>
            <li>Address (if different)</li>
          </ul>

          <h2>Eligible Dependant + Other Credits</h2>

          <h3>Can Also Claim</h3>
          <ul>
            <li>Canada Caregiver Amount (if dependant infirm)</li>
            <li>Child amount (if under 18)</li>
            <li>Disability amount transfer (if applicable)</li>
            <li>Medical expenses for dependant</li>
          </ul>

          <h3>Cannot Also Claim</h3>
          <ul>
            <li>Spouse/common-law amount (Line 30300)</li>
            <li>Another eligible dependant in same home</li>
          </ul>

          <h2>Multiple Children</h2>

          <h3>One Credit Per Household</h3>
          <ul>
            <li>Only one eligible dependant claim allowed</li>
            <li>But you get child amount for each child</li>
            <li>Choose child with lowest income for eligible dependant</li>
          </ul>

          <h3>Example</h3>
          <p>Single parent with 3 children:</p>
          <ul>
            <li>Eligible dependant: 1 child (choose lowest income)</li>
            <li>Child amount: all 3 children under 18</li>
            <li>CCB: all 3 children</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Year of Separation</h3>
          <ul>
            <li>Can claim if separated by Dec 31</li>
            <li>Must have lived apart 90+ days due to breakdown</li>
            <li>Cannot claim spouse amount same year</li>
          </ul>

          <h3>Death of Spouse</h3>
          <ul>
            <li>Year of death: can claim spouse amount</li>
            <li>Or eligible dependant (choose one)</li>
            <li>Following years: eligible dependant if applicable</li>
          </ul>

          <h3>Temporary Absence</h3>
          <ul>
            <li>Child away at school—still claim</li>
            <li>Your home is their primary residence</li>
            <li>Hospital stay—still claim</li>
          </ul>

          <h2>Common Scenarios</h2>

          <h3>Scenario 1: Single Parent</h3>
          <ul>
            <li>Divorced mom with 10-year-old</li>
            <li>Child has no income</li>
            <li>Claim full $15,705 eligible dependant</li>
            <li>Also claim child amount, CCB</li>
          </ul>

          <h3>Scenario 2: Supporting Parent</h3>
          <ul>
            <li>Single person supporting elderly mother</li>
            <li>Mother is infirm, lives with you</li>
            <li>Mother's income: $20,000</li>
            <li>Credit reduced to $0 (income too high)</li>
            <li>May still claim caregiver amount</li>
          </ul>

          <h3>Scenario 3: Adult Child</h3>
          <ul>
            <li>Single parent with 22-year-old with disability</li>
            <li>Child has impairment making dependent</li>
            <li>Child's income: $3,000</li>
            <li>Claim eligible dependant: $15,705 - $3,000 = $12,705</li>
          </ul>

          <h2>Disputes and Issues</h2>

          <h3>Both Parents Claim</h3>
          <ul>
            <li>CRA will contact both</li>
            <li>May deny both claims initially</li>
            <li>Provide documentation of custody</li>
            <li>CRA may split credit</li>
          </ul>

          <h3>Proving Eligibility</h3>
          <ul>
            <li>Custody agreement/court order</li>
            <li>School records showing address</li>
            <li>Medical records</li>
            <li>Utility bills showing residence</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> If you have a separation agreement, specify which parent claims which child for tax purposes. This prevents disputes with CRA.
            </p>
          </div>

          <h2>Provincial Credits</h2>

          <h3>Similar Structure</h3>
          <ul>
            <li>Most provinces have equivalent credit</li>
            <li>Same eligibility rules</li>
            <li>Different amounts and rates</li>
            <li>Calculated automatically on return</li>
          </ul>

          <h3>Total Value</h3>
          <ul>
            <li>Federal: ~$2,355</li>
            <li>Provincial: $500-$1,200</li>
            <li>Total: $2,800-$3,500 typically</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Eligible Dependant Credit?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about claiming the eligible dependant amount.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Eligible dependant claims can be complex with shared custody. Keep documentation and consider professional advice if disputed.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
