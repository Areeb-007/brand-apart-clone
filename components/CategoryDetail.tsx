'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { getSubcategoriesFor, charmPaths } from '@/lib/subcategories'
import { useCharmSpawner } from '@/lib/useCharmSpawner'

gsap.registerPlugin(ScrollTrigger)

// Gallery tiles alternate a near-square tile with an occasional full-width
// one — matches the reference case-study page's mixed grid (661×688 square
// tiles, 1344×780 tiles spanning both columns), every 3rd tile.
function tileSpan(position: number) {
  return position % 3 === 0
}

// Same bento recipe as the Featured Work grid: 1st-of-4 is full-width, 3rd-
// and 6th-of-8 is tall — applied to the 7 subcategory tiles.
function subTilePlacement(position: number) {
  const isFull = position % 4 === 1
  const isTall = position === 3 || position === 6
  return { isFull, isTall }
}

export default function CategoryDetail({ category }: { category: Category }) {
  const heroNameRef    = useRef<HTMLDivElement>(null)
  const heroMetaRef    = useRef<HTMLDivElement>(null)
  const heroTagRef     = useRef<HTMLDivElement>(null)
  const overviewRef    = useRef<HTMLDivElement>(null)
  const galleryRef     = useRef<HTMLDivElement>(null)
  const creditsRef     = useRef<HTMLDivElement>(null)
  const ctaRef         = useRef<HTMLDivElement>(null)
  const nextBandRef    = useRef<HTMLAnchorElement>(null)
  const [scrollPct, setScrollPct] = useState(0)

  const nextCategory  = getCategory(category.nextSlug)
  const subcategories = getSubcategoriesFor(category.slug)

  // The category hero shares the whole pool of charms from its subcategories
  // (no separate charm set exists for the category page itself).
  const heroCharms = subcategories.flatMap(charmPaths)
  const { onMouseMove } = useCharmSpawner(heroCharms)

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(heroNameRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    )
    .fromTo(heroMetaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo(heroTagRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4'
    )

    // Scroll-in sections
    const reveals = [overviewRef, galleryRef, creditsRef, ctaRef]
    reveals.forEach(ref => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    })

    // Gallery tile stagger
    if (galleryRef.current) {
      gsap.fromTo(
        Array.from(galleryRef.current.children),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    }

    // "keep scrolling" percentage climbs from 0 to 100 as the next-project
    // band approaches, same idea as the reference's live scroll counter.
    const pctST = ScrollTrigger.create({
      trigger: nextBandRef.current,
      start: 'top bottom',
      end: 'top center',
      onUpdate: (self) => setScrollPct(Math.round(self.progress * 100)),
    })

    return () => {
      pctST.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      <Navigation />

      {/* ── Hero: dark navy — black is reserved for Morph Studio's theme ── */}
      <section
        data-nav-dark
        onMouseMove={onMouseMove}
        style={{
          minHeight: '100svh',
          background: '#001941',
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
        <div style={{ maxWidth: 'min(90vw, 1007px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(20px, 3vw, 34px)' }}>
          {/* Giant category name */}
          <div ref={heroNameRef}>
            <h1 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(56px, 11vw, 176px)',
              fontWeight: 900,
              letterSpacing: '-0.045em',
              lineHeight: 0.85,
              color: '#fff',
              margin: 0,
            }}>
              {category.name}
            </h1>
          </div>

          {/* Year + Industry */}
          <div ref={heroMetaRef} style={{ display: 'flex', gap: 'clamp(40px, 8vw, 120px)' }}>
            {[
              { label: 'YEAR', value: category.year },
              { label: 'INDUSTRY', value: category.industry },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', letterSpacing: '0.01em' }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <div ref={heroTagRef}>
            <p style={{
              fontSize: 'clamp(16px, 1.8vw, 24px)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              lineHeight: 1.15,
              margin: 0,
            }}>
              {category.tagline}
            </p>
          </div>
        </div>

        <p style={{
          position: 'absolute',
          bottom: 'clamp(32px,4vw,48px)',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Scroll down ↓
        </p>
      </section>

      {/* ── Overview: 2-col intro, copy + services tag (matches reference's overview_row) ── */}
      <section ref={overviewRef} style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,60px)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px, 6vw, 100px)',
        }}>
          <div style={{ flex: '2 1 480px', minWidth: 0 }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2.8vw, 38px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              color: 'var(--fg)',
              margin: '0 0 24px',
            }}>
              {category.description}
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              color: 'var(--fg-muted)',
              lineHeight: 1.8,
              margin: 0,
            }}>
              {category.overview}
            </p>
          </div>

          <aside style={{ flex: '1 1 160px', minWidth: '160px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '14px' }}>
              Services
            </div>
            <Link href="/#services" style={{
              display: 'inline-block',
              fontSize: '14px', fontWeight: 700, color: 'var(--fg)',
              textDecoration: 'none', borderBottom: '1px solid var(--border)',
              paddingBottom: '3px', cursor: 'none',
            }}>
              {category.name}
            </Link>
          </aside>
        </div>
      </section>

      {/* ── Subcategory grid — same bento recipe as Featured Work, one tile
          per subcategory (e.g. Wedding Video, Short Form Videos…) ── */}
      {subcategories.length > 0 && (
        <section style={{ background: 'var(--bg)', padding: 'clamp(40px,5vw,60px) clamp(24px,4vw,60px)' }}>
          <div style={{
            width: '67.2vw', minWidth: '280px', margin: '0 auto',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
          }}>
            {subcategories.map((sub, i) => {
              const { isFull, isTall } = subTilePlacement(i + 1)
              return (
                <Link
                  key={sub.slug}
                  href={`/services/${category.slug}/${sub.slug}`}
                  style={{
                    display: 'block', textDecoration: 'none',
                    gridColumn: isFull ? '1 / -1' : undefined,
                    gridRow: isTall ? 'span 2' : undefined,
                  }}
                >
                  <div style={{
                    position: 'relative', borderRadius: '20px', overflow: 'hidden',
                    background: category.accent, cursor: 'none',
                    aspectRatio: isTall ? undefined : (isFull ? '1000/540' : '500/350'),
                    height: isTall ? '100%' : undefined,
                  }}>
                    <Image
                      src={sub.cover}
                      alt={sub.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 34vw"
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)',
                    }} />
                    <div style={{ position: 'absolute', left: '20px', bottom: '18px', right: '20px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                        {sub.gridLabel}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Full-width cover ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: '#0d1f3c' }}>
        <Image
          src={category.cover}
          alt={category.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Gallery — 2-col grid, mixed square/full-width tiles, no rounding
          (matches the reference exactly). Skipped when the category has its
          own subcategory grid above instead. ── */}
      {subcategories.length === 0 && (
      <section style={{ background: 'var(--bg)', padding: 'clamp(40px,5vw,60px) clamp(24px,4vw,60px)' }}>
        <div
          ref={galleryRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(8px, 1.5vw, 21px)',
            maxWidth: '1344px',
            margin: '0 auto',
          }}
        >
          {category.gallery.map((src, i) => {
            const full = tileSpan(i + 1)
            return (
              <div key={i} style={{
                position: 'relative',
                overflow: 'hidden',
                gridColumn: full ? '1 / -1' : undefined,
                aspectRatio: full ? '1344/780' : '661/688',
                background: '#0d1f3c',
              }}>
                <Image
                  src={src}
                  alt={`${category.name} ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, (max-width: 1344px) 50vw, 672px"
                />
              </div>
            )
          })}
        </div>
      </section>
      )}

      {/* ── Credits ── */}
      <section ref={creditsRef} style={{ background: 'var(--bg)', padding: 'clamp(60px,8vw,90px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '28px' }}>
            Credits
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px 48px' }}>
            {category.credits.map((c) => (
              <div key={c.role} style={{ minWidth: '160px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--fg-muted)', marginBottom: '10px' }}>
                  {c.role}
                </div>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: category.accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                }}>
                  {c.name[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.6vw, 34px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
          }}>
            &ldquo;{category.testimonial.quote}&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
              <Image src={category.testimonial.photo} alt={category.testimonial.author} fill style={{ objectFit: 'cover' }} sizes="48px" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                {category.testimonial.author}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                {category.testimonial.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
          Your brand, next level
        </p>
        <h2 style={{
          fontFamily: "'Youth', Arial, sans-serif",
          fontSize: 'clamp(36px, 6vw, 88px)',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          color: 'var(--fg)',
          marginBottom: '40px',
        }}>
          Let&apos;s make it<br />
          <span style={{ color: 'rgba(0,25,65,0.22)' }}>happen.</span>
        </h2>
        <Link href="/#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '14px 32px', background: 'var(--fg)', color: '#fff',
          borderRadius: '100px', fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          textDecoration: 'none', cursor: 'none', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Book a call
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </section>

      {/* ── Next project — solid accent band, live scroll % (matches reference) ── */}
      {nextCategory && (
        <Link
          ref={nextBandRef}
          href={`/services/${nextCategory.slug}`}
          data-nav-dark
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '18px', textDecoration: 'none', cursor: 'none',
            background: category.accent,
            padding: 'clamp(48px,7vw,90px) clamp(24px,4vw,60px)',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', margin: 0 }}>
            (Next project)
          </p>
          <h3 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(40px, 9vw, 140px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#fff',
            margin: 0,
            textAlign: 'center',
          }}>
            {nextCategory.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span>Keep scrolling</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{scrollPct}%</span>
          </div>
        </Link>
      )}
    </>
  )
}
