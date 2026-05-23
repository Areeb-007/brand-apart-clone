'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '500+', label: 'Videos delivered', color: '#E63B2E' },
  { value: '100+', label: 'Happy clients',     color: '#5844D4' },
  { value: '40%',  label: 'Avg. growth boost', color: '#F96715' },
  { value: '5★',   label: 'Average rating',    color: '#1DB027' },
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

    const zoomIn = gsap.timeline({
      scrollTrigger: { trigger: outer, start: 'top 85%', end: 'top 15%', scrub: 1 },
    })
    zoomIn.fromTo(card, { scale: 0.28, opacity: 0, borderRadius: '32px' }, { scale: 1, opacity: 1, borderRadius: '20px', ease: 'power2.inOut' })

    ScrollTrigger.create({ trigger: outer, start: 'top 15%', end: '+=320', pin: card, pinSpacing: true })

    gsap.fromTo(Array.from(inner.children), { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: outer, start: 'top 10%', toggleActions: 'play none none reverse' },
    })

    return () => { ScrollTrigger.getAll().forEach((t) => { if (t.trigger === outer) t.kill() }) }
  }, [])

  return (
    <div ref={outerRef} style={{ padding: '80px 48px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '600px', position: 'relative' }}>
      <div ref={cardRef} style={{ width: '100%', maxWidth: '1100px', background: '#16163A', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '20px', overflow: 'hidden', transformOrigin: 'center center', willChange: 'transform' }}>
        <div ref={innerRef} style={{ padding: 'clamp(40px, 6vw, 72px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '20px' }}>Results that speak</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff', marginBottom: '20px' }}>
              Make every<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>frame count.</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, maxWidth: '360px', marginBottom: '32px' }}>
              Every video we produce is built to stop the scroll, tell your story, and drive real engagement — not just views.
            </p>
            <a href="#contact" className="pill-btn" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', textDecoration: 'none' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              Start a project
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right: metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {metrics.map((m) => (
              <div key={m.value} style={{ padding: '24px 20px', background: '#1E1E48', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `radial-gradient(circle, ${m.color}30, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 2.5vw, 34px)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', marginBottom: '6px' }}>{m.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom marquee stripe */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '18px 0', overflow: 'hidden' }}>
          <div className="marquee-track">
            {['Video Editing', 'Motion Graphics', 'Wedding Films', 'AI Videos', 'Social Content', 'Brand Promos', 'Graphic Design', 'Web Development',
              'Video Editing', 'Motion Graphics', 'Wedding Films', 'AI Videos', 'Social Content', 'Brand Promos', 'Graphic Design', 'Web Development'].map((n, i) => (
              <span key={i} style={{ padding: '0 32px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
