import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, MapPin, ArrowRight, CheckCircle, DollarSign, TrendingDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Alberta Tax Guide 2025 | Provincial Tax Rates, Brackets & Credits',
  description: 'Complete Alberta tax guide for 2025. Learn about Alberta\'s NEW 8% tax bracket, no PST advantage, Alberta Child Benefit, and why Alberta remains Canada\'s lowest tax province.',
  keywords: 'Alberta tax rates 2025, Alberta tax brackets, Alberta 8% tax rate, Alberta no PST, Alberta Child Benefit, ACFB, lowest tax province Canada, Alberta tax credits',
  openGraph: {
    title: 'Alberta Tax Guide 2025 | Provincial Tax Rates & Benefits',
    description: 'Complete guide to Alberta taxes including the NEW 8% bracket for 2025, no PST savings, and provincial benefits.',
    type: 'article',
  },
}

export default function AlbertaTaxGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-2.5 rounded-xl">
              <MapPin className="h-6 w-6 text-amber-600" />
            </div>
            <span className="text-sm font-medium text-amber-600">Provincial Taxes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Alberta Tax Guide 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Everything you need to know about Alberta's tax system, including the new 8% bracket introduced in 2025.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Highlights Box */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-amber-900 mb-4 text-xl">2025 Alberta Tax Highlights</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-amber-900">NEW 8% Tax Bracket</p>
                <p className="text-amber-700 text-sm">First $60,000 now taxed at just 8%</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-amber-900">No Provincial Sales Tax</p>
                <p className="text-amber-700 text-sm">Only 5% GST vs 13% HST in Ontario</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-amber-900">Lowest in Canada</p>
                <p className="text-amber-700 text-sm">Lowest combined tax burden for most incomes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-amber-900">No Health Premium</p>
                <p className="text-amber-700 text-sm">Unlike Ontario and BC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">

          <h2 id="tax-brackets">Alberta Tax Brackets 2025</h2>
          <p>
            Alberta introduced a <strong>new 8% tax bracket</strong> in 2025, reducing taxes for everyone earning under $60,000.
            This is the first significant change to Alberta's tax structure in years and makes Alberta even more competitive.
          </p>

          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Taxable Income</th>
                  <th className="text-left p-3 font-semibold border-b">2025 Rate</th>
                  <th className="text-left p-3 font-semibold border-b">2024 Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="p-3 border-b">$0 to $60,000</td>
                  <td className="p-3 border-b font-bold text-green-700">8% (NEW!)</td>
                  <td className="p-3 border-b text-slate-500">10%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$60,000 to $151,234</td>
                  <td className="p-3 border-b">10%</td>
                  <td className="p-3 border-b text-slate-500">10%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$151,234 to $181,481</td>
                  <td className="p-3 border-b">12%</td>
                  <td className="p-3 border-b text-slate-500">12%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$181,481 to $241,974</td>
                  <td className="p-3 border-b">13%</td>
                  <td className="p-3 border-b text-slate-500">13%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$241,974 to $362,961</td>
                  <td className="p-3 border-b">14%</td>
                  <td className="p-3 border-b text-slate-500">14%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">Over $362,961</td>
                  <td className="p-3 border-b">15%</td>
                  <td className="p-3 border-b text-slate-500">15%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <TrendingDown className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">2025 Tax Savings</p>
                <p className="text-emerald-700 text-sm">
                  The new 8% bracket saves Albertans up to <strong>$1,200 per year</strong> compared to 2024.
                  If you earn $60,000 or more, you'll save 2% on your first $60,000 of income = $1,200.
                </p>
              </div>
            </div>
          </div>

          <h2 id="no-pst">No Provincial Sales Tax (PST)</h2>
          <p>
            Alberta is one of only three provinces with <strong>no provincial sales tax</strong>.
            Albertans only pay the 5% federal GST on purchases, compared to:
          </p>
          <ul>
            <li><strong>Ontario:</strong> 13% HST (8% more)</li>
            <li><strong>BC:</strong> 12% combined (7% more)</li>
            <li><strong>Quebec:</strong> 14.975% combined (9.975% more)</li>
          </ul>

          <h3>Real Savings Examples</h3>
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Purchase</th>
                  <th className="text-right p-3 font-semibold border-b">Alberta Tax</th>
                  <th className="text-right p-3 font-semibold border-b">Ontario Tax</th>
                  <th className="text-right p-3 font-semibold border-b text-green-700">You Save</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b">$40,000 Vehicle</td>
                  <td className="p-3 border-b text-right">$2,000</td>
                  <td className="p-3 border-b text-right">$5,200</td>
                  <td className="p-3 border-b text-right font-bold text-green-700">$3,200</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$2,000 Laptop</td>
                  <td className="p-3 border-b text-right">$100</td>
                  <td className="p-3 border-b text-right">$260</td>
                  <td className="p-3 border-b text-right font-bold text-green-700">$160</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">$50,000 Annual Spending</td>
                  <td className="p-3 border-b text-right">$2,500</td>
                  <td className="p-3 border-b text-right">$6,500</td>
                  <td className="p-3 border-b text-right font-bold text-green-700">$4,000/year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="alberta-credits">Alberta Tax Credits & Benefits</h2>

          <h3>Alberta Child and Family Benefit (ACFB)</h3>
          <p>
            The ACFB is Alberta's provincial benefit for families with children under 18. It's paid quarterly
            along with the federal Canada Child Benefit.
          </p>

          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">2025 ACFB Maximum Amounts</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>Base benefit per child:</span> <strong>Up to $1,469</strong></li>
              <li className="flex justify-between"><span>Working component (1 child):</span> <strong>Up to $734</strong></li>
              <li className="flex justify-between"><span>Working component (2+ children):</span> <strong>Up to $1,100</strong></li>
            </ul>
            <p className="text-slate-600 text-sm mt-3">
              Benefits phase out based on family net income. Lower income families receive the full amount.
            </p>
          </div>

          <h3>Climate Action Incentive Payment</h3>
          <p>
            Alberta residents receive the federal Climate Action Incentive Payment to offset carbon pricing costs.
            For 2025, Alberta families can receive:
          </p>
          <ul>
            <li><strong>Single adult:</strong> Approximately $450/year</li>
            <li><strong>Couple:</strong> Approximately $675/year</li>
            <li><strong>Per child:</strong> Additional ~$113</li>
            <li><strong>Rural supplement:</strong> Extra 20% for rural Albertans</li>
          </ul>

          <h3>Alberta Basic Personal Amount</h3>
          <p>
            Alberta has one of the highest provincial basic personal amounts in Canada at <strong>$22,323 for 2025</strong>.
            This means your first $22,323 of income is not subject to provincial tax.
          </p>

          <h2 id="no-health-premium">No Health Premium</h2>
          <p>
            Unlike Ontario (which has an employer health tax) and BC (which had MSP premiums until 2020),
            Alberta has <strong>no health premium or payroll health tax</strong>. Healthcare is funded entirely through general tax revenue.
          </p>

          <h2 id="property">Property & Land Transfer</h2>
          <p>
            Alberta has <strong>no land transfer tax</strong> like Ontario or BC. When buying property, you only pay:
          </p>
          <ul>
            <li>Property registration fee: ~0.02% of property value</li>
            <li>Mortgage registration fee: ~0.01% of mortgage</li>
            <li>Title insurance (optional but recommended)</li>
          </ul>

          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">$600,000 Home Purchase</th>
                  <th className="text-right p-3 font-semibold border-b">Transfer Tax/Fees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b">Alberta</td>
                  <td className="p-3 border-b text-right font-bold text-green-700">~$240</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">Ontario</td>
                  <td className="p-3 border-b text-right text-red-600">$10,475</td>
                </tr>
                <tr>
                  <td className="p-3 border-b">BC</td>
                  <td className="p-3 border-b text-right text-red-600">$12,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="business">Business Tax Advantages</h2>
          <p>
            Alberta offers significant advantages for business owners:
          </p>

          <h3>Corporate Tax Rates 2025</h3>
          <ul>
            <li><strong>Small business rate:</strong> 2% (lowest in Canada)</li>
            <li><strong>General corporate rate:</strong> 8% (lowest in Canada)</li>
            <li><strong>Combined with federal:</strong> 11% small business, 23% general</li>
          </ul>

          <h3>Business Operating Advantages</h3>
          <ul>
            <li>No PST on equipment, supplies, or services</li>
            <li>Lower workers' compensation rates than many provinces</li>
            <li>Business-friendly regulatory environment</li>
            <li>Energy sector incentives</li>
          </ul>

          <h2 id="comparison">Provincial Comparison</h2>
          <p>
            How does Alberta compare to other major provinces for total tax burden?
          </p>

          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Province</th>
                  <th className="text-right p-3 font-semibold border-b">$75K Income Tax</th>
                  <th className="text-right p-3 font-semibold border-b">$150K Income Tax</th>
                  <th className="text-center p-3 font-semibold border-b">PST</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="p-3 border-b font-medium">Alberta</td>
                  <td className="p-3 border-b text-right">~$16,500</td>
                  <td className="p-3 border-b text-right">~$42,000</td>
                  <td className="p-3 border-b text-center text-green-700 font-bold">0%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Ontario</td>
                  <td className="p-3 border-b text-right">~$17,800</td>
                  <td className="p-3 border-b text-right">~$47,500</td>
                  <td className="p-3 border-b text-center">8%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">BC</td>
                  <td className="p-3 border-b text-right">~$17,200</td>
                  <td className="p-3 border-b text-right">~$48,000</td>
                  <td className="p-3 border-b text-center">7%</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Quebec</td>
                  <td className="p-3 border-b text-right">~$20,500</td>
                  <td className="p-3 border-b text-right">~$54,000</td>
                  <td className="p-3 border-b text-center">9.975%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="moving">Moving to Alberta</h2>
          <p>
            If you're considering a move to Alberta for tax savings, here's what to know:
          </p>
          <ul>
            <li><strong>December 31 rule:</strong> Your province of residence on December 31 determines which province you file taxes in</li>
            <li><strong>Immediate savings:</strong> Start saving on PST immediately upon moving</li>
            <li><strong>Vehicle registration:</strong> Lower vehicle registration costs</li>
            <li><strong>Home purchase:</strong> Save $10,000+ on land transfer tax vs Ontario</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <p className="text-amber-800 text-sm">
              <strong>Planning Tip:</strong> If you're moving to Alberta, timing your move before December 31 means
              you'll file your entire year's taxes at Alberta rates. Timing after January 1 means waiting another year.
            </p>
          </div>

          <h2 id="tax-planning">Tax Planning for Albertans</h2>

          <h3>RRSP Contributions</h3>
          <p>
            RRSP contributions are deductible at your marginal rate. With Alberta's new 8% bracket,
            those in lower brackets may want to prioritize TFSA instead (since RRSP deductions at 8% are less valuable).
          </p>

          <h3>Income Splitting</h3>
          <p>
            With Alberta's flat 10% rate for most income, income splitting provides less provincial benefit
            than in high-tax provinces. However, federal tax savings still apply.
          </p>

          <h3>Capital Gains</h3>
          <p>
            Capital gains are taxed at 50% inclusion. Combined federal + Alberta rates range from ~12% to ~24%
            effective tax on capital gains depending on your income bracket.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About Alberta Taxes?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer your specific questions about Alberta provincial taxes, credits, and planning strategies.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> Tax rates and benefits change annually. This guide reflects 2025 rates as announced.
              Always verify current rates with the Alberta government or CRA for your specific situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
