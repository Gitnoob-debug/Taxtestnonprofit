'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogIn, User, LogOut } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { user, loading, signIn, signOut } = useAuth()

  const handleSignIn = () => {
    signIn()
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'
  const avatarUrl = user?.user_metadata?.avatar_url
  const email = user?.email

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">YM</span>
          </div>
          <span className="font-semibold text-lg text-slate-900 dark:text-white hidden sm:inline">
            Tax Assistant
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback className="bg-teal-100 text-teal-700">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{displayName}</p>
                      <p className="text-xs text-muted-foreground">{email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              onClick={handleSignIn}
              className="gap-2 bg-teal-600 hover:bg-teal-700"
              size="sm"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign in with Google</span>
              <span className="sm:hidden">Sign in</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
