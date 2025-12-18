'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Info, TrendingUp, TrendingDown, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
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
  CPP_MAX_MONTHLY_BENEFIT_65,
  CPP_AVERAGE_MONTHLY_BENEFIT,
  CPP_EARLY_REDUCTION_PER_MONTH,
  CPP_DELAY_INCREASE_PER_MONTH,
  estimateCPPBenefit,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { PersonalizedBanner } from '@/components/PersonalizedBanner'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function CPPRetirementCalculatorPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [startAge, setStartAge] = useState<string>('65')
  const [yearsContributed, setYearsContributed] = useState<string>('39')
  const [earningsLevel, setEarningsLevel] = useState<'max' | 'average' | 'custom'>('max')
  const [customPercent, setCustomPercent] = useState<string>('75')
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

  // Auto-populate from profile (retirement age, birth year for age calculation)
  useEffect(() => {
    if (!profileLoading && profile && !profileApplied) {
      if (profile.expected_retirement_age) {
        const retireAge = Math.max(60, Math.min(70, profile.expected_retirement_age))
        setStartAge(retireAge.toString())
      }
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'startAge': setStartAge(strValue); break
      case 'yearsContributed': setYearsContributed(strValue); break
      case 'earningsLevel':
        if (strValue === 'max' || strValue === 'average' || strValue === 'custom') {
          setEarningsLevel(strValue)
        }
        break
      case 'customPercent': setCustomPercent(strValue); break
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
          calculatorType: 'cpp-retirement-calculator',
          fields: [
            { name: 'startAge', label: 'Start Age', type: 'number', currentValue: startAge },
            { name: 'yearsContributed', label: 'Years Contributed', type: 'number', currentValue: yearsContributed },
            { name: 'earningsLevel', label: 'Earnings Level', type: 'select', options: [{ value: 'max', label: 'Maximum' }, { value: 'average', label: 'Average' }, { value: 'custom', label: 'Custom' }], currentValue: earningsLevel }
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
    const age = parseInt(startAge) || 65
    const years = Math.min(parseInt(yearsContributed) || 0, 47)
    const percent = earningsLevel === 'max'
      ? 1
      : earningsLevel === 'average'
        ? CPP_AVERAGE_MONTHLY_BENEFIT / CPP_MAX_MONTHLY_BENEFIT_65
        : (parseFloat(customPercent) || 0) / 100

    if (age < 60 || age > 70 || years <= 0) return null

    const benefitAt60 = estimateCPPBenefit(60, years, percent)
    const benefitAt65 = estimateCPPBenefit(65, years, percent)
    const benefitAt70 = estimateCPPBenefit(70, years, percent)
    const chosenBenefit = estimateCPPBenefit(age, years, percent)

    let adjustmentPercent = 0
    if (age < 65) {
      adjustmentPercent = -(65 - age) * 12 * CPP_EARLY_REDUCTION_PER_MONTH * 100
    } else if (age > 65) {
      adjustmentPercent = (age - 65) * 12 * CPP_DELAY_INCREASE_PER_MONTH * 100
    }

    let breakEvenWithAge65 = null
    if (age < 65) {
      const extraMonths = (65 - age) * 12
      const earlyTotal = chosenBenefit * extraMonths
      const monthlyDifference = benefitAt65 - chosenBenefit
      if (monthlyDifference > 0) {
        const monthsToBreakEven = earlyTotal / monthlyDifference
        breakEvenWithAge65 = 65 + Math.ceil(monthsToBreakEven / 12)
      }
    } else if (age > 65) {
      const missedMonths = (age - 65) * 12
      const missedTotal = benefitAt65 * missedMonths
      const monthlyGain = chosenBenefit - benefitAt65
      if (monthlyGain > 0) {
        const monthsToBreakEven = missedTotal / monthlyGain
        breakEvenWithAge65 = age + Math.ceil(monthsToBreakEven / 12)
      }
    }

    const projectLifetime = (toAge: number) => {
      return {
        at60: Math.max(0, toAge - 60) * 12 * benefitAt60,
        at65: Math.max(0, toAge - 65) * 12 * benefitAt65,
        at70: Math.max(0, toAge - 70) * 12 * benefitAt70,
        chosen: Math.max(0, toAge - age) * 12 * chosenBenefit,
      }
    }

    return {
      startAge: age,
      yearsContributed: years,
      monthlyBenefit: chosenBenefit,
      annualBenefit: chosenBenefit * 12,
      adjustmentPercent,
      benefitAt60,
      benefitAt65,
      benefitAt70,
      breakEvenWithAge65,
      lifetimeTo85: projectLifetime(85),
      lifetimeTo90: projectLifetime(90),
    }
  }, [startAge, yearsContributed, earningsLevel, customPercent])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const examplePrompts = [
    "I want to start CPP at 60 with 35 years of contributions",
    "Max CPP contributions, planning to retire at 67"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            CPP Retirement Calculator {TAX_YEAR}
          </h1>
          <p className="text-slate-600">
            Estimate your CPP pension and compare starting at different ages.
          </p>
        </div>

        {/* Personalized Banner */}
        <PersonalizedBanner
          profile={profile}
          isLoggedIn={isLoggedIn}
          loading={profileLoading}
          calculatorName="CPP retirement calculator"
          prefilledFields={[]}
        />

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">CPP Retirement Assistant</h2>
                  <p className="text-cyan-100 text-sm">Plan your CPP pension</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-cyan-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Plan your CPP retirement
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me when you want to start CPP and your contribution history to estimate your pension.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-cyan-500 text-white'
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
                  placeholder="e.g., 'Start CPP at 62 with 30 years of contributions'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-cyan-500 hover:bg-cyan-600"
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
                          <Label className="text-xs">Start Age</Label>
                          <Select value={startAge} onValueChange={setStartAge}>
                            <SelectTrigger className="mt-1 h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70].map((age) => (
                                <SelectItem key={age} value={age.toString()}>
                                  Age {age}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Years Contributed</Label>
                          <Input
                            type="number"
                            min="1"
                            max="47"
                            value={yearsContributed}
                            onChange={(e) => setYearsContributed(e.target.value)}
                            className="mt-1 h-9 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Earnings Level</Label>
                        <Select value={earningsLevel} onValueChange={(v) => setEarningsLevel(v as 'max' | 'average' | 'custom')}>
                          <SelectTrigger className="mt-1 h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="max">Maximum (YMPE)</SelectItem>
                            <SelectItem value="average">Average Canadian</SelectItem>
                            <SelectItem value="custom">Custom %</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {earningsLevel === 'custom' && (
                        <div>
                          <Label className="text-xs">Custom % of Maximum</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={customPercent}
                            onChange={(e) => setCustomPercent(e.target.value)}
                            className="mt-1 h-9 text-sm"
                          />
                        </div>
                      )}
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
                  results.adjustmentPercent > 0
                    ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'
                    : results.adjustmentPercent < 0
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200'
                      : 'bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200'
                }`}>
                  <h2 className="font-semibold text-slate-900 mb-4">Your CPP Estimate</h2>

                  <div className="text-center mb-4">
                    <p className="text-4xl font-bold text-slate-900">
                      {formatCurrency(results.monthlyBenefit)}/mo
                    </p>
                    <p className="text-slate-600">
                      {formatCurrency(results.annualBenefit)}/year
                    </p>
                  </div>

                  {results.adjustmentPercent !== 0 && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                      {results.adjustmentPercent > 0 ? (
                        <>
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                          <span className="text-emerald-700 font-medium">
                            +{results.adjustmentPercent.toFixed(1)}% for delaying
                          </span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-5 w-5 text-amber-600" />
                          <span className="text-amber-700 font-medium">
                            {results.adjustmentPercent.toFixed(1)}% for starting early
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {results.breakEvenWithAge65 && (
                    <p className="text-sm text-center mt-3 text-slate-600">
                      Break-even with age 65: Age {results.breakEvenWithAge65}
                    </p>
                  )}
                </div>

                {/* Age Comparison */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm">Compare Ages</h3>
                  <div className="space-y-2">
                    {[
                      { age: 60, benefit: results.benefitAt60, label: '-36%' },
                      { age: 65, benefit: results.benefitAt65, label: 'Standard' },
                      { age: 70, benefit: results.benefitAt70, label: '+42%' },
                    ].map(({ age, benefit, label }) => (
                      <div
                        key={age}
                        className={`flex justify-between items-center p-2 rounded-lg text-sm ${
                          parseInt(startAge) === age ? 'bg-cyan-50' : 'bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-medium">Age {age}</span>
                          <span className="text-xs text-slate-500 ml-2">{label}</span>
                        </div>
                        <span className="font-semibold">{formatCurrency(benefit)}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lifetime Totals */}
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900 mb-3 text-sm">Total by Age</h3>
                  <div className="text-xs space-y-2">
                    <div className="grid grid-cols-3 gap-2 pb-2 border-b border-slate-200">
                      <span>Start</span>
                      <span className="text-center">By 85</span>
                      <span className="text-center">By 90</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span>60</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo85.at60)}</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo90.at60)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span>65</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo85.at65)}</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo90.at65)}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span>70</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo85.at70)}</span>
                      <span className="text-center">{formatCurrency(results.lifetimeTo90.at70)}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-3">
                  <Info className="h-6 w-6 text-cyan-600" />
                </div>
                <p className="text-cyan-800 font-medium mb-1">No estimate yet</p>
                <p className="text-cyan-600 text-sm">Tell me your CPP details to estimate your pension</p>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <p className="font-medium mb-1">When to Start CPP?</p>
                  <ul className="list-disc pl-3 space-y-0.5">
                    <li><strong>60:</strong> Need income now or health concerns</li>
                    <li><strong>65:</strong> Balanced approach</li>
                    <li><strong>70:</strong> Can wait & expect long life</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            How CPP Retirement Benefits Work
          </h2>
          <p className="text-slate-600 mb-4">
            You can start CPP as early as 60 or as late as 70. Starting early permanently reduces
            your benefit by 0.6% per month. Delaying increases it by 0.7% per month after 65.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates only. Check your
              CPP Statement on My Service Canada Account for accurate figures.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
