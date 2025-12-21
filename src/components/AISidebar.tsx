'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Eye,
  Trash2,
  ChevronRight,
  Sparkles,
  Loader2,
  Calculator,
  FileText,
  HelpCircle,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSidebar, SidebarMessage } from '@/contexts/SidebarContext'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

// Format timestamp to readable string
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' })
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

// Format last conversation date
function formatContinuationDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  } else if (diffDays === 1) {
    return 'yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }
}

// Context indicator based on page
function ContextIndicator({ pageName, data }: { pageName: string; data: Record<string, unknown> }) {
  const hasCommandCenterData = data?.taxPosition || data?.opportunities || data?.taxScore
  const hasCalculatorData = data?.calculatorFields || data?.calculatorResult
  const hasProfileData = data?.profile
  const hasDocumentData = data?.scannedDocument

  let contextDescription = pageName

  // Add context hints
  if (hasCommandCenterData && data?.taxPosition) {
    const tp = data.taxPosition as { estimatedRefund?: number; estimatedIncome?: number }
    if (tp.estimatedRefund !== undefined) {
      contextDescription = `${pageName} (${tp.estimatedRefund >= 0 ? 'Refund' : 'Owing'}: $${Math.abs(tp.estimatedRefund).toLocaleString()})`
    }
  }

  if (hasCalculatorData && data?.calculatorType) {
    contextDescription = `${data.calculatorType}`
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-teal-50 dark:bg-teal-950/30 border-b border-teal-100 dark:border-teal-900/50 text-sm">
      <Eye className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
      <span className="text-teal-700 dark:text-teal-300 truncate">
        Viewing: <span className="font-medium">{contextDescription}</span>
      </span>
    </div>
  )
}

// Quick action buttons based on context
function QuickActions({
  pageContext,
  onAction
}: {
  pageContext: { page: string; data: Record<string, unknown> } | null
  onAction: (action: string) => void
}) {
  const page = pageContext?.page || ''
  const data = pageContext?.data || {}

  let actions: Array<{ label: string; prompt: string; icon: React.ReactNode }> = []

  if (page.includes('command-center')) {
    actions = [
      { label: 'Explain my score', prompt: 'Can you explain my tax score and what it means?', icon: <HelpCircle className="h-3.5 w-3.5" /> },
      { label: 'How to improve?', prompt: 'How can I improve my tax situation based on what you can see?', icon: <TrendingUp className="h-3.5 w-3.5" /> }
    ]

    // Add opportunity-specific action
    const opportunities = data?.opportunities as Array<{ title: string }> | undefined
    if (opportunities && opportunities.length > 0) {
      actions.push({
        label: 'Top opportunity',
        prompt: `Tell me more about the "${opportunities[0].title}" opportunity and how to take advantage of it.`,
        icon: <Sparkles className="h-3.5 w-3.5" />
      })
    }
  } else if (page.includes('calculator') || page.includes('tools')) {
    actions = [
      { label: 'What does this mean?', prompt: 'Can you explain what these calculator results mean for my situation?', icon: <HelpCircle className="h-3.5 w-3.5" /> },
      { label: 'Is this optimal?', prompt: 'Based on these values, is this the optimal approach or should I adjust something?', icon: <TrendingUp className="h-3.5 w-3.5" /> }
    ]
  } else if (page.includes('profile')) {
    actions = [
      { label: 'Review my profile', prompt: 'Can you review my profile and suggest if I\'m missing any tax-saving opportunities?', icon: <FileText className="h-3.5 w-3.5" /> }
    ]
  } else if (page.includes('scanner') || page.includes('documents')) {
    actions = [
      { label: 'Explain document', prompt: 'Can you explain what this tax document means and how I should use it?', icon: <FileText className="h-3.5 w-3.5" /> }
    ]
  }

  if (actions.length === 0) {
    // Default actions
    actions = [
      { label: 'Tax tips', prompt: 'What are some common tax deductions I might be missing?', icon: <Sparkles className="h-3.5 w-3.5" /> },
      { label: 'RRSP vs TFSA', prompt: 'Should I prioritize RRSP or TFSA contributions?', icon: <Calculator className="h-3.5 w-3.5" /> }
    ]
  }

  return (
    <div className="flex flex-wrap gap-1.5 px-3 py-2 border-b border-slate-200 dark:border-slate-700">
      {actions.slice(0, 3).map((action, idx) => (
        <button
          key={idx}
          onClick={() => onAction(action.prompt)}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full
            bg-slate-100 dark:bg-slate-800
            text-slate-700 dark:text-slate-300
            hover:bg-slate-200 dark:hover:bg-slate-700
            transition-colors"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  )
}

// Individual message bubble
function MessageBubble({ message }: { message: SidebarMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
      <div
        className={cn(
          'max-w-[85%] px-3 py-2 rounded-2xl text-sm',
          isUser
            ? 'bg-teal-600 text-white rounded-br-md'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-md'
        )}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
      </div>
      <div className="flex items-center gap-2 px-1">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {formatTimestamp(message.timestamp)}
        </span>
        {message.pageContext && !isUser && (
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            · {message.pageContext}
          </span>
        )}
      </div>
    </div>
  )
}

// Main AISidebar component
export function AISidebar() {
  const { user, getToken } = useAuth()
  const {
    isOpen,
    toggleSidebar,
    closeSidebar,
    pageContext,
    messages,
    addMessage,
    updateLastMessage,
    clearMessages,
    isStreaming,
    setIsStreaming,
    lastConversationDate,
    conversationContinued,
    setConversationContinued
  } = useSidebar()

  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when sidebar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Keyboard shortcut: Cmd/Ctrl + J to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim()
    if (!trimmedInput || isStreaming) return

    // Add user message
    addMessage({ role: 'user', content: trimmedInput })
    setInput('')
    setIsStreaming(true)

    // Add placeholder for assistant response
    addMessage({ role: 'assistant', content: '' })

    try {
      const token = await getToken()

      const response = await fetch('/api/ai-sidebar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          message: trimmedInput,
          pageContext,
          conversationHistory: messages.slice(-20).map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))

                if (data.type === 'chunk') {
                  fullContent += data.content
                  updateLastMessage(fullContent)
                } else if (data.type === 'error') {
                  updateLastMessage(data.message || 'Sorry, I encountered an error. Please try again.')
                }
              } catch {
                // Ignore JSON parse errors for incomplete chunks
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Sidebar chat error:', error)
      updateLastMessage('Sorry, I encountered an error. Please try again.')
    } finally {
      setIsStreaming(false)
    }
  }, [input, isStreaming, pageContext, messages, addMessage, updateLastMessage, setIsStreaming, getToken])

  const handleQuickAction = useCallback((prompt: string) => {
    setInput(prompt)
    // Focus and trigger send
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 50)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Don't render for non-authenticated users
  if (!user) return null

  // Collapsed state - just show toggle button
  if (!isOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50
          w-10 h-24
          bg-teal-600 hover:bg-teal-700
          text-white
          rounded-l-xl
          shadow-lg
          flex flex-col items-center justify-center gap-1
          transition-all duration-200
          hover:w-12"
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="h-5 w-5" />
        <ChevronRight className="h-4 w-4 rotate-180" />
      </button>
    )
  }

  // Expanded state
  return (
    <div className="fixed right-0 top-0 bottom-0 z-50 w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Tax AI Assistant</h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[9px]">Ctrl</kbd>
              <span className="mx-0.5">+</span>
              <kbd className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[9px]">J</kbd>
              <span className="ml-1">to toggle</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="h-8 w-8 text-slate-500 hover:text-red-600"
            title="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeSidebar}
            className="h-8 w-8 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Context indicator */}
      {pageContext && (
        <ContextIndicator pageName={pageContext.pageName} data={pageContext.data as Record<string, unknown>} />
      )}

      {/* Quick actions */}
      <QuickActions pageContext={pageContext as { page: string; data: Record<string, unknown> } | null} onAction={handleQuickAction} />

      {/* Messages area */}
      <ScrollArea className="flex-1 px-3 py-4" ref={scrollAreaRef}>
        {/* Continuation indicator */}
        {conversationContinued && lastConversationDate && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
              Continuing from {formatContinuationDate(lastConversationDate)}
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>
        )}

        {/* Welcome message if no messages */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              Hi! I&apos;m your Tax AI Assistant
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              I can see what you&apos;re viewing and help with personalized tax advice.
              Ask me anything about your taxes!
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Our conversation will be saved so you can pick up where you left off.
            </p>
          </div>
        )}

        {/* Message list */}
        <div className="space-y-4">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Streaming indicator */}
          {isStreaming && messages.length > 0 && messages[messages.length - 1].content === '' && (
            <div className="flex items-start gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md px-3 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div ref={messagesEndRef} />
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your taxes..."
            className="flex-1 resize-none rounded-xl border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-900
              px-3 py-2 text-sm
              placeholder:text-slate-400
              focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
              min-h-[40px] max-h-[120px]"
            rows={1}
            disabled={isStreaming}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="h-10 w-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shrink-0"
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
