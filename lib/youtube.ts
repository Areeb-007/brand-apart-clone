// Shared YouTube IFrame Player API loader, used by every autoplaying-loop
// embed on the site (VideoCard, YouTubeTileVideo, YouTubeBackgroundVideo).
// Playback is driven by the JS API rather than the loop=1&playlist=<id>
// embed trick, which flashes prev/next/pause "up next" chrome at the loop
// boundary — seeking back to 0 on end avoids that entirely.

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, options: Record<string, unknown>) => YTPlayer
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; UNSTARTED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

export type YTPlayer = {
  getIframe: () => HTMLIFrameElement
  getPlayerState: () => number
  mute: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  destroy: () => void
}

// When several YouTube players autoplay at once (e.g. a grid of homepage
// tiles all mounting together), the browser sometimes silently stalls one
// or two mid-start — they're left paused on their first frame (looking like
// a static thumbnail) instead of actually playing. Nudging playVideo()
// again a few times clears it.
export function ensurePlaying(player: YTPlayer, attempt = 0) {
  if (attempt >= 5) return
  setTimeout(() => {
    const YT = window.YT
    if (!YT) return
    const state = player.getPlayerState()
    if (state !== YT.PlayerState.PLAYING && state !== YT.PlayerState.ENDED) {
      player.playVideo()
      ensurePlaying(player, attempt + 1)
    }
  }, 500 * (attempt + 1))
}

let apiPromise: Promise<void> | null = null

export function loadYouTubeApi(): Promise<void> {
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
