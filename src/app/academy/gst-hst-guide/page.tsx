import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Percent, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GST/HST Guide Canada 2024 | Registration, Filing & ITCs',
  description: 'Complete guide to GST/HST for Canadian businesses. Learn about registration, filing, input tax credits, quick method, and compliance requirements.',
  keywords: 'GST HST Canada, GST registration, input tax credits, HST filing, GST quick method, small supplier exemption',
}

export default function GSTHSTGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-100 dark:bg-violet-900 p-2.5 rounded-xl">
              <Percent className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            GST/HST Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Collect and Remit</h2>
          <p className="text-violet-700 dark:text-violet-300 text-sm">
            GST/HST is charged on most goods and services in Canada. Businesses collect it from customers and remit to CRA, but can claim back GST/HST paid on business expenses through Input Tax Credits.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>GST/HST Rates by Province</h2>

          <h3>Current Rates (2024)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Rate</th>
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
                <td>BC</td>
                <td>5% + 7%</td>
                <td>GST + PST</td>
              </tr>
              <tr>
                <td>Ontario</td>
                <td>13%</td>
                <td>HST</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>5% + 9.975%</td>
                <td>GST + QST</td>
              </tr>
              <tr>
                <td>Nova Scotia</td>
                <td>15%</td>
                <td>HST</td>
              </tr>
              <tr>
                <td>New Brunswick</td>
                <td>15%</td>
                <td>HST</td>
              </tr>
            </tbody>
          </table>

          <h3>HST Provinces</h3>
          <ul>
            <li>Ontario: 13%</li>
            <li>Nova Scotia: 15%</li>
            <li>New Brunswick: 15%</li>
            <li>Newfoundland: 15%</li>
            <li>PEI: 15%</li>
          </ul>

          <h2>Registration Requirements</h2>

          <h3>$30,000 Threshold</h3>
          <ul>
            <li>Must register if revenue exceeds $30,000</li>
            <li>In any single calendar quarter, OR</li>
            <li>In four consecutive calendar quarters</li>
            <li>Once exceeded, register within 29 days</li>
          </ul>

          <h3>Small Supplier Exemption</h3>
          <ul>
            <li>Under $30,000: registration optional</li>
            <li>Don't charge GST/HST</li>
            <li>Can't claim ITCs</li>
            <li>May voluntarily register</li>
          </ul>

          <h3>Mandatory Registration</h3>
          <ul>
            <li>Taxi/ride-sharing (any revenue)</li>
            <li>Non-residents making taxable supplies in Canada</li>
            <li>Digital platform operators</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Voluntary Registration Benefit:</strong> Even under $30,000, registering lets you claim ITCs on business expenses. Good if you have significant startup costs.
            </p>
          </div>

          <h2>How to Register</h2>

          <h3>Registration Methods</h3>
          <ul>
            <li>CRA My Business Account (online)</li>
            <li>By phone: 1-800-959-5525</li>
            <li>Form RC1 by mail</li>
            <li>Business registration online</li>
          </ul>

          <h3>Information Needed</h3>
          <ul>
            <li>Business name and number</li>
            <li>Type of business</li>
            <li>Fiscal year end</li>
            <li>Expected annual revenue</li>
            <li>Reporting period preference</li>
          </ul>

          <h2>Charging GST/HST</h2>

          <h3>On Your Invoices</h3>
          <ul>
            <li>Show GST/HST separately</li>
            <li>Include your GST/HST number</li>
            <li>Apply correct rate for place of supply</li>
          </ul>

          <h3>Place of Supply Rules</h3>
          <ul>
            <li>Goods: where delivered</li>
            <li>Services: generally where performed</li>
            <li>Complex rules for specific situations</li>
            <li>Province of customer matters</li>
          </ul>

          <h3>What's Taxable</h3>
          <ul>
            <li>Most goods and services</li>
            <li>Real property sales/rentals</li>
            <li>Digital products and services</li>
          </ul>

          <h3>Zero-Rated (0%)</h3>
          <ul>
            <li>Basic groceries</li>
            <li>Prescription drugs</li>
            <li>Medical devices</li>
            <li>Exports</li>
            <li>Can still claim ITCs</li>
          </ul>

          <h3>Exempt (No GST/HST)</h3>
          <ul>
            <li>Most health services</li>
            <li>Childcare services</li>
            <li>Legal aid</li>
            <li>Residential rent</li>
            <li>Cannot claim ITCs</li>
          </ul>

          <h2>Input Tax Credits (ITCs)</h2>

          <h3>What Are ITCs</h3>
          <ul>
            <li>GST/HST paid on business expenses</li>
            <li>Claim back from CRA</li>
            <li>Reduces amount you remit</li>
            <li>May result in refund</li>
          </ul>

          <h3>Eligible Expenses</h3>
          <ul>
            <li>Office supplies and equipment</li>
            <li>Professional services</li>
            <li>Business travel</li>
            <li>Vehicle expenses (business portion)</li>
            <li>Advertising</li>
          </ul>

          <h3>Documentation Required</h3>
          <ul>
            <li>Supplier's name and GST/HST number</li>
            <li>Date of transaction</li>
            <li>Amount paid</li>
            <li>GST/HST amount</li>
            <li>Description of goods/services</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Receipt Rules:</strong> Under $30: minimal info needed. $30-$149.99: need supplier GST number. $150+: full details including your name. Keep all receipts.
            </p>
          </div>

          <h2>Filing GST/HST Returns</h2>

          <h3>Filing Frequencies</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Annual Revenue</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under $1.5M</td>
                <td>Annual, quarterly, or monthly</td>
              </tr>
              <tr>
                <td>$1.5M - $6M</td>
                <td>Quarterly or monthly</td>
              </tr>
              <tr>
                <td>Over $6M</td>
                <td>Monthly required</td>
              </tr>
            </tbody>
          </table>

          <h3>Due Dates</h3>
          <ul>
            <li><strong>Annual:</strong> 3 months after fiscal year end</li>
            <li><strong>Quarterly:</strong> 1 month after quarter end</li>
            <li><strong>Monthly:</strong> 1 month after month end</li>
          </ul>

          <h3>What You Report</h3>
          <ul>
            <li>Total sales and revenues</li>
            <li>GST/HST collected</li>
            <li>ITCs claimed</li>
            <li>Net tax (collected minus ITCs)</li>
          </ul>

          <h2>Quick Method</h2>

          <h3>What Is Quick Method</h3>
          <ul>
            <li>Simplified GST/HST calculation</li>
            <li>Keep portion of GST/HST collected</li>
            <li>Don't claim most ITCs</li>
            <li>For businesses under $400,000 revenue</li>
          </ul>

          <h3>How It Works</h3>
          <ul>
            <li>Charge normal GST/HST rate</li>
            <li>Remit lower percentage to CRA</li>
            <li>Keep the difference</li>
            <li>Still claim ITCs on capital purchases</li>
          </ul>

          <h3>Quick Method Rates (Examples)</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Business Type</th>
                <th>Rate (HST 13%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Service businesses</td>
                <td>8.8%</td>
              </tr>
              <tr>
                <td>Retailers/wholesalers</td>
                <td>4.4%</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Quick Method Benefit:</strong> Collect 13% HST, remit 8.8% = keep 4.2%. On $100,000 sales, that's $4,200 in your pocket. Great for low-expense businesses.
            </p>
          </div>

          <h2>Installments</h2>

          <h3>Who Pays Installments</h3>
          <ul>
            <li>Annual filers with net tax over $3,000</li>
            <li>Quarterly payments required</li>
            <li>Based on prior year or estimate</li>
          </ul>

          <h3>Installment Due Dates</h3>
          <ul>
            <li>End of each fiscal quarter</li>
            <li>1/4 of annual estimate each</li>
            <li>Final reconciliation on return</li>
          </ul>

          <h2>Common Mistakes</h2>

          <h3>Errors to Avoid</h3>
          <ul>
            <li>Not registering when required</li>
            <li>Charging wrong rate for province</li>
            <li>Missing ITCs (leaving money on table)</li>
            <li>Inadequate documentation</li>
            <li>Late filing/payment</li>
            <li>Claiming ITCs on exempt purchases</li>
          </ul>

          <h3>Penalties</h3>
          <ul>
            <li>Late filing: 1% + 0.25%/month up to 12 months</li>
            <li>Late payment: interest charges</li>
            <li>Repeated late filing: increased penalties</li>
            <li>False statements: 50% of understated amount</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Real Property</h3>
          <ul>
            <li>New homes: GST/HST applies</li>
            <li>Commercial property: usually taxable</li>
            <li>Residential rent: exempt</li>
            <li>New housing rebates available</li>
          </ul>

          <h3>Imports</h3>
          <ul>
            <li>GST applies on most imports</li>
            <li>Paid at border or self-assessed</li>
            <li>Can be claimed as ITC</li>
          </ul>

          <h3>Exports</h3>
          <ul>
            <li>Zero-rated (0% GST)</li>
            <li>Still claim ITCs</li>
            <li>May result in refund</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>What to Keep</h3>
          <ul>
            <li>All sales invoices issued</li>
            <li>All purchase receipts</li>
            <li>Bank statements</li>
            <li>GST/HST returns filed</li>
            <li>Supporting calculations</li>
          </ul>

          <h3>How Long</h3>
          <ul>
            <li>6 years from end of tax year</li>
            <li>Longer if dispute or investigation</li>
            <li>Digital records acceptable</li>
          </ul>

          <h2>Quebec QST</h2>

          <h3>Separate System</h3>
          <ul>
            <li>9.975% QST in addition to 5% GST</li>
            <li>Register separately with Revenu Québec</li>
            <li>File separate QST returns</li>
            <li>Similar ITC rules (called ITRs)</li>
          </ul>

          <h3>Non-Quebec Businesses</h3>
          <ul>
            <li>May need to register if selling in Quebec</li>
            <li>Thresholds and rules similar to GST</li>
            <li>Complexity for out-of-province sellers</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About GST/HST?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about GST/HST registration and compliance.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> GST/HST rules are complex and change frequently. Consult CRA or a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
