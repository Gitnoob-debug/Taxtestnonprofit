import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OAS Clawback Calculator 2025 | Tax Radar',
  description: 'Calculate Old Age Security clawback based on your income. See if you\'ll have to repay OAS and strategies to minimize clawback.',
  keywords: ['OAS clawback calculator', 'Old Age Security', 'OAS recovery tax', 'OAS clawback threshold', 'OAS 2025'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/oas-clawback-calculator',
  },
  openGraph: {
    title: 'OAS Clawback Calculator 2025 | Tax Radar',
    description: 'Calculate Old Age Security clawback based on your income.',
    url: 'https://taxradar.ca/tools/oas-clawback-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=OAS%20Clawback%20Calculator%202025&type=calculator', width: 1200, height: 630, alt: 'OAS Clawback Calculator 2025' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OAS Clawback Calculator 2025',
    description: 'Calculate Old Age Security clawback based on your income.',
    images: ['https://taxradar.ca/api/og?title=OAS%20Clawback%20Calculator%202025&type=calculator'],
  },
}

export default function OASCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
