import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, PiggyBank, Scale, TrendingUp, Home, DollarSign, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Calculators & Tools | Free Tax Planning Tools',
  description: 'Free Canadian tax calculators for 2024. Calculate your federal and provincial taxes, RRSP savings, TFSA room, capital gains tax, and more. All provinces and territories included.',
  keywords: 'Canadian tax calculator, RRSP calculator, TFSA calculator, tax bracket calculator, capital gains calculator, Ontario tax, BC tax, Alberta tax',
}

const tools = [
  {
    href: '/tools/tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate your federal and provincial income tax for 2024.',
    icon: Calculator,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    href: '/tools/rrsp-calculator',
    title: 'RRSP Calculator',
    description: 'Calculate your RRSP contribution room and tax savings.',
    icon: PiggyBank,
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    href: '/tools/rrsp-vs-tfsa',
    title: 'RRSP vs TFSA',
    description: 'Compare which account is better for your situation.',
    icon: Scale,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    href: '/tools/capital-gains-calculator',
    title: 'Capital Gains',
    description: 'Calculate tax on investment gains including 2024 changes.',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    href: '/tools/tfsa-room-calculator',
    title: 'TFSA Room',
    description: 'Calculate your total TFSA contribution room.',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600',
  },
  {
    href: '/tools/fhsa-calculator',
    title: 'FHSA Calculator',
    description: 'First Home Savings Account contribution and tax savings.',
    icon: Home,
    color: 'bg-pink-100 text-pink-600',
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tax Calculators
          </h1>
          <p className="text-slate-600">
            Free, accurate calculators for Canadian taxes. Updated for 2024.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 p-5 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div className={`${tool.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                    {tool.title}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-sm text-slate-600">
                    {tool.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-sm text-slate-500 text-center">
          All calculators use official 2024 CRA tax rates. Not financial advice.
        </p>
      </div>
    </div>
  )
}
