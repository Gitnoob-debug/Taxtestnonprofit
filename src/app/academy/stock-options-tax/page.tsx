import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Award, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stock Options Tax Canada 2024 | Employee Stock Option Taxation',
  description: 'Complete guide to stock option taxation in Canada. Learn about the 50% deduction, exercise timing, AMT implications, and tax planning strategies for employee stock options.',
  keywords: 'stock options tax Canada, employee stock options, stock option deduction, ESOP Canada tax, stock option exercise tax',
}

export default function StockOptionsTaxPage() {
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
              <Award className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Stock Options Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Important 2024 Changes</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Stock option taxation has changed. For certain employees, the 50% stock option deduction is now limited. Understanding these rules is critical for tax planning.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How Stock Options Work</h2>

          <h3>The Basics</h3>
          <ul>
            <li>Right to buy company shares at a fixed price (exercise price)</li>
            <li>Usually vest over time (e.g., 4 years)</li>
            <li>Valuable if stock price rises above exercise price</li>
            <li>No tax when granted</li>
          </ul>

          <h3>Key Terms</h3>
          <ul>
            <li><strong>Grant:</strong> When options are given to you</li>
            <li><strong>Vest:</strong> When options become exercisable</li>
            <li><strong>Exercise:</strong> When you buy shares using options</li>
            <li><strong>Exercise price:</strong> Price you pay for shares</li>
            <li><strong>FMV:</strong> Fair market value when exercised</li>
          </ul>

          <h2>When Are Stock Options Taxed?</h2>

          <h3>Timing of Taxation</h3>
          <ul>
            <li><strong>Public companies:</strong> Taxed at exercise</li>
            <li><strong>CCPCs:</strong> Can be deferred until sale</li>
            <li>The "benefit" is the difference between FMV and exercise price</li>
          </ul>

          <h3>The Stock Option Benefit</h3>
          <ul>
            <li>FMV at exercise minus exercise price</li>
            <li>Treated as employment income</li>
            <li>Reported on T4 slip</li>
            <li>Subject to income tax (not CPP/EI)</li>
          </ul>

          <h2>The 50% Stock Option Deduction</h2>

          <h3>Current Rules (Post-2021)</h3>
          <ul>
            <li><strong>$200,000 annual limit</strong> on deduction-eligible options</li>
            <li>Limit based on FMV of shares when options vest</li>
            <li>Applies to public companies and large CCPCs</li>
            <li>Small CCPCs often exempt from limit</li>
          </ul>

          <h3>Qualifying for the Deduction</h3>
          <p>To claim the 50% deduction:</p>
          <ul>
            <li>Exercise price ≥ FMV when option granted</li>
            <li>Shares are prescribed shares (common shares)</li>
            <li>Arm's length employee-employer relationship</li>
            <li>Within the $200,000 annual limit (if applicable)</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> With the 50% deduction, stock options are effectively taxed at capital gains rates—only half the benefit is taxable.
            </p>
          </div>

          <h2>Example Calculation</h2>
          <p>You exercise options to buy 1,000 shares:</p>
          <ul>
            <li>Exercise price: $10/share</li>
            <li>FMV at exercise: $25/share</li>
            <li>Total cost: $10,000</li>
            <li>Total FMV: $25,000</li>
            <li><strong>Stock option benefit:</strong> $15,000</li>
          </ul>

          <h3>With 50% Deduction</h3>
          <ul>
            <li>Employment income: $15,000</li>
            <li>Deduction (line 24900): $7,500</li>
            <li>Net taxable: $7,500</li>
            <li>At 40% rate: $3,000 tax</li>
          </ul>

          <h3>Without Deduction</h3>
          <ul>
            <li>Employment income: $15,000</li>
            <li>At 40% rate: $6,000 tax</li>
          </ul>

          <h2>CCPC Stock Options</h2>
          <p>Canadian-Controlled Private Corporations have special rules:</p>

          <h3>Tax Deferral</h3>
          <ul>
            <li>Tax deferred until shares are sold</li>
            <li>Not taxed at exercise</li>
            <li>Helps with cash flow</li>
            <li>Must meet qualifying criteria</li>
          </ul>

          <h3>Exemption from $200K Limit</h3>
          <ul>
            <li>Small CCPCs not subject to limit</li>
            <li>Gross revenues under $500M</li>
            <li>All employees qualify for deduction</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> If you exercise CCPC options and don't sell the shares, you still owe tax when you eventually sell. Don't forget to set aside money for taxes.
            </p>
          </div>

          <h2>Subsequent Sale of Shares</h2>

          <h3>Capital Gain or Loss</h3>
          <p>When you sell shares acquired through options:</p>
          <ul>
            <li>ACB = FMV at exercise (not exercise price)</li>
            <li>Proceeds minus ACB = capital gain/loss</li>
            <li>50% inclusion rate applies</li>
          </ul>

          <h3>Example</h3>
          <ul>
            <li>FMV at exercise: $25 (your ACB)</li>
            <li>Sell at $35</li>
            <li>Capital gain: $10/share</li>
            <li>Taxable capital gain: $5/share</li>
          </ul>

          <h2>Alternative Minimum Tax (AMT)</h2>
          <p>Stock options can trigger AMT:</p>
          <ul>
            <li>50% deduction is a tax preference item</li>
            <li>Added back for AMT calculation</li>
            <li>May pay more tax in exercise year</li>
            <li>AMT recoverable in future years</li>
          </ul>

          <h3>Planning for AMT</h3>
          <ul>
            <li>Spread exercises over multiple years</li>
            <li>Calculate potential AMT before exercising</li>
            <li>Consider timing with other income</li>
          </ul>

          <h2>Exercise and Hold vs Exercise and Sell</h2>

          <h3>Exercise and Sell Same Day</h3>
          <ul>
            <li>No capital gain (proceeds = FMV)</li>
            <li>Only stock option benefit taxed</li>
            <li>Immediate liquidity</li>
            <li>No market risk</li>
          </ul>

          <h3>Exercise and Hold</h3>
          <ul>
            <li>Need cash to pay exercise price</li>
            <li>Need cash to pay tax on benefit</li>
            <li>Potential for capital gains</li>
            <li>Risk if stock price falls</li>
          </ul>

          <h2>Tax Planning Strategies</h2>

          <h3>Timing of Exercise</h3>
          <ul>
            <li>Consider your marginal tax rate</li>
            <li>Exercise in lower income years</li>
            <li>Spread exercises to manage brackets</li>
            <li>Watch expiration dates</li>
          </ul>

          <h3>Using the $200,000 Limit</h3>
          <ul>
            <li>Limit based on vesting year FMV</li>
            <li>Plan vesting to stay under limit</li>
            <li>Talk to employer about option grants</li>
          </ul>

          <h3>Donation of Shares</h3>
          <ul>
            <li>Donate publicly traded shares directly</li>
            <li>No capital gains tax on donation</li>
            <li>Receive donation receipt for FMV</li>
            <li>Stock option benefit still taxable</li>
          </ul>

          <h2>Employer Reporting</h2>
          <p>Your employer reports:</p>
          <ul>
            <li><strong>T4 Box 14:</strong> Includes stock option benefit</li>
            <li><strong>T4 Box 38:</strong> Stock option benefit amount</li>
            <li><strong>T4 Box 39:</strong> Amount eligible for deduction</li>
            <li><strong>T4 Box 41:</strong> Security option cash-out</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Not setting aside tax:</strong> Big tax bill at exercise</li>
            <li><strong>Holding too long:</strong> Stock may fall, but tax is owed</li>
            <li><strong>Ignoring AMT:</strong> Surprised by minimum tax</li>
            <li><strong>Wrong ACB:</strong> Using exercise price instead of FMV</li>
            <li><strong>Missing the deduction:</strong> Not claiming eligible 50%</li>
          </ul>

          <h2>RSUs vs Stock Options</h2>
          <p>Restricted Stock Units are different:</p>
          <ul>
            <li>No exercise price</li>
            <li>Full value taxable as employment income</li>
            <li>No 50% deduction</li>
            <li>Simpler but higher tax</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Stock Options?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about stock option taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Stock option taxation is complex and rules change. Consult a tax professional before exercising significant options.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
