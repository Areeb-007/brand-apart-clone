'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

// Spawns a small floating charm image near the cursor on mouse move, inside
// whatever element the returned onMouseMove handler is attached to. Same
// tuning as the home hero's charm effect (throttle + pop/float/fade timings).
export function useCharmSpawner(charms: string[]) {
  const charmIdxRef = useRef(0)
  const lastShownAt = useRef(0)
  const activeTLs   = useRef<gsap.core.Timeline[]>([])

  useEffect(() => {
    return () => { activeTLs.current.forEach(t => t.kill()) }
  }, [])

  function spawnCharm(section: HTMLElement, mx: number, my: number) {
    if (charms.length === 0) return

    let next = charmIdxRef.current
    if (charms.length > 1) {
      while (next === charmIdxRef.current) next = Math.floor(Math.random() * charms.length)
    }
    charmIdxRef.current = next

    const el = document.createElement('div')
    el.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;z-index:10;will-change:transform,opacity;'
    const img = document.createElement('img')
    img.src = charms[next]
    img.alt = ''
    img.style.cssText = 'width:clamp(90px,10vw,160px);height:auto;object-fit:contain;filter:drop-shadow(0 24px 48px rgba(0,0,0,0.22));display:block;'
    el.appendChild(img)
    section.appendChild(el)

    const tilt   = (Math.random() - 0.5) * 20
    const floatY = 10 + Math.random() * 8
    const floatR = (Math.random() - 0.5) * 5

    gsap.set(el, { x: mx, y: my - 55, xPercent: -50, yPercent: -50,
                   opacity: 0, rotation: tilt - 12, scale: 0.8 })

    const timeline = gsap.timeline({
      onComplete: () => {
        section.contains(el) && section.removeChild(el)
        activeTLs.current = activeTLs.current.filter(t => t !== timeline)
      },
    })
    timeline
      .to(el, { y: my, opacity: 1, rotation: tilt, scale: 1, duration: 0.32, ease: 'back.out(1.15)' })
      .to(el, { y: `+=${floatY}`, rotation: `+=${floatR}`, duration: 0.6, ease: 'sine.inOut' })
      .to(el, { y: '+=20', opacity: 0, rotation: '-=8', duration: 0.4, ease: 'power2.in' })

    activeTLs.current.push(timeline)
  }

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (charms.length === 0) return
    const now = Date.now()
    if (now - lastShownAt.current < 380) return
    lastShownAt.current = now

    const rect = e.currentTarget.getBoundingClientRect()
    spawnCharm(e.currentTarget, e.clientX - rect.left, e.clientY - rect.top)
  }

  return { onMouseMove }
}
