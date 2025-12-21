'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UploadedDocument } from '@/lib/time-machine/types'
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Loader2,
  Trash2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface DocumentUploadStepProps {
  selectedYears: number[]
  documents: UploadedDocument[]
  onAddDocument: (doc: UploadedDocument) => void
  onUpdateDocument: (id: string, updates: Partial<UploadedDocument>) => void
  onRemoveDocument: (id: string) => void
  onNext: () => void
  onBack: () => void
  getToken: () => Promise<string | null>
}

const ACCEPTED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function DocumentUploadStep({
  selectedYears,
  documents,
  onAddDocument,
  onUpdateDocument,
  onRemoveDocument,
  onNext,
  onBack,
  getToken,
}: DocumentUploadStepProps) {
  const [expandedYear, setExpandedYear] = useState<number | null>(selectedYears[0] || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentUploadYear, setCurrentUploadYear] = useState<number | null>(null)

  const handleFileSelect = useCallback(
    async (files: FileList | null, year: number) => {
      if (!files || files.length === 0) return

      const file = files[0]

      // Validate file type
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast.error('Please upload a PDF or image file (JPG, PNG, WebP)')
        return
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size must be less than 10MB')
        return
      }

      const docId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Add document with uploading status
      const newDoc: UploadedDocument = {
        id: docId,
        taxYear: year,
        documentType: 'noa', // Default to NOA, will be detected
        fileName: file.name,
        status: 'uploading',
      }
      onAddDocument(newDoc)
      setIsUploading(true)

      try {
        const token = await getToken()
        if (!token) {
          throw new Error('Not authenticated')
        }

        // Create form data
        const formData = new FormData()
        formData.append('file', file)
        formData.append('taxYear', year.toString())
        formData.append('analyzeOnly', 'false')
        formData.append('timeMachine', 'true')

        // Upload and analyze
        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Upload failed')
        }

        const result = await response.json()

        // Determine document type from analysis
        const detectedType = result.documentType?.toUpperCase()
        let docType: 'noa' | 't1' | 'supporting' = 'supporting'
        if (detectedType === 'NOA') {
          docType = 'noa'
        } else if (detectedType === 'T1' || detectedType === 'T1 GENERAL') {
          docType = 't1'
        }

        // Update document with success
        onUpdateDocument(docId, {
          status: 'complete',
          documentType: docType,
          extractedData: result,
        })

        toast.success(`${file.name} uploaded and analyzed`)
      } catch (error) {
        console.error('Upload error:', error)
        onUpdateDocument(docId, {
          status: 'error',
          error: error instanceof Error ? error.message : 'Upload failed',
        })
        toast.error('Failed to upload document')
      } finally {
        setIsUploading(false)
      }
    },
    [onAddDocument, onUpdateDocument, getToken]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent, year: number) => {
      e.preventDefault()
      handleFileSelect(e.dataTransfer.files, year)
    },
    [handleFileSelect]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const triggerFileInput = (year: number) => {
    setCurrentUploadYear(year)
    fileInputRef.current?.click()
  }

  const getDocumentsForYear = (year: number) => {
    return documents.filter((d) => d.taxYear === year)
  }

  const hasNoaForYear = (year: number) => {
    return documents.some((d) => d.taxYear === year && d.documentType === 'noa' && d.status === 'complete')
  }

  // Calculate overall progress
  const yearsWithNoa = selectedYears.filter(hasNoaForYear).length
  const progress = (yearsWithNoa / selectedYears.length) * 100

  return (
    <div className="space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={(e) => {
          if (currentUploadYear) {
            handleFileSelect(e.target.files, currentUploadYear)
          }
          e.target.value = '' // Reset for re-upload
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Your Documents
          </CardTitle>
          <CardDescription>
            Upload your Notice of Assessment (NOA) for each year. The NOA contains key data
            we need to analyze your tax history. You can also add T1 returns and supporting documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>NOAs uploaded</span>
              <span className="font-medium">
                {yearsWithNoa} of {selectedYears.length} years
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Year accordions */}
          <div className="space-y-3">
            {selectedYears.map((year) => {
              const yearDocs = getDocumentsForYear(year)
              const hasNoa = hasNoaForYear(year)
              const isExpanded = expandedYear === year

              return (
                <div
                  key={year}
                  className={cn(
                    'border rounded-lg overflow-hidden',
                    hasNoa ? 'border-green-200 dark:border-green-800' : 'border-border'
                  )}
                >
                  {/* Year header */}
                  <button
                    className={cn(
                      'w-full flex items-center justify-between p-4 text-left transition-colors',
                      hasNoa
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : 'bg-gray-50 dark:bg-gray-800/50',
                      'hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                    onClick={() => setExpandedYear(isExpanded ? null : year)}
                  >
                    <div className="flex items-center gap-3">
                      {hasNoa ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="font-semibold">{year}</span>
                      <span className="text-sm text-muted-foreground">
                        {yearDocs.length} document{yearDocs.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="p-4 space-y-4 bg-background">
                      {/* Drop zone */}
                      <div
                        className={cn(
                          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
                          'hover:border-primary/50 hover:bg-primary/5',
                          isUploading && 'opacity-50 pointer-events-none'
                        )}
                        onDrop={(e) => handleDrop(e, year)}
                        onDragOver={handleDragOver}
                      >
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your {year} documents here, or
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => triggerFileInput(year)}
                          disabled={isUploading}
                        >
                          Browse Files
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          PDF, JPG, PNG up to 10MB
                        </p>
                      </div>

                      {/* Document list */}
                      {yearDocs.length > 0 && (
                        <div className="space-y-2">
                          {yearDocs.map((doc) => (
                            <div
                              key={doc.id}
                              className={cn(
                                'flex items-center justify-between p-3 rounded-lg border',
                                doc.status === 'complete' && 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                                doc.status === 'error' && 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                                doc.status === 'uploading' && 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                              )}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {doc.status === 'uploading' && (
                                  <Loader2 className="w-5 h-5 animate-spin text-blue-600 flex-shrink-0" />
                                )}
                                {doc.status === 'complete' && (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                )}
                                {doc.status === 'error' && (
                                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <p className="text-sm font-medium truncate">
                                    {doc.fileName}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.documentType === 'noa' && 'Notice of Assessment'}
                                    {doc.documentType === 't1' && 'T1 General'}
                                    {doc.documentType === 'supporting' && 'Supporting Document'}
                                    {doc.status === 'uploading' && ' - Processing...'}
                                    {doc.status === 'error' && ` - ${doc.error}`}
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onRemoveDocument(doc.id)}
                                disabled={doc.status === 'uploading'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Hints for what to upload */}
                      {!hasNoa && (
                        <div className="text-sm text-muted-foreground p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <p className="font-medium text-yellow-800 dark:text-yellow-200">
                            Need your {year} NOA?
                          </p>
                          <p className="mt-1">
                            You can find it in your CRA My Account under &quot;Tax returns view&quot; →
                            &quot;Notice of assessment&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onNext}>
            Skip for now
          </Button>
          <Button onClick={onNext}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Documents are optional but help improve accuracy. You can continue with just the
        questionnaire if you prefer.
      </p>
    </div>
  )
}
