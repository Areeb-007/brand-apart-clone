'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { useReveal, useNextBandScrollPct } from '@/components/PortfolioPageKit'

gsap.registerPlugin(ScrollTrigger)

// Bespoke page for Staff Augmentation — same pattern as GraphicDesignPage.tsx
// (replaces CategoryDetail for this route; see app/services/[slug]/page.tsx).
// Content and section order follow Tab 4 of the client's content doc
// (superside.com as layout reference); each section's artwork is the
// client's own graphic, under public/images/staff-augmentation/.

const SERVICE_TILES = [
  'Video Editors', 'Motion Graphics Designers', 'VFX Artists',
  'Social Media Video Editors', 'Color Grading Specialists', 'Sound Designers & Audio Editors',
]

const HOW_STEPS = [
  '1 — Tell us what you need. Share your project goals, preferred tools, timeline, and required skill set.',
  '2 — Meet your creative talent. We’ll match you with professionals that fit your workflow and production style.',
  '3 — Start working immediately. Your creative team integrates seamlessly into your workflow.',
  '4 — Scale anytime. Increase or reduce team size as projects evolve without recruitment headaches.',
]

/* eslint-disable @next/next/no-img-element -- transparent client artwork, shown whole at its natural ratio */
function Art({ src, alt, style }: { src: string; alt: string; style?: React.CSSProperties }) {
  return <img src={src} alt={alt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto', ...style }} />
}
/* eslint-enable @next/next/no-img-element */

function SectionHeading({ title, tagline, dark }: { title: string; tagline?: string; dark?: boolean }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto clamp(40px,5vw,64px)' }}>
      <h2 style={{
        fontFamily: "'Youth', Arial, sans-serif",
        fontSize: 'clamp(30px, 4vw, 52px)',
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 1.02,
        color: dark ? '#fff' : 'var(--fg)',
        margin: tagline ? '0 0 16px' : 0,
      }}>
        {title}
      </h2>
      {tagline && (
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(17px, 1.8vw, 22px)',
          fontWeight: 600,
          color: dark ? 'rgba(255,255,255,0.65)' : 'var(--fg-muted)',
          margin: 0,
        }}>
          {tagline}
        </p>
      )}
    </div>
  )
}

export default function StaffAugmentationPage({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)
  const scrollPct = useNextBandScrollPct(nextBandRef)

  const trustedRef  = useReveal<HTMLDivElement>()
  const whyRef      = useReveal<HTMLDivElement>()
  const servicesRef = useReveal<HTMLDivElement>()
  const howRef      = useReveal<HTMLDivElement>()
  const statsRef    = useReveal<HTMLDivElement>()
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

      {/* ── 1. Hero — headline, tagline, paragraph + illustration ── */}
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(70px,8vw,100px)', overflow: 'hidden' }}>
        <div ref={heroRef} style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(32px,5vw,72px)',
        }}>
          <div style={{ flex: '1 1 440px', minWidth: 0, maxWidth: '620px' }}>
            <h1 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(44px, 6.4vw, 84px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
              color: '#fff',
              margin: '0 0 18px',
            }}>
              Staff Augmentation
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1.25,
              margin: '0 0 22px',
            }}>
              Scale Your Creative Team Without Hiring.
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(16px, 1.5vw, 19px)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: 0,
            }}>
              Whether you need one specialist or an entire creative team, FilmFX Studio provides experienced professionals who integrate seamlessly into your workflow. Skip lengthy hiring cycles and scale your production with skilled editors, motion designers, VFX artists, and post-production experts exactly when you need them.
            </p>
          </div>
          <div style={{ flex: '1 1 380px', minWidth: '260px', maxWidth: '560px', margin: '0 auto' }}>
            <Art src="/images/staff-augmentation/hero.png" alt="Creative team members working on laptops" />
          </div>
        </div>
      </section>

      {/* ── 2. Trusted creative talent ── */}
      <section ref={trustedRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto clamp(32px,4vw,48px)' }}>
            <h2 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: 'var(--fg)',
              margin: '0 0 22px',
            }}>
              Trusted Creative Talent.<br />Built For Modern Teams.
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              From startups to growing agencies and enterprise brands, businesses trust FilmFX Studio to provide highly skilled creative professionals that deliver quality work, adapt quickly, and become a natural extension of internal teams.
            </p>
          </div>
          <Art src="/images/staff-augmentation/trusted.png" alt="Trusted creative talent — editors, designers and marketers across every creative skill" />
        </div>
      </section>

      {/* ── 3. Why choose us ── */}
      <section ref={whyRef} style={{ background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }} data-nav-dark>
        <SectionHeading title="WHY CHOOSE US" tagline="Why Companies Choose FilmFX Studio" dark />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Art
            src="/images/staff-augmentation/why.png"
            alt="1 Fast team scaling, 2 Specialized talent, 3 Flexible engagement, 4 Seamless collaboration, 5 Consistent quality, 6 Cost efficient"
          />
        </div>
      </section>

      {/* ── 4. Services ── */}
      <section ref={servicesRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <SectionHeading title="SERVICES" tagline="Creative Specialists Ready to Join Your Team" />
        <style>{`
          .sa-services-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;max-width:1000px;margin:0 auto;}
          @media (max-width:820px){.sa-services-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
          @media (max-width:480px){.sa-services-grid{grid-template-columns:minmax(0,1fr);}}
        `}</style>
        <div className="sa-services-grid">
          {SERVICE_TILES.map((label, i) => (
            <div key={i} style={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Art src={`/images/staff-augmentation/services/${i + 1}.png`} alt={label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. How it works — the 4 step bars, stacked ── */}
      <section ref={howRef} style={{ background: 'var(--bg-card)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <SectionHeading title="How It Works" />
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(4px,1vw,10px)' }}>
          {HOW_STEPS.map((alt, i) => (
            <Art key={i} src={`/images/staff-augmentation/how/${i + 1}.png`} alt={alt} />
          ))}
        </div>
      </section>

      {/* ── 6. Stats ── */}
      <section ref={statsRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <SectionHeading title="STATS" tagline="Built For Fast-Moving Creative Teams" />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <Art
            src="/images/staff-augmentation/stats.png"
            alt="24–48 hours average talent placement, 100% remote global creative collaboration, flexible project/part-time/full-time engagements, multiple creative disciplines"
          />
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
        <Link href="/contact" style={{
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
