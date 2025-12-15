import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  try {
    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (convError || !conversation) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 })
    }

    const { data: messages, error: msgError } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true })

    if (msgError) throw msgError

    return Response.json({ conversation, messages: messages || [] })
  } catch (err) {
    console.error('Error getting conversation:', err)
    return Response.json({ error: 'Failed to get conversation' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  try {
    const { title } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('conversations')
      .update({
        title,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return Response.json({ conversation: data })
  } catch (err) {
    console.error('Error updating conversation:', err)
    return Response.json({ error: 'Failed to update conversation' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  try {
    const { error } = await supabaseAdmin
      .from('conversations')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw error

    return Response.json({ success: true })
  } catch (err) {
    console.error('Error deleting conversation:', err)
    return Response.json({ error: 'Failed to delete conversation' }, { status: 500 })
  }
}
