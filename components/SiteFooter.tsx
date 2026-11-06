'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Dark closing footer — layout and motion ported from brandappart.com's
// site footer: big headline (first line dimmed) whose words rise in on
// scroll, a CTA link, link columns, a bottom CTA + copyright, and a huge
// faint wordmark bleeding off the bottom edge. `background` lets a page
// match the footer to the section above it so the two read as one block.

// TODO: point these at the real booking page and social profiles.
export const BOOK_CALL_HREF = '/contact'
const SOCIAL = { instagram: '#', tiktok: '#', facebook: '#', youtube: '#', pinterest: '#', twitter: '#', behance: '#' }

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  { title: 'Filmfx Studio', links: [
    { label: 'Home',         href: '/' },
    { label: 'Our Services', href: '/#services' },
    { label: 'Portfolios',   href: '/#works' },
    { label: 'About us',     href: '/about' },
    { label: 'Contact',      href: '/contact' },
  ] },
  { title: 'Industries', links: [
    { label: 'Wedding videos',   href: '/services/video-editing/wedding-video' },
    { label: 'Real Estate',      href: '/services/video-editing/real-estate-videos' },
    { label: 'Short Form',       href: '/services/video-editing/short-form-videos' },
    { label: 'Promotional',      href: '/services/video-editing/promotional-videos' },
    { label: 'Youtube videos',   href: '/services/video-editing/youtube-videos' },
    { label: 'Documentary',      href: '/services/video-editing/documentaries' },
    { label: 'Ai videos',        href: '/services/video-editing/ai-videos' },
    { label: 'Long form videos', href: '/services/video-editing/long-form-video' },
  ] },
  { title: 'Services', links: [
    { label: 'Video Editing',                  href: '/services/video-editing' },
    { label: 'Graphic Design',                 href: '/services/graphic-design' },
    { label: 'Social Media Marketing',         href: '/services/smm' },
    { label: 'Sales and Business Development', href: '/services/sales-marketing' },
    { label: 'Staff augmentation',             href: '/services/staff-augmentation' },
  ] },
  { title: 'Helpful Links', links: [
    { label: 'Instagram', href: SOCIAL.instagram },
    { label: 'Tiktok',    href: SOCIAL.tiktok },
    { label: 'Facebook',  href: SOCIAL.facebook },
    { label: 'Youtube',   href: SOCIAL.youtube },
    { label: 'Pinterest', href: SOCIAL.pinterest },
    { label: 'Twitter',   href: SOCIAL.twitter },
    { label: 'Behance',   href: SOCIAL.behance },
  ] },
]

const CSS = `
.sf{background:#171412;color:#fff;text-align:center;position:relative;overflow:hidden;padding-top:8.5em;font-size:16px;}
.sf a{color:inherit;text-decoration:none;cursor:none;}
.sf-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;width:100%;max-width:69.875em;margin:0 auto;padding:0 1.25em;}
.sf-heading{font-family:var(--font-display);font-weight:700;font-size:clamp(48px,7.4vw,118px);line-height:.8;letter-spacing:-.05em;margin:0;max-width:46.25em;}
.sf-heading .dim{color:#ffffff80;}
.sf-link{display:inline-flex;align-items:center;gap:.6em;transition:transform .24s cubic-bezier(.22,.61,.36,1);}
.sf-link:hover{transform:translateY(-2px);}
.sf-link-title{font-family:var(--font-display);font-weight:900;text-transform:uppercase;letter-spacing:-.03em;font-size:13px;line-height:1;}
.sf-link-dot{width:32px;height:32px;border-radius:50%;background:#fff;color:#171412;display:flex;align-items:center;justify-content:center;flex:none;}
.sf-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2.5em 1em;width:100%;margin-top:8.6em;text-align:left;}
.sf-col-title{color:#ffffff80;margin:0;font-size:.875em;font-weight:500;line-height:1.2;}
.sf-col-list{display:flex;flex-direction:column;gap:.5625em;margin:1.5em 0 0;padding:0;list-style:none;}
.sf-col-list a{font-family:var(--font-display);text-transform:uppercase;font-size:.8125em;font-weight:900;line-height:1;transition:opacity .32s cubic-bezier(.36,.33,0,1);}
.sf-col-list a:hover{opacity:.6;}
.sf-bottom{display:flex;flex-direction:column;align-items:center;gap:1.5em;margin:3em 0 2.4em;}
.sf-copy{color:#ffffff80;margin:0;font-size:14px;}
.sf-wordmark{color:#ffffff1a;width:100%;font-family:var(--font-display);font-weight:700;letter-spacing:-.05em;line-height:.78;white-space:nowrap;user-select:none;font-size:16.6vw;margin-bottom:-.1em;}
.sf [data-inview]:not(.--visible){opacity:0;transform:translateY(40px);}
.sf [data-inview].--visible{transition:transform .84s cubic-bezier(.22,.61,.36,1),opacity .84s cubic-bezier(.22,.61,.36,1);}
@media (max-width:991px){.sf{padding-top:6em}.sf-nav{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:6em}}
@media (max-width:767px){.sf{padding-top:5em}.sf-nav{gap:2.5em 1.25em;margin-top:5em}.sf-bottom{margin-bottom:2em}}
@media (prefers-reduced-motion:reduce){.sf [data-inview]:not(.--visible){opacity:1;transform:none}}
`

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.66.64c.28.06.5.25.65.5l.45.8c.16.3.3.55.39.76.1.23.15.46.13.7-.03.26-.13.47-.27.67-.13.2-.32.4-.54.66l-.66.75c-.12.14-.18.2-.18.29 0 .08.04.15.14.3a11.2 11.2 0 0 0 3.16 3.16c.15.1.22.14.3.14.09 0 .15-.06.29-.18l.75-.66c.26-.22.47-.41.66-.54.2-.14.41-.24.67-.27.24-.02.47.03.7.13.21.09.46.23.76.4l.8.44c.25.14.44.37.5.65.06.29-.02.6-.2.85l-.12.18c-.44.62-1.06 1.06-1.8 1.2-.9.17-1.86-.06-2.86-.61C4.42 9.4 2.6 7.58 1.67 5.3 1.12 4.31.9 3.35 1.06 2.45c.14-.74.58-1.36 1.2-1.8l.18-.12c.25-.18.56-.26.85-.2Z" fill="currentColor" />
    </svg>
  )
}

// Default headline/CTA (contact & most pages). Pages can pass their own —
// the About page uses its own closing line per the client's doc. The first
// line is rendered dimmed, like brandappart's footer heading.
const DEFAULT_HEADING = ['Give your story', 'a reason to', 'stay with people.']

export default function SiteFooter({
  background = '#171412',
  heading = DEFAULT_HEADING,
  ctaLabel = 'Let’s create',
}: { background?: string; heading?: string[]; ctaLabel?: string }) {
  const rootRef    = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Headline words rise in once the footer is a quarter into view.
  useEffect(() => {
    const el = headingRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const split = new SplitText(el, { type: 'words' })
    const ctx = gsap.context(() => {
      gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 1.2 }, scrollTrigger: { trigger: el, start: 'top bottom-=25%' } })
        .from(split.words, { yPercent: 50, rotateX: -20, opacity: 0, stagger: 0.05, onComplete: () => split.revert() })
    }, el)
    return () => { ctx.revert(); split.revert() }
  }, [])

  // Fade-up for the CTA and each link column (columns staggered 70ms).
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('[data-inview]')
    if (!els) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('--visible'); io.unobserve(en.target) } })
    }, { rootMargin: '0px 0px -10% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <footer ref={rootRef} className="sf" data-nav-dark style={{ background }}>
      <style>{CSS}</style>

      <div className="sf-inner">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2em' }}>
          <h2 ref={headingRef} className="sf-heading">
            {heading.map((line, i) => (
              <span key={i}>
                {i === 0 ? <span className="dim">{line}</span> : line}
                {i < heading.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <div data-inview="">
            <Link href={BOOK_CALL_HREF} className="sf-link">
              <span className="sf-link-title">{ctaLabel}</span>
              <span className="sf-link-dot">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </Link>
          </div>
        </div>

        <nav aria-label="Footer" className="sf-nav">
          {COLUMNS.map((col, i) => (
            <div key={col.title} data-inview="" style={{ transitionDelay: `${0.07 * i}s` }}>
              <p className="sf-col-title">{col.title}</p>
              <ul className="sf-col-list">
                {col.links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('/')
                      ? <Link href={l.href}>{l.label}</Link>
                      : <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="sf-bottom">
          <Link href={BOOK_CALL_HREF} className="sf-link">
            <span className="sf-link-title">Book a call</span>
            <span className="sf-link-dot"><PhoneIcon /></span>
          </Link>
          <p className="sf-copy">© 2026 Filmfx Studio. All rights reserved.</p>
        </div>
      </div>

      <div className="sf-wordmark" aria-hidden>Filmfx Studio</div>
    </footer>
  )
}
