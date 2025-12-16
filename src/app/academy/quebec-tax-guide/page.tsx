import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Quebec Tax Guide 2024 | Provincial Tax Rates, QST & Revenu Québec',
  description: 'Complete Quebec tax guide. Learn about Quebec tax brackets, QST, Revenu Québec filing requirements, Solidarity Tax Credit, and unique Quebec deductions.',
  keywords: 'Quebec tax rates, Quebec tax brackets 2024, QST, Revenu Quebec, Quebec Solidarity Credit, Quebec tax return',
}

export default function QuebecTaxGuidePage() {
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
            Quebec Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Quebec: A Unique Tax System</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Quebec is the only province that administers its own income tax. You must file two separate returns—one federal (CRA) and one provincial (Revenu Québec). Quebec also has different deductions, credits, and its own sales tax (QST).
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Quebec Tax Brackets 2024</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $51,780</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>$51,780 to $103,545</td>
                <td>19%</td>
              </tr>
              <tr>
                <td>$103,545 to $126,000</td>
                <td>24%</td>
              </tr>
              <tr>
                <td>Over $126,000</td>
                <td>25.75%</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Quebec's highest marginal rate starts at $126,000 (vs. $235,675 federal). Combined federal-Quebec top rate is approximately 53.3%.
            </p>
          </div>

          <h2>Filing Two Tax Returns</h2>

          <h3>Federal Return (CRA)</h3>
          <ul>
            <li>Filed with Canada Revenue Agency</li>
            <li>Use T1 General form</li>
            <li>Federal credits and deductions</li>
            <li>Due April 30 (June 15 if self-employed)</li>
          </ul>

          <h3>Quebec Return (Revenu Québec)</h3>
          <ul>
            <li>Filed separately with Revenu Québec</li>
            <li>Use TP-1 form</li>
            <li>Quebec-specific credits and deductions</li>
            <li>Same due dates as federal</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Most tax software handles both returns together. Just be aware you're filing with two agencies and may receive separate assessments and refunds.
            </p>
          </div>

          <h2>Quebec Sales Tax (QST)</h2>
          <ul>
            <li><strong>Rate:</strong> 9.975%</li>
            <li><strong>Combined with 5% GST:</strong> 14.975% total</li>
            <li>Separate from GST (not harmonized)</li>
            <li>Some items exempt or zero-rated</li>
          </ul>

          <h3>QST vs HST</h3>
          <ul>
            <li>QST administered by Revenu Québec</li>
            <li>Different rules than HST provinces</li>
            <li>Businesses register separately for GST and QST</li>
          </ul>

          <h2>Key Quebec Tax Credits</h2>

          <h3>Solidarity Tax Credit</h3>
          <p>Major benefit for low and middle-income Quebecers:</p>
          <ul>
            <li>Combines three components</li>
            <li>QST credit component</li>
            <li>Housing component (renters or homeowners)</li>
            <li>Northern village component (if applicable)</li>
            <li>Paid monthly (advance)</li>
          </ul>

          <h4>Eligibility</h4>
          <ul>
            <li>Quebec resident on December 31</li>
            <li>Age 18+ (or emancipated minor)</li>
            <li>Must file TP-1 return</li>
            <li>Complete Schedule D</li>
          </ul>

          <h3>Quebec Family Allowance</h3>
          <ul>
            <li>Provincial benefit for families with children</li>
            <li>Up to $2,782 per child under 18</li>
            <li>Based on family income</li>
            <li>Paid quarterly by Retraite Québec</li>
          </ul>

          <h3>Work Premium</h3>
          <ul>
            <li>Similar to Canada Workers Benefit</li>
            <li>For low-income workers</li>
            <li>Up to $1,147 for single person</li>
            <li>Up to $2,036 for couples</li>
            <li>Can receive advance payments</li>
          </ul>

          <h3>Quebec Tax Shield</h3>
          <ul>
            <li>Reduces impact of increased work income</li>
            <li>Protects credits when income rises</li>
            <li>Covers Solidarity Credit, Work Premium, etc.</li>
          </ul>

          <h2>Quebec-Specific Deductions</h2>

          <h3>Quebec Pension Plan (QPP)</h3>
          <ul>
            <li>Quebec doesn't use CPP</li>
            <li>Similar contribution rates and benefits</li>
            <li>Contributions deductible</li>
            <li>QPP pensions taxable</li>
          </ul>

          <h3>Quebec Parental Insurance Plan (QPIP)</h3>
          <ul>
            <li>Separate from federal EI</li>
            <li>Higher benefits than EI maternity/parental</li>
            <li>Premiums deductible</li>
            <li>Benefits taxable</li>
          </ul>

          <h3>Union and Professional Dues</h3>
          <ul>
            <li>Deductible at Quebec level</li>
            <li>Professional order dues</li>
            <li>Union membership fees</li>
          </ul>

          <h2>Different Federal Treatment</h2>
          <p>Quebec residents have special federal treatment:</p>

          <h3>Quebec Abatement</h3>
          <ul>
            <li>16.5% reduction in federal tax</li>
            <li>Compensates for Quebec collecting own tax</li>
            <li>Automatic—no need to claim</li>
          </ul>

          <h3>Transfer of Credits</h3>
          <ul>
            <li>Some federal credits reduced</li>
            <li>Quebec has corresponding provincial credits</li>
            <li>Overall similar benefits</li>
          </ul>

          <h2>Instalment Requirements</h2>
          <p>Quebec has different thresholds:</p>
          <ul>
            <li><strong>Federal:</strong> $3,000 net tax owing</li>
            <li><strong>Quebec:</strong> $1,800 net tax owing</li>
            <li>May need instalments for one, both, or neither</li>
            <li>Separate payments to CRA and Revenu Québec</li>
          </ul>

          <h2>Property Taxes and Credits</h2>

          <h3>Welcome Tax (Droits de mutation)</h3>
          <p>Quebec's land transfer tax:</p>
          <ul>
            <li>0.5% on first $58,900</li>
            <li>1% on $58,900 to $294,600</li>
            <li>1.5% on $294,600 to $500,000</li>
            <li>2% on amounts over $500,000</li>
            <li>Montreal adds additional 0.5-1.5%</li>
          </ul>

          <h3>Property Tax Credit</h3>
          <ul>
            <li>Part of Solidarity Tax Credit</li>
            <li>For homeowners and renters</li>
            <li>Based on municipal taxes or rent paid</li>
          </ul>

          <h2>Childcare in Quebec</h2>

          <h3>Subsidized Daycare ($8.70/day)</h3>
          <ul>
            <li>Low-cost regulated childcare</li>
            <li>Waiting lists common</li>
            <li>Not eligible for federal childcare deduction</li>
          </ul>

          <h3>Non-Subsidized Childcare</h3>
          <ul>
            <li>Quebec refundable tax credit available</li>
            <li>Up to 78% of expenses for lowest incomes</li>
            <li>Also claim federal deduction</li>
          </ul>

          <h2>Quebec Health Contribution</h2>
          <ul>
            <li>Previously required</li>
            <li>Eliminated as of 2019</li>
            <li>No longer payable</li>
          </ul>

          <h2>Business Taxes in Quebec</h2>

          <h3>Corporate Income Tax</h3>
          <ul>
            <li><strong>General rate:</strong> 11.5%</li>
            <li><strong>Small business rate:</strong> 3.2%</li>
            <li>Combined with federal: Higher than most provinces</li>
          </ul>

          <h3>QST Registration</h3>
          <ul>
            <li>Separate from GST registration</li>
            <li>Required if Quebec sales over $30,000</li>
            <li>Collect and remit QST separately</li>
          </ul>

          <h2>Tax Planning for Quebecers</h2>

          <h3>Maximize Both Returns</h3>
          <ul>
            <li>Some deductions only on Quebec return</li>
            <li>Some only on federal return</li>
            <li>Review both carefully</li>
          </ul>

          <h3>RRSP Strategy</h3>
          <ul>
            <li>Higher provincial rates = more RRSP value</li>
            <li>Deduction applies to both returns</li>
            <li>Consider timing contributions strategically</li>
          </ul>

          <h3>Solidarity Credit Optimization</h3>
          <ul>
            <li>File Schedule D every year</li>
            <li>Update housing information</li>
            <li>Report changes to Revenu Québec</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Quebec Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about Quebec provincial taxes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Quebec tax rules are complex. Verify current rates and rules with Revenu Québec for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
