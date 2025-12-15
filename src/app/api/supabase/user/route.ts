import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'

export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    return Response.json({ user: null, profile: null })
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader?.startsWith('Bearer ')) {
    return Response.json({ user: null, profile: null })
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token)

    if (error || !user) {
      return Response.json({ user: null, profile: null })
    }

    const { data: profile } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    const { data: taxProfile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: profile?.display_name || user.user_metadata?.full_name,
        avatarUrl: profile?.avatar_url || user.user_metadata?.avatar_url,
      },
      profile: taxProfile,
    })
  } catch (err) {
    console.error('Error getting user:', err)
    return Response.json({ user: null, profile: null })
  }
}
