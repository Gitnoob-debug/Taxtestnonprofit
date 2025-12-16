import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from 'sonner'
import { SpeedInsights } from '@vercel/speed-insights/next'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  )
}
