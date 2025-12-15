import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../utils/config';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export interface Chunk {
  id: number;
  document_id: number;
  text: string;
  source_type: string;
  source_title: string;
  source_url: string;
  metadata: Record<string, any>;
}

export interface ChunkWithEmbedding extends Chunk {
  embedding: number[];
}

export interface SearchResult {
  chunk: Chunk;
  score: number;
}

/**
 * Search for similar chunks using cosine similarity via Supabase
 */
export async function searchSimilar(
  embedding: number[],
  topK: number = config.topK,
  sourceTypes?: string[]
): Promise<SearchResult[]> {
  try {
    // Use the semantic_search RPC function
    const { data, error } = await supabase.rpc('semantic_search', {
      query_embedding: embedding,
      match_count: topK,
      category_filter: sourceTypes?.[0] || null, // Map source_type to category
    });

    if (error) {
      console.error('Supabase semantic search error:', error);
      throw error;
    }

    return (data || []).map((row: any, idx: number) => ({
      chunk: {
        id: idx,
        document_id: 0,
        text: row.content,
        source_type: row.category || 'unknown',
        source_title: row.title || row.source_file || '',
        source_url: row.source_url || '',
        metadata: {
          chunk_id: row.id,
          source_file: row.source_file,
          chunk_index: row.chunk_index,
          category: row.category,
          ...row.metadata,
        },
      },
      score: row.similarity || 0,
    }));
  } catch (error) {
    console.error('searchSimilar error:', error);
    return [];
  }
}

/**
 * Get total chunk count from Supabase documents table
 */
export async function getChunkCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('getChunkCount error:', error);
    return 0;
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('id')
      .limit(1);

    return !error;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Hybrid search combining semantic (vector) and BM25 (keyword) search
 * Uses Reciprocal Rank Fusion (RRF) to combine results via Supabase RPC
 */
export async function searchHybrid(
  queryText: string,
  embedding: number[],
  topK: number = config.topK,
  semanticWeight: number = 0.7,
  bm25Weight: number = 0.3
): Promise<SearchResult[]> {
  try {
    const { data, error } = await supabase.rpc('hybrid_search', {
      query_embedding: embedding,
      query_text: queryText,
      match_count: topK,
      category_filter: null, // Can be set to filter by category
      semantic_weight: semanticWeight,
      keyword_weight: bm25Weight,
    });

    if (error) {
      console.error('Supabase hybrid search error:', error);
      throw error;
    }

    return (data || []).map((row: any, idx: number) => {
      // Extract source_type from category or source_file
      const sourceType = row.category || 
        row.source_file?.split('_')[0]?.toLowerCase() || 
        'unknown';

      // Build a readable title
      let sourceTitle = row.title || '';
      if (!sourceTitle && row.source_file) {
        // Convert source_file to readable title
        const docType = row.source_file.split('.')[0]?.toUpperCase() || '';
        if (docType.match(/^(RC|T\d|IT|IC|S\d)/i)) {
          sourceTitle = `${docType} - CRA Publication`;
        } else {
          sourceTitle = row.source_file.replace(/_/g, ' ').replace(/\.(txt|html|json)$/i, '');
        }
      }

      // Normalize combined_score to 0-1 range for display
      const normalizedScore = Math.min(1, row.combined_score || 0);

      return {
        chunk: {
          id: idx,
          document_id: 0,
          text: row.content,
          source_type: sourceType,
          source_title: sourceTitle,
          source_url: row.source_url || '',
          metadata: {
            chunk_id: row.id,
            source_file: row.source_file,
            chunk_index: row.chunk_index,
            category: row.category,
            semantic_score: row.semantic_score,
            keyword_score: row.keyword_score,
            combined_score: row.combined_score,
            ...row.metadata,
          },
        },
        score: normalizedScore,
      };
    });
  } catch (error) {
    console.error('searchHybrid error:', error);
    return [];
  }
}

/**
 * Get chunk count (alias for consistency with v2 naming)
 */
export async function getChunkCountV2(): Promise<number> {
  return getChunkCount();
}

/**
 * Export the Supabase client for use in other modules if needed
 */
export { supabase };
