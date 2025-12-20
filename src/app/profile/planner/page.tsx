import { Metadata } from 'next'
import { MultiYearPlanner } from '@/components/MultiYearPlanner'

export const metadata: Metadata = {
  title: 'Multi-Year Tax Planner | Tax Radar',
  description: 'Project your taxes and retirement savings over the next 5-25 years. Plan for retirement, RRSP drawdown, and more.',
}

export default function PlannerPage() {
  return <MultiYearPlanner />
}
