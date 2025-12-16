import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Capital Gains Tax Canada 2024 | Complete Guide & Rates',
  description: 'Complete guide to capital gains tax in Canada. Learn about inclusion rates, calculating gains and losses, adjusted cost base, and strategies to minimize capital gains tax.',
  keywords: 'capital gains tax Canada, capital gains inclusion rate, ACB adjusted cost base, capital gains exemption Canada',
}

export default function CapitalGainsTaxCanadaPage() {
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
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Capital Gains Tax in Canada
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 dark:text-green-100 mb-3">50% Inclusion Rate</h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            In Canada, only 50% of capital gains are taxable for most individuals. This makes capital gains one of the most tax-efficient forms of investment income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Is a Capital Gain?</h2>
          <p>A capital gain occurs when you sell capital property for more than you paid for it:</p>
          <ul>
            <li>Stocks and shares</li>
            <li>Real estate (except principal residence)</li>
            <li>Bonds and mutual funds</li>
            <li>Cryptocurrency</li>
            <li>Art, collectibles, jewelry</li>
            <li>Business assets</li>
          </ul>

          <h2>How Capital Gains Are Taxed</h2>

          <h3>The Inclusion Rate</h3>
          <ul>
            <li><strong>50% inclusion:</strong> Only half of your gain is taxable</li>
            <li>Added to your other income</li>
            <li>Taxed at your marginal rate</li>
          </ul>

          <h3>Example Calculation</h3>
          <ul>
            <li>Buy shares for $10,000</li>
            <li>Sell for $15,000</li>
            <li>Capital gain: $5,000</li>
            <li>Taxable capital gain: $2,500 (50%)</li>
            <li>If marginal rate is 40%: Tax = $1,000</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Effective Rate:</strong> With 50% inclusion, if your marginal rate is 40%, your effective capital gains rate is only 20% (40% × 50%).
            </p>
          </div>

          <h2>Adjusted Cost Base (ACB)</h2>
          <p>The ACB is your cost for tax purposes:</p>

          <h3>What's Included in ACB</h3>
          <ul>
            <li>Purchase price</li>
            <li>Commissions and fees (buying and selling)</li>
            <li>Legal fees</li>
            <li>Transfer taxes</li>
          </ul>

          <h3>ACB for Multiple Purchases</h3>
          <p>When you buy the same security at different prices:</p>
          <ul>
            <li>Calculate weighted average cost</li>
            <li>Total cost ÷ Total shares = ACB per share</li>
            <li>Must track separately for each security</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>Buy 100 shares at $10 = $1,000</li>
            <li>Buy 100 shares at $15 = $1,500</li>
            <li>Total: 200 shares, $2,500 cost</li>
            <li>ACB per share: $12.50</li>
          </ul>

          <h2>Capital Losses</h2>

          <h3>Using Capital Losses</h3>
          <ul>
            <li>Offset capital gains in the same year</li>
            <li>Carry back 3 years</li>
            <li>Carry forward indefinitely</li>
            <li>Only 50% of loss is deductible (matches inclusion)</li>
          </ul>

          <h3>Superficial Loss Rule</h3>
          <p>Loss denied if:</p>
          <ul>
            <li>Buy same or identical property</li>
            <li>Within 30 days before or after sale</li>
            <li>You or affiliated person acquires it</li>
            <li>Loss added to ACB of new shares</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> The superficial loss rule prevents "wash sales"—selling to trigger a loss and immediately rebuying. Wait 31+ days or buy a similar (but not identical) investment.
            </p>
          </div>

          <h2>Capital Gains Exemptions</h2>

          <h3>Principal Residence Exemption</h3>
          <ul>
            <li>Gains on your home are tax-free</li>
            <li>One principal residence per family per year</li>
            <li>Must designate on Schedule 3</li>
            <li>Partial exemption if not always principal residence</li>
          </ul>

          <h3>Lifetime Capital Gains Exemption (LCGE)</h3>
          <p>For qualified small business shares and farm/fishing property:</p>
          <ul>
            <li><strong>2024 limit:</strong> $1,016,836</li>
            <li>Indexed to inflation annually</li>
            <li>Strict qualification rules</li>
            <li>Professional advice recommended</li>
          </ul>

          <h2>Reporting Capital Gains</h2>

          <h3>Schedule 3</h3>
          <p>Report on Schedule 3 of your T1:</p>
          <ul>
            <li>Shares of corporations</li>
            <li>Real estate</li>
            <li>Other capital property</li>
            <li>Principal residence designation</li>
          </ul>

          <h3>Information You Need</h3>
          <ul>
            <li>Description of property</li>
            <li>Date acquired</li>
            <li>Proceeds of disposition</li>
            <li>ACB</li>
            <li>Outlays and expenses</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Deemed Dispositions</h3>
          <p>Capital gains can be triggered without selling:</p>
          <ul>
            <li>Death (deemed disposition at FMV)</li>
            <li>Leaving Canada</li>
            <li>Gift of property</li>
            <li>Transfer to/from trust</li>
          </ul>

          <h3>Foreign Property</h3>
          <ul>
            <li>Same rules apply to foreign investments</li>
            <li>Convert to CAD at transaction dates</li>
            <li>May have foreign tax credits</li>
            <li>T1135 if cost over $100,000</li>
          </ul>

          <h3>Mutual Funds and ETFs</h3>
          <ul>
            <li>May receive capital gains distributions</li>
            <li>Reported on T3 or T5 slips</li>
            <li>Also have gains when you sell</li>
            <li>Track ACB including reinvested distributions</li>
          </ul>

          <h2>Capital Gains Strategies</h2>

          <h3>Tax-Loss Harvesting</h3>
          <ul>
            <li>Sell losing investments to offset gains</li>
            <li>Respect superficial loss rule</li>
            <li>Year-end planning opportunity</li>
          </ul>

          <h3>Timing of Sales</h3>
          <ul>
            <li>Defer gains to lower-income years</li>
            <li>Realize gains in retirement</li>
            <li>Spread gains over multiple years</li>
          </ul>

          <h3>Use Tax-Sheltered Accounts</h3>
          <ul>
            <li><strong>TFSA:</strong> No capital gains tax ever</li>
            <li><strong>RRSP:</strong> Tax-deferred growth</li>
            <li><strong>RESP:</strong> Tax-free growth for education</li>
          </ul>

          <h3>Donate Appreciated Securities</h3>
          <ul>
            <li>No capital gains tax on donated securities</li>
            <li>Receive donation receipt for FMV</li>
            <li>Must donate directly to charity</li>
          </ul>

          <h2>Capital Gains vs. Income</h2>
          <p>CRA may characterize gains as business income if:</p>
          <ul>
            <li>Frequent trading</li>
            <li>Short holding periods</li>
            <li>Trading is your business</li>
            <li>Borrowed money to invest</li>
          </ul>
          <p>Business income is 100% taxable (not 50%).</p>

          <h2>Record Keeping</h2>
          <p>Keep records for at least 6 years:</p>
          <ul>
            <li>Purchase confirmations</li>
            <li>Sale confirmations</li>
            <li>ACB calculations</li>
            <li>Dividend reinvestment records</li>
            <li>Return of capital adjustments</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Capital Gains?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about capital gains calculations.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Capital gains rules can be complex. Consult a tax professional for significant transactions.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
