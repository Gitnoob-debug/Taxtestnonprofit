'use client'

import { useEffect, useRef } from 'react'
import { Sponsor, trackSponsorEvent } from '@/lib/sponsors'
import { ExternalLink, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SponsoredRecommendationProps {
  sponsors: Sponsor[]
  className?: string
  queryContext?: string // What query triggered these sponsors
}

const categoryColors: Record<Sponsor['category'], string> = {
  investment: 'from-emerald-500 to-teal-500',
  'tax-software': 'from-blue-500 to-indigo-500',
  banking: 'from-violet-500 to-purple-500',
  accounting: 'from-orange-500 to-amber-500',
  insurance: 'from-rose-500 to-pink-500',
  education: 'from-cyan-500 to-sky-500',
}

const categoryLabels: Record<Sponsor['category'], string> = {
  investment: 'Investment',
  'tax-software': 'Tax Software',
  banking: 'Banking',
  accounting: 'Accounting',
  insurance: 'Insurance',
  education: 'Education',
}

export function SponsoredRecommendation({ sponsors, className = '', queryContext }: SponsoredRecommendationProps) {
  const hasTrackedImpression = useRef(false)

  // Track impressions when component mounts
  useEffect(() => {
    if (hasTrackedImpression.current || sponsors.length === 0) return
    hasTrackedImpression.current = true

    sponsors.forEach(sponsor => {
      trackSponsorEvent('impression', sponsor.id, {
        pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        queryContext,
      })
    })
  }, [sponsors, queryContext])

  // Handle click tracking
  const handleClick = (sponsor: Sponsor) => {
    trackSponsorEvent('click', sponsor.id, {
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      queryContext,
    })
  }

  if (!sponsors || sponsors.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`mt-4 ${className}`}
    >
      {/* Disclosure header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
            Sponsored
          </span>
          <span className="text-xs text-slate-500">Recommended for you</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Info className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p className="text-xs">
                Ads help keep Tax Radar free. We may earn a commission if you sign up through these links.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Sponsor cards */}
      <div className={`grid gap-3 ${sponsors.length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.affiliate_url || sponsor.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="group block"
            onClick={() => handleClick(sponsor)}
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md">
              {/* Gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${categoryColors[sponsor.category]}`} />

              <div className="flex items-start gap-3">
                {/* Logo placeholder - replace with actual logos */}
                <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${categoryColors[sponsor.category]} flex items-center justify-center text-white font-bold text-sm`}>
                  {sponsor.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {sponsor.name}
                    </h4>
                    <ExternalLink className="h-3 w-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {sponsor.tagline}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                    {sponsor.description}
                  </p>
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-3 right-3">
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {categoryLabels[sponsor.category]}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Footer disclosure */}
      <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">
        Ads help keep our service free for everyone
      </p>
    </motion.div>
  )
}

// Inline ad component - smaller, for embedding in responses
export function InlineAd({ sponsor }: { sponsor: Sponsor }) {
  const handleClick = () => {
    trackSponsorEvent('click', sponsor.id, {
      pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }

  return (
    <a
      href={sponsor.affiliate_url || sponsor.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm group"
      onClick={handleClick}
    >
      <span className="text-[9px] font-semibold uppercase text-slate-400">Ad</span>
      <span className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
        {sponsor.name}
      </span>
      <ExternalLink className="h-3 w-3 text-slate-400" />
    </a>
  )
}
