import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Split, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Income Splitting Canada 2024 | Tax Strategies Guide',
  description: 'Complete guide to family income splitting strategies in Canada. Learn legal ways to split income with spouse and family, including TOSI rules and exceptions.',
  keywords: 'income splitting Canada, family income splitting, TOSI rules, spousal RRSP, pension income splitting, prescribed rate loan',
}

export default function FamilyIncomeSplittingPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Split className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Tax Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Family Income Splitting Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Progressive Tax System Benefits</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Canada's progressive tax rates mean shifting income to lower-income family members can significantly reduce total family tax. However, strict TOSI (Tax on Split Income) rules limit many strategies.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Why Income Splitting Works</h2>

          <h3>Progressive Tax Brackets (2024)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Income</th>
                <th>Federal Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0-$55,867</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>$55,867-$111,733</td>
                <td>20.5%</td>
              </tr>
              <tr>
                <td>$111,733-$173,205</td>
                <td>26%</td>
              </tr>
              <tr>
                <td>$173,205-$246,752</td>
                <td>29%</td>
              </tr>
              <tr>
                <td>Over $246,752</td>
                <td>33%</td>
              </tr>
            </tbody>
          </table>

          <h3>The Math</h3>
          <p>High earner at $200,000, spouse at $20,000:</p>
          <ul>
            <li>Shifting $30,000 from high to low earner</li>
            <li>Tax saved: ~$7,000 (marginal rate difference)</li>
            <li>Plus provincial tax savings</li>
          </ul>

          <h2>TOSI Rules Overview</h2>

          <h3>What Is TOSI?</h3>
          <ul>
            <li>Tax on Split Income</li>
            <li>Applies top marginal rate to split income</li>
            <li>Targets artificial income splitting</li>
            <li>Eliminates benefit of shifting income</li>
          </ul>

          <h3>Income Subject to TOSI</h3>
          <ul>
            <li>Dividends from private corporations</li>
            <li>Income from related business</li>
            <li>Certain rental income</li>
            <li>Capital gains on related business shares</li>
          </ul>

          <h3>Excluded from TOSI</h3>
          <ul>
            <li>Employment income (actually earned)</li>
            <li>Pension income splitting</li>
            <li>CPP sharing</li>
            <li>Prescribed rate loan income (if done properly)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>TOSI is Complex:</strong> The rules have many exceptions based on age, involvement in business, and type of income. Professional advice recommended for business income splitting.
            </p>
          </div>

          <h2>Pension Income Splitting</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Transfer up to 50% to spouse</li>
            <li>Elected annually on return</li>
            <li>Form T1032</li>
            <li>No actual money transfer needed</li>
          </ul>

          <h3>Eligible Pension Income</h3>
          <ul>
            <li>RPP (registered pension plan) income—any age</li>
            <li>RRIF income—age 65+</li>
            <li>Annuity from RRSP—age 65+</li>
            <li>DPSP annuity payments</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>Both spouses can claim pension income amount</li>
            <li>Lower marginal rates</li>
            <li>May reduce OAS clawback</li>
            <li>Easy—just election on return</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example:</strong> Pension: $80,000. Split 50% ($40,000) to spouse with $15,000 other income. Tax savings: ~$5,000 + both claim pension income amount.
            </p>
          </div>

          <h2>Spousal RRSP</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Contribute to RRSP in spouse's name</li>
            <li>You get the deduction</li>
            <li>They own the RRSP</li>
            <li>Withdrawals taxed to them (after 3 years)</li>
          </ul>

          <h3>The 3-Year Attribution Rule</h3>
          <ul>
            <li>Withdrawals within 3 calendar years</li>
            <li>Attributed back to contributor</li>
            <li>Wait until third January 1 after contribution</li>
            <li>Or contributor pays the tax</li>
          </ul>

          <h3>Planning Strategy</h3>
          <ul>
            <li>High earner contributes during working years</li>
            <li>Gets deduction at high rate</li>
            <li>Lower-income spouse withdraws in retirement</li>
            <li>Pays tax at lower rate</li>
          </ul>

          <h2>CPP Pension Sharing</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Share CPP with spouse during retirement</li>
            <li>Both must be 60+</li>
            <li>Both must be receiving CPP</li>
            <li>Share based on time lived together</li>
          </ul>

          <h3>Application</h3>
          <ul>
            <li>Apply to Service Canada</li>
            <li>Form ISP1002</li>
            <li>Both spouses must consent</li>
            <li>Can be reversed</li>
          </ul>

          <h3>When Beneficial</h3>
          <ul>
            <li>Unequal CPP amounts</li>
            <li>Different tax brackets</li>
            <li>OAS clawback concerns</li>
          </ul>

          <h2>Prescribed Rate Loans</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Lend money to lower-income spouse</li>
            <li>At CRA prescribed rate</li>
            <li>Spouse invests the money</li>
            <li>Investment income taxed to them</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>Written loan agreement</li>
            <li>Interest at least at prescribed rate</li>
            <li>Interest paid by Jan 30 following year</li>
            <li>Proper documentation</li>
          </ul>

          <h3>Current Opportunity</h3>
          <ul>
            <li>Prescribed rate is relatively low</li>
            <li>Lock in rate at time of loan</li>
            <li>Rate stays same for loan's life</li>
            <li>Can shift significant investment income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example:</strong> Loan $500,000 to spouse at 5%. They invest at 8% return = $40,000 income. They report $40,000, pay you $25,000 interest. Net shift: $15,000 at lower rate.
            </p>
          </div>

          <h2>TFSA Contributions</h2>

          <h3>Give Money for TFSA</h3>
          <ul>
            <li>No attribution rules for TFSA</li>
            <li>Give spouse money for their TFSA</li>
            <li>Growth is tax-free anyway</li>
            <li>Simple and effective</li>
          </ul>

          <h3>Strategy</h3>
          <ul>
            <li>High earner funds both TFSAs</li>
            <li>Maximize family TFSA room</li>
            <li>Tax-free growth regardless</li>
            <li>Withdrawals tax-free</li>
          </ul>

          <h2>Employing Family Members</h2>

          <h3>Legitimate Employment</h3>
          <ul>
            <li>Pay spouse or children for actual work</li>
            <li>Must be reasonable salary for work done</li>
            <li>Document hours and duties</li>
            <li>Business deducts, they report income</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>Real services provided</li>
            <li>Arm's length salary (what you'd pay stranger)</li>
            <li>T4 issued, withholdings made</li>
            <li>Time records maintained</li>
          </ul>

          <h3>TOSI Considerations</h3>
          <ul>
            <li>Employment income not subject to TOSI</li>
            <li>Must be actual employment</li>
            <li>Dividends may trigger TOSI</li>
          </ul>

          <h2>RESP Contributions</h2>

          <h3>Income Shifting to Children</h3>
          <ul>
            <li>Contribute to child's RESP</li>
            <li>No deduction to contributor</li>
            <li>Growth and grants tax-deferred</li>
            <li>Taxed to student when withdrawn</li>
          </ul>

          <h3>Why It Works</h3>
          <ul>
            <li>Student typically has low/no income</li>
            <li>Tuition credits offset tax</li>
            <li>Effective income shift to future</li>
          </ul>

          <h2>Attribution Rules Summary</h2>

          <h3>Spousal Attribution</h3>
          <ul>
            <li>Gift/loan to spouse at below-market rate</li>
            <li>Investment income attributed back to you</li>
            <li>Exception: Prescribed rate loan</li>
            <li>Exception: Gift for TFSA</li>
          </ul>

          <h3>Minor Children Attribution</h3>
          <ul>
            <li>Gift to minor child</li>
            <li>Interest/dividends attributed to parent</li>
            <li>Capital gains stay with child</li>
            <li>Exception: Child Tax Benefit invested</li>
          </ul>

          <h3>Adult Children</h3>
          <ul>
            <li>Generally no attribution</li>
            <li>But TOSI may apply to business income</li>
            <li>Capital gains usually clean</li>
          </ul>

          <h2>Business Income Strategies</h2>

          <h3>With TOSI (More Complex)</h3>
          <ul>
            <li>Family members must have meaningful involvement</li>
            <li>Or be over 25 with capital investment</li>
            <li>Or be 18-24 with labor contribution</li>
            <li>Complex rules require professional advice</li>
          </ul>

          <h3>Reasonable Compensation</h3>
          <ul>
            <li>Pay salary for actual work</li>
            <li>Avoid dividends if TOSI applies</li>
            <li>Document involvement carefully</li>
          </ul>

          <h2>Putting It Together</h2>

          <h3>Common Strategy Package</h3>
          <ul>
            <li>Spousal RRSP during working years</li>
            <li>Fund both TFSAs</li>
            <li>Prescribed rate loan for investments</li>
            <li>Pension splitting in retirement</li>
            <li>CPP sharing if beneficial</li>
          </ul>

          <h3>Annual Review</h3>
          <ul>
            <li>Recalculate pension split optimal amount</li>
            <li>Review investment loan interest paid</li>
            <li>Adjust based on income changes</li>
            <li>Consider new opportunities</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Income Splitting?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about family income splitting strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Income splitting strategies, especially involving businesses, are complex and heavily regulated. Consult a tax professional to ensure compliance.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
