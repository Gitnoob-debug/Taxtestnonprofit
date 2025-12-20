import { Metadata } from 'next'
import { TaxDashboard } from '@/components/TaxDashboard'

export const metadata: Metadata = {
  title: 'My Tax Dashboard | Tax Radar',
  description: 'Your personalized tax command center. See your tax numbers, upcoming deadlines, document readiness, and smart recommendations.',
}

export default function DashboardPage() {
  return <TaxDashboard />
}
