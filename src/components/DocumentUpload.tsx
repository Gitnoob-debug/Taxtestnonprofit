'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, FileText, Image, Loader2, Check, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/useAuth'

interface DocumentAnalysis {
  documentType: string
  taxYear: number | null
  issuerName: string | null
  summary: string
  keyFields: Record<string, any>
  confidence: 'high' | 'medium' | 'low'
}

interface UploadedDocument {
  id: string
  fileName: string
  documentType: string
  taxYear: number | null
  issuerName: string | null
  summary: string
  extractedData: Record<string, any>
  confidence: 'high' | 'medium' | 'low'
}

interface DocumentUploadProps {
  onUploadComplete?: (document: UploadedDocument) => void
  onAnalysisComplete?: (analysis: DocumentAnalysis, file: File) => void
  analyzeOnly?: boolean
  compact?: boolean
  className?: string
}

export function DocumentUpload({
  onUploadComplete,
  onAnalysisComplete,
  analyzeOnly = false,
  compact = false,
  className,
}: DocumentUploadProps) {
  const { user, getToken } = useAuth()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/gif']
  const maxSize = 10 * 1024 * 1024 // 10MB

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload a PDF or image (JPEG, PNG, WebP, GIF).'
    }
    if (file.size > maxSize) {
      return 'File too large. Maximum size is 10MB.'
    }
    return null
  }

  const handleFile = useCallback(async (file: File) => {
    setError(null)
    setAnalysis(null)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)

    if (!user) {
      setError('Please sign in to upload documents.')
      return
    }

    setIsUploading(true)

    try {
      const token = await getToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      const formData = new FormData()
      formData.append('file', file)
      if (analyzeOnly) {
        formData.append('analyzeOnly', 'true')
      }

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process document')
      }

      if (analyzeOnly && data.analysis) {
        setAnalysis(data.analysis)
        onAnalysisComplete?.(data.analysis, file)
      } else if (data.document) {
        onUploadComplete?.(data.document)
        setSelectedFile(null)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload document')
    } finally {
      setIsUploading(false)
    }
  }, [user, getToken, analyzeOnly, onAnalysisComplete, onUploadComplete])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }, [handleFile])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setAnalysis(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    return <Image className="h-5 w-5 text-blue-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high':
        return 'text-green-600 bg-green-50'
      case 'medium':
        return 'text-amber-600 bg-amber-50'
      case 'low':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-slate-600 bg-slate-50'
    }
  }

  if (compact) {
    return (
      <div className={className}>
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleInputChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClick}
          disabled={isUploading || !user}
          className="text-slate-500 hover:text-emerald-600"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </Button>
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={allowedTypes.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Drop zone */}
      {!selectedFile && (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200',
            isDragging
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50',
            !user && 'opacity-50 cursor-not-allowed'
          )}
        >
          <Upload className={cn(
            'h-10 w-10 mx-auto mb-4 transition-colors',
            isDragging ? 'text-emerald-500' : 'text-slate-400'
          )} />
          <p className="text-sm font-medium text-slate-700 mb-1">
            {isDragging ? 'Drop your file here' : 'Drop a file or click to upload'}
          </p>
          <p className="text-xs text-slate-500">
            PDF or images (JPEG, PNG) up to 10MB
          </p>
          {!user && (
            <p className="text-xs text-amber-600 mt-2">
              Sign in to upload documents
            </p>
          )}
        </div>
      )}

      {/* Selected file */}
      {selectedFile && (
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-slate-50 rounded-lg">
              {getFileIcon(selectedFile.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            {!isUploading && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFile}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Loading state */}
          {isUploading && (
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
              <span>Analyzing document with AI...</span>
            </div>
          )}

          {/* Analysis result */}
          {analysis && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-slate-900">Analysis Complete</span>
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full',
                  getConfidenceColor(analysis.confidence)
                )}>
                  {analysis.confidence} confidence
                </span>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-500">Type:</span>{' '}
                    <span className="font-medium text-slate-900">{analysis.documentType}</span>
                  </div>
                  {analysis.taxYear && (
                    <div>
                      <span className="text-slate-500">Year:</span>{' '}
                      <span className="font-medium text-slate-900">{analysis.taxYear}</span>
                    </div>
                  )}
                  {analysis.issuerName && (
                    <div className="col-span-2">
                      <span className="text-slate-500">From:</span>{' '}
                      <span className="font-medium text-slate-900">{analysis.issuerName}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-600">{analysis.summary}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  )
}
