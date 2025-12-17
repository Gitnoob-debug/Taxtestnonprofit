import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Defined Benefit Pension Tax Canada 2024 | DB Pension Guide',
  description: 'Complete guide to defined benefit pension taxation in Canada. Learn about RPP taxation, pension income credits, commuted values, and DB pension planning.',
  keywords: 'defined benefit pension tax, DB pension Canada, RPP taxation, pension income splitting, commuted value tax',
}

export default function DefinedBenefitPensionTaxPage() {
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
              <Building2 className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Defined Benefit Pension Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 dark:text-rose-100 mb-3">Guaranteed Retirement Income</h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            Defined benefit pensions provide guaranteed income for life. They're fully taxable but qualify for valuable credits like pension income splitting at any age—a significant tax advantage.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How DB Pensions Work</h2>

          <h3>The Formula</h3>
          <ul>
            <li>Years of service × benefit rate × final salary</li>
            <li>Example: 30 years × 2% × $80,000 = $48,000/year</li>
            <li>Paid monthly for life</li>
            <li>Often indexed to inflation (partially or fully)</li>
          </ul>

          <h3>Employer vs Employee Contributions</h3>
          <ul>
            <li>Both contribute during working years</li>
            <li>Your contributions tracked separately</li>
            <li>Employer funds the guarantee</li>
          </ul>

          <h2>Tax Treatment of DB Pensions</h2>

          <h3>Pension Payments</h3>
          <ul>
            <li>100% of pension is taxable</li>
            <li>Reported on T4A slip</li>
            <li>Tax withheld at source</li>
            <li>Added to other income</li>
          </ul>

          <h3>Pension Adjustment (PA)</h3>
          <ul>
            <li>Reduces your RRSP room</li>
            <li>Reported on T4 while working</li>
            <li>Reflects pension benefit accrued</li>
            <li>9 × benefit earned that year</li>
          </ul>

          <h2>Pension Income Tax Credits</h2>

          <h3>Pension Income Amount</h3>
          <ul>
            <li>Up to $2,000 credit (federal)</li>
            <li>DB pension qualifies at any age</li>
            <li>Don't need to be 65+</li>
            <li>Worth ~$300 federal tax reduction</li>
            <li>Plus provincial credit</li>
          </ul>

          <h3>Pension Income Splitting</h3>
          <ul>
            <li>Split up to 50% with spouse</li>
            <li>DB pension eligible at any age</li>
            <li>Unlike RRIF (requires 65+)</li>
            <li>Significant advantage for DB recipients</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Advantage:</strong> DB pension recipients can split income starting at age 55 (or whenever pension starts). RRIF income can only be split at 65+.
            </p>
          </div>

          <h2>Bridge Benefits</h2>

          <h3>What Is a Bridge?</h3>
          <ul>
            <li>Extra payment until age 65</li>
            <li>Designed to replace CPP/OAS until they start</li>
            <li>Reduces after 65</li>
            <li>100% taxable</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Retire at 60</li>
            <li>Pension: $40,000/year + $12,000 bridge</li>
            <li>Total until 65: $52,000</li>
            <li>After 65: $40,000 + CPP + OAS</li>
          </ul>

          <h2>Commuted Value Option</h2>

          <h3>What Is Commuted Value?</h3>
          <ul>
            <li>Lump sum equivalent of future pension</li>
            <li>Can be offered at retirement</li>
            <li>Or when leaving employer before retirement</li>
          </ul>

          <h3>Tax Implications</h3>
          <ul>
            <li>Part transfers to LIRA (tax-free)</li>
            <li>Excess is taxable immediately</li>
            <li>Maximum transfer limit applies</li>
            <li>Can be significant tax hit</li>
          </ul>

          <h3>Transfer Limit</h3>
          <p>Maximum that can go to LIRA depends on:</p>
          <ul>
            <li>Your age at transfer</li>
            <li>Prescribed formula</li>
            <li>Excess taxable as income</li>
            <li>Often 50-70% transfers, rest taxable</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Commuted Value Decision:</strong> Taking the lump sum forfeits guaranteed income and may trigger large tax. Most people are better off keeping the pension unless specific circumstances apply.
            </p>
          </div>

          <h2>Early Retirement Reduction</h2>

          <h3>How Reduction Works</h3>
          <ul>
            <li>Retiring before "unreduced" age</li>
            <li>Typically 3-6% per year early</li>
            <li>Reduction is permanent</li>
            <li>May still be worthwhile</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Unreduced pension at 65: $50,000</li>
            <li>5% reduction per year before 65</li>
            <li>Retire at 60: 25% reduction</li>
            <li>Pension: $37,500/year for life</li>
          </ul>

          <h2>Survivor Benefits</h2>

          <h3>Typical Options</h3>
          <ul>
            <li>60% survivor pension (most common)</li>
            <li>100% survivor pension (lower initial)</li>
            <li>No survivor (higher initial, nothing to spouse)</li>
          </ul>

          <h3>Tax Implications</h3>
          <ul>
            <li>Survivor pension taxable to survivor</li>
            <li>Qualifies for pension income credits</li>
            <li>Can be split if survivor remarries</li>
          </ul>

          <h2>DB Pension vs Commuted Value Analysis</h2>

          <h3>Keep the Pension If:</h3>
          <ul>
            <li>Expect long life</li>
            <li>Value guaranteed income</li>
            <li>Poor at managing investments</li>
            <li>Pension is indexed</li>
            <li>Good survivor benefits</li>
          </ul>

          <h3>Consider Commuted Value If:</h3>
          <ul>
            <li>Serious health concerns</li>
            <li>No dependants needing survivor pension</li>
            <li>Sophisticated investor</li>
            <li>Pension not indexed</li>
            <li>Employer financial concerns</li>
          </ul>

          <h2>Reporting DB Pension</h2>

          <h3>T4A Slip</h3>
          <ul>
            <li><strong>Box 16:</strong> Pension income</li>
            <li><strong>Box 22:</strong> Tax withheld</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11500:</strong> Other pensions and superannuation</li>
            <li><strong>Line 31400:</strong> Pension income amount</li>
            <li><strong>Form T1032:</strong> Pension income splitting</li>
          </ul>

          <h2>Pension and OAS Clawback</h2>

          <h3>Impact on OAS</h3>
          <ul>
            <li>DB pension counts toward OAS clawback</li>
            <li>May push over threshold ($90,997 in 2024)</li>
            <li>Pension splitting can help</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>Split pension with lower-income spouse</li>
            <li>Draw less from RRIF if possible</li>
            <li>Use TFSA for additional needs</li>
          </ul>

          <h2>Planning Considerations</h2>

          <h3>Before Retirement</h3>
          <ul>
            <li>Understand your pension formula</li>
            <li>Review survivor options</li>
            <li>Calculate pension with/without bridge</li>
            <li>Compare to commuted value if offered</li>
          </ul>

          <h3>Retirement Year</h3>
          <ul>
            <li>May have partial year of salary + pension</li>
            <li>Could be high-income year</li>
            <li>Maximize RRSP in final working year</li>
            <li>Plan pension start date</li>
          </ul>

          <h3>In Retirement</h3>
          <ul>
            <li>Optimize pension splitting annually</li>
            <li>Coordinate with other income sources</li>
            <li>Monitor OAS clawback</li>
            <li>Review beneficiary designations</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About DB Pensions?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about defined benefit pension taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Pension decisions are significant and often irreversible. Consult with your pension administrator and a financial planner before making major choices.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
