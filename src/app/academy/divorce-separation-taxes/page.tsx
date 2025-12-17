import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Scale, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Divorce & Separation Tax Guide Canada 2024 | Support Payments & Property',
  description: 'Complete guide to tax implications of divorce and separation in Canada. Learn about support payments, property division, RRSP splitting, and custody-related credits.',
  keywords: 'divorce tax Canada, separation tax implications, spousal support tax deduction, child support taxes Canada',
}

export default function DivorceSeparationTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-200 dark:bg-slate-700 p-2.5 rounded-xl">
              <Scale className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Divorce & Separation: Tax Implications
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-3">90-Day Rule</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            For tax purposes, you're considered separated after living apart for 90 days due to a breakdown in the relationship. This affects your filing status, credits, and benefit calculations.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Support Payments: Tax Treatment</h2>

          <h3>Spousal Support</h3>
          <p>Under a written agreement or court order:</p>
          <ul>
            <li><strong>Payer:</strong> Deducts payments from income (Line 22000)</li>
            <li><strong>Recipient:</strong> Reports payments as income (Line 12800)</li>
            <li>Must be periodic payments (not lump sum)</li>
            <li>Living separately when payments made</li>
          </ul>

          <h3>Child Support</h3>
          <p>For agreements made after May 1, 1997:</p>
          <ul>
            <li><strong>Payer:</strong> NOT deductible</li>
            <li><strong>Recipient:</strong> NOT taxable</li>
            <li>This is the "tax-free" treatment</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> If payments are for both child support and spousal support, child support must be paid first. Only amounts exceeding child support obligations can be deducted as spousal support.
            </p>
          </div>

          <h3>Requirements for Deductibility</h3>
          <ul>
            <li>Written agreement or court order</li>
            <li>Living apart due to relationship breakdown</li>
            <li>Periodic payments (monthly, etc.)</li>
            <li>Paid to spouse/ex-spouse or to third party for their benefit</li>
          </ul>

          <h2>Property Division</h2>

          <h3>General Rule: Tax-Free Rollover</h3>
          <p>Transfers of property between spouses as part of separation are generally tax-free:</p>
          <ul>
            <li>No immediate capital gains on transfer</li>
            <li>Receiving spouse takes over cost base</li>
            <li>Tax is deferred until property is sold</li>
          </ul>

          <h3>RRSPs and RRIFs</h3>
          <p>Can be transferred tax-free between spouses if:</p>
          <ul>
            <li>Transfer is pursuant to court order or written separation agreement</li>
            <li>Done through direct transfer (T2220 form)</li>
            <li>Receiving spouse's contribution room is not affected</li>
          </ul>

          <h3>Principal Residence</h3>
          <ul>
            <li>Can be transferred to spouse tax-free</li>
            <li>Future PRE claim depends on who lived there</li>
            <li>Only one PRE per family unit per year</li>
          </ul>

          <h2>Changes to Filing Status</h2>

          <h3>Year of Separation</h3>
          <ul>
            <li>Can file as "separated" if apart for 90+ days by December 31</li>
            <li>Regain single status for credits</li>
            <li>Benefits recalculated based on individual income</li>
          </ul>

          <h3>What Changes</h3>
          <ul>
            <li>Lose spousal tax credits</li>
            <li>May gain eligible dependant credit (single parent)</li>
            <li>GST/HST credit recalculated individually</li>
            <li>CCB recalculated based on custody and income</li>
          </ul>

          <h2>Children: Tax Credits and Benefits</h2>

          <h3>Eligible Dependant Amount</h3>
          <p>After separation, custodial parent may claim:</p>
          <ul>
            <li>Equivalent to spousal amount for one child</li>
            <li>Cannot both claim for same child</li>
            <li>Maximum ~$15,705 (2024)</li>
            <li>Reduced by child's net income</li>
          </ul>

          <h3>Canada Child Benefit</h3>
          <ul>
            <li>Goes to parent who primarily cares for child</li>
            <li>In shared custody: split 50/50 between parents</li>
            <li>Each parent's portion based on their family income</li>
          </ul>

          <h3>Child Care Expenses</h3>
          <ul>
            <li>Each parent claims expenses they paid</li>
            <li>Subject to income-based limits</li>
            <li>Annual limits per child still apply</li>
          </ul>

          <h2>Shared Custody Arrangements</h2>
          <p>When parents share custody relatively equally:</p>
          <ul>
            <li>CCB split between parents</li>
            <li>Only one can claim eligible dependant (must agree or split different children)</li>
            <li>Each claims their own childcare expenses</li>
            <li>GST/HST credit: One parent gets child amount OR both get 50%</li>
          </ul>

          <h2>Pension Division</h2>

          <h3>CPP Credits</h3>
          <ul>
            <li>CPP contributions can be split equally for years of cohabitation</li>
            <li>Apply to Service Canada</li>
            <li>Affects future CPP benefits</li>
          </ul>

          <h3>Employer Pensions</h3>
          <ul>
            <li>May be divided under family law</li>
            <li>Transfer to recipient's RRSP or pension plan</li>
            <li>Provincial pension splitting rules apply</li>
          </ul>

          <h2>Legal Fees</h2>

          <h3>Deductible</h3>
          <ul>
            <li>Fees to establish right to spousal support</li>
            <li>Fees to collect late support payments</li>
            <li>Fees to increase support amounts</li>
          </ul>

          <h3>Not Deductible</h3>
          <ul>
            <li>Fees to obtain divorce</li>
            <li>Fees for property settlement</li>
            <li>Fees to defend against support claims</li>
            <li>Fees to reduce support payments</li>
          </ul>

          <h2>Updating Records</h2>
          <p>Notify these agencies of your separation:</p>
          <ul>
            <li><strong>CRA:</strong> Update marital status within 30 days</li>
            <li><strong>Service Canada:</strong> For CPP/EI purposes</li>
            <li><strong>Provincial benefits:</strong> If applicable</li>
            <li><strong>Employer:</strong> Update tax forms and benefits</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Not updating status:</strong> Benefits overpayment must be repaid</li>
            <li><strong>Claiming wrong children:</strong> Both parents claiming eligible dependant</li>
            <li><strong>Informal arrangements:</strong> Support must be in writing for tax treatment</li>
            <li><strong>Lump sum payments:</strong> Generally not deductible/taxable</li>
            <li><strong>Direct payments to children:</strong> May not qualify as support</li>
          </ul>

          <h2>Year of Separation Planning</h2>

          <h3>Timing Considerations</h3>
          <ul>
            <li>Separation date affects which credits you can claim</li>
            <li>May file as separated even if divorce not final</li>
            <li>Consider timing of property transfers</li>
          </ul>

          <h3>Coordinating Returns</h3>
          <ul>
            <li>Agree on who claims which children</li>
            <li>Ensure both report support payments consistently</li>
            <li>Coordinate medical expense claims</li>
          </ul>

          <h2>Post-Divorce Considerations</h2>

          <h3>Beneficiary Updates</h3>
          <p>Review and update beneficiaries on:</p>
          <ul>
            <li>RRSPs and TFSAs</li>
            <li>Life insurance policies</li>
            <li>Pension plans</li>
            <li>Wills and estates</li>
          </ul>

          <h3>Name Changes</h3>
          <ul>
            <li>Update SIN records if name changes</li>
            <li>Ensure tax returns use consistent name</li>
          </ul>

          <h2>Getting Professional Help</h2>
          <p>Consider a tax professional or divorce financial analyst if:</p>
          <ul>
            <li>Significant assets to divide</li>
            <li>Complex support arrangements</li>
            <li>Business ownership involved</li>
            <li>Foreign assets or income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Separation and Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about divorce and separation tax implications.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Divorce and separation have complex tax implications. This guide provides general information. Consult a tax professional and family lawyer for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
