'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' }
    )
      .fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        badgeRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.4'
      )
      .fromTo(
        [card1Ref.current, card2Ref.current, card3Ref.current],
        { y: 40, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.14, ease: 'power3.out' },
        '-=0.6'
      )

    // Parallax on scroll: visual cards move up slower than the page
    if (visualRef.current) {
      gsap.to(visualRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }

    // Individual card parallax at different speeds
    const speeds = [0.4, 0.7, 1.0]
    ;[card1Ref.current, card2Ref.current, card3Ref.current].forEach((card, i) => {
      if (!card) return
      gsap.to(card, {
        y: -40 * speeds[i],
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
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
        padding: '120px 40px 80px',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '1400px',
        margin: '0 auto',
        gap: '60px',
      }}
    >
      {/* Background subtle grid */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Left: text content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'var(--fg)',
            color: 'var(--bg)',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: '#4ade80',
              borderRadius: '50%',
              display: 'inline-block',
            }}
          />
          Available for new projects
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 5.5vw, 80px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            marginBottom: '40px',
          }}
        >
          <div ref={line1Ref}>
            <span>The design</span>
            <span
              style={{
                display: 'inline-block',
                width: '0.6em',
                height: '0.6em',
                border: '3px solid var(--fg)',
                borderRadius: '50%',
                verticalAlign: 'super',
                fontSize: '0.35em',
                marginLeft: '4px',
              }}
            />
          </div>
          <div ref={line2Ref}>
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
              partner
            </span>{' '}
            <span>for top-tier</span>
          </div>
          <div ref={line3Ref}>companies.</div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--fg-muted)',
            maxWidth: '420px',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}
        >
          We craft brands, products, and digital experiences that scale.
          Strategy, design, and execution — all under one roof.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#contact" className="pill-btn pill-btn-filled">
            Book intro call
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
          <a href="#works" className="pill-btn">
            See our work
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: '64px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            opacity: 0.35,
          }}
        >
          <span style={{ fontSize: '11px', letterSpacing: '0.1em' }}>SCROLL</span>
          <div style={{ width: '48px', height: '1px', background: 'var(--fg)', overflow: 'hidden' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--fg)',
                animation: 'scrollLine 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* Right: floating visual cards */}
      <div
        ref={visualRef}
        className="parallax-visual"
        style={{
          position: 'relative',
          height: '520px',
          zIndex: 1,
        }}
      >
        {/* Card 1: Brand Identity */}
        <div
          ref={card1Ref}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '260px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--fg-muted)',
              marginBottom: '16px',
            }}
          >
            Brand Identity
          </div>
          {/* Color palette */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['#0A0A0A', '#6366F1', '#10B981', '#F59E0B', '#F8F5F0'].map((c, i) => (
              <div
                key={i}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: c,
                  border: '1px solid var(--border)',
                }}
              />
            ))}
          </div>
          {/* Logo placeholder */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px',
              background: 'var(--bg)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--fg)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid var(--bg)',
                  borderRadius: '50%',
                }}
              />
            </div>
            <div>
              <div
                style={{
                  width: '80px',
                  height: '8px',
                  background: 'var(--fg)',
                  borderRadius: '4px',
                  marginBottom: '5px',
                  opacity: 0.8,
                }}
              />
              <div
                style={{ width: '50px', height: '6px', background: 'var(--border)', borderRadius: '4px' }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Project result */}
        <div
          ref={card2Ref}
          style={{
            position: 'absolute',
            top: '80px',
            right: '0',
            width: '200px',
            background: '#0A0A0A',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '12px',
            }}
          >
            Conversion
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '42px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              marginBottom: '4px',
            }}
          >
            +40%
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
            avg. conversion lift
          </div>
          <div
            style={{
              height: '4px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: '72%',
                background: '#10B981',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>

        {/* Card 3: Testimonial snippet */}
        <div
          ref={card3Ref}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '20px',
            right: '0',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: 'var(--fg)',
              marginBottom: '14px',
              fontStyle: 'italic',
            }}
          >
            &ldquo;The website they built outperformed every version before it. Conversion went up
            40% in the first month.&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                color: 'white',
                flexShrink: 0,
              }}
            >
              DM
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600 }}>David M.</div>
              <div style={{ fontSize: '11px', color: 'var(--fg-muted)' }}>Head of Growth, Linear</div>
            </div>
          </div>
        </div>

        {/* Floating dots decoration */}
        <div
          style={{
            position: 'absolute',
            top: '180px',
            left: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            opacity: 0.3,
          }}
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px' }}>
              {[...Array(3)].map((__, j) => (
                <div
                  key={j}
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--fg)',
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
