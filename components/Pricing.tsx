'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const monthly = [
  {
    name: 'Starter',
    price: '$299',
    period: '/mo',
    desc: 'Perfect for creators & small brands getting started.',
    features: ['4 short-form videos/mo','Basic colour grading','1 revision per video','48h turnaround','Social-ready formats'],
    accent: '#3B2FC9',
    popular: false,
  },
  {
    name: 'Growth',
    price: '$699',
    period: '/mo',
    desc: 'For growing brands that need consistent content.',
    features: ['12 videos/mo (mixed format)','Advanced colour & sound design','3 revisions per video','24h turnaround','Motion graphics included','Dedicated editor'],
    accent: '#E63B2E',
    popular: true,
  },
  {
    name: 'Scale',
    price: '$1,299',
    period: '/mo',
    desc: 'Full-service creative partner for serious brands.',
    features: ['Unlimited video requests','Cinematic grade + VFX','Unlimited revisions','Same-day turnaround','Graphic design included','Priority support + strategy calls'],
    accent: '#1DB027',
    popular: false,
  },
]

const perProject = [
  { type: 'Short-Form Video', range: '$80 – $250', icon: '✂', note: 'Reels, TikToks, Shorts' },
  { type: 'Brand Promo Film', range: '$400 – $900', icon: '◎', note: 'Product, service, or story' },
  { type: 'Wedding Film', range: '$600 – $1,500', icon: '◈', note: 'Highlight + full ceremony' },
  { type: 'Corporate Video', range: '$300 – $800', icon: '⊕', note: 'Training, testimonial, event' },
  { type: 'Motion Graphics', range: '$150 – $500', icon: '✦', note: 'Logo animation, explainers' },
  { type: 'Documentary / Long-form', range: '$800 – $2,500', icon: '◐', note: 'Full production package' },
]

export default function Pricing() {
  const headRef  = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [headRef.current, cardsRef.current, tableRef.current].filter(Boolean)
    els.forEach(el => {
      gsap.fromTo(el,
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el!, start: 'top 88%', toggleActions: 'play none none reverse' } }
      )
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <section id="pricing" style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>

      {/* Header */}
      <div ref={headRef} style={{ marginBottom: '72px' }}>
        <p className="section-tag" style={{ marginBottom: '12px' }}>Transparent Pricing</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,88px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--fg)' }}>
            Simple plans,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>real results.</span>
          </h2>
          <p style={{ fontSize: 'clamp(13px,1.3vw,16px)', color: 'var(--fg-muted)', maxWidth: '340px', lineHeight: 1.7 }}>
            No hidden fees. Pick a monthly plan or pay per project — whatever works for your business.
          </p>
        </div>
      </div>

      {/* ── Monthly Plans ── */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '24px' }}>Monthly Subscription Plans</p>
      </div>
      <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '72px' }}>
        {monthly.map(plan => (
          <div key={plan.name} style={{
            position: 'relative',
            background: plan.popular ? plan.accent : 'var(--bg-card)',
            border: `1px solid ${plan.popular ? 'transparent' : 'var(--border)'}`,
            borderRadius: '20px', padding: '32px 28px',
            boxShadow: plan.popular ? `0 20px 60px ${plan.accent}33` : '0 2px 12px rgba(13,13,13,0.06)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = plan.popular ? `0 32px 80px ${plan.accent}44` : '0 12px 40px rgba(13,13,13,0.12)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = plan.popular ? `0 20px 60px ${plan.accent}33` : '0 2px 12px rgba(13,13,13,0.06)' }}
          >
            {plan.popular && (
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#fff', color: plan.accent, fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', padding: '4px 14px', borderRadius: '100px', textTransform: 'uppercase', whiteSpace: 'nowrap', boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
                Most Popular
              </div>
            )}
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: plan.popular ? 'rgba(255,255,255,0.6)' : 'var(--fg-muted)', marginBottom: '8px' }}>{plan.name}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 800, letterSpacing: '-0.03em', color: plan.popular ? '#fff' : 'var(--fg)' }}>{plan.price}</span>
              <span style={{ fontSize: '14px', color: plan.popular ? 'rgba(255,255,255,0.5)' : 'var(--fg-muted)' }}>{plan.period}</span>
            </div>
            <p style={{ fontSize: '13px', color: plan.popular ? 'rgba(255,255,255,0.65)' : 'var(--fg-muted)', lineHeight: 1.6, marginBottom: '24px' }}>{plan.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: plan.popular ? 'rgba(255,255,255,0.2)' : `${plan.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke={plan.popular ? '#fff' : plan.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontSize: '13px', color: plan.popular ? 'rgba(255,255,255,0.85)' : 'var(--fg)', lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#contact" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '13px 20px', borderRadius: '100px',
              background: plan.popular ? '#fff' : 'var(--fg)',
              color: plan.popular ? plan.accent : '#fff',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              textDecoration: 'none', cursor: 'none', transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              Get started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        ))}
      </div>

      {/* ── Per-Project ── */}
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '24px' }}>Per-Project Pricing</p>
      <div ref={tableRef} style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
        {perProject.map((row, i) => (
          <div key={row.type} style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            padding: '20px 28px', gap: '16px', alignItems: 'center',
            borderBottom: i < perProject.length - 1 ? '1px solid var(--border)' : 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '18px', width: '28px', textAlign: 'center', flexShrink: 0 }}>{row.icon}</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--fg)', marginBottom: '2px' }}>{row.type}</div>
                <div style={{ fontSize: '12px', color: 'var(--fg-muted)' }}>{row.note}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(14px,1.5vw,18px)', fontWeight: 800, color: 'var(--fg)', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
              {row.range}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--fg-muted)', marginBottom: '16px' }}>Not sure which plan fits? Let's talk.</p>
        <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none', fontSize: '13px', letterSpacing: '0.04em' }}>
          Book a free discovery call
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>
    </section>
  )
}
