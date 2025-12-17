import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Layers, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mutual Fund & ETF Tax Canada 2024 | Distributions & Capital Gains',
  description: 'Complete guide to mutual fund and ETF taxation in Canada. Learn about distributions, T3 slips, capital gains, ACB tracking, and tax-efficient fund investing.',
  keywords: 'mutual fund tax Canada, ETF tax Canada, T3 slip, fund distributions tax, capital gains distributions',
}

export default function MutualFundsETFTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-2.5 rounded-xl">
              <Layers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Mutual Fund & ETF Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Two Tax Events</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            Mutual funds and ETFs can trigger tax in two ways: (1) distributions the fund pays you, and (2) capital gains when you sell. Both need proper tracking for accurate reporting.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of Fund Distributions</h2>

          <h3>Canadian Dividends</h3>
          <ul>
            <li>Eligible and non-eligible dividends</li>
            <li>Dividend tax credit applies</li>
            <li>Reported on T3 slip</li>
            <li>Gross-up and credit treatment</li>
          </ul>

          <h3>Capital Gains</h3>
          <ul>
            <li>Fund sells securities at a profit</li>
            <li>Passed through to unitholders</li>
            <li>50% inclusion rate</li>
            <li>Taxable even if reinvested</li>
          </ul>

          <h3>Interest and Foreign Income</h3>
          <ul>
            <li>100% taxable</li>
            <li>From bonds, foreign dividends</li>
            <li>No special credits</li>
          </ul>

          <h3>Return of Capital (ROC)</h3>
          <ul>
            <li>Not immediately taxable</li>
            <li>Reduces your ACB</li>
            <li>Results in larger capital gain when sold</li>
            <li>Common with certain funds</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> You pay tax on distributions even if they're reinvested. The reinvested amount increases your ACB, so you're not taxed twice.
            </p>
          </div>

          <h2>Understanding Your T3 Slip</h2>
          <p>Key boxes on the T3:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Box</th>
                <th>Description</th>
                <th>Tax Treatment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>21</td>
                <td>Capital gains</td>
                <td>50% taxable</td>
              </tr>
              <tr>
                <td>23</td>
                <td>Actual eligible dividends</td>
                <td>Gross-up 38%</td>
              </tr>
              <tr>
                <td>32</td>
                <td>Other income</td>
                <td>100% taxable</td>
              </tr>
              <tr>
                <td>42</td>
                <td>Return of capital</td>
                <td>Reduces ACB</td>
              </tr>
              <tr>
                <td>26</td>
                <td>Other dividends</td>
                <td>Gross-up 15%</td>
              </tr>
            </tbody>
          </table>

          <h2>Adjusted Cost Base (ACB) Tracking</h2>

          <h3>Why ACB Matters</h3>
          <ul>
            <li>Determines your capital gain/loss when selling</li>
            <li>Changes with each purchase, sale, and ROC</li>
            <li>Must track yourself for non-registered accounts</li>
          </ul>

          <h3>ACB Calculation</h3>
          <ul>
            <li><strong>Purchases:</strong> Add cost to ACB</li>
            <li><strong>Reinvested distributions:</strong> Add to ACB</li>
            <li><strong>Return of capital:</strong> Subtract from ACB</li>
            <li><strong>Sales:</strong> Reduce ACB proportionally</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Buy 100 units at $10 = $1,000 ACB</li>
            <li>Reinvest $50 distribution (5 units at $10)</li>
            <li>New ACB: $1,050 for 105 units</li>
            <li>ACB per unit: $10</li>
            <li>Receive $30 ROC</li>
            <li>New ACB: $1,020</li>
            <li>ACB per unit: $9.71</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> If you don't track ACB properly, you may pay too much tax. If ROC reduces your ACB to zero, further ROC becomes an immediate capital gain.
            </p>
          </div>

          <h2>ETFs vs Mutual Funds</h2>

          <h3>Tax Efficiency</h3>
          <ul>
            <li>ETFs generally more tax-efficient</li>
            <li>In-kind creation/redemption reduces gains</li>
            <li>Less portfolio turnover</li>
            <li>Fewer surprise capital gains distributions</li>
          </ul>

          <h3>Mutual Fund Issues</h3>
          <ul>
            <li>Can distribute large capital gains</li>
            <li>Especially if other investors redeem</li>
            <li>You pay tax on gains you didn't benefit from</li>
            <li>More common at year-end</li>
          </ul>

          <h2>Selling Fund Units</h2>

          <h3>Capital Gain/Loss Calculation</h3>
          <ul>
            <li>Proceeds minus ACB = capital gain/loss</li>
            <li>50% inclusion rate</li>
            <li>Report on Schedule 3</li>
          </ul>

          <h3>Selling Part of Your Holdings</h3>
          <ul>
            <li>Use average cost method</li>
            <li>Total ACB ÷ Total units = ACB per unit</li>
            <li>Reduce ACB by cost of units sold</li>
          </ul>

          <h2>Reinvested Distributions</h2>

          <h3>How They Work</h3>
          <ul>
            <li>Distribution used to buy more units</li>
            <li>Still taxable in year received</li>
            <li>New units have ACB = distribution amount</li>
          </ul>

          <h3>Record Keeping</h3>
          <ul>
            <li>Track each reinvestment</li>
            <li>Keep all T3/T5 slips</li>
            <li>Use spreadsheet or software</li>
            <li>Broker statements help but aren't complete</li>
          </ul>

          <h2>Phantom Distributions</h2>
          <p>You may owe tax without receiving cash:</p>
          <ul>
            <li>Capital gains distributed but reinvested</li>
            <li>Must have cash to pay tax</li>
            <li>Common surprise for new investors</li>
            <li>Check fund's distribution history</li>
          </ul>

          <h2>Year-End Planning</h2>

          <h3>Before Buying</h3>
          <ul>
            <li>Check fund's distribution schedule</li>
            <li>Avoid buying just before large distribution</li>
            <li>December distributions common for mutual funds</li>
            <li>You'd pay tax on gains you didn't participate in</li>
          </ul>

          <h3>Tax-Loss Harvesting</h3>
          <ul>
            <li>Sell losing positions to offset gains</li>
            <li>Wait 30 days to repurchase (superficial loss rule)</li>
            <li>Can buy similar but not identical fund</li>
          </ul>

          <h2>Funds in Different Accounts</h2>

          <h3>Non-Registered</h3>
          <ul>
            <li>All distributions taxable</li>
            <li>Must track ACB</li>
            <li>Prefer tax-efficient funds (ETFs, low turnover)</li>
          </ul>

          <h3>TFSA</h3>
          <ul>
            <li>No tax on distributions or gains</li>
            <li>No need to track ACB for tax</li>
            <li>US dividend withholding still applies</li>
          </ul>

          <h3>RRSP</h3>
          <ul>
            <li>No current tax on distributions</li>
            <li>All withdrawals taxed as income</li>
            <li>Good for interest-generating funds</li>
            <li>US dividends exempt from withholding</li>
          </ul>

          <h2>Asset Location Strategy</h2>
          <p>Optimize fund placement across accounts:</p>
          <ul>
            <li><strong>TFSA:</strong> High-growth potential</li>
            <li><strong>RRSP:</strong> Bonds, US dividends</li>
            <li><strong>Non-registered:</strong> Canadian dividends, tax-efficient ETFs</li>
          </ul>

          <h2>Foreign Content in Funds</h2>

          <h3>US-Listed ETFs</h3>
          <ul>
            <li>15% withholding on distributions</li>
            <li>May not be recovered in TFSA</li>
            <li>Exempt in RRSP</li>
            <li>Claim foreign tax credit in non-registered</li>
          </ul>

          <h3>Canadian-Listed Funds Holding Foreign Securities</h3>
          <ul>
            <li>Foreign withholding may be embedded</li>
            <li>Some funds claim treaty benefits</li>
            <li>Check fund documentation</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Not tracking reinvested distributions:</strong> Overpay tax</li>
            <li><strong>Ignoring return of capital:</strong> Wrong ACB</li>
            <li><strong>Buying before distribution:</strong> Unnecessary tax</li>
            <li><strong>Using broker's cost basis:</strong> May be wrong</li>
            <li><strong>Not reporting T3 slips:</strong> CRA has copies</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Fund Taxation?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about mutual fund and ETF taxes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Fund taxation can be complex. Keep detailed records and consider tax software or professional help for ACB tracking.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
