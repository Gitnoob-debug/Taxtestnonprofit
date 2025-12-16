import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, User, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CRA My Account Guide 2024 | How to Register & Use',
  description: 'Complete guide to CRA My Account. Learn how to register, access tax slips, check refund status, update information, and use all features of your CRA online account.',
  keywords: 'CRA My Account, CRA login, CRA online account, check refund status CRA, CRA registration',
}

export default function CRAMyAccountPage() {
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
              <User className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            CRA My Account: Complete Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />9 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3">Your CRA Portal</h2>
          <p className="text-indigo-700 dark:text-indigo-300 text-sm">
            CRA My Account is your secure online portal to access tax information, view slips, check refund status, update your information, and manage your tax affairs 24/7.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>How to Register for CRA My Account</h2>

          <h3>Option 1: Sign-In Partner (Fastest)</h3>
          <p>Use your online banking credentials:</p>
          <ul>
            <li>Select your bank from the list of partners</li>
            <li>Log in with your banking credentials</li>
            <li>Bank verifies your identity</li>
            <li>Immediate access (most cases)</li>
          </ul>

          <h3>Option 2: CRA User ID and Password</h3>
          <ul>
            <li>Create a CRA-specific login</li>
            <li>Need SIN, date of birth, postal code</li>
            <li>Enter amount from previous tax return</li>
            <li>Create username and password</li>
          </ul>

          <h3>Option 3: Provincial Partner</h3>
          <ul>
            <li>BC Services Card</li>
            <li>Alberta Digital ID</li>
            <li>Other provincial credentials where available</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>First-time tip:</strong> Register BEFORE tax season. During peak times, registration can take longer or have access delays.
            </p>
          </div>

          <h2>What You Can Do in My Account</h2>

          <h3>View Tax Information</h3>
          <ul>
            <li>Tax slips (T4, T5, T3, etc.)</li>
            <li>Notice of Assessment</li>
            <li>Proof of income (for loans)</li>
            <li>Tax return status</li>
            <li>Carryforward amounts</li>
          </ul>

          <h3>Check Refund Status</h3>
          <ul>
            <li>Processing status of your return</li>
            <li>Expected refund date</li>
            <li>Refund amount confirmed</li>
            <li>Any adjustments made</li>
          </ul>

          <h3>View Contribution Limits</h3>
          <ul>
            <li>RRSP deduction limit</li>
            <li>RRSP contribution room</li>
            <li>TFSA contribution room</li>
            <li>Home Buyers' Plan balance</li>
            <li>Lifelong Learning Plan balance</li>
          </ul>

          <h3>Update Personal Information</h3>
          <ul>
            <li>Address change</li>
            <li>Direct deposit banking</li>
            <li>Marital status</li>
            <li>Phone number</li>
            <li>Authorized representative</li>
          </ul>

          <h3>Manage Benefits</h3>
          <ul>
            <li>GST/HST credit status</li>
            <li>Canada Child Benefit</li>
            <li>Climate Action Incentive</li>
            <li>Provincial benefits</li>
          </ul>

          <h2>Auto-Fill My Return</h2>
          <p>One of the most valuable features:</p>
          <ul>
            <li>Imports tax slips directly to certified software</li>
            <li>Reduces data entry errors</li>
            <li>Ensures you don't miss income slips</li>
            <li>Shows all available tax information</li>
          </ul>

          <h3>How to Use Auto-Fill</h3>
          <ol>
            <li>Open your tax software</li>
            <li>Look for "Auto-fill" or "Import CRA data"</li>
            <li>Authorize connection to CRA</li>
            <li>Data imports automatically</li>
            <li>Review imported information</li>
          </ol>

          <h2>Common Tasks Step-by-Step</h2>

          <h3>Change Your Address</h3>
          <ol>
            <li>Log in to My Account</li>
            <li>Go to "Personal info"</li>
            <li>Select "Manage address"</li>
            <li>Enter new address</li>
            <li>Submit change</li>
          </ol>

          <h3>Set Up Direct Deposit</h3>
          <ol>
            <li>Go to "Personal info"</li>
            <li>Select "Manage direct deposit"</li>
            <li>Enter banking details</li>
            <li>Institution, transit, account number</li>
            <li>Save changes</li>
          </ol>

          <h3>Authorize a Representative</h3>
          <ol>
            <li>Go to "Authorized representatives"</li>
            <li>Add representative's information</li>
            <li>Specify access level</li>
            <li>They can then access your account</li>
          </ol>

          <h2>Security Features</h2>
          <ul>
            <li><strong>Multi-factor authentication:</strong> Extra verification layer</li>
            <li><strong>Security questions:</strong> Backup verification</li>
            <li><strong>Email notifications:</strong> Alert when changes made</li>
            <li><strong>Session timeout:</strong> Auto-logout for protection</li>
          </ul>

          <h2>Mobile App</h2>
          <p>MyCRA app features:</p>
          <ul>
            <li>View tax information on mobile</li>
            <li>Check refund status</li>
            <li>View benefit payments</li>
            <li>Update address</li>
            <li>Manage direct deposit</li>
          </ul>

          <h2>Troubleshooting</h2>

          <h3>Can't Register?</h3>
          <ul>
            <li>Verify SIN is correct</li>
            <li>Check tax return amount matches exactly</li>
            <li>Try a different sign-in method</li>
            <li>Call CRA: 1-800-959-8281</li>
          </ul>

          <h3>Account Locked?</h3>
          <ul>
            <li>Wait 24 hours for auto-unlock</li>
            <li>Or call CRA to reset</li>
            <li>Verify security questions</li>
          </ul>

          <h3>Missing Tax Slips?</h3>
          <ul>
            <li>Slips appear mid-February to March</li>
            <li>Employers have until end of February</li>
            <li>Wait until March before reporting missing</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CRA My Account?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about using your CRA account.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> CRA services may change. Visit canada.ca for the most current information.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
