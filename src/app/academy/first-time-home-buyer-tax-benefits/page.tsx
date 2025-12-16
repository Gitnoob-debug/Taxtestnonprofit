import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Home, ArrowRight, Calculator } from 'lucide-react'

export const metadata: Metadata = {
  title: 'First-Time Home Buyer Tax Benefits Canada 2024 | FHSA, HBP Guide',
  description: 'All tax benefits for first-time home buyers in Canada: FHSA, RRSP Home Buyers\' Plan, First-Time Home Buyers\' Tax Credit, and Land Transfer Tax rebates by province.',
  keywords: 'first time home buyer Canada, FHSA, Home Buyers Plan, first time home buyer tax credit, land transfer tax rebate Ontario',
}

export default function FirstTimeHomeBuyerPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
              <Home className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Home Buying</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            First-Time Home Buyer Tax Benefits in Canada (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Combine for Up to $75,000+ in Tax Benefits</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">$40,000</p>
              <p className="text-red-700 dark:text-red-300">FHSA</p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">$35,000</p>
              <p className="text-red-700 dark:text-red-300">RRSP HBP</p>
            </div>
            <div className="text-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">$1,500</p>
              <p className="text-red-700 dark:text-red-300">Tax Credit</p>
            </div>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>1. First Home Savings Account (FHSA)</h2>
          <p>The FHSA, introduced in 2023, is the most powerful tool for first-time home buyers. It combines the best features of both RRSP and TFSA:</p>
          <ul>
            <li><strong>Tax-deductible contributions</strong> (like RRSP)</li>
            <li><strong>Tax-free withdrawals</strong> for a qualifying home (like TFSA)</li>
            <li><strong>Annual limit:</strong> $8,000/year</li>
            <li><strong>Lifetime limit:</strong> $40,000</li>
            <li><strong>Unused room:</strong> Carries forward up to $8,000/year</li>
          </ul>

          <h3>FHSA Eligibility</h3>
          <ul>
            <li>Canadian resident 18 or older</li>
            <li>First-time home buyer (haven't owned a home in current year or previous 4 years)</li>
            <li>Neither you nor your spouse owned a home you lived in</li>
          </ul>

          <h3>FHSA Strategy</h3>
          <p>Open an FHSA as early as possible, even if you're not ready to buy. You have 15 years to use it, and room starts accumulating once it's open. If you never buy a home, you can transfer the funds to an RRSP without affecting your RRSP room.</p>

          <h2>2. RRSP Home Buyers' Plan (HBP)</h2>
          <p>Withdraw up to <strong>$35,000</strong> from your RRSP tax-free for a first home. Couples can each withdraw $35,000 for $70,000 total.</p>

          <h3>Key Rules</h3>
          <ul>
            <li>Must repay over 15 years (starting 2nd year after withdrawal)</li>
            <li>Minimum annual payment: 1/15 of withdrawn amount</li>
            <li>Missed payments added to taxable income</li>
            <li>Must be first-time buyer (no home ownership in past 4 years)</li>
          </ul>

          <h3>FHSA vs HBP: Can You Use Both?</h3>
          <p><strong>Yes!</strong> You can use both the FHSA ($40,000) and HBP ($35,000) for a total of $75,000 per person. The key difference: FHSA withdrawals never need to be repaid.</p>

          <h2>3. First-Time Home Buyers' Tax Credit (HBTC)</h2>
          <p>A non-refundable federal tax credit worth <strong>$1,500</strong> (calculated as $10,000 × 15%).</p>
          <ul>
            <li>Claim in the year you purchase your first home</li>
            <li>Can be split between spouses</li>
            <li>Also available for disabled buyers (not required to be first-time)</li>
          </ul>

          <h2>4. GST/HST New Housing Rebate</h2>
          <p>If you buy a newly built home, you may qualify for a rebate of some GST/HST paid:</p>
          <ul>
            <li><strong>Federal rebate:</strong> Up to $6,300 (36% of GST on homes under $350,000)</li>
            <li><strong>Provincial rebates:</strong> Vary by province (Ontario offers up to $24,000)</li>
            <li>Rebate phases out for homes between $350,000 and $450,000</li>
          </ul>

          <h2>5. Provincial Land Transfer Tax Rebates</h2>
          <h3>Ontario</h3>
          <p>First-time buyers can get up to <strong>$4,000</strong> refund on provincial land transfer tax. Toronto buyers also get up to <strong>$4,475</strong> rebate on the municipal land transfer tax (total: $8,475).</p>

          <h3>British Columbia</h3>
          <p>First Time Home Buyers' Program: Full exemption from property transfer tax on homes up to $500,000 (partial exemption up to $525,000).</p>

          <h3>Prince Edward Island</h3>
          <p>First-time buyers exempt from real property transfer tax on the first $200,000.</p>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <div className="flex items-start gap-4">
              <Calculator className="h-8 w-8 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Calculate Your FHSA Tax Savings</h3>
                <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">See how much you can save with our FHSA calculator.</p>
                <Link href="/tools/fhsa-calculator" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  FHSA Calculator <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <h2>Key Takeaways</h2>
          <ul>
            <li>FHSA is the most powerful tool—open one now even if you're years from buying</li>
            <li>Combine FHSA ($40K) + HBP ($35K) for $75,000 tax-free per person</li>
            <li>Don't forget the $1,500 federal home buyers' tax credit</li>
            <li>Check provincial rebates—Ontario first-time buyers can save $8,475 in Toronto</li>
          </ul>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes only. Rules and amounts change—verify current details with CRA and provincial authorities before making decisions.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
