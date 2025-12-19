import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/server/supabase-admin'

// GET - List user's documents
export async function GET(request: NextRequest) {
  try {
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

    // Get query params for filtering
    const { searchParams } = new URL(request.url)
    const taxYear = searchParams.get('taxYear')
    const documentType = searchParams.get('documentType')

    // Build query
    let query = supabaseAdmin
      .from('user_documents')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (taxYear) {
      query = query.eq('tax_year', parseInt(taxYear))
    }

    if (documentType) {
      query = query.eq('document_type', documentType)
    }

    const { data: documents, error: dbError } = await query

    if (dbError) {
      console.error('[DOCUMENTS] Database error:', dbError)
      return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 })
    }

    // Group documents by tax year for easier display
    const documentsByYear: Record<number, typeof documents> = {}
    documents?.forEach(doc => {
      const year = doc.tax_year || 0 // 0 for unknown year
      if (!documentsByYear[year]) {
        documentsByYear[year] = []
      }
      documentsByYear[year].push(doc)
    })

    return NextResponse.json({
      documents,
      documentsByYear,
      totalCount: documents?.length || 0,
    })
  } catch (error) {
    console.error('[DOCUMENTS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a document
export async function DELETE(request: NextRequest) {
  try {
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

    const { searchParams } = new URL(request.url)
    const documentId = searchParams.get('id')

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    // Get the document first to check ownership and get storage path
    const { data: document, error: fetchError } = await supabaseAdmin
      .from('user_documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', user.id) // Ensure user owns this document
      .single()

    if (fetchError || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Delete from storage
    const { error: storageError } = await supabaseAdmin.storage
      .from('user-documents')
      .remove([document.storage_path])

    if (storageError) {
      console.error('[DOCUMENTS] Storage delete error:', storageError)
      // Continue anyway - we still want to delete the DB record
    }

    // Delete from database
    const { error: dbError } = await supabaseAdmin
      .from('user_documents')
      .delete()
      .eq('id', documentId)
      .eq('user_id', user.id)

    if (dbError) {
      console.error('[DOCUMENTS] Database delete error:', dbError)
      return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DOCUMENTS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}

// PATCH - Update document (e.g., confirm extraction)
export async function PATCH(request: NextRequest) {
  try {
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

    const body = await request.json()
    const { documentId, userConfirmed, taxYear, documentType, issuerName } = body

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    const updates: Record<string, any> = {}

    if (typeof userConfirmed === 'boolean') {
      updates.user_confirmed = userConfirmed
    }
    if (taxYear !== undefined) {
      updates.tax_year = taxYear
    }
    if (documentType !== undefined) {
      updates.document_type = documentType
    }
    if (issuerName !== undefined) {
      updates.issuer_name = issuerName
    }

    const { data: document, error: dbError } = await supabaseAdmin
      .from('user_documents')
      .update(updates)
      .eq('id', documentId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (dbError) {
      console.error('[DOCUMENTS] Database update error:', dbError)
      return NextResponse.json({ error: 'Failed to update document' }, { status: 500 })
    }

    return NextResponse.json({ success: true, document })
  } catch (error) {
    console.error('[DOCUMENTS] Error:', error)
    return NextResponse.json(
      { error: 'Failed to update document' },
      { status: 500 }
    )
  }
}

export const runtime = 'nodejs'
