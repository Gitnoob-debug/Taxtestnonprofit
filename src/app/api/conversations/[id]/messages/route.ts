import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

export async function POST(
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
    const { role, content, tokens_used, cost_usd } = await request.json()

    // Verify conversation belongs to user
    const { data: conversation } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!conversation) {
      return Response.json({ error: 'Conversation not found' }, { status: 404 })
    }

    const { data: message, error } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: id,
        user_id: user.id,
        role,
        content,
        tokens_used: tokens_used || null,
        cost_usd: cost_usd || null,
      })
      .select()
      .single()

    if (error) throw error

    // Update conversation timestamp
    await supabaseAdmin
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', id)

    return Response.json({ message })
  } catch (err) {
    console.error('Error adding message:', err)
    return Response.json({ error: 'Failed to add message' }, { status: 500 })
  }
}
