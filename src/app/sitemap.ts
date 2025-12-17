import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://taxradar.ca'

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/academy`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  // Calculator/Tools pages
  const calculatorPages = [
    'tax-calculator',
    'marginal-tax-calculator',
    'tax-refund-estimator',
    'rrsp-calculator',
    'rrsp-vs-tfsa',
    'tfsa-room-calculator',
    'rrsp-withholding-calculator',
    'hbp-repayment-calculator',
    'capital-gains-calculator',
    'dividend-tax-calculator',
    'rental-property-calculator',
    'fhsa-calculator',
    'self-employment-tax-calculator',
    'salary-vs-dividend-calculator',
    'cpp-retirement-calculator',
    'oas-clawback-calculator',
  ].map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Academy/Learning pages (comprehensive tax guides)
  const academyPages = [
    // Tax Filing & CRA
    'how-to-file-taxes-canada',
    'tax-filing-deadlines',
    'amend-tax-return',
    'cra-my-account',
    'cra-audit',
    'notice-of-assessment',
    'tax-refund-status',
    't4-slip-guide',
    't5-investment-income',
    'instalment-payments',

    // Tax Deductions & Credits
    'tax-deductions-credits',
    'medical-expenses',
    'charitable-donations',
    'childcare-expenses',
    'education-tax-credits',
    'disability-tax-credit',
    'caregiver-tax-credits',
    'eligible-dependant-credit',
    'home-office-deduction',
    'home-office-expenses',
    'moving-expenses',
    'employment-expenses-deductions',
    'union-professional-dues',

    // Registered Accounts
    'rrsp-guide',
    'rrsp-complete-guide',
    'tfsa-guide',
    'resp-education-savings',
    'rrif-guide',
    'lif-lira-guide',
    'rrsp-meltdown-strategies',

    // Investment & Capital Gains
    'capital-gains-tax-canada',
    'dividend-tax-credit',
    'interest-income-tax',
    'mutual-funds-etf-tax',
    'stock-options-tax',
    'tax-loss-harvesting',
    'cryptocurrency-tax-guide',
    'foreign-investment-reporting',

    // Real Estate
    'rental-income-guide',
    'rental-income-tax',
    'principal-residence-exemption',
    'first-time-home-buyer-tax-benefits',

    // Self-Employment & Business
    'self-employment-tax',
    'self-employment-taxes',
    'gig-economy-taxes',
    'contractor-vs-employee',
    'incorporation-vs-sole-proprietor',
    'incorporation-small-business',
    'small-business-deductions',
    'gst-hst-guide',

    // Employment Income
    'taxable-benefits-guide',
    'severance-pay-tax',
    'remote-work-tax',

    // Family & Life Events
    'marriage-common-law-taxes',
    'divorce-separation-taxes',
    'child-support-tax',
    'spousal-support-tax',
    'family-income-splitting',
    'pension-income-splitting',
    'prescribed-rate-loans',
    'maternity-parental-leave-tax',
    'death-estate-taxes',
    'inheritance-taxes',

    // Retirement & Benefits
    'cpp-benefits-tax',
    'oas-benefits-tax',
    'ei-benefits-tax',
    'defined-benefit-pension-tax',
    'annuity-tax-guide',
    'retirement-income-planning',

    // Government Benefits
    'canada-child-benefit',
    'canada-workers-benefit',
    'gst-hst-credit',
    'climate-action-incentive',

    // Provincial Tax Guides
    'ontario-tax-guide',
    'quebec-tax-guide',
    'bc-tax-guide',
    'alberta-tax-guide',
    'provincial-tax-rates-comparison',
    'provincial-tax-credits-comparison',

    // Special Situations
    'student-tax-guide',
    'immigration-taxes',
    'leaving-canada-taxes',
    'foreign-income-guide',
  ].map((slug) => ({
    url: `${baseUrl}/academy/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...mainPages, ...calculatorPages, ...academyPages]
}
