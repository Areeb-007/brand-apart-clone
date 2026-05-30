'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dotRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number

    function update() {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

      if (trackRef.current) trackRef.current.style.height = `${pct}%`
      if (dotRef.current)   dotRef.current.style.top      = `${pct}%`

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      right: '18px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '120px',
      width: '2px',
      background: 'rgba(13,13,13,0.1)',
      borderRadius: '2px',
      zIndex: 200,
    }}>
      {/* filled track */}
      <div ref={trackRef} style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '0%',
        background: 'var(--fg)',
        borderRadius: '2px',
      }} />

      {/* dot indicator */}
      <div ref={dotRef} style={{
        position: 'absolute',
        left: '50%',
        top: '0%',
        transform: 'translate(-50%, -50%)',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: 'var(--fg)',
      }} />
    </div>
  )
}
