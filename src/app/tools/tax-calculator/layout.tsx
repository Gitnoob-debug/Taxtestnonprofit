import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canadian Income Tax Calculator 2025 | Tax Radar',
  description: 'Free Canadian income tax calculator for 2025. Calculate your federal and provincial taxes, CPP, EI, and take-home pay. All provinces and territories included.',
  keywords: ['income tax calculator', 'Canadian tax calculator 2025', 'federal tax', 'provincial tax', 'CPP calculator', 'EI calculator', 'take home pay calculator'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/tax-calculator',
  },
  openGraph: {
    title: 'Canadian Income Tax Calculator 2025 | Tax Radar',
    description: 'Free Canadian income tax calculator for 2025. Calculate your federal and provincial taxes, CPP, EI, and take-home pay.',
    url: 'https://taxradar.ca/tools/tax-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=Income%20Tax%20Calculator%202025&type=calculator',
        width: 1200,
        height: 630,
        alt: 'Canadian Income Tax Calculator 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Income Tax Calculator 2025',
    description: 'Free Canadian income tax calculator for 2025. Calculate your federal and provincial taxes, CPP, EI, and take-home pay.',
    images: ['https://taxradar.ca/api/og?title=Income%20Tax%20Calculator%202025&type=calculator'],
  },
}

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
