'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Grid layout — each item has a gridColumn and gridRow span so sizes vary like Brand Apart
const projects = [
  {
    id: 1,
    title: 'Cinematic Brand Film',
    category: 'Video Editing',
    tag: 'FEATURED',
    poster: '/images/video-editing/cover.jpg',
    video: '/videos/work-1.mp4',
    hasVideo: true,
    col: 'span 2',   // wide
    aspectRatio: '16/9',
  },
  {
    id: 2,
    title: 'Social Media Reel',
    category: 'Short Videos',
    tag: 'VIDEO',
    poster: '/images/portfolio/work-1.png',
    video: '/videos/work-2.mp4',
    hasVideo: true,
    col: 'span 1',   // tall portrait
    aspectRatio: '500/528',
  },
  {
    id: 3,
    title: 'Wedding Highlights',
    category: 'Wedding',
    tag: 'VIDEO',
    poster: '/images/video-editing/1.jpg',
    video: '',
    hasVideo: false,
    col: 'span 1',
    aspectRatio: '500/528',
  },
  {
    id: 4,
    title: 'Motion Brand Story',
    category: 'Motion Graphics',
    tag: 'VIDEO',
    poster: '/images/portfolio/work-2.png',
    video: '/videos/work-3.mp4',
    hasVideo: true,
    col: 'span 2',  // wide
    aspectRatio: '426/240',
  },
  {
    id: 5,
    title: 'Corporate Promo',
    category: 'Corporate Videos',
    tag: 'VIDEO',
    poster: '/images/video-editing/2.jpg',
    video: '',
    hasVideo: false,
    col: 'span 1',
    aspectRatio: '500/528',
  },
  {
    id: 6,
    title: 'AI Brand Content',
    category: 'AI Video',
    tag: 'VIDEO',
    poster: '/images/portfolio/work-3.png',
    video: '/videos/work-4.mp4',
    hasVideo: true,
    col: 'span 1',
    aspectRatio: '500/528',
  },
  {
    id: 7,
    title: 'Real Estate Showcase',
    category: 'Real Estate Video',
    tag: 'VIDEO',
    poster: '/images/video-editing/3.jpg',
    video: '',
    hasVideo: false,
    col: 'span 1',
    aspectRatio: '500/528',
  },
]

function VideoCard({ project }: { project: typeof projects[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)

  const handleEnter = () => {
    if (project.hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
    if (wrapRef.current) {
      const arrow = wrapRef.current.querySelector('.work-arrow') as HTMLElement
      if (arrow) arrow.style.transform = 'translate(3px, -3px)'
    }
  }
  const handleLeave = () => {
    if (project.hasVideo && videoRef.current) videoRef.current.pause()
    if (wrapRef.current) {
      const arrow = wrapRef.current.querySelector('.work-arrow') as HTMLElement
      if (arrow) arrow.style.transform = 'translate(0,0)'
    }
  }

  return (
    <div
      ref={wrapRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        gridColumn: project.col,
        borderRadius: '18px',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: project.aspectRatio,
        background: '#111',
        cursor: 'none',
        border: '1px solid var(--border)',
      }}
    >
      {/* Poster */}
      <Image
        src={project.poster}
        alt={project.title}
        fill
        style={{ objectFit: 'cover' }}
        sizes="(max-width:768px) 100vw, 50vw"
      />

      {/* Video overlay */}
      {project.hasVideo && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s',
          }}
          onPlay={(e)  => { (e.currentTarget as HTMLVideoElement).style.opacity = '1' }}
          onPause={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '0' }}
        />
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
      }} />

      {/* Tag pill — top left */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '4px 10px', borderRadius: '100px',
        fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)',
      }}>
        {project.tag}
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '24px 20px 20px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '5px',
          }}>
            {project.category}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: project.col === 'span 2' ? 'clamp(18px, 2vw, 26px)' : '15px',
            fontWeight: 700, color: '#fff', lineHeight: 1.15,
          }}>
            {project.title}
          </div>
        </div>

        {/* Arrow */}
        <div className="work-arrow" style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginLeft: '12px',
          transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 13L13 3M13 3H6M13 3v7" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Play button for video */}
      {project.hasVideo && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'rgba(255,85,0,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none',
        }} className="play-btn">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
            <path d="M5 3l11 6-11 6V3z" />
          </svg>
        </div>
      )}

      <style>{`
        div:hover > .play-btn { opacity: 1 !important; }
      `}</style>
    </div>
  )
}

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(headRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headRef.current, start: 'top 88%', toggleActions: 'play none none reverse' } }
      )
    }
    if (gridRef.current) {
      gsap.fromTo(
        Array.from(gridRef.current.children),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    }
  }, [])

  return (
    <section id="works" ref={sectionRef} style={{ padding: '100px 48px', background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <div ref={headRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '32px' }}>
        <div style={{ maxWidth: '600px' }}>
          <p className="section-tag" style={{ marginBottom: '12px' }}>Featured Projects</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05,
            color: 'var(--fg)', marginBottom: '16px',
          }}>
            Video Editing
          </h2>
          <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--fg-muted)', lineHeight: 1.75, maxWidth: '480px' }}>
            We create cinematic edits, social media videos, promos, motion graphics, and brand content
            that capture attention, tell stories, and drive real engagement.
          </p>
        </div>
        <a href="#contact" className="pill-btn" style={{ textDecoration: 'none', flexShrink: 0 }}>
          View all projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ── Asymmetric grid ── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px',
        }}
      >
        {projects.map((p) => <VideoCard key={p.id} project={p} />)}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{ textAlign: 'center', marginTop: '56px' }}>
        <p style={{ fontSize: '12px', color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
          See more of our work
        </p>
        <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none' }}>
          Book a free consultation
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
