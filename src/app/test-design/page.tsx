'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Header */}
      <header className="w-full px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">TaxAssist</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/tools" className="text-sm text-slate-600 hover:text-slate-900 hidden sm:block">
              Tools
            </Link>
            <Link href="/academy" className="text-sm text-slate-600 hover:text-slate-900 hidden sm:block">
              Academy
            </Link>
            <Button size="sm" variant="ghost" className="text-slate-600">
              Sign in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero - Centered, Minimal */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Canadian tax answers,
            <br />
            <span className="text-emerald-600">instantly.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-lg mx-auto">
            AI trained on official CRA documents. Ask in plain English, get accurate answers.
          </p>

          <Link href="/">
            <Button size="lg" className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white text-base font-medium rounded-full">
              Start asking questions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="mt-6 text-sm text-slate-400">
            Free to use · No signup required
          </p>
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="px-6 py-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span>Not financial advice. Consult a professional.</span>
          <div className="flex items-center gap-6">
            <Link href="/tools" className="hover:text-slate-600">Calculators</Link>
            <Link href="/academy" className="hover:text-slate-600">Learn</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
