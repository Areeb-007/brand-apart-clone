'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Block of paragraphs that starts faint and darkens letter by letter as it
// scrolls through the viewport (scrubbed, so scrolling back up fades it
// again) — same effect as the body copy on brandappart.com/about. One
// ScrollTrigger drives every paragraph in order, so the second only starts
// once the first has fully darkened. Letters are grouped per word so lines
// never break mid-word; the split copy is aria-hidden and a visually hidden
// plain copy is kept for screen readers.
export default function ScrollRevealText({
  paragraphs,
  from = 'rgba(0,25,65,0.18)',
  to = '#001941',
  gap = '22px',
  style,
}: {
  paragraphs: string[]
  from?: string
  to?: string
  gap?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chars = ref.current?.querySelectorAll('.srt-char')
    if (!chars?.length) return
    const anim = gsap.fromTo(chars,
      { color: from },
      {
        color: to,
        ease: 'none',
        stagger: 0.1,
        // Long scroll range + heavy scrub smoothing so the darkening creeps
        // along slowly rather than racing ahead of the reader.
        scrollTrigger: { trigger: ref.current, start: 'top 95%', end: 'bottom 15%', scrub: 1.8 },
      }
    )
    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [paragraphs, from, to])

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap }}>
      {paragraphs.map((text, p) => (
        <p key={p} style={{ margin: 0, ...style }}>
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {text.split(' ').map((word, w) => (
              <span key={w} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                {word.split('').map((ch, c) => (
                  <span key={c} className="srt-char" style={{ color: from }}>{ch}</span>
                ))}
                {' '}
              </span>
            ))}
          </span>
        </p>
      ))}
    </div>
  )
}
