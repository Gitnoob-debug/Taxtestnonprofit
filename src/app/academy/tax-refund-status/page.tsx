import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Search, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Check Tax Refund Status Canada 2024 | CRA Refund Tracker',
  description: 'How to check your CRA tax refund status. Learn refund processing times, how to track your refund, common delays, and when to expect your money.',
  keywords: 'CRA refund status, check tax refund Canada, when will I get my refund CRA, tax refund timeline Canada',
}

export default function TaxRefundStatusPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-2.5 rounded-xl">
              <Search className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How to Check Your Tax Refund Status
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />6 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 dark:text-green-100 mb-3">Typical Refund Timeline</h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            <strong>NETFILE + Direct Deposit:</strong> 8-14 business days<br />
            <strong>Paper Return:</strong> 8-12 weeks
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How to Check Your Refund Status</h2>

          <h3>Method 1: CRA My Account (Best)</h3>
          <ol>
            <li>Log in to CRA My Account</li>
            <li>Look for "Refund status" on dashboard</li>
            <li>See processing stage and expected date</li>
          </ol>

          <h3>Method 2: MyCRA Mobile App</h3>
          <ul>
            <li>Download MyCRA app</li>
            <li>Log in with same credentials</li>
            <li>Check refund status on the go</li>
          </ul>

          <h3>Method 3: Phone (Automated)</h3>
          <ul>
            <li>Call: 1-800-959-1956</li>
            <li>Have SIN and date of birth ready</li>
            <li>Automated system provides status</li>
          </ul>

          <h2>Refund Status Meanings</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Status</th>
                <th>What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Received</td>
                <td>CRA has your return, processing hasn't started</td>
              </tr>
              <tr>
                <td>Processing</td>
                <td>Being reviewed, usually 1-2 weeks to complete</td>
              </tr>
              <tr>
                <td>Assessed</td>
                <td>Review complete, refund amount confirmed</td>
              </tr>
              <tr>
                <td>Sent</td>
                <td>Refund issued via direct deposit or cheque</td>
              </tr>
            </tbody>
          </table>

          <h2>Processing Times by Filing Method</h2>

          <h3>NETFILE (Electronic)</h3>
          <ul>
            <li><strong>With Direct Deposit:</strong> 8-14 business days</li>
            <li><strong>With Cheque:</strong> 4-6 weeks</li>
          </ul>

          <h3>Paper Return (Mailed)</h3>
          <ul>
            <li><strong>Processing time:</strong> 8-12 weeks</li>
            <li><strong>During peak season:</strong> May take longer</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Set up direct deposit BEFORE filing to get your refund faster. You can update banking info in My Account.
            </p>
          </div>

          <h2>Common Reasons for Delays</h2>

          <h3>Review Selected</h3>
          <ul>
            <li>CRA may review returns randomly</li>
            <li>May request supporting documents</li>
            <li>Can add 4-8 weeks to processing</li>
          </ul>

          <h3>Missing Information</h3>
          <ul>
            <li>Errors on your return</li>
            <li>Missing slips or schedules</li>
            <li>SIN doesn't match records</li>
          </ul>

          <h3>Outstanding Debts</h3>
          <ul>
            <li>Previous tax balance owing</li>
            <li>Student loans in default</li>
            <li>Family support payment arrears</li>
            <li>EI or benefit overpayments</li>
          </ul>

          <h3>First-Time Filers</h3>
          <ul>
            <li>Identity verification may be needed</li>
            <li>Can take longer than established filers</li>
          </ul>

          <h2>What If Your Refund Is Different?</h2>
          <p>Your Notice of Assessment (NOA) will explain any differences:</p>
          <ul>
            <li>Mathematical corrections</li>
            <li>Disallowed deductions or credits</li>
            <li>Applied to outstanding balance</li>
            <li>Provincial changes</li>
          </ul>

          <h3>Disagreeing with Assessment</h3>
          <ul>
            <li>Review NOA carefully</li>
            <li>File objection within 90 days if needed</li>
            <li>Request adjustment if you made an error</li>
          </ul>

          <h2>Speed Up Your Refund</h2>

          <h3>Before Filing</h3>
          <ul>
            <li>Set up CRA My Account</li>
            <li>Register direct deposit</li>
            <li>Ensure address is current</li>
          </ul>

          <h3>When Filing</h3>
          <ul>
            <li>Use NETFILE (electronic filing)</li>
            <li>File early (before peak season)</li>
            <li>Double-check all information</li>
            <li>Include all required slips</li>
          </ul>

          <h3>After Filing</h3>
          <ul>
            <li>Don't file duplicate returns</li>
            <li>Respond quickly to CRA requests</li>
            <li>Keep records organized</li>
          </ul>

          <h2>Refund Offset</h2>
          <p>CRA may apply your refund to debts:</p>
          <ul>
            <li>Prior year taxes owing</li>
            <li>GST/HST credits overpayment</li>
            <li>Canada Child Benefit overpayment</li>
            <li>Student loan in collections</li>
            <li>Provincial debts</li>
          </ul>
          <p>Your NOA will show any amounts offset.</p>

          <h2>When to Contact CRA</h2>
          <ul>
            <li>NETFILE: After 14 business days with no update</li>
            <li>Paper: After 10 weeks with no update</li>
            <li>Status hasn't changed for 4+ weeks</li>
            <li>Requested documents already sent</li>
          </ul>

          <h3>Contact Information</h3>
          <ul>
            <li><strong>Phone:</strong> 1-800-959-8281</li>
            <li><strong>Hours:</strong> Mon-Fri, varies by season</li>
            <li><strong>Have ready:</strong> SIN, DOB, address, return info</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Your Refund?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer questions about refund processing.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Processing times may vary. Check CRA for current timelines.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
