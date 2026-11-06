'use client'

import Navigation from '@/components/Navigation'
import { plexMono } from '@/lib/fonts'
import { MediaBox, SectionEyebrow, useReveal } from '@/components/PortfolioPageKit'
import ScrollRevealText from '@/components/ScrollRevealText'
import TrustedWheel from '@/components/TrustedWheel'
import AboutTeam from '@/components/AboutTeam'
import AboutHero from '@/components/AboutHero'
import { AboutWorkflow, AboutTestimonials, AboutThinking, AboutFAQ } from '@/components/AboutMore'

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

// Philosophy copy — rendered with ScrollRevealText so it darkens letter by
// letter on scroll, like the reference.
const PHILOSOPHY = [
  'A glance held a little longer. A cut that hits the beat. A quiet moment that says everything. At Filmfx Studio, we’re drawn to the details that turn watching into feeling. Through video editing, motion graphics, and sound, we give your ideas a rhythm, a voice, and a world of their own.',
  'Before we touch the timeline, we get curious. What makes your brand yours? Who’s on the other side of the screen? What should stay with them when it goes dark? Those questions guide the work, from the opening of a brand film to the final second of a social edit.',
  'We bring our perspective. You bring a world we haven’t seen yet. Working with brands, creators, and agencies, we turn that exchange into stories with character. We explore, question, and refine—finding the pace, colour, and movement that feel right for you. Every choice helps your story become more clearly, confidently yours.',
  'The film ends. The feeling carries on.',
]

const FOUNDERS = [
  { name: 'Noman Khan',      role: 'Founder',    photo: '/images/about/team/noman-khan.jpg' },
  { name: 'Ali Arsala Sher', role: 'Co-Founder', photo: '/images/about/team/ali-arsala.jpg' },
]

export default function AboutPage() {
  const philosophyRef = useReveal<HTMLDivElement>()
  const sigRef        = useReveal<HTMLDivElement>()

  return (
    <>
      <Navigation />

      {/* ── Hero — sticky showreel, ported from brandappart.com/about ── */}
      <AboutHero />

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

          {/* Closing line is the letter's last paragraph — same style and
              same letter-by-letter reveal, like brandappart's sign-off line. */}
          <ScrollRevealText
            paragraphs={PHILOSOPHY}
            style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', lineHeight: 1.8 }}
          />

          {/* Founder signature — brandappart's sig block: 60px rounded-square
              photo, name, and role in small mono caps; fades up into view. */}
          <div ref={sigRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px clamp(32px,5vw,56px)', marginTop: 'clamp(36px,5vw,60px)' }}>
            {FOUNDERS.map((founder) => (
              <div key={founder.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  position: 'relative', flex: 'none', width: '60px', height: '60px',
                  borderRadius: '6px', overflow: 'hidden', background: 'var(--bg-card)',
                }}>
                  <MediaBox
                    src={founder.photo}
                    alt={founder.name}
                    label={founder.name.slice(0, 2).toUpperCase()}
                  />
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <b style={{ fontSize: '1.05rem', fontWeight: 500, color: 'var(--fg)' }}>{founder.name}</b>
                  <span className={plexMono.className} style={{
                    fontSize: '11px', lineHeight: 1, letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--fg-muted)',
                  }}>
                    {founder.role}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team — layout & motion ported from brandappart.com/about ── */}
      <AboutTeam team={TEAM} />

      {/* ── Trusted by — scroll-turned drum of client names ── */}
      <TrustedWheel />

      {/* ── Remaining sections from Tab 6, after brandappart's lower half ── */}
      <AboutWorkflow />
      <AboutTestimonials />
      <AboutThinking />
      <AboutFAQ />
    </>
  )
}
