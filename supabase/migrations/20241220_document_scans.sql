-- Document Scans table for storing AI-analyzed tax documents
CREATE TABLE IF NOT EXISTS document_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- File info
  file_name TEXT NOT NULL,
  file_url TEXT,
  file_type TEXT, -- mime type

  -- Document classification
  document_type TEXT NOT NULL, -- e.g., 'T4', 'T5', 'pay_stub', 'receipt', etc.
  document_name TEXT, -- Human-readable name like "T4 - Statement of Remuneration Paid"
  category TEXT, -- e.g., 'employment', 'investment', 'medical', etc.

  -- AI-generated analysis
  key_amounts JSONB DEFAULT '{}'::jsonb, -- Key financial amounts extracted
  analysis JSONB DEFAULT '{}'::jsonb, -- Full analysis with summary, tips, etc.
  extracted_text TEXT, -- Raw text extracted from document

  -- Tax year (if detected)
  tax_year INTEGER,

  -- Timestamps
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_document_scans_user_id ON document_scans(user_id);
CREATE INDEX IF NOT EXISTS idx_document_scans_document_type ON document_scans(document_type);
CREATE INDEX IF NOT EXISTS idx_document_scans_category ON document_scans(category);
CREATE INDEX IF NOT EXISTS idx_document_scans_tax_year ON document_scans(tax_year) WHERE tax_year IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_document_scans_scanned_at ON document_scans(scanned_at DESC);

-- RLS Policies
ALTER TABLE document_scans ENABLE ROW LEVEL SECURITY;

-- Users can only see their own scans
CREATE POLICY "Users can view own document scans"
  ON document_scans FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own scans
CREATE POLICY "Users can insert own document scans"
  ON document_scans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own scans
CREATE POLICY "Users can update own document scans"
  ON document_scans FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own scans
CREATE POLICY "Users can delete own document scans"
  ON document_scans FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for document scans (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('document-scans', 'document-scans', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for document-scans bucket
CREATE POLICY "Users can upload own document scans"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'document-scans' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own document scans"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'document-scans' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own document scans"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'document-scans' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_document_scans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS document_scans_updated_at ON document_scans;
CREATE TRIGGER document_scans_updated_at
  BEFORE UPDATE ON document_scans
  FOR EACH ROW
  EXECUTE FUNCTION update_document_scans_updated_at();
