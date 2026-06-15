'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: 'Boss Media',
    role: 'Media Agency',
    quote: 'FilmFX Studio does more than just edit videos — they bring creative ideas to life. Their graphics team is amazing, creating visuals that fit our brand perfectly.',
    rating: 5,
    initials: 'BM',
    accent: '#001941',
  },
  {
    name: 'TEO',
    role: 'Founder, Content Studio',
    quote: 'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Their attention to detail and fast communication made the whole process seamless.',
    rating: 5,
    initials: 'T',
    accent: '#e77c24',
  },
  {
    name: 'MATT',
    role: 'Creative Director',
    quote: 'FilmFX Studio created amazing custom designs that elevated our brand. Professional, easy to work with, and always open to collaborating to make everything just right.',
    rating: 5,
    initials: 'M',
    accent: '#001941',
  },
  {
    name: 'WILLIAM',
    role: 'Brand Strategist',
    quote: 'Outstanding work from start to finish. The team understood our vision and delivered beyond expectations — every frame was crafted with real purpose.',
    rating: 5,
    initials: 'W',
    accent: '#e77c24',
  },
  {
    name: 'J. THOMAS',
    role: 'Head of Growth',
    quote: 'FilmFX Studio doubled our social media engagement in just 2 months with smart, creative strategies. Truly one of a kind.',
    rating: 5,
    initials: 'JT',
    accent: '#001941',
  },
  {
    name: 'KEVIN',
    role: 'CEO, Growth Agency',
    quote: 'FilmFX Studio boosted our leads quickly with smart marketing. Real growth, not just promises — they truly care about your results.',
    rating: 5,
    initials: 'K',
    accent: '#e77c24',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
      {[...Array(count)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current.querySelector('.testimonials-header'),
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
    }
    if (cardsRef.current) {
      gsap.fromTo(Array.from(cardsRef.current.children),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' } }
      )
    }
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        padding: 'clamp(64px,8vw,100px) clamp(24px,5vw,80px)',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <div className="testimonials-header" style={{ textAlign: 'center', marginBottom: 'clamp(40px,5vw,64px)', maxWidth: '600px', margin: '0 auto clamp(40px,5vw,64px)' }}>
        <p className="section-tag" style={{ marginBottom: '12px' }}>Client Testimonials</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px,3.5vw,48px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--fg)',
          marginBottom: '14px',
        }}>
          Trusted by 100+<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>happy clients.</span>
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--fg-muted)', lineHeight: 1.7 }}>
          Don&apos;t just take our word for it — hear from the brands and creators we&apos;ve helped grow.
        </p>
      </div>

      {/* Cards grid */}
      <div
        ref={cardsRef}
        className="testimonials-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((t, i) => {
          const isDark = i % 2 === 0
          return (
            <div
              key={t.name}
              style={{
                background: isDark ? '#001941' : 'var(--bg-card)',
                border: isDark ? 'none' : '1px solid var(--border)',
                borderRadius: '20px',
                padding: 'clamp(24px,2.5vw,32px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = isDark
                  ? '0 20px 48px rgba(0,25,65,0.25)'
                  : '0 12px 32px rgba(0,25,65,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <Stars count={t.rating} />

              <p style={{
                fontSize: 'clamp(13px,1.15vw,15px)',
                color: isDark ? 'rgba(255,255,255,0.8)' : 'var(--fg-muted)',
                lineHeight: 1.75,
                fontStyle: 'italic',
                flexGrow: 1,
                marginBottom: '24px',
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                  background: isDark ? 'rgba(231,124,36,0.2)' : 'rgba(0,25,65,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '13px', fontWeight: 700,
                  color: isDark ? 'var(--accent)' : 'var(--fg)',
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: isDark ? '#fff' : 'var(--fg)', letterSpacing: '0.02em' }}>{t.name}</div>
                  <div style={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.45)' : 'var(--fg-muted)', marginTop: '2px' }}>{t.role}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
