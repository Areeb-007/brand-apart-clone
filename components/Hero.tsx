'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const headRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(headRef.current,  { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo(subRef.current,   { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .fromTo(ctaRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .fromTo(statsRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
  }, [])

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 100px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 40%, rgba(255,85,0,0.05) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Heading */}
      <div
        ref={headRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 8vw, 118px)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.04em',
          color: 'var(--fg)',
          maxWidth: '1200px',
          margin: '0 auto 32px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Your creative partner<br />
        for{' '}
        <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>high-impact</span>
        {' '}video edits.
      </div>

      {/* Subtitle */}
      <p
        ref={subRef}
        style={{
          fontSize: 'clamp(16px, 1.6vw, 20px)',
          color: 'var(--fg-muted)',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        We help brands, creators, and businesses transform raw footage into polished videos,
        social media content, promos, and cinematic edits that capture attention and drive engagement.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none', fontSize: '13px', letterSpacing: '0.04em', fontWeight: 700 }}>
          BOOK AN INTRO CALL
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
        <a href="#works" className="pill-btn" style={{ textDecoration: 'none' }}>
          See our work
        </a>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef}
        style={{
          display: 'flex',
          gap: '48px',
          marginTop: '64px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {[['500+', 'Videos edited'], ['100+', 'Happy clients'], ['5★', 'Average rating']].map(([val, lbl]) => (
          <div key={lbl} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.03em' }}>{val}</div>
            <div style={{ fontSize: '12px', color: 'var(--fg-muted)', marginTop: '4px', letterSpacing: '0.04em' }}>{lbl}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
