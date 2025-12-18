'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, Calendar, AlertTriangle, Home, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  TAX_YEAR,
  HBP_WITHDRAWAL_LIMIT,
  HBP_REPAYMENT_PERIOD,
  HBP_REPAYMENT_START_YEAR,
} from '@/lib/canadianTaxData'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function HBPRepaymentCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [profileApplied, setProfileApplied] = useState(false)

  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('')
  const [withdrawalYear, setWithdrawalYear] = useState<string>((TAX_YEAR - 2).toString())
  const [amountRepaid, setAmountRepaid] = useState<string>('0')

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

  // Mark profile as applied (HBP data could be added to profile in future)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'withdrawalAmount': setWithdrawalAmount(strValue); break
      case 'withdrawalYear': setWithdrawalYear(strValue); break
      case 'amountRepaid': setAmountRepaid(strValue); break
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
          calculatorType: 'hbp-repayment-calculator',
          fields: [
            { name: 'withdrawalAmount', label: 'HBP Withdrawal Amount', type: 'number', currentValue: withdrawalAmount },
            { name: 'withdrawalYear', label: 'Year of Withdrawal', type: 'number', currentValue: withdrawalYear },
            { name: 'amountRepaid', label: 'Amount Already Repaid', type: 'number', currentValue: amountRepaid }
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
    const withdrawal = parseFloat(withdrawalAmount) || 0
    const year = parseInt(withdrawalYear) || TAX_YEAR - 2
    const repaid = parseFloat(amountRepaid) || 0

    if (withdrawal <= 0) return null

    const effectiveWithdrawal = Math.min(withdrawal, HBP_WITHDRAWAL_LIMIT)
    const repaymentStartYear = year + HBP_REPAYMENT_START_YEAR
    const repaymentEndYear = repaymentStartYear + HBP_REPAYMENT_PERIOD - 1
    const minimumAnnualRepayment = effectiveWithdrawal / HBP_REPAYMENT_PERIOD
    const remainingBalance = Math.max(0, effectiveWithdrawal - repaid)
    const currentYear = TAX_YEAR
    const yearsElapsed = Math.max(0, currentYear - repaymentStartYear + 1)
    const yearsRemaining = Math.max(0, HBP_REPAYMENT_PERIOD - yearsElapsed)
    const repaymentsStarted = currentYear >= repaymentStartYear

    let requiredThisYear = 0
    if (repaymentsStarted && remainingBalance > 0) {
      if (yearsRemaining > 0) {
        requiredThisYear = remainingBalance / yearsRemaining
      } else {
        requiredThisYear = remainingBalance
      }
    }

    const shortfall = Math.max(0, minimumAnnualRepayment * yearsElapsed - repaid)

    const schedule = []
    let runningBalance = effectiveWithdrawal
    for (let y = repaymentStartYear; y <= repaymentEndYear; y++) {
      const yearRepayment = effectiveWithdrawal / HBP_REPAYMENT_PERIOD
      runningBalance = Math.max(0, runningBalance - yearRepayment)

      schedule.push({
        year: y,
        requiredPayment: yearRepayment,
        remainingAfter: runningBalance,
        isPast: y < currentYear,
        isCurrent: y === currentYear,
        isFuture: y > currentYear,
      })
    }

    return {
      withdrawal: effectiveWithdrawal,
      withdrawalYear: year,
      repaymentStartYear,
      repaymentEndYear,
      minimumAnnualRepayment,
      remainingBalance,
      amountRepaid: repaid,
      yearsElapsed,
      yearsRemaining,
      repaymentsStarted,
      requiredThisYear,
      shortfall,
      schedule,
      wasOverLimit: withdrawal > HBP_WITHDRAWAL_LIMIT,
    }
  }, [withdrawalAmount, withdrawalYear, amountRepaid])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const examplePrompts = [
    "I withdrew $50,000 HBP in 2023, repaid $5,000",
    "$35,000 HBP withdrawal in 2022"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-lime-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            HBP Repayment Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Track your Home Buyers' Plan repayments and see your required RRSP contributions.
          </p>
        </div>

        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="HBP repayment calculator"
          prefilledFields={[]}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-lime-500 to-green-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">HBP Repayment Assistant</h2>
                  <p className="text-lime-100 text-sm">Track your Home Buyers' Plan</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-lime-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-lime-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Track your HBP repayments
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me about your HBP withdrawal and I'll calculate your required repayments.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-lime-50 hover:bg-lime-100 text-lime-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-lime-500 text-white'
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
                  placeholder="e.g., 'I withdrew $40,000 in 2022 and repaid $8,000'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-lime-500 hover:bg-lime-600"
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
                        <Label className="text-xs">HBP Withdrawal Amount</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            type="number"
                            placeholder="35,000"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Year of Withdrawal</Label>
                          <Input
                            type="number"
                            min="1992"
                            max={TAX_YEAR}
                            value={withdrawalYear}
                            onChange={(e) => setWithdrawalYear(e.target.value)}
                            className="mt-1 h-9 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Amount Repaid</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              type="number"
                              placeholder="0"
                              value={amountRepaid}
                              onChange={(e) => setAmountRepaid(e.target.value)}
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
          </div>

          {/* Results Section - 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <>
                {/* Status Card */}
                <div className={`rounded-2xl p-6 ${
                  !results.repaymentsStarted
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
                    : results.shortfall > 0
                      ? 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
                      : 'bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200'
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <Home className={`h-5 w-5 mt-0.5 ${
                      !results.repaymentsStarted ? 'text-blue-600' :
                      results.shortfall > 0 ? 'text-red-600' : 'text-lime-600'
                    }`} />
                    <h2 className="font-semibold text-slate-900">
                      {!results.repaymentsStarted
                        ? 'Repayments Not Yet Required'
                        : results.shortfall > 0
                          ? 'Behind on Repayments'
                          : 'On Track'
                      }
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Original withdrawal</span>
                      <span className="font-medium">{formatCurrency(results.withdrawal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Repaid</span>
                      <span className="font-medium text-green-600">-{formatCurrency(results.amountRepaid)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Remaining</span>
                        <span className="font-bold text-2xl">{formatCurrency(results.remainingBalance)}</span>
                      </div>
                    </div>
                  </div>

                  {!results.repaymentsStarted && (
                    <p className="text-sm text-blue-700 mt-4">
                      First repayment due: {results.repaymentStartYear}
                    </p>
                  )}
                </div>

                {/* Annual Requirement */}
                {results.repaymentsStarted && results.remainingBalance > 0 && (
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <h3 className="font-semibold text-slate-900 mb-3 text-sm">
                      {TAX_YEAR} Required Repayment
                    </h3>
                    <p className="text-2xl font-bold text-lime-600 text-center">
                      {formatCurrency(results.requiredThisYear)}
                    </p>
                    {results.shortfall > 0 && (
                      <div className="bg-red-50 rounded-lg p-3 mt-4">
                        <div className="flex gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">
                            {formatCurrency(results.shortfall)} behind - will be taxed as income
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Schedule */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <h3 className="font-semibold text-slate-900 text-sm">Schedule</h3>
                  </div>
                  <div className="max-h-48 overflow-y-auto text-xs">
                    {results.schedule.slice(0, 8).map((row) => (
                      <div
                        key={row.year}
                        className={`flex justify-between py-1.5 border-b border-slate-100 ${
                          row.isCurrent ? 'bg-lime-50 font-medium' : row.isPast ? 'opacity-50' : ''
                        }`}
                      >
                        <span>{row.year} {row.isCurrent && '(current)'}</span>
                        <span>{formatCurrency(row.requiredPayment)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-lime-600" />
                </div>
                <p className="text-lime-800 font-medium mb-1">No schedule yet</p>
                <p className="text-lime-600 text-sm">Tell me about your HBP withdrawal</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">HBP Rules</p>
                  <ul className="list-disc pl-3 space-y-0.5">
                    <li>Max: {formatCurrency(HBP_WITHDRAWAL_LIMIT)}</li>
                    <li>{HBP_REPAYMENT_PERIOD} year repayment period</li>
                    <li>Starts {HBP_REPAYMENT_START_YEAR} years after withdrawal</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Understanding the Home Buyers' Plan (HBP)
          </h2>
          <p className="text-slate-600 mb-4">
            The HBP allows first-time home buyers to withdraw up to {formatCurrency(HBP_WITHDRAWAL_LIMIT)} from
            their RRSPs tax-free. You must repay the amount over {HBP_REPAYMENT_PERIOD} years.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Tip:</strong> Miss a payment? The amount is added to your taxable income for that year.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
