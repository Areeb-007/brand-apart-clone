'use client'

// Self-hosted counterpart to YouTubeTileVideo for Works.tsx tiles backed by a
// local video file instead of a YouTube embed — a plain <video> already
// supports object-fit natively, so none of the iframe-oversize-crop math is
// needed here.

export default function LocalVideoTile({ src, className }: { src: string; className?: string }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}
