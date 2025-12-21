import { Metadata } from 'next'
import { TimeMachineWizard } from '@/components/TimeMachine'

export const metadata: Metadata = {
  title: 'Tax Time Machine - Find Missed Deductions | Canadian Tax Assistant',
  description: 'AI-powered analysis of your past tax returns to find missed deductions and credits. Recover money you left on the table.',
  keywords: ['tax amendment', 'T1-ADJ', 'missed deductions', 'tax credits', 'CRA', 'tax recovery'],
}

export default function TimeMachinePage() {
  return (
    <main className="container py-8 px-4">
      <TimeMachineWizard />
    </main>
  )
}
