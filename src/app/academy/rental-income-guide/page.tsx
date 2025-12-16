import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Building, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rental Income Tax Guide Canada 2024 | T776 Form & Deductions',
  description: 'Complete guide to rental income taxation in Canada. Learn about T776 form, allowable deductions, CCA classes, current vs capital expenses, and reporting requirements.',
  keywords: 'rental income Canada, landlord tax deductions, T776 form, rental property tax, CCA rental property, rental expenses deductible',
}

export default function RentalIncomeGuidePage() {
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
              <Building className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Rental Income</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Rental Income Tax Guide: How to Report & What You Can Deduct
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">How Rental Income is Taxed</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Rental income is added to your other income and taxed at your marginal rate. You report it on Form T776 (Statement of Real Estate Rentals) and can deduct reasonable expenses incurred to earn that income.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Calculating Net Rental Income</h2>
          <p>Your taxable rental income is calculated as:</p>
          <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg my-4 not-prose">
            <p className="text-lg font-mono text-slate-900 dark:text-white">
              Gross Rental Income - Allowable Expenses = Net Rental Income
            </p>
          </div>

          <h2>Deductible Rental Expenses</h2>
          <p>You can deduct expenses incurred to earn rental income. These fall into two categories:</p>

          <h3>Current Expenses (Fully Deductible)</h3>
          <ul>
            <li><strong>Advertising:</strong> Costs to advertise your rental property</li>
            <li><strong>Insurance:</strong> Property insurance premiums</li>
            <li><strong>Interest:</strong> Mortgage interest (but not principal payments)</li>
            <li><strong>Property taxes:</strong> Municipal property taxes</li>
            <li><strong>Repairs and maintenance:</strong> Fixing or maintaining the property</li>
            <li><strong>Utilities:</strong> If you pay heat, water, electricity</li>
            <li><strong>Property management fees:</strong> Fees paid to manage your property</li>
            <li><strong>Legal and accounting fees:</strong> For rental income matters</li>
            <li><strong>Office expenses:</strong> Supplies, phone calls related to rental</li>
          </ul>

          <h3>Capital Expenses (Depreciated Over Time)</h3>
          <p>Capital expenses that improve or extend the life of the property cannot be fully deducted in the year incurred. Instead, you claim Capital Cost Allowance (CCA):</p>
          <ul>
            <li>Building structure</li>
            <li>Major renovations (new roof, furnace, windows)</li>
            <li>Appliances and furniture provided to tenants</li>
            <li>Paving, landscaping structures</li>
          </ul>

          <h2>Capital Cost Allowance (CCA)</h2>
          <p>CCA lets you deduct the cost of capital assets over several years. Common CCA classes for rental properties:</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Class</th>
                  <th className="text-left">Rate</th>
                  <th className="text-left">Assets Included</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Class 1</td>
                  <td>4%</td>
                  <td>Building acquired after 1987</td>
                </tr>
                <tr>
                  <td>Class 3</td>
                  <td>5%</td>
                  <td>Building acquired before 1988</td>
                </tr>
                <tr>
                  <td>Class 8</td>
                  <td>20%</td>
                  <td>Furniture, appliances, equipment</td>
                </tr>
                <tr>
                  <td>Class 10</td>
                  <td>30%</td>
                  <td>Vehicles used for rental business</td>
                </tr>
                <tr>
                  <td>Class 17</td>
                  <td>8%</td>
                  <td>Parking lot paving</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>CCA Tip:</strong> You can claim less than the maximum CCA in any year. This is useful if you have low income or want to preserve CCA room for future years with higher income.
            </p>
          </div>

          <h2>Current vs Capital Expense</h2>
          <p>This distinction is crucial. The CRA looks at whether the expense:</p>

          <h3>Current Expense (Fully Deductible Now)</h3>
          <ul>
            <li>Restores property to original condition</li>
            <li>Maintains current value</li>
            <li>Recurring in nature</li>
            <li>Example: Repainting, fixing a leaky faucet, replacing broken windows</li>
          </ul>

          <h3>Capital Expense (CCA Over Time)</h3>
          <ul>
            <li>Improves the property beyond original condition</li>
            <li>Extends the useful life</li>
            <li>Provides lasting benefit</li>
            <li>Example: Adding a deck, replacing the roof, major kitchen renovation</li>
          </ul>

          <h2>Rental Losses and the "Reasonable Expectation of Profit"</h2>
          <p>If your rental expenses exceed your rental income, you have a rental loss. You can use this loss to offset other income, BUT:</p>
          <ul>
            <li>You must have a <strong>reasonable expectation of profit</strong></li>
            <li>The property must be genuinely for rent (not personal use disguised as rental)</li>
            <li>CRA may deny losses if you're related to tenants paying below-market rent</li>
          </ul>

          <h2>Co-owned Rental Properties</h2>
          <p>If you co-own a rental property:</p>
          <ul>
            <li>Each owner reports their share of income/expenses based on ownership percentage</li>
            <li>Each owner files their own T776</li>
            <li>Losses can only be claimed by the person who incurred them</li>
          </ul>

          <h2>Renting Part of Your Home</h2>
          <p>If you rent part of your principal residence:</p>
          <ul>
            <li>Allocate expenses based on the rental portion (usually square footage)</li>
            <li>Example: Rent 20% of your home = deduct 20% of utilities, property tax, insurance</li>
            <li><strong>Warning:</strong> Claiming CCA on part of your home may affect your principal residence exemption when you sell</li>
          </ul>

          <h2>Short-Term Rentals (Airbnb)</h2>
          <p>Income from Airbnb or similar platforms is rental income and must be reported. Additionally:</p>
          <ul>
            <li>If you provide services similar to a hotel, it may be considered business income</li>
            <li>GST/HST may apply if your rental income exceeds $30,000</li>
            <li>Municipal regulations may affect what you can deduct</li>
          </ul>

          <h2>Soft Costs on New Construction</h2>
          <p>If you build a rental property, certain "soft costs" can be deducted or capitalized:</p>
          <ul>
            <li>Interest during construction - must be capitalized</li>
            <li>Legal fees for land purchase - capitalize to land cost</li>
            <li>Property taxes during construction - can deduct or capitalize</li>
          </ul>

          <h2>Record Keeping Requirements</h2>
          <p>Keep records for 6 years from the end of the tax year:</p>
          <ul>
            <li>All receipts for expenses claimed</li>
            <li>Rental agreements/leases</li>
            <li>Bank statements showing rental deposits</li>
            <li>Mortgage statements showing interest paid</li>
            <li>Property tax bills</li>
            <li>Records of any capital improvements</li>
          </ul>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Rental income is taxed at your marginal rate</li>
            <li>You can deduct reasonable expenses to earn rental income</li>
            <li>Current expenses are fully deductible; capital expenses use CCA</li>
            <li>Mortgage interest is deductible, principal payments are not</li>
            <li>Be careful with CCA on your home - it may affect your principal residence exemption</li>
            <li>Report all rental income including short-term rentals</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Have Questions About Rental Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about rental income taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes. Rental income taxation can be complex. Consult a tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
