'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  {
    id: 'home', label: 'HOME', href: '#',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'services', label: 'SERVICES', href: '#services',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'works', label: 'PORTFOLIO', href: '#works',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    id: 'about', label: 'ABOUT US', href: '#about',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: 'contact', label: 'CONTACT', href: '#contact',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22 6 12 13 2 6" />
      </svg>
    ),
  },
]

const BASE = 60
const SIZES = [88, 72, 64] // hovered, distance-1, distance-2

function getSize(index: number, hovered: number | null): number {
  if (hovered === null) return BASE
  const d = Math.abs(index - hovered)
  return SIZES[d] ?? BASE
}

export default function Navigation() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Logo badge — top left ── */}
      <Link href="/" className="nav-logo-badge">
        FX
      </Link>

      {/* ── Brand name — bottom left ── */}
      <div className="nav-brand-name">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--fg)' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </span>
        <span style={{ display: 'block', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: '1px' }}>Studio</span>
      </div>

      {/* ── Dock icons — centered left ── */}
      <nav
        className="dock-nav"
        onMouseLeave={() => setHovered(null)}
      >
        {NAV_ITEMS.map((item, i) => {
          const size = getSize(i, hovered)
          const isActive = active === i
          return (
            <div
              key={item.id}
              style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            >
              <a
                href={item.href}
                onClick={() => setActive(i)}
                onMouseEnter={() => setHovered(i)}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: `${Math.round(size * 0.26)}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: `1px solid ${isActive ? 'rgba(13,13,13,0.18)' : 'rgba(13,13,13,0.08)'}`,
                  boxShadow: isActive
                    ? '0 4px 16px rgba(13,13,13,0.12)'
                    : '0 2px 8px rgba(13,13,13,0.06)',
                  color: isActive ? '#0D0D0D' : 'rgba(13,13,13,0.38)',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1), height 0.2s cubic-bezier(0.34,1.56,0.64,1), border-radius 0.2s ease, box-shadow 0.2s ease, color 0.15s ease',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </a>

              {/* Active label */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  left: `${size + 10}px`,
                  whiteSpace: 'nowrap',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(13,13,13,0.1)',
                  boxShadow: '0 2px 8px rgba(13,13,13,0.06)',
                  color: '#0D0D0D',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                  zIndex: 300,
                  transition: 'left 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  {item.label}
                </span>
              )}

              {/* Hover tooltip (non-active) */}
              {hovered === i && !isActive && (
                <span style={{
                  position: 'absolute',
                  left: `${size + 10}px`,
                  whiteSpace: 'nowrap',
                  background: '#0D0D0D',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  padding: '5px 12px',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                  zIndex: 300,
                }}>
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* ── Book a Call — top right ── */}
      <div className="dock-cta-btn">
        <a
          href="#contact"
          className="pill-btn pill-btn-filled"
          style={{ fontSize: '12px', padding: '10px 22px', textDecoration: 'none', cursor: 'none', letterSpacing: '0.05em', fontWeight: 700 }}
        >
          BOOK A CALL NOW
        </a>
      </div>

      {/* ── Mobile: top bar ── */}
      <header className="mobile-topbar">
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', textDecoration: 'none', cursor: 'none' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'none', padding: '6px' }}
        >
          {[
            menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            undefined,
            menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
          ].map((transform, i) => (
            <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--fg)', transition: 'all 0.25s', transform: transform ?? 'none', opacity: i === 1 ? (menuOpen ? 0 : 1) : 1 }} />
          ))}
        </button>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="mobile-topbar"
        style={{
          position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
          background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          zIndex: 199, flexDirection: 'column', padding: '32px 28px 40px',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
          pointerEvents: menuOpen ? 'all' : 'none', display: 'flex',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.id} href={item.href}
              style={{ fontSize: '28px', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--fg)', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid var(--border)', cursor: 'none', letterSpacing: '-0.02em' }}
              onClick={() => { setActive(i); setMenuOpen(false) }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div style={{ marginTop: '32px' }}>
          <a href="#contact" className="pill-btn pill-btn-filled"
            style={{ fontSize: '14px', padding: '14px 28px', textDecoration: 'none', cursor: 'none', justifyContent: 'center', letterSpacing: '0.05em' }}
            onClick={() => setMenuOpen(false)}
          >
            BOOK A CALL NOW
          </a>
        </div>
      </div>
    </>
  )
}
