'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    number: '01',
    title: 'Branding',
    subtitle: 'that drives conversion & funding',
    description:
      'We build brand identities that are both visually compelling and strategically sound. From positioning, naming, and tone of voice to complete visual systems — we handle every layer.',
    items: ['Brand Strategy', 'Visual Identity', 'Logo Design', 'Brand Guidelines', 'Naming'],
    testimonial: {
      quote:
        "Working with Brand Appart has been an absolute pleasure. Beyond their creativity and professionalism, there's a real sense of kindness and care in everything they do. The team never says no.",
      author: 'Jérémy Bendayan',
      role: 'CEO, Jaws Group',
      initials: 'JB',
      color: '#F59E0B',
    },
    slides: [
      { label: 'Jaws Group', type: 'Agency · 2026', bg: '#1A1008', accent: '#F59E0B', shape: 'hexagon' },
      { label: 'Incard', type: 'Fintech · 2024', bg: '#08081A', accent: '#6366F1', shape: 'circle' },
      { label: 'Sowbeez', type: 'B2C App · 2023', bg: '#081A08', accent: '#10B981', shape: 'triangle' },
      { label: 'Forbes', type: 'Editorial · 2023', bg: '#1A0800', accent: '#EF4444', shape: 'diamond' },
      { label: 'Stables', type: 'Web 3.0 · 2022', bg: '#081410', accent: '#14B8A6', shape: 'circle' },
    ],
  },
  {
    number: '02',
    title: 'Product Design',
    subtitle: 'users adopt & keep using',
    description:
      'End-to-end product design for SaaS, mobile, and web apps. We turn complex business goals into intuitive, beautiful interfaces. Journey mapping, prototyping, and systems thinking.',
    items: ['UX Research', 'UI Design', 'Design Systems', 'Prototyping', 'Usability Testing'],
    testimonial: {
      quote:
        "A huge thank you to the entire Brand Appart team for your outstanding work on our rebranding! We're thrilled to have you as an integral part of the Incard team.",
      author: 'Théo Cesarini',
      role: 'CEO, Incard',
      initials: 'TC',
      color: '#6366F1',
    },
    slides: [
      { label: 'Incard Dashboard', type: 'Fintech · 2024', bg: '#08081A', accent: '#6366F1', shape: 'circle' },
      { label: 'Sowbeez App', type: 'Mobile · 2023', bg: '#081A08', accent: '#10B981', shape: 'hexagon' },
      { label: 'Runway Editor', type: 'AI Video · 2024', bg: '#1A0A1A', accent: '#A78BFA', shape: 'diamond' },
      { label: 'Linear Clone', type: 'Productivity · 2023', bg: '#08080E', accent: '#60A5FA', shape: 'circle' },
      { label: 'Pitch Pro', type: 'SaaS · 2024', bg: '#140A0A', accent: '#F472B6', shape: 'triangle' },
    ],
  },
  {
    number: '03',
    title: 'Web Design',
    subtitle: 'for growing teams & business',
    description:
      'Marketing websites that convert. We blend motion, typography, and visual storytelling to create digital experiences that stand out, align messaging, and drive measurable results.',
    items: ['Marketing Sites', 'Landing Pages', 'Motion Design', 'Webflow', 'Framer'],
    testimonial: {
      quote:
        "I've worked with Brand Appart on multiple projects — website development, landing pages, and presentations. I love how flexible, fast, and professional the team is.",
      author: 'Alexis Botaya',
      role: 'Director, Ircam Amplify',
      initials: 'AB',
      color: '#3B82F6',
    },
    slides: [
      { label: 'Ircam Amplify', type: 'Sound · 2024', bg: '#080814', accent: '#3B82F6', shape: 'hexagon' },
      { label: 'Forbes Web3', type: 'Editorial · 2023', bg: '#140800', accent: '#F59E0B', shape: 'diamond' },
      { label: 'Sowbeez Web', type: 'AgriTech · 2023', bg: '#081408', accent: '#10B981', shape: 'circle' },
      { label: 'Stables', type: 'Web 3.0 · 2022', bg: '#081410', accent: '#14B8A6', shape: 'triangle' },
      { label: 'We Are', type: 'B2B SaaS · 2024', bg: '#14080A', accent: '#EC4899', shape: 'circle' },
    ],
  },
  {
    number: '04',
    title: 'Pitch Decks',
    subtitle: 'investor-proof decks that raise faster',
    description:
      'Investor-grade pitch decks that get meetings and close rounds. We craft compelling narratives backed by strong visual storytelling, data design, and fundraising strategy.',
    items: ['Narrative Structure', 'Data Visualization', 'Slide Design', 'Investor Decks', 'Board Presentations'],
    testimonial: {
      quote:
        "Our pitch deck got us into meetings with top-tier VCs in week one. I've used other agencies before — the quality and speed here is genuinely unmatched.",
      author: 'Léa Beaumont',
      role: 'Founder, Sowbeez',
      initials: 'LB',
      color: '#10B981',
    },
    slides: [
      { label: 'Series A Deck', type: 'Fundraising · 2024', bg: '#080E14', accent: '#3B82F6', shape: 'diamond' },
      { label: 'Seed Round', type: 'Fundraising · 2023', bg: '#0A080E', accent: '#A78BFA', shape: 'circle' },
      { label: 'Board Deck', type: 'Governance · 2024', bg: '#0E0808', accent: '#F87171', shape: 'hexagon' },
      { label: 'Investor Update', type: 'Reporting · 2024', bg: '#080E0A', accent: '#34D399', shape: 'triangle' },
      { label: 'Series B', type: 'Fundraising · 2025', bg: '#0E0A08', accent: '#FCD34D', shape: 'circle' },
    ],
  },
]

function SlideCard({
  label,
  type,
  bg,
  accent,
  shape,
}: {
  label: string
  type: string
  bg: string
  accent: string
  shape: string
}) {
  return (
    <div
      style={{
        width: '220px',
        height: '290px',
        borderRadius: '16px',
        background: bg,
        border: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        marginRight: '16px',
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}40, transparent 70%)`,
          top: '-40px',
          right: '-40px',
          pointerEvents: 'none',
        }}
      />

      {/* Mock window chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '16px 16px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {['#EF4444', '#F59E0B', '#10B981'].map((c, i) => (
          <div
            key={i}
            style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: 0.6 }}
          />
        ))}
      </div>

      {/* Abstract shape */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {shape === 'circle' && (
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: `2px solid ${accent}`,
              background: `${accent}18`,
              boxShadow: `0 0 32px ${accent}30`,
            }}
          />
        )}
        {shape === 'hexagon' && (
          <svg width="72" height="80" viewBox="0 0 72 80">
            <polygon
              points="36,4 68,22 68,58 36,76 4,58 4,22"
              fill={`${accent}18`}
              stroke={accent}
              strokeWidth="1.5"
            />
          </svg>
        )}
        {shape === 'diamond' && (
          <div
            style={{
              width: '60px',
              height: '60px',
              background: `${accent}18`,
              border: `2px solid ${accent}`,
              transform: 'rotate(45deg)',
              boxShadow: `0 0 24px ${accent}30`,
            }}
          />
        )}
        {shape === 'triangle' && (
          <svg width="72" height="64" viewBox="0 0 72 64">
            <polygon
              points="36,4 68,60 4,60"
              fill={`${accent}18`}
              stroke={accent}
              strokeWidth="1.5"
            />
          </svg>
        )}
      </div>

      {/* Mock bars */}
      <div
        style={{
          position: 'absolute',
          bottom: '52px',
          left: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div
          style={{
            height: '6px',
            background: accent,
            borderRadius: '3px',
            width: '55%',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            height: '5px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '3px',
            width: '80%',
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '10px 16px',
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{label}</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>{type}</div>
      </div>
    </div>
  )
}

export default function Services() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return
      const left = row.querySelector<HTMLElement>('.svc-left')
      const right = row.querySelector<HTMLElement>('.svc-right')
      const strip = row.querySelector<HTMLElement>('.svc-strip-wrap')

      if (left) {
        gsap.fromTo(
          left,
          { x: -48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }
      if (right) {
        gsap.fromTo(
          right,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 80%', toggleActions: 'play none none reverse' },
          }
        )
      }
      if (strip) {
        gsap.fromTo(
          strip,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: strip, start: 'top 88%', toggleActions: 'play none none reverse' },
          }
        )
      }
    })
  }, [])

  return (
    <section
      id="services"
      style={{
        background: 'var(--fg)',
        color: 'var(--bg)',
        paddingBottom: '80px',
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '120px 40px 80px',
        }}
      >
        <p className="section-tag" style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '12px' }}>
          What we do
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4.5vw, 64px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--bg)',
            maxWidth: '640px',
          }}
        >
          Services built for
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>
            ambitious teams.
          </span>
        </h2>
      </div>

      {/* Service rows */}
      {services.map((service, i) => (
        <div
          key={service.number}
          ref={(el) => { rowRefs.current[i] = el }}
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Info + Testimonial row */}
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '64px 40px 56px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left: service info */}
            <div className="svc-left">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '20px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'rgba(255,255,255,0.25)',
                  }}
                >
                  {service.number}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'rgba(255,255,255,0.1)',
                  }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '6px',
                  color: 'var(--bg)',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 2vw, 28px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.35)',
                  marginBottom: '28px',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                {service.subtitle}
              </p>

              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.8,
                  marginBottom: '32px',
                  maxWidth: '480px',
                }}
              >
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {service.items.map((item) => (
                  <span
                    key={item}
                    style={{
                      padding: '6px 14px',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '100px',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.5)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: testimonial */}
            <div
              className="svc-right"
              style={{
                padding: '40px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
              }}
            >
              {/* Quote marks */}
              <svg width="36" height="28" viewBox="0 0 48 36" fill="none" opacity={0.2}>
                <path
                  d="M0 36V21.6C0 9.6 7.2 2.4 21.6 0l2.4 4.8C15.6 6.4 11.2 10.4 10.4 16H20V36H0zm28 0V21.6C28 9.6 35.2 2.4 49.6 0L52 4.8C43.6 6.4 39.2 10.4 38.4 16H48V36H28z"
                  fill="white"
                />
              </svg>

              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(16px, 1.6vw, 20px)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.8)',
                  letterSpacing: '-0.01em',
                  flex: 1,
                }}
              >
                {service.testimonial.quote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: service.testimonial.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                  }}
                >
                  {service.testimonial.initials}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>
                    {service.testimonial.author}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                    {service.testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image carousel strip */}
          <div
            className="svc-strip-wrap"
            style={{ overflow: 'hidden', paddingBottom: '56px' }}
          >
            <div className="service-strip" style={{ paddingLeft: '40px' }}>
              {[...service.slides, ...service.slides].map((slide, j) => (
                <SlideCard key={j} {...slide} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
