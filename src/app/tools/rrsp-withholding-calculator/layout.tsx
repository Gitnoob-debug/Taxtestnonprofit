import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RRSP Withholding Tax Calculator | Tax Radar',
  description: 'Calculate the withholding tax on RRSP withdrawals. See how much tax is deducted based on withdrawal amount and province.',
  keywords: ['RRSP withholding tax', 'RRSP withdrawal tax', 'RRSP early withdrawal', 'withholding tax calculator', 'RRSP tax deducted'],
  alternates: { canonical: 'https://taxradar.ca/tools/rrsp-withholding-calculator' },
  openGraph: {
    title: 'RRSP Withholding Tax Calculator | Tax Radar',
    description: 'Calculate the withholding tax on RRSP withdrawals.',
    url: 'https://taxradar.ca/tools/rrsp-withholding-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=RRSP%20Withholding%20Tax%20Calculator&type=calculator', width: 1200, height: 630, alt: 'RRSP Withholding Tax Calculator' }],
  },
  twitter: { card: 'summary_large_image', title: 'RRSP Withholding Tax Calculator', description: 'Calculate the withholding tax on RRSP withdrawals.', images: ['https://taxradar.ca/api/og?title=RRSP%20Withholding%20Tax%20Calculator&type=calculator'] },
}

export default function RRSPWithholdingLayout({ children }: { children: React.ReactNode }) {
  return children
}
