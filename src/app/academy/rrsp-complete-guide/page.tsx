import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, PiggyBank, Calculator, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Complete RRSP Guide 2024 | How RRSPs Work in Canada',
  description: 'The complete guide to RRSPs in Canada for 2024. Learn about contribution limits ($31,560), tax deductions, withdrawal rules, and strategies to maximize your retirement savings.',
  keywords: 'RRSP guide, RRSP contribution limit 2024, how RRSP works, RRSP tax deduction, RRSP withdrawal rules, RRSP vs TFSA',
}

export default function RRSPGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Link */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-lg">
              <PiggyBank className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">
              Retirement Planning
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            The Complete Guide to RRSPs in Canada (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              12 min read
            </span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">In This Guide</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#what-is-rrsp" className="text-teal-600 dark:text-teal-400 hover:underline">1. What is an RRSP?</a></li>
            <li><a href="#contribution-limits" className="text-teal-600 dark:text-teal-400 hover:underline">2. 2024 Contribution Limits</a></li>
            <li><a href="#tax-benefits" className="text-teal-600 dark:text-teal-400 hover:underline">3. Tax Benefits Explained</a></li>
            <li><a href="#contribution-room" className="text-teal-600 dark:text-teal-400 hover:underline">4. How Contribution Room Works</a></li>
            <li><a href="#withdrawals" className="text-teal-600 dark:text-teal-400 hover:underline">5. Withdrawal Rules</a></li>
            <li><a href="#hbp-llp" className="text-teal-600 dark:text-teal-400 hover:underline">6. Home Buyers' Plan & Lifelong Learning Plan</a></li>
            <li><a href="#strategies" className="text-teal-600 dark:text-teal-400 hover:underline">7. RRSP Strategies</a></li>
          </ol>
        </nav>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section id="what-is-rrsp">
            <h2>What is an RRSP?</h2>
            <p>
              A <strong>Registered Retirement Savings Plan (RRSP)</strong> is a tax-advantaged savings account designed to help Canadians save for retirement. It's one of the most powerful tools available for reducing your taxes today while building wealth for the future.
            </p>
            <p>
              RRSPs offer two key benefits:
            </p>
            <ul>
              <li><strong>Tax-deductible contributions:</strong> Money you put into an RRSP reduces your taxable income for the year</li>
              <li><strong>Tax-deferred growth:</strong> Investments inside your RRSP grow without being taxed until you withdraw them</li>
            </ul>
          </section>

          <section id="contribution-limits">
            <h2>2024 RRSP Contribution Limits</h2>
            <p>For the 2024 tax year, the RRSP contribution limit is:</p>

            <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-1">$31,560</p>
              <p className="text-teal-700 dark:text-teal-300 text-sm">or 18% of your previous year's earned income (whichever is less)</p>
            </div>

            <p>
              <strong>Earned income</strong> includes employment income, self-employment income, and rental income. It does not include investment income, pension income, or RRSP withdrawals.
            </p>

            <h3>Example Calculation</h3>
            <p>If your 2023 earned income was $100,000:</p>
            <ul>
              <li>18% of $100,000 = $18,000</li>
              <li>This is less than the $31,560 maximum</li>
              <li>Your 2024 contribution room = $18,000 (plus any unused room from previous years)</li>
            </ul>
          </section>

          <section id="tax-benefits">
            <h2>How RRSP Tax Benefits Work</h2>
            <p>
              When you contribute to an RRSP, you can deduct that amount from your taxable income. This effectively gives you a "refund" equal to your contribution multiplied by your marginal tax rate.
            </p>

            <h3>Real Example</h3>
            <p>Let's say you earn $80,000 in Ontario and contribute $10,000 to your RRSP:</p>
            <ul>
              <li>Your marginal tax rate: approximately 29.65%</li>
              <li>Tax savings: $10,000 × 29.65% = <strong>$2,965</strong></li>
              <li>Your effective cost: $10,000 - $2,965 = $7,035</li>
            </ul>

            <p>
              This means a $10,000 RRSP contribution only "costs" you $7,035 after the tax refund—and you now have $10,000 growing tax-free inside your RRSP.
            </p>

            <h3>When RRSPs Work Best</h3>
            <p>RRSPs are most beneficial when:</p>
            <ul>
              <li>You're in a <strong>high tax bracket now</strong> and expect to be in a lower bracket in retirement</li>
              <li>You want to <strong>reduce this year's taxes</strong></li>
              <li>You're saving for a <strong>first home</strong> (Home Buyers' Plan) or <strong>education</strong> (Lifelong Learning Plan)</li>
            </ul>
          </section>

          <section id="contribution-room">
            <h2>Understanding RRSP Contribution Room</h2>
            <p>
              Your RRSP contribution room is the maximum you can contribute without penalty. It's calculated as:
            </p>
            <ul>
              <li>18% of your previous year's earned income (up to the annual limit)</li>
              <li>Plus any unused room from previous years (carries forward indefinitely)</li>
              <li>Minus any pension adjustments (if you have a workplace pension)</li>
            </ul>

            <h3>Finding Your Contribution Room</h3>
            <p>
              The easiest way to find your exact contribution room is to check your <strong>CRA My Account</strong> online or look at your Notice of Assessment from last year's tax return.
            </p>

            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Warning:</strong> Over-contributing to your RRSP by more than $2,000 results in a 1% per month penalty on the excess. Always verify your room before making large contributions.
              </p>
            </div>
          </section>

          <section id="withdrawals">
            <h2>RRSP Withdrawal Rules</h2>
            <p>
              When you withdraw money from your RRSP, it's added to your taxable income for the year. Additionally, the financial institution will withhold tax at source:
            </p>

            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Withdrawal Amount</th>
                  <th className="text-left">Withholding Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Up to $5,000</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>$5,001 to $15,000</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>Over $15,000</td>
                  <td>30%</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-slate-500">(Quebec rates differ)</p>

            <p>
              The withheld amount is just a prepayment—you'll owe more or get a refund based on your actual tax rate when you file your return.
            </p>

            <h3>RRIF Conversion</h3>
            <p>
              By December 31 of the year you turn 71, you must convert your RRSP to a Registered Retirement Income Fund (RRIF) or purchase an annuity. You cannot contribute to an RRSP after this date.
            </p>
          </section>

          <section id="hbp-llp">
            <h2>Home Buyers' Plan (HBP) & Lifelong Learning Plan (LLP)</h2>

            <h3>Home Buyers' Plan (HBP)</h3>
            <p>
              The HBP lets first-time home buyers withdraw up to <strong>$35,000</strong> from their RRSP tax-free to buy or build a qualifying home.
            </p>
            <ul>
              <li>Must be repaid over 15 years (starting the second year after withdrawal)</li>
              <li>Minimum annual repayment = 1/15 of withdrawn amount</li>
              <li>Missed repayments are added to your taxable income</li>
            </ul>

            <h3>Lifelong Learning Plan (LLP)</h3>
            <p>
              The LLP lets you withdraw up to <strong>$10,000 per year</strong> (max $20,000 total) to fund full-time education.
            </p>
            <ul>
              <li>Must be repaid over 10 years</li>
              <li>You or your spouse/partner must be enrolled in a qualifying program</li>
            </ul>
          </section>

          <section id="strategies">
            <h2>Smart RRSP Strategies</h2>

            <h3>1. Contribute Early in the Year</h3>
            <p>
              Contributing at the start of the year rather than the deadline gives your investments an extra year of tax-free growth.
            </p>

            <h3>2. Spousal RRSP</h3>
            <p>
              If one spouse earns significantly more than the other, contributing to a spousal RRSP can help split income in retirement and reduce the couple's overall tax bill.
            </p>

            <h3>3. Don't Always Claim the Deduction Immediately</h3>
            <p>
              You can contribute to your RRSP now but carry forward the deduction to a future year when you're in a higher tax bracket. This maximizes the value of your deduction.
            </p>

            <h3>4. Invest Your Tax Refund</h3>
            <p>
              Instead of spending your RRSP tax refund, consider reinvesting it into your TFSA or next year's RRSP to accelerate your wealth building.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <div className="flex items-start gap-4">
              <Calculator className="h-8 w-8 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Calculate Your RRSP Tax Savings</h3>
                <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">
                  Use our free calculator to see exactly how much you'll save with your next RRSP contribution.
                </p>
                <Link
                  href="/tools/rrsp-calculator"
                  className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  RRSP Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>RRSPs let you deduct contributions from your taxable income</li>
              <li>2024 contribution limit is $31,560 or 18% of earned income</li>
              <li>Unused room carries forward indefinitely</li>
              <li>Withdrawals are taxed as income—ideally in retirement when you're in a lower bracket</li>
              <li>HBP and LLP allow tax-free withdrawals for specific purposes</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes only and does not constitute financial or tax advice. Tax rules can be complex and individual situations vary. Consult a qualified tax professional or financial advisor for advice specific to your situation.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/academy/tfsa-guide" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">TFSA Guide</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Understand the Tax-Free Savings Account</p>
            </Link>
            <Link href="/tools/rrsp-vs-tfsa" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">RRSP vs TFSA Calculator</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Which account is right for you?</p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
