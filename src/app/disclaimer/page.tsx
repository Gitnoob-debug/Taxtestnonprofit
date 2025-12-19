import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Disclaimer | Tax Radar',
  description: 'Important disclaimer for Tax Radar - Understand the limitations of our tax information service and the importance of professional tax advice.',
}

export default function DisclaimerPage() {
  const lastUpdated = 'December 18, 2025'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-500/25">
            <AlertTriangle className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Disclaimer</h1>
            <p className="text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          {/* Main Warning Box */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-8 mb-10">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              Important: Please Read This Disclaimer Carefully
            </h2>
            <p className="text-amber-800 text-lg leading-relaxed">
              Tax Radar provides general tax information for <strong>educational and informational purposes only</strong>.
              The information on this website is <strong>NOT professional tax, legal, financial, or accounting advice</strong>.
              Do not rely solely on our information to make tax decisions.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No Professional Advice</h2>
            <p className="text-slate-600 mb-4">
              Tax Radar is not a licensed tax preparer, accountant, lawyer, or financial advisor. The information
              we provide should not be considered a substitute for advice from qualified professionals. Always
              consult with appropriate professionals before making decisions that could affect your tax situation.
            </p>
            <p className="text-slate-600">
              The use of our AI assistant, calculators, or educational content does not create a professional-client
              relationship between you and Tax Radar.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Accuracy and Completeness</h2>
            <p className="text-slate-600 mb-4">
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Tax laws and regulations change frequently. Information may become outdated.</li>
              <li>Our AI assistant uses artificial intelligence which may produce errors or inaccuracies.</li>
              <li>Calculator results are estimates and may not reflect your actual tax liability.</li>
              <li>We cannot guarantee the accuracy, completeness, or timeliness of any information.</li>
              <li>Provincial and territorial tax rules vary and may not all be covered.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Individual Circumstances</h2>
            <p className="text-slate-600">
              Every individual&apos;s tax situation is unique. General information cannot account for your specific
              circumstances, including but not limited to: your income sources, residency status, family situation,
              investment holdings, business activities, and tax history. What applies to one person may not apply
              to you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">AI-Generated Content</h2>
            <p className="text-slate-600 mb-4">
              Our AI tax assistant uses large language models to generate responses. Important considerations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>AI can produce incorrect, misleading, or outdated information (&quot;hallucinations&quot;)</li>
              <li>AI cannot fully understand the nuances of your personal situation</li>
              <li>AI responses should be verified with official CRA sources</li>
              <li>AI is a tool for education, not a replacement for professional advice</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Official CRA Resources</h2>
            <p className="text-slate-600 mb-4">
              For authoritative tax information, always refer to official Canada Revenue Agency (CRA) resources:
            </p>
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <a
                href="https://www.canada.ca/en/revenue-agency.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors no-underline"
              >
                <ExternalLink className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700 font-medium">CRA Official Website</span>
              </a>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/forms-publications.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors no-underline"
              >
                <ExternalLink className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700 font-medium">CRA Forms & Publications</span>
              </a>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/about-your-tax-return.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors no-underline"
              >
                <ExternalLink className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700 font-medium">Personal Income Tax Guide</span>
              </a>
              <a
                href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors no-underline"
              >
                <ExternalLink className="h-5 w-5 text-emerald-600" />
                <span className="text-slate-700 font-medium">CRA My Account</span>
              </a>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 mb-4">
              Tax Radar, its owners, operators, employees, and affiliates shall not be held liable for any
              damages, losses, penalties, or consequences arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Use of or reliance on information provided on this website</li>
              <li>Errors or omissions in our content, calculators, or AI responses</li>
              <li>Tax penalties, interest, or assessments resulting from decisions based on our information</li>
              <li>Any actions taken or not taken based on our content</li>
              <li>Technical errors, service interruptions, or data loss</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Responsibility</h2>
            <p className="text-slate-600">
              You are solely responsible for your tax compliance and financial decisions. By using Tax Radar,
              you acknowledge that you understand these limitations and agree to verify all information with
              qualified professionals and official sources before acting on it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">When to Seek Professional Help</h2>
            <p className="text-slate-600 mb-4">
              We strongly recommend consulting a tax professional if you have:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Complex investment income (stocks, real estate, cryptocurrency)</li>
              <li>Self-employment or business income</li>
              <li>Income from multiple provinces or countries</li>
              <li>Significant life changes (marriage, divorce, immigration)</li>
              <li>Questions about tax audits or disputes with CRA</li>
              <li>Estate planning or inheritance matters</li>
              <li>Any situation where errors could result in significant penalties</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about this disclaimer, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700">
                <strong>Tax Radar</strong><br />
                Email: info@taxradar.ca<br />
                Website: taxradar.ca
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Pages</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/about"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                About Us
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
