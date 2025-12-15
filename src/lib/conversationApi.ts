import {
  Conversation,
  ConversationsResponse,
  ConversationWithMessages,
  ConversationMessage,
} from '@/types/conversation'
import { getAccessToken } from './supabase'

const API_BASE = '/api/conversations'

async function getAuthHeaders(): Promise<HeadersInit | null> {
  const token = await getAccessToken()
  if (!token) {
    return null
  }
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function fetchConversations(options?: {
  archived?: boolean
  limit?: number
  offset?: number
  search?: string
}): Promise<ConversationsResponse> {
  try {
    const headers = await getAuthHeaders()
    if (!headers) {
      return { conversations: [], total: 0, hasMore: false }
    }

    const params = new URLSearchParams()
    if (options?.archived) params.set('archived', 'true')
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    if (options?.search) params.set('search', options.search)

    const response = await fetch(`${API_BASE}?${params.toString()}`, { headers })

    if (!response.ok) {
      if (response.status === 401) {
        return { conversations: [], total: 0, hasMore: false }
      }
      throw new Error('Failed to fetch conversations')
    }

    const data = await response.json()
    const conversations: Conversation[] = (data.conversations || []).map((c: any) => ({
      id: c.id,
      userId: c.user_id || '',
      folderId: null,
      title: c.title || null,
      createdAt: c.created_at,
      updatedAt: c.updated_at,
      messageCount: c.message_count || 0,
      isPinned: c.is_pinned || false,
      isArchived: c.is_archived || false,
      preview: '',
    }))

    return {
      conversations,
      total: conversations.length,
      hasMore: false,
    }
  } catch (error) {
    console.error('Fetch conversations error:', error)
    return { conversations: [], total: 0, hasMore: false }
  }
}

export async function fetchConversation(id: string): Promise<ConversationWithMessages | null> {
  try {
    const headers = await getAuthHeaders()
    if (!headers) return null

    const response = await fetch(`${API_BASE}/${id}`, { headers })

    if (!response.ok) {
      if (response.status === 404 || response.status === 401) {
        return null
      }
      throw new Error('Failed to fetch conversation')
    }

    const data = await response.json()
    const conversation: Conversation = {
      id: data.conversation.id,
      userId: data.conversation.user_id || '',
      folderId: null,
      title: data.conversation.title || null,
      createdAt: data.conversation.created_at,
      updatedAt: data.conversation.updated_at,
      messageCount: data.messages?.length || 0,
      isPinned: data.conversation.is_pinned || false,
      isArchived: data.conversation.is_archived || false,
      preview: '',
    }

    const messages: ConversationMessage[] = (data.messages || []).map((m: any) => ({
      id: m.id,
      conversationId: m.conversation_id,
      role: m.role,
      content: m.content,
      sources: m.sources,
      inputTokens: m.input_tokens,
      outputTokens: m.output_tokens,
      costUsd: m.cost_usd,
      responseTimeMs: m.response_time_ms,
      modelUsed: m.model_used,
      confidenceScore: m.confidence_score,
      createdAt: m.created_at,
    }))

    return { conversation, messages }
  } catch (error) {
    console.error('Fetch conversation error:', error)
    return null
  }
}

export async function createConversation(options?: {
  title?: string
  firstMessage?: string
}): Promise<Conversation | null> {
  const headers = await getAuthHeaders()
  if (!headers) return null

  const response = await fetch(API_BASE, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: options?.title || options?.firstMessage?.slice(0, 50) || 'New Conversation',
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create conversation')
  }

  const data = await response.json()
  return {
    id: data.conversation.id,
    userId: data.conversation.user_id || '',
    folderId: null,
    title: data.conversation.title,
    createdAt: data.conversation.created_at,
    updatedAt: data.conversation.updated_at,
    messageCount: 0,
    isPinned: false,
    isArchived: false,
    preview: '',
  }
}

export async function updateConversation(
  id: string,
  updates: {
    title?: string
    isPinned?: boolean
    isArchived?: boolean
  }
): Promise<Conversation | null> {
  const headers = await getAuthHeaders()
  if (!headers) return null

  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      title: updates.title,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to update conversation')
  }

  const data = await response.json()
  return {
    id: data.conversation.id,
    userId: data.conversation.user_id || '',
    folderId: null,
    title: data.conversation.title,
    createdAt: data.conversation.created_at,
    updatedAt: data.conversation.updated_at,
    messageCount: data.conversation.message_count || 0,
    isPinned: data.conversation.is_pinned || false,
    isArchived: data.conversation.is_archived || false,
    preview: '',
  }
}

export async function deleteConversation(id: string): Promise<void> {
  const headers = await getAuthHeaders()
  if (!headers) return

  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    throw new Error('Failed to delete conversation')
  }
}

export async function addMessage(
  conversationId: string,
  message: {
    role: 'user' | 'assistant'
    content: string
    sources?: any[]
    inputTokens?: number
    outputTokens?: number
    costUsd?: number
    responseTimeMs?: number
    modelUsed?: string
    confidenceScore?: number
  }
): Promise<ConversationMessage | null> {
  const headers = await getAuthHeaders()
  if (!headers) return null

  const response = await fetch(`${API_BASE}/${conversationId}/messages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      role: message.role,
      content: message.content,
      tokens_used: (message.inputTokens || 0) + (message.outputTokens || 0),
      cost_usd: message.costUsd,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to add message')
  }

  const data = await response.json()
  return {
    id: data.message.id,
    conversationId: data.message.conversation_id,
    role: data.message.role,
    content: data.message.content,
    sources: data.message.sources,
    inputTokens: data.message.input_tokens,
    outputTokens: data.message.output_tokens,
    costUsd: data.message.cost_usd,
    responseTimeMs: data.message.response_time_ms,
    modelUsed: data.message.model_used,
    confidenceScore: data.message.confidence_score,
    createdAt: data.message.created_at,
  }
}
