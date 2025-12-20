import { NextRequest } from 'next/server'
import { supabaseAdmin, getUserFromToken } from '@/lib/server/supabase-admin'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!

// Comprehensive document type definitions with analysis prompts
const DOCUMENT_TYPES = {
  // Employment Income
  T4: {
    name: 'T4 - Statement of Remuneration Paid',
    category: 'employment',
    patterns: [/T4\s*(Statement|Slip)/i, /Statement of Remuneration/i, /employment income/i, /box 14/i],
    keyBoxes: ['14', '16', '17', '18', '20', '22', '24', '44', '52'],
    analysisPrompt: `Analyze this T4 slip. Extract:
- Box 14: Employment income
- Box 16: Employee's CPP contributions
- Box 17: Employee's QPP contributions
- Box 18: Employee's EI premiums
- Box 20: RPP contributions
- Box 22: Income tax deducted
- Box 24: EI insurable earnings
- Box 44: Union dues
- Box 52: Pension adjustment
Also identify the employer name and tax year.`
  },
  T4A: {
    name: 'T4A - Pension, Retirement, Annuity Income',
    category: 'employment',
    patterns: [/T4A/i, /pension.*income/i, /annuity/i, /retirement allowance/i],
    keyBoxes: ['016', '018', '020', '022', '024', '048'],
    analysisPrompt: `Analyze this T4A slip. Extract key boxes including pension income, lump-sum payments, self-employed commissions, RESP income, and any tax withheld.`
  },
  T4E: {
    name: 'T4E - Employment Insurance Benefits',
    category: 'benefits',
    patterns: [/T4E/i, /Employment Insurance/i, /EI benefits/i],
    keyBoxes: ['14', '15', '17', '20', '21', '22'],
    analysisPrompt: `Analyze this T4E slip. Extract total EI benefits received, tax deducted, EI repayment, and any other amounts. Identify if this shows regular benefits, maternity/parental leave, or other EI types.`
  },

  // Investment Income
  T5: {
    name: 'T5 - Investment Income',
    category: 'investment',
    patterns: [/T5\s*(Statement|Slip)/i, /Investment Income/i, /dividend/i, /interest income/i],
    keyBoxes: ['10', '11', '12', '13', '14', '15', '18', '24', '25', '26'],
    analysisPrompt: `Analyze this T5 slip. Extract:
- Box 10: Actual dividends (other than eligible)
- Box 11: Taxable dividends (other than eligible)
- Box 13: Interest from Canadian sources
- Box 14: Other income
- Box 24: Actual eligible dividends
- Box 25: Taxable eligible dividends
- Box 26: Dividend tax credit for eligible dividends
Identify the financial institution and tax year.`
  },
  T3: {
    name: 'T3 - Trust Income',
    category: 'investment',
    patterns: [/T3\s*(Statement|Slip)/i, /Trust Income/i, /beneficiary/i],
    keyBoxes: ['21', '23', '25', '26', '32', '42', '49', '50'],
    analysisPrompt: `Analyze this T3 slip. Extract capital gains, eligible dividends, foreign income, and any return of capital. This slip is for income from trusts, mutual funds, or REITs.`
  },
  T5008: {
    name: 'T5008 - Securities Transactions',
    category: 'investment',
    patterns: [/T5008/i, /securities transactions/i, /proceeds of disposition/i],
    keyBoxes: ['20', '21'],
    analysisPrompt: `Analyze this T5008 slip. Extract the proceeds of disposition (Box 21) and cost/book value (Box 20). This shows sales of stocks, bonds, or other securities. Note: You may need to calculate capital gains separately.`
  },

  // Tax Documents
  NOA: {
    name: 'Notice of Assessment',
    category: 'cra',
    patterns: [/Notice of Assessment/i, /Assessment for \d{4}/i, /your.*refund/i, /balance owing/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this Notice of Assessment. Extract:
- Tax year
- Refund amount OR balance owing
- RRSP contribution room (deduction limit) for next year
- Net income assessed
- Taxable income assessed
- Any adjustments made
- Any amounts owing from previous years`
  },
  NORA: {
    name: 'Notice of Reassessment',
    category: 'cra',
    patterns: [/Notice of Reassessment/i, /reassessed/i, /we.*adjusted/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this Notice of Reassessment. Identify what changes were made, the new refund/balance owing, and the deadline to dispute if the taxpayer disagrees.`
  },

  // Education
  T2202: {
    name: 'T2202 - Tuition and Education Amounts',
    category: 'education',
    patterns: [/T2202/i, /Tuition/i, /education amount/i, /textbook/i],
    keyBoxes: ['A', 'B', 'C'],
    analysisPrompt: `Analyze this T2202 slip. Extract eligible tuition fees (Box A), months enrolled full-time (Box B), months enrolled part-time (Box C), and the institution name. Calculate the education credit value.`
  },
  T4A_RCA: {
    name: 'T4A-RCA - RESP Income',
    category: 'education',
    patterns: [/RESP/i, /education.*savings/i, /registered education/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this RESP-related slip. Identify the type of payment (EAP - Educational Assistance Payment, AIP - Accumulated Income Payment, or refund of contributions) and amounts.`
  },

  // Rental & Property
  rental_statement: {
    name: 'Rental Income Statement',
    category: 'rental',
    patterns: [/rental.*income/i, /rent.*received/i, /property.*income/i, /landlord/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this rental income document. Extract gross rental income, operating expenses (property taxes, insurance, maintenance, utilities, property management), mortgage interest, and net rental income/loss.`
  },

  // Receipts & Deductions
  donation_receipt: {
    name: 'Charitable Donation Receipt',
    category: 'deductions',
    patterns: [/official.*receipt/i, /charitable.*donation/i, /donation.*receipt/i, /registered charity/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this donation receipt. Extract the charity name, registration number, donation amount, donation date, and eligible amount for tax purposes. Confirm it's an official receipt for income tax purposes.`
  },
  medical_receipt: {
    name: 'Medical Expense Receipt',
    category: 'deductions',
    patterns: [/medical.*expense/i, /prescription/i, /pharmacy/i, /dental/i, /vision/i, /physiotherapy/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this medical expense receipt. Identify the type of expense, amount, date, and patient name. Note if this is a CRA-eligible medical expense.`
  },
  childcare_receipt: {
    name: 'Childcare Expense Receipt',
    category: 'deductions',
    patterns: [/child.*care/i, /daycare/i, /babysitter/i, /camp/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this childcare receipt. Extract the provider name, SIN or business number, child's name, period covered, and total amount paid. This is needed for the childcare expense deduction.`
  },

  // Business
  invoice: {
    name: 'Business Invoice/Receipt',
    category: 'business',
    patterns: [/invoice/i, /receipt/i, /bill/i, /payment/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this invoice or receipt. Extract the date, vendor/business name, description of goods/services, subtotal, taxes (GST/HST/PST), and total. Suggest the appropriate expense category for tax purposes.`
  },
  T2125_expenses: {
    name: 'Business Expense Documentation',
    category: 'business',
    patterns: [/business.*expense/i, /self.*employ/i, /contractor/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this business expense document. Categorize the expense (advertising, meals, vehicle, supplies, professional fees, etc.) and identify if any personal-use portion should be excluded.`
  },

  // Pay Stubs & Statements
  pay_stub: {
    name: 'Pay Stub/Pay Statement',
    category: 'employment',
    patterns: [/pay.*stub/i, /pay.*statement/i, /earnings.*statement/i, /payroll/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this pay stub. Extract gross pay, net pay, pay period, YTD totals, and deductions (CPP, EI, income tax, benefits, pension contributions). Calculate the implied annual income.`
  },

  // Investment Statements
  investment_statement: {
    name: 'Investment Account Statement',
    category: 'investment',
    patterns: [/account.*statement/i, /portfolio/i, /holdings/i, /brokerage/i, /TFSA.*statement/i, /RRSP.*statement/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this investment statement. Identify the account type (TFSA, RRSP, non-registered), total value, contributions/withdrawals during the period, and any income earned (dividends, interest, capital gains).`
  },

  // Screenshots & Other
  cra_my_account: {
    name: 'CRA My Account Screenshot',
    category: 'cra',
    patterns: [/my account/i, /cra.*account/i, /canada\.ca/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this CRA My Account screenshot. Extract any visible information like RRSP contribution room, TFSA room, benefit payments, notices, or balances owing. Explain what each section means.`
  },
  tax_software: {
    name: 'Tax Software Screenshot',
    category: 'other',
    patterns: [/turbotax/i, /wealthsimple/i, /simpletax/i, /h&r block/i, /ufile/i, /netfile/i],
    keyBoxes: [],
    analysisPrompt: `Analyze this tax software screenshot. Explain what the user is looking at, what the fields/numbers mean, and provide guidance on how to proceed.`
  },
  other: {
    name: 'Tax-Related Document',
    category: 'other',
    patterns: [],
    keyBoxes: [],
    analysisPrompt: `Analyze this document for any tax-related information. Extract key amounts, dates, and any details that might be relevant for Canadian tax filing.`
  }
}

// Detect document type from extracted text
function detectDocumentType(text: string): keyof typeof DOCUMENT_TYPES {
  for (const [type, config] of Object.entries(DOCUMENT_TYPES)) {
    if (type === 'other') continue
    for (const pattern of config.patterns) {
      if (pattern.test(text)) {
        return type as keyof typeof DOCUMENT_TYPES
      }
    }
  }
  return 'other'
}

// Get user profile for personalized insights
async function getUserProfile(userId: string) {
  if (!supabaseAdmin) return null

  const { data } = await supabaseAdmin
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  return data
}

// Build personalized insight prompt based on profile and document
function buildPersonalizedPrompt(
  docType: keyof typeof DOCUMENT_TYPES,
  profile: any,
  extractedData: any
): string {
  const insights: string[] = []
  const docConfig = DOCUMENT_TYPES[docType]

  if (!profile) {
    return 'Provide general tax insights for this document.'
  }

  // Income-based insights
  if (profile.annual_income && extractedData?.income) {
    const docIncome = parseFloat(extractedData.income) || 0
    if (docIncome > profile.annual_income * 0.1) {
      insights.push('Compare this income to their stated annual income.')
    }
  }

  // Province-specific insights
  if (profile.province) {
    insights.push(`Consider ${profile.province}-specific tax implications.`)
  }

  // RRSP insights
  if (profile.rrsp_contribution_room && docType === 'NOA') {
    insights.push('Compare the RRSP room shown to their saved amount.')
  }

  // Self-employment insights
  if (profile.has_self_employment_income && docConfig.category === 'business') {
    insights.push('They are self-employed - suggest relevant deductions.')
  }

  // Investment insights
  if (profile.has_investment_income && docConfig.category === 'investment') {
    insights.push('They have investment income - explain tax efficiency.')
  }

  // First-time home buyer
  if (profile.is_first_time_home_buyer && (docType === 'NOA' || docType.includes('RRSP'))) {
    insights.push('Mention HBP (Home Buyers Plan) as they are a first-time buyer.')
  }

  if (insights.length === 0) {
    return 'Provide helpful tax insights based on the document.'
  }

  return `Personalized analysis notes: ${insights.join(' ')}`
}

// Main analysis function
async function analyzeDocument(
  base64Data: string,
  mimeType: string,
  fileName: string,
  userProfile: any
) {
  // First pass: Extract text and identify document
  const extractionPrompt = `You are a Canadian tax document expert. Analyze this document and:

1. IDENTIFY the document type (T4, T5, T3, NOA, receipt, pay stub, investment statement, etc.)
2. EXTRACT all key information including:
   - Document type and name
   - Tax year (if applicable)
   - Issuer/employer/institution name
   - All monetary amounts with their labels
   - Important dates
   - Reference numbers (mask any SIN as XXX-XXX-XXX)

3. Return a structured JSON response:
{
  "documentType": "detected type",
  "documentName": "human readable name",
  "taxYear": 2024 or null,
  "issuerName": "name" or null,
  "keyAmounts": {
    "label": amount,
    ...
  },
  "rawText": "full extracted text for reference",
  "confidence": "high" | "medium" | "low"
}`

  const extractResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Document Scanner'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
          { type: 'text', text: extractionPrompt }
        ]
      }],
      max_tokens: 2000,
      temperature: 0.1
    })
  })

  if (!extractResponse.ok) {
    throw new Error('Failed to extract document content')
  }

  const extractData = await extractResponse.json()
  const extractContent = extractData.choices?.[0]?.message?.content || ''

  // Parse extraction results
  let extraction: any = {}
  try {
    const jsonMatch = extractContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      extraction = JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    console.error('Failed to parse extraction:', e)
  }

  // Determine document type
  const detectedType = extraction.documentType?.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'other'
  const docType = Object.keys(DOCUMENT_TYPES).find(t =>
    detectedType.includes(t.toLowerCase()) || t.toLowerCase().includes(detectedType)
  ) as keyof typeof DOCUMENT_TYPES || 'other'

  const docConfig = DOCUMENT_TYPES[docType]

  // Second pass: Deep analysis with personalized insights
  const personalizedNotes = buildPersonalizedPrompt(docType, userProfile, extraction.keyAmounts)

  const analysisPrompt = `You are a friendly Canadian tax expert. Analyze this ${docConfig.name} and provide:

${docConfig.analysisPrompt}

${personalizedNotes}

RESPOND IN THIS JSON FORMAT:
{
  "summary": "One sentence summary of what this document is and shows",
  "whatThisMeans": "2-3 paragraph plain English explanation of what this document means for the person's taxes. Be specific about amounts and their tax implications.",
  "keyTakeaways": ["Important point 1", "Important point 2", ...],
  "actionItems": ["What they should do with this info, if anything"],
  "taxTips": ["Relevant tips to save money or avoid issues"],
  "relatedCalculators": ["calculator-slug-1", "calculator-slug-2"],
  "estimatedTaxImpact": {
    "description": "How this affects their taxes",
    "amount": number or null,
    "type": "income" | "deduction" | "credit" | "info_only"
  },
  "warnings": ["Any red flags or issues to address"]
}`

  const analysisResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'https://taxradar.ca',
      'X-Title': 'Tax Radar Document Scanner'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
            { type: 'text', text: analysisPrompt }
          ]
        }
      ],
      max_tokens: 2500,
      temperature: 0.3
    })
  })

  if (!analysisResponse.ok) {
    throw new Error('Failed to analyze document')
  }

  const analysisData = await analysisResponse.json()
  const analysisContent = analysisData.choices?.[0]?.message?.content || ''

  // Parse analysis
  let analysis: any = {}
  try {
    const jsonMatch = analysisContent.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      analysis = JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    console.error('Failed to parse analysis:', e)
    analysis = {
      summary: 'Document analyzed successfully',
      whatThisMeans: analysisContent,
      keyTakeaways: [],
      actionItems: [],
      taxTips: [],
      warnings: []
    }
  }

  return {
    documentType: docType,
    documentName: docConfig.name,
    category: docConfig.category,
    taxYear: extraction.taxYear || null,
    issuerName: extraction.issuerName || null,
    keyAmounts: extraction.keyAmounts || {},
    confidence: extraction.confidence || 'medium',
    analysis: {
      summary: analysis.summary || 'Document processed',
      whatThisMeans: analysis.whatThisMeans || '',
      keyTakeaways: analysis.keyTakeaways || [],
      actionItems: analysis.actionItems || [],
      taxTips: analysis.taxTips || [],
      relatedCalculators: analysis.relatedCalculators || [],
      estimatedTaxImpact: analysis.estimatedTaxImpact || null,
      warnings: analysis.warnings || []
    }
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

    // Validate file
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!validTypes.includes(file.type)) {
      return Response.json({ error: 'Please upload a PDF or image file' }, { status: 400 })
    }

    if (file.size > 15 * 1024 * 1024) {
      return Response.json({ error: 'File size must be less than 15MB' }, { status: 400 })
    }

    console.log(`[DOC-SCANNER] Processing ${file.name} for user ${user.id}`)

    // Get user profile for personalized insights
    const userProfile = await getUserProfile(user.id)

    // Convert to base64
    const bytes = await file.arrayBuffer()
    const base64 = Buffer.from(bytes).toString('base64')

    // Analyze document
    const result = await analyzeDocument(base64, file.type, file.name, userProfile)

    console.log(`[DOC-SCANNER] Analyzed: ${result.documentType}, Year: ${result.taxYear}`)

    // Upload file to Supabase storage
    const fileExt = file.name.split('.').pop() || 'jpg'
    const filePath = `${user.id}/${Date.now()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('document-scans')
      .upload(filePath, bytes, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('[DOC-SCANNER] Upload error:', uploadError)
      // Continue without saving - still return analysis
    }

    // Get public URL for the file
    let fileUrl = null
    if (uploadData) {
      const { data: urlData } = supabaseAdmin
        .storage
        .from('document-scans')
        .getPublicUrl(filePath)
      fileUrl = urlData?.publicUrl || null
    }

    // Save analysis to database
    const { data: savedScan, error: saveError } = await supabaseAdmin
      .from('document_scans')
      .insert({
        user_id: user.id,
        file_name: file.name,
        file_url: fileUrl,
        file_type: file.type,
        document_type: result.documentType,
        document_name: result.documentName,
        category: result.category,
        key_amounts: result.keyAmounts,
        analysis: result.analysis,
        tax_year: result.taxYear
      })
      .select()
      .single()

    if (saveError) {
      console.error('[DOC-SCANNER] Save error:', saveError)
      // Continue without saving - still return analysis
    }

    return Response.json({
      success: true,
      result: {
        ...result,
        id: savedScan?.id || null,
        fileName: file.name,
        analyzedAt: new Date().toISOString()
      }
    })

  } catch (err) {
    console.error('[DOC-SCANNER] Error:', err)
    return Response.json({
      error: 'Failed to analyze document',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to retrieve scan history
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
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')
    const taxYear = searchParams.get('tax_year')

    let query = supabaseAdmin
      .from('document_scans')
      .select('*')
      .eq('user_id', user.id)
      .order('scanned_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.eq('category', category)
    }
    if (taxYear) {
      query = query.eq('tax_year', parseInt(taxYear))
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Get total count
    const { count } = await supabaseAdmin
      .from('document_scans')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)

    return Response.json({
      success: true,
      scans: data || [],
      total: count || 0,
      limit,
      offset
    })

  } catch (err) {
    console.error('[DOC-SCANNER] Get history error:', err)
    return Response.json({
      error: 'Failed to retrieve scan history'
    }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 120
