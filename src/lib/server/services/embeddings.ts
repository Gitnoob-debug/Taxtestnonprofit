import OpenAI from 'openai';
import { config } from '../config';
import { getCachedEmbedding, cacheEmbedding } from './queryCache';

const openai = new OpenAI({ apiKey: config.openaiApiKey });

// Track cache performance
let cacheHits = 0;
let cacheMisses = 0;

/**
 * Embed a single text string into a vector (no caching)
 */
export async function embedText(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: config.embeddingModel,
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Cached version of embedText
 * Checks Supabase cache first, falls back to OpenAI if miss
 */
export async function cachedEmbedText(text: string): Promise<number[]> {
  // Try to get from cache first
  const cached = await getCachedEmbedding(text);
  
  if (cached?.embedding) {
    cacheHits++;
    console.log(`[Cache HIT] Query: "${text.slice(0, 50)}..." (hits: ${cacheHits}, misses: ${cacheMisses})`);
    return cached.embedding;
  }
  
  // Cache miss - generate new embedding
  cacheMisses++;
  console.log(`[Cache MISS] Query: "${text.slice(0, 50)}..." (hits: ${cacheHits}, misses: ${cacheMisses})`);
  
  const embedding = await embedText(text);
  
  // Store in cache (fire and forget - don't await)
  cacheEmbedding(text, embedding).catch(err => {
    console.error('Failed to cache embedding:', err);
  });
  
  return embedding;
}

/**
 * Get cache performance stats
 */
export function getEmbeddingCacheStats() {
  const total = cacheHits + cacheMisses;
  return {
    hits: cacheHits,
    misses: cacheMisses,
    total,
    hitRate: total > 0 ? (cacheHits / total * 100).toFixed(1) + '%' : 'N/A',
  };
}

/**
 * Embed multiple texts in batches (more efficient for ingestion)
 */
export async function embedBatch(texts: string[]): Promise<number[][]> {
  const batchSize = 100;
  const embeddings: number[][] = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    
    console.log(`Embedding batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(texts.length / batchSize)}`);
    
    const response = await openai.embeddings.create({
      model: config.embeddingModel,
      input: batch,
    });
    
    embeddings.push(...response.data.map(d => d.embedding));
    
    // Rate limiting pause between batches
    if (i + batchSize < texts.length) {
      await new Promise(r => setTimeout(r, 250));
    }
  }
  
  return embeddings;
}
