import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Gift, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Taxable Benefits Canada 2024 | Employee Perks & Tax Guide',
  description: 'Complete guide to taxable employee benefits in Canada. Learn which benefits are taxable, how they appear on your T4, and which perks are tax-free.',
  keywords: 'taxable benefits Canada, employee perks tax, T4 taxable benefits, employer benefits tax, non-cash benefits',
}

export default function TaxableBenefitsGuidePage() {
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
              <Gift className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Taxable Employee Benefits Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-pink-50 dark:bg-pink-950 border border-pink-200 dark:border-pink-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-pink-900 dark:text-pink-100 mb-3">Benefits = Income</h2>
          <p className="text-pink-700 dark:text-pink-300 text-sm">
            Most non-cash benefits from your employer are considered taxable income. Understanding which benefits are taxable helps you avoid surprises and plan your finances.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Common Taxable Benefits</h2>

          <h3>Company Car / Vehicle</h3>
          <ul>
            <li><strong>Standby charge:</strong> 2% of vehicle cost per month (or 2/3 of lease)</li>
            <li><strong>Operating benefit:</strong> 33¢/km personal use OR 50% of standby</li>
            <li>Reduced if mostly business use</li>
            <li>Keep detailed log of business vs personal</li>
          </ul>

          <h3>Employer-Paid Housing</h3>
          <ul>
            <li>Full FMV of accommodation is taxable</li>
            <li>Exception for remote work locations</li>
            <li>May include utilities paid</li>
          </ul>

          <h3>Group Insurance Premiums</h3>
          <ul>
            <li><strong>Life insurance:</strong> Employer portion taxable</li>
            <li><strong>Disability (STD/LTD):</strong> If employer pays, benefits are taxable</li>
            <li><strong>Extended health:</strong> Generally NOT taxable</li>
            <li><strong>Dental:</strong> Generally NOT taxable</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>LTD Planning:</strong> If you pay your own LTD premiums (after-tax), any disability benefits you receive will be tax-free. If employer pays, benefits are taxable.
            </p>
          </div>

          <h3>Stock Options</h3>
          <ul>
            <li>Taxable when exercised (usually)</li>
            <li>50% deduction may apply</li>
            <li>CCPCs have deferral rules</li>
            <li>See our separate stock options guide</li>
          </ul>

          <h3>Interest-Free Loans</h3>
          <ul>
            <li>Taxable benefit = prescribed rate minus rate paid</li>
            <li>Calculate quarterly</li>
            <li>Home purchase loans have special rules</li>
            <li>2024 prescribed rate varies</li>
          </ul>

          <h3>Tuition / Professional Development</h3>
          <ul>
            <li><strong>Primarily employer benefit:</strong> Generally not taxable</li>
            <li><strong>Primarily employee benefit:</strong> Taxable</li>
            <li>Job-related training usually not taxable</li>
            <li>General interest courses may be taxable</li>
          </ul>

          <h2>Non-Taxable Benefits</h2>

          <h3>Employer Contributions to:</h3>
          <ul>
            <li>Registered Pension Plans (RPP)</li>
            <li>Group RRSPs (deferred taxation)</li>
            <li>Deferred profit sharing plans</li>
          </ul>

          <h3>Health & Wellness</h3>
          <ul>
            <li>Private health services plan premiums</li>
            <li>Dental plan premiums</li>
            <li>Counselling services (certain types)</li>
            <li>Fitness membership (up to $500/year)</li>
          </ul>

          <h3>Working Conditions</h3>
          <ul>
            <li>Uniforms and special clothing</li>
            <li>Tools and equipment for work</li>
            <li>Reasonable overtime meals</li>
            <li>Business travel reimbursement</li>
          </ul>

          <h3>Special Exemptions</h3>
          <ul>
            <li>Discounts on employer merchandise (reasonable)</li>
            <li>Social events (up to $150/event, max 6/year)</li>
            <li>Non-cash gifts (up to $500/year)</li>
            <li>Awards for service (up to $500)</li>
          </ul>

          <h2>How Benefits Appear on T4</h2>

          <h3>Box 14 – Employment Income</h3>
          <p>Includes all taxable benefits added to regular pay</p>

          <h3>Specific Benefit Boxes</h3>
          <ul>
            <li><strong>Box 34:</strong> Personal use of vehicle</li>
            <li><strong>Box 36:</strong> Interest on loans</li>
            <li><strong>Box 38:</strong> Stock option benefits</li>
            <li><strong>Box 40:</strong> Other taxable benefits</li>
          </ul>

          <h2>Automobile Benefits Detail</h2>

          <h3>Standby Charge</h3>
          <p>If company provides a vehicle:</p>
          <ul>
            <li>2% × original cost × months available</li>
            <li>Or 2/3 × lease cost × months</li>
            <li>Reduced if personal use under 1,667 km/month</li>
            <li>And used primarily (50%+) for business</li>
          </ul>

          <h3>Operating Expense Benefit</h3>
          <ul>
            <li>33¢/km for personal kilometres</li>
            <li>Or elect 50% of standby charge (if primarily business)</li>
            <li>Includes gas, insurance, maintenance</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Record Keeping:</strong> Keep a detailed vehicle log showing business vs personal kilometres. Without records, CRA may deem all use personal.
            </p>
          </div>

          <h2>Parking Benefits</h2>
          <ul>
            <li><strong>Regular workplace parking:</strong> Taxable</li>
            <li><strong>Exception:</strong> Free parking available to public</li>
            <li><strong>Exception:</strong> Scramble parking (first-come basis)</li>
            <li><strong>Exception:</strong> Disabled employee parking</li>
          </ul>

          <h2>Gifts and Awards</h2>

          <h3>Non-Cash Gifts</h3>
          <ul>
            <li>Up to $500/year total not taxable</li>
            <li>Cash and near-cash always taxable</li>
            <li>Gift cards = cash</li>
            <li>Points that convert to cash = cash</li>
          </ul>

          <h3>Long Service Awards</h3>
          <ul>
            <li>Non-cash up to $500 not taxable</li>
            <li>Minimum 5 years of service</li>
            <li>Not given within past 5 years</li>
          </ul>

          <h2>Remote Work Benefits</h2>

          <h3>Equipment Provided</h3>
          <ul>
            <li>Computer for work: Not taxable</li>
            <li>Office furniture: Generally not taxable</li>
            <li>Internet reimbursement: Not taxable if for work</li>
          </ul>

          <h3>Home Office Allowance</h3>
          <ul>
            <li>Reasonable allowance: Not taxable</li>
            <li>Must be based on actual expenses</li>
            <li>Flat rate may be taxable</li>
          </ul>

          <h2>Professional Dues</h2>
          <ul>
            <li>Required for employment: Not taxable if paid by employer</li>
            <li>May be deductible if you pay</li>
            <li>Union dues: Deductible</li>
          </ul>

          <h2>Cell Phone / Internet</h2>
          <ul>
            <li>Primary business use: Not taxable</li>
            <li>Personal use: Taxable</li>
            <li>Reasonable personal use often ignored</li>
            <li>Employer policies vary</li>
          </ul>

          <h2>Planning Considerations</h2>

          <h3>Review Your T4</h3>
          <ul>
            <li>Understand what benefits are included</li>
            <li>Verify calculations are correct</li>
            <li>Ask payroll if unclear</li>
          </ul>

          <h3>Compare Cash vs Benefits</h3>
          <ul>
            <li>Sometimes cash is better (can invest in TFSA)</li>
            <li>Sometimes benefit is better (no cash outlay)</li>
            <li>Consider the tax impact</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Taxable Benefits?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about employee benefits taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Benefit taxation rules are detailed and fact-specific. Consult CRA guides or a tax professional for your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
