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
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onToggle}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                'fixed md:relative left-0 top-0 z-50 md:z-auto',
                'h-full w-[280px] bg-card border-r border-border',
                'flex flex-col shadow-xl md:shadow-none'
              )}
            >
              <div className="p-3 border-b border-border flex items-center justify-between">
                <Button
                  variant="default"
                  size="sm"
                  onClick={onNewConversation}
                  className="flex-1 mr-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Chat
                </Button>
                <Button variant="ghost" size="icon" onClick={onToggle} className="shrink-0">
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-2">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-sm text-muted-foreground">
                        {searchQuery ? 'No conversations found' : 'No conversations yet'}
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-1">
                        Start a new chat to save your conversation history
                      </p>
                    </div>
                  ) : (
                    <>
                      {pinnedConversations.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground px-2 mb-2 uppercase tracking-wider">
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
                            <p className="text-xs font-medium text-muted-foreground px-2 mb-2 uppercase tracking-wider">
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
          className="fixed left-4 top-20 z-30 md:relative md:left-0 md:top-0 md:m-2 bg-card border shadow-sm"
        >
          <PanelLeft className="h-4 w-4" />
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
        'group relative flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors mb-1',
        isActive ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
      )}
    >
      <div className="shrink-0 mt-0.5">
        <MessageSquare
          className={cn('h-4 w-4', isActive ? 'text-primary' : 'text-muted-foreground')}
        />
      </div>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Input
              value={editTitle}
              onChange={(e) => onEditChange(e.target.value)}
              className="h-7 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveEdit()
                if (e.key === 'Escape') onCancelEdit()
              }}
            />
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onSaveEdit}>
              <Check className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onCancelEdit}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <>
            <p
              className={cn(
                'text-sm font-medium truncate',
                isActive ? 'text-primary' : 'text-foreground'
              )}
            >
              {conversation.title || 'New conversation'}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {conversation.preview || 'No messages'}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {formatDate(conversation.updatedAt)}
            </p>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={onPin}>
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
              <DropdownMenuItem onClick={onStartEdit}>
                <Edit2 className="h-4 w-4 mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {conversation.isPinned && !isEditing && (
        <Pin className="absolute top-2 right-2 h-3 w-3 text-primary opacity-60" />
      )}
    </div>
  )
}
