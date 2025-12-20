import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

// Letter type detection patterns
const LETTER_PATTERNS = {
  notice_of_assessment: [
    /notice of assessment/i,
    /your.*assessment/i,
    /we have assessed your/i,
    /your refund/i,
    /balance owing/i,
    /T1.*processed/i
  ],
  notice_of_reassessment: [
    /notice of reassessment/i,
    /we have reassessed/i,
    /changes? to your/i,
    /adjusted your/i,
    /correction to/i
  ],
  request_for_information: [
    /request for information/i,
    /we need.*information/i,
    /please provide/i,
    /send us.*documents/i,
    /supporting documentation/i,
    /verify.*claim/i
  ],
  proposal_letter: [
    /proposal letter/i,
    /we are proposing/i,
    /proposed adjustment/i,
    /before we reassess/i,
    /if you agree/i
  ],
  collections: [
    /collection/i,
    /outstanding balance/i,
    /amount owing/i,
    /payment arrangement/i,
    /legal action/i,
    /garnishment/i,
    /we may take action/i
  ],
  audit_letter: [
    /audit/i,
    /examination/i,
    /review of your/i,
    /selected for review/i,
    /books and records/i
  ],
  t1_adjustment: [
    /t1 adjustment/i,
    /adjustment request/i,
    /your request.*processed/i
  ],
  gst_hst_notice: [
    /gst\/hst/i,
    /goods and services tax/i,
    /harmonized sales tax/i,
    /gst credit/i,
    /hst credit/i
  ],
  benefit_notice: [
    /canada child benefit/i,
    /ccb/i,
    /gst\/hst credit/i,
    /climate action/i,
    /benefit.*payment/i,
    /entitlement/i
  ],
  rrsp_overcontribution: [
    /rrsp.*over.?contribution/i,
    /excess.*rrsp/i,
    /contribution room/i,
    /t3012/i,
    /1% tax/i
  ]
}

// Detect letter type from text
function detectLetterType(text: string): string {
  for (const [type, patterns] of Object.entries(LETTER_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return type
      }
    }
  }
  return 'unknown'
}

// Extract deadline from text
function extractDeadline(text: string): string | null {
  // Common deadline patterns
  const patterns = [
    /within (\d+) days/i,
    /by ((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s*\d{4})/i,
    /deadline[:\s]+(\d{4}-\d{2}-\d{2})/i,
    /respond by[:\s]+(.+?)(?:\.|$)/i,
    /(\d{1,2}\/\d{1,2}\/\d{4})/,
    /no later than (.+?)(?:\.|$)/i
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match) {
      // If it's "within X days", calculate the date
      if (/within (\d+) days/i.test(match[0])) {
        const days = parseInt(match[1])
        const deadline = new Date()
        deadline.setDate(deadline.getDate() + days)
        return deadline.toISOString().split('T')[0]
      }

      // Try to parse the date
      try {
        const dateStr = match[1]
        const date = new Date(dateStr)
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0]
        }
      } catch {
        // Ignore parsing errors
      }
    }
  }

  // Default deadlines based on letter type
  return null
}

// Analyze letter content with Claude via OpenRouter
async function analyzeWithClaude(text: string, letterType: string): Promise<{
  summary: string
  explanation: string
  action_items: string[]
  draft_response: string | null
  severity: 'routine' | 'action_required' | 'urgent'
}> {
  const systemPrompt = `You are a Canadian tax expert helping regular people understand CRA (Canada Revenue Agency) letters.
Your job is to:
1. Explain what the letter means in plain, simple English (no jargon)
2. Identify if any action is needed and by when
3. Provide clear step-by-step guidance
4. If appropriate, draft a response letter

Be reassuring - most CRA letters are routine. Only escalate concern if it's actually serious.
Focus on being helpful and practical.`

  const userMessage = `Please analyze this CRA letter. The detected type is: ${letterType}

Letter content:
${text}

Respond in JSON format:
{
  "summary": "A 1-2 sentence summary of what this letter is about",
  "explanation": "A detailed but simple explanation of what this means for the taxpayer",
  "severity": "routine" | "action_required" | "urgent",
  "action_items": ["Step 1...", "Step 2..."],
  "needs_response": true/false,
  "draft_response": "If a response is needed, provide a draft letter. Otherwise null"
}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar CRA Letter Decoder'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 2000,
      temperature: 0.3
    })
  })

  if (!response.ok) {
    console.error('OpenRouter API error:', response.status, await response.text())
    throw new Error('Failed to analyze letter with AI')
  }

  const data = await response.json()

  try {
    const content = data.choices?.[0]?.message?.content
    if (content) {
      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          summary: parsed.summary || 'CRA correspondence requiring review',
          explanation: parsed.explanation || 'Please review the letter for details.',
          action_items: parsed.action_items || [],
          draft_response: parsed.draft_response || null,
          severity: parsed.severity || 'action_required'
        }
      }
    }
  } catch (err) {
    console.error('Failed to parse Claude response:', err)
  }

  // Fallback
  return {
    summary: 'CRA correspondence received',
    explanation: 'We detected this is a CRA letter but need more context to provide specific guidance. Please review the letter carefully and note any deadlines mentioned.',
    action_items: ['Review the letter carefully', 'Note any deadlines', 'Gather any requested documents'],
    draft_response: null,
    severity: 'action_required'
  }
}

export async function POST(request: NextRequest) {
  if (!supabaseAdmin) {
    return Response.json({ error: 'Service unavailable' }, { status: 503 })
  }

  const authHeader = request.headers.get('authorization')
  const user = await getUserFromToken(authHeader)

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to base64 for Claude Vision
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')
    const mimeType = file.type

    // Use Claude Vision via OpenRouter to extract text from the document
    let extractedText = ''
    const extractionPrompt = 'Please extract all text from this CRA (Canada Revenue Agency) letter. Include all important details like dates, amounts, reference numbers, and any deadlines mentioned. Preserve the structure as much as possible.'

    // Build the content array for OpenRouter vision request
    let messageContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = []

    if (mimeType === 'application/pdf') {
      // OpenRouter supports PDF as base64 data URL
      messageContent = [
        {
          type: 'image_url',
          image_url: {
            url: `data:${mimeType};base64,${base64}`
          }
        },
        {
          type: 'text',
          text: extractionPrompt
        }
      ]
    } else {
      // For images (PNG, JPEG, etc.)
      messageContent = [
        {
          type: 'image_url',
          image_url: {
            url: `data:${mimeType};base64,${base64}`
          }
        },
        {
          type: 'text',
          text: extractionPrompt
        }
      ]
    }

    const visionResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://taxradar.ca',
        'X-Title': 'Tax Radar CRA Letter Decoder'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
        max_tokens: 4000,
        temperature: 0.1
      })
    })

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text()
      console.error('Vision API error:', visionResponse.status, errorText)
      return Response.json({ error: 'Could not process document' }, { status: 400 })
    }

    const visionData = await visionResponse.json()
    extractedText = visionData.choices?.[0]?.message?.content || ''

    if (!extractedText) {
      return Response.json({ error: 'Could not extract text from document' }, { status: 400 })
    }

    // Detect letter type
    const letterType = detectLetterType(extractedText)

    // Extract deadline
    const deadline = extractDeadline(extractedText)

    // Analyze with Claude
    const analysis = await analyzeWithClaude(extractedText, letterType)

    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}/${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('cra-letters')
      .upload(fileName, Buffer.from(bytes), {
        contentType: mimeType,
        upsert: false
      })

    // Get public URL (or signed URL)
    let fileUrl = ''
    if (!uploadError) {
      const { data: urlData } = supabaseAdmin.storage
        .from('cra-letters')
        .getPublicUrl(fileName)
      fileUrl = urlData.publicUrl
    }

    // Save to database
    const { data: letter, error: dbError } = await supabaseAdmin
      .from('cra_letters')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_url: fileUrl,
        letter_type: letterType,
        severity: analysis.severity,
        deadline: deadline,
        summary: analysis.summary,
        explanation: analysis.explanation,
        action_items: analysis.action_items,
        draft_response: analysis.draft_response,
        extracted_text: extractedText,
        status: 'analyzed'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Return the analysis anyway, just without persistence
      return Response.json({
        letter: {
          id: 'temp-' + Date.now(),
          file_name: file.name,
          file_url: '',
          uploaded_at: new Date().toISOString(),
          letter_type: letterType,
          severity: analysis.severity,
          deadline: deadline,
          summary: analysis.summary,
          explanation: analysis.explanation,
          action_items: analysis.action_items,
          draft_response: analysis.draft_response,
          status: 'analyzed'
        }
      })
    }

    return Response.json({ letter })

  } catch (err) {
    console.error('Error analyzing CRA letter:', err)
    return Response.json({
      error: 'Failed to analyze letter',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
