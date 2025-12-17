'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchConversations,
  deleteConversation,
  updateConversation,
} from '@/lib/conversationApi'
import { Conversation } from '@/types/conversation'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import {
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Pin,
  PinOff,
  PanelLeftClose,
  PanelLeft,
  MoreVertical,
  Archive,
  Edit2,
  X,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

interface ConversationSidebarProps {
  isOpen: boolean
  onToggle: () => void
  activeConversationId: string | null
  onSelectConversation: (id: string | null) => void
  onNewConversation: () => void
  isAuthenticated: boolean
}

export function ConversationSidebar({
  isOpen,
  onToggle,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  isAuthenticated,
}: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['conversations', searchQuery],
    queryFn: () => fetchConversations({ search: searchQuery || undefined }),
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      if (activeConversationId) {
        onSelectConversation(null)
      }
      toast.success('Conversation deleted')
    },
    onError: () => {
      toast.error('Failed to delete conversation')
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string
      updates: { title?: string; isPinned?: boolean; isArchived?: boolean }
    }) => updateConversation(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      setEditingId(null)
    },
    onError: () => {
      toast.error('Failed to update conversation')
    },
  })

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Delete this conversation?')) {
      deleteMutation.mutate(id)
    }
  }

  const handlePin = (id: string, isPinned: boolean, e: React.MouseEvent) => {
    e.stopPropagation()
    updateMutation.mutate({ id, updates: { isPinned: !isPinned } })
  }

  const handleArchive = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    updateMutation.mutate({ id, updates: { isArchived: true } })
    toast.success('Conversation archived')
  }

  const startEditing = (conversation: Conversation, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(conversation.id)
    setEditTitle(conversation.title || '')
  }

  const saveEdit = (id: string) => {
    if (editTitle.trim()) {
      updateMutation.mutate({ id, updates: { title: editTitle.trim() } })
    }
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const conversations = data?.conversations || []
  const pinnedConversations = conversations.filter((c) => c.isPinned)
  const regularConversations = conversations.filter((c) => !c.isPinned)

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
              onClick={onToggle}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed md:relative left-0 top-0 z-50 md:z-auto',
                'h-full w-[300px] bg-white border-r border-slate-200/60',
                'flex flex-col shadow-xl md:shadow-none'
              )}
            >
              {/* Header */}
              <div className="p-4 border-b border-slate-200/60 flex items-center justify-between">
                <Button
                  onClick={onNewConversation}
                  className="flex-1 mr-2 btn-premium rounded-xl h-10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="shrink-0 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="p-3 border-b border-slate-200/60">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-emerald-500/20 focus:border-emerald-300"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin h-6 w-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-12 px-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="h-6 w-6 text-slate-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-700">
                        {searchQuery ? 'No conversations found' : 'No conversations yet'}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Start a new chat to save your history
                      </p>
                    </div>
                  ) : (
                    <>
                      {pinnedConversations.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-slate-400 px-3 mb-2 uppercase tracking-wider">
                            Pinned
                          </p>
                          {pinnedConversations.map((conv) => (
                            <ConversationItem
                              key={conv.id}
                              conversation={conv}
                              isActive={activeConversationId === conv.id}
                              isEditing={editingId === conv.id}
                              editTitle={editTitle}
                              onSelect={() => onSelectConversation(conv.id)}
                              onDelete={(e) => handleDelete(conv.id, e)}
                              onPin={(e) => handlePin(conv.id, conv.isPinned, e)}
                              onArchive={(e) => handleArchive(conv.id, e)}
                              onStartEdit={(e) => startEditing(conv, e)}
                              onEditChange={setEditTitle}
                              onSaveEdit={() => saveEdit(conv.id)}
                              onCancelEdit={cancelEdit}
                              formatDate={formatDate}
                            />
                          ))}
                        </div>
                      )}

                      {regularConversations.length > 0 && (
                        <div>
                          {pinnedConversations.length > 0 && (
                            <p className="text-xs font-semibold text-slate-400 px-3 mb-2 uppercase tracking-wider">
                              Recent
                            </p>
                          )}
                          {regularConversations.map((conv) => (
                            <ConversationItem
                              key={conv.id}
                              conversation={conv}
                              isActive={activeConversationId === conv.id}
                              isEditing={editingId === conv.id}
                              editTitle={editTitle}
                              onSelect={() => onSelectConversation(conv.id)}
                              onDelete={(e) => handleDelete(conv.id, e)}
                              onPin={(e) => handlePin(conv.id, conv.isPinned, e)}
                              onArchive={(e) => handleArchive(conv.id, e)}
                              onStartEdit={(e) => startEditing(conv, e)}
                              onEditChange={setEditTitle}
                              onSaveEdit={() => saveEdit(conv.id)}
                              onCancelEdit={cancelEdit}
                              formatDate={formatDate}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {!isOpen && isAuthenticated && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="fixed left-4 top-20 z-30 md:relative md:left-0 md:top-0 md:m-2 bg-white border border-slate-200 shadow-sm rounded-lg hover:bg-slate-50"
        >
          <PanelLeft className="h-4 w-4 text-slate-600" />
        </Button>
      )}
    </>
  )
}

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  isEditing: boolean
  editTitle: string
  onSelect: () => void
  onDelete: (e: React.MouseEvent) => void
  onPin: (e: React.MouseEvent) => void
  onArchive: (e: React.MouseEvent) => void
  onStartEdit: (e: React.MouseEvent) => void
  onEditChange: (value: string) => void
  onSaveEdit: () => void
  onCancelEdit: () => void
  formatDate: (date: string) => string
}

function ConversationItem({
  conversation,
  isActive,
  isEditing,
  editTitle,
  onSelect,
  onDelete,
  onPin,
  onArchive,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  formatDate,
}: ConversationItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group relative flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 mb-1',
        isActive
          ? 'bg-emerald-50 border border-emerald-200/60'
          : 'hover:bg-slate-50 border border-transparent'
      )}
    >
      <div className="shrink-0 mt-0.5">
        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center',
          isActive ? 'bg-emerald-100' : 'bg-slate-100'
        )}>
          <MessageSquare
            className={cn('h-4 w-4', isActive ? 'text-emerald-600' : 'text-slate-500')}
          />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Input
              value={editTitle}
              onChange={(e) => onEditChange(e.target.value)}
              className="h-7 text-sm rounded-lg"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit()
                if (e.key === 'Escape') onCancelEdit()
              }}
            />
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 rounded-lg hover:bg-emerald-50 hover:text-emerald-600" onClick={onSaveEdit}>
              <Check className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 rounded-lg hover:bg-slate-100" onClick={onCancelEdit}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <p
              className={cn(
                'text-sm font-medium line-clamp-1',
                isActive ? 'text-emerald-700' : 'text-slate-700'
              )}
            >
              {conversation.title || 'New conversation'}
            </p>
            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
              {conversation.preview || 'Start a conversation...'}
            </p>
            <p className="text-[10px] text-slate-400 mt-1.5 font-medium">
              {formatDate(conversation.updatedAt)}
            </p>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="shrink-0 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
            onClick={onDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-200/60">
              <DropdownMenuItem onClick={onPin} className="rounded-lg">
                {conversation.isPinned ? (
                  <>
                    <PinOff className="h-4 w-4 mr-2" />
                    Unpin
                  </>
                ) : (
                  <>
                    <Pin className="h-4 w-4 mr-2" />
                    Pin
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onStartEdit} className="rounded-lg">
                <Edit2 className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive} className="rounded-lg">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {conversation.isPinned && !isEditing && (
        <Pin className="absolute top-2 right-2 h-3 w-3 text-emerald-500 opacity-60" />
      )}
    </div>
  )
}
