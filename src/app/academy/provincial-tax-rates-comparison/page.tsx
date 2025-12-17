import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, TrendingUp, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Provincial Tax Rates Comparison Canada 2024 | All Provinces',
  description: 'Compare provincial income tax rates across Canada. See tax brackets for all provinces and territories, combined federal-provincial rates, and find the lowest tax province.',
  keywords: 'provincial tax rates Canada 2024, compare provincial tax brackets, lowest tax province Canada, combined tax rates by province',
}

export default function ProvincialTaxRatesComparisonPage() {
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
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Provincial Tax Rates Comparison
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-green-900 dark:text-green-100 mb-3">Where You Live Matters</h2>
          <p className="text-green-700 dark:text-green-300 text-sm">
            Provincial tax rates vary significantly across Canada. The difference between the lowest and highest tax provinces can mean tens of thousands of dollars in taxes on the same income. Understanding these differences helps with financial planning.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Federal Tax Brackets 2024</h2>
          <p>All Canadians pay the same federal tax:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Federal Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $55,867</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>$55,867 to $111,733</td>
                <td>20.5%</td>
              </tr>
              <tr>
                <td>$111,733 to $173,205</td>
                <td>26%</td>
              </tr>
              <tr>
                <td>$173,205 to $246,752</td>
                <td>29%</td>
              </tr>
              <tr>
                <td>Over $246,752</td>
                <td>33%</td>
              </tr>
            </tbody>
          </table>

          <h2>Provincial Tax Rate Summary</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Lowest Rate</th>
                <th>Highest Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>10%</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>British Columbia</td>
                <td>5.06%</td>
                <td>20.5%</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>10.5%</td>
                <td>14.5%</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>10.8%</td>
                <td>17.4%</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>5.05%</td>
                <td>13.16%</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>14%</td>
                <td>25.75%</td>
              </tr>
              <tr>
                <td>New Brunswick</td>
                <td>9.4%</td>
                <td>19.5%</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>8.79%</td>
                <td>21%</td>
              </tr>
              <tr>
                <td>PEI</td>
                <td>9.65%</td>
                <td>18.75%</td>
              </tr>
              <tr>
                <td>Newfoundland</td>
                <td>8.7%</td>
                <td>21.8%</td>
              </tr>
            </tbody>
          </table>

          <h2>Combined Top Marginal Rates 2024</h2>
          <p>Federal + provincial rates on highest incomes:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Top Rate</th>
                <th>Starts At</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Newfoundland</td>
                <td>54.8%</td>
                <td>$1,103,478</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>54%</td>
                <td>$150,000</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>53.31%</td>
                <td>$126,000</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>53.5%</td>
                <td>$252,752</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>53.53%</td>
                <td>$220,000</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>50.4%</td>
                <td>$100,000+</td>
              </tr>
              <tr>
                <td>New Brunswick</td>
                <td>52.5%</td>
                <td>$185,064</td>
              </tr>
              <tr>
                <td>PEI</td>
                <td>51.75%</td>
                <td>$140,000+</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>47.5%</td>
                <td>$148,734</td>
              </tr>
              <tr>
                <td>Alberta</td>
                <td>48%</td>
                <td>$355,845</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Lowest Tax Burden:</strong> Alberta and Saskatchewan consistently have the lowest combined tax rates, especially for middle and high-income earners. Alberta's flat 10% rate up to $148,269 is particularly advantageous.
            </p>
          </div>

          <h2>Tax at Different Income Levels</h2>

          <h3>$50,000 Income</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Provincial Tax</th>
                <th>Total Tax*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>$3,350</td>
                <td>$8,850</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>$2,270</td>
                <td>$7,770</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>$2,360</td>
                <td>$7,860</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>$5,900</td>
                <td>$11,400</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>$3,660</td>
                <td>$9,160</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm">*Approximate, before credits</p>

          <h3>$100,000 Income</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Provincial Tax</th>
                <th>Total Tax*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>$8,500</td>
                <td>$23,500</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>$6,880</td>
                <td>$21,880</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>$6,420</td>
                <td>$21,420</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>$14,300</td>
                <td>$29,300</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>$9,800</td>
                <td>$24,800</td>
              </tr>
            </tbody>
          </table>

          <h3>$200,000 Income</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Provincial Tax</th>
                <th>Total Tax*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>$21,800</td>
                <td>$61,800</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>$22,900</td>
                <td>$62,900</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>$24,400</td>
                <td>$64,400</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>$38,100</td>
                <td>$78,100</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>$31,800</td>
                <td>$71,800</td>
              </tr>
            </tbody>
          </table>

          <h2>Territories Tax Rates</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Territory</th>
                <th>Lowest Rate</th>
                <th>Highest Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Yukon</td>
                <td>6.4%</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>NWT</td>
                <td>5.9%</td>
                <td>14.05%</td>
              </tr>
              <tr>
                <td>Nunavut</td>
                <td>4%</td>
                <td>11.5%</td>
              </tr>
            </tbody>
          </table>
          <p>Territories generally have lower rates, plus Northern Residents Deduction benefits.</p>

          <h2>Provincial Sales Tax Impact</h2>
          <p>Total tax burden includes sales taxes:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Sales Tax</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Alberta</td>
                <td>5%</td>
                <td>GST only</td>
              </tr>
              <tr>
                <td>Saskatchewan</td>
                <td>11%</td>
                <td>GST + PST</td>
              </tr>
              <tr>
                <td>Manitoba</td>
                <td>12%</td>
                <td>GST + PST</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>13%</td>
                <td>HST</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>12%</td>
                <td>GST + PST</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>14.975%</td>
                <td>GST + QST</td>
              </tr>
              <tr>
                <td>Atlantic</td>
                <td>15%</td>
                <td>HST</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Total Tax Picture:</strong> Alberta's advantage increases when you include sales tax. With no PST and lower income taxes, Albertans keep significantly more of their income.
            </p>
          </div>

          <h2>Factors Beyond Tax Rates</h2>

          <h3>Consider Total Benefits</h3>
          <ul>
            <li>Quebec's higher taxes fund $8.70/day daycare</li>
            <li>Provincial health coverage varies</li>
            <li>Education funding and availability</li>
            <li>Public transit subsidies</li>
          </ul>

          <h3>Cost of Living</h3>
          <ul>
            <li>Housing costs vary dramatically</li>
            <li>Lower tax provinces may have higher other costs</li>
            <li>Remote/northern areas have additional benefits</li>
          </ul>

          <h2>Tax Planning Implications</h2>

          <h3>Moving Between Provinces</h3>
          <ul>
            <li>Provincial tax based on December 31 residence</li>
            <li>Moving mid-year = new province's rates for whole year</li>
            <li>Capital gains timing around moves matters</li>
          </ul>

          <h3>Income Splitting Value</h3>
          <ul>
            <li>More valuable in high-tax provinces</li>
            <li>Quebec benefit significant due to high rates</li>
            <li>Less benefit in Alberta's flat-rate system</li>
          </ul>

          <h3>RRSP Deduction Value</h3>
          <ul>
            <li>Deduction worth more in high-tax provinces</li>
            <li>Quebec: ~40%+ combined marginal rate for many</li>
            <li>Alberta: Often 25% combined rate</li>
          </ul>

          <h2>Provincial Surtaxes</h2>
          <p>Some provinces add surtaxes:</p>
          <ul>
            <li><strong>Ontario:</strong> 20% on provincial tax over $5,554, additional 36% over $7,108</li>
            <li><strong>PEI:</strong> 10% surtax on provincial tax over $12,500</li>
          </ul>

          <h2>Health Premiums</h2>
          <ul>
            <li><strong>Ontario:</strong> Health Premium up to $900/year</li>
            <li><strong>BC:</strong> Employer Health Tax (no individual premium)</li>
            <li><strong>Quebec:</strong> RAMQ (no premium)</li>
            <li><strong>Alberta:</strong> No health premium</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Provincial Tax Rates?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help calculate your taxes in different provinces.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Tax rates and brackets are subject to change. Verify current rates with provincial governments.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
