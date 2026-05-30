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
      background: 'var(--bg-card)', border: '1px solid rgba(13,13,13,0.1)',
      borderRadius: '14px', boxShadow: '0 8px 32px rgba(13,13,13,0.12)',
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
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
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
                  border: `1px solid ${isActive ? 'rgba(13,13,13,0.18)' : 'rgba(13,13,13,0.08)'}`,
                  boxShadow: isActive ? '0 4px 16px rgba(13,13,13,0.12)' : '0 2px 8px rgba(13,13,13,0.06)',
                  color: isActive ? '#0D0D0D' : 'rgba(13,13,13,0.38)',
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
                  background: 'var(--bg-card)', border: '1px solid rgba(13,13,13,0.1)',
                  borderRadius: '14px', boxShadow: '0 8px 32px rgba(13,13,13,0.12)',
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
                          border: '1px solid rgba(13,13,13,0.1)', borderRadius: '14px',
                          boxShadow: '0 8px 40px rgba(13,13,13,0.14)',
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
                  background: 'var(--bg-card)', border: '1px solid rgba(13,13,13,0.1)',
                  borderRadius: '14px', boxShadow: '0 8px 32px rgba(13,13,13,0.12)',
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
                          border: '1px solid rgba(13,13,13,0.1)', borderRadius: '12px',
                          boxShadow: '0 8px 32px rgba(13,13,13,0.12)', padding: '8px',
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
                  background: 'var(--bg-card)', border: '1px solid rgba(13,13,13,0.1)',
                  boxShadow: '0 2px 8px rgba(13,13,13,0.06)', color: '#0D0D0D',
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
                  background: '#0D0D0D', color: '#fff',
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

      {/* ── Mobile top bar ── */}
      <header className="mobile-topbar">
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', textDecoration: 'none', cursor: 'none' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'none', padding: '6px' }}>
          {[menuOpen ? 'translateY(7px) rotate(45deg)' : 'none', undefined, menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'].map((t, i) => (
            <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--fg)', transition: 'all 0.25s', transform: t ?? 'none', opacity: i === 1 ? (menuOpen ? 0 : 1) : 1 }} />
          ))}
        </button>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div className="mobile-topbar" style={{
        position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0,
        background: 'rgba(245,240,232,0.98)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        zIndex: 199, flexDirection: 'column', padding: '24px 28px 40px',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
        pointerEvents: menuOpen ? 'all' : 'none', display: 'flex', overflowY: 'auto',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {NAV_ITEMS.map((item, i) => {
            const hasSubs = item.id === 'services' || item.id === 'works' || item.id === 'pricing' || item.id === 'about'
            const isExpanded = !!mobileOpen[item.id]
            return (
              <div key={item.id}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                  <a href={item.href} style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--fg)', textDecoration: 'none', padding: '14px 0', cursor: 'none', letterSpacing: '-0.02em', display: 'block', flex: 1 }}
                    onClick={() => { setActive(i); if (!hasSubs) setMenuOpen(false) }}>
                    {item.label}
                  </a>
                  {hasSubs && (
                    <button onClick={() => setMobileOpen(p => ({ ...p, [item.id]: !p[item.id] }))}
                      style={{ background: 'none', border: 'none', cursor: 'none', padding: '8px', color: 'var(--fg-muted)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                        <path d="M5 2.5L9.5 7 5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  )}
                </div>
                {hasSubs && isExpanded && (
                  <div style={{ paddingLeft: '16px', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                    {item.id === 'services' && SERVICE_ITEMS.map(svc => (
                      <a key={svc.label} href={svc.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', color: 'var(--fg-muted)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', cursor: 'none' }}
                        onClick={() => { setActive(i); setMenuOpen(false) }}>
                        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{svc.icon}</span>{svc.label}
                      </a>
                    ))}
                    {item.id === 'works' && PORTFOLIO_ITEMS.map(p => (
                      <a key={p.label} href="#works" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', color: 'var(--fg-muted)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', cursor: 'none' }}
                        onClick={() => { setActive(i); setMenuOpen(false) }}>
                        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{p.icon}</span>{p.label}
                      </a>
                    ))}
                    {item.id === 'pricing' && PRICING_ITEMS.map(p => (
                      <a key={p.label} href={p.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', color: 'var(--fg-muted)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', cursor: 'none' }}
                        onClick={() => { setActive(i); setMenuOpen(false) }}>
                        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{p.icon}</span>{p.label}
                      </a>
                    ))}
                    {item.id === 'about' && ABOUT_ITEMS.map(p => (
                      <a key={p.label} href={p.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', color: 'var(--fg-muted)', fontSize: '14px', fontWeight: 500, textDecoration: 'none', cursor: 'none' }}
                        onClick={() => { setActive(i); setMenuOpen(false) }}>
                        <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{p.icon}</span>{p.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div style={{ marginTop: '28px' }}>
          <a href="#contact" className="pill-btn pill-btn-filled" style={{ fontSize: '14px', padding: '14px 28px', textDecoration: 'none', cursor: 'none', justifyContent: 'center', letterSpacing: '0.05em' }} onClick={() => setMenuOpen(false)}>
            BOOK A CALL NOW
          </a>
        </div>
      </div>
    </>
  )
}
