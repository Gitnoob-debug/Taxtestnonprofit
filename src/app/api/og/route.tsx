import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'Tax Radar'
  const subtitle = searchParams.get('subtitle') || 'Free Canadian Tax Calculator & AI Assistant'
  const type = searchParams.get('type') || 'default' // default, calculator, academy

  // Color schemes based on type
  const colorSchemes = {
    default: {
      bg: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
      accent: '#fbbf24',
    },
    calculator: {
      bg: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
      accent: '#fbbf24',
    },
    academy: {
      bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
      accent: '#fbbf24',
    },
  }

  const scheme = colorSchemes[type as keyof typeof colorSchemes] || colorSchemes.default

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: scheme.bg,
          padding: '60px',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        {/* Logo/Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            Tax Radar
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? '48px' : '64px',
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.1,
              margin: '0 0 20px 0',
              textAlign: 'center',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255, 255, 255, 0.85)',
              margin: 0,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '12px 24px',
            borderRadius: '999px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: scheme.accent,
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: 'white',
              fontWeight: '500',
            }}
          >
            taxradar.ca • Updated for 2025
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
