import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: profile, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    return Response.json({ profile: profile || null })
  } catch (err) {
    console.error('Error getting profile:', err)
    return Response.json({ error: 'Failed to get profile' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    const profileData = {
      ...body,
      user_id: user.id,
      updated_at: new Date().toISOString(),
    }

    delete profileData.id
    delete profileData.created_at

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .upsert(profileData, {
        onConflict: 'user_id',
        ignoreDuplicates: false,
      })
      .select()
      .single()

    if (error) {
      console.error('[PROFILE] Supabase error:', error.message)
      throw error
    }

    return Response.json({ profile: data })
  } catch (err: any) {
    console.error('[PROFILE] Error updating profile:', err?.message || err)
    return Response.json(
      { error: 'Failed to update profile', details: err?.message },
      { status: 500 }
    )
  }
}
