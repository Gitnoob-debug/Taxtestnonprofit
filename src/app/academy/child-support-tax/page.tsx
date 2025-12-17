import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Child Support Tax Canada 2024 | CRA Rules & Guidelines',
  description: 'Complete guide to child support taxation in Canada. Learn why child support is not taxable, how it differs from spousal support, and CRA reporting requirements.',
  keywords: 'child support tax Canada, child support taxable, child support CRA, child support deduction, child support income',
}

export default function ChildSupportTaxPage() {
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
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Family & Separation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Child Support Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />7 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Tax-Neutral Treatment</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Since May 1997, child support payments have no tax consequences in Canada. The payer cannot deduct payments, and the recipient does not report them as income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Current Tax Rules</h2>

          <h3>Post-May 1997 Agreements</h3>
          <ul>
            <li>Child support is NOT deductible by payer</li>
            <li>Child support is NOT taxable to recipient</li>
            <li>No tax reporting required</li>
            <li>Full amount goes to support child</li>
          </ul>

          <h3>Why Tax-Neutral?</h3>
          <ul>
            <li>Simplified system</li>
            <li>Money meant for children's benefit</li>
            <li>Removes tax dispute from support calculations</li>
            <li>Federal Child Support Guidelines set amounts</li>
          </ul>

          <h2>Pre-May 1997 Agreements</h2>

          <h3>Old Rules May Apply If</h3>
          <ul>
            <li>Agreement made before May 1, 1997</li>
            <li>Never modified since</li>
            <li>No written election to use new rules</li>
          </ul>

          <h3>Under Old Rules</h3>
          <ul>
            <li>Payer could deduct child support</li>
            <li>Recipient had to report as income</li>
            <li>Same treatment as spousal support today</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Switching Rules:</strong> Old agreements can elect to use new rules by filing Form T1157. Once elected, cannot switch back. Usually benefits recipient.
            </p>
          </div>

          <h2>Child vs Spousal Support</h2>

          <h3>Key Tax Differences</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Child Support</th>
                <th>Spousal Support</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tax to payer</td>
                <td>No deduction</td>
                <td>Deductible</td>
              </tr>
              <tr>
                <td>Tax to recipient</td>
                <td>Not taxable</td>
                <td>Taxable income</td>
              </tr>
              <tr>
                <td>Affects benefits</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <h3>Priority Rule</h3>
          <ul>
            <li>Child support has priority</li>
            <li>If paying both, child support paid first</li>
            <li>Only excess over child support is spousal</li>
            <li>Important for mixed payments</li>
          </ul>

          <h2>Federal Child Support Guidelines</h2>

          <h3>How Amounts Are Calculated</h3>
          <ul>
            <li>Based on payer's gross income</li>
            <li>Number of children</li>
            <li>Province of residence</li>
            <li>Standard tables provide amounts</li>
          </ul>

          <h3>Special Expenses (Section 7)</h3>
          <ul>
            <li>Childcare</li>
            <li>Medical/dental expenses</li>
            <li>Educational expenses</li>
            <li>Extracurricular activities</li>
            <li>Shared based on incomes</li>
          </ul>

          <h2>Impact on Government Benefits</h2>

          <h3>Child Support Received</h3>
          <ul>
            <li>Does NOT affect Canada Child Benefit</li>
            <li>Does NOT affect GST/HST credit</li>
            <li>Not counted as income anywhere</li>
            <li>No reporting on tax return</li>
          </ul>

          <h3>Child Support Paid</h3>
          <ul>
            <li>Does NOT reduce payer's income</li>
            <li>No benefit to payer's CCB</li>
            <li>Payer's income stays same for benefits</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Contrast with Spousal Support:</strong> Spousal support affects net income. Payer gets reduced income (more benefits), recipient gets increased income (fewer benefits).
            </p>
          </div>

          <h2>Shared Custody Situations</h2>

          <h3>40%+ Time With Each Parent</h3>
          <ul>
            <li>Offset calculation may apply</li>
            <li>Both parents calculate support</li>
            <li>Higher earner pays difference</li>
            <li>Still tax-neutral</li>
          </ul>

          <h3>Split Custody</h3>
          <ul>
            <li>Each parent has custody of different children</li>
            <li>Cross-payments calculated</li>
            <li>Net amount paid</li>
            <li>Same tax treatment</li>
          </ul>

          <h2>Documentation Best Practices</h2>

          <h3>Keep Records Of</h3>
          <ul>
            <li>Court order or agreement</li>
            <li>Payment records (bank statements)</li>
            <li>Receipts for special expenses</li>
            <li>Income information exchanges</li>
          </ul>

          <h3>Why Documentation Matters</h3>
          <ul>
            <li>Proves payments made/received</li>
            <li>Distinguishes child from spousal support</li>
            <li>Supports variation applications</li>
            <li>Protection in disputes</li>
          </ul>

          <h2>Variations and Modifications</h2>

          <h3>When Support Changes</h3>
          <ul>
            <li>Income changes significantly</li>
            <li>Custody arrangements change</li>
            <li>Child's circumstances change</li>
            <li>Child becomes independent</li>
          </ul>

          <h3>Tax Implications of Changes</h3>
          <ul>
            <li>Modified child support still tax-neutral</li>
            <li>Retroactive payments not taxable</li>
            <li>Arrears payments tax-free</li>
          </ul>

          <h2>When Child Support Ends</h2>

          <h3>Typical End Points</h3>
          <ul>
            <li>Child turns 18 (basic)</li>
            <li>Child finishes full-time education</li>
            <li>Child marries</li>
            <li>Child becomes self-supporting</li>
          </ul>

          <h3>University Students</h3>
          <ul>
            <li>Support often continues through school</li>
            <li>Agreement should specify</li>
            <li>May include tuition/living expenses</li>
            <li>All still tax-neutral</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Undue Hardship</h3>
          <ul>
            <li>Guideline amount may be varied</li>
            <li>Unusual expenses (debt, other children)</li>
            <li>Must compare household standards</li>
            <li>Tax treatment unchanged</li>
          </ul>

          <h3>High Income Earners ($150,000+)</h3>
          <ul>
            <li>Tables provide amounts up to $150,000</li>
            <li>Above that, court discretion</li>
            <li>May use percentage of income</li>
            <li>Same tax rules apply</li>
          </ul>

          <h3>Self-Employed Parents</h3>
          <ul>
            <li>Income determined for guidelines</li>
            <li>May include business income additions</li>
            <li>Corporate income may be attributed</li>
            <li>Support remains tax-neutral</li>
          </ul>

          <h2>Enforcement and Arrears</h2>

          <h3>Enforcement Agencies</h3>
          <ul>
            <li>Family Responsibility Office (Ontario)</li>
            <li>Maintenance Enforcement Program (other provinces)</li>
            <li>Garnishment of wages</li>
            <li>License suspensions</li>
          </ul>

          <h3>Arrears Tax Treatment</h3>
          <ul>
            <li>Back payments still tax-neutral</li>
            <li>Interest on arrears not taxable</li>
            <li>No deduction for payer</li>
          </ul>

          <h2>Common Misconceptions</h2>

          <h3>"I Can Deduct Child Support"</h3>
          <ul>
            <li>Not since May 1997 (new agreements)</li>
            <li>Only spousal support is deductible</li>
            <li>Check your agreement's commencement date</li>
          </ul>

          <h3>"It Counts as Income for Benefits"</h3>
          <ul>
            <li>Child support does NOT affect CCB</li>
            <li>Does NOT count for GST/HST credit</li>
            <li>Spousal support DOES count</li>
          </ul>

          <h3>"I Need to Report It Somewhere"</h3>
          <ul>
            <li>No tax return line for child support</li>
            <li>Neither payer nor recipient reports</li>
            <li>Keep records but no CRA reporting</li>
          </ul>

          <h2>Related Tax Considerations</h2>

          <h3>Who Claims the Child?</h3>
          <ul>
            <li>Dependent credits separate from support</li>
            <li>Primary caregiver usually claims</li>
            <li>Can agree to split some credits</li>
            <li>See CRA guidelines on shared custody</li>
          </ul>

          <h3>Medical Expenses</h3>
          <ul>
            <li>Either parent may claim</li>
            <li>Whoever pays can claim</li>
            <li>Cannot double-claim same expense</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Child Support?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about child support and taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Child support calculations and obligations involve legal considerations. Consult a family lawyer for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
