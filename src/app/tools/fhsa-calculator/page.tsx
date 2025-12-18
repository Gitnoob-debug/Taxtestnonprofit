'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Home, Info, Check, X, User, Send, Bot, Sparkles, Loader2, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
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
import { PersonalizedBanner } from '@/components/PersonalizedBanner'
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

  // Auto-populate from profile (province, income, FHSA contributions)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.province) setProvince(profile.province)
      if (profile.annual_income) setIncome(profile.annual_income.toString())
      if (profile.fhsa_contributions_lifetime) {
        // Calculate years open based on contributions
        const yearsFromContributions = Math.ceil(profile.fhsa_contributions_lifetime / FHSA_ANNUAL_LIMIT)
        if (yearsFromContributions > 1) setYearsOpen(Math.min(yearsFromContributions, 5).toString())
      }
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  // Scroll management - only scroll on assistant responses, not user input
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(true)

  const handleScroll = () => {
    const container = chatContainerRef.current
    if (!container) return
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150
    shouldScrollRef.current = isNearBottom
  }

  useEffect(() => {
    const container = chatContainerRef.current
    if (!container || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    if (shouldScrollRef.current && lastMessage?.role === 'assistant') {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight
      })
    }
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
  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend
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

  // Two simple examples that auto-solve
  const examplePrompts = [
    "I earn $75,000 in Ontario and want to put $8,000 in my FHSA",
    "I make $90,000 in BC and want to max out my FHSA"
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Calculators
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 text-pink-700 text-sm font-medium mb-4">
            <Home className="h-4 w-4" />
            <span>First Home Savings Account</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            FHSA Calculator
          </h1>
          <p className="text-lg text-slate-500">
            Tell me about your situation and I'll calculate your tax savings instantly.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="FHSA calculator"
          prefilledFields={['income', 'province']}
        />

        {/* Main Layout - Chat takes prominence */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* AI Chat Interface - PRIMARY (takes 3/5 of space) */}
          <div className="lg:col-span-3 card-premium overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-5 border-b border-slate-200/60 bg-gradient-to-r from-pink-500 to-rose-500">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Chat with FHSA Assistant</h3>
                <p className="text-sm text-white/80">Just describe your situation in plain English</p>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6 shadow-xl shadow-pink-500/25">
                    <Home className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    How can I help with your FHSA?
                  </h3>
                  <p className="text-slate-500 mb-8 max-w-md">
                    Tell me your income, where you live, and how much you want to contribute. I'll calculate your tax savings right away.
                  </p>

                  {/* Example buttons - clickable and auto-send */}
                  <div className="w-full max-w-md space-y-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Click an example to try:</p>
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left p-4 rounded-xl card-premium text-sm text-slate-700 hover:border-pink-200 transition-all"
                      >
                        <span className="text-pink-500 font-medium">"</span>
                        {prompt}
                        <span className="text-pink-500 font-medium">"</span>
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
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-5 py-3",
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-br-md shadow-lg'
                            : 'card-premium rounded-bl-md text-slate-700'
                        )}
                      >
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.content}</p>
                        {msg.fieldUpdates && Object.keys(msg.fieldUpdates).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200/50">
                            <p className="text-xs opacity-70 mb-2">Updated:</p>
                            <div className="flex flex-wrap gap-2">
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
                                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                      msg.role === 'user'
                                        ? "bg-white/20 text-white"
                                        : "bg-pink-50 text-pink-700"
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
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
                        <Loader2 className="h-5 w-5 text-white animate-spin" />
                      </div>
                      <div className="card-premium rounded-2xl rounded-bl-md px-5 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2.5 w-2.5 rounded-full bg-pink-500"
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
            <div className="p-5 border-t border-slate-200/60 bg-slate-50/50">
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your situation here... (e.g., I make $80,000 in BC)"
                  className="min-h-[80px] max-h-[150px] pr-14 resize-none text-base bg-white border border-slate-200 focus:border-pink-300 focus:ring-2 focus:ring-pink-500/20 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Manual Input Toggle */}
            <button
              onClick={() => setShowManualInputs(!showManualInputs)}
              className="w-full p-3 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 border-t border-slate-200/60"
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
                  className="overflow-hidden border-t border-slate-200/60"
                >
                  <div className="p-4 space-y-4 bg-slate-50">
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

          {/* Results Section (takes 2/5 of space) */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Summary Card */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-xl shadow-pink-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <Home className="h-5 w-5" />
                    <h3 className="font-semibold">Your Tax Savings</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(results.taxSavings)}
                  </div>
                  <p className="text-white/80 text-sm">
                    On a {formatCurrency(results.actualContribution)} contribution
                  </p>
                </div>

                {/* Details Card */}
                <div className="card-premium p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Breakdown
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contribution room available</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(results.totalAvailableRoom)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Your contribution</span>
                      <span className="font-semibold text-slate-900">
                        {formatCurrency(results.actualContribution)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Marginal tax rate</span>
                      <span className="font-semibold text-slate-900">
                        {formatPercent(results.marginalRate)}
                      </span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Lifetime room remaining</span>
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(results.lifetimeRemaining)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full"
                        style={{ width: `${(results.actualContribution / FHSA_LIFETIME_LIMIT) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {formatCurrency(results.actualContribution)} of {formatCurrency(FHSA_LIFETIME_LIMIT)} lifetime limit
                    </p>
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/60">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-semibold mb-1">FHSA Limits</p>
                      <p className="text-amber-700 text-xs">
                        Annual: {formatCurrency(FHSA_ANNUAL_LIMIT)} | Lifetime: {formatCurrency(FHSA_LIFETIME_LIMIT)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="card-premium p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-2">
                  Your results will appear here
                </p>
                <p className="text-sm text-slate-400">
                  Chat with the assistant to calculate your FHSA tax savings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FHSA vs RRSP HBP Comparison */}
        <div className="mt-10 card-premium overflow-hidden">
          <div className="p-6 border-b border-slate-200/60">
            <h3 className="text-lg font-bold text-slate-900">
              FHSA vs RRSP Home Buyers' Plan
            </h3>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                <th className="text-center p-4 font-semibold text-pink-600">FHSA</th>
                <th className="text-center p-4 font-semibold text-blue-600">RRSP HBP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 text-slate-600">Maximum for home purchase</td>
                <td className="p-4 text-center font-semibold text-slate-900">{formatCurrency(FHSA_LIFETIME_LIMIT)}</td>
                <td className="p-4 text-center font-semibold text-slate-900">$35,000</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Tax deduction on contribution</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-emerald-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-emerald-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Tax-free withdrawal</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-emerald-500 mx-auto" /></td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Must repay to account</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-emerald-500 mx-auto" /> No</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-red-400 mx-auto" /> Yes, over 15 years</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Can combine with each other</td>
                <td className="p-4 text-center" colSpan={2}>
                  <Check className="h-5 w-5 text-emerald-500 mx-auto" /> Yes! Up to $75,000 total
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
            What is the FHSA (First Home Savings Account)?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            The First Home Savings Account (FHSA) is a registered account introduced in 2023 that combines the best features of an RRSP and TFSA for first-time home buyers. Contributions are tax-deductible like an RRSP, and withdrawals for a qualifying home purchase are tax-free like a TFSA.
          </p>

          <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">
            FHSA Eligibility Requirements
          </h3>
          <ul className="space-y-3 text-slate-600 mb-8 text-lg">
            <li>Must be a Canadian resident</li>
            <li>Must be at least 18 years old</li>
            <li>Must be a first-time home buyer (haven't owned a home in the past 4 years)</li>
            <li>Must have a valid Social Insurance Number (SIN)</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">
            How FHSA Contribution Room Works
          </h3>
          <ul className="space-y-3 text-slate-600 mb-8 text-lg">
            <li><strong className="text-slate-900">Annual limit:</strong> $8,000 per year</li>
            <li><strong className="text-slate-900">Lifetime limit:</strong> $40,000 total</li>
            <li><strong className="text-slate-900">Carry forward:</strong> Unused room carries forward up to $8,000 per year</li>
            <li><strong className="text-slate-900">Maximum single year:</strong> $16,000 if you have carry-forward room</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mb-4 mt-10">
            Combining FHSA with RRSP HBP
          </h3>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            You can use both the FHSA and the RRSP Home Buyers' Plan together! This allows you to withdraw up to $75,000 tax-free for your first home ($40,000 from FHSA + $35,000 from RRSP HBP). The key difference is that FHSA withdrawals never need to be repaid, while RRSP HBP withdrawals must be repaid over 15 years.
          </p>

          <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-6 mt-10">
            <p className="text-amber-800 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance. FHSA rules can be complex and individual situations vary. Consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
