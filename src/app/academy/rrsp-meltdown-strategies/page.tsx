import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, LineChart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RRSP Meltdown Strategy Canada 2024 | Tax-Efficient Withdrawal Planning',
  description: 'Complete guide to RRSP meltdown strategies in Canada. Learn optimal withdrawal timing, tax bracket management, OAS clawback avoidance, and retirement income optimization.',
  keywords: 'RRSP meltdown strategy, RRSP withdrawal tax, retirement income planning Canada, OAS clawback avoidance',
}

export default function RRSPMeltdownStrategiesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-xl">
              <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            RRSP Meltdown: Strategic Withdrawal Planning
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Why "Meltdown" Your RRSP?</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Without planning, large RRSPs can create tax problems in retirement: OAS clawbacks, higher tax brackets, and a big tax bill at death. Strategic early withdrawals can minimize lifetime taxes.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>The Problem with Large RRSPs</h2>

          <h3>Mandatory RRIF Withdrawals</h3>
          <p>At age 71, you must convert your RRSP to a RRIF with minimum withdrawals:</p>
          <ul>
            <li>Age 72: 5.40% of balance</li>
            <li>Age 75: 5.82% of balance</li>
            <li>Age 80: 6.82% of balance</li>
            <li>Age 85: 8.51% of balance</li>
            <li>Age 90: 10.99% of balance</li>
          </ul>

          <h3>Tax Issues This Creates</h3>
          <ul>
            <li><strong>OAS clawback:</strong> Income over ~$87,000 triggers 15% clawback</li>
            <li><strong>Higher brackets:</strong> Large RRIF income pushes you into higher rates</li>
            <li><strong>Death tax:</strong> Full RRSP/RRIF value taxed in year of death</li>
            <li><strong>Loss of credits:</strong> Age amount and other credits phase out</li>
          </ul>

          <h2>The Meltdown Strategy</h2>
          <p>The concept is simple: Withdraw from your RRSP earlier, in years when your income is lower, to avoid higher taxes later.</p>

          <h3>Ideal Windows for Meltdown</h3>
          <ul>
            <li><strong>Early retirement:</strong> After leaving work, before CPP/OAS</li>
            <li><strong>Low-income years:</strong> Career gap, sabbatical</li>
            <li><strong>Age 65-71:</strong> Before mandatory RRIF minimums</li>
          </ul>

          <h2>Strategy 1: Fill Lower Tax Brackets</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Identify your current marginal tax bracket</li>
            <li>Withdraw RRSP funds to top up to higher bracket threshold</li>
            <li>Pay tax now at lower rate vs. later at higher rate</li>
          </ul>

          <h3>Example</h3>
          <p>Sarah retires at 60 with $10,000 income:</p>
          <ul>
            <li>First federal bracket tops at ~$55,000</li>
            <li>Withdraw ~$45,000 from RRSP</li>
            <li>Tax rate: ~20% combined</li>
            <li>Better than 30-40% she'd pay at 72 with full CPP, OAS, and RRIF</li>
          </ul>

          <h2>Strategy 2: OAS Clawback Avoidance</h2>

          <h3>The Clawback</h3>
          <ul>
            <li>Starts at ~$86,912 income (2024)</li>
            <li>15% of income above threshold is clawed back</li>
            <li>Full OAS eliminated at ~$142,000</li>
          </ul>

          <h3>The Strategy</h3>
          <ul>
            <li>Before age 65, draw down RRSP to reduce balance</li>
            <li>At 65+, keep income below clawback threshold</li>
            <li>Preserve full OAS benefits</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Insight:</strong> The OAS clawback effectively adds 15% to your marginal tax rate. If you're in the 30% bracket with clawback, your effective rate is 45%.
            </p>
          </div>

          <h2>Strategy 3: Convert RRSP to TFSA</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Withdraw from RRSP</li>
            <li>Pay tax on withdrawal</li>
            <li>Contribute to TFSA (using available room)</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>TFSA withdrawals don't affect OAS or GIS</li>
            <li>TFSA growth is tax-free</li>
            <li>No mandatory withdrawals from TFSA</li>
            <li>Tax-free to beneficiaries at death</li>
          </ul>

          <h2>Strategy 4: Income Splitting</h2>

          <h3>Spousal RRSP Conversion</h3>
          <ul>
            <li>If one spouse has much larger RRSP</li>
            <li>Consider spousal RRSP contributions now</li>
            <li>Equalizes retirement income later</li>
            <li>Attribution rules: 3-year wait for withdrawals</li>
          </ul>

          <h3>Pension Splitting</h3>
          <ul>
            <li>At 65+, RRIF income can be split with spouse</li>
            <li>Up to 50% can be allocated to lower-income spouse</li>
            <li>May keep both spouses below OAS clawback</li>
          </ul>

          <h2>When NOT to Melt Down</h2>
          <ul>
            <li><strong>High current income:</strong> Already in top bracket</li>
            <li><strong>Need the deferral:</strong> Money is still working tax-free</li>
            <li><strong>Low future income:</strong> Will stay in low bracket regardless</li>
            <li><strong>Estate planning:</strong> Want to leave to charity (donation credit offsets)</li>
          </ul>

          <h2>Calculating the Optimal Strategy</h2>

          <h3>Factors to Consider</h3>
          <ul>
            <li>Current and projected tax brackets</li>
            <li>Expected CPP and OAS amounts</li>
            <li>Other retirement income sources</li>
            <li>Life expectancy</li>
            <li>TFSA room available</li>
            <li>Spousal income situation</li>
          </ul>

          <h3>Tools</h3>
          <ul>
            <li>Financial planning software</li>
            <li>Fee-only financial planners</li>
            <li>Tax accountants with retirement expertise</li>
          </ul>

          <h2>Delaying CPP and OAS</h2>
          <p>Meltdown works well combined with delaying government benefits:</p>

          <h3>CPP Delay</h3>
          <ul>
            <li>8.4% increase per year delayed (after 65)</li>
            <li>42% more at 70 vs. 65</li>
            <li>Draw RRSP to bridge the gap</li>
          </ul>

          <h3>OAS Delay</h3>
          <ul>
            <li>7.2% increase per year delayed (after 65)</li>
            <li>36% more at 70 vs. 65</li>
            <li>Higher guaranteed income later</li>
          </ul>

          <h2>Tax Withholding on Withdrawals</h2>
          <p>RRSP withdrawals have withholding tax:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Withholding Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $5,000</td>
                <td>10% (5% Quebec)</td>
              </tr>
              <tr>
                <td>$5,001 - $15,000</td>
                <td>20% (10% Quebec)</td>
              </tr>
              <tr>
                <td>Over $15,000</td>
                <td>30% (15% Quebec)</td>
              </tr>
            </tbody>
          </table>
          <p>Note: Withholding is not final tax—reconciled on tax return.</p>

          <h2>Example Timeline</h2>
          <p>John retires at 60 with $800,000 RRSP:</p>

          <h3>Ages 60-64</h3>
          <ul>
            <li>No CPP/OAS yet</li>
            <li>Withdraw $50,000/year from RRSP</li>
            <li>Pay ~$10,000 tax (20%)</li>
            <li>Contribute $7,000 to TFSA</li>
          </ul>

          <h3>Ages 65-70</h3>
          <ul>
            <li>Start CPP at 70 (delayed)</li>
            <li>Continue RRSP withdrawals to stay under OAS clawback</li>
            <li>Split pension income with spouse</li>
          </ul>

          <h3>Age 71+</h3>
          <ul>
            <li>RRSP reduced to manageable size</li>
            <li>RRIF minimums don't trigger clawback</li>
            <li>Full OAS preserved</li>
            <li>TFSA provides tax-free backup income</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Ignoring provincial taxes:</strong> Vary significantly by province</li>
            <li><strong>Forgetting GIS:</strong> Low-income seniors lose GIS with RRIF income</li>
            <li><strong>Not coordinating with spouse:</strong> Family planning is crucial</li>
            <li><strong>Waiting too long:</strong> Less time to draw down before 71</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About RRSP Strategies?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about RRSP withdrawal planning.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> RRSP meltdown strategies are complex and depend on individual circumstances. This guide provides general concepts. Consult a financial planner or tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
