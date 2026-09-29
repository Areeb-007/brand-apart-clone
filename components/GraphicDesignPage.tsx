'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'

gsap.registerPlugin(ScrollTrigger)

// Bespoke, content-driven page for the Graphic Design category — the 8
// hand-written sections here don't map onto the generic CategoryDetail
// template (rotating hero showcase, service list, principles, split
// highlight, tools, brand identity, testimonials, quote), so this replaces
// CategoryDetail entirely for this one route (see app/services/[slug]/page.tsx).
// Every visual asset is a MediaBox pointed at a path under
// public/images/graphic-design/ — drop the real file at that path and it
// swaps in automatically; until then it shows a labeled placeholder.

const SERVICES = [
  'Social media designs', 'Logo designs', 'Brand identity', 'Banner designs',
  'Flyer and brochure designs', 'Thumbnail designs', 'Pitch deck and presentation designs',
  'Carousel designs', 'Typography designs',
]

function MediaBox({ src, alt, label, style }: { src: string; alt: string; label: string; style?: React.CSSProperties }) {
  const [failed, setFailed] = useState(false)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0d1f3c', overflow: 'hidden', ...style }}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element -- placeholder-aware loader, swaps in the moment a real file lands at `src`
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {failed && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '16px', border: '1px dashed rgba(255,255,255,0.25)',
          color: 'rgba(255,255,255,0.45)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.03em', lineHeight: 1.5,
        }}>
          {label}
        </div>
      )}
    </div>
  )
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '18px' }}>
      {children}
    </p>
  )
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (!ref.current) return
    const anim = gsap.fromTo(ref.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [])
  return ref
}

export default function GraphicDesignPage({ category }: { category: Category }) {
  const heroTextRef  = useRef<HTMLDivElement>(null)
  const heroBoxesRef = useRef<HTMLDivElement>(null)
  const [scrollPct, setScrollPct] = useState(0)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)

  const servicesRef  = useReveal<HTMLDivElement>()
  const principlesRef = useReveal<HTMLDivElement>()
  const highlightRef = useReveal<HTMLDivElement>()
  const toolsRef     = useReveal<HTMLDivElement>()
  const identityRef  = useReveal<HTMLDivElement>()
  const testimonialsRef = useReveal<HTMLDivElement>()
  const quoteRef     = useReveal<HTMLDivElement>()
  const ctaRef       = useReveal<HTMLDivElement>()

  // Hero entrance
  useEffect(() => {
    gsap.fromTo(heroTextRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  // Hero showcase — 3 boxes crossfade one after another, on a loop
  useEffect(() => {
    if (!heroBoxesRef.current) return
    const boxes = Array.from(heroBoxesRef.current.children) as HTMLElement[]
    if (boxes.length < 2) return
    gsap.set(boxes, { opacity: 0 })
    gsap.set(boxes[0], { opacity: 1 })
    const tl = gsap.timeline({ repeat: -1, delay: 3 })
    boxes.forEach((box, i) => {
      const next = boxes[(i + 1) % boxes.length]
      tl.to(box, { opacity: 0, duration: 1, ease: 'power2.inOut' }, `+=3`)
        .to(next, { opacity: 1, duration: 1, ease: 'power2.inOut' }, '<')
    })
    return () => { tl.kill() }
  }, [])

  useEffect(() => {
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

      {/* ── Hero — headline + copy, with a 3-box auto-advancing showcase ── */}
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(70px,8vw,100px)' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(40px,6vw,80px)',
        }}>
          <div ref={heroTextRef} style={{ flex: '1 1 420px', minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(44px, 6.5vw, 88px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: '#fff',
              margin: '0 0 24px',
            }}>
              Designs That Clicks.
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: 0,
            }}>
              Forget ordinary. We create scroll-stopping visuals, vibe worthy branding, and bold creative that makes your brand impossible to ignore — from the first glance to the final click.
            </p>
          </div>

          <div style={{ flex: '1 1 280px', minWidth: '260px', maxWidth: '420px', margin: '0 auto' }}>
            <div ref={heroBoxesRef} style={{ position: 'relative', width: '100%', aspectRatio: '1/1', borderRadius: '24px', overflow: 'hidden' }}>
              {['box-1', 'box-2', 'box-3'].map((name, i) => (
                <div key={name} style={{ position: 'absolute', inset: 0 }}>
                  <MediaBox
                    src={`/images/graphic-design/hero/${name}.jpg`}
                    alt={`Featured design ${i + 1}`}
                    label={`Drop portfolio image/clip here:\npublic/images/graphic-design/hero/${name}.jpg`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section ref={servicesRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0 }}>
            <SectionEyebrow>Our Creative Services</SectionEyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px 20px' }}>
              {SERVICES.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', fontWeight: 600, color: 'var(--fg)' }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: '260px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/5' }}>
            <MediaBox
              src="/images/graphic-design/services/cover.jpg"
              alt="Our Creative Services"
              label={'Drop services showcase image here:\npublic/images/graphic-design/services/cover.jpg\n(from the Drive folder)'}
            />
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section ref={principlesRef} style={{ background: 'var(--bg)', padding: '0 clamp(24px,4vw,60px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 320px', minWidth: '260px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10' }}>
            <MediaBox
              src="/images/graphic-design/principles/cover.jpg"
              alt="Design principles"
              label={'Drop image here:\npublic/images/graphic-design/principles/cover.jpg'}
            />
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'var(--fg)',
              margin: '0 0 20px',
            }}>
              Great Design Isn&apos;t Luck. It&apos;s Built on Principles.
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0, maxWidth: '520px' }}>
              Every unforgettable design starts with the right foundation. From contrast and balance to alignment and visual hierarchy, we apply timeless design principles to create visuals that don&apos;t just look stunning — they communicate, connect, and convert.
            </p>
          </div>
        </div>
      </section>

      {/* ── Split highlight — intro + 2 boxes ── */}
      <section ref={highlightRef} style={{ background: 'var(--bg-card)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
            <h2 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(34px, 4.5vw, 60px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: 'var(--fg)',
              margin: '0 0 18px',
            }}>
              Creativity Looks Good on Every Brand.
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
              We create visuals with purpose — designs that communicate clearly, connect emotionally, and grow businesses.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                key: 'logo-design',
                heading: 'Logo Design That Leaves a Mark',
                copy: 'Bold. Memorable. Instantly recognizable. We create logo identities that don’t just look good — they become the face of your brand.',
              },
              {
                key: 'trusted-brands',
                heading: 'Trusted by Growing Brands.',
                copy: 'Every project is a collaboration built on trust, creativity, and exceptional design. We’re proud to help brands of all sizes stand out, grow confidently, and leave lasting impressions.',
              },
            ].map(box => (
              <div key={box.key} style={{ background: 'var(--bg)', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ aspectRatio: '4/3' }}>
                  <MediaBox
                    src={`/images/graphic-design/highlight/${box.key}.jpg`}
                    alt={box.heading}
                    label={`Drop image here:\npublic/images/graphic-design/highlight/${box.key}.jpg`}
                  />
                </div>
                <div style={{ padding: 'clamp(20px,3vw,28px)' }}>
                  <h3 style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', fontWeight: 800, color: 'var(--fg)', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                    {box.heading}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0 }}>
                    {box.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section ref={toolsRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'var(--fg)',
              margin: '0 0 20px',
            }}>
              Powered by the Best Creative Tools.
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0, maxWidth: '520px' }}>
              We don&apos;t just rely on creativity — we power it with the latest design and AI tools to ensure every project is modern, polished, and future ready.
            </p>
          </div>
          <div style={{ flex: '1 1 320px', minWidth: '260px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10' }}>
            <MediaBox
              src="/images/graphic-design/tools/cover.jpg"
              alt="Creative tools"
              label={'Drop image here:\npublic/images/graphic-design/tools/cover.jpg'}
            />
          </div>
        </div>
      </section>

      {/* ── Brand identity ── */}
      <section ref={identityRef} style={{ background: '#001941', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }} data-nav-dark>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap-reverse', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 320px', minWidth: '260px', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/10' }}>
            <MediaBox
              src="/images/graphic-design/brand-identity/cover.jpg"
              alt="Brand identity"
              label={'Drop image here:\npublic/images/graphic-design/brand-identity/cover.jpg'}
            />
          </div>
          <div style={{ flex: '1 1 380px', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: '#fff',
              margin: '0 0 20px',
            }}>
              Where Brands Find Their Identity.
            </h2>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, margin: 0, maxWidth: '520px' }}>
              Every color, font, logo, and visual element is crafted with purpose. We design cohesive brand identities that tell your story, connect with your audience, and help your business stand out in a crowded market.
            </p>
          </div>
        </div>
      </section>

      {/* ── Testimonials — placeholder cards until real quotes/names + photos land ── */}
      <section ref={testimonialsRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,64px)' }}>
            <SectionEyebrow>Testimonial</SectionEyebrow>
            <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
              We believe great design creates lasting partnerships. Here&apos;s what some of our clients have to say about working with us.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', aspectRatio: '3/4' }}>
                <MediaBox
                  src={`/images/graphic-design/testimonials/${i}.jpg`}
                  alt={`Client testimonial ${i}`}
                  label={`Drop testimonial image here:\npublic/images/graphic-design/testimonials/${i}.jpg\n(from the Drive folder — send quote text/name too if it's not on the graphic)`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section ref={quoteRef} style={{ background: 'var(--bg)', padding: '0 clamp(24px,4vw,60px) clamp(90px,10vw,120px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', aspectRatio: '21/9' }}>
          <MediaBox
            src="/images/graphic-design/quote/cover.jpg"
            alt="Quote"
            label={'Drop quote graphic here:\npublic/images/graphic-design/quote/cover.jpg\n(or send the quote text and I’ll typeset it instead)'}
          />
        </div>
      </section>

      {/* ── CTA — same closing pattern as the generic category template ── */}
      <section ref={ctaRef} style={{ background: 'var(--bg)', padding: 'clamp(0px,0vw,0px) clamp(24px,4vw,60px) clamp(80px,10vw,120px)', textAlign: 'center' }}>
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
