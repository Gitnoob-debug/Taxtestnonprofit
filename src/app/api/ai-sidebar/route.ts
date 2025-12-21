import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'
import { retrieveContext } from '@/lib/server/services/retriever'
import { sanitizeQuery } from '@/lib/server/services/querySanitization'
import { TaxRAGGenerator, enrichQueryForSearch, preflightCheck, type UserProfile } from '@/lib/server/lib/taxrag'

const taxGenerator = new TaxRAGGenerator({
  openRouterApiKey: process.env.OPENROUTER_API_KEY!,
  model: 'anthropic/claude-sonnet-4',
  maxTokens: 1024, // Shorter responses for sidebar
  temperature: 0.3,
})

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

interface PageContext {
  page: string
  pageName: string
  data: {
    taxPosition?: {
      estimatedIncome: number
      federalTax: number
      provincialTax: number
      totalTax: number
      effectiveRate: number
      marginalRate: number
      cppContributions: number
      eiPremiums: number
      taxWithheld: number
      estimatedRefund: number
      province: string
      provinceName: string
    }
    opportunities?: Array<{
      id: string
      title: string
      description: string
      potentialSavings: number
      priority: 'high' | 'medium' | 'low'
      category: string
    }>
    taxScore?: {
      score: number
      maxScore: number
      percentile: number
      factors: Array<{
        name: string
        score: number
        maxScore: number
        description: string
      }>
    }
    bracketPosition?: {
      currentBracket: string
      currentBracketRate: number
      nextBracketThreshold: number
      amountToNextBracket: number
      combinedMarginalRate: number
    }
    deadlines?: Array<{
      name: string
      date: string
      daysUntil: number
      urgency: 'urgent' | 'soon' | 'normal'
      description: string
    }>
    moneyLeftOnTable?: number
    calculatorFields?: Record<string, string | number>
    calculatorResult?: Record<string, string | number>
    calculatorType?: string
    profile?: {
      firstName?: string
      lastName?: string
      province?: string
      employmentType?: string
      income?: number
      rrspRoom?: number
      tfsaRoom?: number
    }
    scannedDocument?: {
      documentType: string
      taxYear: number | null
      issuerName: string | null
      summary: string
      keyFields: Record<string, string | number>
    }
  }
  timestamp: number
}

interface UserProfileWithId extends UserProfile {
  userId?: string
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

// Build context string from page context
function buildPageContextString(pageContext: PageContext | null): string {
  if (!pageContext) return ''

  let contextParts: string[] = []

  contextParts.push(`\n\n[CURRENT PAGE CONTEXT]`)
  contextParts.push(`The user is currently viewing: ${pageContext.pageName}`)

  const data = pageContext.data

  // Command Center data
  if (data.taxPosition) {
    const tp = data.taxPosition
    contextParts.push(`\n### Tax Position`)
    contextParts.push(`- Estimated ${tp.estimatedRefund >= 0 ? 'Refund' : 'Owing'}: $${Math.abs(tp.estimatedRefund).toLocaleString()}`)
    contextParts.push(`- Total Income: $${tp.estimatedIncome.toLocaleString()}`)
    contextParts.push(`- Total Tax: $${tp.totalTax.toLocaleString()} (Federal: $${tp.federalTax.toLocaleString()}, Provincial: $${tp.provincialTax.toLocaleString()})`)
    contextParts.push(`- Effective Rate: ${tp.effectiveRate.toFixed(1)}%`)
    contextParts.push(`- Marginal Rate: ${tp.marginalRate.toFixed(1)}%`)
    contextParts.push(`- Province: ${tp.provinceName}`)
  }

  if (data.bracketPosition) {
    const bp = data.bracketPosition
    contextParts.push(`\n### Tax Bracket Position`)
    contextParts.push(`- Current Bracket: ${bp.currentBracket} (${bp.currentBracketRate.toFixed(1)}%)`)
    contextParts.push(`- Amount to Next Bracket: $${bp.amountToNextBracket.toLocaleString()}`)
    contextParts.push(`- Combined Marginal Rate: ${bp.combinedMarginalRate.toFixed(1)}%`)
  }

  if (data.opportunities && data.opportunities.length > 0) {
    const totalSavings = data.opportunities.reduce((sum, o) => sum + o.potentialSavings, 0)
    contextParts.push(`\n### Tax Optimization Opportunities (Money Left on Table: $${totalSavings.toLocaleString()})`)
    data.opportunities.forEach((opp, i) => {
      contextParts.push(`${i + 1}. ${opp.title} - Save up to $${opp.potentialSavings.toLocaleString()} [${opp.priority} priority]`)
      contextParts.push(`   ${opp.description}`)
    })
  }

  if (data.taxScore) {
    const ts = data.taxScore
    contextParts.push(`\n### Tax Score: ${ts.score}/${ts.maxScore} (${ts.percentile}th percentile)`)
    ts.factors.forEach(f => {
      contextParts.push(`- ${f.name}: ${f.score}/${f.maxScore} - ${f.description}`)
    })
  }

  if (data.deadlines && data.deadlines.length > 0) {
    contextParts.push(`\n### Upcoming Tax Deadlines`)
    data.deadlines.forEach(d => {
      contextParts.push(`- ${d.name}: ${d.date} (${d.daysUntil} days) [${d.urgency}]`)
    })
  }

  // Calculator data
  if (data.calculatorType) {
    contextParts.push(`\n### Calculator: ${data.calculatorType}`)

    if (data.calculatorFields && Object.keys(data.calculatorFields).length > 0) {
      contextParts.push(`Input Values:`)
      Object.entries(data.calculatorFields).forEach(([key, value]) => {
        contextParts.push(`- ${key}: ${value}`)
      })
    }

    if (data.calculatorResult && Object.keys(data.calculatorResult).length > 0) {
      contextParts.push(`Results:`)
      Object.entries(data.calculatorResult).forEach(([key, value]) => {
        contextParts.push(`- ${key}: ${value}`)
      })
    }
  }

  // Profile data
  if (data.profile) {
    const p = data.profile
    contextParts.push(`\n### User Profile`)
    if (p.firstName) contextParts.push(`- Name: ${p.firstName} ${p.lastName || ''}`.trim())
    if (p.province) contextParts.push(`- Province: ${p.province}`)
    if (p.employmentType) contextParts.push(`- Employment: ${p.employmentType}`)
    if (p.income) contextParts.push(`- Income: $${p.income.toLocaleString()}`)
    if (p.rrspRoom) contextParts.push(`- RRSP Room: $${p.rrspRoom.toLocaleString()}`)
    if (p.tfsaRoom) contextParts.push(`- TFSA Room: $${p.tfsaRoom.toLocaleString()}`)
  }

  // Scanned document
  if (data.scannedDocument) {
    const doc = data.scannedDocument
    contextParts.push(`\n### Scanned Document`)
    contextParts.push(`- Type: ${doc.documentType}`)
    if (doc.taxYear) contextParts.push(`- Tax Year: ${doc.taxYear}`)
    if (doc.issuerName) contextParts.push(`- Issuer: ${doc.issuerName}`)
    contextParts.push(`- Summary: ${doc.summary}`)
    if (doc.keyFields && Object.keys(doc.keyFields).length > 0) {
      contextParts.push(`- Key Fields:`)
      Object.entries(doc.keyFields).forEach(([key, value]) => {
        contextParts.push(`  - ${key}: ${value}`)
      })
    }
  }

  contextParts.push(`\n[END PAGE CONTEXT]`)
  contextParts.push(`\nUse this context to provide personalized, specific advice. Reference the actual numbers and data shown above when relevant.`)

  return contextParts.join('\n')
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const userProfile = await getUserProfileFromToken(authHeader)

  try {
    const body = await request.json()
    const { message, pageContext, conversationHistory = [] } = body

    // Sanitize the query
    const { isValid, sanitizedQuery, rejectionReason } = sanitizeQuery(message)

    if (!isValid) {
      const encoder = new TextEncoder()
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', message: rejectionReason })}\n\n`))
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`))
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

    // Build page context string
    const pageContextString = buildPageContextString(pageContext)

    // Validate conversation history
    const validHistory: ConversationMessage[] = Array.isArray(conversationHistory)
      ? conversationHistory.filter(
          (msg: any) =>
            msg &&
            typeof msg.role === 'string' &&
            (msg.role === 'user' || msg.role === 'assistant') &&
            typeof msg.content === 'string'
        )
      : []

    console.log(`[AI-SIDEBAR] Question: "${sanitizedQuery.slice(0, 100)}..." (page: ${pageContext?.pageName || 'unknown'})`)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const sendSSE = (type: string, data: any) => {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type, ...data })}\n\n`))
          } catch (e) {
            console.error('SSE error:', e)
          }
        }

        try {
          // Enrich query with profile context
          const enrichedQuery = enrichQueryForSearch(sanitizedQuery, userProfile)

          // Retrieve context from RAG
          const searchResults = await retrieveContext({
            question: enrichedQuery,
            conversationHistory: validHistory,
          })

          console.log(`[AI-SIDEBAR] Found ${searchResults.length} relevant chunks`)

          // Check if we have enough context
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

          if (!preflight.canProceed && !pageContext) {
            // Only fall back if we have no page context either
            sendSSE('chunk', { content: preflight.earlyResponse || "I couldn't find relevant information. Could you try rephrasing your question?" })
            sendSSE('done', {})
            controller.close()
            return
          }

          // Build the full query with page context for sidebar-aware responses
          const sidebarInstructions = pageContext
            ? `\n\n[SIDEBAR ASSISTANT INSTRUCTIONS]
You are a helpful Canadian tax assistant embedded in a sidebar. You can see what the user is currently viewing on the page. Use this context to provide personalized, specific advice.

Key behaviors:
- Reference the actual data you can see (their income, tax situation, opportunities, etc.)
- Be concise - this is a sidebar chat, not a full article
- Be proactive in suggesting relevant actions based on what you see
- If they're on a calculator, explain results and suggest optimizations
- If they're on Command Center, help them understand their tax position
- Always be encouraging and actionable

IMPORTANT: Keep responses relatively brief (2-4 paragraphs max) since this is a sidebar conversation.
[END SIDEBAR INSTRUCTIONS]`
            : ''

          // Generate response with page context included
          await taxGenerator.generateStream(
            {
              query: sanitizedQuery + pageContextString + sidebarInstructions,
              profile: userProfile,
              conversationHistory: validHistory,
              searchResults: preflight.canProceed ? searchResults.map((r) => ({
                score: r.score,
                content: r.chunk.text,
                metadata: {
                  source_title: r.chunk.source_title,
                  source_url: r.chunk.source_url,
                  source_type: r.chunk.source_type,
                },
              })) : [], // Empty if no good RAG results, but we still have page context
            },
            (type, data) => {
              // Transform the SSE format for sidebar
              if (type === 'chunk') {
                sendSSE('chunk', { content: data.content })
              } else if (type === 'error') {
                sendSSE('error', { message: data.message })
              } else if (type === 'done') {
                sendSSE('done', {})
              }
              // Ignore status and metadata for sidebar (keep it simpler)
            }
          )

          console.log(`[AI-SIDEBAR] Response streamed successfully`)
          controller.close()
        } catch (error) {
          console.error('[AI-SIDEBAR] Error:', error)
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
    console.error('[AI-SIDEBAR] Error processing message:', error)
    return Response.json(
      {
        error: 'Failed to process message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const maxDuration = 60
