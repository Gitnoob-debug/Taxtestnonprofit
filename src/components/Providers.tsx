'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { useState } from 'react'

// Wrapper that safely passes user ID to SidebarProvider
function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return <SidebarProvider userId={user?.id}>{children}</SidebarProvider>
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <SidebarWrapper>{children}</SidebarWrapper>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
