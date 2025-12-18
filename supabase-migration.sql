-- ============================================
-- SUPABASE MIGRATION: Add Profile Fields for WOWZA Features
-- ============================================
-- Run this in: Supabase Dashboard > SQL Editor
--
-- This adds new columns to the user_profiles table for:
-- - Calculator pre-fill (income, birth year, contributions)
-- - Family tax optimizer (spouse income)
-- - Personalized greetings (display name)
-- - Smart notifications (notification preferences)
-- ============================================

-- Add new columns (IF NOT EXISTS prevents errors if run multiple times)

-- Basic info
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS birth_year integer;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS display_name text;

-- Financial data for calculator pre-fill
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS annual_income numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS spouse_income numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS rrsp_contribution_room numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS rrsp_contributions_ytd numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS tfsa_contributions_lifetime numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS fhsa_contributions_lifetime numeric;
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS expected_retirement_age integer;

-- Notification preferences (JSON)
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS notification_preferences jsonb
  DEFAULT '{"email_reminders": true, "tax_tips": true}'::jsonb;

-- ============================================
-- VERIFICATION: Run this to confirm columns were added
-- ============================================
-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'user_profiles'
-- ORDER BY ordinal_position;

-- ============================================
-- COLUMN REFERENCE
-- ============================================
-- | Column                      | Type    | Purpose                              |
-- |-----------------------------|---------|--------------------------------------|
-- | birth_year                  | integer | TFSA/CPP calculators, exact age      |
-- | display_name                | text    | Personalized greetings               |
-- | annual_income               | numeric | Tax/RRSP calculator pre-fill         |
-- | spouse_income               | numeric | Family tax optimizer                 |
-- | rrsp_contribution_room      | numeric | RRSP calculator pre-fill             |
-- | rrsp_contributions_ytd      | numeric | Track current year RRSP              |
-- | tfsa_contributions_lifetime | numeric | TFSA room calculator pre-fill        |
-- | fhsa_contributions_lifetime | numeric | FHSA calculator pre-fill             |
-- | expected_retirement_age     | integer | CPP/OAS calculator                   |
-- | notification_preferences    | jsonb   | Email reminder settings              |
-- ============================================
