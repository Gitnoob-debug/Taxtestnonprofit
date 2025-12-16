import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, DollarSign, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dividend Tax Credit Canada 2024 | Eligible vs Non-Eligible Dividends',
  description: 'Understand dividend taxation in Canada. Learn about eligible vs non-eligible dividends, gross-up, dividend tax credit, and how dividends are taxed compared to other income.',
  keywords: 'dividend tax credit Canada, eligible dividends, non-eligible dividends, gross-up, Canadian dividend taxation',
}

export default function DividendTaxCreditPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-xl">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Investment & Capital Gains</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Dividend Tax Credit Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">Preferential Tax Treatment</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            Canadian dividends receive preferential tax treatment through the dividend tax credit system. This can result in dividends being taxed at a lower effective rate than regular income or interest.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How Dividend Taxation Works</h2>
          <p>Canadian dividend taxation involves three steps:</p>
          <ol>
            <li><strong>Gross-up:</strong> Increase dividend by a factor</li>
            <li><strong>Pay tax:</strong> On the grossed-up amount</li>
            <li><strong>Claim credit:</strong> Dividend tax credit reduces tax</li>
          </ol>
          <p>This system integrates corporate and personal taxes.</p>

          <h2>Eligible vs Non-Eligible Dividends</h2>

          <h3>Eligible Dividends</h3>
          <ul>
            <li>From large public corporations</li>
            <li>From private corporations using non-small business income</li>
            <li>Higher gross-up (38%)</li>
            <li>Higher dividend tax credit</li>
            <li>Lower effective tax rate</li>
          </ul>

          <h3>Non-Eligible Dividends</h3>
          <ul>
            <li>From small business corporations (CCPCs)</li>
            <li>Income taxed at small business rate</li>
            <li>Lower gross-up (15%)</li>
            <li>Lower dividend tax credit</li>
            <li>Higher effective tax rate than eligible</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> Your T5 slip shows dividends in Box 10 (eligible) or Box 11 (non-eligible). Box 11 and 12 show the grossed-up amounts and tax credits.
            </p>
          </div>

          <h2>Gross-Up and Credit Rates</h2>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Type</th>
                <th>Gross-Up</th>
                <th>Federal Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Eligible</td>
                <td>38%</td>
                <td>15.0198%</td>
              </tr>
              <tr>
                <td>Non-Eligible</td>
                <td>15%</td>
                <td>9.0301%</td>
              </tr>
            </tbody>
          </table>

          <h2>Calculation Example: Eligible Dividend</h2>
          <p>Receive $1,000 eligible dividend:</p>
          <ul>
            <li><strong>Gross-up:</strong> $1,000 × 1.38 = $1,380 taxable</li>
            <li><strong>Federal tax (say 20.5%):</strong> $283</li>
            <li><strong>Federal dividend tax credit:</strong> $1,380 × 15.0198% = $207</li>
            <li><strong>Net federal tax:</strong> $76</li>
            <li>Plus provincial tax minus provincial credit</li>
          </ul>

          <h2>Calculation Example: Non-Eligible Dividend</h2>
          <p>Receive $1,000 non-eligible dividend:</p>
          <ul>
            <li><strong>Gross-up:</strong> $1,000 × 1.15 = $1,150 taxable</li>
            <li><strong>Federal tax (say 20.5%):</strong> $236</li>
            <li><strong>Federal dividend tax credit:</strong> $1,150 × 9.0301% = $104</li>
            <li><strong>Net federal tax:</strong> $132</li>
          </ul>

          <h2>Effective Tax Rates on Dividends</h2>
          <p>Combined federal-provincial rates vary by province and income. For Ontario at $50,000 income:</p>
          <ul>
            <li><strong>Eligible dividends:</strong> ~7-10% effective rate</li>
            <li><strong>Non-eligible dividends:</strong> ~15-20% effective rate</li>
            <li><strong>Interest income:</strong> ~30% marginal rate</li>
          </ul>

          <h3>Negative Tax Rate Scenario</h3>
          <p>At very low incomes, eligible dividends can have a negative tax rate:</p>
          <ul>
            <li>Dividend tax credit exceeds tax owing</li>
            <li>Reduces tax on other income</li>
            <li>Can't get refund of excess credit</li>
            <li>But can reduce tax to zero</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> Dividend gross-up can affect income-tested benefits. The grossed-up amount is your "income" for purposes like OAS clawback, GIS, and CCB.
            </p>
          </div>

          <h2>Dividends vs Other Investment Income</h2>

          <h3>Compared to Interest</h3>
          <ul>
            <li>Interest: 100% taxable at full rate</li>
            <li>Dividends: Preferential treatment</li>
            <li>Dividends usually better in non-registered accounts</li>
            <li>Interest better in RRSP (taxed at withdrawal)</li>
          </ul>

          <h3>Compared to Capital Gains</h3>
          <ul>
            <li>Capital gains: 50% inclusion rate</li>
            <li>Effective rate often lower than dividends</li>
            <li>Control timing of capital gains</li>
            <li>Both have advantages</li>
          </ul>

          <h2>Dividends in Different Accounts</h2>

          <h3>Non-Registered Account</h3>
          <ul>
            <li>Dividend tax credit applies</li>
            <li>Good for Canadian dividends</li>
            <li>Gross-up affects benefit calculations</li>
          </ul>

          <h3>TFSA</h3>
          <ul>
            <li>All growth tax-free</li>
            <li>No dividend tax credit (not needed)</li>
            <li>Good for any income type</li>
          </ul>

          <h3>RRSP/RRIF</h3>
          <ul>
            <li>No dividend tax credit</li>
            <li>All withdrawals taxed as regular income</li>
            <li>Better for interest/foreign dividends</li>
          </ul>

          <h2>Foreign Dividends</h2>

          <h3>No Dividend Tax Credit</h3>
          <ul>
            <li>Foreign dividends don't get Canadian DTC</li>
            <li>Taxed as regular income</li>
            <li>No gross-up applies</li>
          </ul>

          <h3>Foreign Withholding Tax</h3>
          <ul>
            <li>US dividends: 15% withheld (with treaty)</li>
            <li>Can claim foreign tax credit</li>
            <li>Credit may not fully offset</li>
            <li>RRSP exempt from US withholding</li>
          </ul>

          <h2>Provincial Dividend Tax Credits</h2>
          <p>Each province has its own dividend tax credit:</p>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Province</th>
                <th>Eligible Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ontario</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>BC</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>Alberta</td>
                <td>8.12%</td>
              </tr>
              <tr>
                <td>Quebec</td>
                <td>11.7%</td>
              </tr>
            </tbody>
          </table>

          <h2>Reporting Dividends</h2>

          <h3>T5 Slip</h3>
          <ul>
            <li><strong>Box 10:</strong> Actual eligible dividends</li>
            <li><strong>Box 11:</strong> Taxable eligible dividends (grossed-up)</li>
            <li><strong>Box 12:</strong> Eligible dividend tax credit</li>
            <li><strong>Box 23:</strong> Actual non-eligible dividends</li>
            <li><strong>Box 24:</strong> Taxable non-eligible dividends</li>
            <li><strong>Box 25:</strong> Non-eligible dividend tax credit</li>
          </ul>

          <h3>Where to Report</h3>
          <ul>
            <li>Line 12000: Taxable dividends from Canadian corporations</li>
            <li>Schedule 4 for details</li>
            <li>Federal dividend tax credit on return</li>
          </ul>

          <h2>Planning with Dividends</h2>

          <h3>Corporation Owner-Managers</h3>
          <ul>
            <li>Salary vs dividend decision</li>
            <li>Integration with corporate tax</li>
            <li>RRSP room requires salary</li>
            <li>CPP from salary, not dividends</li>
          </ul>

          <h3>Retirees</h3>
          <ul>
            <li>Watch gross-up affecting OAS clawback</li>
            <li>May prefer capital gains</li>
            <li>Or hold in TFSA</li>
          </ul>

          <h3>Low-Income Investors</h3>
          <ul>
            <li>Can receive dividends nearly tax-free</li>
            <li>But watch benefit impacts</li>
            <li>Gross-up increases reported income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Dividend Taxation?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about dividend tax credits.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Dividend tax planning can be complex. Consider professional advice for significant dividend income.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
