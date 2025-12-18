'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, AlertTriangle, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
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
  TAX_YEAR,
  calculateOASClawback,
  OAS_CLAWBACK_THRESHOLD,
  OAS_CLAWBACK_RATE,
  OAS_MAX_ANNUAL_65_74,
  OAS_MAX_ANNUAL_75_PLUS,
  OAS_FULL_CLAWBACK_65_74,
  OAS_FULL_CLAWBACK_75_PLUS,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function OASClawbackCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [income, setIncome] = useState<string>('')
  const [ageGroup, setAgeGroup] = useState<'65-74' | '75+'>('65-74')
  const [profileApplied, setProfileApplied] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showManualInputs, setShowManualInputs] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  const shouldScrollRef = useRef(true)

  const handleScroll = () => {
    const container = chatContainerRef.current
    if (!container) return
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150
    shouldScrollRef.current = isNearBottom
  }

  // Scroll management - only scroll on assistant responses, not user input
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

  // Auto-populate from profile (income, age group from birth year)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.annual_income) setIncome(profile.annual_income.toString())
      if (profile.birth_year) {
        const currentYear = new Date().getFullYear()
        const age = currentYear - profile.birth_year
        if (age >= 75) setAgeGroup('75+')
      }
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'income': setIncome(strValue); break
      case 'ageGroup': setAgeGroup(strValue as '65-74' | '75+'); break
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
          calculatorType: 'oas-clawback-calculator',
          fields: [
            { name: 'income', label: 'Net Income (Line 23600)', type: 'number', currentValue: income },
            { name: 'ageGroup', label: 'Age Group', type: 'select', options: [{ value: '65-74', label: '65 to 74' }, { value: '75+', label: '75 or older' }], currentValue: ageGroup }
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
    const incomeNum = parseFloat(income) || 0
    const age = ageGroup === '65-74' ? 65 : 75

    if (incomeNum <= 0) return null

    const calculation = calculateOASClawback(incomeNum, age)

    const maxOAS = ageGroup === '65-74' ? OAS_MAX_ANNUAL_65_74 : OAS_MAX_ANNUAL_75_PLUS
    const fullClawbackThreshold = ageGroup === '65-74' ? OAS_FULL_CLAWBACK_65_74 : OAS_FULL_CLAWBACK_75_PLUS
    const roomBeforeClawback = Math.max(0, OAS_CLAWBACK_THRESHOLD - incomeNum)
    const roomUntilFullClawback = Math.max(0, fullClawbackThreshold - incomeNum)

    return {
      ...calculation,
      maxOAS,
      fullClawbackThreshold,
      roomBeforeClawback,
      roomUntilFullClawback,
      clawbackPercent: calculation.oasBenefit > 0 ? calculation.clawback / calculation.oasBenefit : 0,
      monthlyNetOAS: calculation.netOAS / 12,
    }
  }, [income, ageGroup])

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
    "My retirement income is $95,000, I'm 68 years old",
    "$120,000 income, age 77"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-rose-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            OAS Clawback Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate how much of your Old Age Security pension will be clawed back based on your income.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="OAS clawback calculator"
          prefilledFields={['income']}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">OAS Clawback Assistant</h2>
                  <p className="text-rose-100 text-sm">Tell me your income and age</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Check your OAS clawback
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me your retirement income and age, and I'll calculate how much of your OAS will be affected.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-rose-500 text-white'
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
                  placeholder="e.g., 'My income is $100,000 and I'm 70 years old'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-rose-500 hover:bg-rose-600"
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
                        <Label htmlFor="income" className="text-xs">Net Income (Line 23600)</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="income"
                            type="number"
                            placeholder="95,000"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Age Group</Label>
                        <Select value={ageGroup} onValueChange={(v) => setAgeGroup(v as '65-74' | '75+')}>
                          <SelectTrigger className="mt-1 h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="65-74">65 to 74 years old</SelectItem>
                            <SelectItem value="75+">75 years or older</SelectItem>
                          </SelectContent>
                        </Select>
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
                {/* Main Result */}
                <div className={`rounded-2xl p-6 ${
                  results.clawback === 0
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
                    : results.netOAS === 0
                      ? 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
                      : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200'
                }`}>
                  <h2 className={`font-semibold mb-4 ${
                    results.clawback === 0 ? 'text-green-900' :
                    results.netOAS === 0 ? 'text-red-900' : 'text-amber-900'
                  }`}>
                    Your OAS Result
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={results.clawback === 0 ? 'text-green-700' : results.netOAS === 0 ? 'text-red-700' : 'text-amber-700'}>
                        Maximum OAS
                      </span>
                      <span className="font-medium">{formatCurrency(results.oasBenefit)}/yr</span>
                    </div>
                    {results.clawback > 0 && (
                      <div className="flex justify-between">
                        <span className={results.netOAS === 0 ? 'text-red-700' : 'text-amber-700'}>
                          Clawback
                        </span>
                        <span className="font-medium text-red-600">-{formatCurrency(results.clawback)}/yr</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Net OAS</span>
                        <span className="font-bold text-2xl">
                          {formatCurrency(results.netOAS)}/yr
                        </span>
                      </div>
                      <p className="text-sm mt-1 opacity-75">
                        {formatCurrency(results.monthlyNetOAS)}/month
                      </p>
                    </div>
                  </div>

                  {results.clawback > 0 && results.netOAS > 0 && (
                    <div className="mt-4 flex items-start gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-amber-800">
                        {formatPercent(results.clawbackPercent)} clawed back. {formatCurrency(results.roomUntilFullClawback)} until full clawback.
                      </p>
                    </div>
                  )}

                  {results.clawback === 0 && (
                    <p className="mt-4 text-sm text-green-700">
                      No clawback! You have {formatCurrency(results.roomBeforeClawback)} of room before clawback starts.
                    </p>
                  )}

                  {results.netOAS === 0 && (
                    <p className="mt-4 text-sm text-red-700">
                      Your entire OAS is clawed back due to high income.
                    </p>
                  )}
                </div>

                {/* Thresholds */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">{TAX_YEAR} Thresholds</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Clawback starts</span>
                      <span className="font-medium">{formatCurrency(OAS_CLAWBACK_THRESHOLD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Full clawback</span>
                      <span className="font-medium">{formatCurrency(results.fullClawbackThreshold)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Clawback rate</span>
                      <span className="font-medium">{formatPercent(OAS_CLAWBACK_RATE)}</span>
                    </div>
                  </div>
                </div>

                {/* Calculation */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Calculation</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Your income</span>
                      <span>{formatCurrency(parseFloat(income))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Threshold</span>
                      <span>-{formatCurrency(OAS_CLAWBACK_THRESHOLD)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Over threshold</span>
                      <span>{formatCurrency(Math.max(0, parseFloat(income) - OAS_CLAWBACK_THRESHOLD))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">× {formatPercent(OAS_CLAWBACK_RATE)}</span>
                      <span className="font-medium text-red-600">{formatCurrency(results.clawback)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-rose-600" />
                </div>
                <p className="text-rose-800 font-medium mb-1">No calculation yet</p>
                <p className="text-rose-600 text-sm">Tell me your income and age to calculate OAS clawback</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Reduce Clawback</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Income split with spouse</li>
                    <li>Use TFSA (withdrawals don't count)</li>
                    <li>Defer CPP to reduce early income</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Understanding the OAS Clawback (Recovery Tax)
          </h2>
          <p className="text-slate-600 mb-4">
            The Old Age Security (OAS) pension recovery tax, commonly called the "OAS clawback,"
            reduces your OAS benefits if your net income exceeds a certain threshold. For {TAX_YEAR},
            the clawback starts when your income exceeds {formatCurrency(OAS_CLAWBACK_THRESHOLD)}.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">How the Clawback Works</h3>
          <p className="text-slate-600 mb-4">
            For every dollar your income exceeds the threshold, you must repay 15 cents of your OAS.
            This continues until your entire OAS benefit is repaid. For those aged 65-74, the complete
            clawback occurs at {formatCurrency(OAS_FULL_CLAWBACK_65_74)}. For those 75+, it's
            {formatCurrency(OAS_FULL_CLAWBACK_75_PLUS)} (because they receive 10% more OAS).
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> OAS amounts are adjusted quarterly based on the Consumer
              Price Index. The amounts shown are estimates for {TAX_YEAR}. Consult Service Canada for exact amounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
