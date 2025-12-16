import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Lock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LIRA & LIF Guide Canada 2024 | Locked-In Retirement Accounts',
  description: 'Complete guide to LIRAs and LIFs in Canada. Learn about locked-in account rules, withdrawal restrictions, unlocking options, and tax implications.',
  keywords: 'LIRA Canada, LIF withdrawal rules, locked-in retirement account, LIRA to LIF, unlock LIRA, LIF minimum maximum',
}

export default function LIFLIRAGuidePage() {
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
              <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-sm font-medium text-violet-600 dark:text-violet-400">Retirement Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            LIRA & LIF Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Locked-In = Restricted</h2>
          <p className="text-violet-700 dark:text-violet-300 text-sm">
            LIRAs and LIFs hold pension money that's "locked in" to provide retirement income. They have strict rules about withdrawals, but some unlocking options exist in certain circumstances.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>What Is a LIRA?</h2>

          <h3>Locked-In Retirement Account</h3>
          <ul>
            <li>Holds money from employer pension plan</li>
            <li>Transferred when leaving job</li>
            <li>Cannot withdraw until retirement</li>
            <li>Similar to RRSP but locked in</li>
          </ul>

          <h3>How Money Gets Into LIRA</h3>
          <ul>
            <li>Transfer from defined benefit pension</li>
            <li>Transfer from defined contribution pension</li>
            <li>Commuted value from DB plan</li>
            <li>Can't contribute new money</li>
          </ul>

          <h2>What Is a LIF?</h2>

          <h3>Life Income Fund</h3>
          <ul>
            <li>Income phase of LIRA</li>
            <li>Similar to RRIF</li>
            <li>Must withdraw minimum each year</li>
            <li>Has maximum withdrawal limit too</li>
          </ul>

          <h3>LIRA to LIF Conversion</h3>
          <ul>
            <li>Must convert by Dec 31 of year turn 71</li>
            <li>Can convert earlier</li>
            <li>No age requirement to convert</li>
            <li>Some provinces allow at 55+</li>
          </ul>

          <h2>Provincial Variations</h2>

          <h3>Jurisdiction Matters</h3>
          <ul>
            <li>LIRA/LIF rules based on original pension jurisdiction</li>
            <li>Federal (PBSA) vs provincial rules</li>
            <li>Where you live now doesn't change it</li>
            <li>Check original pension documents</li>
          </ul>

          <h3>Common Jurisdictions</h3>
          <ul>
            <li><strong>Federal:</strong> Banks, telecoms, transport</li>
            <li><strong>Ontario:</strong> Most Ontario employers</li>
            <li><strong>Quebec:</strong> Quebec employers</li>
            <li><strong>Alberta, BC, etc.:</strong> Employers in each province</li>
          </ul>

          <h2>LIF Withdrawal Limits</h2>

          <h3>Minimum Withdrawal</h3>
          <ul>
            <li>Same formula as RRIF</li>
            <li>Based on age and account value</li>
            <li>Must withdraw minimum each year</li>
          </ul>

          <h3>Maximum Withdrawal</h3>
          <p>Unlike RRIF, LIF has a cap:</p>
          <ul>
            <li>Varies by jurisdiction</li>
            <li>Often based on CANSIM rate or formula</li>
            <li>Designed to ensure funds last</li>
            <li>Typically 6-8% of value in early 70s</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Key Difference:</strong> RRIF has no maximum—you can withdraw it all. LIF has maximums to preserve retirement income. This limits flexibility.
            </p>
          </div>

          <h2>Unlocking Options</h2>

          <h3>Age-Based Unlocking</h3>
          <p>Some jurisdictions allow unlocking at certain ages:</p>
          <ul>
            <li><strong>Federal:</strong> 50% unlock at age 55+</li>
            <li><strong>Alberta:</strong> 50% one-time unlock</li>
            <li><strong>Ontario:</strong> Small balance unlocking, 25% one-time</li>
            <li><strong>Quebec:</strong> Limited unlocking options</li>
          </ul>

          <h3>Small Balance Unlocking</h3>
          <ul>
            <li>If LIRA under certain threshold</li>
            <li>Can unlock entirely</li>
            <li>Varies by province ($22,000-$50,000+)</li>
            <li>Tax applies on withdrawal</li>
          </ul>

          <h3>Financial Hardship Unlocking</h3>
          <ul>
            <li>Low income situations</li>
            <li>Medical expenses</li>
            <li>Rent/mortgage arrears</li>
            <li>Strict criteria apply</li>
          </ul>

          <h3>Shortened Life Expectancy</h3>
          <ul>
            <li>Doctor certification required</li>
            <li>May unlock partially or fully</li>
            <li>Varies by jurisdiction</li>
          </ul>

          <h3>Non-Residency</h3>
          <ul>
            <li>Some jurisdictions allow unlock if leaving Canada</li>
            <li>Often requires 2+ years non-residency</li>
            <li>Federal PBSA allows after 2 years</li>
          </ul>

          <h2>Tax Treatment</h2>

          <h3>While Growing</h3>
          <ul>
            <li>Tax-deferred growth (like RRSP)</li>
            <li>No tax until withdrawal</li>
            <li>Same investment options as RRSP</li>
          </ul>

          <h3>Withdrawals</h3>
          <ul>
            <li>100% taxable as income</li>
            <li>Withholding tax on amounts over minimum</li>
            <li>Same rates as RRIF</li>
            <li>Added to other income</li>
          </ul>

          <h3>Pension Credits</h3>
          <ul>
            <li>LIF income qualifies for pension income amount (65+)</li>
            <li>Qualifies for pension income splitting (65+)</li>
            <li>Same as RRIF treatment</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Unlocking Strategy:</strong> If your jurisdiction allows 50% unlocking, transfer that 50% to RRSP or RRIF for full flexibility. Keep 50% in LIF.
            </p>
          </div>

          <h2>Other Locked-In Vehicles</h2>

          <h3>LRIF (Locked-In Retirement Income Fund)</h3>
          <ul>
            <li>Similar to LIF</li>
            <li>Used in some jurisdictions</li>
            <li>May have different max rules</li>
          </ul>

          <h3>PRIF (Prescribed Retirement Income Fund)</h3>
          <ul>
            <li>Manitoba and Saskatchewan option</li>
            <li>No maximum withdrawal</li>
            <li>More flexibility than LIF</li>
          </ul>

          <h3>LIF to Life Annuity</h3>
          <ul>
            <li>Can use LIF to buy annuity</li>
            <li>Guaranteed income for life</li>
            <li>No more maximums</li>
          </ul>

          <h2>Planning Strategies</h2>

          <h3>Maximize Unlocking</h3>
          <ul>
            <li>Check your jurisdiction's rules</li>
            <li>Apply for any available unlocking</li>
            <li>Transfer unlocked funds to RRSP/RRIF</li>
            <li>Gain flexibility for retirement</li>
          </ul>

          <h3>Spouse's Age</h3>
          <ul>
            <li>Like RRIF, can use spouse's age</li>
            <li>Affects minimum (and sometimes maximum)</li>
            <li>Lower minimums if spouse younger</li>
          </ul>

          <h3>LIF + RRIF Together</h3>
          <ul>
            <li>Withdraw from RRIF beyond needs</li>
            <li>LIF provides base income</li>
            <li>RRIF provides flexibility</li>
          </ul>

          <h2>Common Questions</h2>

          <h3>Can I transfer LIRA to RRSP?</h3>
          <p>Generally no, except through unlocking provisions. The money is locked in.</p>

          <h3>What happens at death?</h3>
          <ul>
            <li>To spouse: Transfers to their LIRA/LIF or RRSP</li>
            <li>To others: Paid out, taxed on final return</li>
            <li>Can name beneficiary directly</li>
          </ul>

          <h3>Can I have multiple LIRAs?</h3>
          <p>Yes. May have different jurisdiction rules for each if from different employers.</p>

          <h2>Record Keeping</h2>
          <ul>
            <li>Original pension documentation</li>
            <li>Transfer paperwork showing jurisdiction</li>
            <li>Annual statements</li>
            <li>Unlocking applications if made</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About LIRAs or LIFs?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about locked-in retirement accounts.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Locked-in account rules vary by jurisdiction. Check with your financial institution or pension regulator for specific rules.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
