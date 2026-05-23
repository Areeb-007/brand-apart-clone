'use client'

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube',   href: '#' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Behance',   href: '#' },
  { label: 'TikTok',    href: '#' },
]

const links = [
  { label: 'Home',      href: '#' },
  { label: 'Services',  href: '#services' },
  { label: 'Portfolio', href: '#works' },
  { label: 'About Us',  href: '#about' },
  { label: 'Contact',   href: '#contact' },
]

const services = ['Video Editing', 'Graphic Design', 'Social Media Marketing', 'Sales & Marketing', 'Staff Augmentation', 'Website Development']

export default function Footer() {
  return (
    <footer style={{ padding: '64px 48px 40px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '56px', flexWrap: 'wrap', gap: '40px' }}>
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '4px', color: 'var(--fg)' }}>
              Film<span style={{ color: 'var(--accent)' }}>FX</span>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', color: 'var(--fg-muted)', textTransform: 'uppercase', marginTop: '2px' }}>Studio</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fg-muted)', lineHeight: 1.7, marginTop: '12px' }}>
              Your creative partner for high-impact video edits, graphic design, social media marketing, and digital growth.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} style={{ padding: '5px 12px', border: '1px solid var(--border)', borderRadius: '100px', fontSize: '11px', fontWeight: 600, color: 'var(--fg-muted)', textDecoration: 'none', transition: 'all 0.2s', cursor: 'none' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)' }}
                >{s.label}</a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.3)', marginBottom: '16px' }}>Navigation</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} style={{ fontSize: '13px', color: 'var(--fg-muted)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'none' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--fg)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)' }}
                    >{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,13,13,0.3)', marginBottom: '16px' }}>Services</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" style={{ fontSize: '13px', color: 'var(--fg-muted)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'none' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--fg)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)' }}
                    >{s}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid rgba(13,13,13,0.08)', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(13,13,13,0.3)' }}>© 2025 FilmFX Studio. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy Policy', 'Terms'].map((t) => (
              <a key={t} href="#" style={{ fontSize: '12px', color: 'rgba(13,13,13,0.3)', textDecoration: 'none', transition: 'color 0.2s', cursor: 'none' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(13,13,13,0.6)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(13,13,13,0.3)' }}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
