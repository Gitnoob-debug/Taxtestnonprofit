import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Building, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Incorporation vs Sole Proprietor Canada 2024 | Tax Comparison',
  description: 'Should you incorporate or stay sole proprietor? Compare tax rates, liability protection, costs, and benefits to make the right choice for your Canadian business.',
  keywords: 'incorporate vs sole proprietor Canada, should I incorporate, small business corporation, CCPC tax rates, incorporation benefits',
}

export default function IncorporationVsSoleProprietorPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-2.5 rounded-xl">
              <Building className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Business Structure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Incorporation vs Sole Proprietor
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />11 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Not Always Better to Incorporate</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            Incorporation adds complexity and cost. The tax benefits only materialize if you can leave significant profits in the corporation. Many small businesses are better off as sole proprietors.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Quick Comparison</h2>

          <table className="text-sm">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Sole Proprietor</th>
                <th>Corporation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Setup cost</td>
                <td>$0-$100</td>
                <td>$1,000-$3,000</td>
              </tr>
              <tr>
                <td>Annual cost</td>
                <td>Minimal</td>
                <td>$1,500-$3,000+</td>
              </tr>
              <tr>
                <td>Tax rate (small business)</td>
                <td>Personal rate</td>
                <td>~12% on first $500K</td>
              </tr>
              <tr>
                <td>Liability</td>
                <td>Personal</td>
                <td>Limited*</td>
              </tr>
              <tr>
                <td>Complexity</td>
                <td>Simple</td>
                <td>Complex</td>
              </tr>
            </tbody>
          </table>

          <h2>Tax Rate Comparison</h2>

          <h3>Corporate Tax Rates (2024)</h3>
          <ul>
            <li><strong>Small business rate:</strong> ~12% (varies by province)</li>
            <li>Applies to first $500,000 of active business income</li>
            <li>Must be CCPC (Canadian-Controlled Private Corporation)</li>
          </ul>

          <h3>Personal Tax Rates</h3>
          <ul>
            <li>15% to 33% federal</li>
            <li>Plus provincial (5-25%)</li>
            <li>Combined top rates: 50-54%</li>
          </ul>

          <h3>The Catch: Integration</h3>
          <ul>
            <li>When you pay yourself, you pay personal tax</li>
            <li>System designed for similar total tax</li>
            <li>Benefit is deferral, not elimination</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Insight:</strong> If you need all business profits for living expenses, incorporation provides little tax benefit. The advantage comes from leaving money in the corporation.
            </p>
          </div>

          <h2>When Sole Proprietor Makes Sense</h2>

          <h3>Good Fit If</h3>
          <ul>
            <li>Net business income under $75,000</li>
            <li>Need all profits for personal use</li>
            <li>Low liability risk</li>
            <li>Simple business operations</li>
            <li>Just starting out</li>
            <li>Side business alongside employment</li>
          </ul>

          <h3>Advantages</h3>
          <ul>
            <li>No separate tax return</li>
            <li>Business losses offset other income</li>
            <li>No annual legal fees</li>
            <li>Simpler bookkeeping</li>
            <li>No shareholder agreements needed</li>
          </ul>

          <h2>When to Incorporate</h2>

          <h3>Good Fit If</h3>
          <ul>
            <li>Net income over $100,000+</li>
            <li>Can leave $50,000+ in corporation annually</li>
            <li>Liability exposure concerns</li>
            <li>Multiple shareholders planned</li>
            <li>Want to build corporate investments</li>
            <li>Planning to sell business eventually</li>
          </ul>

          <h3>Tax Deferral Example</h3>
          <p>Business profit: $150,000, personal needs: $80,000</p>
          <ul>
            <li><strong>Sole proprietor:</strong> Tax on $150,000 = ~$50,000</li>
            <li><strong>Corporation:</strong> Pay salary $80,000 (tax ~$20,000), corporate tax on $70,000 at 12% = $8,400</li>
            <li><strong>Savings/deferral:</strong> ~$20,000</li>
            <li>$61,600 stays in corporation growing</li>
          </ul>

          <h2>Liability Protection</h2>

          <h3>What's Protected</h3>
          <ul>
            <li>Personal assets from business debts</li>
            <li>Corporate liability stays with corporation</li>
            <li>Shareholders risk only their investment</li>
          </ul>

          <h3>What's NOT Protected</h3>
          <ul>
            <li>Personal guarantees (bank loans)</li>
            <li>Director liability (taxes, wages, environmental)</li>
            <li>Professional negligence</li>
            <li>Personal wrongdoing</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Reality Check:</strong> Banks typically require personal guarantees from small business owners, reducing liability protection. Insurance may provide better protection than incorporation.
            </p>
          </div>

          <h2>Paying Yourself</h2>

          <h3>Salary</h3>
          <ul>
            <li>Deductible expense for corporation</li>
            <li>Taxed as employment income</li>
            <li>Creates RRSP room</li>
            <li>CPP required (both portions)</li>
            <li>Predictable personal income</li>
          </ul>

          <h3>Dividends</h3>
          <ul>
            <li>Not deductible for corporation</li>
            <li>Taxed at preferential rates (gross-up/credit)</li>
            <li>No CPP contributions</li>
            <li>No RRSP room created</li>
            <li>Flexible timing</li>
          </ul>

          <h3>Salary vs Dividend Decision</h3>
          <ul>
            <li>Need RRSP room? Salary</li>
            <li>Want CPP pension? Salary</li>
            <li>Have RRSP room? May prefer dividends</li>
            <li>Many use combination approach</li>
          </ul>

          <h2>Costs of Incorporation</h2>

          <h3>Initial Setup</h3>
          <ul>
            <li>Incorporation: $500-$1,500</li>
            <li>Legal setup: $500-$2,000</li>
            <li>Minute book, shares: $200-$500</li>
            <li>Total: $1,000-$3,000+</li>
          </ul>

          <h3>Annual Ongoing</h3>
          <ul>
            <li>Corporate tax return: $1,000-$2,500</li>
            <li>Annual filings: $50-$100</li>
            <li>Bookkeeping: more complex</li>
            <li>Legal (if needed): varies</li>
          </ul>

          <h3>Break-Even Analysis</h3>
          <p>Extra annual cost: ~$1,500-$2,500</p>
          <p>Need enough tax savings to justify</p>

          <h2>Lifetime Capital Gains Exemption</h2>

          <h3>Huge Benefit</h3>
          <ul>
            <li>$1,016,836 exemption (2024)</li>
            <li>On sale of qualified small business shares</li>
            <li>Tax-free capital gain on business sale</li>
            <li>Each shareholder gets own exemption</li>
          </ul>

          <h3>Requirements</h3>
          <ul>
            <li>CCPC (Canadian-Controlled Private Corporation)</li>
            <li>Active business assets test (90%)</li>
            <li>Holding period requirements</li>
            <li>Planning needed years in advance</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Exit Strategy:</strong> If you plan to sell your business for significant value, the LCGE can save $200,000+ in taxes. This alone may justify incorporating early.
            </p>
          </div>

          <h2>Income Splitting</h2>

          <h3>TOSI Rules (Tax on Split Income)</h3>
          <ul>
            <li>Limits splitting income with family</li>
            <li>Applies top tax rate to split income</li>
            <li>Unless family members meaningfully contribute</li>
            <li>Or are over 25 with capital at risk</li>
          </ul>

          <h3>Legitimate Splitting</h3>
          <ul>
            <li>Salary for actual work (any family member)</li>
            <li>Dividends to involved family members</li>
            <li>Pension income splitting (later)</li>
            <li>Complex rules—professional advice needed</li>
          </ul>

          <h2>Administrative Burden</h2>

          <h3>Corporation Requirements</h3>
          <ul>
            <li>Separate bank account (required)</li>
            <li>Corporate tax return (T2)</li>
            <li>Annual filings with government</li>
            <li>Corporate minutes and resolutions</li>
            <li>Shareholder agreements</li>
            <li>More complex bookkeeping</li>
          </ul>

          <h3>Sole Proprietor Requirements</h3>
          <ul>
            <li>Report on personal return (T2125)</li>
            <li>Track income and expenses</li>
            <li>Simpler record keeping</li>
            <li>One tax return</li>
          </ul>

          <h2>Professional Corporations</h2>

          <h3>Special Rules</h3>
          <ul>
            <li>Doctors, lawyers, accountants, etc.</li>
            <li>Provincial professional corporation rules</li>
            <li>May have restrictions on shareholders</li>
            <li>Liability still personal for negligence</li>
          </ul>

          <h3>Benefits</h3>
          <ul>
            <li>Tax deferral possible</li>
            <li>Income smoothing</li>
            <li>Retirement planning flexibility</li>
            <li>Check professional body rules</li>
          </ul>

          <h2>Making the Decision</h2>

          <h3>Questions to Ask</h3>
          <ol>
            <li>How much profit can I leave in the corporation?</li>
            <li>What are my liability concerns?</li>
            <li>Do I plan to sell the business?</li>
            <li>Can I afford the extra costs?</li>
            <li>How complex is my business?</li>
          </ol>

          <h3>General Guidelines</h3>
          <ul>
            <li><strong>Under $75K profit:</strong> Usually stay sole proprietor</li>
            <li><strong>$75K-$150K:</strong> Analyze carefully</li>
            <li><strong>Over $150K:</strong> Often incorporate</li>
            <li><strong>Liability risk:</strong> May incorporate regardless</li>
          </ul>

          <h2>Transitioning Later</h2>

          <h3>Starting Sole Proprietor</h3>
          <ul>
            <li>Can incorporate later</li>
            <li>Section 85 rollover available</li>
            <li>Defer taxes on transfer</li>
            <li>Common progression</li>
          </ul>

          <h3>When to Switch</h3>
          <ul>
            <li>Business stabilized and profitable</li>
            <li>Can project leaving profits in corp</li>
            <li>Ready for additional complexity</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Need Help Deciding?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer questions about incorporation vs sole proprietorship.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> The incorporation decision involves many factors. Consult an accountant and lawyer to analyze your specific situation before deciding.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
