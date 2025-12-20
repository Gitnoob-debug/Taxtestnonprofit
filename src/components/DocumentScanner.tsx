'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import {
  ArrowLeft,
  Loader2,
  Upload,
  FileText,
  Camera,
  Scan,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Building2,
  GraduationCap,
  Home,
  Heart,
  Briefcase,
  ChevronRight,
  HelpCircle,
  Sparkles,
  RotateCcw,
  MessageSquare,
  X
} from 'lucide-react'

interface AnalysisResult {
  documentType: string
  documentName: string
  category: string
  taxYear: number | null
  issuerName: string | null
  keyAmounts: Record<string, number>
  confidence: 'high' | 'medium' | 'low'
  analysis: {
    summary: string
    whatThisMeans: string
    keyTakeaways: string[]
    actionItems: string[]
    taxTips: string[]
    relatedCalculators: string[]
    estimatedTaxImpact: {
      description: string
      amount: number | null
      type: 'income' | 'deduction' | 'credit' | 'info_only'
    } | null
    warnings: string[]
  }
  fileName: string
  analyzedAt: string
}

// Calculator mapping for quick links
const CALCULATOR_LINKS: Record<string, { name: string; href: string }> = {
  'tax-calculator': { name: 'Income Tax Calculator', href: '/tools/tax-calculator' },
  'marginal-tax-calculator': { name: 'Marginal Tax Calculator', href: '/tools/marginal-tax-calculator' },
  'rrsp-calculator': { name: 'RRSP Calculator', href: '/tools/rrsp-calculator' },
  'tfsa-room-calculator': { name: 'TFSA Room Calculator', href: '/tools/tfsa-room-calculator' },
  'capital-gains-calculator': { name: 'Capital Gains Calculator', href: '/tools/capital-gains-calculator' },
  'dividend-tax-calculator': { name: 'Dividend Tax Calculator', href: '/tools/dividend-tax-calculator' },
  'rental-property-calculator': { name: 'Rental Property Calculator', href: '/tools/rental-property-calculator' },
  'self-employment-tax-calculator': { name: 'Self-Employment Calculator', href: '/tools/self-employment-tax-calculator' },
}

// Category icons and colors
const CATEGORY_CONFIG: Record<string, { icon: any; color: string; bgColor: string }> = {
  employment: { icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  investment: { icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-100' },
  benefits: { icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-100' },
  education: { icon: GraduationCap, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  rental: { icon: Home, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  deductions: { icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  business: { icon: Building2, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  cra: { icon: FileText, color: 'text-red-600', bgColor: 'bg-red-100' },
  other: { icon: FileText, color: 'text-slate-600', bgColor: 'bg-slate-100' },
}

// Common document examples for the help section
const DOCUMENT_EXAMPLES = [
  { name: 'T4 Slip', desc: 'Employment income from your employer', icon: Briefcase },
  { name: 'T5 Slip', desc: 'Investment income (dividends, interest)', icon: TrendingUp },
  { name: 'Pay Stub', desc: 'See YTD earnings and deductions', icon: DollarSign },
  { name: 'Notice of Assessment', desc: 'Your RRSP room & tax result', icon: FileText },
  { name: 'Receipts', desc: 'Donations, medical, childcare', icon: Heart },
  { name: 'Investment Statement', desc: 'TFSA, RRSP, or trading accounts', icon: TrendingUp },
  { name: 'Rental Documents', desc: 'Income & expenses for properties', icon: Home },
  { name: 'CRA Screenshots', desc: 'My Account pages explained', icon: Camera },
]

export function DocumentScanner() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      await analyzeDocument(files[0])
    }
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      await analyzeDocument(files[0])
    }
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  async function analyzeDocument(file: File) {
    // Validate file type
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or image file (PNG, JPG, WebP)')
      return
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setError('File size must be less than 15MB')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setResult(null)
    setUploadedFileName(file.name)

    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/document-scanner', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to analyze document')
      }

      const data = await res.json()
      setResult(data.result)

    } catch (err) {
      console.error('Analysis failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to analyze document')
    } finally {
      setIsAnalyzing(false)
    }
  }

  function resetScanner() {
    setResult(null)
    setError(null)
    setUploadedFileName(null)
  }

  function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    router.push('/')
    return null
  }

  const categoryConfig = result ? CATEGORY_CONFIG[result.category] || CATEGORY_CONFIG.other : null
  const CategoryIcon = categoryConfig?.icon || FileText

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile/dashboard')} className="gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl">
              <Scan className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Document Scanner</h1>
              <p className="text-slate-600 dark:text-slate-400">Upload any tax document for instant AI analysis</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {!result ? (
          <div className="space-y-6">
            {/* Upload Area */}
            <Card className="overflow-hidden">
              <div
                className={`p-8 text-center transition-all duration-200 ${
                  dragActive
                    ? 'bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border-2 border-dashed border-teal-500'
                    : 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800'
                } ${isAnalyzing ? 'pointer-events-none' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {isAnalyzing ? (
                  <div className="py-8">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <div className="absolute inset-0 bg-teal-100 dark:bg-teal-900/50 rounded-full animate-ping opacity-75"></div>
                      <div className="relative flex items-center justify-center w-20 h-20 bg-teal-100 dark:bg-teal-900 rounded-full">
                        <Scan className="h-10 w-10 text-teal-600 animate-pulse" />
                      </div>
                    </div>
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Analyzing {uploadedFileName}...
                    </p>
                    <p className="text-sm text-slate-500">
                      Our AI is reading your document and extracting tax insights
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-teal-600">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>This usually takes 5-15 seconds</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center">
                      <Upload className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                      Drop your document here
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      or click to browse your files
                    </p>
                    <label className="cursor-pointer">
                      <Button variant="default" className="bg-teal-600 hover:bg-teal-700">
                        <Camera className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleFileSelect}
                      />
                    </label>
                    <p className="text-xs text-slate-500 mt-4">
                      Supports PDF, PNG, JPG, WebP (max 15MB)
                    </p>
                  </>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* What You Can Scan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <HelpCircle className="h-5 w-5 text-teal-600" />
                  What can I scan?
                </CardTitle>
                <CardDescription>
                  Upload any of these documents for instant explanations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {DOCUMENT_EXAMPLES.map((doc, idx) => {
                    const Icon = doc.icon
                    return (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-teal-300 transition-colors"
                      >
                        <Icon className="h-5 w-5 text-teal-600 mb-2" />
                        <p className="font-medium text-sm text-slate-800 dark:text-slate-200">{doc.name}</p>
                        <p className="text-xs text-slate-500 mt-1">{doc.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Security Note */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">Your documents are secure</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  We analyze documents in memory and don't store the files. Any sensitive numbers like SINs are automatically masked.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-6">
            {/* Document Header */}
            <Card className={`border-2 ${categoryConfig?.color.replace('text-', 'border-')}`}>
              <CardContent className="py-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${categoryConfig?.bgColor}`}>
                      <CategoryIcon className={`h-6 w-6 ${categoryConfig?.color}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {result.documentName}
                      </h2>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {result.issuerName && <span>{result.issuerName}</span>}
                        {result.taxYear && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {result.taxYear}
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          result.confidence === 'high' ? 'bg-green-100 text-green-700' :
                          result.confidence === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {result.confidence} confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetScanner} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Scan Another
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Key Amounts */}
            {Object.keys(result.keyAmounts).length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    Key Amounts Found
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(result.keyAmounts).map(([label, amount]) => (
                      <div key={label} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                          {label.replace(/_/g, ' ')}
                        </p>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {typeof amount === 'number' ? formatCurrency(amount) : amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tax Impact */}
            {result.analysis.estimatedTaxImpact && result.analysis.estimatedTaxImpact.amount && (
              <Card className={`border ${
                result.analysis.estimatedTaxImpact.type === 'income' ? 'border-blue-200 bg-blue-50/50' :
                result.analysis.estimatedTaxImpact.type === 'deduction' ? 'border-green-200 bg-green-50/50' :
                result.analysis.estimatedTaxImpact.type === 'credit' ? 'border-purple-200 bg-purple-50/50' :
                'border-slate-200'
              }`}>
                <CardContent className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                      result.analysis.estimatedTaxImpact.type === 'income' ? 'bg-blue-100' :
                      result.analysis.estimatedTaxImpact.type === 'deduction' ? 'bg-green-100' :
                      result.analysis.estimatedTaxImpact.type === 'credit' ? 'bg-purple-100' :
                      'bg-slate-100'
                    }`}>
                      <TrendingUp className={`h-6 w-6 ${
                        result.analysis.estimatedTaxImpact.type === 'income' ? 'text-blue-600' :
                        result.analysis.estimatedTaxImpact.type === 'deduction' ? 'text-green-600' :
                        result.analysis.estimatedTaxImpact.type === 'credit' ? 'text-purple-600' :
                        'text-slate-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {result.analysis.estimatedTaxImpact.type === 'income' ? 'Taxable Income' :
                         result.analysis.estimatedTaxImpact.type === 'deduction' ? 'Potential Deduction' :
                         result.analysis.estimatedTaxImpact.type === 'credit' ? 'Tax Credit' : 'Tax Impact'}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(result.analysis.estimatedTaxImpact.amount)}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        {result.analysis.estimatedTaxImpact.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Warnings */}
            {result.analysis.warnings.length > 0 && (
              <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Heads Up</p>
                      <ul className="space-y-1">
                        {result.analysis.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-amber-700 dark:text-amber-300">
                            • {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What This Means */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-teal-600" />
                  What This Means For You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-lg border border-teal-200 dark:border-teal-800">
                  <p className="font-medium text-teal-800 dark:text-teal-200">{result.analysis.summary}</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-sm">
                  <p className="whitespace-pre-line text-slate-700 dark:text-slate-300">
                    {result.analysis.whatThisMeans}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Takeaways */}
            {result.analysis.keyTakeaways.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.analysis.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Action Items */}
            {result.analysis.actionItems.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    What To Do Next
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {result.analysis.actionItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {/* Tax Tips */}
            {result.analysis.taxTips.length > 0 && (
              <Card className="border-amber-200 dark:border-amber-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500" />
                    Tax Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.analysis.taxTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Related Calculators */}
            {result.analysis.relatedCalculators.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    Try These Calculators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.analysis.relatedCalculators
                      .filter(calc => CALCULATOR_LINKS[calc])
                      .map((calc, idx) => {
                        const link = CALCULATOR_LINKS[calc]
                        return (
                          <Link
                            key={idx}
                            href={link.href}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <Calculator className="h-5 w-5 text-purple-600" />
                              <span className="font-medium text-slate-700 dark:text-slate-300">{link.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600" />
                          </Link>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ask Tax Radar */}
            <Card className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/50 dark:to-emerald-950/50 border-teal-200">
              <CardContent className="py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">Have questions?</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Ask Tax Radar about this {result.documentName.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <Link href={`/chat?q=${encodeURIComponent(`I have a question about my ${result.documentName} from ${result.issuerName || 'a financial institution'}`)}`}>
                    <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
                      Ask Now
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
