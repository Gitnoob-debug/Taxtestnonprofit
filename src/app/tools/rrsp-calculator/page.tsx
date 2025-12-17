'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, TrendingUp, User, Send, Bot, Loader2, ChevronDown, ChevronUp, MessageCircle, PiggyBank } from 'lucide-react'
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
  calculateRRSPTaxSavings,
  calculateTotalTax,
  PROVINCE_NAMES,
  RRSP_LIMIT_2024,
  RRSP_CONTRIBUTION_RATE,
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

export default function RRSPCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [income, setIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [unusedRoom, setUnusedRoom] = useState<string>('')
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
    { name: 'income', label: 'Previous Year Earned Income', type: 'number' as const, currentValue: income },
    { name: 'unusedRoom', label: 'Unused RRSP Room', type: 'number' as const, currentValue: unusedRoom },
    { name: 'contribution', label: 'Planned Contribution', type: 'number' as const, currentValue: contribution },
    {
      name: 'province', label: 'Province/Territory', type: 'select' as const,
      options: Object.entries(PROVINCE_NAMES).map(([code, name]) => ({ value: code, label: name })),
      currentValue: province
    }
  ], [income, unusedRoom, contribution, province])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'income': setIncome(strValue); break
      case 'unusedRoom': setUnusedRoom(strValue); break
      case 'contribution': setContribution(strValue); break
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
    const unusedRoomNum = parseFloat(unusedRoom) || 0

    if (incomeNum <= 0) return null

    // Calculate RRSP room based on previous year income
    const newRoom = Math.min(incomeNum * RRSP_CONTRIBUTION_RATE, RRSP_LIMIT_2024)
    const totalRoom = newRoom + unusedRoomNum

    // Calculate tax savings from contribution
    const actualContribution = Math.min(contributionNum, totalRoom)
    const { taxSavings, effectiveReturn } = calculateRRSPTaxSavings(actualContribution, incomeNum, province)

    // Get marginal rate for display
    const taxInfo = calculateTotalTax(incomeNum, province)

    return {
      newRoom,
      totalRoom,
      actualContribution,
      taxSavings,
      effectiveReturn,
      marginalRate: taxInfo.marginalRate,
      remainingRoom: totalRoom - actualContribution,
      excessContribution: contributionNum > totalRoom ? contributionNum - totalRoom : 0,
    }
  }, [income, contribution, unusedRoom, province])

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
          calculatorType: 'rrsp-calculator',
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
        content: "Sorry, I had trouble with that. Try something like \"I make $90,000 in Ontario and want to contribute $15,000\"."
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
    "I make $90,000 in Ontario and want to contribute $15,000",
    "I earn $120,000 in BC and want to max out my RRSP"
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
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            RRSP Calculator {TAX_YEAR}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tell me about your situation and I'll calculate your RRSP room and tax savings.
          </p>
        </div>

        {/* Main Layout - Chat takes prominence */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* AI Chat Interface - PRIMARY (takes 3/5 of space) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl border-2 border-teal-200 dark:border-teal-800 shadow-xl shadow-teal-100 dark:shadow-teal-950/50 overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-5 border-b border-teal-100 dark:border-teal-900 bg-gradient-to-r from-teal-500 to-emerald-500">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Chat with RRSP Assistant</h3>
                <p className="text-sm text-white/80">Just describe your situation in plain English</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center mb-6">
                    <PiggyBank className="h-10 w-10 text-teal-500 dark:text-teal-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    How can I help with your RRSP?
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                    Tell me your income, where you live, and how much you want to contribute. I'll calculate your tax savings right away.
                  </p>

                  {/* Example buttons - clickable and auto-send */}
                  <div className="w-full max-w-md space-y-3">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Click an example to try:</p>
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border-2 border-teal-100 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-md transition-all text-base text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-teal-500 dark:text-teal-400 font-medium">"</span>
                        {prompt}
                        <span className="text-teal-500 dark:text-teal-400 font-medium">"</span>
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
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center shrink-0">
                          <Bot className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-5 py-3",
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-md shadow-lg'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md'
                        )}
                      >
                        <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{msg.content}</p>
                        {msg.fieldUpdates && Object.keys(msg.fieldUpdates).length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-600/50">
                            <p className="text-xs opacity-70 mb-2">Updated:</p>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(msg.fieldUpdates).map(([field, value]) => {
                                const fieldLabel = calculatorFields.find(f => f.name === field)?.label || field
                                let displayValue = value
                                if (field === 'province') {
                                  displayValue = PROVINCE_NAMES[value as keyof typeof PROVINCE_NAMES] || value
                                } else if (field === 'income' || field === 'contribution' || field === 'unusedRoom') {
                                  displayValue = formatCurrency(Number(value))
                                }
                                return (
                                  <span
                                    key={field}
                                    className={cn(
                                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                      msg.role === 'user'
                                        ? "bg-white/20 text-white"
                                        : "bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300"
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
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 flex items-center justify-center shrink-0">
                        <Loader2 className="h-5 w-5 text-teal-600 dark:text-teal-400 animate-spin" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-md px-5 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2.5 w-2.5 rounded-full bg-teal-400"
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
            <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your situation here... (e.g., I make $100,000 in Alberta)"
                  className="min-h-[80px] max-h-[150px] pr-14 resize-none text-base bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 focus:border-teal-400 dark:focus:border-teal-500 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-lg"
                >
                  <Send className="h-5 w-5" />
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
                        <Label htmlFor="income" className="text-xs">Previous Year Income</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="income"
                            type="number"
                            placeholder="80,000"
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
                            placeholder="10,000"
                            value={contribution}
                            onChange={(e) => setContribution(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="unusedRoom" className="text-xs">Unused Room (Optional)</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="unusedRoom"
                            type="number"
                            placeholder="0"
                            value={unusedRoom}
                            onChange={(e) => setUnusedRoom(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
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
                {/* Tax Savings Card - Primary */}
                {results.actualContribution > 0 && (
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5" />
                      <h3 className="font-semibold">Your Tax Savings</h3>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {formatCurrency(results.taxSavings)}
                    </div>
                    <p className="text-white/80 text-sm">
                      {formatPercent(results.effectiveReturn)} return on {formatCurrency(results.actualContribution)}
                    </p>
                  </div>
                )}

                {/* RRSP Room Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Your RRSP Room
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">New room from {TAX_YEAR - 1} income</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.newRoom)}
                      </span>
                    </div>
                    {parseFloat(unusedRoom) > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Unused room carried forward</span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          +{formatCurrency(parseFloat(unusedRoom))}
                        </span>
                      </div>
                    )}
                    <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">Total Available</span>
                        <span className="font-bold text-teal-600 dark:text-teal-400">
                          {formatCurrency(results.totalRoom)}
                        </span>
                      </div>
                    </div>
                    {results.actualContribution > 0 && (
                      <div className="flex justify-between text-slate-500">
                        <span>After contribution</span>
                        <span>{formatCurrency(results.remainingRoom)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Marginal Rate */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">Marginal tax rate</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">
                      {formatPercent(results.marginalRate)}
                    </span>
                  </div>
                </div>

                {/* Warning for excess contribution */}
                {results.excessContribution > 0 && (
                  <div className="bg-red-50 dark:bg-red-950 rounded-xl border border-red-200 dark:border-red-800 p-4">
                    <p className="text-red-800 dark:text-red-200 text-sm">
                      <strong>Warning:</strong> Your contribution exceeds available room by {formatCurrency(results.excessContribution)}. Over-contributions beyond $2,000 have a 1% monthly penalty.
                    </p>
                  </div>
                )}

                {/* Info Box */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <p className="font-medium mb-1">{TAX_YEAR} RRSP Limits</p>
                      <p className="text-blue-700 dark:text-blue-300 text-xs">
                        Max: {formatCurrency(RRSP_LIMIT_2024)} | Rate: {formatPercent(RRSP_CONTRIBUTION_RATE)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Your results will appear here
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Chat with the assistant to calculate your RRSP savings
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">Understanding RRSP Contributions</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            A Registered Retirement Savings Plan (RRSP) is a tax-advantaged account that helps Canadians save for retirement. Contributions are tax-deductible, meaning they reduce your taxable income for the year.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">How RRSP Contribution Room Works</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
            Your RRSP contribution room is calculated as 18% of your previous year's earned income, up to the annual maximum ({formatCurrency(RRSP_LIMIT_2024)} for {TAX_YEAR}). Unused room carries forward indefinitely.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">Why Contribute to an RRSP?</h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8">
            <li className="flex gap-3"><span className="text-teal-500 font-bold">•</span><span><strong className="text-slate-900 dark:text-white">Tax deduction:</strong> Contributions reduce your taxable income</span></li>
            <li className="flex gap-3"><span className="text-teal-500 font-bold">•</span><span><strong className="text-slate-900 dark:text-white">Tax-deferred growth:</strong> Investments grow without annual taxation</span></li>
            <li className="flex gap-3"><span className="text-teal-500 font-bold">•</span><span><strong className="text-slate-900 dark:text-white">Lower tax in retirement:</strong> Withdrawals are taxed at your retirement rate, which is often lower</span></li>
            <li className="flex gap-3"><span className="text-teal-500 font-bold">•</span><span><strong className="text-slate-900 dark:text-white">Home Buyers' Plan:</strong> Withdraw up to $35,000 tax-free for a first home</span></li>
            <li className="flex gap-3"><span className="text-teal-500 font-bold">•</span><span><strong className="text-slate-900 dark:text-white">Lifelong Learning Plan:</strong> Withdraw up to $10,000/year for education</span></li>
          </ul>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-sm leading-relaxed m-0">
              <strong>Disclaimer:</strong> This calculator provides estimates for general guidance only. Consult a qualified tax professional for advice specific to your situation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
