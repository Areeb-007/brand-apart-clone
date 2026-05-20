'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="contact"
      style={{
        padding: '160px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blur circles */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        ref={sectionRef}
        style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}
      >
        <p className="section-tag" style={{ marginBottom: '24px' }}>
          Start a project
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: '32px',
          }}
        >
          Ready to build
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
            something great?
          </span>
        </h2>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--fg-muted)',
            lineHeight: 1.7,
            marginBottom: '48px',
            maxWidth: '520px',
            margin: '0 auto 48px',
          }}
        >
          Tell us about your project. We&apos;ll get back to you within 24 hours to schedule a
          discovery call.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="mailto:hello@brandappart.com"
            className="pill-btn pill-btn-filled"
            style={{ fontSize: '16px', padding: '16px 32px' }}
          >
            Book a call now
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="mailto:hello@brandappart.com"
            className="pill-btn"
            style={{ fontSize: '16px', padding: '16px 32px' }}
          >
            Send an email
          </a>
        </div>

        {/* Social proof */}
        <div
          style={{
            marginTop: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {['#6366F1', '#10B981', '#F59E0B', '#3B82F6', '#A78BFA'].map((color, i) => (
              <div
                key={i}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: color,
                  marginLeft: i > 0 ? '-10px' : '0',
                  border: '2px solid var(--bg)',
                }}
              />
            ))}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--fg-muted)' }}>
            Trusted by <strong style={{ color: 'var(--fg)' }}>120+ companies</strong> worldwide
          </p>
        </div>
      </div>
    </section>
  )
}
