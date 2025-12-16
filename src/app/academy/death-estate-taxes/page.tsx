import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Death & Estate Taxes Canada 2024 | Final Return & Deemed Disposition Guide',
  description: 'Complete guide to tax obligations when someone dies in Canada. Learn about final returns, deemed disposition, spousal rollovers, probate, and estate tax planning.',
  keywords: 'death taxes Canada, estate tax Canada, final tax return deceased, deemed disposition death, spousal rollover',
}

export default function DeathEstateTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-xl">
              <FileText className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Death & Estate Taxes: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />13 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-gray-900 dark:text-gray-100 mb-3">No Estate Tax, But Deemed Disposition</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Canada has no inheritance or estate tax. However, the deceased is deemed to have disposed of all capital property at fair market value immediately before death, triggering capital gains tax on the final return.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Tax Returns Required</h2>

          <h3>Final Return (Terminal Return)</h3>
          <ul>
            <li>Reports income from January 1 to date of death</li>
            <li>Due the later of: 6 months after death OR April 30 of following year</li>
            <li>Includes deemed disposition of capital property</li>
            <li>Final opportunity for credits and deductions</li>
          </ul>

          <h3>Optional Returns</h3>
          <p>In some cases, the executor can file additional returns to reduce taxes:</p>
          <ul>
            <li><strong>Rights or things return:</strong> Amounts owed to deceased (unpaid salary, dividends declared)</li>
            <li><strong>Partner/proprietor return:</strong> Business income from fiscal year-end to death</li>
            <li><strong>Trust income return:</strong> If deceased was a trust beneficiary</li>
          </ul>

          <h2>Deemed Disposition at Death</h2>
          <p>At death, the deceased is deemed to have sold all capital property at fair market value:</p>

          <h3>Assets Subject to Deemed Disposition</h3>
          <ul>
            <li>Stocks and investments</li>
            <li>Real estate (except principal residence)</li>
            <li>Business assets</li>
            <li>Art, jewelry, and collectibles</li>
            <li>Shares in private corporations</li>
          </ul>

          <h3>Capital Gains Calculation</h3>
          <p>FMV at death - Adjusted cost base = Capital gain</p>
          <p>50% of capital gains are taxable as income on the final return.</p>

          <h2>Principal Residence Exemption</h2>
          <p>The deceased's principal residence can still qualify for the PRE:</p>
          <ul>
            <li>Must designate on final return</li>
            <li>Only one principal residence per family per year</li>
            <li>PRE eliminates capital gains on qualifying home</li>
            <li>File Form T2091 with final return</li>
          </ul>

          <h2>Spousal Rollover</h2>
          <p>Property left to a spouse or common-law partner can roll over tax-free:</p>

          <h3>How It Works</h3>
          <ul>
            <li>Transfer at deceased's adjusted cost base</li>
            <li>No capital gains triggered at death</li>
            <li>Surviving spouse inherits the cost base</li>
            <li>Tax deferred until spouse sells or dies</li>
          </ul>

          <h3>Applies To</h3>
          <ul>
            <li>RRSPs and RRIFs</li>
            <li>Capital property</li>
            <li>Eligible capital property</li>
            <li>Resource properties</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Note:</strong> The executor can elect OUT of the spousal rollover if it's beneficial to trigger gains on the final return (e.g., if the deceased had losses to offset gains).
            </p>
          </div>

          <h2>RRSPs and RRIFs</h2>

          <h3>Left to Spouse</h3>
          <ul>
            <li>Transfers tax-free to spouse's RRSP or RRIF</li>
            <li>No income on final return</li>
            <li>Tax deferred until spouse withdraws</li>
          </ul>

          <h3>Left to Dependent Child</h3>
          <ul>
            <li>Can purchase annuity to age 18</li>
            <li>Disabled dependent can transfer to RDSP</li>
          </ul>

          <h3>Left to Non-Spouse</h3>
          <ul>
            <li>Full value included in deceased's final return income</li>
            <li>Can create substantial tax liability</li>
            <li>Plan ahead to minimize impact</li>
          </ul>

          <h2>TFSAs</h2>
          <ul>
            <li>Can transfer to spouse's TFSA without using contribution room</li>
            <li>Growth after death is taxable if successor holder not named</li>
            <li>Not subject to deemed disposition</li>
            <li>No tax on TFSA value at death</li>
          </ul>

          <h2>Credits on Final Return</h2>
          <p>The final return can claim:</p>
          <ul>
            <li><strong>Medical expenses:</strong> Expanded 24-month period</li>
            <li><strong>Charitable donations:</strong> Up to 100% of net income (vs. usual 75%)</li>
            <li><strong>All personal credits:</strong> Full year, not prorated</li>
            <li><strong>Capital losses:</strong> Can offset any income, not just gains</li>
          </ul>

          <h2>Estate Tax Returns (T3)</h2>
          <p>After death, the estate may need to file T3 returns:</p>
          <ul>
            <li>Reports income earned by the estate after death</li>
            <li>Interest, dividends, rental income</li>
            <li>Capital gains on assets sold by estate</li>
            <li>36-month deadline for graduated rate estate status</li>
          </ul>

          <h3>Graduated Rate Estate (GRE)</h3>
          <ul>
            <li>Estate taxed at graduated rates (like individuals)</li>
            <li>Must be designated by executor</li>
            <li>Only one GRE per deceased</li>
            <li>Status lasts maximum 36 months</li>
          </ul>

          <h2>Probate Fees</h2>
          <p>Probate fees are provincial (not federal tax):</p>
          <ul>
            <li>Ontario: ~1.5% of estate value over $50,000</li>
            <li>BC: Graduated rates up to 1.4%</li>
            <li>Alberta: Maximum $525</li>
            <li>Quebec: Fixed fees (minimal)</li>
          </ul>

          <h3>Avoiding Probate</h3>
          <ul>
            <li>Joint ownership with right of survivorship</li>
            <li>Named beneficiaries on RRSPs, TFSAs, insurance</li>
            <li>Living trusts</li>
            <li>Multiple wills (for private corporation shares)</li>
          </ul>

          <h2>Clearance Certificate</h2>
          <p>Before distributing estate assets, executors should obtain clearance certificate:</p>
          <ul>
            <li>Confirms all taxes paid</li>
            <li>Protects executor from personal liability</li>
            <li>Request using Form TX19</li>
            <li>CRA reviews all returns before issuing</li>
          </ul>

          <h2>Filing Deadlines</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Date of Death</th>
                <th>Final Return Due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>January 1 - October 31</td>
                <td>April 30 of next year</td>
              </tr>
              <tr>
                <td>November 1 - December 31</td>
                <td>6 months after death</td>
              </tr>
            </tbody>
          </table>

          <h2>Planning Strategies</h2>

          <h3>Before Death</h3>
          <ul>
            <li>Name beneficiaries on registered accounts</li>
            <li>Consider spousal RRSP contributions</li>
            <li>Plan charitable bequests for tax benefit</li>
            <li>Review principal residence designation</li>
            <li>Consider life insurance to cover tax liability</li>
          </ul>

          <h3>After Death</h3>
          <ul>
            <li>Assess value of electing out of rollovers</li>
            <li>Consider filing optional returns</li>
            <li>Maximize medical and charitable credits</li>
            <li>Review for loss carrybacks</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Missing filing deadlines:</strong> Late penalties and interest</li>
            <li><strong>Not claiming PRE:</strong> Designation must be filed</li>
            <li><strong>Distributing before clearance:</strong> Personal liability risk</li>
            <li><strong>Forgetting optional returns:</strong> May save taxes</li>
            <li><strong>Not planning RRSP beneficiaries:</strong> Can trigger large tax bill</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Estate Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about death and estate tax obligations.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Estate tax matters are complex and have significant financial implications. This guide provides general information. Executors should work with a tax professional and estate lawyer.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
