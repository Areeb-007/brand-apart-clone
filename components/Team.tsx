'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Julien M.', role: 'Creative Director', initials: 'JM', color: '#E8D5B7' },
  { name: 'Sophie R.', role: 'Brand Designer', initials: 'SR', color: '#D4E8D5' },
  { name: 'Marc T.', role: 'Product Designer', initials: 'MT', color: '#D5D4E8' },
  { name: 'Clara B.', role: 'Motion Designer', initials: 'CB', color: '#E8D5D5' },
  { name: 'Lucas P.', role: 'Web Designer', initials: 'LP', color: '#D5E8E6' },
  { name: 'Emma V.', role: 'UX Researcher', initials: 'EV', color: '#E8E4D5' },
  { name: 'Antoine K.', role: 'Strategist', initials: 'AK', color: '#E8D5E4' },
  { name: 'Nina F.', role: 'Illustrator', initials: 'NF', color: '#D5E0E8' },
  { name: 'Hugo C.', role: 'Design Lead', initials: 'HC', color: '#E8E8D5' },
  { name: 'Léa S.', role: 'Project Manager', initials: 'LS', color: '#E8DBD5' },
]

export default function Team() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      style={{
        padding: '120px 40px',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div style={{ marginBottom: '64px' }}>
        <p className="section-tag" style={{ marginBottom: '12px' }}>
          The team
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
          The people behind
          <br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
            your brand.
          </span>
        </h2>
      </div>

      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {team.map((member) => (
          <div
            key={member.name}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'none',
              position: 'relative',
              aspectRatio: '3/4',
              background: member.color,
            }}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.team-overlay') as HTMLElement
              if (overlay) overlay.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.team-overlay') as HTMLElement
              if (overlay) overlay.style.opacity = '0'
            }}
          >
            {/* Avatar placeholder */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'rgba(0,0,0,0.5)',
                }}
              >
                {member.initials}
              </div>
            </div>

            {/* Hover overlay */}
            <div
              className="team-overlay"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 16px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'white',
                }}
              >
                {member.name}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
