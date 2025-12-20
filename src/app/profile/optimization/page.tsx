import { Metadata } from 'next'
import { TaxOptimizationReport } from '@/components/TaxOptimizationReport'

export const metadata: Metadata = {
  title: 'Tax Optimization Report | Tax Radar',
  description: 'Get personalized tax-saving strategies based on your profile and documents.',
}

export default function OptimizationPage() {
  return <TaxOptimizationReport />
}
