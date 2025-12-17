import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salary vs Dividend Calculator for Business Owners | Tax Radar',
  description: 'Compare paying yourself salary vs dividends from your corporation. See the total tax impact and optimal mix for your situation.',
  keywords: ['salary vs dividend', 'business owner compensation', 'dividend vs salary calculator', 'corporation tax planning', 'small business owner'],
  alternates: { canonical: 'https://taxradar.ca/tools/salary-vs-dividend-calculator' },
  openGraph: {
    title: 'Salary vs Dividend Calculator | Tax Radar',
    description: 'Compare paying yourself salary vs dividends from your corporation.',
    url: 'https://taxradar.ca/tools/salary-vs-dividend-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Salary%20vs%20Dividend%20Calculator&type=calculator', width: 1200, height: 630, alt: 'Salary vs Dividend Calculator' }],
  },
  twitter: { card: 'summary_large_image', title: 'Salary vs Dividend Calculator', description: 'Compare salary vs dividends for business owners.', images: ['https://taxradar.ca/api/og?title=Salary%20vs%20Dividend%20Calculator&type=calculator'] },
}

export default function SalaryVsDividendLayout({ children }: { children: React.ReactNode }) {
  return children
}
