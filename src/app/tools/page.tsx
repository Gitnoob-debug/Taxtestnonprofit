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
  Sparkles,
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
    gradient: 'from-blue-500 to-blue-600',
    bgGlow: 'group-hover:shadow-blue-500/25',
    category: 'core',
  },
  {
    href: '/tools/marginal-tax-calculator',
    title: 'Marginal Tax Rate',
    description: 'See your marginal tax rate for every income bracket.',
    icon: Percent,
    gradient: 'from-indigo-500 to-indigo-600',
    bgGlow: 'group-hover:shadow-indigo-500/25',
    category: 'core',
  },
  {
    href: '/tools/tax-refund-estimator',
    title: 'Tax Refund Estimator',
    description: 'Estimate if you\'ll get a refund or owe money.',
    icon: Receipt,
    gradient: 'from-teal-500 to-teal-600',
    bgGlow: 'group-hover:shadow-teal-500/25',
    category: 'core',
  },
  // Investment & Savings
  {
    href: '/tools/rrsp-calculator',
    title: 'RRSP Calculator',
    description: 'Calculate your RRSP contribution room and tax savings.',
    icon: PiggyBank,
    gradient: 'from-emerald-500 to-emerald-600',
    bgGlow: 'group-hover:shadow-emerald-500/25',
    category: 'savings',
  },
  {
    href: '/tools/rrsp-vs-tfsa',
    title: 'RRSP vs TFSA',
    description: 'Compare which account is better for your situation.',
    icon: Scale,
    gradient: 'from-purple-500 to-purple-600',
    bgGlow: 'group-hover:shadow-purple-500/25',
    category: 'savings',
  },
  {
    href: '/tools/tfsa-room-calculator',
    title: 'TFSA Room',
    description: 'Calculate your total TFSA contribution room.',
    icon: DollarSign,
    gradient: 'from-green-500 to-green-600',
    bgGlow: 'group-hover:shadow-green-500/25',
    category: 'savings',
  },
  {
    href: '/tools/rrsp-withholding-calculator',
    title: 'RRSP Withholding Tax',
    description: 'See how much tax is withheld on RRSP withdrawals.',
    icon: Wallet,
    gradient: 'from-amber-500 to-amber-600',
    bgGlow: 'group-hover:shadow-amber-500/25',
    category: 'savings',
  },
  {
    href: '/tools/hbp-repayment-calculator',
    title: 'HBP Repayment',
    description: 'Track your Home Buyers\' Plan repayment schedule.',
    icon: Key,
    gradient: 'from-rose-500 to-rose-600',
    bgGlow: 'group-hover:shadow-rose-500/25',
    category: 'savings',
  },
  // Investment Income
  {
    href: '/tools/capital-gains-calculator',
    title: 'Capital Gains',
    description: 'Calculate tax on investment gains (50% inclusion rate).',
    icon: TrendingUp,
    gradient: 'from-orange-500 to-orange-600',
    bgGlow: 'group-hover:shadow-orange-500/25',
    category: 'investment',
  },
  {
    href: '/tools/dividend-tax-calculator',
    title: 'Dividend Tax',
    description: 'Calculate tax on eligible and non-eligible dividends.',
    icon: DollarSign,
    gradient: 'from-cyan-500 to-cyan-600',
    bgGlow: 'group-hover:shadow-cyan-500/25',
    category: 'investment',
  },
  {
    href: '/tools/rental-property-calculator',
    title: 'Rental Property',
    description: 'Calculate tax and cash flow on rental income.',
    icon: Building2,
    gradient: 'from-slate-500 to-slate-600',
    bgGlow: 'group-hover:shadow-slate-500/25',
    category: 'investment',
  },
  // Home Buyers
  {
    href: '/tools/fhsa-calculator',
    title: 'FHSA Calculator',
    description: 'First Home Savings Account contribution and tax savings.',
    icon: Home,
    gradient: 'from-pink-500 to-pink-600',
    bgGlow: 'group-hover:shadow-pink-500/25',
    category: 'home',
  },
  // Business & Self-Employment
  {
    href: '/tools/self-employment-tax-calculator',
    title: 'Self-Employment Tax',
    description: 'Calculate CPP and tax for self-employed income.',
    icon: Briefcase,
    gradient: 'from-violet-500 to-violet-600',
    bgGlow: 'group-hover:shadow-violet-500/25',
    category: 'business',
  },
  {
    href: '/tools/salary-vs-dividend-calculator',
    title: 'Salary vs Dividend',
    description: 'Compare paying yourself salary vs dividends.',
    icon: Building2,
    gradient: 'from-fuchsia-500 to-fuchsia-600',
    bgGlow: 'group-hover:shadow-fuchsia-500/25',
    category: 'business',
  },
  // Retirement
  {
    href: '/tools/cpp-retirement-calculator',
    title: 'CPP Retirement',
    description: 'Estimate your CPP pension at different start ages.',
    icon: Clock,
    gradient: 'from-sky-500 to-sky-600',
    bgGlow: 'group-hover:shadow-sky-500/25',
    category: 'retirement',
  },
  {
    href: '/tools/oas-clawback-calculator',
    title: 'OAS Clawback',
    description: 'Calculate OAS clawback based on your income.',
    icon: Users,
    gradient: 'from-lime-500 to-lime-600',
    bgGlow: 'group-hover:shadow-lime-500/25',
    category: 'retirement',
  },
]

const categories = [
  { id: 'core', title: 'Tax Essentials', description: 'Core calculators for income tax and refund estimates' },
  { id: 'savings', title: 'RRSP & TFSA', description: 'Maximize your registered account benefits' },
  { id: 'investment', title: 'Investment Income', description: 'Capital gains, dividends, and rental income' },
  { id: 'home', title: 'Home Buyers', description: 'Tools for first-time home buyers' },
  { id: 'business', title: 'Business & Self-Employment', description: 'For entrepreneurs and business owners' },
  { id: 'retirement', title: 'Retirement Planning', description: 'CPP, OAS, and pension optimization' },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            <span>Updated for 2025 Tax Year</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Tax Calculators
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Free, accurate calculators for Canadian taxes. Plan smarter with tools
            designed to help you save more.
          </p>
        </div>

        {/* Tools by Category */}
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => {
            const categoryTools = tools.filter(t => t.category === category.id)
            if (categoryTools.length === 0) return null

            return (
              <div
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {category.title}
                  </h2>
                  <p className="text-slate-500">{category.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryTools.map((tool, toolIndex) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className={`group card-premium p-6 flex items-start gap-4 ${tool.bgGlow}`}
                        style={{ animationDelay: `${(categoryIndex * 0.1) + (toolIndex * 0.05)}s` }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                            {tool.title}
                            <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed">
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
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm text-slate-600">
              All calculators use official 2025 CRA tax rates. For informational purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
