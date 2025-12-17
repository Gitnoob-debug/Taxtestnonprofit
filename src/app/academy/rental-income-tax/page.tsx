import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rental Income Tax Canada 2024 | Landlord Tax Guide',
  description: 'Complete guide to rental income taxation in Canada. Learn about deductible expenses, capital cost allowance, reporting requirements, and tax strategies for landlords.',
  keywords: 'rental income tax Canada, landlord taxes, rental property deductions, T776 rental income, rental CCA, investment property tax',
}

export default function RentalIncomeTaxPage() {
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
              <Home className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Real Estate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Rental Income Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Net Rental Income</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Rental income is taxed on the net amount after expenses. Proper expense tracking and understanding what's deductible can significantly reduce your tax bill as a landlord.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Rental Income Basics</h2>

          <h3>What Is Rental Income</h3>
          <ul>
            <li>Rent payments from tenants</li>
            <li>Parking fees</li>
            <li>Laundry income</li>
            <li>Lease cancellation fees</li>
            <li>Any amounts tenant pays for you</li>
          </ul>

          <h3>Reporting</h3>
          <ul>
            <li>Form T776 - Statement of Real Estate Rentals</li>
            <li>Attach to personal tax return</li>
            <li>Report gross income and expenses</li>
            <li>Net rental income added to other income</li>
          </ul>

          <h2>Deductible Expenses</h2>

          <h3>Operating Expenses (100%)</h3>
          <ul>
            <li>Property taxes</li>
            <li>Insurance</li>
            <li>Utilities (if you pay)</li>
            <li>Property management fees</li>
            <li>Advertising for tenants</li>
            <li>Legal and accounting fees</li>
          </ul>

          <h3>Maintenance and Repairs</h3>
          <ul>
            <li>Minor repairs and maintenance</li>
            <li>Painting, cleaning</li>
            <li>Plumbing, electrical repairs</li>
            <li>Appliance repairs</li>
            <li>Snow removal, landscaping</li>
          </ul>

          <h3>Mortgage Interest</h3>
          <ul>
            <li>Interest portion only (not principal)</li>
            <li>On loan used to buy rental property</li>
            <li>Significant deduction</li>
            <li>Track amortization schedule</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Interest Deduction:</strong> On a $400,000 mortgage at 5%, you may pay ~$20,000 in interest in year one. That's a significant deduction reducing taxable rental income.
            </p>
          </div>

          <h2>Repairs vs Capital Improvements</h2>

          <h3>Current Expense (Deductible Now)</h3>
          <ul>
            <li>Restores property to original condition</li>
            <li>Routine maintenance</li>
            <li>Replacing parts (not whole systems)</li>
            <li>Examples: Patching roof, fixing furnace</li>
          </ul>

          <h3>Capital Expense (CCA Over Time)</h3>
          <ul>
            <li>Improves property beyond original state</li>
            <li>Extends useful life significantly</li>
            <li>Replaces entire system</li>
            <li>Examples: New roof, new furnace, renovation</li>
          </ul>

          <h3>Grey Areas</h3>
          <ul>
            <li>CRA looks at nature and extent</li>
            <li>Keep good documentation</li>
            <li>When in doubt, capitalize</li>
            <li>Professional advice for large amounts</li>
          </ul>

          <h2>Capital Cost Allowance (CCA)</h2>

          <h3>What Is CCA</h3>
          <ul>
            <li>Depreciation for tax purposes</li>
            <li>Building: Class 1 (4%)</li>
            <li>Furniture/appliances: Class 8 (20%)</li>
            <li>Optional—don't have to claim</li>
          </ul>

          <h3>CCA on Building</h3>
          <ul>
            <li>Only building portion (not land)</li>
            <li>Typically 75-85% is building</li>
            <li>Class 1: 4% declining balance</li>
            <li>Reduces your cost base</li>
          </ul>

          <h3>CCA Recapture Warning</h3>
          <ul>
            <li>When you sell, CCA claimed is "recaptured"</li>
            <li>Added to income in year of sale</li>
            <li>Taxed as regular income (not capital gain)</li>
            <li>Consider whether CCA is worthwhile</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>CCA Strategy:</strong> Many landlords skip CCA to avoid recapture on sale. CCA only defers tax—it doesn't eliminate it. Consider your long-term plans.
            </p>
          </div>

          <h2>Rental Losses</h2>

          <h3>Can You Have a Loss?</h3>
          <ul>
            <li>Yes—if expenses exceed income</li>
            <li>Loss offsets other income</li>
            <li>Must have reasonable expectation of profit</li>
            <li>CRA may challenge perpetual losses</li>
          </ul>

          <h3>Loss Limitations</h3>
          <ul>
            <li>CCA cannot create or increase loss</li>
            <li>Only current expenses create loss</li>
            <li>Carry forward CCA if needed</li>
          </ul>

          <h3>Reasonable Expectation of Profit</h3>
          <ul>
            <li>Must intend to make profit</li>
            <li>Not just personal benefit</li>
            <li>Below-market rent to family: problematic</li>
            <li>Document business intent</li>
          </ul>

          <h2>Multiple Properties</h2>

          <h3>Reporting Options</h3>
          <ul>
            <li>Pool all properties on one T776</li>
            <li>Or separate T776 for each</li>
            <li>Losses on one offset income on others</li>
          </ul>

          <h3>Same Class Pooling</h3>
          <ul>
            <li>Properties share CCA pool</li>
            <li>Selling one affects whole pool</li>
            <li>Strategic considerations</li>
          </ul>

          <h2>Principal Residence Conversion</h2>

          <h3>Converting to Rental</h3>
          <ul>
            <li>Deemed disposition at FMV</li>
            <li>May trigger capital gain</li>
            <li>Can elect to defer</li>
            <li>PR exemption preserved (up to 4 years)</li>
          </ul>

          <h3>Converting Back to PR</h3>
          <ul>
            <li>Another deemed disposition</li>
            <li>May use PR exemption for some years</li>
            <li>Complex rules—get advice</li>
          </ul>

          <h2>Short-Term Rentals (Airbnb)</h2>

          <h3>Tax Treatment</h3>
          <ul>
            <li>Still rental income</li>
            <li>Report on T776</li>
            <li>Same deductions apply</li>
            <li>Platform fees deductible</li>
          </ul>

          <h3>GST/HST Considerations</h3>
          <ul>
            <li>Short-term rentals (under 30 days): may need GST/HST</li>
            <li>Long-term residential: exempt</li>
            <li>$30,000 threshold applies</li>
            <li>Platform may collect for you</li>
          </ul>

          <h3>Principal Residence Impact</h3>
          <ul>
            <li>May affect PR exemption</li>
            <li>Depends on usage and changes made</li>
            <li>Business use portion considerations</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>Documents to Keep</h3>
          <ul>
            <li>All expense receipts</li>
            <li>Rental agreements/leases</li>
            <li>Bank statements</li>
            <li>Mortgage statements</li>
            <li>Property tax bills</li>
            <li>Insurance documents</li>
          </ul>

          <h3>Track These Items</h3>
          <ul>
            <li>Purchase price and costs</li>
            <li>Improvements (capital additions)</li>
            <li>CCA claimed each year</li>
            <li>ACB (adjusted cost base)</li>
          </ul>

          <h3>How Long to Keep</h3>
          <ul>
            <li>6 years from filing</li>
            <li>Property records: until 6 years after sale</li>
            <li>Digital records acceptable</li>
          </ul>

          <h2>Selling Rental Property</h2>

          <h3>Capital Gain</h3>
          <ul>
            <li>Selling price minus ACB</li>
            <li>50% inclusion rate (first $250K/year)</li>
            <li>66.67% inclusion (above $250K/year)</li>
            <li>No principal residence exemption</li>
          </ul>

          <h3>CCA Recapture</h3>
          <ul>
            <li>If sell above UCC (undepreciated capital cost)</li>
            <li>Recapture taxed as regular income</li>
            <li>Not capital gain—no 50% inclusion</li>
          </ul>

          <h3>Terminal Loss</h3>
          <ul>
            <li>If sell below UCC</li>
            <li>Can claim terminal loss</li>
            <li>Deductible against income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example Sale:</strong> Property cost $300K (building $240K, land $60K). Claimed $40K CCA. Sell for $500K (building $400K, land $100K). CCA recapture: $40K taxed as income. Capital gain: ~$160K building + $40K land = $200K × 50% = $100K taxable.
            </p>
          </div>

          <h2>Co-Ownership</h2>

          <h3>With Spouse</h3>
          <ul>
            <li>Split income based on ownership %</li>
            <li>Or based on who contributed funds</li>
            <li>Attribution rules may apply</li>
            <li>Document ownership clearly</li>
          </ul>

          <h3>With Others</h3>
          <ul>
            <li>Each reports their share</li>
            <li>Partnership rules may apply</li>
            <li>Get written agreement</li>
          </ul>

          <h2>Tax Planning Strategies</h2>

          <h3>Timing Expenses</h3>
          <ul>
            <li>Accelerate repairs to high-income years</li>
            <li>Defer if expecting higher income next year</li>
            <li>Year-end planning important</li>
          </ul>

          <h3>Mortgage Structure</h3>
          <ul>
            <li>Keep rental mortgage separate</li>
            <li>Pay down personal mortgage first</li>
            <li>Rental interest is deductible</li>
          </ul>

          <h3>CCA Decision</h3>
          <ul>
            <li>Claim if rental income positive</li>
            <li>Skip if losses or plan to sell soon</li>
            <li>Consider recapture implications</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Rental Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about rental property taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Rental property taxation involves many variables. Keep detailed records and consider professional advice for complex situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
