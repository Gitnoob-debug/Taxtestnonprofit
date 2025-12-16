import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to File Taxes in Canada 2025 | Step-by-Step Guide',
  description: 'Complete beginner guide to filing taxes in Canada for 2025. Learn what documents you need, free filing options, NETFILE, and step-by-step instructions for your tax return.',
  keywords: 'how to file taxes Canada 2025, file tax return online Canada, NETFILE, free tax software Canada, CRA tax filing',
}

export default function HowToFileTaxesCanadaPage() {
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
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            How to File Taxes in Canada: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Filing Is Easier Than You Think</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Most Canadians can file their taxes for free in under an hour using certified tax software. CRA's auto-fill feature imports most of your information automatically.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Step 1: Gather Your Documents</h2>

          <h3>Income Slips (You'll receive by end of February)</h3>
          <ul>
            <li><strong>T4:</strong> Employment income</li>
            <li><strong>T4A:</strong> Pension, retirement, scholarships</li>
            <li><strong>T4E:</strong> Employment Insurance</li>
            <li><strong>T5:</strong> Investment income</li>
            <li><strong>T3:</strong> Trust income (mutual funds)</li>
            <li><strong>T2202:</strong> Tuition (from school)</li>
          </ul>

          <h3>Receipts to Collect</h3>
          <ul>
            <li>RRSP contribution receipts</li>
            <li>Charitable donation receipts</li>
            <li>Medical expense receipts</li>
            <li>Childcare receipts</li>
            <li>Moving expense receipts (if applicable)</li>
            <li>Home office expenses (if applicable)</li>
          </ul>

          <h3>Other Information</h3>
          <ul>
            <li>Social Insurance Number (SIN)</li>
            <li>Direct deposit information</li>
            <li>Previous year's Notice of Assessment</li>
            <li>Spouse/partner's income (for credits)</li>
          </ul>

          <h2>Step 2: Choose How to File</h2>

          <h3>Option A: Free Tax Software (NETFILE)</h3>
          <p>Best for most people. CRA-certified free options include:</p>
          <ul>
            <li><strong>Wealthsimple Tax:</strong> Completely free, modern interface</li>
            <li><strong>TurboTax Free:</strong> For simple returns</li>
            <li><strong>H&R Block Free:</strong> Basic returns</li>
            <li><strong>CloudTax:</strong> Free tier available</li>
            <li><strong>StudioTax:</strong> Free desktop software</li>
          </ul>

          <h3>Option B: Community Volunteer Tax Clinic</h3>
          <p>Free in-person help if you have:</p>
          <ul>
            <li>Simple tax situation</li>
            <li>Modest income</li>
            <li>Need assistance with filing</li>
          </ul>

          <h3>Option C: Professional Tax Preparer</h3>
          <p>Consider if you have:</p>
          <ul>
            <li>Self-employment income</li>
            <li>Rental properties</li>
            <li>Complex investments</li>
            <li>Business income</li>
          </ul>

          <h2>Step 3: Use Auto-Fill My Return</h2>
          <p>CRA's auto-fill feature automatically imports:</p>
          <ul>
            <li>T4, T4A, T4E slips</li>
            <li>T5 investment slips</li>
            <li>RRSP contribution limits</li>
            <li>Previous year information</li>
            <li>Home Buyers' Plan balance</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> You need a CRA My Account to use auto-fill. Register early—it can take a few days for access.
            </p>
          </div>

          <h2>Step 4: Enter Your Information</h2>

          <h3>Personal Information</h3>
          <ul>
            <li>Name, address, date of birth</li>
            <li>Marital status (as of December 31)</li>
            <li>Spouse's information if applicable</li>
            <li>Dependant information</li>
          </ul>

          <h3>Income</h3>
          <ul>
            <li>Employment income (T4)</li>
            <li>Investment income (T5, T3)</li>
            <li>Self-employment income</li>
            <li>Rental income</li>
            <li>Other income sources</li>
          </ul>

          <h3>Deductions</h3>
          <ul>
            <li>RRSP contributions</li>
            <li>Union/professional dues</li>
            <li>Childcare expenses</li>
            <li>Moving expenses</li>
            <li>Employment expenses (if T2200)</li>
          </ul>

          <h3>Credits</h3>
          <ul>
            <li>Basic personal amount (automatic)</li>
            <li>Medical expenses</li>
            <li>Charitable donations</li>
            <li>Tuition (T2202)</li>
            <li>Disability amount</li>
          </ul>

          <h2>Step 5: Review and Submit</h2>

          <h3>Before Submitting</h3>
          <ul>
            <li>Review all entries for accuracy</li>
            <li>Check for missing slips</li>
            <li>Verify your refund/balance owing</li>
            <li>Look for optimization suggestions</li>
          </ul>

          <h3>Submit via NETFILE</h3>
          <ul>
            <li>Electronic submission directly to CRA</li>
            <li>Instant confirmation</li>
            <li>Faster refund processing</li>
            <li>Available mid-February to December</li>
          </ul>

          <h2>Step 6: After Filing</h2>

          <h3>Notice of Assessment (NOA)</h3>
          <ul>
            <li>Receive within 2 weeks (NETFILE)</li>
            <li>Confirms CRA's review</li>
            <li>Shows your RRSP room for next year</li>
            <li>Keep for your records</li>
          </ul>

          <h3>Refund Timeline</h3>
          <ul>
            <li><strong>NETFILE + Direct Deposit:</strong> 8-14 days</li>
            <li><strong>NETFILE + Cheque:</strong> 4-6 weeks</li>
            <li><strong>Paper return:</strong> 8-12 weeks</li>
          </ul>

          <h2>First-Time Filers</h2>

          <h3>Newcomers to Canada</h3>
          <ul>
            <li>File for your first year as resident</li>
            <li>Report income from residency date onwards</li>
            <li>Apply for benefits (GST credit, CCB)</li>
          </ul>

          <h3>Turning 18</h3>
          <ul>
            <li>File even with no income (to get credits)</li>
            <li>Start building RRSP contribution room</li>
            <li>Register for GST/HST credit</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Missing slips:</strong> Wait until March if slips are late</li>
            <li><strong>Wrong SIN:</strong> Double-check your number</li>
            <li><strong>Forgetting spouse income:</strong> Required for credit calculations</li>
            <li><strong>Not claiming deductions:</strong> Review all eligible expenses</li>
            <li><strong>Mathematical errors:</strong> Software calculates automatically</li>
          </ul>

          <h2>Need Help?</h2>
          <ul>
            <li><strong>CRA website:</strong> canada.ca/taxes</li>
            <li><strong>CRA phone:</strong> 1-800-959-8281</li>
            <li><strong>Tax clinics:</strong> Free community help</li>
            <li><strong>Our AI assistant:</strong> Ask questions below</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Filing?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about your tax return.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide covers basic filing. Complex situations may require professional help.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
