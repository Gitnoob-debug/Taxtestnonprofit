'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Message, Citation, UsageInfo, ConversationMessage, StreamStatus } from '@/types/tax'
import { askTaxAssistantStream } from '@/lib/taxApi'
import { createConversation, addMessage } from '@/lib/conversationApi'
import { MessageBubble } from './MessageBubble'
import { Send, Eraser, Sparkles, ArrowUp, Bot, Search, Brain, FileText, Database, Zap, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'

const STEP_ICONS = [
  { icon: Search, label: 'Analyzing' },
  { icon: Database, label: 'Vectorizing' },
  { icon: Brain, label: 'Searching' },
  { icon: FileText, label: 'Reading' },
  { icon: Zap, label: 'Generating' },
]

interface ChatInterfaceProps {
  conversationId?: string | null
  initialMessages?: Message[]
  isAuthenticated?: boolean
  onConversationCreated?: (id: string) => void
}

export function ChatInterface({
  conversationId: initialConversationId = null,
  initialMessages = [],
  isAuthenticated = false,
  onConversationCreated,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<StreamStatus | null>(null)
  const [streamingContent, setStreamingContent] = useState('')
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(
    initialConversationId
  )
  const scrollRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const streamingContentRef = useRef('')
  const streamingCitationsRef = useRef<Citation[]>([])
  const streamingMetadataRef = useRef<{
    confidence?: 'high' | 'medium' | 'low'
    disclaimer?: string
    usage?: UsageInfo
  }>({})

  useEffect(() => {
    setMessages(initialMessages)
    setCurrentConversationId(initialConversationId)
  }, [initialMessages, initialConversationId])

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, streamingContent, scrollToBottom])

  const saveMessageToConversation = async (
    convId: string,
    role: 'user' | 'assistant',
    content: string,
    metadata?: {
      sources?: any[]
      confidenceScore?: number
      inputTokens?: number
      outputTokens?: number
      costUsd?: number
      responseTimeMs?: number
      modelUsed?: string
    }
  ) => {
    if (!isAuthenticated) return

    try {
      await addMessage(convId, {
        role,
        content,
        ...metadata,
      })
    } catch (error) {
      console.error('Failed to save message:', error)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    }

    const conversationHistory: ConversationMessage[] = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }))

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setStreamingContent('')
    streamingContentRef.current = ''
    streamingCitationsRef.current = []
    streamingMetadataRef.current = {}
    setCurrentStatus({ step: 0, message: 'Starting...' })

    const startTime = Date.now()

    let conversationIdPromise: Promise<string | null> = Promise.resolve(currentConversationId)

    if (isAuthenticated && !currentConversationId) {
      conversationIdPromise = createConversation({
        firstMessage: userMessage.content,
      })
        .then((newConversation) => {
          if (!newConversation) return null
          setCurrentConversationId(newConversation.id)
          onConversationCreated?.(newConversation.id)
          queryClient.invalidateQueries({ queryKey: ['conversations'] })
          addMessage(newConversation.id, { role: 'user', content: userMessage.content }).catch(
            console.error
          )
          return newConversation.id
        })
        .catch((error) => {
          console.error('Failed to create conversation:', error)
          return null
        })
    } else if (isAuthenticated && currentConversationId) {
      addMessage(currentConversationId, { role: 'user', content: userMessage.content }).catch(
        console.error
      )
    }

    try {
      await askTaxAssistantStream(userMessage.content, conversationHistory, {
        onStatus: (status) => {
          setCurrentStatus(status)
        },
        onChunk: (chunk) => {
          streamingContentRef.current += chunk
          setStreamingContent(streamingContentRef.current)
        },
        onCitations: (citations) => {
          streamingCitationsRef.current = citations
        },
        onMetadata: (metadata) => {
          streamingMetadataRef.current = metadata
        },
        onDone: async () => {
          const responseTimeMs = Date.now() - startTime
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: streamingContentRef.current,
            citations: streamingCitationsRef.current,
            confidence: streamingMetadataRef.current.confidence,
            disclaimer: streamingMetadataRef.current.disclaimer,
            usage: streamingMetadataRef.current.usage,
            timestamp: Date.now(),
          }

          setMessages((prev) => [...prev, botMessage])
          setIsLoading(false)
          setStreamingContent('')
          setCurrentStatus(null)

          if (isAuthenticated) {
            const convId = await conversationIdPromise
            if (convId) {
              const confidenceMap = { high: 0.9, medium: 0.6, low: 0.3 }
              saveMessageToConversation(convId, 'assistant', botMessage.content, {
                sources: streamingCitationsRef.current,
                confidenceScore: streamingMetadataRef.current.confidence
                  ? confidenceMap[streamingMetadataRef.current.confidence]
                  : undefined,
                inputTokens: streamingMetadataRef.current.usage?.total_tokens,
                costUsd: streamingMetadataRef.current.usage?.estimated_cost,
                responseTimeMs,
                modelUsed: 'claude-sonnet-4',
              }).catch(console.error)
              queryClient.invalidateQueries({ queryKey: ['conversations'] })
            }
          }

          streamingContentRef.current = ''
          streamingCitationsRef.current = []
          streamingMetadataRef.current = {}
        },
        onError: (error) => {
          toast.error(error)
          setIsLoading(false)
          setCurrentStatus(null)
        },
      })
    } catch (error) {
      console.error('Failed to get response', error)
      toast.error(error instanceof Error ? error.message : 'Failed to get response. Please try again.')
      setIsLoading(false)
      setCurrentStatus(null)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    setCurrentConversationId(null)
  }

  const CurrentIcon = currentStatus
    ? STEP_ICONS[Math.min(currentStatus.step - 1, STEP_ICONS.length - 1)]?.icon || Search
    : Search

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative flex items-center justify-between px-6 py-4 border-b border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-lg">Tax Assistant</h1>
            <p className="text-xs text-slate-500 font-medium">Powered by CRA Documents</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Eraser className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full px-4 sm:px-8" ref={scrollRef}>
          <div className="max-w-3xl mx-auto py-8 min-h-[calc(100vh-16rem)]">
            {messages.length === 0 && !isLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8 mt-16"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/25">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-400 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-amber-900">CA</span>
                  </div>
                </div>
                <div className="max-w-md space-y-3">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    How can I help with your taxes?
                  </h2>
                  <p className="text-slate-500 leading-relaxed">
                    I&apos;m trained on official Canada Revenue Agency documents. Ask me about
                    deductions, credits, forms, or filing requirements.
                  </p>
                </div>

                <div className="grid gap-3 w-full max-w-md text-left">
                  {[
                    'What medical expenses can I claim?',
                    'Can I claim home office expenses?',
                    'How do I report rental income?',
                  ].map((q, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      onClick={() => setInput(q)}
                      className="card-premium p-4 text-sm font-medium text-slate-700 flex items-center justify-between group"
                    >
                      {q}
                      <ArrowUp className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-emerald-600 rotate-45" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <>
                {messages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 max-w-3xl mx-auto mb-8"
                    >
                      <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-emerald-500/20">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="card-premium p-4 rounded-2xl rounded-tl-md">
                          {currentStatus && !streamingContent && (
                            <div className="mb-3">
                              <div className="flex items-center gap-3 mb-2">
                                <motion.div
                                  key={currentStatus.step}
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  className="p-2 rounded-lg bg-emerald-50"
                                >
                                  <CurrentIcon className="h-4 w-4 text-emerald-600 animate-pulse" />
                                </motion.div>
                                <div className="flex-1">
                                  <motion.p
                                    key={currentStatus.message}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-sm font-medium text-slate-700"
                                  >
                                    {currentStatus.message}
                                  </motion.p>
                                  {currentStatus.sources && currentStatus.sources.length > 0 && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="mt-1 flex flex-wrap gap-1"
                                    >
                                      {currentStatus.sources.map((source, i) => (
                                        <span
                                          key={i}
                                          className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100"
                                        >
                                          {source.length > 30 ? source.slice(0, 30) + '...' : source}
                                        </span>
                                      ))}
                                    </motion.div>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-1 ml-11">
                                {[0, 1, 2].map((i) => (
                                  <motion.div
                                    key={i}
                                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                                    animate={{
                                      opacity: [0.3, 1, 0.3],
                                      scale: [0.8, 1, 0.8],
                                    }}
                                    transition={{
                                      duration: 1,
                                      repeat: Infinity,
                                      delay: i * 0.2,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {streamingContent && (
                            <div className="prose prose-sm prose-slate max-w-none">
                              <div
                                className="whitespace-pre-wrap text-slate-700"
                                dangerouslySetInnerHTML={{
                                  __html: streamingContent
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\n/g, '<br/>'),
                                }}
                              />
                              <motion.span
                                className="inline-block w-2 h-4 bg-emerald-500 ml-0.5 rounded-sm"
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            <div className="h-8" />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="relative p-4 sm:p-6 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto">
          <div className="card-premium p-1 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-300 transition-all duration-200">
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question about your taxes..."
                className="min-h-[56px] max-h-[200px] w-full resize-none border-0 bg-transparent focus-visible:ring-0 py-4 pl-4 pr-14 text-base text-slate-700 placeholder:text-slate-400"
                disabled={isLoading}
              />
              <Button
                size="icon"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={cn(
                  'absolute right-2 bottom-2 h-10 w-10 rounded-xl transition-all duration-200 btn-premium',
                  input.trim() ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            AI can make mistakes. Verify important information with official CRA sources.
          </p>
        </div>
      </div>
    </div>
  )
}
