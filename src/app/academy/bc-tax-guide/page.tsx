import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BC Tax Guide 2024 | British Columbia Tax Rates & Credits',
  description: 'Complete British Columbia tax guide. Learn about BC tax brackets, BC Climate Action Tax Credit, BC Family Benefit, and provincial tax planning strategies.',
  keywords: 'BC tax rates, British Columbia tax brackets 2024, BC Climate Action Tax Credit, BC tax credits, BC Family Benefit',
}

export default function BCTaxGuidePage() {
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
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            British Columbia Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">BC Tax at a Glance</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            BC has one of the lowest provincial tax rates in Canada at lower income levels (5.06%), but increases significantly for high earners (up to 20.5%). BC also has unique benefits like the BC Climate Action Tax Credit and BC Family Benefit.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>BC Tax Brackets 2024</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $47,937</td>
                <td>5.06%</td>
              </tr>
              <tr>
                <td>$47,937 to $95,875</td>
                <td>7.70%</td>
              </tr>
              <tr>
                <td>$95,875 to $110,076</td>
                <td>10.50%</td>
              </tr>
              <tr>
                <td>$110,076 to $133,664</td>
                <td>12.29%</td>
              </tr>
              <tr>
                <td>$133,664 to $181,232</td>
                <td>14.70%</td>
              </tr>
              <tr>
                <td>$181,232 to $252,752</td>
                <td>16.80%</td>
              </tr>
              <tr>
                <td>Over $252,752</td>
                <td>20.50%</td>
              </tr>
            </tbody>
          </table>

          <h2>Key BC Tax Credits</h2>

          <h3>BC Climate Action Tax Credit</h3>
          <p>Quarterly payment to offset carbon tax costs:</p>
          <ul>
            <li><strong>Adults:</strong> Up to $504/year</li>
            <li><strong>Children:</strong> Up to $126/year</li>
            <li>Income-tested (phases out at higher incomes)</li>
            <li>Paid quarterly with GST/HST credit</li>
          </ul>

          <h4>Eligibility</h4>
          <ul>
            <li>BC resident on December 31</li>
            <li>File tax return (even with no income)</li>
            <li>Age 19+ (or parent, married, or previously married)</li>
          </ul>

          <h3>BC Family Benefit</h3>
          <p>Monthly payments for families with children:</p>
          <ul>
            <li>Up to $1,750 per child under 18</li>
            <li>Based on family net income</li>
            <li>Paid monthly with CCB</li>
            <li>Fully refundable</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Both the BC Climate Action Tax Credit and BC Family Benefit are paid automatically when you file your taxes—no separate application needed.
            </p>
          </div>

          <h3>BC Training Tax Credit</h3>
          <ul>
            <li>For apprentices in Red Seal trades</li>
            <li>$1,000 per level completed</li>
            <li>Up to $2,500 for completion</li>
            <li>Employers can also claim a credit</li>
          </ul>

          <h3>BC Mining Flow-Through Share Tax Credit</h3>
          <ul>
            <li>20% of BC mining exploration expenses</li>
            <li>For flow-through share investors</li>
            <li>Applies to BC mineral exploration</li>
          </ul>

          <h2>BC Sales Taxes</h2>

          <h3>Provincial Sales Tax (PST)</h3>
          <ul>
            <li><strong>General rate:</strong> 7%</li>
            <li><strong>Liquor:</strong> 10%</li>
            <li><strong>Accommodation:</strong> 8%</li>
            <li>Separate from 5% federal GST</li>
          </ul>

          <h3>What's Exempt from PST</h3>
          <ul>
            <li>Basic groceries</li>
            <li>Children's clothing (under 15)</li>
            <li>Prescription medications</li>
            <li>Bicycles</li>
          </ul>

          <h2>Property Transfer Tax</h2>
          <p>Paid when buying property in BC:</p>
          <ul>
            <li>1% on first $200,000</li>
            <li>2% on $200,001 to $2,000,000</li>
            <li>3% on amounts over $2,000,000</li>
            <li>Additional 2% for homes over $3,000,000</li>
          </ul>

          <h3>First Time Home Buyers' Exemption</h3>
          <ul>
            <li>Full exemption for homes up to $500,000</li>
            <li>Partial exemption up to $525,000</li>
            <li>Must be first-time buyer</li>
            <li>Canadian citizen or permanent resident</li>
          </ul>

          <h3>Newly Built Home Exemption</h3>
          <ul>
            <li>Full exemption up to $750,000</li>
            <li>Partial exemption up to $800,000</li>
            <li>New construction or substantially renovated</li>
          </ul>

          <h2>Speculation and Vacancy Tax</h2>
          <p>Annual tax on vacant homes in certain areas:</p>
          <ul>
            <li><strong>Foreign owners/satellite families:</strong> 2%</li>
            <li><strong>Canadian citizens/PR not paying BC income tax:</strong> 1%</li>
            <li><strong>BC residents:</strong> 0.5%</li>
            <li>Applies in Metro Vancouver, Victoria, other urban areas</li>
          </ul>

          <h3>Exemptions</h3>
          <ul>
            <li>Principal residence</li>
            <li>Rented at least 6 months/year</li>
            <li>Recent purchase (first year)</li>
            <li>Various life circumstances</li>
          </ul>

          <h2>BC Carbon Tax</h2>
          <p>Tax on fossil fuels:</p>
          <ul>
            <li>Currently $65 per tonne of CO2</li>
            <li>Included in fuel prices</li>
            <li>BC Climate Action Tax Credit helps offset</li>
          </ul>

          <h2>Medical Services Plan (MSP)</h2>
          <ul>
            <li>BC eliminated MSP premiums in 2020</li>
            <li>Replaced by Employer Health Tax</li>
            <li>No individual premium payments</li>
          </ul>

          <h3>Employer Health Tax</h3>
          <ul>
            <li>Employers with payroll over $500,000</li>
            <li>1.95% rate for payrolls over $1.5 million</li>
            <li>No employee contribution</li>
          </ul>

          <h2>BC Tax Planning Strategies</h2>

          <h3>Income Splitting</h3>
          <ul>
            <li>Pension income splitting at 65+</li>
            <li>Spousal RRSP contributions</li>
            <li>Family trust strategies (with professional advice)</li>
          </ul>

          <h3>Capital Gains Planning</h3>
          <ul>
            <li>Time gains for lower income years</li>
            <li>Use capital losses to offset gains</li>
            <li>Principal residence exemption planning</li>
          </ul>

          <h3>Maximize Tax Credits</h3>
          <ul>
            <li>File taxes even with low/no income for benefits</li>
            <li>Claim all eligible credits</li>
            <li>Ensure proper benefit applications</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>High Income Earners:</strong> BC's top marginal rate of 53.5% (combined federal/provincial) kicks in at $252,752. Consider RRSP maximization, pension income splitting, and incorporation strategies.
            </p>
          </div>

          <h2>BC vs Other Provinces</h2>
          <ul>
            <li><strong>Low income:</strong> BC competitive with 5.06% lowest bracket</li>
            <li><strong>Middle income:</strong> BC moderate compared to Ontario</li>
            <li><strong>High income:</strong> BC highest outside Quebec/NS</li>
            <li><strong>Benefits:</strong> Strong family and climate credits</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About BC Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about British Columbia taxes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Tax rates and credits are subject to change. Verify current rates with the BC Ministry of Finance.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
