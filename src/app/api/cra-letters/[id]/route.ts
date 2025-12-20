import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

// DELETE - Remove a CRA letter
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    // First, get the letter to check ownership and get file path
    const { data: letter, error: fetchError } = await supabaseAdmin
      .from('cra_letters')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !letter) {
      return Response.json({ error: 'Letter not found' }, { status: 404 })
    }

    // Delete from storage if we have a file URL
    if (letter.file_url) {
      const filePath = letter.file_url.split('/').slice(-2).join('/')
      await supabaseAdmin.storage.from('cra-letters').remove([filePath])
    }

    // Delete from database
    const { error: deleteError } = await supabaseAdmin
      .from('cra_letters')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (deleteError) throw deleteError

    return Response.json({ success: true })
  } catch (err) {
    console.error('Error deleting CRA letter:', err)
    return Response.json({ error: 'Failed to delete letter' }, { status: 500 })
  }
}

// GET - Get a specific CRA letter
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const { data: letter, error } = await supabaseAdmin
      .from('cra_letters')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (error || !letter) {
      return Response.json({ error: 'Letter not found' }, { status: 404 })
    }

    return Response.json({ letter })
  } catch (err) {
    console.error('Error fetching CRA letter:', err)
    return Response.json({ error: 'Failed to fetch letter' }, { status: 500 })
  }
}

// PATCH - Update letter status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params

  try {
    const body = await request.json()
    const { status } = body

    if (!['pending', 'analyzed', 'responded', 'resolved'].includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { data: letter, error } = await supabaseAdmin
      .from('cra_letters')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) throw error

    return Response.json({ letter })
  } catch (err) {
    console.error('Error updating CRA letter:', err)
    return Response.json({ error: 'Failed to update letter' }, { status: 500 })
  }
}
