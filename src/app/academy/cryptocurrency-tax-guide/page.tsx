import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Bitcoin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cryptocurrency Tax Canada 2024 | Complete CRA Guide to Bitcoin & Crypto',
  description: 'How cryptocurrency is taxed in Canada. Learn about CRA crypto rules, capital gains on Bitcoin, taxable events, reporting requirements, and calculating your crypto taxes.',
  keywords: 'crypto tax Canada, bitcoin tax CRA, cryptocurrency capital gains, crypto taxable events Canada, how to report crypto taxes',
}

export default function CryptocurrencyTaxGuidePage() {
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
              <Bitcoin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Cryptocurrency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Cryptocurrency Tax Guide Canada: CRA Rules Explained
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />15 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">CRA's Position on Cryptocurrency</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            The CRA treats cryptocurrency as a commodity, not a currency. This means transactions are subject to either capital gains tax (most common) or business income tax, depending on your situation. All crypto transactions must be reported in Canadian dollars.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Capital Gains vs Business Income</h2>
          <p>The first question is whether your crypto activity is treated as capital gains or business income:</p>

          <h3>Capital Gains Treatment (Most Individuals)</h3>
          <ul>
            <li>Only 50% of gains are taxable (66.67% above $250,000 as of June 25, 2024)</li>
            <li>Losses can offset other capital gains</li>
            <li>Unused losses can be carried back 3 years or forward indefinitely</li>
          </ul>
          <p><strong>Typical for:</strong> Investors who buy and hold, occasional traders</p>

          <h3>Business Income Treatment</h3>
          <ul>
            <li>100% of profits are taxable</li>
            <li>Losses deductible against other income</li>
            <li>Must pay CPP contributions on self-employment income</li>
          </ul>
          <p><strong>Typical for:</strong> Day traders, crypto mining operations, people who trade crypto as their primary income source</p>

          <h2>Taxable Crypto Events</h2>
          <p>The following trigger a taxable event:</p>

          <h3>Definitely Taxable</h3>
          <ul>
            <li><strong>Selling crypto for CAD:</strong> Gain/loss = Sale price - Adjusted cost base (ACB)</li>
            <li><strong>Trading crypto for another crypto:</strong> Treated as selling one and buying the other</li>
            <li><strong>Using crypto to buy goods/services:</strong> Deemed disposition at fair market value</li>
            <li><strong>Gifting crypto:</strong> Deemed disposition at fair market value (except to spouse)</li>
          </ul>

          <h3>Income Events</h3>
          <ul>
            <li><strong>Mining crypto:</strong> Fair market value when received is income</li>
            <li><strong>Staking rewards:</strong> Fair market value when received is income</li>
            <li><strong>Airdrops:</strong> Fair market value when received is income</li>
            <li><strong>Crypto earned from work:</strong> Employment or business income</li>
          </ul>

          <h3>Not Taxable</h3>
          <ul>
            <li><strong>Buying crypto with CAD:</strong> No tax until you dispose of it</li>
            <li><strong>Transferring between your own wallets:</strong> Not a disposition</li>
            <li><strong>HODLing:</strong> Unrealized gains are not taxed</li>
          </ul>

          <h2>Calculating Your Adjusted Cost Base (ACB)</h2>
          <p>ACB is crucial for calculating gains/losses. Canada uses the <strong>weighted average cost</strong> method:</p>

          <h3>ACB Calculation Example</h3>
          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg my-4 not-prose text-sm">
            <p className="mb-2"><strong>Purchase 1:</strong> 0.5 BTC for $15,000 = $30,000/BTC</p>
            <p className="mb-2"><strong>Purchase 2:</strong> 0.3 BTC for $12,000 = $40,000/BTC</p>
            <p className="mb-2"><strong>Total:</strong> 0.8 BTC for $27,000</p>
            <p className="mb-2"><strong>ACB per BTC:</strong> $27,000 ÷ 0.8 = $33,750</p>
            <p><strong>If you sell 0.2 BTC for $10,000:</strong></p>
            <p>ACB of 0.2 BTC = 0.2 × $33,750 = $6,750</p>
            <p>Capital gain = $10,000 - $6,750 = $3,250</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Each cryptocurrency has its own ACB pool. Your Bitcoin ACB is separate from your Ethereum ACB. You must track each coin separately.
            </p>
          </div>

          <h2>Crypto-to-Crypto Trades</h2>
          <p>When you trade one crypto for another, it's TWO transactions:</p>
          <ol>
            <li>Deemed sale of the first crypto at fair market value</li>
            <li>Purchase of the second crypto at fair market value</li>
          </ol>

          <h3>Example</h3>
          <p>You trade 1 ETH (ACB $2,000) for 0.05 BTC when ETH is worth $3,000:</p>
          <ul>
            <li>Capital gain on ETH: $3,000 - $2,000 = $1,000</li>
            <li>ACB of new BTC: $3,000 (add to existing BTC pool)</li>
          </ul>

          <h2>DeFi, Staking, and Yield Farming</h2>

          <h3>Staking Rewards</h3>
          <p>The CRA hasn't issued specific guidance, but the general consensus is:</p>
          <ul>
            <li>Staking rewards are income at fair market value when received</li>
            <li>Your ACB for the received tokens is the income amount</li>
            <li>Later sale may result in additional capital gain/loss</li>
          </ul>

          <h3>Liquidity Pool Rewards</h3>
          <p>Similar treatment to staking - income when received, with subsequent capital gains treatment on disposal.</p>

          <h3>Interest from Lending</h3>
          <p>Interest received in crypto is income at fair market value when received.</p>

          <h2>NFTs (Non-Fungible Tokens)</h2>
          <p>NFTs are treated similarly to other crypto:</p>
          <ul>
            <li>Buying an NFT with crypto triggers capital gains on the crypto used</li>
            <li>Selling an NFT triggers capital gains (sale price minus ACB)</li>
            <li>If you create and sell NFTs, it's likely business income</li>
          </ul>

          <h2>Reporting Crypto on Your Tax Return</h2>

          <h3>Capital Gains</h3>
          <ul>
            <li>Report on Schedule 3 (Capital Gains)</li>
            <li>Include proceeds, ACB, and gain/loss for each disposition</li>
            <li>Aggregate gains go to Line 12700</li>
          </ul>

          <h3>Business Income</h3>
          <ul>
            <li>Report on T2125 (Business Income)</li>
            <li>Include gross revenue and deductible expenses</li>
          </ul>

          <h3>Income from Mining/Staking</h3>
          <ul>
            <li>If hobby: Report on Line 13000 (Other Income)</li>
            <li>If business: Report on T2125</li>
          </ul>

          <h2>Record Keeping</h2>
          <p>You MUST keep detailed records for 6 years:</p>
          <ul>
            <li>Date of each transaction</li>
            <li>Description (buy, sell, trade, etc.)</li>
            <li>Quantity of crypto</li>
            <li>Fair market value in CAD at time of transaction</li>
            <li>Wallet addresses involved</li>
            <li>Exchange transaction records</li>
          </ul>

          <h3>Tools for Tracking</h3>
          <p>Consider using crypto tax software like:</p>
          <ul>
            <li>Koinly</li>
            <li>CoinTracker</li>
            <li>Coinpanda</li>
            <li>CryptoTaxCalculator</li>
          </ul>

          <h2>Lost or Stolen Crypto</h2>
          <p>If your crypto is lost or stolen:</p>
          <ul>
            <li>You may be able to claim a capital loss</li>
            <li>Must be able to prove the loss occurred</li>
            <li>CRA may require police report or exchange documentation</li>
            <li>Cannot claim loss for coins you still have access to (forgotten password ≠ lost)</li>
          </ul>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Crypto is taxed as property, not currency, in Canada</li>
            <li>Most individuals pay capital gains tax (50% inclusion rate)</li>
            <li>Every crypto-to-crypto trade is a taxable event</li>
            <li>Use the adjusted cost base method to calculate gains</li>
            <li>Mining, staking, and airdrops are income when received</li>
            <li>Keep detailed records of ALL transactions</li>
            <li>Report everything - CRA has exchange data</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Calculate Your Crypto Capital Gains</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Use our capital gains calculator to see how much tax you'll owe on your crypto gains.</p>
            <Link href="/tools/capital-gains-calculator" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Capital Gains Calculator <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Crypto taxation is evolving and can be complex. This guide reflects current CRA guidance but rules may change. Consult a tax professional familiar with cryptocurrency for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
