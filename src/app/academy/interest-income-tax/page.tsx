import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Percent, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Interest Income Tax Canada 2024 | GICs, Savings, Bonds',
  description: 'Complete guide to interest income taxation in Canada. Learn how interest from GICs, savings accounts, and bonds is taxed, reporting requirements, and tax-efficient strategies.',
  keywords: 'interest income tax Canada, GIC tax, savings account tax, bond interest tax, T5 slip interest',
}

export default function InterestIncomeTaxPage() {
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
              <Percent className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Interest Income Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-cyan-900 dark:text-cyan-100 mb-3">Fully Taxable Income</h2>
          <p className="text-cyan-700 dark:text-cyan-300 text-sm">
            Interest income is one of the least tax-efficient forms of investment income. Unlike dividends and capital gains, 100% of interest is taxable at your full marginal rate.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Sources of Interest Income</h2>

          <h3>Bank Accounts</h3>
          <ul>
            <li>Savings accounts</li>
            <li>High-interest savings accounts (HISAs)</li>
            <li>Money market accounts</li>
            <li>Chequing accounts (if interest paid)</li>
          </ul>

          <h3>Fixed Income Investments</h3>
          <ul>
            <li>GICs (Guaranteed Investment Certificates)</li>
            <li>Term deposits</li>
            <li>Government bonds (federal, provincial, municipal)</li>
            <li>Corporate bonds</li>
            <li>Treasury bills</li>
          </ul>

          <h3>Other Sources</h3>
          <ul>
            <li>Private loans you've made</li>
            <li>Mortgage investments</li>
            <li>Tax refund interest (yes, CRA pays interest)</li>
            <li>Trust distributions (interest portion)</li>
          </ul>

          <h2>How Interest Is Taxed</h2>

          <h3>Full Inclusion</h3>
          <ul>
            <li>100% of interest is taxable</li>
            <li>Added to your other income</li>
            <li>Taxed at your marginal rate</li>
            <li>No special credits or deductions</li>
          </ul>

          <h3>Example</h3>
          <p>If you earn $1,000 in interest and your marginal rate is 40%:</p>
          <ul>
            <li>Taxable: $1,000</li>
            <li>Tax: $400</li>
            <li>After-tax: $600</li>
          </ul>

          <h2>Comparison to Other Investment Income</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Income Type</th>
                <th>Tax Treatment</th>
                <th>Effective Rate*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Interest</td>
                <td>100% taxable</td>
                <td>40%</td>
              </tr>
              <tr>
                <td>Capital Gains</td>
                <td>50% taxable</td>
                <td>20%</td>
              </tr>
              <tr>
                <td>Eligible Dividends</td>
                <td>Gross-up + credit</td>
                <td>~25%</td>
              </tr>
              <tr>
                <td>Non-Eligible Dividends</td>
                <td>Gross-up + credit</td>
                <td>~33%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">*Approximate, assuming 40% marginal rate</p>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tax-Efficient Tip:</strong> Hold interest-bearing investments in your RRSP or TFSA. In non-registered accounts, prefer dividends and capital gains.
            </p>
          </div>

          <h2>Reporting Interest Income</h2>

          <h3>T5 Slip</h3>
          <p>You'll receive a T5 if you earn $50 or more:</p>
          <ul>
            <li><strong>Box 13:</strong> Interest from Canadian sources</li>
            <li>Report on Line 12100 of your return</li>
          </ul>

          <h3>No T5 Required</h3>
          <p>You must still report interest even without a T5:</p>
          <ul>
            <li>If under $50 from a source</li>
            <li>Interest from private loans</li>
            <li>Foreign interest (report on Line 12100)</li>
          </ul>

          <h3>Accrued Interest</h3>
          <p>For multi-year GICs and bonds:</p>
          <ul>
            <li>Must report interest at least annually</li>
            <li>Even if not received</li>
            <li>Financial institutions issue T5 for accrued amounts</li>
          </ul>

          <h2>GIC Tax Considerations</h2>

          <h3>Annual vs Compound GICs</h3>
          <ul>
            <li><strong>Annual pay:</strong> Interest taxed when received</li>
            <li><strong>Compound:</strong> Interest taxed when accrued (annually)</li>
            <li>Tax owed even if interest reinvested</li>
          </ul>

          <h3>Multi-Year GICs</h3>
          <ul>
            <li>Interest accrues and is taxable each year</li>
            <li>May receive T5 with accrued interest</li>
            <li>Track ACB if selling before maturity</li>
          </ul>

          <h2>Bond Tax Treatment</h2>

          <h3>Regular Interest</h3>
          <ul>
            <li>Coupon payments are 100% taxable</li>
            <li>Reported on T5 or T3 (if through fund)</li>
          </ul>

          <h3>Capital Gains/Losses</h3>
          <ul>
            <li>Selling bond for more/less than purchase price</li>
            <li>Capital gain/loss treatment (50% inclusion)</li>
            <li>Separate from interest component</li>
          </ul>

          <h3>Stripped Bonds/Zero-Coupon Bonds</h3>
          <ul>
            <li>No cash interest paid</li>
            <li>Still must report imputed interest annually</li>
            <li>Taxed on "phantom" income</li>
            <li>Best held in registered accounts</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> With stripped bonds and compound GICs, you owe tax on interest you haven't actually received. Make sure you have cash to pay the tax.
            </p>
          </div>

          <h2>Tax-Efficient Interest Strategies</h2>

          <h3>Use Registered Accounts</h3>
          <ul>
            <li><strong>RRSP:</strong> Interest grows tax-deferred</li>
            <li><strong>TFSA:</strong> Interest grows tax-free forever</li>
            <li><strong>RESP:</strong> Tax-free growth for education</li>
            <li>Prioritize interest-bearing investments here</li>
          </ul>

          <h3>Asset Location Strategy</h3>
          <p>Optimize across account types:</p>
          <ul>
            <li>Interest/bonds → RRSP/TFSA</li>
            <li>Canadian dividends → Non-registered</li>
            <li>US dividends → RRSP (no withholding)</li>
            <li>Growth stocks → TFSA or non-registered</li>
          </ul>

          <h3>Consider Tax-Efficient Alternatives</h3>
          <ul>
            <li>Dividend-paying stocks instead of bonds</li>
            <li>Return of capital investments</li>
            <li>Capital gains-focused investments</li>
          </ul>

          <h2>Foreign Interest Income</h2>

          <h3>Reporting Requirements</h3>
          <ul>
            <li>Report in Canadian dollars</li>
            <li>Use exchange rate when received</li>
            <li>Include on Line 12100</li>
          </ul>

          <h3>Foreign Tax Credit</h3>
          <ul>
            <li>May have foreign withholding tax</li>
            <li>Claim foreign tax credit</li>
            <li>Reduces Canadian tax</li>
          </ul>

          <h3>T1135 Reporting</h3>
          <ul>
            <li>If foreign property costs over $100,000</li>
            <li>Must file T1135 annually</li>
            <li>Includes foreign bank accounts, bonds</li>
          </ul>

          <h2>Interest Expense Deductions</h2>
          <p>Interest you pay may be deductible:</p>
          <ul>
            <li>Money borrowed to earn investment income</li>
            <li>Must have reasonable expectation of income</li>
            <li>Track and report on Line 22100</li>
            <li>Not deductible if borrowed for TFSA/RRSP</li>
          </ul>

          <h2>Real Return Bonds</h2>
          <p>Inflation-indexed bonds have special tax treatment:</p>
          <ul>
            <li>Interest portion taxed normally</li>
            <li>Inflation adjustment also taxable as interest</li>
            <li>Creates "phantom" taxable income</li>
            <li>Best in registered accounts</li>
          </ul>

          <h2>Prescribed Rate Loans</h2>
          <p>Interest paid on income-splitting loans:</p>
          <ul>
            <li>Must charge at least prescribed rate</li>
            <li>Interest received is taxable to lender</li>
            <li>Interest paid deductible to borrower</li>
            <li>Strategy for income splitting</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Interest Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about interest income taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Investment tax planning should consider your complete financial situation. Consider consulting a tax professional.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
