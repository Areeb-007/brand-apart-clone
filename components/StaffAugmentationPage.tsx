'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { MediaBox, SectionEyebrow, useReveal, useNextBandScrollPct } from '@/components/PortfolioPageKit'

gsap.registerPlugin(ScrollTrigger)

// Bespoke page for Staff Augmentation — same pattern as GraphicDesignPage.tsx
// (replaces CategoryDetail for this route; see app/services/[slug]/page.tsx).
// Assets live under public/images/staff-augmentation/.
// The role list and stats aren't spelled out as FilmFX-specific numbers in
// the source spec (it points to Superside's own marketing site as visual
// reference) — filled in with reasonable placeholders; swap for the real
// figures/roles when available.
const ROLES = [
  'Video editors', 'Motion designers', 'Graphic designers',
  'VFX artists', 'Social media managers', 'Project managers',
]

const STATS = [
  { value: '500+', label: 'Projects delivered' },
  { value: '12K+', label: 'Hours of creative work' },
  { value: '94%', label: 'Client retention rate' },
  { value: '6 months', label: 'Average engagement length' },
]

export default function StaffAugmentationPage({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)
  const scrollPct = useNextBandScrollPct(nextBandRef)

  const trustedRef = useReveal<HTMLDivElement>()
  const whyRef      = useReveal<HTMLDivElement>()
  const rolesRef    = useReveal<HTMLDivElement>()
  const statsRef    = useReveal<HTMLDivElement>()
  const workRef     = useReveal<HTMLDivElement>()
  const ctaRef      = useReveal<HTMLDivElement>()

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  return (
    <>
      <Navigation />

      {/* ── Hero ── */}
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(70px,8vw,100px)', textAlign: 'center' }}>
        <div ref={heroRef} style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
            Staff Augmentation
          </p>
          <h1 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(40px, 6vw, 76px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            color: '#fff',
            margin: '0 0 24px',
          }}>
            Scale Your Creative Team Without Hiring.
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(16px, 1.6vw, 20px)',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            margin: '0 auto',
          }}>
            Whether you need one specialist or an entire creative team, FilmFX Studio provides experienced professionals who integrate seamlessly into your workflow. Skip lengthy hiring cycles and scale your production with skilled editors, motion designers, VFX artists, and post-production experts exactly when you need them.
          </p>
        </div>
      </section>

      {/* ── Trusted creative talent ── */}
      <section ref={trustedRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(30px, 4vw, 50px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--fg)',
            margin: '0 0 24px',
          }}>
            Trusted Creative Talent. Built For Modern Teams.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
            From startups to growing agencies and enterprise brands, businesses trust FilmFX Studio to provide highly skilled creative professionals that deliver quality work, adapt quickly, and become a natural extension of internal teams.
          </p>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section ref={whyRef} style={{ background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)', textAlign: 'center' }} data-nav-dark>
        <SectionEyebrow>Why Choose Us</SectionEyebrow>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 3.2vw, 44px)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#fff',
          margin: 0,
        }}>
          Why Companies Choose FilmFX Studio
        </h2>
      </section>

      {/* ── Services / roles ── */}
      <section ref={rolesRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)', textAlign: 'center' }}>
        <SectionEyebrow>Services</SectionEyebrow>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(22px, 2.6vw, 32px)',
          fontWeight: 700,
          color: 'var(--fg)',
          margin: '0 0 40px',
        }}>
          Creative Specialists Ready to Join Your Team
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '820px', margin: '0 auto' }}>
          {ROLES.map(role => (
            <span key={role} style={{
              fontSize: '14px', fontWeight: 600, color: 'var(--fg)',
              padding: '10px 20px', borderRadius: '100px', border: '1px solid var(--border)',
            }}>
              {role}
            </span>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} style={{ background: 'var(--bg-card)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(30px, 3.8vw, 48px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'var(--fg)',
            textAlign: 'center',
            margin: '0 0 56px',
          }}>
            How It Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
            {STATS.map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.2vw, 42px)', fontWeight: 800, color: 'var(--accent)', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--fg-muted)', fontWeight: 600 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work showcase ── */}
      <section ref={workRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '16px' }}>
          Built For Fast-Moving Creative Teams
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', maxWidth: '1100px', margin: '0 auto' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <MediaBox
                src={`/images/staff-augmentation/work-${i}.jpg`}
                alt={`Project ${i}`}
                label={`Drop work sample here:\npublic/images/staff-augmentation/work-${i}.jpg`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ background: 'var(--bg)', padding: '0 clamp(24px,4vw,60px) clamp(80px,10vw,120px)', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
          Your team, next level
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

      {/* ── Next project ── */}
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
