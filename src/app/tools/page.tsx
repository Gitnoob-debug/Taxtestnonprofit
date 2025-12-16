import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, PiggyBank, Scale, TrendingUp, Home, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Calculators & Tools | Free Tax Planning Tools',
  description: 'Free Canadian tax calculators for 2024. Calculate your federal and provincial taxes, RRSP savings, TFSA room, capital gains tax, and more. All provinces and territories included.',
  keywords: 'Canadian tax calculator, RRSP calculator, TFSA calculator, tax bracket calculator, capital gains calculator, Ontario tax, BC tax, Alberta tax',
}

const tools = [
  {
    href: '/tools/tax-calculator',
    title: 'Income Tax Calculator',
    description: 'Calculate your federal and provincial income tax for 2024. See your marginal rate, effective rate, and take-home pay.',
    icon: Calculator,
    color: 'bg-blue-500',
  },
  {
    href: '/tools/rrsp-calculator',
    title: 'RRSP Contribution Calculator',
    description: 'Calculate your RRSP contribution room, tax savings from contributions, and optimal contribution amount.',
    icon: PiggyBank,
    color: 'bg-teal-500',
  },
  {
    href: '/tools/rrsp-vs-tfsa',
    title: 'RRSP vs TFSA Comparison',
    description: 'Compare RRSP and TFSA side-by-side. See which account is better for your tax situation and goals.',
    icon: Scale,
    color: 'bg-purple-500',
  },
  {
    href: '/tools/capital-gains-calculator',
    title: 'Capital Gains Calculator',
    description: 'Calculate tax on investment gains including the 2024 inclusion rate changes. Supports stocks, crypto, and real estate.',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
  {
    href: '/tools/tfsa-room-calculator',
    title: 'TFSA Room Calculator',
    description: 'Calculate your total TFSA contribution room based on your age and residency. Includes all years since 2009.',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    href: '/tools/fhsa-calculator',
    title: 'FHSA Calculator',
    description: 'First Home Savings Account calculator. See your contribution room, tax savings, and how it compares to RRSP HBP.',
    icon: Home,
    color: 'bg-red-500',
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Canadian Tax Calculators
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
            Free, accurate tax calculators for Canadians. Updated for 2024 tax year with all federal and provincial rates.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 active:scale-[0.98]"
              >
                <div className={`${tool.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {tool.description}
                </p>
              </Link>
            )
          })}
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About Our Canadian Tax Calculators</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Our tax calculators are designed specifically for Canadian taxpayers and include accurate 2024 tax rates for all provinces and territories: Ontario, British Columbia, Alberta, Quebec, Manitoba, Saskatchewan, Nova Scotia, New Brunswick, Newfoundland and Labrador, Prince Edward Island, Northwest Territories, Yukon, and Nunavut.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8">2024 Tax Rates</h3>
          <p className="text-slate-600 dark:text-slate-400">
            All calculators use the official 2024 federal and provincial tax brackets from the Canada Revenue Agency (CRA). This includes the updated Basic Personal Amount of $15,705 federally, RRSP contribution limit of $31,560, and TFSA contribution limit of $7,000.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-8">Important Disclaimer</h3>
          <p className="text-slate-600 dark:text-slate-400">
            These calculators provide estimates for general guidance only. Your actual tax situation may differ based on various factors. Always consult with a qualified tax professional or refer to official CRA resources for advice specific to your circumstances.
          </p>
        </div>
      </div>
    </div>
  )
}
