'use client'

import { useEffect, useRef, useState } from 'react'
import { loadYouTubeApi, ensurePlaying, type YTPlayer } from '@/lib/youtube'

export default function VideoCard({ videoId }: { videoId: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  // YouTube's own "paused" branding overlay lives inside the cross-origin
  // iframe — we can't reach in and hide it with CSS, so instead a same-origin
  // div covers the whole player whenever it isn't actually PLAYING, masking
  // that overlay (and the initial load flash) until real video is showing.
  const [playing, setPlaying] = useState(false)

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
              width: '100%', height: '177.78%',
              transform: 'translate(-50%, -50%)',
              border: '0', pointerEvents: 'none',
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
              // save battery. Always resume.
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
    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '9/16', background: '#0d1f3c' }}>
      <div ref={hostRef} />
      <div style={{
        position: 'absolute', inset: 0, background: '#0d1f3c',
        opacity: playing ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: 'none',
      }} />
    </div>
  )
}
