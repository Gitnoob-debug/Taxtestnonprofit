import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gig Economy Taxes Canada 2024 | Uber, DoorDash, Airbnb Tax Guide',
  description: 'Complete guide to gig economy taxes in Canada. Learn how to report income from Uber, DoorDash, Airbnb, Etsy. Self-employment tax deductions and HST/GST requirements.',
  keywords: 'gig economy taxes Canada, Uber driver taxes, DoorDash taxes, Airbnb host taxes, self-employed taxes, GST HST registration',
}

export default function GigEconomyTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Income Types</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Gig Economy Taxes: Uber, DoorDash, Airbnb & More
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Gig Workers Are Self-Employed</h2>
          <p className="text-orange-700 dark:text-orange-300 text-sm">
            Whether you drive for Uber, deliver for DoorDash, host on Airbnb, or sell on Etsy, you're considered self-employed. This means you must report all income, can claim business expenses, and may need to register for GST/HST.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Understanding Gig Economy Income</h2>
          <p>Gig economy income includes earnings from platform-based work where you're not an employee. Common examples include:</p>
          <ul>
            <li><strong>Rideshare:</strong> Uber, Lyft</li>
            <li><strong>Food delivery:</strong> DoorDash, Skip the Dishes, Uber Eats, Instacart</li>
            <li><strong>Short-term rentals:</strong> Airbnb, VRBO</li>
            <li><strong>Freelance work:</strong> Fiverr, Upwork</li>
            <li><strong>Online selling:</strong> Etsy, eBay, Amazon</li>
            <li><strong>Task-based work:</strong> TaskRabbit, Handy</li>
          </ul>

          <h2>How to Report Gig Income</h2>
          <p>Report your gig income on <strong>Form T2125 (Statement of Business Activities)</strong>, which is part of your T1 personal tax return.</p>

          <h3>What to Report</h3>
          <ul>
            <li><strong>Gross income:</strong> Total earnings before platform fees</li>
            <li><strong>All income sources:</strong> Even if you didn't receive a tax slip</li>
            <li><strong>Tips:</strong> All tips received, including cash</li>
            <li><strong>Bonuses:</strong> Promotions, referral bonuses, incentives</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> CRA can see your income. Platforms like Uber and Airbnb report payment data to CRA. Always report all income—CRA's matching systems will flag discrepancies.
            </p>
          </div>

          <h2>Common Deductible Expenses</h2>

          <h3>For Rideshare & Delivery Drivers</h3>
          <ul>
            <li><strong>Vehicle expenses:</strong> Gas, maintenance, repairs, car washes</li>
            <li><strong>Insurance:</strong> Commercial rideshare insurance (not personal)</li>
            <li><strong>Phone & data plan:</strong> Business-use percentage</li>
            <li><strong>Parking fees:</strong> When working (not personal errands)</li>
            <li><strong>Tolls:</strong> Highway tolls for work trips</li>
            <li><strong>Supplies:</strong> Phone mounts, charging cables, cleaning supplies</li>
            <li><strong>Platform fees:</strong> Commissions paid to Uber, DoorDash, etc.</li>
          </ul>

          <h3>For Airbnb Hosts</h3>
          <ul>
            <li><strong>Platform fees:</strong> Airbnb service fees</li>
            <li><strong>Cleaning costs:</strong> Professional cleaning services</li>
            <li><strong>Supplies:</strong> Toiletries, linens, towels</li>
            <li><strong>Utilities:</strong> Proportionate share of electricity, water, internet</li>
            <li><strong>Insurance:</strong> Additional short-term rental coverage</li>
            <li><strong>Repairs & maintenance:</strong> Fixing things for guests</li>
            <li><strong>Furniture & decor:</strong> Items for rental space (capital cost allowance)</li>
            <li><strong>Property taxes & mortgage interest:</strong> Proportionate share</li>
          </ul>

          <h3>For Online Sellers (Etsy, eBay)</h3>
          <ul>
            <li><strong>Platform fees:</strong> Listing fees, transaction fees</li>
            <li><strong>Materials:</strong> Cost of goods sold</li>
            <li><strong>Shipping supplies:</strong> Boxes, tape, labels</li>
            <li><strong>Shipping costs:</strong> Postage (not reimbursed by buyer)</li>
            <li><strong>Payment processing:</strong> PayPal, Stripe fees</li>
            <li><strong>Home office:</strong> If you have dedicated workspace</li>
            <li><strong>Photography:</strong> Equipment for product photos</li>
          </ul>

          <h2>Vehicle Expense Methods</h2>
          <p>For rideshare and delivery drivers, choose one method to calculate vehicle expenses:</p>

          <h3>Method 1: Actual Expenses</h3>
          <p>Track all actual vehicle costs, then multiply by business-use percentage:</p>
          <ul>
            <li>Gas and oil</li>
            <li>Repairs and maintenance</li>
            <li>Insurance</li>
            <li>License and registration</li>
            <li>Interest on car loan</li>
            <li>Lease payments</li>
            <li>Capital cost allowance (depreciation)</li>
          </ul>

          <h3>Method 2: Simplified (Per-Kilometer)</h3>
          <p>Track business kilometers and use CRA's prescribed rates:</p>
          <ul>
            <li><strong>2024 rates:</strong> $0.70/km for first 5,000 km, $0.64/km thereafter</li>
            <li>Must keep a detailed mileage log</li>
            <li>Cannot claim CCA or actual expenses with this method</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> For most rideshare drivers with high kilometers, the actual expense method usually provides a larger deduction. Calculate both ways to see which benefits you more.
            </p>
          </div>

          <h2>Keeping a Mileage Log</h2>
          <p>A proper mileage log should include:</p>
          <ul>
            <li>Date of each trip</li>
            <li>Starting and ending odometer readings</li>
            <li>Destination and purpose</li>
            <li>Total kilometers driven</li>
          </ul>
          <p>Apps like Stride, Everlance, or MileIQ can automate this tracking.</p>

          <h2>GST/HST Requirements</h2>

          <h3>$30,000 Threshold</h3>
          <p>You must register for GST/HST if your worldwide taxable supplies exceed $30,000 in any single calendar quarter or over four consecutive quarters.</p>

          <h3>Rideshare Exception</h3>
          <p>Uber and Lyft drivers must register for GST/HST <strong>from their first ride</strong>—there's no $30,000 threshold for taxi and rideshare services.</p>

          <h3>Once Registered</h3>
          <ul>
            <li>Charge GST/HST on your services</li>
            <li>Claim Input Tax Credits (ITCs) on business expenses</li>
            <li>File GST/HST returns (usually quarterly or annually)</li>
          </ul>

          <h3>Airbnb GST/HST</h3>
          <ul>
            <li>Short-term rentals (under 30 days) are generally taxable</li>
            <li>$30,000 threshold applies</li>
            <li>Long-term rentals (30+ days) are typically exempt</li>
          </ul>

          <h2>CPP Contributions</h2>
          <p>As a self-employed person, you pay both the employee and employer portions of CPP:</p>
          <ul>
            <li><strong>2024 rate:</strong> 11.9% of net self-employment income</li>
            <li><strong>Maximum contribution:</strong> ~$7,735</li>
            <li><strong>Exemption:</strong> First $3,500 of net income</li>
          </ul>
          <p>Half of your CPP contribution is deductible on Line 22200 of your return.</p>

          <h2>Quarterly Instalment Payments</h2>
          <p>If you expect to owe more than $3,000 in taxes (or $1,800 in Quebec), you may need to make quarterly instalments:</p>
          <ul>
            <li><strong>Due dates:</strong> March 15, June 15, September 15, December 15</li>
            <li><strong>Penalty:</strong> Interest charged on late or insufficient payments</li>
            <li><strong>First year:</strong> Usually not required in your first year of self-employment</li>
          </ul>

          <h2>Platform-Specific Considerations</h2>

          <h3>Uber/Lyft</h3>
          <ul>
            <li>GST/HST registration required from first ride</li>
            <li>Must have commercial auto insurance</li>
            <li>Tax summaries available in driver app</li>
            <li>Tips are taxable income</li>
          </ul>

          <h3>DoorDash/Skip the Dishes</h3>
          <ul>
            <li>$30,000 threshold applies for GST/HST</li>
            <li>Delivery bags may be deductible</li>
            <li>Base pay + tips = total income</li>
          </ul>

          <h3>Airbnb</h3>
          <ul>
            <li>Report on T776 if treating as rental property</li>
            <li>Report on T2125 if providing significant services (like B&B)</li>
            <li>Platform provides income summaries</li>
            <li>Municipal rules may apply (permits, taxes)</li>
          </ul>

          <h3>Etsy/Online Selling</h3>
          <ul>
            <li>Track inventory costs carefully</li>
            <li>Distinguish between business income and hobby</li>
            <li>Cost of goods sold = opening inventory + purchases - closing inventory</li>
          </ul>

          <h2>Record Keeping Requirements</h2>
          <p>Keep these records for 6 years:</p>
          <ul>
            <li>All income records and payment summaries</li>
            <li>Receipts for every expense claimed</li>
            <li>Mileage log (if claiming vehicle expenses)</li>
            <li>Bank statements showing deposits</li>
            <li>Credit card statements for business purchases</li>
            <li>Home office measurements (if claiming)</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Not reporting all income:</strong> Including cash tips and bonuses</li>
            <li><strong>Claiming personal expenses:</strong> Only business-use portion is deductible</li>
            <li><strong>No mileage log:</strong> CRA can deny vehicle claims without documentation</li>
            <li><strong>Missing GST/HST registration:</strong> Especially for rideshare drivers</li>
            <li><strong>Not setting aside tax money:</strong> Self-employed don't have source deductions</li>
            <li><strong>Mixing personal and business:</strong> Use separate accounts if possible</li>
          </ul>

          <h2>Tax Planning Tips</h2>
          <ul>
            <li><strong>Set aside 25-30%</strong> of each payment for taxes</li>
            <li><strong>Track expenses year-round</strong> using apps or spreadsheets</li>
            <li><strong>Consider RRSP contributions</strong> to reduce taxable income</li>
            <li><strong>Max out TFSA</strong> to shelter investment growth</li>
            <li><strong>Keep business bank account separate</strong> for easier tracking</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Gig Income?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about self-employment taxes and deductions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Tax rules for gig workers can be complex. Consider consulting a tax professional, especially for GST/HST registration and vehicle expense calculations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
