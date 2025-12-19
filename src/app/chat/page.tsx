import { Metadata } from 'next'
import { TaxAssistantPage } from '@/components/TaxAssistantPage'

export const metadata: Metadata = {
  title: 'AI Tax Assistant Chat | Tax Radar',
  description:
    'Chat with our AI tax assistant trained on official CRA documents. Get instant answers about Canadian tax deductions, credits, forms, and filing requirements.',
  openGraph: {
    title: 'AI Tax Assistant Chat | Tax Radar',
    description: 'Get personalized Canadian tax advice powered by official CRA documents.',
    type: 'website',
  },
}

export default function ChatPage() {
  return <TaxAssistantPage />
}
