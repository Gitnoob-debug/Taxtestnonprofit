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
  const [isExpanded, setIsExpanded] = useState(false) // Collapsed by default

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
      <div className="flex items-center gap-3 px-3 py-2 bg-muted/30 rounded-lg text-muted-foreground">
        <Info className="h-4 w-4 flex-shrink-0" />
        <span className="text-xs">Tell me about yourself to see required documents</span>
      </div>
    )
  }

  // Compact collapsed view - just a slim bar
  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      {/* Header - always visible, acts as toggle */}
      <div
        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Documents</span>
            <Badge variant={progress === 100 ? "default" : "outline"} className="text-xs h-5">
              {completedRequired}/{requiredDocs.length}
            </Badge>
            {progress === 100 && (
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
            )}
          </div>
          <Progress value={progress} className="h-1 mt-1" />
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 border-t max-h-[200px] overflow-y-auto">
              {/* Required Documents */}
              {required.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs font-semibold text-destructive mb-1 flex items-center gap-1">
                    <Star className="h-2.5 w-2.5" />
                    REQUIRED
                  </p>
                  <div className="space-y-0.5">
                    {required.map((doc) => (
                      <DocumentItemCompact
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
                <div className="mb-2">
                  <p className="text-xs font-semibold text-amber-600 mb-1">RECOMMENDED</p>
                  <div className="space-y-0.5">
                    {recommended.map((doc) => (
                      <DocumentItemCompact
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
                  <p className="text-xs font-semibold text-muted-foreground mb-1">OPTIONAL</p>
                  <div className="space-y-0.5">
                    {optional.map((doc) => (
                      <DocumentItemCompact
                        key={doc.id}
                        doc={doc}
                        onClick={() => onDocumentClick?.(doc.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Compact document item for expanded dropdown
function DocumentItemCompact({
  doc,
  onClick
}: {
  doc: DocumentRequirement & { completed: boolean }
  onClick?: () => void
}) {
  return (
    <div
      className={`
        flex items-center gap-2 py-1 px-1.5 rounded text-xs cursor-pointer transition-colors
        ${doc.completed
          ? 'text-green-700 dark:text-green-400'
          : doc.status === 'required'
            ? 'text-foreground hover:bg-red-50 dark:hover:bg-red-950/20'
            : 'text-muted-foreground hover:bg-muted/50'
        }
      `}
      onClick={onClick}
    >
      {doc.completed ? (
        <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
      ) : doc.status === 'required' ? (
        <AlertCircle className="h-3 w-3 text-red-500 flex-shrink-0" />
      ) : (
        <Circle className="h-3 w-3 text-muted-foreground flex-shrink-0" />
      )}
      <span className="truncate">{doc.name}</span>
    </div>
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
