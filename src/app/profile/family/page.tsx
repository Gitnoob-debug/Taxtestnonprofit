import { Metadata } from 'next'
import { FamilyTaxOptimizer } from '@/components/FamilyTaxOptimizer'

export const metadata: Metadata = {
  title: 'Family Tax Optimizer | Tax Radar',
  description: 'Optimize taxes across your family. Find income splitting opportunities, childcare deduction strategies, and spousal RRSP benefits.',
}

export default function FamilyPage() {
  return <FamilyTaxOptimizer />
}
