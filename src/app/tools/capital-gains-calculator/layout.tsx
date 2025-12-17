import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Capital Gains Tax Calculator Canada 2025 | Tax Radar',
  description: 'Calculate capital gains tax on investments, real estate, and other assets in Canada. See your tax using the 50% inclusion rate for 2025.',
  keywords: ['capital gains calculator', 'capital gains tax Canada', 'investment tax calculator', '50% inclusion rate', 'capital gains 2025'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/capital-gains-calculator',
  },
  openGraph: {
    title: 'Capital Gains Tax Calculator Canada 2025 | Tax Radar',
    description: 'Calculate capital gains tax on investments and real estate. See your tax using the 50% inclusion rate.',
    url: 'https://taxradar.ca/tools/capital-gains-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=Capital%20Gains%20Calculator%202025&type=calculator',
        width: 1200,
        height: 630,
        alt: 'Capital Gains Tax Calculator Canada 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Capital Gains Tax Calculator Canada 2025',
    description: 'Calculate capital gains tax on investments and real estate in Canada.',
    images: ['https://taxradar.ca/api/og?title=Capital%20Gains%20Calculator%202025&type=calculator'],
  },
}

export default function CapitalGainsCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
