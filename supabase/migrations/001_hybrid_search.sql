-- Hybrid Search Migration for Canadian Tax AI Assistant
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create the documents table if it doesn't exist
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI text-embedding-3-small dimension
  title TEXT,
  category TEXT,           -- 'folio', 'guide', 'form', 'benefit', 'gst_hst', 'quebec', 'canlii', 'structured'
  source_file TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_documents_embedding ON documents
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);

CREATE INDEX IF NOT EXISTS idx_documents_content_trgm ON documents
  USING gin (content gin_trgm_ops);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_documents_fts ON documents
  USING gin (to_tsvector('english', content));

-- ============================================================
-- HYBRID SEARCH FUNCTION
-- Combines semantic (vector) search with BM25 (keyword) search
-- using Reciprocal Rank Fusion (RRF) scoring
-- ============================================================

CREATE OR REPLACE FUNCTION hybrid_search(
  query_embedding vector(1536),
  query_text text,
  match_count int DEFAULT 10,
  category_filter text DEFAULT NULL,
  semantic_weight float DEFAULT 0.6,
  keyword_weight float DEFAULT 0.4
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  title TEXT,
  category TEXT,
  source_file TEXT,
  metadata JSONB,
  semantic_score FLOAT,
  keyword_score FLOAT,
  combined_score FLOAT
)
LANGUAGE plpgsql
AS $$
DECLARE
  k CONSTANT INT := 60;  -- RRF constant
BEGIN
  RETURN QUERY
  WITH semantic_results AS (
    -- Vector similarity search
    SELECT
      d.id,
      d.content,
      d.title,
      d.category,
      d.source_file,
      d.metadata,
      1 - (d.embedding <=> query_embedding) AS similarity,
      ROW_NUMBER() OVER (ORDER BY d.embedding <=> query_embedding) AS rank
    FROM documents d
    WHERE
      d.embedding IS NOT NULL
      AND (category_filter IS NULL OR d.category = category_filter)
    ORDER BY d.embedding <=> query_embedding
    LIMIT match_count * 3
  ),
  keyword_results AS (
    -- BM25-style full-text search
    SELECT
      d.id,
      d.content,
      d.title,
      d.category,
      d.source_file,
      d.metadata,
      ts_rank_cd(to_tsvector('english', d.content), plainto_tsquery('english', query_text)) AS rank_score,
      ROW_NUMBER() OVER (
        ORDER BY ts_rank_cd(to_tsvector('english', d.content), plainto_tsquery('english', query_text)) DESC
      ) AS rank
    FROM documents d
    WHERE
      to_tsvector('english', d.content) @@ plainto_tsquery('english', query_text)
      AND (category_filter IS NULL OR d.category = category_filter)
    ORDER BY rank_score DESC
    LIMIT match_count * 3
  ),
  combined AS (
    -- Combine using Reciprocal Rank Fusion
    SELECT
      COALESCE(s.id, kw.id) AS id,
      COALESCE(s.content, kw.content) AS content,
      COALESCE(s.title, kw.title) AS title,
      COALESCE(s.category, kw.category) AS category,
      COALESCE(s.source_file, kw.source_file) AS source_file,
      COALESCE(s.metadata, kw.metadata) AS metadata,
      COALESCE(s.similarity, 0)::FLOAT AS semantic_score,
      COALESCE(kw.rank_score, 0)::FLOAT AS keyword_score,
      -- RRF formula: score = sum(1 / (k + rank))
      (
        COALESCE(semantic_weight / (k + COALESCE(s.rank, 1000)), 0) +
        COALESCE(keyword_weight / (k + COALESCE(kw.rank, 1000)), 0)
      )::FLOAT AS combined_score
    FROM semantic_results s
    FULL OUTER JOIN keyword_results kw ON s.id = kw.id
  )
  SELECT
    c.id,
    c.content,
    c.title,
    c.category,
    c.source_file,
    c.metadata,
    c.semantic_score,
    c.keyword_score,
    c.combined_score
  FROM combined c
  ORDER BY c.combined_score DESC
  LIMIT match_count;
END;
$$;

-- ============================================================
-- SEMANTIC SEARCH FUNCTION (Vector-only search)
-- ============================================================

CREATE OR REPLACE FUNCTION semantic_search(
  query_embedding vector(1536),
  match_count int DEFAULT 10,
  category_filter text DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  title TEXT,
  category TEXT,
  source_file TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.content,
    d.title,
    d.category,
    d.source_file,
    d.metadata,
    (1 - (d.embedding <=> query_embedding))::FLOAT AS similarity
  FROM documents d
  WHERE
    d.embedding IS NOT NULL
    AND (category_filter IS NULL OR d.category = category_filter)
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ============================================================
-- KEYWORD SEARCH FUNCTION (Full-text only)
-- ============================================================

CREATE OR REPLACE FUNCTION keyword_search(
  query_text text,
  match_count int DEFAULT 10,
  category_filter text DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  title TEXT,
  category TEXT,
  source_file TEXT,
  metadata JSONB,
  rank_score FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.content,
    d.title,
    d.category,
    d.source_file,
    d.metadata,
    ts_rank_cd(to_tsvector('english', d.content), plainto_tsquery('english', query_text))::FLOAT AS rank_score
  FROM documents d
  WHERE
    to_tsvector('english', d.content) @@ plainto_tsquery('english', query_text)
    AND (category_filter IS NULL OR d.category = category_filter)
  ORDER BY rank_score DESC
  LIMIT match_count;
END;
$$;

-- ============================================================
-- HELPER: Update timestamp trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- GRANT PERMISSIONS (for anon and authenticated roles)
-- ============================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON documents TO anon, authenticated;
GRANT EXECUTE ON FUNCTION hybrid_search TO anon, authenticated;
GRANT EXECUTE ON FUNCTION semantic_search TO anon, authenticated;
GRANT EXECUTE ON FUNCTION keyword_search TO anon, authenticated;

-- ============================================================
-- COMMENTS
-- ============================================================

COMMENT ON FUNCTION hybrid_search IS 'Combines vector similarity and BM25 full-text search using RRF scoring';
COMMENT ON FUNCTION semantic_search IS 'Pure vector similarity search using cosine distance';
COMMENT ON FUNCTION keyword_search IS 'Pure BM25-style full-text search';
COMMENT ON TABLE documents IS 'Stores chunked tax documents with embeddings for RAG retrieval';
