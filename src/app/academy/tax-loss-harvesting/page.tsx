import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingDown, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Loss Harvesting Canada 2024 | Capital Loss Strategy Guide',
  description: 'Complete guide to tax loss harvesting in Canada. Learn when to sell at a loss, superficial loss rules, carrying losses forward and back, and strategic implementation.',
  keywords: 'tax loss harvesting Canada, capital loss deduction, superficial loss rule, capital gains offset, tax loss selling',
}

export default function TaxLossHarvestingPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-2.5 rounded-xl">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Tax Loss Harvesting: Strategic Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Turn Losses into Tax Savings</h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            Tax loss harvesting involves selling investments at a loss to offset capital gains. This strategy can save thousands in taxes while maintaining your desired portfolio allocation.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How Capital Loss Offsetting Works</h2>

          <h3>Basic Rule</h3>
          <ul>
            <li>Capital losses can only offset capital gains</li>
            <li>50% inclusion rate applies to both gains and losses</li>
            <li>Net capital loss: Total losses exceed gains for the year</li>
          </ul>

          <h3>Carrying Losses</h3>
          <ul>
            <li><strong>Carry back:</strong> Apply to any of the 3 preceding years</li>
            <li><strong>Carry forward:</strong> Apply to any future year (indefinitely)</li>
            <li>Must use carryback/forward forms with CRA</li>
          </ul>

          <h2>When to Harvest Losses</h2>

          <h3>Year-End Tax Planning</h3>
          <ul>
            <li>Review portfolio in December for unrealized losses</li>
            <li>Identify positions to sell before December 31</li>
            <li>Offset gains realized earlier in the year</li>
            <li>Settlement date must be in the tax year (T+2 for stocks)</li>
          </ul>

          <h3>Throughout the Year</h3>
          <ul>
            <li>Market downturns create opportunities</li>
            <li>Don't wait until year-end if significant loss exists</li>
            <li>Consider losses when rebalancing portfolio</li>
          </ul>

          <h2>The Superficial Loss Rule</h2>
          <p>The most important rule to understand:</p>

          <h3>The 30-Day Rule</h3>
          <p>A loss is "superficial" and denied if:</p>
          <ul>
            <li>You (or affiliated person) buy identical property</li>
            <li>Within 30 days before OR after the sale</li>
            <li>And still own it at end of that 61-day period</li>
          </ul>

          <h3>Affiliated Persons</h3>
          <ul>
            <li>Your spouse or common-law partner</li>
            <li>Corporations you control</li>
            <li>Trusts where you or spouse is beneficiary</li>
            <li>Your RRSP, TFSA, or RESP</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Buying in your TFSA within 30 days of selling in your non-registered account triggers the superficial loss rule. The loss is denied permanently (can't even add to TFSA cost base).
            </p>
          </div>

          <h3>What Happens with Superficial Loss?</h3>
          <ul>
            <li>Loss is denied for tax purposes</li>
            <li>Denied loss adds to cost base of repurchased property</li>
            <li>You'll eventually get the benefit when you sell</li>
            <li>Except for RRSP/TFSA purchases—loss is permanently lost</li>
          </ul>

          <h2>Avoiding Superficial Loss</h2>

          <h3>Strategy 1: Wait 31 Days</h3>
          <ul>
            <li>Sell the losing position</li>
            <li>Wait 31 days before repurchasing</li>
            <li>Risk: Miss potential recovery</li>
          </ul>

          <h3>Strategy 2: Buy Similar (Not Identical)</h3>
          <ul>
            <li>Sell losing ETF</li>
            <li>Immediately buy similar but different ETF</li>
            <li>Maintains market exposure</li>
            <li>Example: Sell XIC (iShares S&P/TSX), buy VCN (Vanguard FTSE Canada)</li>
          </ul>

          <h3>What's "Identical Property"?</h3>
          <ul>
            <li>Same stock or mutual fund units</li>
            <li>ETFs tracking same index are debatable—be cautious</li>
            <li>Different share classes of same company (e.g., BRK.A and BRK.B)</li>
            <li>Not identical: Different companies in same sector</li>
          </ul>

          <h2>Strategic Implementation</h2>

          <h3>Step 1: Identify Losing Positions</h3>
          <ul>
            <li>Review non-registered account holdings</li>
            <li>Calculate unrealized losses</li>
            <li>Consider which you're willing to sell</li>
          </ul>

          <h3>Step 2: Review Gains to Offset</h3>
          <ul>
            <li>Current year realized gains</li>
            <li>Expected gains before year-end</li>
            <li>Gains from previous 3 years (carryback option)</li>
          </ul>

          <h3>Step 3: Execute Trades</h3>
          <ul>
            <li>Sell losing positions</li>
            <li>Either wait 31 days or buy similar replacement</li>
            <li>Document transactions for tax records</li>
          </ul>

          <h2>Example Scenario</h2>
          <p>Portfolio situation:</p>
          <ul>
            <li>Sold rental property: $50,000 capital gain</li>
            <li>Stock A: $20,000 unrealized loss</li>
            <li>Stock B: $15,000 unrealized loss</li>
          </ul>

          <p><strong>Strategy:</strong></p>
          <ul>
            <li>Sell Stock A and B before December 31</li>
            <li>Total capital losses: $35,000</li>
            <li>Net taxable capital gain: $50,000 - $35,000 = $15,000</li>
            <li>Taxable amount (50%): $7,500 instead of $25,000</li>
            <li><strong>Tax saved at 40% bracket: ~$7,000</strong></li>
          </ul>

          <h2>Carryback vs. Carryforward</h2>

          <h3>When to Carry Back</h3>
          <ul>
            <li>Had significant gains in past 3 years</li>
            <li>Were in high tax bracket those years</li>
            <li>Get refund now for taxes already paid</li>
            <li>File Form T1A (Request for Loss Carryback)</li>
          </ul>

          <h3>When to Carry Forward</h3>
          <ul>
            <li>No significant past gains to offset</li>
            <li>Expect large gains in future</li>
            <li>Losses carry forward indefinitely</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Mutual Funds</h3>
          <ul>
            <li>Year-end distributions can create gains even in down years</li>
            <li>Check for pending distributions before buying</li>
            <li>Consider switching funds before distribution date</li>
          </ul>

          <h3>Deceased Taxpayer</h3>
          <ul>
            <li>Capital losses in year of death can offset any income</li>
            <li>Not just capital gains—can offset employment, pension, etc.</li>
            <li>Significant planning opportunity</li>
          </ul>

          <h3>Listed Personal Property</h3>
          <ul>
            <li>Art, jewelry, collectibles over $1,000</li>
            <li>Losses only offset listed personal property gains</li>
            <li>Can carry back 3 years or forward 7 years</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Buying back too soon:</strong> Superficial loss rule denies deduction</li>
            <li><strong>Spouse repurchases:</strong> Affiliated person rule applies</li>
            <li><strong>TFSA/RRSP purchases:</strong> Permanent loss denial</li>
            <li><strong>Missing settlement date:</strong> Trade must settle in tax year</li>
            <li><strong>Not tracking ACB:</strong> Incorrect cost base calculation</li>
          </ul>

          <h2>Documentation Required</h2>
          <ul>
            <li>Purchase confirmations (for cost base)</li>
            <li>Sale confirmations (for proceeds)</li>
            <li>Calculation of adjusted cost base</li>
            <li>Record of trade dates</li>
            <li>Documentation for carryforward/carryback</li>
          </ul>

          <h2>Tax Planning Tips</h2>
          <ul>
            <li><strong>Harvest regularly:</strong> Don't wait for year-end only</li>
            <li><strong>Consider transaction costs:</strong> Commissions reduce benefit</li>
            <li><strong>Watch for wash sale equivalents:</strong> Even different brokerages count</li>
            <li><strong>Track your ACB:</strong> Use tools like AdjustedCostBase.ca</li>
            <li><strong>Plan ahead:</strong> Know your expected gains before selling losers</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Tax Loss Harvesting?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about capital loss strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Tax loss harvesting involves complex rules. This guide provides general information. Consult a tax professional for personalized advice on your specific situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
