import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Gift, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Charitable Donation Tax Credit Canada 2024 | Maximize Your Donation Deductions',
  description: 'Complete guide to charitable donation tax credits in Canada. Learn how to maximize tax benefits from donations, eligible charities, and super credit rules.',
  keywords: 'charitable donation tax credit Canada, donation tax receipt, registered charity CRA, maximize donation deduction',
}

export default function CharitableDonationsPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-pink-100 dark:bg-pink-900 p-2.5 rounded-xl">
              <Gift className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Charitable Donation Tax Credit Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-pink-900 dark:text-pink-100 mb-3">Two-Tier Tax Credit</h2>
          <p className="text-pink-700 dark:text-pink-300 text-sm">
            The charitable donation tax credit is calculated at two rates: 15% on the first $200 of donations, and 29% (or 33% if in top tax bracket) on amounts over $200. This makes larger donations more tax-efficient.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How the Credit Is Calculated</h2>

          <h3>Federal Credit Rates</h3>
          <ul>
            <li><strong>First $200:</strong> 15% credit rate</li>
            <li><strong>Over $200:</strong> 29% credit rate</li>
            <li><strong>Over $200 (top bracket):</strong> 33% if taxable income exceeds $246,752</li>
          </ul>

          <h3>Provincial Credits</h3>
          <p>Each province adds its own donation tax credit on top of the federal credit. Combined federal and provincial credits typically return 40-50% of donations over $200.</p>

          <h3>Example Calculation</h3>
          <p>If you donate $1,000 in Ontario:</p>
          <ul>
            <li>First $200 × 15% federal = $30</li>
            <li>Next $800 × 29% federal = $232</li>
            <li>First $200 × 5.05% Ontario = $10.10</li>
            <li>Next $800 × 11.16% Ontario = $89.28</li>
            <li><strong>Total credit: ~$361</strong> (36% effective rate)</li>
          </ul>

          <h2>Who Can Issue Tax Receipts</h2>
          <p>Only registered charities can issue official donation receipts. Verify charity status:</p>
          <ul>
            <li><strong>CRA Charities Listing:</strong> Search the CRA website to confirm registration</li>
            <li><strong>Registration number:</strong> Must appear on the receipt</li>
            <li><strong>Qualified donees:</strong> Include registered charities, amateur athletic associations, and certain government bodies</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Donations to crowdfunding campaigns, GoFundMe, individuals, or unregistered organizations do NOT qualify for tax receipts, even if for charitable purposes.
            </p>
          </div>

          <h2>What Qualifies as a Donation</h2>

          <h3>Cash Donations</h3>
          <ul>
            <li>Money given with no expectation of goods or services in return</li>
            <li>Pre-authorized monthly donations</li>
            <li>One-time contributions</li>
          </ul>

          <h3>Gifts in Kind</h3>
          <ul>
            <li>Publicly traded securities (stocks, bonds, mutual funds)</li>
            <li>Art, antiques, and collectibles</li>
            <li>Real estate</li>
            <li>Certified cultural property</li>
          </ul>

          <h3>What Doesn't Qualify</h3>
          <ul>
            <li>Volunteer time or services</li>
            <li>Lottery or raffle ticket purchases</li>
            <li>Membership fees that provide benefits</li>
            <li>Event tickets where you receive value</li>
            <li>Amount above fair market value of goods received</li>
          </ul>

          <h2>Donating Securities: Zero Capital Gains</h2>
          <p>One of the best tax planning strategies: Donate publicly traded securities directly to charity.</p>

          <h3>Benefits</h3>
          <ul>
            <li><strong>No capital gains tax:</strong> Completely exempt when donated directly</li>
            <li><strong>Full fair market value receipt:</strong> Receive tax receipt for current value</li>
            <li><strong>Double benefit:</strong> Avoid gains tax + get donation credit</li>
          </ul>

          <h3>Example</h3>
          <p>You own shares worth $10,000 (cost $3,000):</p>
          <ul>
            <li><strong>If sold then donated cash:</strong> Pay tax on $7,000 gain (~$1,750), donate $10,000, credit ~$4,000</li>
            <li><strong>If donated directly:</strong> No gains tax, donate $10,000, credit ~$4,000</li>
            <li><strong>Tax savings:</strong> Additional $1,750 by donating directly</li>
          </ul>

          <h2>Donation Limits</h2>
          <ul>
            <li><strong>Annual limit:</strong> 75% of net income</li>
            <li><strong>Carry forward:</strong> Unused donations can be carried forward 5 years</li>
            <li><strong>Capital property donations:</strong> May have higher limits in year of donation</li>
            <li><strong>Death year:</strong> Limit increases to 100% of net income</li>
          </ul>

          <h2>Pooling Donations Between Spouses</h2>
          <p>Either spouse can claim all family donations to maximize the credit:</p>
          <ul>
            <li>One spouse claims all donations over $200 threshold</li>
            <li>Usually most beneficial for higher-income spouse</li>
            <li>Ensures the full amount above $200 gets 29%+ rate</li>
          </ul>

          <h2>Split Receipting</h2>
          <p>When you receive something in exchange for your donation (like a gala dinner), only the portion exceeding the value received is eligible:</p>
          <ul>
            <li><strong>Donation:</strong> $200 for charity dinner</li>
            <li><strong>Value of dinner:</strong> $75</li>
            <li><strong>Eligible donation:</strong> $125</li>
          </ul>
          <p>The charity must indicate this on your receipt.</p>

          <h2>Required Receipt Information</h2>
          <p>Official donation receipts must include:</p>
          <ul>
            <li>Charity's name and address</li>
            <li>Charity's registration number</li>
            <li>Receipt serial number</li>
            <li>Date donation received</li>
            <li>Donor's name and address</li>
            <li>Eligible amount of donation</li>
            <li>Description and fair market value of gifts in kind</li>
          </ul>

          <h2>Claiming Strategies</h2>

          <h3>Bundle Small Donations</h3>
          <p>If you make small donations throughout the year, make sure the total exceeds $200 to benefit from the higher rate on amounts above the threshold.</p>

          <h3>Carry Forward If Needed</h3>
          <p>If your income is low this year but expected to increase, carry donations forward to a higher-income year for a bigger credit.</p>

          <h3>Year-End Planning</h3>
          <p>Donations must be made by December 31 to claim on that year's return. Plan larger donations strategically.</p>

          <h3>Donate Appreciated Securities</h3>
          <p>Always donate appreciated stocks directly rather than selling and donating cash.</p>

          <h2>Political Contributions vs. Charitable Donations</h2>
          <p>Political contributions to registered federal parties have their own credit (separate from charitable donations):</p>
          <ul>
            <li><strong>First $400:</strong> 75% credit</li>
            <li><strong>$400-$750:</strong> 50% credit</li>
            <li><strong>$750-$1,275:</strong> 33.33% credit</li>
            <li><strong>Maximum credit:</strong> $650</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Missing receipts:</strong> Keep all official donation receipts</li>
            <li><strong>Claiming unregistered charities:</strong> Verify registration status</li>
            <li><strong>Not pooling spousal donations:</strong> One spouse should claim all</li>
            <li><strong>Selling securities then donating:</strong> Donate directly to avoid capital gains</li>
            <li><strong>Missing the $200 threshold:</strong> Higher rate only applies above $200</li>
          </ul>

          <h2>Documentation Requirements</h2>
          <p>Keep for 6 years:</p>
          <ul>
            <li>Official donation receipts from registered charities</li>
            <li>Appraisals for gifts in kind over $1,000</li>
            <li>Broker statements for securities donations</li>
            <li>Any correspondence about large or complex donations</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Donations?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about maximizing your donation tax credits.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. For complex donations involving securities, real estate, or large amounts, consult a tax professional.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
