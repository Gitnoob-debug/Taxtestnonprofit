'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  PROVINCE_NAMES,
  TAX_YEAR,
  calculateTotalTax,
  CPP_MAX_PENSIONABLE_EARNINGS,
  CPP_BASIC_EXEMPTION,
  CPP_RATE_SELF_EMPLOYED,
  CPP_MAX_CONTRIBUTION_SELF_EMPLOYED,
  CPP2_MAX_EARNINGS,
  CPP2_RATE_SELF_EMPLOYED,
  CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED,
  EI_MAX_INSURABLE_EARNINGS,
  EI_RATE_EMPLOYEE,
  EI_MAX_PREMIUM_EMPLOYEE,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function SelfEmploymentTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [grossRevenue, setGrossRevenue] = useState<string>('')
  const [businessExpenses, setBusinessExpenses] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
  const [optIntoEI, setOptIntoEI] = useState<boolean>(false)
  const [profileApplied, setProfileApplied] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showManualInputs, setShowManualInputs] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'grossRevenue': setGrossRevenue(strValue); break
      case 'businessExpenses': setBusinessExpenses(strValue); break
      case 'province': setProvince(strValue); break
      case 'optIntoEI': setOptIntoEI(strValue === 'true' || strValue === '1'); break
    }
  }

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = { role: 'user', content: textToSend }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/calculator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          calculatorType: 'self-employment-tax-calculator',
          fields: [
            { name: 'grossRevenue', label: 'Gross Business Revenue', type: 'number', currentValue: grossRevenue },
            { name: 'businessExpenses', label: 'Business Expenses', type: 'number', currentValue: businessExpenses },
            { name: 'province', label: 'Province', type: 'select', options: Object.entries(PROVINCE_NAMES).map(([code, name]) => ({ value: code, label: name })), currentValue: province }
          ],
          conversationHistory: messages
        })
      })

      const data = await response.json()

      if (data.fieldUpdates) {
        Object.entries(data.fieldUpdates).forEach(([field, value]) => {
          handleFieldUpdate(field, value as string | number)
        })
      }

      const assistantMessage: Message = { role: 'assistant', content: data.message }
      setMessages(prev => [...prev, assistantMessage])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I had trouble processing that. Try again or use manual inputs below." }])
    } finally {
      setIsLoading(false)
    }
  }

  const results = useMemo(() => {
    const revenue = parseFloat(grossRevenue) || 0
    const expenses = parseFloat(businessExpenses) || 0

    if (revenue <= 0) return null

    const netBusinessIncome = Math.max(0, revenue - expenses)

    // Calculate CPP for self-employed
    const pensionableEarnings = Math.max(0, Math.min(netBusinessIncome, CPP_MAX_PENSIONABLE_EARNINGS) - CPP_BASIC_EXEMPTION)
    const baseCPP = Math.min(pensionableEarnings * CPP_RATE_SELF_EMPLOYED, CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)

    // CPP2 for self-employed
    let cpp2 = 0
    if (netBusinessIncome > CPP_MAX_PENSIONABLE_EARNINGS) {
      const cpp2Earnings = Math.min(netBusinessIncome, CPP2_MAX_EARNINGS) - CPP_MAX_PENSIONABLE_EARNINGS
      cpp2 = Math.min(cpp2Earnings * CPP2_RATE_SELF_EMPLOYED, CPP2_MAX_CONTRIBUTION_SELF_EMPLOYED)
    }
    const totalCPP = baseCPP + cpp2

    // EI is optional for self-employed
    let eiPremium = 0
    if (optIntoEI) {
      const insurable = Math.min(netBusinessIncome, EI_MAX_INSURABLE_EARNINGS)
      eiPremium = Math.min(insurable * EI_RATE_EMPLOYEE, EI_MAX_PREMIUM_EMPLOYEE)
    }

    // Half of CPP is deductible
    const cppDeduction = totalCPP / 2
    const taxableIncome = netBusinessIncome - cppDeduction

    // Calculate income tax
    const taxCalc = calculateTotalTax(taxableIncome, province)

    // CPP credit
    const cppCredit = (baseCPP / 2) * 0.15

    // Total tax payable
    const totalTax = Math.max(0, taxCalc.totalTax - cppCredit) + totalCPP + eiPremium

    // Net income after all taxes
    const netIncome = netBusinessIncome - totalTax

    return {
      grossRevenue: revenue,
      businessExpenses: expenses,
      netBusinessIncome,
      cppDeduction,
      taxableIncome,
      federalTax: taxCalc.federalTax,
      provincialTax: taxCalc.provincialTax,
      incomeTax: taxCalc.totalTax,
      baseCPP,
      cpp2,
      totalCPP,
      eiPremium,
      cppCredit,
      totalTax,
      netIncome,
      effectiveRate: netBusinessIncome > 0 ? totalTax / netBusinessIncome : 0,
      marginalRate: taxCalc.marginalRate,
      monthlyNet: netIncome / 12,
    }
  }, [grossRevenue, businessExpenses, province, optIntoEI])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%'
  }

  const examplePrompts = [
    "$150,000 revenue, $30,000 expenses in Ontario",
    "Freelancer making $80k after expenses in BC"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Self-Employment Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate your income tax and CPP contributions as a self-employed Canadian.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Self-Employment Tax Assistant</h2>
                  <p className="text-indigo-100 text-sm">Tell me about your business income</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Describe your business income
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me your revenue and expenses, and I'll calculate your tax including CPP contributions.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-full text-sm transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <AnimatePresence>
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}>
                          {msg.content}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-2xl px-4 py-3">
                        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-200 p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., 'I made $120k with $25k in expenses in Toronto'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Collapsible Manual Inputs */}
            <div className="border-t border-slate-200">
              <button
                onClick={() => setShowManualInputs(!showManualInputs)}
                className="w-full px-4 py-3 flex items-center justify-between text-sm text-slate-600 hover:bg-slate-50"
              >
                <span>Manual inputs</span>
                {showManualInputs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <AnimatePresence>
                {showManualInputs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-slate-50 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="grossRevenue" className="text-xs">Gross Revenue</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="grossRevenue"
                              type="number"
                              placeholder="100,000"
                              value={grossRevenue}
                              onChange={(e) => setGrossRevenue(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="businessExpenses" className="text-xs">Expenses</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="businessExpenses"
                              type="number"
                              placeholder="20,000"
                              value={businessExpenses}
                              onChange={(e) => setBusinessExpenses(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="province" className="text-xs">Province</Label>
                          <Select value={province} onValueChange={setProvince}>
                            <SelectTrigger className="mt-1 h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(PROVINCE_NAMES).map(([code, name]) => (
                                <SelectItem key={code} value={code}>
                                  {name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {isLoggedIn && profileApplied && profile?.province && (
                            <p className="text-xs text-indigo-600 mt-1 flex items-center gap-1">
                              <User className="h-3 w-3" />
                              From profile
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={optIntoEI}
                              onChange={(e) => setOptIntoEI(e.target.checked)}
                              className="h-4 w-4 rounded border-slate-300"
                            />
                            <span className="text-xs text-slate-600">Opt into EI</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Section - 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Summary */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-indigo-900 mb-4">Tax Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-indigo-700">Net Business Income</span>
                      <span className="font-medium text-indigo-900">{formatCurrency(results.netBusinessIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-700">Income Tax</span>
                      <span className="font-medium text-indigo-900">-{formatCurrency(results.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-700">CPP Contributions</span>
                      <span className="font-medium text-indigo-900">-{formatCurrency(results.totalCPP)}</span>
                    </div>
                    {results.eiPremium > 0 && (
                      <div className="flex justify-between">
                        <span className="text-indigo-700">EI Premiums</span>
                        <span className="font-medium text-indigo-900">-{formatCurrency(results.eiPremium)}</span>
                      </div>
                    )}
                    <div className="border-t border-indigo-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-indigo-900">Net After Tax</span>
                        <span className="font-bold text-2xl text-indigo-900">{formatCurrency(results.netIncome)}</span>
                      </div>
                      <p className="text-sm text-indigo-600 mt-1">
                        {formatCurrency(results.monthlyNet)}/month
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-600 mb-1">Effective Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{formatPercent(results.effectiveRate)}</p>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-slate-600 mb-1">Marginal Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{formatPercent(results.marginalRate)}</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gross Revenue</span>
                      <span>{formatCurrency(results.grossRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Expenses</span>
                      <span className="text-red-600">-{formatCurrency(results.businessExpenses)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Net Income</span>
                      <span>{formatCurrency(results.netBusinessIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Federal Tax</span>
                      <span>{formatCurrency(results.federalTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Provincial Tax</span>
                      <span>{formatCurrency(results.provincialTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">CPP ({formatPercent(CPP_RATE_SELF_EMPLOYED)})</span>
                      <span>{formatCurrency(results.totalCPP)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="text-indigo-800 font-medium mb-1">No results yet</p>
                <p className="text-indigo-600 text-sm">Tell me about your business income to calculate taxes</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Self-Employment CPP</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Pay both employer + employee portions ({formatPercent(CPP_RATE_SELF_EMPLOYED)})</li>
                    <li>Half is tax-deductible</li>
                    <li>EI is optional for special benefits</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Self-Employment Taxes in Canada
          </h2>
          <p className="text-slate-600 mb-4">
            As a self-employed individual in Canada, you're responsible for paying both the
            employee and employer portions of CPP contributions—a total of {formatPercent(CPP_RATE_SELF_EMPLOYED)}.
            This is in addition to federal and provincial income tax.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">CPP for Self-Employed ({TAX_YEAR})</h3>
          <p className="text-slate-600 mb-4">
            The maximum CPP contribution for self-employed individuals is {formatCurrency(CPP_MAX_CONTRIBUTION_SELF_EMPLOYED)}.
            If your income exceeds {formatCurrency(CPP_MAX_PENSIONABLE_EARNINGS)}, you also pay CPP2 contributions.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates. Your actual tax may vary
              based on other income sources, deductions, and credits. Consider consulting a tax professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
