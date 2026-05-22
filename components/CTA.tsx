'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (innerRef.current) {
      gsap.fromTo(
        Array.from(innerRef.current.children),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: innerRef.current, start: 'top 80%' },
        }
      )
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '120px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,85,0,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div ref={innerRef} style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
        <p className="section-tag" style={{ marginBottom: '24px' }}>Start a Project</p>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0, marginBottom: '24px', color: '#fff' }}>
          Make every frame
          <br />
          <span style={{ color: 'var(--accent)', fontStyle: 'italic', fontWeight: 800 }}>work for your brand!</span>
        </h2>

        <p style={{ fontSize: '18px', color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '12px' }}>
          Create videos that stop the scroll.
        </p>
        <p style={{ fontSize: '15px', color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px' }}>
          Tell us about your project — we&apos;ll get back to you within 24 hours to schedule a discovery call.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <a href="mailto:hello@filmfxstudio.com" className="pill-btn pill-btn-filled" style={{ fontSize: '16px', padding: '16px 32px', textDecoration: 'none' }}>
            Book a Call Now
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="mailto:hello@filmfxstudio.com" className="pill-btn" style={{ fontSize: '16px', padding: '16px 32px', textDecoration: 'none' }}>
            Send an Email
          </a>
        </div>

        {/* Social proof */}
        <div style={{ marginTop: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {['#E63B2E', '#5844D4', '#F96715', '#1DB027', '#11204B'].map((c, i) => (
              <div key={i} style={{ width: '34px', height: '34px', borderRadius: '50%', background: c, marginLeft: i > 0 ? '-10px' : '0', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff' }}>
                {['B', 'T', 'K', 'A', 'J'][i]}
              </div>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>
            Trusted by <strong style={{ color: '#fff' }}>100+ creators & brands</strong> worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
