/**
 * Query Cache Service
 * ===================
 * Caches embeddings and responses in Supabase to reduce API costs.
 * 
 * Cache Strategy:
 * - Embeddings: Always cached (7 day TTL)
 * - Responses: Only cached for non-personalized queries
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Lazy-initialize Supabase client to avoid build-time errors
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export interface CacheEntry {
  embedding: number[] | null;
  cachedResponse: string | null;
  responseMetadata: Record<string, any>;
}

export interface CacheStats {
  totalEntries: number;
  totalHits: number;
  avgHitsPerEntry: number;
  oldestEntry: Date | null;
  entriesExpiringSoon: number;
}

/**
 * Normalize query for consistent hashing
 * - Lowercase
 * - Remove extra whitespace
 * - Remove punctuation variations
 */
function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/\?+$/, '?');  // Normalize trailing question marks
}

/**
 * Generate SHA-256 hash of normalized query
 */
function hashQuery(query: string): string {
  const normalized = normalizeQuery(query);
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Check if we have a cached embedding for this query
 */
export async function getCachedEmbedding(query: string): Promise<CacheEntry | null> {
  try {
    const queryHash = hashQuery(query);
    
    const { data, error } = await getSupabase().rpc('get_cached_embedding', {
      p_query_hash: queryHash,
    });

    if (error) {
      console.error('Cache lookup error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;  // Cache miss
    }

    const row = data[0];
    return {
      embedding: row.embedding,
      cachedResponse: row.cached_response,
      responseMetadata: row.response_metadata || {},
    };
  } catch (error) {
    console.error('getCachedEmbedding error:', error);
    return null;
  }
}

/**
 * Store embedding in cache
 */
export async function cacheEmbedding(
  query: string,
  embedding: number[],
  options: {
    cachedResponse?: string;
    responseMetadata?: Record<string, any>;
    isPersonalized?: boolean;
    ttlDays?: number;
  } = {}
): Promise<boolean> {
  try {
    const queryHash = hashQuery(query);
    const {
      cachedResponse = null,
      responseMetadata = {},
      isPersonalized = false,
      ttlDays = 7,
    } = options;

    const { error } = await getSupabase().rpc('set_cache_entry', {
      p_query_hash: queryHash,
      p_query_text: query,
      p_embedding: embedding,
      p_cached_response: cachedResponse,
      p_response_metadata: responseMetadata,
      p_is_personalized: isPersonalized,
      p_ttl_days: ttlDays,
    });

    if (error) {
      console.error('Cache write error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('cacheEmbedding error:', error);
    return false;
  }
}

/**
 * Update cached response (after generating a new response)
 */
export async function updateCachedResponse(
  query: string,
  response: string,
  metadata: Record<string, any> = {}
): Promise<boolean> {
  try {
    const queryHash = hashQuery(query);

    const { error } = await getSupabase()
      .from('query_cache')
      .update({
        cached_response: response,
        response_metadata: metadata,
      })
      .eq('query_hash', queryHash);

    if (error) {
      console.error('Cache response update error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('updateCachedResponse error:', error);
    return false;
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<CacheStats | null> {
  try {
    const { data, error } = await getSupabase().rpc('get_cache_stats');

    if (error) {
      console.error('Cache stats error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return {
        totalEntries: 0,
        totalHits: 0,
        avgHitsPerEntry: 0,
        oldestEntry: null,
        entriesExpiringSoon: 0,
      };
    }

    const row = data[0];
    return {
      totalEntries: row.total_entries || 0,
      totalHits: row.total_hits || 0,
      avgHitsPerEntry: parseFloat(row.avg_hits_per_entry) || 0,
      oldestEntry: row.oldest_entry ? new Date(row.oldest_entry) : null,
      entriesExpiringSoon: row.entries_expiring_soon || 0,
    };
  } catch (error) {
    console.error('getCacheStats error:', error);
    return null;
  }
}

/**
 * Clean up expired cache entries
 */
export async function cleanupExpiredCache(): Promise<number> {
  try {
    const { data, error } = await getSupabase().rpc('cleanup_expired_cache');

    if (error) {
      console.error('Cache cleanup error:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('cleanupExpiredCache error:', error);
    return 0;
  }
}

/**
 * Invalidate a specific cache entry
 */
export async function invalidateCache(query: string): Promise<boolean> {
  try {
    const queryHash = hashQuery(query);

    const { error } = await getSupabase()
      .from('query_cache')
      .delete()
      .eq('query_hash', queryHash);

    if (error) {
      console.error('Cache invalidation error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('invalidateCache error:', error);
    return false;
  }
}

/**
 * Clear all cache (use with caution)
 */
export async function clearAllCache(): Promise<boolean> {
  try {
    const { error } = await getSupabase()
      .from('query_cache')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      console.error('Cache clear error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('clearAllCache error:', error);
    return false;
  }
}
