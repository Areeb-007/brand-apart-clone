'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Incard',
    category: 'Branding · Product Design',
    year: '2024',
    color: '#1A1A2E',
    accent: '#6366F1',
    description: 'Complete rebrand and product design system for a B2B fintech company.',
  },
  {
    title: 'Sowbeez',
    category: 'Web Design · Motion',
    year: '2024',
    color: '#0F2027',
    accent: '#10B981',
    description: 'Full digital experience with motion design for an agri-tech startup.',
  },
  {
    title: 'Forbes Feature',
    category: 'Editorial Design',
    year: '2023',
    color: '#1C0A00',
    accent: '#F59E0B',
    description: 'Collaborative editorial layout for Forbes digital magazine.',
  },
  {
    title: 'Pitch Decks',
    category: 'Pitch · Branding',
    year: '2023',
    color: '#0A1628',
    accent: '#3B82F6',
    description: 'Investor-ready pitch decks for Series A & B fundraising rounds.',
  },
  {
    title: 'Runway',
    category: 'Product Design · UI',
    year: '2024',
    color: '#1A0A2E',
    accent: '#A78BFA',
    description: 'AI-powered video platform redesign with a focus on creator workflows.',
  },
  {
    title: 'Linear',
    category: 'Web Design',
    year: '2023',
    color: '#0A0A14',
    accent: '#60A5FA',
    description: 'Marketing website redesign for the project management tool.',
  },
]

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: (i % 3) * 0.1,
        }
      )
    })
  }, [])

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '64px',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div>
          <p className="section-tag" style={{ marginBottom: '12px' }}>
            Selected Work
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Projects that
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
              define brands.
            </span>
          </h2>
        </div>
        <a href="/works" className="pill-btn">
          All projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px',
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              if (el) cardsRef.current[i] = el
            }}
            className="work-card"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'none',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            {/* Image area */}
            <div
              style={{
                height: '260px',
                background: project.color,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="work-card-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 30% 70%, ${project.accent}30, transparent 70%)`,
                  transition: 'transform 0.5s ease',
                }}
              />
              {/* Mock UI element */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div
                  style={{
                    width: '40%',
                    height: '8px',
                    background: project.accent,
                    borderRadius: '4px',
                    marginBottom: '8px',
                    opacity: 0.8,
                  }}
                />
                <div
                  style={{
                    width: '70%',
                    height: '6px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '4px',
                  }}
                />
              </div>
              {/* Year badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '4px 10px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '100px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.6)',
                  letterSpacing: '0.05em',
                }}
              >
                {project.year}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '20px',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      marginBottom: '4px',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--fg-muted)' }}>{project.category}</p>
                </div>
                <div
                  className="work-card-arrow"
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 12L12 4M12 4H6M12 4v6"
                      stroke="var(--fg)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--fg-muted)',
                  marginTop: '12px',
                  lineHeight: 1.6,
                }}
                className="line-clamp-2"
              >
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
