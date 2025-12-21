'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// Page context types - what the AI can "see"
export interface PageContext {
  page: string // route identifier
  pageName: string // human-readable name
  data: {
    // Command Center data
    taxPosition?: {
      estimatedIncome: number
      federalTax: number
      provincialTax: number
      totalTax: number
      effectiveRate: number
      marginalRate: number
      cppContributions: number
      eiPremiums: number
      taxWithheld: number
      estimatedRefund: number
      province: string
      provinceName: string
    }
    opportunities?: Array<{
      id: string
      title: string
      description: string
      potentialSavings: number
      priority: 'high' | 'medium' | 'low'
      category: string
    }>
    taxScore?: {
      score: number
      maxScore: number
      percentile: number
      factors: Array<{
        name: string
        score: number
        maxScore: number
        description: string
      }>
    }
    bracketPosition?: {
      currentBracket: string
      currentBracketRate: number
      nextBracketThreshold: number
      amountToNextBracket: number
      combinedMarginalRate: number
    }
    deadlines?: Array<{
      name: string
      date: string
      daysUntil: number
      urgency: 'urgent' | 'soon' | 'normal'
      description: string
    }>
    moneyLeftOnTable?: number

    // Calculator data
    calculatorFields?: Record<string, string | number>
    calculatorResult?: Record<string, string | number>
    calculatorType?: string

    // Profile data
    profile?: {
      firstName?: string
      lastName?: string
      province?: string
      employmentType?: string
      income?: number
      rrspRoom?: number
      tfsaRoom?: number
    }

    // Document scanner data
    scannedDocument?: {
      documentType: string
      taxYear: number | null
      issuerName: string | null
      summary: string
      keyFields: Record<string, string | number>
    }
  }
  timestamp: number
}

// Chat message types
export interface SidebarMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  pageContext?: string // what page the user was on when they sent this
}

// Stored conversation data
interface StoredConversation {
  messages: SidebarMessage[]
  lastPageContext: PageContext | null
  lastUpdated: number
  userId: string
}

interface SidebarContextType {
  // Sidebar state
  isOpen: boolean
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void

  // Page context
  pageContext: PageContext | null
  setPageContext: (ctx: PageContext) => void

  // Chat messages - persisted
  messages: SidebarMessage[]
  addMessage: (message: Omit<SidebarMessage, 'id' | 'timestamp'>) => void
  updateLastMessage: (content: string) => void
  clearMessages: () => void

  // Streaming state
  isStreaming: boolean
  setIsStreaming: (streaming: boolean) => void

  // Conversation metadata
  lastConversationDate: Date | null
  conversationContinued: boolean
  setConversationContinued: (continued: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const STORAGE_KEY = 'tax-ai-sidebar-conversation'
const MAX_MESSAGES = 100 // Prevent localStorage bloat

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

interface SidebarProviderProps {
  children: ReactNode
  userId?: string | null
}

export function SidebarProvider({ children, userId }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pageContext, setPageContext] = useState<PageContext | null>(null)
  const [messages, setMessages] = useState<SidebarMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [lastConversationDate, setLastConversationDate] = useState<Date | null>(null)
  const [conversationContinued, setConversationContinued] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  // Track user ID changes
  useEffect(() => {
    if (userId !== currentUserId) {
      setCurrentUserId(userId || null)
      setInitialized(false) // Reset to reload for new user
    }
  }, [userId, currentUserId])

  // Load conversation from localStorage on mount (only for authenticated users)
  useEffect(() => {
    if (!currentUserId || initialized) return

    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}-${currentUserId}`)
      if (stored) {
        const data: StoredConversation = JSON.parse(stored)

        // Validate that this is for the current user
        if (data.userId === currentUserId && data.messages.length > 0) {
          setMessages(data.messages.slice(-MAX_MESSAGES)) // Limit to last N messages
          setLastConversationDate(new Date(data.lastUpdated))

          // If last conversation was more than 1 hour ago, show "continuing" indicator
          const hourAgo = Date.now() - (60 * 60 * 1000)
          if (data.lastUpdated < hourAgo) {
            setConversationContinued(true)
          }

          // Restore last page context if available
          if (data.lastPageContext) {
            setPageContext(data.lastPageContext)
          }
        }
      }
    } catch (error) {
      console.error('Failed to load sidebar conversation:', error)
    }

    setInitialized(true)
  }, [currentUserId, initialized])

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (!currentUserId || !initialized) return

    try {
      const data: StoredConversation = {
        messages: messages.slice(-MAX_MESSAGES),
        lastPageContext: pageContext,
        lastUpdated: Date.now(),
        userId: currentUserId
      }
      localStorage.setItem(`${STORAGE_KEY}-${currentUserId}`, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save sidebar conversation:', error)
    }
  }, [messages, pageContext, currentUserId, initialized])

  // Clear conversation on logout
  useEffect(() => {
    if (!currentUserId && initialized) {
      setMessages([])
      setPageContext(null)
      setLastConversationDate(null)
      setConversationContinued(false)
    }
  }, [currentUserId, initialized])

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const openSidebar = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeSidebar = useCallback(() => {
    setIsOpen(false)
  }, [])

  const addMessage = useCallback((message: Omit<SidebarMessage, 'id' | 'timestamp'>) => {
    const newMessage: SidebarMessage = {
      ...message,
      id: generateId(),
      timestamp: Date.now(),
      pageContext: pageContext?.pageName
    }
    setMessages(prev => [...prev, newMessage])
    setConversationContinued(false) // No longer showing "continuing" after new activity
  }, [pageContext])

  const updateLastMessage = useCallback((content: string) => {
    setMessages(prev => {
      if (prev.length === 0) return prev
      const updated = [...prev]
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        content
      }
      return updated
    })
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setLastConversationDate(null)
    setConversationContinued(false)

    // Also clear from localStorage
    if (currentUserId) {
      try {
        localStorage.removeItem(`${STORAGE_KEY}-${currentUserId}`)
      } catch (error) {
        console.error('Failed to clear sidebar conversation:', error)
      }
    }
  }, [currentUserId])

  const value: SidebarContextType = {
    isOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    pageContext,
    setPageContext,
    messages,
    addMessage,
    updateLastMessage,
    clearMessages,
    isStreaming,
    setIsStreaming,
    lastConversationDate,
    conversationContinued,
    setConversationContinued
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
