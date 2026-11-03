'use client'

import { useEffect, useRef, useState } from 'react'

// Same idea as YouTubeTileVideo's lazy-init, applied to a self-hosted <video>
// grid with many tiles (the SMM UGC wall) — the <video> only gets a real
// `src` once it scrolls near the viewport, so dozens of tiles don't all start
// downloading/decoding at once on page load.

export default function LazyVideoTile({ src, className }: { src: string; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '400px' }
    )
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {inView && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )
}
