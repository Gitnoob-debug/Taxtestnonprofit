import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Globe, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Foreign Income Reporting Canada 2024 | T1135 & Foreign Tax Credits',
  description: 'How to report foreign income in Canada. Learn about T1135 requirements, foreign tax credits, worldwide income rules, and reporting foreign investments to CRA.',
  keywords: 'foreign income Canada, T1135 form, foreign tax credit, foreign property reporting, worldwide income CRA',
}

export default function ForeignIncomeGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-xl">
              <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">International Tax</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Foreign Income Reporting: T1135 & Foreign Tax Credits
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Canadian Residents: Worldwide Income</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            As a Canadian tax resident, you must report your worldwide income from all sources, regardless of where it was earned. This includes employment income, investment income, rental income, and business income from outside Canada.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of Foreign Income to Report</h2>
          <ul>
            <li><strong>Employment income:</strong> Wages from foreign employers</li>
            <li><strong>Investment income:</strong> Interest, dividends from foreign investments</li>
            <li><strong>Rental income:</strong> Income from foreign rental properties</li>
            <li><strong>Pension income:</strong> Foreign pensions (US Social Security, etc.)</li>
            <li><strong>Capital gains:</strong> Profits from selling foreign assets</li>
            <li><strong>Business income:</strong> Self-employment income from foreign sources</li>
          </ul>

          <h2>Form T1135: Foreign Income Verification Statement</h2>
          <p>You must file T1135 if you own specified foreign property with a total cost of more than $100,000 CAD at any time during the year.</p>

          <h3>What Counts as "Specified Foreign Property"?</h3>
          <ul>
            <li>Foreign bank accounts</li>
            <li>Shares in foreign corporations (not in RRSP/TFSA)</li>
            <li>Foreign bonds and debentures</li>
            <li>Foreign rental properties</li>
            <li>Interests in foreign trusts</li>
            <li>Precious metals, gold certificates held abroad</li>
          </ul>

          <h3>What Doesn't Count?</h3>
          <ul>
            <li>Personal-use property (vacation home you don't rent)</li>
            <li>Foreign property held inside RRSP, TFSA, RESP</li>
            <li>Shares in Canadian mutual funds that hold foreign investments</li>
            <li>Canadian ETFs that hold foreign stocks</li>
            <li>Foreign property used in an active business</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> The $100,000 threshold is based on COST, not fair market value. Even if your investments have dropped in value, you must file if the original cost exceeded $100,000.
            </p>
          </div>

          <h2>T1135 Reporting Requirements</h2>
          <p>There are two reporting methods depending on the cost of your foreign property:</p>

          <h3>Simplified Method ($100,001 - $250,000)</h3>
          <ul>
            <li>Check boxes for types of property owned</li>
            <li>Report total income from all specified foreign property</li>
            <li>Less detailed than the detailed method</li>
          </ul>

          <h3>Detailed Method (Over $250,000)</h3>
          <ul>
            <li>Report each property individually</li>
            <li>Include country, cost, income, and gain/loss</li>
            <li>More extensive documentation required</li>
          </ul>

          <h2>Foreign Tax Credit</h2>
          <p>If you paid tax to a foreign country on income that's also taxable in Canada, you can claim a foreign tax credit to avoid double taxation.</p>

          <h3>How It Works</h3>
          <ol>
            <li>Report the gross foreign income in Canadian dollars</li>
            <li>Calculate Canadian tax on that income</li>
            <li>Claim credit for foreign taxes paid (up to the Canadian tax on that income)</li>
          </ol>

          <h3>Limitations</h3>
          <ul>
            <li>The credit cannot exceed the Canadian tax on the foreign income</li>
            <li>Calculated separately for business income vs. non-business income</li>
            <li>Unused credits can be carried back 3 years or forward 10 years</li>
          </ul>

          <h2>US-Specific Rules</h2>

          <h3>US Social Security</h3>
          <p>Under the Canada-US tax treaty, you only pay tax to your country of residence. Report on Line 11500 but claim a deduction for 15% on Line 25600.</p>

          <h3>US Dividends</h3>
          <ul>
            <li>US companies typically withhold 15% (treaty rate)</li>
            <li>Report gross dividend on Line 12100</li>
            <li>Claim foreign tax credit for US tax withheld</li>
          </ul>

          <h3>US Rental Property</h3>
          <ul>
            <li>Report income and expenses in CAD on T776</li>
            <li>May need to file US tax return</li>
            <li>Claim foreign tax credit for US tax paid</li>
          </ul>

          <h2>Currency Conversion</h2>
          <p>Convert foreign income to CAD using:</p>
          <ul>
            <li><strong>Income:</strong> Exchange rate on the day received, OR</li>
            <li><strong>Annual average:</strong> Bank of Canada annual average rate (acceptable for consistency)</li>
            <li><strong>Capital gains:</strong> Rate on acquisition date and disposition date</li>
          </ul>

          <h2>Penalties for Non-Compliance</h2>
          <p>Failing to file T1135 or report foreign income can result in:</p>
          <ul>
            <li><strong>T1135 late filing:</strong> $25/day, minimum $100, maximum $2,500</li>
            <li><strong>Gross negligence:</strong> $500/month, up to $12,000 for 24 months</li>
            <li><strong>Unreported income:</strong> 50% penalty on tax evaded</li>
          </ul>

          <h2>Voluntary Disclosure Program</h2>
          <p>If you haven't reported foreign income in past years, consider CRA's Voluntary Disclosure Program to potentially reduce penalties and avoid prosecution.</p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Canadian residents must report worldwide income</li>
            <li>File T1135 if foreign property cost exceeds $100,000</li>
            <li>Claim foreign tax credits to avoid double taxation</li>
            <li>Canadian mutual funds/ETFs don't count as foreign property for T1135</li>
            <li>Keep detailed records of foreign income and taxes paid</li>
            <li>Consider the Voluntary Disclosure Program for past non-compliance</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Foreign Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about foreign income reporting.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> International tax rules are complex and depend on tax treaties. Consult a tax professional familiar with cross-border taxation for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
