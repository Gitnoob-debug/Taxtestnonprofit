import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Capital Gains Tax Canada 2025 | Complete Guide, Rates & Strategies',
  description: 'Complete guide to capital gains tax in Canada for 2025. Learn about the 50% inclusion rate, calculating gains and losses, adjusted cost base (ACB), principal residence exemption, LCGE, and tax-saving strategies.',
  keywords: 'capital gains tax Canada 2025, capital gains inclusion rate, ACB adjusted cost base, capital gains exemption Canada, principal residence exemption, LCGE, tax loss harvesting',
  openGraph: {
    title: 'Capital Gains Tax Canada 2025 | Complete Guide',
    description: 'Everything you need to know about capital gains tax in Canada: 50% inclusion rate, exemptions, and tax-saving strategies.',
    type: 'article',
  },
}

export default function CapitalGainsTaxCanadaPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2.5 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Capital Gains Tax in Canada 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Understanding how capital gains are taxed in Canada and strategies to minimize your tax burden on investment profits.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 mb-4 text-xl">Capital Gains at a Glance for 2025</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">50% Inclusion Rate</p>
                <p className="text-green-700 text-sm">Only half is taxable</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">Tax-Free in TFSA</p>
                <p className="text-green-700 text-sm">No capital gains tax</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-green-900">LCGE: $1,016,836</p>
                <p className="text-green-700 text-sm">For qualified shares</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2024 Rate Proposal Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10 not-prose">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">2024 Rate Increase Proposal Was Cancelled</p>
              <p className="text-blue-700 text-sm">
                The proposed increase to 66.67% inclusion rate for gains over $250,000 (announced in Budget 2024) was <strong>cancelled in March 2025</strong>.
                The 50% inclusion rate remains in effect for all capital gains.
              </p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-li:sm:text-lg prose-ul:my-4 prose-ol:my-4">

          <h2 id="what-is-capital-gain">What Is a Capital Gain?</h2>
          <p>A capital gain occurs when you sell capital property for more than you paid for it. Common examples include:</p>
          <ul>
            <li><strong>Stocks and shares</strong> – publicly traded or private company shares</li>
            <li><strong>Real estate</strong> – investment properties (principal residence is usually exempt)</li>
            <li><strong>Bonds and mutual funds</strong> – including ETFs</li>
            <li><strong>Cryptocurrency</strong> – Bitcoin, Ethereum, and other digital assets</li>
            <li><strong>Art, collectibles, jewelry</strong> – valuable personal property</li>
            <li><strong>Business assets</strong> – equipment, goodwill, etc.</li>
          </ul>

          <h2 id="how-taxed">How Capital Gains Are Taxed</h2>

          <h3>The 50% Inclusion Rate</h3>
          <ul>
            <li><strong>50% inclusion:</strong> Only half of your gain is added to taxable income</li>
            <li><strong>Added to other income:</strong> Combined with employment, interest, etc.</li>
            <li><strong>Taxed at marginal rate:</strong> Your highest tax bracket applies</li>
          </ul>

          <h3>Example Calculation</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Selling Shares for a $5,000 Gain</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Step 1:</strong> Buy shares for $10,000</li>
              <li><strong>Step 2:</strong> Sell for $15,000</li>
              <li><strong>Step 3:</strong> Capital gain = $5,000</li>
              <li><strong>Step 4:</strong> Taxable capital gain = $2,500 (50%)</li>
              <li className="text-green-700 font-medium pt-2">If marginal rate is 40%: Tax owed = $1,000</li>
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Effective Tax Rate</p>
                <p className="text-emerald-700 text-sm">
                  With 50% inclusion, if your marginal rate is 40%, your effective capital gains rate is only <strong>20%</strong> (40% × 50%).
                  This makes capital gains one of the most tax-efficient forms of investment income.
                </p>
              </div>
            </div>
          </div>

          <h2 id="acb">Adjusted Cost Base (ACB)</h2>
          <p>The ACB is your cost for tax purposes. It&apos;s crucial for calculating your actual capital gain or loss.</p>

          <h3>What&apos;s Included in ACB</h3>
          <ul>
            <li><strong>Purchase price</strong> – what you paid for the investment</li>
            <li><strong>Commissions and fees</strong> – both buying and selling costs</li>
            <li><strong>Legal fees</strong> – for real estate transactions</li>
            <li><strong>Transfer taxes</strong> – land transfer tax, etc.</li>
          </ul>

          <h3>ACB for Multiple Purchases</h3>
          <p>When you buy the same security at different prices, you must calculate a weighted average:</p>
          <ul>
            <li><strong>Calculate weighted average cost</strong> – across all purchases</li>
            <li><strong>Formula:</strong> Total cost ÷ Total shares = ACB per share</li>
            <li><strong>Track separately</strong> – for each security you own</li>
          </ul>

          <h3>ACB Example</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Calculating Average Cost</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li>Buy 100 shares at $10 = $1,000</li>
              <li>Buy 100 shares at $15 = $1,500</li>
              <li>Total: 200 shares, $2,500 cost</li>
              <li className="text-green-700 font-medium pt-2">ACB per share: $12.50</li>
            </ul>
          </div>

          <h2 id="capital-losses">Capital Losses</h2>

          <h3>Using Capital Losses</h3>
          <ul>
            <li><strong>Offset gains same year:</strong> Deduct losses from gains</li>
            <li><strong>Carry back 3 years:</strong> Apply to previous years&apos; gains</li>
            <li><strong>Carry forward indefinitely:</strong> Use against future gains</li>
            <li><strong>50% allowable:</strong> Only 50% of loss is deductible (matches inclusion rate)</li>
          </ul>

          <h3>Superficial Loss Rule</h3>
          <p>Your loss is denied if:</p>
          <ul>
            <li><strong>You buy back:</strong> Same or identical property</li>
            <li><strong>Timing:</strong> Within 30 days before or after the sale</li>
            <li><strong>Affiliated persons:</strong> You, your spouse, or a corporation you control acquires it</li>
            <li><strong>Loss preserved:</strong> Added to ACB of the new shares (recovered when you eventually sell)</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Superficial Loss Warning</p>
                <p className="text-amber-700 text-sm">
                  The superficial loss rule prevents &quot;wash sales&quot;—selling to trigger a loss and immediately rebuying.
                  Wait 31+ days or buy a similar (but not identical) investment to avoid this rule.
                </p>
              </div>
            </div>
          </div>

          <h2 id="exemptions">Capital Gains Exemptions</h2>

          <h3>Principal Residence Exemption (PRE)</h3>
          <ul>
            <li><strong>Tax-free gains:</strong> Profits on your home are not taxed</li>
            <li><strong>One per family:</strong> Only one principal residence per family per year</li>
            <li><strong>Designation required:</strong> Must designate on Schedule 3 when selling</li>
            <li><strong>Partial exemption:</strong> Available if not always used as principal residence</li>
          </ul>

          <h3>Lifetime Capital Gains Exemption (LCGE)</h3>
          <p>For qualified small business corporation shares and farm/fishing property:</p>
          <ul>
            <li><strong>2025 limit:</strong> $1,016,836 (indexed annually)</li>
            <li><strong>Qualification rules:</strong> Strict requirements must be met</li>
            <li><strong>QSBC shares:</strong> Must be a Canadian-controlled private corporation</li>
            <li><strong>Professional advice:</strong> Highly recommended for LCGE claims</li>
          </ul>

          <h2 id="reporting">Reporting Capital Gains</h2>

          <h3>Schedule 3</h3>
          <p>Report all capital gains on Schedule 3 of your T1 tax return:</p>
          <ul>
            <li><strong>Shares of corporations</strong> – stocks, ETFs, mutual funds</li>
            <li><strong>Real estate</strong> – investment properties</li>
            <li><strong>Other capital property</strong> – crypto, collectibles, etc.</li>
            <li><strong>Principal residence designation</strong> – required when selling your home</li>
          </ul>

          <h3>Information You Need</h3>
          <ul>
            <li><strong>Description of property</strong> – what you sold</li>
            <li><strong>Date acquired</strong> – when you bought it</li>
            <li><strong>Proceeds of disposition</strong> – what you sold it for</li>
            <li><strong>ACB</strong> – your cost base</li>
            <li><strong>Outlays and expenses</strong> – selling costs</li>
          </ul>

          <h2 id="special-situations">Special Situations</h2>

          <h3>Deemed Dispositions</h3>
          <p>Capital gains can be triggered without actually selling:</p>
          <ul>
            <li><strong>Death:</strong> Deemed disposition at FMV (rollover to spouse possible)</li>
            <li><strong>Leaving Canada:</strong> Departure tax on most assets</li>
            <li><strong>Gift of property:</strong> Deemed disposed at FMV</li>
            <li><strong>Transfer to/from trust:</strong> May trigger gains</li>
          </ul>

          <h3>Foreign Property</h3>
          <ul>
            <li><strong>Same rules apply:</strong> To foreign investments</li>
            <li><strong>Currency conversion:</strong> Convert to CAD at transaction dates</li>
            <li><strong>Foreign tax credits:</strong> May be available</li>
            <li><strong>T1135 required:</strong> If foreign property cost over $100,000</li>
          </ul>

          <h3>Mutual Funds and ETFs</h3>
          <ul>
            <li><strong>Capital gains distributions:</strong> You may receive these annually</li>
            <li><strong>Tax slips:</strong> Reported on T3 or T5 slips</li>
            <li><strong>Your own gains:</strong> When you sell units</li>
            <li><strong>ACB tracking:</strong> Include reinvested distributions in your ACB</li>
          </ul>

          <h2 id="strategies">Capital Gains Tax Strategies</h2>

          <h3>Tax-Loss Harvesting</h3>
          <ul>
            <li><strong>Sell losers:</strong> To offset gains</li>
            <li><strong>Superficial loss rule:</strong> Wait 31 days before rebuying</li>
            <li><strong>Year-end planning:</strong> Review portfolio in December</li>
          </ul>

          <h3>Timing of Sales</h3>
          <ul>
            <li><strong>Defer gains:</strong> To lower-income years</li>
            <li><strong>Realize in retirement:</strong> When marginal rate is lower</li>
            <li><strong>Spread gains:</strong> Over multiple years if possible</li>
          </ul>

          <h3>Use Tax-Sheltered Accounts</h3>
          <ul>
            <li><strong>TFSA:</strong> No capital gains tax ever – 100% tax-free</li>
            <li><strong>RRSP:</strong> Tax-deferred growth until withdrawal</li>
            <li><strong>RESP:</strong> Tax-free growth for education</li>
            <li><strong>FHSA:</strong> Tax-free growth for first home</li>
          </ul>

          <h3>Donate Appreciated Securities</h3>
          <ul>
            <li><strong>Zero capital gains tax:</strong> On donated securities</li>
            <li><strong>Donation receipt:</strong> For full fair market value</li>
            <li><strong>Requirement:</strong> Must donate directly to registered charity</li>
          </ul>

          <h2 id="income-vs-capital">Capital Gains vs. Business Income</h2>
          <p>CRA may characterize your gains as 100% taxable business income if:</p>
          <ul>
            <li><strong>Frequent trading:</strong> High volume of transactions</li>
            <li><strong>Short holding periods:</strong> Day trading pattern</li>
            <li><strong>Trading is your business:</strong> Primary income source</li>
            <li><strong>Borrowed money:</strong> To invest heavily</li>
          </ul>
          <p><strong>Important:</strong> Business income is 100% taxable, not 50%. This can double your tax bill.</p>

          <h2 id="record-keeping">Record Keeping</h2>
          <p>Keep records for at least 6 years after selling:</p>
          <ul>
            <li><strong>Purchase confirmations</strong> – original buy transactions</li>
            <li><strong>Sale confirmations</strong> – all sell transactions</li>
            <li><strong>ACB calculations</strong> – running totals</li>
            <li><strong>Dividend reinvestment records</strong> – DRIP purchases</li>
            <li><strong>Return of capital adjustments</strong> – reduce your ACB</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About Capital Gains?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer specific questions about capital gains calculations, ACB tracking, and tax-saving strategies.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> Capital gains rules can be complex, especially for significant transactions, real estate, or business sales.
              Consult a tax professional for personalized advice on your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
