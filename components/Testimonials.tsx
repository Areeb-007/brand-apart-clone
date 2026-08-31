'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    name: 'Boss Media',
    role: 'Media Agency',
    quote: 'FilmFX Studio does more than just edit videos, they bring creative ideas to life. Their graphics team is amazing, creating visuals that fit our brand perfectly.',
    photo: '/images/clients/boss-media.png',
  },
  {
    name: 'TEO',
    role: 'Founder, Content Studio',
    quote: 'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Their attention to detail and fast communication made the whole process seamless.',
    photo: '/images/clients/teo.png',
  },
  {
    name: 'MATT',
    role: 'Creative Director',
    quote: 'FilmFX Studio created amazing custom designs that elevated our brand. Professional, easy to work with, and always open to collaborating.',
    photo: '/images/clients/matt.png',
  },
  {
    name: 'WILLIAM',
    role: 'Brand Strategist',
    quote: 'Outstanding work from start to finish. The team understood our vision and delivered beyond expectations, every frame crafted with real purpose.',
    photo: '/images/clients/william.png',
  },
  {
    name: 'J. THOMAS',
    role: 'Head of Growth',
    quote: 'FilmFX Studio doubled our social media engagement in just 2 months with smart, creative strategies. Truly one of a kind.',
    photo: '/images/clients/j-thomas.png',
  },
]

const N      = TESTIMONIALS.length
const CARD_W = 300
const CARD_H = 420
const SHIFT  = 80   // subtle spread on hover

// Wide scattered fan — matches Brand Apart reference
const BASE = [
  { x: -420, rotate: -28 },
  { x: -210, rotate: -14 },
  { x:  -10, rotate:  -3 },
  { x:  200, rotate:   9 },
  { x:  405, rotate:  20 },
]

const BASE_Z = [2, 3, 5, 3, 2]

// The fan is designed for a ~900px+ wide viewport — on narrower screens
// (tablet/mobile) the ±420px spread would push cards way past the edges,
// cutting off text. Scale the whole fan down proportionally instead.
function fanScale() {
  if (typeof window === 'undefined') return 1
  return Math.min(1, window.innerWidth / 900)
}

export default function Testimonials() {
  const headRef  = useRef<HTMLDivElement>(null)
  const fanRef   = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const scaleRef = useRef(1)

  function applyBase() {
    const s = scaleRef.current
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      card.classList.remove('t-active')
      gsap.to(card, {
        x:        BASE[i].x * s,
        rotation: BASE[i].rotate,
        scale:    1,
        zIndex:   BASE_Z[i],
        duration: 0.48,
        ease:     'power2.inOut',
      })
    })
  }

  function applyHover(active: number) {
    const s = scaleRef.current
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      if (i === active) {
        card.classList.add('t-active')
        gsap.to(card, {
          rotation: 0,
          scale:    1.04,
          zIndex:   N + 2,
          duration: 0.45,
          ease:     'power2.inOut',
        })
      } else {
        card.classList.remove('t-active')
        const shift = (i < active ? -SHIFT : SHIFT) * s
        gsap.to(card, {
          x:        BASE[i].x * s + shift,
          rotation: BASE[i].rotate,
          scale:    1,
          zIndex:   BASE_Z[i],
          duration: 0.45,
          ease:     'power2.inOut',
        })
      }
    })
  }

  useEffect(() => {
    const s = fanScale()
    scaleRef.current = s

    // Place cards off-screen to the right at their target rotation
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, {
        x:               1200,
        rotation:        BASE[i].rotate,
        scale:           1,
        zIndex:          BASE_Z[i],
        transformOrigin: 'bottom center',
      })
    })

    // Heading fade-up
    if (headRef.current) {
      gsap.fromTo(headRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
      )
    }

    // Cards fly in from right with stagger when fan enters view
    if (fanRef.current) {
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: fanRef.current,
          start:   'top 88%',
          toggleActions: 'play none none reverse',
        },
      })

      cardRefs.current.forEach((card, i) => {
        entryTl.to(card, {
          x:        BASE[i].x * s,
          duration: 1.4,
          ease:     'expo.out',
        }, i * 0.07)
      })
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(80px,10vw,130px) 0 clamp(80px,10vw,120px)',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      {/* ── Heading ── */}
      <div
        ref={headRef}
        style={{ textAlign: 'center', marginBottom: 'clamp(64px,9vw,110px)', padding: '0 clamp(24px,4vw,60px)' }}
      >
        <h2 style={{
          fontFamily: "'Youth', Arial, sans-serif",
          fontSize: 'clamp(48px,8vw,120px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          color: 'var(--fg)',
        }}>
          Trusted by<br />
          <span style={{ color: 'rgba(0,25,65,0.22)' }}>+100 clients.</span>
        </h2>
      </div>

      {/* ── Fan container ── */}
      <div
        ref={fanRef}
        style={{
          position:       'relative',
          height:         `${CARD_H + 100}px`,
          display:        'flex',
          alignItems:     'flex-end',
          justifyContent: 'center',
          overflow:       'visible',
          paddingBottom:  '20px',
        }}
        onMouseLeave={applyBase}
      >
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name}
            ref={(el) => { cardRefs.current[i] = el }}
            className={`tcard${i % 2 === 1 ? ' tcard-light' : ''}`}
            onMouseEnter={() => applyHover(i)}
            style={{
              position:      'absolute',
              bottom:        '20px',
              left:          `calc(50% - ${CARD_W / 2}px)`,
              width:         `${CARD_W}px`,
              height:        `${CARD_H}px`,
              borderRadius:  '20px',
              display:       'flex',
              flexDirection: 'column',
              padding:       '22px',
              cursor:        'none',
              boxShadow:     '0 20px 60px rgba(0,25,65,0.18)',
              willChange:    'transform',
            }}
          >
            {/* Stars + contact button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: 'var(--accent)', fontSize: '15px' }}>★</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span className="tcard-contact" style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Contact Sales
                </span>
                <div className="tcard-btn" style={{
                  width: '26px', height: '26px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Quote */}
            <p className="tcard-quote" style={{
              fontSize: '14px',
              lineHeight: 1.6,
              flex: 1,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
            }}>
              {t.quote}
            </p>

            {/* Author */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                overflow: 'hidden', flexShrink: 0,
                position: 'relative', background: 'rgba(255,255,255,0.15)',
              }}>
                <Image src={t.photo} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="44px" />
              </div>
              <div>
                <div className="tcard-name" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>
                  {t.name}
                </div>
                <div className="tcard-role" style={{ fontSize: '10px', marginTop: '2px' }}>
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
