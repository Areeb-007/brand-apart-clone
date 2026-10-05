'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Shared building blocks for the bespoke, content-driven category pages
// (Graphic Design, SMM, Staff Augmentation, Sales & Business Development —
// see app/services/[slug]/page.tsx). Each visual asset is a MediaBox pointed
// at a path under public/images/<category>/ — drop the real file at that
// path and it swaps in automatically; until then it shows a labeled
// placeholder, so the page structure is visible immediately.

export function MediaBox({ src, alt, label, style }: { src: string; alt: string; label: string; style?: React.CSSProperties }) {
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

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '18px' }}>
      {children}
    </p>
  )
}

// Drives the "(Next project)" band's live scroll percentage — same idea
// used on every bespoke category page's closing section.
export function useNextBandScrollPct(ref: RefObject<HTMLElement | null>) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'top center',
      onUpdate: (self) => setPct(Math.round(self.progress * 100)),
    })
    return () => st.kill()
  }, [ref])
  return pct
}

export function useReveal<T extends HTMLElement>() {
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
