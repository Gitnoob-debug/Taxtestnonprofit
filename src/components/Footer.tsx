'use client'

import Link from 'next/link'
import { Leaf } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="h-4 w-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-slate-900">Tax Radar</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Free AI-powered Canadian tax assistance and calculators. Updated for the 2025 tax year.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tools/tax-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Income Tax
                </Link>
              </li>
              <li>
                <Link href="/tools/rrsp-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  RRSP Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/tfsa-room-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  TFSA Room
                </Link>
              </li>
              <li>
                <Link href="/tools/fhsa-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  FHSA Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  AI Tax Assistant
                </Link>
              </li>
              <li>
                <Link href="/academy" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Tax Academy
                </Link>
              </li>
              <li>
                <Link href="/tools/capital-gains-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Capital Gains
                </Link>
              </li>
              <li>
                <Link href="/tools/dividend-tax-calculator" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Dividend Tax
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-slate-500 hover:text-emerald-600 transition-colors">
                  Site Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-slate-200/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">
              © {currentYear} Tax Radar. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 text-center md:text-right max-w-md">
              This site provides general tax information only. Not professional tax, legal, or financial advice.
              Consult a qualified professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
