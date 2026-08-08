'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 1,
    client: 'FILMFX',
    category: 'VIDEO EDITING',
    year: '2024',
    media: '/images/covers/video-editing.png',
    slug: 'video-editing',
  },
  {
    id: 2,
    client: 'FILMFX',
    category: 'GRAPHIC DESIGN',
    year: '2024',
    media: '/images/covers/graphic-design.png',
    slug: 'graphic-design',
  },
  {
    id: 3,
    client: 'FILMFX',
    category: 'SOCIAL MEDIA',
    year: '2024',
    media: '/images/covers/social-media.png',
    slug: 'social-media',
  },
  {
    id: 4,
    client: 'FILMFX',
    category: 'BUSINESS DEV',
    year: '2024',
    media: '/images/covers/business-dev.png',
    slug: 'business-dev',
  },
]

// Mosaic placement, repeating every 8 tiles: 1st-of-4 is full width & short;
// 3rd-and-6th-of-8 is tall, spanning both rows of its bento pair.
function tilePlacement(position: number) {
  const isFull = position % 4 === 1
  const cycle  = ((position - 1) % 8) + 1
  const isTall = cycle === 3 || cycle === 6
  return { isFull, isTall }
}

function ProjectTile({ project, position }: { project: typeof PROJECTS[number]; position: number }) {
  const { isFull, isTall } = tilePlacement(position)
  return (
    <Link
      href={`/work/${project.slug}`}
      style={{
        display: 'block',
        textDecoration: 'none',
        gridColumn: isFull ? '1 / -1' : undefined,
        gridRow:    isTall ? 'span 2' : undefined,
      }}
    >
    <div
      className="work-tile"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: '#001941',
        aspectRatio: isTall ? undefined : (isFull ? '1000/540' : '500/350'),
        height: isTall ? '100%' : undefined,
        cursor: 'none',
      }}
    >
      <Image
        src={project.media}
        alt={`${project.client} ${project.category}`}
        fill
        className="work-tile-img"
        style={{ objectFit: 'cover' }}
        sizes="(max-width: 768px) 100vw, 65vw"
      />

      {/* Normal badge, top left, fades out on hover */}
      <div
        className="work-tile-badge"
        style={{
          position: 'absolute', top: '16px', left: '16px',
          background: 'rgba(0,25,65,0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.03em' }}>
          {project.client}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
          <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {project.category}
          </span>
          <span style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
            {project.year}
          </span>
        </div>
      </div>

      {/* Hover bar, slides down from top */}
      <div
        className="work-tile-overlay"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'rgba(0,25,65,0.92)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em' }}>
            {project.client}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3 }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {project.category}
            </span>
            <span style={{ fontSize: '9px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
              {project.year}
            </span>
          </div>
        </div>
        <span className="work-tile-cta" style={{ fontSize: '11px', fontWeight: 800, color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          DISCOVER CASE
        </span>
      </div>
    </div>
    </Link>
  )
}

export default function Works() {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const arrowRef = useRef<HTMLDivElement>(null)
  const paraRef  = useRef<HTMLParagraphElement>(null)
  const gridRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Heading + intro animate in as one sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: line1Ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })
    tl.fromTo(line1Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo(line2Ref.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.65')
      .fromTo(arrowRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(paraRef.current,  { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, '-=0.15')

    // Each tile animates up on its own — triggered the moment it reaches
    // the center of the viewport, not in one batch for the whole grid.
    if (gridRef.current) {
      Array.from(gridRef.current.children).forEach((tile) => {
        gsap.fromTo(
          tile,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
            scrollTrigger: {
              trigger: tile,
              start: 'center center',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }
  }, [])

  return (
    <section id="works" style={{ background: 'var(--bg)', padding: '0 0 80px' }}>

      {/* Big centered heading */}
      <div style={{ textAlign: 'center', padding: '120px clamp(24px, 4vw, 60px) 0' }}>
        <div
          ref={line1Ref}
          style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(40px, 6.5vw, 100px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: 'var(--fg)',
          }}
        >
          Featured
        </div>
        <div
          ref={line2Ref}
          style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(40px, 6.5vw, 100px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: 'rgba(0,25,65,0.22)',
          }}
        >
          Projects
        </div>

        <div ref={arrowRef} style={{ margin: '52px 0 44px', fontSize: '22px', color: 'var(--fg-muted)' }}>
          ↓
        </div>

        <p
          ref={paraRef}
          style={{
            fontSize: 'clamp(16px, 1.6vw, 21px)',
            color: 'var(--fg)',
            maxWidth: '580px',
            margin: '0 auto 88px',
            lineHeight: 1.7,
          }}
        >
          We create cinematic edits, social media videos, promos, motion graphics, and brand content that capture attention, tell stories, and drive real engagement.
        </p>
      </div>

      {/* Project grid — bento mosaic, see tilePlacement() for the recipe */}
      <div
        ref={gridRef}
        style={{
          padding: '0 clamp(24px, 4vw, 60px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectTile key={project.id} project={project} position={i + 1} />
        ))}
      </div>

    </section>
  )
}
