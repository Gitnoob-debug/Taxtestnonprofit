import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, Calculator, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'TFSA Guide 2024 | Tax-Free Savings Account Explained',
  description: 'Complete guide to TFSAs in Canada for 2024. Learn about the $7,000 contribution limit, how to calculate your room, investment options, and strategies for tax-free growth.',
  keywords: 'TFSA guide, TFSA contribution limit 2024, TFSA room, how TFSA works, TFSA vs RRSP, TFSA withdrawal',
}

export default function TFSAGuidePage() {
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
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Tax-Free Savings
            </span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            TFSA Guide: Tax-Free Savings Account Explained (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              10 min read
            </span>
            <span>Updated December 2024</span>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-3">In This Guide</h2>
          <ol className="space-y-2 text-sm">
            <li><a href="#what-is-tfsa" className="text-teal-600 dark:text-teal-400 hover:underline">1. What is a TFSA?</a></li>
            <li><a href="#contribution-limits" className="text-teal-600 dark:text-teal-400 hover:underline">2. 2024 Contribution Limits</a></li>
            <li><a href="#calculating-room" className="text-teal-600 dark:text-teal-400 hover:underline">3. Calculating Your Contribution Room</a></li>
            <li><a href="#withdrawals" className="text-teal-600 dark:text-teal-400 hover:underline">4. Withdrawals & Room Restoration</a></li>
            <li><a href="#investments" className="text-teal-600 dark:text-teal-400 hover:underline">5. What Can You Hold in a TFSA?</a></li>
            <li><a href="#strategies" className="text-teal-600 dark:text-teal-400 hover:underline">6. Smart TFSA Strategies</a></li>
          </ol>
        </nav>

        {/* Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section id="what-is-tfsa">
            <h2>What is a TFSA?</h2>
            <p>
              A <strong>Tax-Free Savings Account (TFSA)</strong> is a registered account where all investment growth and withdrawals are completely tax-free. Unlike RRSPs, contributions are not tax-deductible, but you never pay tax on the money again—not when it grows, not when you withdraw it.
            </p>
            <p>
              TFSAs were introduced in 2009 and have become one of the most flexible and powerful savings tools available to Canadians.
            </p>

            <h3>Key TFSA Benefits</h3>
            <ul>
              <li><strong>Tax-free growth:</strong> Interest, dividends, and capital gains are never taxed</li>
              <li><strong>Tax-free withdrawals:</strong> Take money out anytime without tax consequences</li>
              <li><strong>Room restoration:</strong> Withdrawals are added back to your contribution room the following year</li>
              <li><strong>No impact on benefits:</strong> Withdrawals don't affect OAS, GIS, or other income-tested benefits</li>
            </ul>
          </section>

          <section id="contribution-limits">
            <h2>2024 TFSA Contribution Limits</h2>

            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 my-6 not-prose">
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">$7,000</p>
              <p className="text-green-700 dark:text-green-300 text-sm">2024 annual TFSA contribution limit</p>
            </div>

            <h3>Annual Limits by Year</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Year</th>
                  <th className="text-right">Limit</th>
                  <th className="text-left pl-8">Year</th>
                  <th className="text-right">Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2009-2012</td>
                  <td className="text-right">$5,000</td>
                  <td className="pl-8">2019-2020</td>
                  <td className="text-right">$6,000</td>
                </tr>
                <tr>
                  <td>2013-2014</td>
                  <td className="text-right">$5,500</td>
                  <td className="pl-8">2021-2022</td>
                  <td className="text-right">$6,000</td>
                </tr>
                <tr>
                  <td>2015</td>
                  <td className="text-right">$10,000</td>
                  <td className="pl-8">2023</td>
                  <td className="text-right">$6,500</td>
                </tr>
                <tr>
                  <td>2016-2018</td>
                  <td className="text-right">$5,500</td>
                  <td className="pl-8">2024</td>
                  <td className="text-right">$7,000</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-1">$95,000</p>
              <p className="text-teal-700 dark:text-teal-300 text-sm">Maximum cumulative room if you were 18+ and a Canadian resident since 2009</p>
            </div>
          </section>

          <section id="calculating-room">
            <h2>Calculating Your TFSA Contribution Room</h2>
            <p>
              Your TFSA contribution room depends on when you turned 18 and became a Canadian resident. Room accumulates starting from:
            </p>
            <ul>
              <li>2009 (when TFSAs started), OR</li>
              <li>The year you turned 18, OR</li>
              <li>The year you became a Canadian resident</li>
              <li>(whichever is latest)</li>
            </ul>

            <h3>Example Calculations</h3>
            <p><strong>Born in 1990 (turned 18 in 2008):</strong></p>
            <p>You've accumulated room since 2009, so your total room is $95,000 (assuming you've never contributed).</p>

            <p><strong>Born in 2000 (turned 18 in 2018):</strong></p>
            <p>Your room started in 2018:</p>
            <ul>
              <li>2018: $5,500</li>
              <li>2019-2022: $6,000 × 4 = $24,000</li>
              <li>2023: $6,500</li>
              <li>2024: $7,000</li>
              <li><strong>Total: $43,000</strong></li>
            </ul>

            <p>
              <strong>Finding your exact room:</strong> Check your CRA My Account online or your Notice of Assessment for your official TFSA contribution room.
            </p>
          </section>

          <section id="withdrawals">
            <h2>Withdrawals & Room Restoration</h2>
            <p>
              One of the TFSA's best features is that <strong>withdrawals are added back to your contribution room</strong> on January 1 of the following year.
            </p>

            <h3>Example</h3>
            <p>Let's say on January 1, 2024, you have:</p>
            <ul>
              <li>$50,000 in your TFSA</li>
              <li>$7,000 in available contribution room</li>
            </ul>
            <p>In March 2024, you withdraw $20,000 for an emergency. In September, you want to put it back.</p>
            <p><strong>Can you recontribute in 2024?</strong> Only the original $7,000 of room. The $20,000 won't be available again until January 1, 2025.</p>

            <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Common Mistake:</strong> Many people over-contribute by putting back money they withdrew in the same year. This triggers a 1% per month penalty on the over-contribution. Wait until January to recontribute withdrawn amounts.
              </p>
            </div>
          </section>

          <section id="investments">
            <h2>What Can You Hold in a TFSA?</h2>
            <p>
              TFSAs can hold the same types of investments as RRSPs:
            </p>
            <ul>
              <li>Cash and savings deposits</li>
              <li>GICs (Guaranteed Investment Certificates)</li>
              <li>Stocks listed on designated exchanges</li>
              <li>ETFs (Exchange-Traded Funds)</li>
              <li>Mutual funds</li>
              <li>Bonds</li>
              <li>Certain options</li>
            </ul>

            <h3>What to Avoid</h3>
            <ul>
              <li><strong>Day trading:</strong> CRA may consider frequent trading as business income, which is taxable</li>
              <li><strong>Non-qualified investments:</strong> Shares in private corporations, land, etc. can trigger penalties</li>
              <li><strong>Prohibited investments:</strong> Investments in companies where you have significant influence</li>
            </ul>
          </section>

          <section id="strategies">
            <h2>Smart TFSA Strategies</h2>

            <h3>1. Prioritize High-Growth Investments</h3>
            <p>
              Since all growth is tax-free, your TFSA is the ideal place for investments with the highest growth potential. Consider holding stocks or equity ETFs in your TFSA rather than interest-bearing investments.
            </p>

            <h3>2. Emergency Fund (Then Invest)</h3>
            <p>
              A TFSA is a great place for your emergency fund because you can access it anytime. But once your emergency fund is established, consider investing the rest for long-term growth.
            </p>

            <h3>3. Income Splitting in Retirement</h3>
            <p>
              TFSA withdrawals don't count as income, so they won't affect income-tested benefits like OAS or GIS. For retirees, withdrawing from a TFSA instead of an RRSP can help minimize clawbacks.
            </p>

            <h3>4. Use It or Lose It? No!</h3>
            <p>
              Unlike RRSP contribution room which has a deadline, TFSA room carries forward indefinitely. There's no rush to contribute—but the sooner you do, the more tax-free growth you can earn.
            </p>

            <h3>5. Give Your Spouse Money to Contribute</h3>
            <p>
              Unlike RRSPs, there's no "spousal TFSA." But you can give your spouse money to contribute to their own TFSA without any attribution rules applying. This effectively lets you double your family's tax-free room.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-xl p-6 my-8 not-prose">
            <div className="flex items-start gap-4">
              <Calculator className="h-8 w-8 text-green-600 dark:text-green-400 shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Calculate Your TFSA Room</h3>
                <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                  Use our calculator to find out exactly how much TFSA contribution room you have based on your age.
                </p>
                <Link
                  href="/tools/tfsa-room-calculator"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  TFSA Room Calculator
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <section>
            <h2>Key Takeaways</h2>
            <ul>
              <li>TFSA contributions are not tax-deductible, but all growth and withdrawals are tax-free</li>
              <li>2024 limit is $7,000; maximum cumulative room is $95,000 (since 2009)</li>
              <li>Withdrawals restore contribution room on January 1 of the following year</li>
              <li>TFSAs are ideal for high-growth investments and emergency funds</li>
              <li>Withdrawals don't affect government benefits like OAS and GIS</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes only and does not constitute financial or tax advice. Tax rules can be complex and individual situations vary. Consult a qualified professional for advice specific to your situation.
            </p>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-8">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/academy/rrsp-complete-guide" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">RRSP Complete Guide</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Everything about Registered Retirement Savings Plans</p>
            </Link>
            <Link href="/tools/rrsp-vs-tfsa" className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">RRSP vs TFSA Calculator</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Compare which account is better for you</p>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
