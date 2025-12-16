import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, GraduationCap, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Student Tax Guide Canada 2024 | Tuition Credits & Deductions',
  description: 'Complete tax guide for Canadian students. Learn about tuition tax credits, student loan interest deduction, moving expenses, and how to file your first tax return.',
  keywords: 'student tax Canada, tuition tax credit, student loan interest deduction, student tax return, T2202, moving expenses student',
}

export default function StudentTaxGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Students</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Student Tax Guide: Credits and Deductions (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />7 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Why Students Should File Tax Returns</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">Even with little or no income, filing a tax return as a student:</p>
          <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />Builds RRSP contribution room for the future</li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />Qualifies you for GST/HST and Climate Action credits</li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />Accumulates TFSA contribution room</li>
            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />Lets you carry forward tuition credits for when you have income</li>
          </ul>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Tuition Tax Credit</h2>
          <p>The federal tuition tax credit is 15% of eligible tuition fees. If you paid $10,000 in tuition, that's a $1,500 federal credit (plus provincial).</p>

          <h3>What Qualifies</h3>
          <ul>
            <li>Tuition paid to a Canadian university, college, or certified institution</li>
            <li>Fees for post-secondary or occupational skills courses</li>
            <li>Must total more than $100 per institution</li>
          </ul>

          <h3>What Doesn't Qualify</h3>
          <ul>
            <li>Student association fees</li>
            <li>Books and supplies (separate from tuition)</li>
            <li>Transportation or parking</li>
            <li>Room and board</li>
          </ul>

          <h3>Transferring Credits</h3>
          <p>If you don't need all your tuition credits (your income is low), you can:</p>
          <ul>
            <li><strong>Transfer up to $5,000</strong> (federal) to a spouse, parent, or grandparent</li>
            <li><strong>Carry forward</strong> unused amounts indefinitely for your own future use</li>
          </ul>

          <h3>T2202 Form</h3>
          <p>Your school issues a T2202 (Tuition and Enrolment Certificate) showing your eligible tuition. Access it through your school's student portal. You need this to claim the credit.</p>

          <h2>Student Loan Interest</h2>
          <p>Interest paid on qualifying student loans is eligible for a 15% federal tax credit.</p>

          <h3>Qualifying Loans</h3>
          <ul>
            <li>Canada Student Loans</li>
            <li>Provincial student loans</li>
            <li>Canada Apprentice Loans</li>
          </ul>

          <h3>What Doesn't Qualify</h3>
          <ul>
            <li>Bank loans or lines of credit (even if used for school)</li>
            <li>Credit card debt</li>
            <li>Loans from family</li>
          </ul>

          <p><strong>Carry forward:</strong> Unused student loan interest credits can be carried forward for 5 years.</p>

          <h2>Moving Expenses</h2>
          <p>If you moved at least 40 km closer to attend post-secondary education, you can deduct moving expenses against:</p>
          <ul>
            <li>Scholarships, fellowships, bursaries</li>
            <li>Research grants</li>
            <li>Employment income from the new location</li>
          </ul>

          <h3>Eligible Moving Expenses</h3>
          <ul>
            <li>Transportation costs (gas, flights)</li>
            <li>Storage</li>
            <li>Temporary accommodation (up to 15 days)</li>
            <li>Cost of selling old home or breaking lease</li>
          </ul>

          <h2>Scholarships, Bursaries & Grants</h2>
          <p>Good news: Most scholarships, fellowships, and bursaries received for post-secondary education are <strong>tax-free</strong> if you're enrolled in a qualifying program.</p>

          <p>Taxable amounts (report on your return):</p>
          <ul>
            <li>Amounts exceeding tuition and eligible expenses</li>
            <li>Research grants (though some deductions allowed)</li>
            <li>Scholarships for non-qualifying programs</li>
          </ul>

          <h2>Working as a Student</h2>

          <h3>T4 Income</h3>
          <p>Part-time or summer job income is reported on T4 slips. Remember:</p>
          <ul>
            <li>First ~$15,700 is covered by the Basic Personal Amount (no federal tax)</li>
            <li>Provincial BPAs vary</li>
            <li>Tax withheld may be refunded if your annual income is low</li>
          </ul>

          <h3>Freelance/Self-Employment</h3>
          <p>If you do freelance work (tutoring, gigs, selling crafts), that's self-employment income. You can deduct related expenses but must report all earnings.</p>

          <h2>GST/HST Credit</h2>
          <p>Low-income individuals (including students) receive quarterly GST/HST credit payments. To receive them, you must:</p>
          <ul>
            <li>Be 19 or older, AND</li>
            <li>File a tax return</li>
          </ul>
          <p>For 2024, a single person can receive up to $496/year.</p>

          <h2>Canada Workers Benefit (CWB)</h2>
          <p>If you work and have modest income (generally $3,000 - $33,000 for singles), you may qualify for the CWB—a refundable tax credit worth up to $1,428 in 2024.</p>

          <h2>Checklist for Student Tax Returns</h2>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 my-6 not-prose">
            <ul className="space-y-2">
              {[
                'T2202 (Tuition Certificate) from your school',
                'T4 slips from any jobs',
                'T4A slips (scholarships, bursaries, grants)',
                'Interest statement for student loans',
                'Moving expense receipts (if applicable)',
                'RRSP contribution receipts (if any)',
                'Rent receipts (for provincial credits where applicable)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 dark:text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Always file a tax return as a student—even with no income</li>
            <li>Tuition credits can be transferred to family or carried forward</li>
            <li>Student loan interest (government loans only) is a tax credit</li>
            <li>Moving 40+ km for school? Deduct those expenses</li>
            <li>Most scholarships are tax-free for full-time students</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Have a Tax Question?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Ask our AI tax assistant for help with your specific situation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes. Tax rules change and individual situations vary. Consult CRA resources or a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
