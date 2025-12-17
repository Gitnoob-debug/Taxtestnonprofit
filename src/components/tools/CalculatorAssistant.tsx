'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Bot,
  Send,
  X,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export interface CalculatorField {
  name: string
  label: string
  type: 'number' | 'select' | 'text'
  options?: { value: string; label: string }[]
  currentValue?: string | number
}

export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  fieldUpdates?: Record<string, string | number>
}

interface CalculatorAssistantProps {
  calculatorName: string
  fields: CalculatorField[]
  onFieldUpdate: (fieldName: string, value: string | number) => void
  examplePrompts?: string[]
}

export function CalculatorAssistant({
  calculatorName,
  fields,
  onFieldUpdate,
  examplePrompts = [
    "I make $85,000 per year in Ontario",
    "Calculate for someone earning $120k in BC",
    "What if I made $50,000 in Alberta?"
  ]
}: CalculatorAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<AssistantMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const parseUserInput = async (userMessage: string, currentMessages: AssistantMessage[]) => {
    setIsLoading(true)

    // Build conversation history for context
    const conversationHistory = currentMessages.map(m => ({
      role: m.role,
      content: m.content
    }))

    try {
      const response = await fetch('/api/calculator-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          calculatorType: calculatorName,
          fields: fields.map(f => ({
            name: f.name,
            label: f.label,
            type: f.type,
            options: f.options,
            currentValue: f.currentValue
          })),
          conversationHistory
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Apply field updates
      if (data.fieldUpdates) {
        Object.entries(data.fieldUpdates).forEach(([field, value]) => {
          onFieldUpdate(field, value as string | number)
        })
      }

      return {
        content: data.message,
        fieldUpdates: data.fieldUpdates
      }
    } catch (error) {
      console.error('Assistant error:', error)
      return {
        content: "I'm sorry, I had trouble understanding that. Could you try rephrasing? For example, you can say \"I make $75,000 in Ontario\" or \"Calculate taxes for $100k income in BC\".",
        fieldUpdates: undefined
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: AssistantMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')

    const response = await parseUserInput(userMessage.content, newMessages)

    const assistantMessage: AssistantMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      fieldUpdates: response.fieldUpdates
    }

    setMessages(prev => [...prev, assistantMessage])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleExampleClick = (prompt: string) => {
    setInput(prompt)
    inputRef.current?.focus()
  }

  return (
    <>
      {/* Mobile FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="lg:hidden fixed bottom-4 left-4 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 flex items-center justify-center hover:from-teal-600 hover:to-teal-700 transition-all"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar Toggle */}
      <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center gap-2 py-3 px-2 bg-white dark:bg-slate-800 border border-l-0 border-slate-200 dark:border-slate-700 rounded-r-lg shadow-md hover:shadow-lg transition-all",
            isOpen && "opacity-0 pointer-events-none"
          )}
        >
          <Bot className="h-5 w-5 text-teal-600" />
          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {/* Sidebar / Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "fixed left-0 top-0 z-50 h-full w-[320px] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 shadow-xl flex flex-col",
                "lg:top-14" // Account for header on desktop
              )}
              style={{ height: 'calc(100vh - 56px)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">AI Assistant</h3>
                    <p className="text-xs text-slate-500">Fill calculator with natural language</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                {messages.length === 0 ? (
                  <div className="space-y-4">
                    <div className="text-center py-6">
                      <Bot className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                        Tell me your income details
                      </p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        I'll fill in the calculator for you
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Try saying:</p>
                      {examplePrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleExampleClick(prompt)}
                          className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-colors text-sm text-slate-700 dark:text-slate-300"
                        >
                          "{prompt}"
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex gap-2",
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {msg.role === 'assistant' && (
                          <div className="h-7 w-7 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
                            <Bot className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2 text-sm",
                            msg.role === 'user'
                              ? 'bg-teal-600 text-white rounded-br-md'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md'
                          )}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          {msg.fieldUpdates && Object.keys(msg.fieldUpdates).length > 0 && (
                            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                              <p className="text-xs opacity-75 mb-1">Updated fields:</p>
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(msg.fieldUpdates).map(([field, value]) => (
                                  <span
                                    key={field}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-teal-500/20 text-teal-700 dark:text-teal-300"
                                  >
                                    {field}: {value}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex gap-2 justify-start">
                        <div className="h-7 w-7 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center shrink-0">
                          <Loader2 className="h-4 w-4 text-teal-600 dark:text-teal-400 animate-spin" />
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md px-4 py-2">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="h-2 w-2 rounded-full bg-slate-400"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="relative">
                  <Textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe your income..."
                    className="min-h-[60px] max-h-[120px] pr-12 resize-none text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 bottom-2 h-8 w-8"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
