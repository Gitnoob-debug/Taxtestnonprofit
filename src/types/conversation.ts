export interface Conversation {
  id: string
  userId: string
  folderId: string | null
  title: string | null
  isPinned: boolean
  isArchived: boolean
  messageCount: number
  createdAt: string
  updatedAt: string
  preview: string
}

export interface ConversationMessage {
  id: string
  conversationId: string
  role: 'user' | 'assistant'
  content: string
  inputTokens?: number
  outputTokens?: number
  costUsd?: number
  responseTimeMs?: number
  modelUsed?: string
  confidenceScore?: number
  sources?: any[]
  createdAt: string
}

export interface ConversationsResponse {
  conversations: Conversation[]
  total: number
  hasMore: boolean
}

export interface ConversationWithMessages {
  conversation: Conversation
  messages: ConversationMessage[]
}
