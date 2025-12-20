import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

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
    // Get last 5 conversations with their first user message
    const { data: conversations, error: convError } = await supabaseAdmin
      .from('conversations')
      .select('id, title, created_at, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(10)

    if (convError) throw convError

    // For each conversation, get the first user message to understand the topic
    const conversationsWithTopics = await Promise.all(
      (conversations || []).map(async (conv) => {
        const { data: messages } = await supabaseAdmin!
          .from('messages')
          .select('content, role')
          .eq('conversation_id', conv.id)
          .eq('role', 'user')
          .order('created_at', { ascending: true })
          .limit(3)

        // Extract key topics from user messages
        const userQuestions = (messages || []).map(m => m.content)

        return {
          id: conv.id,
          title: conv.title,
          created_at: conv.created_at,
          updated_at: conv.updated_at,
          topics: extractTopics(userQuestions)
        }
      })
    )

    return Response.json({
      conversations: conversationsWithTopics.filter(c => c.topics.length > 0).slice(0, 5)
    })
  } catch (err) {
    console.error('Error getting recent conversations:', err)
    return Response.json({ error: 'Failed to get conversations' }, { status: 500 })
  }
}

// Simple topic extraction from user questions
function extractTopics(questions: string[]): string[] {
  const topics: string[] = []
  const combined = questions.join(' ').toLowerCase()

  // Tax-related topic detection
  const topicPatterns: Array<{pattern: RegExp, topic: string}> = [
    { pattern: /rrsp|registered retirement/i, topic: 'RRSP' },
    { pattern: /tfsa|tax.free savings/i, topic: 'TFSA' },
    { pattern: /fhsa|first home savings/i, topic: 'FHSA' },
    { pattern: /capital gain/i, topic: 'Capital Gains' },
    { pattern: /dividend/i, topic: 'Dividends' },
    { pattern: /rental|landlord|tenant/i, topic: 'Rental Income' },
    { pattern: /self.employ|freelanc|business|sole proprietor/i, topic: 'Self-Employment' },
    { pattern: /home office/i, topic: 'Home Office' },
    { pattern: /medical expense/i, topic: 'Medical Expenses' },
    { pattern: /child care|daycare/i, topic: 'Childcare' },
    { pattern: /charitable|donation/i, topic: 'Donations' },
    { pattern: /tuition|education|student/i, topic: 'Education' },
    { pattern: /cpp|canada pension/i, topic: 'CPP' },
    { pattern: /oas|old age security/i, topic: 'OAS' },
    { pattern: /ei|employment insurance/i, topic: 'EI' },
    { pattern: /hst|gst/i, topic: 'GST/HST' },
    { pattern: /incorporat/i, topic: 'Incorporation' },
    { pattern: /crypto|bitcoin|ethereum/i, topic: 'Cryptocurrency' },
    { pattern: /foreign income|us income/i, topic: 'Foreign Income' },
    { pattern: /principal residence|home sale/i, topic: 'Principal Residence' },
    { pattern: /moving expense/i, topic: 'Moving Expenses' },
    { pattern: /pension income splitting/i, topic: 'Pension Splitting' },
    { pattern: /spousal/i, topic: 'Spousal Tax' },
    { pattern: /refund/i, topic: 'Tax Refund' },
    { pattern: /owing|owe|payment/i, topic: 'Tax Owing' },
    { pattern: /deadline|due date|when.*file/i, topic: 'Tax Deadlines' },
    { pattern: /audit|cra/i, topic: 'CRA' },
    { pattern: /t4|t5|tax slip/i, topic: 'Tax Slips' },
  ]

  for (const { pattern, topic } of topicPatterns) {
    if (pattern.test(combined) && !topics.includes(topic)) {
      topics.push(topic)
    }
  }

  return topics.slice(0, 3)
}
