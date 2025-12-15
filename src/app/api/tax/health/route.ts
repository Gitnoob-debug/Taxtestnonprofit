import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'

export async function GET(request: NextRequest) {
  try {
    const dbConnected = !!supabaseAdmin
    const llmConnected = !!process.env.OPENROUTER_API_KEY

    const healthy = dbConnected && llmConnected

    return Response.json(
      {
        status: healthy ? 'healthy' : 'degraded',
        service: 'tax-assistant',
        checks: {
          database: dbConnected ? 'connected' : 'disconnected',
          llm: llmConnected ? 'configured' : 'not configured',
          supabase: supabaseAdmin ? 'configured' : 'not configured',
        },
        timestamp: new Date().toISOString(),
      },
      { status: healthy ? 200 : 503 }
    )
  } catch (error) {
    return Response.json(
      {
        status: 'unhealthy',
        service: 'tax-assistant',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    )
  }
}
