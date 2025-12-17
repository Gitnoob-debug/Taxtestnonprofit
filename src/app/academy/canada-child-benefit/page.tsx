import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Heart, ArrowRight, CheckCircle, AlertTriangle, DollarSign, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canada Child Benefit (CCB) 2025 | Payment Amounts, Calculator & Eligibility Guide',
  description: 'Complete guide to the Canada Child Benefit for 2025. Learn CCB payment amounts, eligibility requirements, income thresholds, disability supplement, payment dates, and how to maximize your family benefits.',
  keywords: 'Canada Child Benefit 2025, CCB 2025, child tax benefit Canada, CCB calculator, CCB payment dates, CCB eligibility, Child Disability Benefit',
  openGraph: {
    title: 'Canada Child Benefit (CCB) 2025 | Complete Guide',
    description: 'Everything you need to know about the Canada Child Benefit: payment amounts, eligibility, and how to maximize your benefits.',
    type: 'article',
  },
}

export default function CanadaChildBenefitPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 p-2.5 rounded-xl">
              <Heart className="h-6 w-6 text-rose-600" />
            </div>
            <span className="text-sm font-medium text-rose-600">Family Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Canada Child Benefit (CCB) 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Complete guide to Canada&apos;s tax-free monthly payment for families with children under 18.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 mb-4 text-xl">2025 CCB at a Glance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-rose-900">Under 6</p>
                <p className="text-rose-700 text-sm">Up to $7,787/year</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-rose-900">Ages 6-17</p>
                <p className="text-rose-700 text-sm">Up to $6,570/year</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-rose-900">100% Tax-Free</p>
                <p className="text-rose-700 text-sm">Not reported as income</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-li:sm:text-lg prose-ul:my-4 prose-ol:my-4">

          <h2 id="ccb-amounts">2024-2025 CCB Maximum Amounts</h2>
          <p>For the July 2024 to June 2025 benefit year (based on your 2023 tax return):</p>

          {/* CCB Amounts Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-rose-100">
                  <th className="text-left p-3 font-semibold border-b">Child&apos;s Age</th>
                  <th className="text-left p-3 font-semibold border-b">Maximum Annual</th>
                  <th className="text-left p-3 font-semibold border-b">Maximum Monthly</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium">Under 6 years</td>
                  <td className="p-3 border-b text-green-600 font-bold">$7,787</td>
                  <td className="p-3 border-b">$648.91</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">6 to 17 years</td>
                  <td className="p-3 border-b text-green-600 font-bold">$6,570</td>
                  <td className="p-3 border-b">$547.50</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Child Disability Benefit (additional)</td>
                  <td className="p-3 border-b text-blue-600 font-bold">+$3,173</td>
                  <td className="p-3 border-b">+$264.41</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="eligibility">Eligibility Requirements</h2>
          <p>To receive CCB, you must meet all of the following criteria:</p>
          <ul>
            <li><strong>Live with a child under 18</strong> – the child must reside with you</li>
            <li><strong>Be primarily responsible</strong> – for the child&apos;s care and upbringing</li>
            <li><strong>Be a Canadian resident</strong> – for tax purposes</li>
            <li><strong>Status requirement:</strong> You or your spouse must be a Canadian citizen, permanent resident, protected person, or temporary resident who lived in Canada for at least 18 months</li>
          </ul>

          <h3>Who Is &quot;Primarily Responsible&quot;?</h3>
          <p>CRA considers the primarily responsible person to be the one who:</p>
          <ul>
            <li><strong>Supervises</strong> – daily activities and the child&apos;s needs</li>
            <li><strong>Arranges childcare</strong> – when necessary</li>
            <li><strong>Participates</strong> – in educational and recreational activities</li>
            <li><strong>Attends</strong> – to health needs and medical appointments</li>
          </ul>

          <h2 id="ccb-calculation">How CCB Is Calculated</h2>
          <p>
            CCB is income-tested, meaning your payment decreases as your family income increases. The reduction is gradual and based on your adjusted family net income (AFNI).
          </p>

          <h3>Income Thresholds (2024-2025)</h3>
          {/* Income Thresholds Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Family Net Income</th>
                  <th className="text-left p-3 font-semibold border-b">What Happens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium">Under $36,502</td>
                  <td className="p-3 border-b text-green-600 font-medium">Full benefit</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">$36,502 - $79,087</td>
                  <td className="p-3 border-b">Reduced by 7% (1 child) to 23% (4+ children) on income above $36,502</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Over $79,087</td>
                  <td className="p-3 border-b">Further reduced by 3.2% (1 child) to 9.5% (4+ children) on income above $79,087</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Example Calculation</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Family with 2 children (ages 4 and 8), income $60,000</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Step 1:</strong> Maximum benefit = $7,787 (under 6) + $6,570 (6-17) = $14,357</li>
              <li><strong>Step 2:</strong> Income over threshold = $60,000 - $36,502 = $23,498</li>
              <li><strong>Step 3:</strong> Reduction (13.5% for 2 children) = $23,498 × 13.5% = $3,172</li>
              <li className="text-green-700 font-medium pt-2">Annual CCB: $14,357 - $3,172 = $11,185</li>
              <li className="text-green-700 font-medium">Monthly payment: ~$932</li>
            </ul>
          </div>

          <h2 id="child-disability-benefit">Child Disability Benefit (CDB)</h2>
          <p>If your child is approved for the Disability Tax Credit (DTC), you may receive additional support:</p>
          <ul>
            <li><strong>Additional $3,173 per year</strong> – per eligible child</li>
            <li><strong>Also income-tested</strong> – but with separate calculation</li>
            <li><strong>Apply for DTC first</strong> – using Form T2201</li>
            <li><strong>Automatic enrollment</strong> – CDB is added once DTC is approved</li>
          </ul>

          <h2 id="payment-schedule">Payment Schedule</h2>
          <p>CCB is paid monthly, usually on the 20th of each month:</p>
          <ul>
            <li><strong>Benefit year:</strong> July to June (e.g., July 2024 to June 2025)</li>
            <li><strong>Based on:</strong> Previous year&apos;s tax return</li>
            <li><strong>Small payments:</strong> If under $20/year, paid as annual lump sum in July</li>
          </ul>

          <h3>2025 CCB Payment Dates</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <Calendar className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-2">Mark Your Calendar</p>
                <p className="text-blue-700 text-sm">
                  <strong>2025 Dates:</strong> January 20, February 20, March 20, April 17, May 20, June 20, July 18, August 20, September 19, October 20, November 20, December 12
                </p>
              </div>
            </div>
          </div>

          <h2 id="how-to-apply">How to Apply for CCB</h2>

          <h3>New Baby</h3>
          <ul>
            <li><strong>Easiest way:</strong> Register at birth through provincial birth registration</li>
            <li><strong>Alternative:</strong> Use Form RC66 (Canada Child Benefits Application)</li>
            <li><strong>Deadline:</strong> Apply within 11 months of birth for retroactive payments</li>
          </ul>

          <h3>New to Canada</h3>
          <ul>
            <li><strong>18-month wait:</strong> For temporary residents without status</li>
            <li><strong>Apply immediately:</strong> If you&apos;re a permanent resident, citizen, or protected person</li>
            <li><strong>Required:</strong> Use Form RC66 with supporting documents</li>
          </ul>

          <h3>Custody Changes</h3>
          <ul>
            <li><strong>Notify CRA immediately</strong> – of any custody changes</li>
            <li><strong>Shared custody:</strong> Both parents may receive CCB (see below)</li>
          </ul>

          <h2 id="shared-custody">Shared Custody Situations</h2>
          <p>When parents share custody relatively equally (40-60% split):</p>
          <ul>
            <li><strong>Each parent receives 50%</strong> – of the CCB amount they would otherwise receive</li>
            <li><strong>Separate calculations</strong> – each amount based on that parent&apos;s family income</li>
            <li><strong>Both must file:</strong> Both parents must file tax returns</li>
            <li><strong>CRA determines:</strong> Shared custody status based on actual living arrangements</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Primary Custody</p>
                <p className="text-amber-700 text-sm">
                  If you have primary custody (child lives with you more than 60% of the time), you receive 100% of the CCB.
                  Make sure to notify CRA of the actual living arrangement.
                </p>
              </div>
            </div>
          </div>

          <h2 id="income-definition">Income Definition for CCB</h2>
          <p>CCB is based on adjusted family net income (AFNI):</p>
          <ul>
            <li><strong>Your net income</strong> – from Line 23600 of your tax return</li>
            <li><strong>Plus spouse&apos;s net income</strong> – if applicable</li>
            <li><strong>Minus certain adjustments</strong> – UCCB, RDSP, split pension income received</li>
          </ul>

          <h2 id="maximize-ccb">Strategies to Maximize CCB</h2>

          <h3>RRSP Contributions</h3>
          <p>
            RRSP contributions reduce net income, potentially increasing CCB. The &quot;marginal effective tax rate&quot; can exceed 50% when accounting for CCB phase-out. This makes RRSPs especially valuable for families receiving CCB.
          </p>

          <h3>Income Splitting</h3>
          <p>
            Spousal RRSP contributions can help balance incomes and potentially increase CCB over time. When the lower-income spouse withdraws in retirement, overall family taxes are reduced.
          </p>

          <h3>Self-Employment Deductions</h3>
          <p>
            If self-employed, maximize legitimate business deductions to reduce net income. This lowers your AFNI and can increase your CCB payment.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">CCB Boost from RRSPs</p>
                <p className="text-emerald-700 text-sm">
                  A $1,000 RRSP contribution could save you $300+ in taxes AND increase your CCB by $70-230 depending on your income and number of children. That&apos;s a potential 30-50%+ return on your RRSP contribution!
                </p>
              </div>
            </div>
          </div>

          <h2 id="keeping-ccb-current">Keeping CCB Current</h2>
          <ul>
            <li><strong>File taxes on time:</strong> Late filing can stop payments</li>
            <li><strong>Update marital status:</strong> Within 11 months of change</li>
            <li><strong>Report custody changes:</strong> Immediately</li>
            <li><strong>Update address:</strong> Keep CRA records current</li>
            <li><strong>Register new children:</strong> Within 11 months of birth</li>
          </ul>

          <h2 id="when-ccb-stops">When CCB Stops</h2>
          <p>CCB payments end when:</p>
          <ul>
            <li><strong>Child turns 18</strong> – payment for the month of their 18th birthday is the last</li>
            <li><strong>Child no longer lives with you</strong> – custody changes</li>
            <li><strong>Child or parent dies</strong> – CRA must be notified</li>
            <li><strong>Parent no longer a Canadian resident</strong> – for tax purposes</li>
          </ul>

          <h2 id="provincial-programs">Provincial Child Benefits</h2>
          <p>Many provinces add their own child benefits on top of the federal CCB:</p>
          <ul>
            <li><strong>Ontario:</strong> Ontario Child Benefit (OCB)</li>
            <li><strong>BC:</strong> BC Family Benefit</li>
            <li><strong>Alberta:</strong> Alberta Child and Family Benefit (ACFB)</li>
            <li><strong>Quebec:</strong> Quebec Family Allowance (separate program)</li>
          </ul>
          <p>Provincial benefits are typically combined with CCB payments and paid together.</p>

          <h2 id="common-questions">Common CCB Questions</h2>

          <h3>Is CCB taxable?</h3>
          <p><strong>No.</strong> CCB is completely tax-free and not reported as income on your tax return.</p>

          <h3>Can two people claim for the same child?</h3>
          <p>Only through a shared custody arrangement. Otherwise, only the primarily responsible parent receives CCB.</p>

          <h3>What if my income changes mid-year?</h3>
          <p>CCB is recalculated each July based on the previous year&apos;s tax return. You cannot request an adjustment for current-year income changes.</p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About CCB?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer specific questions about Canada Child Benefit eligibility, calculations, and how to maximize your payments.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> CCB amounts are indexed annually for inflation. This guide uses 2024-2025 figures.
              Use CRA&apos;s official CCB calculator for your specific situation, or contact the CRA directly for personalized information.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
