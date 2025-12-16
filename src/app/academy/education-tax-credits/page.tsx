import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, GraduationCap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Education Tax Credits Canada 2024 | Tuition & Student Credits',
  description: 'Complete guide to education tax credits in Canada. Learn about tuition credits, student loan interest, textbook amounts, and transferring education credits.',
  keywords: 'tuition tax credit Canada, education tax credit, student tax credits, T2202 tax, tuition transfer parent',
}

export default function EducationTaxCreditsPage() {
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
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Education Tax Credits Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Tuition Tax Credit</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            The federal tuition tax credit provides 15% of eligible tuition fees. Students can use credits themselves, transfer up to $5,000 to family, or carry forward unused amounts indefinitely.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Tuition Tax Credit</h2>

          <h3>How It Works</h3>
          <ul>
            <li>15% federal credit on eligible tuition</li>
            <li>Non-refundable (reduces tax to zero)</li>
            <li>Plus provincial credits (rates vary)</li>
            <li>Total savings: 20-25% of tuition</li>
          </ul>

          <h3>Eligible Tuition Fees</h3>
          <ul>
            <li>Tuition paid to qualifying institution</li>
            <li>Fees over $100 for each institution</li>
            <li>Admission, examination, certificate fees</li>
            <li>Mandatory ancillary fees</li>
          </ul>

          <h3>NOT Eligible</h3>
          <ul>
            <li>Student association fees</li>
            <li>Health/dental plans</li>
            <li>Textbooks (federal credit eliminated)</li>
            <li>Transportation, parking</li>
            <li>Board, lodging</li>
          </ul>

          <h2>Qualifying Institutions</h2>

          <h3>Canadian Institutions</h3>
          <ul>
            <li>Universities</li>
            <li>Colleges</li>
            <li>CEGEP</li>
            <li>Certified by ESDC for occupational skills</li>
          </ul>

          <h3>Foreign Universities</h3>
          <ul>
            <li>Full-time courses leading to degree</li>
            <li>Minimum 3 consecutive weeks</li>
            <li>Can use tuition on Schedule 11</li>
            <li>Get TL11A from CRA list</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>T2202 Form:</strong> Canadian institutions issue T2202 showing tuition paid. Keep this for your records—information goes directly to CRA.
            </p>
          </div>

          <h2>Using the Tuition Credit</h2>

          <h3>Student Uses First</h3>
          <ul>
            <li>Must use credit to reduce own tax to zero first</li>
            <li>Cannot skip to transfer or carry forward</li>
            <li>Calculate how much reduces your tax</li>
          </ul>

          <h3>Transfer to Family</h3>
          <ul>
            <li>Up to $5,000 can be transferred</li>
            <li>To parent, grandparent, spouse, or partner</li>
            <li>Only current year amounts</li>
            <li>Complete transfer section on Schedule 11</li>
          </ul>

          <h3>Carry Forward</h3>
          <ul>
            <li>Unused amounts carry forward indefinitely</li>
            <li>Cannot transfer carried-forward amounts</li>
            <li>Use when you have tax to pay</li>
            <li>Track on Schedule 11</li>
          </ul>

          <h2>Student Loan Interest Credit</h2>

          <h3>How It Works</h3>
          <ul>
            <li>15% federal credit on interest paid</li>
            <li>Only government student loans qualify</li>
            <li>Canada Student Loans</li>
            <li>Provincial student loans</li>
          </ul>

          <h3>NOT Eligible</h3>
          <ul>
            <li>Bank loans/lines of credit</li>
            <li>Private student loans</li>
            <li>Family loans</li>
            <li>Consolidated commercial loans</li>
          </ul>

          <h3>Carry Forward Rules</h3>
          <ul>
            <li>Can carry forward 5 years</li>
            <li>Use when you have tax to pay</li>
            <li>Cannot transfer to anyone</li>
            <li>Report on Line 31900</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Strategy:</strong> If you're not paying tax this year, carry forward student loan interest credits rather than claiming them—they expire after 5 years though.
            </p>
          </div>

          <h2>Education and Textbook Amounts</h2>

          <h3>Federal Status (Eliminated)</h3>
          <ul>
            <li>Education amount eliminated 2017</li>
            <li>Textbook amount eliminated 2017</li>
            <li>Unused amounts from before still exist</li>
            <li>Can still use carry-forward balances</li>
          </ul>

          <h3>Provincial Credits</h3>
          <p>Some provinces still have education/textbook credits:</p>
          <ul>
            <li><strong>Ontario:</strong> No separate credit</li>
            <li><strong>BC:</strong> No separate credit</li>
            <li>Check your province's rules</li>
          </ul>

          <h2>RESP Withdrawals</h2>

          <h3>Tax Treatment</h3>
          <ul>
            <li>Original contributions: tax-free</li>
            <li>Government grants (EAP): taxable to student</li>
            <li>Investment growth (EAP): taxable to student</li>
            <li>Student usually has low/no income</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Withdraw EAP while student has low income</li>
            <li>Tuition credits often offset tax</li>
            <li>Plan withdrawals over multiple years</li>
          </ul>

          <h2>Scholarships and Bursaries</h2>

          <h3>Tax-Free If</h3>
          <ul>
            <li>Enrolled in qualifying program</li>
            <li>Scholarship for program you're in</li>
            <li>No employment requirement</li>
          </ul>

          <h3>Taxable If</h3>
          <ul>
            <li>Not in qualifying program</li>
            <li>Excess over education costs</li>
            <li>Tied to employment duties</li>
          </ul>

          <h3>Reporting</h3>
          <ul>
            <li>Receive T4A slip</li>
            <li>Report on Line 13010</li>
            <li>Claim exemption on Line 13000</li>
          </ul>

          <h2>Moving Expenses for School</h2>

          <h3>Students Can Claim If</h3>
          <ul>
            <li>Moved 40+ km closer to school</li>
            <li>Full-time student</li>
            <li>Have taxable scholarship/grant income</li>
            <li>Or taxable research grant</li>
          </ul>

          <h3>Deduct Against</h3>
          <ul>
            <li>Scholarship income</li>
            <li>Research grant income</li>
            <li>Cannot create/increase loss</li>
          </ul>

          <h2>Part-Time vs Full-Time</h2>

          <h3>Full-Time Students</h3>
          <ul>
            <li>Enrolled in qualifying program</li>
            <li>Minimum course load (60% usually)</li>
            <li>Full access to credits</li>
          </ul>

          <h3>Part-Time Students</h3>
          <ul>
            <li>Still eligible for tuition credit</li>
            <li>Some provincial differences</li>
            <li>May affect other benefits</li>
          </ul>

          <h2>Graduate Students</h2>

          <h3>Teaching/Research Assistants</h3>
          <ul>
            <li>TA/RA income is employment income</li>
            <li>T4 slip issued</li>
            <li>Tuition credits can offset tax</li>
          </ul>

          <h3>Fellowships</h3>
          <ul>
            <li>Often tax-free if for program</li>
            <li>Check specific terms</li>
            <li>May receive T4A</li>
          </ul>

          <h2>Transfer to Parents/Grandparents</h2>

          <h3>How Transfer Works</h3>
          <ul>
            <li>Student completes Schedule 11</li>
            <li>Designates transfer amount (max $5,000)</li>
            <li>Names recipient</li>
            <li>Recipient claims on Schedule 2</li>
          </ul>

          <h3>Optimal Strategy</h3>
          <ul>
            <li>Transfer to person with highest marginal rate</li>
            <li>If equal, transfer to either</li>
            <li>Consider future carry-forward value</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example:</strong> Student has $8,000 tuition, $3,000 income. Uses ~$450 in credits for own tax. Can transfer $5,000 to parent. Carries forward $2,550.
            </p>
          </div>

          <h2>Provincial Differences</h2>

          <h3>Ontario</h3>
          <ul>
            <li>5.05% provincial tuition credit</li>
            <li>Same transfer rules as federal</li>
            <li>Carry forward indefinitely</li>
          </ul>

          <h3>Quebec</h3>
          <ul>
            <li>Different system entirely</li>
            <li>Transferred amounts taxable to parent</li>
            <li>File Quebec return separately</li>
          </ul>

          <h3>Other Provinces</h3>
          <ul>
            <li>Most mirror federal rules</li>
            <li>Rates differ</li>
            <li>Check specific province</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>Documents to Keep</h3>
          <ul>
            <li>T2202 from each institution</li>
            <li>TL11A/B for foreign schools</li>
            <li>Receipts for tuition payments</li>
            <li>Student loan statements (interest)</li>
            <li>Schedule 11 from each year</li>
          </ul>

          <h3>Track Carry Forwards</h3>
          <ul>
            <li>Notice of Assessment shows balance</li>
            <li>Keep your own records too</li>
            <li>Schedule 11 tracks annually</li>
          </ul>

          <h2>Common Mistakes</h2>

          <h3>Avoid These Errors</h3>
          <ul>
            <li>Forgetting to claim tuition</li>
            <li>Not transferring when beneficial</li>
            <li>Transferring carried-forward amounts (not allowed)</li>
            <li>Claiming ineligible fees</li>
            <li>Missing student loan interest</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Education Credits?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about tuition and education tax credits.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Education tax credits have specific eligibility requirements. Verify your institution qualifies and keep all documentation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
