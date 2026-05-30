'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    slug: 'video-editing', num: '01',
    heading: 'Cinematic edits that\ncapture & convert.',
    tagline: 'Video Editing',
    description: 'We don\'t just edit clips — we craft stories. From transitions to pacing, colour tone to sound flow, every frame is shaped to keep your audience hooked.',
    client: 'TEO', clientRole: 'Founder, Content Studio',
    clientQuote: 'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Truly impressive work.',
    bg: '#3B2FC9',
    carousel: ['/images/portfolio/ve-1.jpg','/images/portfolio/ve-2.jpg','/images/portfolio/ve-3.jpg','/images/portfolio/ve-4.jpg'],
  },
  {
    slug: 'graphic-design', num: '02',
    heading: 'Designs that speak\nbefore you do.',
    tagline: 'Graphic Design',
    description: 'Great design is silent marketing — and we make it loud. High-impact visuals from posters to branding and social creatives, designed to leave a lasting impression.',
    client: 'MATT', clientRole: 'Creative Director',
    clientQuote: 'FilmFX Studio created amazing custom designs that elevated our brand. Talented and creative team.',
    bg: '#C9302F',
    carousel: ['/images/portfolio/gd-1.jpg','/images/portfolio/gd-2.jpg','/images/portfolio/gd-3.jpg','/images/portfolio/gd-4.jpg'],
  },
  {
    slug: 'smm', num: '03',
    heading: 'We don\'t chase trends —\nwe create them.',
    tagline: 'Social Media Marketing',
    description: 'Smart strategies and campaigns that make people stop scrolling and start engaging — building brand presence that turns audiences into loyal followers.',
    client: 'J. THOMAS', clientRole: 'Head of Growth',
    clientQuote: 'FilmFX Studio doubled our social media engagement in 2 months with smart, creative strategies.',
    bg: '#C96B14',
    carousel: ['/images/portfolio/smm-1.jpg','/images/portfolio/smm-2.jpg','/images/portfolio/smm-3.jpg','/images/portfolio/smm-4.jpg'],
  },
  {
    slug: 'sales-marketing', num: '04',
    heading: 'Marketing with\none goal: results.',
    tagline: 'Sales & Business Development',
    description: 'Targeting the right audience, delivering the right message, and turning interest into action — helping your business grow faster, smarter, and stronger.',
    client: 'KEVIN', clientRole: 'CEO, Growth Agency',
    clientQuote: 'FilmFX Studio boosted our leads quickly with smart marketing. Real growth, not just promises.',
    bg: '#12271A',
    carousel: ['/images/portfolio/sm-1.jpg','/images/portfolio/sm-2.jpg','/images/portfolio/sm-3.jpg','/images/portfolio/sm-4.jpg'],
  },
  {
    slug: 'website-development', num: '05',
    heading: 'Websites built to\nimpress & convert.',
    tagline: 'Website Development',
    description: 'Your digital storefront — made unforgettable. Clean UI, smooth UX, speed optimisation and responsiveness: sites that turn visitors into customers.',
    client: 'JASMINE', clientRole: 'Founder, E-commerce Brand',
    clientQuote: 'FilmFX Studio built a site that helped us secure key partnerships. Truly outstanding work.',
    bg: '#1A1A2E',
    carousel: ['/images/portfolio/wd-1.jpg','/images/portfolio/wd-2.jpg','/images/portfolio/wd-3.jpg','/images/portfolio/wd-4.jpg'],
  },
  {
    slug: 'staff-augmentation', num: '06',
    heading: 'Expand your workforce\neffortlessly.',
    tagline: 'Staff Augmentation',
    description: 'Get the right talent exactly when you need it. Flexible team expansion, no stress of traditional hiring — your business keeps moving forward.',
    client: 'ALBERT', clientRole: 'Operations Director',
    clientQuote: 'FilmFX Studio helped us scale fast with the right talent, meet deadlines, and maintain quality.',
    bg: '#0E2A1A',
    carousel: ['/images/portfolio/work-1.png','/images/portfolio/work-2.png','/images/portfolio/work-3.png','/images/portfolio/work-4.png'],
  },
]

const N = services.length

export default function Services() {
  const outerRef  = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const outer = outerRef.current
    if (!outer) return

    // Place cards: first one centered, rest below the viewport
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      gsap.set(card, { y: i === 0 ? 0 : '100vh', scale: 1 })
    })

    // One timeline scrubbed against the full scroll height
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: outer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
      },
    })

    // Each segment = 1/(N-1) of the total timeline
    for (let i = 1; i < N; i++) {
      const segLen = 1 / (N - 1)
      const at     = (i - 1) * segLen   // when this transition starts

      // Previous card shrinks/pushes back
      tl.to(cardRefs.current[i - 1],
        { scale: 0.92, y: -24, ease: 'power2.inOut', duration: segLen },
        at
      )
      // New card slides up from below
      tl.to(cardRefs.current[i],
        { y: 0, ease: 'power2.inOut', duration: segLen },
        at
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="services" style={{ background: 'var(--bg)' }}>

      {/* ── Header (normal flow, scrolls away) ── */}
      <div style={{
        padding: 'clamp(72px,9vw,130px) clamp(32px,5vw,80px) 64px',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', flexWrap: 'wrap', gap: '28px',
      }}>
        <div>
          <p className="section-tag" style={{ marginBottom: '14px' }}>What we do</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px,6.5vw,96px)',
            fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.93,
            color: 'var(--fg)',
          }}>
            Our ways to<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
              create impact.
            </span>
          </h2>
        </div>
        <a href="#works" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em',
          textTransform: 'uppercase', color: 'var(--fg)', textDecoration: 'none',
          cursor: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px',
        }}>
          See our case studies
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Tall scroll container (N × 100vh) ── */}
      <div ref={outerRef} style={{ height: `${N * 100}vh` }}>

        {/* ── Single sticky viewport ── */}
        <div
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {services.map((svc, i) => (
            <div
              key={svc.slug}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                position: 'absolute',
                width: 'min(980px, 90vw)',
                height: '78vh',
                borderRadius: '20px',
                background: svc.bg,
                overflow: 'hidden',
                boxShadow: '0 32px 80px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.15)',
                zIndex: i + 1,
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(24px,3.5vw,48px)',
              }}
            >
              {/* Top row: tagline + number */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
                  {svc.tagline}
                </span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
                  ({svc.num})
                </span>
              </div>

              {/* Heading */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px,3.8vw,58px)',
                fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
                color: '#fff', whiteSpace: 'pre-line', maxWidth: '600px',
              }}>
                {svc.heading}
              </h3>

              {/* Description */}
              <p style={{ fontSize: 'clamp(12px,1.2vw,15px)', color: 'rgba(255,255,255,0.58)', lineHeight: 1.75, maxWidth: '480px', marginTop: '14px' }}>
                {svc.description}
              </p>

              {/* Bottom: testimonial + images + CTA */}
              <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '20px', alignItems: 'end' }}>

                {/* Testimonial */}
                <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '16px 18px' }}>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '12px' }}>
                    &ldquo;{svc.clientQuote}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {svc.client[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>{svc.client}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '1px' }}>{svc.clientRole}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '1px' }}>
                      {[...Array(5)].map((_,j) => <span key={j} style={{ color: '#FBBF24', fontSize: '10px' }}>★</span>)}
                    </div>
                  </div>
                </div>

                {/* Images + CTA */}
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflow: 'hidden' }}>
                    {svc.carousel.map((src, j) => (
                      <div key={j} style={{ flexShrink: 0, width: 'clamp(88px,11vw,155px)', height: 'clamp(60px,7.5vw,106px)', borderRadius: '10px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="155px" />
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: '100px', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                    textDecoration: 'none', cursor: 'none', transition: 'background 0.2s',
                  }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
                  >
                    See our case studies
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
