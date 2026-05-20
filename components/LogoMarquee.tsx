'use client'

const logos = [
  'Forbes',
  'Incard',
  'Sowbeez',
  'Stripe',
  'Notion',
  'Linear',
  'Vercel',
  'Loom',
  'Pitch',
  'Runway',
]

function LogoItem({ name }: { name: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 48px',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          opacity: 0.25,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.25')}
      >
        {name}
      </span>
    </div>
  )
}

export default function LogoMarquee() {
  const doubled = [...logos, ...logos]

  return (
    <section
      style={{
        padding: '48px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <div className="marquee-track">
        {doubled.map((logo, i) => (
          <LogoItem key={i} name={logo} />
        ))}
      </div>
    </section>
  )
}
