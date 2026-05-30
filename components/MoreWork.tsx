'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { id: 1, src: '/images/portfolio/work-1.png', label: 'Social Media Reel' },
  { id: 2, src: '/images/portfolio/work-2.png', label: 'Brand Promo' },
  { id: 3, src: '/images/portfolio/work-3.png', label: 'Cinematic Edit' },
  { id: 4, src: '/images/portfolio/work-4.png', label: 'Product Showcase' },
  { id: 5, src: '/images/portfolio/work-5.png', label: 'Motion Graphics' },
  { id: 6, src: '/images/portfolio/work-6.png', label: 'Brand Content' },
  { id: 7, src: '/images/video-editing/1.jpg',  label: 'Wedding Film' },
  { id: 8, src: '/images/video-editing/2.jpg',  label: 'Corporate Video' },
]

const CARD   = 190   // px — square card size
const RADIUS = 310   // px — orbit radius

export default function MoreWork() {
  const outerRef  = useRef<HTMLDivElement>(null)  // tall scroll container
  const stickyRef = useRef<HTMLDivElement>(null)  // viewport-height sticky layer
  const bgRef     = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const textRef   = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const outer  = outerRef.current
    const bg     = bgRef.current
    const circle = circleRef.current
    const text   = textRef.current
    if (!outer || !bg || !circle || !text) return

    // Single timeline driven from the moment the section enters the viewport
    // (top bottom) all the way until it exits (bottom top).
    // CSS sticky keeps the visible content locked to the viewport throughout.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        start: 'top bottom',  // starts as section peeks in from the bottom
        end:   'bottom top',  // ends as section disappears from the top
        scrub: 1.5,
      },
    })

    // Background: cream → dark (completes in the first ~28% of the scroll journey,
    // i.e. by the time the section is fully in view)
    tl.fromTo(bg,
      { backgroundColor: '#F5F0E8' },
      { backgroundColor: '#0A0A0A', ease: 'none', duration: 0.3 },
      0
    )

    // Text fades in just after the bg starts going dark
    tl.fromTo(text,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.2 },
      0.08
    )

    // Orbit rotates clockwise throughout the full scroll journey
    tl.fromTo(circle,
      { rotation: -8 },
      { rotation: 200, ease: 'none', duration: 1.15 },
      0
    )

    // Cards counter-rotate to stay upright while orbiting
    const validCards = cardRefs.current.filter(Boolean)
    validCards.forEach((card) => {
      tl.fromTo(card!,
        { rotation: 8 },
        { rotation: -200, ease: 'none', duration: 1.15 },
        0
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === outer) t.kill()
      })
    }
  }, [])

  return (
    // Outer container — 250vh gives plenty of scroll room for the animation
    <div ref={outerRef} style={{ height: '250vh' }}>

      {/* Sticky viewport-height layer — stays locked while outer scrolls */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Animated background layer */}
        <div
          ref={bgRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#F5F0E8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

          {/* ── Center text (z-index above orbit) ── */}
          <div
            ref={textRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              zIndex: 10,
              textAlign: 'center',
              pointerEvents: 'none',
              width: 'max-content',
            }}
          >
            <p style={{
              fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
              marginBottom: '12px',
            }}>
              See More Work
            </p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(34px, 4.2vw, 62px)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: '#fff',
            }}>
              500+ Projects<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>
                delivered.
              </span>
            </h2>

            <p style={{
              fontSize: '14px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7,
              marginTop: '14px', marginBottom: '26px', maxWidth: '320px',
              textWrap: 'balance',
            } as React.CSSProperties}>
              From weddings to corporate films — every frame crafted with purpose.
            </p>

            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', background: '#fff', color: '#0D0D0D',
                borderRadius: '100px', fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.02em', textDecoration: 'none', cursor: 'none',
                transition: 'background 0.2s', pointerEvents: 'all',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0ebe2' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* ── Orbit wheel — centered ── */}
          <div
            ref={circleRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              // translate so the wheel center is at viewport center
              transform: 'translate(-50%, -50%)',
              width:  `${(RADIUS + CARD) * 2}px`,
              height: `${(RADIUS + CARD) * 2}px`,
              willChange: 'transform',
            }}
          >
            {/* Orbit guide ring */}
            <div style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width:  `${RADIUS * 2}px`,
              height: `${RADIUS * 2}px`,
              borderRadius: '50%',
              border: '1px dashed rgba(255,255,255,0.08)',
              pointerEvents: 'none',
            }} />

            {ITEMS.map((item, i) => {
              const angle = (2 * Math.PI / ITEMS.length) * i - Math.PI / 2
              const cx    = RADIUS * Math.cos(angle)
              const cy    = RADIUS * Math.sin(angle)

              return (
                <div
                  key={item.id}
                  ref={(el) => { cardRefs.current[i] = el }}
                  style={{
                    position: 'absolute',
                    left:   `calc(50% + ${cx}px)`,
                    top:    `calc(50% + ${cy}px)`,
                    transform: 'translate(-50%, -50%)',
                    width:  `${CARD}px`,
                    height: `${CARD}px`,
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 6px 28px rgba(0,0,0,0.4)',
                    willChange: 'transform',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes={`${CARD}px`}
                  />
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
