'use client'

import Link from 'next/link'
import { Calculator, BookOpen, ArrowRight } from 'lucide-react'

interface RelatedTool {
  slug: string
  title: string
  description: string
}

interface RelatedArticle {
  slug: string
  title: string
}

// Tool metadata for displaying related tools
const toolInfo: Record<string, { title: string; description: string }> = {
  'tax-calculator': { title: 'Income Tax Calculator', description: 'Calculate your federal and provincial taxes' },
  'marginal-tax-calculator': { title: 'Marginal Tax Rate', description: 'See your tax rate on each income bracket' },
  'tax-refund-estimator': { title: 'Tax Refund Estimator', description: 'Estimate your refund or amount owing' },
  'rrsp-calculator': { title: 'RRSP Calculator', description: 'Calculate contribution room and tax savings' },
  'rrsp-vs-tfsa': { title: 'RRSP vs TFSA', description: 'Compare which account is better for you' },
  'tfsa-room-calculator': { title: 'TFSA Room Calculator', description: 'Calculate your total contribution room' },
  'rrsp-withholding-calculator': { title: 'RRSP Withholding Tax', description: 'Tax withheld on RRSP withdrawals' },
  'hbp-repayment-calculator': { title: 'HBP Repayment', description: 'Track Home Buyers\' Plan repayments' },
  'capital-gains-calculator': { title: 'Capital Gains Calculator', description: 'Calculate tax on investment gains' },
  'dividend-tax-calculator': { title: 'Dividend Tax Calculator', description: 'Tax on eligible and non-eligible dividends' },
  'rental-property-calculator': { title: 'Rental Property Calculator', description: 'Calculate rental income and expenses' },
  'fhsa-calculator': { title: 'FHSA Calculator', description: 'First Home Savings Account benefits' },
  'self-employment-tax-calculator': { title: 'Self-Employment Tax', description: 'Calculate taxes for self-employed income' },
  'salary-vs-dividend-calculator': { title: 'Salary vs Dividend', description: 'Compare payment methods for business owners' },
  'cpp-retirement-calculator': { title: 'CPP Retirement Calculator', description: 'Estimate your CPP pension' },
  'oas-clawback-calculator': { title: 'OAS Clawback Calculator', description: 'Calculate OAS repayment threshold' },
}

// Academy article titles
const articleInfo: Record<string, string> = {
  'how-to-file-taxes-canada': 'How to File Taxes in Canada',
  'tax-deductions-credits': 'Tax Deductions & Credits Overview',
  'tax-filing-deadlines': 'Tax Filing Deadlines 2025',
  'rrsp-complete-guide': 'Complete Guide to RRSPs',
  'rrsp-guide': 'RRSP Basics',
  'rrsp-meltdown-strategies': 'RRSP Meltdown Strategies',
  'tfsa-guide': 'TFSA Guide',
  'capital-gains-tax-canada': 'Capital Gains Tax Guide',
  'tax-loss-harvesting': 'Tax Loss Harvesting',
  'principal-residence-exemption': 'Principal Residence Exemption',
  'first-time-home-buyer-tax-benefits': 'First-Time Home Buyer Benefits',
  'dividend-tax-credit': 'Dividend Tax Credit Explained',
  'stock-options-tax': 'Stock Options Taxation',
  'interest-income-tax': 'Interest Income Taxation',
  'self-employment-taxes': 'Self-Employment Tax Guide',
  'gst-hst-guide': 'GST/HST Complete Guide',
  'home-office-deduction': 'Home Office Deduction',
  'cpp-benefits-tax': 'CPP Benefits & Taxation',
  'retirement-income-planning': 'Retirement Income Planning',
  'oas-benefits-tax': 'OAS Benefits & Clawback',
  'pension-income-splitting': 'Pension Income Splitting',
}

interface RelatedContentProps {
  currentTool: string
  relatedToolSlugs?: string[]
  relatedArticleSlugs?: string[]
}

export function RelatedContent({
  currentTool,
  relatedToolSlugs = [],
  relatedArticleSlugs = [],
}: RelatedContentProps) {
  const tools = relatedToolSlugs
    .filter(slug => slug !== currentTool && toolInfo[slug])
    .slice(0, 3)
    .map(slug => ({
      slug,
      ...toolInfo[slug],
    }))

  const articles = relatedArticleSlugs
    .filter(slug => articleInfo[slug])
    .slice(0, 3)
    .map(slug => ({
      slug,
      title: articleInfo[slug],
    }))

  if (tools.length === 0 && articles.length === 0) {
    return null
  }

  return (
    <div className="mt-12 border-t border-slate-200 dark:border-slate-700 pt-10">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
        Related Resources
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Related Tools */}
        {tools.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
              <Calculator className="h-4 w-4" />
              <span>Related Calculators</span>
            </div>
            <div className="space-y-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all"
                >
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {articles.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-4">
              <BookOpen className="h-4 w-4" />
              <span>Learn More</span>
            </div>
            <div className="space-y-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/academy/${article.slug}`}
                  className="group flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-all"
                >
                  <h3 className="font-medium text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {article.title}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
