import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Edit3, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Amend Tax Return Canada | CRA Adjustment Request',
  description: 'Complete guide to amending your tax return in Canada. Learn how to fix errors, claim missed deductions, and submit adjustment requests to CRA.',
  keywords: 'amend tax return Canada, T1 adjustment request, fix tax return CRA, change my return, refile taxes Canada',
}

export default function AmendTaxReturnPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Edit3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How to Amend Your Tax Return
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />7 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Good News: You Can Fix Mistakes</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Made an error or forgot a deduction? You can adjust your tax return for up to 10 previous years. CRA makes it easy to correct mistakes.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>When to Amend Your Return</h2>

          <h3>Common Reasons</h3>
          <ul>
            <li>Forgot to claim a deduction or credit</li>
            <li>Received a late tax slip</li>
            <li>Made a mathematical error</li>
            <li>Entered wrong amount</li>
            <li>Missed RRSP contribution</li>
            <li>Forgot medical expenses</li>
            <li>Didn't claim charitable donations</li>
          </ul>

          <h3>Time Limits</h3>
          <ul>
            <li><strong>General:</strong> Up to 10 previous tax years</li>
            <li><strong>Most changes:</strong> Processed within 2 weeks (online)</li>
            <li><strong>Complex changes:</strong> May take 8+ weeks</li>
          </ul>

          <h2>How to Make Changes</h2>

          <h3>Option 1: CRA My Account (Fastest)</h3>
          <ol>
            <li>Log in to CRA My Account</li>
            <li>Select "Change my return"</li>
            <li>Choose the tax year to change</li>
            <li>Select the line(s) to change</li>
            <li>Enter correct information</li>
            <li>Submit request</li>
          </ol>

          <h3>Option 2: ReFILE (Through Tax Software)</h3>
          <ul>
            <li>Use same software you filed with</li>
            <li>Make corrections to your return</li>
            <li>Submit via ReFILE</li>
            <li>Available mid-February onwards</li>
          </ul>

          <h3>Option 3: Form T1-ADJ (By Mail)</h3>
          <ul>
            <li>Complete Form T1-ADJ</li>
            <li>Explain each change</li>
            <li>Attach supporting documents</li>
            <li>Mail to your tax centre</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Wait until you receive your Notice of Assessment before requesting changes. CRA processes adjustments faster once the original return is assessed.
            </p>
          </div>

          <h2>What You'll Need</h2>

          <h3>For All Changes</h3>
          <ul>
            <li>Tax year being changed</li>
            <li>Specific line numbers affected</li>
            <li>Original amounts claimed</li>
            <li>Corrected amounts</li>
            <li>Reason for change</li>
          </ul>

          <h3>Supporting Documents</h3>
          <ul>
            <li>Receipts or slips (for new claims)</li>
            <li>T4, T5, or other slips (if correcting)</li>
            <li>Medical receipts</li>
            <li>Donation receipts</li>
          </ul>

          <h2>Processing Times</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Method</th>
                <th>Typical Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>My Account online</td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td>ReFILE</td>
                <td>2 weeks</td>
              </tr>
              <tr>
                <td>Paper (T1-ADJ)</td>
                <td>8+ weeks</td>
              </tr>
            </tbody>
          </table>

          <h2>Common Adjustment Scenarios</h2>

          <h3>Claiming Missed RRSP Contributions</h3>
          <ol>
            <li>Find your RRSP receipts</li>
            <li>Request adjustment to Line 20800</li>
            <li>Contributions must have been made by deadline</li>
          </ol>

          <h3>Adding Medical Expenses</h3>
          <ol>
            <li>Gather all receipts</li>
            <li>Calculate new total</li>
            <li>Adjust Line 33099 or 33199</li>
            <li>May need to recalculate 12-month period</li>
          </ol>

          <h3>Reporting Forgotten Income</h3>
          <ol>
            <li>Better to self-report than wait for CRA</li>
            <li>Add the income to appropriate line</li>
            <li>Pay any additional tax owing</li>
            <li>Interest charges may apply</li>
          </ol>

          <h3>Claiming Tuition Transfer</h3>
          <ol>
            <li>Get T2202 from student</li>
            <li>Student must designate transfer amount</li>
            <li>Parent/spouse claims on Schedule 11</li>
          </ol>

          <h2>What Happens After</h2>

          <h3>If Refund Increases</h3>
          <ul>
            <li>Additional refund sent to you</li>
            <li>Direct deposit or cheque</li>
            <li>Interest paid on amounts owed to you</li>
          </ul>

          <h3>If Balance Owing Increases</h3>
          <ul>
            <li>CRA sends notice of reassessment</li>
            <li>Payment due immediately</li>
            <li>Interest from original due date</li>
          </ul>

          <h2>What You Cannot Change</h2>
          <ul>
            <li><strong>Election choices:</strong> Some elections are irrevocable</li>
            <li><strong>Filing status:</strong> Cannot change in some cases</li>
            <li><strong>Principal residence designation:</strong> Limited changes</li>
          </ul>

          <h2>Multiple Year Changes</h2>
          <p>You can adjust multiple years at once:</p>
          <ul>
            <li>Submit separate request for each year</li>
            <li>Earlier years processed first</li>
            <li>Carryforward amounts automatically updated</li>
          </ul>

          <h2>Voluntary Disclosure Program</h2>
          <p>If you have unreported income from previous years:</p>
          <ul>
            <li>Report before CRA contacts you</li>
            <li>May avoid penalties</li>
            <li>Interest still charged</li>
            <li>Complex situations may need professional help</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Don't file a duplicate return. If you've already filed, submit an adjustment request instead. Duplicate returns cause processing delays and confusion.
            </p>
          </div>

          <h2>Track Your Adjustment</h2>
          <ul>
            <li>Check status in My Account</li>
            <li>Look for Notice of Reassessment</li>
            <li>Takes 2 weeks to 8+ weeks</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Amendments?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about changing your tax return.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Complex adjustments may benefit from professional assistance.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
