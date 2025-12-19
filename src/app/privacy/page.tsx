import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Tax Radar',
  description: 'Privacy Policy for Tax Radar - Learn how we collect, use, and protect your personal information in compliance with Canadian privacy laws.',
}

export default function PrivacyPolicyPage() {
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/25">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h1>
            <p className="text-slate-500">Last updated: {lastUpdated}</p>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <div className="card-premium p-8 mb-8">
            <p className="text-lg text-slate-600 leading-relaxed">
              Tax Radar (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website taxradar.ca and use our services.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Account Information:</strong> When you create an account, we collect your email address and password.</li>
              <li><strong>Profile Information:</strong> You may optionally provide tax-related information such as your province of residence, employment type, and income sources to personalize your experience.</li>
              <li><strong>Chat Messages:</strong> Questions you ask our AI tax assistant are processed to provide responses. For logged-in users, conversation history is saved to your account.</li>
              <li><strong>Calculator Inputs:</strong> Data you enter into our tax calculators is processed locally and is not stored on our servers unless you are logged in and choose to save calculations.</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Information Collected Automatically</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited, time spent, and features used.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device type.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies to improve your experience and for analytics purposes.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Provide, maintain, and improve our services</li>
              <li>Process and respond to your tax questions through our AI assistant</li>
              <li>Personalize your experience based on your tax profile</li>
              <li>Send you important updates about our services (with your consent)</li>
              <li>Analyze usage patterns to improve our website and calculators</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Processing and AI</h2>
            <p className="text-slate-600 mb-4">
              Our AI tax assistant processes your questions to provide helpful responses. Important notes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>PII Redaction:</strong> We automatically detect and redact personally identifiable information (such as SIN numbers, addresses, and phone numbers) from your questions before processing.</li>
              <li><strong>Third-Party AI:</strong> We use OpenRouter and OpenAI services to power our AI assistant. Your questions (after PII redaction) may be processed by these services.</li>
              <li><strong>No Training:</strong> Your data is not used to train AI models.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Information Sharing</h2>
            <p className="text-slate-600 mb-4">We do not sell your personal information. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Service Providers:</strong> Third parties that help us operate our services (e.g., Supabase for data storage, Vercel for hosting).</li>
              <li><strong>AI Providers:</strong> OpenRouter and OpenAI for processing AI queries (with PII redacted).</li>
              <li><strong>Advertising Partners:</strong> Google AdSense may collect information for personalized advertising. See Google&apos;s privacy policy for details.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Cookies and Advertising</h2>
            <p className="text-slate-600 mb-4">
              We use cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Essential Cookies:</strong> Required for the website to function (authentication, preferences).</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site.</li>
              <li><strong>Advertising Cookies:</strong> Google AdSense uses cookies to show relevant ads. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" className="text-emerald-600 hover:text-emerald-700">Google Ad Settings</a>.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Data Retention</h2>
            <p className="text-slate-600">
              We retain your personal information for as long as your account is active or as needed to provide services.
              You can request deletion of your account and associated data at any time by contacting us.
              Anonymous usage data may be retained for analytical purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Your Rights (PIPEDA Compliance)</h2>
            <p className="text-slate-600 mb-4">
              Under Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Withdraw consent for data processing</li>
              <li>Request deletion of your data</li>
              <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
            </ul>
            <p className="text-slate-600 mt-4">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Data Security</h2>
            <p className="text-slate-600">
              We implement appropriate technical and organizational measures to protect your personal information,
              including encryption in transit (HTTPS), secure data storage with Supabase, and regular security reviews.
              However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-slate-600">
              Our services are not directed to individuals under 18 years of age. We do not knowingly collect
              personal information from children. If you believe we have collected information from a child,
              please contact us immediately.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-slate-600">
              We may update this Privacy Policy from time to time. We will notify you of any material changes
              by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued
              use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Contact Us</h2>
            <p className="text-slate-600">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <p className="text-slate-700">
                <strong>Tax Radar</strong><br />
                Email: privacy@taxradar.ca<br />
                Website: taxradar.ca
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
