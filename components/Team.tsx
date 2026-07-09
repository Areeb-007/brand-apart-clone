'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const CARD_W = 200
const CARD_H = 270

const TEAM = [
  { name: 'Ahmed R.',  role: 'Creative Director',  initials: 'AR', photo: null as string|null, tilt:  -12 },
  { name: 'Sara M.',   role: 'Video Editor',        initials: 'SM', photo: null as string|null, tilt:    6 },
  { name: 'James K.',  role: 'Motion Designer',     initials: 'JK', photo: null as string|null, tilt:   -5 },
  { name: 'Layla H.',  role: 'Brand Designer',      initials: 'LH', photo: null as string|null, tilt:   10 },
  { name: 'Tom W.',    role: 'Graphic Designer',    initials: 'TW', photo: null as string|null, tilt:   -8 },
  { name: 'Nina V.',   role: 'Social Media',        initials: 'NV', photo: null as string|null, tilt:    4 },
  { name: 'Omar A.',   role: 'Web Developer',       initials: 'OA', photo: null as string|null, tilt:  -14 },
  { name: 'Zoe B.',    role: 'Strategist',          initials: 'ZB', photo: null as string|null, tilt:    9 },
]

const RX    = 320   // horizontal radius
const RY    = 115   // vertical radius
const COUNT = TEAM.length

export default function Team() {
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const proxyRef = useRef({ angle: 0 })

  useEffect(() => {
    const proxy = proxyRef.current

    function update() {
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const a      = proxy.angle + (i / COUNT) * Math.PI * 2
        const cx     = Math.cos(a) * RX
        const cy     = Math.sin(a) * RY
        const depth  = (Math.sin(a) + 1) / 2
        const scale  = 0.28 + depth * 0.82   // 0.28 back → 1.10 front
        const z      = Math.round(depth * 10)
        const opacity = 0.30 + depth * 0.70  // 0.30 back → 1.0 front
        card.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) rotate(${TEAM[i].tilt}deg) scale(${scale})`
        card.style.zIndex    = String(z + 2)
        card.style.opacity   = String(opacity)
      })
    }

    update()

    tweenRef.current = gsap.to(proxy, {
      angle:    Math.PI * 2,
      duration: 26,
      ease:     'none',
      repeat:   -1,
      onUpdate: update,
    })

    return () => { tweenRef.current?.kill() }
  }, [])

  return (
    <section style={{
      background:    'var(--bg)',
      paddingTop:    'clamp(80px, 10vw, 120px)',
      paddingBottom: 'clamp(60px, 8vw, 100px)',
      overflow:      'hidden',
      borderTop:     '1px solid var(--border)',
    }}>

      {/* "Small team," heading */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
        <p className="section-tag" style={{ marginBottom: '16px' }}>Meet the team</p>
        <div style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(44px, 7vw, 112px)',
          fontWeight:    900,
          letterSpacing: '-0.04em',
          lineHeight:    1.0,
          color:         'var(--fg)',
        }}>
          Small team,
        </div>
      </div>

      {/* Orbit stage */}
      <div style={{
        position:       'relative',
        height:         'clamp(420px, 56vw, 700px)',
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}>

        {/* "big results." massive background text */}
        <div style={{
          position:       'absolute',
          inset:           0,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          pointerEvents:  'none',
          userSelect:     'none',
          lineHeight:     0.82,
          zIndex:         1,
        }}>
          <div style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(100px, 22vw, 320px)',
            fontWeight:    900,
            letterSpacing: '-0.04em',
            color:         'rgba(0,0,0,0.28)',
            whiteSpace:    'nowrap',
          }}>big</div>
          <div style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(80px, 27vw, 400px)',
            fontWeight:    900,
            letterSpacing: '-0.04em',
            color:         'rgba(0,0,0,0.28)',
            whiteSpace:    'nowrap',
          }}>results.</div>
        </div>

        {/* Orbiting portrait cards */}
        {TEAM.map((member, i) => (
          <div
            key={member.name}
            ref={(el) => { cardRefs.current[i] = el }}
            style={{
              position:     'absolute',
              left:         '50%',
              top:          '50%',
              width:        `${CARD_W}px`,
              height:       `${CARD_H}px`,
              borderRadius: '14px',
              overflow:     'hidden',
              cursor:       'none',
              willChange:   'transform, opacity',
              boxShadow:    '0 12px 40px rgba(0,0,0,0.22)',
            }}
          >
            {/* Photo (when provided) */}
            {member.photo && (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
                sizes="200px"
              />
            )}

            {/* Orange gradient — full card without photo, overlay with photo */}
            <div style={{
              position:   'absolute',
              inset:       0,
              background: member.photo
                ? 'linear-gradient(to top, rgba(183,70,8,0.88) 0%, rgba(249,115,22,0.45) 55%, transparent 100%)'
                : 'linear-gradient(155deg, #f97316 0%, #e77c24 45%, #b85a10 100%)',
            }} />

            {/* Initials circle (no photo) */}
            {!member.photo && (
              <div style={{
                position:       'absolute',
                top:            '50%',
                left:           '50%',
                transform:      'translate(-50%, -65%)',
                width:          '52px',
                height:         '52px',
                borderRadius:   '50%',
                background:     'rgba(255,255,255,0.2)',
                border:         '2px solid rgba(255,255,255,0.45)',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily:    'var(--font-display)',
                  fontSize:      '16px',
                  fontWeight:    800,
                  color:         '#fff',
                  letterSpacing: '-0.02em',
                  userSelect:    'none',
                }}>
                  {member.initials}
                </span>
              </div>
            )}

            {/* Name + role at bottom */}
            <div style={{
              position:      'absolute',
              bottom:         0,
              left:           0,
              right:          0,
              padding:       '10px 10px 14px',
              textAlign:     'center',
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff', lineHeight: 1.2, letterSpacing: '0.01em' }}>
                {member.name}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px', lineHeight: 1.3 }}>
                {member.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
