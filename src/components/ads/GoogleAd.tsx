'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface GoogleAdProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
}

export function GoogleAd({
  slot,
  format = 'auto',
  style,
  className = '',
  responsive = true
}: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    // Only load ad once
    if (isAdLoaded.current) return

    // Check if AdSense script is loaded
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        isAdLoaded.current = true
        window.adsbygoogle.push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [])

  // Don't render in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center ${className}`}>
        <p className="text-sm text-slate-500">Google Ad Placeholder</p>
        <p className="text-xs text-slate-400">Slot: {slot}</p>
      </div>
    )
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  )
}

// Specific ad components for different placements
export function ChatResponseAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-4 ${className}`}>
      <p className="text-xs text-slate-400 mb-2">Sponsored</p>
      <GoogleAd
        slot={process.env.NEXT_PUBLIC_AD_SLOT_CHAT || ''}
        format="rectangle"
        className="min-h-[250px]"
      />
      <p className="text-xs text-slate-400 mt-1 text-center">
        Ads help keep our service free
      </p>
    </div>
  )
}

export function SidebarAd({ className = '' }: { className?: string }) {
  return (
    <GoogleAd
      slot={process.env.NEXT_PUBLIC_AD_SLOT_SIDEBAR || ''}
      format="vertical"
      className={`min-h-[600px] ${className}`}
    />
  )
}

export function BannerAd({ className = '' }: { className?: string }) {
  return (
    <GoogleAd
      slot={process.env.NEXT_PUBLIC_AD_SLOT_BANNER || ''}
      format="horizontal"
      className={`min-h-[90px] ${className}`}
    />
  )
}
