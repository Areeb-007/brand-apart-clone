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

const CARD   = 190
const RADIUS = 310

export default function MoreWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const circleRef  = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const circle  = circleRef.current
    const text    = textRef.current
    if (!section || !circle || !text) return

    // No pin / sticky — just scrub-drive the rotation as the section
    // naturally passes through the viewport (top bottom → bottom top).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end:   'bottom top',
        scrub: 1.2,
      },
    })

    tl.fromTo(text,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.25 },
      0.05
    )

    tl.fromTo(circle,
      { rotation: -20, scale: 0.82 },
      { rotation: 190, scale: 1.12, ease: 'none', duration: 1 },
      0
    )

    cardRefs.current.filter(Boolean).forEach((card) => {
      tl.fromTo(card!,
        { rotation: 20 },
        { rotation: -190, ease: 'none', duration: 1 },
        0
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#001941',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Center text */}
      <div
        ref={textRef}
        className="morework-text"
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
        }}>
          From weddings to corporate films — every frame crafted with purpose.
        </p>

        <a
          href="#contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 26px', background: '#fff', color: '#001941',
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

      {/* Orbit wheel */}
      <div
        ref={circleRef}
        className="orbit-wheel"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width:  `${(RADIUS + CARD) * 2}px`,
          height: `${(RADIUS + CARD) * 2}px`,
          willChange: 'transform',
        }}
      >
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
  )
}
