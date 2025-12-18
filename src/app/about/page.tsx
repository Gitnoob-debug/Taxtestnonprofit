import type { Metadata } from 'next'
import Link from 'next/link'
import { Leaf, Shield, BookOpen, Users, Target, Heart, ArrowRight, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Tax Radar - Canadian Tax Assistant',
  description: 'Learn about Tax Radar, your free AI-powered Canadian tax assistant. We help Canadians understand their taxes with accurate, CRA-based information and free calculators.',
  keywords: 'about Tax Radar, Canadian tax help, free tax calculator, CRA tax information, tax assistance Canada',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Important Disclaimer - Top of Page */}
        <div className="mb-12 bg-amber-100 border-2 border-amber-400 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-amber-900 mb-2">Important Disclaimer</h2>
              <p className="text-amber-900 leading-relaxed font-medium">
                Tax Radar provides general tax information for educational purposes only.
                This is <strong>not professional tax, legal, or financial advice</strong>.
                Tax laws are complex and individual circumstances vary. We strongly recommend consulting
                with a qualified tax professional or accountant for advice specific to your situation.
                Always verify information with official CRA sources before making tax decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-6 shadow-xl shadow-emerald-500/25">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            About Tax Radar
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your free, AI-powered Canadian tax assistant. We're here to help you understand
            your taxes and make smarter financial decisions.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="card-premium p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              We believe every Canadian deserves access to accurate, easy-to-understand tax information.
              Our mission is to demystify the Canadian tax system by providing free tools and AI-powered
              assistance that helps you make informed financial decisions, maximize your tax savings,
              and stay compliant with CRA requirements.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Tax Assistant</h3>
              <p className="text-slate-600">
                Our AI assistant is trained on official CRA documents to answer your tax questions
                accurately. Get instant answers about deductions, credits, forms, and filing requirements.
              </p>
            </div>

            <div className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free Calculators</h3>
              <p className="text-slate-600">
                Over 15 free tax calculators updated for 2025. Calculate your income tax, RRSP savings,
                TFSA room, capital gains, dividends, and more with accurate federal and provincial rates.
              </p>
            </div>

            <div className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">For All Canadians</h3>
              <p className="text-slate-600">
                Whether you're an employee, self-employed, investor, or retiree, our tools are
                designed to help Canadians in all provinces and territories with their unique tax situations.
              </p>
            </div>

            <div className="card-premium p-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4 shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Always Free</h3>
              <p className="text-slate-600">
                Tax Radar is completely free to use. No hidden fees, no premium subscriptions.
                We believe tax literacy should be accessible to everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our Commitment to Accuracy</h2>
          <div className="card-premium p-8 bg-gradient-to-br from-slate-50 to-white">
            <ul className="space-y-4">
              {[
                'All tax rates and rules are sourced from official CRA publications',
                'Calculators are updated annually to reflect current tax year changes',
                'AI responses cite official CRA documents when available',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-6">
            Try our AI tax assistant or explore our free calculators today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 btn-premium rounded-xl text-white font-medium"
            >
              Chat with AI Assistant
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Explore Calculators
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
