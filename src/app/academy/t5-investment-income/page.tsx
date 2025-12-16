import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'T5 Investment Income Guide: Dividends, Interest & Foreign Income | Canada 2024',
  description: 'Complete guide to T5 slips in Canada. Understand dividend income, interest income, eligible vs non-eligible dividends, gross-up and dividend tax credit explained.',
  keywords: 'T5 slip Canada, dividend income tax, interest income reporting, eligible dividends, dividend tax credit, T5 boxes explained',
}

export default function T5InvestmentIncomePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-2.5 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Investment Income</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            T5 Investment Income: Dividends, Interest & Foreign Income
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 dark:text-green-100 mb-3">What is a T5 Slip?</h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            The T5 Statement of Investment Income reports investment income you received from Canadian sources, including interest, dividends, and certain foreign income. You'll receive T5 slips from banks, brokerages, and corporations that paid you investment income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Key T5 Boxes Explained</h2>

          <h3>Box 10 - Actual Amount of Dividends (Other Than Eligible)</h3>
          <p>Non-eligible dividends from Canadian corporations, typically from small businesses (CCPCs) that pay the small business tax rate.</p>
          <p><strong>CRA Line:</strong> Report on Line 18000</p>

          <h3>Box 11 - Taxable Amount of Dividends (Other Than Eligible)</h3>
          <p>The grossed-up amount of non-eligible dividends. For 2024, non-eligible dividends are grossed up by 15%.</p>
          <p><strong>Example:</strong> $1,000 actual dividend = $1,150 taxable amount</p>

          <h3>Box 12 - Dividend Tax Credit (Other Than Eligible)</h3>
          <p>The federal dividend tax credit for non-eligible dividends. For 2024, this is 9.03% of the taxable amount (Box 11).</p>

          <h3>Box 13 - Interest from Canadian Sources</h3>
          <p>Interest income from bank accounts, GICs, bonds, and other Canadian interest-bearing investments.</p>
          <p><strong>CRA Line:</strong> Report on Line 12100</p>
          <p><strong>Note:</strong> Interest income is taxed at your full marginal rate with no special treatment.</p>

          <h3>Box 24 - Actual Amount of Eligible Dividends</h3>
          <p>Eligible dividends from Canadian public corporations and private corporations that pay the general corporate tax rate.</p>

          <h3>Box 25 - Taxable Amount of Eligible Dividends</h3>
          <p>Grossed-up amount of eligible dividends. For 2024, eligible dividends are grossed up by 38%.</p>
          <p><strong>Example:</strong> $1,000 actual dividend = $1,380 taxable amount</p>

          <h3>Box 26 - Dividend Tax Credit for Eligible Dividends</h3>
          <p>The federal dividend tax credit for eligible dividends. For 2024, this is 15.02% of the taxable amount.</p>

          <h2>Understanding the Dividend Gross-Up and Tax Credit</h2>
          <p>The dividend gross-up and tax credit system is designed to prevent double taxation:</p>
          <ol>
            <li><strong>Gross-up:</strong> Your dividend is increased to approximate pre-tax corporate income</li>
            <li><strong>Tax credit:</strong> You receive a credit representing taxes the corporation already paid</li>
            <li><strong>Net effect:</strong> You're taxed at roughly the same rate as if you'd earned the income directly</li>
          </ol>

          <h3>Eligible vs Non-Eligible Dividends Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Feature</th>
                  <th className="text-left">Eligible Dividends</th>
                  <th className="text-left">Non-Eligible Dividends</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Typically from</td>
                  <td>Public corporations, large CCPCs</td>
                  <td>Small business CCPCs</td>
                </tr>
                <tr>
                  <td>Gross-up rate (2024)</td>
                  <td>38%</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>Federal tax credit</td>
                  <td>15.02% of taxable amount</td>
                  <td>9.03% of taxable amount</td>
                </tr>
                <tr>
                  <td>Effective tax rate</td>
                  <td>Lower</td>
                  <td>Higher</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Interest Income Reporting</h2>
          <p>Unlike dividends, interest income receives no preferential tax treatment:</p>
          <ul>
            <li>100% of interest is added to your taxable income</li>
            <li>Taxed at your full marginal rate</li>
            <li>Must be reported even if you didn't receive a T5 (if under $50)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Financial institutions only issue T5 slips for interest income of $50 or more. However, you must report ALL interest income regardless of whether you receive a slip.
            </p>
          </div>

          <h2>Foreign Income on T5 Slips</h2>

          <h3>Box 15 - Foreign Income</h3>
          <p>Foreign income that was paid to you through a Canadian intermediary (like a mutual fund).</p>

          <h3>Box 16 - Foreign Tax Paid</h3>
          <p>Foreign withholding tax already deducted. You may be able to claim this as a foreign tax credit on Line 40500.</p>

          <h2>When You Won't Receive a T5</h2>
          <p>You won't get a T5 for investment income earned inside:</p>
          <ul>
            <li>RRSP/RRIF accounts (tax-deferred)</li>
            <li>TFSA accounts (tax-free)</li>
            <li>RESP accounts (special rules apply)</li>
            <li>FHSA accounts (tax-free for qualifying withdrawals)</li>
          </ul>
          <p>This is why holding interest-bearing investments inside TFSAs is tax-efficient!</p>

          <h2>Accrued Interest on Bonds</h2>
          <p>If you hold bonds directly (not in a mutual fund), you may need to report accrued interest annually, even if you haven't received payment. This is called the "anniversary day" rule.</p>

          <h2>Calculating Your Dividend Tax</h2>
          <p>Here's how dividend taxation works in practice (Ontario example, 2024):</p>

          <h3>Eligible Dividend Example</h3>
          <ul>
            <li>Actual dividend received: $1,000</li>
            <li>Grossed-up amount: $1,380 (Box 25)</li>
            <li>Federal tax (at 29%): $400.20</li>
            <li>Federal dividend tax credit: -$207.28</li>
            <li>Provincial tax (Ontario): varies</li>
            <li>Provincial dividend tax credit: varies</li>
            <li><strong>Effective tax rate: approximately 25-35% depending on income</strong></li>
          </ul>

          <h2>Common T5 Mistakes to Avoid</h2>
          <ul>
            <li><strong>Forgetting small amounts:</strong> Report interest even without a T5</li>
            <li><strong>Double-counting:</strong> If you own funds in a non-registered account, the fund issues the T5, not you</li>
            <li><strong>Missing foreign tax credits:</strong> Check Box 16 for claimable foreign taxes</li>
            <li><strong>DRIP confusion:</strong> Reinvested dividends are still taxable in the year received</li>
          </ul>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Eligible dividends are taxed more favourably than non-eligible dividends</li>
            <li>Interest income is taxed at your full marginal rate</li>
            <li>The gross-up and tax credit system prevents double taxation</li>
            <li>Report all investment income, even if you didn't receive a T5</li>
            <li>Investment income in registered accounts (TFSA, RRSP) doesn't generate T5 slips</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Calculate Your Investment Tax</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Use our tax calculator to see how investment income affects your overall tax bill.</p>
            <Link href="/tools/tax-calculator" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Tax Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes. Investment taxation can be complex. Consult a tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
