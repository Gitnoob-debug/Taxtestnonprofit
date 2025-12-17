import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Globe, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Leaving Canada Taxes 2024 | Departure Tax & Emigration Guide',
  description: 'Complete guide to tax obligations when leaving Canada. Learn about departure tax, deemed disposition, RRSP options, final return requirements, and maintaining ties.',
  keywords: 'leaving Canada taxes, departure tax Canada, emigration tax, deemed disposition leaving Canada, non-resident tax',
}

export default function LeavingCanadaTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Leaving Canada: Tax Implications
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Departure Tax (Deemed Disposition)</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            When you leave Canada and become a non-resident, you're deemed to have disposed of most property at fair market value. This triggers capital gains tax on unrealized gains—sometimes called the "departure tax."
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>When Do You Become a Non-Resident?</h2>
          <p>You become a non-resident when you:</p>
          <ul>
            <li>Leave Canada permanently</li>
            <li>Sever your residential ties</li>
            <li>Establish residency in another country</li>
          </ul>

          <h3>Severing Ties</h3>
          <p>To become a non-resident, you typically must:</p>
          <ul>
            <li>Sell or rent out your Canadian home</li>
            <li>Remove spouse and dependants from Canada (or they leave too)</li>
            <li>Cancel provincial health insurance</li>
            <li>Close Canadian bank accounts (or minimize)</li>
            <li>Cancel Canadian driver's license</li>
            <li>Cancel club memberships and social ties</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Keeping significant ties to Canada may mean you remain a resident for tax purposes, even if living abroad. Dual residency can create complex tax obligations.
            </p>
          </div>

          <h2>Deemed Disposition at Departure</h2>
          <p>Upon becoming a non-resident, you're deemed to have disposed of most property at fair market value:</p>

          <h3>Property Subject to Deemed Disposition</h3>
          <ul>
            <li>Stocks and investments</li>
            <li>Mutual funds and ETFs</li>
            <li>Shares in private corporations</li>
            <li>Foreign real estate</li>
            <li>Cryptocurrency</li>
            <li>Art and collectibles</li>
          </ul>

          <h3>Property Exempt from Deemed Disposition</h3>
          <ul>
            <li><strong>Canadian real estate:</strong> Including principal residence</li>
            <li><strong>Canadian business property:</strong> Used in Canadian business</li>
            <li><strong>RRSPs and RRIFs:</strong> Special rules apply</li>
            <li><strong>Pension plans:</strong> RPPs and DPSPs</li>
            <li><strong>Stock options:</strong> Special treatment</li>
          </ul>

          <h2>Tax Calculation Example</h2>
          <p>Sarah leaves Canada with these assets:</p>
          <ul>
            <li>Stock portfolio: Cost $50,000, FMV $150,000 → $100,000 gain</li>
            <li>Foreign property: Cost $200,000, FMV $300,000 → $100,000 gain</li>
            <li><strong>Total capital gains: $200,000</strong></li>
            <li><strong>Taxable (50%): $100,000</strong></li>
          </ul>
          <p>This $100,000 is added to her income on her departure year return.</p>

          <h2>Security and Payment Options</h2>
          <p>If you can't pay the departure tax immediately:</p>

          <h3>Deferral with Security</h3>
          <ul>
            <li>Post security with CRA (cash, letter of credit, etc.)</li>
            <li>Defer tax until property is actually sold</li>
            <li>Interest may accrue</li>
          </ul>

          <h3>Payment Plan</h3>
          <ul>
            <li>Request payment arrangement</li>
            <li>Interest charges apply</li>
            <li>Security may be required</li>
          </ul>

          <h2>RRSPs and RRIFs</h2>

          <h3>Keeping Your RRSP</h3>
          <ul>
            <li>Can remain in Canada as non-resident</li>
            <li>Withdrawals subject to 25% withholding tax (may vary by treaty)</li>
            <li>No further contributions allowed</li>
            <li>Grows tax-free while in RRSP</li>
          </ul>

          <h3>Withdrawing Before Leaving</h3>
          <ul>
            <li>Full amount taxed as income</li>
            <li>May push you into higher bracket</li>
            <li>Consider spreading withdrawals over years if possible</li>
          </ul>

          <h3>RRIF Payments</h3>
          <ul>
            <li>Continue receiving payments as non-resident</li>
            <li>Subject to withholding tax (typically 15-25%)</li>
            <li>May be taxable in new country too—check treaty</li>
          </ul>

          <h2>TFSAs</h2>
          <ul>
            <li>Can keep TFSA as non-resident</li>
            <li>No further contributions allowed</li>
            <li>No contribution room accumulates while non-resident</li>
            <li>May be taxable in new country of residence</li>
          </ul>

          <h2>Canadian Real Estate</h2>
          <p>Canadian real estate is NOT subject to deemed disposition but has special rules:</p>

          <h3>If You Keep the Property</h3>
          <ul>
            <li>Rent income taxed in Canada</li>
            <li>Must file Section 216 return</li>
            <li>25% withholding on gross rent (or elect for net)</li>
            <li>Principal residence exemption may be limited</li>
          </ul>

          <h3>If You Sell</h3>
          <ul>
            <li>Section 116 certificate required</li>
            <li>Buyer must withhold 25% of sale price</li>
            <li>File Canadian return to report gain and recover excess withholding</li>
          </ul>

          <h2>Final Tax Return</h2>

          <h3>Departure Return</h3>
          <ul>
            <li>Report income from January 1 to departure date</li>
            <li>Include deemed disposition gains</li>
            <li>Claim credits prorated for period of residence</li>
            <li>Due April 30 of following year</li>
          </ul>

          <h3>Form T1161: List of Properties</h3>
          <p>If total FMV of property (other than excluded items) exceeds $25,000, file T1161 listing all property subject to deemed disposition.</p>

          <h2>Notifying CRA</h2>
          <ul>
            <li>File departure return with emigration date</li>
            <li>Update address with CRA</li>
            <li>Notify of change in residency status</li>
            <li>Consider Form NR73 for official determination</li>
          </ul>

          <h2>Tax Treaties</h2>
          <p>Tax treaties can affect:</p>
          <ul>
            <li>Withholding rates on RRSP/RRIF withdrawals</li>
            <li>Taxation of Canadian pension income</li>
            <li>Which country taxes capital gains</li>
            <li>Residency tie-breaker rules</li>
          </ul>

          <h2>After Departure: Canadian Income</h2>
          <p>As a non-resident, you're still taxed on Canadian-source income:</p>
          <ul>
            <li>Employment performed in Canada</li>
            <li>Canadian rental income</li>
            <li>Canadian business income</li>
            <li>Certain pension income</li>
            <li>Gains on Canadian real estate (when sold)</li>
          </ul>

          <h2>Planning Strategies</h2>

          <h3>Before Departure</h3>
          <ul>
            <li>Harvest capital losses to offset departure gains</li>
            <li>Consider selling appreciated assets before leaving</li>
            <li>Maximize RRSP contributions (reduces income)</li>
            <li>Review principal residence designation</li>
            <li>Organize records and valuations</li>
          </ul>

          <h3>Timing</h3>
          <ul>
            <li>Consider departure date impact on credits</li>
            <li>Early-year departure means less Canadian income</li>
            <li>Late-year departure means more credits prorated</li>
          </ul>

          <h2>Returning to Canada</h2>
          <p>If you return and become resident again:</p>
          <ul>
            <li>Assets receive new cost base at FMV on return</li>
            <li>TFSA room accumulates again</li>
            <li>RRSP contribution room based on Canadian income</li>
            <li>May need to report foreign assets (T1135)</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Leaving Canada?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about departure tax and emigration.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Emigration tax rules are complex and have significant financial implications. This guide provides general information. Consult a cross-border tax specialist before leaving Canada.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
