import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Self-Employment Tax Calculator Canada 2025 | Tax Radar',
  description: 'Calculate taxes on self-employment income including CPP contributions. See your net income after federal and provincial taxes for freelancers and business owners.',
  keywords: ['self-employment tax calculator', 'freelancer tax Canada', 'self-employed CPP', 'business income tax', 'contractor tax calculator'],
  alternates: {
    canonical: 'https://taxradar.ca/tools/self-employment-tax-calculator',
  },
  openGraph: {
    title: 'Self-Employment Tax Calculator Canada 2025 | Tax Radar',
    description: 'Calculate taxes on self-employment income including CPP contributions.',
    url: 'https://taxradar.ca/tools/self-employment-tax-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Self-Employment%20Tax%20Calculator&type=calculator', width: 1200, height: 630, alt: 'Self-Employment Tax Calculator Canada 2025' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Self-Employment Tax Calculator Canada 2025',
    description: 'Calculate taxes on self-employment income including CPP contributions.',
    images: ['https://taxradar.ca/api/og?title=Self-Employment%20Tax%20Calculator&type=calculator'],
  },
}

export default function SelfEmploymentCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children
}
