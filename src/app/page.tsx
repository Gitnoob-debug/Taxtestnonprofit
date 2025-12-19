import { Metadata } from 'next'
import Link from 'next/link'
import {
  MessageSquare,
  Calculator,
  CheckCircle2,
  ArrowRight,
  Sparkles,
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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Takes up full viewport */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/40 via-transparent to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Free AI-Powered Tax Help for Canadians
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Your Personal
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500"> AI Tax Teacher</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get instant answers to your Canadian tax questions. Trained on official CRA documents.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xl font-semibold rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all duration-200"
              >
                <MessageSquare className="h-7 w-7" />
                Start Chatting
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-slate-700 text-xl font-semibold rounded-2xl border-2 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200"
              >
                <Calculator className="h-6 w-6" />
                Calculators
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
    </div>
  )
}
