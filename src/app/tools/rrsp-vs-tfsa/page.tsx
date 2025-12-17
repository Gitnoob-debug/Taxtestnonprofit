'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, Scale, Check, X, User, MessageCircle, Send, ChevronDown, ChevronUp, Loader2, Bot } from 'lucide-react'
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
  calculateTotalTax,
  PROVINCE_NAMES,
  RRSP_LIMIT_2024,
  TFSA_LIMIT_2024,
  TAX_YEAR,
} from '@/lib/canadianTaxData'
import { useProfile } from '@/hooks/useProfile'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function RRSPvsTFSAPage() {
  const { profile, loading: profileLoading, isLoggedIn } = useProfile()
  const [currentIncome, setCurrentIncome] = useState<string>('')
  const [retirementIncome, setRetirementIncome] = useState<string>('')
  const [contribution, setContribution] = useState<string>('')
  const [yearsToRetirement, setYearsToRetirement] = useState<string>('25')
  const [expectedReturn, setExpectedReturn] = useState<string>('6')
  const [province, setProvince] = useState<string>('ON')
  const [profileApplied, setProfileApplied] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showManualInputs, setShowManualInputs] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFieldUpdate = (fieldName: string, value: string | number) => {
    const strValue = value.toString()
    switch (fieldName) {
      case 'currentIncome': setCurrentIncome(strValue); break
      case 'retirementIncome': setRetirementIncome(strValue); break
      case 'contribution': setContribution(strValue); break
      case 'yearsToRetirement': setYearsToRetirement(strValue); break
      case 'expectedReturn': setExpectedReturn(strValue); break
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
          calculatorType: 'rrsp-vs-tfsa',
          fields: [
            { name: 'currentIncome', label: 'Current Annual Income', type: 'number', currentValue: currentIncome },
            { name: 'retirementIncome', label: 'Expected Retirement Income', type: 'number', currentValue: retirementIncome },
            { name: 'contribution', label: 'Annual Contribution', type: 'number', currentValue: contribution },
            { name: 'yearsToRetirement', label: 'Years to Retirement', type: 'number', currentValue: yearsToRetirement },
            { name: 'expectedReturn', label: 'Expected Annual Return (%)', type: 'number', currentValue: expectedReturn },
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

  // Auto-populate province from profile
  useEffect(() => {
    if (!profileLoading && profile?.province && !profileApplied) {
      setProvince(profile.province)
      setProfileApplied(true)
    }
  }, [profile, profileLoading, profileApplied])

  const results = useMemo(() => {
    const currentIncomeNum = parseFloat(currentIncome) || 0
    const retirementIncomeNum = parseFloat(retirementIncome) || 0
    const contributionNum = parseFloat(contribution) || 0
    const yearsNum = parseFloat(yearsToRetirement) || 25
    const returnRate = (parseFloat(expectedReturn) || 6) / 100

    if (currentIncomeNum <= 0 || contributionNum <= 0) return null

    // Current tax rates
    const currentTax = calculateTotalTax(currentIncomeNum, province)
    const retirementTax = calculateTotalTax(retirementIncomeNum || currentIncomeNum * 0.6, province)

    // RRSP calculation
    const rrspTaxSavingsNow = contributionNum * currentTax.marginalRate
    const rrspGrowth = contributionNum * Math.pow(1 + returnRate, yearsNum)
    const rrspTaxOnWithdrawal = rrspGrowth * retirementTax.marginalRate
    const rrspNetValue = rrspGrowth - rrspTaxOnWithdrawal

    // With RRSP refund reinvested
    const rrspWithReinvest = (contributionNum + rrspTaxSavingsNow) * Math.pow(1 + returnRate, yearsNum)
    const rrspWithReinvestTax = rrspWithReinvest * retirementTax.marginalRate
    const rrspWithReinvestNet = rrspWithReinvest - rrspWithReinvestTax

    // TFSA calculation (after-tax contribution, tax-free growth)
    const tfsaContribution = contributionNum * (1 - currentTax.marginalRate)
    const tfsaGrowth = contributionNum * Math.pow(1 + returnRate, yearsNum)
    const tfsaNetValue = tfsaGrowth

    // Determine recommendation
    let recommendation: 'rrsp' | 'tfsa' | 'either'
    let reason: string

    if (currentTax.marginalRate > retirementTax.marginalRate + 0.05) {
      recommendation = 'rrsp'
      reason = `Your current marginal rate (${(currentTax.marginalRate * 100).toFixed(1)}%) is significantly higher than your expected retirement rate (${(retirementTax.marginalRate * 100).toFixed(1)}%). RRSP gives you a bigger tax break now.`
    } else if (retirementTax.marginalRate > currentTax.marginalRate + 0.05) {
      recommendation = 'tfsa'
      reason = `Your expected retirement rate (${(retirementTax.marginalRate * 100).toFixed(1)}%) is higher than your current rate (${(currentTax.marginalRate * 100).toFixed(1)}%). TFSA's tax-free withdrawals will be more valuable.`
    } else {
      recommendation = 'either'
      reason = `Your current and expected retirement rates are similar. Both accounts will perform similarly. Consider TFSA for flexibility or RRSP if you need the deduction now.`
    }

    return {
      currentMarginalRate: currentTax.marginalRate,
      retirementMarginalRate: retirementTax.marginalRate,
      rrspTaxSavingsNow,
      rrspGrowth,
      rrspNetValue,
      rrspWithReinvestNet,
      tfsaGrowth,
      tfsaNetValue,
      recommendation,
      reason,
      yearsNum,
    }
  }, [currentIncome, retirementIncome, contribution, yearsToRetirement, expectedReturn, province])

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
    "I make $90k now and expect $50k in retirement, want to save $10k/year",
    "30 years old, $80k income in Ontario, 25 years to retire"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            RRSP vs TFSA Comparison Calculator
          </h1>
          <p className="text-slate-600">
            Compare these two powerful savings accounts and see which is better for your situation.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Chat Section - 3/5 width */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '600px' }}>
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-white">RRSP vs TFSA Assistant</h2>
                  <p className="text-teal-100 text-sm">Tell me about your situation</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    Describe your savings situation
                  </h3>
                  <p className="text-slate-500 mb-6 max-w-md">
                    Tell me your income, expected retirement income, and how much you want to save. I'll help you decide between RRSP and TFSA.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {examplePrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-full text-sm transition-colors"
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
                            ? 'bg-teal-500 text-white'
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
                  placeholder="e.g., 'I earn $100k and want to save $15k for retirement'"
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-teal-500 hover:bg-teal-600"
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
                          <Label htmlFor="currentIncome" className="text-xs">Current Income</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="currentIncome"
                              type="number"
                              placeholder="80,000"
                              value={currentIncome}
                              onChange={(e) => setCurrentIncome(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="retirementIncome" className="text-xs">Retirement Income</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="retirementIncome"
                              type="number"
                              placeholder="50,000"
                              value={retirementIncome}
                              onChange={(e) => setRetirementIncome(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="contribution" className="text-xs">Contribution</Label>
                          <div className="relative mt-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <Input
                              id="contribution"
                              type="number"
                              placeholder="7,000"
                              value={contribution}
                              onChange={(e) => setContribution(e.target.value)}
                              className="pl-7 h-9 text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="years" className="text-xs">Years to Retire</Label>
                          <Input
                            id="years"
                            type="number"
                            value={yearsToRetirement}
                            onChange={(e) => setYearsToRetirement(e.target.value)}
                            className="mt-1 h-9 text-sm"
                          />
                        </div>
                        <div>
                          <Label htmlFor="return" className="text-xs">Return %</Label>
                          <Input
                            id="return"
                            type="number"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(e.target.value)}
                            className="mt-1 h-9 text-sm"
                          />
                        </div>
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
                          <p className="text-xs text-teal-600 mt-1 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            From profile
                          </p>
                        )}
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
                {/* Recommendation Card */}
                <div className={`rounded-2xl border p-6 ${
                  results.recommendation === 'rrsp'
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                    : results.recommendation === 'tfsa'
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <Scale className={`h-6 w-6 ${
                      results.recommendation === 'rrsp'
                        ? 'text-blue-600'
                        : results.recommendation === 'tfsa'
                        ? 'text-green-600'
                        : 'text-purple-600'
                    }`} />
                    <h3 className={`text-lg font-bold ${
                      results.recommendation === 'rrsp'
                        ? 'text-blue-900'
                        : results.recommendation === 'tfsa'
                        ? 'text-green-900'
                        : 'text-purple-900'
                    }`}>
                      {results.recommendation === 'rrsp'
                        ? 'RRSP is better'
                        : results.recommendation === 'tfsa'
                        ? 'TFSA is better'
                        : 'Either works well'}
                    </h3>
                  </div>
                  <p className={`text-sm ${
                    results.recommendation === 'rrsp'
                      ? 'text-blue-700'
                      : results.recommendation === 'tfsa'
                      ? 'text-green-700'
                      : 'text-purple-700'
                  }`}>
                    {results.reason}
                  </p>
                </div>

                {/* Side by Side Comparison */}
                <div className="grid grid-cols-2 gap-4">
                  {/* RRSP Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-bold text-blue-600 mb-4">RRSP</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax refund</span>
                        <span className="font-medium text-green-600">+{formatCurrency(results.rrspTaxSavingsNow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Future value</span>
                        <span className="font-medium">{formatCurrency(results.rrspGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax on withdraw</span>
                        <span className="font-medium text-red-600">-{formatCurrency(results.rrspGrowth - results.rrspNetValue)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold">Net</span>
                        <span className="font-bold text-blue-600">{formatCurrency(results.rrspNetValue)}</span>
                      </div>
                    </div>
                  </div>

                  {/* TFSA Card */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-bold text-green-600 mb-4">TFSA</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax refund</span>
                        <span className="font-medium text-slate-400">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Future value</span>
                        <span className="font-medium">{formatCurrency(results.tfsaGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Tax on withdraw</span>
                        <span className="font-medium text-green-600">$0</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold">Net</span>
                        <span className="font-bold text-green-600">{formatCurrency(results.tfsaNetValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tax Rate Comparison */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Tax Rates</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Current Rate</p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatPercent(results.currentMarginalRate)}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-500 mb-1">Retirement Rate</p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatPercent(results.retirementMarginalRate)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
                  <Scale className="h-6 w-6 text-teal-600" />
                </div>
                <p className="text-teal-800 font-medium mb-1">No comparison yet</p>
                <p className="text-teal-600 text-sm">Tell me about your situation to compare RRSP vs TFSA</p>
              </div>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                <th className="text-center p-4 font-semibold text-blue-600">RRSP</th>
                <th className="text-center p-4 font-semibold text-green-600">TFSA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-4 text-slate-600">{TAX_YEAR} Contribution Limit</td>
                <td className="p-4 text-center font-medium">{formatCurrency(RRSP_LIMIT_2024)}</td>
                <td className="p-4 text-center font-medium">{formatCurrency(TFSA_LIMIT_2024)}</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Tax deduction on contribution</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Tax-free growth</td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Tax-free withdrawals</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Withdrawal room restored</td>
                <td className="p-4 text-center"><X className="h-5 w-5 text-red-400 mx-auto" /></td>
                <td className="p-4 text-center"><Check className="h-5 w-5 text-green-500 mx-auto" /></td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Affects government benefits</td>
                <td className="p-4 text-center">Yes (at withdrawal)</td>
                <td className="p-4 text-center">No</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600">Best if tax rate will be...</td>
                <td className="p-4 text-center font-medium">Lower in retirement</td>
                <td className="p-4 text-center font-medium">Same or higher</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            RRSP vs TFSA: Which is Better?
          </h2>
          <p className="text-slate-600 mb-6">
            Both RRSPs and TFSAs are excellent savings vehicles, but they work differently. The best choice depends on your current income, expected retirement income, and financial goals.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-8">
            Choose RRSP When:
          </h3>
          <ul className="space-y-2 text-slate-600 mb-6">
            <li>• You're in a high tax bracket now</li>
            <li>• You expect lower income in retirement</li>
            <li>• You want to reduce this year's tax bill</li>
            <li>• You're saving for a first home (Home Buyers' Plan)</li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-8">
            Choose TFSA When:
          </h3>
          <ul className="space-y-2 text-slate-600 mb-6">
            <li>• You're in a lower tax bracket now</li>
            <li>• You expect similar or higher income in retirement</li>
            <li>• You want flexibility to withdraw without tax consequences</li>
            <li>• You want to protect government benefits like OAS and GIS</li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-8">
            <p className="text-amber-800 text-sm">
              <strong>Disclaimer:</strong> This calculator provides estimates for illustrative purposes. Your actual results will vary based on investment returns, tax rates, and other factors. Consult a financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
