import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tax Academy - Free Canadian Tax Guides | Tax Radar',
  description: 'Comprehensive guides on Canadian taxes. From RRSP and TFSA basics to advanced tax planning strategies. 80+ free tax guides for individuals and businesses.',
  keywords: ['Canadian tax guide', 'tax education', 'RRSP guide', 'TFSA guide', 'tax deductions', 'tax credits Canada', 'self-employment tax', 'capital gains'],
  alternates: {
    canonical: 'https://taxradar.ca/academy',
  },
  openGraph: {
    title: 'Tax Academy - Free Canadian Tax Guides | Tax Radar',
    description: 'Comprehensive guides on Canadian taxes. 80+ free tax guides for individuals and businesses.',
    url: 'https://taxradar.ca/academy',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: 'https://taxradar.ca/api/og?title=Tax%20Academy&subtitle=80%2B%20Free%20Canadian%20Tax%20Guides&type=academy',
        width: 1200,
        height: 630,
        alt: 'Tax Academy - Free Canadian Tax Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Academy - Free Canadian Tax Guides',
    description: 'Comprehensive guides on Canadian taxes. 80+ free tax guides.',
    images: ['https://taxradar.ca/api/og?title=Tax%20Academy&subtitle=80%2B%20Free%20Canadian%20Tax%20Guides&type=academy'],
  },
}

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
