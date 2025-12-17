import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Heart, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Marriage & Common-Law Tax Guide Canada 2024 | Spousal Tax Benefits',
  description: 'Complete guide to tax changes when getting married or becoming common-law in Canada. Learn about spousal credits, income splitting, RRSP contributions, and benefit changes.',
  keywords: 'marriage tax Canada, common-law tax rules, spousal tax credit, married filing taxes Canada',
}

export default function MarriageCommonLawTaxesPage() {
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
              <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Life Events</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Marriage & Common-Law: Tax Implications
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-pink-900 dark:text-pink-100 mb-3">When Does Common-Law Start?</h2>
          <p className="text-pink-700 dark:text-pink-300 text-sm">
            You become common-law partners for tax purposes when you've lived together in a conjugal relationship for 12 continuous months, or immediately if you have a child together. Marriage takes effect immediately.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Changes When You Marry or Become Common-Law</h2>
          <ul>
            <li>You still file individual tax returns (no joint filing in Canada)</li>
            <li>You must report your spouse's income on your return</li>
            <li>Benefits are calculated based on combined family income</li>
            <li>New tax credits and planning opportunities become available</li>
            <li>Some benefits may be reduced or eliminated</li>
          </ul>

          <h2>Spousal Tax Credit</h2>
          <p>If your spouse earns little or no income, you can claim the spousal amount:</p>
          <ul>
            <li><strong>Maximum 2024:</strong> $15,705 (federal amount)</li>
            <li><strong>Reduced:</strong> Dollar-for-dollar by spouse's net income</li>
            <li><strong>Eliminated:</strong> When spouse's income exceeds $15,705</li>
            <li><strong>Tax savings:</strong> Up to ~$2,355 federal plus provincial</li>
          </ul>

          <h2>Eligible Dependant Amount</h2>
          <p>This credit (formerly "equivalent-to-spouse") is NOT available to married or common-law couples. If you claimed this as a single parent and now have a spouse, you lose this credit.</p>

          <h2>Impact on Benefits</h2>

          <h3>GST/HST Credit</h3>
          <ul>
            <li>One payment per couple instead of two individual payments</li>
            <li>Calculated on combined family net income</li>
            <li>May be reduced if combined income exceeds thresholds</li>
          </ul>

          <h3>Canada Child Benefit</h3>
          <ul>
            <li>Calculated on adjusted family net income</li>
            <li>May be significantly reduced with two incomes</li>
            <li>Only one parent receives CCB (primary caregiver)</li>
          </ul>

          <h3>Climate Action Incentive</h3>
          <ul>
            <li>Family amount instead of two single amounts</li>
            <li>Still includes amount per child</li>
          </ul>

          <h2>Spousal RRSP Contributions</h2>
          <p>Marriage unlocks spousal RRSP contributions:</p>
          <ul>
            <li>Higher earner contributes to spouse's RRSP</li>
            <li>Uses contributor's deduction room</li>
            <li>Funds belong to spouse for retirement</li>
            <li>Can equalize retirement income for tax savings later</li>
            <li>Attribution rules: 3-year waiting period for withdrawals</li>
          </ul>

          <h2>Transfer of Credits</h2>
          <p>Unused tax credits can be transferred between spouses:</p>
          <ul>
            <li><strong>Age amount:</strong> If spouse is 65+ and can't use it</li>
            <li><strong>Pension income amount:</strong> Up to $2,000</li>
            <li><strong>Disability amount:</strong> If spouse has DTC approval</li>
            <li><strong>Tuition credit:</strong> Up to $5,000 of unused current-year tuition</li>
          </ul>

          <h2>Medical Expenses</h2>
          <p>Married and common-law couples can pool medical expenses:</p>
          <ul>
            <li>Either spouse can claim all family medical expenses</li>
            <li>Usually lower-income spouse should claim</li>
            <li>Lower income = lower 3% threshold = larger credit</li>
          </ul>

          <h2>Charitable Donations</h2>
          <p>Pool donations for maximum benefit:</p>
          <ul>
            <li>Either spouse can claim all family donations</li>
            <li>First $200 gets 15% credit, above gets 29%+</li>
            <li>One spouse claiming $1,000 is better than two claiming $500 each</li>
          </ul>

          <h2>Capital Gains Planning</h2>

          <h3>Attribution Rules</h3>
          <p>Be aware of attribution when transferring assets:</p>
          <ul>
            <li>Gifting investments to spouse: Income attributes back to you</li>
            <li>Loans at prescribed rate: Can avoid attribution</li>
            <li>Spouse's own earnings: Not subject to attribution</li>
          </ul>

          <h3>Principal Residence</h3>
          <ul>
            <li>Couples can only designate one principal residence per year</li>
            <li>Plan sales carefully to maximize exemption</li>
          </ul>

          <h2>Notifying CRA</h2>
          <p>Update your marital status by:</p>
          <ul>
            <li><strong>Within the first month</strong> of the status change</li>
            <li>Using CRA My Account online</li>
            <li>Calling CRA directly</li>
            <li>Filing your tax return with new status</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Failing to report your spouse's income or update your marital status can result in benefits overpayments that must be repaid, plus potential penalties.
            </p>
          </div>

          <h2>Common-Law vs. Married: Tax Differences</h2>
          <p>For federal tax purposes, there is virtually no difference:</p>
          <ul>
            <li>Same spousal credit rules</li>
            <li>Same benefit calculations</li>
            <li>Same credit transfers</li>
            <li>Same RRSP options</li>
          </ul>
          <p>Some provincial programs may treat common-law differently—check your province's rules.</p>

          <h2>Same-Sex Couples</h2>
          <p>All rules apply equally to same-sex married and common-law couples since 2001 (common-law) and 2005 (marriage).</p>

          <h2>Planning Opportunities</h2>

          <h3>Income Splitting Strategies</h3>
          <ul>
            <li>Spousal RRSP contributions</li>
            <li>Prescribed rate loans for investments</li>
            <li>Paying spouse's expenses so they can invest</li>
            <li>Pension splitting in retirement</li>
          </ul>

          <h3>TFSA Strategy</h3>
          <ul>
            <li>Gift spouse money to contribute to their TFSA</li>
            <li>No attribution on TFSA income</li>
            <li>Each spouse has their own TFSA room</li>
          </ul>

          <h2>What If One Spouse Has Debt to CRA?</h2>
          <ul>
            <li>Your refund may be applied to spouse's debt</li>
            <li>CRA can intercept GST/HST credits</li>
            <li>Benefits calculations use combined income regardless</li>
            <li>Consider filing separately if one has outstanding balance</li>
          </ul>

          <h2>Getting Professional Help</h2>
          <p>Consider a tax professional if:</p>
          <ul>
            <li>Significant income disparity between spouses</li>
            <li>One spouse has investment income or rental property</li>
            <li>Complex situation involving previous relationship</li>
            <li>First year of marriage/common-law status</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Marriage and Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about spousal tax planning.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Tax implications of marriage or common-law status can be complex. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
