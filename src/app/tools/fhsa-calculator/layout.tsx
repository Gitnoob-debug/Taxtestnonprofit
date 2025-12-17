import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FHSA Calculator 2025 - First Home Savings Account | Tax Radar',
  description: 'Calculate your FHSA contribution room and tax savings. See how much you can save for your first home with tax-free growth using the First Home Savings Account.',
  keywords: ['FHSA calculator', 'First Home Savings Account', 'FHSA 2025', 'first time home buyer', 'FHSA contribution limit'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/fhsa-calculator',
  },
  openGraph: {
    title: 'FHSA Calculator 2025 - First Home Savings Account | Tax Radar',
    description: 'Calculate your FHSA contribution room and tax savings for your first home purchase.',
    url: 'https://taxradar.ca/tools/fhsa-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=FHSA%20Calculator%202025&type=calculator',
        width: 1200,
        height: 630,
        alt: 'FHSA Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FHSA Calculator 2025 - First Home Savings Account',
    description: 'Calculate your FHSA contribution room and tax savings.',
    images: ['https://taxradar.ca/api/og?title=FHSA%20Calculator%202025&type=calculator'],
  },
}

export default function FHSACalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
