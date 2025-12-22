'use client'

import { useState } from 'react'
import { TaxReturnHook } from '../../useTaxReturn'
import { T4Slip, T5Slip, SelfEmploymentIncome, CapitalGain } from '../../types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Briefcase,
  Building2,
  TrendingUp,
  PiggyBank,
  Plus,
  Trash2,
  Edit2,
  DollarSign
} from 'lucide-react'
import { formatCurrency } from '../../tax-engine'

interface IncomeStepProps {
  hook: TaxReturnHook
}

export function IncomeStep({ hook }: IncomeStepProps) {
  const { taxReturn, addT4, updateT4, removeT4, addT5, updateT5, removeT5, addSelfEmployment, updateSelfEmployment, removeSelfEmployment, addCapitalGain, removeCapitalGain, updateOtherIncome } = hook
  const { income } = taxReturn

  const [activeTab, setActiveTab] = useState('employment')
  const [t4DialogOpen, setT4DialogOpen] = useState(false)
  const [t5DialogOpen, setT5DialogOpen] = useState(false)
  const [selfEmpDialogOpen, setSelfEmpDialogOpen] = useState(false)
  const [capitalGainDialogOpen, setCapitalGainDialogOpen] = useState(false)
  const [editingT4, setEditingT4] = useState<T4Slip | null>(null)

  // Calculate totals for summary
  const totalEmployment = income.t4Slips.reduce((sum, t4) => sum + (t4.box14_employmentIncome || 0), 0)
  const totalInvestment = income.t5Slips.reduce((sum, t5) => sum + (t5.box14_otherInterest || 0) + (t5.box10_actualDividends || 0), 0)
  const totalSelfEmployment = income.selfEmployment.reduce((sum, b) => sum + b.netIncome, 0)
  const totalCapitalGains = income.capitalGains.reduce((sum, g) => sum + Math.max(0, g.proceeds - g.acb), 0) * 0.5

  return (
    <div className="space-y-6">
      {/* Income Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
              <Briefcase className="h-4 w-4" />
              <span className="text-xs font-medium">Employment</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalEmployment)}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-1">
              <PiggyBank className="h-4 w-4" />
              <span className="text-xs font-medium">Investment</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalInvestment)}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-1">
              <Building2 className="h-4 w-4" />
              <span className="text-xs font-medium">Self-Employed</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalSelfEmployment)}</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-medium">Capital Gains</span>
            </div>
            <p className="text-lg font-bold">{formatCurrency(totalCapitalGains)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Income Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="employment" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Employment</span>
          </TabsTrigger>
          <TabsTrigger value="investment" className="flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span className="hidden sm:inline">Investment</span>
          </TabsTrigger>
          <TabsTrigger value="self-employed" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Self-Employed</span>
          </TabsTrigger>
          <TabsTrigger value="capital-gains" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Capital Gains</span>
          </TabsTrigger>
        </TabsList>

        {/* Employment Income (T4) */}
        <TabsContent value="employment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>T4 Slips - Employment Income</CardTitle>
                <CardDescription>Add your T4 slips from employers</CardDescription>
              </div>
              <T4Dialog
                open={t4DialogOpen}
                onOpenChange={setT4DialogOpen}
                onSave={(t4) => {
                  if (editingT4) {
                    updateT4(editingT4.id, t4)
                  } else {
                    addT4(t4)
                  }
                  setEditingT4(null)
                }}
                initialData={editingT4}
              />
            </CardHeader>
            <CardContent>
              {income.t4Slips.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No T4 slips added yet</p>
                  <p className="text-sm">Click "Add T4" to enter your employment income</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {income.t4Slips.map((t4) => (
                    <div key={t4.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{t4.employerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Income: {formatCurrency(t4.box14_employmentIncome)} | Tax Deducted: {formatCurrency(t4.box22_incomeTaxDeducted)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingT4(t4)
                            setT4DialogOpen(true)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeT4(t4.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investment Income (T5) */}
        <TabsContent value="investment" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>T5 Slips - Investment Income</CardTitle>
                <CardDescription>Interest, dividends from Canadian sources</CardDescription>
              </div>
              <T5Dialog
                open={t5DialogOpen}
                onOpenChange={setT5DialogOpen}
                onSave={(t5) => addT5(t5)}
              />
            </CardHeader>
            <CardContent>
              {income.t5Slips.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <PiggyBank className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No T5 slips added yet</p>
                  <p className="text-sm">Add interest and dividend income from banks and investments</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {income.t5Slips.map((t5) => (
                    <div key={t5.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{t5.payerName}</p>
                        <p className="text-sm text-muted-foreground">
                          Interest: {formatCurrency(t5.box14_otherInterest || 0)} |
                          Dividends: {formatCurrency(t5.box10_actualDividends || 0)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeT5(t5.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Self-Employment Income */}
        <TabsContent value="self-employed" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Self-Employment Income (T2125)</CardTitle>
                <CardDescription>Business income and expenses</CardDescription>
              </div>
              <SelfEmploymentDialog
                open={selfEmpDialogOpen}
                onOpenChange={setSelfEmpDialogOpen}
                onSave={(biz) => addSelfEmployment(biz)}
              />
            </CardHeader>
            <CardContent>
              {income.selfEmployment.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No self-employment income added</p>
                  <p className="text-sm">Add your business or freelance income</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {income.selfEmployment.map((biz) => (
                    <div key={biz.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{biz.businessName}</p>
                        <p className="text-sm text-muted-foreground">
                          Gross: {formatCurrency(biz.grossRevenue)} |
                          Net: {formatCurrency(biz.netIncome)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSelfEmployment(biz.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Capital Gains */}
        <TabsContent value="capital-gains" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Capital Gains / Losses (Schedule 3)</CardTitle>
                <CardDescription>Stocks, real estate, and other property sales</CardDescription>
              </div>
              <CapitalGainDialog
                open={capitalGainDialogOpen}
                onOpenChange={setCapitalGainDialogOpen}
                onSave={(gain) => addCapitalGain(gain)}
              />
            </CardHeader>
            <CardContent>
              {income.capitalGains.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No capital gains/losses added</p>
                  <p className="text-sm">Add sales of stocks, property, or other assets</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {income.capitalGains.map((gain) => {
                    const netGain = gain.proceeds - gain.acb - (gain.outlays || 0)
                    return (
                      <div key={gain.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{gain.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Proceeds: {formatCurrency(gain.proceeds)} |
                            ACB: {formatCurrency(gain.acb)} |
                            <span className={netGain >= 0 ? 'text-green-600' : 'text-red-600'}>
                              {' '}{netGain >= 0 ? 'Gain' : 'Loss'}: {formatCurrency(Math.abs(netGain))}
                            </span>
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCapitalGain(gain.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Other Income */}
      <Card>
        <CardHeader>
          <CardTitle>Other Income</CardTitle>
          <CardDescription>RRSP withdrawals, pension income, EI benefits, etc.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rrspIncome">RRSP Withdrawals</Label>
              <Input
                id="rrspIncome"
                type="number"
                value={income.other.line15000_rrspIncome || ''}
                onChange={(e) => updateOtherIncome({ line15000_rrspIncome: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rrifIncome">RRIF Income</Label>
              <Input
                id="rrifIncome"
                type="number"
                value={income.other.line12900_rrifIncome || ''}
                onChange={(e) => updateOtherIncome({ line12900_rrifIncome: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="otherTaxable">Other Taxable Income</Label>
              <Input
                id="otherTaxable"
                type="number"
                value={income.other.line14300_otherTaxable || ''}
                onChange={(e) => updateOtherIncome({ line14300_otherTaxable: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tips">Tips & Gratuities (not on T4)</Label>
              <Input
                id="tips"
                type="number"
                value={income.other.line13000_otherEmployment || ''}
                onChange={(e) => updateOtherIncome({ line13000_otherEmployment: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================
// T4 Dialog Component
// ============================================

function T4Dialog({
  open,
  onOpenChange,
  onSave,
  initialData
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (t4: Omit<T4Slip, 'id'>) => void
  initialData?: T4Slip | null
}) {
  const [formData, setFormData] = useState<Partial<T4Slip>>(initialData || {})

  const handleSave = () => {
    onSave({
      employerName: formData.employerName || '',
      employerAccount: formData.employerAccount || '',
      box14_employmentIncome: formData.box14_employmentIncome || 0,
      box16_cpp: formData.box16_cpp || 0,
      box17_cpp2: formData.box17_cpp2 || 0,
      box18_ei: formData.box18_ei || 0,
      box22_incomeTaxDeducted: formData.box22_incomeTaxDeducted || 0,
      box44_unionDues: formData.box44_unionDues || 0,
      box52_pensionAdjustment: formData.box52_pensionAdjustment || 0
    })
    setFormData({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add T4
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add T4 Slip</DialogTitle>
          <DialogDescription>
            Enter the information from your T4 slip
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="employerName">Employer Name</Label>
            <Input
              id="employerName"
              value={formData.employerName || ''}
              onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
              placeholder="ABC Company Inc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="box14">Box 14 - Employment Income</Label>
              <Input
                id="box14"
                type="number"
                value={formData.box14_employmentIncome || ''}
                onChange={(e) => setFormData({ ...formData, box14_employmentIncome: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="box22">Box 22 - Income Tax Deducted</Label>
              <Input
                id="box22"
                type="number"
                value={formData.box22_incomeTaxDeducted || ''}
                onChange={(e) => setFormData({ ...formData, box22_incomeTaxDeducted: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="box16">Box 16 - CPP</Label>
              <Input
                id="box16"
                type="number"
                value={formData.box16_cpp || ''}
                onChange={(e) => setFormData({ ...formData, box16_cpp: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="box17">Box 17 - CPP2</Label>
              <Input
                id="box17"
                type="number"
                value={formData.box17_cpp2 || ''}
                onChange={(e) => setFormData({ ...formData, box17_cpp2: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="box18">Box 18 - EI Premiums</Label>
              <Input
                id="box18"
                type="number"
                value={formData.box18_ei || ''}
                onChange={(e) => setFormData({ ...formData, box18_ei: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="box44">Box 44 - Union Dues</Label>
              <Input
                id="box44"
                type="number"
                value={formData.box44_unionDues || ''}
                onChange={(e) => setFormData({ ...formData, box44_unionDues: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="box52">Box 52 - Pension Adjustment</Label>
              <Input
                id="box52"
                type="number"
                value={formData.box52_pensionAdjustment || ''}
                onChange={(e) => setFormData({ ...formData, box52_pensionAdjustment: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save T4</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ============================================
// T5 Dialog Component
// ============================================

function T5Dialog({
  open,
  onOpenChange,
  onSave
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (t5: Omit<T5Slip, 'id'>) => void
}) {
  const [formData, setFormData] = useState<Partial<T5Slip>>({})

  const handleSave = () => {
    onSave({
      payerName: formData.payerName || '',
      box10_actualDividends: formData.box10_actualDividends || 0,
      box11_taxableDividends: formData.box11_taxableDividends || 0,
      box14_otherInterest: formData.box14_otherInterest || 0,
      box24_actualNonEligibleDividends: formData.box24_actualNonEligibleDividends || 0,
      box25_taxableNonEligibleDividends: formData.box25_taxableNonEligibleDividends || 0
    })
    setFormData({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add T5
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add T5 Slip</DialogTitle>
          <DialogDescription>
            Enter investment income from your T5 slip
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="payerName">Payer Name (Bank/Institution)</Label>
            <Input
              id="payerName"
              value={formData.payerName || ''}
              onChange={(e) => setFormData({ ...formData, payerName: e.target.value })}
              placeholder="TD Bank"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="box14">Box 14 - Interest Income</Label>
            <Input
              id="box14"
              type="number"
              value={formData.box14_otherInterest || ''}
              onChange={(e) => setFormData({ ...formData, box14_otherInterest: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="box10">Box 10 - Eligible Dividends (Actual)</Label>
              <Input
                id="box10"
                type="number"
                value={formData.box10_actualDividends || ''}
                onChange={(e) => setFormData({ ...formData, box10_actualDividends: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="box24">Box 24 - Other Dividends (Actual)</Label>
              <Input
                id="box24"
                type="number"
                value={formData.box24_actualNonEligibleDividends || ''}
                onChange={(e) => setFormData({ ...formData, box24_actualNonEligibleDividends: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save T5</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ============================================
// Self-Employment Dialog
// ============================================

function SelfEmploymentDialog({
  open,
  onOpenChange,
  onSave
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (biz: Omit<SelfEmploymentIncome, 'id'>) => void
}) {
  const [formData, setFormData] = useState<Partial<SelfEmploymentIncome>>({
    expenses: {}
  })

  const calculateNet = () => {
    const expenses = Object.values(formData.expenses || {}).reduce((sum, val) => sum + (val || 0), 0)
    return (formData.grossRevenue || 0) - expenses
  }

  const handleSave = () => {
    onSave({
      businessName: formData.businessName || '',
      industry: formData.industry || '',
      fiscalYearEnd: formData.fiscalYearEnd || '12-31',
      grossRevenue: formData.grossRevenue || 0,
      expenses: formData.expenses || {},
      netIncome: calculateNet()
    })
    setFormData({ expenses: {} })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Business
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Self-Employment Income</DialogTitle>
          <DialogDescription>
            Enter your business income and expenses
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName || ''}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="My Consulting Business"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Type</Label>
              <Input
                id="industry"
                value={formData.industry || ''}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Consulting, Freelance, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="grossRevenue">Gross Revenue</Label>
            <Input
              id="grossRevenue"
              type="number"
              value={formData.grossRevenue || ''}
              onChange={(e) => setFormData({ ...formData, grossRevenue: parseFloat(e.target.value) || 0 })}
              placeholder="0.00"
            />
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">Expenses</h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'advertising', label: 'Advertising' },
                { key: 'insurance', label: 'Insurance' },
                { key: 'officeExpenses', label: 'Office Expenses' },
                { key: 'professionalFees', label: 'Professional Fees' },
                { key: 'supplies', label: 'Supplies' },
                { key: 'telephone', label: 'Phone/Internet' },
                { key: 'travel', label: 'Travel' },
                { key: 'vehicleExpenses', label: 'Vehicle Expenses' },
                { key: 'workspaceCost', label: 'Home Office' },
                { key: 'other', label: 'Other Expenses' }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1">
                  <Label htmlFor={key} className="text-sm">{label}</Label>
                  <Input
                    id={key}
                    type="number"
                    value={(formData.expenses as Record<string, number>)?.[key] || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      expenses: {
                        ...formData.expenses,
                        [key]: parseFloat(e.target.value) || 0
                      }
                    })}
                    placeholder="0.00"
                    className="h-9"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-medium">Net Income:</span>
            <span className="text-xl font-bold">{formatCurrency(calculateNet())}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save Business</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ============================================
// Capital Gain Dialog
// ============================================

function CapitalGainDialog({
  open,
  onOpenChange,
  onSave
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (gain: Omit<CapitalGain, 'id'>) => void
}) {
  const [formData, setFormData] = useState<Partial<CapitalGain>>({})

  const calculateGain = () => {
    return (formData.proceeds || 0) - (formData.acb || 0) - (formData.outlays || 0)
  }

  const handleSave = () => {
    onSave({
      description: formData.description || '',
      dateSold: formData.dateSold || '',
      proceeds: formData.proceeds || 0,
      acb: formData.acb || 0,
      outlays: formData.outlays || 0,
      gain: calculateGain()
    })
    setFormData({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Sale
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Capital Gain/Loss</DialogTitle>
          <DialogDescription>
            Enter details about your sale of stocks, property, or other assets
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="100 shares of XYZ Corp"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateSold">Date Sold</Label>
            <Input
              id="dateSold"
              type="date"
              value={formData.dateSold || ''}
              onChange={(e) => setFormData({ ...formData, dateSold: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="proceeds">Proceeds (Sold For)</Label>
              <Input
                id="proceeds"
                type="number"
                value={formData.proceeds || ''}
                onChange={(e) => setFormData({ ...formData, proceeds: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="acb">ACB (Cost)</Label>
              <Input
                id="acb"
                type="number"
                value={formData.acb || ''}
                onChange={(e) => setFormData({ ...formData, acb: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outlays">Selling Costs</Label>
              <Input
                id="outlays"
                type="number"
                value={formData.outlays || ''}
                onChange={(e) => setFormData({ ...formData, outlays: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-medium">{calculateGain() >= 0 ? 'Gain:' : 'Loss:'}</span>
            <span className={`text-xl font-bold ${calculateGain() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(Math.abs(calculateGain()))}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Taxable portion (50%): {formatCurrency(Math.max(0, calculateGain()) * 0.5)}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
