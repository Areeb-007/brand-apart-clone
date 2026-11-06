'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { getCategory, type Category } from '@/lib/categories'
import { useNextBandScrollPct } from '@/components/PortfolioPageKit'

// Bespoke page for Sales & Business Development — a direct port of the
// FilmFX-Studio-Website.html sales page reference (styles, background glows,
// grain, watermarks and copy all match it), with only the fonts swapped for
// the site's own: Fraunces → Outfit (display), Space Grotesk / JetBrains
// Mono → Plus Jakarta Sans. All styles are scoped under `.ffx` so they don't
// leak into the rest of the site. The site's own Navigation and cursor
// replace the reference's header and cursor dot.

const TICKER_WORDS = [
  'Cold Outreach', 'Lead Generation', 'CRM Management', 'Sales Automation',
  'RevOps', 'LinkedIn Growth', 'Client Success',
]

// six condensed service pillars, film-scene framed
const SERVICES: { t: string; tag: string; f: [string, string][] }[] = [
  { t: 'Sales Development', tag: 'The opening scene — getting you in the room', f: [
    ['Cold Email & Calling', 'Personalized outreach that starts real conversations with decision-makers.'],
    ['LinkedIn, SMS & WhatsApp', 'Reach prospects on the channels they actually reply on.'],
    ['Appointment Setting', 'Qualified meetings booked straight onto your calendar.'],
    ['Lead Qualification', 'Only sales-ready prospects reach your team.'],
    ['Follow-up & Re-engagement', 'Multi-touch sequences that revive cold and stalled leads.'],
    ['Pipeline Building', 'A steady, predictable flow of new opportunities.']] },
  { t: 'Lead Generation', tag: 'Casting the right prospects', f: [
    ['B2B & B2C Lead Generation', 'Targeted prospect lists built around your ideal buyers.'],
    ['Contact & Email List Building', 'Verified emails and phone numbers, ready to use.'],
    ['ICP & Buyer Personas', 'A clear picture of exactly who to target and why.'],
    ['Market & Competitor Research', 'Know your landscape before you launch outreach.'],
    ['Account-Based Prospect Lists', 'Hand-picked lists of high-value target accounts.']] },
  { t: 'CRM & Sales Ops', tag: 'The production office, organized', f: [
    ['CRM Setup & Customization', 'Built around your sales process, not a generic template.'],
    ['Migration & Cleanup', 'Move platforms or fix messy data without losing a deal.'],
    ['Pipeline & Deal Tracking', 'Full visibility of every lead and where it stands.'],
    ['Workflow Automation', 'Tasks, reminders, and follow-ups that run themselves.'],
    ['Reporting Dashboards', 'Live KPIs and weekly sales reports.'],
    ['Every Major Platform', 'HubSpot, Salesforce, Pipedrive, GoHighLevel, Zoho, Monday, ClickUp, Airtable.']] },
  { t: 'Business Development', tag: 'Writing the bigger story', f: [
    ['Partnerships & Channel Partners', 'Strategic alliances that open new revenue streams.'],
    ['Client Acquisition', 'Win new customers through proven, repeatable plays.'],
    ['New Market Expansion', 'Enter new regions and segments with a clear plan.'],
    ['Referral Programs', 'Turn happy clients into a steady source of leads.'],
    ['Sales Strategy & Consulting', 'Audits, funnel analysis, pricing, and closing strategy.']] },
  { t: 'Revenue Operations', tag: 'Keeping every department in sync', f: [
    ['Sales & Marketing Alignment', 'One shared process from first click to signed deal.'],
    ['Forecasting & Analytics', 'Know what revenue is coming, and when.'],
    ['KPI Dashboards', 'The numbers that matter, always up to date.'],
    ['Sales Automation', 'Zapier, Make, Clay, Apollo, Instantly, and Smartlead workflows.'],
    ['Data Management', 'Clean, reliable data across every tool.']] },
  { t: 'Client Success & Team', tag: 'The sequel: retention & growth', f: [
    ['Onboarding & Account Management', 'Smooth starts and long-term client relationships.'],
    ['Retention & Renewals', 'Spot at-risk accounts early and keep them.'],
    ['Upselling & Cross-selling', 'Grow revenue from the clients you already have.'],
    ['SDR Hiring & Training', 'Recruit, train, and coach high-performing reps.'],
    ['Virtual SDR Teams & BPO', 'Appointment setters, sales assistants, and CRM admins on demand.']] },
]

const PACKAGES = [
  { n: '01', tier: 'Starter',  name: 'Starter Growth',     hot: false, feats: ['Lead Generation', 'Cold Email', 'CRM Setup', 'Appointment Setting'] },
  { n: '02', tier: 'Feature',  name: 'Growth Accelerator', hot: true,  feats: ['Multi-channel Outreach', 'CRM Management', 'SDR Team', 'Weekly Reporting', 'Sales Dashboard'] },
  { n: '03', tier: 'Premiere', name: 'Revenue Partner',    hot: false, feats: ['Dedicated BD Manager', 'Full Sales Team', 'CRM + Lead Gen', 'Sales Consulting', 'Weekly Strategy Calls'] },
]

const STEPS = [
  { pn: 'Scene i',   h: 'Pre-Production', p: 'Map your ICP, offer, and target markets.' },
  { pn: 'Scene ii',  h: 'Set Design',     p: 'Build CRM, sequences, and dashboards.' },
  { pn: 'Scene iii', h: 'Action',         p: 'Multi-channel outreach goes live.' },
  { pn: 'Scene iv',  h: 'Take One',       p: 'Qualify leads, fill your calendar.' },
  { pn: 'Scene v',   h: 'The Edit',       p: 'Weekly reporting, continuous optimization.' },
]

const DISPLAY = "var(--font-display), 'Outfit', sans-serif"
const SANS    = "var(--font-sans), 'Plus Jakarta Sans', sans-serif"

const CSS = `
.ffx{
  --black:#0a0a0a;--charcoal:#111110;--white:#f6f3ee;--grey:#8f8d84;
  --line:rgba(246,243,238,0.13);--accent:#ff5a2d;--accent2:#26d0ce;
  background:var(--black);color:var(--white);font-family:${SANS};
  overflow-x:hidden;position:relative;
}
.ffx ::selection{background:var(--accent);color:#0a0a0a;}
.ffx a{color:inherit;text-decoration:none;}
.ffx ul{list-style:none;margin:0;padding:0;}
.ffx h1,.ffx h2,.ffx h3,.ffx h4,.ffx p{margin:0;}

.ffx .grain{
  position:fixed;inset:0;z-index:3;pointer-events:none;opacity:0.05;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.ffx .container{max-width:1140px;margin:0 auto;padding:0 40px;position:relative;}

.ffx .watermark{
  position:absolute;top:-40px;right:0;font-family:${DISPLAY};font-style:italic;font-weight:500;
  font-size:clamp(120px,18vw,280px);line-height:1;color:transparent;
  -webkit-text-stroke:1px rgba(246,243,238,0.09);
  z-index:0;pointer-events:none;user-select:none;
}

.ffx .sprockets{display:flex;gap:14px;padding:16px 40px;overflow:hidden;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.ffx .sprockets span{width:8px;height:8px;border-radius:2px;background:var(--line);flex-shrink:0;}

.ffx .hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:170px 0 70px;position:relative;overflow:hidden;}
.ffx .blob{position:absolute;border-radius:50%;filter:blur(110px);z-index:0;opacity:0.35;}
.ffx .blob.orange{width:520px;height:520px;background:var(--accent);top:-160px;left:-140px;}
.ffx .blob.teal{width:480px;height:480px;background:var(--accent2);bottom:-200px;right:-120px;opacity:0.22;}
.ffx .hero-bg-text{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);white-space:nowrap;
  font-family:${DISPLAY};font-style:italic;font-size:clamp(140px,26vw,420px);
  color:transparent;-webkit-text-stroke:1px rgba(246,243,238,0.05);z-index:0;pointer-events:none;
}
.ffx .hero .eyebrow{
  font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:var(--grey);
  margin-bottom:30px;display:flex;align-items:center;gap:14px;position:relative;z-index:2;
}
.ffx .hero .eyebrow::before{content:'';width:32px;height:1px;background:var(--accent);}
.ffx .hero .eyebrow .blink{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ffx-blink 1.6s infinite;}
@keyframes ffx-blink{0%,100%{opacity:1;}50%{opacity:0.2;}}
.ffx .hero h1{
  font-family:${DISPLAY};font-weight:300;
  font-size:clamp(46px,8.6vw,124px);line-height:0.96;letter-spacing:-0.02em;
  max-width:1020px;position:relative;z-index:2;
}
.ffx .hero h1 em{font-style:italic;color:var(--accent);}
.ffx .hero .sub{
  display:flex;justify-content:space-between;align-items:flex-end;
  margin-top:56px;gap:40px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:32px;
  position:relative;z-index:2;
}
.ffx .hero .sub p{max-width:420px;color:var(--grey);font-size:16px;line-height:1.65;}
.ffx .hero-ctas{display:flex;align-items:center;gap:30px;}

.ffx .btn{
  display:inline-flex;align-items:center;gap:10px;font-size:14px;text-transform:uppercase;
  letter-spacing:0.08em;padding-bottom:6px;border-bottom:1px solid var(--white);transition:all .3s;
  cursor:none;background:none;border-top:0;border-left:0;border-right:0;color:var(--white);font-family:inherit;
}
.ffx .btn:hover{border-color:var(--accent);color:var(--accent);gap:16px;}
.ffx .btn.filled{border:none;background:var(--white);color:var(--black);padding:16px 30px;border-radius:2px;}
.ffx .btn.filled:hover{background:var(--accent);color:#0a0a0a;gap:10px;}

.ffx .marquee-wrap{overflow:hidden;white-space:nowrap;padding:22px 0;border-bottom:1px solid var(--line);}
.ffx .marquee{display:inline-flex;animation:ffx-scroll 30s linear infinite;}
.ffx .marquee span{
  font-family:${SANS};font-size:13px;letter-spacing:0.06em;color:var(--grey);
  padding:0 26px;display:inline-flex;align-items:center;gap:26px;text-transform:uppercase;
}
.ffx .marquee span::after{content:'✦';color:var(--accent);font-size:11px;}
@keyframes ffx-scroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}

.ffx section{padding:150px 0;position:relative;}
.ffx .row-head{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:80px;gap:40px;flex-wrap:wrap;}
.ffx .idx{font-family:${SANS};font-size:13px;color:var(--accent);letter-spacing:0.08em;margin-bottom:18px;display:block;text-transform:uppercase;}
.ffx .row-head h2{font-family:${DISPLAY};font-weight:300;font-size:clamp(34px,4.6vw,58px);letter-spacing:-0.01em;max-width:640px;line-height:1.05;}
.ffx .row-head h2 em{color:var(--accent);font-style:italic;}
.ffx .row-head p{color:var(--grey);font-size:15px;max-width:280px;line-height:1.65;}

.ffx .service-list{border-top:1px solid var(--line);position:relative;z-index:2;}
.ffx .service-row{border-bottom:1px solid var(--line);padding:42px 0;display:block;transition:padding .3s;position:relative;}
.ffx .service-row summary{display:grid;grid-template-columns:70px 1fr auto;gap:30px;align-items:center;cursor:none;list-style:none;}
.ffx .service-row:hover{padding-left:14px;}
.ffx .service-row .n{font-family:${SANS};font-size:14px;color:var(--grey);font-variant-numeric:tabular-nums;}
.ffx .service-row h3{font-family:${DISPLAY};font-weight:300;font-size:clamp(24px,3.2vw,38px);transition:color .3s;}
.ffx .service-row:hover h3{color:var(--accent);}
.ffx .service-row .tag{display:block;font-family:${SANS};font-size:13px;color:var(--grey);margin-top:6px;font-weight:400;}
.ffx .service-row .arrow{
  width:38px;height:38px;border:1px solid var(--line);border-radius:50%;
  display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .3s;flex-shrink:0;
}
.ffx .service-row[open] .arrow{transform:rotate(135deg);border-color:var(--accent);color:var(--accent);}
.ffx .service-row summary::-webkit-details-marker{display:none;}
.ffx .service-body{margin:30px 0 0 100px;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:22px 48px;}
.ffx .service-body li{position:relative;padding-left:22px;font-size:14px;line-height:1.6;color:var(--grey);}
.ffx .service-body li::before{content:'';position:absolute;left:0;top:8px;width:7px;height:7px;border-radius:50%;background:var(--accent);}
.ffx .service-body li b{display:block;color:var(--white);font-weight:500;font-size:15.5px;margin-bottom:2px;}

.ffx .pkg-row{border-top:1px solid var(--line);position:relative;z-index:2;}
.ffx .pkg{
  display:grid;grid-template-columns:150px 1fr 230px;gap:40px;align-items:center;
  padding:50px 0;border-bottom:1px solid var(--line);position:relative;transition:padding .3s;
}
.ffx .pkg:hover{padding-left:14px;}
.ffx .pkg .tier{font-family:${SANS};font-size:12.5px;color:var(--accent2);letter-spacing:0.06em;text-transform:uppercase;}
.ffx .pkg .tier b{display:block;font-family:${DISPLAY};font-style:italic;font-size:30px;color:var(--white);margin-top:6px;font-weight:400;text-transform:none;letter-spacing:0;}
.ffx .pkg h3{font-family:${DISPLAY};font-weight:300;font-size:clamp(26px,3vw,36px);margin-bottom:14px;}
.ffx .pkg .feats{color:var(--grey);font-size:14.5px;line-height:1.7;}
.ffx .pkg .feats span:not(:last-child)::after{content:' · ';}
.ffx .pkg .btn{justify-self:start;}
.ffx .pkg.hot .tier b{color:var(--accent);}

.ffx .process-grid{position:relative;z-index:2;display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line);}
.ffx .pstep{background:var(--black);padding:42px 24px;transition:background .3s;}
.ffx .pstep:hover{background:var(--charcoal);}
.ffx .pstep .pn{font-family:${DISPLAY};font-style:italic;font-size:15px;color:var(--accent2);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.04em;}
.ffx .pstep h4{font-family:${DISPLAY};font-weight:300;font-size:23px;margin-bottom:12px;}
.ffx .pstep p{font-size:13.5px;color:var(--grey);line-height:1.6;}

.ffx .industry-text{
  position:relative;z-index:2;font-family:${DISPLAY};font-weight:300;font-style:italic;
  font-size:clamp(24px,3.4vw,38px);line-height:1.55;color:var(--grey);max-width:920px;
}
.ffx .industry-text b{font-weight:500;font-style:normal;color:var(--white);}

.ffx section.cta{text-align:center;padding:110px 0;position:relative;overflow:hidden;}
.ffx .cta h2{font-family:${DISPLAY};font-weight:300;font-style:italic;font-size:clamp(38px,6.4vw,80px);line-height:1.05;margin-bottom:46px;position:relative;z-index:2;}
.ffx .cta h2 .accent{color:var(--accent);}
.ffx .cta-ctas{position:relative;z-index:2;display:flex;justify-content:center;gap:30px;flex-wrap:wrap;}

.ffx .contact-grid{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:80px;}
.ffx .contact-info h2{font-family:${DISPLAY};font-weight:300;font-size:clamp(30px,3.6vw,44px);margin-bottom:34px;}
.ffx .contact-info h2 em{color:var(--accent);font-style:italic;}
.ffx .contact-info .item{padding:22px 0;border-bottom:1px solid var(--line);}
.ffx .contact-info .k{font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:var(--grey);margin-bottom:8px;}
.ffx .contact-info .v{font-family:${DISPLAY};font-size:22px;}
.ffx form{display:flex;flex-direction:column;gap:0;}
.ffx .field{border-bottom:1px solid var(--line);padding:18px 0;}
.ffx .field label{font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:var(--grey);display:block;margin-bottom:8px;}
.ffx .field input,.ffx .field select,.ffx .field textarea{width:100%;background:transparent;border:none;color:var(--white);font-family:${SANS};font-size:17px;outline:none;}
.ffx .field select option{background:var(--black);}
.ffx .field textarea{resize:none;min-height:50px;}
.ffx form .btn.filled{margin-top:30px;align-self:flex-start;border:1px solid var(--white);background:transparent;color:var(--white);}
.ffx form .btn.filled:hover{background:var(--white);color:var(--black);}

.ffx .ffx-footer{border-top:1px solid var(--line);padding:60px 0 40px;}
.ffx .footer-top{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:30px;margin-bottom:40px;}
.ffx .footer-top h3{font-family:${DISPLAY};font-style:italic;font-weight:300;font-size:clamp(28px,4vw,44px);max-width:440px;line-height:1.15;}
.ffx .footer-top h3 em{color:var(--accent2);font-style:italic;}
.ffx .footer-row{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;padding-top:30px;border-top:1px solid var(--line);}
.ffx .logo{font-family:${DISPLAY};font-size:15px;font-weight:500;letter-spacing:-0.01em;display:flex;align-items:center;gap:9px;}
.ffx .logo .rec{width:8px;height:8px;border-radius:50%;background:var(--accent);}
.ffx .footer-row .fmeta{font-size:12.5px;color:var(--grey);text-transform:uppercase;letter-spacing:0.06em;}
.ffx .footer-row .flinks{display:flex;gap:24px;font-size:12.5px;color:var(--grey);text-transform:uppercase;letter-spacing:0.06em;}
.ffx .footer-row .flinks a:hover{color:var(--white);}

.ffx .reveal{opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease;}
.ffx .reveal.in{opacity:1;transform:translateY(0);}

@media(max-width:900px){
  .ffx .process-grid{grid-template-columns:1fr 1fr;}
  .ffx .pkg{grid-template-columns:1fr;gap:14px;}
  .ffx .pkg .btn{margin-top:6px;}
  .ffx .contact-grid{grid-template-columns:1fr;gap:50px;}
  .ffx .service-row summary{grid-template-columns:40px 1fr auto;gap:16px;}
  .ffx .service-body{margin-left:0;grid-template-columns:1fr;}
  .ffx .watermark,.ffx .hero-bg-text{display:none;}
}
@media(max-width:560px){
  .ffx .process-grid{grid-template-columns:1fr;}
  .ffx section{padding:100px 0;}
  .ffx .container{padding:0 24px;}
  .ffx .sprockets{padding:14px 24px;}
}
`

export default function SalesMarketingPage({ category }: { category: Category }) {
  const rootRef      = useRef<HTMLDivElement>(null)
  const nextBandRef  = useRef<HTMLAnchorElement>(null)
  const nextCategory = getCategory(category.nextSlug)
  const scrollPct    = useNextBandScrollPct(nextBandRef)

  // reveal on scroll
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('.reveal')
    if (!els) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) } })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const btn = e.currentTarget.querySelector('.btn')
    if (btn) btn.textContent = 'Sent ✓'
  }

  return (
    <>
      <Navigation />
      <style>{CSS}</style>

      <div ref={rootRef} className="ffx" data-nav-dark>
        <div className="grain" />

        {/* ── Hero ── */}
        <section className="hero" data-nav-dark>
          <div className="blob orange" />
          <div className="blob teal" />
          <div className="hero-bg-text">ACTION</div>
          <div className="container">
            <div className="eyebrow"><span className="blink" /> Sales &amp; Business Development — Now In Production</div>
            <h1>Lights. Camera.<br /><em>Pipeline.</em></h1>
            <div className="sub">
              <p>FilmFX Studio scripts your outreach, casts your leads, and directs every deal to close — so qualified meetings just show up on your calendar.</p>
              <div className="hero-ctas">
                <a href="#contact" className="btn filled">Book a Call →</a>
                <a href="#services" className="btn">See The Reel ↓</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Marquee ── */}
        <div className="marquee-wrap">
          <div className="marquee">
            {[...TICKER_WORDS, ...TICKER_WORDS].map((w, i) => <span key={i}>{w}</span>)}
          </div>
        </div>

        {/* ── Services: six scenes ── */}
        <section id="services" data-nav-dark>
          <div className="container">
            <div className="watermark">SCRIPT</div>
            <div className="row-head">
              <div>
                <span className="idx">01 — The Script</span>
                <h2>Six scenes.<br />One story: <em>growth.</em></h2>
              </div>
              <p>Every act your revenue engine needs. Click a line to read the scene.</p>
            </div>
            <div className="service-list">
              {SERVICES.map((s, i) => (
                <details key={s.t} className="service-row reveal">
                  <summary>
                    <div className="n">0{i + 1}</div>
                    <div><h3>{s.t}</h3><span className="tag">{s.tag}</span></div>
                    <div className="arrow">+</div>
                  </summary>
                  <ul className="service-body">
                    {s.f.map(([b, d]) => <li key={b}><b>{b}</b>{d}</li>)}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Packages ── */}
        <section id="packages" data-nav-dark>
          <div className="container">
            <div className="watermark">SCREEN</div>
            <div className="row-head">
              <div>
                <span className="idx">02 — Now Screening</span>
                <h2>Three ways<br />into the <em>picture.</em></h2>
              </div>
              <p>Pick your seat. Every package scales with your stage.</p>
            </div>
            <div className="pkg-row">
              {PACKAGES.map(p => (
                <div key={p.name} className={`pkg reveal${p.hot ? ' hot' : ''}`}>
                  <div className="tier">Tier {p.n}<b>{p.tier}</b></div>
                  <div>
                    <h3>{p.name}</h3>
                    <div className="feats">{p.feats.map(f => <span key={f}>{f}</span>)}</div>
                  </div>
                  <a href="#contact" className="btn">Get Started →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="sprockets">
          {Array.from({ length: 60 }, (_, i) => <span key={i} />)}
        </div>

        {/* ── Process ── */}
        <section id="process" data-nav-dark>
          <div className="container">
            <div className="watermark">TAKE 01</div>
            <div className="row-head">
              <div>
                <span className="idx">03 — Behind The Scenes</span>
                <h2>How we shoot<br />the <em>pipeline.</em></h2>
              </div>
            </div>
            <div className="process-grid reveal">
              {STEPS.map(s => (
                <div key={s.pn} className="pstep"><div className="pn">{s.pn}</div><h4>{s.h}</h4><p>{s.p}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Industries ── */}
        <section id="industries" data-nav-dark>
          <div className="container">
            <div className="row-head" style={{ marginBottom: '40px' }}>
              <div>
                <span className="idx">04 — The Cast</span>
                <h2>Featuring brands<br />across <em>every</em> industry.</h2>
              </div>
            </div>
            <p className="industry-text reveal">
              Now starring <b>marketing agencies</b>, <b>SaaS</b> &amp; <b>AI startups</b>, <b>real estate</b>, <b>healthcare</b>, <b>law &amp; accounting firms</b>, <b>construction</b>, <b>e-commerce</b>, <b>logistics</b>, <b>finance</b>, <b>IT &amp; consulting firms</b>, and <b>education, hospitality &amp; wellness</b> brands ready for their close-up.
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta" data-nav-dark>
          <div className="blob orange" style={{ top: 'auto', bottom: '-200px', left: '10%' }} />
          <div className="blob teal" style={{ top: '-200px', right: '10%', bottom: 'auto' }} />
          <div className="container">
            <h2>Roll camera on<br />your <span className="accent">pipeline.</span></h2>
            <div className="cta-ctas"><a href="#contact" className="btn filled">Book Your Free Audit →</a></div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" data-nav-dark>
          <div className="container contact-grid">
            <div className="contact-info reveal">
              <span className="idx">05 — Casting Call</span>
              <h2>Let&apos;s write<br />your next <em>act.</em></h2>
              <div className="item"><div className="k">Email</div><div className="v">hello@filmfxstudio.com</div></div>
              <div className="item"><div className="k">Response Time</div><div className="v">Within 24 hours</div></div>
              <div className="item"><div className="k">Availability</div><div className="v">Booking Q3 2026</div></div>
            </div>
            <form className="reveal" onSubmit={handleSubmit}>
              <div className="field"><label>Full Name</label><input type="text" placeholder="Jane Doe" required /></div>
              <div className="field"><label>Work Email</label><input type="email" placeholder="jane@company.com" required /></div>
              <div className="field">
                <label>What do you need?</label>
                <select>
                  <option>Lead Generation</option>
                  <option>SDR / Appointment Setting</option>
                  <option>CRM Management</option>
                  <option>Full Revenue Partner Package</option>
                </select>
              </div>
              <div className="field"><label>Goals</label><textarea placeholder="What does growth look like this year?" /></div>
              <button className="btn filled">Send Message →</button>
            </form>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="ffx-footer">
          <div className="container">
            <div className="footer-top">
              <h3>That&apos;s a wrap. Let&apos;s put your <em>pipeline</em> into production.</h3>
              <a href="#contact" className="btn filled">Book a Call →</a>
            </div>
            <div className="footer-row">
              <div className="logo"><span className="rec" />FilmFX Studio</div>
              <div className="fmeta">© 2026 — Directed, Produced &amp; Delivered.</div>
              <div className="flinks"><a href="#services">Services</a><a href="#packages">Packages</a><a href="#contact">Contact</a></div>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Next project ── */}
      {nextCategory && (
        <Link
          ref={nextBandRef}
          href={`/services/${nextCategory.slug}`}
          data-nav-dark
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '18px', textDecoration: 'none', cursor: 'none',
            background: category.accent,
            padding: 'clamp(48px,7vw,90px) clamp(24px,4vw,60px)',
          }}
        >
          <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', margin: 0 }}>
            (Next project)
          </p>
          <h3 style={{
            fontFamily: "'Youth', Arial, sans-serif",
            fontSize: 'clamp(40px, 9vw, 140px)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#fff',
            margin: 0,
            textAlign: 'center',
          }}>
            {nextCategory.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <span>Keep scrolling</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{scrollPct}%</span>
          </div>
        </Link>
      )}
    </>
  )
}
