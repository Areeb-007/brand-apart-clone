'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: 1, hasVideo: true,  poster: '/images/portfolio/work-1.png', video: '/videos/work-1.mp4', title: 'Social Media Reel', category: 'Video Editing' },
  { id: 2, hasVideo: true,  poster: '/images/portfolio/work-2.png', video: '/videos/work-2.mp4', title: 'Brand Promo',       category: 'Motion Graphics' },
  { id: 3, hasVideo: true,  poster: '/images/portfolio/work-3.png', video: '/videos/work-3.mp4', title: 'Cinematic Edit',    category: 'Video Editing' },
  { id: 4, hasVideo: true,  poster: '/images/portfolio/work-4.png', video: '/videos/work-4.mp4', title: 'Product Showcase',  category: 'Social Media' },
  { id: 5, hasVideo: false, poster: '/images/portfolio/work-5.png', video: '',                   title: 'Content Campaign',  category: 'Graphic Design' },
  { id: 6, hasVideo: false, poster: '/images/portfolio/work-6.png', video: '',                   title: 'Brand Identity',    category: 'Graphic Design' },
]

function VideoCard({ project }: { project: typeof projects[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleEnter = () => {
    if (project.hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }
  const handleLeave = () => {
    if (project.hasVideo && videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '500/528', background: '#1A1A1A', cursor: 'none', border: '1px solid var(--border)' }}
    >
      {/* Poster image */}
      <Image src={project.poster} alt={project.title} fill style={{ objectFit: 'cover', transition: 'opacity 0.3s' }} sizes="(max-width:768px) 100vw, 33vw" />

      {/* Video overlay */}
      {project.hasVideo && (
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s' }}
          onPlay={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '1' }}
          onPause={(e) => { (e.currentTarget as HTMLVideoElement).style.opacity = '0' }}
        />
      )}

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '4px' }}>{project.category}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#fff' }}>{project.title}</div>
      </div>

      {/* Play icon on hover */}
      {project.hasVideo && (
        <div className="play-icon" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(255,85,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s', pointerEvents: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="white"><path d="M5 3l11 6-11 6V3z" /></svg>
        </div>
      )}

      <style>{`.play-icon { opacity: 0 !important; } div:hover > .play-icon { opacity: 1 !important; }`}</style>
    </div>
  )
}

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return
    gsap.fromTo(
      Array.from(cardsRef.current.children),
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    )
  }, [])

  return (
    <section id="works" ref={sectionRef} style={{ padding: '100px 48px', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <p className="section-tag" style={{ marginBottom: '10px' }}>Featured Projects</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#fff' }}>
            We create cinematic edits,
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>
              social media videos & more.
            </span>
          </h2>
        </div>
        <a href="#contact" className="pill-btn" style={{ textDecoration: 'none', flexShrink: 0 }}>
          View more projects
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {projects.map((p) => <VideoCard key={p.id} project={p} />)}
      </div>

      {/* Centre line */}
      <div style={{ textAlign: 'center', marginTop: '48px' }}>
        <p style={{ fontSize: '13px', color: 'var(--fg-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>More creative work</p>
        <a href="#contact" className="pill-btn pill-btn-filled" style={{ textDecoration: 'none' }}>View more projects</a>
      </div>
    </section>
  )
}
