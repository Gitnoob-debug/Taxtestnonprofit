import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, RefreshCw, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Annuity Tax Guide Canada 2024 | Life Annuities & Taxation',
  description: 'Complete guide to annuity taxation in Canada. Learn about prescribed vs non-prescribed annuities, RRSP annuities, and how annuity payments are taxed.',
  keywords: 'annuity tax Canada, life annuity taxation, prescribed annuity tax, RRSP annuity, annuity income tax',
}

export default function AnnuityTaxGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 dark:bg-cyan-900 p-2.5 rounded-xl">
              <RefreshCw className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Annuity Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">Guaranteed Income for Life</h2>
          <p className="text-cyan-700 dark:text-cyan-300 text-sm">
            Annuities provide guaranteed income, but tax treatment varies significantly depending on the type. Understanding the differences can save substantial taxes over your lifetime.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of Annuities</h2>

          <h3>Life Annuity</h3>
          <ul>
            <li>Payments for your lifetime</li>
            <li>No payments to estate (usually)</li>
            <li>Higher payments, longevity risk transferred</li>
          </ul>

          <h3>Term Certain Annuity</h3>
          <ul>
            <li>Payments for fixed period</li>
            <li>Remaining payments to estate if you die</li>
            <li>Lower payments than life annuity</li>
          </ul>

          <h3>Joint and Survivor</h3>
          <ul>
            <li>Payments continue to surviving spouse</li>
            <li>Usually at reduced rate (50-100%)</li>
            <li>Lower initial payments</li>
          </ul>

          <h3>Guaranteed Period</h3>
          <ul>
            <li>Life annuity with minimum guarantee</li>
            <li>E.g., Life with 10-year guarantee</li>
            <li>Payments to estate if death before guarantee ends</li>
          </ul>

          <h2>Registered vs Non-Registered</h2>

          <h3>Registered Annuities (from RRSP/RRIF)</h3>
          <ul>
            <li>100% of payments are taxable</li>
            <li>Same as RRIF withdrawals</li>
            <li>Purchased with pre-tax money</li>
            <li>Qualifies for pension income splitting (65+)</li>
          </ul>

          <h3>Non-Registered Annuities</h3>
          <ul>
            <li>Only interest portion taxable</li>
            <li>Capital returned tax-free</li>
            <li>Tax treatment depends on prescribed/non-prescribed</li>
          </ul>

          <h2>Prescribed vs Non-Prescribed Annuities</h2>

          <h3>Prescribed Annuity</h3>
          <ul>
            <li>Level taxation each year</li>
            <li>Taxable amount stays same throughout</li>
            <li>Interest and capital spread evenly</li>
            <li>Better for early years (defer tax)</li>
          </ul>

          <h3>Non-Prescribed Annuity (Accrual)</h3>
          <ul>
            <li>Interest taxed as earned</li>
            <li>Higher tax in early years</li>
            <li>Lower tax in later years</li>
            <li>More tax overall often</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Prescribed Advantage:</strong> For a 70-year-old, prescribed annuity might have 30% taxable vs 60% taxable in early years for non-prescribed. Significant tax deferral.
            </p>
          </div>

          <h2>Tax Calculation Example</h2>

          <h3>Non-Registered Prescribed Annuity</h3>
          <p>Purchase: $100,000, Annual payment: $8,000, Life expectancy: 20 years</p>
          <ul>
            <li>Total payments expected: $160,000</li>
            <li>Return of capital: $100,000</li>
            <li>Total interest: $60,000</li>
            <li>Taxable portion each year: $3,000 (60,000÷20)</li>
            <li>Tax-free return of capital: $5,000/year</li>
          </ul>

          <h3>If Non-Prescribed (Accrual)</h3>
          <ul>
            <li>Early years: More interest, higher tax</li>
            <li>Later years: Less interest, lower tax</li>
            <li>Less beneficial tax deferral</li>
          </ul>

          <h2>Qualifying for Prescribed Treatment</h2>

          <h3>Requirements</h3>
          <ul>
            <li>Individual annuitant (not corporation)</li>
            <li>Non-commutable (can't cash out)</li>
            <li>Level payments</li>
            <li>Must be life annuity or term certain (only)</li>
            <li>Payments at least annually</li>
          </ul>

          <h3>What Disqualifies</h3>
          <ul>
            <li>Variable payments</li>
            <li>Able to cash out</li>
            <li>Corporate-owned</li>
            <li>Certain guarantees may affect it</li>
          </ul>

          <h2>RRSP Annuity vs RRIF</h2>

          <h3>RRSP Annuity Pros</h3>
          <ul>
            <li>Guaranteed income for life</li>
            <li>No investment decisions</li>
            <li>Longevity protection</li>
            <li>May get higher rate than expected returns</li>
          </ul>

          <h3>RRSP Annuity Cons</h3>
          <ul>
            <li>No flexibility</li>
            <li>Can't access principal</li>
            <li>No estate value (unless guarantee)</li>
            <li>Locked in rate</li>
          </ul>

          <h3>RRIF Pros</h3>
          <ul>
            <li>Flexibility in withdrawals</li>
            <li>Investment control</li>
            <li>Estate value</li>
            <li>Can vary income yearly</li>
          </ul>

          <h3>Hybrid Approach</h3>
          <ul>
            <li>Part annuity for guaranteed base</li>
            <li>Part RRIF for flexibility</li>
            <li>Balance security and control</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Interest Rates Matter:</strong> Annuity rates are locked at purchase. Higher interest rate environment = better annuity rates. Consider timing.
            </p>
          </div>

          <h2>Tax Reporting</h2>

          <h3>Registered Annuity</h3>
          <ul>
            <li>Reported on T4A slip</li>
            <li>Full amount on Line 11500</li>
            <li>Qualifies for pension income amount</li>
          </ul>

          <h3>Non-Registered Annuity</h3>
          <ul>
            <li>T5 slip shows interest portion only</li>
            <li>Interest on Line 12100</li>
            <li>Capital returned is tax-free</li>
          </ul>

          <h2>Pension Income Splitting</h2>

          <h3>Registered Annuity (from RRSP)</h3>
          <ul>
            <li>Can split at age 65+</li>
            <li>Up to 50% to spouse</li>
            <li>Form T1032 election</li>
          </ul>

          <h3>Non-Registered Annuity</h3>
          <ul>
            <li>Generally cannot split</li>
            <li>Interest portion is investment income</li>
            <li>No pension splitting available</li>
          </ul>

          <h2>Annuity Strategies</h2>

          <h3>Laddering</h3>
          <ul>
            <li>Purchase annuities at different ages</li>
            <li>Get better rates as you age</li>
            <li>Diversify interest rate risk</li>
          </ul>

          <h3>Cover Basic Expenses</h3>
          <ul>
            <li>Annuity for essential costs</li>
            <li>RRIF for discretionary spending</li>
            <li>Peace of mind approach</li>
          </ul>

          <h3>Tax-Efficient Non-Registered</h3>
          <ul>
            <li>Prescribed annuity for tax deferral</li>
            <li>Lower taxable income in early years</li>
            <li>May preserve OAS/GIS</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Annuity from Pension Plan</h3>
          <ul>
            <li>Different rules than purchased annuity</li>
            <li>100% taxable (defined benefit)</li>
            <li>Eligible for pension income splitting (any age)</li>
          </ul>

          <h3>Foreign Annuities</h3>
          <ul>
            <li>May be taxed differently</li>
            <li>Foreign tax credit available</li>
            <li>Reporting requirements apply</li>
          </ul>

          <h3>Impaired Life Annuities</h3>
          <ul>
            <li>Higher rates if health issues</li>
            <li>Shorter expected life = higher payments</li>
            <li>Tax treatment same as standard</li>
          </ul>

          <h2>Death and Annuities</h2>

          <h3>Life Only</h3>
          <ul>
            <li>Payments stop at death</li>
            <li>Nothing to estate</li>
            <li>No tax consequences</li>
          </ul>

          <h3>Guaranteed Period</h3>
          <ul>
            <li>Remaining payments to beneficiary</li>
            <li>Continued taxable to recipient</li>
            <li>Or lump sum payout (taxed as income)</li>
          </ul>

          <h3>Joint and Survivor</h3>
          <ul>
            <li>Payments continue to survivor</li>
            <li>Survivor responsible for tax</li>
            <li>No estate tax issue</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Annuities?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about annuity taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Annuity decisions are significant and irreversible. Consult with a financial advisor and insurance specialist before purchasing.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
