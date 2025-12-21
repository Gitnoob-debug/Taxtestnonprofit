-- ============================================
-- SUPABASE MIGRATION: Tax Time Machine Feature
-- ============================================
-- Run this in: Supabase Dashboard > SQL Editor
--
-- This creates tables for:
-- - Analysis sessions
-- - Individual findings
-- - Past-year profile data
-- ============================================

-- Store analysis sessions
CREATE TABLE IF NOT EXISTS time_machine_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tax_years INTEGER[] NOT NULL,           -- Years analyzed [2020, 2021, 2022]
  total_potential_recovery_min DECIMAL(10, 2),
  total_potential_recovery_max DECIMAL(10, 2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'complete', 'error')),
  findings_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store individual findings
CREATE TABLE IF NOT EXISTS time_machine_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES time_machine_analyses(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tax_year INTEGER NOT NULL,
  finding_type TEXT NOT NULL CHECK (finding_type IN (
    'home_office', 'medical_expenses', 'rrsp_room', 'childcare',
    'moving_expenses', 'tuition_credits', 'charitable_donations',
    'union_dues', 'employment_expenses', 'student_loan_interest',
    'disability_tax_credit', 'caregiver_credit', 'foreign_tax_credit',
    'climate_action_incentive', 'canada_workers_benefit', 'other'
  )),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  potential_recovery_min DECIMAL(10, 2) NOT NULL,
  potential_recovery_max DECIMAL(10, 2) NOT NULL,
  confidence TEXT NOT NULL CHECK (confidence IN ('high', 'medium', 'low')),
  priority TEXT NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
  evidence JSONB DEFAULT '{}',            -- Supporting data from documents
  requirements TEXT[],                    -- What user needs to file amendment
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'dismissed', 'filed', 'approved', 'rejected')),
  amendment_filed_at TIMESTAMPTZ,
  amendment_result JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Store past-year profile data
CREATE TABLE IF NOT EXISTS time_machine_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tax_year INTEGER NOT NULL,
  worked_from_home BOOLEAN,
  work_from_home_days INTEGER,
  had_medical_expenses BOOLEAN,
  medical_expense_amount DECIMAL(10, 2),
  made_donations BOOLEAN,
  donation_amount DECIMAL(10, 2),
  had_childcare BOOLEAN,
  childcare_amount DECIMAL(10, 2),
  was_student BOOLEAN,
  had_student_loans BOOLEAN,
  student_loan_interest DECIMAL(10, 2),
  moved_for_work BOOLEAN,
  moving_distance_km INTEGER,
  had_disability BOOLEAN,
  cared_for_dependent BOOLEAN,
  dependent_disability BOOLEAN,
  employment_status TEXT,                -- 'employed', 'self-employed', 'both', 'not-working'
  had_employment_expenses BOOLEAN,
  had_union_dues BOOLEAN,
  province TEXT,
  net_income DECIMAL(12, 2),             -- From NOA
  taxable_income DECIMAL(12, 2),         -- From NOA
  total_tax_paid DECIMAL(12, 2),         -- From NOA
  rrsp_limit DECIMAL(12, 2),             -- From NOA - indicates unused room
  rrsp_contributed DECIMAL(12, 2),       -- From NOA
  refund_or_owing DECIMAL(12, 2),        -- From NOA (positive = refund)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tax_year)
);

-- Store NOA extracted data per year
CREATE TABLE IF NOT EXISTS time_machine_noa_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tax_year INTEGER NOT NULL,
  document_id UUID REFERENCES user_documents(id) ON DELETE SET NULL,
  -- Key NOA fields
  net_income DECIMAL(12, 2),
  taxable_income DECIMAL(12, 2),
  total_income_tax_deducted DECIMAL(12, 2),
  federal_tax DECIMAL(12, 2),
  provincial_tax DECIMAL(12, 2),
  cpp_contributions DECIMAL(12, 2),
  ei_premiums DECIMAL(12, 2),
  rrsp_deduction_limit DECIMAL(12, 2),
  unused_rrsp_contributions DECIMAL(12, 2),
  rrsp_contributions_available DECIMAL(12, 2),
  refund_or_balance_owing DECIMAL(12, 2),
  -- Line-specific data for analysis
  line_data JSONB DEFAULT '{}',          -- e.g., {"line_22900": 0, "line_30400": 500}
  -- CRA adjustments
  cra_adjustments JSONB DEFAULT '{}',
  -- Extraction metadata
  extraction_confidence TEXT CHECK (extraction_confidence IN ('high', 'medium', 'low')),
  raw_extracted_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, tax_year)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tm_analyses_user ON time_machine_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_tm_analyses_status ON time_machine_analyses(status);
CREATE INDEX IF NOT EXISTS idx_tm_findings_analysis ON time_machine_findings(analysis_id);
CREATE INDEX IF NOT EXISTS idx_tm_findings_user ON time_machine_findings(user_id);
CREATE INDEX IF NOT EXISTS idx_tm_findings_year ON time_machine_findings(tax_year);
CREATE INDEX IF NOT EXISTS idx_tm_findings_type ON time_machine_findings(finding_type);
CREATE INDEX IF NOT EXISTS idx_tm_findings_status ON time_machine_findings(status);
CREATE INDEX IF NOT EXISTS idx_tm_profiles_user ON time_machine_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_tm_profiles_year ON time_machine_profiles(tax_year);
CREATE INDEX IF NOT EXISTS idx_tm_noa_user ON time_machine_noa_data(user_id);
CREATE INDEX IF NOT EXISTS idx_tm_noa_year ON time_machine_noa_data(tax_year);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_time_machine_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS tm_analyses_updated_at ON time_machine_analyses;
CREATE TRIGGER tm_analyses_updated_at
  BEFORE UPDATE ON time_machine_analyses
  FOR EACH ROW
  EXECUTE FUNCTION update_time_machine_timestamp();

DROP TRIGGER IF EXISTS tm_findings_updated_at ON time_machine_findings;
CREATE TRIGGER tm_findings_updated_at
  BEFORE UPDATE ON time_machine_findings
  FOR EACH ROW
  EXECUTE FUNCTION update_time_machine_timestamp();

DROP TRIGGER IF EXISTS tm_profiles_updated_at ON time_machine_profiles;
CREATE TRIGGER tm_profiles_updated_at
  BEFORE UPDATE ON time_machine_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_time_machine_timestamp();

DROP TRIGGER IF EXISTS tm_noa_updated_at ON time_machine_noa_data;
CREATE TRIGGER tm_noa_updated_at
  BEFORE UPDATE ON time_machine_noa_data
  FOR EACH ROW
  EXECUTE FUNCTION update_time_machine_timestamp();

-- RLS Policies
ALTER TABLE time_machine_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_machine_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_machine_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_machine_noa_data ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own analyses" ON time_machine_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON time_machine_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses" ON time_machine_analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON time_machine_analyses
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own findings" ON time_machine_findings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own findings" ON time_machine_findings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own findings" ON time_machine_findings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own findings" ON time_machine_findings
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own profiles" ON time_machine_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profiles" ON time_machine_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles" ON time_machine_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profiles" ON time_machine_profiles
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own noa data" ON time_machine_noa_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own noa data" ON time_machine_noa_data
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own noa data" ON time_machine_noa_data
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own noa data" ON time_machine_noa_data
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- ANALYTICS VIEW: Time Machine Stats
-- ============================================

CREATE OR REPLACE VIEW time_machine_stats AS
SELECT
  tm.user_id,
  COUNT(DISTINCT tm.id) as total_analyses,
  COUNT(DISTINCT tmf.id) as total_findings,
  SUM(tmf.potential_recovery_min) as total_recovery_min,
  SUM(tmf.potential_recovery_max) as total_recovery_max,
  COUNT(DISTINCT tmf.id) FILTER (WHERE tmf.status = 'filed') as findings_filed,
  COUNT(DISTINCT tmf.id) FILTER (WHERE tmf.status = 'approved') as findings_approved,
  array_agg(DISTINCT tmf.tax_year ORDER BY tmf.tax_year DESC) as years_analyzed
FROM time_machine_analyses tm
LEFT JOIN time_machine_findings tmf ON tm.id = tmf.analysis_id
GROUP BY tm.user_id;

-- ============================================
-- VERIFICATION
-- ============================================
-- SELECT * FROM time_machine_analyses;
-- SELECT * FROM time_machine_findings;
-- SELECT * FROM time_machine_profiles;
-- SELECT * FROM time_machine_noa_data;
-- SELECT * FROM time_machine_stats;
