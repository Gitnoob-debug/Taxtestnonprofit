import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pension Income Splitting Canada 2024 | Tax Savings for Couples',
  description: 'Complete guide to pension income splitting in Canada. Learn eligible income, how to calculate savings, T1032 form, and maximize tax benefits for retired couples.',
  keywords: 'pension income splitting Canada, pension splitting calculator, T1032 form, retirement tax planning Canada',
}

export default function PensionIncomeSplittingPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-2.5 rounded-xl">
              <Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Pension Income Splitting: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Powerful Tax Savings Strategy</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Pension income splitting allows you to transfer up to 50% of eligible pension income to your spouse for tax purposes. This can save couples thousands of dollars by taking advantage of lower tax brackets.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How Pension Splitting Works</h2>
          <p>Pension splitting is a tax calculation strategy, not an actual transfer of money:</p>
          <ul>
            <li>The higher-income spouse reports less pension income</li>
            <li>The lower-income spouse reports more income</li>
            <li>The actual pension payment goes to the same person</li>
            <li>Both spouses must agree and file Form T1032</li>
          </ul>

          <h2>Who Can Split Pension Income?</h2>
          <p>To be eligible:</p>
          <ul>
            <li>You must be married or in a common-law relationship</li>
            <li>You must both be Canadian residents on December 31</li>
            <li>You must not have been separated for 90+ days due to relationship breakdown</li>
            <li>You must have eligible pension income</li>
          </ul>

          <h2>Eligible Pension Income</h2>

          <h3>If 65 or Older</h3>
          <p>Can split:</p>
          <ul>
            <li>Registered pension plan (RPP) payments</li>
            <li>RRIF withdrawals</li>
            <li>RRSP annuity payments</li>
            <li>Life income fund (LIF) payments</li>
            <li>Deferred profit sharing plan (DPSP) annuity</li>
            <li>Foreign pensions (reported in Canadian income)</li>
          </ul>

          <h3>If Under 65</h3>
          <p>Can split:</p>
          <ul>
            <li>Life annuity payments from RPP</li>
            <li>Certain payments due to death of spouse</li>
          </ul>
          <p>Cannot split RRIF income until age 65.</p>

          <h3>Never Eligible</h3>
          <ul>
            <li>CPP/QPP benefits (separate splitting rules)</li>
            <li>OAS payments</li>
            <li>RRSP lump-sum withdrawals (not annuity)</li>
            <li>Retiring allowances</li>
            <li>Death benefits</li>
            <li>Salary or employment income</li>
          </ul>

          <h2>Maximum Split Amount</h2>
          <p>You can allocate up to 50% of eligible pension income to your spouse. The optimal split amount depends on:</p>
          <ul>
            <li>Each spouse's marginal tax rate</li>
            <li>Total eligible pension income</li>
            <li>OAS clawback considerations</li>
            <li>Age-related credits</li>
          </ul>

          <h2>Example Savings</h2>

          <h3>Without Splitting</h3>
          <p>John has $80,000 pension income, Mary has $20,000:</p>
          <ul>
            <li>John's federal tax: ~$12,500</li>
            <li>Mary's federal tax: ~$2,100</li>
            <li><strong>Total federal tax: ~$14,600</strong></li>
          </ul>

          <h3>With Splitting (50%)</h3>
          <p>John reports $60,000, Mary reports $40,000:</p>
          <ul>
            <li>John's federal tax: ~$8,600</li>
            <li>Mary's federal tax: ~$4,700</li>
            <li><strong>Total federal tax: ~$13,300</strong></li>
          </ul>

          <p><strong>Federal savings: ~$1,300</strong> (plus additional provincial savings)</p>

          <h2>OAS Clawback Benefits</h2>
          <p>OAS is reduced (clawed back) when income exceeds ~$86,912 (2024). Pension splitting can help avoid this:</p>
          <ul>
            <li>Reduces the higher earner's net income</li>
            <li>Can keep both spouses below the clawback threshold</li>
            <li>Each spouse receives full OAS</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Important:</strong> OAS clawback is 15% of income over the threshold. Pension splitting can save 15 cents on every dollar moved below the threshold, plus regular tax savings.
            </p>
          </div>

          <h2>Pension Amount Tax Credit</h2>
          <p>The receiving spouse may now qualify for the pension amount credit:</p>
          <ul>
            <li>Up to $2,000 in pension income qualifies</li>
            <li>Worth about $300 in federal tax savings</li>
            <li>If receiving spouse had no pension income before, this is a bonus</li>
          </ul>

          <h2>Form T1032</h2>
          <p>Both spouses must complete and sign Form T1032 (Joint Election to Split Pension Income):</p>
          <ul>
            <li>File with both spouses' tax returns</li>
            <li>Must be signed by both spouses</li>
            <li>New election required each year</li>
            <li>Can choose different split percentage each year</li>
          </ul>

          <h2>Optimal Split Percentage</h2>
          <p>50% isn't always optimal. Consider:</p>

          <h3>Calculate Both Scenarios</h3>
          <ul>
            <li>Run tax calculations with various split percentages</li>
            <li>Consider impact on credits, clawbacks, and benefits</li>
            <li>Tax software usually optimizes automatically</li>
          </ul>

          <h3>Factors Affecting Optimal Split</h3>
          <ul>
            <li>Each spouse's other income sources</li>
            <li>Age difference between spouses</li>
            <li>Provincial tax brackets</li>
            <li>Medical expense credits (3% of net income threshold)</li>
            <li>Age amount credit phase-out</li>
          </ul>

          <h2>CPP Splitting: Different Rules</h2>
          <p>CPP/QPP has separate sharing rules:</p>
          <ul>
            <li>Must apply to Service Canada</li>
            <li>Based on years living together during contributions</li>
            <li>Actual payments are redirected (not just tax treatment)</li>
            <li>Can be combined with pension splitting for RRIF income</li>
          </ul>

          <h2>Impact on Other Benefits</h2>

          <h3>For the Pensioner (Transferring)</h3>
          <ul>
            <li>Lower net income may increase GIS eligibility</li>
            <li>May preserve age amount credit</li>
            <li>May reduce OAS clawback</li>
          </ul>

          <h3>For the Receiving Spouse</h3>
          <ul>
            <li>Higher income may reduce age amount credit</li>
            <li>Could affect provincial benefits</li>
            <li>May impact spousal RRSP contribution room</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Forgetting to file T1032:</strong> Both returns rejected without it</li>
            <li><strong>Mismatched forms:</strong> Both spouses must show same amount</li>
            <li><strong>Splitting ineligible income:</strong> Only specific pension types qualify</li>
            <li><strong>Not recalculating annually:</strong> Optimal split changes with income</li>
            <li><strong>Assuming 50% is best:</strong> Lower percentage may be optimal</li>
          </ul>

          <h2>Planning Strategies</h2>

          <h3>Convert RRSP to RRIF Early</h3>
          <p>If you turn 65 before your spouse, consider converting RRSP to RRIF. RRIF income is eligible for splitting at 65.</p>

          <h3>Coordinate with Spousal RRSP</h3>
          <p>Spousal RRSP attributions don't affect pension splitting—consider both strategies together.</p>

          <h3>Review Annually</h3>
          <p>Income changes year to year. Recalculate the optimal split each tax season.</p>

          <h2>Tax Software and Splitting</h2>
          <p>Most tax software can:</p>
          <ul>
            <li>Calculate optimal split percentage</li>
            <li>Generate Form T1032</li>
            <li>Show tax savings from splitting</li>
            <li>Account for related credits and clawbacks</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Pension Splitting?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about pension income splitting strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Pension splitting calculations depend on individual circumstances. This guide provides general information. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
