import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CPP Retirement Calculator - Estimate Your Pension | Tax Radar',
  description: 'Estimate your CPP retirement pension at age 60, 65, or 70. See how delaying or taking early CPP affects your monthly payment.',
  keywords: ['CPP calculator', 'CPP retirement pension', 'Canada Pension Plan', 'CPP at 60', 'CPP at 65', 'CPP at 70'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/cpp-retirement-calculator',
  },
  openGraph: {
    title: 'CPP Retirement Calculator | Tax Radar',
    description: 'Estimate your CPP retirement pension at age 60, 65, or 70.',
    url: 'https://taxradar.ca/tools/cpp-retirement-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=CPP%20Retirement%20Calculator&type=calculator', width: 1200, height: 630, alt: 'CPP Retirement Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPP Retirement Calculator',
    description: 'Estimate your CPP retirement pension at age 60, 65, or 70.',
    images: ['https://taxradar.ca/api/og?title=CPP%20Retirement%20Calculator&type=calculator'],
  },
}

export default function CPPCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
