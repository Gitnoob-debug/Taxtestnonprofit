import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock, UserCog, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contractor vs Employee Canada 2024 | CRA Classification Guide',
  description: 'Complete guide to contractor vs employee classification in Canada. Learn how CRA determines status, tax implications, and risks of misclassification.',
  keywords: 'contractor vs employee Canada, independent contractor CRA, employee misclassification, self-employed vs employee, worker classification Canada',
}

export default function ContractorVsEmployeePage() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Link href="/academy" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Academy
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 dark:bg-rose-900 p-2.5 rounded-xl">
              <UserCog className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">Employment</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Contractor vs Employee Guide
          </h1>
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />10 min read</span>
            <span>Updated December 2024</span>
          </div>
        </header>

        <div className="bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 rounded-2xl p-6 sm:p-8 mb-10">
          <h2 className="font-bold text-rose-900 dark:text-rose-100 mb-3">Classification Matters</h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            The distinction between contractor and employee determines tax obligations, benefits entitlement, and legal protections. CRA can reclassify relationships—with expensive consequences for businesses.
          </p>
        </div>

        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-li:text-base prose-li:sm:text-lg">

          <h2>Why Classification Matters</h2>

          <h3>Tax Implications</h3>
          <table className="text-sm">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Employee</th>
                <th>Contractor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CPP</td>
                <td>Split with employer</td>
                <td>Pay both portions</td>
              </tr>
              <tr>
                <td>EI</td>
                <td>Split with employer</td>
                <td>Not required (usually)</td>
              </tr>
              <tr>
                <td>Tax withholding</td>
                <td>Employer withholds</td>
                <td>Self-remit</td>
              </tr>
              <tr>
                <td>Deductions</td>
                <td>Limited</td>
                <td>Business expenses</td>
              </tr>
              <tr>
                <td>GST/HST</td>
                <td>No</td>
                <td>Yes (over $30K)</td>
              </tr>
            </tbody>
          </table>

          <h3>Beyond Taxes</h3>
          <ul>
            <li>Employment standards protection</li>
            <li>Vacation pay, overtime</li>
            <li>Termination notice/severance</li>
            <li>Benefits eligibility</li>
            <li>Workers' compensation</li>
          </ul>

          <h2>CRA Classification Tests</h2>

          <h3>1. Control</h3>
          <p>Who controls how, when, where work is done?</p>
          <ul>
            <li><strong>Employee:</strong> Employer directs methods, hours, location</li>
            <li><strong>Contractor:</strong> Worker controls how to complete work</li>
          </ul>

          <h3>2. Ownership of Tools</h3>
          <ul>
            <li><strong>Employee:</strong> Employer provides tools, equipment</li>
            <li><strong>Contractor:</strong> Worker provides own tools</li>
          </ul>

          <h3>3. Chance of Profit/Risk of Loss</h3>
          <ul>
            <li><strong>Employee:</strong> Paid regardless of business outcome</li>
            <li><strong>Contractor:</strong> Can profit or lose based on efficiency</li>
          </ul>

          <h3>4. Integration</h3>
          <ul>
            <li><strong>Employee:</strong> Integral part of organization</li>
            <li><strong>Contractor:</strong> Provides specific services as outsider</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-teal-800 dark:text-teal-200 text-sm">
              <strong>Key Point:</strong> No single factor is determinative. CRA looks at the whole relationship. The contract label doesn't matter—reality does.
            </p>
          </div>

          <h2>Employee Indicators</h2>

          <h3>You're Likely an Employee If</h3>
          <ul>
            <li>Work set hours determined by employer</li>
            <li>Work at employer's location</li>
            <li>Use employer's equipment</li>
            <li>Cannot subcontract the work</li>
            <li>Paid regular salary/hourly</li>
            <li>Receive benefits, vacation</li>
            <li>Cannot work for competitors</li>
            <li>Training provided by employer</li>
            <li>Only one "client" (the employer)</li>
          </ul>

          <h2>Contractor Indicators</h2>

          <h3>You're Likely a Contractor If</h3>
          <ul>
            <li>Control how work is done</li>
            <li>Set own hours</li>
            <li>Work from own location</li>
            <li>Provide own tools/equipment</li>
            <li>Can hire helpers/subcontract</li>
            <li>Have multiple clients</li>
            <li>Invoice for work</li>
            <li>Carry own insurance</li>
            <li>Bear financial risk</li>
            <li>Have registered business</li>
          </ul>

          <h2>Common Misclassification Scenarios</h2>

          <h3>IT Contractors</h3>
          <ul>
            <li>Long-term on-site work</li>
            <li>Single client relationship</li>
            <li>Company laptop provided</li>
            <li>Set hours and meetings</li>
            <li>High risk of reclassification</li>
          </ul>

          <h3>Gig Workers</h3>
          <ul>
            <li>Uber, DoorDash, etc.</li>
            <li>Generally treated as contractors</li>
            <li>Control over when to work</li>
            <li>Own vehicle/equipment</li>
            <li>Multiple platforms possible</li>
          </ul>

          <h3>Trucking/Transportation</h3>
          <ul>
            <li>Owner-operators often contractors</li>
            <li>But single-client arrangements risky</li>
            <li>Control and integration key factors</li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 my-6 not-prose">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Warning:</strong> A written contract stating "contractor" doesn't protect against reclassification. CRA and courts look at the actual working relationship.
            </p>
          </div>

          <h2>Consequences of Misclassification</h2>

          <h3>For Businesses</h3>
          <ul>
            <li>Back CPP/EI (both portions) + interest</li>
            <li>Penalties for non-compliance</li>
            <li>Unpaid vacation, overtime claims</li>
            <li>Wrongful dismissal liability</li>
            <li>Can be years of reassessment</li>
          </ul>

          <h3>For Workers</h3>
          <ul>
            <li>May get CPP/EI credits retroactively</li>
            <li>Lose business expense deductions</li>
            <li>May owe personal taxes (if underpaid)</li>
            <li>Gain employment protections</li>
          </ul>

          <h3>Cost Example</h3>
          <p>Worker paid $80,000/year misclassified for 3 years:</p>
          <ul>
            <li>CPP owing: ~$4,200/year × 3 = $12,600</li>
            <li>EI owing: ~$1,400/year × 3 = $4,200</li>
            <li>Interest and penalties: $3,000+</li>
            <li>Total risk: $20,000+</li>
          </ul>

          <h2>Obtaining a Ruling</h2>

          <h3>CPT1 Ruling</h3>
          <ul>
            <li>Request CRA rule on status</li>
            <li>Either party can request</li>
            <li>CRA examines relationship</li>
            <li>Binding determination</li>
          </ul>

          <h3>When to Request</h3>
          <ul>
            <li>Uncertainty about classification</li>
            <li>Starting new arrangement</li>
            <li>After CRA inquiry</li>
            <li>Dispute between parties</li>
          </ul>

          <h2>Tax Treatment Comparison</h2>

          <h3>Employee Income</h3>
          <ul>
            <li>Reported on T4</li>
            <li>Tax withheld at source</li>
            <li>Limited deductions (T777)</li>
            <li>Need T2200 for home office</li>
            <li>CPP/EI split with employer</li>
          </ul>

          <h3>Contractor Income</h3>
          <ul>
            <li>Report on T2125</li>
            <li>No withholding—pay installments</li>
            <li>Full business expense deductions</li>
            <li>Home office without T2200</li>
            <li>Both CPP portions</li>
            <li>GST/HST if over $30K</li>
          </ul>

          <h2>Benefits of Each Status</h2>

          <h3>Employee Benefits</h3>
          <ul>
            <li>Steady income certainty</li>
            <li>Employer pays half CPP/EI</li>
            <li>Employment insurance eligibility</li>
            <li>Employment standards protection</li>
            <li>Less administrative burden</li>
            <li>Often receive benefits</li>
          </ul>

          <h3>Contractor Benefits</h3>
          <ul>
            <li>Business expense deductions</li>
            <li>Flexibility in work</li>
            <li>Multiple clients possible</li>
            <li>Can incorporate later</li>
            <li>Higher gross pay often</li>
            <li>Build business equity</li>
          </ul>

          <h2>Best Practices for Contractors</h2>

          <h3>Strengthen Contractor Status</h3>
          <ul>
            <li>Have multiple clients</li>
            <li>Provide own equipment</li>
            <li>Set own hours when possible</li>
            <li>Work from own location</li>
            <li>Use written contracts</li>
            <li>Invoice for work</li>
            <li>Carry business insurance</li>
            <li>Register business name/HST</li>
          </ul>

          <h3>Documentation</h3>
          <ul>
            <li>Written contractor agreement</li>
            <li>Invoices (not payroll)</li>
            <li>Multiple client records</li>
            <li>Business expense receipts</li>
            <li>Marketing materials</li>
          </ul>

          <h2>Best Practices for Businesses</h2>

          <h3>Reduce Misclassification Risk</h3>
          <ul>
            <li>Don't treat contractors like employees</li>
            <li>No set hours/location unless necessary</li>
            <li>Don't provide tools/equipment</li>
            <li>Allow them to work for others</li>
            <li>Pay by project/invoice, not salary</li>
            <li>No employee benefits</li>
            <li>Written contract specifying independence</li>
          </ul>

          <h3>When In Doubt</h3>
          <ul>
            <li>Get CPT1 ruling</li>
            <li>Consult employment lawyer</li>
            <li>Consider employee status safer</li>
            <li>Review relationships periodically</li>
          </ul>

          <div className="bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-xl p-6 my-8 not-prose">
            <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">Questions About Worker Classification?</h3>
            <p className="text-teal-700 dark:text-teal-300 text-sm mb-4">Our AI tax assistant can help answer specific questions about contractor vs employee status.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Ask the Tax Assistant <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mt-8 not-prose">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              <strong>Disclaimer:</strong> Worker classification has significant legal and tax implications. Consult an employment lawyer or accountant for specific advice on your situation.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
