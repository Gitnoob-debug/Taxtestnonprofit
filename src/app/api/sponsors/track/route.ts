import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// POST /api/sponsors/track - Track impressions and clicks
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const body = await request.json()
    const {
      type, // 'impression' or 'click'
      sponsorId,
      sessionId,
      pageUrl,
      queryContext,
      userId
    } = body

    if (!type || !sponsorId) {
      return NextResponse.json(
        { error: 'Missing required fields: type, sponsorId' },
        { status: 400 }
      )
    }

    const tableName = type === 'click' ? 'sponsor_clicks' : 'sponsor_impressions'

    const { error } = await supabase
      .from(tableName)
      .insert({
        sponsor_id: sponsorId,
        user_id: userId || null,
        session_id: sessionId || null,
        page_url: pageUrl || null,
        query_context: queryContext || null,
      })

    if (error) {
      console.error(`[Sponsors Track] Error inserting ${type}:`, error)
      return NextResponse.json({ error: `Failed to track ${type}` }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Sponsors Track] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
