import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TFSA Contribution Room Calculator 2025 | Tax Radar',
  description: 'Calculate your total TFSA contribution room for 2025. See your cumulative room based on when you turned 18 and became a Canadian resident.',
  keywords: ['TFSA calculator', 'TFSA contribution room', 'TFSA room 2025', 'tax free savings account', 'TFSA limit'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/tfsa-room-calculator',
  },
  openGraph: {
    title: 'TFSA Contribution Room Calculator 2025 | Tax Radar',
    description: 'Calculate your total TFSA contribution room for 2025. See your cumulative room based on when you turned 18.',
    url: 'https://taxradar.ca/tools/tfsa-room-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=TFSA%20Room%20Calculator%202025&type=calculator',
        width: 1200,
        height: 630,
        alt: 'TFSA Contribution Room Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TFSA Contribution Room Calculator 2025',
    description: 'Calculate your total TFSA contribution room for 2025.',
    images: ['https://taxradar.ca/api/og?title=TFSA%20Room%20Calculator%202025&type=calculator'],
  },
}

export default function TFSACalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
