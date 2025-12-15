import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

const isValidConfig = supabaseUrl && supabaseAnonKey && supabaseAnonKey.startsWith('eyJ')

export const supabase: SupabaseClient | null = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null

export type { User, Session }

export async function signInWithGoogle(): Promise<void> {
  if (!supabase) {
    console.warn('Supabase not configured')
    return
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })

  if (error) {
    console.error('Google sign in error:', error)
    throw error
  }
}

export async function signOut(): Promise<void> {
  if (!supabase) return

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (!supabase) return null

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.access_token || null
}
