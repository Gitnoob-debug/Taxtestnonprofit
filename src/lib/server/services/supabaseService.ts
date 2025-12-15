import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey || !supabaseAnonKey) {
  console.warn('⚠ Missing Supabase environment variables - Supabase features disabled');
}

export const supabaseAdmin: SupabaseClient | null = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

export const supabaseClient: SupabaseClient | null = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
  if (!supabaseAdmin) {
    return;
  }
  
  try {
    await supabaseAdmin
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
