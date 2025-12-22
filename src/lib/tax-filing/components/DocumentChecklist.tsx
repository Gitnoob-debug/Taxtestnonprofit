'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Circle,
  AlertCircle,
  FileText,
  Upload,
  ChevronDown,
  ChevronUp,
  Star,
  Info
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { DocumentRequirement, LifeSituationFlags, getRequiredDocuments } from '../conversation-engine'
import { useState } from 'react'

interface DocumentChecklistProps {
  flags: LifeSituationFlags
  completedDocuments: string[]
  onDocumentClick?: (docId: string) => void
}

export function DocumentChecklist({ flags, completedDocuments, onDocumentClick }: DocumentChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Get required documents based on flags
  const documents = getRequiredDocuments(flags)

  // Mark completed documents
  const docsWithStatus = documents.map(doc => ({
    ...doc,
    completed: completedDocuments.includes(doc.id)
  }))

  // Calculate progress
  const requiredDocs = docsWithStatus.filter(d => d.status === 'required')
  const completedRequired = requiredDocs.filter(d => d.completed).length
  const progress = requiredDocs.length > 0
    ? Math.round((completedRequired / requiredDocs.length) * 100)
    : 0

  // Group by status
  const required = docsWithStatus.filter(d => d.status === 'required')
  const recommended = docsWithStatus.filter(d => d.status === 'recommended')
  const optional = docsWithStatus.filter(d => d.status === 'optional')

  // Check if discovery is complete
  const showChecklist = flags.discoveryComplete ||
    flags.hasEmployment ||
    flags.hasSelfEmployment ||
    flags.hasSpouse ||
    flags.hasChildren

  if (!showChecklist) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Info className="h-5 w-5" />
            <div>
              <p className="text-sm font-medium">Document Checklist</p>
              <p className="text-xs">Tell me about yourself so I can determine what documents you'll need.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader
        className="pb-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Documents Needed
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {completedRequired}/{requiredDocs.length}
            </Badge>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
        <Progress value={progress} className="h-1.5 mt-2" />
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-0 pb-4">
              {/* Required Documents */}
              {required.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-destructive mb-2 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    REQUIRED
                  </p>
                  <div className="space-y-2">
                    {required.map((doc) => (
                      <DocumentItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => onDocumentClick?.(doc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended Documents */}
              {recommended.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-amber-600 mb-2">RECOMMENDED</p>
                  <div className="space-y-2">
                    {recommended.map((doc) => (
                      <DocumentItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => onDocumentClick?.(doc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Documents */}
              {optional.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2">OPTIONAL</p>
                  <div className="space-y-2">
                    {optional.map((doc) => (
                      <DocumentItem
                        key={doc.id}
                        doc={doc}
                        onClick={() => onDocumentClick?.(doc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Summary message */}
              <div className="mt-4 pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  {progress === 100 ? (
                    <span className="text-green-600 font-medium">All required documents collected!</span>
                  ) : (
                    <>Upload or provide info for required documents to complete your return.</>
                  )}
                </p>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

// Individual document item
function DocumentItem({
  doc,
  onClick
}: {
  doc: DocumentRequirement & { completed: boolean }
  onClick?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-start gap-2 p-2 rounded-lg transition-colors cursor-pointer
        ${doc.completed
          ? 'bg-green-50 dark:bg-green-950/20'
          : doc.status === 'required'
            ? 'bg-red-50/50 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20'
            : 'hover:bg-muted/50'
        }
      `}
      onClick={onClick}
    >
      {doc.completed ? (
        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
      ) : doc.status === 'required' ? (
        <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${doc.completed ? 'text-green-700 dark:text-green-400' : ''}`}>
          {doc.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {doc.description}
        </p>
      </div>
      {!doc.completed && (
        <Upload className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  )
}

// Compact version for mobile
export function DocumentChecklistCompact({
  flags,
  completedDocuments
}: {
  flags: LifeSituationFlags
  completedDocuments: string[]
}) {
  const documents = getRequiredDocuments(flags)
  const required = documents.filter(d => d.status === 'required')
  const completed = required.filter(d => completedDocuments.includes(d.id)).length
  const progress = required.length > 0 ? Math.round((completed / required.length) * 100) : 0

  if (!flags.discoveryComplete && !flags.hasEmployment && !flags.hasSelfEmployment) {
    return null
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-lg">
      <FileText className="h-4 w-4 text-primary" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium">Documents</span>
          <span className="text-xs text-muted-foreground">{completed}/{required.length}</span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>
    </div>
  )
}
