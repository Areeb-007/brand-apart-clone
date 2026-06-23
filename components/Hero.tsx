'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function LiveClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
    setTime(fmt())
    const t = setInterval(() => setTime(fmt()), 10000)
    return () => clearInterval(t)
  }, [])
  return <>{time}</>
}

const CLIENT_LOGOS = ['Amplify', 'Forbes', 'TechHub', 'PMU', 'Sowbeez', 'Incard']
const CHARMS = [
  '/images/charms/charm-1.png',
  '/images/charms/charm-2.png',
  '/images/charms/charm-3.png',
  '/images/charms/charm-4.png',
]

export default function Hero() {
  const headRef    = useRef<HTMLDivElement>(null)
  const midRef     = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const charmRef    = useRef<HTMLDivElement>(null)
  const hideTimer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isShowing   = useRef(false)
  const inCooldown  = useRef(false)
  const charmIdxRef = useRef(0)
  const [charmIdx, setCharmIdx] = useState(0)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(headRef.current,  { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo(midRef.current,   { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo(subRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
  }, [])

  function onMouseLeave() {
    if (!charmRef.current) return
    charmRef.current.style.opacity = '0'
    isShowing.current = false
    if (hideTimer.current) { clearTimeout(hideTimer.current); hideTimer.current = null }
  }

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!charmRef.current) return

    // Only show if not visible and not in cooldown
    if (isShowing.current || inCooldown.current) return

    // Freeze position at cursor — only set once when charm is about to appear
    const rect = e.currentTarget.getBoundingClientRect()
    charmRef.current.style.left = `${e.clientX - rect.left}px`
    charmRef.current.style.top  = `${e.clientY - rect.top}px`
    isShowing.current = true

    // Advance to next charm
    const next = (charmIdxRef.current + 1) % CHARMS.length
    charmIdxRef.current = next
    setCharmIdx(next)

    // Trigger drop animation
    charmRef.current.style.animation = 'none'
    void charmRef.current.offsetHeight
    charmRef.current.style.animation = 'charmDrop 0.75s cubic-bezier(0.34,1.56,0.64,1) forwards'
    charmRef.current.style.opacity = '1'

    // Auto-hide after 1.6s, then cooldown 1s before next can appear
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => {
      if (charmRef.current) {
        charmRef.current.style.animation = 'charmExit 0.3s ease forwards'
        setTimeout(() => {
          if (charmRef.current) charmRef.current.style.opacity = '0'
          isShowing.current = false
          inCooldown.current = true
          setTimeout(() => { inCooldown.current = false }, 300)
        }, 300)
      }
    }, 900)
  }

  return (
    <section
      className="hero-section"
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      {/* ── Key charm — follows mouse cursor ── */}
      <div ref={charmRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(-50%, -60%)',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      }}>
        <Image
          src={CHARMS[charmIdx]}
          alt="charm"
          width={280}
          height={280}
          style={{ objectFit: 'contain', filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.18))' }}
          priority
        />
      </div>
      {/* ── MASSIVE headline ── */}
      <div
        ref={headRef}
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '0 clamp(16px, 4vw, 60px)',
          paddingTop: 'clamp(96px, 12vh, 140px)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 0,
        }}
      >
        <h1 style={{
          fontFamily: "'Youth', Arial, sans-serif",
          fontSize: 'clamp(34px, 5.8vw, 92px)',
          fontWeight: 900,
          WebkitTextStroke: '0.5px currentColor',
          lineHeight: 0.93,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          margin: 0,
        }}>
          The creative{' '}
          {/* Orange badge — matches Brand Apart's © badge */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '0.72em',
            height: '0.72em',
            background: 'var(--accent)',
            borderRadius: '50%',
            verticalAlign: 'middle',
            marginBottom: '0.07em',
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 40 40" fill="none" style={{ width: '55%', height: '55%' }}>
              <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm0 20c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-2-5h4v2h-4zm0-8h4v6h-4z" fill="none"/>
              <text x="50%" y="72%" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="system-ui">✦</text>
            </svg>
          </span>
          {' '}partner
          <br />
          for high-impact brands.
        </h1>

        {/* ── Scrolling logo marquee — constrained box, centered ── */}
        <div ref={midRef} style={{
          marginTop: 'clamp(72px, 10vh, 120px)',
          marginBottom: 'clamp(96px, 14vh, 150px)',
          width: '100%',
          maxWidth: '380px',
          overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}>
          <div className="marquee-track" style={{ gap: '28px' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(13px, 1.2vw, 17px)',
                fontWeight: 700,
                color: 'rgba(0,25,65,0.28)',
                letterSpacing: '-0.01em',
                whiteSpace: 'nowrap',
              }}>{name}</span>
            ))}
          </div>
        </div>

        {/* ── Subtitle + CTA ── */}
        <div ref={subRef} style={{ marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px' }}>
          <p style={{
            fontSize: 'clamp(16px, 1.5vw, 20px)',
            color: 'var(--fg-muted)',
            maxWidth: '460px',
            lineHeight: 1.7,
            textAlign: 'center',
            margin: 0,
          }}>
            We help brands, creators, and businesses ship cinematic video edits, stunning visuals, and high-converting creative content.
          </p>

          {/* CTA with avatars — Brand Apart style */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Team avatars */}
              {['#001941','#e77c24','#3B2FC9'].map((bg, i) => (
                <div key={i} style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: bg, border: '2.5px solid var(--bg)',
                  marginLeft: i > 0 ? '-10px' : 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-display)', fontSize: '11px', fontWeight: 700, color: '#fff',
                  zIndex: 3 - i,
                  position: 'relative',
                }}>
                  {['FX','★','▶'][i]}
                </div>
              ))}
            </div>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 28px', borderRadius: '100px',
                background: 'var(--fg)', color: '#fff',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em',
                textDecoration: 'none', cursor: 'none',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Book an intro call
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: location + time ── */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'clamp(16px,2vh,24px) clamp(24px,3vw,48px)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ fontSize: '12px', color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
          Worldwide
        </div>
        <div style={{ fontSize: '12px', color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>
          <LiveClock />
        </div>
      </div>
    </section>
  )
}
