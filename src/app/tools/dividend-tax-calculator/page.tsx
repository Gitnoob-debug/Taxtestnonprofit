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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  PROVINCE_NAMES,
  TAX_YEAR,
  calculateDividendTax,
  DIVIDEND_ELIGIBLE_GROSSUP,
  DIVIDEND_NON_ELIGIBLE_GROSSUP,
  DIVIDEND_ELIGIBLE_CREDIT,
  DIVIDEND_NON_ELIGIBLE_CREDIT,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function DividendTaxCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [dividendAmount, setDividendAmount] = useState<string>('')
  const [otherIncome, setOtherIncome] = useState<string>('')
  const [dividendType, setDividendType] = useState<'eligible' | 'non-eligible'>('eligible')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showManualInputs, setShowManualInputs] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const shouldScrollRef = useRef(true)

  // Track scroll position to decide if we should auto-scroll
  const handleScroll = () => {
    const container = chatContainerRef.current
    if (!container) return

    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150
    shouldScrollRef.current = isNearBottom
  }

  // Only scroll when assistant responds (not on user message)
  useEffect(() => {
    const container = chatContainerRef.current
    if (!container || messages.length === 0) return

    // Only scroll if we should and it's an assistant message
    const lastMessage = messages[messages.length - 1]
    if (shouldScrollRef.current && lastMessage?.role === 'assistant') {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight
      })
    }
  }, [messages])

  // Auto-populate from profile (province, income)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.province) setProvince(profile.province)
      if (profile.annual_income) setOtherIncome(profile.annual_income.toString())
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'dividendAmount': setDividendAmount(strValue); break
      case 'otherIncome': setOtherIncome(strValue); break
      case 'dividendType': setDividendType(strValue as 'eligible' | 'non-eligible'); break
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
          calculatorType: 'dividend-tax-calculator',
          fields: [
            { name: 'dividendAmount', label: 'Dividend Amount', type: 'number', currentValue: dividendAmount },
            { name: 'otherIncome', label: 'Other Income', type: 'number', currentValue: otherIncome },
            { name: 'dividendType', label: 'Dividend Type', type: 'select', options: [{ value: 'eligible', label: 'Eligible' }, { value: 'non-eligible', label: 'Non-Eligible' }], currentValue: dividendType },
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
    const dividend = parseFloat(dividendAmount) || 0
    const other = parseFloat(otherIncome) || 0

    if (dividend <= 0) return null

    return calculateDividendTax(dividend, dividendType === 'eligible', other, province)
  }, [dividendAmount, otherIncome, dividendType, province])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatPercent = (rate: number) => {
    return (rate * 100).toFixed(2) + '%'
  }

  const examplePrompts = [
    "$15,000 eligible dividends, $80k other income in Ontario",
    "Non-eligible dividends of $5,000 in BC"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-amber-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Dividend Tax Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Calculate the tax on Canadian dividends including the gross-up and dividend tax credit.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="dividend tax calculator"
          prefilledFields={['income', 'province']}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">Dividend Tax Assistant</h2>
                  <p className="text-amber-100 text-sm">Tell me about your dividends</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Describe your dividends
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Just tell me about your dividend income and I'll calculate the tax including gross-up and credits.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-amber-500 text-white'
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
                  placeholder="e.g., '$10,000 eligible dividends, $60k salary in Ontario'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-amber-500 hover:bg-amber-600"
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
                          <Label htmlFor="dividendAmount" className="text-xs">Dividend Amount</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="dividendAmount"
                              type="number"
                              placeholder="10,000"
                              value={dividendAmount}
                              onChange={(e) => setDividendAmount(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="otherIncome" className="text-xs">Other Income</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="otherIncome"
                              type="number"
                              placeholder="50,000"
                              value={otherIncome}
                              onChange={(e) => setOtherIncome(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Dividend Type</Label>
                          <Select value={dividendType} onValueChange={(v) => setDividendType(v as 'eligible' | 'non-eligible')}>
                            <SelectTrigger className="mt-1 h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="eligible">Eligible (38% gross-up)</SelectItem>
                              <SelectItem value="non-eligible">Non-Eligible (15% gross-up)</SelectItem>
                            </SelectContent>
                          </Select>
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
                            <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                              <User className="h-3 w-3" />
                              From profile
                            </p>
                          )}
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
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                  <h2 className="font-semibold text-amber-900 mb-4">Tax Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Dividend Received</span>
                      <span className="font-medium text-amber-900">{formatCurrency(parseFloat(dividendAmount))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Grossed-up Amount</span>
                      <span className="font-medium text-amber-900">{formatCurrency(results.grossedUpAmount)}</span>
                    </div>
                    <div className="border-t border-amber-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-amber-700">Net Tax on Dividend</span>
                        <span className="font-bold text-2xl text-amber-900">{formatCurrency(results.netTax)}</span>
                      </div>
                      <p className="text-sm text-amber-600 mt-1">
                        Effective rate: {formatPercent(results.effectiveRate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-slate-600 mb-2">Gross-up Calculation</p>
                      <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between">
                          <span>Dividend received</span>
                          <span>{formatCurrency(parseFloat(dividendAmount))}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>× Gross-up ({formatPercent(dividendType === 'eligible' ? DIVIDEND_ELIGIBLE_GROSSUP : DIVIDEND_NON_ELIGIBLE_GROSSUP)})</span>
                          <span>{formatCurrency(results.grossedUpAmount - parseFloat(dividendAmount))}</span>
                        </div>
                        <div className="flex justify-between font-medium border-t border-slate-200 pt-1">
                          <span>Taxable amount</span>
                          <span>{formatCurrency(results.grossedUpAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-600 mb-2">Tax Credits</p>
                      <div className="bg-slate-50 rounded-lg p-3 space-y-1">
                        <div className="flex justify-between text-green-700">
                          <span>Federal dividend tax credit</span>
                          <span>-{formatCurrency(results.federalCredit)}</span>
                        </div>
                        <div className="flex justify-between text-green-700">
                          <span>Provincial dividend tax credit</span>
                          <span>-{formatCurrency(results.provincialCredit)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-amber-600" />
                </div>
                <p className="text-amber-800 font-medium mb-1">No results yet</p>
                <p className="text-amber-600 text-sm">Tell me about your dividends to see the tax breakdown</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Eligible vs Non-Eligible</p>
                  <p>
                    <strong>Eligible:</strong> From public corps, 38% gross-up, larger credit.
                  </p>
                  <p className="mt-1">
                    <strong>Non-eligible:</strong> From CCPCs, 15% gross-up, smaller credit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How Canadian Dividend Tax Works
          </h2>
          <p className="text-slate-600 mb-4">
            Canadian dividends receive preferential tax treatment through the dividend gross-up
            and tax credit system. This system is designed to integrate corporate and personal
            taxes, preventing double taxation.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Gross-Up</h3>
          <p className="text-slate-600 mb-4">
            When you receive a dividend, you must "gross up" the amount to reflect the
            pre-tax corporate income. For {TAX_YEAR}, eligible dividends are grossed up by 38%
            and non-eligible dividends by 15%.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">The Dividend Tax Credit</h3>
          <p className="text-slate-600">
            To compensate for the gross-up, you receive a dividend tax credit that reduces
            your tax. The federal credit is {formatPercent(DIVIDEND_ELIGIBLE_CREDIT)} of the
            grossed-up amount for eligible dividends and {formatPercent(DIVIDEND_NON_ELIGIBLE_CREDIT)} for
            non-eligible dividends. Provincial credits vary by province.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates based on {TAX_YEAR} tax rates.
              Your actual tax may vary based on your complete tax situation. Consult a tax professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
