'use client'

import { useEffect, useRef } from 'react'
import { loadYouTubeApi, type YTPlayer } from '@/lib/youtube'

// Generalized to cover grid tiles of very different shapes (see Works.tsx).
//
// An iframe can't use object-fit, so "cover" is faked by giving the iframe
// itself the video's real aspect ratio and sizing it so it overflows the
// tile on whichever axis the tile is relatively narrower on — the standard
// cover formula is: match the axis where containerAspect > contentAspect by
// width, otherwise by height. Since both aspect ratios are known up front
// per tile (see Works.tsx), the caller just passes which axis to match.

export default function YouTubeTileVideo({
  videoId, aspectRatio, matchByWidth, className,
}: { videoId: string; aspectRatio: string; matchByWidth: boolean; className?: string }) {
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
              aspectRatio,
              width:  matchByWidth ? '100%' : 'auto',
              height: matchByWidth ? 'auto' : '100%',
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
  }, [videoId, aspectRatio, matchByWidth])

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div ref={hostRef} />
    </div>
  )
}
