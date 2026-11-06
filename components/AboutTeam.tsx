'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// About page team section — layout, motion and card sizing ported from
// brandappart.com/about's "Our team is our business" section:
//  • 3-line headline (left / centre / right aligned) whose lines start
//    shifted ±40% sideways and slide into place, scrubbed by scroll
//  • short intro paragraph under it, left-aligned, 20em wide
//  • 968px-wide 3-column grid that zig-zags every 6 cards
//    ([1 2 _] [3 _ 4] [_ 5 6]), cards 325:402 photo + name/role below
//  • each block fades up 40px as it enters the viewport

export type TeamMember = { name: string; role: string; photo: string }

const HEADLINE = ['Different minds.', 'One creative', 'chemistry.']

const CSS = `
.ateam-grid{display:grid;grid-template-columns:1fr 1fr;column-gap:16px;row-gap:2em;max-width:968px;margin:0 auto;}
@media (min-width:768px){
  .ateam-grid{grid-template-columns:1fr 1fr 1fr;row-gap:4em;}
  .ateam-grid > :nth-child(6n+3){grid-column:1;}
  .ateam-grid > :nth-child(6n+4){grid-column:3;}
  .ateam-grid > :nth-child(6n+5){grid-column:2;}
}
.ateam [data-inview]:not(.--visible){opacity:0;transform:translateY(40px);}
.ateam [data-inview].--visible{transition:transform .84s cubic-bezier(.22,.61,.36,1),opacity .84s cubic-bezier(.22,.61,.36,1);}
.ateam-line{display:flex;justify-content:center;}
.ateam-line:first-child{justify-content:flex-start;}
.ateam-line:nth-child(3){justify-content:flex-end;}
.ateam-line > span{display:inline-block;white-space:nowrap;}
@media (prefers-reduced-motion:reduce){
  .ateam [data-inview]:not(.--visible){opacity:1;transform:none;}
}
`

export default function AboutTeam({ team }: { team: TeamMember[] }) {
  const rootRef  = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  // Headline lines slide in from a random side (±40%), scrubbed by scroll.
  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    const ctx = gsap.context(() => {
      gsap.from(title.querySelectorAll('.ateam-line > span'), {
        xPercent: () => gsap.utils.random([40, -40]),
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: title, start: 'top bottom', end: 'bottom 20%', scrub: true },
      })
    }, title)
    return () => ctx.revert()
  }, [])

  // Fade-up reveal for every [data-inview] block, once.
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
    <section
      ref={rootRef}
      id="team"
      className="ateam"
      style={{ background: 'var(--bg-card)', padding: '160px clamp(20px,4vw,60px)', overflow: 'hidden' }}
    >
      <style>{CSS}</style>

      <div style={{ width: '100%', maxWidth: '1008px', margin: '0 auto' }}>
        <div style={{ width: '80%', margin: '0 auto clamp(60px, 11vw, 160px)' }} className="ateam-headline">
          <div ref={titleRef}>
            <h2 data-inview="" style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(46px, 8vw, 118px)',
              lineHeight: 0.8,
              letterSpacing: '-0.05em',
              color: 'var(--fg)',
              margin: 0,
            }}>
              {HEADLINE.map(line => (
                <div key={line} className="ateam-line"><span>{line}</span></div>
              ))}
            </h2>
          </div>

          <div data-inview="" style={{ width: '20em', maxWidth: '100%', marginTop: '64px', textAlign: 'left' }}>
            <p style={{ fontSize: '14px', lineHeight: 1.2, color: 'var(--fg)', margin: 0 }}>
              Some of us think in sequences. Others in shapes, sound, or movement. Together, we&apos;re Filmfx Studio—a team of editors and motion designers who exchange ideas, challenge each other, and find the details that make a story click.
            </p>
          </div>
        </div>

        <div role="list" className="ateam-grid">
          {team.map(member => (
            <div key={member.name} role="listitem" data-inview="">
              <div style={{
                position: 'relative', aspectRatio: '325 / 402', borderRadius: '12px',
                overflow: 'hidden', background: 'var(--fg)',
              }}>
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 312px, 50vw"
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
              <div style={{ paddingTop: '1em' }}>
                <div style={{ fontSize: '14px', lineHeight: 1.2, color: 'var(--fg)' }}>{member.name}</div>
                <div style={{ fontSize: '14px', lineHeight: 1.2, color: 'var(--fg-muted)' }}>{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
