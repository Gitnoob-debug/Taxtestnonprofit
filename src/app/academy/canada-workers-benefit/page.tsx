import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canada Workers Benefit (CWB) 2025 | Refundable Tax Credit Guide & Calculator',
  description: 'Complete guide to the Canada Workers Benefit for 2025. Learn CWB eligibility, income thresholds, disability supplement, advance payments (ACWB), and how to maximize your refundable tax credit.',
  keywords: 'Canada Workers Benefit 2025, CWB 2025, working income tax benefit, low income tax credit Canada, CWB disability supplement, ACWB advance payments',
  openGraph: {
    title: 'Canada Workers Benefit (CWB) 2025 | Complete Guide',
    description: 'Everything you need to know about the CWB refundable tax credit for low-income workers in Canada.',
    type: 'article',
  },
}

export default function CanadaWorkersBenefitPage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 p-2.5 rounded-xl">
              <Briefcase className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-emerald-600">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Canada Workers Benefit (CWB) 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            A refundable tax credit designed to help low-income workers keep more of their earnings—even if you owe no taxes.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 mb-4 text-xl">2025 CWB at a Glance</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-emerald-900">Single: Up to $1,518</p>
                <p className="text-emerald-700 text-sm">Plus $784 disability supplement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-emerald-900">Family: Up to $2,616</p>
                <p className="text-emerald-700 text-sm">Plus $784 disability supplement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-emerald-900">100% Refundable</p>
                <p className="text-emerald-700 text-sm">Get it even if you owe no tax</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-li:sm:text-lg prose-ul:my-4 prose-ol:my-4">

          <h2 id="cwb-amounts">2025 CWB Maximum Benefits</h2>
          <p>The CWB provides significant support to low-income workers. Here are the maximum amounts for the 2025 tax year:</p>

          {/* CWB Amounts Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100">
                  <th className="text-left p-3 font-semibold border-b">Category</th>
                  <th className="text-left p-3 font-semibold border-b">Maximum Basic</th>
                  <th className="text-left p-3 font-semibold border-b">Disability Supplement</th>
                  <th className="text-left p-3 font-semibold border-b">Total Possible</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium">Single individual</td>
                  <td className="p-3 border-b text-green-600 font-bold">$1,518</td>
                  <td className="p-3 border-b">$784</td>
                  <td className="p-3 border-b font-bold">$2,302</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">Family (couple or single parent)</td>
                  <td className="p-3 border-b text-green-600 font-bold">$2,616</td>
                  <td className="p-3 border-b">$784</td>
                  <td className="p-3 border-b font-bold">$3,400</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="eligibility">Eligibility Requirements</h2>
          <p>To qualify for the CWB, you must meet ALL of the following criteria:</p>
          <ul>
            <li><strong>Canadian resident</strong> – throughout the entire tax year</li>
            <li><strong>Age requirement:</strong> Be 19+ on December 31, OR have a spouse/common-law partner, OR be a parent living with your child</li>
            <li><strong>Working income</strong> – employment or self-employment income (not just EI or pensions)</li>
            <li><strong>Student restriction:</strong> Not a full-time student for more than 13 weeks (unless you have an eligible dependant)</li>
            <li><strong>Not incarcerated</strong> – for 90+ days during the year</li>
          </ul>

          <h3>Income Limits (2025)</h3>
          <p>For most provinces (Alberta, Quebec, and Nunavut have variations):</p>
          <ul>
            <li><strong>Single:</strong> Net income under approximately $33,000</li>
            <li><strong>Family:</strong> Family net income under approximately $43,000</li>
          </ul>

          <h2 id="cwb-calculation">How the CWB Is Calculated</h2>
          <p>
            The CWB calculation involves three stages: phase-in (benefit grows), maximum benefit, and phase-out (benefit decreases).
          </p>

          <h3>Phase-In (Benefit Grows)</h3>
          <p>The benefit increases as your working income rises:</p>
          <ul>
            <li><strong>Single:</strong> 27% of working income over $3,000</li>
            <li><strong>Family:</strong> 27% of working income over $3,000</li>
          </ul>

          <h3>Maximum Benefit Zone</h3>
          <p>You receive the maximum benefit when working income reaches:</p>
          <ul>
            <li><strong>Single:</strong> Around $9,000 working income</li>
            <li><strong>Family:</strong> Around $13,000 working income</li>
          </ul>

          <h3>Phase-Out (Benefit Decreases)</h3>
          <p>The benefit decreases as adjusted net income exceeds the threshold:</p>
          <ul>
            <li><strong>Single:</strong> Reduced by 15% of income over ~$23,000</li>
            <li><strong>Family:</strong> Reduced by 15% of family income over ~$26,000</li>
          </ul>

          <h2 id="disability-supplement">Disability Supplement</h2>
          <p>If you&apos;re approved for the Disability Tax Credit (DTC), you may also receive the CWB Disability Supplement:</p>
          <ul>
            <li><strong>Maximum:</strong> $784 for 2025</li>
            <li><strong>Both spouses:</strong> Can claim if both have DTC approval</li>
            <li><strong>Same structure:</strong> Phase-in/phase-out similar to basic CWB</li>
          </ul>

          <h2 id="examples">Example Calculations</h2>

          <h3>Example 1: Single Worker ($18,000 income)</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Sarah earns $18,000 at her job</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Step 1:</strong> Working income over $3,000 = $15,000</li>
              <li><strong>Step 2:</strong> Phase-in calculation = $15,000 × 27% = $4,050</li>
              <li><strong>Step 3:</strong> Capped at maximum = $1,518</li>
              <li><strong>Step 4:</strong> No phase-out (income under $23,000)</li>
              <li className="text-green-700 font-medium pt-2">CWB received: $1,518</li>
            </ul>
          </div>

          <h3>Example 2: Single Worker with Higher Income ($28,000)</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">James earns $28,000</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li><strong>Step 1:</strong> Starts with maximum = $1,518</li>
              <li><strong>Step 2:</strong> Income over phase-out threshold = $28,000 - $23,000 = $5,000</li>
              <li><strong>Step 3:</strong> Phase-out reduction = $5,000 × 15% = $750</li>
              <li className="text-green-700 font-medium pt-2">CWB received: $1,518 - $750 = $768</li>
            </ul>
          </div>

          <h2 id="advance-payments">Advance Payments (ACWB)</h2>
          <p>You can receive up to 50% of your expected CWB in advance quarterly payments:</p>

          <h3>How to Apply for Advance Payments</h3>
          <ul>
            <li><strong>Complete Schedule 6</strong> – with your tax return</li>
            <li><strong>Check the box</strong> – for advance payments</li>
            <li><strong>CRA calculates</strong> – and sends payments throughout the year</li>
          </ul>

          <h3>2025 ACWB Payment Schedule</h3>
          <ul>
            <li><strong>July 2025:</strong> First advance payment</li>
            <li><strong>October 2025:</strong> Second payment</li>
            <li><strong>January 2026:</strong> Third payment</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Caution: Income Changes</p>
                <p className="text-amber-700 text-sm">
                  If your income increases during the year, you may receive more advance payments than you&apos;re entitled to.
                  This creates a balance owing on your next tax return. Only opt for advance payments if your income is stable and predictable.
                </p>
              </div>
            </div>
          </div>

          <h2 id="provincial-variations">Provincial Variations</h2>
          <p>Some provinces have modified CWB programs:</p>

          <h3>Alberta</h3>
          <p>Higher thresholds but same maximum benefits. Alberta&apos;s program recognizes higher cost of living.</p>

          <h3>Quebec</h3>
          <p>Quebec has its own program called the <strong>Work Premium (Prime au travail)</strong> instead of the federal CWB. Quebec residents claim this provincial credit instead.</p>

          <h3>Nunavut</h3>
          <p>Modified thresholds reflecting the significantly higher cost of living in Canada&apos;s north.</p>

          <h2 id="second-earner">Second Earner Exemption</h2>
          <p>
            For couples, the lower-earning spouse can exclude up to <strong>$14,000</strong> of their working income when calculating the family&apos;s adjusted net income for the phase-out.
            This helps families where both spouses work by allowing them to keep more of their CWB.
          </p>

          <h2 id="how-to-claim">How to Claim the CWB</h2>
          <ol>
            <li><strong>File your tax return</strong> – with all income reported</li>
            <li><strong>Complete Schedule 6</strong> – Canada Workers Benefit form</li>
            <li><strong>CRA calculates automatically</strong> – your entitlement</li>
            <li><strong>Credit applied</strong> – to your refund or balance owing</li>
          </ol>

          <h2 id="cwb-other-benefits">CWB and Other Benefits</h2>

          <h3>Impact on Other Credits</h3>
          <p>The CWB is separate from and doesn&apos;t reduce:</p>
          <ul>
            <li><strong>GST/HST Credit</strong> – you can receive both</li>
            <li><strong>Canada Child Benefit</strong> – separate programs</li>
            <li><strong>Provincial benefits</strong> – stackable with most provincial credits</li>
          </ul>

          <h3>Interaction with EI</h3>
          <p>EI benefits count as income for phase-out purposes but NOT as &quot;working income&quot; for the phase-in calculation. This means EI doesn&apos;t help you qualify but can reduce your benefit.</p>

          <h2 id="common-questions">Common CWB Questions</h2>

          <h3>What counts as &quot;working income&quot;?</h3>
          <p>Employment income (before deductions), self-employment income, and certain taxable benefits. EI, pensions, and investment income do NOT count.</p>

          <h3>Can students claim CWB?</h3>
          <p>Only if enrolled full-time for 13 weeks or less during the year, OR if you have an eligible dependant.</p>

          <h3>Do I need to apply separately?</h3>
          <p>No separate application needed—just complete Schedule 6 with your tax return. CRA calculates automatically.</p>

          <h2 id="maximize-cwb">Tips to Maximize Your CWB</h2>
          <ul>
            <li><strong>File your taxes:</strong> You MUST file to receive the CWB—even if you have no tax owing</li>
            <li><strong>Apply for DTC:</strong> The disability supplement adds up to $784 in additional benefits</li>
            <li><strong>Consider advance payments:</strong> If your income is stable and predictable</li>
            <li><strong>Contribute to RRSP:</strong> Reduces adjusted net income, potentially increasing your CWB</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">RRSP Boost</p>
                <p className="text-emerald-700 text-sm">
                  RRSP contributions can double-dip: you get the tax deduction AND potentially increase your CWB by lowering your adjusted net income below the phase-out threshold.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About CWB?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer specific questions about the Canada Workers Benefit, eligibility, and how to maximize your payment.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> CWB amounts and thresholds are indexed annually for inflation. This guide uses 2025 figures.
              Always check CRA&apos;s current figures when filing your tax return.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
