'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  User,
  MapPin,
  Briefcase,
  Building2,
  PiggyBank,
  Receipt,
  Heart,
  Calculator,
  CheckCircle2,
  Circle
} from 'lucide-react'
import { ConversationState, ExtractedData } from '../conversation-engine'
import { formatCurrency, formatPercent } from '../tax-engine'
import { PROVINCE_NAMES, calculateTotalTax } from '@/lib/canadianTaxData'

interface LiveTaxFormProps {
  extractedData: Partial<ExtractedData>
  conversationState: ConversationState
  recentlyUpdatedFields: string[]
}

export function LiveTaxForm({
  extractedData,
  conversationState,
  recentlyUpdatedFields
}: LiveTaxFormProps) {
  // Calculate live estimate
  const estimate = useMemo(() => {
    const employment = extractedData.employmentIncome || 0
    const selfEmp = (extractedData.businessIncome || 0) - (extractedData.businessExpenses || 0)
    const investment = (extractedData.interestIncome || 0) +
      (extractedData.dividendIncome || 0) +
      ((extractedData.capitalGains || 0) * 0.5)

    const totalIncome = employment + selfEmp + investment
    const rrspDeduction = extractedData.rrspContribution || 0
    const taxableIncome = Math.max(0, totalIncome - rrspDeduction)

    if (taxableIncome === 0) return null

    const province = extractedData.province || 'ON'
    const taxCalc = calculateTotalTax(taxableIncome, province)

    const taxDeducted = extractedData.taxDeducted || 0
    const balance = taxCalc.totalTax - taxDeducted

    return {
      totalIncome,
      taxableIncome,
      ...taxCalc,
      taxDeducted,
      refund: balance < 0 ? Math.abs(balance) : 0,
      owing: balance > 0 ? balance : 0
    }
  }, [extractedData])

  // Check which sections have data
  const hasPersonalInfo = !!(extractedData.firstName || extractedData.lastName)
  const hasAddress = !!(extractedData.street || extractedData.city)
  const hasEmployment = !!(extractedData.employerName || extractedData.employmentIncome)
  const hasSelfEmployment = !!(extractedData.businessName || extractedData.businessIncome)
  const hasInvestments = !!(extractedData.interestIncome || extractedData.dividendIncome || extractedData.capitalGains)
  const hasDeductions = !!(extractedData.rrspContribution)
  const hasCredits = !!(extractedData.medicalExpenses || extractedData.donations)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Your Tax Return</span>
          <Badge variant="outline" className="text-xs">
            Live Preview
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-6 pb-6">
          {/* Live Estimate Banner */}
          {estimate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-6 p-4 rounded-lg ${
                estimate.refund > 0
                  ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
                  : estimate.owing > 0
                  ? 'bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800'
                  : 'bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Estimated Result</span>
                </div>
                <span className={`text-2xl font-bold ${
                  estimate.refund > 0 ? 'text-green-600' : estimate.owing > 0 ? 'text-orange-600' : ''
                }`}>
                  {estimate.refund > 0 ? `+${formatCurrency(estimate.refund)}` :
                   estimate.owing > 0 ? `-${formatCurrency(estimate.owing)}` :
                   '$0.00'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {estimate.refund > 0 ? 'Refund' : estimate.owing > 0 ? 'Balance Owing' : 'Balanced'}
              </p>
            </motion.div>
          )}

          {/* Personal Information Section */}
          <FormSection
            title="Personal Information"
            icon={<User className="h-4 w-4" />}
            isActive={conversationState.phase === 'discovery' || conversationState.phase === 'personal_info'}
            hasData={hasPersonalInfo}
          >
            <FormField
              label="First Name"
              value={extractedData.firstName}
              isHighlighted={recentlyUpdatedFields.includes('firstName')}
            />
            <FormField
              label="Last Name"
              value={extractedData.lastName}
              isHighlighted={recentlyUpdatedFields.includes('lastName')}
            />
            <FormField
              label="SIN"
              value={extractedData.sin ? `${extractedData.sin.slice(0, 3)}-***-***` : undefined}
              isHighlighted={recentlyUpdatedFields.includes('sin')}
            />
            <FormField
              label="Date of Birth"
              value={extractedData.dateOfBirth}
              isHighlighted={recentlyUpdatedFields.includes('dateOfBirth')}
            />
            <FormField
              label="Marital Status"
              value={extractedData.maritalStatus ? capitalizeFirst(extractedData.maritalStatus) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('maritalStatus')}
            />
            {extractedData.spouseFirstName && (
              <FormField
                label="Spouse"
                value={`${extractedData.spouseFirstName} (Income: ${formatCurrency(extractedData.spouseIncome || 0)})`}
                isHighlighted={recentlyUpdatedFields.includes('spouseFirstName') || recentlyUpdatedFields.includes('spouseIncome')}
              />
            )}
          </FormSection>

          {/* Address Section */}
          <FormSection
            title="Address"
            icon={<MapPin className="h-4 w-4" />}
            isActive={conversationState.phase === 'personal_info' && conversationState.subStep >= 4}
            hasData={hasAddress}
          >
            <FormField
              label="Street"
              value={extractedData.street}
              isHighlighted={recentlyUpdatedFields.includes('street')}
            />
            <FormField
              label="City"
              value={extractedData.city}
              isHighlighted={recentlyUpdatedFields.includes('city')}
            />
            <FormField
              label="Province"
              value={extractedData.province ? PROVINCE_NAMES[extractedData.province] : undefined}
              isHighlighted={recentlyUpdatedFields.includes('province')}
            />
            <FormField
              label="Postal Code"
              value={extractedData.postalCode}
              isHighlighted={recentlyUpdatedFields.includes('postalCode')}
            />
          </FormSection>

          {/* Employment Income Section */}
          <FormSection
            title="Employment Income (T4)"
            icon={<Briefcase className="h-4 w-4" />}
            isActive={conversationState.phase === 'income_t4'}
            hasData={hasEmployment}
          >
            <FormField
              label="Employer"
              value={extractedData.employerName}
              isHighlighted={recentlyUpdatedFields.includes('employerName')}
            />
            <FormField
              label="Box 14 - Employment Income"
              value={extractedData.employmentIncome ? formatCurrency(extractedData.employmentIncome) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('employmentIncome')}
            />
            <FormField
              label="Box 22 - Tax Deducted"
              value={extractedData.taxDeducted ? formatCurrency(extractedData.taxDeducted) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('taxDeducted')}
            />
            <FormField
              label="Box 16 - CPP"
              value={extractedData.cppDeducted ? formatCurrency(extractedData.cppDeducted) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('cppDeducted')}
            />
            <FormField
              label="Box 18 - EI"
              value={extractedData.eiDeducted ? formatCurrency(extractedData.eiDeducted) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('eiDeducted')}
            />
          </FormSection>

          {/* Self-Employment Section */}
          {(conversationState.flags.hasSelfEmployment || hasSelfEmployment) && (
            <FormSection
              title="Self-Employment Income"
              icon={<Building2 className="h-4 w-4" />}
              isActive={conversationState.phase === 'income_self_employed'}
              hasData={hasSelfEmployment}
            >
              <FormField
                label="Business Type"
                value={extractedData.businessName}
                isHighlighted={recentlyUpdatedFields.includes('businessName')}
              />
              <FormField
                label="Gross Revenue"
                value={extractedData.businessIncome ? formatCurrency(extractedData.businessIncome) : undefined}
                isHighlighted={recentlyUpdatedFields.includes('businessIncome')}
              />
              <FormField
                label="Expenses"
                value={extractedData.businessExpenses ? formatCurrency(extractedData.businessExpenses) : undefined}
                isHighlighted={recentlyUpdatedFields.includes('businessExpenses')}
              />
              {extractedData.businessIncome && extractedData.businessExpenses && (
                <FormField
                  label="Net Income"
                  value={formatCurrency(extractedData.businessIncome - extractedData.businessExpenses)}
                  isHighlighted={false}
                />
              )}
            </FormSection>
          )}

          {/* Investment Income Section */}
          {(conversationState.flags.hasInvestments || hasInvestments) && (
            <FormSection
              title="Investment Income"
              icon={<PiggyBank className="h-4 w-4" />}
              isActive={conversationState.phase === 'income_investment'}
              hasData={hasInvestments}
            >
              <FormField
                label="Interest Income"
                value={extractedData.interestIncome ? formatCurrency(extractedData.interestIncome) : undefined}
                isHighlighted={recentlyUpdatedFields.includes('interestIncome')}
              />
              <FormField
                label="Dividend Income"
                value={extractedData.dividendIncome ? formatCurrency(extractedData.dividendIncome) : undefined}
                isHighlighted={recentlyUpdatedFields.includes('dividendIncome')}
              />
              <FormField
                label="Capital Gains"
                value={extractedData.capitalGains ? formatCurrency(extractedData.capitalGains) : undefined}
                isHighlighted={recentlyUpdatedFields.includes('capitalGains')}
              />
            </FormSection>
          )}

          {/* Deductions Section */}
          <FormSection
            title="Deductions"
            icon={<Receipt className="h-4 w-4" />}
            isActive={conversationState.phase === 'deductions_rrsp' || conversationState.phase === 'deductions_other'}
            hasData={hasDeductions}
          >
            <FormField
              label="RRSP Contribution"
              value={extractedData.rrspContribution ? formatCurrency(extractedData.rrspContribution) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('rrspContribution')}
            />
            <FormField
              label="Childcare Expenses"
              value={extractedData.childcareExpenses ? formatCurrency(extractedData.childcareExpenses) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('childcareExpenses')}
            />
          </FormSection>

          {/* Credits Section */}
          <FormSection
            title="Tax Credits"
            icon={<Heart className="h-4 w-4" />}
            isActive={conversationState.phase === 'credits'}
            hasData={hasCredits}
          >
            <FormField
              label="Medical Expenses"
              value={extractedData.medicalExpenses ? formatCurrency(extractedData.medicalExpenses) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('medicalExpenses')}
            />
            <FormField
              label="Charitable Donations"
              value={extractedData.donations ? formatCurrency(extractedData.donations) : undefined}
              isHighlighted={recentlyUpdatedFields.includes('donations')}
            />
          </FormSection>

          {/* Summary Section */}
          {estimate && (
            <FormSection
              title="Tax Summary"
              icon={<Calculator className="h-4 w-4" />}
              isActive={conversationState.phase === 'review'}
              hasData={true}
            >
              <FormField
                label="Total Income"
                value={formatCurrency(estimate.totalIncome)}
                isHighlighted={false}
              />
              <FormField
                label="Taxable Income"
                value={formatCurrency(estimate.taxableIncome)}
                isHighlighted={false}
              />
              <Separator className="my-2" />
              <FormField
                label="Federal Tax"
                value={formatCurrency(estimate.federalTax)}
                isHighlighted={false}
              />
              <FormField
                label="Provincial Tax"
                value={formatCurrency(estimate.provincialTax)}
                isHighlighted={false}
              />
              <FormField
                label="Total Tax"
                value={formatCurrency(estimate.totalTax)}
                isHighlighted={false}
              />
              <FormField
                label="Tax Already Paid"
                value={formatCurrency(estimate.taxDeducted)}
                isHighlighted={false}
              />
              <Separator className="my-2" />
              <div className={`p-2 rounded ${
                estimate.refund > 0 ? 'bg-green-100 dark:bg-green-900/30' :
                estimate.owing > 0 ? 'bg-orange-100 dark:bg-orange-900/30' : ''
              }`}>
                <FormField
                  label={estimate.refund > 0 ? 'Refund' : 'Balance Owing'}
                  value={formatCurrency(estimate.refund > 0 ? estimate.refund : estimate.owing)}
                  isHighlighted={false}
                />
              </div>
            </FormSection>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

// Form Section Component
function FormSection({
  title,
  icon,
  isActive,
  hasData,
  children
}: {
  title: string
  icon: React.ReactNode
  isActive: boolean
  hasData: boolean
  children: React.ReactNode
}) {
  return (
    <div className={`mb-4 p-3 rounded-lg border transition-colors ${
      isActive
        ? 'border-primary bg-primary/5'
        : hasData
        ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20'
        : 'border-muted bg-muted/30'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded ${
          isActive ? 'bg-primary/10 text-primary' :
          hasData ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
          'bg-muted text-muted-foreground'
        }`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          isActive ? 'text-primary' : hasData ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {title}
        </span>
        {hasData && !isActive && (
          <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
        )}
        {isActive && (
          <Badge variant="secondary" className="ml-auto text-xs">
            Current
          </Badge>
        )}
      </div>
      <div className="space-y-1 ml-8">
        {children}
      </div>
    </div>
  )
}

// Form Field Component
function FormField({
  label,
  value,
  isHighlighted
}: {
  label: string
  value: string | undefined
  isHighlighted: boolean
}) {
  return (
    <motion.div
      className={`flex justify-between items-center py-1 px-2 rounded text-sm ${
        isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''
      }`}
      animate={isHighlighted ? {
        backgroundColor: ['hsl(48, 96%, 89%)', 'transparent'],
      } : {}}
      transition={{ duration: 2 }}
    >
      <span className="text-muted-foreground">{label}</span>
      <AnimatePresence mode="wait">
        {value ? (
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="font-medium"
          >
            {value}
          </motion.span>
        ) : (
          <span className="text-muted-foreground/50">—</span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
