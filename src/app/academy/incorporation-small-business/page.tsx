import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Building2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Incorporation for Small Business Canada 2024 | Tax Benefits Guide',
  description: 'Complete guide to incorporating your small business in Canada. Learn about tax advantages, small business deduction, salary vs dividends, and when incorporation makes sense.',
  keywords: 'incorporate business Canada, small business deduction, salary vs dividends, corporate tax rate Canada, professional corporation',
}

export default function IncorporationSmallBusinessPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-200 dark:bg-slate-700 p-2.5 rounded-xl">
              <Building2 className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Incorporation: Small Business Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />13 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Tax Deferral, Not Elimination</h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm">
            Incorporation provides tax deferral when you can leave money in the corporation. The low small business tax rate (~12%) lets you grow investments faster. But when you take money out, integration means similar total tax to being unincorporated.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Corporate Tax Rates</h2>

          <h3>Small Business Deduction (SBD)</h3>
          <p>For Canadian-controlled private corporations (CCPCs):</p>
          <ul>
            <li><strong>Federal rate:</strong> 9% on first $500,000 of active business income</li>
            <li><strong>Provincial rates:</strong> Vary from 0% (Manitoba) to 4% (PEI)</li>
            <li><strong>Combined rate:</strong> Approximately 9-12% depending on province</li>
          </ul>

          <h3>General Corporate Rate</h3>
          <p>Income above $500,000 or passive income:</p>
          <ul>
            <li><strong>Federal:</strong> 15%</li>
            <li><strong>Combined:</strong> 23-31% depending on province</li>
          </ul>

          <h3>Investment Income</h3>
          <ul>
            <li>High rate: ~50% on passive investment income</li>
            <li>Refundable portion when dividends paid out</li>
            <li>Complex rules—doesn't benefit from SBD</li>
          </ul>

          <h2>When Incorporation Makes Sense</h2>

          <h3>Good Candidates</h3>
          <ul>
            <li><strong>High income:</strong> Earning more than you spend personally</li>
            <li><strong>Can defer income:</strong> Don't need all earnings for living</li>
            <li><strong>Business risk:</strong> Want liability protection</li>
            <li><strong>Income splitting:</strong> Family members can be shareholders</li>
            <li><strong>Selling business:</strong> Lifetime capital gains exemption</li>
          </ul>

          <h3>Poor Candidates</h3>
          <ul>
            <li><strong>Need all income:</strong> Personal expenses equal business income</li>
            <li><strong>Low income:</strong> Already in low tax bracket</li>
            <li><strong>Simple situation:</strong> Admin costs outweigh benefits</li>
            <li><strong>Personal services business:</strong> Doesn't qualify for SBD</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Rule of Thumb:</strong> Incorporation typically makes sense when you can leave at least $50,000/year in the corporation after paying yourself a reasonable salary.
            </p>
          </div>

          <h2>Salary vs. Dividends</h2>

          <h3>Salary (T4 Income)</h3>
          <p>Advantages:</p>
          <ul>
            <li>Creates RRSP contribution room</li>
            <li>Contributes to CPP (pension benefits)</li>
            <li>Deductible to corporation</li>
            <li>Childcare expense deduction eligibility</li>
          </ul>
          <p>Disadvantages:</p>
          <ul>
            <li>Payroll taxes (employer CPP portion)</li>
            <li>Requires payroll administration</li>
            <li>Higher personal tax rate</li>
          </ul>

          <h3>Dividends</h3>
          <p>Advantages:</p>
          <ul>
            <li>No payroll taxes</li>
            <li>Flexible timing</li>
            <li>Simpler administration</li>
            <li>Tax credit system (gross-up and dividend tax credit)</li>
          </ul>
          <p>Disadvantages:</p>
          <ul>
            <li>No RRSP room created</li>
            <li>No CPP contributions</li>
            <li>Not deductible to corporation</li>
          </ul>

          <h3>Optimal Mix</h3>
          <p>Most owner-managers use a combination:</p>
          <ul>
            <li>Salary to max out RRSP room (~$175,000 for full room)</li>
            <li>Dividends for additional income needs</li>
            <li>Leave excess in corporation for tax deferral</li>
          </ul>

          <h2>Integration Concept</h2>
          <p>The Canadian tax system aims for "integration"—total tax should be similar whether you:</p>
          <ul>
            <li>Earn income personally, OR</li>
            <li>Earn through corporation and pay yourself</li>
          </ul>
          <p>In practice, integration is imperfect, creating planning opportunities.</p>

          <h2>Lifetime Capital Gains Exemption (LCGE)</h2>
          <p>When selling qualified small business corporation (QSBC) shares:</p>
          <ul>
            <li><strong>2024 exemption:</strong> ~$1,016,836 per shareholder</li>
            <li>Multiple family shareholders can each use their exemption</li>
            <li>Requires meeting "all or substantially all" asset tests</li>
            <li>24-month holding period before sale</li>
          </ul>

          <h3>Qualifying Criteria</h3>
          <ul>
            <li>CCPC at time of sale</li>
            <li>90%+ of assets used in active business (at sale)</li>
            <li>50%+ test during 24 months before sale</li>
            <li>Shares held for at least 24 months</li>
          </ul>

          <h2>Income Splitting Opportunities</h2>

          <h3>Family Shareholders</h3>
          <ul>
            <li>Spouse and adult children can hold shares</li>
            <li>Pay dividends to shareholders in lower brackets</li>
            <li>Each uses their LCGE on sale</li>
          </ul>

          <h3>Tax on Split Income (TOSI)</h3>
          <p>Significant restrictions since 2018:</p>
          <ul>
            <li>Dividends to minors taxed at top rate</li>
            <li>Adults must meet "excluded" tests</li>
            <li>Must work 20+ hours/week in business, OR</li>
            <li>Own 10%+ of shares and business pays &lt;90% to related</li>
            <li>Complex rules—professional advice essential</li>
          </ul>

          <h2>Costs of Incorporation</h2>

          <h3>Setup Costs</h3>
          <ul>
            <li>Legal fees: $1,000-$3,000</li>
            <li>Provincial registration: $200-$400</li>
            <li>Corporate minute book: $200-$500</li>
          </ul>

          <h3>Ongoing Costs</h3>
          <ul>
            <li>Corporate tax return: $1,500-$5,000+/year</li>
            <li>Annual return filings: $50-$100</li>
            <li>Bookkeeping: $200-$500/month</li>
            <li>Payroll (if salary): Additional costs</li>
          </ul>

          <h2>Personal Services Business (PSB)</h2>
          <p>A corporation may be a PSB if:</p>
          <ul>
            <li>Would be employee if not for corporation</li>
            <li>Fewer than 5 full-time employees</li>
            <li>Main client controls work performed</li>
          </ul>

          <h3>PSB Consequences</h3>
          <ul>
            <li>No small business deduction</li>
            <li>Limited expense deductions</li>
            <li>Tax rate ~44% (no benefit vs. personal)</li>
            <li>Common issue for IT contractors</li>
          </ul>

          <h2>Professional Corporations</h2>
          <p>Doctors, lawyers, accountants, dentists can incorporate:</p>
          <ul>
            <li>Same SBD benefits</li>
            <li>Provincial rules vary on who can be shareholders</li>
            <li>Many provinces restrict family ownership</li>
            <li>Still provides tax deferral on retained earnings</li>
          </ul>

          <h2>Corporate Year-End Planning</h2>

          <h3>Choosing Year-End</h3>
          <ul>
            <li>Can be any date, not just December 31</li>
            <li>Consider timing of income and expenses</li>
            <li>Allows bonus accrual planning</li>
            <li>Coordinate with personal tax situation</li>
          </ul>

          <h3>Bonus Accrual</h3>
          <ul>
            <li>Declare bonus by corporate year-end</li>
            <li>Must pay within 180 days</li>
            <li>Deductible to corp in year declared</li>
            <li>Taxable to you when received</li>
          </ul>

          <h2>Investment Holding in Corporation</h2>

          <h3>Passive Investment Income</h3>
          <ul>
            <li>Taxed at ~50% in corporation</li>
            <li>Refundable when dividends paid</li>
            <li>SBD grind: Passive income over $50K reduces SBD</li>
          </ul>

          <h3>SBD Grind</h3>
          <ul>
            <li>Every $1 of passive income over $50,000 reduces SBD room by $5</li>
            <li>$150,000 passive income = no SBD</li>
            <li>Consider corporate class funds or holding companies</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Incorporating too early:</strong> Before income justifies costs</li>
            <li><strong>Not paying reasonable salary:</strong> RRSP room lost forever</li>
            <li><strong>PSB rules:</strong> Not structuring to avoid PSB status</li>
            <li><strong>Mixing personal and business:</strong> Creates taxable benefits</li>
            <li><strong>Ignoring integration:</strong> Thinking corporate rate is final rate</li>
          </ul>

          <h2>Steps to Incorporate</h2>
          <ol>
            <li>Consult accountant to confirm benefits</li>
            <li>Choose federal vs. provincial incorporation</li>
            <li>Select corporation name (or numbered)</li>
            <li>Prepare articles of incorporation</li>
            <li>Create shareholders' agreement (if multiple)</li>
            <li>Set up corporate bank account</li>
            <li>Register for GST/HST if required</li>
            <li>Transfer assets to corporation</li>
            <li>Set up payroll (if paying salary)</li>
          </ol>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Incorporation?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about small business corporation strategies.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Incorporation involves complex tax and legal considerations. This guide provides general information. Always consult a tax professional and lawyer before incorporating.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
