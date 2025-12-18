// Sponsor/Advertiser Configuration
// This file defines all sponsored partners and their contextual triggers

export interface Sponsor {
  id: string
  name: string
  tagline: string
  description: string
  url: string
  affiliateUrl?: string // For tracking
  logo?: string // URL to logo image
  category: 'investment' | 'tax-software' | 'banking' | 'accounting' | 'insurance' | 'education'
  // Topics that trigger this sponsor (matched against AI response content)
  triggers: string[]
  // How the AI should mention this sponsor inline (if enabled)
  inlineMention?: string
  // Whether this sponsor can appear inline in AI responses
  allowInline: boolean
  // Priority (higher = more likely to show)
  priority: number
  // Is this sponsor currently active?
  active: boolean
}

// Placeholder sponsors - replace with real partners when available
export const sponsors: Sponsor[] = [
  // Investment Platforms
  {
    id: 'wealthsimple',
    name: 'Wealthsimple',
    tagline: 'Invest smarter, not harder',
    description: 'Commission-free trading for stocks and ETFs. Open a TFSA, RRSP, or FHSA in minutes.',
    url: 'https://wealthsimple.com',
    affiliateUrl: 'https://wealthsimple.com/?ref=taxradar',
    category: 'investment',
    triggers: ['rrsp', 'tfsa', 'fhsa', 'invest', 'etf', 'stock', 'contribution room', 'registered account'],
    inlineMention: 'Many Canadians use platforms like Wealthsimple to manage their registered accounts.',
    allowInline: true,
    priority: 10,
    active: true,
  },
  {
    id: 'questrade',
    name: 'Questrade',
    tagline: 'Keep more of your money',
    description: 'Low-fee investing with free ETF purchases. Great for self-directed RRSP and TFSA accounts.',
    url: 'https://questrade.com',
    affiliateUrl: 'https://questrade.com/?ref=taxradar',
    category: 'investment',
    triggers: ['rrsp', 'tfsa', 'etf', 'dividend', 'capital gains', 'investment income', 'self-directed'],
    inlineMention: 'Questrade offers commission-free ETF purchases for self-directed investors.',
    allowInline: true,
    priority: 9,
    active: true,
  },

  // Tax Software
  {
    id: 'turbotax',
    name: 'TurboTax',
    tagline: 'File with confidence',
    description: 'Canada\'s #1 tax software. Maximum refund guaranteed. Free for simple returns.',
    url: 'https://turbotax.intuit.ca',
    affiliateUrl: 'https://turbotax.intuit.ca/?ref=taxradar',
    category: 'tax-software',
    triggers: ['file taxes', 'tax return', 'tax filing', 'netfile', 'tax software', 'efile', 'april 30', 'june 15 deadline'],
    inlineMention: 'Tax software like TurboTax can help ensure you claim all eligible deductions.',
    allowInline: true,
    priority: 10,
    active: true,
  },
  {
    id: 'wealthsimple-tax',
    name: 'Wealthsimple Tax',
    tagline: 'Free tax filing for everyone',
    description: 'Completely free tax filing software. No upsells, no hidden fees. CRA certified.',
    url: 'https://wealthsimple.com/tax',
    affiliateUrl: 'https://wealthsimple.com/tax?ref=taxradar',
    category: 'tax-software',
    triggers: ['file taxes', 'free tax software', 'tax return', 'simple return', 'netfile'],
    inlineMention: 'Wealthsimple Tax offers completely free tax filing for Canadians.',
    allowInline: true,
    priority: 9,
    active: true,
  },

  // Accounting Services
  {
    id: 'bench',
    name: 'Bench',
    tagline: 'Bookkeeping for small business',
    description: 'Professional bookkeeping and tax prep for self-employed Canadians and small businesses.',
    url: 'https://bench.co',
    affiliateUrl: 'https://bench.co/?ref=taxradar',
    category: 'accounting',
    triggers: ['self-employed', 'small business', 'bookkeeping', 'business expenses', 'sole proprietor', 'corporation', 'gst/hst'],
    inlineMention: 'Services like Bench can help self-employed individuals manage their bookkeeping.',
    allowInline: true,
    priority: 8,
    active: true,
  },

  // Banking
  {
    id: 'eq-bank',
    name: 'EQ Bank',
    tagline: 'High-interest savings made simple',
    description: 'No-fee banking with high-interest savings accounts. Great for your emergency fund.',
    url: 'https://eqbank.ca',
    affiliateUrl: 'https://eqbank.ca/?ref=taxradar',
    category: 'banking',
    triggers: ['savings account', 'interest income', 'emergency fund', 'high interest', 'gic'],
    inlineMention: 'High-interest savings accounts like EQ Bank can help grow your savings tax-efficiently.',
    allowInline: true,
    priority: 7,
    active: true,
  },

  // Insurance
  {
    id: 'policygenius',
    name: 'PolicyMe',
    tagline: 'Life insurance made simple',
    description: 'Affordable term life insurance for Canadians. Get a quote in minutes.',
    url: 'https://policyme.com',
    affiliateUrl: 'https://policyme.com/?ref=taxradar',
    category: 'insurance',
    triggers: ['life insurance', 'estate planning', 'beneficiary', 'death benefit'],
    inlineMention: 'Life insurance proceeds are generally tax-free in Canada.',
    allowInline: false,
    priority: 6,
    active: true,
  },

  // Education
  {
    id: 'coursera',
    name: 'Coursera',
    tagline: 'Learn without limits',
    description: 'Online courses in finance, accounting, and tax planning from top universities.',
    url: 'https://coursera.org',
    affiliateUrl: 'https://coursera.org/?ref=taxradar',
    category: 'education',
    triggers: ['learn', 'education', 'tuition', 'professional development'],
    inlineMention: '',
    allowInline: false,
    priority: 5,
    active: true,
  },
]

// Find relevant sponsors based on content/topic
export function findRelevantSponsors(content: string, maxResults: number = 2): Sponsor[] {
  const lowerContent = content.toLowerCase()

  const scored = sponsors
    .filter(s => s.active)
    .map(sponsor => {
      // Count how many triggers match
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

// Get a sponsor that can be mentioned inline
export function getInlineSponsor(content: string): Sponsor | null {
  const relevant = findRelevantSponsors(content, 5)
  const inlineEligible = relevant.find(s => s.allowInline && s.inlineMention)
  return inlineEligible || null
}

// Get sponsor by ID
export function getSponsorById(id: string): Sponsor | undefined {
  return sponsors.find(s => s.id === id)
}

// Get all active sponsors by category
export function getSponsorsByCategory(category: Sponsor['category']): Sponsor[] {
  return sponsors.filter(s => s.active && s.category === category)
}
