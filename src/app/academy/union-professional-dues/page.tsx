import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Union & Professional Dues Tax Deduction Canada 2024 | CRA Guide',
  description: 'Complete guide to deducting union dues and professional fees in Canada. Learn what qualifies, how to claim, and maximize your employment expense deductions.',
  keywords: 'union dues tax deduction Canada, professional membership fees tax, annual professional dues CRA, employment expenses deduction',
}

export default function UnionProfessionalDuesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-200 dark:bg-slate-700 p-2.5 rounded-xl">
              <Users className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Union & Professional Dues Deduction Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />6 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Line 21200 Deduction</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Union dues and professional membership fees required for your employment are deductible on Line 21200 of your tax return. These reduce your taxable income directly, making them more valuable at higher tax brackets.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Union Dues</h2>
          <p>Union dues are fully deductible if you're required to pay them as a condition of employment.</p>

          <h3>What Qualifies</h3>
          <ul>
            <li>Annual membership dues to a trade union or association of public servants</li>
            <li>Dues to a parity or advisory committee required by provincial law</li>
            <li>Professional board levies required for certification</li>
          </ul>

          <h3>Where to Find the Amount</h3>
          <ul>
            <li><strong>Box 44 of your T4:</strong> Shows union dues deducted from pay</li>
            <li><strong>Separate receipt:</strong> If not on T4, get receipt from union</li>
          </ul>

          <h2>Professional Membership Dues</h2>
          <p>Annual professional membership fees are deductible if membership is required to maintain a professional status recognized by law.</p>

          <h3>Examples of Deductible Professional Dues</h3>
          <ul>
            <li><strong>Accountants:</strong> CPA provincial body fees</li>
            <li><strong>Lawyers:</strong> Law society fees</li>
            <li><strong>Engineers:</strong> Professional engineers association</li>
            <li><strong>Doctors:</strong> Provincial medical association</li>
            <li><strong>Nurses:</strong> College of nurses fees</li>
            <li><strong>Teachers:</strong> Teaching certification fees</li>
            <li><strong>Real estate agents:</strong> Real estate board fees</li>
            <li><strong>Pharmacists:</strong> College of pharmacists</li>
          </ul>

          <h3>Key Requirement</h3>
          <p>The membership must be required to maintain a professional status recognized by statute. Voluntary professional associations typically don't qualify.</p>

          <h2>What Doesn't Qualify</h2>
          <ul>
            <li><strong>Initiation fees:</strong> One-time joining fees are not deductible</li>
            <li><strong>Special assessments:</strong> Levies for capital projects</li>
            <li><strong>Pension contributions:</strong> Claimed separately</li>
            <li><strong>Insurance premiums:</strong> Liability or malpractice insurance</li>
            <li><strong>Voluntary memberships:</strong> Optional industry associations</li>
            <li><strong>Licensing fees:</strong> Business licenses (self-employed claim differently)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Note:</strong> Malpractice or liability insurance premiums are NOT deductible for employees, even if required by your profession. Only self-employed professionals can deduct these as business expenses.
            </p>
          </div>

          <h2>How to Claim</h2>

          <h3>Step 1: Gather Documentation</h3>
          <ul>
            <li>T4 slip showing Box 44 amounts</li>
            <li>Receipts from professional bodies</li>
            <li>Proof of payment for dues not on T4</li>
          </ul>

          <h3>Step 2: Calculate Total</h3>
          <p>Add up all qualifying union dues and professional fees paid during the tax year.</p>

          <h3>Step 3: Report on Return</h3>
          <p>Enter total on Line 21200 of your T1 return.</p>

          <h2>T4 Box 44 vs. Separate Receipts</h2>

          <h3>Shown on T4</h3>
          <p>If your employer deducts union dues from your pay, they'll appear in Box 44 of your T4. Simply transfer this amount to Line 21200.</p>

          <h3>Paid Directly</h3>
          <p>If you pay professional dues directly to the organization (not through your employer), you need a receipt showing:</p>
          <ul>
            <li>Organization name</li>
            <li>Your name as member</li>
            <li>Amount paid</li>
            <li>Period covered</li>
            <li>Date of payment</li>
          </ul>

          <h2>Self-Employed vs. Employees</h2>

          <h3>Employees</h3>
          <ul>
            <li>Claim on Line 21200</li>
            <li>Deduction from net income</li>
            <li>No need for T2200 form</li>
          </ul>

          <h3>Self-Employed</h3>
          <ul>
            <li>Claim as business expense on T2125</li>
            <li>Can also deduct liability insurance</li>
            <li>Include in professional fees category</li>
          </ul>

          <h2>Common Professions and Dues</h2>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Profession</th>
                <th>Typical Annual Dues</th>
                <th>Deductible?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPA</td>
                <td>$500-$1,500</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Lawyer</td>
                <td>$1,500-$3,000</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Nurse (RN)</td>
                <td>$300-$600</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Teacher</td>
                <td>$200-$500</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Union member</td>
                <td>Varies</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Trade certification</td>
                <td>$100-$300</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>

          <h2>Timing Considerations</h2>
          <ul>
            <li><strong>Claim in year paid:</strong> Deduct dues in the year you actually paid them</li>
            <li><strong>Prepaid dues:</strong> If you pay 2025 dues in December 2024, claim in 2024</li>
            <li><strong>Arrears:</strong> Past-year dues paid this year are deductible now</li>
          </ul>

          <h2>Documentation Requirements</h2>
          <p>Keep these records for 6 years:</p>
          <ul>
            <li>T4 slips showing Box 44</li>
            <li>Official receipts from professional bodies</li>
            <li>Bank statements or credit card receipts as backup</li>
            <li>Proof membership is required for your position</li>
          </ul>

          <h2>Example Scenario</h2>
          <p>Sarah is a registered nurse and union member:</p>
          <ul>
            <li>Union dues (Box 44 on T4): $780</li>
            <li>College of Nurses annual fee: $265</li>
            <li><strong>Total Line 21200 deduction: $1,045</strong></li>
          </ul>
          <p>At a 30% marginal tax rate, this saves Sarah about $314 in taxes.</p>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Claiming voluntary memberships:</strong> Only statutory requirements qualify</li>
            <li><strong>Double-counting T4 amounts:</strong> Don't claim twice if on T4</li>
            <li><strong>Including insurance:</strong> Employees can't deduct professional liability insurance</li>
            <li><strong>Missing direct payments:</strong> Don't forget dues paid outside payroll</li>
            <li><strong>Claiming initiation fees:</strong> One-time fees don't qualify</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Professional Dues?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about employment expense deductions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. If you're unsure whether your professional membership qualifies, consult a tax professional or check CRA's list of deductible professional memberships.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
