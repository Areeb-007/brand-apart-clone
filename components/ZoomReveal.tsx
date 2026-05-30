'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ZoomReveal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef     = useRef<HTMLDivElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const bg      = bgRef.current
    const card    = cardRef.current
    if (!section || !bg || !card) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=700',
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
      },
    })

    // Card zooms from contained → full viewport
    tl.fromTo(
      card,
      { scale: 0.82, borderRadius: '24px' },
      { scale: 1,    borderRadius: '0px',  ease: 'none' },
      0
    )

    // Background fades cream → black in sync
    tl.fromTo(
      bg,
      { backgroundColor: '#F5F0E8' },
      { backgroundColor: '#000000', ease: 'none' },
      0
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    /* Outer section — pinned by GSAP, viewport height */
    <div
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* Background layer: cream → black */}
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
        {/* Card: starts 82% scaled (cream shows as margins), zooms to 100vw×100vh */}
        <div
          ref={cardRef}
          style={{
            width: '100vw',
            height: '100vh',
            position: 'relative',
            overflow: 'hidden',
            transformOrigin: 'center center',
            willChange: 'transform, border-radius',
          }}
        >
          {/* Featured work image */}
          <Image
            src="/images/hero-work.png"
            alt="Make it Cinematic. Make it Unforgettable."
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />

          {/* Bottom gradient + text overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(32px, 5vw, 64px)',
            }}
          >
            <p style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)',
              marginBottom: '12px',
            }}>
              Featured Work
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 68px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              maxWidth: '700px',
            }}>
              Make it Cinematic.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.5)' }}>
                Make it Unforgettable.
              </span>
            </h2>

            <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
              <a
                href="#works"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 22px', background: '#fff', color: '#0D0D0D',
                  borderRadius: '100px', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.02em', textDecoration: 'none', cursor: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0ebe2' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
              >
                View our work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
