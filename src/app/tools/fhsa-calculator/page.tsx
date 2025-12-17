'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Info, Check, X, User, Send, Bot, Sparkles, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  calculateTotalTax,
  PROVINCE_NAMES,
  FHSA_ANNUAL_LIMIT,
  FHSA_LIFETIME_LIMIT,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  fieldUpdates?: Record<string, string | number>
}

export default function FHSACalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [income, setIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [yearsOpen, setYearsOpen] = useState<string>('1')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showManualInputs, setShowManualInputs] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Calculator fields for the AI assistant
  const calculatorFields = useMemo(() => [
    { name: 'income', label: 'Annual Income', type: 'number' as const, currentValue: income },
    { name: 'contribution', label: 'Planned Contribution', type: 'number' as const, currentValue: contribution },
    { name: 'yearsOpen', label: 'Years FHSA Open', type: 'number' as const, currentValue: yearsOpen },
    {
      name: 'province', label: 'Province/Territory', type: 'select' as const,
      options: Object.entries(PROVINCE_NAMES).map(([code, name]) => ({ value: code, label: name })),
      currentValue: province
    }
  ], [income, contribution, yearsOpen, province])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'income': setIncome(strValue); break
      case 'contribution': setContribution(strValue); break
      case 'yearsOpen': setYearsOpen(strValue); break
      case 'province': setProvince(strValue); break
    }
  }

  // Auto-populate province from profile
  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const results = useMemo(() => {
    const incomeNum = parseFloat(income) || 0
    const contributionNum = parseFloat(contribution) || 0
    const yearsNum = parseInt(yearsOpen) || 1

    if (incomeNum <= 0 || contributionNum <= 0) return null

    // Calculate contribution room
    const usedRoom = (yearsNum - 1) * FHSA_ANNUAL_LIMIT // Room from previous years (assuming max unused)
    const currentYearRoom = FHSA_ANNUAL_LIMIT
    const totalAvailableRoom = Math.min(usedRoom + currentYearRoom, FHSA_LIFETIME_LIMIT)

    const actualContribution = Math.min(contributionNum, totalAvailableRoom)

    // Tax savings
    const taxInfo = calculateTotalTax(incomeNum, province)
    const taxSavings = actualContribution * taxInfo.marginalRate

    // Compare to RRSP HBP
    const rrspHBPLimit = 35000
    const rrspTaxSavings = Math.min(contributionNum, rrspHBPLimit) * taxInfo.marginalRate

    return {
      totalAvailableRoom,
      actualContribution,
      marginalRate: taxInfo.marginalRate,
      taxSavings,
      remainingRoom: totalAvailableRoom - actualContribution,
      lifetimeRemaining: FHSA_LIFETIME_LIMIT - actualContribution,
      rrspHBPTaxSavings: rrspTaxSavings,
      fhsaAdvantage: taxSavings, // FHSA withdrawals are tax-free, RRSP HBP must be repaid
    }
  }, [income, contribution, yearsOpen, province])

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

  // Handle sending message to AI
  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/calculator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          calculatorType: 'fhsa-calculator',
          fields: calculatorFields.map(f => ({
            name: f.name,
            label: f.label,
            type: f.type,
            options: f.options,
            currentValue: f.currentValue
          })),
          conversationHistory: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      // Apply field updates
      if (data.fieldUpdates) {
        Object.entries(data.fieldUpdates).forEach(([field, value]) => {
          handleFieldUpdate(field, value as string | number)
        })
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        fieldUpdates: data.fieldUpdates
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Assistant error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I had trouble understanding that. Could you try rephrasing? For example, you can say \"I make $75,000 in Ontario and want to contribute $8,000 to my FHSA\"."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const examplePrompts = [
    "I make $85,000 in Ontario and want to contribute $8,000 to my FHSA",
    "I've had my FHSA for 2 years and want to max it out. I earn $65k in BC",
    "What if I contributed $16,000 with $100k income in Alberta?"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            FHSA Calculator (First Home Savings Account)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tell me about your situation and I'll calculate your FHSA tax savings.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
          {/* AI Chat Interface - PRIMARY */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col" style={{ minHeight: '500px' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">FHSA Assistant</h3>
                <p className="text-xs text-red-600 dark:text-red-400">Describe your situation in plain English</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="space-y-6">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 flex items-center justify-center mb-4">
                      <Home className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                    <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
                      Tell me about your FHSA situation
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Share your income, province, and how much you'd like to contribute. I'll calculate your tax savings instantly.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider px-1">Try saying:</p>
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(prompt)
                          inputRef.current?.focus()
                        }}
                        className="w-full text-left p-3 rounded-xl border-2 border-red-100 dark:border-red-800 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all text-sm text-slate-700 dark:text-slate-300 font-medium"
                      >
                        "{prompt}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex gap-3",
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {msg.role === 'assistant' && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 flex items-center justify-center shrink-0">
                          <Bot className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-br-md shadow-md'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                        {msg.fieldUpdates && Object.keys(msg.fieldUpdates).length > 0 && (
                          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                            <p className="text-xs opacity-75 mb-1">Values updated:</p>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(msg.fieldUpdates).map(([field, value]) => {
                                const fieldLabel = calculatorFields.find(f => f.name === field)?.label || field
                                let displayValue = value
                                if (field === 'province') {
                                  displayValue = PROVINCE_NAMES[value as keyof typeof PROVINCE_NAMES] || value
                                } else if (field === 'income' || field === 'contribution') {
                                  displayValue = formatCurrency(Number(value))
                                }
                                return (
                                  <span
                                    key={field}
                                    className={cn(
                                      "inline-flex items-center px-2 py-0.5 rounded-full text-xs",
                                      msg.role === 'user'
                                        ? "bg-white/20 text-white"
                                        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                                    )}
                                  >
                                    {fieldLabel}: {displayValue}
                                  </span>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 flex items-center justify-center shrink-0">
                        <Loader2 className="h-4 w-4 text-red-600 dark:text-red-400 animate-spin" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-md px-4 py-3">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2 w-2 rounded-full bg-red-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="E.g., I make $80,000 in BC and want to contribute $8,000..."
                  className="min-h-[60px] max-h-[120px] pr-12 resize-none text-sm bg-white dark:bg-slate-800 border-2 border-red-100 dark:border-red-800 focus:border-red-300 dark:focus:border-red-600"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 bottom-2 h-8 w-8 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Manual Input Toggle */}
            <button
              onClick={() => setShowManualInputs(!showManualInputs)}
              className="w-full p-3 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 border-t border-slate-200 dark:border-slate-700"
            >
              {showManualInputs ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {showManualInputs ? 'Hide manual inputs' : 'Or enter values manually'}
            </button>

            {/* Collapsible Manual Inputs */}
            <AnimatePresence>
              {showManualInputs && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-slate-200 dark:border-slate-700"
                >
                  <div className="p-4 space-y-4 bg-slate-50 dark:bg-slate-900">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="income" className="text-xs">Annual Income</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="income"
                            type="number"
                            placeholder="70,000"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="contribution" className="text-xs">Planned Contribution</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="contribution"
                            type="number"
                            placeholder="8,000"
                            value={contribution}
                            onChange={(e) => setContribution(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="yearsOpen" className="text-xs">Years FHSA Open</Label>
                        <Select value={yearsOpen} onValueChange={setYearsOpen}>
                          <SelectTrigger className="mt-1 h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} year{year > 1 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="province" className="text-xs">Province/Territory</Label>
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
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Section */}
          <div className="space-y-6 lg:space-y-8">
            {results ? (
              <>
                {/* Summary Card */}
                <div className="bg-red-50 dark:bg-red-950 rounded-2xl border border-red-200 dark:border-red-800 p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-semibold text-red-900 dark:text-red-100">
                      Your FHSA Summary
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Available contribution room</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatCurrency(results.totalAvailableRoom)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Your contribution</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatCurrency(results.actualContribution)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700 dark:text-red-300">Your marginal tax rate</span>
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {formatPercent(results.marginalRate)}
                      </span>
                    </div>
                    <div className="border-t border-red-300 dark:border-red-700 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-red-900 dark:text-red-100">
                          Tax Savings
                        </span>
                        <span className="font-bold text-2xl text-red-600 dark:text-red-400">
                          {formatCurrency(results.taxSavings)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Room Remaining */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Remaining Room
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Lifetime limit remaining</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.lifetimeRemaining)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${(results.actualContribution / FHSA_LIFETIME_LIMIT) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatCurrency(results.actualContribution)} of {formatCurrency(FHSA_LIFETIME_LIMIT)} lifetime limit used
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-5 bg-amber-50 dark:bg-amber-950 rounded-xl border border-amber-200 dark:border-amber-800">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                      <p className="font-medium mb-2">FHSA Key Limits ({TAX_YEAR})</p>
                      <ul className="space-y-1 text-amber-700 dark:text-amber-300">
                        <li>• Annual limit: {formatCurrency(FHSA_ANNUAL_LIMIT)}</li>
                        <li>• Lifetime limit: {formatCurrency(FHSA_LIFETIME_LIMIT)}</li>
                        <li>• Unused room carries forward (up to $8K/year)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-12 text-center">
                <Home className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-2">
                  Your results will appear here
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Tell the AI assistant about your income, province, and contribution plans
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FHSA vs RRSP HBP Comparison */}
        <div className="mt-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              FHSA vs RRSP Home Buyers' Plan
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900 dark:text-white">Feature</th>
                <th className="text-center p-4 font-semibold text-red-600 dark:text-red-400">FHSA</th>
                <th className="text-center p-4 font-semibold text-blue-600 dark:text-blue-400">RRSP HBP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Maximum for home purchase</td>
                <td className="p-4 text-center font-medium">{formatCurrency(FHSA_LIFETIME_LIMIT)}</td>
                <td className="p-4 text-center font-medium">$35,000</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax deduction on contribution</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Tax-free withdrawal</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Must repay to account</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-green-500 mx-auto" /> No</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-red-400 mx-auto" /> Yes, over 15 years</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 dark:text-slate-400">Can combine with each other</td>
                <td className="p-4 text-center" colSpan={2}>
                  <Check className="h-5 w-5 text-green-500 mx-auto" /> Yes! Up to $75,000 total
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            What is the FHSA (First Home Savings Account)?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The First Home Savings Account (FHSA) is a registered account introduced in 2023 that combines the best features of an RRSP and TFSA for first-time home buyers. Contributions are tax-deductible like an RRSP, and withdrawals for a qualifying home purchase are tax-free like a TFSA.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            FHSA Eligibility Requirements
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li>Must be a Canadian resident</li>
            <li>Must be at least 18 years old</li>
            <li>Must be a first-time home buyer (haven't owned a home in the past 4 years)</li>
            <li>Must have a valid Social Insurance Number (SIN)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            How FHSA Contribution Room Works
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li><strong>Annual limit:</strong> $8,000 per year</li>
            <li><strong>Lifetime limit:</strong> $40,000 total</li>
            <li><strong>Carry forward:</strong> Unused room carries forward up to $8,000 per year</li>
            <li><strong>Maximum single year:</strong> $16,000 if you have carry-forward room</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Combining FHSA with RRSP HBP
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            You can use both the FHSA and the RRSP Home Buyers' Plan together! This allows you to withdraw up to $75,000 tax-free for your first home ($40,000 from FHSA + $35,000 from RRSP HBP). The key difference is that FHSA withdrawals never need to be repaid, while RRSP HBP withdrawals must be repaid over 15 years.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance. FHSA rules can be complex and individual situations vary. Consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
