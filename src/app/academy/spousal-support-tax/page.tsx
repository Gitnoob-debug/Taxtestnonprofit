import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Spousal Support Tax Canada 2024 | Alimony Deduction Guide',
  description: 'Complete guide to spousal support taxation in Canada. Learn about deducting alimony payments, reporting support income, and tax planning for separation.',
  keywords: 'spousal support tax Canada, alimony tax deduction, support payments CRA, divorce tax Canada, spousal support taxable',
}

export default function SpousalSupportTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 dark:bg-rose-900 p-2.5 rounded-xl">
              <Heart className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Family & Separation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Spousal Support Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 dark:text-rose-100 mb-3">Deductible for Payer, Taxable for Recipient</h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            Spousal support payments are deductible by the payer and taxable income for the recipient. This differs from child support, which has no tax consequences.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Spousal vs Child Support</h2>

          <h3>Key Differences</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Payer</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spousal Support</td>
                <td>Deductible</td>
                <td>Taxable</td>
              </tr>
              <tr>
                <td>Child Support</td>
                <td>Not deductible</td>
                <td>Not taxable</td>
              </tr>
            </tbody>
          </table>

          <h3>Why This Matters</h3>
          <ul>
            <li>Total after-tax cost different than amount paid</li>
            <li>Recipient keeps less than received</li>
            <li>Affects negotiation of amounts</li>
            <li>May influence structure of agreement</li>
          </ul>

          <h2>Requirements for Deductibility</h2>

          <h3>Must Meet All Conditions</h3>
          <ul>
            <li>Written agreement or court order</li>
            <li>Living separate and apart when paid</li>
            <li>Periodic payments (not lump sum)</li>
            <li>Paid directly to former spouse/partner</li>
            <li>For maintenance of recipient</li>
          </ul>

          <h3>Periodic vs Lump Sum</h3>
          <ul>
            <li><strong>Periodic:</strong> Regular ongoing payments—deductible</li>
            <li><strong>Lump sum:</strong> One-time payment—generally not deductible</li>
            <li>Arrears paid as lump sum may be deductible</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> "Living separate and apart" can occur under the same roof if you have separate bedrooms, meals, finances, and social lives. Document clearly.
            </p>
          </div>

          <h2>For the Payer</h2>

          <h3>Deducting Support Payments</h3>
          <ul>
            <li>Report on Line 22000</li>
            <li>Reduces your net income</li>
            <li>Provides tax refund or reduces tax owing</li>
            <li>Save proof of all payments</li>
          </ul>

          <h3>Tax Savings Example</h3>
          <p>Paying $24,000/year in spousal support at 40% marginal rate:</p>
          <ul>
            <li>Deduction: $24,000</li>
            <li>Tax savings: $9,600</li>
            <li>After-tax cost: $14,400</li>
          </ul>

          <h3>Documentation Required</h3>
          <ul>
            <li>Copy of agreement or court order</li>
            <li>Recipient's SIN</li>
            <li>Proof of payments (bank records)</li>
            <li>Date payments began</li>
          </ul>

          <h2>For the Recipient</h2>

          <h3>Reporting Support Income</h3>
          <ul>
            <li>Report on Line 12800</li>
            <li>Added to your total income</li>
            <li>Taxed at your marginal rate</li>
            <li>May need to make installment payments</li>
          </ul>

          <h3>Tax Owing Example</h3>
          <p>Receiving $24,000/year at 25% marginal rate:</p>
          <ul>
            <li>Support received: $24,000</li>
            <li>Tax owing: $6,000</li>
            <li>After-tax amount: $18,000</li>
          </ul>

          <h3>Planning Considerations</h3>
          <ul>
            <li>Set aside money for taxes</li>
            <li>Consider installment payments</li>
            <li>May affect government benefits</li>
            <li>Impacts child benefit calculations</li>
          </ul>

          <h2>Commencement Day Rules</h2>

          <h3>Pre-May 1997 Agreements</h3>
          <ul>
            <li>Child support may also be deductible/taxable</li>
            <li>Under old rules</li>
            <li>Unless agreement amended</li>
          </ul>

          <h3>Post-May 1997</h3>
          <ul>
            <li>Child support not deductible/taxable</li>
            <li>Current rules apply</li>
            <li>Only spousal support has tax treatment</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Priority Rule:</strong> If paying both child and spousal support, child support must be paid first. Only amounts over child support obligation are deductible spousal support.
            </p>
          </div>

          <h2>Third-Party Payments</h2>

          <h3>What Qualifies</h3>
          <p>Payments to third parties on behalf of recipient:</p>
          <ul>
            <li>Mortgage payments on recipient's home</li>
            <li>Medical/dental expenses</li>
            <li>Insurance premiums</li>
            <li>Must be specified in agreement</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>Agreement must specifically allow</li>
            <li>Recipient must consent in writing</li>
            <li>Payments must be periodic</li>
            <li>Not for property division</li>
          </ul>

          <h2>Interim Support</h2>

          <h3>Before Agreement Finalized</h3>
          <ul>
            <li>Court-ordered interim support is deductible</li>
            <li>Voluntary payments before order may not be</li>
            <li>Get written agreement or order quickly</li>
            <li>Can be retroactive in some cases</li>
          </ul>

          <h3>Retroactive Payments</h3>
          <ul>
            <li>May be deductible if ordered</li>
            <li>Claimed in year paid</li>
            <li>Recipient reports when received</li>
            <li>Can create large tax hit for recipient</li>
          </ul>

          <h2>Varying Support Amounts</h2>

          <h3>Step-Down Provisions</h3>
          <ul>
            <li>Decreasing amounts over time allowed</li>
            <li>Must be clearly stated in agreement</li>
            <li>Reasonable variation permitted</li>
          </ul>

          <h3>When Recipient Gets Job</h3>
          <ul>
            <li>May trigger review clause</li>
            <li>Changed amounts still deductible/taxable</li>
            <li>Document any modifications</li>
          </ul>

          <h2>Common-Law Relationships</h2>

          <h3>Same Rules Apply</h3>
          <ul>
            <li>Must be common-law partners (12+ months cohabiting)</li>
            <li>Or parents of a child together</li>
            <li>Written agreement still required</li>
            <li>Same tax treatment as married couples</li>
          </ul>

          <h3>Proving Relationship</h3>
          <ul>
            <li>Duration of cohabitation</li>
            <li>Shared finances</li>
            <li>Social recognition as couple</li>
            <li>Children together</li>
          </ul>

          <h2>Impact on Benefits</h2>

          <h3>For Recipient</h3>
          <ul>
            <li>Increases net income</li>
            <li>May reduce CCB</li>
            <li>May affect GST/HST credit</li>
            <li>Can trigger OAS clawback</li>
          </ul>

          <h3>For Payer</h3>
          <ul>
            <li>Reduces net income</li>
            <li>May increase CCB (if have children)</li>
            <li>May increase GST/HST credit</li>
            <li>Could reduce OAS clawback</li>
          </ul>

          <h2>Tax Planning Strategies</h2>

          <h3>Gross-Up Approach</h3>
          <ul>
            <li>Calculate recipient's after-tax needs</li>
            <li>Gross up for their tax bracket</li>
            <li>Payer still saves at their rate</li>
            <li>Often net benefit to both parties</li>
          </ul>

          <h3>Non-Taxable Alternatives</h3>
          <ul>
            <li>Property division (not taxable)</li>
            <li>Lump sum (not deductible/taxable)</li>
            <li>May suit some situations better</li>
            <li>Consider total financial picture</li>
          </ul>

          <h2>Reporting on Tax Return</h2>

          <h3>Payer Reports</h3>
          <ul>
            <li><strong>Line 22000:</strong> Support payments made</li>
            <li>Include recipient's name and SIN</li>
            <li>Keep agreement and payment records</li>
          </ul>

          <h3>Recipient Reports</h3>
          <ul>
            <li><strong>Line 12800:</strong> Support payments received</li>
            <li>Include payer's name</li>
            <li>Report actual amounts received</li>
          </ul>

          <h2>Disputes and Audits</h2>

          <h3>Common Issues</h3>
          <ul>
            <li>Amounts don't match between parties</li>
            <li>Missing documentation</li>
            <li>Lump sum vs periodic dispute</li>
            <li>Improper characterization</li>
          </ul>

          <h3>Protecting Yourself</h3>
          <ul>
            <li>Clear written agreement</li>
            <li>Bank records of payments</li>
            <li>Annual reconciliation with ex</li>
            <li>Legal advice on structure</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Support Payments?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about spousal support taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Separation agreements have significant tax and legal implications. Consult a family lawyer and tax professional when structuring support payments.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
