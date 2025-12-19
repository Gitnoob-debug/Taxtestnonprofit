import { Metadata } from 'next'
import { MyDocumentsPage } from '@/components/MyDocumentsPage'

export const metadata: Metadata = {
  title: 'My Documents | Tax Radar',
  description: 'View and manage your uploaded tax documents.',
}

export default function DocumentsPage() {
  return <MyDocumentsPage />
}
