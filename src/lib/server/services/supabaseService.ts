import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read env vars at module load time for initialization check only
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

const isValidAdminConfig = supabaseUrl && supabaseServiceKey;
const isValidClientConfig = supabaseUrl && supabaseAnonKey;

// Lazy-init admin client
let _supabaseAdmin: SupabaseClient | null = null;
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isValidAdminConfig) return null;
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return _supabaseAdmin;
}

// Lazy-init client
let _supabaseClient: SupabaseClient | null = null;
export function getSupabaseClient(): SupabaseClient | null {
  if (!isValidClientConfig) return null;
  if (!_supabaseClient) {
    _supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabaseClient;
}

// Legacy exports for compatibility (deprecated - use getters)
export const supabaseAdmin: SupabaseClient | null = null;
export const supabaseClient: SupabaseClient | null = null;

export { supabaseUrl, supabaseAnonKey };

export interface AnonymousQueryLog {
  session_id?: string;
  query: string;
  response?: string;
  tokens_used?: number;
  cost_usd?: number;
  ip_hash?: string;
  user_agent?: string;
  user_id?: string;
}

export async function logAnonymousQuery(data: AnonymousQueryLog): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return;
  }

  try {
    await admin
      .from('anonymous_queries')
      .insert({
        session_id: data.session_id,
        query: data.query,
        response: data.response?.slice(0, 10000),
        tokens_used: data.tokens_used,
        cost_usd: data.cost_usd,
        ip_hash: data.ip_hash,
        user_agent: data.user_agent?.slice(0, 500),
        user_id: data.user_id,
      });
  } catch (error) {
    console.error('Failed to log query:', error);
  }
}
