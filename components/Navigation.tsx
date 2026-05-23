'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const serviceItems = [
  'Video Editing',
  'Graphic Design',
  'Social Media Marketing',
  'Sales & Business Development',
  'Staff Augmentation',
  'Website Development',
]

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services', hasDropdown: true },
  { label: 'Portfolio', href: '#works' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* ── Desktop: fixed vertical left sidebar ── */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '240px',
          background: '#070714',
          borderRight: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '36px 28px',
          zIndex: 100,
        }}
        className="sidebar-nav"
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            textDecoration: 'none',
            display: 'block',
            lineHeight: 1,
          }}
        >
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
          <span style={{ display: 'block', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--fg-muted)', textTransform: 'uppercase', marginTop: '3px' }}>Studio</span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navLinks.map((link) => {
            const isActive = activeLink === link.label
            return (
              <div key={link.label}>
                <a
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label)
                    if (link.hasDropdown) setServicesOpen((p) => !p)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#fff' : 'var(--fg-muted)',
                    textDecoration: 'none',
                    background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                    transition: 'background 0.2s, color 0.2s',
                    cursor: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                      ;(e.currentTarget as HTMLElement).style.color = '#fff'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)'
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: isActive ? 'var(--accent)' : 'transparent',
                        border: isActive ? 'none' : '1px solid rgba(255,255,255,0.2)',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                    />
                    {link.label}
                  </span>
                  {link.hasDropdown && (
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      style={{ transition: 'transform 0.25s', transform: servicesOpen ? 'rotate(180deg)' : 'none', opacity: 0.5 }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </a>

                {/* Services dropdown */}
                {link.hasDropdown && servicesOpen && (
                  <div style={{ paddingLeft: '28px', paddingTop: '4px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {serviceItems.map((item) => (
                      <a
                        key={item}
                        href="#services"
                        style={{
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.4)',
                          textDecoration: 'none',
                          padding: '6px 8px',
                          borderRadius: '8px',
                          transition: 'color 0.2s, background 0.2s',
                          cursor: 'none',
                          display: 'block',
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.color = '#fff'
                          ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                          ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--fg-muted)' }}>
            <span style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', flexShrink: 0, boxShadow: '0 0 6px #4ade80aa' }} />
            Available for projects
          </div>
          <a href="#contact" className="pill-btn pill-btn-filled" style={{ fontSize: '13px', padding: '11px 18px', justifyContent: 'center', textDecoration: 'none' }}>
            Book a Call
          </a>
        </div>
      </aside>

      {/* ── Mobile: top bar ── */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
          background: '#070714',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', zIndex: 100,
        }}
        className="mobile-nav"
      >
        <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', textDecoration: 'none' }}>
          Film<span style={{ color: 'var(--accent)' }}>FX</span>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'none', padding: '4px' }}>
          {[
            menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            undefined,
            menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          ].map((transform, i) => (
            <span key={i} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--fg)', transition: 'all 0.25s', transform: transform ?? 'none', opacity: i === 1 ? (menuOpen ? 0 : 1) : 1 }} />
          ))}
        </button>
      </header>

      {menuOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, background: 'rgba(8,8,28,0.98)', borderBottom: '1px solid var(--border)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 99 }} className="mobile-nav">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ fontSize: '17px', fontWeight: 500, color: 'var(--fg)', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid var(--border)' }} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="pill-btn pill-btn-filled" style={{ marginTop: '10px', justifyContent: 'center', textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
            Book a Call
          </a>
        </div>
      )}
    </>
  )
}
