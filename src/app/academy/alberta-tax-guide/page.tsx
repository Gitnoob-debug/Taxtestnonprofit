import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Alberta Tax Guide 2024 | Provincial Tax Rates & Benefits',
  description: 'Complete Alberta tax guide. Learn about Alberta tax brackets, Alberta Child and Family Benefit, no PST advantage, and why Alberta is Canada\'s lowest tax province.',
  keywords: 'Alberta tax rates, Alberta tax brackets 2024, Alberta no PST, Alberta Child Benefit, lowest tax province Canada',
}

export default function AlbertaTaxGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 dark:bg-amber-900 p-2.5 rounded-xl">
              <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Alberta Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Alberta Tax Advantage</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Alberta has no provincial sales tax (PST), flat 10% income tax for most earners, and no health premium. This makes Alberta one of the lowest-taxed provinces in Canada, especially for middle and high-income earners.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Alberta Tax Brackets 2024</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $148,269</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>$148,269 to $177,922</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>$177,922 to $237,230</td>
                <td>13%</td>
              </tr>
              <tr>
                <td>$237,230 to $355,845</td>
                <td>14%</td>
              </tr>
              <tr>
                <td>Over $355,845</td>
                <td>15%</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Advantage:</strong> Alberta's flat 10% rate applies to the first $148,269 of income—significantly higher than other provinces' lowest brackets. This saves thousands compared to provinces with tiered rates.
            </p>
          </div>

          <h2>No Provincial Sales Tax</h2>
          <p>Alberta is one of the few provinces with no PST:</p>
          <ul>
            <li>Only pay 5% federal GST</li>
            <li>Compare to 13% HST in Ontario</li>
            <li>Saves thousands on major purchases</li>
            <li>Competitive advantage for businesses</li>
          </ul>

          <h3>Annual Savings Estimate</h3>
          <p>For a household spending $50,000/year on taxable goods:</p>
          <ul>
            <li><strong>Alberta:</strong> $2,500 GST only</li>
            <li><strong>Ontario:</strong> $6,500 HST</li>
            <li><strong>Savings:</strong> $4,000/year</li>
          </ul>

          <h2>Key Alberta Tax Credits</h2>

          <h3>Alberta Child and Family Benefit (ACFB)</h3>
          <p>Provincial benefit for families with children:</p>
          <ul>
            <li>Up to $1,469 per child under 18</li>
            <li>Additional amounts for children under 6</li>
            <li>Based on family net income</li>
            <li>Paid quarterly with CCB</li>
          </ul>

          <h4>Working Component</h4>
          <ul>
            <li>Additional amount for working families</li>
            <li>Up to $734 for 1 child</li>
            <li>Up to $1,100 for 2+ children</li>
            <li>Requires employment income</li>
          </ul>

          <h3>Alberta Climate Leadership Adjustment</h3>
          <ul>
            <li>Replaced by federal carbon rebate</li>
            <li>Alberta receives Climate Action Incentive</li>
            <li>Paid quarterly to offset carbon tax</li>
          </ul>

          <h3>Alberta Family Employment Tax Credit</h3>
          <ul>
            <li>For working families with children</li>
            <li>Non-refundable credit</li>
            <li>Phases out at higher incomes</li>
          </ul>

          <h2>No Health Premium</h2>
          <p>Unlike Ontario and BC:</p>
          <ul>
            <li>No Alberta Health Care Insurance Premium</li>
            <li>Healthcare funded through general revenue</li>
            <li>Saves residents hundreds annually</li>
          </ul>

          <h2>Alberta Land Transfer Considerations</h2>
          <p>Alberta handles property differently:</p>
          <ul>
            <li>No land transfer tax like Ontario/BC</li>
            <li>Registration fee of approximately 0.02%</li>
            <li>Mortgage registration fee of approximately 0.01%</li>
            <li>Much lower than other provinces</li>
          </ul>

          <h3>Example Comparison (on $500,000 home)</h3>
          <ul>
            <li><strong>Alberta:</strong> ~$200 in fees</li>
            <li><strong>Ontario:</strong> ~$6,475 land transfer tax</li>
            <li><strong>BC:</strong> ~$8,000 property transfer tax</li>
          </ul>

          <h2>Alberta Carbon Tax</h2>
          <p>Federal carbon pricing applies:</p>
          <ul>
            <li>Currently $65 per tonne</li>
            <li>Included in fuel prices</li>
            <li>Climate Action Incentive rebate helps offset</li>
            <li>Alberta receives rural supplement</li>
          </ul>

          <h2>Business Tax Advantages</h2>

          <h3>Corporate Income Tax</h3>
          <ul>
            <li><strong>General rate:</strong> 8% (lowest in Canada)</li>
            <li><strong>Small business rate:</strong> 2%</li>
            <li><strong>Small business limit:</strong> $500,000</li>
            <li>Combined with federal: 23% general, 11% small business</li>
          </ul>

          <h3>No PST on Business Inputs</h3>
          <ul>
            <li>Equipment purchases tax-free (except GST)</li>
            <li>Office supplies without PST</li>
            <li>Significant savings for businesses</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Business Owners:</strong> Alberta's 2% small business rate is the lowest in Canada. Combined with no PST and low personal rates, Alberta is highly attractive for entrepreneurs.
            </p>
          </div>

          <h2>Alberta-Specific Tax Considerations</h2>

          <h3>Oil & Gas Industry</h3>
          <ul>
            <li>Flow-through shares common</li>
            <li>Specific deductions for energy sector</li>
            <li>Resource allowances</li>
          </ul>

          <h3>Agricultural Tax Benefits</h3>
          <ul>
            <li>Farm property exemptions</li>
            <li>Livestock tax deferral</li>
            <li>Capital gains exemption for qualified farm property</li>
          </ul>

          <h2>Comparison to Other Provinces</h2>

          <h3>Total Tax Burden (Income + Sales)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>$75K Income</th>
                <th>$150K Income</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>Lowest</td>
                <td>Lowest</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>Middle</td>
                <td>High</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>Middle</td>
                <td>Highest</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>Highest</td>
                <td>Highest</td>
              </tr>
            </tbody>
          </table>

          <h2>Tax Planning for Albertans</h2>

          <h3>Maximize Federal Credits</h3>
          <ul>
            <li>RRSP contributions (deduction at 10%+ provincial rate)</li>
            <li>TFSA for tax-free growth</li>
            <li>Claim all eligible deductions</li>
          </ul>

          <h3>Income Splitting</h3>
          <ul>
            <li>Less valuable than high-tax provinces</li>
            <li>Still beneficial for federal tax</li>
            <li>Pension splitting at 65+</li>
          </ul>

          <h3>Investment Strategies</h3>
          <ul>
            <li>Capital gains taxed at half inclusion rate</li>
            <li>Dividend tax credit calculations</li>
            <li>Consider provincial differences if relocating</li>
          </ul>

          <h2>Moving to Alberta</h2>
          <p>Tax considerations when relocating:</p>
          <ul>
            <li>Provincial residence determined on December 31</li>
            <li>Immediate PST savings on purchases</li>
            <li>Lower vehicle registration costs</li>
            <li>Consider timing of move for tax year</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Alberta Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about Alberta provincial taxes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Tax rates and benefits are subject to change. Verify current rates with the Alberta government.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
