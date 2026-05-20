'use client'

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'X (Twitter)', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'Dribbble', href: '#' },
]

const links = [
  { label: 'Works', href: '#works' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        padding: '64px 40px 40px',
        borderTop: '1px solid var(--border)',
        background: 'var(--fg)',
        color: 'var(--bg)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '64px',
            flexWrap: 'wrap',
            gap: '40px',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '360px' }}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: '16px',
              }}
            >
              brand<span style={{ opacity: 0.4 }}>appart</span>
            </div>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              The design partner for top-tier companies. Branding, product design, and web design
              that drives real business results.
            </p>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '16px',
                }}
              >
                Navigation
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = 'rgba(255,255,255,1)')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginBottom: '16px',
                }}
              >
                Social
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = 'rgba(255,255,255,1)')
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
                      }
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            © 2024 Brand Appart. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a
              href="#"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)')
              }
            >
              Privacy Policy
            </a>
            <a
              href="#"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.3)')
              }
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
