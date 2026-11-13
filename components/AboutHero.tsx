'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// About page hero — ported from brandappart.com/about's AboutHeroReel:
//  • 250vh-tall wrapper with a sticky full-screen stage
//  • full-bleed looping showreel behind a dark top/bottom scrim
//  • headline (top) whose words rise in one by one, sub copy (middle) and a
//    "Watch the full film" button (bottom) that opens the reel in a modal
//  • scrubbed by scroll: the text fades + lifts away over the first quarter,
//    then the video box shrinks to 58% with rounded corners
//  • nav stays in its dark-theme variant until 72% through the scroll

// Swap for the real showreel any time — used for the background loop and
// the full-film modal.
const SHOWREEL = '/videos/featured-work/video-editing-1.mp4'

// Header background: the client's team photos (13 Nov revision), slowly
// crossfading with a gentle zoom in place of the text-heavy reel, which
// clashed with the headline.
const TEAM_PHOTOS = ['/images/about/hero/team-0059.jpg', '/images/about/hero/team-0054.jpg']

const HERO_CSS = `
@keyframes ah-fade{0%,45%{opacity:1}55%,100%{opacity:0}}
@keyframes ah-zoom{from{transform:scale(1)}to{transform:scale(1.08)}}
.ah-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 40%;animation:ah-zoom 14s ease-in-out infinite alternate;}
.ah-photo + .ah-photo{animation:ah-zoom 14s ease-in-out infinite alternate,ah-fade 16s ease-in-out infinite reverse;}
@media (prefers-reduced-motion:reduce){.ah-photo,.ah-photo + .ah-photo{animation:none}}
`

export default function AboutHero() {
  const wrapRef    = useRef<HTMLDivElement>(null)
  const boxRef     = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLHeadingElement>(null)
  const [filmOpen, setFilmOpen] = useState(false)

  // Scroll-scrubbed fade-out of the text + shrink of the video box.
  useEffect(() => {
    const wrap = wrapRef.current, box = boxRef.current, overlay = overlayRef.current
    if (!wrap || !box || !overlay) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const setNav = (dark: boolean) => window.dispatchEvent(new Event(dark ? 'navtheme:dark' : 'navtheme:light'))
    setNav(true)

    const ctx = gsap.context(() => {
      if (reduced) {
        ScrollTrigger.create({
          trigger: wrap, start: 'top top', end: 'bottom top',
          onUpdate: ({ progress }) => setNav(progress < 0.5),
        })
        return
      }
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: ({ progress }) => setNav(progress < 0.72),
        },
      })
        .to(overlay, { opacity: 0, yPercent: -8, ease: 'none', duration: 0.25 }, 0)
        .to(box, { scale: 0.58, borderRadius: 16, ease: 'none', duration: 0.45 }, 0.55)
    }, wrap)

    return () => { ctx.revert(); setNav(false) }
  }, [])

  // Headline words rise in (yPercent 50, tilted, faded) one after another.
  useEffect(() => {
    const title = titleRef.current
    if (!title || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const split = new SplitText(title, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.from(split.words, {
        yPercent: 50, rotateX: -20, opacity: 0, stagger: 0.05,
        ease: 'expo.out', duration: 1.2,
        onComplete: () => split.revert(),
      })
    }, title)
    return () => { ctx.revert(); split.revert() }
  }, [])

  // Esc closes the film modal.
  useEffect(() => {
    if (!filmOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFilmOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filmOpen])

  return (
    <div ref={wrapRef} style={{ position: 'relative', height: '250vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100svh', overflow: 'hidden', background: 'var(--bg)' }}>
        {/* Photo box */}
        <div ref={boxRef} style={{
          position: 'absolute', inset: 0, overflow: 'hidden', background: '#001941',
          transformOrigin: '50% 50%', willChange: 'transform',
        }}>
          <style>{HERO_CSS}</style>
          {TEAM_PHOTOS.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element -- full-bleed animated backdrop
            <img key={src} src={src} className="ah-photo" alt={i === 0 ? 'The Filmfx Studio team' : ''} aria-hidden={i > 0} />
          ))}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(rgba(0,13,34,0.55) 0%, rgba(0,13,34,0.3) 38%, rgba(0,13,34,0.45) 60%, rgba(0,13,34,0.72) 100%)',
          }} />
        </div>

        {/* Text overlay */}
        <div ref={overlayRef} style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
          gap: '24px', textAlign: 'center', color: '#fbf9ef',
          padding: 'clamp(88px,12vh,140px) clamp(20px,4vw,48px) clamp(28px,5vh,48px)',
        }}>
          <h1 ref={titleRef} style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(2.875rem, 8vw, 7.375rem)', lineHeight: 0.8, letterSpacing: '-0.05em',
            maxWidth: '15ch', margin: '0 auto', color: '#fbf9ef',
          }}>
            The people behind your next standout story.
          </h1>

          <p style={{
            fontSize: 'clamp(17px, 1.5vw, 22px)', lineHeight: 1.3, opacity: 0.92,
            maxWidth: '30em', margin: 0,
          }}>
            We&apos;re Filmfx Studio. Editors, animators, and creative thinkers.<br />
            Bringing your vision to life through video editing and motion graphics.
          </p>

          <button
            type="button"
            onClick={() => setFilmOpen(true)}
            style={{
              pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: 'none', border: 0, padding: 0, color: '#fbf9ef',
              fontSize: '0.9rem', fontFamily: 'inherit', cursor: 'none',
            }}
          >
            <video
              src={`${SHOWREEL}#t=1`} muted playsInline preload="auto" aria-hidden
              style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
            />
            <span aria-hidden style={{
              width: '34px', height: '34px', borderRadius: '999px', background: '#fbf9ef', color: '#001941',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px',
            }}>▶</span>
            <span style={{ fontWeight: 500 }}>Watch the full showreel</span>
          </button>
        </div>
      </div>

      {/* Full-film modal */}
      {filmOpen && (
        <div
          role="dialog" aria-modal="true" aria-label="Filmfx Studio showreel"
          onClick={() => setFilmOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,10,26,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px,4vw,60px)',
          }}
        >
          <video
            src={SHOWREEL} autoPlay controls playsInline
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '1200px', maxHeight: '100%', borderRadius: '12px', background: '#000' }}
          />
          <button
            type="button" aria-label="Close"
            onClick={() => setFilmOpen(false)}
            style={{
              position: 'absolute', top: '20px', right: '20px', width: '44px', height: '44px', borderRadius: '50%',
              border: 0, background: '#fbf9ef', color: '#001941', fontSize: '18px', cursor: 'none',
            }}
          >✕</button>
        </div>
      )}
    </div>
  )
}
