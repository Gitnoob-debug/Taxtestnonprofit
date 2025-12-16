import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, GraduationCap, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'RESP Guide Canada 2024 | Education Savings & Government Grants',
  description: 'Complete guide to RESPs in Canada. Learn about CESG grants, contribution limits, family vs individual plans, withdrawal strategies, and tax optimization.',
  keywords: 'RESP Canada, CESG grant, education savings plan, RESP contribution limit, RESP withdrawal rules',
}

export default function RESPEducationSavingsPage() {
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
              <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            RESP: Education Savings & Grants Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Free Money from Government</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            The RESP provides up to $7,200 in free government grants (CESG) per child, plus tax-sheltered growth. It's one of the best guaranteed returns available to Canadian families.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Government Grants</h2>

          <h3>Canada Education Savings Grant (CESG)</h3>
          <ul>
            <li><strong>Basic CESG:</strong> 20% on first $2,500 contributed = $500/year</li>
            <li><strong>Lifetime maximum:</strong> $7,200 per child</li>
            <li><strong>Eligibility:</strong> Children under 18 with SIN</li>
            <li><strong>Carryforward:</strong> Unused grant room carries forward</li>
          </ul>

          <h3>Additional CESG (Low Income)</h3>
          <p>Extra 10-20% on first $500 for lower-income families:</p>
          <ul>
            <li>Family income under ~$53,000: Additional 20%</li>
            <li>Family income ~$53,000-$106,000: Additional 10%</li>
            <li>Maximum extra: $100/year</li>
          </ul>

          <h3>Canada Learning Bond (CLB)</h3>
          <ul>
            <li>For low-income families</li>
            <li>$500 initial bond + $100/year up to age 15</li>
            <li>Maximum $2,000 per child</li>
            <li>No contribution required</li>
          </ul>

          <h2>Contribution Rules</h2>

          <h3>Limits</h3>
          <ul>
            <li><strong>Annual CESG limit:</strong> $500 (on $2,500 contribution)</li>
            <li><strong>Catch-up:</strong> $1,000 CESG/year (on $5,000 contribution)</li>
            <li><strong>Lifetime limit:</strong> $50,000 per beneficiary</li>
            <li><strong>No annual limit:</strong> But grant only on first $2,500</li>
          </ul>

          <h3>Optimal Strategy</h3>
          <ul>
            <li>Contribute $2,500/year to maximize CESG</li>
            <li>If behind, contribute $5,000/year to catch up</li>
            <li>Start at birth to maximize grant years</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Contributing $2,500 annually from birth to age 17 = $45,000 contributions + $7,200 CESG + tax-sheltered growth. That's a 16% guaranteed return from grants alone.
            </p>
          </div>

          <h2>Plan Types</h2>

          <h3>Individual RESP</h3>
          <ul>
            <li>One beneficiary only</li>
            <li>Beneficiary can be anyone (including yourself)</li>
            <li>Simpler administration</li>
            <li>Can transfer to sibling if needed</li>
          </ul>

          <h3>Family RESP</h3>
          <ul>
            <li>Multiple beneficiaries (must be related by blood or adoption)</li>
            <li>Funds can be shared among siblings</li>
            <li>Grants stay with original child unless transferred</li>
            <li>More flexibility if one child doesn't pursue education</li>
          </ul>

          <h3>Group RESP</h3>
          <ul>
            <li>Pooled plans through scholarship trusts</li>
            <li>Rigid rules and contribution schedules</li>
            <li>High fees common</li>
            <li>Generally not recommended—use self-directed instead</li>
          </ul>

          <h2>Investment Options</h2>

          <h3>Self-Directed RESP</h3>
          <ul>
            <li>Choose your own investments</li>
            <li>Stocks, bonds, ETFs, mutual funds, GICs</li>
            <li>Lowest fees (especially with ETFs)</li>
            <li>Available at banks, brokerages</li>
          </ul>

          <h3>Investment Strategy</h3>
          <ul>
            <li><strong>Early years:</strong> Higher equity allocation</li>
            <li><strong>Approaching education:</strong> Shift to bonds/GICs</li>
            <li><strong>Target date funds:</strong> Automatic adjustment</li>
            <li><strong>Risk tolerance:</strong> Less time = less risk capacity</li>
          </ul>

          <h2>Withdrawals (EAPs vs PSE)</h2>

          <h3>Educational Assistance Payments (EAP)</h3>
          <ul>
            <li>Grants + investment earnings</li>
            <li>Taxable to the student (usually low/no tax)</li>
            <li>Must be enrolled in qualifying program</li>
            <li>Limits: $8,000 in first 13 weeks, unlimited after</li>
          </ul>

          <h3>Post-Secondary Education (PSE) Payments</h3>
          <ul>
            <li>Return of your contributions</li>
            <li>Tax-free (already taxed when earned)</li>
            <li>No limit on withdrawals</li>
            <li>Withdraw anytime student is enrolled</li>
          </ul>

          <h3>Withdrawal Strategy</h3>
          <ul>
            <li>Maximize EAPs each year (to use student's low bracket)</li>
            <li>Withdraw PSE as needed for remaining expenses</li>
            <li>Plan over multiple years of education</li>
          </ul>

          <h2>Qualifying Educational Programs</h2>

          <h3>Full-Time</h3>
          <ul>
            <li>University, college, CEGEP</li>
            <li>At least 10 hours/week of instruction</li>
            <li>Minimum 3 consecutive weeks</li>
          </ul>

          <h3>Part-Time</h3>
          <ul>
            <li>Post-secondary level</li>
            <li>At least 12 hours/month of courses</li>
            <li>Minimum 3 consecutive weeks</li>
            <li>EAP limit: $2,500 per 13-week period</li>
          </ul>

          <h3>Also Qualifies</h3>
          <ul>
            <li>Trade schools and apprenticeships</li>
            <li>Foreign universities (many countries)</li>
            <li>Some professional certifications</li>
          </ul>

          <h2>If Child Doesn't Go to School</h2>

          <h3>Wait and See</h3>
          <ul>
            <li>RESP can stay open 35 years after opening</li>
            <li>Child may pursue education later</li>
            <li>No penalty for waiting</li>
          </ul>

          <h3>Transfer to Sibling</h3>
          <ul>
            <li>Change beneficiary to another child</li>
            <li>Grants stay if new beneficiary has room</li>
            <li>No tax implications</li>
          </ul>

          <h3>Transfer to RRSP (AIP)</h3>
          <ul>
            <li>Transfer up to $50,000 of earnings to your RRSP</li>
            <li>Need RRSP contribution room</li>
            <li>Plan must be at least 10 years old</li>
            <li>Beneficiary must be 21+ and not pursuing education</li>
          </ul>

          <h3>Collapse the Plan</h3>
          <ul>
            <li>Grants returned to government</li>
            <li>Contributions returned tax-free</li>
            <li>Earnings (AIP) taxed at your rate + 20% penalty</li>
            <li>Last resort option</li>
          </ul>

          <h2>Tax Benefits</h2>

          <h3>For Subscriber (Parent)</h3>
          <ul>
            <li>Contributions are NOT tax-deductible</li>
            <li>Growth is tax-sheltered</li>
            <li>No tax on contributions when withdrawn</li>
          </ul>

          <h3>For Beneficiary (Student)</h3>
          <ul>
            <li>EAPs taxed as their income</li>
            <li>Usually little/no tax due to low income</li>
            <li>Basic personal amount shelters first ~$15,000</li>
            <li>Tuition credits offset remaining tax</li>
          </ul>

          <h2>RESP Strategies</h2>

          <h3>Start Early</h3>
          <ul>
            <li>More years to collect CESG</li>
            <li>Longer compounding period</li>
            <li>Can start immediately after birth (get SIN first)</li>
          </ul>

          <h3>Catch-Up Contributions</h3>
          <ul>
            <li>If you start late, contribute $5,000/year</li>
            <li>Gets $1,000 CESG (current year + one year catch-up)</li>
            <li>Maximize remaining grant years</li>
          </ul>

          <h3>Grandparent RESPs</h3>
          <ul>
            <li>Grandparents can open RESP for grandchild</li>
            <li>Gifts to parents for their RESP are also common</li>
            <li>Consider family plan for flexibility</li>
          </ul>

          <h2>Provincial Grants</h2>

          <h3>Quebec Education Savings Incentive (QESI)</h3>
          <ul>
            <li>10% on first $2,500 ($250/year)</li>
            <li>Lifetime max $3,600</li>
            <li>Additional for low-income families</li>
          </ul>

          <h3>BC Training and Education Savings Grant</h3>
          <ul>
            <li>$1,200 one-time grant</li>
            <li>Children born 2006 or later</li>
            <li>Apply between ages 6-9</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Over-contributing:</strong> Exceeding $50,000 lifetime creates penalties</li>
            <li><strong>Missing catch-up:</strong> Only $1,000 CESG per year max, can't catch up all at once</li>
            <li><strong>Group plan fees:</strong> High costs erode returns</li>
            <li><strong>Not using grants:</strong> Leaving free money on the table</li>
            <li><strong>Forgetting BC grant:</strong> Must apply by age 9</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About RESPs?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about education savings strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> RESP rules can change. This guide provides general information. Check current rules on the Government of Canada website or consult a financial professional.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
