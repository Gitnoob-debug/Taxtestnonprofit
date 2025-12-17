import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Self-Employment Tax Canada 2025 | Freelance & Sole Proprietor Guide',
  description: 'Complete guide to self-employment taxes in Canada for 2025. Learn about business income, deductions, CPP contributions, GST/HST, and quarterly tax installments.',
  keywords: 'self-employment tax Canada 2025, freelance taxes, sole proprietor tax, business income tax, T2125 guide',
}

export default function SelfEmploymentTaxPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900 p-2.5 rounded-xl">
              <Briefcase className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Self-Employment Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">You're the Employee AND Employer</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            Self-employed individuals pay both portions of CPP (11.9% total) and must manage their own tax payments through installments. The upside: many business expenses are deductible.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Self-Employment Basics</h2>

          <h3>What Is Self-Employment?</h3>
          <ul>
            <li>Running your own business (sole proprietor)</li>
            <li>Freelancing or consulting</li>
            <li>Gig economy work (Uber, Airbnb, etc.)</li>
            <li>Professional practice</li>
            <li>Commission sales without employer</li>
          </ul>

          <h3>Employee vs Self-Employed</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Employee</th>
                <th>Self-Employed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Control over how</td>
                <td>Employer directs</td>
                <td>You decide</td>
              </tr>
              <tr>
                <td>Tools/equipment</td>
                <td>Provided</td>
                <td>You provide</td>
              </tr>
              <tr>
                <td>Financial risk</td>
                <td>Employer's</td>
                <td>Yours</td>
              </tr>
              <tr>
                <td>Multiple clients</td>
                <td>No</td>
                <td>Usually yes</td>
              </tr>
            </tbody>
          </table>

          <h2>CPP for Self-Employed</h2>

          <h3>Both Portions</h3>
          <ul>
            <li>Employee portion: 5.95%</li>
            <li>Employer portion: 5.95%</li>
            <li>Total: 11.9% (2024)</li>
            <li>On net self-employment income</li>
          </ul>

          <h3>2024 Limits</h3>
          <ul>
            <li>Maximum pensionable earnings: $68,500</li>
            <li>Basic exemption: $3,500</li>
            <li>Maximum CPP: ~$7,735</li>
            <li>Half is tax deductible</li>
          </ul>

          <h3>CPP2 (Second Additional)</h3>
          <ul>
            <li>New in 2024: additional 4% on earnings $68,500-$73,200</li>
            <li>Self-employed pay both portions (8% total)</li>
            <li>Builds additional CPP benefit</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tax Benefit:</strong> Half of CPP (employer portion) is deductible on Line 22200. This reduces your net income and total tax.
            </p>
          </div>

          <h2>Calculating Business Income</h2>

          <h3>Revenue</h3>
          <ul>
            <li>All business income received</li>
            <li>Cash, cheque, electronic</li>
            <li>Barter transactions at FMV</li>
            <li>Work in progress (accrual)</li>
          </ul>

          <h3>Net Income Formula</h3>
          <p>Gross Revenue - Business Expenses = Net Business Income</p>
          <ul>
            <li>Net income goes on Line 13500-13700</li>
            <li>Complete Form T2125</li>
            <li>Net income subject to income tax + CPP</li>
          </ul>

          <h2>Common Business Deductions</h2>

          <h3>Advertising and Promotion</h3>
          <ul>
            <li>Website, social media ads</li>
            <li>Business cards, brochures</li>
            <li>Promotional items</li>
          </ul>

          <h3>Office Supplies</h3>
          <ul>
            <li>Paper, pens, ink</li>
            <li>Computer supplies</li>
            <li>Postage</li>
          </ul>

          <h3>Professional Fees</h3>
          <ul>
            <li>Accounting, legal fees</li>
            <li>Bookkeeping</li>
            <li>Business consulting</li>
          </ul>

          <h3>Business Travel</h3>
          <ul>
            <li>Transportation to client sites</li>
            <li>Conferences, trade shows</li>
            <li>Meals while traveling (50%)</li>
            <li>Accommodation</li>
          </ul>

          <h3>Vehicle Expenses</h3>
          <ul>
            <li>Gas, maintenance, insurance</li>
            <li>Business portion only</li>
            <li>Track kilometers meticulously</li>
            <li>Keep mileage log</li>
          </ul>

          <h2>Home Office Deduction</h2>

          <h3>Eligibility</h3>
          <ul>
            <li>Work from home regularly</li>
            <li>It's your principal place of business, OR</li>
            <li>Used exclusively for business and meeting clients</li>
          </ul>

          <h3>Expenses to Claim</h3>
          <ul>
            <li>Rent OR mortgage interest (not principal)</li>
            <li>Property taxes</li>
            <li>Utilities (heat, electricity, water)</li>
            <li>Home insurance</li>
            <li>Maintenance, repairs (reasonable portion)</li>
          </ul>

          <h3>Calculation</h3>
          <ul>
            <li>Business-use percentage of home</li>
            <li>Square footage method usually</li>
            <li>100 sq ft office / 1,000 sq ft home = 10%</li>
            <li>Apply % to eligible expenses</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Home Office Limit:</strong> Home office expenses can't create or increase a business loss. Unused amounts carry forward to future years.
            </p>
          </div>

          <h2>Capital Cost Allowance (CCA)</h2>

          <h3>What Is CCA?</h3>
          <ul>
            <li>Depreciation for tax purposes</li>
            <li>Business assets spread over years</li>
            <li>Different rates by asset class</li>
          </ul>

          <h3>Common CCA Classes</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Class</th>
                <th>Rate</th>
                <th>Assets</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Class 8</td>
                <td>20%</td>
                <td>Furniture, equipment</td>
              </tr>
              <tr>
                <td>Class 10</td>
                <td>30%</td>
                <td>Vehicles</td>
              </tr>
              <tr>
                <td>Class 50</td>
                <td>55%</td>
                <td>Computers (separate)</td>
              </tr>
              <tr>
                <td>Class 12</td>
                <td>100%</td>
                <td>Small tools under $500</td>
              </tr>
            </tbody>
          </table>

          <h3>Immediate Expensing</h3>
          <ul>
            <li>Up to $1.5M can be immediately expensed</li>
            <li>For Canadian-controlled private businesses</li>
            <li>Certain property types</li>
            <li>Available through 2024</li>
          </ul>

          <h2>GST/HST Obligations</h2>

          <h3>Registration Threshold</h3>
          <ul>
            <li>$30,000 revenue in any 4 consecutive quarters</li>
            <li>Must register and charge GST/HST</li>
            <li>Can voluntarily register earlier</li>
          </ul>

          <h3>Collecting GST/HST</h3>
          <ul>
            <li>Add tax to invoices</li>
            <li>Track GST/HST collected</li>
            <li>File returns (annual, quarterly, or monthly)</li>
          </ul>

          <h3>Input Tax Credits</h3>
          <ul>
            <li>Claim back GST/HST paid on business expenses</li>
            <li>Reduces amount you remit</li>
            <li>Keep receipts with GST numbers</li>
          </ul>

          <h3>Quick Method</h3>
          <ul>
            <li>Simplified GST/HST calculation</li>
            <li>Keep portion of GST/HST collected</li>
            <li>Don't claim ITCs on most expenses</li>
            <li>May save money if few expenses</li>
          </ul>

          <h2>Tax Installments</h2>

          <h3>Who Must Pay</h3>
          <ul>
            <li>Net tax owing over $3,000 (current and either prior year)</li>
            <li>Quebec: $1,800 threshold</li>
            <li>No withholding = must pay quarterly</li>
          </ul>

          <h3>Due Dates</h3>
          <ul>
            <li>March 15</li>
            <li>June 15</li>
            <li>September 15</li>
            <li>December 15</li>
          </ul>

          <h3>Calculation Methods</h3>
          <ul>
            <li><strong>Prior year:</strong> Base on last year's tax</li>
            <li><strong>Current year:</strong> Estimate this year's tax</li>
            <li><strong>CRA suggests:</strong> Use their installment reminders</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Pro Tip:</strong> Set aside 25-30% of each payment received for taxes. Transfer to separate savings account. Avoid April surprises.
            </p>
          </div>

          <h2>Filing Requirements</h2>

          <h3>T2125 Statement</h3>
          <ul>
            <li>Complete for each business</li>
            <li>Attach to personal tax return</li>
            <li>Report income and expenses</li>
            <li>Calculate net income</li>
          </ul>

          <h3>Filing Deadline</h3>
          <ul>
            <li>Self-employed: June 15</li>
            <li>BUT tax owing due April 30</li>
            <li>Interest charged from May 1</li>
            <li>File early to know what you owe</li>
          </ul>

          <h3>Records to Keep</h3>
          <ul>
            <li>All receipts and invoices</li>
            <li>Bank statements</li>
            <li>Vehicle mileage log</li>
            <li>Home office calculation</li>
            <li>Keep 6 years</li>
          </ul>

          <h2>Common Mistakes</h2>

          <h3>Avoid These Errors</h3>
          <ul>
            <li>Not separating personal/business finances</li>
            <li>Missing deductions</li>
            <li>Inadequate recordkeeping</li>
            <li>Forgetting to pay installments</li>
            <li>Not tracking vehicle kilometers</li>
            <li>Overstating home office</li>
          </ul>

          <h2>Sole Proprietor vs Incorporation</h2>

          <h3>Stay Sole Proprietor If</h3>
          <ul>
            <li>Income under $50,000-$75,000</li>
            <li>Simpler administration</li>
            <li>No liability concerns</li>
            <li>Just starting out</li>
          </ul>

          <h3>Consider Incorporating If</h3>
          <ul>
            <li>Significant liability exposure</li>
            <li>Income over $100,000+</li>
            <li>Can leave money in corporation</li>
            <li>Want to income split</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Self-Employment Tax?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about self-employment taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Self-employment tax situations vary significantly. Consider consulting an accountant, especially as your business grows.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
