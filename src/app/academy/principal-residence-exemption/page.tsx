import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Home, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Principal Residence Exemption Canada 2024 | Home Sale Tax Guide',
  description: 'Complete guide to the principal residence exemption in Canada. Learn designation rules, the plus-one formula, multiple property planning, and how to maximize your tax-free home sale.',
  keywords: 'principal residence exemption Canada, PRE calculation, home sale tax free, multiple property tax, T2091 form',
}

export default function PrincipalResidenceExemptionPage() {
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
              <Home className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Advanced Strategies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Principal Residence Exemption: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Tax-Free Home Sale</h2>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            The principal residence exemption (PRE) allows you to sell your home tax-free. But there can only be one PRE per family per year, so planning is crucial when you own multiple properties.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Qualifies as a Principal Residence?</h2>
          <p>A housing unit (house, condo, cottage, etc.) that you:</p>
          <ul>
            <li><strong>Owned</strong> (alone or jointly)</li>
            <li><strong>Ordinarily inhabited</strong> at some point during the year</li>
            <li>Or that your spouse, former spouse, or child ordinarily inhabited</li>
          </ul>

          <h3>Types of Properties That Can Qualify</h3>
          <ul>
            <li>House, condominium, apartment</li>
            <li>Cottage or vacation property</li>
            <li>Mobile home or trailer</li>
            <li>Houseboat</li>
            <li>Share in a co-operative housing corporation</li>
          </ul>

          <h2>The One-Per-Family Rule</h2>
          <p>Critical rule: Only ONE principal residence per family unit per year.</p>

          <h3>Family Unit Includes</h3>
          <ul>
            <li>You</li>
            <li>Your spouse or common-law partner</li>
            <li>Your unmarried children under 18</li>
          </ul>

          <h3>This Means</h3>
          <ul>
            <li>If spouse owns cottage and you own city home, only one can be PRE each year</li>
            <li>Must choose which property to designate for each year of ownership</li>
            <li>Planning required when selling either property</li>
          </ul>

          <h2>The PRE Formula</h2>
          <p>The exemption is calculated using the "plus one" formula:</p>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 my-4 not-prose font-mono text-sm">
            Exempt Gain = Capital Gain × (1 + Years Designated) / Years Owned
          </div>

          <h3>Why "Plus One"?</h3>
          <ul>
            <li>The extra year accounts for the fact you can't designate a property for the year of acquisition AND year of sale if buying a new home</li>
            <li>Provides a one-year cushion when moving</li>
          </ul>

          <h3>Example</h3>
          <p>You owned your home for 10 years and designate it as PRE for 8 years:</p>
          <ul>
            <li>Capital gain: $200,000</li>
            <li>Exempt: $200,000 × (1 + 8) / 10 = $180,000</li>
            <li>Taxable gain: $20,000</li>
          </ul>

          <h2>Reporting Requirements</h2>
          <p>Since 2016, you must report the sale and designation:</p>

          <h3>Form T2091</h3>
          <ul>
            <li>File with your tax return for year of sale</li>
            <li>Required even if gain is fully exempt</li>
            <li>Failure to file: Exemption may be denied</li>
          </ul>

          <h3>Schedule 3</h3>
          <ul>
            <li>Report the sale on Schedule 3 (Capital Gains)</li>
            <li>Claim the exemption</li>
            <li>Net gain should be zero if fully exempt</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Not reporting your home sale (even if tax-free) can result in a $8,000 penalty and denial of the exemption. Always file the required forms.
            </p>
          </div>

          <h2>Multiple Property Strategy</h2>
          <p>When you own both a home and cottage:</p>

          <h3>Option 1: Designate Property with Larger Gain</h3>
          <ul>
            <li>Calculate potential gain on each property</li>
            <li>Designate more years to property with larger gain per year</li>
            <li>Use plus-one year on property you sell first</li>
          </ul>

          <h3>Option 2: Staggered Sales</h3>
          <ul>
            <li>Sell one property, use full exemption</li>
            <li>Wait, then sell other property</li>
            <li>Each gets full benefit of ownership years</li>
          </ul>

          <h3>Example Planning</h3>
          <p>Own city home (15 years) and cottage (15 years):</p>
          <ul>
            <li>City home gain: $600,000</li>
            <li>Cottage gain: $300,000</li>
            <li>Designate city home for 10 years ($400/year of gain/year)</li>
            <li>Designate cottage for 5 years ($200/year of gain/year)</li>
            <li>Maximize total exemption on larger gain</li>
          </ul>

          <h2>Change in Use Rules</h2>

          <h3>Converting Principal Residence to Rental</h3>
          <ul>
            <li>Deemed disposition at FMV when you change use</li>
            <li>Can elect to defer gain (no immediate tax)</li>
            <li>Election preserves PRE for up to 4 years after moving out</li>
            <li>Cannot claim CCA on the property to preserve election</li>
          </ul>

          <h3>Converting Rental to Principal Residence</h3>
          <ul>
            <li>Deemed disposition at FMV</li>
            <li>Capital gain on rental years is taxable</li>
            <li>Future gain on PR portion is exempt</li>
          </ul>

          <h2>Land Size Limits</h2>
          <ul>
            <li>Half hectare (1.24 acres) included automatically</li>
            <li>Excess land only included if necessary for use and enjoyment</li>
            <li>Rural properties may need to justify larger land portion</li>
            <li>Excess land may be taxable even if house is exempt</li>
          </ul>

          <h2>Special Situations</h2>

          <h3>Flipping Properties</h3>
          <ul>
            <li>Frequent sales may be deemed business income, not capital gains</li>
            <li>Business income is 100% taxable (no 50% inclusion)</li>
            <li>PRE doesn't apply to inventory</li>
            <li>Anti-flipping rule: Properties owned less than 12 months are business income</li>
          </ul>

          <h3>Inherited Properties</h3>
          <ul>
            <li>Receive property at FMV at death (usually)</li>
            <li>Only your ownership period counts for your PRE</li>
            <li>Cannot use deceased's designation years</li>
          </ul>

          <h3>Separation and Divorce</h3>
          <ul>
            <li>Transfer to ex-spouse is tax-free rollover</li>
            <li>Ex-spouse inherits your designation history</li>
            <li>Plan carefully who keeps the home</li>
          </ul>

          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Not filing T2091:</strong> Required since 2016, even for tax-free sales</li>
            <li><strong>Both spouses claiming:</strong> Only one PRE per family per year</li>
            <li><strong>Renting part of home:</strong> May affect exemption proportionally</li>
            <li><strong>Not tracking ACB:</strong> Need accurate cost base for calculation</li>
            <li><strong>Ignoring anti-flipping:</strong> Short-term sales may not qualify</li>
          </ul>

          <h2>Calculating Adjusted Cost Base</h2>
          <p>Your ACB includes:</p>
          <ul>
            <li>Purchase price</li>
            <li>Land transfer taxes</li>
            <li>Legal fees on purchase</li>
            <li>Capital improvements (not repairs)</li>
            <li>Not deductible: Ongoing maintenance, mortgage interest</li>
          </ul>

          <h3>Capital Improvements</h3>
          <p>Additions to ACB:</p>
          <ul>
            <li>Renovations that add value (new kitchen, addition)</li>
            <li>Replacement of major systems (roof, furnace)</li>
            <li>Landscaping that adds permanent value</li>
          </ul>

          <h2>Provincial Considerations</h2>
          <p>The PRE is a federal rule, but provincial taxes also apply to any taxable portion:</p>
          <ul>
            <li>Ontario, BC have additional property taxes (speculation, vacancy)</li>
            <li>Quebec has slightly different rules for some situations</li>
            <li>Always consider both federal and provincial implications</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Principal Residence?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about the principal residence exemption.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Principal residence rules are complex, especially with multiple properties or changes in use. This guide provides general information. Consult a tax professional for specific situations.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
