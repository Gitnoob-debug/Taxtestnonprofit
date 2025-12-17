import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ontario Tax Guide 2024 | Provincial Tax Rates & Credits',
  description: 'Complete Ontario tax guide. Learn about Ontario tax brackets, provincial credits like Trillium Benefit, LIFT credit, and how to maximize your Ontario tax refund.',
  keywords: 'Ontario tax rates, Ontario tax brackets 2024, Ontario Trillium Benefit, LIFT credit Ontario, Ontario tax credits',
}

export default function OntarioTaxGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-2.5 rounded-xl">
              <MapPin className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Ontario Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Ontario Tax at a Glance</h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            Ontario has a progressive tax system with rates from 5.05% to 13.16%. Combined with federal tax, Ontario residents pay some of the highest marginal rates in Canada, but also have access to several unique provincial credits.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Ontario Tax Brackets 2024</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $51,446</td>
                <td>5.05%</td>
              </tr>
              <tr>
                <td>$51,446 to $102,894</td>
                <td>9.15%</td>
              </tr>
              <tr>
                <td>$102,894 to $150,000</td>
                <td>11.16%</td>
              </tr>
              <tr>
                <td>$150,000 to $220,000</td>
                <td>12.16%</td>
              </tr>
              <tr>
                <td>Over $220,000</td>
                <td>13.16%</td>
              </tr>
            </tbody>
          </table>

          <h2>Ontario Surtax</h2>
          <p>Ontario adds a surtax on top of provincial tax:</p>
          <ul>
            <li><strong>20%</strong> on provincial tax over $5,554</li>
            <li><strong>Additional 36%</strong> on provincial tax over $7,108</li>
          </ul>
          <p>This increases effective rates at higher incomes.</p>

          <h2>Key Ontario Tax Credits</h2>

          <h3>Ontario Trillium Benefit (OTB)</h3>
          <p>Combines three credits into monthly payments:</p>
          <ul>
            <li><strong>Ontario Energy and Property Tax Credit:</strong> Up to $1,248</li>
            <li><strong>Northern Ontario Energy Credit:</strong> Up to $180</li>
            <li><strong>Ontario Sales Tax Credit:</strong> Up to $360</li>
          </ul>

          <h4>Eligibility</h4>
          <ul>
            <li>Must be Ontario resident</li>
            <li>File tax return (even with no income)</li>
            <li>Age 18+ for energy/property credit</li>
            <li>Income-tested (phases out at higher incomes)</li>
          </ul>

          <h3>Low-Income Individuals and Families Tax (LIFT) Credit</h3>
          <ul>
            <li>Reduces Ontario tax for low-income workers</li>
            <li>Up to $875 for individuals</li>
            <li>Must have employment income</li>
            <li>Phases out starting at $32,500 individual income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> LIFT can eliminate Ontario tax entirely for workers earning under $30,000. It's automatically calculated when you file—no application needed.
            </p>
          </div>

          <h3>Ontario Childcare Access and Relief from Expenses (CARE) Tax Credit</h3>
          <ul>
            <li>Refundable credit for childcare expenses</li>
            <li>Based on family income</li>
            <li>Covers children under 7, or under 18 with disability</li>
            <li>Up to 75% of expenses for lowest incomes</li>
          </ul>

          <h3>Ontario Seniors' Public Transit Tax Credit</h3>
          <ul>
            <li>Refundable credit for ages 65+</li>
            <li>15% of transit costs</li>
            <li>Keep receipts for passes and fares</li>
          </ul>

          <h2>Ontario Health Premium</h2>
          <p>Not a tax but collected through the tax system:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Taxable Income</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Up to $20,000</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>$20,001 - $25,000</td>
                <td>$0-$300</td>
              </tr>
              <tr>
                <td>$25,001 - $36,000</td>
                <td>$300</td>
              </tr>
              <tr>
                <td>$36,001 - $48,000</td>
                <td>$300-$450</td>
              </tr>
              <tr>
                <td>$48,001 - $72,000</td>
                <td>$450-$600</td>
              </tr>
              <tr>
                <td>$72,001 - $200,000</td>
                <td>$600-$750</td>
              </tr>
              <tr>
                <td>Over $200,000</td>
                <td>$900</td>
              </tr>
            </tbody>
          </table>

          <h2>Ontario-Specific Deductions</h2>

          <h3>Ontario Focused Flow-Through Share Tax Credit</h3>
          <ul>
            <li>5% of eligible mining exploration expenses</li>
            <li>For flow-through share investors</li>
            <li>Applies to Ontario exploration</li>
          </ul>

          <h3>Ontario Political Contribution Tax Credit</h3>
          <ul>
            <li>75% on first $464</li>
            <li>50% on next $696</li>
            <li>33.33% on next $1,112</li>
            <li>Maximum credit: $1,509</li>
          </ul>

          <h2>Ontario Sales Tax (HST)</h2>
          <p>Ontario uses Harmonized Sales Tax:</p>
          <ul>
            <li><strong>Rate:</strong> 13% (5% federal + 8% provincial)</li>
            <li>Applied to most goods and services</li>
            <li>Some items zero-rated or exempt</li>
          </ul>

          <h2>Land Transfer Tax</h2>
          <p>Paid when buying property in Ontario:</p>
          <ul>
            <li>0.5% on first $55,000</li>
            <li>1% on $55,000 to $250,000</li>
            <li>1.5% on $250,000 to $400,000</li>
            <li>2% on $400,000 to $2,000,000</li>
            <li>2.5% on amounts over $2,000,000</li>
          </ul>

          <h3>First-Time Home Buyer Rebate</h3>
          <ul>
            <li>Rebate up to $4,000</li>
            <li>Must be first-time buyer</li>
            <li>Property must be principal residence</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Toronto Buyers:</strong> Toronto has an additional Municipal Land Transfer Tax equal to the provincial tax. First-time buyers can claim rebates on both.
            </p>
          </div>

          <h2>Employer Health Tax (EHT)</h2>
          <p>Payroll tax for Ontario employers:</p>
          <ul>
            <li>Exempt if payroll under $1 million (private sector)</li>
            <li>0.98% to 1.95% depending on payroll size</li>
            <li>No employee contribution</li>
          </ul>

          <h2>Tax Planning for Ontario Residents</h2>

          <h3>Maximize Credits</h3>
          <ul>
            <li>File taxes to receive OTB even with low income</li>
            <li>Claim CARE credit for childcare</li>
            <li>Track transit expenses if 65+</li>
          </ul>

          <h3>Income Splitting Strategies</h3>
          <ul>
            <li>Pension splitting at age 65+</li>
            <li>Spousal RRSP contributions</li>
            <li>Prescribed rate loans</li>
          </ul>

          <h3>Manage Surtax</h3>
          <ul>
            <li>RRSP contributions reduce taxable income</li>
            <li>Timing of income can avoid surtax triggers</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Ontario Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about Ontario provincial taxes.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Tax rates and credits are subject to change. Verify current rates with the Ontario Ministry of Finance.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
