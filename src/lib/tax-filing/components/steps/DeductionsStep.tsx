'use client'

import { TaxReturnHook } from '../../useTaxReturn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '../../tax-engine'
import { RRSP_LIMIT_2025, FHSA_ANNUAL_LIMIT } from '@/lib/canadianTaxData'
import {
  PiggyBank,
  Home,
  Baby,
  Briefcase,
  TrendingDown,
  Heart,
  Truck,
  DollarSign
} from 'lucide-react'

interface DeductionsStepProps {
  hook: TaxReturnHook
}

export function DeductionsStep({ hook }: DeductionsStepProps) {
  const { taxReturn, updateDeductions, quickEstimate } = hook
  const { deductions } = taxReturn

  // Calculate total deductions
  const totalDeductions =
    (deductions.line20800_rrspContribution || 0) +
    (deductions.line20810_fhsaContribution || 0) +
    (deductions.line21200_unionDues || 0) +
    (deductions.line21400_childCareExpenses || 0) +
    (deductions.line21900_movingExpenses || 0) +
    (deductions.line22000_supportPayments || 0) +
    (deductions.line22100_carryingCharges || 0) +
    (deductions.line22900_employmentExpenses || 0) +
    (deductions.line23200_otherDeductions || 0)

  // Estimated tax savings
  const marginalRate = quickEstimate?.marginalRate || 0.3
  const estimatedSavings = totalDeductions * marginalRate

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Deductions</p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                {formatCurrency(totalDeductions)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Estimated Tax Savings</p>
              <p className="text-xl font-semibold text-green-600">
                ~{formatCurrency(estimatedSavings)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deductions Accordion */}
      <Accordion type="multiple" defaultValue={['rrsp', 'fhsa']} className="space-y-4">
        {/* RRSP */}
        <AccordionItem value="rrsp" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <PiggyBank className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">RRSP Contributions</p>
                <p className="text-sm text-muted-foreground">Registered Retirement Savings Plan</p>
              </div>
              {(deductions.line20800_rrspContribution || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line20800_rrspContribution || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rrspContribution">RRSP Contribution (Line 20800)</Label>
                  <Input
                    id="rrspContribution"
                    type="number"
                    value={deductions.line20800_rrspContribution || ''}
                    onChange={(e) => updateDeductions({ line20800_rrspContribution: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Contributions made from March 2, {taxReturn.taxYear} to March 1, {taxReturn.taxYear + 1}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rrspRoom">Available RRSP Room</Label>
                  <Input
                    id="rrspRoom"
                    type="number"
                    value={deductions.rrspContributionRoom || ''}
                    onChange={(e) => updateDeductions({ rrspContributionRoom: parseFloat(e.target.value) || 0 })}
                    placeholder={RRSP_LIMIT_2025.toString()}
                  />
                  <p className="text-xs text-muted-foreground">
                    Check your Notice of Assessment for your limit
                  </p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-sm">
                <p className="font-medium text-blue-700 dark:text-blue-300">2025 RRSP Limit: {formatCurrency(RRSP_LIMIT_2025)}</p>
                <p className="text-blue-600 dark:text-blue-400 mt-1">
                  Unused room carries forward. RRSP deadline for {taxReturn.taxYear} taxes is March 1, {taxReturn.taxYear + 1}.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* FHSA */}
        <AccordionItem value="fhsa" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Home className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">First Home Savings Account (FHSA)</p>
                <p className="text-sm text-muted-foreground">Tax-free savings for first home</p>
              </div>
              {(deductions.line20810_fhsaContribution || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line20810_fhsaContribution || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fhsaContribution">FHSA Contribution (Line 20810)</Label>
                <Input
                  id="fhsaContribution"
                  type="number"
                  value={deductions.line20810_fhsaContribution || ''}
                  onChange={(e) => updateDeductions({ line20810_fhsaContribution: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                  max={FHSA_ANNUAL_LIMIT}
                />
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-sm">
                <p className="font-medium text-purple-700 dark:text-purple-300">Annual Limit: {formatCurrency(FHSA_ANNUAL_LIMIT)}</p>
                <p className="text-purple-600 dark:text-purple-400 mt-1">
                  Lifetime limit of $40,000. Unused room can carry forward up to $8,000.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Child Care */}
        <AccordionItem value="childcare" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                <Baby className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Child Care Expenses</p>
                <p className="text-sm text-muted-foreground">Daycare, camps, nanny costs</p>
              </div>
              {(deductions.line21400_childCareExpenses || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line21400_childCareExpenses || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="childCare">Child Care Expenses (Line 21400)</Label>
                <Input
                  id="childCare"
                  type="number"
                  value={deductions.line21400_childCareExpenses || ''}
                  onChange={(e) => updateDeductions({ line21400_childCareExpenses: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-lg text-sm">
                <p className="font-medium text-pink-700 dark:text-pink-300">Limits per child:</p>
                <ul className="text-pink-600 dark:text-pink-400 mt-1 list-disc list-inside">
                  <li>$8,000 for children under 7</li>
                  <li>$5,000 for children 7-16</li>
                  <li>$11,000 for children with disabilities</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Employment Expenses */}
        <AccordionItem value="employment" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Briefcase className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Employment Expenses</p>
                <p className="text-sm text-muted-foreground">Work from home, union dues</p>
              </div>
              {((deductions.line21200_unionDues || 0) + (deductions.line22900_employmentExpenses || 0)) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency((deductions.line21200_unionDues || 0) + (deductions.line22900_employmentExpenses || 0))}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unionDues">Union/Professional Dues (Line 21200)</Label>
                  <Input
                    id="unionDues"
                    type="number"
                    value={deductions.line21200_unionDues || ''}
                    onChange={(e) => updateDeductions({ line21200_unionDues: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Usually shown on your T4</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="empExpenses">Other Employment Expenses (Line 22900)</Label>
                  <Input
                    id="empExpenses"
                    type="number"
                    value={deductions.line22900_employmentExpenses || ''}
                    onChange={(e) => updateDeductions({ line22900_employmentExpenses: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Requires T2200 from employer</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Moving Expenses */}
        <AccordionItem value="moving" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Truck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Moving Expenses</p>
                <p className="text-sm text-muted-foreground">Relocated for work or school</p>
              </div>
              {(deductions.line21900_movingExpenses || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line21900_movingExpenses || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="moving">Moving Expenses (Line 21900)</Label>
                <Input
                  id="moving"
                  type="number"
                  value={deductions.line21900_movingExpenses || ''}
                  onChange={(e) => updateDeductions({ line21900_movingExpenses: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-sm">
                <p className="font-medium text-orange-700 dark:text-orange-300">Eligible if:</p>
                <ul className="text-orange-600 dark:text-orange-400 mt-1 list-disc list-inside">
                  <li>You moved at least 40 km closer to a new job or school</li>
                  <li>Can only deduct against income earned at new location</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Support Payments */}
        <AccordionItem value="support" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Heart className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Support Payments</p>
                <p className="text-sm text-muted-foreground">Spousal support paid</p>
              </div>
              {(deductions.line22000_supportPayments || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line22000_supportPayments || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="support">Support Payments Made (Line 22000)</Label>
                <Input
                  id="support"
                  type="number"
                  value={deductions.line22000_supportPayments || ''}
                  onChange={(e) => updateDeductions({ line22000_supportPayments: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-sm text-red-600 dark:text-red-400">
                Note: Only spousal support is deductible. Child support is not deductible.
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Investment Expenses */}
        <AccordionItem value="carrying" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingDown className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Carrying Charges & Interest</p>
                <p className="text-sm text-muted-foreground">Investment loan interest, fees</p>
              </div>
              {(deductions.line22100_carryingCharges || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(deductions.line22100_carryingCharges || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="carrying">Carrying Charges (Line 22100)</Label>
                <Input
                  id="carrying"
                  type="number"
                  value={deductions.line22100_carryingCharges || ''}
                  onChange={(e) => updateDeductions({ line22100_carryingCharges: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-sm">
                <p className="font-medium text-emerald-700 dark:text-emerald-300">Includes:</p>
                <ul className="text-emerald-600 dark:text-emerald-400 mt-1 list-disc list-inside">
                  <li>Interest on money borrowed to invest</li>
                  <li>Investment management fees (outside registered accounts)</li>
                  <li>Accounting fees for investment income</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Other Deductions */}
        <AccordionItem value="other" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Other Deductions</p>
                <p className="text-sm text-muted-foreground">Disability supports, other</p>
              </div>
              {((deductions.line21500_disabilitySupports || 0) + (deductions.line23200_otherDeductions || 0)) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency((deductions.line21500_disabilitySupports || 0) + (deductions.line23200_otherDeductions || 0))}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="disability">Disability Supports (Line 21500)</Label>
                  <Input
                    id="disability"
                    type="number"
                    value={deductions.line21500_disabilitySupports || ''}
                    onChange={(e) => updateDeductions({ line21500_disabilitySupports: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherDed">Other Deductions (Line 23200)</Label>
                  <Input
                    id="otherDed"
                    type="number"
                    value={deductions.line23200_otherDeductions || ''}
                    onChange={(e) => updateDeductions({ line23200_otherDeductions: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
