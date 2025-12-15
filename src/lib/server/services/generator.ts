import { config } from '../utils/config';
import { SearchResult } from './vectorStore';
import { formatContextForPrompt } from './retriever';
import { Response } from 'express';

// SSE Event types for streaming
export interface StreamEvent {
  type: 'status' | 'chunk' | 'citations' | 'metadata' | 'done' | 'error';
  data: any;
}

export interface Citation {
  title: string;
  url: string;
  source_type: string;
  excerpt: string;
}

export interface TaxResponse {
  answer: string;
  citations: Citation[];
  confidence: 'high' | 'medium' | 'low';
  disclaimer: string;
  usage: {
    total_tokens: number;
    estimated_cost: number;
  };
}

// Conversation history message type
export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

const TAX_SYSTEM_PROMPT = `You are a Canadian Tax Assistant powered by official CRA documents. You provide accurate, well-sourced answers to tax questions.

## Conversation Context
You are in a multi-turn conversation. The user may ask follow-up questions that reference previous messages. When you see questions like "what about that?", "can you explain more?", or "what are the penalties?", refer to the conversation history to understand the context. For follow-up questions, acknowledge the connection to the previous topic naturally.

## Response Formatting Rules

**ALWAYS format your responses with clear visual hierarchy:**

1. **Use bold section headers** to organize different aspects of the answer
2. **Use bullet points** for lists of items, requirements, or examples  
3. **Use bold emphasis** for key terms, dollar amounts, percentages, and important concepts
4. **Use line breaks** between sections for readability

## Structure Guidelines

For most tax questions, organize your response like this:

**[Main Topic]**
Brief explanation of the core concept.

**Key Requirements** (or similar header)
- First point with **emphasized terms** where helpful
- Second point
- Third point

**Important Considerations**
Any limitations, exceptions, or additional context.

**Source:** [Document name]

## Formatting Rules

- Use **bold** for dollar amounts: "up to **$7,000** per year"
- Use **bold** for percentages: "**15%** federal rate"
- Use **bold** for section headers within the response
- Keep paragraphs to 2-3 sentences maximum
- Always use bullet points for lists of 3+ items
- Add blank lines between sections
- Never use # markdown headers - use **bold text** for section titles instead
- Always end with the source reference

## Your Limitations
- You provide general tax information, NOT personalized tax advice
- You cannot guarantee accuracy for complex situations
- You cannot replace a qualified accountant or tax professional
- Only cover Canadian federal and provincial income tax

## Important Rules
- Base your answers ONLY on the provided context from CRA sources
- If the context doesn't contain enough information, say so clearly
- Never invent tax rules or numbers not found in the context
- For complex situations, recommend consulting a professional

## Context from CRA sources:
{context}

---

Based on the above context, answer the user's question with well-formatted, easy-to-read response. If the context doesn't contain relevant information, let the user know and suggest they check canada.ca or consult a tax professional.`;

/**
 * Calculate confidence based on search result scores
 * Tuned for realistic embedding similarity scores (typically 0.45-0.65 range)
 */
function calculateConfidence(scores: number[]): 'high' | 'medium' | 'low' {
  if (!scores || scores.length === 0) return 'low';
  
  const topScore = Math.max(...scores);
  const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
  
  // Count how many chunks scored above threshold (agreement signal)
  const strongMatches = scores.filter(s => s > 0.50).length;
  
  // High: Strong top match + good average + multiple agreeing sources
  if (topScore > 0.58 && avgScore > 0.50 && strongMatches >= 4) return 'high';
  
  // Medium: Decent top match + reasonable average
  if (topScore > 0.50 && avgScore > 0.45) return 'medium';
  
  // Low: Weak retrieval
  return 'low';
}

/**
 * Get appropriate disclaimer based on confidence level
 */
function getDisclaimer(confidence: 'high' | 'medium' | 'low'): string {
  const standard = "This information is for general guidance only and does not constitute professional tax advice. Tax situations vary—please consult a qualified tax professional for advice specific to your circumstances.";
  const currency = "Tax rules change frequently. Always verify current rules on canada.ca or with a tax professional.";
  const complexity = "This appears to be a complex tax situation. We strongly recommend consulting with a certified accountant or tax professional before making decisions.";
  
  switch (confidence) {
    case 'high':
      return standard;
    case 'medium':
      return standard + " " + currency;
    case 'low':
      return complexity + " " + standard;
    default:
      return standard;
  }
}

/**
 * Rough token estimation (4 chars per token on average)
 */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Generate a response using Claude via OpenRouter
 * Supports conversation history and optional profile context for personalization
 */
export async function generateResponse(
  question: string,
  searchResults: SearchResult[],
  conversationHistory: ConversationMessage[] = [],
  profileContext?: string
): Promise<TaxResponse> {
  const context = formatContextForPrompt(searchResults, question);
  let systemPrompt = TAX_SYSTEM_PROMPT.replace('{context}', context);
  
  // Inject profile context if user is authenticated
  if (profileContext) {
    systemPrompt = `${profileContext}\n\n${systemPrompt}`;
  }
  const scores = searchResults.map(r => r.score);
  const confidence = calculateConfidence(scores);
  
  // Build messages array with conversation history
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];
  
  // Add conversation history (limit to last 20 messages to stay within token limits)
  const recentHistory = conversationHistory.slice(-20);
  for (const msg of recentHistory) {
    messages.push({ role: msg.role, content: msg.content });
  }
  
  // Add current question
  messages.push({ role: 'user', content: question });
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://yieldmatch.ca',
    },
    body: JSON.stringify({
      model: config.llmModel,
      messages,
      max_tokens: 1500,
      temperature: 0.3,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  const answer = data.choices[0]?.message?.content || 'Unable to generate response.';
  
  // Extract token usage from OpenRouter response
  const promptTokens = data.usage?.prompt_tokens || estimateTokens(systemPrompt + question);
  const completionTokens = data.usage?.completion_tokens || estimateTokens(answer);
  const totalTokens = promptTokens + completionTokens;
  
  // Calculate cost (Claude 3.5 Sonnet via OpenRouter: $3/1M input, $15/1M output)
  const inputCost = (promptTokens / 1_000_000) * 3;
  const outputCost = (completionTokens / 1_000_000) * 15;
  // Add embedding cost (~$0.02/1M tokens for text-embedding-3-small)
  const embeddingTokens = estimateTokens(question);
  const embeddingCost = (embeddingTokens / 1_000_000) * 0.02;
  const estimatedCost = inputCost + outputCost + embeddingCost;
  
  const citations: Citation[] = searchResults.map(r => ({
    title: r.chunk.source_title,
    url: r.chunk.source_url,
    source_type: r.chunk.source_type,
    excerpt: r.chunk.text.slice(0, 200) + (r.chunk.text.length > 200 ? '...' : ''),
  }));
  
  return {
    answer,
    citations,
    confidence,
    disclaimer: getDisclaimer(confidence),
    usage: {
      total_tokens: totalTokens,
      estimated_cost: estimatedCost,
    },
  };
}

/**
 * Helper to send SSE event
 */
function sendSSE(res: Response, event: StreamEvent) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

/**
 * Extract a descriptive section name from chunk text
 */
function extractSectionName(text: string): string {
  const lines = text.split('\n').filter(l => l.trim());
  for (const line of lines.slice(0, 3)) {
    const cleaned = line.replace(/^#+\s*/, '').replace(/^\*+\s*/, '').trim();
    if (cleaned.length > 10 && cleaned.length < 80) {
      return cleaned;
    }
  }
  return 'relevant section';
}

/**
 * Generate a streaming response using Claude via OpenRouter with SSE
 * Sends real-time status updates and streams tokens as they arrive
 */
export async function generateResponseStream(
  res: Response,
  question: string,
  searchResults: SearchResult[],
  conversationHistory: ConversationMessage[] = [],
  profileContext?: string
): Promise<void> {
  const context = formatContextForPrompt(searchResults, question);
  let systemPrompt = TAX_SYSTEM_PROMPT.replace('{context}', context);
  
  // Inject user profile context if available
  if (profileContext) {
    systemPrompt = systemPrompt + '\n\n' + profileContext;
  }
  const scores = searchResults.map(r => r.score);
  const confidence = calculateConfidence(scores);
  
  // Build messages array with conversation history
  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: systemPrompt },
  ];
  
  const recentHistory = conversationHistory.slice(-20);
  for (const msg of recentHistory) {
    messages.push({ role: msg.role, content: msg.content });
  }
  messages.push({ role: 'user', content: question });
  
  // Send status: Formulating answer
  const topSources = Array.from(new Set(searchResults.slice(0, 3).map(r => r.chunk.source_title)));
  const sectionName = extractSectionName(searchResults[0]?.chunk.text || '');
  
  sendSSE(res, { 
    type: 'status', 
    data: { 
      step: 4, 
      message: `Reading "${sectionName.slice(0, 50)}${sectionName.length > 50 ? '...' : ''}"...`,
      sources: topSources
    } 
  });
  
  // Build citations early so we can send them
  const citations: Citation[] = searchResults.map(r => ({
    title: r.chunk.source_title,
    url: r.chunk.source_url,
    source_type: r.chunk.source_type,
    excerpt: r.chunk.text.slice(0, 200) + (r.chunk.text.length > 200 ? '...' : ''),
  }));
  
  // Send citations before streaming starts
  sendSSE(res, { type: 'citations', data: citations });
  
  // Make streaming request to OpenRouter
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://yieldmatch.ca',
    },
    body: JSON.stringify({
      model: config.llmModel,
      messages,
      max_tokens: 1500,
      temperature: 0.3,
      stream: true,
    }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('[GENERATOR] OpenRouter API error:', response.status, errorText);
    sendSSE(res, { type: 'chunk', data: { content: `I encountered an error connecting to the AI service. Please try again in a moment.` } });
    sendSSE(res, { type: 'metadata', data: { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } } });
    sendSSE(res, { type: 'done', data: {} });
    return;
  }
  
  // Send status: Generating answer
  sendSSE(res, { 
    type: 'status', 
    data: { step: 5, message: 'Generating answer...' } 
  });
  
  // Process the stream
  const reader = response.body?.getReader();
  if (!reader) {
    console.error('[GENERATOR] No response body from OpenRouter');
    sendSSE(res, { type: 'chunk', data: { content: 'I encountered an error getting a response. Please try again.' } });
    sendSSE(res, { type: 'metadata', data: { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } } });
    sendSSE(res, { type: 'done', data: {} });
    return;
  }
  
  const decoder = new TextDecoder();
  let fullAnswer = '';
  let promptTokens = 0;
  let completionTokens = 0;
  let lineBuffer = ''; // FIX #2: Buffer for partial lines across chunks
  
  try {
    while (true) {
      
      const { done, value } = await reader.read();
      if (done) break;
      
      // Decode the chunk and prepend any incomplete line from previous iteration
      const chunk = decoder.decode(value, { stream: true });
      const text = lineBuffer + chunk;
      const lines = text.split('\n');
      
      // Last element might be incomplete - save it for next iteration
      lineBuffer = lines.pop() || '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullAnswer += content;
              sendSSE(res, { type: 'chunk', data: { content } });
            }
            
            // Capture usage if available (usually in last chunk)
            if (parsed.usage) {
              promptTokens = parsed.usage.prompt_tokens || 0;
              completionTokens = parsed.usage.completion_tokens || 0;
            }
          } catch (e) {
            // Skip malformed JSON - but log for debugging
            if (data.length > 10) {
              console.warn('[GENERATOR] Skipped malformed chunk:', data.slice(0, 50));
            }
          }
        }
      }
    }
    
    // Process any remaining data in the buffer after stream ends
    if (lineBuffer.trim().startsWith('data: ')) {
      const data = lineBuffer.trim().slice(6);
      if (data !== '[DONE]') {
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            fullAnswer += content;
            sendSSE(res, { type: 'chunk', data: { content } });
          }
        } catch (e) {
          // Ignore final partial chunk
        }
      }
    }
  } catch (streamError) {
    console.error('[GENERATOR] Stream error:', streamError);
    sendSSE(res, { type: 'chunk', data: { content: '\n\n[Response was interrupted. Please try again.]' } });
    sendSSE(res, { type: 'metadata', data: { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } } });
    sendSSE(res, { type: 'done', data: {} });
    return;
  } finally {
    reader.releaseLock();
  }
  
  // Calculate final usage and cost
  if (!promptTokens) promptTokens = estimateTokens(systemPrompt + question);
  if (!completionTokens) completionTokens = estimateTokens(fullAnswer);
  const totalTokens = promptTokens + completionTokens;
  
  const inputCost = (promptTokens / 1_000_000) * 3;
  const outputCost = (completionTokens / 1_000_000) * 15;
  const embeddingTokens = estimateTokens(question);
  const embeddingCost = (embeddingTokens / 1_000_000) * 0.02;
  const estimatedCost = inputCost + outputCost + embeddingCost;
  
  // Send final metadata
  sendSSE(res, { 
    type: 'metadata', 
    data: { 
      confidence,
      disclaimer: getDisclaimer(confidence),
      usage: {
        total_tokens: totalTokens,
        estimated_cost: estimatedCost,
      }
    } 
  });
  
  // Send done signal
  sendSSE(res, { type: 'done', data: {} });
}

/**
 * Test LLM connectivity
 */
export async function testLLMConnection(): Promise<boolean> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${config.openrouterApiKey}`,
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
