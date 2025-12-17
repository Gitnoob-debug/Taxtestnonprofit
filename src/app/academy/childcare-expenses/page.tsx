import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Baby, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Childcare Expense Deduction Canada 2024 | Daycare Tax Deduction Guide',
  description: 'Complete guide to claiming childcare expenses in Canada. Learn eligibility, limits by age, who can claim, eligible care types, and maximize your deduction.',
  keywords: 'childcare expense deduction Canada, daycare tax deduction, childcare tax credit, nanny tax deduction Canada',
}

export default function ChildcareExpensesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2.5 rounded-xl">
              <Baby className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Deductions & Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Childcare Expense Deduction: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-yellow-900 dark:text-yellow-100 mb-3">Lower-Income Spouse Rule</h2>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm">
            In most cases, the lower-income spouse must claim childcare expenses. This is a deduction (not a credit), meaning it reduces taxable income directly. The lower-income rule ensures consistent treatment across families.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Annual Deduction Limits</h2>
          <p>Maximum amounts you can claim per child depend on the child's age:</p>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Child's Age</th>
                <th>Annual Limit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Under 7 years old</td>
                <td>$8,000</td>
              </tr>
              <tr>
                <td>7 to 16 years old</td>
                <td>$5,000</td>
              </tr>
              <tr>
                <td>Any age with disability (eligible for DTC)</td>
                <td>$11,000</td>
              </tr>
            </tbody>
          </table>

          <p>Age is determined as of December 31 of the tax year.</p>

          <h2>Types of Eligible Childcare</h2>
          <ul>
            <li><strong>Licensed daycare centres:</strong> Full-time or part-time programs</li>
            <li><strong>Home daycares:</strong> Licensed or unlicensed caregivers</li>
            <li><strong>Nannies and babysitters:</strong> In-home care providers</li>
            <li><strong>Before/after school programs:</strong> Care during work hours</li>
            <li><strong>Day camps:</strong> Including sports camps (not overnight)</li>
            <li><strong>Boarding schools:</strong> Child's portion only (limited)</li>
            <li><strong>Overnight camps:</strong> Limited to $200-$275 per week</li>
          </ul>

          <h3>Camp Limits</h3>
          <ul>
            <li><strong>Day camps:</strong> Full deduction up to annual limit</li>
            <li><strong>Overnight camps:</strong> $200/week (regular), $275/week (disabled child)</li>
          </ul>

          <h2>What Doesn't Qualify</h2>
          <ul>
            <li>Medical or hospital care</li>
            <li>Clothing, food, or transportation</li>
            <li>Education or tutoring fees</li>
            <li>Payments to the child's parent</li>
            <li>Payments to related persons under 18</li>
            <li>Recreational activities not primarily for childcare</li>
          </ul>

          <h2>Who Can Claim</h2>

          <h3>Two-Parent Families</h3>
          <p>The lower-income spouse must claim childcare expenses, UNLESS that spouse:</p>
          <ul>
            <li>Was enrolled in school full-time</li>
            <li>Was unable to care for children due to disability</li>
            <li>Was confined to prison for at least 2 weeks</li>
            <li>Was in a hospital for at least 2 weeks</li>
            <li>Lived apart from higher-income spouse for at least 90 days due to breakdown</li>
          </ul>

          <h3>Single Parents</h3>
          <p>The single parent claims all childcare expenses on their return.</p>

          <h3>Shared Custody</h3>
          <p>Each parent claims expenses they paid during their custody period, up to their individual limits.</p>

          <h2>Income Limitation</h2>
          <p>The childcare deduction is also limited to 2/3 of earned income for the lower-income spouse. Earned income includes:</p>
          <ul>
            <li>Employment income (before deductions)</li>
            <li>Self-employment income</li>
            <li>Research grants</li>
            <li>Disability pension under CPP/QPP</li>
          </ul>

          <h3>Example</h3>
          <p>If the lower-income spouse has earned income of $15,000:</p>
          <ul>
            <li>Maximum claim: $15,000 × 2/3 = $10,000</li>
            <li>If child is under 7 with $12,000 in daycare costs, claim is limited to $10,000</li>
          </ul>

          <h2>When Higher-Income Spouse Can Claim</h2>
          <p>If the lower-income spouse has one of these situations, the higher-income spouse can claim for those weeks/months:</p>

          <h3>Full-Time Student</h3>
          <p>Higher earner can claim up to:</p>
          <ul>
            <li>$200/week per child under 7</li>
            <li>$125/week per child 7-16</li>
            <li>$275/week per child with disability</li>
          </ul>

          <h3>Incapacity, Prison, or Separation</h3>
          <p>Similar weekly limits apply when lower-income spouse is unable to provide care.</p>

          <h2>Required Receipts</h2>
          <p>You must obtain receipts showing:</p>
          <ul>
            <li>Care provider's name and address</li>
            <li>Provider's Social Insurance Number (or business number)</li>
            <li>Amount paid</li>
            <li>Dates of care</li>
            <li>Child's name</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Care providers must report childcare income. If you can't get their SIN, you may still claim if you have receipts and made reasonable efforts to obtain it.
            </p>
          </div>

          <h2>Claiming Process</h2>
          <ol>
            <li>Gather all childcare receipts</li>
            <li>Calculate total paid per child</li>
            <li>Apply annual limits based on age</li>
            <li>Check 2/3 earned income limit</li>
            <li>Report on Line 21400 of lower-income spouse's return</li>
          </ol>

          <h2>Example Calculation</h2>
          <p>The Smiths have two children and paid these childcare costs:</p>
          <ul>
            <li>Emma (age 4): $10,000 daycare</li>
            <li>Jack (age 9): $3,000 after-school program + $1,500 summer camp</li>
          </ul>

          <p>Lower-income spouse earned $45,000:</p>
          <ul>
            <li>Emma: Limited to $8,000 (under 7 limit)</li>
            <li>Jack: $4,500 (under $5,000 limit)</li>
            <li>Total eligible: $12,500</li>
            <li>2/3 income test: $45,000 × 2/3 = $30,000 (not limiting)</li>
            <li><strong>Deduction claimed: $12,500</strong></li>
          </ul>

          <h2>Quebec Childcare</h2>
          <p>Quebec residents have different rules:</p>
          <ul>
            <li>Federal deduction still applies</li>
            <li>Quebec offers a refundable tax credit instead of provincial deduction</li>
            <li>Credit rate varies by income (26-75%)</li>
            <li>Subsidized daycare ($8.70/day) already has tax benefit built in</li>
          </ul>

          <h2>Common Mistakes to Avoid</h2>
          <ul>
            <li><strong>Wrong spouse claiming:</strong> Must be lower-income unless exception applies</li>
            <li><strong>Missing SIN:</strong> Get provider's SIN for receipts</li>
            <li><strong>Exceeding limits:</strong> Check both annual and earned income limits</li>
            <li><strong>Counting education:</strong> Tutoring and school fees don't count</li>
            <li><strong>Forgetting camp limits:</strong> Overnight camps have lower weekly limits</li>
          </ul>

          <h2>Documentation to Keep</h2>
          <p>Maintain these records for 6 years:</p>
          <ul>
            <li>All childcare receipts with provider SIN</li>
            <li>Registration forms showing dates of care</li>
            <li>Bank statements or cancelled cheques</li>
            <li>Proof of payment for each provider</li>
          </ul>

          <h2>Tax Planning Tips</h2>
          <ul>
            <li><strong>Time expenses strategically:</strong> Prepaying January daycare in December doesn't help—claim in year care is provided</li>
            <li><strong>Consider RRSP contributions:</strong> Lower-income spouse's RRSP contributions reduce income, potentially shifting claim to higher earner</li>
            <li><strong>Keep summer camp receipts:</strong> Day camps count toward annual limit</li>
            <li><strong>Don't overlook babysitters:</strong> Occasional babysitting for work counts too</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Childcare Expenses?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about claiming childcare costs.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This information is for general guidance. Childcare expense rules can be complex for shared custody or special circumstances. Consult a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
