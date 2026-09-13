'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { useCharmSpawner } from '@/lib/useCharmSpawner'
import { charmPaths, type Subcategory } from '@/lib/subcategories'
import type { Category } from '@/lib/categories'

gsap.registerPlugin(ScrollTrigger)

export default function SubcategoryDetail({ category, sub }: { category: Category; sub: Subcategory }) {
  const heroNameRef = useRef<HTMLDivElement>(null)
  const heroTagRef  = useRef<HTMLDivElement>(null)
  const heroIgRef   = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const descRef     = useRef<HTMLDivElement>(null)

  const { onMouseMove } = useCharmSpawner(charmPaths(sub))
  const heroBg = sub.theme === 'black' ? '#000' : category.accent

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(heroNameRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
      .fromTo(heroTagRef.current,  { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo(heroIgRef.current,   { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')

    const reveals = [servicesRef, descRef]
    reveals.forEach(ref => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <Navigation />

      {/* ── Hero — charm-hover, per-subcategory theme ── */}
      <section
        data-nav-dark
        onMouseMove={onMouseMove}
        style={{
          minHeight: '100svh',
          background: heroBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px) clamp(40px,5vw,60px)',
          textAlign: 'center',
        }}
      >
        {/* Breadcrumb */}
        <Link href={`/services/${category.slug}`} style={{
          position: 'absolute', top: 'clamp(88px,10vw,120px)',
          fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          textDecoration: 'none', cursor: 'none',
        }}>
          ← {category.name}
        </Link>

        <div ref={heroNameRef}>
          <h1 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(48px, 9vw, 148px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#fff',
            margin: 0,
          }}>
            {sub.name}
          </h1>
        </div>

        <div ref={heroTagRef} style={{ marginTop: '28px', maxWidth: 'min(88vw, 720px)' }}>
          {sub.tagline && (
            <p style={{
              fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
              marginBottom: '14px',
            }}>
              {sub.tagline}
            </p>
          )}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 2.4vw, 30px)',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.3,
            margin: 0,
          }}>
            {sub.bottomLine}
          </p>
        </div>

        {sub.igUrl && (
          <div ref={heroIgRef} style={{ marginTop: '36px' }}>
            <a
              href={sub.igUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 22px', borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                fontSize: '13px', fontWeight: 600, textDecoration: 'none', cursor: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              @{sub.igName}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M4 12 12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        )}
      </section>

      {/* ── Services ── */}
      <section ref={servicesRef} style={{ background: 'var(--bg)', padding: 'clamp(56px,7vw,80px) clamp(24px,4vw,60px) clamp(24px,4vw,40px)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '18px' }}>
            Services
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sub.services.map(s => (
              <span key={s} style={{
                fontSize: '13px', fontWeight: 600, color: 'var(--fg)',
                padding: '9px 18px', borderRadius: '100px', border: '1px solid var(--border)',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Description ── */}
      <section ref={descRef} style={{ background: 'var(--bg)', padding: 'clamp(24px,4vw,40px) clamp(24px,4vw,60px) clamp(90px,10vw,120px)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {sub.description.map((p, i) => (
            <p key={i} style={{
              fontSize: i === 0 ? 'clamp(17px, 1.7vw, 21px)' : 'clamp(15px, 1.4vw, 17px)',
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? 'var(--fg)' : 'var(--fg-muted)',
              lineHeight: 1.75,
              margin: 0,
            }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── Back to category ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(40px,6vw,60px) clamp(24px,4vw,60px)', textAlign: 'center' }}>
        <Link href={`/services/${category.slug}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--fg)', textDecoration: 'none', cursor: 'none',
          borderBottom: '1px solid var(--border)', paddingBottom: '2px',
        }}>
          ← More {category.name}
        </Link>
      </section>
    </>
  )
}
