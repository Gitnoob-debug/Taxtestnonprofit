import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'BC Tax Guide 2025 | British Columbia Tax Rates, Brackets & Credits',
  description: 'Complete British Columbia tax guide for 2025. Learn about BC tax brackets, BC Climate Action Tax Credit, BC Family Benefit, property transfer tax, and provincial tax planning strategies.',
  keywords: 'BC tax rates 2025, British Columbia tax brackets, BC Climate Action Tax Credit, BC tax credits, BC Family Benefit, BC property transfer tax, BC PST',
  openGraph: {
    title: 'BC Tax Guide 2025 | British Columbia Tax Rates & Credits',
    description: 'Complete guide to BC provincial taxes, brackets, credits, and benefits for 2025.',
    type: 'article',
  },
}

export default function BCTaxGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            British Columbia Tax Guide 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Everything you need to know about BC provincial taxes, tax brackets, credits, and benefits for the 2025 tax year.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 mb-4 text-xl">BC Tax at a Glance for 2025</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Lowest Rate: 5.06%</p>
                <p className="text-blue-700 text-sm">On first $47,937 of income</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Highest Rate: 20.5%</p>
                <p className="text-blue-700 text-sm">Income over $252,752</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-blue-900">7 Tax Brackets</p>
                <p className="text-blue-700 text-sm">Progressive tax system</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-li:sm:text-lg prose-ul:my-4 prose-ol:my-4">

          <h2 id="bc-tax-brackets">BC Tax Brackets 2025</h2>
          <p>
            British Columbia has a progressive tax system with 7 tax brackets. Here are the 2025 provincial tax rates (indexed for inflation):
          </p>

          {/* BC Tax Brackets Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="text-left p-3 font-semibold border-b">Taxable Income</th>
                  <th className="text-left p-3 font-semibold border-b">BC Tax Rate</th>
                  <th className="text-left p-3 font-semibold border-b">Combined Rate*</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b">Up to $47,937</td>
                  <td className="p-3 border-b font-medium text-green-600">5.06%</td>
                  <td className="p-3 border-b">20.06%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">$47,937 to $95,875</td>
                  <td className="p-3 border-b font-medium">7.70%</td>
                  <td className="p-3 border-b">22.70%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$95,875 to $110,076</td>
                  <td className="p-3 border-b font-medium">10.50%</td>
                  <td className="p-3 border-b">30.50%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">$110,076 to $133,664</td>
                  <td className="p-3 border-b font-medium">12.29%</td>
                  <td className="p-3 border-b">32.29%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$133,664 to $181,232</td>
                  <td className="p-3 border-b font-medium">14.70%</td>
                  <td className="p-3 border-b">40.70%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">$181,232 to $252,752</td>
                  <td className="p-3 border-b font-medium">16.80%</td>
                  <td className="p-3 border-b">46.12%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">Over $252,752</td>
                  <td className="p-3 border-b font-medium text-red-600">20.50%</td>
                  <td className="p-3 border-b font-medium text-red-600">53.50%</td>
                </tr>
              </tbody>
            </table>
            <p className="text-slate-500 text-xs mt-2">*Combined federal + BC provincial marginal rate</p>
          </div>

          <h2 id="bc-tax-credits">Key BC Tax Credits & Benefits</h2>

          <h3>BC Climate Action Tax Credit</h3>
          <p>Quarterly payment to help offset carbon tax costs:</p>
          <ul>
            <li><strong>Adults:</strong> Up to $504/year ($126/quarter)</li>
            <li><strong>Children:</strong> Up to $126/year ($31.50/quarter)</li>
            <li><strong>Income-tested:</strong> Phases out at higher incomes</li>
            <li><strong>Payment schedule:</strong> Quarterly with GST/HST credit (Jan, Apr, Jul, Oct)</li>
          </ul>

          <h4>Eligibility Requirements</h4>
          <ul>
            <li><strong>BC resident</strong> on December 31 of the tax year</li>
            <li><strong>File tax return</strong> (even with no income)</li>
            <li><strong>Age 19+</strong> (or parent, married, or previously married)</li>
          </ul>

          <h3>BC Family Benefit</h3>
          <p>Monthly payments for families with children under 18:</p>
          <ul>
            <li><strong>Maximum benefit:</strong> Up to $1,750 per child per year</li>
            <li><strong>Income-tested:</strong> Based on family net income</li>
            <li><strong>Payment:</strong> Monthly, combined with CCB</li>
            <li><strong>Refundable:</strong> You get it even if you owe no tax</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Automatic Payments</p>
                <p className="text-emerald-700 text-sm">
                  Both the BC Climate Action Tax Credit and BC Family Benefit are paid automatically when you file your taxes—no separate application needed. Just make sure to file your return!
                </p>
              </div>
            </div>
          </div>

          <h3>BC Training Tax Credit</h3>
          <ul>
            <li><strong>For apprentices:</strong> In Red Seal trades programs</li>
            <li><strong>Per level:</strong> $1,000 per level completed</li>
            <li><strong>Completion bonus:</strong> Up to $2,500 for program completion</li>
            <li><strong>Employers:</strong> Can also claim a credit for hiring apprentices</li>
          </ul>

          <h3>BC Mining Flow-Through Share Tax Credit</h3>
          <ul>
            <li><strong>Credit rate:</strong> 20% of BC mining exploration expenses</li>
            <li><strong>For:</strong> Flow-through share investors</li>
            <li><strong>Applies to:</strong> BC mineral exploration activities</li>
          </ul>

          <h2 id="bc-sales-taxes">BC Sales Taxes</h2>

          <h3>Provincial Sales Tax (PST)</h3>
          <p>BC charges PST separately from GST (unlike HST provinces):</p>
          <ul>
            <li><strong>General rate:</strong> 7% on most goods and services</li>
            <li><strong>Liquor:</strong> 10%</li>
            <li><strong>Accommodation:</strong> 8%</li>
            <li><strong>Combined with GST:</strong> 12% total (5% GST + 7% PST)</li>
          </ul>

          <h3>What&apos;s Exempt from PST</h3>
          <ul>
            <li><strong>Basic groceries</strong> – food for human consumption</li>
            <li><strong>Children&apos;s clothing</strong> – for children under 15</li>
            <li><strong>Prescription medications</strong> – drugs prescribed by a doctor</li>
            <li><strong>Bicycles</strong> – including parts and accessories</li>
          </ul>

          <h2 id="property-transfer-tax">BC Property Transfer Tax</h2>
          <p>Paid when buying property in BC:</p>

          {/* Property Transfer Tax Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Property Value</th>
                  <th className="text-left p-3 font-semibold border-b">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b">First $200,000</td>
                  <td className="p-3 border-b font-medium">1%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">$200,001 to $2,000,000</td>
                  <td className="p-3 border-b font-medium">2%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">Over $2,000,000</td>
                  <td className="p-3 border-b font-medium">3%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">Over $3,000,000 (additional)</td>
                  <td className="p-3 border-b font-medium text-red-600">+2%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>First Time Home Buyers&apos; Exemption</h3>
          <ul>
            <li><strong>Full exemption:</strong> Homes up to $500,000</li>
            <li><strong>Partial exemption:</strong> Homes up to $525,000</li>
            <li><strong>Requirements:</strong> First-time buyer, Canadian citizen or PR</li>
            <li><strong>Savings:</strong> Up to $8,000 in tax</li>
          </ul>

          <h3>Newly Built Home Exemption</h3>
          <ul>
            <li><strong>Full exemption:</strong> Up to $750,000</li>
            <li><strong>Partial exemption:</strong> Up to $800,000</li>
            <li><strong>Applies to:</strong> New construction or substantially renovated homes</li>
            <li><strong>Savings:</strong> Up to $13,000 in tax</li>
          </ul>

          <h2 id="speculation-vacancy-tax">Speculation and Vacancy Tax</h2>
          <p>Annual tax on vacant homes in certain BC areas:</p>

          {/* Speculation Tax Rates */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Owner Type</th>
                  <th className="text-left p-3 font-semibold border-b">Tax Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b">Foreign owners / satellite families</td>
                  <td className="p-3 border-b font-medium text-red-600">2%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b">Canadian citizens/PR not paying BC tax</td>
                  <td className="p-3 border-b font-medium">1%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">BC residents</td>
                  <td className="p-3 border-b font-medium text-green-600">0.5%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p><strong>Applies in:</strong> Metro Vancouver, Victoria, Nanaimo-Lantzville, and other designated areas.</p>

          <h3>Exemptions from Speculation Tax</h3>
          <ul>
            <li><strong>Principal residence</strong> – your main home</li>
            <li><strong>Rented property</strong> – rented at least 6 months per year</li>
            <li><strong>Recent purchase</strong> – first year of ownership</li>
            <li><strong>Life circumstances</strong> – medical, separation, etc.</li>
          </ul>

          <h2 id="carbon-tax">BC Carbon Tax</h2>
          <p>Tax on fossil fuels to reduce greenhouse gas emissions:</p>
          <ul>
            <li><strong>Current rate:</strong> $80 per tonne of CO2 (2025)</li>
            <li><strong>Included in:</strong> Fuel prices at the pump</li>
            <li><strong>Offset:</strong> BC Climate Action Tax Credit helps offset the cost</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Carbon Tax Pause</p>
                <p className="text-amber-700 text-sm">
                  The federal government has announced a pause on the consumer carbon tax. Check current rates with the BC Ministry of Finance for the latest information on BC&apos;s carbon tax status.
                </p>
              </div>
            </div>
          </div>

          <h2 id="health-taxes">Medical Services Plan (MSP) & Employer Health Tax</h2>
          <ul>
            <li><strong>MSP premiums:</strong> Eliminated in 2020 – no individual payments</li>
            <li><strong>Replacement:</strong> Employer Health Tax</li>
          </ul>

          <h3>Employer Health Tax</h3>
          <ul>
            <li><strong>Who pays:</strong> Employers with payroll over $500,000</li>
            <li><strong>Rate:</strong> 1.95% for payrolls over $1.5 million</li>
            <li><strong>Employees:</strong> No employee contribution required</li>
          </ul>

          <h2 id="tax-planning">BC Tax Planning Strategies</h2>

          <h3>Income Splitting</h3>
          <ul>
            <li><strong>Pension income splitting:</strong> At age 65+, split up to 50% with spouse</li>
            <li><strong>Spousal RRSP:</strong> Contribute to spouse&apos;s RRSP for future income splitting</li>
            <li><strong>Family trusts:</strong> Complex strategy requiring professional advice</li>
          </ul>

          <h3>Capital Gains Planning</h3>
          <ul>
            <li><strong>Timing:</strong> Realize gains in lower income years</li>
            <li><strong>Loss harvesting:</strong> Use capital losses to offset gains</li>
            <li><strong>Principal residence:</strong> Maximize exemption with proper planning</li>
          </ul>

          <h3>Maximize Tax Credits</h3>
          <ul>
            <li><strong>File your return:</strong> Even with low/no income to receive benefits</li>
            <li><strong>Claim everything:</strong> Medical, donations, tuition transfers</li>
            <li><strong>Track receipts:</strong> Throughout the year for all eligible expenses</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <DollarSign className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">High Income Earners</p>
                <p className="text-blue-700 text-sm">
                  BC&apos;s top marginal rate of <strong>53.5%</strong> (combined federal/provincial) kicks in at $252,752.
                  Consider RRSP maximization, pension income splitting, and incorporation strategies to reduce your tax burden.
                </p>
              </div>
            </div>
          </div>

          <h2 id="bc-vs-other-provinces">BC vs Other Provinces</h2>
          <ul>
            <li><strong>Low income:</strong> BC competitive with 5.06% lowest bracket (one of the lowest in Canada)</li>
            <li><strong>Middle income:</strong> BC rates are moderate compared to Ontario</li>
            <li><strong>High income:</strong> BC has one of the highest top rates outside Quebec and Nova Scotia</li>
            <li><strong>Benefits:</strong> Strong family benefits and climate action credits</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About BC Taxes?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer specific questions about British Columbia taxes, credits, and tax planning strategies.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> Tax rates and credits are subject to change. This guide provides general information only.
              Verify current rates with the BC Ministry of Finance or consult a tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
