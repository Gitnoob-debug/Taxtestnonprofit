'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, PiggyBank, Info, User, Send, Bot, Loader2, ChevronDown, ChevronUp, MessageCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  calculateTFSARoom,
  TFSA_ANNUAL_LIMITS,
  TFSA_LIMIT_2024,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  fieldUpdates?: Record<string, string | number>
}

// Helper to estimate birth year from age range
function estimateBirthYearFromAgeRange(ageRange: string): number | null {
  const currentYear = TAX_YEAR
  const midpoints: Record<string, number> = {
    '18-24': 21,
    '25-34': 30,
    '35-44': 40,
    '45-54': 50,
    '55-64': 60,
    '65+': 70,
  }
  const midAge = midpoints[ageRange]
  return midAge ? currentYear - midAge : null
}

export default function TFSARoomCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [birthYear, setBirthYear] = useState<string>('')
  const [previousContributions, setPreviousContributions] = useState<string>('')
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
    { name: 'birthYear', label: 'Year of Birth', type: 'number' as const, currentValue: birthYear },
    { name: 'previousContributions', label: 'Total Previous Contributions', type: 'number' as const, currentValue: previousContributions },
  ], [birthYear, previousContributions])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    if (fieldName === 'birthYear') setBirthYear(strValue)
    else if (fieldName === 'previousContributions') setPreviousContributions(strValue)
  }

  // Auto-populate from profile (birth year and TFSA contributions)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      // Prefer exact birth year, fall back to age range estimate
      if (profile.birth_year) {
        setBirthYear(profile.birth_year.toString())
      } else if (profile.age_range) {
        const estimatedYear = estimateBirthYearFromAgeRange(profile.age_range)
        if (estimatedYear) {
          setBirthYear(estimatedYear.toString())
        }
      }
      // Pre-fill TFSA lifetime contributions
      if (profile.tfsa_contributions_lifetime) {
        setPreviousContributions(profile.tfsa_contributions_lifetime.toString())
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
    const birthYearNum = parseInt(birthYear) || 0
    const contributionsNum = parseFloat(previousContributions) || 0

    if (birthYearNum < 1900 || birthYearNum > TAX_YEAR - 18) return null

    const yearTurned18 = birthYearNum + 18
    const startYear = Math.max(2009, yearTurned18)
    const currentAge = TAX_YEAR - birthYearNum

    // Calculate cumulative room
    let cumulativeRoom = 0
    const yearlyBreakdown: { year: number; limit: number; cumulative: number }[] = []

    for (let year = startYear; year <= TAX_YEAR; year++) {
      const limit = TFSA_ANNUAL_LIMITS[year] || 0
      cumulativeRoom += limit
      yearlyBreakdown.push({
        year,
        limit,
        cumulative: cumulativeRoom,
      })
    }

    const availableRoom = Math.max(0, cumulativeRoom - contributionsNum)

    return {
      currentAge,
      yearTurned18,
      startYear,
      cumulativeRoom,
      previousContributions: contributionsNum,
      availableRoom,
      yearlyBreakdown,
    }
  }, [birthYear, previousContributions])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
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
          calculatorType: 'tfsa-room-calculator',
          fields: calculatorFields.map(f => ({
            name: f.name,
            label: f.label,
            type: f.type,
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
        content: "Sorry, I had trouble with that. Try something like \"I was born in 1990 and have contributed $30,000\"."
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
    "I was born in 1990 and have never contributed to my TFSA",
    "I'm 35 years old and have contributed $50,000 total"
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
            TFSA Room Calculator
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Tell me your age and contributions to see your available TFSA room.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="TFSA room calculator"
          prefilledFields={['birthYear', 'tfsa']}
        />

        {/* Main Layout - Chat takes prominence */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* AI Chat Interface - PRIMARY (takes 3/5 of space) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl border-2 border-green-200 dark:border-green-800 shadow-xl shadow-green-100 dark:shadow-green-950/50 overflow-hidden flex flex-col" style={{ minHeight: '600px' }}>
            {/* Chat Header */}
            <div className="flex items-center gap-4 p-5 border-b border-green-100 dark:border-green-900 bg-gradient-to-r from-green-500 to-emerald-500">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Chat with TFSA Assistant</h3>
                <p className="text-sm text-white/80">Just tell me your age and contributions</p>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center mb-6">
                    <Wallet className="h-10 w-10 text-green-500 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                    How can I help with your TFSA?
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
                    Tell me your birth year or age and how much you've contributed. I'll calculate your available room instantly.
                  </p>

                  {/* Example buttons - clickable and auto-send */}
                  <div className="w-full max-w-md space-y-3">
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Click an example to try:</p>
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 hover:shadow-md transition-all text-base text-slate-700 dark:text-slate-300"
                      >
                        <span className="text-green-500 dark:text-green-400 font-medium">"</span>
                        {prompt}
                        <span className="text-green-500 dark:text-green-400 font-medium">"</span>
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
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center shrink-0">
                          <Bot className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-5 py-3",
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-br-md shadow-lg'
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
                                if (field === 'previousContributions') {
                                  displayValue = formatCurrency(Number(value))
                                }
                                return (
                                  <span
                                    key={field}
                                    className={cn(
                                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                                      msg.role === 'user'
                                        ? "bg-white/20 text-white"
                                        : "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
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
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center shrink-0">
                        <Loader2 className="h-5 w-5 text-green-600 dark:text-green-400 animate-spin" />
                      </div>
                      <div className="bg-slate-100 dark:bg-slate-700 rounded-2xl rounded-bl-md px-5 py-3">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="h-2.5 w-2.5 rounded-full bg-green-400"
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
                  placeholder="Type your situation here... (e.g., Born in 1985, contributed $60,000)"
                  className="min-h-[80px] max-h-[150px] pr-14 resize-none text-base bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 focus:border-green-400 dark:focus:border-green-500 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 bottom-3 h-10 w-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg"
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
                        <Label htmlFor="birthYear" className="text-xs">Year of Birth</Label>
                        <Input
                          id="birthYear"
                          type="number"
                          placeholder="1990"
                          value={birthYear}
                          onChange={(e) => setBirthYear(e.target.value)}
                          className="mt-1 h-9 text-sm"
                          min="1900"
                          max={TAX_YEAR - 18}
                        />
                      </div>

                      <div>
                        <Label htmlFor="contributions" className="text-xs">Previous Contributions</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="contributions"
                            type="number"
                            placeholder="0"
                            value={previousContributions}
                            onChange={(e) => setPreviousContributions(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
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
                {/* Available Room Card - Primary */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <PiggyBank className="h-5 w-5" />
                    <h3 className="font-semibold">Available Room</h3>
                  </div>
                  <div className="text-4xl font-bold mb-2">
                    {formatCurrency(results.availableRoom)}
                  </div>
                  <p className="text-white/80 text-sm">
                    You can contribute this much today
                  </p>
                </div>

                {/* Room Breakdown Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    Room Breakdown
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Your age</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {results.currentAge} years old
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Accumulating since</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {results.startYear}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Total lifetime room</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(results.cumulativeRoom)}
                      </span>
                    </div>
                    {results.previousContributions > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Less contributions</span>
                        <span className="font-medium text-red-600 dark:text-red-400">
                          -{formatCurrency(results.previousContributions)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex gap-3">
                    <Info className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800 dark:text-green-200">
                      <p className="font-medium mb-1">{TAX_YEAR} TFSA Limit</p>
                      <p className="text-green-700 dark:text-green-300 text-xs">
                        {formatCurrency(TFSA_LIMIT_2024)} annual contribution limit
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Your results will appear here
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500">
                  Chat with the assistant to calculate your TFSA room
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Annual Limits Reference */}
        <div className="mt-10 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
            TFSA Annual Contribution Limits (2009-{TAX_YEAR})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-sm">
            {Object.entries(TFSA_ANNUAL_LIMITS).map(([year, limit]) => (
              <div key={year} className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded">
                <div className="font-medium text-slate-900 dark:text-white">{year}</div>
                <div className="text-slate-600 dark:text-slate-400">${limit.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 sm:mt-20 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Understanding TFSA Contribution Room
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The Tax-Free Savings Account (TFSA) is a powerful savings vehicle where investment growth and withdrawals are completely tax-free. Your contribution room accumulates each year starting from age 18 (or 2009, whichever is later).
          </p>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            How TFSA Room Works
          </h3>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8 text-lg">
            <li><strong>Annual accumulation:</strong> Each year, Canadian residents 18+ gain new contribution room</li>
            <li><strong>Unused room carries forward:</strong> If you don't contribute, the room accumulates indefinitely</li>
            <li><strong>Withdrawals restore room:</strong> Any amount you withdraw is added back to your room on January 1 of the following year</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 mt-10">
            TFSA Over-Contribution Penalty
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            If you contribute more than your available room, you'll face a 1% penalty per month on the excess amount. Always check your room on CRA My Account before making contributions.
          </p>

          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mt-10">
            <p className="text-amber-800 dark:text-amber-200 text-base m-0 leading-relaxed">
              <strong>Disclaimer:</strong> This calculator assumes Canadian residency for all years. Your actual room may differ if you weren't a resident for some years. Check CRA My Account for your official contribution room.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
