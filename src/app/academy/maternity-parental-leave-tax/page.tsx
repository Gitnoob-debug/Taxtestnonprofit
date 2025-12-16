import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Baby, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Maternity & Parental Leave Tax Canada 2024 | EI Benefits Guide',
  description: 'Complete guide to maternity and parental leave taxation in Canada. Learn about EI maternity benefits, parental benefits, top-up payments, and tax planning for new parents.',
  keywords: 'maternity leave tax Canada, parental leave benefits, EI maternity benefits, parental benefits tax, maternity top-up tax',
}

export default function MaternityParentalLeaveTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 dark:bg-rose-900 p-2.5 rounded-xl">
              <Baby className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Maternity & Parental Leave Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 dark:text-rose-100 mb-3">All Benefits Are Taxable</h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            EI maternity and parental benefits are taxable income. However, unlike regular EI, they're NOT subject to the EI clawback for higher earners. Tax planning can help you keep more.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of Leave Benefits</h2>

          <h3>EI Maternity Benefits</h3>
          <ul>
            <li><strong>Duration:</strong> 15 weeks</li>
            <li><strong>Rate:</strong> 55% of average insurable earnings</li>
            <li><strong>Maximum:</strong> $668/week (2024)</li>
            <li><strong>Who:</strong> Birth mother only</li>
            <li><strong>When:</strong> Up to 12 weeks before due date</li>
          </ul>

          <h3>EI Parental Benefits - Standard</h3>
          <ul>
            <li><strong>Duration:</strong> 40 weeks (35 to one parent)</li>
            <li><strong>Rate:</strong> 55% of earnings</li>
            <li><strong>Maximum:</strong> $668/week</li>
            <li><strong>Who:</strong> Either parent, can share</li>
          </ul>

          <h3>EI Parental Benefits - Extended</h3>
          <ul>
            <li><strong>Duration:</strong> 69 weeks (61 to one parent)</li>
            <li><strong>Rate:</strong> 33% of earnings</li>
            <li><strong>Maximum:</strong> $401/week</li>
            <li><strong>Same total amount, spread longer</strong></li>
          </ul>

          <h3>Quebec Parental Insurance Plan (QPIP)</h3>
          <ul>
            <li>Quebec has its own program</li>
            <li>Higher benefits than EI</li>
            <li>Different duration options</li>
            <li>Also taxable</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Good News:</strong> Maternity and parental benefits are NOT subject to the EI clawback that applies to regular EI for high earners. No repayment required regardless of income.
            </p>
          </div>

          <h2>How Benefits Are Taxed</h2>

          <h3>Tax Withholding</h3>
          <ul>
            <li>Tax withheld at source by Service Canada</li>
            <li>Based on estimated annual income</li>
            <li>May not be enough if you have other income</li>
            <li>Can request additional withholding</li>
          </ul>

          <h3>T4E Slip</h3>
          <p>You'll receive T4E showing:</p>
          <ul>
            <li><strong>Box 14:</strong> Total benefits</li>
            <li><strong>Box 22:</strong> Tax withheld</li>
            <li><strong>Box 20-21:</strong> Benefit codes</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11900:</strong> EI benefits</li>
            <li>Added to other income</li>
            <li>Taxed at your marginal rate</li>
          </ul>

          <h2>Employer Top-Up Payments</h2>

          <h3>How Top-Ups Work</h3>
          <ul>
            <li>Employer supplements EI benefits</li>
            <li>Often to 93-100% of salary</li>
            <li>Common in public sector, some private</li>
            <li>Usually requires return-to-work commitment</li>
          </ul>

          <h3>Tax Treatment</h3>
          <ul>
            <li>Top-up is employment income</li>
            <li>Reported on T4 slip</li>
            <li>Tax withheld by employer</li>
            <li>CPP/EI deductions apply</li>
          </ul>

          <h3>Year-End Considerations</h3>
          <p>Leave spanning two years means:</p>
          <ul>
            <li>Income split between years</li>
            <li>May result in lower overall tax</li>
            <li>Or could push into higher bracket one year</li>
          </ul>

          <h2>Canada Child Benefit Impact</h2>

          <h3>Lower Income = Higher CCB</h3>
          <ul>
            <li>CCB based on previous year's income</li>
            <li>Year on leave = lower income</li>
            <li>Following year = higher CCB payments</li>
            <li>Significant benefit for many families</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Normal income: $80,000</li>
            <li>Leave year income: $45,000</li>
            <li>CCB increase: Potentially $100+/month more</li>
          </ul>

          <h2>Standard vs Extended: Tax Implications</h2>

          <h3>Standard Option (40 weeks at 55%)</h3>
          <ul>
            <li>Higher weekly amount</li>
            <li>May stay in higher bracket</li>
            <li>Shorter lower-income period</li>
          </ul>

          <h3>Extended Option (69 weeks at 33%)</h3>
          <ul>
            <li>Lower weekly amount</li>
            <li>May drop to lower bracket</li>
            <li>Longer period for CCB calculation</li>
            <li>Same total amount</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Consider:</strong> Extended benefits mean lower income for two tax years potentially, which affects CCB for two subsequent years. Run the numbers!
            </p>
          </div>

          <h2>RRSP Considerations</h2>

          <h3>Contribution Room</h3>
          <ul>
            <li>EI benefits don't generate RRSP room</li>
            <li>Employer top-up does create room</li>
            <li>Lower income year = deduction worth less</li>
            <li>Consider delaying RRSP deduction</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Contribute during leave</li>
            <li>Carry forward deduction to higher-income year</li>
            <li>Maximum benefit when you return to work</li>
          </ul>

          <h2>Sharing Benefits Between Parents</h2>

          <h3>Parental Sharing Benefit</h3>
          <ul>
            <li>5 extra weeks if both parents take leave</li>
            <li>8 extra weeks for extended option</li>
            <li>Encourages shared parenting</li>
            <li>Tax impact depends on each parent's income</li>
          </ul>

          <h3>Tax-Efficient Sharing</h3>
          <ul>
            <li>Consider each spouse's income/brackets</li>
            <li>Higher earner may benefit from time off</li>
            <li>Or lower earner takes more to minimize tax</li>
            <li>Balance with career considerations</li>
          </ul>

          <h2>Self-Employed Parents</h2>

          <h3>EI Special Benefits</h3>
          <ul>
            <li>Self-employed can opt into EI</li>
            <li>Must register at least 12 months before claim</li>
            <li>Pay both employee and employer premiums</li>
            <li>Benefits then available</li>
          </ul>

          <h3>Without EI</h3>
          <ul>
            <li>No EI benefits available</li>
            <li>Plan for income replacement</li>
            <li>TFSA savings useful</li>
            <li>Business income may continue</li>
          </ul>

          <h2>Tax Planning Tips</h2>

          <h3>Before Leave</h3>
          <ul>
            <li>Maximize RRSP if in high bracket</li>
            <li>Use up TFSA room</li>
            <li>Consider timing of leave start</li>
          </ul>

          <h3>During Leave</h3>
          <ul>
            <li>Track all childcare expenses</li>
            <li>Keep medical expense receipts</li>
            <li>File taxes promptly for CCB</li>
          </ul>

          <h3>Returning to Work</h3>
          <ul>
            <li>Childcare expenses now deductible</li>
            <li>Update direct deposit for benefits</li>
            <li>Review tax withholding amounts</li>
          </ul>

          <h2>Common Questions</h2>

          <h3>Can I work while on leave?</h3>
          <p>Limited work allowed without reducing benefits. Check Service Canada rules.</p>

          <h3>What about CERB/COVID benefits?</h3>
          <p>Different programs with different rules. CERB was taxable with no withholding at source.</p>

          <h3>Do benefits affect OAS/GIS?</h3>
          <p>Only relevant for seniors. Maternity/parental benefits count as income but no clawback.</p>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Parental Leave Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about maternity and parental leave taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> EI rules and tax implications can vary by situation. Contact Service Canada for benefit questions and a tax professional for complex situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
