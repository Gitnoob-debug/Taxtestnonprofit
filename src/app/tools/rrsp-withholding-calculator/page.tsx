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
  calculateRRSPWithholding,
  RRSP_WITHHOLDING_RATES,
} from '@/lib/canadianTaxData'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function RRSPWithholdingCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [profileApplied, setProfileApplied] = useState(false)

  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('')
  const [isQuebec, setIsQuebec] = useState<'no' | 'yes'>('no')

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

  // Auto-populate from profile (Quebec detection)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.province === 'QC') setIsQuebec('yes')
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'withdrawalAmount': setWithdrawalAmount(strValue); break
      case 'isQuebec': setIsQuebec(strValue as 'no' | 'yes'); break
      case 'province':
        setIsQuebec(strValue === 'QC' ? 'yes' : 'no')
        break
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
          calculatorType: 'rrsp-withholding-calculator',
          fields: [
            { name: 'withdrawalAmount', label: 'Withdrawal Amount', type: 'number', currentValue: withdrawalAmount },
            { name: 'isQuebec', label: 'Quebec Resident', type: 'select', options: [{ value: 'no', label: 'Outside Quebec' }, { value: 'yes', label: 'Quebec Resident' }], currentValue: isQuebec }
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
    const amount = parseFloat(withdrawalAmount) || 0

    if (amount <= 0) return null

    return calculateRRSPWithholding(amount, isQuebec === 'yes')
  }, [withdrawalAmount, isQuebec])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(0) + '%'
  }

  const examplePrompts = [
    "Withdraw $20,000 from my RRSP in Ontario",
    "$10,000 RRSP withdrawal in Quebec"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-orange-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            RRSP Withholding Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            See how much tax will be withheld when you withdraw from your RRSP early.
          </p>
        </div>

        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="RRSP withholding calculator"
          prefilledFields={['province']}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">RRSP Withholding Assistant</h2>
                  <p className="text-orange-100 text-sm">Tell me about your withdrawal</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Calculate withholding tax
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me how much you want to withdraw from your RRSP and I'll calculate the withholding tax.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-orange-500 text-white'
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
                  placeholder="e.g., 'I want to withdraw $15,000 from my RRSP'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-orange-500 hover:bg-orange-600"
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
                        <Label htmlFor="withdrawalAmount" className="text-xs">Withdrawal Amount</Label>
                        <div className="relative mt-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                          <Input
                            id="withdrawalAmount"
                            type="number"
                            placeholder="10,000"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            className="pl-7 h-9 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Province</Label>
                        <Select value={isQuebec} onValueChange={(v) => setIsQuebec(v as 'no' | 'yes')}>
                          <SelectTrigger className="mt-1 h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="no">Outside Quebec</SelectItem>
                            <SelectItem value="yes">Quebec Resident</SelectItem>
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
                {/* Summary */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <h2 className="font-semibold text-amber-900">Withholding Tax</h2>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Withdrawal Amount</span>
                      <span className="font-medium text-amber-900">{formatCurrency(parseFloat(withdrawalAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Federal Withholding</span>
                      <span className="font-medium text-amber-900">-{formatCurrency(results.federalWithholding)}</span>
                    </div>
                    {results.provincialWithholding > 0 && (
                      <div className="flex justify-between">
                        <span className="text-amber-700">Quebec Withholding</span>
                        <span className="font-medium text-amber-900">-{formatCurrency(results.provincialWithholding)}</span>
                      </div>
                    )}
                    <div className="border-t border-amber-200 pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-amber-900">You Receive</span>
                        <span className="font-bold text-2xl text-amber-900">{formatCurrency(results.netAmount)}</span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        Total withheld: {formatCurrency(results.totalWithholding)} ({((results.totalWithholding / parseFloat(withdrawalAmount)) * 100).toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <p className="font-medium mb-1">May Not Cover Actual Tax</p>
                      <p>
                        The withdrawal is added to your income. If you're in a higher tax bracket,
                        you may owe more at tax time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Withholding Rates */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Federal Rates</h3>
                  <div className="space-y-2 text-sm">
                    {RRSP_WITHHOLDING_RATES.federal.map((bracket, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-slate-600">
                          {formatCurrency(bracket.min)} - {bracket.max === Infinity ? '+' : formatCurrency(bracket.max)}
                        </span>
                        <span className="font-medium">{formatPercent(bracket.rate)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-orange-800 font-medium mb-1">No results yet</p>
                <p className="text-orange-600 text-sm">Tell me your withdrawal amount to calculate withholding tax</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Minimize Withholding Tax</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Multiple smaller withdrawals</li>
                    <li>Home Buyers' Plan (up to $60k tax-free)</li>
                    <li>Lifelong Learning Plan (up to $20k)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            RRSP Withholding Tax Explained
          </h2>
          <p className="text-slate-600 mb-4">
            When you withdraw from your RRSP before retirement, your financial institution must
            withhold tax at source. The withholding rate depends on the withdrawal amount.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Federal Withholding Rates</h3>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li>10% on withdrawals up to $5,000</li>
            <li>20% on withdrawals from $5,001 to $15,000</li>
            <li>30% on withdrawals over $15,000</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> Withholding tax is not your final tax. Consult a tax
              professional before making large RRSP withdrawals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
