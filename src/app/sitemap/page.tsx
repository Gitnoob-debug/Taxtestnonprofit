import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Calculator,
  MessageSquare,
  PiggyBank,
  Scale,
  TrendingUp,
  Home,
  DollarSign,
  Percent,
  Building2,
  Wallet,
  Clock,
  Receipt,
  Briefcase,
  Users,
  Key,
  BookOpen,
  Map,
  Info,
  Shield,
  FileText,
  AlertTriangle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Site Map | Tax Radar - All Pages & Tools',
  description: 'Complete site map of Tax Radar. Find all our Canadian tax calculators, tools, and resources in one place. Income tax, RRSP, TFSA, capital gains, and more.',
  keywords: 'Tax Radar sitemap, Canadian tax calculators, tax tools, site navigation',
}

const mainPages = [
  {
    href: '/',
    title: 'Home',
    description: 'Tax Radar landing page and overview',
    icon: Home,
  },
  {
    href: '/chat',
    title: 'AI Tax Teacher',
    description: 'Chat with our AI assistant trained on CRA documents',
    icon: MessageSquare,
  },
  {
    href: '/tools',
    title: 'Tax Calculators',
    description: 'All free Canadian tax calculators in one place',
    icon: Calculator,
  },
  {
    href: '/academy',
    title: 'Tax Academy',
    description: 'Learn about Canadian taxes and tax planning',
    icon: BookOpen,
  },
  {
    href: '/about',
    title: 'About Us',
    description: 'Learn about Tax Radar and our mission',
    icon: Info,
  },
]

const legalPages = [
  {
    href: '/privacy',
    title: 'Privacy Policy',
    description: 'How we collect, use, and protect your information',
    icon: Shield,
  },
  {
    href: '/terms',
    title: 'Terms of Service',
    description: 'Terms and conditions for using Tax Radar',
    icon: FileText,
  },
  {
    href: '/disclaimer',
    title: 'Disclaimer',
    description: 'Important disclaimers about tax information',
    icon: AlertTriangle,
  },
]

const calculators = [
  {
    category: 'Tax Essentials',
    tools: [
      { href: '/tools/tax-calculator', title: 'Income Tax Calculator', icon: Calculator },
      { href: '/tools/marginal-tax-calculator', title: 'Marginal Tax Rate Calculator', icon: Percent },
      { href: '/tools/tax-refund-estimator', title: 'Tax Refund Estimator', icon: Receipt },
    ]
  },
  {
    category: 'RRSP & TFSA',
    tools: [
      { href: '/tools/rrsp-calculator', title: 'RRSP Calculator', icon: PiggyBank },
      { href: '/tools/rrsp-vs-tfsa', title: 'RRSP vs TFSA Comparison', icon: Scale },
      { href: '/tools/tfsa-room-calculator', title: 'TFSA Room Calculator', icon: DollarSign },
      { href: '/tools/rrsp-withholding-calculator', title: 'RRSP Withholding Tax Calculator', icon: Wallet },
      { href: '/tools/hbp-repayment-calculator', title: 'HBP Repayment Calculator', icon: Key },
    ]
  },
  {
    category: 'Investment Income',
    tools: [
      { href: '/tools/capital-gains-calculator', title: 'Capital Gains Calculator', icon: TrendingUp },
      { href: '/tools/dividend-tax-calculator', title: 'Dividend Tax Calculator', icon: DollarSign },
      { href: '/tools/rental-property-calculator', title: 'Rental Property Calculator', icon: Building2 },
    ]
  },
  {
    category: 'Home Buyers',
    tools: [
      { href: '/tools/fhsa-calculator', title: 'FHSA Calculator', icon: Home },
    ]
  },
  {
    category: 'Business & Self-Employment',
    tools: [
      { href: '/tools/self-employment-tax-calculator', title: 'Self-Employment Tax Calculator', icon: Briefcase },
      { href: '/tools/salary-vs-dividend-calculator', title: 'Salary vs Dividend Calculator', icon: Building2 },
    ]
  },
  {
    category: 'Retirement Planning',
    tools: [
      { href: '/tools/cpp-retirement-calculator', title: 'CPP Retirement Calculator', icon: Clock },
      { href: '/tools/oas-clawback-calculator', title: 'OAS Clawback Calculator', icon: Users },
    ]
  },
]

export default function SitemapPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 mb-6 shadow-xl">
            <Map className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Site Map
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Find all pages and tools available on Tax Radar
          </p>
        </div>

        {/* Main Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Main Pages</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mainPages.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="card-premium p-5 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{page.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* All Calculators */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">All Tax Calculators</h2>
          <div className="space-y-8">
            {calculators.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">{category.category}</h3>
                <div className="card-premium divide-y divide-slate-100">
                  {category.tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-slate-600" />
                        </div>
                        <span className="font-medium text-slate-700 hover:text-emerald-600 transition-colors">
                          {tool.title}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Legal</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {legalPages.map((page) => {
              const Icon = page.icon
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="card-premium p-5 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shrink-0 shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{page.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Links</h2>
          <div className="card-premium p-6">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              <Link href="/" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/chat" className="text-slate-600 hover:text-emerald-600 transition-colors">
                AI Tax Teacher
              </Link>
              <Link href="/tools" className="text-slate-600 hover:text-emerald-600 transition-colors">
                All Calculators
              </Link>
              <Link href="/academy" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Tax Academy
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-emerald-600 transition-colors">
                About Us
              </Link>
              <Link href="/tools/tax-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Income Tax Calculator
              </Link>
              <Link href="/tools/rrsp-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                RRSP Calculator
              </Link>
              <Link href="/tools/tfsa-room-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                TFSA Room Calculator
              </Link>
              <Link href="/tools/fhsa-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                FHSA Calculator
              </Link>
              <Link href="/tools/capital-gains-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Capital Gains Calculator
              </Link>
              <Link href="/tools/dividend-tax-calculator" className="text-slate-600 hover:text-emerald-600 transition-colors">
                Dividend Tax Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400">
            Last updated: December 2025 | All calculators use 2025 CRA tax rates
          </p>
        </div>
      </div>
    </div>
  )
}
