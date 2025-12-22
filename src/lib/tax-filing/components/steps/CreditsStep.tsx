'use client'

import { TaxReturnHook } from '../../useTaxReturn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency } from '../../tax-engine'
import {
  Stethoscope,
  Heart,
  GraduationCap,
  Accessibility,
  Users,
  Flame,
  FileSearch,
  Newspaper
} from 'lucide-react'

interface CreditsStepProps {
  hook: TaxReturnHook
}

export function CreditsStep({ hook }: CreditsStepProps) {
  const { taxReturn, updateCredits, quickEstimate } = hook
  const { credits } = taxReturn

  // Calculate total credits claimed
  const totalCredits =
    (credits.line33099_medicalExpenses || 0) +
    (credits.line34900_donations || 0) +
    (credits.line32300_tuition || 0) +
    (credits.line31600_disabilitySelf || 0) +
    (credits.line30400_eligibleDependant || 0)

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Non-Refundable Tax Credits</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                These credits reduce your tax payable. Most are calculated at 15% (federal) of the eligible amount.
                Some credits like the Basic Personal Amount are automatic.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credits Accordion */}
      <Accordion type="multiple" defaultValue={['medical', 'donations']} className="space-y-4">
        {/* Medical Expenses */}
        <AccordionItem value="medical" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <Stethoscope className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Medical Expenses</p>
                <p className="text-sm text-muted-foreground">Prescriptions, dental, vision, travel for medical</p>
              </div>
              {(credits.line33099_medicalExpenses || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(credits.line33099_medicalExpenses || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medical">Medical Expenses - Self/Spouse/Dependants (Line 33099)</Label>
                  <Input
                    id="medical"
                    type="number"
                    value={credits.line33099_medicalExpenses || ''}
                    onChange={(e) => updateCredits({ line33099_medicalExpenses: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalOther">Medical Expenses - Other Dependants (Line 33199)</Label>
                  <Input
                    id="medicalOther"
                    type="number"
                    value={credits.line33199_medicalOther || ''}
                    onChange={(e) => updateCredits({ line33199_medicalOther: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg text-sm">
                <p className="font-medium text-red-700 dark:text-red-300">Eligible expenses include:</p>
                <ul className="text-red-600 dark:text-red-400 mt-1 grid grid-cols-2 gap-x-4 list-disc list-inside">
                  <li>Prescription drugs</li>
                  <li>Dental work</li>
                  <li>Eyeglasses/contacts</li>
                  <li>Medical devices</li>
                  <li>Travel for medical care</li>
                  <li>Private health insurance premiums</li>
                </ul>
                <p className="mt-2 text-red-600 dark:text-red-400">
                  Only claim amounts exceeding 3% of your net income (or $2,759, whichever is less).
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Charitable Donations */}
        <AccordionItem value="donations" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Charitable Donations</p>
                <p className="text-sm text-muted-foreground">Registered charities, political contributions</p>
              </div>
              {(credits.line34900_donations || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(credits.line34900_donations || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donations">Total Donations (Line 34900)</Label>
                  <Input
                    id="donations"
                    type="number"
                    value={credits.line34900_donations || ''}
                    onChange={(e) => updateCredits({ line34900_donations: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="culturalGifts">Cultural/Ecological Gifts (Line 35000)</Label>
                  <Input
                    id="culturalGifts"
                    type="number"
                    value={credits.line35000_culturalGifts || ''}
                    onChange={(e) => updateCredits({ line35000_culturalGifts: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="p-3 bg-pink-50 dark:bg-pink-950/30 rounded-lg text-sm">
                <p className="font-medium text-pink-700 dark:text-pink-300">Credit rates:</p>
                <ul className="text-pink-600 dark:text-pink-400 mt-1 list-disc list-inside">
                  <li>15% on first $200</li>
                  <li>29% on amounts over $200 (33% if income &gt; $253,414)</li>
                </ul>
                <p className="mt-2">Can claim donations from the past 5 years. Keep official receipts.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Tuition */}
        <AccordionItem value="tuition" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Tuition & Education</p>
                <p className="text-sm text-muted-foreground">Post-secondary tuition fees</p>
              </div>
              {(credits.line32300_tuition || 0) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency(credits.line32300_tuition || 0)}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tuition">Tuition Amount (Line 32300)</Label>
                  <Input
                    id="tuition"
                    type="number"
                    value={credits.line32300_tuition || ''}
                    onChange={(e) => updateCredits({ line32300_tuition: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">From T2202 from your school</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tuitionCarry">Tuition Carry-Forward</Label>
                  <Input
                    id="tuitionCarry"
                    type="number"
                    value={credits.tuitionCarryForward || ''}
                    onChange={(e) => updateCredits({ tuitionCarryForward: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Unused amounts from prior years</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tuitionTransferred">Tuition Transferred from Child (Line 32400)</Label>
                <Input
                  id="tuitionTransferred"
                  type="number"
                  value={credits.line32400_tuitionTransferred || ''}
                  onChange={(e) => updateCredits({ line32400_tuitionTransferred: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground">Max $5,000 can be transferred per student</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Disability */}
        <AccordionItem value="disability" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Accessibility className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Disability Tax Credit</p>
                <p className="text-sm text-muted-foreground">For approved disability</p>
              </div>
              {credits.hasDTC && (
                <Badge variant="secondary" className="ml-auto">
                  Approved
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasDTC"
                  checked={credits.hasDTC || false}
                  onCheckedChange={(checked) => {
                    updateCredits({
                      hasDTC: checked as boolean,
                      line31600_disabilitySelf: checked ? 9428 : 0  // 2024 DTC amount
                    })
                  }}
                />
                <Label htmlFor="hasDTC" className="font-normal">
                  I have an approved Disability Tax Credit certificate (T2201)
                </Label>
              </div>

              {credits.hasDTC && (
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-sm">
                  <p className="font-medium text-purple-700 dark:text-purple-300">
                    Disability Amount: {formatCurrency(9428)} (2024)
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 mt-1">
                    This provides a federal credit of approximately {formatCurrency(9428 * 0.15)}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="disabilityTransferred">Disability Amount Transferred (Line 31800)</Label>
                <Input
                  id="disabilityTransferred"
                  type="number"
                  value={credits.line31800_disabilityTransferred || ''}
                  onChange={(e) => updateCredits({ line31800_disabilityTransferred: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
                <p className="text-xs text-muted-foreground">From a dependant who doesn&apos;t need the full amount</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Dependants */}
        <AccordionItem value="dependants" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Dependant Credits</p>
                <p className="text-sm text-muted-foreground">Eligible dependant, caregiver amounts</p>
              </div>
              {((credits.line30400_eligibleDependant || 0) + (credits.line30450_caregiverAmount || 0)) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency((credits.line30400_eligibleDependant || 0) + (credits.line30450_caregiverAmount || 0))}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eligibleDependant">Eligible Dependant Amount (Line 30400)</Label>
                  <Input
                    id="eligibleDependant"
                    type="number"
                    value={credits.line30400_eligibleDependant || ''}
                    onChange={(e) => updateCredits({ line30400_eligibleDependant: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Single parents supporting a child</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caregiverAmount">Canada Caregiver Amount (Line 30450)</Label>
                  <Input
                    id="caregiverAmount"
                    type="number"
                    value={credits.line30450_caregiverAmount || ''}
                    onChange={(e) => updateCredits({ line30450_caregiverAmount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">For infirm dependants</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caregiverChildren">Caregiver for Children Under 18 (Line 30425)</Label>
                  <Input
                    id="caregiverChildren"
                    type="number"
                    value={credits.line30425_caregiverChildren || ''}
                    onChange={(e) => updateCredits({ line30425_caregiverChildren: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="caregiverSpouse">Caregiver for Infirm Spouse (Line 30500)</Label>
                  <Input
                    id="caregiverSpouse"
                    type="number"
                    value={credits.line30500_caregiverSpouse || ''}
                    onChange={(e) => updateCredits({ line30500_caregiverSpouse: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Volunteer Credits */}
        <AccordionItem value="volunteer" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <Flame className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Volunteer Credits</p>
                <p className="text-sm text-muted-foreground">Firefighter, search and rescue</p>
              </div>
              {((credits.line31285_volunteerFirefighter || 0) + (credits.line31300_searchRescue || 0)) > 0 && (
                <Badge variant="secondary" className="ml-auto">
                  {formatCurrency((credits.line31285_volunteerFirefighter || 0) + (credits.line31300_searchRescue || 0))}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firefighter">Volunteer Firefighter (Line 31285)</Label>
                  <Input
                    id="firefighter"
                    type="number"
                    value={credits.line31285_volunteerFirefighter || ''}
                    onChange={(e) => updateCredits({ line31285_volunteerFirefighter: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="searchRescue">Search & Rescue Volunteer (Line 31300)</Label>
                  <Input
                    id="searchRescue"
                    type="number"
                    value={credits.line31300_searchRescue || ''}
                    onChange={(e) => updateCredits({ line31300_searchRescue: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Maximum $3,000 credit if you volunteered 200+ hours in the year.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Other Credits */}
        <AccordionItem value="other" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900/30">
                <Newspaper className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="text-left">
                <p className="font-medium">Other Credits</p>
                <p className="text-sm text-muted-foreground">Digital news, pension income</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="digitalNews">Digital News Subscription (Line 31350)</Label>
                  <Input
                    id="digitalNews"
                    type="number"
                    value={credits.line31350_digitalNews || ''}
                    onChange={(e) => updateCredits({ line31350_digitalNews: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                  />
                  <p className="text-xs text-muted-foreground">Max $500 for qualifying news subscriptions</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pensionAmount">Pension Income Amount (Line 31400)</Label>
                  <Input
                    id="pensionAmount"
                    type="number"
                    value={credits.line31400_pensionAmount || ''}
                    onChange={(e) => updateCredits({ line31400_pensionAmount: parseFloat(e.target.value) || 0 })}
                    placeholder="0.00"
                    max={2000}
                  />
                  <p className="text-xs text-muted-foreground">Max $2,000 on eligible pension income</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
