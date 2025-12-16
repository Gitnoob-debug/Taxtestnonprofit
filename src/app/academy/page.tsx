import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, Clock, ArrowRight, TrendingUp, PiggyBank, Receipt, Home, Briefcase,
  GraduationCap, DollarSign, Heart, Gift, Truck, Users, Baby, Accessibility,
  Leaf, Scale, FileText, Plane, Globe, LineChart, Percent, Building2,
  Calendar, MapPin, Calculator, Wallet, Lock, Target, RefreshCw, Split,
  UserCheck, HeartHandshake, Laptop, UserCog
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Guide & Academy | Learn About Canadian Taxes',
  description: 'Free Canadian tax education and guides. Learn about RRSP, TFSA, tax deductions, credits, and strategies to minimize your taxes legally. Updated for 2025 tax season.',
  keywords: 'Canadian tax guide, RRSP guide, TFSA guide, tax deductions Canada, tax credits Canada, how to file taxes Canada 2025',
}

const categories = [
  {
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
    name: 'Tax Filing & Deadlines',
    description: 'When and how to file your taxes',
    color: 'indigo',
    articles: [
      { slug: 'tax-deadlines-canada', title: 'Tax Deadlines Canada 2024', readTime: '8 min', icon: Calendar },
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

const colorClasses = {
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950',
    border: 'border-teal-200 dark:border-teal-800',
    text: 'text-teal-700 dark:text-teal-300',
    heading: 'text-teal-900 dark:text-teal-100',
    icon: 'bg-teal-100 dark:bg-teal-900 text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950',
    border: 'border-indigo-200 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-300',
    heading: 'text-indigo-900 dark:text-indigo-100',
    icon: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300',
  },
  cyan: {
    bg: 'bg-cyan-50 dark:bg-cyan-950',
    border: 'border-cyan-200 dark:border-cyan-800',
    text: 'text-cyan-700 dark:text-cyan-300',
    heading: 'text-cyan-900 dark:text-cyan-100',
    icon: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    heading: 'text-blue-900 dark:text-blue-100',
    icon: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    heading: 'text-emerald-900 dark:text-emerald-100',
    icon: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950',
    border: 'border-violet-200 dark:border-violet-800',
    text: 'text-violet-700 dark:text-violet-300',
    heading: 'text-violet-900 dark:text-violet-100',
    icon: 'bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300',
  },
  sky: {
    bg: 'bg-sky-50 dark:bg-sky-950',
    border: 'border-sky-200 dark:border-sky-800',
    text: 'text-sky-700 dark:text-sky-300',
    heading: 'text-sky-900 dark:text-sky-100',
    icon: 'bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400',
    badge: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950',
    border: 'border-pink-200 dark:border-pink-800',
    text: 'text-pink-700 dark:text-pink-300',
    heading: 'text-pink-900 dark:text-pink-100',
    icon: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
    badge: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950',
    border: 'border-orange-200 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
    heading: 'text-orange-900 dark:text-orange-100',
    icon: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-950',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-700 dark:text-green-300',
    heading: 'text-green-900 dark:text-green-100',
    icon: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    badge: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    heading: 'text-purple-900 dark:text-purple-100',
    icon: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950',
    border: 'border-rose-200 dark:border-rose-800',
    text: 'text-rose-700 dark:text-rose-300',
    heading: 'text-rose-900 dark:text-rose-100',
    icon: 'bg-rose-100 dark:bg-rose-900 text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950',
    border: 'border-amber-200 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
    heading: 'text-amber-900 dark:text-amber-100',
    icon: 'bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
  },
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <BookOpen className="h-4 w-4" />
            80+ Free Tax Guides
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Canadian Tax Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
            Comprehensive, CRA-accurate guides on Canadian taxes. From beginner basics to advanced strategies—everything you need to minimize taxes legally.
          </p>
        </div>

        {/* Category Sections */}
        {categories.map((category) => {
          const colors = colorClasses[category.color as keyof typeof colorClasses]
          return (
            <section key={category.name} className="mb-10 sm:mb-14">
              <div className={`${colors.bg} ${colors.border} border rounded-2xl p-5 sm:p-6 mb-4`}>
                <h2 className={`text-xl sm:text-2xl font-bold ${colors.heading} mb-1`}>
                  {category.name}
                </h2>
                <p className={`${colors.text} text-sm sm:text-base`}>
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {category.articles.map((article) => {
                  const Icon = article.icon
                  return (
                    <Link
                      key={article.slug}
                      href={`/academy/${article.slug}`}
                      className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`${colors.icon} p-2 rounded-lg shrink-0`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}

        {/* CTA Section */}
        <div className="bg-teal-50 dark:bg-teal-950 rounded-xl sm:rounded-2xl border border-teal-200 dark:border-teal-800 p-6 sm:p-8 text-center mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-900 dark:text-teal-100 mb-2 sm:mb-3">
            Have a Tax Question?
          </h2>
          <p className="text-sm sm:text-base text-teal-700 dark:text-teal-300 mb-4 sm:mb-6 max-w-xl mx-auto">
            Our AI-powered tax assistant can answer your specific questions using official CRA sources.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all"
          >
            Ask the Tax Assistant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
          <h2>About Our Canadian Tax Academy</h2>
          <p>
            Understanding Canadian taxes doesn't have to be complicated. Our Tax Academy provides free, comprehensive guides on everything from basic tax concepts to advanced planning strategies. All content is grounded in official CRA guidelines and updated for the 2024 tax year.
          </p>

          <h3>What You'll Learn</h3>
          <ul>
            <li><strong>Income Types:</strong> T4 employment income, T5 investment income, rental properties, cryptocurrency, foreign income, and gig economy taxes</li>
            <li><strong>Deductions:</strong> Medical expenses, charitable donations, moving costs, home office, childcare, and professional dues</li>
            <li><strong>Tax Credits:</strong> Disability Tax Credit, Canada Workers Benefit, GST/HST credit, Canada Child Benefit, and pension splitting</li>
            <li><strong>Life Events:</strong> Marriage, divorce, death and estates, immigration, leaving Canada, and inheritances</li>
            <li><strong>Advanced Strategies:</strong> Tax loss harvesting, RRSP meltdown, prescribed rate loans, principal residence exemption, RESPs, and incorporation</li>
          </ul>

          <h3>Who This Is For</h3>
          <p>
            Whether you're filing your first tax return, planning for retirement, running a business, or dealing with a major life change, our guides break down complex tax concepts into plain language that anyone can understand. Each article is written to be SEO-friendly and fast-loading for the best reading experience.
          </p>
        </div>
      </div>
    </div>
  )
}
