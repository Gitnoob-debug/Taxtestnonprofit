import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marginal Tax Rate Calculator Canada 2025 | Tax Radar',
  description: 'Calculate your marginal tax rate for 2025. See exactly how much tax you\'ll pay on your next dollar of income in any Canadian province or territory.',
  keywords: ['marginal tax rate calculator', 'tax brackets Canada', 'marginal rate 2025', 'tax on next dollar', 'Canadian tax brackets'],
  alternates: { canonical: 'https://taxradar.ca/tools/marginal-tax-calculator' },
  openGraph: {
    title: 'Marginal Tax Rate Calculator Canada 2025 | Tax Radar',
    description: 'Calculate your marginal tax rate for 2025. See how much tax you\'ll pay on your next dollar.',
    url: 'https://taxradar.ca/tools/marginal-tax-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Marginal%20Tax%20Rate%20Calculator&type=calculator', width: 1200, height: 630, alt: 'Marginal Tax Rate Calculator Canada 2025' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Marginal Tax Rate Calculator Canada 2025',
    description: 'Calculate your marginal tax rate for 2025.',
    images: ['https://taxradar.ca/api/og?title=Marginal%20Tax%20Rate%20Calculator&type=calculator'],
  },
}

export default function MarginalTaxCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
