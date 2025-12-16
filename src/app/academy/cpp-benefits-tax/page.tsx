import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Wallet, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CPP Benefits & Tax Canada 2024 | Canada Pension Plan Guide',
  description: 'Complete guide to CPP taxation in Canada. Learn about CPP retirement, disability, and survivor benefits, how they\'re taxed, and strategies for claiming.',
  keywords: 'CPP tax Canada, Canada Pension Plan benefits, CPP retirement pension, CPP disability benefits, T4A(P) slip',
}

export default function CPPBenefitsTaxPage() {
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
              <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Employment & Benefits</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            CPP Benefits & Tax Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-purple-900 dark:text-purple-100 mb-3">CPP Is Taxable Income</h2>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            All CPP benefits—retirement, disability, and survivor—are taxable income. Understanding the tax implications helps you plan when to start your pension for maximum benefit.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of CPP Benefits</h2>

          <h3>Retirement Pension</h3>
          <ul>
            <li>Earliest: Age 60 (reduced)</li>
            <li>Standard: Age 65</li>
            <li>Maximum: Age 70 (increased)</li>
            <li>2024 max at 65: ~$1,364/month</li>
            <li>Average payment: ~$760/month</li>
          </ul>

          <h3>Disability Benefits</h3>
          <ul>
            <li>For contributors unable to work</li>
            <li>2024 max: ~$1,606/month</li>
            <li>Includes flat-rate + earnings-related portion</li>
            <li>Converts to retirement at 65</li>
          </ul>

          <h3>Survivor Benefits</h3>
          <ul>
            <li>For spouse/partner of deceased contributor</li>
            <li>Amount depends on age and circumstances</li>
            <li>Children's benefit also available</li>
          </ul>

          <h3>Post-Retirement Benefit</h3>
          <ul>
            <li>If you work while receiving CPP</li>
            <li>Mandatory contributions until 65</li>
            <li>Optional 65-70</li>
            <li>Adds to pension amount</li>
          </ul>

          <h2>How CPP Is Taxed</h2>

          <h3>Tax Treatment</h3>
          <ul>
            <li>100% of CPP benefits are taxable</li>
            <li>Added to your other income</li>
            <li>Taxed at your marginal rate</li>
            <li>No special tax credits</li>
          </ul>

          <h3>The T4A(P) Slip</h3>
          <p>You'll receive T4A(P) showing:</p>
          <ul>
            <li><strong>Box 20:</strong> CPP benefits paid</li>
            <li><strong>Box 22:</strong> Income tax deducted</li>
            <li><strong>Box 14:</strong> Disability benefit</li>
            <li><strong>Box 15:</strong> Survivor benefit</li>
          </ul>

          <h3>Tax Withholding</h3>
          <ul>
            <li>Tax withheld at source if requested</li>
            <li>Request through Service Canada</li>
            <li>Set specific amount or percentage</li>
            <li>Otherwise, may owe at tax time</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Tip:</strong> If you have other income sources, request tax withholding from your CPP to avoid a large tax bill when you file.
            </p>
          </div>

          <h2>When to Start CPP</h2>

          <h3>Starting Early (Age 60)</h3>
          <ul>
            <li>Reduced by 0.6% per month before 65</li>
            <li>Maximum reduction: 36% at age 60</li>
            <li>More years of payments</li>
            <li>Lower tax if other income is low</li>
          </ul>

          <h3>Starting at 65</h3>
          <ul>
            <li>Standard benefit amount</li>
            <li>Based on your contributions</li>
            <li>No reduction or increase</li>
          </ul>

          <h3>Delaying to 70</h3>
          <ul>
            <li>Increased by 0.7% per month after 65</li>
            <li>Maximum increase: 42% at age 70</li>
            <li>Fewer years of payments</li>
            <li>Higher annual amounts</li>
          </ul>

          <h3>Break-Even Analysis</h3>
          <p>Comparing start at 60 vs 65:</p>
          <ul>
            <li>Break-even around age 74</li>
            <li>After 74, starting at 65 is better</li>
            <li>Consider health, other income, tax rates</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Tax Consideration:</strong> If you'll have high income at 65 (RRIF minimums, work income), starting CPP at 60 might result in lower lifetime taxes even with reduced benefits.
            </p>
          </div>

          <h2>CPP and OAS Interaction</h2>

          <h3>OAS Clawback</h3>
          <ul>
            <li>CPP counts toward OAS clawback threshold</li>
            <li>2024 threshold: $90,997</li>
            <li>CPP + RRIF + work income adds up</li>
            <li>May push you over clawback limit</li>
          </ul>

          <h3>GIS Impact</h3>
          <ul>
            <li>CPP reduces GIS entitlement</li>
            <li>Dollar-for-dollar reduction (mostly)</li>
            <li>If eligible for GIS, consider timing</li>
          </ul>

          <h2>CPP Pension Sharing</h2>

          <h3>How Sharing Works</h3>
          <ul>
            <li>Married/common-law couples</li>
            <li>Both must be 60+</li>
            <li>Split benefits earned during relationship</li>
            <li>Can reduce family tax</li>
          </ul>

          <h3>Tax Benefits</h3>
          <ul>
            <li>Shifts income to lower-income spouse</li>
            <li>May reduce overall family tax</li>
            <li>Different from pension income splitting</li>
            <li>Apply through Service Canada</li>
          </ul>

          <h2>CPP Contributions</h2>

          <h3>Employee Contributions</h3>
          <ul>
            <li>2024 rate: 5.95% on earnings</li>
            <li>Maximum pensionable earnings: $68,500</li>
            <li>Basic exemption: $3,500</li>
            <li>Max contribution: ~$3,867</li>
          </ul>

          <h3>CPP2 (Enhanced)</h3>
          <ul>
            <li>Started 2024</li>
            <li>Additional 4% on earnings $68,500-$73,200</li>
            <li>Increases future benefits</li>
          </ul>

          <h3>Tax Treatment of Contributions</h3>
          <ul>
            <li>Employee portion: Tax credit (Line 30800)</li>
            <li>Self-employed: Half is deduction, half is credit</li>
            <li>Reduces tax owed</li>
          </ul>

          <h2>Working While Receiving CPP</h2>

          <h3>Ages 60-65</h3>
          <ul>
            <li>Must continue contributing to CPP</li>
            <li>Contributions earn Post-Retirement Benefit</li>
            <li>PRB added annually to pension</li>
          </ul>

          <h3>Ages 65-70</h3>
          <ul>
            <li>Contributions are optional</li>
            <li>Can elect to stop</li>
            <li>If contributing, earn PRB</li>
          </ul>

          <h3>After Age 70</h3>
          <ul>
            <li>No more CPP contributions</li>
            <li>No more PRB earning</li>
          </ul>

          <h2>Reporting CPP on Your Return</h2>

          <h3>Where to Report</h3>
          <ul>
            <li><strong>Line 11400:</strong> CPP retirement pension</li>
            <li><strong>Line 11400:</strong> CPP disability (with code)</li>
            <li><strong>Line 43700:</strong> Tax withheld</li>
          </ul>

          <h3>Pension Income Amount</h3>
          <ul>
            <li>CPP does NOT qualify for pension income amount</li>
            <li>Must be private pension, RRIF, or annuity</li>
            <li>Age 65+ for pension income splitting</li>
          </ul>

          <h2>Tax Planning Strategies</h2>

          <h3>Coordinate with RRSP/RRIF</h3>
          <ul>
            <li>RRSP meltdown strategy</li>
            <li>Withdraw RRSP before CPP starts</li>
            <li>Reduce taxable income in CPP years</li>
          </ul>

          <h3>Income Splitting</h3>
          <ul>
            <li>CPP sharing (both 60+)</li>
            <li>Pension splitting (age 65+) for other pensions</li>
            <li>TFSA for tax-free income</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CPP Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about CPP benefit taxation.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CPP planning involves many factors. Consider consulting a financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
