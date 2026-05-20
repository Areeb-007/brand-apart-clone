'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 40px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(248, 245, 240, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          textDecoration: 'none',
        }}
      >
        brand<span style={{ opacity: 0.4 }}>appart</span>
      </Link>

      {/* Desktop nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
        className="hidden-mobile"
      >
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--fg-muted)',
            cursor: 'none',
          }}
        >
          FR
        </span>
        <a
          href="#contact"
          className="pill-btn pill-btn-filled"
          style={{ fontSize: '13px', padding: '10px 20px' }}
        >
          Book a call
        </a>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: '4px',
          }}
          className="show-mobile"
        >
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--fg)',
              transition: 'transform 0.25s',
              transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--fg)',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.25s',
            }}
          />
          <span
            style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--fg)',
              transition: 'transform 0.25s',
              transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            background: 'var(--bg)',
            borderBottom: '1px solid var(--border)',
            padding: '24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              style={{ fontSize: '20px' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
