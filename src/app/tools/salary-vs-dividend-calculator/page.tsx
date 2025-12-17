'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, Building2, Wallet, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
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
  calculateDividendTax,
  CPP_RATE_SELF_EMPLOYED,
  CPP_MAX_CONTRIBUTION_SELF_EMPLOYED,
  CPP_BASIC_EXEMPTION,
  CPP_MAX_PENSIONABLE_EARNINGS,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { motion, AnimatePresence } from 'framer-motion'

// Small business corporate tax rates by province (2025)
const SMALL_BUSINESS_RATES: Record<string, number> = {
  AB: 0.11,
  BC: 0.11,
  MB: 0.09,
  NB: 0.115,
  NL: 0.12,
  NS: 0.115,
  NT: 0.11,
  NU: 0.12,
  ON: 0.122,
  PE: 0.10,
  QC: 0.123,
  SK: 0.10,
  YT: 0.11,
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function SalaryVsDividendCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [corporateProfit, setCorporateProfit] = useState<string>('')
  const [province, setProvince] = useState<string>('ON')
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
      case 'corporateProfit': setCorporateProfit(strValue); break
      case 'income': setCorporateProfit(strValue); break
      case 'province': setProvince(strValue); break
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
          calculatorType: 'salary-vs-dividend-calculator',
          fields: [
            { name: 'corporateProfit', label: 'Corporate Profit', type: 'number', currentValue: corporateProfit },
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
    const profit = parseFloat(corporateProfit) || 0
    if (profit <= 0) return null

    const corpRate = SMALL_BUSINESS_RATES[province] || 0.12

    // SCENARIO 1: All Salary
    const maxCPPEarnings = CPP_MAX_PENSIONABLE_EARNINGS - CPP_BASIC_EXEMPTION
    const employerCPP = Math.min(maxCPPEarnings * CPP_RATE_SELF_EMPLOYED / 2, CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2)

    let salaryGross = profit
    let employerCPPCost = 0

    if (profit > CPP_MAX_PENSIONABLE_EARNINGS) {
      salaryGross = profit - employerCPP
      employerCPPCost = employerCPP
    } else if (profit > CPP_BASIC_EXEMPTION) {
      salaryGross = (profit + CPP_BASIC_EXEMPTION * 0.0595) / 1.0595
      employerCPPCost = profit - salaryGross
    }

    const employeeCPP = Math.min(
      Math.max(0, salaryGross - CPP_BASIC_EXEMPTION) * 0.0595,
      CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
    )

    const salaryTax = calculateTotalTax(salaryGross, province)
    const salaryAfterTax = salaryGross - salaryTax.totalTax - employeeCPP
    const salaryTotalTax = salaryTax.totalTax + employeeCPP + employerCPPCost

    // SCENARIO 2: All Dividends
    const corpTax = profit * corpRate
    const afterCorpTax = profit - corpTax

    const dividendResult = calculateDividendTax(afterCorpTax, false, 0, province)
    const dividendPersonalTax = dividendResult.netTax
    const dividendAfterTax = afterCorpTax - dividendPersonalTax
    const dividendTotalTax = corpTax + dividendPersonalTax

    // SCENARIO 3: Optimal Mix
    const optimalSalary = Math.min(profit, CPP_MAX_PENSIONABLE_EARNINGS)

    let optimalEmployerCPP = 0
    if (optimalSalary > CPP_BASIC_EXEMPTION) {
      optimalEmployerCPP = Math.min(
        (optimalSalary - CPP_BASIC_EXEMPTION) * 0.0595,
        CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
      )
    }

    const actualOptimalSalary = optimalSalary - optimalEmployerCPP
    const remainingForDividends = profit - optimalSalary

    let optimalCorpTax = 0
    let optimalDividendAmount = 0

    if (remainingForDividends > 0) {
      optimalCorpTax = remainingForDividends * corpRate
      optimalDividendAmount = remainingForDividends - optimalCorpTax
    }

    const optimalEmployeeCPP = Math.min(
      Math.max(0, actualOptimalSalary - CPP_BASIC_EXEMPTION) * 0.0595,
      CPP_MAX_CONTRIBUTION_SELF_EMPLOYED / 2
    )

    const simplifiedOptimalSalaryTax = calculateTotalTax(actualOptimalSalary, province).totalTax
    const simplifiedOptimalDivResult = calculateDividendTax(optimalDividendAmount, false, actualOptimalSalary, province)
    const simplifiedOptimalTotalTax = optimalCorpTax + simplifiedOptimalSalaryTax + optimalEmployeeCPP + optimalEmployerCPP + simplifiedOptimalDivResult.netTax
    const simplifiedOptimalAfterTax = profit - simplifiedOptimalTotalTax

    return {
      corporateProfit: profit,
      corpRate,
      salary: {
        gross: salaryGross,
        employerCPP: employerCPPCost,
        employeeCPP,
        personalTax: salaryTax.totalTax,
        totalTax: salaryTotalTax,
        afterTax: salaryAfterTax,
        effectiveRate: salaryTotalTax / profit,
      },
      dividend: {
        corpTax,
        dividendAmount: afterCorpTax,
        personalTax: dividendPersonalTax,
        totalTax: dividendTotalTax,
        afterTax: dividendAfterTax,
        effectiveRate: dividendTotalTax / profit,
      },
      optimal: {
        salaryPortion: actualOptimalSalary,
        dividendPortion: optimalDividendAmount,
        employerCPP: optimalEmployerCPP,
        employeeCPP: optimalEmployeeCPP,
        corpTax: optimalCorpTax,
        totalTax: simplifiedOptimalTotalTax,
        afterTax: simplifiedOptimalAfterTax,
        effectiveRate: simplifiedOptimalTotalTax / profit,
      },
      bestOption: salaryAfterTax >= dividendAfterTax && salaryAfterTax >= simplifiedOptimalAfterTax
        ? 'salary'
        : simplifiedOptimalAfterTax >= dividendAfterTax
          ? 'optimal'
          : 'dividend',
    }
  }, [corporateProfit, province])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(1) + '%'
  }

  const examplePrompts = [
    "My corp has $150,000 profit in Ontario",
    "$200k corporate income in BC"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-violet-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Salary vs Dividend Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Compare taking income as salary vs dividends from your corporation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Salary vs Dividend Assistant</h2>
                  <p className="text-violet-100 text-sm">Tell me about your corporate income</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Compare salary vs dividends
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me your corporate profit and I'll show you the best way to pay yourself.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-violet-500 text-white'
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
                  placeholder="e.g., 'My corporation made $120,000 profit in Alberta'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-violet-500 hover:bg-violet-600"
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
                      <div>
                        <Label htmlFor="corporateProfit" className="text-xs">Corporate Profit</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="corporateProfit"
                            type="number"
                            placeholder="100,000"
                            value={corporateProfit}
                            onChange={(e) => setCorporateProfit(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
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
                          <p className="text-xs text-violet-600 mt-1 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            From profile
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Results Section - 2/5 width */}
          <div className="lg:col-span-2 space-y-4">
            {results ? (
              <>
                {/* Comparison Cards */}
                <div className="space-y-3">
                  {/* Salary Card */}
                  <div className={`rounded-xl p-4 border-2 ${
                    results.bestOption === 'salary'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Wallet className={`h-4 w-4 ${results.bestOption === 'salary' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <h3 className="font-semibold text-slate-900 text-sm">All Salary</h3>
                      </div>
                      {results.bestOption === 'salary' && (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Best</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">You Keep</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(results.salary.afterTax)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Rate: {formatPercent(results.salary.effectiveRate)} | Builds CPP</p>
                  </div>

                  {/* Dividend Card */}
                  <div className={`rounded-xl p-4 border-2 ${
                    results.bestOption === 'dividend'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className={`h-4 w-4 ${results.bestOption === 'dividend' ? 'text-emerald-600' : 'text-slate-400'}`} />
                        <h3 className="font-semibold text-slate-900 text-sm">All Dividends</h3>
                      </div>
                      {results.bestOption === 'dividend' && (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Best</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">You Keep</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(results.dividend.afterTax)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Rate: {formatPercent(results.dividend.effectiveRate)} | No CPP</p>
                  </div>

                  {/* Optimal Mix Card */}
                  <div className={`rounded-xl p-4 border-2 ${
                    results.bestOption === 'optimal'
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${results.bestOption === 'optimal' ? 'text-emerald-600' : 'text-slate-400'}`}>⚡</span>
                        <h3 className="font-semibold text-slate-900 text-sm">Optimal Mix</h3>
                      </div>
                      {results.bestOption === 'optimal' && (
                        <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Best</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">You Keep</span>
                      <span className="font-bold text-emerald-600">{formatCurrency(results.optimal.afterTax)}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Rate: {formatPercent(results.optimal.effectiveRate)} | Salary to CPP max</p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm">Tax Breakdown</h3>
                  <div className="text-xs space-y-2">
                    <div className="grid grid-cols-4 gap-2 pb-2 border-b border-slate-200">
                      <span></span>
                      <span className="font-medium text-center">Salary</span>
                      <span className="font-medium text-center">Div</span>
                      <span className="font-medium text-center">Mix</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span className="text-slate-600">Corp Tax</span>
                      <span className="text-center">$0</span>
                      <span className="text-center">{formatCurrency(results.dividend.corpTax)}</span>
                      <span className="text-center">{formatCurrency(results.optimal.corpTax)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <span className="text-slate-600">Personal</span>
                      <span className="text-center">{formatCurrency(results.salary.personalTax)}</span>
                      <span className="text-center">{formatCurrency(results.dividend.personalTax)}</span>
                      <span className="text-center">{formatCurrency(results.optimal.totalTax - results.optimal.corpTax)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-200 font-medium">
                      <span>Total Tax</span>
                      <span className="text-center text-red-600">{formatCurrency(results.salary.totalTax)}</span>
                      <span className="text-center text-red-600">{formatCurrency(results.dividend.totalTax)}</span>
                      <span className="text-center text-red-600">{formatCurrency(results.optimal.totalTax)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-violet-600" />
                </div>
                <p className="text-violet-800 font-medium mb-1">No comparison yet</p>
                <p className="text-violet-600 text-sm">Tell me your corporate profit to compare options</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">Key Considerations</p>
                  <ul className="list-disc pl-3 space-y-0.5">
                    <li>Salary builds CPP & RRSP room</li>
                    <li>Dividends = no CPP contributions</li>
                    <li>Integration aims for equal total tax</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Salary vs Dividends: Which is Better?
          </h2>
          <p className="text-slate-600 mb-4">
            As a Canadian business owner, you can pay yourself through salary, dividends, or a combination.
            Each has different tax implications and affects your CPP benefits, RRSP room, and overall tax burden.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates.
              Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
