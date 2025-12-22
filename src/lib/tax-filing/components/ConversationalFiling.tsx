'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, CheckCircle2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import {
  ConversationState,
  ConversationMessage,
  ExtractedData,
  createInitialState,
  getCurrentQuestion,
  formatQuestion,
  QUESTION_FLOW
} from '../conversation-engine'
import { LiveTaxForm } from './LiveTaxForm'
import { formatCurrency } from '../tax-engine'

export function ConversationalFiling() {
  // Conversation state
  const [conversationState, setConversationState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [extractedData, setExtractedData] = useState<Partial<ExtractedData>>({})
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentlyUpdatedFields, setRecentlyUpdatedFields] = useState<string[]>([])

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Calculate progress
  const totalSteps = QUESTION_FLOW.length
  const currentStepIndex = QUESTION_FLOW.findIndex(
    q => q.phase === conversationState.phase && q.subStep === conversationState.subStep
  )
  const progress = Math.round(((currentStepIndex + 1) / totalSteps) * 100)

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Send initial greeting
  useEffect(() => {
    const currentQuestion = getCurrentQuestion(conversationState)
    if (currentQuestion && messages.length === 0) {
      const greeting: ConversationMessage = {
        role: 'assistant',
        content: currentQuestion.question,
        timestamp: Date.now()
      }
      setMessages([greeting])
    }
  }, [])

  // Handle sending a message
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ConversationMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/tax-filing/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationState,
          conversationHistory: messages.slice(-10),
          extractedData
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Update state
      setExtractedData(data.allExtractedData)
      setConversationState(data.newState)

      // Highlight updated fields
      if (data.fieldsUpdated && data.fieldsUpdated.length > 0) {
        setRecentlyUpdatedFields(data.fieldsUpdated)
        setTimeout(() => setRecentlyUpdatedFields([]), 2000)
      }

      // Add assistant message
      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
        extractedData: data.extractedData,
        fieldsUpdated: data.fieldsUpdated
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: "Sorry, I had trouble processing that. Could you try again?",
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI Tax Filing Assistant</h1>
                <p className="text-xs text-muted-foreground">2024 Tax Return</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-sm font-medium">{progress}%</p>
              </div>
              <Progress value={progress} className="w-24 sm:w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
          {/* Left Side - Chat */}
          <Card className="flex flex-col h-full">
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          {msg.fieldsUpdated && msg.fieldsUpdated.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-primary/20 flex items-center gap-1 text-xs opacity-70">
                              <CheckCircle2 className="h-3 w-3" />
                              Updated: {msg.fieldsUpdated.join(', ')}
                            </div>
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your answer..."
                    disabled={isLoading}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Live Form */}
          <div className="hidden lg:block">
            <LiveTaxForm
              extractedData={extractedData}
              conversationState={conversationState}
              recentlyUpdatedFields={recentlyUpdatedFields}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
