/**
 * Hybrid Retrieval Service (Supabase Version)
 * =============================================
 * Calls the hybrid_search() Supabase RPC function that combines
 * semantic (vector) and BM25 (keyword) search.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { cachedEmbedText } from './embeddings';

// Lazy-initialize Supabase client to avoid build-time errors
let supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables');
    }

    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

export interface HybridSearchResult {
  chunk_id: string;
  content: string;
  hierarchy_path: string[];
  source_doc: string;
  forms_mentioned: string[];
  tax_year: number | null;
  semantic_rank: number | null;
  bm25_rank: number | null;
  rrf_score: number;
}

export interface HybridSearchOptions {
  query: string;
  semanticWeight?: number;
  bm25Weight?: number;
  topK?: number;
  filterForms?: string[];
  filterTaxYear?: number;
  filterCategory?: string;
}

/**
 * Extract forms mentioned from content text
 */
function extractFormsMentioned(content: string): string[] {
  const formPatterns = [
    /\b(T[1-5]\d{0,3}[A-Z]?)\b/gi,  // T1, T4, T2125, T4A, etc.
    /\b(RC\d{1,4})\b/gi,             // RC66, RC4120, etc.
    /\b(NR\d{1,3})\b/gi,             // NR4, NR73, etc.
    /\b(TP-?\d{1,4}[A-Z]?)\b/gi,     // Quebec forms
  ];

  const forms = new Set<string>();
  for (const pattern of formPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach(m => forms.add(m.toUpperCase()));
    }
  }
  return Array.from(forms);
}

/**
 * Build hierarchy path from metadata
 */
function buildHierarchyPath(row: any): string[] {
  const path: string[] = [];
  
  if (row.title) {
    path.push(row.title);
  }
  
  if (row.category) {
    const categoryLabels: Record<string, string> = {
      'folio': 'Income Tax Folio',
      'guide': 'CRA Guide',
      'form': 'Tax Form',
      'benefit': 'Benefits & Credits',
      'gst_hst': 'GST/HST',
      'quebec': 'Quebec Tax',
      'canlii': 'Tax Case Law',
      'structured': 'Tax Reference Data',
    };
    path.push(categoryLabels[row.category] || row.category);
  }
  
  if (row.source_file) {
    path.push(row.source_file);
  }
  
  return path;
}

export async function hybridSearch(options: HybridSearchOptions): Promise<HybridSearchResult[]> {
  const {
    query,
    semanticWeight = 0.6,
    bm25Weight = 0.4,
    topK = 10,
    filterForms,
    filterTaxYear,
    filterCategory,
  } = options;

  // Generate embedding for the query
  const embedding = await cachedEmbedText(query);

  // Fetch more results if filtering, to ensure we get enough after filtering
  const fetchCount = (filterForms || filterTaxYear) ? topK * 3 : topK;

  // Call the hybrid_search RPC function
  // Your Supabase function signature: hybrid_search(query_text, query_embedding, match_threshold, match_count)
  const { data, error } = await getSupabase().rpc('hybrid_search', {
    query_text: query,
    query_embedding: embedding,
    match_threshold: 0.5,  // Minimum similarity threshold for vector search
    match_count: fetchCount,
  });

  if (error) {
    console.error('Supabase hybrid search error:', error);
    throw error;
  }

  let results: HybridSearchResult[] = (data || []).map((row: any) => {
    const formsMentioned = extractFormsMentioned(row.content);
    
    // Try to extract tax year from content or metadata
    let taxYear: number | null = null;
    const yearMatch = row.content.match(/\b(202[0-5]|201[0-9])\s*(tax\s*year)?/i);
    if (yearMatch) {
      taxYear = parseInt(yearMatch[1]);
    }

    return {
      chunk_id: row.id,
      content: row.content,
      hierarchy_path: buildHierarchyPath(row),
      source_doc: row.source_file || '',
      forms_mentioned: formsMentioned,
      tax_year: taxYear,
      semantic_rank: row.semantic_score ? Math.round(1 / row.semantic_score) : null,
      bm25_rank: row.keyword_score ? Math.round(1 / row.keyword_score) : null,
      rrf_score: row.combined_score || 0,
    };
  });

  // Apply form filter if specified
  if (filterForms && filterForms.length > 0) {
    const upperForms = filterForms.map(f => f.toUpperCase());
    results = results.filter(r =>
      r.forms_mentioned.some(f => upperForms.includes(f.toUpperCase())) ||
      upperForms.some(f => r.content.toUpperCase().includes(f))
    );
  }

  // Apply tax year filter if specified
  if (filterTaxYear) {
    results = results.filter(r =>
      r.tax_year === filterTaxYear || r.tax_year === null
    );
  }

  // Filter out header/metadata chunks that lack explanatory content
  results = results.filter(chunk => {
    // Skip very short chunks
    if (chunk.content.length < 100) return false;
    
    // Skip chunks that are just document structure metadata
    if (chunk.content.startsWith('[Document]')) return false;
    if (chunk.content.startsWith('Source:') && chunk.content.length < 200) return false;
    
    return true;
  });

  return results.slice(0, topK);
}

export async function semanticSearch(query: string, topK: number = 10): Promise<HybridSearchResult[]> {
  const embedding = await cachedEmbedText(query);

  // Use direct vector similarity search on the documents table
  // Order by cosine distance (embedding <=> query_embedding)
  const { data, error } = await getSupabase()
    .from('documents')
    .select('*')
    .not('embedding', 'is', null)
    .limit(topK);

  if (error) {
    console.error('Supabase semantic search error:', error);
    throw error;
  }

  // Note: For proper vector ordering, you'd need an RPC function or use match_documents
  // This is a fallback that returns documents but without proper similarity ordering
  // Consider creating a semantic_search RPC function for better results
  return (data || []).map((row: any) => ({
    chunk_id: row.id,
    content: row.content,
    hierarchy_path: buildHierarchyPath(row),
    source_doc: row.source_file || '',
    forms_mentioned: extractFormsMentioned(row.content),
    tax_year: null,
    semantic_rank: null,
    bm25_rank: null,
    rrf_score: 0,
  }));
}

export async function searchByForm(formNumber: string, topK: number = 10): Promise<HybridSearchResult[]> {
  // Use hybrid search with the form number as the query
  // This will leverage both semantic and keyword matching
  return hybridSearch({
    query: `${formNumber} tax form CRA`,
    topK,
    filterForms: [formNumber],
  });
}

export async function isHybridSearchAvailable(): Promise<boolean> {
  try {
    // Check if the documents table exists and has data
    const { count, error } = await getSupabase()
      .from('documents')
      .select('*', { count: 'exact', head: true });

    if (error) return false;
    return (count || 0) > 0;
  } catch {
    return false;
  }
}

/**
 * Search by category (e.g., 'folio', 'guide', 'form', 'quebec')
 */
export async function searchByCategory(
  query: string,
  category: string,
  topK: number = 10
): Promise<HybridSearchResult[]> {
  return hybridSearch({
    query,
    topK,
    filterCategory: category,
  });
}

export { supabase };
