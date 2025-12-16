import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Leaf, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Climate Action Incentive Payment (CAIP) 2024 | Canada Carbon Tax Rebate',
  description: 'Complete guide to the Climate Action Incentive Payment. Learn who qualifies, payment amounts by province, rural supplement, and how to receive your carbon rebate.',
  keywords: 'Climate Action Incentive Payment, CAIP 2024, carbon tax rebate Canada, CAI payment dates, rural supplement',
}

export default function ClimateActionIncentivePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-2.5 rounded-xl">
              <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Climate Action Incentive Payment (CAIP)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />6 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 dark:text-green-100 mb-3">Carbon Tax Rebate</h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            The CAIP is a tax-free quarterly payment that helps offset the cost of federal carbon pricing. Most Canadian families receive more in CAIP than they pay in carbon taxes.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Which Provinces Receive CAIP?</h2>
          <p>CAIP is paid to residents of provinces where the federal carbon levy applies:</p>
          <ul>
            <li>Alberta</li>
            <li>Saskatchewan</li>
            <li>Manitoba</li>
            <li>Ontario</li>
            <li>New Brunswick</li>
            <li>Nova Scotia</li>
            <li>Prince Edward Island</li>
            <li>Newfoundland and Labrador</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Note:</strong> British Columbia and Quebec have their own carbon pricing systems and don't receive federal CAIP. The territories also have separate arrangements.
            </p>
          </div>

          <h2>2024-2025 Payment Amounts</h2>
          <p>Annual amounts (paid quarterly) for July 2024 - June 2025:</p>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Single</th>
                <th>Couple</th>
                <th>Per Child</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>$450</td>
                <td>$675</td>
                <td>$112.50</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>$376</td>
                <td>$564</td>
                <td>$94</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>$300</td>
                <td>$450</td>
                <td>$75</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>$280</td>
                <td>$420</td>
                <td>$70</td>
              </tr>
              <tr>
                <td>New Brunswick</td>
                <td>$190</td>
                <td>$285</td>
                <td>$47.50</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>$206</td>
                <td>$309</td>
                <td>$51.50</td>
              </tr>
              <tr>
                <td>PEI</td>
                <td>$220</td>
                <td>$330</td>
                <td>$55</td>
              </tr>
              <tr>
                <td>Newfoundland</td>
                <td>$298</td>
                <td>$447</td>
                <td>$74.50</td>
              </tr>
            </tbody>
          </table>

          <h2>Rural Supplement</h2>
          <p>Residents of rural and small communities receive a 20% supplement on their CAIP:</p>
          <ul>
            <li>Recognizes limited access to public transit and green alternatives</li>
            <li>Based on your address from tax return</li>
            <li>CRA determines eligibility automatically</li>
          </ul>

          <h3>What Qualifies as "Rural"?</h3>
          <p>Generally, areas outside census metropolitan areas (CMAs) with populations under 100,000. CRA uses postal codes to determine eligibility.</p>

          <h2>Eligibility Requirements</h2>
          <p>To receive CAIP, you must:</p>
          <ul>
            <li>Be a Canadian resident</li>
            <li>Live in an eligible province on the first day of the payment month</li>
            <li>File a tax return (even if you have no income)</li>
            <li>Be 19 years old or older, OR have a spouse/common-law partner, OR be a parent</li>
          </ul>

          <h2>Payment Schedule</h2>
          <p>CAIP is paid quarterly:</p>
          <ul>
            <li><strong>April 15</strong></li>
            <li><strong>July 15</strong></li>
            <li><strong>October 15</strong></li>
            <li><strong>January 15</strong></li>
          </ul>
          <p>If the 15th falls on a weekend or holiday, payment is made the last business day before.</p>

          <h2>How Payments Are Calculated</h2>

          <h3>Family Structure</h3>
          <ul>
            <li><strong>Single:</strong> Full individual amount</li>
            <li><strong>Couple:</strong> Individual amount + 50% spouse amount</li>
            <li><strong>Children under 19:</strong> Additional amount per child</li>
            <li><strong>Single parent:</strong> First child receives spouse equivalent amount</li>
          </ul>

          <h3>Example Family</h3>
          <p>Ontario family with 2 children (urban):</p>
          <ul>
            <li>Base: $280</li>
            <li>Spouse: $140</li>
            <li>2 children: $140</li>
            <li><strong>Annual total: $560 ($140/quarter)</strong></li>
          </ul>

          <h2>No Application Required</h2>
          <p>You don't need to apply for CAIP specifically:</p>
          <ul>
            <li>File your tax return on time</li>
            <li>Register for direct deposit with CRA for faster payment</li>
            <li>Keep address updated with CRA</li>
            <li>CRA calculates and sends payments automatically</li>
          </ul>

          <h2>Changes in Circumstances</h2>

          <h3>Moving Provinces</h3>
          <p>If you move between eligible provinces, your CAIP amount adjusts for future payments based on your new province of residence.</p>

          <h3>New Child</h3>
          <p>Register the birth of a child with CRA (through Canada Child Benefit application) to receive the additional amount.</p>

          <h3>Relationship Changes</h3>
          <p>Notify CRA of changes in marital status to ensure correct payment calculations.</p>

          <h2>Tax Treatment</h2>
          <ul>
            <li><strong>Not taxable:</strong> CAIP is tax-free income</li>
            <li><strong>No clawback:</strong> Not reduced by higher income</li>
            <li><strong>Not included:</strong> Doesn't affect other benefit calculations</li>
          </ul>

          <h2>Common Questions</h2>

          <h3>Why is my payment different than expected?</h3>
          <ul>
            <li>Province of residence changed</li>
            <li>Rural status changed based on address</li>
            <li>Family composition changed</li>
            <li>Late tax filing delayed payment</li>
          </ul>

          <h3>I didn't receive my payment. What should I do?</h3>
          <ul>
            <li>Confirm you filed your tax return</li>
            <li>Check address with CRA is current</li>
            <li>Wait 10 business days after payment date</li>
            <li>Contact CRA if still not received</li>
          </ul>

          <h3>Do newcomers receive CAIP?</h3>
          <p>Yes, once you become a resident and file a Canadian tax return. You may need to complete Form RC151 to apply for benefits.</p>

          <h2>CAIP vs. Carbon Tax Costs</h2>
          <p>Studies show that 8 out of 10 Canadian households receive more from CAIP than they pay in carbon costs:</p>
          <ul>
            <li>Lower and middle-income families benefit most</li>
            <li>Higher-consuming households may pay more than they receive</li>
            <li>The system redistributes from higher to lower emitters</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CAIP?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about Climate Action Incentive Payments.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CAIP amounts change annually and vary by province. This guide uses 2024-2025 figures. Check CRA's website for current amounts.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
