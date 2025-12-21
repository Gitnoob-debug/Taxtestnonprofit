'use client'

import React, { ReactNode, useEffect } from 'react'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { AISidebar } from '@/components/AISidebar'
import { useAuth } from '@/hooks/useAuth'

interface SidebarLayoutProps {
  children: ReactNode
}

// Inner component that uses the sidebar context
function SidebarLayoutInner({ children }: SidebarLayoutProps) {
  const { user } = useAuth()

  return (
    <div className="relative min-h-screen">
      {/* Main content - adds padding when sidebar is open on desktop */}
      <main className="transition-all duration-300">
        {children}
      </main>

      {/* AI Sidebar - only renders for authenticated users */}
      {user && <AISidebar />}
    </div>
  )
}

// Wrapper component that provides the sidebar context
export function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarLayoutInner>{children}</SidebarLayoutInner>
    </SidebarProvider>
  )
}

// Hook to use in pages that need to adjust for sidebar
export function useSidebarPadding() {
  // This can be used in pages to add right padding when sidebar is open
  // For now, we're using fixed positioning so no padding is needed
  return {
    paddingClass: '', // Could be 'pr-96' when sidebar is open
    marginClass: ''   // Could be 'mr-96' when sidebar is open
  }
}
