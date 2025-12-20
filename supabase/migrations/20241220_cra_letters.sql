-- CRA Letters table for storing and tracking CRA correspondence
CREATE TABLE IF NOT EXISTS cra_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- File info
  file_name TEXT NOT NULL,
  file_url TEXT,

  -- Letter analysis
  letter_type TEXT, -- e.g., 'notice_of_assessment', 'request_for_information', etc.
  severity TEXT CHECK (severity IN ('routine', 'action_required', 'urgent')),
  deadline DATE,

  -- AI-generated content
  summary TEXT,
  explanation TEXT,
  action_items JSONB DEFAULT '[]'::jsonb,
  draft_response TEXT,
  extracted_text TEXT,

  -- Tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'responded', 'resolved')),

  -- Timestamps
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Indexes
  CONSTRAINT valid_letter_type CHECK (
    letter_type IS NULL OR
    letter_type IN (
      'notice_of_assessment',
      'notice_of_reassessment',
      'request_for_information',
      'proposal_letter',
      'collections',
      'audit_letter',
      't1_adjustment',
      'gst_hst_notice',
      'benefit_notice',
      'rrsp_overcontribution',
      'unknown'
    )
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cra_letters_user_id ON cra_letters(user_id);
CREATE INDEX IF NOT EXISTS idx_cra_letters_deadline ON cra_letters(deadline) WHERE deadline IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_cra_letters_status ON cra_letters(status);

-- RLS Policies
ALTER TABLE cra_letters ENABLE ROW LEVEL SECURITY;

-- Users can only see their own letters
CREATE POLICY "Users can view own CRA letters"
  ON cra_letters FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own letters
CREATE POLICY "Users can insert own CRA letters"
  ON cra_letters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own letters
CREATE POLICY "Users can update own CRA letters"
  ON cra_letters FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own letters
CREATE POLICY "Users can delete own CRA letters"
  ON cra_letters FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for CRA letters (if not exists)
INSERT INTO storage.buckets (id, name, public)
VALUES ('cra-letters', 'cra-letters', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for CRA letters bucket
CREATE POLICY "Users can upload own CRA letters"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'cra-letters' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own CRA letters"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'cra-letters' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own CRA letters"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'cra-letters' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cra_letters_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS cra_letters_updated_at ON cra_letters;
CREATE TRIGGER cra_letters_updated_at
  BEFORE UPDATE ON cra_letters
  FOR EACH ROW
  EXECUTE FUNCTION update_cra_letters_updated_at();
