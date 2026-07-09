'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const perProject = [
  {
    type: 'Short-Form Video',
    range: '$80 – $250',
    note: 'Reels, TikToks, Shorts',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
  },
  {
    type: 'Brand Promo Film',
    range: '$400 – $900',
    note: 'Product, service, or story',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
      </svg>
    ),
  },
  {
    type: 'Wedding Film',
    range: '$600 – $1,500',
    note: 'Highlight + full ceremony',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
  {
    type: 'Corporate Video',
    range: '$300 – $800',
    note: 'Training, testimonial, event',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3l-4 4-4-4"/>
      </svg>
    ),
  },
  {
    type: 'Motion Graphics',
    range: '$150 – $500',
    note: 'Logo animation, explainers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    type: 'Documentary / Long-form',
    range: '$800 – $2,500',
    note: 'Full production package',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
]

export default function Pricing() {
  const leftRef  = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [leftRef.current, tableRef.current].filter(Boolean)
    els.forEach(el => {
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el!, start: 'top 88%', toggleActions: 'play none none reverse' } }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="pricing" style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,130px) clamp(24px,5vw,80px)' }}>

      {/* Two-column layout: heading left, table right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(48px,6vw,100px)', alignItems: 'start', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Left: heading + description + CTA */}
        <div ref={leftRef}>
          <p className="section-tag" style={{ marginBottom: '16px' }}>Pricing</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px,4vw,54px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: 'var(--fg)',
            marginBottom: '20px',
          }}>
            Pay per project.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>Quality without commitment.</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--fg-muted)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '280px' }}>
            Every project is scoped individually. Get a custom quote based on your exact needs, no hidden fees.
          </p>
          <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none', fontSize: '13px', letterSpacing: '0.04em', fontWeight: 700 }}>
            Get a free quote
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '12px' }}>What&apos;s included</p>
            {['Script & storyboard review', 'Professional colour grading', 'Sound design & music', 'Revision rounds', 'Fast turnaround'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(231,124,36,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2 2 4-4" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: per-project table */}
        <div ref={tableRef}>
          <div style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', background: 'var(--bg-card)' }}>
            {/* Table header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 28px',
              background: '#001941',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Service Type</span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Starting From</span>
            </div>

            {perProject.map((row, i) => (
              <div
                key={row.type}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 28px',
                  borderBottom: i < perProject.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.18s',
                  gap: '16px',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(231,124,36,0.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(0,25,65,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {row.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg)', marginBottom: '2px' }}>{row.type}</div>
                    <div style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>{row.note}</div>
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(14px,1.4vw,17px)',
                  fontWeight: 800,
                  color: 'var(--fg)',
                  letterSpacing: '-0.02em',
                  whiteSpace: 'nowrap',
                  background: 'rgba(231,124,36,0.1)',
                  padding: '5px 14px',
                  borderRadius: '100px',
                }}>
                  {row.range}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '12px', color: 'var(--fg-muted)', textAlign: 'center', marginTop: '20px' }}>
            Not sure which fits you? <a href="#contact" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Let&apos;s talk.</a>
          </p>
        </div>
      </div>

      {/* Mobile: stack columns */}
      <style>{`
        @media (max-width: 768px) {
          #pricing > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
