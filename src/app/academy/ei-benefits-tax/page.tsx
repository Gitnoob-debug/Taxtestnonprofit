import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EI Benefits & Tax Canada 2024 | Employment Insurance Guide',
  description: 'Complete guide to Employment Insurance taxation in Canada. Learn about EI benefit types, how EI is taxed, clawback rules, and reporting on your tax return.',
  keywords: 'EI benefits tax Canada, employment insurance tax, EI clawback, EI repayment, T4E slip, EI taxable income',
}

export default function EIBenefitsTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-100 dark:bg-teal-900 p-2.5 rounded-xl">
              <Shield className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            EI Benefits & Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-teal-900 dark:text-teal-100 mb-3">EI Is Taxable Income</h2>
          <p className="text-teal-700 dark:text-teal-300 text-sm">
            All Employment Insurance benefits are taxable. Tax is withheld at source, but you may owe more or receive a refund depending on your total income. Higher earners may face EI clawback.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of EI Benefits</h2>

          <h3>Regular Benefits</h3>
          <ul>
            <li>Job loss through no fault of your own</li>
            <li>55% of average insurable earnings</li>
            <li>Maximum $668/week (2024)</li>
            <li>14-45 weeks depending on region and hours</li>
          </ul>

          <h3>Maternity Benefits</h3>
          <ul>
            <li>15 weeks for birth mother</li>
            <li>55% of earnings (max $668/week)</li>
            <li>Can be combined with parental</li>
          </ul>

          <h3>Parental Benefits</h3>
          <ul>
            <li><strong>Standard:</strong> 40 weeks at 55%</li>
            <li><strong>Extended:</strong> 69 weeks at 33%</li>
            <li>Can be shared between parents</li>
          </ul>

          <h3>Sickness Benefits</h3>
          <ul>
            <li>Up to 26 weeks</li>
            <li>55% of earnings</li>
            <li>For illness, injury, or quarantine</li>
          </ul>

          <h3>Caregiving Benefits</h3>
          <ul>
            <li>Family caregiver: 15 weeks</li>
            <li>Compassionate care: 26 weeks</li>
            <li>For care of family members</li>
          </ul>

          <h2>How EI Is Taxed</h2>

          <h3>Tax Withheld at Source</h3>
          <ul>
            <li>Federal tax withheld from EI payments</li>
            <li>Rate based on estimated annual income</li>
            <li>May not be enough if you have other income</li>
          </ul>

          <h3>The T4E Slip</h3>
          <p>You'll receive a T4E showing:</p>
          <ul>
            <li><strong>Box 14:</strong> Total EI benefits paid</li>
            <li><strong>Box 22:</strong> Income tax deducted</li>
            <li><strong>Box 18:</strong> EI repayment (if applicable)</li>
            <li><strong>Box 20-21:</strong> Parental benefit codes</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> If you expect to have significant other income while on EI, request additional tax be withheld to avoid a surprise bill at tax time.
            </p>
          </div>

          <h2>EI Clawback (Repayment)</h2>

          <h3>When Clawback Applies</h3>
          <ul>
            <li>Net income over $79,000 (2024)</li>
            <li>Applies to regular and fishing benefits only</li>
            <li>Does NOT apply to special benefits (maternity, parental, sickness)</li>
          </ul>

          <h3>How Clawback Works</h3>
          <ul>
            <li>Repay 30% of lesser of:</li>
            <li>Net income over $79,000, OR</li>
            <li>Total regular EI benefits received</li>
            <li>Deducted at source if identified early</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Net income: $95,000</li>
            <li>EI benefits received: $8,000</li>
            <li>Income over threshold: $16,000</li>
            <li>Clawback: 30% × $8,000 = $2,400</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Planning Note:</strong> If you lose a high-paying job and quickly find another, clawback can be substantial. Consider RRSP contributions to reduce net income below threshold.
            </p>
          </div>

          <h2>Reporting EI on Your Tax Return</h2>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11900:</strong> EI benefits (Box 14)</li>
            <li><strong>Line 23500:</strong> Social benefits repayment (clawback)</li>
            <li><strong>Line 43700:</strong> Tax withheld (Box 22)</li>
          </ul>

          <h3>If You Have Multiple T4Es</h3>
          <ul>
            <li>Add all Box 14 amounts</li>
            <li>Report total on Line 11900</li>
            <li>Add all tax withheld</li>
          </ul>

          <h2>EI and Other Benefits</h2>

          <h3>Effect on GST/HST Credit</h3>
          <ul>
            <li>EI counts as income for GST credit calculation</li>
            <li>May reduce quarterly payments</li>
            <li>Effect in year after you file</li>
          </ul>

          <h3>Effect on Canada Child Benefit</h3>
          <ul>
            <li>EI counts as family income</li>
            <li>May reduce CCB payments</li>
            <li>Calculated based on previous year's income</li>
          </ul>

          <h3>Effect on Provincial Benefits</h3>
          <ul>
            <li>May affect Ontario Trillium Benefit</li>
            <li>May affect other provincial credits</li>
            <li>Each province calculates differently</li>
          </ul>

          <h2>EI Premium Refund</h2>

          <h3>Over-Contribution</h3>
          <p>You may have overpaid EI premiums if:</p>
          <ul>
            <li>Multiple jobs in the year</li>
            <li>Each employer deducted full premiums</li>
            <li>Total exceeds maximum ($1,049.12 in 2024)</li>
          </ul>

          <h3>Getting a Refund</h3>
          <ul>
            <li>Calculate overpayment on tax return</li>
            <li>CRA refunds automatically</li>
            <li>No separate application needed</li>
          </ul>

          <h2>Working While on EI</h2>

          <h3>Earnings Allowance</h3>
          <ul>
            <li>Can earn some money while on EI</li>
            <li>50 cents deducted for each dollar earned</li>
            <li>Up to 90% of your previous earnings</li>
            <li>Report earnings accurately</li>
          </ul>

          <h3>Tax Implications</h3>
          <ul>
            <li>Work earnings taxed normally</li>
            <li>EI benefits taxed normally</li>
            <li>May push into higher bracket</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>EI and Severance</h3>
          <ul>
            <li>Severance may delay EI start date</li>
            <li>Allocated over insurable hours</li>
            <li>Both are taxable</li>
            <li>Plan for combined tax impact</li>
          </ul>

          <h3>EI and CERB/Recovery Benefits</h3>
          <ul>
            <li>Different programs, different slips</li>
            <li>CERB on T4A</li>
            <li>All are taxable income</li>
            <li>May have repayment obligations</li>
          </ul>

          <h2>Tax Planning Tips</h2>

          <h3>Request Additional Withholding</h3>
          <ul>
            <li>Contact Service Canada</li>
            <li>Request extra tax deducted</li>
            <li>Avoids year-end tax surprise</li>
          </ul>

          <h3>RRSP Contributions</h3>
          <ul>
            <li>Can reduce net income</li>
            <li>May avoid clawback threshold</li>
            <li>If you have contribution room</li>
          </ul>

          <h3>Income Timing</h3>
          <ul>
            <li>Consider when EI will be received</li>
            <li>May span calendar years</li>
            <li>Plan for each tax year</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About EI Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about EI benefit taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> EI rules can be complex. Contact Service Canada for specific eligibility and benefit questions.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
