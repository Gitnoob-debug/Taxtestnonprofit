import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, HeartHandshake, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Caregiver Tax Credits Canada 2024 | Canada Caregiver Amount',
  description: 'Complete guide to caregiver tax credits in Canada. Learn about the Canada Caregiver Amount, eligible dependants, and how to claim caregiver credits on your taxes.',
  keywords: 'caregiver tax credit Canada, Canada Caregiver Amount, dependent tax credit, infirm dependent credit, caregiver amount CRA',
}

export default function CaregiverTaxCreditsPage() {
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
              <HeartHandshake className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Family Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Caregiver Tax Credits Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Support for Caregivers</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            The Canada Caregiver Amount provides tax relief for those supporting dependants with physical or mental impairments. Credits range from $2,499 to $7,999 depending on your situation.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Canada Caregiver Amount Overview</h2>

          <h3>2024 Maximum Amounts</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Dependant Type</th>
                <th>Maximum Credit</th>
                <th>Tax Savings</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Spouse/partner (infirm)</td>
                <td>$2,499</td>
                <td>~$375</td>
              </tr>
              <tr>
                <td>Eligible dependant (infirm)</td>
                <td>$2,499</td>
                <td>~$375</td>
              </tr>
              <tr>
                <td>Other infirm dependant 18+</td>
                <td>$7,999</td>
                <td>~$1,200</td>
              </tr>
              <tr>
                <td>Infirm child under 18</td>
                <td>$2,499</td>
                <td>~$375</td>
              </tr>
            </tbody>
          </table>

          <h3>How It Works</h3>
          <ul>
            <li>Non-refundable tax credit</li>
            <li>Reduces tax owing (15% of amount)</li>
            <li>Must have tax owing to benefit</li>
            <li>Can transfer unused portion to spouse</li>
          </ul>

          <h2>Eligible Dependants</h2>

          <h3>Who Qualifies</h3>
          <ul>
            <li>Spouse or common-law partner</li>
            <li>Child or grandchild (any age if infirm)</li>
            <li>Parent, grandparent</li>
            <li>Sibling, aunt, uncle, niece, nephew</li>
            <li>Must have physical or mental impairment</li>
          </ul>

          <h3>Relationship Requirements</h3>
          <ul>
            <li>By blood, marriage, common-law, or adoption</li>
            <li>Can be your dependant or spouse's dependant</li>
            <li>Must be Canadian resident at some point in year</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Requirement:</strong> The dependant must have a physical or mental impairment that makes them dependent on you for support. This doesn't require DTC approval but documentation helps.
            </p>
          </div>

          <h2>Types of Caregiver Credits</h2>

          <h3>1. Spouse/Partner Amount Enhancement</h3>
          <ul>
            <li>Add-on to spousal amount</li>
            <li>If spouse is infirm</li>
            <li>Up to $2,499 additional</li>
            <li>Reduced by spouse's income over threshold</li>
          </ul>

          <h3>2. Eligible Dependant Enhancement</h3>
          <ul>
            <li>Add-on to eligible dependant amount</li>
            <li>For single parents with infirm dependant</li>
            <li>Up to $2,499 additional</li>
            <li>Reduced by dependant's income</li>
          </ul>

          <h3>3. Other Infirm Dependants (Age 18+)</h3>
          <ul>
            <li>Full $7,999 caregiver amount</li>
            <li>Parent, grandparent, sibling, etc.</li>
            <li>Must be 18 or older</li>
            <li>Reduced when their income exceeds threshold</li>
          </ul>

          <h3>4. Infirm Children Under 18</h3>
          <ul>
            <li>$2,499 add-on to child amount</li>
            <li>Child must have impairment</li>
            <li>Not reduced by child's income</li>
          </ul>

          <h2>Income Thresholds</h2>

          <h3>Reduction Calculations (2024)</h3>
          <ul>
            <li>Credit starts reducing when dependant's income exceeds threshold</li>
            <li>Different thresholds for different credit types</li>
            <li>Reduces dollar for dollar above threshold</li>
          </ul>

          <h3>Full Credit vs Reduced</h3>
          <p>For dependent 18+ (not spouse or eligible dependant):</p>
          <ul>
            <li>Full $7,999 if their income under $18,783</li>
            <li>Reduced above that</li>
            <li>Eliminated when income reaches $26,782</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Income Calculation:</strong> Use the dependant's net income (Line 23600). Include pension income, OAS, etc. This determines if credit is reduced.
            </p>
          </div>

          <h2>Physical or Mental Impairment</h2>

          <h3>What Qualifies</h3>
          <ul>
            <li>Prolonged impairment expected to last 12+ months</li>
            <li>Markedly restricts ability to perform activities</li>
            <li>Makes them dependent on you for support</li>
            <li>Doesn't require DTC certification</li>
          </ul>

          <h3>Documentation</h3>
          <ul>
            <li>Doctor's note helpful but not mandatory</li>
            <li>Keep records of care provided</li>
            <li>Document expenses and time spent</li>
            <li>CRA may request verification</li>
          </ul>

          <h3>DTC vs Caregiver Amount</h3>
          <ul>
            <li>DTC has stricter criteria</li>
            <li>Caregiver amount may still apply without DTC</li>
            <li>If eligible for DTC, usually qualifies for caregiver</li>
            <li>Can claim both if eligible</li>
          </ul>

          <h2>Claiming on Your Tax Return</h2>

          <h3>Where to Claim</h3>
          <ul>
            <li><strong>Line 30300:</strong> Spouse caregiver enhancement</li>
            <li><strong>Line 30400:</strong> Eligible dependant caregiver enhancement</li>
            <li><strong>Line 30425:</strong> Canada caregiver for other infirm dependants</li>
            <li><strong>Line 30450:</strong> Canada caregiver for infirm children under 18</li>
          </ul>

          <h3>Information Required</h3>
          <ul>
            <li>Dependant's name and SIN</li>
            <li>Relationship to you</li>
            <li>Their net income</li>
            <li>Year of birth</li>
          </ul>

          <h2>Multiple Caregivers</h2>

          <h3>Sharing the Credit</h3>
          <ul>
            <li>Only one person can claim per dependant</li>
            <li>Or can split if agreed</li>
            <li>Must total to maximum allowed</li>
            <li>CRA may split if disagreement</li>
          </ul>

          <h3>Best Strategy</h3>
          <ul>
            <li>Person with highest income usually claims</li>
            <li>Or person with tax to reduce</li>
            <li>Consider combined family tax</li>
          </ul>

          <h2>Caregiver Amount + Other Credits</h2>

          <h3>Can Combine With</h3>
          <ul>
            <li>Disability Tax Credit (if dependant qualifies)</li>
            <li>Medical expense tax credit</li>
            <li>Home accessibility tax credit</li>
            <li>Disability supports deduction</li>
          </ul>

          <h3>Cannot Double Count</h3>
          <ul>
            <li>Same dependant can only support one caregiver claim</li>
            <li>Choose optimal credit if multiple apply</li>
          </ul>

          <h2>Caring for a Parent</h2>

          <h3>Common Scenario</h3>
          <ul>
            <li>Elderly parent with health issues</li>
            <li>Living with you or nearby</li>
            <li>Dependent on your support</li>
            <li>May qualify for full $7,999</li>
          </ul>

          <h3>Parent in Care Facility</h3>
          <ul>
            <li>May still claim if providing support</li>
            <li>Paying for care counts</li>
            <li>Visiting and managing affairs counts</li>
            <li>Document your involvement</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Example:</strong> You support your 75-year-old mother who has dementia and net income of $22,000. Maximum $7,999 reduced by ($22,000 - $18,783) = $3,217. Your credit: $4,782.
            </p>
          </div>

          <h2>Provincial Caregiver Credits</h2>

          <h3>Additional Benefits</h3>
          <ul>
            <li>Most provinces have similar credits</li>
            <li>Calculated automatically from federal</li>
            <li>Adds to total tax savings</li>
          </ul>

          <h3>Example Provinces</h3>
          <ul>
            <li><strong>Ontario:</strong> Ontario Caregiver Amount</li>
            <li><strong>BC:</strong> BC Caregiver Credit</li>
            <li><strong>Alberta:</strong> Alberta Caregiver Amount</li>
            <li>Amounts and rules vary</li>
          </ul>

          <h2>Record Keeping</h2>

          <h3>What to Keep</h3>
          <ul>
            <li>Medical documentation of impairment</li>
            <li>Receipts for care expenses</li>
            <li>Record of support provided</li>
            <li>Dependant's income records</li>
          </ul>

          <h3>How Long to Keep</h3>
          <ul>
            <li>6 years from end of tax year</li>
            <li>Longer if dispute or reassessment</li>
            <li>Digital copies acceptable</li>
          </ul>

          <h2>Common Mistakes</h2>

          <h3>Avoid These Errors</h3>
          <ul>
            <li>Not claiming when eligible</li>
            <li>Wrong line on tax return</li>
            <li>Using wrong income threshold</li>
            <li>Multiple family members claiming same dependant</li>
            <li>Not having documentation ready</li>
          </ul>

          <h3>If Denied</h3>
          <ul>
            <li>Request explanation from CRA</li>
            <li>Gather supporting documentation</li>
            <li>File notice of objection if appropriate</li>
            <li>Can amend previous years if missed</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Caregiver Credits?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about caregiver tax credits.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Eligibility for caregiver credits depends on individual circumstances. Keep documentation and consult a tax professional if unsure.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
