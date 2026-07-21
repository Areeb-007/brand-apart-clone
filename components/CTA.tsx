'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { label: 'Instagram', icon: '/images/social/instagram.png', href: '#' },
  { label: 'TikTok',    icon: '/images/social/tiktok.png',    href: '#' },
  { label: 'Facebook',  icon: '/images/social/facebook.png',  href: '#' },
  { label: 'YouTube',   icon: '/images/social/youtube.png',   href: '#' },
  { label: 'Pinterest', icon: '/images/social/pinterest.png', href: '#' },
  { label: 'X',         icon: '/images/social/x.png',         href: '#' },
  { label: 'Behance',   icon: '/images/social/behance.png',   href: '#' },
]

const CHARMS = [
  '/images/charms/charm-1.png',
  '/images/charms/charm-2.png',
  '/images/charms/charm-3.png',
  '/images/charms/charm-4.png',
  '/images/charms/charm-5.png',
  '/images/charms/charm-6.png',
  '/images/charms/charm-7.png',
]

export default function CTA() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const charmRef    = useRef<HTMLDivElement>(null)
  const charmImgRef = useRef<HTMLImageElement>(null)
  const charmIdxRef = useRef(0)
  const ctaRowRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Scroll-driven background: cream → black as section enters viewport
    gsap.fromTo(section,
      { backgroundColor: '#F5F0E8' },
      {
        backgroundColor: '#0d0d0d',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 95%',
          end:   'top 20%',
          scrub: 1.2,
        },
      }
    )

    // Heading lines fade in once background is mostly dark
    if (headRef.current) {
      gsap.fromTo(
        Array.from(headRef.current.children),
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 65%' },
        }
      )
    }

    // CTA row fades in
    if (ctaRowRef.current) {
      gsap.fromTo(ctaRowRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ctaRowRef.current, start: 'top 75%' } }
      )
    }

    // Space bounce — native rAF for zero-overhead per-frame updates
    const charm = charmRef.current
    let rafId = 0

    if (charm) {
      const cW = charm.offsetWidth  || 220
      const cH = charm.offsetHeight || 220
      const sW = section.offsetWidth
      const sH = section.offsetHeight
      const BX = sW / 2 - cW / 2 - 16
      const BY = sH / 2 - cH / 2 - 16

      const bounce = { x: BX * 0.55, y: -BY * 0.3, vx: -220, vy: 165, rot: 0, rotV: 45 }

      // Prime transform so first paint is correct (no GSAP set — direct style)
      charm.style.transform = `translate(calc(-50% + ${bounce.x}px), calc(-50% + ${bounce.y}px)) rotate(${bounce.rot}deg)`

      let prev = performance.now()

      const loop = (now: number) => {
        const dt = Math.min((now - prev) / 1000, 0.05)
        prev = now

        bounce.x   += bounce.vx  * dt
        bounce.y   += bounce.vy  * dt
        bounce.rot += bounce.rotV * dt

        let hit = false
        if (bounce.x >= BX || bounce.x <= -BX) {
          bounce.vx *= -1
          bounce.x   = Math.max(-BX, Math.min(BX, bounce.x))
          hit = true
        }
        if (bounce.y >= BY || bounce.y <= -BY) {
          bounce.vy *= -1
          bounce.y   = Math.max(-BY, Math.min(BY, bounce.y))
          hit = true
        }

        if (hit && charmImgRef.current) {
          charmIdxRef.current = (charmIdxRef.current + 1) % CHARMS.length
          charmImgRef.current.src = CHARMS[charmIdxRef.current]
        }

        // Direct style write — fastest possible path, no GSAP overhead
        charm.style.transform = `translate(calc(-50% + ${bounce.x}px), calc(-50% + ${bounce.y}px)) rotate(${bounce.rot}deg)`

        rafId = requestAnimationFrame(loop)
      }

      rafId = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(rafId)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-nav-dark
      style={{
        background:  'var(--bg)',
        minHeight:   '100vh',
        display:     'flex',
        flexDirection: 'column',
        alignItems:  'center',
        justifyContent: 'center',
        position:    'relative',
        overflow:    'hidden',
        paddingTop:  'clamp(48px, 7vw, 96px)',
        paddingBottom: 'clamp(64px, 9vw, 120px)',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 40% 55%, rgba(231,124,36,0.07) 0%, transparent 70%)',
      }} />

      {/* Social pill links */}
      <div style={{
        display: 'flex', gap: '6px', marginBottom: 'clamp(48px, 7vw, 96px)',
        position: 'relative', zIndex: 2,
      }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              textDecoration: 'none',
              cursor: 'none',
              overflow: 'hidden',
              display: 'block',
              transition: 'transform 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
          >
            <Image
              src={s.icon}
              alt={s.label}
              width={54}
              height={54}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </a>
        ))}
      </div>

      {/* Heading — centered */}
      <div
        ref={headRef}
        style={{
          width:     '100%',
          textAlign: 'center',
          position:  'relative',
          zIndex:    2,
          padding:   '0 clamp(24px, 4vw, 80px)',
        }}
      >
        <div style={{
          fontFamily:    "var(--font-neue-montreal)",
          fontSize:      'clamp(52px, 8.5vw, 132px)',
          fontWeight:    900,
          letterSpacing: '-0.01em',
          lineHeight:    0.97,
          color:         '#ffffff',
        }}>
          Make every
        </div>
        <div style={{
          fontFamily:    "var(--font-neue-montreal)",
          fontSize:      'clamp(52px, 8.5vw, 132px)',
          fontWeight:    900,
          letterSpacing: '-0.01em',
          lineHeight:    0.97,
          color:         '#f09a5a',
        }}>
          frame work for
        </div>
        <div style={{
          fontFamily:    "var(--font-neue-montreal)",
          fontSize:      'clamp(52px, 8.5vw, 132px)',
          fontWeight:    900,
          letterSpacing: '-0.01em',
          lineHeight:    0.97,
          fontStyle:     'italic',
          color:         '#e77c24',
        }}>
          your brand!
        </div>
      </div>

      {/* Charm — absolutely positioned, bounces across full section */}
      <div
        ref={charmRef}
        style={{
          position:      'absolute',
          left:          '50%',
          top:           '50%',
          width:         'clamp(140px, 14vw, 220px)',
          pointerEvents: 'none',
          zIndex:        3,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={charmImgRef}
          src="/images/charms/charm-1.png"
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* GET YOUR QUOTE IN 24H row */}
      <div
        ref={ctaRowRef}
        style={{
          display:     'flex',
          alignItems:  'center',
          gap:         '16px',
          marginTop:   'clamp(32px, 5vw, 64px)',
          position:    'relative',
          zIndex:       2,
        }}
      >
        <span style={{
          fontSize:      'clamp(11px, 1.1vw, 14px)',
          fontWeight:    700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(255,255,255,0.55)',
        }}>
          Get your quote in 24h
        </span>

        <a
          href="mailto:hello@filmfxstudio.com"
          style={{
            width:          '44px',
            height:         '44px',
            borderRadius:   '50%',
            background:     '#fff',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
            textDecoration: 'none',
            cursor:         'none',
            transition:     'background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = '#e77c24'
            el.style.transform  = 'scale(1.08)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = '#fff'
            el.style.transform  = 'scale(1)'
          }}
        >
          {/* Phone icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#0d0d0d"/>
          </svg>
        </a>
      </div>

      {/* Trusted by clients strip */}
      <div style={{
        display:    'flex',
        alignItems: 'center',
        gap:        '14px',
        marginTop:  'clamp(28px, 4vw, 48px)',
        position:   'relative',
        zIndex:      2,
      }}>
        {/* Overlapping client avatars */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[
            '/images/clients/avatar-1.png',
            '/images/clients/avatar-2.png',
            '/images/clients/avatar-3.png',
            '/images/clients/avatar-4.png',
            '/images/clients/avatar-5.png',
          ].map((src, i) => (
            <div key={i} style={{
              width:        '68px',
              height:       '68px',
              borderRadius: '50%',
              overflow:     'hidden',
              isolation:    'isolate',
              position:     'relative',
              marginLeft:   i > 0 ? '-32px' : 0,
              zIndex:       5 - i,
              flexShrink:   0,
            }}>
              <Image
                src={src}
                alt=""
                fill
                style={{
                  objectFit:       'cover',
                  objectPosition:  'center center',
                  transform:       'scale(1.7)',
                  transformOrigin: 'center center',
                }}
                sizes="68px"
              />
            </div>
          ))}
        </div>

        <p style={{
          fontSize:   'clamp(12px, 1.1vw, 14px)',
          color:      'rgba(255,255,255,0.45)',
          lineHeight: 1.4,
        }}>
          Trusted by{' '}
          <strong style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>
            100+ creators &amp; brands
          </strong>{' '}
          worldwide
        </p>
      </div>
    </section>
  )
}
