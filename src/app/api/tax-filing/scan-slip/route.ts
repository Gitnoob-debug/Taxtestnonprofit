/**
 * Tax Slip Scanner API
 * Specialized OCR for T4, T5, and other tax slips
 * Returns structured data ready for form auto-fill
 */

import { NextRequest } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

// Structured extraction prompt for tax slips
const EXTRACTION_PROMPT = `You are an expert Canadian tax document OCR system. Your job is to extract EXACT values from tax slips.

CRITICAL RULES:
1. Extract EXACT numbers as shown on the document - don't round or estimate
2. Return amounts as numbers (no $ signs or commas)
3. Format SIN as XXX-XXX-XXX (with dashes)
4. If a field is blank or not visible, return null
5. Be EXTREMELY precise - this data goes directly into tax forms

For T4 slips, extract:
- employerName: Company name at top
- employerAddress: Full address
- taxYear: Year shown (usually top right)
- box14_employmentIncome: Employment income
- box16_cpp: CPP contributions
- box17_qpp: QPP contributions (Quebec only)
- box18_ei: EI premiums
- box20_rpp: RPP contributions
- box22_taxDeducted: Income tax deducted
- box24_eiInsurableEarnings: EI insurable earnings
- box26_cppPensionableEarnings: CPP pensionable earnings
- box44_unionDues: Union dues
- box46_charitableDonations: Charitable donations (if shown)
- box52_pensionAdjustment: Pension adjustment
- sin: Social Insurance Number (mask middle digits if worried, but we need format)

For T5 slips, extract:
- payerName: Financial institution name
- taxYear: Year
- box10_actualDividends: Actual amount of dividends other than eligible
- box11_taxableDividends: Taxable amount of dividends other than eligible
- box13_interestIncome: Interest from Canadian sources
- box14_otherIncome: Other income
- box24_actualEligibleDividends: Actual amount of eligible dividends
- box25_taxableEligibleDividends: Taxable amount of eligible dividends
- box26_dividendTaxCredit: Dividend tax credit for eligible dividends

For T3 slips, extract:
- trustName: Name of trust/fund
- taxYear: Year
- box21_capitalGains: Capital gains
- box23_actualDividends: Actual amount of eligible dividends
- box25_foreignIncome: Foreign non-business income
- box26_foreignTaxPaid: Foreign non-business tax paid
- box32_otherIncome: Other income
- box42_returnOfCapital: Return of capital
- box49_actualDividends: Actual amount of dividends other than eligible
- box50_taxableDividends: Taxable amount of dividends other than eligible

RESPOND WITH JSON ONLY:
{
  "slipType": "T4" | "T5" | "T3" | "T4A" | "T5008" | "unknown",
  "confidence": "high" | "medium" | "low",
  "taxYear": 2024,
  "issuerName": "...",
  "extractedFields": {
    // All fields with values extracted
  },
  "formFieldMapping": {
    // Map to our form fields
    "firstName": null,
    "lastName": null,
    "employerName": "...",
    "employmentIncome": 65000,
    "taxDeducted": 12000,
    "cppDeducted": 3800,
    "eiDeducted": 1000,
    // etc - include all fields we can auto-fill
  },
  "issues": ["Any problems or unclear values"]
}`

interface ScanResult {
  slipType: string
  confidence: 'high' | 'medium' | 'low'
  taxYear: number | null
  issuerName: string | null
  extractedFields: Record<string, any>
  formFieldMapping: Record<string, any>
  issues: string[]
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
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf']
    if (!validTypes.includes(file.type)) {
      return Response.json({
        error: 'Please upload an image (PNG, JPG, WEBP) or PDF file'
      }, { status: 400 })
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      return Response.json({ error: 'File must be under 10MB' }, { status: 400 })
    }

    console.log(`[TAX-SLIP-SCAN] Processing: ${file.name} (${file.type})`)

    // Convert to base64
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    // Call vision API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://taxradar.ca',
        'X-Title': 'Tax Radar Slip Scanner'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:${file.type};base64,${base64}`
              }
            },
            { type: 'text', text: EXTRACTION_PROMPT }
          ]
        }],
        max_tokens: 2000,
        temperature: 0.1 // Low temp for accuracy
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('[TAX-SLIP-SCAN] API error:', error)
      return Response.json({ error: 'Failed to process image' }, { status: 500 })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    // Parse JSON response
    let result: ScanResult
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON in response')
      }
    } catch (e) {
      console.error('[TAX-SLIP-SCAN] Parse error:', e)
      return Response.json({
        error: 'Could not parse document',
        details: 'The image may be unclear or not a recognized tax slip'
      }, { status: 422 })
    }

    console.log(`[TAX-SLIP-SCAN] Result: ${result.slipType} (${result.confidence})`)

    // Return structured result
    return Response.json({
      success: true,
      slipType: result.slipType,
      confidence: result.confidence,
      taxYear: result.taxYear,
      issuerName: result.issuerName,
      extractedFields: result.extractedFields,
      formFields: result.formFieldMapping,
      issues: result.issues || [],
      // Generate confirmation message
      confirmationMessage: generateConfirmationMessage(result)
    })

  } catch (err) {
    console.error('[TAX-SLIP-SCAN] Error:', err)
    return Response.json({
      error: 'Failed to scan document',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

function generateConfirmationMessage(result: ScanResult): string {
  const fields = result.formFieldMapping
  const parts: string[] = []

  if (result.slipType === 'T4') {
    parts.push(`I found a **${result.taxYear || ''} T4** from **${result.issuerName || 'your employer'}**.`)
    parts.push('\nHere\'s what I extracted:')

    if (fields.employmentIncome) {
      parts.push(`- Employment Income (Box 14): **$${formatNumber(fields.employmentIncome)}**`)
    }
    if (fields.taxDeducted) {
      parts.push(`- Tax Deducted (Box 22): **$${formatNumber(fields.taxDeducted)}**`)
    }
    if (fields.cppDeducted) {
      parts.push(`- CPP Contributions (Box 16): **$${formatNumber(fields.cppDeducted)}**`)
    }
    if (fields.eiDeducted) {
      parts.push(`- EI Premiums (Box 18): **$${formatNumber(fields.eiDeducted)}**`)
    }
  } else if (result.slipType === 'T5') {
    parts.push(`I found a **${result.taxYear || ''} T5** from **${result.issuerName || 'your financial institution'}**.`)
    parts.push('\nHere\'s what I extracted:')

    if (fields.interestIncome) {
      parts.push(`- Interest Income (Box 13): **$${formatNumber(fields.interestIncome)}**`)
    }
    if (fields.dividendIncome) {
      parts.push(`- Eligible Dividends (Box 25): **$${formatNumber(fields.dividendIncome)}**`)
    }
  } else {
    parts.push(`I found a **${result.slipType}** document.`)
  }

  if (result.issues && result.issues.length > 0) {
    parts.push(`\n⚠️ Notes: ${result.issues.join(', ')}`)
  }

  parts.push('\n\n**Does this look correct?** I\'ll add it to your return.')

  return parts.join('\n')
}

function formatNumber(num: number): string {
  return num.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const runtime = 'nodejs'
export const maxDuration = 60
