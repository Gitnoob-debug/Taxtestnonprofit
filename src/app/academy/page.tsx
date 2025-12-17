'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  BookOpen, Clock, ArrowRight, TrendingUp, PiggyBank, Receipt, Home, Briefcase,
  GraduationCap, DollarSign, Heart, Gift, Truck, Users, Baby, Accessibility,
  Leaf, Scale, FileText, Plane, Globe, LineChart, Percent, Building2,
  Calendar, MapPin, Calculator, Wallet, Lock, Target, RefreshCw, Split,
  UserCheck, HeartHandshake, Laptop, UserCog, ChevronRight, Menu, X
} from 'lucide-react'

const categories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    description: 'Essential tax guides for every Canadian',
    articles: [
      { slug: 'rrsp-complete-guide', title: 'Complete Guide to RRSPs', readTime: '12 min', icon: PiggyBank },
      { slug: 'tfsa-guide', title: 'TFSA Guide: Tax-Free Savings', readTime: '10 min', icon: TrendingUp },
      { slug: 'tax-deductions-credits', title: 'Deductions & Credits Overview', readTime: '15 min', icon: Receipt },
      { slug: 'first-time-home-buyer-tax-benefits', title: 'First-Time Home Buyer Benefits', readTime: '8 min', icon: Home },
      { slug: 'self-employment-taxes', title: 'Self-Employment Tax Guide', readTime: '14 min', icon: Briefcase },
      { slug: 'student-tax-guide', title: 'Student Tax Guide', readTime: '7 min', icon: GraduationCap },
    ]
  },
  {
    id: 'filing-deadlines',
    name: 'Tax Filing & Deadlines',
    description: 'When and how to file your taxes',
    articles: [
      { slug: 'tax-filing-deadlines', title: 'Tax Deadlines Canada 2026', readTime: '8 min', icon: Calendar },
      { slug: 'instalment-payments', title: 'Quarterly Tax Installments', readTime: '9 min', icon: Calculator },
      { slug: 'notice-of-assessment', title: 'Notice of Assessment Explained', readTime: '7 min', icon: FileText },
      { slug: 'cra-my-account', title: 'CRA My Account Guide', readTime: '8 min', icon: Globe },
      { slug: 'cra-audit', title: 'What to Do If CRA Audits You', readTime: '10 min', icon: FileText },
      { slug: 'amend-tax-return', title: 'How to Amend a Tax Return', readTime: '7 min', icon: FileText },
      { slug: 'tax-refund-status', title: 'Check Your Tax Refund Status', readTime: '8 min', icon: Receipt },
    ]
  },
  {
    id: 'provincial',
    name: 'Provincial Taxes',
    description: 'Province-specific tax information',
    articles: [
      { slug: 'ontario-tax-guide', title: 'Ontario Tax Guide', readTime: '10 min', icon: MapPin },
      { slug: 'bc-tax-guide', title: 'British Columbia Tax Guide', readTime: '10 min', icon: MapPin },
      { slug: 'alberta-tax-guide', title: 'Alberta Tax Guide', readTime: '9 min', icon: MapPin },
      { slug: 'quebec-tax-guide', title: 'Quebec Tax Guide', readTime: '11 min', icon: MapPin },
      { slug: 'provincial-tax-credits-comparison', title: 'Provincial Tax Credits Comparison', readTime: '12 min', icon: Calculator },
      { slug: 'provincial-tax-rates-comparison', title: 'Provincial Tax Rates 2024', readTime: '8 min', icon: Percent },
    ]
  },
  {
    id: 'income-types',
    name: 'Income Types',
    description: 'How different types of income are taxed',
    articles: [
      { slug: 't4-slip-guide', title: 'T4 Slip Explained: Employment Income', readTime: '9 min', icon: FileText },
      { slug: 't5-investment-income', title: 'T5 Investment Income Guide', readTime: '10 min', icon: TrendingUp },
      { slug: 'rental-income-guide', title: 'Rental Income & T776', readTime: '11 min', icon: Home },
      { slug: 'cryptocurrency-tax-guide', title: 'Cryptocurrency Tax Guide', readTime: '12 min', icon: DollarSign },
      { slug: 'foreign-income-guide', title: 'Foreign Income & T1135', readTime: '11 min', icon: Globe },
      { slug: 'gig-economy-taxes', title: 'Gig Economy: Uber, DoorDash, Airbnb', readTime: '12 min', icon: Briefcase },
    ]
  },
  {
    id: 'investments',
    name: 'Investments & Capital Gains',
    description: 'Investment income and capital gains taxation',
    articles: [
      { slug: 'capital-gains-tax-canada', title: 'Capital Gains Tax Guide', readTime: '11 min', icon: TrendingUp },
      { slug: 'rrsp-guide', title: 'RRSP Complete Guide', readTime: '12 min', icon: PiggyBank },
      { slug: 'dividend-tax-credit', title: 'Dividend Tax Credit Explained', readTime: '9 min', icon: DollarSign },
      { slug: 'stock-options-tax', title: 'Stock Options Taxation', readTime: '10 min', icon: LineChart },
      { slug: 'interest-income-tax', title: 'Interest Income Taxation', readTime: '7 min', icon: Wallet },
      { slug: 'foreign-investment-reporting', title: 'Foreign Investment Reporting', readTime: '10 min', icon: Globe },
      { slug: 'mutual-funds-etf-tax', title: 'Mutual Fund & ETF Taxes', readTime: '9 min', icon: TrendingUp },
    ]
  },
  {
    id: 'employment',
    name: 'Employment & Benefits',
    description: 'Employment income and workplace benefits',
    articles: [
      { slug: 'employment-expenses-deductions', title: 'Employment Expense Deductions', readTime: '10 min', icon: Receipt },
      { slug: 'ei-benefits-tax', title: 'EI Benefits & Taxation', readTime: '8 min', icon: Wallet },
      { slug: 'cpp-benefits-tax', title: 'CPP Benefits & Taxation', readTime: '9 min', icon: PiggyBank },
      { slug: 'severance-pay-tax', title: 'Severance Pay Taxation', readTime: '8 min', icon: DollarSign },
      { slug: 'taxable-benefits-guide', title: 'Taxable Benefits Guide', readTime: '10 min', icon: Gift },
      { slug: 'remote-work-tax', title: 'Remote Work Tax Deductions', readTime: '9 min', icon: Home },
      { slug: 'maternity-parental-leave-tax', title: 'Maternity & Parental Leave', readTime: '8 min', icon: Baby },
    ]
  },
  {
    id: 'retirement',
    name: 'Retirement Planning',
    description: 'Retirement income and pension taxation',
    articles: [
      { slug: 'oas-benefits-tax', title: 'OAS Benefits & Clawback', readTime: '10 min', icon: Wallet },
      { slug: 'rrif-guide', title: 'RRIF Complete Guide', readTime: '10 min', icon: PiggyBank },
      { slug: 'pension-income-splitting', title: 'Pension Income Splitting', readTime: '9 min', icon: Users },
      { slug: 'retirement-income-planning', title: 'Retirement Income Planning', readTime: '12 min', icon: Target },
      { slug: 'annuity-tax-guide', title: 'Annuity Tax Guide', readTime: '9 min', icon: RefreshCw },
      { slug: 'defined-benefit-pension-tax', title: 'DB Pension Taxation', readTime: '10 min', icon: Building2 },
      { slug: 'lif-lira-guide', title: 'LIRA & LIF Guide', readTime: '10 min', icon: Lock },
    ]
  },
  {
    id: 'family',
    name: 'Family & Dependants',
    description: 'Tax credits and benefits for families',
    articles: [
      { slug: 'canada-child-benefit', title: 'Canada Child Benefit (CCB)', readTime: '10 min', icon: Baby },
      { slug: 'spousal-support-tax', title: 'Spousal Support Taxation', readTime: '9 min', icon: Heart },
      { slug: 'child-support-tax', title: 'Child Support Tax Rules', readTime: '7 min', icon: Users },
      { slug: 'caregiver-tax-credits', title: 'Caregiver Tax Credits', readTime: '9 min', icon: HeartHandshake },
      { slug: 'education-tax-credits', title: 'Education Tax Credits', readTime: '10 min', icon: GraduationCap },
      { slug: 'eligible-dependant-credit', title: 'Eligible Dependant Credit', readTime: '8 min', icon: UserCheck },
      { slug: 'family-income-splitting', title: 'Family Income Splitting', readTime: '11 min', icon: Split },
    ]
  },
  {
    id: 'business',
    name: 'Business & Self-Employed',
    description: 'Tax guides for business owners',
    articles: [
      { slug: 'self-employment-tax', title: 'Self-Employment Tax Guide', readTime: '12 min', icon: Briefcase },
      { slug: 'small-business-deductions', title: 'Small Business Deductions', readTime: '11 min', icon: Receipt },
      { slug: 'gst-hst-guide', title: 'GST/HST Complete Guide', readTime: '12 min', icon: Percent },
      { slug: 'incorporation-vs-sole-proprietor', title: 'Incorporate vs Sole Proprietor', readTime: '11 min', icon: Building2 },
      { slug: 'rental-income-tax', title: 'Rental Income Taxation', readTime: '11 min', icon: Home },
      { slug: 'home-office-deduction', title: 'Home Office Deduction', readTime: '10 min', icon: Laptop },
      { slug: 'contractor-vs-employee', title: 'Contractor vs Employee', readTime: '10 min', icon: UserCog },
    ]
  },
  {
    id: 'deductions',
    name: 'Deductions',
    description: 'Reduce your taxable income',
    articles: [
      { slug: 'medical-expenses', title: 'Medical Expense Tax Credit', readTime: '10 min', icon: Heart },
      { slug: 'charitable-donations', title: 'Charitable Donation Credits', readTime: '9 min', icon: Gift },
      { slug: 'moving-expenses', title: 'Moving Expense Deduction', readTime: '8 min', icon: Truck },
      { slug: 'home-office-expenses', title: 'Home Office Deduction', readTime: '10 min', icon: Home },
      { slug: 'childcare-expenses', title: 'Childcare Expense Deduction', readTime: '9 min', icon: Baby },
      { slug: 'union-professional-dues', title: 'Union & Professional Dues', readTime: '6 min', icon: Users },
    ]
  },
  {
    id: 'credits',
    name: 'Tax Credits',
    description: 'Credits that reduce your tax bill',
    articles: [
      { slug: 'disability-tax-credit', title: 'Disability Tax Credit (DTC)', readTime: '12 min', icon: Accessibility },
      { slug: 'canada-workers-benefit', title: 'Canada Workers Benefit (CWB)', readTime: '8 min', icon: Briefcase },
      { slug: 'climate-action-incentive', title: 'Climate Action Incentive', readTime: '6 min', icon: Leaf },
      { slug: 'gst-hst-credit', title: 'GST/HST Credit', readTime: '7 min', icon: Receipt },
    ]
  },
  {
    id: 'life-events',
    name: 'Life Events',
    description: 'Tax implications of major life changes',
    articles: [
      { slug: 'marriage-common-law-taxes', title: 'Marriage & Common-Law Taxes', readTime: '10 min', icon: Heart },
      { slug: 'divorce-separation-taxes', title: 'Divorce & Separation', readTime: '11 min', icon: Scale },
      { slug: 'death-estate-taxes', title: 'Death & Estate Taxes', readTime: '13 min', icon: FileText },
      { slug: 'immigration-taxes', title: 'New to Canada Tax Guide', readTime: '12 min', icon: Plane },
      { slug: 'leaving-canada-taxes', title: 'Leaving Canada: Departure Tax', readTime: '11 min', icon: Globe },
      { slug: 'inheritance-taxes', title: 'Receiving an Inheritance', readTime: '9 min', icon: Gift },
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Strategies',
    description: 'Sophisticated tax planning techniques',
    articles: [
      { slug: 'tax-loss-harvesting', title: 'Tax Loss Harvesting', readTime: '10 min', icon: TrendingUp },
      { slug: 'rrsp-meltdown-strategies', title: 'RRSP Meltdown Strategy', readTime: '11 min', icon: LineChart },
      { slug: 'prescribed-rate-loans', title: 'Prescribed Rate Loans', readTime: '10 min', icon: Percent },
      { slug: 'principal-residence-exemption', title: 'Principal Residence Exemption', readTime: '12 min', icon: Home },
      { slug: 'resp-education-savings', title: 'RESP & Education Savings', readTime: '11 min', icon: GraduationCap },
      { slug: 'incorporation-small-business', title: 'Incorporation for Small Business', readTime: '13 min', icon: Building2 },
    ]
  },
]

export default function AcademyPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('getting-started')

  useEffect(() => {
    const handleScroll = () => {
      const sections = categories.map(c => document.getElementById(c.id))
      const scrollPosition = window.scrollY + 150

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(categories[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    setMobileNavOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg transition-all"
          aria-label="Toggle navigation"
        >
          {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileNavOpen(false)}>
          <nav
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-900">Jump to Category</h2>
            </div>
            <div className="p-2">
              {categories.map((category) => {
                const isActive = activeSection === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {category.name}
                    <span className="text-xs text-slate-400 ml-2">
                      ({category.articles.length})
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            80+ Free Guides
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Tax Academy
          </h1>
          <p className="text-slate-600">
            Comprehensive guides on Canadian taxes. From basics to advanced strategies.
          </p>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="sticky top-20">
              <div className="space-y-1">
                {categories.map((category) => {
                  const isActive = activeSection === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => scrollToSection(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-600 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate">{category.name}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                    </button>
                  )
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {categories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className="mb-12 scroll-mt-24"
              >
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {category.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {category.articles.map((article) => {
                    const Icon = article.icon
                    return (
                      <Link
                        key={article.slug}
                        href={`/academy/${article.slug}`}
                        className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-slate-900 text-sm group-hover:text-emerald-600 transition-colors truncate">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}

            {/* CTA */}
            <div className="bg-slate-900 rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold text-white mb-2">
                Have a specific question?
              </h2>
              <p className="text-slate-400 text-sm mb-4">
                Our AI can answer your tax questions using official CRA sources.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                Ask the AI
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
