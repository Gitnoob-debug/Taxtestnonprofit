-- ============================================
-- SUPABASE MIGRATION: Sponsors/Advertisers System
-- ============================================
-- Run this in: Supabase Dashboard > SQL Editor
--
-- This creates tables for:
-- - Sponsor management (advertisers)
-- - Click/impression tracking
-- - Campaign date ranges
-- ============================================

-- Sponsors table
CREATE TABLE IF NOT EXISTS sponsors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic info
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  logo_url TEXT,

  -- Links
  url TEXT NOT NULL,
  affiliate_url TEXT,

  -- Categorization
  category TEXT NOT NULL CHECK (category IN ('investment', 'tax-software', 'banking', 'accounting', 'insurance', 'education')),

  -- Targeting - array of keywords that trigger this sponsor
  triggers TEXT[] DEFAULT '{}',

  -- Inline mention (what AI can say)
  inline_mention TEXT,
  allow_inline BOOLEAN DEFAULT false,

  -- Priority (higher = more likely to show)
  priority INTEGER DEFAULT 5,

  -- Status
  active BOOLEAN DEFAULT true,

  -- Campaign dates (NULL = always active)
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsor impressions tracking
CREATE TABLE IF NOT EXISTS sponsor_impressions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT, -- For anonymous tracking
  page_url TEXT,
  query_context TEXT, -- What query triggered this impression
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sponsor clicks tracking
CREATE TABLE IF NOT EXISTS sponsor_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  page_url TEXT,
  query_context TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sponsors_active ON sponsors(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_sponsors_category ON sponsors(category);
CREATE INDEX IF NOT EXISTS idx_sponsor_impressions_sponsor ON sponsor_impressions(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_impressions_date ON sponsor_impressions(created_at);
CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_sponsor ON sponsor_clicks(sponsor_id);
CREATE INDEX IF NOT EXISTS idx_sponsor_clicks_date ON sponsor_clicks(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_sponsor_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS sponsors_updated_at ON sponsors;
CREATE TRIGGER sponsors_updated_at
  BEFORE UPDATE ON sponsors
  FOR EACH ROW
  EXECUTE FUNCTION update_sponsor_timestamp();

-- RLS Policies
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsor_clicks ENABLE ROW LEVEL SECURITY;

-- Sponsors: Anyone can read active sponsors
CREATE POLICY "Anyone can read active sponsors" ON sponsors
  FOR SELECT USING (active = true AND (start_date IS NULL OR start_date <= NOW()) AND (end_date IS NULL OR end_date >= NOW()));

-- Impressions: Service role can insert, users can see their own
CREATE POLICY "Service can insert impressions" ON sponsor_impressions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can see own impressions" ON sponsor_impressions
  FOR SELECT USING (auth.uid() = user_id);

-- Clicks: Service role can insert, users can see their own
CREATE POLICY "Service can insert clicks" ON sponsor_clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can see own clicks" ON sponsor_clicks
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: Initial placeholder sponsors
-- ============================================

INSERT INTO sponsors (name, tagline, description, url, affiliate_url, category, triggers, inline_mention, allow_inline, priority, active) VALUES
-- Investment Platforms
('Wealthsimple', 'Invest smarter, not harder', 'Commission-free trading for stocks and ETFs. Open a TFSA, RRSP, or FHSA in minutes.', 'https://wealthsimple.com', 'https://wealthsimple.com/?ref=taxradar', 'investment', ARRAY['rrsp', 'tfsa', 'fhsa', 'invest', 'etf', 'stock', 'contribution room', 'registered account'], 'Many Canadians use platforms like Wealthsimple to manage their registered accounts.', true, 10, true),

('Questrade', 'Keep more of your money', 'Low-fee investing with free ETF purchases. Great for self-directed RRSP and TFSA accounts.', 'https://questrade.com', 'https://questrade.com/?ref=taxradar', 'investment', ARRAY['rrsp', 'tfsa', 'etf', 'dividend', 'capital gains', 'investment income', 'self-directed'], 'Questrade offers commission-free ETF purchases for self-directed investors.', true, 9, true),

-- Tax Software
('TurboTax', 'File with confidence', 'Canada''s #1 tax software. Maximum refund guaranteed. Free for simple returns.', 'https://turbotax.intuit.ca', 'https://turbotax.intuit.ca/?ref=taxradar', 'tax-software', ARRAY['file taxes', 'tax return', 'tax filing', 'netfile', 'tax software', 'efile', 'april 30', 'june 15 deadline'], 'Tax software like TurboTax can help ensure you claim all eligible deductions.', true, 10, true),

('Wealthsimple Tax', 'Free tax filing for everyone', 'Completely free tax filing software. No upsells, no hidden fees. CRA certified.', 'https://wealthsimple.com/tax', 'https://wealthsimple.com/tax?ref=taxradar', 'tax-software', ARRAY['file taxes', 'free tax software', 'tax return', 'simple return', 'netfile'], 'Wealthsimple Tax offers completely free tax filing for Canadians.', true, 9, true),

-- Accounting Services
('Bench', 'Bookkeeping for small business', 'Professional bookkeeping and tax prep for self-employed Canadians and small businesses.', 'https://bench.co', 'https://bench.co/?ref=taxradar', 'accounting', ARRAY['self-employed', 'small business', 'bookkeeping', 'business expenses', 'sole proprietor', 'corporation', 'gst/hst'], 'Services like Bench can help self-employed individuals manage their bookkeeping.', true, 8, true),

-- Banking
('EQ Bank', 'High-interest savings made simple', 'No-fee banking with high-interest savings accounts. Great for your emergency fund.', 'https://eqbank.ca', 'https://eqbank.ca/?ref=taxradar', 'banking', ARRAY['savings account', 'interest income', 'emergency fund', 'high interest', 'gic'], 'High-interest savings accounts like EQ Bank can help grow your savings tax-efficiently.', true, 7, true),

-- Insurance
('PolicyMe', 'Life insurance made simple', 'Affordable term life insurance for Canadians. Get a quote in minutes.', 'https://policyme.com', 'https://policyme.com/?ref=taxradar', 'insurance', ARRAY['life insurance', 'estate planning', 'beneficiary', 'death benefit'], 'Life insurance proceeds are generally tax-free in Canada.', false, 6, true),

-- Education
('Coursera', 'Learn without limits', 'Online courses in finance, accounting, and tax planning from top universities.', 'https://coursera.org', 'https://coursera.org/?ref=taxradar', 'education', ARRAY['learn', 'education', 'tuition', 'professional development'], '', false, 5, true)

ON CONFLICT DO NOTHING;

-- ============================================
-- ANALYTICS VIEW: Sponsor performance
-- ============================================

CREATE OR REPLACE VIEW sponsor_analytics AS
SELECT
  s.id,
  s.name,
  s.category,
  s.active,
  COUNT(DISTINCT si.id) as total_impressions,
  COUNT(DISTINCT sc.id) as total_clicks,
  CASE
    WHEN COUNT(DISTINCT si.id) > 0
    THEN ROUND((COUNT(DISTINCT sc.id)::NUMERIC / COUNT(DISTINCT si.id)::NUMERIC) * 100, 2)
    ELSE 0
  END as click_through_rate,
  COUNT(DISTINCT si.id) FILTER (WHERE si.created_at >= NOW() - INTERVAL '7 days') as impressions_7d,
  COUNT(DISTINCT sc.id) FILTER (WHERE sc.created_at >= NOW() - INTERVAL '7 days') as clicks_7d
FROM sponsors s
LEFT JOIN sponsor_impressions si ON s.id = si.sponsor_id
LEFT JOIN sponsor_clicks sc ON s.id = sc.sponsor_id
GROUP BY s.id, s.name, s.category, s.active;

-- ============================================
-- VERIFICATION
-- ============================================
-- SELECT * FROM sponsors;
-- SELECT * FROM sponsor_analytics;
