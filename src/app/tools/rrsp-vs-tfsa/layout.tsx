import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RRSP vs TFSA Calculator - Which is Better? | Tax Radar',
  description: 'Compare RRSP and TFSA to see which is better for your situation. Factor in your current and expected retirement tax brackets.',
  keywords: ['RRSP vs TFSA', 'RRSP or TFSA', 'which is better RRSP TFSA', 'TFSA vs RRSP calculator', 'registered account comparison'],
  alternates: { canonical: 'https://taxradar.ca/tools/rrsp-vs-tfsa' },
  openGraph: {
    title: 'RRSP vs TFSA Calculator | Tax Radar',
    description: 'Compare RRSP and TFSA to see which is better for your situation.',
    url: 'https://taxradar.ca/tools/rrsp-vs-tfsa',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=RRSP%20vs%20TFSA%20Calculator&type=calculator', width: 1200, height: 630, alt: 'RRSP vs TFSA Calculator' }],
  },
  twitter: { card: 'summary_large_image', title: 'RRSP vs TFSA Calculator', description: 'Compare RRSP and TFSA to see which is better for you.', images: ['https://taxradar.ca/api/og?title=RRSP%20vs%20TFSA%20Calculator&type=calculator'] },
}

export default function RRSPvsTFSALayout({ children }: { children: React.ReactNode }) {
  return children
}
