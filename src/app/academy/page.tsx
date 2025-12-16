import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BookOpen, Clock, ArrowRight, TrendingUp, PiggyBank, Receipt, Home, Briefcase,
  GraduationCap, DollarSign, Heart, Gift, Truck, Users, Baby, Accessibility,
  Leaf, Scale, FileText, Plane, Globe, LineChart, Percent, Building2
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Guide & Academy | Learn About Canadian Taxes',
  description: 'Free Canadian tax education and guides. Learn about RRSP, TFSA, tax deductions, credits, and strategies to minimize your taxes legally. Updated for 2024.',
  keywords: 'Canadian tax guide, RRSP guide, TFSA guide, tax deductions Canada, tax credits Canada, how to file taxes Canada',
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
      { slug: 'canada-child-benefit', title: 'Canada Child Benefit (CCB)', readTime: '10 min', icon: Heart },
      { slug: 'pension-income-splitting', title: 'Pension Income Splitting', readTime: '9 min', icon: Users },
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
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    heading: 'text-blue-900 dark:text-blue-100',
    icon: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
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
            36+ Free Tax Guides
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
