import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'
import { runFullAnalysis } from '@/lib/time-machine/analyzer'
import { TimeMachineProfile, NOAData } from '@/lib/time-machine/types'

export async function POST(request: NextRequest) {
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
    const { years, profiles, noaData } = body as {
      years: number[]
      profiles: Record<number, Partial<TimeMachineProfile>>
      noaData: Record<number, Partial<NOAData>>
    }

    if (!years || years.length === 0) {
      return NextResponse.json({ error: 'No years specified' }, { status: 400 })
    }

    // Run the analysis
    const analysisResult = runFullAnalysis({
      userId: user.id,
      years,
      profiles,
      noaData,
    })

    // Save analysis to database
    const { data: analysis, error: analysisError } = await supabaseAdmin
      .from('time_machine_analyses')
      .insert({
        user_id: user.id,
        tax_years: analysisResult.analysis.tax_years,
        total_potential_recovery_min: analysisResult.analysis.total_potential_recovery_min,
        total_potential_recovery_max: analysisResult.analysis.total_potential_recovery_max,
        status: analysisResult.analysis.status,
        findings_count: analysisResult.analysis.findings_count,
      })
      .select()
      .single()

    if (analysisError) {
      console.error('Failed to save analysis:', analysisError)
      return NextResponse.json({ error: 'Failed to save analysis' }, { status: 500 })
    }

    // Save findings to database
    if (analysisResult.findings.length > 0) {
      const findingsToInsert = analysisResult.findings.map((finding) => ({
        analysis_id: analysis.id,
        user_id: user.id,
        tax_year: finding.tax_year,
        finding_type: finding.finding_type,
        title: finding.title,
        description: finding.description,
        potential_recovery_min: finding.potential_recovery_min,
        potential_recovery_max: finding.potential_recovery_max,
        confidence: finding.confidence,
        priority: finding.priority,
        evidence: finding.evidence,
        requirements: finding.requirements,
        status: finding.status,
      }))

      const { error: findingsError } = await supabaseAdmin
        .from('time_machine_findings')
        .insert(findingsToInsert)

      if (findingsError) {
        console.error('Failed to save findings:', findingsError)
        // Continue anyway - analysis is saved
      }
    }

    // Save year profiles to database
    for (const year of years) {
      const profile = profiles[year]
      if (profile && Object.keys(profile).length > 0) {
        const { error: profileError } = await supabaseAdmin
          .from('time_machine_profiles')
          .upsert({
            user_id: user.id,
            tax_year: year,
            ...profile,
          }, {
            onConflict: 'user_id,tax_year',
          })

        if (profileError) {
          console.error('Failed to save profile for year', year, ':', profileError)
        }
      }

      // Save NOA data if present
      const noa = noaData[year]
      if (noa && Object.keys(noa).length > 0) {
        const { error: noaError } = await supabaseAdmin
          .from('time_machine_noa_data')
          .upsert({
            user_id: user.id,
            tax_year: year,
            net_income: noa.net_income,
            taxable_income: noa.taxable_income,
            refund_or_balance_owing: noa.refund_or_balance_owing,
            rrsp_deduction_limit: noa.rrsp_deduction_limit,
            line_data: noa.line_data || {},
            extraction_confidence: noa.extraction_confidence,
          }, {
            onConflict: 'user_id,tax_year',
          })

        if (noaError) {
          console.error('Failed to save NOA data for year', year, ':', noaError)
        }
      }
    }

    return NextResponse.json({
      analysisId: analysis.id,
      totalRecoveryMin: analysisResult.analysis.total_potential_recovery_min,
      totalRecoveryMax: analysisResult.analysis.total_potential_recovery_max,
      findingsCount: analysisResult.findings.length,
      yearBreakdowns: analysisResult.yearBreakdowns,
    })
  } catch (error) {
    console.error('Time Machine analysis error:', error)
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    )
  }
}
