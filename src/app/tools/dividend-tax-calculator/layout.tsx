import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dividend Tax Calculator Canada 2025 | Tax Radar',
  description: 'Calculate tax on eligible and non-eligible Canadian dividends. See the gross-up, tax credit, and effective tax rate for your province.',
  keywords: ['dividend tax calculator', 'Canadian dividend tax', 'eligible dividend', 'non-eligible dividend', 'dividend tax credit'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/dividend-tax-calculator',
  },
  openGraph: {
    title: 'Dividend Tax Calculator Canada 2025 | Tax Radar',
    description: 'Calculate tax on eligible and non-eligible Canadian dividends with gross-up and tax credit.',
    url: 'https://taxradar.ca/tools/dividend-tax-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Dividend%20Tax%20Calculator%202025&type=calculator', width: 1200, height: 630, alt: 'Dividend Tax Calculator Canada 2025' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dividend Tax Calculator Canada 2025',
    description: 'Calculate tax on eligible and non-eligible Canadian dividends.',
    images: ['https://taxradar.ca/api/og?title=Dividend%20Tax%20Calculator%202025&type=calculator'],
  },
}

export default function DividendTaxCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
