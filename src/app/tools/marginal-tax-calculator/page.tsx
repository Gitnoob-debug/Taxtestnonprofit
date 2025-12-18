'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, User, Send, Bot, Loader2, ChevronDown, ChevronUp, MessageCircle, TrendingUp } from 'lucide-react'
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
  PROVINCE_NAMES,
  FEDERAL_BRACKETS,
  PROVINCIAL_BRACKETS,
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

export default function MarginalTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [income, setIncome] = useState<string>('')
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
    {
      name: 'province', label: 'Province/Territory', type: 'select' as const,
      options: Object.entries(PROVINCE_NAMES).map(([code, name]) => ({ value: code, label: name })),
      currentValue: province
    }
  ], [income, province])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    if (fieldName === 'income') setIncome(value.toString())
    else if (fieldName === 'province') setProvince(value.toString())
  }

  // Auto-populate from profile (province, income)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.province) setProvince(profile.province)
      if (profile.annual_income) setIncome(profile.annual_income.toString())
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

    // Get all combined brackets for this province
    const provincialBrackets = PROVINCIAL_BRACKETS[province] || []

    // Create combined bracket table
    const allThresholds = new Set<number>([0])
    FEDERAL_BRACKETS.forEach(b => {
      allThresholds.add(b.min)
      if (b.max !== Infinity) allThresholds.add(b.max)
    })
    provincialBrackets.forEach(b => {
      allThresholds.add(b.min)
      if (b.max !== Infinity) allThresholds.add(b.max)
    })

    const sortedThresholds = Array.from(allThresholds).sort((a, b) => a - b)

    const combinedBrackets = []
    for (let i = 0; i < sortedThresholds.length; i++) {
      const min = sortedThresholds[i]
      const max = sortedThresholds[i + 1] || Infinity

      const federalRate = FEDERAL_BRACKETS.find(b => min >= b.min && min < b.max)?.rate || 0
      const provincialRate = provincialBrackets.find(b => min >= b.min && min < b.max)?.rate || 0

      combinedBrackets.push({
        min,
        max,
        federalRate,
        provincialRate,
        combinedRate: federalRate + provincialRate,
      })
    }

    // Find current bracket
    const currentBracket = combinedBrackets.find(b => incomeNum >= b.min && incomeNum < b.max)

    return {
      income: incomeNum,
      brackets: combinedBrackets,
      currentBracket,
      marginalRate: currentBracket?.combinedRate || 0,
      federalMarginal: currentBracket?.federalRate || 0,
      provincialMarginal: currentBracket?.provincialRate || 0,
    }
  }, [income, province])

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
          calculatorType: 'marginal-tax-calculator',
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
        content: "Sorry, I had trouble with that. Try something like \"I make $90,000 in Ontario\"."
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
    "What's my marginal rate if I make $85,000 in Ontario?",
    "I earn $150,000 in BC, show me my tax bracket"
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
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Marginal Tax Rate Calculator {TAX_YEAR}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tell me your income and I'll show you your marginal tax rate and bracket.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="marginal tax calculator"
          prefilledFields={['income', 'province']}
        />

        {/* Main Layout - Chat takes prominence */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* AI Chat Interface - PRIMARY (takes 3/5 of space) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl border-2 border-purple-200 dark:border-purple-800 shadow-xl shadow-purple-100 dark:shadow-purple-950/50 overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-5 border-b border-purple-100 dark:border-purple-900 bg-gradient-to-r from-purple-500 to-violet-500">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Chat with Tax Bracket Assistant</h3>
                <p className="text-sm text-white/80">Just tell me your income and province</p>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 flex items-center justify-center mb-6">
                    <TrendingUp className="h-10 w-10 text-purple-500 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    What's your marginal tax rate?
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                    Tell me your income and province. I'll show you which tax bracket you're in and your marginal rate.
                  </p>

                  {/* Example buttons - clickable and auto-send */}
                  <div className="w-full max-w-md space-y-3">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Click an example to try:</p>
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all text-base text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-purple-500 dark:text-purple-400 font-medium">"</span>
                        {prompt}
                        <span className="text-purple-500 dark:text-purple-400 font-medium">"</span>
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
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 flex items-center justify-center shrink-0">
                          <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-5 py-3",
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-br-md shadow-lg'
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
                                } else if (field === 'income') {
                                  displayValue = formatCurrency(Number(value))
                                }
                                return (
                                  <span
                                    key={field}
                                    className={cn(
                                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                      msg.role === 'user'
                                        ? "bg-white/20 text-white"
                                        : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
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
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-100 to-violet-100 dark:from-purple-900 dark:to-violet-900 flex items-center justify-center shrink-0">
                        <Loader2 className="h-5 w-5 text-purple-600 dark:text-purple-400 animate-spin" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-md px-5 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2.5 w-2.5 rounded-full bg-purple-400"
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
                  placeholder="Type your situation here... (e.g., I earn $100,000 in Alberta)"
                  className="min-h-[80px] max-h-[150px] pr-14 resize-none text-base bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 focus:border-purple-400 dark:focus:border-purple-500 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg"
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
                        <Label htmlFor="income" className="text-xs">Annual Income</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="income"
                            type="number"
                            placeholder="75,000"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
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
            {results.currentBracket && parseFloat(income) > 0 ? (
              <>
                {/* Marginal Rate Card - Primary */}
                <div className="bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-semibold">Your Marginal Rate</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {formatPercent(results.marginalRate)}
                  </div>
                  <p className="text-white/80 text-sm">
                    Federal: {formatPercent(results.federalMarginal)} + Provincial: {formatPercent(results.provincialMarginal)}
                  </p>
                </div>

                {/* Bracket Info */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Your Bracket
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Income range</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.currentBracket.min)} - {results.currentBracket.max === Infinity ? '∞' : formatCurrency(results.currentBracket.max)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Your income</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.income)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mini Bracket Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 max-h-64 overflow-y-auto">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    All Brackets - {PROVINCE_NAMES[province]}
                  </h3>
                  <div className="space-y-1 text-xs">
                    {results.brackets.map((bracket, i) => {
                      const isCurrentBracket = results.currentBracket && bracket.min === results.currentBracket.min
                      return (
                        <div
                          key={i}
                          className={cn(
                            "flex justify-between py-1.5 px-2 rounded",
                            isCurrentBracket ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300" : "text-slate-600 dark:text-slate-400"
                          )}
                        >
                          <span>
                            {formatCurrency(bracket.min)}{bracket.max === Infinity ? '+' : `-${formatCurrency(bracket.max)}`}
                          </span>
                          <span className="font-medium">
                            {formatPercent(bracket.combinedRate)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Your results will appear here
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Chat with the assistant to see your tax bracket
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            How Marginal Tax Rates Work in Canada
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Canada uses a progressive tax system with multiple tax brackets. Each bracket has a different rate, and you only pay that rate on income within that bracket—not on all your income.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            Understanding Marginal vs Effective Rate
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Your marginal tax rate is the tax you pay on your next dollar of income. It's not the rate on all your income—that's your effective rate. Knowing your marginal rate helps with decisions like RRSP contributions (which save tax at your marginal rate).
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates. Your actual tax situation may vary. Consult a tax professional for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
