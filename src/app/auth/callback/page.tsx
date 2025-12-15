'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) {
        router.push('/')
        return
      }

      const { error } = await supabase.auth.getSession()
      if (error) {
        console.error('Auth callback error:', error)
      }

      router.push('/')
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-600" />
        <p className="mt-4 text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  )
}
