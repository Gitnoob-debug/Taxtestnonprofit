import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Globe, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Foreign Investment Reporting Canada 2024 | T1135 & Requirements',
  description: 'Complete guide to foreign investment reporting for Canadian taxpayers. Learn about T1135, foreign tax credits, FAPI rules, and how to properly report foreign property.',
  keywords: 'T1135 Canada, foreign property reporting, foreign investment tax Canada, foreign tax credit, specified foreign property',
}

export default function ForeignInvestmentReportingPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2.5 rounded-xl">
              <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Foreign Investment Reporting Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Reporting Requirements</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Canadian residents must report worldwide income. If you hold foreign property costing over $100,000, you must also file Form T1135. Penalties for non-compliance can be severe.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Form T1135: Foreign Income Verification</h2>

          <h3>Who Must File</h3>
          <ul>
            <li>Canadian resident individuals</li>
            <li>Corporations and trusts</li>
            <li>Partnerships (in some cases)</li>
            <li>Total cost of specified foreign property over $100,000 at any time in the year</li>
          </ul>

          <h3>Filing Deadline</h3>
          <ul>
            <li>Same as your tax return</li>
            <li>April 30 for individuals</li>
            <li>June 15 for self-employed (but interest from April 30)</li>
            <li>File even if no income earned</li>
          </ul>

          <h2>What Is Specified Foreign Property?</h2>

          <h3>Included Property</h3>
          <ul>
            <li>Foreign bank accounts</li>
            <li>Shares of foreign corporations (non-Canadian)</li>
            <li>Foreign bonds and debentures</li>
            <li>Interest in foreign trusts</li>
            <li>Foreign real estate (not personal use)</li>
            <li>Precious metals held outside Canada</li>
            <li>Cryptocurrency on foreign exchanges (potentially)</li>
          </ul>

          <h3>Excluded Property</h3>
          <ul>
            <li>Property used in active business</li>
            <li>Personal-use property (vacation home)</li>
            <li>Shares of Canadian mutual funds holding foreign investments</li>
            <li>Property in RRSP, TFSA, RRIF, RESP</li>
            <li>Canadian dollar accounts at foreign banks</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> US stocks held in a Canadian brokerage account ARE specified foreign property. The $100,000 threshold adds up quickly with US investments.
            </p>
          </div>

          <h2>T1135 Filing Methods</h2>

          <h3>Simplified Method ($100,000 to $250,000)</h3>
          <p>If total cost is between $100,000 and $250,000:</p>
          <ul>
            <li>Check boxes for property categories held</li>
            <li>No specific property details required</li>
            <li>Still report total income</li>
          </ul>

          <h3>Detailed Method (Over $250,000)</h3>
          <p>If total cost exceeds $250,000:</p>
          <ul>
            <li>List each property</li>
            <li>Report cost, income, and gain/loss</li>
            <li>Specify country of property</li>
            <li>More detailed reporting required</li>
          </ul>

          <h2>Calculating Cost for T1135</h2>
          <ul>
            <li>Use cost amount, not fair market value</li>
            <li>For shares, total purchase cost</li>
            <li>For foreign currency, cost in CAD when acquired</li>
            <li>Include all specified foreign property you own</li>
          </ul>

          <h2>Penalties for Non-Filing</h2>

          <h3>Late Filing Penalty</h3>
          <ul>
            <li>$25/day (minimum $100, maximum $2,500)</li>
            <li>Even if no tax owing</li>
          </ul>

          <h3>Failure to File</h3>
          <ul>
            <li>$500 to $24,000 per year</li>
            <li>Gross negligence: Up to 5% of highest cost</li>
            <li>Extended reassessment period (to 6 years)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> CRA receives information from many foreign countries through tax treaties. Non-compliance is increasingly detected. File your T1135 on time.
            </p>
          </div>

          <h2>Foreign Tax Credits</h2>

          <h3>How It Works</h3>
          <ul>
            <li>Foreign countries may tax your income</li>
            <li>Canada allows credit for foreign taxes paid</li>
            <li>Prevents double taxation</li>
            <li>Claim on your Canadian return</li>
          </ul>

          <h3>Calculating the Credit</h3>
          <p>The foreign tax credit is the lesser of:</p>
          <ul>
            <li>Foreign taxes actually paid</li>
            <li>Canadian tax on the foreign income</li>
          </ul>

          <h3>Reporting Foreign Tax Credit</h3>
          <ul>
            <li>Complete Form T2209</li>
            <li>Need proof of foreign taxes paid</li>
            <li>Different pools for business vs non-business income</li>
          </ul>

          <h2>US Investments and W-8BEN</h2>

          <h3>W-8BEN Form</h3>
          <ul>
            <li>File with your US broker</li>
            <li>Certifies you're not a US person</li>
            <li>Reduces US withholding to treaty rate (15%)</li>
            <li>Without it: 30% withholding</li>
          </ul>

          <h3>US Dividends in Different Accounts</h3>
          <ul>
            <li><strong>Non-registered:</strong> 15% withheld, claim FTC</li>
            <li><strong>TFSA:</strong> 15% withheld, no credit (lost)</li>
            <li><strong>RRSP:</strong> No withholding (treaty exemption)</li>
          </ul>

          <h2>Foreign Property Gains and Losses</h2>

          <h3>Currency Conversion</h3>
          <ul>
            <li>Convert to CAD at transaction dates</li>
            <li>Use Bank of Canada rates</li>
            <li>Currency gain/loss is separate from investment gain/loss</li>
          </ul>

          <h3>Reporting Capital Gains</h3>
          <ul>
            <li>Report on Schedule 3</li>
            <li>Same rules as Canadian investments</li>
            <li>50% inclusion rate</li>
            <li>Track ACB in Canadian dollars</li>
          </ul>

          <h2>Foreign Rental Property</h2>

          <h3>Reporting Income</h3>
          <ul>
            <li>Report on Statement of Real Estate Rentals</li>
            <li>Convert income and expenses to CAD</li>
            <li>Same deductions as Canadian rentals</li>
          </ul>

          <h3>T1135 Considerations</h3>
          <ul>
            <li>Include if not personal-use property</li>
            <li>Cost is purchase price in CAD</li>
            <li>May exclude if primarily personal use</li>
          </ul>

          <h2>Foreign Pensions</h2>
          <ul>
            <li>Generally taxable in Canada</li>
            <li>Report on Line 11500 or 11600</li>
            <li>May be covered by tax treaties</li>
            <li>Claim foreign tax credit for foreign taxes</li>
          </ul>

          <h2>Common Compliance Issues</h2>

          <h3>Not Filing T1135</h3>
          <ul>
            <li>Most common mistake</li>
            <li>Many don't realize threshold exceeded</li>
            <li>US stocks in TFSA don't count (exempt)</li>
            <li>But US stocks in cash account do</li>
          </ul>

          <h3>Wrong Cost Calculation</h3>
          <ul>
            <li>Using FMV instead of cost</li>
            <li>Not converting to CAD at purchase date</li>
            <li>Forgetting to include all properties</li>
          </ul>

          <h3>Voluntary Disclosure</h3>
          <p>If you've missed filing T1135:</p>
          <ul>
            <li>Consider Voluntary Disclosure Program</li>
            <li>May reduce or eliminate penalties</li>
            <li>Must disclose before CRA contacts you</li>
            <li>Professional help recommended</li>
          </ul>

          <h2>Tax Treaties</h2>
          <p>Canada has tax treaties with many countries:</p>
          <ul>
            <li>Reduce withholding tax rates</li>
            <li>Prevent double taxation</li>
            <li>May exempt certain income</li>
            <li>Check treaty for each country</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Foreign Investments?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about foreign investment reporting.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Foreign investment reporting can be complex. Consider consulting a tax professional, especially for significant foreign holdings.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
