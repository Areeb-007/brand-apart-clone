'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  { src: '/images/testimonials/1.jpg', name: 'Boss Media' },
  { src: '/images/testimonials/2.jpg', name: 'TEO' },
  { src: '/images/testimonials/3.jpg', name: 'MATT' },
  { src: '/images/testimonials/4.jpg', name: 'WILLIAM' },
  { src: '/images/testimonials/5.jpg', name: 'J. THOMAS' },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // Auto-rotate every 4s
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000)
    return () => clearInterval(t)
  }, [])

  // Fade image on change
  useEffect(() => {
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' })
    }
  }, [active])

  // Entrance animation
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ padding: '100px 48px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p className="section-tag" style={{ textAlign: 'center', marginBottom: '48px' }}>Client Testimonials</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Active testimonial image */}
          <div ref={imgRef} style={{ borderRadius: '20px', overflow: 'hidden', position: 'relative', aspectRatio: '500/600' }}>
            <Image
              src={testimonials[active].src}
              alt={`Testimonial from ${testimonials[active].name}`}
              fill
              style={{ objectFit: 'cover', borderRadius: '20px' }}
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </div>

          {/* Selector + thumbnails */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: '12px' }}>
              Trusted by<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>100+ happy clients.</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '36px' }}>
              Don&apos;t just take our word for it — hear from the brands and creators we&apos;ve helped grow.
            </p>

            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '10px 14px', borderRadius: '12px', border: 'none',
                    background: i === active ? 'rgba(255,85,0,0.12)' : 'rgba(255,255,255,0.04)',
                    outline: i === active ? '1px solid rgba(255,85,0,0.3)' : '1px solid transparent',
                    cursor: 'none', transition: 'all 0.25s', textAlign: 'left',
                  }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                    <Image src={t.src} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: i === active ? '#fff' : 'var(--fg-muted)', transition: 'color 0.2s' }}>{t.name}</div>
                    <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                      {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#FBBF24', fontSize: '10px' }}>★</span>)}
                    </div>
                  </div>
                  {i === active && (
                    <div style={{ marginLeft: 'auto', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
                  )}
                </button>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '24px' }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{ width: i === active ? '24px' : '6px', height: '6px', borderRadius: '100px', background: i === active ? 'var(--accent)' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'none', transition: 'all 0.3s', padding: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
