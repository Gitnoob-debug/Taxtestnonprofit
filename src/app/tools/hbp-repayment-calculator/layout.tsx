import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Buyers\' Plan (HBP) Repayment Calculator | Tax Radar',
  description: 'Calculate your HBP repayment schedule. Track annual minimum payments and see what happens if you miss a payment.',
  keywords: ['HBP repayment calculator', 'Home Buyers Plan', 'RRSP HBP', 'HBP repayment schedule', 'first time home buyer RRSP'],
  alternates: { canonical: 'https://taxradar.ca/tools/hbp-repayment-calculator' },
  openGraph: {
    title: 'HBP Repayment Calculator | Tax Radar',
    description: 'Calculate your Home Buyers\' Plan repayment schedule.',
    url: 'https://taxradar.ca/tools/hbp-repayment-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=HBP%20Repayment%20Calculator&type=calculator', width: 1200, height: 630, alt: 'HBP Repayment Calculator' }],
  },
  twitter: { card: 'summary_large_image', title: 'HBP Repayment Calculator', description: 'Calculate your Home Buyers\' Plan repayment schedule.', images: ['https://taxradar.ca/api/og?title=HBP%20Repayment%20Calculator&type=calculator'] },
}

export default function HBPRepaymentLayout({ children }: { children: React.ReactNode }) {
  return children
}
