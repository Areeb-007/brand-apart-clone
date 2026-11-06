'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { plexMono } from '@/lib/fonts'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)


// "Trusted by 50+ founders" — same mechanic as brandappart.com/about's
// FoundersRoll: the names sit on a 3D drum (each 10° apart, rotating about a
// point one list-height behind the screen) and the drum turns as the list
// scrolls through the middle of the viewport, while the list itself drifts
// down slightly so it lingers. No pinning — it plays out within roughly one
// screen of scroll. The name facing the viewer is full cream; the rest sit
// at 20% opacity.

const CLIENTS = [
  'Boss Media',
  'Aces & Oaks Media',
  'DNA Media',
  'NCP Real Estate Media',
  'EAM Media',
  'Marksman Media',
]

const STEP_DEG = 10

export default function TrustedWheel() {
  const listRef  = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const list  = listRef.current
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!list || !items.length) return
    const totalRot = (items.length - 1) * STEP_DEG

    const ctx = gsap.context(() => {
      function layout() {
        const h = items.reduce((sum, el) => sum + el.offsetHeight, 0)
        gsap.set(list, { height: h })
        items.forEach((el, i) => {
          gsap.set(el, {
            rotationX: -(STEP_DEG * i),
            transformOrigin: `center center -${h}px`,
            position: 'absolute', top: '50%', left: '50%',
            xPercent: -50, yPercent: -50,
          })
        })
      }
      layout()

      gsap.to(list, {
        yPercent: 100 / items.length + 1,
        ease: 'none',
        scrollTrigger: { trigger: list, start: 'center center', end: 'bottom center', scrub: true },
      })

      items.forEach((el) => {
        gsap.to(el, {
          rotationX: `+=${totalRot}`,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: list, start: 'top center', end: 'bottom center', scrub: true,
            invalidateOnRefresh: true, onRefresh: layout,
            onUpdate: () => {
              const r = Number(gsap.getProperty(el, 'rotationX'))
              el.style.opacity = r <= 5 && r > -5 ? '1' : '0.2'
            },
          },
        })
      })
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-nav-dark
      style={{
        background: '#171412', color: '#fbf9ef', textAlign: 'center',
        padding: 'clamp(100px,12vw,160px) clamp(24px,4vw,60px)', overflow: 'hidden',
      }}
    >
      <span className={plexMono.className} style={{
        display: 'block', marginBottom: '26px',
        fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1,
        color: 'rgba(251,249,239,0.5)',
      }}>
        Trusted by 50+ founders
      </span>

      <div ref={listRef} data-text-roll="" style={{ position: 'relative', marginTop: 'clamp(40px,6vw,64px)' }}>
        {CLIENTS.map((name, i) => (
          <div
            key={name}
            ref={(el) => { itemRefs.current[i] = el }}
            style={{
              opacity: i === 0 ? 1 : 0.2,
              transition: 'opacity 0.84s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{
              // Outfit 800 — closest licensed match to brandappart's
              // commercial "Youth" face (the /fonts/Youth file in this repo
              // is an unrelated Korean typeface of the same name).
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(40px, 7vw, 120px)',
              letterSpacing: '-0.045em',
              lineHeight: 0.8,
              padding: '0.08em 0',
            }}>
              {name}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
