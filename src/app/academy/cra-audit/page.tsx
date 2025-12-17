import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, AlertTriangle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CRA Audit Guide Canada 2024 | What to Expect & How to Prepare',
  description: 'Complete guide to CRA audits in Canada. Learn what triggers an audit, how to respond to CRA requests, your rights, and how to prepare for a tax review.',
  keywords: 'CRA audit, tax audit Canada, CRA review, respond to CRA request, tax audit triggers Canada',
}

export default function CRAAuditPage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 dark:bg-red-900 p-2.5 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-red-600 dark:text-red-400">Tax Filing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            CRA Audit: What to Expect & How to Respond
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2025</span>
          </div>
        </header>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-red-900 dark:text-red-100 mb-3">Don't Panic</h2>
          <p className="text-red-700 dark:text-red-300 text-sm">
            Most CRA "audits" are simple reviews requesting documentation. With good records and honest returns, the process is usually straightforward. Serious audits are rare for most taxpayers.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Types of CRA Reviews</h2>

          <h3>Processing Review</h3>
          <ul>
            <li>Most common type</li>
            <li>Request for documentation to support claims</li>
            <li>Usually handled by mail</li>
            <li>Examples: Medical receipts, donation receipts</li>
          </ul>

          <h3>Matching Program</h3>
          <ul>
            <li>CRA compares slips from employers/banks to your return</li>
            <li>Automatically flags discrepancies</li>
            <li>May receive adjustment notice</li>
          </ul>

          <h3>Desk Audit</h3>
          <ul>
            <li>More detailed review by CRA officer</li>
            <li>May request extensive documentation</li>
            <li>Done remotely (by mail/phone)</li>
          </ul>

          <h3>Field Audit</h3>
          <ul>
            <li>In-person examination</li>
            <li>Usually for businesses or complex situations</li>
            <li>Auditor may visit home or business</li>
            <li>Most comprehensive review</li>
          </ul>

          <h2>What Triggers an Audit?</h2>

          <h3>Red Flags</h3>
          <ul>
            <li>Large deductions relative to income</li>
            <li>Significant year-over-year changes</li>
            <li>Cash-heavy businesses</li>
            <li>Home office claims</li>
            <li>Rental losses for multiple years</li>
            <li>High charitable donations</li>
            <li>Missing income slips</li>
          </ul>

          <h3>Random Selection</h3>
          <p>Some audits are completely random—not because of anything you did wrong.</p>

          <h3>Tips and Informants</h3>
          <p>CRA investigates tips about unreported income or fraud.</p>

          <h2>When CRA Contacts You</h2>

          <h3>Letter Requests</h3>
          <p>Most common contact. The letter will specify:</p>
          <ul>
            <li>What documentation is needed</li>
            <li>Deadline to respond (usually 30 days)</li>
            <li>Contact information for questions</li>
          </ul>

          <h3>Phone Calls</h3>
          <ul>
            <li>CRA may call for simple clarifications</li>
            <li>Verify it's really CRA (call them back)</li>
            <li>Never give sensitive info unless verified</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Scam Alert:</strong> CRA will never demand immediate payment by gift card, cryptocurrency, or threaten arrest. When in doubt, hang up and call CRA directly at their official number.
            </p>
          </div>

          <h2>How to Respond</h2>

          <h3>Step 1: Read Carefully</h3>
          <ul>
            <li>Understand exactly what's requested</li>
            <li>Note the deadline</li>
            <li>Don't ignore the letter</li>
          </ul>

          <h3>Step 2: Gather Documents</h3>
          <ul>
            <li>Find receipts for claims in question</li>
            <li>Organize by category</li>
            <li>Make copies (keep originals)</li>
          </ul>

          <h3>Step 3: Respond Timely</h3>
          <ul>
            <li>Meet the deadline</li>
            <li>Request extension if needed (before deadline)</li>
            <li>Send only what's requested</li>
          </ul>

          <h3>Step 4: Keep Records</h3>
          <ul>
            <li>Copy everything you send</li>
            <li>Use registered mail or courier</li>
            <li>Note dates and tracking numbers</li>
          </ul>

          <h2>Your Rights During an Audit</h2>

          <h3>Taxpayer Bill of Rights</h3>
          <ul>
            <li>Right to be treated professionally</li>
            <li>Right to privacy and confidentiality</li>
            <li>Right to a formal review and appeal</li>
            <li>Right to pay only required taxes</li>
            <li>Right to have costs considered</li>
          </ul>

          <h3>What You Can Do</h3>
          <ul>
            <li>Ask for clarification</li>
            <li>Request deadline extensions</li>
            <li>Have a representative</li>
            <li>Appeal decisions</li>
          </ul>

          <h2>If You Can't Find Documents</h2>

          <h3>Try to Reconstruct</h3>
          <ul>
            <li>Bank statements showing payments</li>
            <li>Credit card statements</li>
            <li>Request duplicate receipts from vendors</li>
            <li>Affidavits as last resort</li>
          </ul>

          <h3>Be Honest</h3>
          <p>If you don't have proof, explain the situation. CRA may accept partial documentation or reduce (not eliminate) the claim.</p>

          <h2>Possible Outcomes</h2>

          <h3>No Change</h3>
          <p>CRA agrees with your return—case closed.</p>

          <h3>Adjustment</h3>
          <ul>
            <li>CRA changes your return</li>
            <li>May owe additional tax + interest</li>
            <li>Receive Notice of Reassessment</li>
          </ul>

          <h3>Penalties</h3>
          <p>May apply if:</p>
          <ul>
            <li>Gross negligence in claims</li>
            <li>False statements</li>
            <li>Repeated offenses</li>
          </ul>

          <h2>When to Get Help</h2>

          <h3>Consider Professional Help If:</h3>
          <ul>
            <li>Complex business audit</li>
            <li>Large amounts at stake</li>
            <li>You don't understand the request</li>
            <li>Feel overwhelmed by process</li>
            <li>Potential fraud allegations</li>
          </ul>

          <h3>Who Can Help</h3>
          <ul>
            <li>Accountant (CPA)</li>
            <li>Tax lawyer</li>
            <li>Licensed tax preparer</li>
          </ul>

          <h2>Preventing Future Audits</h2>
          <ul>
            <li><strong>Keep excellent records:</strong> 6 years minimum</li>
            <li><strong>Report all income:</strong> CRA sees your slips</li>
            <li><strong>Claim only legitimate expenses:</strong> With proof</li>
            <li><strong>Be consistent:</strong> Sudden changes raise flags</li>
            <li><strong>File on time:</strong> Late filers get more scrutiny</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About CRA Reviews?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer questions about responding to CRA requests.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> This is general guidance. Complex audit situations may require professional assistance.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
