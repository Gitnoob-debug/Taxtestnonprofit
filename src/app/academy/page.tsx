import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, TrendingUp, PiggyBank, Receipt, Home, Briefcase, GraduationCap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Canadian Tax Guide & Academy | Learn About Canadian Taxes',
  description: 'Free Canadian tax education and guides. Learn about RRSP, TFSA, tax deductions, credits, and strategies to minimize your taxes legally. Updated for 2024.',
  keywords: 'Canadian tax guide, RRSP guide, TFSA guide, tax deductions Canada, tax credits Canada, how to file taxes Canada',
}

const featuredArticles = [
  {
    slug: 'rrsp-complete-guide',
    title: 'The Complete Guide to RRSPs in Canada',
    description: 'Everything you need to know about Registered Retirement Savings Plans: contribution limits, tax benefits, and withdrawal strategies.',
    readTime: '12 min',
    icon: PiggyBank,
    category: 'Retirement',
  },
  {
    slug: 'tfsa-guide',
    title: 'TFSA Guide: Tax-Free Savings Account Explained',
    description: 'Learn how TFSAs work, contribution room calculations, and smart strategies to maximize your tax-free growth.',
    readTime: '10 min',
    icon: TrendingUp,
    category: 'Savings',
  },
  {
    slug: 'tax-deductions-credits',
    title: 'Tax Deductions and Credits Every Canadian Should Know',
    description: 'Don\'t leave money on the table. Discover the most commonly missed deductions and credits on Canadian tax returns.',
    readTime: '15 min',
    icon: Receipt,
    category: 'Tax Filing',
  },
]

const articles = [
  {
    slug: 'first-time-home-buyer-tax-benefits',
    title: 'First-Time Home Buyer Tax Benefits in Canada',
    description: 'FHSA, HBP, and tax credits available for first-time home buyers.',
    readTime: '8 min',
    icon: Home,
    category: 'Home Buying',
  },
  {
    slug: 'self-employment-taxes',
    title: 'Self-Employment Taxes in Canada: A Complete Guide',
    description: 'Business expenses, HST/GST, and quarterly instalments for freelancers and contractors.',
    readTime: '14 min',
    icon: Briefcase,
    category: 'Self-Employed',
  },
  {
    slug: 'student-tax-guide',
    title: 'Student Tax Guide: Credits and Deductions',
    description: 'Tuition credits, student loan interest, and moving expenses for students.',
    readTime: '7 min',
    icon: GraduationCap,
    category: 'Students',
  },
]

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <BookOpen className="h-4 w-4" />
            Free Tax Education
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
            Canadian Tax Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-2">
            Learn how Canadian taxes work with our free guides and articles.
            From RRSP basics to advanced tax planning, we've got you covered.
          </p>
        </div>

        {/* Featured Articles */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            Featured Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredArticles.map((article) => {
              const Icon = article.icon
              return (
                <Link
                  key={article.slug}
                  href={`/academy/${article.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 sm:p-6 hover:shadow-lg hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-teal-100 dark:bg-teal-900 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <span className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-500">
                      <Clock className="h-4 w-4" />
                      {article.readTime} read
                    </span>
                    <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium group-hover:gap-2 transition-all">
                      Read Guide
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* All Articles */}
        <div className="mb-10 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6">
            More Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {articles.map((article) => {
              const Icon = article.icon
              return (
                <Link
                  key={article.slug}
                  href={`/academy/${article.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-5 hover:shadow-md hover:border-teal-300 dark:hover:border-teal-700 transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg shrink-0">
                      <Icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500">
                        {article.category}
                      </span>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                        {article.description}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-teal-50 dark:bg-teal-950 rounded-xl sm:rounded-2xl border border-teal-200 dark:border-teal-800 p-6 sm:p-8 text-center">
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
            Understanding Canadian taxes doesn't have to be complicated. Our Tax Academy provides free, easy-to-understand guides on everything from basic tax concepts to advanced planning strategies. All content is written specifically for Canadian taxpayers and updated regularly to reflect the latest tax rules.
          </p>

          <h3>What You'll Learn</h3>
          <ul>
            <li><strong>Registered Accounts:</strong> RRSP, TFSA, FHSA, RESP, and how to use them effectively</li>
            <li><strong>Tax Deductions:</strong> Employment expenses, home office, moving expenses, and more</li>
            <li><strong>Tax Credits:</strong> Basic personal amount, climate action incentive, disability credits</li>
            <li><strong>Investment Taxes:</strong> Capital gains, dividends, and tax-efficient investing</li>
            <li><strong>Life Events:</strong> Getting married, having kids, buying a home, and retirement</li>
          </ul>

          <h3>Who This Is For</h3>
          <p>
            Whether you're filing your first tax return, planning for retirement, or running a business, our guides break down complex tax concepts into plain language that anyone can understand.
          </p>
        </div>
      </div>
    </div>
  )
}
