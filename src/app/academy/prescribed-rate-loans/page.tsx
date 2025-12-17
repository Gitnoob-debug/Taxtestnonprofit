import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Percent, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prescribed Rate Loan Strategy Canada 2024 | Income Splitting Guide',
  description: 'Complete guide to prescribed rate loans in Canada. Learn how to legally split investment income with your spouse, avoid attribution rules, and save taxes.',
  keywords: 'prescribed rate loan Canada, income splitting strategy, spousal loan Canada, attribution rules, CRA prescribed rate',
}

export default function PrescribedRateLoansPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-100 dark:bg-violet-900 p-2.5 rounded-xl">
              <Percent className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Prescribed Rate Loans: Income Splitting Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Legal Income Splitting Strategy</h2>
          <p className="text-violet-700 dark:text-violet-300 text-sm">
            A prescribed rate loan allows you to lend money to your lower-income spouse (or family trust) at CRA's prescribed interest rate, shifting investment income to be taxed in their hands at a lower rate.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>The Attribution Problem</h2>
          <p>Normally, if you give or lend money (interest-free) to your spouse:</p>
          <ul>
            <li>Investment income "attributes" back to you</li>
            <li>You pay tax on that income at your rate</li>
            <li>No income splitting benefit</li>
          </ul>

          <h2>How Prescribed Rate Loans Work</h2>
          <p>To avoid attribution rules, you can lend money at CRA's prescribed interest rate:</p>

          <h3>Requirements</h3>
          <ul>
            <li>Written loan agreement</li>
            <li>Interest rate at least equal to prescribed rate at time of loan</li>
            <li>Interest paid by borrower within 30 days of year-end</li>
            <li>Interest payment every year (miss one and attribution kicks in)</li>
          </ul>

          <h3>Current Prescribed Rate</h3>
          <p>The prescribed rate is set quarterly by CRA:</p>
          <ul>
            <li>Check current rate on CRA website</li>
            <li>Rate is locked in for life of the loan</li>
            <li>Higher rates in recent years make this less attractive</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Lock in a prescribed rate loan when rates are low. Once established, your rate doesn't change even if prescribed rate increases later.
            </p>
          </div>

          <h2>Step-by-Step Implementation</h2>

          <h3>Step 1: Create Written Agreement</h3>
          <p>The loan agreement should specify:</p>
          <ul>
            <li>Principal amount</li>
            <li>Interest rate (at least prescribed rate)</li>
            <li>Payment terms</li>
            <li>That interest is due by January 30 annually</li>
          </ul>

          <h3>Step 2: Transfer Funds</h3>
          <ul>
            <li>Higher-income spouse lends money to lower-income spouse</li>
            <li>Use cheque or bank transfer (documented)</li>
            <li>Keep records of the transfer</li>
          </ul>

          <h3>Step 3: Invest the Funds</h3>
          <ul>
            <li>Lower-income spouse invests in their name</li>
            <li>Their investment account, their decisions</li>
            <li>Can invest in stocks, bonds, mutual funds, etc.</li>
          </ul>

          <h3>Step 4: Pay Interest Annually</h3>
          <ul>
            <li>By January 30 each year</li>
            <li>Lower-income spouse pays interest to higher-income spouse</li>
            <li>Document the payment</li>
          </ul>

          <h3>Step 5: Report on Tax Returns</h3>
          <ul>
            <li><strong>Higher-income spouse:</strong> Reports interest received as income</li>
            <li><strong>Lower-income spouse:</strong> Deducts interest paid, reports investment income</li>
          </ul>

          <h2>Example Calculation</h2>
          <p>Assumptions:</p>
          <ul>
            <li>Loan amount: $200,000</li>
            <li>Prescribed rate: 4%</li>
            <li>Investment return: 6%</li>
            <li>Higher spouse's marginal rate: 50%</li>
            <li>Lower spouse's marginal rate: 20%</li>
          </ul>

          <h3>Without Prescribed Rate Loan</h3>
          <p>Higher-income spouse invests directly:</p>
          <ul>
            <li>Investment income: $12,000</li>
            <li>Tax (50%): $6,000</li>
            <li><strong>After-tax income: $6,000</strong></li>
          </ul>

          <h3>With Prescribed Rate Loan</h3>
          <p>Lower-income spouse invests:</p>
          <ul>
            <li>Investment income: $12,000</li>
            <li>Interest paid to spouse: $8,000</li>
            <li>Net income: $4,000</li>
            <li>Tax on $4,000 (20%): $800</li>
          </ul>
          <p>Higher-income spouse:</p>
          <ul>
            <li>Interest received: $8,000</li>
            <li>Tax on $8,000 (50%): $4,000</li>
          </ul>
          <p><strong>Total tax: $4,800</strong></p>
          <p><strong>Tax savings: $1,200/year</strong></p>

          <h2>When This Strategy Works Best</h2>
          <ul>
            <li><strong>Large income disparity:</strong> Bigger gap = bigger savings</li>
            <li><strong>Low prescribed rate:</strong> More income shifts to lower-earner</li>
            <li><strong>Higher investment returns:</strong> More excess income to split</li>
            <li><strong>Long time horizon:</strong> Benefits compound over years</li>
          </ul>

          <h2>When It Doesn't Work</h2>
          <ul>
            <li><strong>Similar incomes:</strong> Minimal tax rate difference</li>
            <li><strong>High prescribed rate:</strong> Too much interest back to high earner</li>
            <li><strong>Low returns:</strong> Investment returns below prescribed rate</li>
            <li><strong>Short term:</strong> Setup cost not worth small benefit</li>
          </ul>

          <h2>Variations on the Strategy</h2>

          <h3>Loan to Family Trust</h3>
          <ul>
            <li>Establish a family trust</li>
            <li>Loan to trust at prescribed rate</li>
            <li>Trust invests and distributes to beneficiaries (spouse, children)</li>
            <li>More complex but more flexibility</li>
          </ul>

          <h3>Loan to Adult Children</h3>
          <ul>
            <li>Same concept for adult children</li>
            <li>Must be genuine loan with interest payments</li>
            <li>Can help children build investment portfolio</li>
          </ul>

          <h2>Important Considerations</h2>

          <h3>Must Pay Interest Every Year</h3>
          <p>If interest isn't paid by January 30:</p>
          <ul>
            <li>Attribution rules apply retroactively</li>
            <li>All income attributes back to lender</li>
            <li>Strategy is broken permanently for that loan</li>
          </ul>

          <h3>Capital Gains</h3>
          <ul>
            <li>Capital gains attribute back to lender</li>
            <li>Only regular income (dividends, interest) stays with borrower</li>
            <li>Strategy mainly benefits dividend/interest income</li>
          </ul>

          <h3>Documentation</h3>
          <p>Keep detailed records:</p>
          <ul>
            <li>Loan agreement (signed and dated)</li>
            <li>Transfer of funds documentation</li>
            <li>Annual interest payments</li>
            <li>Investment statements in borrower's name</li>
          </ul>

          <h2>Tax Reporting</h2>

          <h3>Lender (Higher Income)</h3>
          <ul>
            <li>Report interest received on Line 12100</li>
            <li>Must report even though from spouse</li>
          </ul>

          <h3>Borrower (Lower Income)</h3>
          <ul>
            <li>Report investment income normally</li>
            <li>Deduct interest paid on Line 22100</li>
            <li>Keep receipts of interest payments</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Missing interest payment:</strong> Ruins the entire strategy</li>
            <li><strong>Below prescribed rate:</strong> Attribution still applies</li>
            <li><strong>No written agreement:</strong> CRA may challenge</li>
            <li><strong>Interest rate fixed wrong:</strong> Use rate from quarter loan made</li>
            <li><strong>Commingling funds:</strong> Keep investment account separate</li>
          </ul>

          <h2>Getting Professional Help</h2>
          <p>Consider consulting professionals for:</p>
          <ul>
            <li>Drafting loan agreement</li>
            <li>Setting up family trust (if using trust)</li>
            <li>Tax planning and optimization</li>
            <li>Ongoing compliance</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Prescribed Rate Loans?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about income splitting strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Prescribed rate loans involve complex tax rules. This guide provides general information. Consult a tax professional before implementing this strategy.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
