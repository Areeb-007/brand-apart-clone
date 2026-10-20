'use client'

import { useEffect, useRef, useState } from 'react'
import { loadYouTubeApi, ensurePlaying, type YTPlayer } from '@/lib/youtube'

// Generalized to cover grid tiles of very different shapes (see Works.tsx).
//
// An iframe can't use object-fit, so "cover" is faked by giving the iframe
// itself the video's real aspect ratio and sizing it so it overflows the
// tile on whichever axis the tile is relatively narrower on — the standard
// cover formula is: match the axis where containerAspect > contentAspect by
// width, otherwise by height. Since both aspect ratios are known up front
// per tile (see Works.tsx), the caller just passes which axis to match.
//
// Players only initialize once the tile scrolls near the viewport — with
// every tile on the page mounting (and trying to autoplay) at once, browsers
// can silently stall a couple of them mid-start, leaving just their static
// first-frame thumbnail showing instead of actually playing.

export default function YouTubeTileVideo({
  videoId, aspectRatio, matchByWidth, className,
}: { videoId: string; aspectRatio: string; matchByWidth: boolean; className?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hostRef   = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [inView, setInView] = useState(false)
  // YouTube's own "paused" branding overlay lives inside the cross-origin
  // iframe — mask it (and the initial load flash) with a same-origin cover
  // that only lifts once the player is actually PLAYING.
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!wrapperRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '400px' }
    )
    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let cancelled = false

    loadYouTubeApi().then(() => {
      if (cancelled || !hostRef.current || !window.YT) return

      playerRef.current = new window.YT.Player(hostRef.current, {
        videoId,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, disablekb: 1, fs: 0,
          iv_load_policy: 3, modestbranding: 1, rel: 0, playsinline: 1,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            const iframeEl = e.target.getIframe()
            Object.assign(iframeEl.style, {
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '0', pointerEvents: 'none',
              aspectRatio,
              width:  matchByWidth ? '100%' : 'auto',
              height: matchByWidth ? 'auto' : '100%',
            })
            e.target.mute()
            e.target.playVideo()
            ensurePlaying(e.target)
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (!window.YT) return
            setPlaying(e.data === window.YT.PlayerState.PLAYING)
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0, true)
              e.target.playVideo()
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              // These are silent, uncontrollable background loops — the
              // browser sometimes pauses off-screen/backgrounded iframes to
              // save battery, which otherwise leaves YouTube's "paused"
              // branding visible indefinitely. Always resume.
              e.target.playVideo()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      playerRef.current?.destroy()
    }
  }, [inView, videoId, aspectRatio, matchByWidth])

  return (
    <div ref={wrapperRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div ref={hostRef} />
      <div style={{
        position: 'absolute', inset: 0, background: '#001941',
        opacity: playing ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: 'none',
      }} />
    </div>
  )
}
