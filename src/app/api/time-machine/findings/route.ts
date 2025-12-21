import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'

export async function GET(request: NextRequest) {
  try {
    // Check supabase admin is configured
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Get auth token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get query params
    const { searchParams } = new URL(request.url)
    const analysisId = searchParams.get('analysisId')

    if (!analysisId) {
      // Return all analyses for user
      const { data: analyses, error: analysesError } = await supabaseAdmin
        .from('time_machine_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (analysesError) {
        console.error('Failed to fetch analyses:', analysesError)
        return NextResponse.json({ error: 'Failed to fetch analyses' }, { status: 500 })
      }

      return NextResponse.json({ analyses })
    }

    // Get specific analysis
    const { data: analysis, error: analysisError } = await supabaseAdmin
      .from('time_machine_analyses')
      .select('*')
      .eq('id', analysisId)
      .eq('user_id', user.id)
      .single()

    if (analysisError || !analysis) {
      return NextResponse.json({ error: 'Analysis not found' }, { status: 404 })
    }

    // Get findings for this analysis
    const { data: findings, error: findingsError } = await supabaseAdmin
      .from('time_machine_findings')
      .select('*')
      .eq('analysis_id', analysisId)
      .eq('user_id', user.id)
      .order('priority', { ascending: true })
      .order('potential_recovery_max', { ascending: false })

    if (findingsError) {
      console.error('Failed to fetch findings:', findingsError)
      return NextResponse.json({ error: 'Failed to fetch findings' }, { status: 500 })
    }

    // Calculate year breakdowns
    const years = analysis.tax_years as number[]
    const yearBreakdowns = years.map((year: number) => {
      const yearFindings = findings?.filter((f) => f.tax_year === year) || []
      return {
        year,
        findingsCount: yearFindings.length,
        totalRecoveryMin: yearFindings.reduce((sum, f) => sum + (f.potential_recovery_min || 0), 0),
        totalRecoveryMax: yearFindings.reduce((sum, f) => sum + (f.potential_recovery_max || 0), 0),
        hasNOA: false, // TODO: Check NOA data
        profileComplete: false, // TODO: Check profile data
        findingTypes: yearFindings.map((f) => f.finding_type),
      }
    })

    return NextResponse.json({
      analysis,
      findings: findings || [],
      yearBreakdowns,
    })
  } catch (error) {
    console.error('Time Machine findings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch findings' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check supabase admin is configured
    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    // Get auth token
    const authHeader = request.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { findingId, status, amendmentResult } = body

    if (!findingId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Update finding
    const updateData: Record<string, any> = { status }

    if (status === 'filed') {
      updateData.amendment_filed_at = new Date().toISOString()
    }

    if (amendmentResult) {
      updateData.amendment_result = amendmentResult
    }

    const { data: finding, error: updateError } = await supabaseAdmin
      .from('time_machine_findings')
      .update(updateData)
      .eq('id', findingId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update finding:', updateError)
      return NextResponse.json({ error: 'Failed to update finding' }, { status: 500 })
    }

    return NextResponse.json({ finding })
  } catch (error) {
    console.error('Time Machine finding update error:', error)
    return NextResponse.json(
      { error: 'Failed to update finding' },
      { status: 500 }
    )
  }
}
