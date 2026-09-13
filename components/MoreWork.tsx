'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 10 items with mixed sizes, matching the reference's own scatter of large/
// small tiles rather than one uniform size. The last 2 reuse existing cover
// images as placeholders (marked below) since there are only 8 dedicated
// "see more work" images in the project — swap them for real ones any time.
const ITEMS = [
  { id: 1,  src: '/images/portfolio/smw-1.jpg',    label: 'Website Development',  size: 230 },
  { id: 2,  src: '/images/portfolio/smw-2.jpg',    label: 'Social Media',         size: 190 },
  { id: 3,  src: '/images/portfolio/smw-3.jpg',    label: 'Typography Design',    size: 240 },
  { id: 4,  src: '/images/portfolio/smw-4.jpg',    label: 'Social Media Marketing', size: 205 },
  { id: 5,  src: '/images/portfolio/smw-5.jpg',    label: 'Podcast Clips',        size: 215 },
  { id: 6,  src: '/images/portfolio/smw-6.jpg',    label: 'UGC Ads',              size: 225 },
  { id: 7,  src: '/images/portfolio/smw-7.jpg',    label: 'Automobile Edits',     size: 185 },
  { id: 8,  src: '/images/portfolio/smw-8.jpg',    label: 'Brand Content',        size: 150 },
  // placeholders — replace with real "see more work" images when available
  { id: 9,  src: '/images/portfolio/ve-1.jpg',     label: 'Video Edits',          size: 150 },
  { id: 10, src: '/images/portfolio/we-sa-1.jpg',  label: 'Staff Augmentation',   size: 120 },
]

const RADIUS       = 370
const MAX_SIZE     = Math.max(...ITEMS.map(i => i.size))
const HOVER_SHRINK = 0.72

function cardOffset(i: number) {
  const angle = (2 * Math.PI / ITEMS.length) * i - Math.PI / 2
  return { cx: RADIUS * Math.cos(angle), cy: RADIUS * Math.sin(angle) }
}

export default function MoreWork() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const circleRef   = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLDivElement>(null)
  const labelRef    = useRef<HTMLParagraphElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  function handleLabelEnter() {
    gsap.to(labelRef.current, { color: 'rgba(255,255,255,1)', duration: 0.4, ease: 'power2.out' })
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const { cx, cy } = cardOffset(i)
      gsap.to(card, { x: (cx * HOVER_SHRINK) - cx, y: (cy * HOVER_SHRINK) - cy, duration: 0.55, ease: 'power3.out' })
    })
  }

  function handleLabelLeave() {
    gsap.to(labelRef.current, { color: 'rgba(255,255,255,0.4)', duration: 0.4, ease: 'power2.out' })
    cardRefs.current.forEach((card) => {
      if (!card) return
      gsap.to(card, { x: 0, y: 0, duration: 0.55, ease: 'power3.out' })
    })
  }

  useEffect(() => {
    const section = sectionRef.current
    const circle  = circleRef.current
    const text    = textRef.current
    const cards   = cardRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!section || !circle || !text) return

    // Background eases from the page's light bg to navy as the section
    // reaches ~20% into the viewport — same technique as the final CTA section.
    const bgInST = gsap.fromTo(section,
      { backgroundColor: 'var(--bg)' },
      {
        backgroundColor: '#001941',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 60%', scrub: 1 },
      }
    )

    // ...and eases back to light again as the section's bottom edge nears the
    // viewport, since (unlike the final CTA section) something lighter — the
    // Services heading — follows right after this one, not the page's end.
    const bgOutST = gsap.fromTo(section,
      { backgroundColor: '#001941' },
      {
        backgroundColor: 'var(--bg)',
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'bottom 55%', end: 'bottom 15%', scrub: 1 },
      }
    )

    // Text fade-in on scroll only
    const textST = gsap.fromTo(
      text,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end:   'top 30%',
          scrub: false,
          toggleActions: 'play none none reverse',
        },
      }
    )

    // One-time "emerge" reveal: every card starts collapsed at the wheel's
    // centre (tiny scale, zero offset) and grows outward into its own spot on
    // the circle — reads as all the images blooming out from one point, not
    // just popping in place. Plays once the first time the section enters view.
    cards.forEach((card, i) => {
      const { cx, cy } = cardOffset(i)
      gsap.set(card, { x: -cx, y: -cy, scale: 0.15, opacity: 0, transformOrigin: 'center center' })
    })
    const emergeTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })
    cards.forEach((card, i) => {
      emergeTL.to(card, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power3.out' }, i * 0.05)
    })

    // Rotation is driven purely by scroll position across the section — no
    // autoplay, nothing happens while the page is static. Cards counter-rotate
    // so their images stay upright as the wheel turns.
    const rotationST = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end:   'bottom top',
        scrub: 1.4,
      },
    })
    rotationST.to(circle, { rotation: 180, ease: 'none' }, 0)
    cards.forEach((card) => {
      rotationST.to(card, { rotation: -180, ease: 'none' }, 0)
    })

    return () => {
      [bgInST, bgOutST, textST, emergeTL, rotationST].forEach((t) => { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill() })
      ScrollTrigger.getAll().filter(st => st.trigger === section).forEach(st => st.kill())
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      data-nav-dark
      style={{
        minHeight: `${(RADIUS + MAX_SIZE) * 2 + 80}px`,
        width: '100vw',
        background: '#001941',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Center text */}
      <div
        ref={textRef}
        className="morework-text"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 10,
          textAlign: 'center',
          pointerEvents: 'none',
          width: 'max-content',
        }}
      >
        <p
          ref={labelRef}
          onMouseEnter={handleLabelEnter}
          onMouseLeave={handleLabelLeave}
          style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            marginBottom: '12px', pointerEvents: 'auto', cursor: 'none',
            width: 'max-content', margin: '0 auto 12px',
          }}
        >
          See More Work
        </p>

        <h2
          onMouseEnter={handleLabelEnter}
          onMouseLeave={handleLabelLeave}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(34px, 4.2vw, 62px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
            color: '#fff', pointerEvents: 'auto', cursor: 'none',
          }}
        >
          500+ Projects<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>
            delivered.
          </span>
        </h2>

        <p style={{
          fontSize: '14px', color: 'rgba(255,255,255,0.48)', lineHeight: 1.7,
          marginTop: '14px', marginBottom: '26px', maxWidth: '320px',
          marginLeft: 'auto', marginRight: 'auto', textAlign: 'center',
        }}>
          From weddings to corporate films, every frame crafted with purpose.
        </p>

        <a
          href="#contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 26px', background: '#fff', color: '#001941',
            borderRadius: '100px', fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.02em', textDecoration: 'none', cursor: 'none',
            transition: 'background 0.2s', pointerEvents: 'all',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0ebe2' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
        >
          Start a project
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Orbit wheel */}
      <div
        ref={circleRef}
        className="orbit-wheel"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width:  `${(RADIUS + MAX_SIZE) * 2}px`,
          height: `${(RADIUS + MAX_SIZE) * 2}px`,
          willChange: 'transform',
        }}
      >
        {ITEMS.map((item, i) => {
          const angle = (2 * Math.PI / ITEMS.length) * i - Math.PI / 2
          const cx    = RADIUS * Math.cos(angle)
          const cy    = RADIUS * Math.sin(angle)

          return (
            <div
              key={item.id}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                left:   `calc(50% + ${cx}px)`,
                top:    `calc(50% + ${cy}px)`,
                transform: 'translate(-50%, -50%)',
                width:  `${item.size}px`,
                height: `${item.size}px`,
                borderRadius: '13px',
                overflow: 'hidden',
                border: '2px solid rgba(255,255,255,0.12)',
                boxShadow: '0 6px 28px rgba(0,0,0,0.4)',
                willChange: 'transform',
              }}
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                style={{ objectFit: 'cover' }}
                sizes={`${item.size}px`}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
