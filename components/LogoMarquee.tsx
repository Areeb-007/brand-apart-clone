'use client'

const items = [
  'J.Thomas',
  'Matt',
  'Teo',
  'Albert',
  'Shahmir',
  'Williem',
  'Mike',
  'Tareen Alam',
  'Dmetrey',
  'Kyle',
]

export default function LogoMarquee() {
  const doubled = [...items, ...items]
  return (
    <section style={{ padding: '28px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', overflow: 'hidden', background: 'var(--bg-card)' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 32px', whiteSpace: 'nowrap', gap: '32px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', transition: 'color 0.3s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--fg-muted)')}
            >{item}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', opacity: 0.5, flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </section>
  )
}
