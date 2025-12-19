-- Migration: Create user_documents table for storing uploaded tax documents
-- Run this in your Supabase SQL editor

-- Create the user_documents table
CREATE TABLE IF NOT EXISTS user_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- File info
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'pdf', 'image/jpeg', 'image/png', etc.
  file_size INTEGER NOT NULL, -- in bytes
  storage_path TEXT NOT NULL, -- path in Supabase storage

  -- Document metadata (extracted by AI)
  document_type TEXT, -- 'T4', 'T5', 'T4A', 'NOA', 'receipt', 'other'
  tax_year INTEGER, -- e.g., 2024
  issuer_name TEXT, -- e.g., "ABC Corporation" for T4

  -- Extracted data (JSON for flexibility)
  extracted_data JSONB DEFAULT '{}',

  -- AI processing
  ai_summary TEXT, -- Brief summary of the document
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  processing_error TEXT,

  -- User confirmation
  user_confirmed BOOLEAN DEFAULT FALSE, -- User confirmed AI extraction is correct

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes for common queries
  CONSTRAINT valid_file_size CHECK (file_size > 0 AND file_size <= 10485760) -- Max 10MB
);

-- Create indexes
CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX idx_user_documents_tax_year ON user_documents(tax_year);
CREATE INDEX idx_user_documents_document_type ON user_documents(document_type);
CREATE INDEX idx_user_documents_created_at ON user_documents(created_at DESC);

-- Enable RLS
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own documents
CREATE POLICY "Users can view own documents"
  ON user_documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON user_documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON user_documents FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON user_documents FOR DELETE
  USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
CREATE TRIGGER trigger_user_documents_updated_at
  BEFORE UPDATE ON user_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_user_documents_updated_at();

-- Create storage bucket for documents (run in Supabase dashboard or via API)
-- Note: You'll need to create the bucket in Supabase dashboard:
-- 1. Go to Storage in Supabase dashboard
-- 2. Create new bucket called "user-documents"
-- 3. Set it to private
-- 4. Add the following RLS policies:

-- Storage RLS policies (add via Supabase dashboard):
-- SELECT: (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1])
-- INSERT: (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1])
-- DELETE: (bucket_id = 'user-documents' AND auth.uid()::text = (storage.foldername(name))[1])
