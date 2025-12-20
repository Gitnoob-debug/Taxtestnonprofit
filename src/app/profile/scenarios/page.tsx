import { Metadata } from 'next'
import { ScenarioPlanner } from '@/components/ScenarioPlanner'

export const metadata: Metadata = {
  title: 'What-If Scenario Planner | Tax Radar',
  description: 'Compare different tax strategies side-by-side. See how changes to your income, deductions, and investments affect your tax bill.',
}

export default function ScenariosPage() {
  return <ScenarioPlanner />
}
