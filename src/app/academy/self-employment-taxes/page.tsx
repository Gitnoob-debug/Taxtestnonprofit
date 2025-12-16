import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, Briefcase, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Self-Employment Taxes in Canada 2024 | Freelancer Tax Guide',
  description: 'Complete guide to self-employment taxes in Canada. Business deductions, HST/GST registration, quarterly instalments, CPP contributions, and how to file as a sole proprietor.',
  keywords: 'self employment tax Canada, freelancer taxes, business deductions Canada, GST HST registration, tax instalments Canada, sole proprietor tax',
}

export default function SelfEmploymentTaxesPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 dark:bg-orange-900 p-2.5 rounded-xl">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Self-Employed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Self-Employment Taxes in Canada: Complete Guide (2024)
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />14 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">
          <h2>How Self-Employment Income is Taxed</h2>
          <p>Self-employment income is taxed the same as employment income—using Canada's progressive tax brackets. However, as a self-employed individual, you're responsible for:</p>
          <ul>
            <li><strong>Both portions of CPP:</strong> Employee AND employer portions (11.9% total in 2024)</li>
            <li><strong>Collecting and remitting GST/HST:</strong> If revenue exceeds $30,000</li>
            <li><strong>Paying tax instalments:</strong> Quarterly prepayments to CRA</li>
            <li><strong>Tracking all expenses:</strong> For deductions</li>
          </ul>

          <h2>CPP Contributions for Self-Employed</h2>
          <p>Employees split CPP contributions with their employer (5.95% each). Self-employed individuals pay both portions:</p>
          <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4 my-4 not-prose">
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">11.9%</p>
            <p className="text-orange-700 dark:text-orange-300 text-sm">CPP rate for self-employed (2024)</p>
            <p className="text-orange-600 dark:text-orange-400 text-xs mt-1">Maximum contribution: $7,735 on earnings up to $68,500</p>
          </div>
          <p>The good news: Half of your CPP contribution (the "employer" portion) is tax-deductible.</p>

          <h2>GST/HST Registration</h2>
          <h3>When Must You Register?</h3>
          <p>You must register for GST/HST if your worldwide taxable revenue exceeds <strong>$30,000</strong> in any single calendar quarter or over 4 consecutive quarters.</p>

          <h3>Should You Register Voluntarily?</h3>
          <p>Even if below $30,000, registering may benefit you if:</p>
          <ul>
            <li>You have significant business expenses (claim Input Tax Credits)</li>
            <li>Your clients are businesses (they can claim back the GST/HST)</li>
            <li>You want to appear more professional/established</li>
          </ul>

          <h3>Quick Method of Accounting</h3>
          <p>If eligible, the Quick Method simplifies GST/HST remittance. Instead of tracking all GST/HST paid and collected, you remit a fixed percentage of revenue (varies by province and business type). Often results in keeping some GST/HST as profit.</p>

          <h2>Common Business Deductions</h2>
          <p>Self-employed individuals can deduct reasonable business expenses:</p>

          <h3>Home Office (Use of Home)</h3>
          <ul>
            <li>Portion of rent/mortgage interest, utilities, insurance, property tax</li>
            <li>Based on square footage of office vs. total home</li>
            <li>Must be your principal place of business OR used regularly for meeting clients</li>
            <li>Cannot create or increase a business loss</li>
          </ul>

          <h3>Vehicle Expenses</h3>
          <ul>
            <li>Gas, insurance, maintenance, lease payments or depreciation</li>
            <li>Must keep a mileage log documenting business vs. personal use</li>
            <li>Claim only the business-use percentage</li>
          </ul>

          <h3>Other Common Deductions</h3>
          <ul>
            <li><strong>Professional fees:</strong> Accountant, lawyer, consultants</li>
            <li><strong>Office supplies:</strong> Computer, software, phone, internet</li>
            <li><strong>Advertising:</strong> Website, business cards, ads</li>
            <li><strong>Travel:</strong> Business trips, conferences</li>
            <li><strong>Meals & entertainment:</strong> 50% deductible when business-related</li>
            <li><strong>Professional development:</strong> Courses, books, subscriptions</li>
            <li><strong>Insurance:</strong> Business liability, E&O insurance</li>
            <li><strong>Bank fees:</strong> Business account fees, credit card processing</li>
          </ul>

          <h2>Tax Instalments</h2>
          <p>If you owe more than $3,000 in federal tax (or $1,800 in Quebec), CRA requires quarterly instalment payments:</p>
          <ul>
            <li><strong>Due dates:</strong> March 15, June 15, September 15, December 15</li>
            <li><strong>Amount:</strong> CRA sends instalment reminders, or calculate yourself</li>
            <li><strong>Interest:</strong> Charged on late or insufficient instalments</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-4 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Pro tip:</strong> Set aside 25-30% of each payment received for taxes. Open a separate savings account and transfer immediately when paid.
            </p>
          </div>

          <h2>Filing Your Return</h2>
          <p>Self-employed individuals report business income on form <strong>T2125</strong> (Statement of Business Activities), filed with your T1 personal tax return.</p>

          <h3>Key Deadlines</h3>
          <ul>
            <li><strong>Filing deadline:</strong> June 15 (but any tax owing is still due April 30!)</li>
            <li><strong>GST/HST annual return:</strong> 3 months after fiscal year-end</li>
          </ul>

          <h3>Records to Keep</h3>
          <p>Keep all business records for <strong>6 years</strong>:</p>
          <ul>
            <li>All invoices issued and received</li>
            <li>Bank and credit card statements</li>
            <li>Receipts for all expenses</li>
            <li>Vehicle mileage log</li>
            <li>Home office calculation</li>
          </ul>

          <h2>RRSP Considerations</h2>
          <p>Your RRSP contribution room is based on <strong>earned income</strong>, which includes self-employment income (net of expenses). Contributing to an RRSP:</p>
          <ul>
            <li>Reduces your taxable income</li>
            <li>Provides retirement savings</li>
            <li>Is often the best way for self-employed to reduce taxes</li>
          </ul>

          <h2>Incorporation: Should You?</h2>
          <p>Operating as a corporation involves more complexity and cost, but may benefit you if:</p>
          <ul>
            <li>Net income exceeds ~$80,000-100,000/year</li>
            <li>You don't need all your income personally</li>
            <li>You want liability protection</li>
            <li>You want to income split with family members</li>
          </ul>
          <p>Consult an accountant before incorporating—it's not always beneficial.</p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Self-employed pay both portions of CPP (11.9%)</li>
            <li>Register for GST/HST once revenue exceeds $30,000</li>
            <li>Track all expenses meticulously for deductions</li>
            <li>Pay quarterly instalments to avoid interest charges</li>
            <li>Set aside 25-30% of income for taxes</li>
            <li>Filing deadline is June 15, but payment is due April 30</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Have Questions About Your Self-Employment Taxes?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions using official CRA sources.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This guide is for educational purposes. Self-employment tax situations can be complex. Consult a qualified accountant for advice specific to your business.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
