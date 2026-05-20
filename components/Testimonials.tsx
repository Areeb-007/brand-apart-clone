'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'Brand Appart completely transformed how we show up in the market. The rebrand gave us the confidence to go after enterprise clients we never thought we could win.',
    author: 'Sarah K.',
    role: 'CEO, Incard',
    initials: 'SK',
    color: '#6366F1',
  },
  {
    quote:
      "Working with the team was like having a senior design lead embedded in our company. They understood our product deeply — not just the visuals, but the entire user journey.",
    author: 'Marcus T.',
    role: 'CPO, Runway',
    initials: 'MT',
    color: '#10B981',
  },
  {
    quote:
      "Our pitch deck got us into meetings with top-tier VCs in week one. I've used other agencies before — the quality and speed here is genuinely unmatched.",
    author: 'Léa B.',
    role: 'Founder, Sowbeez',
    initials: 'LB',
    color: '#F59E0B',
  },
  {
    quote:
      'The website they built for us outperformed every version we had before it. Conversion went up 40% in the first month. The animations alone were worth the investment.',
    author: 'David M.',
    role: 'Head of Growth, Linear',
    initials: 'DM',
    color: '#3B82F6',
  },
  {
    quote:
      "They don't just make things pretty — they make things work. Every design decision was backed by strategy and data. Exactly what we needed at Series A.",
    author: 'Anna R.',
    role: 'Co-founder, Pitch',
    initials: 'AR',
    color: '#A78BFA',
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const active = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p className="section-tag" style={{ marginBottom: '48px', textAlign: 'center' }}>
          Client testimonials
        </p>

        {/* Quote */}
        <div style={{ position: 'relative', minHeight: '160px', marginBottom: '48px' }}>
          <svg
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            style={{ marginBottom: '24px', opacity: 0.12 }}
          >
            <path
              d="M0 36V21.6C0 9.6 7.2 2.4 21.6 0l2.4 4.8C15.6 6.4 11.2 10.4 10.4 16H20V36H0zm28 0V21.6C28 9.6 35.2 2.4 49.6 0L52 4.8C43.6 6.4 39.2 10.4 38.4 16H48V36H28z"
              fill="var(--fg)"
            />
          </svg>
          <p
            ref={quoteRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 500,
              lineHeight: 1.5,
              letterSpacing: '-0.02em',
              color: 'var(--fg)',
            }}
          >
            {active.quote}
          </p>
        </div>

        {/* Author */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: active.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            {active.initials}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '15px' }}>{active.author}</div>
            <div style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{active.role}</div>
          </div>
        </div>

        {/* Navigation dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '100px',
                background: i === activeIndex ? 'var(--fg)' : 'var(--border)',
                border: 'none',
                cursor: 'none',
                transition: 'width 0.3s ease, background 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
