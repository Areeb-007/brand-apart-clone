'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '120+', label: 'Projects delivered', color: '#6366F1' },
  { value: '€15M+', label: 'Raised by clients', color: '#10B981' },
  { value: '40%', label: 'Avg. conversion lift', color: '#F59E0B' },
  { value: '98%', label: 'Client satisfaction', color: '#3B82F6' },
]

export default function ZoomReveal() {
  const outerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const card = cardRef.current
    const inner = innerRef.current
    if (!outer || !card || !inner) return

    // Phase 1: card zooms from tiny widget to full-screen as you scroll in
    const zoomIn = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        start: 'top 85%',
        end: 'top 15%',
        scrub: 1,
      },
    })
    zoomIn.fromTo(
      card,
      { scale: 0.28, opacity: 0, borderRadius: '32px' },
      { scale: 1, opacity: 1, borderRadius: '20px', ease: 'power2.inOut' }
    )

    // Phase 2: pin at full-screen for a moment, then let page scroll
    ScrollTrigger.create({
      trigger: outer,
      start: 'top 15%',
      end: '+=320',
      pin: card,
      pinSpacing: true,
    })

    // Phase 3: inner content fades in once fully visible
    gsap.fromTo(
      inner.children,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: outer,
          start: 'top 10%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === outer) t.kill()
      })
    }
  }, [])

  return (
    <div
      ref={outerRef}
      style={{
        padding: '80px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '600px',
        position: 'relative',
      }}
    >
      <div
        ref={cardRef}
        style={{
          width: '100%',
          maxWidth: '1100px',
          background: 'var(--fg)',
          borderRadius: '20px',
          overflow: 'hidden',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <div
          ref={innerRef}
          style={{
            padding: 'clamp(40px, 6vw, 80px)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left: headline */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: '20px',
              }}
            >
              Results that speak
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: 'white',
                marginBottom: '24px',
              }}
            >
              Make every
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>
                pixel pay.
              </span>
            </h2>
            <p
              style={{
                fontSize: '15px',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                maxWidth: '380px',
                marginBottom: '32px',
              }}
            >
              Design isn't decoration. Every decision we make is tied to a measurable business outcome —
              conversion, retention, or fundraising.
            </p>
            <a
              href="#contact"
              className="pill-btn"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(255,255,255,0.1)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
              }}
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          {/* Right: metrics grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {metrics.map((m) => (
              <div
                key={m.value}
                style={{
                  padding: '28px 24px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${m.color}30, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 2.5vw, 36px)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: 'white',
                    marginBottom: '6px',
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stripe with logo scroll */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '20px 0',
            overflow: 'hidden',
          }}
        >
          <div className="marquee-track">
            {['Forbes', 'Incard', 'Sowbeez', 'Ircam', 'Stables', 'Jaws Group', 'Runway', 'We Are',
              'Forbes', 'Incard', 'Sowbeez', 'Ircam', 'Stables', 'Jaws Group', 'Runway', 'We Are'].map((n, i) => (
              <span
                key={i}
                style={{
                  padding: '0 40px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'rgba(255,255,255,0.2)',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
