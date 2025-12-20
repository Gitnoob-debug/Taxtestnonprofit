import { Metadata } from 'next'
import { MyDocumentsPage } from '@/components/MyDocumentsPage'

export const metadata: Metadata = {
  title: 'Document Dashboard | Tax Radar',
  description: 'View your tax documents at a glance. Track income, deductions, and missing documents for filing.',
}

export default function DocumentsPage() {
  return <MyDocumentsPage />
}
