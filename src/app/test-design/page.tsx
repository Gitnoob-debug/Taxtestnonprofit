'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calculator,
  BookOpen,
  MessageSquare,
  Sparkles,
  Check,
  TrendingUp,
  PiggyBank,
  FileText,
  ArrowUpRight,
  Leaf
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-slate-900">TaxAssist</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Chat
              </Link>
              <Link href="/tools" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Calculators
              </Link>
              <Link href="/academy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Learn
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-slate-600">
                Sign in
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Simple and Direct */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Free AI Tax Help
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Canadian taxes,
              <br />
              <span className="text-emerald-600">finally simple.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
              Ask questions in plain English. Get answers backed by official CRA documents. No jargon, no confusion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-6">
                  Start Chatting
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/tools">
                <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 px-6">
                  Try Calculators
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Value Props */}
      <section className="py-8 px-6 border-y border-slate-200/50 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              100% Free
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              No Account Needed
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              CRA-Sourced Info
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              Available 24/7
            </div>
          </div>
        </div>
      </section>

      {/* Three Main Offerings */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {/* AI Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Link href="/">
                <div className="group h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    AI Tax Chat
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Ask anything about Canadian taxes. RRSP limits, deductions, credits - get clear answers instantly.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Calculators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/tools">
                <div className="group h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    Calculators
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Income tax, RRSP room, TFSA limits, capital gains. Run the numbers in seconds.
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Academy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/academy">
                <div className="group h-full p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-50 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    Tax Academy
                    <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-600" />
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    80+ guides on Canadian tax topics. Learn at your own pace, from basics to advanced.
                  </p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculator Quick Links */}
      <section className="py-16 px-6 bg-white border-y border-slate-200/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-slate-900">Popular Calculators</h2>
            <Link href="/tools" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Income Tax', href: '/tools/tax-calculator', icon: TrendingUp, color: 'emerald' },
              { name: 'RRSP Room', href: '/tools/rrsp-calculator', icon: PiggyBank, color: 'blue' },
              { name: 'TFSA Room', href: '/tools/tfsa-room-calculator', icon: Sparkles, color: 'purple' },
              { name: 'FHSA', href: '/tools/fhsa-calculator', icon: FileText, color: 'orange' },
            ].map((calc) => (
              <Link key={calc.name} href={calc.href}>
                <div className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white transition-all group"
                )}>
                  <div className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    calc.color === 'emerald' && 'bg-emerald-100 text-emerald-600',
                    calc.color === 'blue' && 'bg-blue-100 text-blue-600',
                    calc.color === 'purple' && 'bg-purple-100 text-purple-600',
                    calc.color === 'orange' && 'bg-orange-100 text-orange-600',
                  )}>
                    <calc.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-slate-900 text-sm">{calc.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Ready to understand your taxes?
          </h2>
          <p className="text-slate-600 mb-8">
            Start with a question. Our AI will guide you from there.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
              Ask a Question
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-emerald-600 flex items-center justify-center">
              <Leaf className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm text-slate-600">TaxAssist</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Chat</Link>
            <Link href="/tools" className="hover:text-slate-900 transition-colors">Tools</Link>
            <Link href="/academy" className="hover:text-slate-900 transition-colors">Academy</Link>
          </div>

          <p className="text-xs text-slate-400">
            Not financial advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
