'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
      .fromTo(headRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.3')
      .fromTo(subRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .fromTo(ctaRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .fromTo(imgRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')

    // parallax on scroll
    gsap.to(imgRef.current, {
      y: -60,
      ease: 'none',
      scrollTrigger: { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
    })
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '100px 48px 80px',
        gap: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(255,85,0,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

      {/* Left: text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div ref={badgeRef} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,85,0,0.15)', border: '1px solid rgba(255,85,0,0.3)', color: 'var(--accent)', borderRadius: '100px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '32px' }}>
          <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--accent)' }} />
          Cut · Enhance · Elevate
        </div>

        {/* Headline */}
        <div
          ref={headRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 4.5vw, 68px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            marginBottom: '28px',
          }}
        >
          Your creative partner<br />
          for{' '}
          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 800 }}>high-impact</span>
          <br />video edits.
        </div>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--fg-muted)', maxWidth: '440px', lineHeight: 1.75, marginBottom: '36px' }}
        >
          We help brands, creators, and businesses transform raw footage into polished videos,
          social media content, promos, wedding films, AI videos, and cinematic edits that
          capture attention and drive engagement.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none' }}>
            Book a Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#works" className="pill-btn" style={{ textDecoration: 'none' }}>
            See our work
          </a>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '52px', flexWrap: 'wrap' }}>
          {[['500+', 'Videos edited'], ['100+', 'Happy clients'], ['5★', 'Average rating']].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>{val}</div>
              <div style={{ fontSize: '12px', color: 'var(--fg-muted)', marginTop: '2px' }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: hero image */}
      <div
        ref={imgRef}
        style={{ position: 'relative', zIndex: 1, borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1' }}
      >
        <Image
          src="/images/hero/hero-1.png"
          alt="FilmFX Studio — Make it Cinematic Make it Unforgettable"
          fill
          style={{ objectFit: 'cover', borderRadius: '20px' }}
          priority
        />
        {/* Overlay glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,85,0,0.15) 0%, transparent 50%)', borderRadius: '20px', pointerEvents: 'none' }} />
      </div>
    </section>
  )
}
