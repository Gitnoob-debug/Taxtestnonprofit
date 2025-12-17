import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, BarChart3, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Provincial Tax Credits Comparison Canada 2024 | All Provinces',
  description: 'Compare provincial tax credits across Canada. See which benefits you qualify for in each province, from climate credits to family benefits to senior credits.',
  keywords: 'provincial tax credits Canada, compare provincial benefits, provincial tax rebates, Canada provincial tax credits comparison',
}

export default function ProvincialTaxCreditsComparisonPage() {
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
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Provincial Tax Credits Comparison
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />15 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Provincial Benefits Vary Widely</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Beyond the universal federal benefits, each province offers unique tax credits and benefits. Understanding what's available in your province can result in hundreds or thousands of dollars in additional benefits.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Climate/Carbon Tax Credits</h2>
          <p>Credits to offset carbon pricing, paid quarterly:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Credit Name</th>
                <th>Max Amount (Family of 4)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ontario</td>
                <td>Climate Action Incentive</td>
                <td>~$1,120/year</td>
              </tr>
              <tr>
                <td>Alberta</td>
                <td>Climate Action Incentive</td>
                <td>~$1,544/year</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>Climate Action Incentive</td>
                <td>~$1,504/year</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>Climate Action Incentive</td>
                <td>~$1,200/year</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>BC Climate Action Tax Credit</td>
                <td>~$1,260/year</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>(Part of Solidarity Credit)</td>
                <td>Varies</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Rural residents receive an additional 10-20% supplement on climate credits. Make sure your address is current with CRA.
            </p>
          </div>

          <h2>Family Benefits by Province</h2>
          <p>Provincial child/family benefits (in addition to Canada Child Benefit):</p>

          <h3>Ontario</h3>
          <ul>
            <li><strong>Ontario Child Benefit:</strong> Up to $1,607/child (combined with CCB payments)</li>
            <li><strong>CARE Credit:</strong> Up to 75% of childcare expenses</li>
          </ul>

          <h3>Quebec</h3>
          <ul>
            <li><strong>Family Allowance:</strong> Up to $2,782/child</li>
            <li><strong>Childcare Credit:</strong> Up to 78% of expenses</li>
            <li><strong>$8.70/day subsidized daycare</strong></li>
          </ul>

          <h3>British Columbia</h3>
          <ul>
            <li><strong>BC Family Benefit:</strong> Up to $1,750/child</li>
            <li><strong>BC Early Childhood Tax Benefit:</strong> Up to $55/month (children under 6)</li>
          </ul>

          <h3>Alberta</h3>
          <ul>
            <li><strong>Alberta Child and Family Benefit:</strong> Up to $1,469/child + working component</li>
          </ul>

          <h3>Saskatchewan</h3>
          <ul>
            <li><strong>Saskatchewan Low-Income Tax Credit:</strong> Family component available</li>
          </ul>

          <h3>Manitoba</h3>
          <ul>
            <li><strong>Manitoba Child Benefit:</strong> Integrated with CCB</li>
          </ul>

          <h3>Atlantic Provinces</h3>
          <ul>
            <li><strong>Nova Scotia:</strong> NS Child Benefit, Affordable Living Tax Credit</li>
            <li><strong>New Brunswick:</strong> NB Child Tax Benefit</li>
            <li><strong>PEI:</strong> PEI Sales Tax Credit</li>
            <li><strong>Newfoundland:</strong> NL Child Benefit, Mother Baby Nutrition Supplement</li>
          </ul>

          <h2>Low-Income/Working Tax Credits</h2>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Credit Name</th>
                <th>Maximum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ontario</td>
                <td>LIFT Credit</td>
                <td>$875</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>Work Premium</td>
                <td>$1,147-$2,036</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>BC Tax Reduction</td>
                <td>Varies</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>Primary Caregiver Tax Credit</td>
                <td>$1,400</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>Low-Income Tax Credit</td>
                <td>$358/adult</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>Affordable Living Tax Credit</td>
                <td>$255/adult</td>
              </tr>
            </tbody>
          </table>

          <h2>Senior-Specific Credits</h2>

          <h3>Age Amount (Provincial)</h3>
          <p>Most provinces offer an age amount similar to federal:</p>
          <ul>
            <li><strong>Ontario:</strong> Up to $5,799</li>
            <li><strong>BC:</strong> Up to $5,870</li>
            <li><strong>Alberta:</strong> Up to $6,350</li>
            <li><strong>Quebec:</strong> Up to $3,751</li>
          </ul>

          <h3>Senior-Specific Benefits</h3>
          <ul>
            <li><strong>Ontario:</strong> Seniors' Public Transit Tax Credit (15%)</li>
            <li><strong>BC:</strong> BC Senior's Supplement, Shelter Aid for Elderly Renters</li>
            <li><strong>Alberta:</strong> Alberta Seniors Benefit</li>
            <li><strong>Manitoba:</strong> Education Property Tax Credit (enhanced for seniors)</li>
            <li><strong>Saskatchewan:</strong> Senior Citizens' Heritage Grant</li>
          </ul>

          <h2>Housing and Property Credits</h2>

          <h3>Renters</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Credit</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ontario</td>
                <td>OTB - Property Component</td>
                <td>Based on rent paid</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>Solidarity Credit</td>
                <td>Housing component</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>Renter's Tax Credit</td>
                <td>Up to $400</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>Renters Tax Credit</td>
                <td>Based on rent paid</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>Low-Income Credit</td>
                <td>Housing component</td>
              </tr>
            </tbody>
          </table>

          <h3>Homeowners</h3>
          <ul>
            <li><strong>Ontario:</strong> Property tax component of OTB</li>
            <li><strong>Manitoba:</strong> Education Property Tax Credit (up to $700)</li>
            <li><strong>Saskatchewan:</strong> Property tax reduction programs</li>
            <li><strong>Quebec:</strong> Property component of Solidarity Credit</li>
          </ul>

          <h2>Education Credits</h2>

          <h3>Tuition Credits</h3>
          <ul>
            <li><strong>Ontario:</strong> 5.05% tuition credit</li>
            <li><strong>Quebec:</strong> 8% tuition credit, different transfer rules</li>
            <li><strong>Most provinces:</strong> Provincial tuition credits at lowest bracket rate</li>
          </ul>

          <h3>Student Loan Interest</h3>
          <ul>
            <li>Provincial credits generally mirror federal</li>
            <li>Quebec administers own student loans</li>
          </ul>

          <h2>Disability and Medical Credits</h2>

          <h3>Provincial Disability Credits</h3>
          <ul>
            <li>Most provinces offer disability amount parallel to federal</li>
            <li>Amounts vary by province</li>
            <li>Must qualify for federal DTC to claim provincial</li>
          </ul>

          <h3>Medical Expense Credits</h3>
          <ul>
            <li>All provinces offer medical expense credit</li>
            <li>Thresholds and rates vary</li>
            <li>Quebec has refundable component</li>
          </ul>

          <h2>Political Contribution Credits</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Maximum Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ontario</td>
                <td>$1,509</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>No provincial credit</td>
              </tr>
              <tr>
                <td>Alberta</td>
                <td>$1,000</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>$605</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>$1,000</td>
              </tr>
            </tbody>
          </table>

          <h2>Sales Tax Credits</h2>
          <p>Provinces with separate sales tax credits:</p>
          <ul>
            <li><strong>Ontario:</strong> Sales Tax Credit (part of OTB) - up to $360</li>
            <li><strong>Quebec:</strong> QST Credit (part of Solidarity Credit)</li>
            <li><strong>Saskatchewan:</strong> Low-Income Tax Credit includes sales component</li>
            <li><strong>PEI:</strong> Sales Tax Credit</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Remember:</strong> GST/HST Credit is federal and available to all Canadians regardless of province. Provincial sales tax credits are additional benefits.
            </p>
          </div>

          <h2>Northern and Remote Area Benefits</h2>
          <ul>
            <li><strong>Ontario:</strong> Northern Ontario Energy Credit (up to $180)</li>
            <li><strong>Quebec:</strong> Northern Village component of Solidarity Credit</li>
            <li><strong>BC:</strong> Enhanced climate credit for rural/northern</li>
            <li><strong>Federal:</strong> Northern Residents Deduction (all provinces)</li>
          </ul>

          <h2>How to Claim Provincial Credits</h2>

          <h3>Automatic Credits</h3>
          <ul>
            <li>Most provincial credits calculated automatically</li>
            <li>File tax return to receive benefits</li>
            <li>Climate credits paid quarterly</li>
          </ul>

          <h3>Application Required</h3>
          <ul>
            <li>Some benefits require separate applications</li>
            <li>Quebec Solidarity Credit requires Schedule D</li>
            <li>Specific disability/shelter programs may need applications</li>
          </ul>

          <h2>Moving Between Provinces</h2>
          <ul>
            <li>Provincial credits based on December 31 residence</li>
            <li>Moving mid-year affects which province's credits you receive</li>
            <li>May need to return advance payments if you move</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Provincial Credits?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about credits in your province.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Provincial credits and amounts change frequently. Verify current amounts with your provincial government.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
