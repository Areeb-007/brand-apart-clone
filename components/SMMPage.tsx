'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { SectionEyebrow, useReveal, useNextBandScrollPct } from '@/components/PortfolioPageKit'
import LazyVideoTile from '@/components/LazyVideoTile'

gsap.registerPlugin(ScrollTrigger)

// Bespoke page for Social Media Marketing — same pattern as
// GraphicDesignPage.tsx (replaces CategoryDetail for this one route; see
// app/services/[slug]/page.tsx). Assets live under public/images/smm/.
// "What We Do" is styled after later.com's "Go Big, We've Got You" tabbed
// feature section — click-to-switch panels instead of a static list. Tab
// names are the client's real 4 services (from the puzzle-piece reference
// graphic); the description under each is written to match, since the
// source spec only gave the labels, not body copy.
const SERVICES = [
  {
    label: 'Social Media Management',
    copy: 'Consistent posting, community management, and platform strategy that keeps your brand active and engaged everywhere your audience scrolls.',
  },
  {
    label: 'Short Form Video Editing',
    copy: 'Fast-paced, scroll-stopping edits built for Reels, TikTok, and Shorts — hooks, captions, and pacing tuned for maximum watch time.',
  },
  {
    label: 'Content Strategy & GTM Launch',
    copy: 'Full-funnel content calendars and go-to-market plans that turn your brand’s story into a repeatable growth engine.',
  },
  {
    label: 'UGC & Creator Content',
    copy: 'Authentic, creator-style content that builds trust fast — sourced, briefed, and edited to perform like it was made in-house.',
  },
]

const BRANDS = [
  'riversol', 'peluva', 'meche', 'forkful', 'demox', 'dna-media-hq', 'wallpaper-concierge',
]

// Each card is a fully designed square graphic with its value + label baked
// in (see public/images/smm/stats/) — no separate text needed.
const STATS = ['card-1', 'card-2', 'card-3', 'card-4']

export default function SMMPage({ category }: { category: Category }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(0)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)
  const scrollPct = useNextBandScrollPct(nextBandRef)

  const piecesRef  = useReveal<HTMLDivElement>()
  const ugcRef    = useReveal<HTMLDivElement>()
  const whatRef   = useReveal<HTMLDivElement>()
  const quoteRef  = useReveal<HTMLDivElement>()
  const brandsRef = useReveal<HTMLDivElement>()
  const statsRef  = useReveal<HTMLDivElement>()
  const ctaRef    = useReveal<HTMLDivElement>()

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
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(70px,8vw,100px)', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(40px,6vw,80px)',
        }}>
          {/* Text column and illustration sized to balance each other (client
              revision: larger elements, heading + copy aligned to one width). */}
          <div ref={heroRef} style={{ flex: '1 1 460px', minWidth: 0, maxWidth: '640px' }}>
            <h1 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(44px, 6.4vw, 84px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
              color: '#fff',
              margin: '0 0 24px',
            }}>
              Social Media That Gets Seen. Shared. Remembered.
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(17px, 1.7vw, 22px)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.65,
              margin: 0,
            }}>
              At FilmFX Studio, we blend creativity with strategy to build impactful social media campaigns that capture attention, inspire action, and fuel sustainable brand growth.
            </p>
          </div>

          <div style={{ flex: '1 1 340px', minWidth: '260px', maxWidth: '500px', margin: '0 auto' }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- transparent illustration, shown as-is (no crop box) */}
            <img
              src="/images/smm/hero.png"
              alt="Social media engagement illustration"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ── Brands we've worked with — auto-scrolling marquee, styled after
          later.com's partner-logo strip ── */}
      <section ref={brandsRef} style={{ background: 'var(--bg)', padding: 'clamp(40px,6vw,60px) 0', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '32px' }}>
          Brands We&apos;ve Worked With
        </p>
        <div style={{
          width: '100%', overflow: 'hidden',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}>
          <div className="marquee-track" style={{ gap: 'clamp(32px,5vw,56px)', alignItems: 'center' }}>
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              // Source files are 1000x1000 canvases with the logo mark small and
              // centered — zoom in and clip the overflow to crop out that padding.
              <div key={`${brand}-${i}`} style={{ height: '64px', width: '140px', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- transparent logo, cropped via the wrapper above */}
                <img
                  src={`/images/smm/brands/${brand}.png`}
                  alt={brand}
                  style={{ height: '160px', width: 'auto', flexShrink: 0, opacity: 0.85 }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UGC video showcase — dense, full-bleed mosaic wall (42 tiles — 6 full rows of 7,
          flush edge-to-edge, no gaps/rounding) matching the client's
          reference layout. Each tile autoplays/loops a real client clip,
          re-encoded down from the ~2.9GB of raw masters the client sent
          (up to 542MB each) to ~68MB total (480px wide, no audio, CRF 30) —
          lazy-loaded via LazyVideoTile so 40 videos don't all start
          downloading/decoding at once on page load. ── */}
      <section ref={ugcRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto clamp(36px,5vw,56px)', padding: '0 clamp(24px,4vw,60px)' }}>
          <SectionEyebrow>Short-Form UGC</SectionEyebrow>
        </div>
        <div className="ugc-wall" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '14px', padding: '0 clamp(24px,4vw,60px)' }}>
          {Array.from({ length: 42 }, (_, idx) => idx + 1).map(i => (
            <div key={i} style={{ aspectRatio: '4/5', overflow: 'hidden', borderRadius: '16px' }}>
              <LazyVideoTile src={`/videos/smm-ugc/clip-${String(i).padStart(2, '0')}.mp4`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── What We Do — tabbed feature panel, styled after later.com's
          "Go Big, We've Got You" section ── */}
      <section ref={whatRef} style={{ background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }} data-nav-dark>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '16px' }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(26px, 3.2vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#fff',
            margin: '0 0 48px',
          }}>
            Everything Your Brand Needs to Win on Social Media.
          </h2>
        </div>

        {/* Services puzzle-piece graphic — the client's own illustration of
            these same 4 services, shown above the interactive tabs below */}
        <div ref={piecesRef} style={{ maxWidth: '1100px', margin: '0 auto clamp(48px,6vw,72px)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- transparent illustration, shown as-is (no crop box) */}
          <img
            src="/images/smm/what-we-do-pieces.png"
            alt="Social Media Management, Short Form Video Editing, Content Strategy AND GTM Launch, UGC AND Creator Content"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Tab row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
            {SERVICES.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActiveService(i)}
                style={{
                  flex: '1 1 180px', background: 'transparent', border: 0, cursor: 'none',
                  padding: '16px 12px', fontSize: '13px', fontWeight: 700,
                  color: activeService === i ? '#fff' : 'rgba(255,255,255,0.4)',
                  borderBottom: `2px solid ${activeService === i ? 'var(--accent)' : 'transparent'}`,
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div style={{ padding: 'clamp(32px,5vw,48px) clamp(8px,2vw,16px)', textAlign: 'center' }}>
            <p key={activeService} style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(17px, 1.8vw, 21px)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
              maxWidth: '620px',
              margin: '0 auto',
            }}>
              {SERVICES[activeService].copy}
            </p>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section ref={quoteRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        {/* Client's quote design as separate layers: 4 floating 3D elements
            (each a 16:9 transparent canvas with the element placed where the
            client's "option 2" composite puts it) behind the quote text. */}
        <style>{`
          @keyframes smm-float{0%,100%{transform:translate3d(0,0,0) rotate(0deg)}50%{transform:translate3d(0,-1.6%,0) rotate(1.5deg)}}
          .smm-quote-el{position:absolute;inset:0;width:100%;height:100%;animation:smm-float 6s ease-in-out infinite;pointer-events:none}
          @media (prefers-reduced-motion:reduce){.smm-quote-el{animation:none}}
        `}</style>
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', aspectRatio: '16/9' }}>
          {[1, 2, 3, 4].map(n => (
            // eslint-disable-next-line @next/next/no-img-element -- transparent layered artwork
            <img
              key={n}
              src={`/images/smm/quote-layers/elements-${n}.png`}
              alt=""
              aria-hidden
              className="smm-quote-el"
              style={{ animationDelay: `${-n * 1.4}s`, animationDuration: `${5 + n * 0.8}s` }}
            />
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element -- transparent layered artwork */}
          <img
            src="/images/smm/quote-layers/quote.png"
            alt="Social media isn't about being everywhere. It's about being unforgettable."
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />
        </div>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} style={{ background: 'var(--bg-card)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: 'var(--fg)',
            textAlign: 'center',
            margin: '0 0 56px',
          }}>
            Results That Speak Louder Than Words
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px' }}>
            {STATS.map(card => (
              // eslint-disable-next-line @next/next/no-img-element -- pre-designed card (rounded corners + shadow baked in), shown as-is
              <img
                key={card}
                src={`/images/smm/stats/${card}.png`}
                alt=""
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} style={{ background: 'var(--bg)', padding: '0 clamp(24px,4vw,60px) clamp(80px,10vw,120px)', textAlign: 'center' }}>
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
