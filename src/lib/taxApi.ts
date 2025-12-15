import { Citation, UsageInfo, TaxResponse, ConversationMessage, StreamStatus } from '@/types/tax'
import { getAccessToken } from './supabase'

export interface StreamCallbacks {
  onStatus: (status: StreamStatus) => void
  onChunk: (chunk: string) => void
  onCitations: (citations: Citation[]) => void
  onMetadata: (metadata: {
    confidence: 'high' | 'medium' | 'low'
    disclaimer: string
    usage: UsageInfo
  }) => void
  onDone: () => void
  onError: (error: string) => void
}

export async function askTaxAssistantStream(
  question: string,
  conversationHistory: ConversationMessage[] = [],
  callbacks: StreamCallbacks,
  taxYear?: number,
  province?: string
): Promise<void> {
  const token = await getAccessToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch('/api/tax/ask-stream', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      question,
      conversationHistory,
      tax_year: taxYear,
      province,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.details || error.error || 'Failed to get tax assistant response')
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('No response body')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const event = JSON.parse(line.slice(6))

            switch (event.type) {
              case 'status':
                callbacks.onStatus(event.data)
                break
              case 'chunk':
                callbacks.onChunk(event.data.content)
                break
              case 'citations':
                callbacks.onCitations(event.data)
                break
              case 'metadata':
                callbacks.onMetadata(event.data)
                break
              case 'done':
                callbacks.onDone()
                break
              case 'error':
                callbacks.onError(event.data.message)
                break
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

export async function checkHealth() {
  const response = await fetch('/api/tax/health')
  return response.json()
}
