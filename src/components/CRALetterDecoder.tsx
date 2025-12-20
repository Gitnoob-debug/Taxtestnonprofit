'use client'

import { useState, useEffect, useCallback } from 'react'
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
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  ChevronRight,
  Mail,
  Calendar,
  HelpCircle,
  XCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  MessageSquare,
  Trash2
} from 'lucide-react'

interface CRALetter {
  id: string
  file_name: string
  file_url: string
  uploaded_at: string
  letter_type: string | null
  severity: 'routine' | 'action_required' | 'urgent' | null
  deadline: string | null
  summary: string | null
  explanation: string | null
  action_items: string[] | null
  draft_response: string | null
  status: 'pending' | 'analyzed' | 'responded' | 'resolved'
}

// Known CRA letter types with explanations
const CRA_LETTER_TYPES = {
  'notice_of_assessment': {
    name: 'Notice of Assessment (NOA)',
    severity: 'routine',
    description: 'Your annual tax return has been processed. This shows your refund/balance owing.',
    typical_deadline: null,
    action: 'Review for accuracy. Keep for your records.'
  },
  'notice_of_reassessment': {
    name: 'Notice of Reassessment',
    severity: 'action_required',
    description: 'CRA has changed something on your tax return. Could be an adjustment, correction, or audit result.',
    typical_deadline: '90 days to object',
    action: 'Review changes carefully. If you disagree, file a Notice of Objection within 90 days.'
  },
  'request_for_information': {
    name: 'Request for Information',
    severity: 'action_required',
    description: 'CRA needs additional documents or clarification about something on your return.',
    typical_deadline: '30 days',
    action: 'Gather requested documents and respond by the deadline to avoid penalties.'
  },
  'proposal_letter': {
    name: 'Proposal Letter',
    severity: 'action_required',
    description: 'CRA is proposing to change your return. You have a chance to respond before they finalize.',
    typical_deadline: '30 days',
    action: 'Review the proposed changes. Provide supporting documents if you disagree.'
  },
  'collections': {
    name: 'Collections Notice',
    severity: 'urgent',
    description: 'You have an outstanding balance. CRA may take collection action if not addressed.',
    typical_deadline: 'Immediate',
    action: 'Pay the balance or contact CRA to set up a payment arrangement immediately.'
  },
  'audit_letter': {
    name: 'Audit Notification',
    severity: 'urgent',
    description: 'CRA is auditing your tax return. This is a formal review of your financial records.',
    typical_deadline: 'As specified',
    action: 'Gather all requested documents. Consider consulting a tax professional.'
  },
  't1_adjustment': {
    name: 'T1 Adjustment Confirmation',
    severity: 'routine',
    description: 'Confirmation that your requested adjustment has been processed.',
    typical_deadline: null,
    action: 'Verify the adjustment matches what you requested.'
  },
  'gst_hst_notice': {
    name: 'GST/HST Notice',
    severity: 'action_required',
    description: 'Related to your GST/HST account - could be a credit, balance, or information request.',
    typical_deadline: 'Varies',
    action: 'Review carefully and respond to any requests.'
  },
  'benefit_notice': {
    name: 'Benefit Notice (CCB, GST Credit, etc.)',
    severity: 'routine',
    description: 'Information about your government benefit payments.',
    typical_deadline: null,
    action: 'Review for accuracy. Update CRA if your situation has changed.'
  },
  'rrsp_overcontribution': {
    name: 'RRSP Over-contribution Notice',
    severity: 'urgent',
    description: 'You have contributed more than your RRSP limit. Penalty tax of 1% per month applies.',
    typical_deadline: 'Immediate',
    action: 'Withdraw the excess amount or file Form T3012A. Pay any penalty tax owing.'
  },
  'unknown': {
    name: 'CRA Correspondence',
    severity: 'action_required',
    description: 'We detected this is from CRA but need to analyze it further.',
    typical_deadline: 'Check letter',
    action: 'Review the letter carefully and note any deadlines mentioned.'
  }
}

export function CRALetterDecoder() {
  const router = useRouter()
  const { user, loading: authLoading, getToken } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [letters, setLetters] = useState<CRALetter[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedLetter, setSelectedLetter] = useState<CRALetter | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load existing letters
  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push('/')
      return
    }

    loadLetters()
  }, [user?.id, authLoading, router])

  async function loadLetters() {
    try {
      const token = await getToken()
      if (!token) return

      const res = await fetch('/api/cra-letters', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        const data = await res.json()
        setLetters(data.letters || [])
      }
    } catch (err) {
      console.error('Failed to load CRA letters:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle file upload
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
      await uploadAndAnalyze(files[0])
    }
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      await uploadAndAnalyze(files[0])
    }
  }

  async function uploadAndAnalyze(file: File) {
    // Validate file type
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or image file (PNG, JPG)')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const token = await getToken()
      if (!token) throw new Error('Not authenticated')

      // Create form data
      const formData = new FormData()
      formData.append('file', file)

      // Upload and analyze
      const res = await fetch('/api/cra-letters/analyze', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to analyze letter')
      }

      const data = await res.json()

      // Add to letters list and select it
      setLetters(prev => [data.letter, ...prev])
      setSelectedLetter(data.letter)

    } catch (err) {
      console.error('Upload failed:', err)
      setError(err instanceof Error ? err.message : 'Failed to upload letter')
    } finally {
      setIsUploading(false)
    }
  }

  // Delete a letter
  async function deleteLetter(letterId: string) {
    try {
      const token = await getToken()
      if (!token) return

      const res = await fetch(`/api/cra-letters/${letterId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (res.ok) {
        setLetters(prev => prev.filter(l => l.id !== letterId))
        if (selectedLetter?.id === letterId) {
          setSelectedLetter(null)
        }
      }
    } catch (err) {
      console.error('Failed to delete letter:', err)
    }
  }

  // Copy response to clipboard
  async function copyResponse(text: string) {
    await navigator.clipboard.writeText(text)
  }

  // Get severity color
  function getSeverityColor(severity: string | null) {
    switch (severity) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200'
      case 'action_required': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'routine': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  function getSeverityIcon(severity: string | null) {
    switch (severity) {
      case 'urgent': return <XCircle className="h-5 w-5" />
      case 'action_required': return <AlertCircle className="h-5 w-5" />
      case 'routine': return <CheckCircle2 className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  function getSeverityLabel(severity: string | null) {
    switch (severity) {
      case 'urgent': return 'Urgent Action Required'
      case 'action_required': return 'Action Required'
      case 'routine': return 'Routine / Informational'
      default: return 'Pending Analysis'
    }
  }

  // Calculate days until deadline
  function getDaysUntilDeadline(deadline: string | null): number | null {
    if (!deadline) return null
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const diffTime = deadlineDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.push('/profile/dashboard')} className="gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">CRA Letter Decoder</h1>
              <p className="text-slate-600 dark:text-slate-400">Upload CRA letters to get plain English explanations and guidance</p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800 dark:text-blue-200">Your letters are secure</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                All uploads are encrypted and only accessible to you. We use AI to analyze the content but never share your data.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Upload + Letter List */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Area */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Upload className="h-5 w-5 text-teal-600" />
                  Upload CRA Letter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30'
                      : 'border-slate-300 dark:border-slate-700 hover:border-teal-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                      <p className="text-sm text-slate-600">Analyzing letter...</p>
                    </div>
                  ) : (
                    <>
                      <FileText className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Drag & drop your CRA letter here, or
                      </p>
                      <label className="cursor-pointer">
                        <span className="text-teal-600 hover:underline font-medium">browse files</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,image/png,image/jpeg,image/jpg"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="text-xs text-slate-500 mt-2">PDF, PNG, or JPG (max 10MB)</p>
                    </>
                  )}
                </div>

                {error && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Letter History */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-500" />
                  Your Letters
                </CardTitle>
                <CardDescription>{letters.length} letters on file</CardDescription>
              </CardHeader>
              <CardContent>
                {letters.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No letters uploaded yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {letters.map((letter) => {
                      const daysUntil = getDaysUntilDeadline(letter.deadline)
                      return (
                        <div
                          key={letter.id}
                          onClick={() => setSelectedLetter(letter)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedLetter?.id === letter.id
                              ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/30'
                              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {letter.letter_type
                                  ? CRA_LETTER_TYPES[letter.letter_type as keyof typeof CRA_LETTER_TYPES]?.name || 'CRA Letter'
                                  : 'Analyzing...'}
                              </p>
                              <p className="text-xs text-slate-500 truncate">{letter.file_name}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                {new Date(letter.uploaded_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityColor(letter.severity)}`}>
                                {letter.severity || 'pending'}
                              </span>
                              {daysUntil !== null && daysUntil <= 14 && (
                                <span className="text-xs text-red-600 font-medium">
                                  {daysUntil <= 0 ? 'Overdue!' : `${daysUntil}d left`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Letter Analysis */}
          <div className="lg:col-span-2">
            {selectedLetter ? (
              <div className="space-y-6">
                {/* Severity Banner */}
                <Card className={`border ${getSeverityColor(selectedLetter.severity)}`}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getSeverityColor(selectedLetter.severity)}`}>
                          {getSeverityIcon(selectedLetter.severity)}
                        </div>
                        <div>
                          <p className="font-semibold">{getSeverityLabel(selectedLetter.severity)}</p>
                          <p className="text-sm opacity-80">
                            {selectedLetter.letter_type
                              ? CRA_LETTER_TYPES[selectedLetter.letter_type as keyof typeof CRA_LETTER_TYPES]?.name
                              : 'CRA Correspondence'}
                          </p>
                        </div>
                      </div>
                      {selectedLetter.deadline && (
                        <div className="text-right">
                          <p className="text-sm font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Deadline
                          </p>
                          <p className="text-lg font-bold">
                            {new Date(selectedLetter.deadline).toLocaleDateString('en-CA', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                          {getDaysUntilDeadline(selectedLetter.deadline) !== null && (
                            <p className={`text-sm ${getDaysUntilDeadline(selectedLetter.deadline)! <= 7 ? 'text-red-600 font-medium' : ''}`}>
                              {getDaysUntilDeadline(selectedLetter.deadline)! <= 0
                                ? 'OVERDUE'
                                : `${getDaysUntilDeadline(selectedLetter.deadline)} days left`}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* What This Means */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-500" />
                      What This Means (Plain English)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedLetter.summary && (
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <p className="font-medium mb-2">Summary</p>
                        <p className="text-slate-700 dark:text-slate-300">{selectedLetter.summary}</p>
                      </div>
                    )}

                    {selectedLetter.explanation && (
                      <div>
                        <p className="font-medium mb-2">Detailed Explanation</p>
                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                          {selectedLetter.explanation}
                        </p>
                      </div>
                    )}

                    {!selectedLetter.summary && !selectedLetter.explanation && (
                      <div className="text-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-teal-600 mx-auto mb-2" />
                        <p className="text-slate-500">Analyzing letter content...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* What You Need To Do */}
                {selectedLetter.action_items && selectedLetter.action_items.length > 0 && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        What You Need To Do
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-3">
                        {selectedLetter.action_items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full flex items-center justify-center text-sm font-medium">
                              {idx + 1}
                            </span>
                            <p className="text-slate-700 dark:text-slate-300">{item}</p>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                )}

                {/* Draft Response */}
                {selectedLetter.draft_response && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-purple-500" />
                        Draft Response
                      </CardTitle>
                      <CardDescription>
                        You can use this as a starting point for your response to CRA
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <pre className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm whitespace-pre-wrap font-sans">
                          {selectedLetter.draft_response}
                        </pre>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyResponse(selectedLetter.draft_response!)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                      </div>
                      <p className="text-xs text-slate-500 mt-3">
                        Review and personalize this draft before sending. Consider consulting a tax professional for complex matters.
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardContent className="py-4">
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/chat?q=${encodeURIComponent(`Help me understand this CRA ${selectedLetter.letter_type || 'letter'} and what I should do`)}`}
                      >
                        <Button variant="outline" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Ask Tax Radar
                        </Button>
                      </Link>
                      <a
                        href="https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/account-individuals.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          CRA My Account
                        </Button>
                      </a>
                      <Button
                        variant="outline"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => {
                          if (confirm('Delete this letter?')) {
                            deleteLetter(selectedLetter.id)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // No letter selected - show help content
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-teal-600" />
                    Understanding CRA Letters
                  </CardTitle>
                  <CardDescription>
                    Upload a letter to get started, or learn about common CRA correspondence below
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(CRA_LETTER_TYPES).slice(0, -1).map(([key, info]) => (
                      <div key={key} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="font-medium">{info.name}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${
                            info.severity === 'urgent' ? 'text-red-600 bg-red-50 border-red-200' :
                            info.severity === 'action_required' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                            'text-green-600 bg-green-50 border-green-200'
                          }`}>
                            {info.severity === 'urgent' ? 'Urgent' :
                             info.severity === 'action_required' ? 'Action Required' : 'Routine'}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{info.description}</p>
                        {info.typical_deadline && (
                          <p className="text-xs text-amber-600">
                            <Clock className="h-3 w-3 inline mr-1" />
                            Typical deadline: {info.typical_deadline}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
