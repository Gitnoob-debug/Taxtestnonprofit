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
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error

    return Response.json({ conversations: data || [] })
  } catch (err) {
    console.error('Error getting conversations:', err)
    return Response.json({ error: 'Failed to get conversations' }, { status: 500 })
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
    const { title } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('conversations')
      .insert({
        user_id: user.id,
        title: title || 'New Conversation',
      })
      .select()
      .single()

    if (error) throw error

    return Response.json({ conversation: data })
  } catch (err) {
    console.error('Error creating conversation:', err)
    return Response.json({ error: 'Failed to create conversation' }, { status: 500 })
  }
}
