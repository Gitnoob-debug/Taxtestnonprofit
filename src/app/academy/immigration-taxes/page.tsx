import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Plane, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'New to Canada Taxes 2024 | Immigration Tax Guide for Newcomers',
  description: 'Complete tax guide for newcomers to Canada. Learn about residency rules, first year filing, foreign income reporting, foreign asset declarations, and available benefits.',
  keywords: 'new to Canada taxes, immigration tax Canada, newcomer tax guide, first tax return Canada, foreign asset reporting',
}

export default function ImmigrationTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-sky-100 dark:bg-sky-900 p-2.5 rounded-xl">
              <Plane className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            New to Canada: Tax Guide for Newcomers
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-sky-50 dark:bg-sky-950 border border-sky-200 dark:border-sky-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-sky-900 dark:text-sky-100 mb-3">Worldwide Income Rule</h2>
          <p className="text-sky-700 dark:text-sky-300 text-sm">
            Once you become a Canadian tax resident, you must report worldwide income from all sources. Your residency date—not your immigration date—determines when this obligation begins.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>When Do You Become a Tax Resident?</h2>
          <p>Tax residency depends on significant residential ties to Canada:</p>

          <h3>Significant Ties</h3>
          <ul>
            <li>Home in Canada (owned or rented)</li>
            <li>Spouse or common-law partner in Canada</li>
            <li>Dependants in Canada</li>
          </ul>

          <h3>Secondary Ties</h3>
          <ul>
            <li>Personal property in Canada (car, furniture)</li>
            <li>Social ties (memberships, clubs)</li>
            <li>Canadian driver's license</li>
            <li>Canadian bank accounts</li>
            <li>Provincial health insurance</li>
          </ul>

          <h3>Your Residency Date</h3>
          <p>Usually the date you arrive with intent to settle in Canada. This could be your landing date or the date you establish significant ties.</p>

          <h2>Your First Canadian Tax Return</h2>

          <h3>What to Report</h3>
          <ul>
            <li><strong>Canadian income:</strong> From residency date to December 31</li>
            <li><strong>Foreign income:</strong> Earned after becoming resident</li>
            <li><strong>Pre-arrival income:</strong> Generally not reported</li>
          </ul>

          <h3>Filing Deadline</h3>
          <ul>
            <li>April 30 of the following year</li>
            <li>File even if you arrived late in the year</li>
            <li>File even if you have no income (to get benefits)</li>
          </ul>

          <h2>Applying for Benefits</h2>

          <h3>GST/HST Credit</h3>
          <ul>
            <li>Complete Form RC151 (GST/HST Credit Application)</li>
            <li>Payments start the quarter after approval</li>
            <li>Based on prior year income (may be zero for newcomers)</li>
          </ul>

          <h3>Canada Child Benefit</h3>
          <ul>
            <li>Complete Form RC66 (Canada Child Benefits Application)</li>
            <li>Provide proof of immigration status</li>
            <li>May need to wait 18 months if temporary resident</li>
          </ul>

          <h3>Climate Action Incentive</h3>
          <ul>
            <li>Automatic once you file tax return</li>
            <li>Paid quarterly to eligible provinces</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Important:</strong> Filing your tax return triggers benefit payments. Even with no income, file to receive GST/HST credit, CCB, and other benefits.
            </p>
          </div>

          <h2>Foreign Assets: T1135 Reporting</h2>
          <p>If you have more than $100,000 CAD in specified foreign property:</p>

          <h3>First Year Exemption</h3>
          <ul>
            <li>T1135 not required in your first year as a resident</li>
            <li>Reporting begins in your second year</li>
            <li>Still must report foreign income in first year</li>
          </ul>

          <h3>What Must Be Reported</h3>
          <ul>
            <li>Foreign bank accounts</li>
            <li>Stocks in foreign corporations</li>
            <li>Foreign rental properties</li>
            <li>Foreign bonds and loans</li>
          </ul>

          <h3>What's Exempt</h3>
          <ul>
            <li>Personal-use property</li>
            <li>Assets in RRSP, TFSA, RESP</li>
            <li>Canadian mutual funds holding foreign investments</li>
          </ul>

          <h2>Foreign Income Sources</h2>

          <h3>Employment Income</h3>
          <p>After becoming resident, report worldwide employment income. Foreign tax paid may qualify for foreign tax credit.</p>

          <h3>Investment Income</h3>
          <ul>
            <li>Foreign interest, dividends: Report on Canadian return</li>
            <li>Convert to CAD using exchange rate on receipt date</li>
            <li>Claim foreign tax credit for withholdings</li>
          </ul>

          <h3>Rental Income</h3>
          <ul>
            <li>Report net rental income from foreign properties</li>
            <li>May need to file in foreign country too</li>
            <li>Claim foreign tax credit to avoid double taxation</li>
          </ul>

          <h2>Tax Treaties</h2>
          <p>Canada has tax treaties with many countries to prevent double taxation:</p>
          <ul>
            <li>Determine which country can tax specific income</li>
            <li>Provide reduced withholding rates</li>
            <li>May offer tie-breaker rules for residency</li>
          </ul>

          <h3>Common Treaty Countries</h3>
          <ul>
            <li>United States</li>
            <li>United Kingdom</li>
            <li>India</li>
            <li>China</li>
            <li>Most European countries</li>
          </ul>

          <h2>Bringing Assets to Canada</h2>

          <h3>Deemed Disposition at Immigration</h3>
          <p>Upon becoming resident, most assets are deemed acquired at fair market value. This resets your cost base for Canadian tax purposes.</p>

          <h3>Tax-Free Step-Up</h3>
          <ul>
            <li>Gains accrued before immigration are not taxed in Canada</li>
            <li>Keep records of FMV at immigration date</li>
            <li>Only future gains (after arrival) are taxable</li>
          </ul>

          <h3>Exceptions</h3>
          <p>Certain Canadian property (real estate, business assets in Canada) doesn't get stepped up—it's always subject to Canadian tax.</p>

          <h2>RRSP Contribution Room</h2>
          <ul>
            <li>No RRSP room from pre-arrival years</li>
            <li>Room builds only from Canadian earned income</li>
            <li>First year: 18% of Canadian earned income</li>
            <li>Unused room carries forward</li>
          </ul>

          <h2>TFSA Contribution Room</h2>
          <ul>
            <li>Room accumulates only while you're resident AND 18+</li>
            <li>No room for years before immigration</li>
            <li>2024 limit: $7,000</li>
            <li>Partial year: Full year's room applies</li>
          </ul>

          <h2>Provincial Health Insurance</h2>
          <p>Most provinces have waiting periods:</p>
          <ul>
            <li>Ontario: 3 months</li>
            <li>BC: 3 months</li>
            <li>Alberta: 3 months</li>
          </ul>
          <p>Consider private insurance during waiting period. Premiums may be tax-deductible as medical expenses.</p>

          <h2>Getting a SIN</h2>
          <ul>
            <li>Required for working and filing taxes</li>
            <li>Apply at Service Canada office</li>
            <li>Bring immigration documents</li>
            <li>Usually issued immediately</li>
          </ul>

          <h2>Common Newcomer Mistakes</h2>
          <ul>
            <li><strong>Not filing:</strong> Miss out on benefits even with no income</li>
            <li><strong>Forgetting foreign income:</strong> Must report worldwide income</li>
            <li><strong>Wrong residency date:</strong> Can affect tax calculations</li>
            <li><strong>Not keeping records:</strong> FMV at arrival is important</li>
            <li><strong>Ignoring T1135:</strong> Significant penalties for non-compliance</li>
          </ul>

          <h2>Helpful Resources</h2>
          <ul>
            <li><strong>CRA Newcomers page:</strong> Information for new residents</li>
            <li><strong>Tax treaty information:</strong> Check if your country has a treaty</li>
            <li><strong>Settlement agencies:</strong> Often offer free tax help</li>
            <li><strong>Community tax clinics:</strong> Free help for simple returns</li>
          </ul>

          <h2>Checklist for Newcomers</h2>
          <ul>
            <li>✓ Get SIN as soon as possible</li>
            <li>✓ Open Canadian bank account</li>
            <li>✓ Apply for provincial health insurance</li>
            <li>✓ Record fair market value of assets at arrival</li>
            <li>✓ File tax return by April 30</li>
            <li>✓ Apply for GST/HST credit (Form RC151)</li>
            <li>✓ Apply for CCB if you have children (Form RC66)</li>
            <li>✓ Report foreign income after residency date</li>
            <li>✓ Consider T1135 requirements for year 2</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Newcomer Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about your tax obligations as a newcomer.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Immigration tax rules are complex and depend on your specific circumstances. This guide provides general information. Consider consulting a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
