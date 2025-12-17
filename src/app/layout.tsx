import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'TaxAssist.ca - Free Canadian Tax Calculator & AI Assistant',
    template: '%s | TaxAssist.ca',
  },
  description: 'Free Canadian tax calculators and AI-powered tax assistant. Calculate your 2025 income tax, RRSP savings, TFSA room, capital gains, and more. Get instant answers to your tax questions.',
  keywords: ['Canadian tax calculator', 'CRA', 'tax deductions', 'tax credits', 'RRSP calculator', 'TFSA calculator', 'capital gains tax', 'tax filing Canada', 'income tax Canada 2025', 'FHSA calculator'],
  authors: [{ name: 'TaxAssist.ca' }],
  creator: 'TaxAssist.ca',
  publisher: 'TaxAssist.ca',
  metadataBase: new URL('https://taxassist.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TaxAssist.ca - Free Canadian Tax Calculator & AI Assistant',
    description: 'Free Canadian tax calculators and AI-powered tax assistant for 2025. RRSP, TFSA, income tax, capital gains, and more.',
    type: 'website',
    locale: 'en_CA',
    siteName: 'TaxAssist.ca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxAssist.ca - Free Canadian Tax Calculator',
    description: 'Free Canadian tax calculators and AI-powered tax assistant for 2025.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} gradient-mesh min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  )
}
