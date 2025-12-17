import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Refund Estimator Canada 2025 | Tax Radar',
  description: 'Estimate your Canadian tax refund or amount owing for 2025. Factor in deductions, credits, and withholdings to see if you\'ll get money back.',
  keywords: ['tax refund calculator', 'tax refund estimator', 'Canada tax refund 2025', 'will I get a refund', 'tax owing calculator'],
  alternates: { canonical: 'https://taxradar.ca/tools/tax-refund-estimator' },
  openGraph: {
    title: 'Tax Refund Estimator Canada 2025 | Tax Radar',
    description: 'Estimate your Canadian tax refund or amount owing for 2025.',
    url: 'https://taxradar.ca/tools/tax-refund-estimator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Tax%20Refund%20Estimator%202025&type=calculator', width: 1200, height: 630, alt: 'Tax Refund Estimator Canada 2025' }],
  },
  twitter: { card: 'summary_large_image', title: 'Tax Refund Estimator Canada 2025', description: 'Estimate your Canadian tax refund or amount owing for 2025.', images: ['https://taxradar.ca/api/og?title=Tax%20Refund%20Estimator%202025&type=calculator'] },
}

export default function TaxRefundEstimatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
