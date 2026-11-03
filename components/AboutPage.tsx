'use client'

import Navigation from '@/components/Navigation'
import { MediaBox, SectionEyebrow, useReveal } from '@/components/PortfolioPageKit'

// Bespoke About page — modeled on brandappart.com/about's structure (hero,
// founder/philosophy letter, team grid, ...) but every word and asset here is
// FilmFX's own. Built in stages as the client sends each section's content;
// currently covers: Hero, Philosophy ("Where Stories Find Their Pulse"), and
// the Team grid. More sections (stats, testimonials, manifesto, press,
// closing CTA) land the same way once their content arrives.

const TEAM = [
  { name: 'Noman Khan',      role: 'Founder',               photo: '/images/about/team/noman-khan.jpg' },
  { name: 'Ali Arsala Sher', role: 'Co-Founder',             photo: '/images/about/team/ali-arsala.jpg' },
  { name: 'Arsha',           role: 'Graphic Designer',       photo: '/images/about/team/arsha.jpg' },
  { name: 'Alizeh',          role: 'Social Media Marketer',  photo: '/images/about/team/alizeh.png' },
  { name: 'Atika',           role: 'Business Developer',     photo: '/images/about/team/atika.png' },
  { name: 'Zeeshan',         role: 'Business Developer',     photo: '/images/about/team/zeeshan.jpg' },
  { name: 'Wahaj',           role: 'Project Manager',        photo: '/images/about/team/wahaj.jpg' },
  { name: 'Hadeed',          role: 'Video Editor',           photo: '/images/about/team/hadeed.png' },
  { name: 'Khubab',          role: 'Video Editor',           photo: '/images/about/team/khubab.jpg' },
  { name: 'Abdul Nafay',     role: 'Video Editor',           photo: '/images/about/team/abdul-nafay.jpg' },
  { name: 'Moiz',            role: 'Editor',                 photo: '/images/about/team/moiz.jpg' },
]

export default function AboutPage() {
  const philosophyRef = useReveal<HTMLDivElement>()
  const teamIntroRef  = useReveal<HTMLDivElement>()

  return (
    <>
      <Navigation />

      {/* ── Hero ── */}
      <section data-nav-dark style={{ background: '#001941', padding: 'clamp(120px,14vw,160px) clamp(24px,4vw,60px) clamp(80px,10vw,120px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(40px,6vw,80px)' }}>
          <div style={{ flex: '1 1 460px', minWidth: 0 }}>
            <h1 style={{
              fontFamily: "'Youth', Arial, sans-serif",
              fontSize: 'clamp(44px, 6.5vw, 84px)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.98,
              color: '#fff',
              margin: '0 0 24px',
            }}>
              The people behind your next standout story.
            </h1>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(16px, 1.6vw, 20px)',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: 0,
            }}>
              We&apos;re Filmfx Studio. Editors, animators, and creative thinkers. Bringing your vision to life through video editing and motion graphics.
            </p>
          </div>

          <div style={{ flex: '1 1 380px', minWidth: '280px', maxWidth: '520px', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden' }}>
              <MediaBox
                src="/images/about/showreel-poster.jpg"
                alt="Watch the full showreel"
                label={'Drop showreel poster/video here:\npublic/images/about/showreel-poster.jpg'}
              />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.92)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 4l15 8-15 8V4z" fill="#001941" />
                  </svg>
                </div>
              </div>
            </div>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '14px', textAlign: 'center' }}>
              Watch the full showreel
            </p>
          </div>
        </div>
      </section>

      {/* ── Philosophy — "Where Stories Find Their Pulse" ── */}
      <section ref={philosophyRef} style={{ background: 'var(--bg)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <SectionEyebrow>Our Philosophy</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: 'var(--fg)',
            margin: '0 0 32px',
          }}>
            Where Stories Find Their Pulse
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              A glance held a little longer. A cut that hits the beat. A quiet moment that says everything. At Filmfx Studio, we&apos;re drawn to the details that turn watching into feeling. Through video editing, motion graphics, and sound, we give your ideas a rhythm, a voice, and a world of their own.
            </p>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              Before we touch the timeline, we get curious. What makes your brand yours? Who&apos;s on the other side of the screen? What should stay with them when it goes dark? Those questions guide the work, from the opening of a brand film to the final second of a social edit.
            </p>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', color: 'var(--fg-muted)', lineHeight: 1.8, margin: 0 }}>
              We bring our perspective. You bring a world we haven&apos;t seen yet. Working with brands, creators, and agencies, we turn that exchange into stories with character. We explore, question, and refine—finding the pace, colour, and movement that feel right for you. Every choice helps your story become more clearly, confidently yours.
            </p>
          </div>

          <p style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(24px, 3vw, 36px)',
            fontWeight: 800,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            color: 'var(--accent)',
            margin: 'clamp(40px,5vw,56px) 0 clamp(40px,5vw,56px)',
          }}>
            The film ends. The feeling carries on.
          </p>

          {/* Founder signature */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(28px,4vw,48px)' }}>
            {[
              { name: 'Noman Khan', role: 'Founder', photo: '/images/about/team/noman-khan.jpg' },
              { name: 'Ali Arsala Sher', role: 'Co-Founder', photo: '/images/about/team/ali-arsala.jpg' },
            ].map((founder) => (
              <div key={founder.name} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <MediaBox
                    src={founder.photo}
                    alt={founder.name}
                    label={founder.name.slice(0, 2).toUpperCase()}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--fg)' }}>{founder.name}</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                    {founder.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section id="team" style={{ background: 'var(--bg-card)', padding: 'clamp(80px,10vw,120px) clamp(24px,4vw,60px)' }}>
        <div ref={teamIntroRef} style={{ maxWidth: '900px', margin: '0 auto clamp(56px,7vw,80px)', textAlign: 'center' }}>
          <SectionEyebrow>Our Team</SectionEyebrow>
          <h2 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(34px, 4.5vw, 56px)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: 'var(--fg)',
            margin: '0 0 24px',
          }}>
            Different minds.<br />One creative<br />chemistry.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
            Some of us think in sequences. Others in shapes, sound, or movement. Together, we&apos;re Filmfx Studio—a team of editors and motion designers who exchange ideas, challenge each other, and find the details that make a story click.
          </p>
        </div>

        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px',
        }}>
          {TEAM.map((member) => (
            <div key={member.name}>
              <div style={{ aspectRatio: '1/1', borderRadius: '16px', overflow: 'hidden', marginBottom: '14px' }}>
                <MediaBox
                  src={member.photo}
                  alt={member.name}
                  label={`Drop photo here:\npublic${member.photo}`}
                />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--fg)' }}>{member.name}</div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--fg-muted)' }}>{member.role}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
