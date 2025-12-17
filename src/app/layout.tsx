import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Canadian Tax Assistant - AI-Powered Tax Help',
  description: 'Get personalized Canadian tax advice powered by official CRA documents. Ask questions about deductions, credits, forms, and filing requirements.',
  keywords: ['Canadian taxes', 'CRA', 'tax deductions', 'tax credits', 'RRSP', 'TFSA', 'tax filing', 'Canada Revenue Agency'],
  openGraph: {
    title: 'Canadian Tax Assistant - AI-Powered Tax Help',
    description: 'Get personalized Canadian tax advice powered by official CRA documents.',
    type: 'website',
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
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster position="top-center" />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
