import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Accessibility, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disability Tax Credit (DTC) Canada 2024 | T2201 Application Guide',
  description: 'Complete guide to the Disability Tax Credit in Canada. Learn eligibility requirements, how to apply with Form T2201, transferring the credit, and retroactive claims.',
  keywords: 'disability tax credit Canada, DTC eligibility, T2201 form, disability tax credit transfer, RDSP eligibility',
}

export default function DisabilityTaxCreditPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-violet-100 dark:bg-violet-900 p-2.5 rounded-xl">
              <Accessibility className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Tax Credits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Disability Tax Credit (DTC): Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />12 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Significant Tax Savings</h2>
          <p className="text-violet-700 dark:text-violet-300 text-sm">
            The DTC provides approximately $9,000 in federal tax relief for 2024 ($1,872 credit + supplement if under 18). Combined with provincial credits, total savings can exceed $2,000-$3,000 annually. It also unlocks access to the RDSP.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Is the Disability Tax Credit?</h2>
          <p>The DTC is a non-refundable tax credit that reduces income tax for people with severe and prolonged physical or mental impairments. It recognizes the additional costs faced by people with disabilities.</p>

          <h3>2024 Credit Amounts</h3>
          <ul>
            <li><strong>Base federal amount:</strong> $9,428 (15% = $1,414 credit)</li>
            <li><strong>Supplement for under 18:</strong> Additional $5,500 (15% = $825)</li>
            <li><strong>Provincial amounts:</strong> Additional credit varies by province</li>
          </ul>

          <h2>Eligibility Requirements</h2>
          <p>To qualify, you must have a severe and prolonged impairment that:</p>

          <h3>"Severe" Means</h3>
          <ul>
            <li>Markedly restricted in a basic activity of daily living, OR</li>
            <li>Significantly restricted in two or more activities (cumulative effect), OR</li>
            <li>Requires life-sustaining therapy at least 3 times weekly, averaging 14+ hours</li>
          </ul>

          <h3>"Prolonged" Means</h3>
          <ul>
            <li>The impairment has lasted, or is expected to last, at least 12 continuous months</li>
          </ul>

          <h3>Basic Activities of Daily Living</h3>
          <ul>
            <li><strong>Speaking:</strong> Unable to be understood in familiar surroundings</li>
            <li><strong>Hearing:</strong> Unable to hear to understand in familiar surroundings</li>
            <li><strong>Walking:</strong> Unable to walk 100 meters on level ground</li>
            <li><strong>Feeding:</strong> Unable to feed oneself</li>
            <li><strong>Dressing:</strong> Unable to dress oneself</li>
            <li><strong>Eliminating:</strong> Unable to control bowel/bladder functions</li>
            <li><strong>Mental functions:</strong> Severely impaired memory, problem solving, goal setting, judgment, or adaptive functioning</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> "Markedly restricted" means taking an inordinate amount of time (at least 3x longer than normal) to perform the activity, even with therapy, medication, or devices.
            </p>
          </div>

          <h2>Qualifying Conditions (Examples)</h2>
          <p>The DTC is based on functional limitations, not diagnosis. However, these conditions often qualify:</p>
          <ul>
            <li>Type 1 diabetes (life-sustaining therapy)</li>
            <li>Autism spectrum disorder</li>
            <li>ADHD (severe cases)</li>
            <li>Blindness or severe vision impairment</li>
            <li>Deafness or severe hearing impairment</li>
            <li>Mobility impairments requiring wheelchair</li>
            <li>Multiple sclerosis</li>
            <li>Celiac disease with significant restrictions</li>
            <li>Crohn's disease (severe)</li>
            <li>Mental health conditions (severe depression, bipolar, PTSD)</li>
            <li>Learning disabilities (severe)</li>
          </ul>

          <h2>How to Apply: Form T2201</h2>

          <h3>Step 1: Get the Form</h3>
          <p>Download Form T2201 (Disability Tax Credit Certificate) from CRA's website or get it from your medical practitioner.</p>

          <h3>Step 2: Complete Part A</h3>
          <p>You complete Part A with your personal information and consent.</p>

          <h3>Step 3: Medical Practitioner Completes Part B</h3>
          <p>A qualified medical practitioner must certify your impairment. Allowed practitioners:</p>
          <ul>
            <li><strong>All impairments:</strong> Medical doctor</li>
            <li><strong>Vision:</strong> Optometrist</li>
            <li><strong>Speech:</strong> Speech-language pathologist</li>
            <li><strong>Hearing:</strong> Audiologist</li>
            <li><strong>Walking:</strong> Physiotherapist, occupational therapist</li>
            <li><strong>Mental functions:</strong> Psychologist</li>
            <li><strong>Feeding/Dressing:</strong> Occupational therapist</li>
          </ul>

          <h3>Step 4: Submit to CRA</h3>
          <p>Mail or submit online through My Account. CRA reviews and responds within 8-10 weeks.</p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Important:</strong> Medical practitioners may charge a fee to complete the T2201 (typically $50-$200). This fee is not covered by provincial health plans.
            </p>
          </div>

          <h2>Retroactive Claims</h2>
          <p>If approved, you can claim the DTC for past years:</p>
          <ul>
            <li>Request adjustment for up to 10 previous tax years</li>
            <li>CRA determines the year disability began based on medical certification</li>
            <li>Use Form T1-ADJ or My Account to adjust past returns</li>
            <li>Interest paid on refunds for past years</li>
          </ul>

          <h2>Transferring the DTC</h2>
          <p>If you don't need the full credit to reduce your taxes to zero, you can transfer all or part to a supporting person:</p>

          <h3>Eligible Transferees</h3>
          <ul>
            <li>Spouse or common-law partner</li>
            <li>Parent, grandparent, child, grandchild</li>
            <li>Sibling, aunt, uncle, niece, nephew</li>
            <li>In-laws in these categories</li>
          </ul>

          <h3>Support Requirement</h3>
          <p>The supporting person must have provided support at some time during the year. This is broadly interpreted.</p>

          <h2>Related Benefits Unlocked by DTC</h2>
          <p>DTC approval opens access to:</p>
          <ul>
            <li><strong>RDSP:</strong> Registered Disability Savings Plan with government grants</li>
            <li><strong>Child Disability Benefit:</strong> Up to $3,173 annual supplement to CCB</li>
            <li><strong>Working Income Tax Benefit:</strong> Higher disability supplement</li>
            <li><strong>Medical expenses:</strong> Expanded list of claimable items</li>
            <li><strong>Home Buyers' Plan:</strong> Extended repayment period</li>
          </ul>

          <h2>Supplemental Amount for Children</h2>
          <p>Children under 18 at the end of the tax year may qualify for the supplementary amount ($5,500 for 2024).</p>

          <h3>Reduction for Care Expenses</h3>
          <p>The supplement is reduced dollar-for-dollar by:</p>
          <ul>
            <li>Childcare expenses claimed</li>
            <li>Attendant care claimed as medical expense</li>
          </ul>

          <h2>Common Reasons for Denial</h2>
          <ul>
            <li><strong>Incomplete medical section:</strong> Practitioner didn't fully describe limitations</li>
            <li><strong>Wrong practitioner type:</strong> Not authorized for that impairment</li>
            <li><strong>Condition controlled by medication:</strong> Must still be markedly restricted</li>
            <li><strong>Temporary condition:</strong> Must be expected to last 12+ months</li>
          </ul>

          <h2>Appealing a Denial</h2>
          <p>If denied, you can:</p>
          <ol>
            <li><strong>Request clarification:</strong> Ask CRA what information was missing</li>
            <li><strong>Submit additional information:</strong> Provide more medical documentation</li>
            <li><strong>File a Notice of Objection:</strong> Formal appeal within 90 days</li>
            <li><strong>Appeal to Tax Court:</strong> Final recourse if objection denied</li>
          </ol>

          <h2>Maintaining DTC Status</h2>
          <ul>
            <li>Some approvals are indefinite; others have end dates</li>
            <li>CRA may request updated T2201 periodically</li>
            <li>Notify CRA if condition improves significantly</li>
            <li>Check your approval letter for expiry date</li>
          </ul>

          <h2>Tips for Successful Applications</h2>
          <ul>
            <li><strong>Be thorough:</strong> Ensure practitioner describes worst-case scenarios, not best days</li>
            <li><strong>Focus on duration:</strong> Emphasize how long tasks take, not whether you can do them</li>
            <li><strong>Include all impairments:</strong> Cumulative effect may qualify even if single impairment doesn't</li>
            <li><strong>Choose the right practitioner:</strong> Specialist familiar with your condition is ideal</li>
            <li><strong>Don't give up:</strong> Many successful claims were initially denied</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About the DTC?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about disability tax credit eligibility.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> DTC eligibility is complex and case-specific. This guide provides general information. Consult a medical professional and consider disability tax credit specialists for assistance with applications.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
