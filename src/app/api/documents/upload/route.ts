import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

// Document type detection patterns
const DOCUMENT_PATTERNS = {
  T4: /T4\s*(Statement|Slip)|Statement of Remuneration|employment income/i,
  T5: /T5\s*(Statement|Slip)|Statement of Investment Income|investment income/i,
  T4A: /T4A\s*(Statement|Slip)|pension|annuity|other income/i,
  T4E: /T4E\s*(Statement|Slip)|Employment Insurance/i,
  T3: /T3\s*(Statement|Slip)|Statement of Trust Income/i,
  NOA: /Notice of Assessment|Assessment for \d{4}/i,
  T2202: /T2202|Tuition|Education|Textbook/i,
  receipt: /receipt|invoice|payment|donation/i,
}

interface ExtractedData {
  documentType: string
  taxYear: number | null
  issuerName: string | null
  summary: string
  keyFields: Record<string, any>
  confidence: 'high' | 'medium' | 'low'
}

async function analyzeDocumentWithVision(
  base64Image: string,
  mimeType: string,
  fileName: string
): Promise<ExtractedData> {
  const systemPrompt = `You are a Canadian tax document analyzer. Analyze the uploaded document and extract key information.

Your task:
1. Identify the document type (T4, T5, T4A, T4E, T3, NOA, T2202, receipt, or other)
2. Extract the tax year
3. Identify the issuer/employer name
4. Extract key financial figures
5. Provide a brief summary

For tax slips (T4, T5, etc.), extract box numbers and their values.
For receipts, extract the total amount, date, and purpose.
For NOA (Notice of Assessment), extract refund/balance owing, RRSP room, etc.

IMPORTANT: Do NOT include any sensitive information like SIN numbers in your response. Mask them as XXX-XXX-XXX.

Respond in JSON format:
{
  "documentType": "T4" | "T5" | "T4A" | "T4E" | "T3" | "NOA" | "T2202" | "receipt" | "other",
  "taxYear": 2024,
  "issuerName": "Company Name",
  "summary": "Brief description of the document",
  "keyFields": {
    "box14_employmentIncome": 65000,
    "box22_incomeTaxDeducted": 12000,
    ...
  },
  "confidence": "high" | "medium" | "low"
}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Document Analysis',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Please analyze this tax document (filename: ${fileName}) and extract the key information.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:${mimeType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[VISION] API error:', error)
    throw new Error('Failed to analyze document with AI')
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || ''

  // Parse JSON from response
  try {
    // Extract JSON from the response (it might be wrapped in markdown code blocks)
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        documentType: parsed.documentType || 'other',
        taxYear: parsed.taxYear || null,
        issuerName: parsed.issuerName || null,
        summary: parsed.summary || 'Document analyzed successfully',
        keyFields: parsed.keyFields || {},
        confidence: parsed.confidence || 'medium',
      }
    }
  } catch (parseError) {
    console.error('[VISION] Failed to parse JSON response:', parseError)
  }

  // Fallback if JSON parsing fails
  return {
    documentType: 'other',
    taxYear: null,
    issuerName: null,
    summary: content.slice(0, 500),
    keyFields: {},
    confidence: 'low',
  }
}

async function analyzePDFWithVision(
  base64PDF: string,
  fileName: string
): Promise<ExtractedData> {
  // For PDFs, we'll use Claude's native PDF support
  const systemPrompt = `You are a Canadian tax document analyzer. Analyze the uploaded PDF document and extract key information.

Your task:
1. Identify the document type (T4, T5, T4A, T4E, T3, NOA, T2202, receipt, or other)
2. Extract the tax year
3. Identify the issuer/employer name
4. Extract key financial figures
5. Provide a brief summary

For tax slips (T4, T5, etc.), extract box numbers and their values.
For receipts, extract the total amount, date, and purpose.
For NOA (Notice of Assessment), extract refund/balance owing, RRSP room, etc.

IMPORTANT: Do NOT include any sensitive information like SIN numbers in your response. Mask them as XXX-XXX-XXX.

Respond in JSON format:
{
  "documentType": "T4" | "T5" | "T4A" | "T4E" | "T3" | "NOA" | "T2202" | "receipt" | "other",
  "taxYear": 2024,
  "issuerName": "Company Name",
  "summary": "Brief description of the document",
  "keyFields": {
    "box14_employmentIncome": 65000,
    "box22_incomeTaxDeducted": 12000,
    ...
  },
  "confidence": "high" | "medium" | "low"
}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Document Analysis',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Please analyze this tax document (filename: ${fileName}) and extract the key information.`,
            },
            {
              type: 'file',
              file: {
                filename: fileName,
                file_data: `data:application/pdf;base64,${base64PDF}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
      temperature: 0.1,
    }),
  })

  if (!response.ok) {
    // Fallback: try as image (some PDFs can be processed this way)
    console.log('[VISION] PDF direct upload failed, trying image approach...')
    return analyzeDocumentWithVision(base64PDF, 'application/pdf', fileName)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || ''

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return {
        documentType: parsed.documentType || 'other',
        taxYear: parsed.taxYear || null,
        issuerName: parsed.issuerName || null,
        summary: parsed.summary || 'Document analyzed successfully',
        keyFields: parsed.keyFields || {},
        confidence: parsed.confidence || 'medium',
      }
    }
  } catch (parseError) {
    console.error('[VISION] Failed to parse PDF JSON response:', parseError)
  }

  return {
    documentType: 'other',
    taxYear: null,
    issuerName: null,
    summary: content.slice(0, 500),
    keyFields: {},
    confidence: 'low',
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')

    if (!supabaseAdmin) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const analyzeOnly = formData.get('analyzeOnly') === 'true'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 })
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file type. Allowed: PDF, JPEG, PNG, WebP, GIF'
      }, { status: 400 })
    }

    console.log(`[DOCUMENTS] Processing ${file.name} (${file.type}, ${file.size} bytes) for user ${user.id}`)

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    // Analyze with Claude Vision
    let extractedData: ExtractedData

    if (file.type === 'application/pdf') {
      extractedData = await analyzePDFWithVision(base64, file.name)
    } else {
      extractedData = await analyzeDocumentWithVision(base64, file.type, file.name)
    }

    console.log(`[DOCUMENTS] Extracted: ${extractedData.documentType}, Year: ${extractedData.taxYear}, Confidence: ${extractedData.confidence}`)

    // If analyzeOnly, return just the extraction results (for chat preview)
    if (analyzeOnly) {
      return NextResponse.json({
        success: true,
        analysis: extractedData,
      })
    }

    // Upload to Supabase Storage
    const fileExt = file.name.split('.').pop() || 'bin'
    const timestamp = Date.now()
    const storagePath = `${user.id}/${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    const { error: uploadError } = await supabaseAdmin.storage
      .from('user-documents')
      .upload(storagePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('[DOCUMENTS] Storage upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
    }

    // Save metadata to database
    const { data: document, error: dbError } = await supabaseAdmin
      .from('user_documents')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
        storage_path: storagePath,
        document_type: extractedData.documentType,
        tax_year: extractedData.taxYear,
        issuer_name: extractedData.issuerName,
        extracted_data: extractedData.keyFields,
        ai_summary: extractedData.summary,
        processing_status: 'completed',
      })
      .select()
      .single()

    if (dbError) {
      console.error('[DOCUMENTS] Database error:', dbError)
      // Try to clean up the uploaded file
      await supabaseAdmin.storage.from('user-documents').remove([storagePath])
      return NextResponse.json({ error: 'Failed to save document' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      document: {
        id: document.id,
        fileName: document.file_name,
        documentType: document.document_type,
        taxYear: document.tax_year,
        issuerName: document.issuer_name,
        summary: document.ai_summary,
        extractedData: document.extracted_data,
        confidence: extractedData.confidence,
        createdAt: document.created_at,
      },
    })
  } catch (error) {
    console.error('[DOCUMENTS] Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process document' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
export const maxDuration = 60
