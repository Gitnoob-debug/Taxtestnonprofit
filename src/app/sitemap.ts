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
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Calculator pages
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

  return [...mainPages, ...calculatorPages]
}
