'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { raw: 120, suffix: '+', label: 'Projects delivered' },
  { raw: 4, suffix: 'yr', label: 'In business' },
  { raw: 98, suffix: '%', label: 'Client satisfaction' },
  { raw: 10, suffix: '', label: 'Team members' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
          },
        }
      )
    }

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
          },
        }
      )

      // Counter animations
      stats.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.raw,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${stat.suffix}`
          },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 82%',
            once: true,
          },
        })
      })
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left */}
        <div ref={textRef}>
          <p className="section-tag" style={{ marginBottom: '12px' }}>
            About us
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 3.5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}
          >
            Small team.
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
              Big results.
            </span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--fg-muted)',
              lineHeight: 1.8,
              marginBottom: '16px',
            }}
          >
            We&apos;re a boutique design studio founded by ex-agency leads who got tired of bloated
            processes and slow timelines. We work with a curated set of clients — giving each
            project the attention it deserves.
          </p>
          <p
            style={{
              fontSize: '16px',
              color: 'var(--fg-muted)',
              lineHeight: 1.8,
              marginBottom: '40px',
            }}
          >
            No junior designers doing your work while a senior takes the credit. Every project is
            handled by the people you meet at the kickoff.
          </p>
          <a href="#contact" className="pill-btn">
            Work with us
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Right — Stats with counter animation */}
        <div
          ref={statsRef}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '40px 32px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle background glow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    i === 0
                      ? 'radial-gradient(circle at 0% 100%, rgba(99,102,241,0.06), transparent 60%)'
                      : i === 1
                      ? 'radial-gradient(circle at 100% 0%, rgba(16,185,129,0.06), transparent 60%)'
                      : i === 2
                      ? 'radial-gradient(circle at 0% 0%, rgba(245,158,11,0.06), transparent 60%)'
                      : 'radial-gradient(circle at 100% 100%, rgba(59,130,246,0.06), transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
              <div
                className="stat-num"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 4vw, 56px)',
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '8px',
                  position: 'relative',
                }}
              >
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el
                  }}
                >
                  0{stat.suffix}
                </span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--fg-muted)', position: 'relative' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
