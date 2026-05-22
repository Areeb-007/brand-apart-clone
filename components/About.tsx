'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { raw: 500, suffix: '+', label: 'Videos delivered' },
  { raw: 100, suffix: '+', label: 'Happy clients' },
  { raw: 5,   suffix: '★', label: 'Average rating' },
  { raw: 3,   suffix: 'yr', label: 'In the industry' },
]

export default function About() {
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
      })
    }

    if (statsRef.current) {
      gsap.fromTo(Array.from(statsRef.current.children), { y: 30, opacity: 0, scale: 0.96 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 82%' },
      })

      stats.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.raw, duration: 2, ease: 'power2.out',
          onUpdate: () => { el.textContent = `${Math.round(obj.val)}${stat.suffix}` },
          scrollTrigger: { trigger: statsRef.current, start: 'top 82%', once: true },
        })
      })
    }
  }, [])

  return (
    <section id="about" style={{ padding: '100px 48px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Left */}
        <div ref={textRef}>
          <p className="section-tag" style={{ marginBottom: '12px' }}>About FilmFX Studio</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 3.5vw, 50px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '24px', color: '#fff' }}>
            We cut stories
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>into cinema.</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '16px' }}>
            FilmFX Studio is a full-service creative agency specializing in video editing, graphic design, social media marketing, and digital growth. We work with brands, creators, and businesses to transform raw ideas into polished, high-impact content.
          </p>
          <p style={{ fontSize: '15px', color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
            From cinematic edits and wedding films to AI videos and brand campaigns — every frame we touch is crafted to capture attention, tell a story, and drive real results.
          </p>
          <a href="#contact" className="pill-btn" style={{ textDecoration: 'none' }}>
            Work with us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right: stats */}
        <div ref={statsRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ padding: '36px 28px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: i === 0 ? 'radial-gradient(circle at 0% 100%, rgba(230,59,46,0.1), transparent 60%)'
                  : i === 1 ? 'radial-gradient(circle at 100% 0%, rgba(88,68,212,0.1), transparent 60%)'
                  : i === 2 ? 'radial-gradient(circle at 0% 0%, rgba(255,85,0,0.1), transparent 60%)'
                  : 'radial-gradient(circle at 100% 100%, rgba(29,176,39,0.1), transparent 60%)',
              }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px', color: '#fff', position: 'relative' }}>
                <span ref={(el) => { counterRefs.current[i] = el }}>0{stat.suffix}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--fg-muted)', position: 'relative' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
