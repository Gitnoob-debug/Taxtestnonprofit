'use client'

import { Citation } from '@/types/tax'
import { ExternalLink, FileText, BookOpen, FileCode, Scale } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CitationCardProps {
  citation: Citation
  index: number
}

export function CitationCard({ citation, index }: CitationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'folio':
        return <BookOpen className="h-4 w-4" />
      case 'form':
        return <FileCode className="h-4 w-4" />
      case 'guide':
        return <FileText className="h-4 w-4" />
      case 'law':
        return <Scale className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group border border-border/60 bg-white dark:bg-gray-900/50 rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="mt-0.5 p-1.5 rounded-md bg-primary/5 text-primary shrink-0 group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-200">
          {getIcon(citation.source_type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {citation.source_type}
            </span>
          </div>
          <h4 className="text-sm font-medium leading-tight text-foreground group-hover:text-primary transition-colors truncate">
            {citation.title}
          </h4>
        </div>
        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0">
              <div className="p-3 bg-muted/30 rounded border border-border/50 text-xs text-muted-foreground leading-relaxed italic">
                &quot;{citation.excerpt}&quot;
              </div>
              {citation.url && (
                <a
                  href={citation.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 mt-2 px-1"
                >
                  View full document <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
