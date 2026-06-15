'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

/* ─── Data ──────────────────────────────────────────────────── */

const VIDEO_EDITING_SUBS = [
  'Wedding','Short Videos','Motion Graphics','Youtube Video',
  'Real Estate Video','Documentaries','Promotional Videos',
  'AI Video','Corporate Videos','Marketing Campaigns','Before & After Edits',
]

const VIDEO_EDITING_IMAGES = [
  '/images/video-editing/1.jpg','/images/video-editing/2.jpg',
  '/images/video-editing/3.jpg','/images/video-editing/4.jpg',
]

const SERVICE_ITEMS = [
  { label: 'Video Editing',                href: '#services', icon: '✂', hasSub: true  },
  { label: 'Graphic Design',               href: '#services', icon: '✦', hasSub: false },
  { label: 'Social Media Marketing',       href: '#services', icon: '◎', hasSub: false },
  { label: 'Sales & Business Development', href: '#services', icon: '◈', hasSub: false },
  { label: 'Staff Augmentation',           href: '#services', icon: '⊕', hasSub: false },
]

const PORTFOLIO_ITEMS = [
  {
    label: 'Video Editing', icon: '✂',
    subs: ['Wedding','Short Videos','Motion Graphics','Youtube Video','Real Estate Video',
           'Documentaries','Promotional Videos','AI Video','Corporate Videos',
           'Marketing Campaigns','Before & After Edits'],
  },
  { label: 'Graphic Design',               icon: '✦', subs: [] },
  { label: 'Social Media Marketing',       icon: '◎', subs: [] },
  { label: 'Sales & Business Development', icon: '◈', subs: [] },
  { label: 'Staff Augmentation',           icon: '⊕', subs: [] },
]

const PRICING_ITEMS = [
  { label: 'Monthly Subscription Plans', icon: '◉', href: '#pricing' },
  { label: 'Per-Project Pricing',        icon: '◇', href: '#pricing' },
]

const ABOUT_ITEMS = [
  { label: 'Who We Are',   icon: '◐', href: '#about' },
  { label: 'Our Process',  icon: '◑', href: '#about' },
  { label: 'Our Team',     icon: '◒', href: '#about' },
  { label: 'Testimonials', icon: '★', href: '#about' },
]

/* ─── Nav items ─────────────────────────────────────────────── */

const NAV_ITEMS = [
  {
    id: 'home', label: 'HOME', href: '#',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    id: 'services', label: 'SERVICES', href: '#services', dropdown: 'services',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>,
  },
  {
    id: 'works', label: 'PORTFOLIO', href: '#works', dropdown: 'portfolio',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  },
  {
    id: 'pricing', label: 'PRICING', href: '#pricing', dropdown: 'pricing',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
  {
    id: 'about', label: 'ABOUT US', href: '#about', dropdown: 'about',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    id: 'contact', label: 'CONTACT', href: '#contact',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>,
  },
]

const BASE = 54
const SIZES = [80, 66, 58]
function getSize(i: number, hovered: number | null) {
  if (hovered === null) return BASE
  const d = Math.abs(i - hovered)
  return SIZES[d] ?? BASE
}

/* ─── Small reusable dropdown panel ─────────────────────────── */
function SimpleDropdown({
  title, items, size, onClose,
}: {
  title: string
  items: { label: string; icon: string; href: string }[]
  size: number
  onClose: () => void
}) {
  return (
    <div style={{
      position: 'absolute', left: `${size + 10}px`, top: '50%',
      transform: 'translateY(-50%)',
      background: 'var(--bg-card)', border: '1px solid rgba(0,25,65,0.1)',
      borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,25,65,0.12)',
      padding: '8px', zIndex: 400, minWidth: '220px',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      animation: 'dropdownIn 0.18s cubic-bezier(0.34,1.56,0.64,1)',
    }}>
      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '6px 10px 8px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>
        {title}
      </p>
      {items.map(item => (
        <a key={item.label} href={item.href} onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 10px', borderRadius: '8px', textDecoration: 'none',
          color: 'var(--fg)', fontSize: '13px', fontWeight: 500, cursor: 'none',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <span style={{ fontSize: '13px', color: 'var(--fg-muted)', width: '18px', textAlign: 'center' }}>{item.icon}</span>
          {item.label}
        </a>
      ))}
    </div>
  )
}

/* ─── Component ─────────────────────────────────────────────── */

export default function Navigation() {
  const [hovered,       setHovered]       = useState<number | null>(null)
  const [active,        setActive]        = useState(0)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [openDropdown,  setOpenDropdown]  = useState<string | null>(null)
  const [videoSubOpen,  setVideoSubOpen]  = useState(false)
  const [portSubItem,   setPortSubItem]   = useState<string | null>(null)
  const [hoveredImg,    setHoveredImg]    = useState(0)
  const [mobileOpen,    setMobileOpen]    = useState<Record<string,boolean>>({})
  const dropTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const subTimer  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    // iOS Safari needs position:fixed to properly lock body scroll
    if (menuOpen) {
      const y = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${y}px`
      document.body.style.width = '100%'
    } else {
      const top = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (top) window.scrollTo(0, -parseInt(top || '0'))
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  function openDrop(id: string) {
    if (dropTimer.current) clearTimeout(dropTimer.current)
    setOpenDropdown(id)
  }
  function closeDrop() {
    dropTimer.current = setTimeout(() => { setOpenDropdown(null); setVideoSubOpen(false); setPortSubItem(null) }, 140)
  }
  function openSub() {
    if (subTimer.current) clearTimeout(subTimer.current)
    if (dropTimer.current) clearTimeout(dropTimer.current)
    setVideoSubOpen(true)
  }
  function closeSub() { subTimer.current = setTimeout(() => setVideoSubOpen(false), 140) }
  function closeAll() { setOpenDropdown(null); setVideoSubOpen(false); setPortSubItem(null) }

  const chevron = (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0, color: 'var(--fg-muted)' }}>
      <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  return (
    <>
      <Link href="/" className="nav-logo-badge">FX</Link>

      <div className="nav-brand-name">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14px', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--fg)' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </span>
        <span style={{ display: 'block', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: '1px' }}>Studio</span>
      </div>

      {/* ── Dock ── */}
      <nav className="dock-nav" onMouseLeave={() => { setHovered(null); closeDrop() }}>
        {NAV_ITEMS.map((item, i) => {
          const size     = getSize(i, hovered)
          const isActive = active === i
          const hasDrop  = !!item.dropdown
          const isOpen   = openDropdown === item.id

          return (
            <div
              key={item.id}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingRight: hasDrop ? '14px' : '0' }}
              onMouseEnter={() => { setHovered(i); if (hasDrop) openDrop(item.id) }}
              onMouseLeave={() => { if (hasDrop) closeDrop() }}
            >
              <a
                href={item.href}
                onClick={() => { setActive(i); closeAll() }}
                style={{
                  width: `${size}px`, height: `${size}px`,
                  borderRadius: `${Math.round(size * 0.26)}px`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: `1px solid ${isActive ? 'rgba(0,25,65,0.18)' : 'rgba(0,25,65,0.08)'}`,
                  boxShadow: isActive ? '0 4px 16px rgba(0,25,65,0.12)' : '0 2px 8px rgba(0,25,65,0.06)',
                  color: isActive ? 'var(--fg)' : 'rgba(0,25,65,0.38)',
                  textDecoration: 'none', cursor: 'none', flexShrink: 0,
                  transition: 'width 0.2s cubic-bezier(0.34,1.56,0.64,1),height 0.2s cubic-bezier(0.34,1.56,0.64,1),border-radius 0.2s,box-shadow 0.2s,color 0.15s',
                }}
              >
                {item.icon}
              </a>

              {/* ── Services dropdown ── */}
              {item.id === 'services' && isOpen && (
                <div onMouseEnter={() => openDrop('services')} onMouseLeave={closeDrop} style={{
                  position: 'absolute', left: `${size + 10}px`, top: '50%', transform: 'translateY(-50%)',
                  background: 'var(--bg-card)', border: '1px solid rgba(0,25,65,0.1)',
                  borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,25,65,0.12)',
                  padding: '8px', zIndex: 400, minWidth: '230px',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  animation: 'dropdownIn 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '6px 10px 8px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>Our Services</p>
                  {SERVICE_ITEMS.map(svc => (
                    <div key={svc.label} style={{ position: 'relative' }}
                      onMouseEnter={() => { if (svc.hasSub) openSub() ; else closeSub() }}
                      onMouseLeave={() => { if (svc.hasSub) closeSub() }}
                    >
                      <a href={svc.href} onClick={() => { setActive(1); closeAll() }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '8px', padding: '9px 10px', borderRadius: '8px',
                        textDecoration: 'none', color: 'var(--fg)', fontSize: '13px', fontWeight: 500, cursor: 'none',
                        background: svc.hasSub && videoSubOpen ? 'var(--bg)' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)' }}
                        onMouseLeave={e => { if (!(svc.hasSub && videoSubOpen)) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--fg-muted)', width: '18px', textAlign: 'center' }}>{svc.icon}</span>
                          {svc.label}
                        </span>
                        {svc.hasSub && chevron}
                      </a>

                      {/* Video Editing mega panel */}
                      {svc.hasSub && videoSubOpen && (
                        <div onMouseEnter={openSub} onMouseLeave={closeSub} style={{
                          position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
                          marginLeft: '8px', background: 'var(--bg-card)',
                          border: '1px solid rgba(0,25,65,0.1)', borderRadius: '14px',
                          boxShadow: '0 8px 40px rgba(0,25,65,0.14)',
                          padding: '12px', zIndex: 500, width: '400px',
                          display: 'flex', gap: '12px',
                          animation: 'dropdownIn 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                        }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '2px 4px 8px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>Video Editing</p>
                            {VIDEO_EDITING_SUBS.map((sub, idx) => (
                              <a key={sub} href="#services" onClick={() => { setActive(1); closeAll() }} style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '7px 8px', borderRadius: '7px',
                                textDecoration: 'none', color: 'var(--fg)', fontSize: '12px', fontWeight: 500, cursor: 'none',
                                transition: 'background 0.12s',
                              }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)'; setHoveredImg(idx % VIDEO_EDITING_IMAGES.length) }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                              >
                                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'inline-block' }} />
                                {sub}
                              </a>
                            ))}
                          </div>
                          <div style={{ width: '130px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', height: '110px', border: '1px solid var(--border)' }}>
                              <Image src={VIDEO_EDITING_IMAGES[hoveredImg]} alt="preview" fill style={{ objectFit: 'cover' }} sizes="130px" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                              {VIDEO_EDITING_IMAGES.map((src, idx) => (
                                <div key={idx} style={{ borderRadius: '6px', overflow: 'hidden', position: 'relative', height: '48px', border: `1.5px solid ${hoveredImg === idx ? 'var(--accent)' : 'var(--border)'}`, cursor: 'none', transition: 'border-color 0.15s' }} onMouseEnter={() => setHoveredImg(idx)}>
                                  <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="65px" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── Portfolio dropdown ── */}
              {item.id === 'works' && isOpen && (
                <div onMouseEnter={() => openDrop('works')} onMouseLeave={closeDrop} style={{
                  position: 'absolute', left: `${size + 10}px`, top: '50%', transform: 'translateY(-50%)',
                  background: 'var(--bg-card)', border: '1px solid rgba(0,25,65,0.1)',
                  borderRadius: '14px', boxShadow: '0 8px 32px rgba(0,25,65,0.12)',
                  padding: '8px', zIndex: 400, minWidth: '230px',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                  animation: 'dropdownIn 0.18s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '6px 10px 8px', borderBottom: '1px solid var(--border)', marginBottom: '4px' }}>Portfolio</p>
                  {PORTFOLIO_ITEMS.map(p => (
                    <div key={p.label} style={{ position: 'relative' }}
                      onMouseEnter={() => setPortSubItem(p.subs.length ? p.label : null)}
                      onMouseLeave={() => setPortSubItem(null)}
                    >
                      <a href="#works" onClick={() => { setActive(2); closeAll() }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: '8px', padding: '9px 10px', borderRadius: '8px',
                        textDecoration: 'none', color: 'var(--fg)', fontSize: '13px', fontWeight: 500, cursor: 'none',
                        background: portSubItem === p.label ? 'var(--bg)' : 'transparent', transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)' }}
                        onMouseLeave={e => { if (portSubItem !== p.label) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--fg-muted)', width: '18px', textAlign: 'center' }}>{p.icon}</span>
                          {p.label}
                        </span>
                        {p.subs.length > 0 && chevron}
                      </a>
                      {p.subs.length > 0 && portSubItem === p.label && (
                        <div style={{
                          position: 'absolute', left: '100%', top: '50%', transform: 'translateY(-50%)',
                          marginLeft: '8px', background: 'var(--bg-card)',
                          border: '1px solid rgba(0,25,65,0.1)', borderRadius: '12px',
                          boxShadow: '0 8px 32px rgba(0,25,65,0.12)', padding: '8px',
                          zIndex: 500, minWidth: '200px',
                          animation: 'dropdownIn 0.15s cubic-bezier(0.34,1.56,0.64,1)',
                        }}>
                          {p.subs.map(sub => (
                            <a key={sub} href="#works" onClick={() => { setActive(2); closeAll() }} style={{
                              display: 'flex', alignItems: 'center', gap: '8px',
                              padding: '7px 10px', borderRadius: '7px',
                              textDecoration: 'none', color: 'var(--fg)', fontSize: '12px', fontWeight: 500, cursor: 'none',
                              transition: 'background 0.12s',
                            }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg)' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                            >
                              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'inline-block' }} />
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── Pricing dropdown ── */}
              {item.id === 'pricing' && isOpen && (
                <SimpleDropdown title="Pricing" items={PRICING_ITEMS} size={size} onClose={closeAll} />
              )}

              {/* ── About dropdown ── */}
              {item.id === 'about' && isOpen && (
                <SimpleDropdown title="About Us" items={ABOUT_ITEMS} size={size} onClose={closeAll} />
              )}

              {/* Active label */}
              {isActive && !isOpen && (
                <span style={{
                  position: 'absolute', left: `${size + 10}px`, whiteSpace: 'nowrap',
                  background: 'var(--bg-card)', border: '1px solid rgba(0,25,65,0.1)',
                  boxShadow: '0 2px 8px rgba(0,25,65,0.06)', color: 'var(--fg)',
                  fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em',
                  padding: '5px 12px', borderRadius: '8px', pointerEvents: 'none', zIndex: 300,
                }}>
                  {item.label}
                </span>
              )}

              {/* Hover tooltip */}
              {hovered === i && !isActive && !isOpen && (
                <span style={{
                  position: 'absolute', left: `${size + 10}px`, whiteSpace: 'nowrap',
                  background: '#001941', color: '#fff',
                  fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em',
                  padding: '5px 12px', borderRadius: '8px', pointerEvents: 'none', zIndex: 300,
                }}>
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </nav>

      {/* ── Book a Call ── */}
      <div className="dock-cta-btn">
        <a href="#contact" className="pill-btn pill-btn-filled" style={{ fontSize: '12px', padding: '10px 22px', textDecoration: 'none', cursor: 'none', letterSpacing: '0.05em', fontWeight: 700 }}>
          BOOK A CALL NOW
        </a>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE NAVIGATION — Brand Apart style
          Top bar + bottom dock that slides up
          ══════════════════════════════════════════ */}

      {/* ── Mobile top bar ── */}
      <header className="mobile-topbar">
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', textDecoration: 'none' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </Link>

        {/* Hamburger / close button — dark rounded square like Brand Apart */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: '#001941', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', touchAction: 'manipulation', flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          {menuOpen ? (
            /* X icon */
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Hamburger icon */
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M0 1h18M0 7h18M0 13h18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </header>

      {/* ── Blur backdrop ── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 197,
            background: 'rgba(0,0,0,0.25)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            animation: 'fadeIn 0.2s ease',
          }}
        />
      )}

      {/* ── Bottom dock — slides up from bottom like Brand Apart ── */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 198,
          transform: menuOpen ? 'translateY(0)' : 'translateY(110%)',
          transition: 'transform 0.32s cubic-bezier(0.32,0.72,0,1)',
          display: 'none', // shown via CSS on mobile only
        }}
        className="mobile-bottom-dock"
      >
        {/* Rounded card */}
        <div style={{
          margin: '0 12px 12px',
          background: '#001941',
          borderRadius: '24px',
          padding: '8px 8px 12px',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.3)',
        }}>

          {/* Main nav icons row */}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingBottom: '4px' }}>
            {NAV_ITEMS.map((item, i) => {
              const isAct = active === i
              const hasSubs = !!item.dropdown
              const isExp = !!mobileOpen[item.id]
              return (
                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <button
                    onClick={() => {
                      if (hasSubs) {
                        setMobileOpen(p => ({ ...p, [item.id]: !p[item.id] }))
                      } else {
                        setActive(i)
                        setMenuOpen(false)
                        window.location.href = item.href
                      }
                    }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      touchAction: 'manipulation', padding: '10px 6px 4px',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                      color: isAct ? '#fff' : 'rgba(255,255,255,0.45)',
                      transition: 'color 0.2s',
                      width: '100%',
                    }}
                  >
                    <span style={{ display: 'flex', color: 'inherit' }}>{item.icon}</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.label}
                    </span>
                    {/* Active dot */}
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: isAct ? 'var(--accent)' : 'transparent', transition: 'background 0.2s' }} />
                  </button>

                  {/* Sub-items dropdown (expands upward) */}
                  {hasSubs && isExp && (
                    <div style={{
                      position: 'absolute', bottom: '100%', left: 0, right: 0,
                      margin: '0 12px 8px',
                      background: '#002a5e', borderRadius: '16px',
                      padding: '12px 8px',
                      boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
                      animation: 'slideUp 0.22s cubic-bezier(0.32,0.72,0,1)',
                      maxHeight: '60vh', overflowY: 'auto',
                    }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '4px 12px 10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '6px' }}>
                        {item.label}
                      </p>
                      {(item.id === 'services' ? SERVICE_ITEMS.map(s => ({ label: s.label, icon: s.icon, href: s.href }))
                        : item.id === 'works'   ? PORTFOLIO_ITEMS.map(p => ({ label: p.label, icon: p.icon, href: '#works' }))
                        : item.id === 'pricing' ? PRICING_ITEMS
                        : ABOUT_ITEMS
                      ).map(sub => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            padding: '11px 12px', borderRadius: '10px',
                            textDecoration: 'none', color: 'rgba(255,255,255,0.75)',
                            fontSize: '14px', fontWeight: 500,
                            cursor: 'pointer', touchAction: 'manipulation',
                          }}
                          onClick={() => { setActive(i); setMenuOpen(false); setMobileOpen({}) }}
                          onTouchStart={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                          onTouchEnd={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                        >
                          <span style={{ color: 'var(--accent)', fontSize: '12px', width: '20px', textAlign: 'center', flexShrink: 0 }}>{sub.icon}</span>
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Book a Call CTA */}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              margin: '4px 4px 0', padding: '14px',
              background: '#fff', borderRadius: '16px',
              fontSize: '13px', fontWeight: 800, letterSpacing: '0.04em',
              color: 'var(--fg)', textDecoration: 'none',
              cursor: 'pointer', touchAction: 'manipulation',
            }}
          >
            BOOK A CALL NOW
          </a>
        </div>
      </div>
    </>
  )
}
