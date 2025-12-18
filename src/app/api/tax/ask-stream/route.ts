import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken, logAnonymousQuery } from '@/lib/server/supabase-admin'
import crypto from 'crypto'

// Import server-side services - these need to be server-only
import { retrieveContext } from '@/lib/server/services/retriever'
import { sanitizeQuery } from '@/lib/server/services/querySanitization'
import { TaxRAGGenerator, enrichQueryForSearch, preflightCheck, type UserProfile } from '@/lib/server/lib/taxrag'

const taxGenerator = new TaxRAGGenerator({
  openRouterApiKey: process.env.OPENROUTER_API_KEY!,
  model: 'anthropic/claude-sonnet-4',
  maxTokens: 2048,
  temperature: 0.3,
})

// Pre-warm connection on module load (helps with cold starts)
let isWarmedUp = false
const warmUp = async () => {
  if (isWarmedUp) return
  isWarmedUp = true
  try {
    // Trigger lazy initialization of supabase connection
    if (supabaseAdmin) {
      await supabaseAdmin.from('user_profiles').select('count', { count: 'exact', head: true }).limit(1)
      console.log('[TAX-STREAM] Connection pre-warmed')
    }
  } catch {
    // Ignore errors - this is just a warm-up attempt
  }
}
warmUp()

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

interface UserProfileWithId extends UserProfile {
  userId?: string
}

function hashIp(ip: string | undefined): string | undefined {
  if (!ip) return undefined
  return crypto.createHash('sha256').update(ip + 'tax-assistant-salt').digest('hex').slice(0, 16)
}

async function getUserProfileFromToken(authHeader: string | null): Promise<UserProfileWithId | null> {
  if (!supabaseAdmin || !authHeader?.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    if (error || !user) return null

    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (!profile) {
      return { userId: user.id }
    }

    const employmentMap: Record<string, UserProfile['employmentType']> = {
      employed: 'employed',
      'self-employed': 'self-employed',
      retired: 'retired',
      student: 'student',
      unemployed: 'unemployed',
    }

    const maritalMap: Record<string, UserProfile['maritalStatus']> = {
      single: 'single',
      married: 'married',
      'common-law': 'common-law',
      separated: 'separated',
      divorced: 'divorced',
      widowed: 'widowed',
    }

    return {
      userId: user.id,
      province: profile.province,
      ageRange: profile.age_range,
      employmentType: profile.employment_status ? employmentMap[profile.employment_status] : undefined,
      maritalStatus: profile.marital_status ? maritalMap[profile.marital_status] : undefined,
      hasChildren: profile.has_dependents,
      hasChildcareExpenses: profile.has_childcare_expenses,
      hasRRSP: profile.has_rrsp_contributions,
      hasTFSA: profile.has_tfsa,
      hasFHSA: profile.has_fhsa,
      hasRentalIncome: profile.has_rental_income,
      hasForeignIncome: profile.has_foreign_income,
      hasDisability: profile.has_disability,
      worksFromHome: profile.has_home_office_expenses,
      hasBusinessIncome: profile.has_self_employment_income,
      hasInvestmentIncome: profile.has_investment_income,
      hasPensionIncome: profile.has_pension_income,
      hasCapitalGains: profile.has_capital_gains,
      isFirstTimeHomeBuyer: profile.is_first_time_home_buyer,
    }
  } catch (e) {
    console.error('Error getting user profile:', e)
    return null
  }
}

function getDisclaimer(confidence: 'high' | 'medium' | 'low'): string {
  const standard =
    'This information is for general guidance only and does not constitute professional tax advice. Tax situations vary—please consult a qualified tax professional for advice specific to your circumstances.'
  const currency =
    'Tax rules change frequently. Always verify current rules on canada.ca or with a tax professional.'
  const complexity =
    'This appears to be a complex tax situation. We strongly recommend consulting with a certified accountant or tax professional before making decisions.'

  switch (confidence) {
    case 'high':
      return standard
    case 'medium':
      return standard + ' ' + currency
    case 'low':
      return complexity + ' ' + standard
    default:
      return standard
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const userProfile = await getUserProfileFromToken(authHeader)

  try {
    const body = await request.json()
    const { question, tax_year, province, conversationHistory = [] } = body

    // Sanitize the query
    const { isValid, sanitizedQuery, rejectionReason } = sanitizeQuery(question)

    if (!isValid) {
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', data: { message: rejectionReason } })}\n\n`))
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done', data: {} })}\n\n`))
          controller.close()
        },
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      })
    }

    const validHistory: ConversationMessage[] = Array.isArray(conversationHistory)
      ? conversationHistory.filter(
          (msg: any) =>
            msg &&
            typeof msg.role === 'string' &&
            (msg.role === 'user' || msg.role === 'assistant') &&
            typeof msg.content === 'string'
        )
      : []

    console.log(`[TAX-STREAM] Question: "${sanitizedQuery.slice(0, 100)}..." (history: ${validHistory.length} messages)`)

    let fullResponse = ''
    let tokenUsage = 0
    let costEstimate = 0

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendSSE = (type: string, data: any) => {
          try {
            if (type === 'chunk' && data.content) {
              fullResponse += data.content
            }
            if (type === 'metadata' && data.usage) {
              tokenUsage = data.usage.total_tokens || 0
              costEstimate = data.usage.estimated_cost || 0
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, data })}\n\n`))
          } catch (e) {
            console.error('SSE error:', e)
          }
        }

        try {
          sendSSE('status', {
            step: 1,
            message: `Analyzing your question about "${sanitizedQuery.slice(0, 40)}${sanitizedQuery.length > 40 ? '...' : ''}"`,
          })

          const enrichedQuery = enrichQueryForSearch(sanitizedQuery, userProfile)
          if (enrichedQuery !== sanitizedQuery) {
            console.log(`[TAX-STREAM] Query enriched with profile context`)
          }

          await new Promise((resolve) => setTimeout(resolve, 200))
          sendSSE('status', { step: 2, message: 'Converting to semantic search vector...' })

          const searchResults = await retrieveContext({
            question: enrichedQuery,
            tax_year,
            province,
            conversationHistory: validHistory,
          })

          console.log(`[TAX-STREAM] Found ${searchResults.length} relevant chunks`)

          const preflight = preflightCheck(
            searchResults.map((r) => ({
              score: r.score,
              content: r.chunk.text,
              metadata: {
                source_title: r.chunk.source_title,
                source_url: r.chunk.source_url,
                source_type: r.chunk.source_type,
              },
            })),
            sanitizedQuery,
            userProfile
          )

          if (!preflight.canProceed) {
            sendSSE('status', { step: 3, message: 'No matching CRA documents found...' })
            sendSSE('chunk', {
              content: preflight.earlyResponse || "I couldn't find relevant information in my CRA sources.",
            })
            sendSSE('metadata', {
              confidence: 'low',
              disclaimer: 'This information is for general guidance only and does not constitute professional tax advice.',
              usage: { total_tokens: 0, estimated_cost: 0 },
            })
            sendSSE('done', {})
            controller.close()
            return
          }

          const uniqueSources = Array.from(new Set(searchResults.map((r) => r.chunk.source_title)))
          const topScores = searchResults.slice(0, 3).map((r) => (r.score * 100).toFixed(0) + '%')

          sendSSE('status', {
            step: 3,
            message: `Found ${searchResults.length} relevant sections from ${uniqueSources.length} CRA document${uniqueSources.length > 1 ? 's' : ''}`,
            sources: uniqueSources.slice(0, 3),
            scores: topScores,
          })

          await new Promise((resolve) => setTimeout(resolve, 300))

          await taxGenerator.generateStream(
            {
              query: sanitizedQuery,
              profile: userProfile,
              conversationHistory: validHistory,
              searchResults: searchResults.map((r) => ({
                score: r.score,
                content: r.chunk.text,
                metadata: {
                  source_title: r.chunk.source_title,
                  source_url: r.chunk.source_url,
                  source_type: r.chunk.source_type,
                },
              })),
            },
            sendSSE
          )

          console.log(`[TAX-STREAM] Response streamed successfully${userProfile ? ' (personalized)' : ''}`)

          // Log the query
          const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0] || ''

          logAnonymousQuery({
            session_id: body.sessionId,
            query: sanitizedQuery,
            response: fullResponse,
            tokens_used: tokenUsage,
            cost_usd: costEstimate,
            ip_hash: hashIp(clientIp),
            user_agent: request.headers.get('user-agent') || undefined,
            user_id: userProfile?.userId,
          }).catch(() => {})

          controller.close()
        } catch (error) {
          console.error('[TAX-STREAM] Error:', error)
          sendSSE('error', { message: error instanceof Error ? error.message : 'Unknown error' })
          sendSSE('done', {})
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })
  } catch (error) {
    console.error('[TAX-STREAM] Error processing question:', error)
    return Response.json(
      {
        error: 'Failed to process question',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const maxDuration = 60
