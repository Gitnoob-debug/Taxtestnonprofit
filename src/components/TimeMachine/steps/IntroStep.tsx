'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Search, FileText, TrendingUp, Shield, CheckCircle2 } from 'lucide-react'

interface IntroStepProps {
  onStart: () => void
}

export function IntroStep({ onStart }: IntroStepProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Tax Time Machine</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Canadians leave an average of <span className="font-semibold text-primary">$1,200</span> on the table every year.
          Let&apos;s find what you missed.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <Search className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered Detection</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes your past returns to find missed deductions and credits
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold">Up to 10 Years Back</h3>
              <p className="text-sm text-muted-foreground">
                The CRA allows adjustments for the past 10 tax years
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold">Amendment Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Step-by-step instructions to file T1-ADJ requests
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold">Recover Real Money</h3>
              <p className="text-sm text-muted-foreground">
                Get refunds for taxes you overpaid in previous years
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What We Check */}
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">What we check for:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              'Home office expenses (COVID years)',
              'Medical expense credits',
              'Unused RRSP contribution room',
              'Childcare expense deductions',
              'Charitable donation credits',
              'Student loan interest',
              'Moving expense deductions',
              'Disability tax credit',
              'Caregiver credits',
              'Employment expenses',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Button size="lg" onClick={onStart} className="text-lg px-8">
          Scan My Tax History
        </Button>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>Bank-level encryption</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Free to use</span>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-center text-muted-foreground max-w-2xl mx-auto">
        This tool provides educational guidance only and does not constitute tax advice.
        Results are estimates based on the information you provide. Always consult with a
        qualified tax professional before making decisions about your taxes.
      </p>
    </div>
  )
}
