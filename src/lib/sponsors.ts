// Sponsor/Advertiser System
// Fetches from Supabase with fallback to hardcoded data

export interface Sponsor {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  affiliate_url?: string
  logo_url?: string
  category: 'investment' | 'tax-software' | 'banking' | 'accounting' | 'insurance' | 'education'
  triggers: string[]
  inline_mention?: string
  allow_inline: boolean
  priority: number
  active: boolean
}

// Fallback sponsors (used when Supabase is unavailable)
const fallbackSponsors: Sponsor[] = [
  {
    id: 'wealthsimple',
    name: 'Wealthsimple',
    tagline: 'Invest smarter, not harder',
    description: 'Commission-free trading for stocks and ETFs. Open a TFSA, RRSP, or FHSA in minutes.',
    url: 'https://wealthsimple.com',
    affiliate_url: 'https://wealthsimple.com/?ref=taxradar',
    category: 'investment',
    triggers: ['rrsp', 'tfsa', 'fhsa', 'invest', 'etf', 'stock', 'contribution room', 'registered account'],
    inline_mention: 'Many Canadians use platforms like Wealthsimple to manage their registered accounts.',
    allow_inline: true,
    priority: 10,
    active: true,
  },
  {
    id: 'turbotax',
    name: 'TurboTax',
    tagline: 'File with confidence',
    description: 'Canada\'s #1 tax software. Maximum refund guaranteed. Free for simple returns.',
    url: 'https://turbotax.intuit.ca',
    affiliate_url: 'https://turbotax.intuit.ca/?ref=taxradar',
    category: 'tax-software',
    triggers: ['file taxes', 'tax return', 'tax filing', 'netfile', 'tax software', 'efile', 'april 30'],
    inline_mention: 'Tax software like TurboTax can help ensure you claim all eligible deductions.',
    allow_inline: true,
    priority: 10,
    active: true,
  },
]

// Cache for sponsors (client-side)
let sponsorCache: Sponsor[] | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fetch sponsors from API (for client-side use)
export async function fetchSponsors(query?: string, limit: number = 2): Promise<Sponsor[]> {
  try {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    params.set('limit', limit.toString())

    const response = await fetch(`/api/sponsors?${params.toString()}`)

    if (!response.ok) {
      console.warn('[Sponsors] API returned error, using fallback')
      return findRelevantSponsorsLocal(query || '', limit)
    }

    const data = await response.json()
    return data.sponsors || []
  } catch (error) {
    console.warn('[Sponsors] Failed to fetch from API, using fallback:', error)
    return findRelevantSponsorsLocal(query || '', limit)
  }
}

// Local fallback matching (when API unavailable)
function findRelevantSponsorsLocal(content: string, maxResults: number = 2): Sponsor[] {
  const lowerContent = content.toLowerCase()

  const scored = fallbackSponsors
    .filter(s => s.active)
    .map(sponsor => {
      const matchCount = sponsor.triggers.filter(trigger =>
        lowerContent.includes(trigger.toLowerCase())
      ).length

      return {
        sponsor,
        score: matchCount * sponsor.priority
      }
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, maxResults).map(item => item.sponsor)
}

// Synchronous version for server-side use (uses fallback data)
export function findRelevantSponsors(content: string, maxResults: number = 2): Sponsor[] {
  return findRelevantSponsorsLocal(content, maxResults)
}

// Get a sponsor that can be mentioned inline (synchronous fallback)
export function getInlineSponsor(content: string): Sponsor | null {
  const relevant = findRelevantSponsorsLocal(content, 5)
  const inlineEligible = relevant.find(s => s.allow_inline && s.inline_mention)
  return inlineEligible || null
}

// Track impression or click
export async function trackSponsorEvent(
  type: 'impression' | 'click',
  sponsorId: string,
  context?: {
    sessionId?: string
    pageUrl?: string
    queryContext?: string
    userId?: string
  }
): Promise<void> {
  try {
    await fetch('/api/sponsors/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        sponsorId,
        ...context,
      }),
    })
  } catch (error) {
    // Silently fail - tracking shouldn't break the app
    console.warn('[Sponsors] Failed to track event:', error)
  }
}

// Get sponsor by ID
export function getSponsorById(id: string): Sponsor | undefined {
  return fallbackSponsors.find(s => s.id === id)
}

// Get all active sponsors by category (fallback)
export function getSponsorsByCategory(category: Sponsor['category']): Sponsor[] {
  return fallbackSponsors.filter(s => s.active && s.category === category)
}
