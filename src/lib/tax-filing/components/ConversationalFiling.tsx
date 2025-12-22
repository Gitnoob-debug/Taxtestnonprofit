'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2, CheckCircle2, Sparkles, Camera, Upload, FileText, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ConversationState,
  ConversationMessage,
  ExtractedData,
  createInitialState,
  getCurrentQuestion,
  formatQuestion,
  QUESTION_FLOW,
  DocumentRequirement,
  LifeSituationFlags
} from '../conversation-engine'
import { LiveTaxForm } from './LiveTaxForm'
import { DocumentChecklist, DocumentChecklistCompact } from './DocumentChecklist'
import { formatCurrency } from '../tax-engine'

// Scanned slip data awaiting confirmation
interface PendingSlipData {
  slipType: string
  confidence: string
  formFields: Record<string, any>
  confirmationMessage: string
  issuerName: string | null
}

export function ConversationalFiling() {
  // Conversation state
  const [conversationState, setConversationState] = useState<ConversationState>(createInitialState)
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [extractedData, setExtractedData] = useState<Partial<ExtractedData>>({})
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentlyUpdatedFields, setRecentlyUpdatedFields] = useState<string[]>([])

  // Image upload state
  const [isUploading, setIsUploading] = useState(false)
  const [pendingSlip, setPendingSlip] = useState<PendingSlipData | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Document tracking state
  const [completedDocuments, setCompletedDocuments] = useState<string[]>([])
  const [requiredDocuments, setRequiredDocuments] = useState<DocumentRequirement[]>([])

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Calculate progress
  const totalSteps = QUESTION_FLOW.length
  const currentStepIndex = QUESTION_FLOW.findIndex(
    q => q.phase === conversationState.phase && q.subStep === conversationState.subStep
  )
  const progress = Math.round(((currentStepIndex + 1) / totalSteps) * 100)

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Send initial greeting
  useEffect(() => {
    const currentQuestion = getCurrentQuestion(conversationState)
    if (currentQuestion && messages.length === 0) {
      const greeting: ConversationMessage = {
        role: 'assistant',
        content: currentQuestion.question,
        timestamp: Date.now()
      }
      setMessages([greeting])
    }
  }, [])

  // Helper function to track completed documents based on data
  const updateCompletedDocuments = (data: Partial<ExtractedData>, flags: LifeSituationFlags) => {
    const completed: string[] = []

    // Personal info complete
    if (data.firstName && data.lastName && data.sin && data.dateOfBirth && data.street && data.city && data.province && data.postalCode) {
      completed.push('personal_info')
    }

    // T4 complete
    if (data.employerName && data.employmentIncome !== undefined) {
      completed.push('t4')
    }

    // Self-employment info
    if (data.businessName && data.businessIncome !== undefined) {
      completed.push('t2125')
    }

    // Investment info
    if (data.interestIncome !== undefined || data.dividendIncome !== undefined) {
      completed.push('t5')
    }

    // RRSP
    if (data.rrspContribution !== undefined) {
      completed.push('rrsp')
    }

    // Medical
    if (data.medicalExpenses !== undefined) {
      completed.push('medical')
    }

    // Donations
    if (data.donations !== undefined) {
      completed.push('donations')
    }

    // Childcare
    if (data.childcareExpenses !== undefined) {
      completed.push('childcare')
    }

    // Spouse info
    if (data.spouseFirstName && data.spouseIncome !== undefined) {
      completed.push('spouse_info')
    }

    setCompletedDocuments(completed)
  }

  // Handle sending a message
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ConversationMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/tax-filing/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationState,
          conversationHistory: messages.slice(-10),
          extractedData
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()

      // Update state
      setExtractedData(data.allExtractedData)
      setConversationState(data.newState)

      // Update required documents list
      if (data.requiredDocuments) {
        setRequiredDocuments(data.requiredDocuments)
      }

      // Track completed documents based on extracted data
      updateCompletedDocuments(data.allExtractedData, data.newState.flags)

      // Highlight updated fields
      if (data.fieldsUpdated && data.fieldsUpdated.length > 0) {
        setRecentlyUpdatedFields(data.fieldsUpdated)
        setTimeout(() => setRecentlyUpdatedFields([]), 2000)
      }

      // Add assistant message
      const assistantMessage: ConversationMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
        extractedData: data.extractedData,
        fieldsUpdated: data.fieldsUpdated
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error:', error)
      const errorMessage: ConversationMessage = {
        role: 'assistant',
        content: "Sorry, I had trouble processing that. Could you try again?",
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Handle file upload
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)

    // Add user message showing they uploaded
    const uploadMessage: ConversationMessage = {
      role: 'user',
      content: `📎 Uploaded: ${file.name}`,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, uploadMessage])

    // Add "scanning" message
    const scanningMessage: ConversationMessage = {
      role: 'assistant',
      content: '📷 Scanning your tax slip... Give me a moment to read this.',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, scanningMessage])

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/tax-filing/scan-slip', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to scan document')
      }

      const data = await response.json()

      // Store pending slip data for confirmation
      setPendingSlip({
        slipType: data.slipType,
        confidence: data.confidence,
        formFields: data.formFields,
        confirmationMessage: data.confirmationMessage,
        issuerName: data.issuerName
      })

      // Update messages with what we found
      setMessages(prev => {
        const updated = [...prev]
        // Remove the "scanning" message
        updated.pop()
        // Add the confirmation message
        updated.push({
          role: 'assistant',
          content: data.confirmationMessage,
          timestamp: Date.now()
        })
        return updated
      })

    } catch (error) {
      console.error('Upload error:', error)
      setUploadError(error instanceof Error ? error.message : 'Failed to scan document')

      // Update messages with error
      setMessages(prev => {
        const updated = [...prev]
        updated.pop() // Remove "scanning" message
        updated.push({
          role: 'assistant',
          content: `❌ Sorry, I couldn't read that document. ${error instanceof Error ? error.message : 'Please try again with a clearer image.'}`,
          timestamp: Date.now()
        })
        return updated
      })
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  // Confirm scanned slip data
  const confirmSlipData = () => {
    if (!pendingSlip) return

    // Merge scanned data into extracted data
    const newData = { ...extractedData }
    const fieldsUpdated: string[] = []

    // Map the form fields to our data structure
    Object.entries(pendingSlip.formFields).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        (newData as any)[key] = value
        fieldsUpdated.push(key)
      }
    })

    // If we got employer name, set the flag
    if (pendingSlip.formFields.employerName || pendingSlip.formFields.employmentIncome) {
      setConversationState(prev => ({
        ...prev,
        flags: { ...prev.flags, hasEmployment: true }
      }))
    }

    setExtractedData(newData)
    setRecentlyUpdatedFields(fieldsUpdated)
    setTimeout(() => setRecentlyUpdatedFields([]), 2000)

    // Add confirmation message
    const confirmMessage: ConversationMessage = {
      role: 'user',
      content: '✓ Yes, that looks correct!',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, confirmMessage])

    // Add follow-up message
    const followUp: ConversationMessage = {
      role: 'assistant',
      content: `Perfect! I've added the ${pendingSlip.slipType} data to your return. ${fieldsUpdated.length} fields updated. Do you have any other tax slips to add, or should we continue with the questions?`,
      timestamp: Date.now(),
      fieldsUpdated
    }
    setMessages(prev => [...prev, followUp])

    setPendingSlip(null)
  }

  // Reject scanned slip data
  const rejectSlipData = () => {
    const rejectMessage: ConversationMessage = {
      role: 'user',
      content: '✗ No, that\'s not right',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, rejectMessage])

    const helpMessage: ConversationMessage = {
      role: 'assistant',
      content: 'No problem! You can try uploading a clearer photo, or I can ask you the questions directly. What would you prefer?',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, helpMessage])

    setPendingSlip(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">AI Tax Filing Assistant</h1>
                <p className="text-xs text-muted-foreground">2024 Tax Return</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground">Progress</p>
                <p className="text-sm font-medium">{progress}%</p>
              </div>
              <Progress value={progress} className="w-24 sm:w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
          {/* Left Side - Chat */}
          <Card className="flex flex-col h-full">
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          {msg.fieldsUpdated && msg.fieldsUpdated.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-primary/20 flex items-center gap-1 text-xs opacity-70">
                              <CheckCircle2 className="h-3 w-3" />
                              Updated: {msg.fieldsUpdated.join(', ')}
                            </div>
                          )}
                        </div>
                        {msg.role === 'user' && (
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-foreground" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <div className="bg-muted rounded-2xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-muted-foreground">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Confirmation buttons when slip is pending */}
              {pendingSlip && (
                <div className="p-4 border-t bg-muted/50">
                  <p className="text-sm font-medium mb-3 text-center">Does this look correct?</p>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={confirmSlipData}
                      className="flex-1 max-w-32"
                      variant="default"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Yes, add it
                    </Button>
                    <Button
                      onClick={rejectSlipData}
                      className="flex-1 max-w-32"
                      variant="outline"
                    >
                      <X className="h-4 w-4 mr-2" />
                      No, wrong
                    </Button>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="flex gap-2">
                  {/* Upload button */}
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || isUploading || !!pendingSlip}
                    size="icon"
                    variant="outline"
                    title="Upload T4/T5 slip"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </Button>

                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={pendingSlip ? "Confirm the scanned data above..." : "Type your answer or upload a tax slip..."}
                    disabled={isLoading || isUploading || !!pendingSlip}
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading || isUploading || !!pendingSlip}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send · Click 📷 to upload a tax slip
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Document Checklist + Live Form */}
          <div className="hidden lg:flex lg:flex-col gap-4 h-full overflow-hidden">
            {/* Document Checklist */}
            <DocumentChecklist
              flags={conversationState.flags as LifeSituationFlags}
              completedDocuments={completedDocuments}
              onDocumentClick={(docId) => {
                // Could trigger upload for specific document type
                if (docId === 't4' || docId === 't5' || docId === 'rrsp') {
                  fileInputRef.current?.click()
                }
              }}
            />

            {/* Live Form - takes remaining space */}
            <div className="flex-1 overflow-auto">
              <LiveTaxForm
                extractedData={extractedData}
                conversationState={conversationState}
                recentlyUpdatedFields={recentlyUpdatedFields}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
