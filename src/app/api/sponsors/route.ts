import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// GET /api/sponsors - Fetch active sponsors, optionally filtered by triggers
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') // Content to match triggers against
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '2')

    // Fetch all active sponsors (RLS will filter by active + date range)
    let dbQuery = supabase
      .from('sponsors')
      .select('*')
      .eq('active', true)
      .order('priority', { ascending: false })

    if (category) {
      dbQuery = dbQuery.eq('category', category)
    }

    const { data: sponsors, error } = await dbQuery

    if (error) {
      console.error('[Sponsors API] Error fetching sponsors:', error)
      return NextResponse.json({ error: 'Failed to fetch sponsors' }, { status: 500 })
    }

    // If query provided, filter by trigger matches and score them
    let results = sponsors || []

    if (query) {
      const lowerQuery = query.toLowerCase()

      const scored = results
        .map(sponsor => {
          // Count how many triggers match
          const matchCount = (sponsor.triggers || []).filter((trigger: string) =>
            lowerQuery.includes(trigger.toLowerCase())
          ).length

          return {
            sponsor,
            score: matchCount * (sponsor.priority || 1)
          }
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)

      results = scored.slice(0, limit).map(item => item.sponsor)
    } else {
      results = results.slice(0, limit)
    }

    return NextResponse.json({ sponsors: results })
  } catch (error) {
    console.error('[Sponsors API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
