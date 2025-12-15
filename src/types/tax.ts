export interface Citation {
  title: string
  url: string
  source_type: string
  excerpt: string
}

export interface UsageInfo {
  total_tokens: number
  estimated_cost: number
}

export interface TaxResponse {
  answer: string
  citations: Citation[]
  confidence: 'high' | 'medium' | 'low'
  disclaimer: string
  usage?: UsageInfo
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  citations?: Citation[]
  confidence?: 'high' | 'medium' | 'low'
  disclaimer?: string
  usage?: UsageInfo
  timestamp: number
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface StreamStatus {
  step: number
  message: string
  sources?: string[]
  scores?: string[]
}
