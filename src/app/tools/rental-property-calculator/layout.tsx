import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rental Property Tax Calculator Canada | Tax Radar',
  description: 'Calculate taxes and cash flow on rental property income in Canada. Factor in mortgage interest, depreciation, and expenses.',
  keywords: ['rental property calculator', 'rental income tax Canada', 'rental property tax', 'landlord tax calculator', 'T776 rental income'],
  alternates: { canonical: 'https://taxradar.ca/tools/rental-property-calculator' },
  openGraph: {
    title: 'Rental Property Tax Calculator | Tax Radar',
    description: 'Calculate taxes and cash flow on rental property income in Canada.',
    url: 'https://taxradar.ca/tools/rental-property-calculator',
    siteName: 'Tax Radar',
    locale: 'en_CA',
    type: 'website',
    images: [{ url: 'https://taxradar.ca/api/og?title=Rental%20Property%20Calculator&type=calculator', width: 1200, height: 630, alt: 'Rental Property Tax Calculator' }],
  },
  twitter: { card: 'summary_large_image', title: 'Rental Property Tax Calculator', description: 'Calculate taxes on rental property income in Canada.', images: ['https://taxradar.ca/api/og?title=Rental%20Property%20Calculator&type=calculator'] },
}

export default function RentalPropertyLayout({ children }: { children: React.ReactNode }) {
  return children
}
