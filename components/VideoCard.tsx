'use client'

import { useEffect, useRef } from 'react'

// The loop=1&playlist=<id> embed trick (our old approach) makes YouTube treat
// the video as a one-item playlist, which flashes its prev/next/pause "up
// next" chrome at the loop boundary. Driving playback through the IFrame
// Player API instead — seeking back to 0 on end ourselves — avoids that UI
// entirely since the player never actually reaches a playlist end state.

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, options: Record<string, unknown>) => YTPlayer
      PlayerState: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

type YTPlayer = {
  getIframe: () => HTMLIFrameElement
  mute: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  destroy: () => void
}

let apiPromise: Promise<void> | null = null

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve()
  if (apiPromise) return apiPromise
  apiPromise = new Promise(resolve => {
    const prevReady = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.()
      resolve()
    }
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
  })
  return apiPromise
}

export default function VideoCard({ videoId }: { videoId: string }) {
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
              width: '100%', height: '177.78%',
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
    <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/5', background: '#0d1f3c' }}>
      <div ref={hostRef} />
    </div>
  )
}
