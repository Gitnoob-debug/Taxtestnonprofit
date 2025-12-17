import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  PiggyBank,
  Scale,
  TrendingUp,
  Home,
  DollarSign,
  ArrowRight,
  Percent,
  Building2,
  Wallet,
  Clock,
  Receipt,
  Briefcase,
  Users,
  Key,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Calculators & Tools 2025 | Free Tax Planning Tools',
  description: 'Free Canadian tax calculators for 2025. Calculate your federal and provincial taxes, RRSP savings, TFSA room, capital gains tax, CPP, dividends, and more. All provinces and territories included.',
  keywords: 'Canadian tax calculator 2025, RRSP calculator, TFSA calculator, tax bracket calculator, capital gains calculator, CPP calculator, dividend tax calculator, Ontario tax, BC tax, Alberta tax',
}

const tools = [
  // Core Tax Calculators
  {
    href: '/tools/tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate your federal and provincial income tax for 2025.',
    icon: Calculator,
    color: 'bg-blue-100 text-blue-600',
    category: 'core',
  },
  {
    href: '/tools/marginal-tax-calculator',
    title: 'Marginal Tax Rate',
    description: 'See your marginal tax rate for every income bracket.',
    icon: Percent,
    color: 'bg-indigo-100 text-indigo-600',
    category: 'core',
  },
  {
    href: '/tools/tax-refund-estimator',
    title: 'Tax Refund Estimator',
    description: 'Estimate if you\'ll get a refund or owe money.',
    icon: Receipt,
    color: 'bg-teal-100 text-teal-600',
    category: 'core',
  },
  // Investment & Savings
  {
    href: '/tools/rrsp-calculator',
    title: 'RRSP Calculator',
    description: 'Calculate your RRSP contribution room and tax savings.',
    icon: PiggyBank,
    color: 'bg-emerald-100 text-emerald-600',
    category: 'savings',
  },
  {
    href: '/tools/rrsp-vs-tfsa',
    title: 'RRSP vs TFSA',
    description: 'Compare which account is better for your situation.',
    icon: Scale,
    color: 'bg-purple-100 text-purple-600',
    category: 'savings',
  },
  {
    href: '/tools/tfsa-room-calculator',
    title: 'TFSA Room',
    description: 'Calculate your total TFSA contribution room.',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600',
    category: 'savings',
  },
  {
    href: '/tools/rrsp-withholding-calculator',
    title: 'RRSP Withholding Tax',
    description: 'See how much tax is withheld on RRSP withdrawals.',
    icon: Wallet,
    color: 'bg-amber-100 text-amber-600',
    category: 'savings',
  },
  {
    href: '/tools/hbp-repayment-calculator',
    title: 'HBP Repayment',
    description: 'Track your Home Buyers\' Plan repayment schedule.',
    icon: Key,
    color: 'bg-rose-100 text-rose-600',
    category: 'savings',
  },
  // Investment Income
  {
    href: '/tools/capital-gains-calculator',
    title: 'Capital Gains',
    description: 'Calculate tax on investment gains (50% inclusion rate).',
    icon: TrendingUp,
    color: 'bg-orange-100 text-orange-600',
    category: 'investment',
  },
  {
    href: '/tools/dividend-tax-calculator',
    title: 'Dividend Tax',
    description: 'Calculate tax on eligible and non-eligible dividends.',
    icon: DollarSign,
    color: 'bg-cyan-100 text-cyan-600',
    category: 'investment',
  },
  {
    href: '/tools/rental-property-calculator',
    title: 'Rental Property',
    description: 'Calculate tax and cash flow on rental income.',
    icon: Building2,
    color: 'bg-slate-100 text-slate-600',
    category: 'investment',
  },
  // Home Buyers
  {
    href: '/tools/fhsa-calculator',
    title: 'FHSA Calculator',
    description: 'First Home Savings Account contribution and tax savings.',
    icon: Home,
    color: 'bg-pink-100 text-pink-600',
    category: 'home',
  },
  // Business & Self-Employment
  {
    href: '/tools/self-employment-tax-calculator',
    title: 'Self-Employment Tax',
    description: 'Calculate CPP and tax for self-employed income.',
    icon: Briefcase,
    color: 'bg-violet-100 text-violet-600',
    category: 'business',
  },
  {
    href: '/tools/salary-vs-dividend-calculator',
    title: 'Salary vs Dividend',
    description: 'Compare paying yourself salary vs dividends.',
    icon: Building2,
    color: 'bg-fuchsia-100 text-fuchsia-600',
    category: 'business',
  },
  // Retirement
  {
    href: '/tools/cpp-retirement-calculator',
    title: 'CPP Retirement',
    description: 'Estimate your CPP pension at different start ages.',
    icon: Clock,
    color: 'bg-sky-100 text-sky-600',
    category: 'retirement',
  },
  {
    href: '/tools/oas-clawback-calculator',
    title: 'OAS Clawback',
    description: 'Calculate OAS clawback based on your income.',
    icon: Users,
    color: 'bg-lime-100 text-lime-600',
    category: 'retirement',
  },
]

const categories = [
  { id: 'core', title: 'Tax Essentials' },
  { id: 'savings', title: 'RRSP & TFSA' },
  { id: 'investment', title: 'Investment Income' },
  { id: 'home', title: 'Home Buyers' },
  { id: 'business', title: 'Business & Self-Employment' },
  { id: 'retirement', title: 'Retirement Planning' },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tax Calculators
          </h1>
          <p className="text-slate-600">
            Free, accurate calculators for Canadian taxes. Updated for 2025.
          </p>
        </div>

        {/* Tools by Category */}
        <div className="space-y-10">
          {categories.map((category) => {
            const categoryTools = tools.filter(t => t.category === category.id)
            if (categoryTools.length === 0) return null

            return (
              <div key={category.id}>
                <h2 className="text-lg font-semibold text-slate-800 mb-4">
                  {category.title}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map((tool) => {
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
                          <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            {tool.title}
                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-sm text-slate-600">
                            {tool.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-sm text-slate-500 text-center">
          All calculators use official 2025 CRA tax rates. Not financial advice.
        </p>
      </div>
    </div>
  )
}
