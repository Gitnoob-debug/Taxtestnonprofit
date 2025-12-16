import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Gift, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Inheritance Tax Canada 2024 | Receiving & Managing Inherited Assets',
  description: 'Complete guide to receiving an inheritance in Canada. Learn about tax obligations, inherited RRSPs, property, investments, and foreign inheritances.',
  keywords: 'inheritance tax Canada, inherited RRSP tax, receiving inheritance Canada, estate beneficiary tax',
}

export default function InheritanceTaxesPage() {
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
              <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Inheritance in Canada: Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">No Inheritance Tax in Canada</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Canada has no inheritance or estate tax for beneficiaries. When you receive an inheritance, it's generally tax-free. However, tax may have been paid by the deceased's estate, and future income from inherited assets is taxable.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Understanding Inheritance Taxation</h2>
          <p>The Canadian approach to inheritance:</p>
          <ul>
            <li><strong>Estate pays tax:</strong> Deceased's final return includes deemed disposition</li>
            <li><strong>Beneficiary receives net:</strong> After estate taxes are settled</li>
            <li><strong>No tax on receipt:</strong> Inheritance itself isn't taxable income</li>
            <li><strong>Future income taxable:</strong> Earnings from inherited assets are taxed</li>
          </ul>

          <h2>Inheriting Cash</h2>
          <p>Cash inheritances are completely tax-free:</p>
          <ul>
            <li>Not reported as income</li>
            <li>No forms to file</li>
            <li>No limits on amount</li>
          </ul>

          <h3>What to Do with Cash Inheritance</h3>
          <ul>
            <li>Consider TFSA contributions (up to your room)</li>
            <li>RRSP contributions if you have room</li>
            <li>Pay down debt</li>
            <li>Invest in non-registered accounts</li>
          </ul>

          <h2>Inheriting Property (Real Estate)</h2>

          <h3>Your Cost Base</h3>
          <p>You inherit property at its fair market value at death (or the value used on the deceased's final return):</p>
          <ul>
            <li>This becomes your adjusted cost base</li>
            <li>Any pre-death appreciation was taxed on the estate</li>
            <li>Only future gains are your responsibility</li>
          </ul>

          <h3>Example</h3>
          <p>Parent bought cottage for $100,000, worth $400,000 at death:</p>
          <ul>
            <li>Estate paid tax on $300,000 gain</li>
            <li>Your cost base: $400,000</li>
            <li>You sell for $450,000: You pay tax on $50,000 gain</li>
          </ul>

          <h3>Principal Residence</h3>
          <ul>
            <li>If inherited property was deceased's principal residence, they may have claimed PRE</li>
            <li>Your principal residence status is independent</li>
            <li>May affect your own PRE claims if you have multiple properties</li>
          </ul>

          <h2>Inheriting Investments</h2>

          <h3>Stocks and Mutual Funds</h3>
          <ul>
            <li>You receive them at FMV at death</li>
            <li>New cost base for your records</li>
            <li>Dividends and interest are your taxable income</li>
            <li>Future capital gains are your responsibility</li>
          </ul>

          <h3>Record Keeping</h3>
          <ul>
            <li>Get documentation of FMV at date of death</li>
            <li>Keep estate paperwork showing transferred values</li>
            <li>Track your adjusted cost base carefully</li>
          </ul>

          <h2>Inheriting RRSPs and RRIFs</h2>

          <h3>From a Spouse</h3>
          <ul>
            <li>Can transfer to your own RRSP or RRIF tax-free</li>
            <li>No tax until you withdraw</li>
            <li>Complete rollover preserves tax deferral</li>
          </ul>

          <h3>From Non-Spouse</h3>
          <ul>
            <li>Full value is taxed on deceased's final return</li>
            <li>You receive the after-tax amount</li>
            <li>Cannot transfer to your RRSP (already taxed)</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> RRSP/RRIF inheritances from non-spouses can create large tax bills for the estate. If you're a named beneficiary (not the estate), you may be liable for estate's tax shortfall.
            </p>
          </div>

          <h3>Financially Dependent Child</h3>
          <ul>
            <li>May be able to purchase an annuity to age 18</li>
            <li>Disabled dependent: Can transfer to RDSP</li>
            <li>Special rules apply—consult a professional</li>
          </ul>

          <h2>Inheriting TFSAs</h2>

          <h3>As Successor Holder (Spouse Only)</h3>
          <ul>
            <li>TFSA transfers directly to you</li>
            <li>Doesn't use your contribution room</li>
            <li>Continues as tax-free account</li>
          </ul>

          <h3>As Beneficiary (Anyone)</h3>
          <ul>
            <li>Receive the value tax-free</li>
            <li>TFSA status ends at death</li>
            <li>Any growth after death is taxable to you</li>
            <li>Can contribute to your own TFSA (uses your room)</li>
          </ul>

          <h2>Foreign Inheritances</h2>

          <h3>From Non-Canadian Estate</h3>
          <ul>
            <li>Generally tax-free in Canada</li>
            <li>May have been taxed in source country</li>
            <li>Report large amounts on Form T1142</li>
            <li>Future income is taxable</li>
          </ul>

          <h3>Form T1142</h3>
          <p>If you receive a distribution of $10,000+ from a foreign trust (including an estate), you must file Form T1142.</p>

          <h3>Currency Conversion</h3>
          <ul>
            <li>Convert to CAD at exchange rate on receipt date</li>
            <li>This becomes your cost base for investments</li>
            <li>Keep records of exchange rates used</li>
          </ul>

          <h2>Inheriting a Business</h2>

          <h3>Small Business Corporation Shares</h3>
          <ul>
            <li>May qualify for capital gains exemption on estate return</li>
            <li>Your cost base is FMV at death</li>
            <li>Future sales may qualify for your own exemption</li>
          </ul>

          <h3>Active Business Assets</h3>
          <ul>
            <li>May be subject to recapture of CCA</li>
            <li>Complex valuation issues</li>
            <li>Consider professional appraisal</li>
          </ul>

          <h2>Impact on Your Benefits</h2>

          <h3>No Immediate Impact</h3>
          <p>Inheritance itself doesn't affect:</p>
          <ul>
            <li>GST/HST credit</li>
            <li>Canada Child Benefit</li>
            <li>OAS (no clawback from inheritance)</li>
          </ul>

          <h3>Future Income May Affect Benefits</h3>
          <p>Investment income from inherited assets will affect income-tested benefits in future years.</p>

          <h2>Executor Responsibilities</h2>
          <p>If you're also the executor:</p>
          <ul>
            <li>File deceased's final return</li>
            <li>Obtain clearance certificate before distribution</li>
            <li>Ensure all taxes paid before distributing estate</li>
            <li>Personal liability if taxes remain unpaid</li>
          </ul>

          <h2>What Records to Keep</h2>
          <ul>
            <li>Copy of will and probate documents</li>
            <li>Estate accounting and distributions</li>
            <li>Fair market values at date of death</li>
            <li>Transfer documentation from estate</li>
            <li>Your adjusted cost base calculations</li>
          </ul>

          <h2>Common Questions</h2>

          <h3>Do I report inheritance on my tax return?</h3>
          <p>No, unless it's income (like RRSP from non-spouse). The inheritance itself isn't reported.</p>

          <h3>Is there a limit to tax-free inheritance?</h3>
          <p>No limit in Canada. Estate pays any applicable taxes.</p>

          <h3>What about US estate tax?</h3>
          <p>US citizens/residents or US property may be subject to US estate tax. Consult a cross-border specialist.</p>

          <h2>Planning with Inherited Assets</h2>
          <ul>
            <li><strong>Review your overall portfolio:</strong> May now be over-concentrated</li>
            <li><strong>Consider tax-efficient investing:</strong> Hold interest-paying investments in TFSA/RRSP</li>
            <li><strong>Update your own estate plan:</strong> Ensure your wishes are documented</li>
            <li><strong>Consult professionals:</strong> For large or complex inheritances</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Inheritance?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about inheritance and estate matters.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Inheritance rules can be complex, especially for large estates, foreign assets, or business interests. This guide provides general information. Consult a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
