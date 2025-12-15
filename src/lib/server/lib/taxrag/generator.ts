/**
 * Tax RAG Generator - Updated with Profile-First Personalization
 */

import { 
  UserProfile, 
  enrichQueryWithProfile, 
  calculateProfileRelevance,
  generateProfileContext 
} from './profileUtils';

import { 
  calculateConfidence, 
  ConfidenceResult,
  SearchResult,
  formatConfidenceDisplay 
} from './confidenceScoring';

import { 
  buildSystemPrompt, 
  buildFallbackPrompt 
} from './promptBuilder';

export interface GeneratorConfig {
  openRouterApiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratorInput {
  query: string;
  profile: UserProfile | null;
  conversationHistory?: ConversationMessage[];
  searchResults: SearchResult[];
}

export interface GeneratorOutput {
  answer: string;
  confidence: ConfidenceResult;
  sourcesUsed: string[];
  enrichedQuery: string;
  tokenCount?: number;
  cost?: number;
}

export class TaxRAGGenerator {
  private config: GeneratorConfig;
  
  constructor(config: GeneratorConfig) {
    this.config = {
      model: 'anthropic/claude-sonnet-4',
      maxTokens: 2048,
      temperature: 0.3,
      ...config
    };
  }
  
  async generate(input: GeneratorInput): Promise<GeneratorOutput> {
    const { query, profile, conversationHistory = [], searchResults } = input;
    
    const enrichedQuery = profile 
      ? enrichQueryWithProfile(query, profile) 
      : query;
    
    const confidence = calculateConfidence(searchResults, query, profile);
    
    console.log(`[TaxRAG Generator] ${formatConfidenceDisplay(confidence)}`);
    
    const retrievedContext = this.formatRetrievedContext(searchResults, confidence);
    
    const systemPrompt = buildSystemPrompt({
      profile,
      retrievedContext,
      confidence,
      query
    });
    
    const messages = this.buildMessages(systemPrompt, query, conversationHistory);
    
    const response = await this.callLLM(messages);
    
    const sourcesUsed = this.extractSourcesUsed(searchResults);
    
    return {
      answer: response.content,
      confidence,
      sourcesUsed,
      enrichedQuery,
      tokenCount: response.tokenCount,
      cost: response.cost
    };
  }
  
  private formatRetrievedContext(
    results: SearchResult[], 
    confidence: ConfidenceResult
  ): string {
    if (!results || results.length === 0) {
      return '';
    }
    
    const threshold = confidence.level === 'high' ? 0.45 : 0.35;
    const relevantResults = results.filter(r => r.score > threshold);
    
    if (relevantResults.length === 0) {
      return '';
    }
    
    return relevantResults
      .map((r, i) => {
        const source = r.metadata?.source || r.metadata?.source_title || 'CRA Source';
        const section = r.metadata?.section || '';
        const header = section ? `[${source} - ${section}]` : `[${source}]`;
        return `${header}\n${r.content}`;
      })
      .join('\n\n---\n\n');
  }
  
  private buildMessages(
    systemPrompt: string,
    query: string,
    history: ConversationMessage[]
  ): Array<{ role: string; content: string }> {
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt }
    ];
    
    const recentHistory = history.slice(-8);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    }
    
    messages.push({
      role: 'user',
      content: query
    });
    
    return messages;
  }
  
  private async callLLM(
    messages: Array<{ role: string; content: string }>
  ): Promise<{ content: string; tokenCount?: number; cost?: number }> {
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.openRouterApiKey}`,
        'HTTP-Referer': 'https://yieldmatch.ca',
        'X-Title': 'YieldMatch Tax Assistant'
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`LLM call failed: ${response.status} - ${error}`);
    }
    
    const data = await response.json();
    
    const promptTokens = data.usage?.prompt_tokens || 0;
    const completionTokens = data.usage?.completion_tokens || 0;
    const totalTokens = promptTokens + completionTokens;
    
    const inputCost = (promptTokens / 1_000_000) * 3;
    const outputCost = (completionTokens / 1_000_000) * 15;
    
    return {
      content: data.choices[0]?.message?.content || '',
      tokenCount: totalTokens,
      cost: inputCost + outputCost
    };
  }
  
  private extractSourcesUsed(results: SearchResult[]): string[] {
    const sources = new Set<string>();
    
    for (const result of results) {
      if (result.metadata?.source) {
        sources.add(result.metadata.source);
      } else if (result.metadata?.source_title) {
        sources.add(result.metadata.source_title);
      }
    }
    
    return Array.from(sources);
  }
  
  async generateStream(
    input: GeneratorInput,
    sendSSE: (type: string, data: any) => void
  ): Promise<void> {
    const { query, profile, conversationHistory = [], searchResults } = input;
    
    const confidence = calculateConfidence(searchResults, query, profile);
    
    console.log(`[TaxRAG Generator] ${formatConfidenceDisplay(confidence)}`);
    
    const retrievedContext = this.formatRetrievedContext(searchResults, confidence);
    
    const systemPrompt = buildSystemPrompt({
      profile,
      retrievedContext,
      confidence,
      query
    });
    
    const messages = this.buildMessages(systemPrompt, query, conversationHistory);
    
    const topSources = this.extractSourcesUsed(searchResults);
    const sectionName = this.extractSectionName(searchResults[0]?.content || '');
    
    sendSSE('status', { 
      step: 4, 
      message: `Reading "${sectionName.slice(0, 50)}${sectionName.length > 50 ? '...' : ''}"...`,
      sources: topSources.slice(0, 3)
    });
    
    const citations = searchResults.map(r => ({
      title: r.metadata?.source_title || r.metadata?.source || 'CRA Source',
      url: r.metadata?.source_url || '',
      source_type: r.metadata?.source_type || 'document',
      excerpt: r.content.slice(0, 200) + (r.content.length > 200 ? '...' : ''),
    }));
    
    sendSSE('citations', citations);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.openRouterApiKey}`,
        'HTTP-Referer': 'https://yieldmatch.ca',
        'X-Title': 'YieldMatch Tax Assistant'
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        stream: true
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('[TaxRAG Generator] OpenRouter API error:', response.status, error);
      sendSSE('chunk', { content: 'I encountered an error connecting to the AI service. Please try again in a moment.' });
      sendSSE('metadata', { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } });
      sendSSE('done', {});
      return;
    }
    
    sendSSE('status', { step: 5, message: 'Generating personalized answer...' });
    
    const reader = response.body?.getReader();
    if (!reader) {
      console.error('[TaxRAG Generator] No response body from OpenRouter');
      sendSSE('chunk', { content: 'I encountered an error getting a response. Please try again.' });
      sendSSE('metadata', { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } });
      sendSSE('done', {});
      return;
    }
    
    const decoder = new TextDecoder();
    let fullAnswer = '';
    let promptTokens = 0;
    let completionTokens = 0;
    let lineBuffer = '';
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const text = lineBuffer + chunk;
        const lines = text.split('\n');
        
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
                sendSSE('chunk', { content });
              }
              
              if (parsed.usage) {
                promptTokens = parsed.usage.prompt_tokens || 0;
                completionTokens = parsed.usage.completion_tokens || 0;
              }
            } catch (e) {
              if (data.length > 10) {
                console.warn('[TaxRAG Generator] Skipped malformed chunk:', data.slice(0, 50));
              }
            }
          }
        }
      }
      
      if (lineBuffer.trim().startsWith('data: ')) {
        const data = lineBuffer.trim().slice(6);
        if (data !== '[DONE]') {
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullAnswer += content;
              sendSSE('chunk', { content });
            }
          } catch (e) {}
        }
      }
    } catch (streamError) {
      console.error('[TaxRAG Generator] Stream error:', streamError);
      sendSSE('chunk', { content: '\n\n[Response was interrupted. Please try again.]' });
      sendSSE('metadata', { confidence: 'low', disclaimer: 'Error occurred during generation.', usage: { total_tokens: 0, estimated_cost: 0 } });
      sendSSE('done', {});
      return;
    } finally {
      reader.releaseLock();
    }
    
    if (!promptTokens) promptTokens = Math.ceil((systemPrompt.length + query.length) / 4);
    if (!completionTokens) completionTokens = Math.ceil(fullAnswer.length / 4);
    const totalTokens = promptTokens + completionTokens;
    
    const inputCost = (promptTokens / 1_000_000) * 3;
    const outputCost = (completionTokens / 1_000_000) * 15;
    const embeddingCost = (Math.ceil(query.length / 4) / 1_000_000) * 0.02;
    const estimatedCost = inputCost + outputCost + embeddingCost;
    
    const disclaimer = this.getDisclaimer(confidence.level);
    
    sendSSE('metadata', { 
      confidence: confidence.level,
      disclaimer,
      usage: {
        total_tokens: totalTokens,
        estimated_cost: estimatedCost,
      }
    });
    
    sendSSE('done', {});
  }
  
  private extractSectionName(text: string): string {
    const lines = text.split('\n').filter(l => l.trim());
    for (const line of lines.slice(0, 3)) {
      const cleaned = line.replace(/^#+\s*/, '').replace(/^\*+\s*/, '').trim();
      if (cleaned.length > 10 && cleaned.length < 80) {
        return cleaned;
      }
    }
    return 'relevant section';
  }
  
  private getDisclaimer(confidence: 'high' | 'medium' | 'low'): string {
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
}

export function enrichQueryForSearch(query: string, profile: UserProfile | null): string {
  if (!profile) return query;
  return enrichQueryWithProfile(query, profile);
}

export function preflightCheck(
  searchResults: SearchResult[],
  query: string,
  profile: UserProfile | null
): { canProceed: boolean; earlyResponse?: string } {
  
  const hasAnyResults = searchResults.length > 0;
  const hasProfile = profile && Object.keys(profile).length > 0;
  const profileRelevance = profile ? calculateProfileRelevance(query, profile) : 0;
  
  if (!hasAnyResults && !hasProfile) {
    return {
      canProceed: false,
      earlyResponse: `I don't have specific information about "${query}" in my tax document database, and I don't have your profile information to personalize guidance. 

For accurate information, please:
- Visit canada.ca/taxes
- Call CRA at 1-800-959-8281
- Or set up your profile so I can provide personalized guidance`
    };
  }
  
  if (!hasAnyResults && hasProfile && profileRelevance > 0.3) {
    return { canProceed: true };
  }
  
  return { canProceed: true };
}
