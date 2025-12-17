import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, RefreshCw, ArrowRight, CheckCircle, DollarSign, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Annuity Tax Guide Canada 2025 | Life Annuities, Prescribed Annuities & RRSP Annuity Taxation',
  description: 'Complete guide to annuity taxation in Canada for 2025. Learn about prescribed vs non-prescribed annuities, RRSP annuities, pension income splitting, and tax-efficient retirement income strategies.',
  keywords: 'annuity tax Canada 2025, life annuity taxation, prescribed annuity tax, RRSP annuity, annuity income tax, pension income splitting, retirement income Canada',
  openGraph: {
    title: 'Annuity Tax Guide Canada 2025 | Complete Taxation Guide',
    description: 'Understand how annuities are taxed in Canada. Prescribed vs non-prescribed, RRSP annuities, and tax-saving strategies.',
    type: 'article',
  },
}

export default function AnnuityTaxGuidePage() {
  return (
    <article className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-emerald-600 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-cyan-100 p-2.5 rounded-xl">
              <RefreshCw className="h-6 w-6 text-cyan-600" />
            </div>
            <span className="text-sm font-medium text-cyan-600">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Annuity Tax Guide Canada 2025
          </h1>
          <p className="text-xl text-slate-600 mb-4">
            Understand how annuities are taxed in Canada and discover strategies to maximize your retirement income while minimizing taxes.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated January 2025</span>
          </div>
        </header>

        {/* Key Info Box */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-cyan-900 mb-4 text-xl">Key Annuity Tax Facts for 2025</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-cyan-900">Registered Annuities</p>
                <p className="text-cyan-700 text-sm">100% taxable as income</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-cyan-900">Prescribed Annuities</p>
                <p className="text-cyan-700 text-sm">Level taxation for tax deferral</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-cyan-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-cyan-900">Income Splitting</p>
                <p className="text-cyan-700 text-sm">Available at age 65+ (RRSP)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-base prose-li:sm:text-lg prose-ul:my-4 prose-ol:my-4">

          <h2 id="types-of-annuities">Types of Annuities in Canada</h2>
          <p>
            Understanding the different types of annuities is essential for choosing the right retirement income strategy. Each type has different features, tax implications, and suitability based on your needs.
          </p>

          {/* Annuity Types Comparison Table */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Annuity Type</th>
                  <th className="text-left p-3 font-semibold border-b">Payments</th>
                  <th className="text-left p-3 font-semibold border-b">Estate Value</th>
                  <th className="text-left p-3 font-semibold border-b">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium">Life Annuity</td>
                  <td className="p-3 border-b">For your lifetime</td>
                  <td className="p-3 border-b text-red-600">None</td>
                  <td className="p-3 border-b">Maximum income, longevity protection</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">Term Certain</td>
                  <td className="p-3 border-b">Fixed period (e.g., 20 years)</td>
                  <td className="p-3 border-b text-green-600">Yes</td>
                  <td className="p-3 border-b">Guaranteed payments to estate</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Joint & Survivor</td>
                  <td className="p-3 border-b">Both spouses&apos; lifetimes</td>
                  <td className="p-3 border-b text-amber-600">To survivor</td>
                  <td className="p-3 border-b">Couples, survivor protection</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">Guaranteed Period</td>
                  <td className="p-3 border-b">Life with minimum years</td>
                  <td className="p-3 border-b text-green-600">If death early</td>
                  <td className="p-3 border-b">Balance income + estate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Life Annuity</h3>
          <ul>
            <li><strong>Payments for your lifetime</strong> – income continues no matter how long you live</li>
            <li><strong>No payments to estate</strong> – payments stop at death (usually)</li>
            <li><strong>Highest payment amounts</strong> – longevity risk is transferred to the insurance company</li>
          </ul>

          <h3>Term Certain Annuity</h3>
          <ul>
            <li><strong>Payments for a fixed period</strong> – e.g., 10, 15, or 20 years</li>
            <li><strong>Estate protection</strong> – remaining payments go to beneficiaries if you die</li>
            <li><strong>Lower payments</strong> – than life annuity because of guaranteed payout period</li>
          </ul>

          <h3>Joint and Survivor Annuity</h3>
          <ul>
            <li><strong>Payments continue to surviving spouse</strong> – income for both lifetimes</li>
            <li><strong>Reduced rate options</strong> – survivor may receive 50%, 66%, or 100% of original payment</li>
            <li><strong>Lower initial payments</strong> – covers two lives instead of one</li>
          </ul>

          <h3>Guaranteed Period Annuity</h3>
          <ul>
            <li><strong>Life annuity with minimum guarantee</strong> – combines lifetime income with estate protection</li>
            <li><strong>Example:</strong> Life annuity with 10-year guarantee</li>
            <li><strong>Payments to estate</strong> – if death occurs before guarantee period ends</li>
          </ul>

          <h2 id="registered-vs-non-registered">Registered vs Non-Registered Annuities</h2>
          <p>
            The source of funds used to purchase your annuity determines how it&apos;s taxed. This is one of the most important distinctions in annuity taxation.
          </p>

          <h3>Registered Annuities (from RRSP/RRIF)</h3>
          <ul>
            <li><strong>100% of payments are taxable</strong> – every dollar is included in income</li>
            <li><strong>Same treatment as RRIF withdrawals</strong> – no tax advantage vs staying in RRIF</li>
            <li><strong>Purchased with pre-tax money</strong> – you got a deduction when contributing</li>
            <li><strong>Qualifies for pension income splitting</strong> – at age 65+ (up to 50% to spouse)</li>
            <li><strong>Qualifies for pension income credit</strong> – up to $2,000 credit amount</li>
          </ul>

          <h3>Non-Registered Annuities</h3>
          <ul>
            <li><strong>Only interest portion is taxable</strong> – capital is returned tax-free</li>
            <li><strong>More tax-efficient</strong> – part of each payment is your own money back</li>
            <li><strong>Tax treatment depends on prescribed/non-prescribed status</strong> – see below</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <DollarSign className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Tax Comparison Example</p>
                <p className="text-blue-700 text-sm">
                  A $1,000/month payment from a registered annuity: <strong>$1,000 taxable</strong>.<br />
                  A $1,000/month payment from a non-registered prescribed annuity: <strong>~$300-400 taxable</strong> (only interest portion).
                </p>
              </div>
            </div>
          </div>

          <h2 id="prescribed-vs-non-prescribed">Prescribed vs Non-Prescribed Annuities</h2>
          <p>
            For non-registered annuities, the prescribed vs non-prescribed classification significantly affects when you pay tax.
          </p>

          <h3>Prescribed Annuity (Recommended)</h3>
          <ul>
            <li><strong>Level taxation each year</strong> – same taxable amount throughout</li>
            <li><strong>Interest and capital spread evenly</strong> – smooths out tax burden</li>
            <li><strong>Better for early years</strong> – defer tax compared to accrual method</li>
            <li><strong>May preserve government benefits</strong> – lower taxable income in early years</li>
          </ul>

          <h3>Non-Prescribed Annuity (Accrual Method)</h3>
          <ul>
            <li><strong>Interest taxed as earned</strong> – follows economic accrual</li>
            <li><strong>Higher tax in early years</strong> – when interest portion is largest</li>
            <li><strong>Lower tax in later years</strong> – as capital repayment increases</li>
            <li><strong>Often results in more total tax</strong> – due to time value of money</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Prescribed Annuity Advantage</p>
                <p className="text-emerald-700 text-sm">
                  For a 70-year-old purchasing a non-registered annuity, a prescribed annuity might have <strong>30% taxable</strong> each year,
                  while non-prescribed could be <strong>60% taxable</strong> in early years. This represents significant tax deferral and potential savings.
                </p>
              </div>
            </div>
          </div>

          <h2 id="tax-calculation">Tax Calculation Example</h2>
          <p>
            Let&apos;s see how the numbers work with a real example.
          </p>

          <h3>Non-Registered Prescribed Annuity Example</h3>
          <div className="bg-slate-50 rounded-xl p-5 my-6 not-prose">
            <h4 className="font-semibold text-slate-900 mb-3">Scenario</h4>
            <ul className="space-y-1 text-sm text-slate-700 mb-4">
              <li><strong>Purchase amount:</strong> $100,000</li>
              <li><strong>Annual payment:</strong> $8,000</li>
              <li><strong>Life expectancy:</strong> 20 years</li>
            </ul>
            <h4 className="font-semibold text-slate-900 mb-3">Calculation</h4>
            <ul className="space-y-1 text-sm text-slate-700">
              <li>Total payments expected: $160,000 ($8,000 × 20)</li>
              <li>Return of capital: $100,000 (your original investment)</li>
              <li>Total interest: $60,000 ($160,000 - $100,000)</li>
              <li className="text-emerald-700 font-medium">Taxable portion each year: $3,000 ($60,000 ÷ 20)</li>
              <li className="text-emerald-700 font-medium">Tax-free return of capital: $5,000/year</li>
            </ul>
            <p className="text-slate-600 text-sm mt-4">
              <strong>Result:</strong> Only 37.5% of each payment is taxable. The remaining 62.5% is your capital returned tax-free.
            </p>
          </div>

          <h3>If Non-Prescribed (Accrual Method)</h3>
          <ul>
            <li><strong>Early years:</strong> More interest portion = higher taxable amount</li>
            <li><strong>Later years:</strong> Less interest portion = lower taxable amount</li>
            <li><strong>Net effect:</strong> Less beneficial due to time value of money</li>
          </ul>

          <h2 id="qualifying-prescribed">Qualifying for Prescribed Treatment</h2>
          <p>
            Not all annuities qualify for prescribed treatment. The annuity must meet specific requirements under the Income Tax Act.
          </p>

          <h3>Requirements for Prescribed Status</h3>
          <ul>
            <li><strong>Individual annuitant</strong> – must be owned by an individual, not a corporation</li>
            <li><strong>Non-commutable</strong> – cannot be cashed out or surrendered</li>
            <li><strong>Level payments</strong> – payment amounts must be constant</li>
            <li><strong>Life or term certain annuity</strong> – must be one of these types</li>
            <li><strong>Annual payments minimum</strong> – payments at least once per year</li>
          </ul>

          <h3>What Disqualifies an Annuity</h3>
          <ul>
            <li><strong>Variable payments</strong> – indexed or fluctuating amounts</li>
            <li><strong>Cash-out option</strong> – ability to surrender for lump sum</li>
            <li><strong>Corporate ownership</strong> – owned through a corporation</li>
            <li><strong>Certain guarantee periods</strong> – some features may disqualify</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 my-6 not-prose">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-amber-900 mb-1">Important</p>
                <p className="text-amber-700 text-sm">
                  Confirm prescribed status with the insurance company before purchasing. The tax implications are significant over the life of the annuity.
                </p>
              </div>
            </div>
          </div>

          <h2 id="rrsp-annuity-vs-rrif">RRSP Annuity vs RRIF</h2>
          <p>
            When converting your RRSP to retirement income, you have two main options: purchase an annuity or convert to a RRIF. Here&apos;s how they compare.
          </p>

          {/* RRSP Annuity vs RRIF Comparison */}
          <div className="overflow-x-auto not-prose my-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 font-semibold border-b">Feature</th>
                  <th className="text-left p-3 font-semibold border-b">RRSP Annuity</th>
                  <th className="text-left p-3 font-semibold border-b">RRIF</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium">Income Guarantee</td>
                  <td className="p-3 border-b text-green-600">Guaranteed for life</td>
                  <td className="p-3 border-b text-amber-600">Depends on investments</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">Flexibility</td>
                  <td className="p-3 border-b text-red-600">None (locked in)</td>
                  <td className="p-3 border-b text-green-600">High (vary withdrawals)</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Investment Control</td>
                  <td className="p-3 border-b text-red-600">None</td>
                  <td className="p-3 border-b text-green-600">Full control</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border-b font-medium">Estate Value</td>
                  <td className="p-3 border-b text-red-600">Usually none</td>
                  <td className="p-3 border-b text-green-600">Remaining balance</td>
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium">Longevity Risk</td>
                  <td className="p-3 border-b text-green-600">Protected</td>
                  <td className="p-3 border-b text-amber-600">You bear the risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>RRSP Annuity Advantages</h3>
          <ul>
            <li><strong>Guaranteed income for life</strong> – never outlive your money</li>
            <li><strong>No investment decisions</strong> – set it and forget it</li>
            <li><strong>Longevity protection</strong> – insurance company bears the risk</li>
            <li><strong>Potentially higher income</strong> – if interest rates are favorable</li>
          </ul>

          <h3>RRSP Annuity Disadvantages</h3>
          <ul>
            <li><strong>No flexibility</strong> – can&apos;t change your mind once purchased</li>
            <li><strong>No access to principal</strong> – even in emergencies</li>
            <li><strong>No estate value</strong> – unless you add a guarantee (at lower payments)</li>
            <li><strong>Locked-in rate</strong> – no benefit if rates rise later</li>
          </ul>

          <h3>Hybrid Approach (Best of Both)</h3>
          <p>
            Many retirees benefit from using both options:
          </p>
          <ul>
            <li><strong>Annuity for base expenses</strong> – cover essential costs with guaranteed income</li>
            <li><strong>RRIF for discretionary spending</strong> – flexibility for variable needs</li>
            <li><strong>Balance security and control</strong> – peace of mind plus adaptability</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-6 not-prose">
            <p className="text-blue-800 text-sm">
              <strong>Interest Rates Matter:</strong> Annuity rates are locked at purchase. A higher interest rate environment generally means better annuity rates.
              With 2025 rates higher than the 2010-2021 period, it may be a good time to consider annuities.
            </p>
          </div>

          <h2 id="tax-reporting">Tax Reporting</h2>
          <p>
            Understanding how to report annuity income on your tax return ensures accurate filing.
          </p>

          <h3>Registered Annuity Reporting</h3>
          <ul>
            <li><strong>Tax slip:</strong> T4A from insurance company</li>
            <li><strong>Report on:</strong> Line 11500 (Other pensions and superannuation)</li>
            <li><strong>Pension income credit:</strong> Qualifies for up to $2,000 credit</li>
          </ul>

          <h3>Non-Registered Annuity Reporting</h3>
          <ul>
            <li><strong>Tax slip:</strong> T5 showing interest portion only</li>
            <li><strong>Report on:</strong> Line 12100 (Interest and other investment income)</li>
            <li><strong>Capital portion:</strong> Not reported (tax-free return of your money)</li>
          </ul>

          <h2 id="pension-income-splitting">Pension Income Splitting</h2>
          <p>
            Income splitting can significantly reduce taxes for couples with different income levels.
          </p>

          <h3>Registered Annuity (from RRSP) – Can Split</h3>
          <ul>
            <li><strong>Age requirement:</strong> Must be 65 or older</li>
            <li><strong>Split amount:</strong> Up to 50% to spouse</li>
            <li><strong>How to claim:</strong> File Form T1032 with both tax returns</li>
            <li><strong>Benefit:</strong> Lower combined taxes if spouse is in lower bracket</li>
          </ul>

          <h3>Non-Registered Annuity – Cannot Split</h3>
          <ul>
            <li><strong>Not eligible:</strong> Interest portion is investment income, not pension income</li>
            <li><strong>Alternative:</strong> Consider spousal RRSP annuity for splitting benefits</li>
          </ul>

          <h2 id="annuity-strategies">Tax-Efficient Annuity Strategies</h2>
          <p>
            Strategic use of annuities can optimize both income and taxes in retirement.
          </p>

          <h3>Annuity Laddering</h3>
          <ul>
            <li><strong>Purchase annuities at different ages</strong> – 65, 70, 75, etc.</li>
            <li><strong>Get better rates as you age</strong> – shorter life expectancy = higher payments</li>
            <li><strong>Diversify interest rate risk</strong> – not all locked in at one rate</li>
            <li><strong>Maintain flexibility</strong> – keep options open longer</li>
          </ul>

          <h3>Cover Basic Expenses Strategy</h3>
          <ul>
            <li><strong>Calculate essential costs</strong> – housing, food, utilities, healthcare</li>
            <li><strong>Annuity for essentials</strong> – guaranteed income covers the basics</li>
            <li><strong>RRIF/TFSA for extras</strong> – flexibility for travel, gifts, discretionary spending</li>
            <li><strong>Peace of mind</strong> – essentials are always covered regardless of markets</li>
          </ul>

          <h3>Tax-Efficient Non-Registered Strategy</h3>
          <ul>
            <li><strong>Use prescribed annuity</strong> – maximize tax deferral</li>
            <li><strong>Lower taxable income in early years</strong> – only interest portion is taxed</li>
            <li><strong>May preserve government benefits</strong> – keep income below OAS clawback threshold</li>
            <li><strong>GIS preservation</strong> – for lower-income seniors, prescribed annuity may help maintain GIS eligibility</li>
          </ul>

          <h2 id="special-situations">Special Situations</h2>

          <h3>Annuity from Pension Plan</h3>
          <ul>
            <li><strong>Different rules</strong> – not the same as a purchased annuity</li>
            <li><strong>100% taxable</strong> – defined benefit pension payments are fully taxable</li>
            <li><strong>Pension splitting at any age</strong> – unlike RRSP annuity, no age 65 requirement</li>
          </ul>

          <h3>Foreign Annuities</h3>
          <ul>
            <li><strong>May be taxed differently</strong> – depends on tax treaty with source country</li>
            <li><strong>Foreign tax credit available</strong> – claim credit for foreign withholding tax</li>
            <li><strong>Reporting requirements</strong> – may need to file foreign income forms</li>
          </ul>

          <h3>Impaired Life Annuities</h3>
          <ul>
            <li><strong>Higher rates for health conditions</strong> – underwritten based on medical history</li>
            <li><strong>Shorter expected life = higher payments</strong> – can be 10-30% more than standard rates</li>
            <li><strong>Same tax treatment</strong> – prescribed/non-prescribed rules still apply</li>
          </ul>

          <h2 id="death-and-annuities">Death and Annuities</h2>
          <p>
            What happens to your annuity when you die depends on the type you purchased.
          </p>

          <h3>Life Only Annuity</h3>
          <ul>
            <li><strong>Payments stop at death</strong> – no continuing payments</li>
            <li><strong>Nothing to estate</strong> – remaining value stays with insurance company</li>
            <li><strong>No tax consequences</strong> – nothing to report on final return</li>
          </ul>

          <h3>Guaranteed Period Annuity</h3>
          <ul>
            <li><strong>Remaining payments to beneficiary</strong> – for the rest of guarantee period</li>
            <li><strong>Taxable to recipient</strong> – beneficiary reports income on their return</li>
            <li><strong>Lump sum option</strong> – commuted value may be available (fully taxable)</li>
          </ul>

          <h3>Joint and Survivor Annuity</h3>
          <ul>
            <li><strong>Payments continue to survivor</strong> – at the elected percentage (50-100%)</li>
            <li><strong>Survivor pays tax</strong> – reports income on their own return</li>
            <li><strong>No estate involvement</strong> – seamless transition</li>
          </ul>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-emerald-900 mb-2">Questions About Annuity Taxation?</h3>
            <p className="text-emerald-700 text-sm mb-4">
              Our AI tax assistant can help answer specific questions about annuity taxation, prescribed vs non-prescribed calculations, and retirement income planning.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 rounded-xl p-5 mt-8 not-prose">
            <p className="text-slate-600 text-sm">
              <strong>Disclaimer:</strong> Annuity decisions are significant and irreversible. This guide provides general information only.
              Consult with a qualified financial advisor and insurance specialist before purchasing an annuity.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
