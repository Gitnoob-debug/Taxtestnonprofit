/**
 * Tax Slip Scanner API
 * High-accuracy OCR for T4, T5, and other Canadian tax slips
 * Supports both images and PDFs with field-level validation
 */

import { NextRequest } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

// High-accuracy extraction prompt - very specific about Canadian tax slip formats
const EXTRACTION_PROMPT = `You are an expert Canadian tax document OCR system with 99.9% accuracy requirements.
This is for ACTUAL TAX FILING - accuracy is CRITICAL. Every number must be EXACT.

CRITICAL ACCURACY RULES:
1. Extract EXACT numbers as shown - never round, estimate, or guess
2. If a value is unclear, mark confidence as "low" and include in issues
3. Double-check all numbers - a single digit error can cause major tax problems
4. Return null for any field you cannot read with HIGH confidence
5. Format ALL currency as plain numbers (no $ or commas): 65000.00 not $65,000
6. Format SIN as XXX-XXX-XXX with dashes
7. Format dates as YYYY-MM-DD

DOCUMENT IDENTIFICATION:
- T4: "Statement of Remuneration Paid" - has Box 14 (employment income), Box 22 (tax deducted)
- T5: "Statement of Investment Income" - has Box 13 (interest), Box 24/25 (dividends)
- T3: "Statement of Trust Income" - trust/mutual fund distributions
- T4A: Pension/retirement income, scholarships, other income
- T5008: Securities transactions (buy/sell)
- NOA: Notice of Assessment from CRA - contains RRSP room, refund/balance owing, total income assessed

FOR NOTICE OF ASSESSMENT (NOA) - Extract these KEY fields:
- Tax year the assessment is for
- Total income assessed (line 15000)
- Net income (line 23600)
- Taxable income (line 26000)
- Total tax payable
- Total credits
- Refund OR Balance owing (the final amount - CRITICAL)
- RRSP/PRPP deduction limit for next year (VERY IMPORTANT for planning)
- Unused RRSP contributions available to deduct
- Any amounts owing or carried forward
- Home Buyers' Plan (HBP) balance if shown
- Lifelong Learning Plan (LLP) balance if shown

FOR T4 SLIPS - Extract these boxes EXACTLY:
- Employer name (top of slip)
- Box 10: Province of employment (2-letter code)
- Box 12: SIN (format: XXX-XXX-XXX)
- Box 14: Employment income (THIS IS THE KEY NUMBER)
- Box 16: Employee's CPP contributions
- Box 17: Employee's QPP contributions (Quebec only)
- Box 18: Employee's EI premiums
- Box 20: RPP contributions
- Box 22: Income tax deducted (IMPORTANT - this is your withholding)
- Box 24: EI insurable earnings
- Box 26: CPP/QPP pensionable earnings
- Box 44: Union dues
- Box 46: Charitable donations through payroll
- Box 52: Pension adjustment
- Tax year (usually shown at top)

FOR T5 SLIPS - Extract these boxes:
- Payer name (financial institution)
- Box 10: Actual amount of dividends other than eligible
- Box 11: Taxable amount of dividends other than eligible
- Box 13: Interest from Canadian sources
- Box 14: Other income from Canadian sources
- Box 24: Actual amount of eligible dividends
- Box 25: Taxable amount of eligible dividends
- Box 26: Dividend tax credit for eligible dividends

RESPONSE FORMAT (JSON only, no markdown):

For T4/T5/T3/T4A slips:
{
  "slipType": "T4",
  "confidence": "high" | "medium" | "low",
  "taxYear": 2024,
  "issuerName": "Employer/Payer Name",
  "extractedFields": {
    "box14_employmentIncome": 65432.10,
    "box16_cpp": 3867.50,
    "box18_ei": 1002.45,
    "box22_taxDeducted": 12543.00
  },
  "formFieldMapping": {
    "employerName": "Company Name Inc.",
    "employmentIncome": 65432.10,
    "taxDeducted": 12543.00,
    "cppDeducted": 3867.50,
    "eiDeducted": 1002.45
  },
  "fieldConfidence": { ... },
  "issues": [],
  "rawTextExtracted": "Key text"
}

For NOA (Notice of Assessment) - EXTRACT ALL VALUES:
{
  "slipType": "NOA",
  "confidence": "high",
  "taxYear": 2023,
  "issuerName": "Canada Revenue Agency",
  "extractedFields": {
    "totalIncome": 75000.00,
    "netIncome": 68000.00,
    "taxableIncome": 65000.00,
    "totalTaxPayable": 12000.00,
    "totalCredits": 2500.00,
    "refundOrOwing": 1500.00,
    "isRefund": true,
    "rrspDeductionLimit": 15000.00,
    "unusedRrspContributions": 3000.00,
    "hbpBalance": 0,
    "llpBalance": 0
  },
  "formFieldMapping": {
    "totalIncome": 75000.00,
    "netIncome": 68000.00,
    "taxableIncome": 65000.00,
    "refundOwing": 1500.00,
    "isRefund": true,
    "rrspRoom": 15000.00,
    "unusedRrsp": 3000.00
  },
  "fieldConfidence": { ... },
  "issues": [],
  "rawTextExtracted": "Summary of your 2023 assessment..."
}`

interface ScanResult {
  slipType: string
  confidence: 'high' | 'medium' | 'low'
  taxYear: number | null
  issuerName: string | null
  extractedFields: Record<string, any>
  formFieldMapping: Record<string, any>
  fieldConfidence?: Record<string, string>
  issues: string[]
  rawTextExtracted?: string
}

// Analyze PDF using OpenRouter's file parser with mistral-ocr for scanned documents
async function analyzePDF(buffer: ArrayBuffer): Promise<ScanResult> {
  const base64 = Buffer.from(buffer).toString('base64')

  console.log('[SCAN-SLIP] Sending PDF to OpenRouter with mistral-ocr plugin...')

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Slip Scanner'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: EXTRACTION_PROMPT
          },
          {
            type: 'file',
            file: {
              filename: 'tax-slip.pdf',
              file_data: `data:application/pdf;base64,${base64}`
            }
          }
        ]
      }],
      // Use mistral-ocr plugin for high-accuracy OCR on scanned tax documents
      plugins: [
        {
          id: 'file-parser',
          pdf: {
            engine: 'mistral-ocr' // Best for scanned documents like tax slips
          }
        }
      ],
      max_tokens: 3000,
      temperature: 0
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[SCAN-SLIP] PDF API error:', response.status, errorText)

    // Try fallback with pdf-text engine (free, works for text-based PDFs)
    console.log('[SCAN-SLIP] Retrying with pdf-text engine...')
    const fallbackResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://taxradar.ca',
        'X-Title': 'Tax Radar Slip Scanner'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: EXTRACTION_PROMPT
            },
            {
              type: 'file',
              file: {
                filename: 'tax-slip.pdf',
                file_data: `data:application/pdf;base64,${base64}`
              }
            }
          ]
        }],
        plugins: [
          {
            id: 'file-parser',
            pdf: {
              engine: 'pdf-text' // Fallback: free option for text-based PDFs
            }
          }
        ],
        max_tokens: 3000,
        temperature: 0
      })
    })

    if (!fallbackResponse.ok) {
      const fallbackError = await fallbackResponse.text()
      console.error('[SCAN-SLIP] PDF fallback also failed:', fallbackResponse.status, fallbackError)
      throw new Error('PDF processing failed. Please try uploading a clearer image or photo of your tax slip.')
    }

    const fallbackData = await fallbackResponse.json()
    return parseAIResponse(fallbackData.choices?.[0]?.message?.content || '')
  }

  const data = await response.json()
  return parseAIResponse(data.choices?.[0]?.message?.content || '')
}

// Call AI for image analysis
async function analyzeImage(base64: string, mimeType: string): Promise<ScanResult> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Slip Scanner'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-3.5-sonnet', // Best for vision accuracy
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${base64}` }
          },
          { type: 'text', text: EXTRACTION_PROMPT }
        ]
      }],
      max_tokens: 3000,
      temperature: 0 // Zero temp for maximum accuracy
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[SCAN-SLIP] Vision API error:', response.status, errorText)
    throw new Error('Failed to analyze image')
  }

  const data = await response.json()
  return parseAIResponse(data.choices?.[0]?.message?.content || '')
}

// Parse AI response into structured result
function parseAIResponse(content: string): ScanResult {
  try {
    // Find JSON in response
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const result = JSON.parse(jsonMatch[0])

    // Validate required fields
    if (!result.slipType) {
      result.slipType = 'unknown'
    }
    if (!result.confidence) {
      result.confidence = 'low'
    }
    if (!result.formFieldMapping) {
      result.formFieldMapping = {}
    }
    if (!result.issues) {
      result.issues = []
    }

    return result as ScanResult
  } catch (error) {
    console.error('[SCAN-SLIP] Parse error:', error, 'Content:', content.substring(0, 500))
    throw new Error('Failed to parse document data')
  }
}

// Generate user-friendly confirmation message
function generateConfirmationMessage(result: ScanResult): string {
  const fields = result.formFieldMapping
  const confidence = result.fieldConfidence || {}
  const parts: string[] = []

  // Header based on slip type
  if (result.slipType === 'T4') {
    parts.push(`📄 **${result.taxYear || ''} T4 Slip** from **${result.issuerName || 'your employer'}**`)
    parts.push('')
    parts.push('**Extracted Information:**')

    if (fields.employmentIncome !== undefined && fields.employmentIncome !== null) {
      const conf = confidence.employmentIncome === 'low' ? ' ⚠️' : ''
      parts.push(`• Employment Income (Box 14): **$${formatNumber(fields.employmentIncome)}**${conf}`)
    }
    if (fields.taxDeducted !== undefined && fields.taxDeducted !== null) {
      const conf = confidence.taxDeducted === 'low' ? ' ⚠️' : ''
      parts.push(`• Tax Deducted (Box 22): **$${formatNumber(fields.taxDeducted)}**${conf}`)
    }
    if (fields.cppDeducted !== undefined && fields.cppDeducted !== null) {
      const conf = confidence.cppDeducted === 'low' ? ' ⚠️' : ''
      parts.push(`• CPP Contributions (Box 16): **$${formatNumber(fields.cppDeducted)}**${conf}`)
    }
    if (fields.eiDeducted !== undefined && fields.eiDeducted !== null) {
      const conf = confidence.eiDeducted === 'low' ? ' ⚠️' : ''
      parts.push(`• EI Premiums (Box 18): **$${formatNumber(fields.eiDeducted)}**${conf}`)
    }

  } else if (result.slipType === 'T5') {
    parts.push(`📄 **${result.taxYear || ''} T5 Slip** from **${result.issuerName || 'your financial institution'}**`)
    parts.push('')
    parts.push('**Extracted Information:**')

    if (fields.interestIncome !== undefined && fields.interestIncome !== null) {
      parts.push(`• Interest Income (Box 13): **$${formatNumber(fields.interestIncome)}**`)
    }
    if (fields.dividendIncome !== undefined && fields.dividendIncome !== null) {
      parts.push(`• Eligible Dividends (Box 25): **$${formatNumber(fields.dividendIncome)}**`)
    }

  } else if (result.slipType === 'T3') {
    parts.push(`📄 **${result.taxYear || ''} T3 Slip** from **${result.issuerName || 'trust/fund'}**`)
    parts.push('')
    parts.push('**Extracted Information:**')

    if (fields.capitalGains !== undefined && fields.capitalGains !== null) {
      parts.push(`• Capital Gains (Box 21): **$${formatNumber(fields.capitalGains)}**`)
    }
    if (fields.dividendIncome !== undefined && fields.dividendIncome !== null) {
      parts.push(`• Dividends: **$${formatNumber(fields.dividendIncome)}**`)
    }

  } else if (result.slipType === 'NOA') {
    parts.push(`📄 **${result.taxYear || ''} Notice of Assessment** from CRA`)
    parts.push('')
    parts.push('**Key Information:**')

    // Show refund/balance owing prominently
    if (fields.refundOwing !== undefined && fields.refundOwing !== null) {
      if (fields.isRefund || fields.refundOwing > 0) {
        parts.push(`✅ **Refund: $${formatNumber(Math.abs(fields.refundOwing))}**`)
      } else {
        parts.push(`⚠️ **Balance Owing: $${formatNumber(Math.abs(fields.refundOwing))}**`)
      }
    }

    parts.push('')
    parts.push('**Income Summary:**')
    if (fields.totalIncome !== undefined && fields.totalIncome !== null) {
      parts.push(`• Total Income: **$${formatNumber(fields.totalIncome)}**`)
    }
    if (fields.netIncome !== undefined && fields.netIncome !== null) {
      parts.push(`• Net Income: **$${formatNumber(fields.netIncome)}**`)
    }
    if (fields.taxableIncome !== undefined && fields.taxableIncome !== null) {
      parts.push(`• Taxable Income: **$${formatNumber(fields.taxableIncome)}**`)
    }

    parts.push('')
    parts.push('**RRSP Information (Important for Next Year):**')
    if (fields.rrspRoom !== undefined && fields.rrspRoom !== null) {
      parts.push(`• RRSP Deduction Limit: **$${formatNumber(fields.rrspRoom)}**`)
    }
    if (fields.unusedRrsp !== undefined && fields.unusedRrsp !== null) {
      parts.push(`• Unused RRSP Contributions: **$${formatNumber(fields.unusedRrsp)}**`)
    }

    // HBP/LLP if present
    if (fields.hbpBalance !== undefined && fields.hbpBalance > 0) {
      parts.push(`• Home Buyers' Plan Balance: **$${formatNumber(fields.hbpBalance)}**`)
    }
    if (fields.llpBalance !== undefined && fields.llpBalance > 0) {
      parts.push(`• Lifelong Learning Plan Balance: **$${formatNumber(fields.llpBalance)}**`)
    }

  } else {
    parts.push(`📄 **${result.slipType}** document detected`)
    parts.push('')
    const fieldCount = Object.keys(fields).filter(k => fields[k] !== null).length
    parts.push(`Found ${fieldCount} data fields.`)
  }

  // Confidence warning
  if (result.confidence === 'low') {
    parts.push('')
    parts.push('⚠️ **Low confidence** - please verify all numbers carefully')
  } else if (result.confidence === 'medium') {
    parts.push('')
    parts.push('⚡ Some values may need verification')
  }

  // Issues
  if (result.issues && result.issues.length > 0) {
    parts.push('')
    parts.push('**Notes:** ' + result.issues.join('; '))
  }

  parts.push('')
  parts.push('**Does this look correct?** Click "Yes" to add to your return, or "No" to try again.')

  return parts.join('\n')
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return Response.json({ error: 'AI service not configured' }, { status: 503 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    const isPDF = file.type === 'application/pdf'
    const isImage = imageTypes.includes(file.type)

    if (!isImage && !isPDF) {
      return Response.json({
        error: 'Please upload an image (PNG, JPG, WEBP) or PDF file'
      }, { status: 400 })
    }

    // 15MB limit
    if (file.size > 15 * 1024 * 1024) {
      return Response.json({ error: 'File must be under 15MB' }, { status: 400 })
    }

    console.log(`[SCAN-SLIP] Processing: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(1)}KB)`)

    const bytes = await file.arrayBuffer()
    let result: ScanResult

    if (isPDF) {
      // Analyze PDF directly with Claude
      console.log('[SCAN-SLIP] Analyzing PDF directly...')
      result = await analyzePDF(bytes)
    } else {
      // Analyze image directly
      console.log('[SCAN-SLIP] Analyzing image...')
      const base64 = Buffer.from(bytes).toString('base64')
      const mimeType = file.type === 'image/jpg' ? 'image/jpeg' : file.type
      result = await analyzeImage(base64, mimeType)
    }

    console.log(`[SCAN-SLIP] Result: ${result.slipType} (${result.confidence}) - ${Object.keys(result.formFieldMapping || {}).length} fields`)

    // Return structured result
    return Response.json({
      success: true,
      slipType: result.slipType,
      confidence: result.confidence,
      taxYear: result.taxYear,
      issuerName: result.issuerName,
      extractedFields: result.extractedFields,
      formFields: result.formFieldMapping,
      fieldConfidence: result.fieldConfidence || {},
      issues: result.issues || [],
      confirmationMessage: generateConfirmationMessage(result)
    })

  } catch (err) {
    console.error('[SCAN-SLIP] Error:', err)
    return Response.json({
      error: err instanceof Error ? err.message : 'Failed to scan document',
      details: 'Please try again with a clearer image or different file'
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 120 // 2 minutes for PDF processing
