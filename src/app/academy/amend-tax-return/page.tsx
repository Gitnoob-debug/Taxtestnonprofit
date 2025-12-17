import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Edit3, ArrowRight, CheckCircle, AlertTriangle, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Amend Your Tax Return in Canada 2025 | CRA Adjustment Request Guide',
  description: 'Complete guide to amending your Canadian tax return. Learn how to fix errors, claim missed deductions, use CRA My Account, ReFILE, or T1-ADJ form. Step-by-step instructions.',
  keywords: 'amend tax return Canada, T1 adjustment request, fix tax return CRA, change my return Canada, refile taxes Canada, CRA adjustment, correct tax return, missed deduction',
  openGraph: {
    title: 'How to Amend Your Tax Return in Canada | Step-by-Step Guide',
    description: 'Made a mistake on your tax return? Learn 3 ways to fix it: CRA My Account, ReFILE, or T1-ADJ form.',
    type: 'article',
  },
}

export default function AmendTaxReturnPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2.5 rounded-xl">
              <Edit3 className="h-6 w-6 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-600">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            How to Amend Your Tax Return in Canada
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Made a mistake or forgot a deduction? Here's how to fix your tax return and potentially get more money back.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 mb-4 text-xl">Good News: Mistakes Can Be Fixed</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">10 Year Window</p>
                <p className="text-green-700 text-sm">Adjust returns from the past 10 years</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">Free to Submit</p>
                <p className="text-green-700 text-sm">No fee for adjustment requests</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">2 Week Processing</p>
                <p className="text-green-700 text-sm">Online submissions are fast</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">

          <h2 id="when-to-amend">When Should You Amend Your Tax Return?</h2>
          <p>
            You should consider amending your tax return if you:
          </p>
          <ul>
            <li><strong>Forgot to claim a deduction</strong> – RRSP contributions, childcare expenses, moving expenses</li>
            <li><strong>Missed a tax credit</strong> – Medical expenses, donations, tuition transfers</li>
            <li><strong>Received a late tax slip</strong> – T4, T5, T3 that arrived after you filed</li>
            <li><strong>Made a calculation error</strong> – Wrong amounts entered</li>
            <li><strong>Forgot to report income</strong> – Better to self-report than wait for CRA</li>
            <li><strong>Didn't claim all eligible expenses</strong> – Work from home, employment expenses</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Important Timing</p>
                <p className="text-amber-700 text-sm">
                  Wait until you receive your <strong>Notice of Assessment (NOA)</strong> before submitting an adjustment.
                  CRA processes changes faster once your original return is assessed.
                </p>
              </div>
            </div>
          </div>

          <h2 id="three-methods">3 Ways to Amend Your Return</h2>

          <h3>Method 1: CRA My Account (Recommended)</h3>
          <p>The fastest and easiest way to make changes:</p>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Step-by-Step Instructions</h4>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="font-bold text-emerald-600">1.</span> Log in to <strong>CRA My Account</strong> at canada.ca</li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">2.</span> Click <strong>"Change my return"</strong> under Tax Returns</li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">3.</span> Select the <strong>tax year</strong> you want to change</li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">4.</span> Find the <strong>line number(s)</strong> you need to change</li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">5.</span> Enter the <strong>corrected amounts</strong></li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">6.</span> Explain <strong>why</strong> you're making the change</li>
              <li className="flex gap-2"><span className="font-bold text-emerald-600">7.</span> Submit and save your <strong>confirmation number</strong></li>
            </ol>
            <p className="text-slate-600 text-sm mt-4">
              <strong>Processing time:</strong> Usually 2 weeks
            </p>
          </div>

          <h3>Method 2: ReFILE (Through Tax Software)</h3>
          <p>
            If you used NETFILE-certified software to file your return, you can use ReFILE to submit changes:
          </p>
          <ul>
            <li>Use the <strong>same software</strong> you originally filed with</li>
            <li>Make your corrections directly in the return</li>
            <li>Submit via ReFILE option</li>
            <li>Available from <strong>mid-February to late January</strong> of the following year</li>
          </ul>

          <h3>Method 3: Paper Form T1-ADJ</h3>
          <p>
            For those who prefer paper or don't have online access:
          </p>
          <ul>
            <li>Download <strong>Form T1-ADJ</strong> from CRA website</li>
            <li>Complete details of each change</li>
            <li>Attach <strong>supporting documents</strong> (receipts, slips)</li>
            <li>Mail to your <strong>tax centre</strong></li>
            <li>Processing takes <strong>8+ weeks</strong></li>
          </ul>

          <h2 id="processing-times">Processing Times by Method</h2>
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Method</th>
                  <th className="text-left p-3 font-semibold border-b">Processing Time</th>
                  <th className="text-left p-3 font-semibold border-b">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="p-3 border-b font-medium">CRA My Account</td>
                  <td className="p-3 border-b text-green-700 font-bold">~2 weeks</td>
                  <td className="p-3 border-b">Most changes, fastest results</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">ReFILE</td>
                  <td className="p-3 border-b">~2 weeks</td>
                  <td className="p-3 border-b">If you have your tax software</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">T1-ADJ Paper Form</td>
                  <td className="p-3 border-b text-amber-600">8+ weeks</td>
                  <td className="p-3 border-b">Complex changes with documents</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="common-scenarios">Common Amendment Scenarios</h2>

          <h3>Claiming Missed RRSP Contributions</h3>
          <p>One of the most common reasons to amend:</p>
          <ul>
            <li>Find your <strong>RRSP contribution receipts</strong></li>
            <li>Verify contributions were made by the <strong>deadline</strong> (March 1 for previous tax year)</li>
            <li>Adjust <strong>Line 20800</strong> (RRSP deduction)</li>
            <li>Check your <strong>RRSP deduction limit</strong> on your NOA</li>
          </ul>

          <h3>Adding Medical Expenses</h3>
          <ul>
            <li>Gather all <strong>medical receipts</strong></li>
            <li>Remember you can claim a <strong>12-month period</strong> ending in the tax year</li>
            <li>Include prescriptions, dental, vision, travel for medical care</li>
            <li>Adjust <strong>Line 33099</strong> (for yourself/spouse) or <strong>Line 33199</strong> (for dependants)</li>
          </ul>

          <h3>Claiming Charitable Donations</h3>
          <ul>
            <li>Donations can be carried forward <strong>up to 5 years</strong></li>
            <li>Need <strong>official receipts</strong> from registered charities</li>
            <li>Adjust <strong>Schedule 9</strong> and <strong>Line 34900</strong></li>
          </ul>

          <h3>Reporting Forgotten Income</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
            <p className="text-blue-800 text-sm">
              <strong>Pro Tip:</strong> If you forgot to report income, it's better to <strong>self-report</strong> before CRA contacts you.
              You may avoid penalties through the <strong>Voluntary Disclosures Program</strong>, though interest will still apply.
            </p>
          </div>

          <h2 id="what-you-need">What You'll Need</h2>

          <h3>Information Required</h3>
          <ul>
            <li><strong>Tax year</strong> being amended</li>
            <li><strong>Line numbers</strong> affected</li>
            <li><strong>Original amounts</strong> you claimed</li>
            <li><strong>New corrected amounts</strong></li>
            <li><strong>Clear explanation</strong> of why you're making the change</li>
          </ul>

          <h3>Supporting Documents (Keep These)</h3>
          <ul>
            <li>T4, T5, T3 slips</li>
            <li>RRSP contribution receipts</li>
            <li>Medical expense receipts</li>
            <li>Donation receipts (official tax receipts only)</li>
            <li>T2202 (tuition) forms</li>
            <li>Any other relevant receipts</li>
          </ul>

          <h2 id="after-submission">What Happens After You Submit</h2>

          <h3>If Your Refund Increases</h3>
          <ul>
            <li>CRA sends a <strong>Notice of Reassessment</strong></li>
            <li>Additional refund deposited to your account (or mailed)</li>
            <li>CRA pays <strong>interest</strong> on refunds owed to you</li>
          </ul>

          <h3>If You Owe More Tax</h3>
          <ul>
            <li>CRA sends a <strong>Notice of Reassessment</strong> with amount owing</li>
            <li>Payment due <strong>immediately</strong></li>
            <li><strong>Interest charges</strong> from original filing deadline</li>
            <li>Set up a <strong>payment plan</strong> if needed</li>
          </ul>

          <h2 id="cannot-change">What You Cannot Change</h2>
          <ul>
            <li><strong>Certain elections</strong> that are irrevocable once made</li>
            <li><strong>Filing status</strong> in some situations</li>
            <li><strong>Principal residence designation</strong> (limited exceptions)</li>
            <li><strong>Statute-barred years</strong> (beyond 10 years)</li>
          </ul>

          <h2 id="multiple-years">Changing Multiple Years</h2>
          <p>You can submit adjustments for multiple tax years:</p>
          <ul>
            <li>Submit a <strong>separate request for each year</strong></li>
            <li>CRA processes <strong>earlier years first</strong></li>
            <li><strong>Carryforward amounts</strong> (like capital losses) are automatically updated</li>
            <li>Each year's change may affect subsequent years</li>
          </ul>

          <h2 id="track-status">Track Your Adjustment</h2>
          <p>Monitor your adjustment request:</p>
          <ul>
            <li>Log in to <strong>CRA My Account</strong></li>
            <li>Check <strong>"Status of adjustment request"</strong></li>
            <li>Watch for <strong>Notice of Reassessment</strong> in mail/My Account</li>
          </ul>

          <div className="bg-red-50 border border-red-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-red-900 mb-1">Don't File a Duplicate Return</p>
                <p className="text-red-700 text-sm">
                  Never file a second tax return for the same year. This causes significant processing delays.
                  Always use the adjustment process instead.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Need Help With Your Amendment?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help you figure out which lines to change and what documentation you need.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> This guide provides general information about amending tax returns in Canada.
              Complex situations involving significant amounts or multiple years may benefit from professional tax advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
