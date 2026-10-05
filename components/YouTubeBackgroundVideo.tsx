'use client'

import { useEffect, useRef } from 'react'
import { loadYouTubeApi, type YTPlayer } from '@/lib/youtube'

// Full-bleed autoplay/loop background for a section sized exactly to the
// viewport (100vw x 100vh), like ZoomReveal's pinned card. Unlike
// YouTubeTileVideo (fixed, known tile shapes), this container's aspect ratio
// is whatever the visitor's screen happens to be, so the usual vw/vh double
// min-width/min-height "cover" trick applies here instead of a precomputed
// aspect-ratio — it only works because the container truly is the viewport.
export default function YouTubeBackgroundVideo({ videoId }: { videoId: string }) {
  const hostRef   = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)

  useEffect(() => {
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
              width: '100vw', height: '56.25vw',
              minWidth: '177.78vh', minHeight: '100vh',
            })
            e.target.mute()
            e.target.playVideo()
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (window.YT && e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0, true)
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
  }, [videoId])

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div ref={hostRef} />
    </div>
  )
}
