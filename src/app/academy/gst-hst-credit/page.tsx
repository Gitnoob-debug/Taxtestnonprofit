import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Receipt, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GST/HST Credit Canada 2024 | Eligibility, Amounts & Payment Dates',
  description: 'Complete guide to the GST/HST Credit in Canada. Learn eligibility requirements, payment amounts, income thresholds, and how to receive your quarterly payments.',
  keywords: 'GST HST credit Canada, GST credit payment dates, GST credit eligibility, low income tax credit Canada',
}

export default function GSTHSTCreditPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-900 p-2.5 rounded-xl">
              <Receipt className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            GST/HST Credit: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />7 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">Tax-Free Quarterly Payment</h2>
          <p className="text-cyan-700 dark:text-cyan-300 text-sm">
            The GST/HST credit helps offset the sales tax paid by low and modest-income Canadians. It's a tax-free quarterly payment calculated automatically when you file your tax return.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>2024-2025 Maximum Amounts</h2>
          <p>For the July 2024 to June 2025 payment period:</p>
          <ul>
            <li><strong>Single person:</strong> $519</li>
            <li><strong>Married/common-law couple:</strong> $680</li>
            <li><strong>Per child under 19:</strong> $179</li>
          </ul>
          <p>Single parents receive the spouse amount for their first child.</p>

          <h2>Eligibility Requirements</h2>
          <p>You may qualify for the GST/HST credit if you:</p>
          <ul>
            <li>Are a Canadian resident for income tax purposes</li>
            <li>Are 19 years old or older, OR</li>
            <li>Have a spouse or common-law partner, OR</li>
            <li>Are a parent and live with your child</li>
          </ul>

          <h2>Income Thresholds</h2>
          <p>The credit phases out as income increases. For 2024-2025 (based on 2023 income):</p>

          <h3>Single Person</h3>
          <ul>
            <li>Full amount: Net income under ~$42,000</li>
            <li>Partial amount: Net income ~$42,000 - $52,000</li>
            <li>No credit: Net income over ~$52,000</li>
          </ul>

          <h3>Couple (No Children)</h3>
          <ul>
            <li>Full amount: Family net income under ~$55,000</li>
            <li>Partial amount: Family income ~$55,000 - $58,000</li>
            <li>No credit: Family income over ~$58,000</li>
          </ul>

          <h3>Family with Children</h3>
          <p>Thresholds increase with each child. A family with 2 children may receive partial credit with income up to ~$65,000.</p>

          <h2>Payment Schedule</h2>
          <p>GST/HST credit is paid quarterly:</p>
          <ul>
            <li><strong>January 5</strong></li>
            <li><strong>April 5</strong></li>
            <li><strong>July 5</strong></li>
            <li><strong>October 5</strong></li>
          </ul>
          <p>If the 5th falls on a weekend or holiday, payment is made the last business day before.</p>

          <h2>How to Receive the Credit</h2>
          <p>No separate application is needed:</p>
          <ol>
            <li>File your annual tax return</li>
            <li>CRA calculates your eligibility automatically</li>
            <li>Payments are sent to your CRA direct deposit or by cheque</li>
          </ol>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Important:</strong> You must file a tax return every year to continue receiving GST/HST credit, even if you have no income. Failing to file will stop your payments.
            </p>
          </div>

          <h2>How the Credit Is Calculated</h2>

          <h3>Base Calculation</h3>
          <p>The credit consists of:</p>
          <ul>
            <li>Base amount for you</li>
            <li>Additional amount for spouse (if applicable)</li>
            <li>Amount for each child under 19</li>
          </ul>

          <h3>Phase-Out</h3>
          <p>The credit is reduced by 5% of family net income exceeding the threshold. The reduction continues until the credit reaches zero.</p>

          <h2>Newcomers to Canada</h2>
          <p>If you're new to Canada:</p>
          <ul>
            <li>Complete Form RC151 (GST/HST Credit Application)</li>
            <li>Include with your first Canadian tax return</li>
            <li>Payments begin in the quarter after CRA processes your application</li>
            <li>May receive prorated amount for partial year</li>
          </ul>

          <h2>Young Adults Turning 19</h2>
          <p>If you turn 19 during the year:</p>
          <ul>
            <li>File a tax return for the year you turn 19</li>
            <li>Payments automatically start after your 19th birthday</li>
            <li>First payment is usually in the quarter after you turn 19</li>
          </ul>

          <h2>Changes in Circumstances</h2>

          <h3>Marriage or Common-Law</h3>
          <p>Notify CRA of new spouse/partner. Credit will be recalculated based on combined family income.</p>

          <h3>Separation or Divorce</h3>
          <p>Notify CRA immediately. Credit will be recalculated based on individual income.</p>

          <h3>New Child</h3>
          <p>Register child through Canada Child Benefit application. GST/HST credit amount will increase.</p>

          <h3>Change of Address</h3>
          <p>Update your address with CRA to ensure payments reach you.</p>

          <h2>Direct Deposit</h2>
          <p>Set up direct deposit through:</p>
          <ul>
            <li>CRA My Account online</li>
            <li>Through your bank's online banking</li>
            <li>By calling CRA</li>
          </ul>
          <p>This ensures faster, more reliable payments.</p>

          <h2>Provincial/Territorial Top-Ups</h2>
          <p>Some provinces add their own credits to GST/HST payments:</p>
          <ul>
            <li><strong>Ontario:</strong> Ontario Sales Tax Credit (up to $360/person)</li>
            <li><strong>BC:</strong> BC Climate Action Tax Credit</li>
            <li><strong>Saskatchewan:</strong> Saskatchewan Low-Income Tax Credit</li>
            <li><strong>Other provinces:</strong> Various additional credits</li>
          </ul>
          <p>These are calculated and paid together with GST/HST credit.</p>

          <h2>Common Questions</h2>

          <h3>Why didn't I receive a payment?</h3>
          <ul>
            <li>You didn't file a tax return</li>
            <li>Your income exceeded the threshold</li>
            <li>Your address with CRA is outdated</li>
            <li>You're under 19 without a spouse or child</li>
          </ul>

          <h3>Can I get credit for past years?</h3>
          <p>If you didn't file in previous years, file those returns now. CRA will calculate any missed credits.</p>

          <h3>Is the GST/HST credit taxable?</h3>
          <p>No, the GST/HST credit is completely tax-free and doesn't need to be reported as income.</p>

          <h2>Example Calculations</h2>

          <h3>Single Person, $25,000 Income</h3>
          <ul>
            <li>Base amount: $519</li>
            <li>Income is under threshold</li>
            <li><strong>Annual credit: $519 ($129.75/quarter)</strong></li>
          </ul>

          <h3>Family of 4, $50,000 Income</h3>
          <ul>
            <li>Adult amounts: $680</li>
            <li>2 children × $179: $358</li>
            <li>Total before phase-out: $1,038</li>
            <li>Income under threshold, no reduction</li>
            <li><strong>Annual credit: $1,038 ($259.50/quarter)</strong></li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About GST/HST Credit?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about your GST/HST credit eligibility.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> GST/HST credit amounts and thresholds are adjusted annually for inflation. This guide uses 2024-2025 figures. Check CRA's website for current amounts.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
