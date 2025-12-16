'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChatInterface } from '@/components/tax/ChatInterface'
import { ConversationSidebar } from '@/components/ConversationSidebar'
import { fetchConversation } from '@/lib/conversationApi'
import { Message } from '@/types/tax'
import { ConversationMessage } from '@/types/conversation'
import { useAuth } from '@/hooks/useAuth'

function mapConversationMessageToMessage(msg: ConversationMessage): Message {
  return {
    id: msg.id,
    role: msg.role,
    content: msg.content,
    confidence: msg.confidenceScore
      ? msg.confidenceScore >= 0.7
        ? 'high'
        : msg.confidenceScore >= 0.4
          ? 'medium'
          : 'low'
      : undefined,
    citations: msg.sources,
    timestamp: new Date(msg.createdAt).getTime(),
  }
}

export function TaxAssistantPage() {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null)
  const [initialMessages, setInitialMessages] = useState<Message[]>([])
  const [conversationKey, setConversationKey] = useState(0)

  const isAuthenticated = !!user

  useEffect(() => {
    if (isAuthenticated) {
      const savedSidebarState = localStorage.getItem('sidebarOpen')
      if (savedSidebarState !== null) {
        setSidebarOpen(savedSidebarState === 'true')
      } else {
        setSidebarOpen(window.innerWidth >= 768)
      }
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('sidebarOpen', sidebarOpen.toString())
    }
  }, [sidebarOpen, isAuthenticated])

  const { data: conversationData, isLoading: isLoadingConversation } = useQuery({
    queryKey: ['conversation', activeConversationId],
    queryFn: () => fetchConversation(activeConversationId!),
    enabled: !!activeConversationId && isAuthenticated,
  })

  useEffect(() => {
    if (conversationData?.messages) {
      const mapped = conversationData.messages.map(mapConversationMessageToMessage)
      setInitialMessages(mapped)
      setConversationKey((k) => k + 1)
    }
  }, [conversationData])

  const handleSelectConversation = (id: string | null) => {
    setActiveConversationId(id)
    if (id === null) {
      setInitialMessages([])
      setConversationKey((k) => k + 1)
    }
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  const handleNewConversation = () => {
    setActiveConversationId(null)
    setInitialMessages([])
    setConversationKey((k) => k + 1)
    if (window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="h-[calc(100vh-3.5rem)] w-full bg-background flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <ConversationSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
          isAuthenticated={isAuthenticated}
        />
        <div className="flex-1 overflow-hidden relative">
          {isLoadingConversation && activeConversationId ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
            </div>
          ) : (
            <ChatInterface
              key={conversationKey}
              conversationId={activeConversationId}
              initialMessages={initialMessages}
              isAuthenticated={isAuthenticated}
              onConversationCreated={(id) => setActiveConversationId(id)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
