'use client'

import { useEffect, useRef } from 'react'
import { loadYouTubeApi, type YTPlayer } from '@/lib/youtube'

// Same silent autoplay/loop treatment as VideoCard.tsx, just sized for
// landscape content (16:9) instead of VideoCard's 4:5 crop.
export default function YouTubeEmbedCard({ videoId }: { videoId: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
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
              width: '100%', height: '100%',
              transform: 'translate(-50%, -50%)',
              border: '0', pointerEvents: 'none',
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
    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', background: '#0d1f3c' }}>
      <div ref={hostRef} />
    </div>
  )
}
