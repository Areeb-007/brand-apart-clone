'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SOCIALS = [
  { label: 'IG',  href: '#' },
  { label: 'YT',  href: '#' },
  { label: 'LK',  href: '#' },
  { label: 'BE',  href: '#' },
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

    // Space bounce across the full section — dynamic bounds from actual element sizes
    const charm = charmRef.current
    if (charm) {
      const cW  = charm.offsetWidth  || 240
      const cH  = charm.offsetHeight || 240
      const sW  = section.offsetWidth
      const sH  = section.offsetHeight
      const BX  = sW / 2 - cW / 2 - 16
      const BY  = sH / 2 - cH / 2 - 16

      // Start toward the right side
      const bounce = { x: BX * 0.55, y: -BY * 0.3, vx: -88, vy: 66, rot: 0, rotV: 18 }

      // Centre the charm in the section via GSAP (position: absolute, top/left 50%)
      gsap.set(charm, { xPercent: -50, yPercent: -50, x: bounce.x, y: bounce.y })

      const tick = (_time: number, deltaTime: number) => {
        const dt = Math.min(deltaTime / 1000, 0.05)
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

        gsap.set(charm, { x: bounce.x, y: bounce.y, rotation: bounce.rot })
      }

      gsap.ticker.add(tick)

      return () => {
        gsap.ticker.remove(tick)
        ScrollTrigger.getAll().forEach(t => t.kill())
      }
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
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
        display: 'flex', gap: '8px', marginBottom: 'clamp(48px, 7vw, 96px)',
        position: 'relative', zIndex: 2,
      }}>
        {SOCIALS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            style={{
              padding: '8px 18px',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              cursor: 'none',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(231,124,36,0.6)'
              el.style.color = '#e77c24'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.borderColor = 'rgba(255,255,255,0.18)'
              el.style.color = 'rgba(255,255,255,0.55)'
            }}
          >
            {s.label}
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
          fontFamily:    'var(--font-nunito), Nunito, var(--font-display)',
          fontSize:      'clamp(52px, 8.5vw, 132px)',
          fontWeight:    900,
          letterSpacing: '-0.01em',
          lineHeight:    0.97,
          color:         '#ffffff',
        }}>
          Make every
        </div>
        <div style={{
          fontFamily:    'var(--font-nunito), Nunito, var(--font-display)',
          fontSize:      'clamp(52px, 8.5vw, 132px)',
          fontWeight:    900,
          letterSpacing: '-0.01em',
          lineHeight:    0.97,
          color:         '#f09a5a',
        }}>
          frame work for
        </div>
        <div style={{
          fontFamily:    'var(--font-nunito), Nunito, var(--font-display)',
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
            '/images/clients/boss-media.png',
            '/images/clients/teo.png',
            '/images/clients/matt.png',
            '/images/clients/william.png',
            '/images/clients/j-thomas.png',
          ].map((src, i) => (
            <div key={i} style={{
              width:        '38px',
              height:       '38px',
              borderRadius: '50%',
              overflow:     'hidden',
              border:       '2.5px solid #1a1a1a',
              marginLeft:   i > 0 ? '-10px' : 0,
              position:     'relative',
              zIndex:       5 - i,
              flexShrink:   0,
              background:   '#333',
            }}>
              <Image src={src} alt="" fill style={{ objectFit: 'cover', objectPosition: 'top center' }} sizes="38px" />
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
