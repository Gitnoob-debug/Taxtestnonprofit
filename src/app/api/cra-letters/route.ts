import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

// GET - List all CRA letters for user
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
    const { data: letters, error } = await supabaseAdmin
      .from('cra_letters')
      .select('*')
      .eq('user_id', user.id)
      .order('uploaded_at', { ascending: false })

    if (error) throw error

    return Response.json({ letters: letters || [] })
  } catch (err) {
    console.error('Error fetching CRA letters:', err)
    return Response.json({ error: 'Failed to fetch letters' }, { status: 500 })
  }
}
