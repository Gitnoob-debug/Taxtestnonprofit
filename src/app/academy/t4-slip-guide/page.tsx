import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, FileText, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'T4 Slip Explained: Understanding Your Employment Income | 2024 Guide',
  description: 'Complete guide to understanding your T4 slip in Canada. Learn what each box means, how to report T4 income, common errors to watch for, and what to do if your T4 is wrong.',
  keywords: 'T4 slip Canada, T4 boxes explained, employment income tax, T4 statement of remuneration, T4 box 14, T4 box 22',
}

export default function T4SlipGuidePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-xl">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Income Reporting</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            T4 Slip Explained: Understanding Your Employment Income
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />8 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-3">What is a T4 Slip?</h2>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            The T4 Statement of Remuneration Paid is issued by your employer and summarizes your employment income, deductions, and benefits for the tax year. You need this slip to file your tax return accurately.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Key T4 Boxes Explained</h2>
          <p>Your T4 contains many boxes, but these are the most important ones for your tax return:</p>

          <h3>Box 14 - Employment Income</h3>
          <p>This is your total employment income before deductions. It includes:</p>
          <ul>
            <li>Salary and wages</li>
            <li>Commissions</li>
            <li>Bonuses</li>
            <li>Taxable benefits (like employer-paid life insurance)</li>
            <li>Vacation pay</li>
          </ul>
          <p><strong>CRA Line:</strong> Report on Line 10100 of your tax return.</p>

          <h3>Box 16 - Employee's CPP Contributions</h3>
          <p>The amount you contributed to the Canada Pension Plan. For 2024, the employee rate is 5.95% on earnings between $3,500 and $68,500.</p>
          <p><strong>Maximum for 2024:</strong> $3,867.50</p>
          <p><strong>CRA Line:</strong> Report on Line 30800 (base) and Line 30900 (enhanced).</p>

          <h3>Box 17 - Employee's QPP Contributions</h3>
          <p>For Quebec employees only - contributions to the Quebec Pension Plan instead of CPP.</p>

          <h3>Box 18 - Employee's EI Premiums</h3>
          <p>Your Employment Insurance premiums. For 2024, the rate is 1.66% on insurable earnings up to $63,200.</p>
          <p><strong>Maximum for 2024:</strong> $1,049.12</p>
          <p><strong>CRA Line:</strong> Report on Line 31200.</p>

          <h3>Box 22 - Income Tax Deducted</h3>
          <p>The total federal and provincial income tax your employer withheld from your pay throughout the year.</p>
          <p><strong>CRA Line:</strong> Report on Line 43700.</p>

          <h3>Box 24 - EI Insurable Earnings</h3>
          <p>The portion of your income that was subject to EI premiums. May differ from Box 14 if you have non-insurable income.</p>

          <h3>Box 26 - CPP/QPP Pensionable Earnings</h3>
          <p>Income subject to CPP/QPP contributions. Used to calculate your CPP credits.</p>

          <h2>Taxable Benefits on Your T4</h2>
          <p>Certain employer-provided benefits are taxable and included in Box 14:</p>

          <h3>Box 40 - Other Taxable Allowances and Benefits</h3>
          <ul>
            <li>Company car for personal use</li>
            <li>Employer-paid group term life insurance (over $25,000)</li>
            <li>Non-accountable expense allowances</li>
            <li>Employer-paid parking (in some cases)</li>
          </ul>

          <h3>Box 57 - Employment Income (March 15 to May 9, 2020)</h3>
          <p>COVID-related box - shows income earned during the initial lockdown period.</p>

          <h2>RRSP-Related Boxes</h2>

          <h3>Box 52 - Pension Adjustment</h3>
          <p>If you have a workplace pension or DPSP, this amount reduces your RRSP contribution room for the following year. It represents the value of pension benefits you accrued.</p>

          <h3>Box 50 - RPP Contributions</h3>
          <p>Your contributions to a Registered Pension Plan. Deductible on Line 20700.</p>

          <h2>Union and Professional Dues</h2>

          <h3>Box 44 - Union Dues</h3>
          <p>Amounts you paid in union or professional dues, which are deductible on Line 21200.</p>

          <h2>What to Do If Your T4 Is Wrong</h2>
          <ol>
            <li><strong>Contact your employer first</strong> - They may issue a corrected T4 (T4 Amendment)</li>
            <li><strong>Document everything</strong> - Keep pay stubs and records to support your claim</li>
            <li><strong>File with correct amounts</strong> - If your employer won't correct it, file using the actual correct amounts and attach a note</li>
            <li><strong>Keep the original T4</strong> - CRA may ask for documentation</li>
          </ol>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Deadline:</strong> Employers must issue T4 slips by the last day of February following the tax year. If you haven't received yours by mid-March, contact your employer.
            </p>
          </div>

          <h2>Multiple T4 Slips</h2>
          <p>If you had multiple employers during the year, you'll receive a T4 from each one. When filing:</p>
          <ul>
            <li>Report income from all T4s on your return</li>
            <li>Add up all Box 14 amounts for total employment income</li>
            <li>Check for CPP/EI overpayments if your total income exceeds maximum pensionable/insurable earnings</li>
          </ul>

          <h2>T4 vs Other Tax Slips</h2>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left">Slip</th>
                <th className="text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>T4</strong></td>
                <td>Employment income from an employer</td>
              </tr>
              <tr>
                <td><strong>T4A</strong></td>
                <td>Pension, retirement, annuity, self-employment commissions</td>
              </tr>
              <tr>
                <td><strong>T4E</strong></td>
                <td>Employment Insurance benefits</td>
              </tr>
              <tr>
                <td><strong>T5</strong></td>
                <td>Investment income (interest, dividends)</td>
              </tr>
            </tbody>
          </table>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Box 14 shows your total taxable employment income</li>
            <li>Box 22 shows how much tax was already withheld</li>
            <li>Boxes 16 and 18 show your CPP and EI contributions (which are tax credits)</li>
            <li>Box 52 (Pension Adjustment) affects your RRSP room</li>
            <li>Contact your employer immediately if any amounts seem incorrect</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Need Help With Your Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help you understand your T4 and answer specific questions.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes. For specific questions about your T4, consult the CRA or a qualified tax professional.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
