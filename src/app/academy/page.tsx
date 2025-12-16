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
    color: 'teal',
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
    color: 'indigo',
    articles: [
      { slug: 'tax-filing-deadlines', title: 'Tax Deadlines Canada 2026', readTime: '8 min', icon: Calendar },
      { slug: 'tax-installments-guide', title: 'Quarterly Tax Installments', readTime: '9 min', icon: Calculator },
      { slug: 'notice-of-assessment', title: 'Notice of Assessment Explained', readTime: '7 min', icon: FileText },
      { slug: 'cra-my-account-guide', title: 'CRA My Account Guide', readTime: '8 min', icon: Globe },
      { slug: 'tax-audit-guide', title: 'What to Do If CRA Audits You', readTime: '10 min', icon: FileText },
      { slug: 'amended-tax-return', title: 'How to Amend a Tax Return', readTime: '7 min', icon: FileText },
      { slug: 'tax-penalties-interest', title: 'Tax Penalties & Interest', readTime: '8 min', icon: Receipt },
      { slug: 'voluntary-disclosure-program', title: 'Voluntary Disclosure Program', readTime: '9 min', icon: FileText },
    ]
  },
  {
    id: 'provincial',
    name: 'Provincial Taxes',
    description: 'Province-specific tax information',
    color: 'cyan',
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
    color: 'blue',
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
    color: 'emerald',
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
    color: 'violet',
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
    color: 'sky',
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
    color: 'pink',
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
    color: 'orange',
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
    color: 'green',
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
    color: 'purple',
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
    color: 'rose',
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
    color: 'amber',
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

const colorClasses: Record<string, { bg: string; border: string; text: string; heading: string; icon: string; nav: string; navActive: string }> = {
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    border: 'border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-300',
    heading: 'text-teal-900 dark:text-teal-100',
    icon: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400',
    nav: 'hover:bg-teal-50 dark:hover:bg-teal-950 hover:text-teal-700 dark:hover:text-teal-300',
    navActive: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 border-l-2 border-teal-500',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-300',
    heading: 'text-indigo-900 dark:text-indigo-100',
    icon: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
    nav: 'hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-700 dark:hover:text-indigo-300',
    navActive: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-l-2 border-indigo-500',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-300',
    heading: 'text-cyan-900 dark:text-cyan-100',
    icon: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
    nav: 'hover:bg-cyan-50 dark:hover:bg-cyan-950 hover:text-cyan-700 dark:hover:text-cyan-300',
    navActive: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 border-l-2 border-cyan-500',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    heading: 'text-blue-900 dark:text-blue-100',
    icon: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    nav: 'hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300',
    navActive: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-2 border-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    heading: 'text-emerald-900 dark:text-emerald-100',
    icon: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400',
    nav: 'hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-300',
    navActive: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 border-l-2 border-emerald-500',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-300',
    heading: 'text-violet-900 dark:text-violet-100',
    icon: 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400',
    nav: 'hover:bg-violet-50 dark:hover:bg-violet-950 hover:text-violet-700 dark:hover:text-violet-300',
    navActive: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 border-l-2 border-violet-500',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-300',
    heading: 'text-sky-900 dark:text-sky-100',
    icon: 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400',
    nav: 'hover:bg-sky-50 dark:hover:bg-sky-950 hover:text-sky-700 dark:hover:text-sky-300',
    navActive: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border-l-2 border-sky-500',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-300',
    heading: 'text-pink-900 dark:text-pink-100',
    icon: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
    nav: 'hover:bg-pink-50 dark:hover:bg-pink-950 hover:text-pink-700 dark:hover:text-pink-300',
    navActive: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border-l-2 border-pink-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    heading: 'text-orange-900 dark:text-orange-100',
    icon: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    nav: 'hover:bg-orange-50 dark:hover:bg-orange-950 hover:text-orange-700 dark:hover:text-orange-300',
    navActive: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 border-l-2 border-orange-500',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    heading: 'text-green-900 dark:text-green-100',
    icon: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    nav: 'hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-700 dark:hover:text-green-300',
    navActive: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-l-2 border-green-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    heading: 'text-purple-900 dark:text-purple-100',
    icon: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    nav: 'hover:bg-purple-50 dark:hover:bg-purple-950 hover:text-purple-700 dark:hover:text-purple-300',
    navActive: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-l-2 border-purple-500',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-300',
    heading: 'text-rose-900 dark:text-rose-100',
    icon: 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400',
    nav: 'hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-700 dark:hover:text-rose-300',
    navActive: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 border-l-2 border-rose-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    heading: 'text-amber-900 dark:text-amber-100',
    icon: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400',
    nav: 'hover:bg-amber-50 dark:hover:bg-amber-950 hover:text-amber-700 dark:hover:text-amber-300',
    navActive: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-l-2 border-amber-500',
  },
}

export default function AcademyPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('getting-started')

  // Track scroll position for active section highlighting
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-full shadow-lg transition-all"
          aria-label="Toggle navigation"
        >
          {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileNavOpen(false)}>
          <nav
            className="absolute right-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="font-bold text-slate-900 dark:text-white">Jump to Category</h2>
            </div>
            <div className="p-2">
              {categories.map((category) => {
                const colors = colorClasses[category.color]
                const isActive = activeSection === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => scrollToSection(category.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-1 ${
                      isActive ? colors.navActive : `text-slate-600 dark:text-slate-400 ${colors.nav}`
                    }`}
                  >
                    {category.name}
                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-2">
                      ({category.articles.length})
                    </span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" />
            80+ Free Tax Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Canadian Tax Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive, CRA-accurate guides on Canadian taxes. From beginner basics to advanced strategies.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            <nav className="sticky top-24 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Jump to Category</h2>
              </div>
              <div className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                {categories.map((category) => {
                  const colors = colorClasses[category.color]
                  const isActive = activeSection === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => scrollToSection(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all mb-0.5 flex items-center justify-between group ${
                        isActive
                          ? colors.navActive
                          : `text-slate-600 dark:text-slate-400 ${colors.nav}`
                      }`}
                    >
                      <span className="truncate">{category.name}</span>
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'rotate-90' : 'group-hover:translate-x-0.5'}`} />
                    </button>
                  )
                })}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Category Sections */}
            {categories.map((category) => {
              const colors = colorClasses[category.color]
              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="mb-12 scroll-mt-24"
                >
                  <div className={`${colors.bg} ${colors.border} border rounded-2xl p-5 sm:p-6 mb-5`}>
                    <h2 className={`text-xl sm:text-2xl font-bold ${colors.heading} mb-1`}>
                      {category.name}
                    </h2>
                    <p className={`${colors.text} text-sm sm:text-base`}>
                      {category.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.articles.map((article) => {
                      const Icon = article.icon
                      return (
                        <Link
                          key={article.slug}
                          href={`/academy/${article.slug}`}
                          className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`${colors.icon} p-2.5 rounded-lg shrink-0`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {article.title}
                              </h3>
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{article.readTime}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )
            })}

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 rounded-2xl p-6 sm:p-8 text-center mt-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Have a Tax Question?
              </h2>
              <p className="text-teal-100 mb-6 max-w-xl mx-auto">
                Our AI-powered tax assistant can answer your specific questions using official CRA sources.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white hover:bg-teal-50 text-teal-700 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Ask the Tax Assistant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
