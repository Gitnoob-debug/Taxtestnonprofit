import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RRSP Calculator Canada 2025 - Tax Savings & Contribution Room | Tax Radar',
  description: 'Calculate your RRSP contribution room and tax savings for 2025. See how much you can contribute and how much tax you\'ll save with our free RRSP calculator.',
  keywords: ['RRSP calculator', 'RRSP contribution room', 'RRSP tax savings', 'RRSP 2025', 'registered retirement savings plan'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/rrsp-calculator',
  },
  openGraph: {
    title: 'RRSP Calculator Canada 2025 | Tax Radar',
    description: 'Calculate your RRSP contribution room and tax savings for 2025. See how much you can contribute and save.',
    url: 'https://taxradar.ca/tools/rrsp-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=RRSP%20Calculator%202025&type=calculator',
        width: 1200,
        height: 630,
        alt: 'RRSP Calculator Canada 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RRSP Calculator Canada 2025',
    description: 'Calculate your RRSP contribution room and tax savings for 2025.',
    images: ['https://taxradar.ca/api/og?title=RRSP%20Calculator%202025&type=calculator'],
  },
}

export default function RRSPCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
