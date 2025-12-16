import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, FileCheck, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Notice of Assessment (NOA) Canada | How to Read & Understand',
  description: 'Complete guide to your CRA Notice of Assessment. Learn what each section means, how to find your RRSP room, understanding reassessments, and what to do if you disagree.',
  keywords: 'notice of assessment Canada, NOA CRA, RRSP deduction limit, understanding notice of assessment, CRA reassessment',
}

export default function NoticeOfAssessmentPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-xl">
              <FileCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Understanding Your Notice of Assessment
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Keep Your NOA</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Your Notice of Assessment is an important document. It confirms your tax return was processed and shows your RRSP deduction limit for next year. Lenders often require it as proof of income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Is a Notice of Assessment?</h2>
          <p>Your NOA is CRA's official response to your tax return. It shows:</p>
          <ul>
            <li>Whether CRA agrees with your calculations</li>
            <li>Your refund or balance owing</li>
            <li>Any changes CRA made</li>
            <li>Your RRSP deduction limit</li>
            <li>Carryforward amounts</li>
          </ul>

          <h2>Key Sections of Your NOA</h2>

          <h3>Account Summary</h3>
          <ul>
            <li><strong>Refund:</strong> Amount being sent to you</li>
            <li><strong>Balance owing:</strong> Amount you need to pay</li>
            <li><strong>Account balance:</strong> Total owing including prior years</li>
          </ul>

          <h3>Tax Assessment Summary</h3>
          <p>Compares your return to CRA's assessment:</p>
          <ul>
            <li>Total income</li>
            <li>Net income</li>
            <li>Taxable income</li>
            <li>Total tax payable</li>
            <li>Credits applied</li>
          </ul>

          <h3>RRSP Information</h3>
          <p>Critical for next year's contributions:</p>
          <ul>
            <li><strong>RRSP deduction limit:</strong> Maximum you can contribute</li>
            <li><strong>Unused RRSP contributions:</strong> Previous years' unused amounts</li>
            <li><strong>Available contribution room:</strong> Deduction limit minus unused</li>
          </ul>

          <h3>Explanation of Changes</h3>
          <p>If CRA made changes, this section explains:</p>
          <ul>
            <li>What was changed</li>
            <li>Why it was changed</li>
            <li>Effect on your refund/balance</li>
          </ul>

          <h2>Common NOA Changes</h2>

          <h3>Mathematical Corrections</h3>
          <p>Simple calculation errors fixed automatically.</p>

          <h3>Missing Slips</h3>
          <p>CRA added income you didn't report (T4, T5, etc.).</p>

          <h3>Disallowed Credits</h3>
          <p>Credits claimed that you may not be eligible for.</p>

          <h3>Adjusted Deductions</h3>
          <p>Deductions reduced or removed.</p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Even if you received a refund, CRA can reassess your return for up to 3 years (or longer in cases of fraud or misrepresentation).
            </p>
          </div>

          <h2>How to Access Your NOA</h2>

          <h3>Online (Fastest)</h3>
          <ul>
            <li>Log in to CRA My Account</li>
            <li>Go to "Tax returns" section</li>
            <li>Select "Notice of assessment"</li>
            <li>View or download PDF</li>
          </ul>

          <h3>By Mail</h3>
          <ul>
            <li>Mailed automatically after processing</li>
            <li>Takes 2-8 weeks after filing</li>
          </ul>

          <h2>Uses for Your NOA</h2>

          <h3>Proof of Income</h3>
          <p>Often required for:</p>
          <ul>
            <li>Mortgage applications</li>
            <li>Loan applications</li>
            <li>Rental applications</li>
            <li>Immigration applications</li>
            <li>Student financial aid</li>
          </ul>

          <h3>RRSP Planning</h3>
          <ul>
            <li>Know exactly how much you can contribute</li>
            <li>Plan contributions before deadline</li>
            <li>Avoid over-contributions</li>
          </ul>

          <h3>Record Keeping</h3>
          <ul>
            <li>Official record of your tax position</li>
            <li>Supports future tax filings</li>
            <li>Needed if you dispute an assessment</li>
          </ul>

          <h2>What If You Disagree?</h2>

          <h3>Step 1: Understand the Change</h3>
          <p>Read the explanation carefully. Sometimes CRA is correct.</p>

          <h3>Step 2: Gather Evidence</h3>
          <p>Collect documents that support your position.</p>

          <h3>Step 3: Request Adjustment</h3>
          <p>If you made an error, request change via:</p>
          <ul>
            <li>My Account (Change my return)</li>
            <li>Form T1-ADJ (by mail)</li>
          </ul>

          <h3>Step 4: File Objection</h3>
          <p>If you disagree with CRA's decision:</p>
          <ul>
            <li>Must file within 90 days of NOA</li>
            <li>Use Form T400A or My Account</li>
            <li>CRA Appeals will review</li>
          </ul>

          <h2>NOA vs. Notice of Reassessment</h2>

          <h3>Notice of Assessment (NOA)</h3>
          <p>Original assessment after you file.</p>

          <h3>Notice of Reassessment (NOR)</h3>
          <p>Issued when:</p>
          <ul>
            <li>You request a change to your return</li>
            <li>CRA reviews and changes your return</li>
            <li>Audit results in changes</li>
          </ul>

          <h2>How Long to Keep Your NOA</h2>
          <ul>
            <li><strong>Minimum:</strong> 6 years</li>
            <li><strong>Better:</strong> Indefinitely (for RRSP room history)</li>
            <li><strong>Digital storage:</strong> Download and save PDFs</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Your NOA?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help explain sections of your Notice of Assessment.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide provides general information. For specific concerns about your NOA, contact CRA directly.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
