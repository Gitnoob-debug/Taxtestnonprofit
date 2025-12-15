import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

const isValidConfig = supabaseUrl && supabaseServiceKey

export const supabaseAdmin: SupabaseClient | null = isValidConfig
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

export async function getUserFromToken(authHeader: string | null) {
  if (!supabaseAdmin || !authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) return null
    return user
  } catch {
    return null
  }
}

export async function logAnonymousQuery(data: {
  session_id?: string
  query: string
  response: string
  tokens_used: number
  cost_usd: number
  ip_hash?: string
  user_agent?: string
  user_id?: string
}) {
  if (!supabaseAdmin) return

  try {
    await supabaseAdmin.from('anonymous_queries').insert({
      session_id: data.session_id,
      query: data.query,
      response: data.response,
      tokens_used: data.tokens_used,
      cost_usd: data.cost_usd,
      ip_hash: data.ip_hash,
      user_agent: data.user_agent,
      user_id: data.user_id,
    })
  } catch (error) {
    console.error('Failed to log anonymous query:', error)
  }
}
