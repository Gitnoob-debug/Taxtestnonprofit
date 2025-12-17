'use client'

import { Message } from '@/types/tax'
import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { CitationCard } from './CitationCard'
import { Bot, User, AlertTriangle, ShieldCheck, Info, Sparkles, Coins, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

interface MessageBubbleProps {
  message: Message
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  const ConfidenceBadge = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
    const config = {
      high: {
        icon: ShieldCheck,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        label: 'High Confidence',
      },
      medium: {
        icon: Info,
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        label: 'Medium Confidence',
      },
      low: {
        icon: AlertTriangle,
        color: 'text-red-700 bg-red-50 border-red-200',
        label: 'Low Confidence',
      },
    }
    const { icon: Icon, color, label } = config[level]

    return (
      <div
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold border uppercase tracking-wide w-fit',
          color
        )}
      >
        <Icon className="h-3 w-3" />
        {label}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-4 w-full max-w-3xl mx-auto mb-8',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-1',
          isUser
            ? 'bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg shadow-slate-800/20'
            : 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/20'
        )}
      >
        {isUser ? <User className="h-5 w-5 text-white" /> : <Leaf className="h-5 w-5 text-white" />}
      </div>

      <div className={cn('flex flex-col gap-2 max-w-[85%]', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'p-5 rounded-2xl',
            isUser
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-tr-md shadow-lg shadow-slate-800/10'
              : 'card-premium rounded-tl-md'
          )}
        >
          <div className="tax-response">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p
                    className={cn(
                      'mb-4 leading-relaxed last:mb-0',
                      isUser ? 'text-white/95' : 'text-slate-700'
                    )}
                  >
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong
                    className={cn(
                      'font-semibold',
                      isUser ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ml-0 space-y-2 last:mb-0">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ml-0 space-y-2 last:mb-0">{children}</ol>
                ),
                li: ({ children }) => {
                  return (
                    <li
                      className={cn(
                        'flex items-start gap-3',
                        isUser ? 'text-white/95' : 'text-slate-700'
                      )}
                    >
                      <span className={cn(
                        "mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full",
                        isUser ? "bg-emerald-400" : "bg-emerald-500"
                      )} />
                      <span className="leading-relaxed">{children}</span>
                    </li>
                  )
                },
                h1: ({ children }) => (
                  <h1
                    className={cn(
                      'mb-4 text-lg font-bold',
                      isUser ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2
                    className={cn(
                      'mb-3 mt-5 text-base font-bold',
                      isUser ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3
                    className={cn(
                      'mb-2 mt-4 text-sm font-bold',
                      isUser ? 'text-white' : 'text-slate-900'
                    )}
                  >
                    {children}
                  </h3>
                ),
                code: ({ children }) => (
                  <code className={cn(
                    "rounded px-1.5 py-0.5 text-sm font-medium",
                    isUser ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"
                  )}>
                    {children}
                  </code>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={cn(
                    "my-4 border-l-4 py-3 pl-4 pr-3 rounded-r",
                    isUser
                      ? "border-emerald-400 bg-white/10 text-white/90"
                      : "border-amber-400 bg-amber-50 text-slate-700"
                  )}>
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className={cn(
                  "my-5",
                  isUser ? "border-white/20" : "border-slate-200"
                )} />,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className={cn(
                      "underline underline-offset-2",
                      isUser
                        ? "text-emerald-300 hover:text-emerald-200 decoration-emerald-300/30 hover:decoration-emerald-200"
                        : "text-emerald-600 hover:text-emerald-700 decoration-emerald-600/30 hover:decoration-emerald-700"
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {!isUser && (
          <div className="w-full space-y-4 mt-1">
            {message.citations && message.citations.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Sources & References
                  </h3>
                  {message.confidence && <ConfidenceBadge level={message.confidence} />}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {message.citations.map((citation, idx) => (
                    <CitationCard key={idx} citation={citation} index={idx} />
                  ))}
                </div>
              </div>
            )}

            {message.disclaimer && (
              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex gap-2.5 items-start text-xs text-amber-800">
                <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                <p>{message.disclaimer}</p>
              </div>
            )}

            {message.usage && (
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
                  {message.usage.total_tokens.toLocaleString()} tokens
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                  <Coins className="h-3.5 w-3.5 text-amber-500" />
                  ${message.usage.estimated_cost.toFixed(4)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
