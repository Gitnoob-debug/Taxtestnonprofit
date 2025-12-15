import { Metadata } from 'next'
import { TaxAssistantPage } from '@/components/TaxAssistantPage'

export const metadata: Metadata = {
  title: 'Canadian Tax Assistant - AI-Powered Tax Help',
  description:
    'Get personalized Canadian tax advice powered by official CRA documents. Ask questions about deductions, credits, forms, and filing requirements.',
  openGraph: {
    title: 'Canadian Tax Assistant - AI-Powered Tax Help',
    description: 'Get personalized Canadian tax advice powered by official CRA documents.',
    type: 'website',
  },
}

export default function Home() {
  return <TaxAssistantPage />
}
