// Shared YouTube IFrame Player API loader, used by every autoplaying-loop
// embed on the site (VideoCard, YouTubeTileVideo, YouTubeBackgroundVideo).
// Playback is driven by the JS API rather than the loop=1&playlist=<id>
// embed trick, which flashes prev/next/pause "up next" chrome at the loop
// boundary — seeking back to 0 on end avoids that entirely.

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, options: Record<string, unknown>) => YTPlayer
      PlayerState: { ENDED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

export type YTPlayer = {
  getIframe: () => HTMLIFrameElement
  mute: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  destroy: () => void
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
