import { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageSquare,
  Calculator,
  BookOpen,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  FileText,
  DollarSign,
  PiggyBank,
  TrendingUp,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tax Radar - Free Canadian Tax Assistant & Calculators',
  description:
    'Get free AI-powered Canadian tax help. Our AI Tax Teacher answers your questions using official CRA documents. Free calculators for income tax, RRSP, TFSA, capital gains, and more.',
  openGraph: {
    title: 'Tax Radar - Free Canadian Tax Assistant & Calculators',
    description: 'Get free AI-powered Canadian tax help with official CRA-based answers.',
    type: 'website',
  },
}

const features = [
  {
    icon: Shield,
    title: 'CRA-Based Answers',
    description: 'Our AI is trained on official Canada Revenue Agency documents for accurate information.',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description: 'Get answers to your tax questions in seconds, not hours waiting on hold.',
  },
  {
    icon: FileText,
    title: 'Source Citations',
    description: 'Every answer includes citations so you can verify with official CRA sources.',
  },
  {
    icon: DollarSign,
    title: '100% Free',
    description: 'No subscriptions, no hidden fees. Tax help should be accessible to everyone.',
  },
]

const popularCalculators = [
  {
    href: '/tools/tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate your federal and provincial taxes',
    icon: Calculator,
  },
  {
    href: '/tools/rrsp-calculator',
    title: 'RRSP Calculator',
    description: 'See your RRSP contribution tax savings',
    icon: PiggyBank,
  },
  {
    href: '/tools/tfsa-room-calculator',
    title: 'TFSA Room Calculator',
    description: 'Calculate your available contribution room',
    icon: DollarSign,
  },
  {
    href: '/tools/capital-gains-calculator',
    title: 'Capital Gains Calculator',
    description: 'Calculate tax on investment gains',
    icon: TrendingUp,
  },
]

const exampleQuestions = [
  'What can I claim as a work from home deduction?',
  'How much RRSP contribution room do I have?',
  'When is the tax filing deadline?',
  'What medical expenses are tax deductible?',
  'How do I report crypto gains on my taxes?',
  'What is the TFSA contribution limit for 2025?',
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Free AI-Powered Tax Help for Canadians
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500"> AI Tax Teacher</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant answers to your Canadian tax questions. Our AI is trained on official CRA documents to give you accurate, reliable information.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-lg font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-200"
              >
                <MessageSquare className="h-6 w-6" />
                Start Chatting with AI Teacher
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 text-lg font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
              >
                <Calculator className="h-5 w-5" />
                Explore Calculators
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Based on CRA documents</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Updated for 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>No account required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Questions */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-lg font-medium text-slate-500 mb-8">
            Ask questions like...
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {exampleQuestions.map((question, i) => (
              <Link
                key={i}
                href="/chat"
                className="px-4 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 rounded-full text-sm font-medium transition-colors border border-slate-200 hover:border-emerald-200"
              >
                &quot;{question}&quot;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Tax Radar?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We make Canadian taxes less confusing with AI-powered help and free calculators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="card-premium p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Free Tax Calculators
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              14+ calculators updated for 2025 with accurate federal and provincial rates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {popularCalculators.map((calc, i) => {
              const Icon = calc.icon
              return (
                <Link
                  key={i}
                  href={calc.href}
                  className="card-premium p-5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center mb-3 transition-colors">
                    <Icon className="h-5 w-5 text-slate-600 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                    {calc.title}
                  </h3>
                  <p className="text-sm text-slate-500">{calc.description}</p>
                </Link>
              )
            })}
          </div>

          <div className="text-center">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              View all 14+ calculators
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Academy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="card-premium p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Tax Academy</h2>
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                  60+ comprehensive guides on Canadian taxes. Learn about deductions, credits, registered accounts,
                  investment income, and more.
                </p>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  Explore Tax Academy
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="hidden md:block w-px h-32 bg-slate-700" />
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-emerald-400 mb-2">60+</div>
                <div className="text-slate-400">Tax Guides</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Your Tax Questions Answered?
          </h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">
            Start chatting with our AI Tax Teacher now. It&apos;s free, instant, and based on official CRA documents.
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-emerald-600 text-xl font-bold rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-200"
          >
            <MessageSquare className="h-7 w-7" />
            Chat with AI Tax Teacher
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  )
}
