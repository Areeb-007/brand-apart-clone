'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import type { Project } from '@/lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function WorkDetail({ project }: { project: Project }) {
  const heroNameRef   = useRef<HTMLDivElement>(null)
  const heroMetaRef   = useRef<HTMLDivElement>(null)
  const heroTagRef    = useRef<HTMLDivElement>(null)
  const descRef       = useRef<HTMLDivElement>(null)
  const galleryRef    = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const ctaRef        = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.1 })
    tl.fromTo(heroNameRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
    )
    .fromTo(heroMetaRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo(heroTagRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4'
    )

    // Scroll sections
    const reveals = [descRef, galleryRef, testimonialRef, ctaRef]
    reveals.forEach(ref => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    })

    // Gallery stagger
    if (galleryRef.current) {
      gsap.fromTo(
        Array.from(galleryRef.current.children),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: galleryRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } }
      )
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <Navigation />

      {/* ── Hero: dark, full viewport ── */}
      <section style={{
        minHeight: '100svh',
        background: '#001941',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px) clamp(40px,5vw,60px)',
        textAlign: 'center',
      }}>
        {/* Giant project name */}
        <div ref={heroNameRef}>
          <h1 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(64px, 13vw, 200px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            color: '#fff',
            margin: 0,
          }}>
            {project.name}
          </h1>
        </div>

        {/* Year + Category */}
        <div ref={heroMetaRef} style={{
          display: 'flex',
          gap: 'clamp(40px, 8vw, 120px)',
          marginTop: '40px',
        }}>
          {[
            { label: 'YEAR', value: project.year },
            { label: 'CATEGORY', value: project.category },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '6px' }}>
                {item.label}
              </div>
              <div style={{ fontSize: '16px', fontWeight: 500, color: '#fff', letterSpacing: '0.01em' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div ref={heroTagRef} style={{
          position: 'absolute',
          bottom: 'clamp(32px,4vw,48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          textAlign: 'center',
          padding: '0 24px',
        }}>
          <p style={{
            fontSize: 'clamp(16px, 1.8vw, 22px)',
            color: 'rgba(255,255,255,0.55)',
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            lineHeight: 1.5,
            margin: 0,
          }}>
            {project.tagline}
          </p>
          <p style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginTop: '20px',
          }}>
            Scroll down ↓
          </p>
        </div>
      </section>

      {/* ── Description ── */}
      <section ref={descRef} style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,60px)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '60px',
            alignItems: 'start',
            marginBottom: '64px',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(20px, 2.8vw, 38px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              color: 'var(--fg)',
              margin: 0,
            }}>
              {project.description}
            </p>
            <Link href="#contact" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              cursor: 'none',
              transition: 'background 0.2s',
              flexShrink: 0,
              marginTop: '8px',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,25,65,0.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              Start a project →
            </Link>
          </div>

          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            color: 'var(--fg-muted)',
            lineHeight: 1.8,
            maxWidth: '760px',
          }}>
            {project.overview}
          </p>
        </div>
      </section>

      {/* ── Full-width cover ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: '#0d1f3c' }}>
        <Image
          src={project.cover}
          alt={project.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Gallery grid ── */}
      <section style={{
        background: 'var(--bg)',
        padding: 'clamp(40px,5vw,60px) clamp(24px,4vw,60px)',
      }}>
        <div
          ref={galleryRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {project.gallery.map((src, i) => (
            <div key={i} style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              aspectRatio: '4/3',
              background: '#0d1f3c',
            }}>
              <Image
                src={src}
                alt={`${project.name} ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section ref={testimonialRef} style={{
        background: '#001941',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)',
      }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', marginBottom: '32px' }}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: 'var(--accent)', fontSize: '18px' }}>★</span>
            ))}
          </div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 2.6vw, 34px)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.35,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
          }}>
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}>
              <Image src={project.testimonial.photo} alt={project.testimonial.author} fill style={{ objectFit: 'cover' }} sizes="48px" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>
                {project.testimonial.author}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                {project.testimonial.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA + Next project ── */}
      <section ref={ctaRef} style={{
        background: 'var(--bg)',
        padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '20px',
        }}>
          Your work, next level
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
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '14px 32px',
          background: 'var(--fg)',
          color: '#fff',
          borderRadius: '100px',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          cursor: 'none',
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.8' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          Contact Sales
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Next project link */}
        <div style={{ marginTop: '80px', paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '16px' }}>
            Next project
          </p>
          <Link href={`/work/${project.nextSlug}`} style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(32px, 5vw, 72px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'var(--fg)',
            textDecoration: 'none',
            cursor: 'none',
            transition: 'color 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--fg)' }}
          >
            {project.nextSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            <span style={{ fontSize: '0.6em' }}>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
