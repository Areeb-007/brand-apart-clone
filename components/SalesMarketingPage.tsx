'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { SectionEyebrow, useReveal, useNextBandScrollPct } from '@/components/PortfolioPageKit'

gsap.registerPlugin(ScrollTrigger)

// Bespoke page for Sales & Business Development — same base pattern as
// GraphicDesignPage.tsx (replaces CategoryDetail for this route; see
// app/services/[slug]/page.tsx), but the source spec gives this one its own
// cinema-themed concept (giant faint background words, a "script" of six
// expandable scenes, three pricing tiers framed as "ways into the picture")
// rather than reusing the plain MediaBox sections the other pages use.

const TICKER_WORDS = [
  'Prospect Research', 'Cold Outreach', 'Lead Qualification', 'Sales Pipeline',
  'CRM Optimization', 'Business Growth', 'Deal Closing', 'Revenue Scaling',
]

const SCENES = [
  { n: '01', title: 'Sales Development',      line: 'The opening scene — getting you in the room.' },
  { n: '02', title: 'Lead Generation',        line: 'Casting the right prospects.' },
  { n: '03', title: 'CRM & Sales Ops',        line: 'The production office, organized.' },
  { n: '04', title: 'Business Development',   line: 'Writing the bigger story.' },
  { n: '05', title: 'Revenue Operations',     line: 'Keeping every department in sync.' },
  { n: '06', title: 'Client Success & Team',  line: 'The sequel: retention & growth.' },
]

const TIERS = [
  {
    tier: 'Tier 01 — Starter', name: 'Starter Growth', featured: false,
    services: ['Lead Generation', 'Cold Email', 'CRM Setup', 'Appointment Setting'],
  },
  {
    tier: 'Tier 02 — Feature', name: 'Growth Accelerator', featured: true,
    services: ['Multi-channel Outreach', 'CRM Management', 'SDR Team', 'Weekly Reporting', 'Sales Dashboard'],
  },
  {
    tier: 'Tier 03 — Premiere', name: 'Revenue Partner', featured: false,
    services: ['Dedicated BD Manager', 'Full Sales Team', 'CRM + Lead Generation', 'Sales Consulting', 'Weekly Strategy Calls'],
  },
]

function BackgroundWord({ children }: { children: string }) {
  return (
    <span style={{
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      fontFamily: "'Youth', Arial, sans-serif", fontWeight: 900,
      fontSize: 'clamp(90px, 18vw, 260px)', letterSpacing: '-0.04em',
      color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
    }}>
      {children}
    </span>
  )
}

function SceneRow({ scene, isOpen, onToggle }: { scene: typeof SCENES[number]; isOpen: boolean; onToggle: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '18px',
          padding: '22px 0', background: 'transparent', border: 0, cursor: 'none', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontVariantNumeric: 'tabular-nums', width: '20px' }}>
          {scene.n}
        </span>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
          background: hover || isOpen ? 'var(--accent)' : 'rgba(255,255,255,0.25)',
          transition: 'background 0.25s',
        }} />
        <span style={{ flex: 1 }}>
          <span style={{
            display: 'block', fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2vw, 26px)',
            fontWeight: 700, color: hover || isOpen ? 'var(--accent)' : '#fff', transition: 'color 0.25s',
          }}>
            {scene.title}
          </span>
        </span>
        <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div style={{
        maxHeight: isOpen ? '80px' : '0px', overflow: 'hidden', transition: 'max-height 0.35s ease',
      }}>
        <p style={{ fontStyle: 'italic', fontSize: '14px', color: 'rgba(255,255,255,0.55)', padding: '0 0 22px 46px', margin: 0 }}>
          {scene.line}
        </p>
      </div>
    </div>
  )
}

export default function SalesMarketingPage({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)
  const scrollPct = useNextBandScrollPct(nextBandRef)
  const [openScene, setOpenScene] = useState(0)

  const scriptIntroRef = useReveal<HTMLDivElement>()
  const scenesRef      = useReveal<HTMLDivElement>()
  const screenIntroRef = useReveal<HTMLDivElement>()
  const tiersRef       = useReveal<HTMLDivElement>()
  const industriesRef  = useReveal<HTMLDivElement>()

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
      <section data-nav-dark style={{ position: 'relative', overflow: 'hidden', background: '#000', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(90px,10vw,130px)', textAlign: 'center' }}>
        <BackgroundWord>SALES</BackgroundWord>
        <div ref={heroRef} style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px' }}>
            Sales &amp; Business Development — Turning Connections Into Clients
          </p>
          <h1 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(44px, 7vw, 92px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            color: '#fff',
            margin: '0 0 28px',
          }}>
            Prospects.<br />
            Meetings.<br />
            <span style={{ fontStyle: 'italic' }}>Revenue.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.7,
            margin: '0 auto',
          }}>
            At FilmFX Studio, we build scalable sales systems that generate qualified leads, book high-value meetings, and help businesses close more deals — so your team spends less time chasing prospects and more time driving revenue.
          </p>
        </div>
      </section>

      {/* ── Ticker ── */}
      <div style={{ background: '#000', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '20px 0', overflow: 'hidden' }}>
        <div className="marquee-track" style={{ gap: '36px', alignItems: 'center' }}>
          {[...TICKER_WORDS, ...TICKER_WORDS].map((word, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '36px', flexShrink: 0 }}>
              <span style={{ fontSize: 'clamp(13px, 1.4vw, 16px)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', whiteSpace: 'nowrap' }}>
                {word}
              </span>
              <span style={{ color: 'var(--accent)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Script intro ── */}
      <section ref={scriptIntroRef} style={{ position: 'relative', overflow: 'hidden', background: '#000', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px) clamp(40px,5vw,60px)' }} data-nav-dark>
        <BackgroundWord>STRATEGY</BackgroundWord>
        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(32px,5vw,80px)', justifyContent: 'space-between' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.6vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            margin: 0,
            flex: '1 1 320px',
          }}>
            Six moves.<br />One mission: <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>growth.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '380px', flex: '1 1 280px', margin: 0 }}>
            Every move is strategically designed to generate qualified leads, build lasting relationships, and create predictable revenue.
          </p>
        </div>
      </section>

      {/* ── Six scenes (click to read) ── */}
      <section ref={scenesRef} style={{ background: '#000', padding: '0 clamp(24px,4vw,60px) clamp(90px,10vw,120px)' }} data-nav-dark>
        <div style={{ maxWidth: '900px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {SCENES.map((scene, i) => (
            <SceneRow key={scene.n} scene={scene} isOpen={openScene === i} onToggle={() => setOpenScene(openScene === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* ── Screen intro (pricing lead-in) ── */}
      <section ref={screenIntroRef} style={{ position: 'relative', overflow: 'hidden', background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px) clamp(40px,5vw,60px)', textAlign: 'center' }} data-nav-dark>
        <BackgroundWord>GROWTH</BackgroundWord>
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
            Choose Your Growth Path
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.6vw, 48px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.1,
            margin: '0 0 24px',
          }}>
            Three ways<br />to fuel <span style={{ fontStyle: 'italic' }}>growth.</span>
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.3vw, 17px)', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
            Choose the engagement model that fits your business goals. Whether you&apos;re building your first sales pipeline or scaling an established team, we have a strategy designed for your next stage of growth.
          </p>
        </div>
      </section>

      {/* ── Pricing tiers ── */}
      <section ref={tiersRef} style={{ background: '#001941', padding: '0 clamp(24px,4vw,60px) clamp(90px,10vw,120px)' }} data-nav-dark>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {TIERS.map(tier => (
            <div key={tier.name} style={{
              borderRadius: '20px', padding: 'clamp(28px,3vw,36px)',
              background: tier.featured ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
              border: tier.featured ? 'none' : '1px solid rgba(255,255,255,0.1)',
            }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tier.featured ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)', marginBottom: '14px' }}>
                {tier.tier}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, color: tier.featured ? '#001941' : '#fff', margin: '0 0 24px' }}>
                {tier.name}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tier.services.map(s => (
                  <li key={s} style={{ fontSize: '14px', color: tier.featured ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)' }}>
                    {s}
                  </li>
                ))}
              </ul>
              <Link href="/#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                color: tier.featured ? '#001941' : '#fff', textDecoration: 'none', cursor: 'none',
                borderBottom: `1px solid ${tier.featured ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'}`, paddingBottom: '2px',
              }}>
                Get started
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Industries served ── */}
      <section ref={industriesRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)', textAlign: 'center' }}>
        <SectionEyebrow>Industries We Serve</SectionEyebrow>
        <h2 style={{
          fontFamily: "'Youth', Arial, sans-serif",
          fontSize: 'clamp(30px, 4vw, 52px)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--fg)',
          margin: '0 0 28px',
        }}>
          Helping businesses<br />grow across <span style={{ fontStyle: 'italic', color: 'rgba(0,25,65,0.3)' }}>every industry.</span>
        </h2>
        <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto' }}>
          Empowering ambitious brands from fast-growing startups to established enterprises in SaaS, AI, real estate, healthcare, finance, construction, eCommerce, logistics, IT, education, hospitality, and professional services to unlock their next stage of business growth.
        </p>
      </section>

      {/* ── Final CTA — cinematic closing panel ── */}
      <section style={{
        position: 'relative', overflow: 'hidden', textAlign: 'center',
        padding: 'clamp(90px,10vw,130px) clamp(24px,4vw,60px)',
        background: 'radial-gradient(circle at 20% 60%, rgba(201,48,47,0.35), transparent 55%), #000',
      }} data-nav-dark>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'clamp(30px, 4.2vw, 54px)',
          fontWeight: 600,
          color: '#fff',
          lineHeight: 1.15,
          margin: '0 0 36px',
        }}>
          Roll camera on<br />your <span style={{ color: 'var(--accent)' }}>pipeline.</span>
        </h2>
        <Link href="/#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '14px 32px', background: '#fff', color: '#000',
          borderRadius: '100px', fontSize: '13px', fontWeight: 700,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          textDecoration: 'none', cursor: 'none', transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Book your free audit
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <p style={{ marginTop: '24px', fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
          Turn prospects into customers.
        </p>
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
