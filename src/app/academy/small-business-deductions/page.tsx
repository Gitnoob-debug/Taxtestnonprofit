import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Receipt, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Small Business Tax Deductions Canada 2024 | CRA Approved Expenses',
  description: 'Complete guide to small business tax deductions in Canada. Learn about CRA-approved business expenses, home office, vehicle, and capital cost allowance.',
  keywords: 'small business deductions Canada, business expenses CRA, tax deductions small business, business write-offs Canada, T2125 deductions',
}

export default function SmallBusinessDeductionsPage() {
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
              <Receipt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Business</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Small Business Tax Deductions
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Every Dollar Counts</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            Legitimate business deductions reduce your taxable income dollar-for-dollar. At a 40% marginal rate, a $1,000 deduction saves $400 in tax. Know what you can claim.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Deduction Principles</h2>

          <h3>What Makes an Expense Deductible</h3>
          <ul>
            <li>Incurred to earn business income</li>
            <li>Reasonable in the circumstances</li>
            <li>Not capital in nature (or use CCA)</li>
            <li>Not personal expense</li>
            <li>Properly documented</li>
          </ul>

          <h3>The Reasonableness Test</h3>
          <ul>
            <li>CRA can deny unreasonable amounts</li>
            <li>Compare to industry norms</li>
            <li>Expense must match business need</li>
            <li>Related parties scrutinized more</li>
          </ul>

          <h2>Advertising and Marketing</h2>

          <h3>Fully Deductible</h3>
          <ul>
            <li>Website design and hosting</li>
            <li>Social media advertising</li>
            <li>Google/Facebook ads</li>
            <li>Business cards, brochures</li>
            <li>Trade show exhibits</li>
            <li>Signs and displays</li>
          </ul>

          <h3>Canadian Media Rule</h3>
          <ul>
            <li>Canadian newspaper/broadcast: 100%</li>
            <li>Foreign advertising to Canadians: limited</li>
            <li>Online ads generally unrestricted</li>
          </ul>

          <h2>Office and Supplies</h2>

          <h3>Office Supplies (100%)</h3>
          <ul>
            <li>Paper, pens, ink, toner</li>
            <li>Postage and courier</li>
            <li>Filing supplies</li>
            <li>Small items under $500</li>
          </ul>

          <h3>Office Expenses</h3>
          <ul>
            <li>Coffee, tea for office</li>
            <li>Cleaning supplies</li>
            <li>Subscriptions (business-related)</li>
            <li>Software subscriptions</li>
          </ul>

          <h2>Professional and Business Fees</h2>

          <h3>Fully Deductible</h3>
          <ul>
            <li>Accounting fees</li>
            <li>Legal fees (not for capital property)</li>
            <li>Bookkeeping services</li>
            <li>Tax preparation</li>
            <li>Business consulting</li>
            <li>Payroll services</li>
          </ul>

          <h3>Licensing and Memberships</h3>
          <ul>
            <li>Business licenses, permits</li>
            <li>Professional association dues</li>
            <li>Chamber of commerce</li>
            <li>Industry memberships</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Note:</strong> Golf club memberships are never deductible, even if used for business entertainment. Specific CRA rule.
            </p>
          </div>

          <h2>Travel Expenses</h2>

          <h3>Business Travel (100%)</h3>
          <ul>
            <li>Transportation to client sites</li>
            <li>Flights for business purposes</li>
            <li>Hotel/accommodation</li>
            <li>Taxis, Uber, car rentals</li>
            <li>Parking</li>
          </ul>

          <h3>Meals While Traveling (50%)</h3>
          <ul>
            <li>Meals during business trips</li>
            <li>Only 50% deductible</li>
            <li>Keep detailed receipts</li>
            <li>Note business purpose</li>
          </ul>

          <h3>Conventions</h3>
          <ul>
            <li>Two conventions per year</li>
            <li>Must be related to business</li>
            <li>Travel and registration deductible</li>
          </ul>

          <h2>Meals and Entertainment</h2>

          <h3>50% Limitation</h3>
          <ul>
            <li>Client entertainment</li>
            <li>Business meals</li>
            <li>Tickets to events (business purpose)</li>
            <li>Keep receipts, note attendees and purpose</li>
          </ul>

          <h3>100% Deductible Exceptions</h3>
          <ul>
            <li>Staff parties (up to 6/year)</li>
            <li>Meals included in conference fee</li>
            <li>Food as part of taxable benefit</li>
            <li>Meals for remote work sites</li>
          </ul>

          <h2>Vehicle Expenses</h2>

          <h3>Deductible Costs</h3>
          <ul>
            <li>Fuel/gas</li>
            <li>Insurance</li>
            <li>Maintenance and repairs</li>
            <li>License and registration</li>
            <li>Car washes</li>
            <li>Parking for business</li>
          </ul>

          <h3>Business Use Percentage</h3>
          <ul>
            <li>Track all kilometers driven</li>
            <li>Business km / Total km = business %</li>
            <li>Apply % to total vehicle expenses</li>
            <li>Keep detailed mileage log</li>
          </ul>

          <h3>CCA Limits on Vehicles</h3>
          <ul>
            <li>Class 10 (30%): most vehicles</li>
            <li>Class 10.1: luxury vehicles over ~$37,000</li>
            <li>Passenger vehicle limits apply</li>
            <li>Zero-emission vehicles: higher limits</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Mileage Log Essential:</strong> CRA frequently audits vehicle claims. Without a log showing dates, destinations, and business purpose, deductions can be denied entirely.
            </p>
          </div>

          <h2>Home Office Expenses</h2>

          <h3>Workspace Criteria</h3>
          <ul>
            <li>Principal place of business, OR</li>
            <li>Used exclusively for business AND meet clients regularly</li>
          </ul>

          <h3>Deductible Home Costs</h3>
          <ul>
            <li>Rent (if renting)</li>
            <li>Mortgage interest (not principal)</li>
            <li>Property taxes</li>
            <li>Utilities (heat, electricity, water)</li>
            <li>Home insurance</li>
            <li>Maintenance and repairs (common areas)</li>
          </ul>

          <h3>Calculation Method</h3>
          <ul>
            <li>Calculate business-use percentage</li>
            <li>Usually square footage method</li>
            <li>Apply % to eligible expenses</li>
            <li>Cannot create/increase business loss</li>
          </ul>

          <h2>Wages and Subcontractors</h2>

          <h3>Employee Wages</h3>
          <ul>
            <li>Salaries and wages: deductible</li>
            <li>CPP, EI employer portions: deductible</li>
            <li>Benefits provided: usually deductible</li>
            <li>Issue T4s to employees</li>
          </ul>

          <h3>Subcontractors</h3>
          <ul>
            <li>Payments for services: deductible</li>
            <li>Issue T4A if over $500</li>
            <li>Ensure truly independent contractors</li>
          </ul>

          <h3>Family Members</h3>
          <ul>
            <li>Pay must be reasonable for work done</li>
            <li>Must be actual services</li>
            <li>Document hours and duties</li>
            <li>T4 required for employees</li>
          </ul>

          <h2>Insurance</h2>

          <h3>Business Insurance (100%)</h3>
          <ul>
            <li>Business liability insurance</li>
            <li>Professional liability/E&O</li>
            <li>Property insurance on business assets</li>
            <li>Business interruption insurance</li>
          </ul>

          <h3>Not Deductible</h3>
          <ul>
            <li>Personal life insurance</li>
            <li>Health insurance for self (special rules)</li>
            <li>Home insurance (only business portion)</li>
          </ul>

          <h2>Interest and Bank Charges</h2>

          <h3>Deductible</h3>
          <ul>
            <li>Interest on business loans</li>
            <li>Business credit card interest</li>
            <li>Bank fees on business accounts</li>
            <li>Credit card merchant fees</li>
          </ul>

          <h3>Must Be for Business</h3>
          <ul>
            <li>Loan used for business purposes</li>
            <li>Not personal borrowing</li>
            <li>Keep clear paper trail</li>
          </ul>

          <h2>Capital Cost Allowance (CCA)</h2>

          <h3>Common Classes</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Class</th>
                <th>Rate</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>4%</td>
                <td>Buildings</td>
              </tr>
              <tr>
                <td>8</td>
                <td>20%</td>
                <td>Furniture, equipment</td>
              </tr>
              <tr>
                <td>10</td>
                <td>30%</td>
                <td>Vehicles</td>
              </tr>
              <tr>
                <td>12</td>
                <td>100%</td>
                <td>Tools under $500</td>
              </tr>
              <tr>
                <td>50</td>
                <td>55%</td>
                <td>Computers</td>
              </tr>
            </tbody>
          </table>

          <h3>Accelerated Investment Incentive</h3>
          <ul>
            <li>Enhanced first-year depreciation</li>
            <li>Most assets: 1.5x normal rate in year 1</li>
            <li>Available through 2024</li>
          </ul>

          <h2>Bad Debts</h2>

          <h3>Deductible When</h3>
          <ul>
            <li>Invoice was included in income</li>
            <li>Reasonable efforts to collect made</li>
            <li>Debt established as uncollectable</li>
            <li>Written off in your records</li>
          </ul>

          <h3>Documentation</h3>
          <ul>
            <li>Keep collection attempts records</li>
            <li>Note reason debt is uncollectable</li>
            <li>Board minute if corporation</li>
          </ul>

          <h2>Training and Education</h2>

          <h3>Deductible</h3>
          <ul>
            <li>Training to maintain/upgrade skills</li>
            <li>Courses related to current business</li>
            <li>Professional development</li>
            <li>Certification maintenance</li>
          </ul>

          <h3>Not Deductible</h3>
          <ul>
            <li>Training for new career/business</li>
            <li>General interest courses</li>
            <li>Degree programs (unless required for profession)</li>
          </ul>

          <h2>Technology Expenses</h2>

          <h3>Current Expenses (100%)</h3>
          <ul>
            <li>Software subscriptions (monthly)</li>
            <li>Cloud services (AWS, Azure)</li>
            <li>Domain names, hosting</li>
            <li>Online tools and apps</li>
          </ul>

          <h3>Capital (CCA)</h3>
          <ul>
            <li>Computer hardware (Class 50: 55%)</li>
            <li>Software licenses (large perpetual)</li>
            <li>Immediate expensing may apply</li>
          </ul>

          <h2>Commonly Missed Deductions</h2>

          <ul>
            <li>Business portion of cell phone</li>
            <li>Business portion of internet</li>
            <li>Professional books and subscriptions</li>
            <li>Bank fees and merchant charges</li>
            <li>Business-use portion of insurance</li>
            <li>Small tools and supplies</li>
            <li>Protective clothing/uniforms</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Business Deductions?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about small business tax deductions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Deductibility depends on specific circumstances. Keep all receipts and document business purpose. Consult an accountant for complex situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
