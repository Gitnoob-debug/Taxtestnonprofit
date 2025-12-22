'use client'

import { useState, useEffect } from 'react'
import { TaxReturnHook } from '../../useTaxReturn'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { formatCurrency, formatPercent } from '../../tax-engine'
import { PROVINCE_NAMES } from '@/lib/canadianTaxData'
import {
  FileText,
  Download,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  User,
  DollarSign,
  Receipt,
  Gift,
  ChevronRight,
  Printer,
  Copy,
  Check
} from 'lucide-react'

interface ReviewStepProps {
  hook: TaxReturnHook
}

export function ReviewStep({ hook }: ReviewStepProps) {
  const { taxReturn, recalculate, calculation, t1FormData, quickEstimate } = hook
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('summary')

  // Recalculate on mount
  useEffect(() => {
    recalculate()
  }, [])

  const calc = calculation || quickEstimate
  const { personalInfo, income, deductions, credits } = taxReturn

  // Check completion status
  const completionChecks = [
    { label: 'Personal information', complete: !!personalInfo.firstName && !!personalInfo.sin },
    { label: 'Province of residence', complete: !!personalInfo.provinceOfResidence },
    { label: 'Income reported', complete: income.t4Slips.length > 0 || income.selfEmployment.length > 0 || (income.other.line14300_otherTaxable || 0) > 0 }
  ]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!calc) {
    return (
      <div className="text-center py-12">
        <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
        <p className="text-lg font-medium">Calculating your return...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Result Card */}
      <Card className={calc.refund > 0
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-300 dark:border-green-700'
        : calc.balanceOwing > 0
        ? 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 border-orange-300 dark:border-orange-700'
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-300 dark:border-blue-700'
      }>
        <CardContent className="p-8 text-center">
          {calc.refund > 0 ? (
            <>
              <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-green-600 dark:text-green-400" />
              <p className="text-lg text-green-700 dark:text-green-300 font-medium">Estimated Refund</p>
              <p className="text-5xl font-bold text-green-600 dark:text-green-400 mt-2">
                {formatCurrency(calc.refund)}
              </p>
            </>
          ) : calc.balanceOwing > 0 ? (
            <>
              <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-orange-600 dark:text-orange-400" />
              <p className="text-lg text-orange-700 dark:text-orange-300 font-medium">Balance Owing</p>
              <p className="text-5xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                {formatCurrency(calc.balanceOwing)}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">Due by April 30, {taxReturn.taxYear + 1}</p>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <p className="text-lg text-blue-700 dark:text-blue-300 font-medium">Balanced</p>
              <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mt-2">$0.00</p>
            </>
          )}

          <div className="flex justify-center gap-8 mt-6 text-sm">
            <div>
              <p className="text-muted-foreground">Effective Rate</p>
              <p className="font-semibold text-lg">{formatPercent(calc.effectiveRate)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Marginal Rate</p>
              <p className="font-semibold text-lg">{formatPercent(calc.marginalRate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      {calc.optimizations && calc.optimizations.length > 0 && (
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
              <Lightbulb className="h-5 w-5" />
              Tax Optimization Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calc.optimizations.map((opt, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg">
                <Badge variant="outline" className="mt-0.5">
                  {opt.type.toUpperCase()}
                </Badge>
                <div className="flex-1">
                  <p className="font-medium">{opt.description}</p>
                  <p className="text-sm text-muted-foreground mt-1">{opt.actionRequired}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Potential Savings</p>
                  <p className="font-semibold text-green-600">{formatCurrency(opt.potentialSavings)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="t1-lines">T1 Lines</TabsTrigger>
          <TabsTrigger value="breakdown">Tax Breakdown</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Return Summary
              </CardTitle>
              <CardDescription>
                {taxReturn.taxYear} Tax Return for {personalInfo.firstName} {personalInfo.lastName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Income Summary */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <DollarSign className="h-4 w-4" />
                  Income
                </h4>
                <div className="space-y-2 pl-6">
                  {income.t4Slips.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Employment Income ({income.t4Slips.length} T4{income.t4Slips.length > 1 ? 's' : ''})</span>
                      <span>{formatCurrency(income.t4Slips.reduce((s, t) => s + t.box14_employmentIncome, 0))}</span>
                    </div>
                  )}
                  {income.selfEmployment.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Self-Employment Income</span>
                      <span>{formatCurrency(income.selfEmployment.reduce((s, b) => s + b.netIncome, 0))}</span>
                    </div>
                  )}
                  {income.t5Slips.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Investment Income</span>
                      <span>{formatCurrency(income.t5Slips.reduce((s, t) => s + (t.box14_otherInterest || 0) + (t.box10_actualDividends || 0), 0))}</span>
                    </div>
                  )}
                  {income.capitalGains.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Capital Gains (taxable portion)</span>
                      <span>{formatCurrency(income.capitalGains.reduce((s, g) => s + Math.max(0, g.proceeds - g.acb), 0) * 0.5)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total Income (Line 15000)</span>
                    <span>{formatCurrency(calc.totalIncome)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions Summary */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Receipt className="h-4 w-4" />
                  Deductions
                </h4>
                <div className="space-y-2 pl-6">
                  {(deductions.line20800_rrspContribution || 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>RRSP Contributions</span>
                      <span>-{formatCurrency(deductions.line20800_rrspContribution || 0)}</span>
                    </div>
                  )}
                  {(deductions.line20810_fhsaContribution || 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>FHSA Contributions</span>
                      <span>-{formatCurrency(deductions.line20810_fhsaContribution || 0)}</span>
                    </div>
                  )}
                  {(deductions.line21400_childCareExpenses || 0) > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Child Care Expenses</span>
                      <span>-{formatCurrency(deductions.line21400_childCareExpenses || 0)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Net Income (Line 23600)</span>
                    <span>{formatCurrency(calc.netIncome)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Taxable Income (Line 26000)</span>
                    <span>{formatCurrency(calc.taxableIncome)}</span>
                  </div>
                </div>
              </div>

              {/* Tax Calculation */}
              <div>
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4" />
                  Tax Calculation
                </h4>
                <div className="space-y-2 pl-6">
                  <div className="flex justify-between text-sm">
                    <span>Federal Tax</span>
                    <span>{formatCurrency(calc.federalTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Provincial Tax ({PROVINCE_NAMES[personalInfo.provinceOfResidence]})</span>
                    <span>{formatCurrency(calc.provincialTax)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total Tax</span>
                    <span>{formatCurrency(calc.totalTax)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Tax Already Deducted</span>
                    <span>-{formatCurrency(calc.taxDeductedAtSource)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{calc.refund > 0 ? 'Refund' : 'Balance Owing'}</span>
                    <span className={calc.refund > 0 ? 'text-green-600' : 'text-orange-600'}>
                      {formatCurrency(calc.refund > 0 ? calc.refund : calc.balanceOwing)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* T1 Lines Tab */}
        <TabsContent value="t1-lines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                T1 Form Line-by-Line
              </CardTitle>
              <CardDescription>
                These are the exact values to enter on your T1 General
              </CardDescription>
            </CardHeader>
            <CardContent>
              {t1FormData && (
                <div className="space-y-6">
                  {/* Income Section */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 pb-2 border-b">Total Income</h4>
                    <div className="space-y-2">
                      <T1Line
                        line="10100"
                        label="Employment income"
                        value={t1FormData.income.line10100_employmentIncome}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="12000"
                        label="Taxable amount of dividends"
                        value={t1FormData.income.line12000_taxableDividends}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="12100"
                        label="Interest and other investment income"
                        value={t1FormData.income.line12100_interestIncome}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="12700"
                        label="Taxable capital gains"
                        value={t1FormData.income.line12700_capitalGains}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="13500"
                        label="Self-employment income (gross)"
                        value={t1FormData.income.line13500_selfEmploymentGross}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="13700"
                        label="Self-employment income (net)"
                        value={t1FormData.income.line13700_selfEmploymentNet}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="15000"
                        label="Total income"
                        value={t1FormData.income.line15000_totalIncome}
                        onCopy={copyToClipboard}
                        copied={copied}
                        highlight
                      />
                    </div>
                  </div>

                  {/* Net Income Section */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 pb-2 border-b">Net Income</h4>
                    <div className="space-y-2">
                      <T1Line
                        line="20800"
                        label="RRSP deduction"
                        value={t1FormData.netIncome.line20800_rrspDeduction}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="21200"
                        label="Union, professional dues"
                        value={t1FormData.netIncome.line21200_unionDues}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="21400"
                        label="Child care expenses"
                        value={t1FormData.netIncome.line21400_childCare}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="23600"
                        label="Net income"
                        value={t1FormData.netIncome.line23600_netIncome}
                        onCopy={copyToClipboard}
                        copied={copied}
                        highlight
                      />
                    </div>
                  </div>

                  {/* Taxable Income */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 pb-2 border-b">Taxable Income</h4>
                    <div className="space-y-2">
                      <T1Line
                        line="26000"
                        label="Taxable income"
                        value={t1FormData.taxableIncome.line26000_taxableIncome}
                        onCopy={copyToClipboard}
                        copied={copied}
                        highlight
                      />
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 pb-2 border-b">Refund or Balance Owing</h4>
                    <div className="space-y-2">
                      <T1Line
                        line="30000"
                        label="Basic personal amount"
                        value={t1FormData.summary.line30000_basicPersonalAmount}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="42000"
                        label="Net federal tax"
                        value={t1FormData.summary.line42000_netFederalTax}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="43500"
                        label="Total payable"
                        value={t1FormData.summary.line43500_totalPayable}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="43700"
                        label="Total income tax deducted"
                        value={t1FormData.summary.line43700_totalIncomeDeducted}
                        onCopy={copyToClipboard}
                        copied={copied}
                      />
                      <T1Line
                        line="48400"
                        label="Refund or balance owing"
                        value={t1FormData.summary.line48400_refundOrOwing}
                        onCopy={copyToClipboard}
                        copied={copied}
                        highlight
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Breakdown Tab */}
        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Federal Tax</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Gross Federal Tax</span>
                  <span>{formatCurrency(calc.federalTax + calc.federalCreditsValue)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Non-refundable Credits</span>
                  <span>-{formatCurrency(calc.federalCreditsValue)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Net Federal Tax</span>
                  <span>{formatCurrency(calc.federalTax)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Provincial Tax ({PROVINCE_NAMES[personalInfo.provinceOfResidence]})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Gross Provincial Tax</span>
                  <span>{formatCurrency(calc.provincialTax + calc.provincialCreditsValue)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Non-refundable Credits</span>
                  <span>-{formatCurrency(calc.provincialCreditsValue)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Net Provincial Tax</span>
                  <span>{formatCurrency(calc.provincialTax)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payroll Deductions Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Income Tax Deducted at Source</span>
                <span>{formatCurrency(calc.taxDeductedAtSource)}</span>
              </div>
              <div className="flex justify-between">
                <span>CPP Contributions</span>
                <span>{formatCurrency(calc.cppContributed)}</span>
              </div>
              <div className="flex justify-between">
                <span>EI Premiums</span>
                <span>{formatCurrency(calc.eiContributed)}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Checklist Tab */}
        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filing Checklist</CardTitle>
              <CardDescription>Make sure everything is complete before filing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completionChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-3">
                  {check.complete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                  )}
                  <span className={check.complete ? '' : 'text-orange-600'}>{check.label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">1</div>
                <div>
                  <p className="font-medium">Review your return</p>
                  <p className="text-sm text-muted-foreground">Check all amounts are correct using the T1 Lines tab</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">2</div>
                <div>
                  <p className="font-medium">File through CRA My Account or NETFILE software</p>
                  <p className="text-sm text-muted-foreground">Use the line-by-line values to complete your return</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">3</div>
                <div>
                  <p className="font-medium">Keep your records</p>
                  <p className="text-sm text-muted-foreground">Store receipts and slips for 6 years</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-4">
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" />
          Print Summary
        </Button>
        <Button variant="outline" onClick={() => {
          const data = hook.exportData()
          const blob = new Blob([data], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `tax-return-${taxReturn.taxYear}.json`
          a.click()
        }}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
    </div>
  )
}

// T1 Line Component
function T1Line({
  line,
  label,
  value,
  onCopy,
  copied,
  highlight = false
}: {
  line: string
  label: string
  value: number
  onCopy: (text: string, id: string) => void
  copied: string | null
  highlight?: boolean
}) {
  const id = `line-${line}`

  if (value === 0) return null

  return (
    <div className={`flex items-center justify-between p-2 rounded ${highlight ? 'bg-primary/5 font-medium' : ''}`}>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-mono">{line}</Badge>
        <span className="text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={highlight ? 'text-lg' : ''}>{formatCurrency(Math.abs(value))}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onCopy(Math.abs(value).toFixed(2), id)}
        >
          {copied === id ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
