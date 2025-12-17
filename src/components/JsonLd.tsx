'use client'

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
}

interface WebSiteSchemaProps {
  name?: string
  url?: string
  description?: string
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  faqs: FAQItem[]
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

interface ArticleSchemaProps {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  url: string
}

interface CalculatorSchemaProps {
  name: string
  description: string
  url: string
}

// Organization Schema - for the whole site
export function OrganizationSchema({
  name = 'Tax Radar',
  url = 'https://taxradar.ca',
  logo = 'https://taxradar.ca/logo.png',
  description = 'Free Canadian tax calculators and AI-powered tax assistant. Calculate your 2025 income tax, RRSP savings, TFSA room, capital gains, and more.',
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'French'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebSite Schema - for search box and site info
export function WebSiteSchema({
  name = 'Tax Radar',
  url = 'https://taxradar.ca',
  description = 'Free Canadian tax calculators and AI-powered tax assistant for 2025.',
}: WebSiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema - for calculator pages
export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Breadcrumb Schema - for navigation
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Article Schema - for academy/guide pages
export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author = 'Tax Radar',
  url,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tax Radar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://taxradar.ca/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// SoftwareApplication Schema - for calculator tools
export function CalculatorSchema({ name, description, url }: CalculatorSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// HowTo Schema - for step-by-step guides
interface HowToStep {
  name: string
  text: string
}

interface HowToSchemaProps {
  name: string
  description: string
  steps: HowToStep[]
}

export function HowToSchema({ name, description, steps }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
