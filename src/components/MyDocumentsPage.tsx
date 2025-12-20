'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  ArrowLeft,
  FileText,
  Image,
  Trash2,
  Upload,
  Loader2,
  Calendar,
  Building2,
  Check,
  AlertCircle,
  FolderOpen,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrendingUp,
  Receipt,
  Briefcase,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Document {
  id: string
  file_name: string
  file_type: string
  file_size: number
  storage_path: string
  document_type: string | null
  tax_year: number | null
  issuer_name: string | null
  extracted_data: Record<string, any>
  ai_summary: string | null
  processing_status: string
  user_confirmed: boolean
  created_at: string
  updated_at: string
}

// Summary stats calculated from documents
interface DocumentSummary {
  totalIncome: number
  employmentIncome: number
  investmentIncome: number
  otherIncome: number
  totalTaxDeducted: number
  rrspContributions: number
  documentCount: number
  confirmedCount: number
}

// Missing document detection
interface MissingDocument {
  type: string
  label: string
  reason: string
  priority: 'high' | 'medium' | 'low'
}

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  T4: 'T4 - Employment Income',
  'T4A': 'T4A - Pension/Other Income',
  'T4A(OAS)': 'T4A(OAS) - Old Age Security',
  'T4A(P)': 'T4A(P) - CPP/QPP Benefits',
  T5: 'T5 - Investment Income',
  T3: 'T3 - Trust Income',
  T5008: 'T5008 - Securities Transactions',
  'T2202': 'T2202 - Tuition',
  'NOA': 'Notice of Assessment',
  'RRSP': 'RRSP Receipt',
  'Receipt': 'Receipt/Invoice',
  'Other': 'Other Document',
}

const TAX_YEARS = [2025, 2024, 2023, 2022, 2021, 2020]
const CURRENT_TAX_YEAR = 2024 // Tax year we're filing for

// Helper to extract numeric value from extracted data
function extractNumericValue(data: Record<string, any>, keys: string[]): number {
  for (const key of keys) {
    const lowerKey = key.toLowerCase()
    for (const [k, v] of Object.entries(data)) {
      if (k.toLowerCase().includes(lowerKey)) {
        const num = typeof v === 'number' ? v : parseFloat(String(v).replace(/[,$]/g, ''))
        if (!isNaN(num)) return num
      }
    }
  }
  return 0
}

// Calculate summary from documents
function calculateSummary(docs: Document[], taxYear: number): DocumentSummary {
  const yearDocs = docs.filter(d => d.tax_year === taxYear)

  let employmentIncome = 0
  let investmentIncome = 0
  let otherIncome = 0
  let totalTaxDeducted = 0
  let rrspContributions = 0

  for (const doc of yearDocs) {
    const data = doc.extracted_data || {}

    switch (doc.document_type) {
      case 'T4':
        employmentIncome += extractNumericValue(data, ['employment_income', 'box14', 'income', 'total_income'])
        totalTaxDeducted += extractNumericValue(data, ['income_tax_deducted', 'box22', 'tax_deducted', 'federal_tax'])
        break
      case 'T5':
      case 'T3':
        investmentIncome += extractNumericValue(data, ['interest', 'dividends', 'capital_gains', 'income', 'total'])
        break
      case 'T4A':
      case 'T4A(OAS)':
      case 'T4A(P)':
      case 'T4E':
        otherIncome += extractNumericValue(data, ['income', 'benefits', 'pension', 'total'])
        totalTaxDeducted += extractNumericValue(data, ['tax_deducted', 'income_tax'])
        break
      case 'RRSP':
        rrspContributions += extractNumericValue(data, ['contribution', 'amount', 'total'])
        break
    }
  }

  return {
    totalIncome: employmentIncome + investmentIncome + otherIncome,
    employmentIncome,
    investmentIncome,
    otherIncome,
    totalTaxDeducted,
    rrspContributions,
    documentCount: yearDocs.length,
    confirmedCount: yearDocs.filter(d => d.user_confirmed).length,
  }
}

// Detect missing documents based on profile
function detectMissingDocuments(
  docs: Document[],
  taxYear: number,
  profile: any
): MissingDocument[] {
  const missing: MissingDocument[] = []
  const yearDocs = docs.filter(d => d.tax_year === taxYear)
  const docTypes = new Set(yearDocs.map(d => d.document_type))

  // Check for T4 if user has employment income
  if (profile?.has_employment_income && !docTypes.has('T4')) {
    missing.push({
      type: 'T4',
      label: 'T4 - Employment Income',
      reason: 'Your profile indicates you have employment income',
      priority: 'high',
    })
  }

  // Check for T5 if user has investment income
  if (profile?.has_investment_income && !docTypes.has('T5') && !docTypes.has('T3')) {
    missing.push({
      type: 'T5',
      label: 'T5 - Investment Income',
      reason: 'Your profile indicates you have investment income',
      priority: 'medium',
    })
  }

  // Check for RRSP receipt if user has contributions
  if (profile?.has_rrsp_contributions && !docTypes.has('RRSP')) {
    missing.push({
      type: 'RRSP',
      label: 'RRSP Contribution Receipt',
      reason: 'Your profile indicates you made RRSP contributions',
      priority: 'high',
    })
  }

  // Check for T4A if user has pension income
  if (profile?.has_pension_income && !docTypes.has('T4A') && !docTypes.has('T4A(P)') && !docTypes.has('T4A(OAS)')) {
    missing.push({
      type: 'T4A',
      label: 'T4A - Pension Income',
      reason: 'Your profile indicates you have pension income',
      priority: 'high',
    })
  }

  // Check for T4E if user has EI benefits
  if (profile?.has_ei_benefits && !docTypes.has('T4E')) {
    missing.push({
      type: 'T4E',
      label: 'T4E - Employment Insurance',
      reason: 'Your profile indicates you received EI benefits',
      priority: 'high',
    })
  }

  // Check for T2202 if user has tuition credits
  if (profile?.has_tuition_credits && !docTypes.has('T2202')) {
    missing.push({
      type: 'T2202',
      label: 'T2202 - Tuition',
      reason: 'Your profile indicates you have tuition credits',
      priority: 'medium',
    })
  }

  // Check for donation receipts if user has charitable donations
  if (profile?.has_charitable_donations && !yearDocs.some(d =>
    d.document_type === 'Receipt' &&
    (d.ai_summary?.toLowerCase().includes('donation') || d.issuer_name?.toLowerCase().includes('charit'))
  )) {
    missing.push({
      type: 'Receipt',
      label: 'Charitable Donation Receipts',
      reason: 'Your profile indicates you made charitable donations',
      priority: 'medium',
    })
  }

  // Check for medical expense receipts
  if (profile?.has_medical_expenses && !yearDocs.some(d =>
    d.document_type === 'Receipt' &&
    d.ai_summary?.toLowerCase().includes('medical')
  )) {
    missing.push({
      type: 'Receipt',
      label: 'Medical Expense Receipts',
      reason: 'Your profile indicates you have medical expenses',
      priority: 'low',
    })
  }

  return missing
}

export function MyDocumentsPage() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const { profile, loading: profileLoading } = useProfile()
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentsByYear, setDocumentsByYear] = useState<Record<number, Document[]>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState<string>(CURRENT_TAX_YEAR.toString())
  const [selectedType, setSelectedType] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null)
  const [showDashboard, setShowDashboard] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Calculate summary and missing docs for the selected year
  const selectedTaxYear = selectedYear === 'all' ? CURRENT_TAX_YEAR : parseInt(selectedYear)
  const summary = useMemo(() => calculateSummary(documents, selectedTaxYear), [documents, selectedTaxYear])
  const missingDocs = useMemo(() => detectMissingDocuments(documents, selectedTaxYear, profile), [documents, selectedTaxYear, profile])

  // Calculate completeness score
  const completenessScore = useMemo(() => {
    if (!profile) return 0
    const expectedDocs = missingDocs.length + summary.documentCount
    if (expectedDocs === 0) return 100
    return Math.round((summary.documentCount / expectedDocs) * 100)
  }, [missingDocs, summary, profile])

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/')
      return
    }

    loadDocuments()
  }, [user, authLoading, router])

  const loadDocuments = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const res = await fetch('/api/documents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (res.ok) {
        const data = await res.json()
        setDocuments(data.documents || [])
        setDocumentsByYear(data.documentsByYear || {})
      }
    } catch (error) {
      console.error('Failed to load documents:', error)
      toast.error('Failed to load documents')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload a PDF or image.')
      return
    }

    if (file.size > maxSize) {
      toast.error('File too large. Maximum size is 10MB.')
      return
    }

    setIsUploading(true)

    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload document')
      }

      toast.success('Document uploaded and analyzed successfully!')
      loadDocuments()
    } catch (err) {
      console.error('Upload error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to upload document')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    if (!documentToDelete) return

    setIsDeleting(true)

    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      const res = await fetch(`/api/documents?id=${documentToDelete.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete document')
      }

      toast.success('Document deleted successfully')
      loadDocuments()
    } catch (err) {
      console.error('Delete error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete document')
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setDocumentToDelete(null)
    }
  }

  const confirmDocument = async (doc: Document) => {
    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      const res = await fetch('/api/documents', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId: doc.id,
          userConfirmed: true,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to confirm document')
      }

      toast.success('Document confirmed!')
      loadDocuments()
    } catch (err) {
      console.error('Confirm error:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to confirm document')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <Image className="h-5 w-5 text-blue-500" />
  }

  const filteredDocuments = documents.filter((doc) => {
    if (selectedYear !== 'all' && doc.tax_year !== parseInt(selectedYear)) {
      return false
    }
    if (selectedType !== 'all' && doc.document_type !== selectedType) {
      return false
    }
    return true
  })

  // Group by year for display
  const groupedByYear: Record<number | string, Document[]> = {}
  filteredDocuments.forEach((doc) => {
    const year = doc.tax_year || 'Unknown'
    if (!groupedByYear[year]) {
      groupedByYear[year] = []
    }
    groupedByYear[year].push(doc)
  })

  // Sort years descending
  const sortedYears = Object.keys(groupedByYear).sort((a, b) => {
    if (a === 'Unknown') return 1
    if (b === 'Unknown') return -1
    return parseInt(b) - parseInt(a)
  })

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Button>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Dashboard</h1>
          <p className="text-slate-500">
            Your tax documents at a glance. Upload, organize, and track everything you need for filing.
          </p>
        </div>

        {/* Tax Year Summary Dashboard */}
        {documents.length > 0 && showDashboard && (
          <div className="mb-8 space-y-4">
            {/* Completeness Score & Summary Header */}
            <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-1">
                      Tax Year {selectedTaxYear} Summary
                    </h2>
                    <p className="text-sm text-slate-600">
                      {summary.documentCount} document{summary.documentCount !== 1 ? 's' : ''} uploaded
                      {summary.confirmedCount > 0 && `, ${summary.confirmedCount} confirmed`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Completeness Score Circle */}
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-slate-200"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${(completenessScore / 100) * 176} 176`}
                          className={cn(
                            completenessScore >= 80 ? 'text-emerald-500' :
                            completenessScore >= 50 ? 'text-amber-500' : 'text-red-500'
                          )}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-900">{completenessScore}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-700">Document Completeness</p>
                      <p className="text-xs text-slate-500">
                        {missingDocs.length === 0 ? 'All documents uploaded!' : `${missingDocs.length} missing`}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Income Summary Cards */}
            {summary.totalIncome > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Total Income</p>
                        <p className="text-lg font-bold text-slate-900">
                          {summary.totalIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Employment</p>
                        <p className="text-lg font-bold text-slate-900">
                          {summary.employmentIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Investments</p>
                        <p className="text-lg font-bold text-slate-900">
                          {summary.investmentIncome.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Receipt className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Tax Deducted</p>
                        <p className="text-lg font-bold text-slate-900">
                          {summary.totalTaxDeducted.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* RRSP Contributions if any */}
            {summary.rrspContributions > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <PiggyBank className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">RRSP Contributions</p>
                      <p className="text-lg font-bold text-blue-900">
                        {summary.rrspContributions.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Missing Documents Alert */}
            {missingDocs.length > 0 && (
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900 mb-2">Missing Documents</h3>
                      <p className="text-sm text-amber-700 mb-3">
                        Based on your profile, you may be missing these documents for {selectedTaxYear}:
                      </p>
                      <div className="space-y-2">
                        {missingDocs.map((doc, idx) => (
                          <div
                            key={idx}
                            className={cn(
                              "flex items-center justify-between p-2 rounded-lg",
                              doc.priority === 'high' ? 'bg-red-100' :
                              doc.priority === 'medium' ? 'bg-amber-100' : 'bg-yellow-50'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <CircleDashed className={cn(
                                "h-4 w-4",
                                doc.priority === 'high' ? 'text-red-600' :
                                doc.priority === 'medium' ? 'text-amber-600' : 'text-yellow-600'
                              )} />
                              <div>
                                <p className="text-sm font-medium text-slate-900">{doc.label}</p>
                                <p className="text-xs text-slate-600">{doc.reason}</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="shrink-0 text-xs"
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All docs present */}
            {missingDocs.length === 0 && summary.documentCount > 0 && (
              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-emerald-900">All expected documents uploaded!</p>
                      <p className="text-sm text-emerald-700">
                        Your document collection for {selectedTaxYear} appears complete based on your profile.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Collapse Dashboard Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDashboard(false)}
                className="text-slate-500"
              >
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Show Dashboard Button (when collapsed) */}
        {documents.length > 0 && !showDashboard && (
          <div className="mb-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDashboard(true)}
              className="text-slate-600"
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Show Dashboard
            </Button>
          </div>
        )}

        {/* Upload & Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-3">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Tax Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {TAX_YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Document Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {Object.entries(DOCUMENT_TYPE_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <FolderOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents yet</h3>
                <p className="text-slate-500 mb-6 max-w-sm mx-auto">
                  Upload your tax documents (T4, T5, receipts, etc.) to have them analyzed and organized automatically.
                </p>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Upload Your First Document
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year}>
                <h2 className="text-lg font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Tax Year {year}
                </h2>
                <div className="space-y-3">
                  {groupedByYear[year].map((doc) => {
                    const isExpanded = expandedDocId === doc.id
                    return (
                      <Card
                        key={doc.id}
                        className={cn(
                          'transition-all hover:shadow-md cursor-pointer',
                          !doc.user_confirmed && 'border-amber-200 bg-amber-50/50'
                        )}
                      >
                        <CardContent className="p-4">
                          {/* Main row - clickable to expand */}
                          <div
                            className="flex items-start gap-4"
                            onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                          >
                            {/* File Icon */}
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shrink-0">
                              {getFileIcon(doc.file_type)}
                            </div>

                            {/* Document Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-slate-900 truncate">
                                  {doc.file_name}
                                </h3>
                                {doc.user_confirmed ? (
                                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                    <Check className="h-3 w-3" />
                                    Confirmed
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                    <AlertCircle className="h-3 w-3" />
                                    Pending Review
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-2">
                                {doc.document_type && (
                                  <span className="font-medium text-slate-700">
                                    {DOCUMENT_TYPE_LABELS[doc.document_type] || doc.document_type}
                                  </span>
                                )}
                                {doc.issuer_name && (
                                  <span className="flex items-center gap-1">
                                    <Building2 className="h-3 w-3" />
                                    {doc.issuer_name}
                                  </span>
                                )}
                                <span>{formatFileSize(doc.file_size)}</span>
                                <span>{formatDate(doc.created_at)}</span>
                              </div>

                              {!isExpanded && doc.ai_summary && (
                                <p className="text-sm text-slate-600 line-clamp-2">{doc.ai_summary}</p>
                              )}
                            </div>

                            {/* Expand/Collapse Icon */}
                            <div className="shrink-0 text-slate-400">
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-slate-200">
                              {/* Full Summary */}
                              {doc.ai_summary && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-slate-700 mb-2">AI Summary</h4>
                                  <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                                    {doc.ai_summary}
                                  </p>
                                </div>
                              )}

                              {/* Extracted Data */}
                              {doc.extracted_data && Object.keys(doc.extracted_data).length > 0 && (
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-slate-700 mb-2">Extracted Information</h4>
                                  <div className="bg-slate-50 p-3 rounded-lg">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {Object.entries(doc.extracted_data).map(([key, value]) => (
                                        <div key={key} className="flex items-start gap-2">
                                          <DollarSign className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                          <div>
                                            <p className="text-xs text-slate-500 capitalize">
                                              {key.replace(/_/g, ' ')}
                                            </p>
                                            <p className="text-sm font-medium text-slate-900">
                                              {typeof value === 'number'
                                                ? value.toLocaleString('en-CA', {
                                                    style: 'currency',
                                                    currency: 'CAD',
                                                  })
                                                : String(value)}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex items-center gap-2 justify-end">
                                {!doc.user_confirmed && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      confirmDocument(doc)
                                    }}
                                    className="gap-1 text-green-600 border-green-200 hover:bg-green-50"
                                  >
                                    <Check className="h-3 w-3" />
                                    Confirm Details
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setDocumentToDelete(doc)
                                    setDeleteDialogOpen(true)
                                  }}
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{documentToDelete?.file_name}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
