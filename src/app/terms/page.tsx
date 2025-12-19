import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Tax Radar',
  description: 'Terms of Service for Tax Radar - Read our terms and conditions for using the Tax Radar website and services.',
}

export default function TermsOfServicePage() {
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/25">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Terms of Service</h1>
            <p className="text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="card-premium p-8 mb-8">
            <p className="text-lg text-slate-600 leading-relaxed">
              Welcome to Tax Radar. By accessing or using our website at taxradar.ca, you agree to be bound
              by these Terms of Service. Please read them carefully before using our services.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-600">
              By accessing and using Tax Radar (&quot;the Service&quot;), you accept and agree to be bound by these
              Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use
              our Service. We reserve the right to modify these terms at any time, and your continued use
              constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Description of Service</h2>
            <p className="text-slate-600 mb-4">Tax Radar provides:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>An AI-powered tax assistant that answers questions about Canadian taxation</li>
              <li>Tax calculators for various Canadian tax scenarios</li>
              <li>Educational content about Canadian tax topics</li>
              <li>User accounts for saving preferences and conversation history</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Important Disclaimer - Not Professional Advice</h2>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 my-6">
              <p className="text-amber-900 font-medium mb-4">
                THIS IS CRITICAL - PLEASE READ CAREFULLY:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-amber-800">
                <li>Tax Radar provides <strong>general tax information for educational purposes only</strong>.</li>
                <li>Our Service does <strong>NOT</strong> constitute professional tax, legal, financial, or accounting advice.</li>
                <li>Information provided may not apply to your specific situation.</li>
                <li>Tax laws are complex and subject to change. We make no guarantees about the accuracy, completeness, or timeliness of information.</li>
                <li>You should <strong>always consult with a qualified tax professional, accountant, or lawyer</strong> before making tax decisions.</li>
                <li>Always verify information with official Canada Revenue Agency (CRA) sources.</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. User Accounts</h2>
            <p className="text-slate-600 mb-4">When you create an account, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="text-slate-600 mt-4">
              We reserve the right to suspend or terminate accounts that violate these terms or are used for
              fraudulent purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Acceptable Use</h2>
            <p className="text-slate-600 mb-4">You agree NOT to use our Service to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to circumvent, disable, or interfere with security features</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Scrape, data mine, or automatically collect information</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Use the Service for any illegal or unauthorized purpose</li>
              <li>Attempt to probe, scan, or test vulnerabilities</li>
              <li>Overload, flood, or spam the Service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Intellectual Property</h2>
            <p className="text-slate-600 mb-4">
              The Tax Radar name, logo, website design, and original content are owned by Tax Radar and
              protected by intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Copy, modify, or distribute our proprietary content without permission</li>
              <li>Use our trademarks without written consent</li>
              <li>Remove any copyright or proprietary notices</li>
            </ul>
            <p className="text-slate-600 mt-4">
              Tax information derived from CRA sources remains in the public domain. AI-generated responses
              are provided for your personal use only.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. AI-Generated Content</h2>
            <p className="text-slate-600 mb-4">
              Our AI tax assistant uses artificial intelligence to generate responses. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>AI responses may contain errors, inaccuracies, or outdated information</li>
              <li>AI cannot account for all individual circumstances</li>
              <li>AI responses should not be relied upon as the sole basis for tax decisions</li>
              <li>We are not responsible for any consequences resulting from reliance on AI-generated content</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Calculator Accuracy</h2>
            <p className="text-slate-600">
              Our tax calculators are designed to provide estimates based on publicly available tax rates and rules.
              Calculator results are approximations only and may not reflect your actual tax situation.
              We do not guarantee the accuracy of calculator results. Always consult a tax professional and
              use official CRA resources for accurate tax calculations.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Limitation of Liability</h2>
            <div className="bg-slate-50 rounded-xl p-6 my-4">
              <p className="text-slate-700">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, TAX RADAR AND ITS OWNERS, OPERATORS, EMPLOYEES,
                AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mt-4">
                <li>Loss of profits, revenue, or data</li>
                <li>Tax penalties, interest, or assessments</li>
                <li>Errors in tax filing or calculations</li>
                <li>Reliance on information provided by the Service</li>
                <li>Interruption of service or loss of access</li>
              </ul>
              <p className="text-slate-700 mt-4">
                Our total liability shall not exceed the amount you paid to use the Service (if any) in the
                12 months preceding the claim.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Indemnification</h2>
            <p className="text-slate-600">
              You agree to indemnify, defend, and hold harmless Tax Radar and its affiliates from any claims,
              damages, losses, or expenses (including legal fees) arising from your use of the Service,
              violation of these terms, or infringement of any third-party rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Third-Party Services</h2>
            <p className="text-slate-600">
              Our Service may contain links to third-party websites or use third-party services (such as
              Google AdSense for advertising). We are not responsible for the content, privacy practices,
              or terms of any third-party services. Your use of third-party services is at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Service Availability</h2>
            <p className="text-slate-600">
              We strive to provide reliable service but do not guarantee uninterrupted access. We may modify,
              suspend, or discontinue any part of the Service at any time without notice. We are not liable
              for any modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Governing Law</h2>
            <p className="text-slate-600">
              These Terms of Service shall be governed by and construed in accordance with the laws of the
              Province of Ontario and the federal laws of Canada applicable therein, without regard to
              conflict of law principles. Any disputes shall be subject to the exclusive jurisdiction of
              the courts of Ontario, Canada.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Severability</h2>
            <p className="text-slate-600">
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall
              be limited or eliminated to the minimum extent necessary, and the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Contact Information</h2>
            <p className="text-slate-600">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700">
                <strong>Tax Radar</strong><br />
                Email: legal@taxradar.ca<br />
                Website: taxradar.ca
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
