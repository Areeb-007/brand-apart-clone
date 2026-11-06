'use client'

import { useEffect, useRef, useState } from 'react'
import { plexMono } from '@/lib/fonts'

// Remaining About-page sections from Tab 6 of the client's content doc,
// laid out after brandappart.com/about's lower half:
//  • AboutWorkflow     → "We embed in your team" (dark heading row + card rail)
//  • AboutTestimonials → "Founders keep us close" (overlapping card stack)
//  • AboutThinking     → manifesto header (kicker + title left, intro right)
//  • AboutFAQ          → manifesto rows (big numeral + question), as an accordion
// All blocks fade up 40px as they enter view, like the reference.

const DARK = '#171412'
const CREAM = '#fbf9ef'
const CARD_DARK = '#241f1d'

const CSS = `
.am [data-inview]:not(.--visible){opacity:0;transform:translateY(40px);}
.am [data-inview].--visible{transition:transform .84s cubic-bezier(.22,.61,.36,1),opacity .84s cubic-bezier(.22,.61,.36,1);}
.am-wrap{max-width:1100px;margin:0 auto;padding:0 clamp(20px,4vw,48px);}
.am-title{font-family:var(--font-display);font-weight:700;letter-spacing:-.04em;line-height:.9;font-size:clamp(2.25rem,5vw,4.5rem);margin:0;}
.am-kicker{display:block;margin-bottom:26px;font-size:11.2px;letter-spacing:.1em;text-transform:uppercase;line-height:1;}
.am-lede{max-width:28em;margin:0;font-size:clamp(17px,1.5vw,20px);line-height:1.3;}
.am-row{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:24px 40px;}
.am-rail{display:flex;gap:16px;margin-top:clamp(40px,5vw,64px);overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;}
.am-rail::-webkit-scrollbar{display:none;}
.am-card{scroll-snap-align:start;flex:1 0 min(250px,78vw);min-height:360px;border-radius:12px;background:${CARD_DARK};padding:32px;display:flex;flex-direction:column;justify-content:space-between;gap:16px;text-align:left;}
.am-card-num{font-family:var(--font-display);font-weight:700;letter-spacing:-.04em;font-size:clamp(2.5rem,4vw,3.5rem);line-height:.8;color:var(--accent);}
.am-card b{display:block;font-family:var(--font-display);font-weight:700;letter-spacing:-.03em;font-size:clamp(1.3rem,1.9vw,1.7rem);line-height:.95;color:${CREAM};margin-bottom:14px;}
.am-card p{margin:0;color:${CREAM};opacity:.72;font-size:14px;line-height:1.45;}
.am-stack{display:flex;margin-top:clamp(40px,5vw,64px);overflow-x:auto;scrollbar-width:none;gap:16px;padding-bottom:12px;}
.am-stack::-webkit-scrollbar{display:none;}
.am-stack-item{flex:none;width:min(300px,72vw);border-radius:12px;overflow:hidden;box-shadow:0 18px 40px #0007;transition:transform .5s cubic-bezier(.22,.61,.36,1);}
.am-stack-item img{display:block;width:100%;height:auto;}
@media (min-width:900px){
  .am-stack{gap:0;overflow:visible;justify-content:center;}
  .am-stack-item{width:22vw;max-width:320px;}
  .am-stack-item:not(:first-child){margin-left:-6vw;}
  .am-stack-item:nth-child(odd){transform:rotate(-3deg);}
  .am-stack-item:nth-child(even){transform:rotate(3deg) translateY(24px);}
  .am-stack-item:hover{transform:rotate(0) translateY(-16px) scale(1.04);z-index:5;}
}
.am-head{display:grid;grid-template-columns:1fr 1fr;align-items:end;gap:clamp(24px,5vw,72px);}
.am-faq-row{border-top:1px solid #ebe9df;}
.am-faq-row:last-child{border-bottom:1px solid #ebe9df;}
.am-faq-btn{width:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:baseline;gap:clamp(24px,5vw,72px);padding:clamp(28px,3.5vw,44px) 0;background:none;border:0;text-align:left;color:inherit;font:inherit;cursor:none;}
.am-faq-num{font-family:var(--font-display);font-weight:700;letter-spacing:-.04em;font-size:clamp(2.5rem,5.5vw,5.5rem);line-height:.8;color:var(--fg);transition:color .3s;}
.am-faq-btn:hover .am-faq-num,.am-faq-row[data-open] .am-faq-num{color:var(--accent);}
.am-faq-q{display:flex;justify-content:space-between;gap:20px;align-items:baseline;font-size:clamp(1.15rem,1.8vw,1.6rem);font-weight:500;line-height:1.15;letter-spacing:-.01em;color:var(--fg);}
.am-faq-plus{flex:none;width:32px;height:32px;border-radius:50%;border:1px solid var(--border,#0001);display:flex;align-items:center;justify-content:center;font-size:18px;transition:transform .3s,background .3s,color .3s;}
.am-faq-row[data-open] .am-faq-plus{transform:rotate(45deg);background:var(--fg);color:#fff;}
.am-faq-a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.22,.61,.36,1);}
.am-faq-row[data-open] .am-faq-a{grid-template-rows:1fr;}
.am-faq-a-inner{min-height:0;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,5vw,72px);}
.am-faq-a p{grid-column:2;margin:0 0 clamp(28px,3.5vw,44px);max-width:46ch;color:var(--fg-muted);font-size:16px;line-height:1.6;}
@media (max-width:760px){
  .am-head,.am-faq-btn,.am-faq-a-inner{grid-template-columns:1fr;gap:14px;}
  .am-faq-a p{grid-column:1;}
}
@media (prefers-reduced-motion:reduce){.am [data-inview]:not(.--visible){opacity:1;transform:none}}
`

// Fade-up for every [data-inview] inside the given root, once.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-inview]')
    if (!els) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('--visible'); io.unobserve(en.target) } })
    }, { rootMargin: '0px 0px -10% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

/* ── Workflow ─────────────────────────────────────────────────────── */

const WORKFLOW = [
  { n: '01', title: 'Project Brief & Asset Collection', copy: 'Share your brief, footage, and references through Asana, Trello, WhatsApp, or WeTransfer. Our project manager reviews your materials and confirms the requirements to establish a clear direction before editing begins.' },
  { n: '02', title: 'Specialist Assignment & Editing', copy: 'Your project is assigned to an editor with expertise in the relevant category, including motion graphics, wedding films, or short-form content. The editor develops the video according to your brief and creative direction.' },
  { n: '03', title: 'Quality Review & Revisions', copy: 'Each video is reviewed by our project manager, followed by founder and senior video editor Noman Khan. After internal approval, we share the draft with you and coordinate any revisions based on your feedback.' },
  { n: '04', title: 'Final Approval & Delivery', copy: 'Once revisions are complete and you approve the final version, we deliver the finished video in the agreed formats. Payment is then completed to close the project.' },
]

export function AboutWorkflow() {
  const ref = useInView<HTMLElement>()
  return (
    <section ref={ref} className="am" data-nav-dark style={{ background: DARK, color: CREAM, padding: '0 0 clamp(84px,10vw,140px)' }}>
      <style href="about-more" precedence="default">{CSS}</style>
      <div className="am-wrap">
        <div className="am-row">
          <h2 className="am-title" data-inview="" style={{ color: CREAM }}>Your vision.<br />Expertly managed.</h2>
          <p className="am-lede" data-inview="" style={{ color: '#fbf9ef99' }}>
            From understanding your brief to refining the final edit, we give every stage a clear direction. A dedicated project manager connects you with the right editing specialist and guides your project through review, revisions, and delivery.
          </p>
        </div>
        <div className="am-rail" data-inview="">
          {WORKFLOW.map(step => (
            <article key={step.n} className="am-card">
              <span className="am-card-num">{step.n}</span>
              <div>
                <b>{step.title}</b>
                <p>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Testimonials ─────────────────────────────────────────────────── */

const TESTIMONIALS = [
  { src: '/images/about/testimonials/1.jpg', alt: 'Boss Media: “I love working with Filmfx Studio, they make our lives easy as an agency owner…”' },
  { src: '/images/about/testimonials/2.jpg', alt: 'Teo: “Noman is a great editor and listens to feedback and revisions very well…”' },
  { src: '/images/about/testimonials/3.jpg', alt: 'Matt: “Filmfx Studio does more than just edit videos, they bring our creative ideas to life…”' },
  { src: '/images/about/testimonials/4.jpg', alt: 'William: “Working with Filmfx Studio has been a game changer…”' },
  { src: '/images/about/testimonials/5.jpg', alt: 'J. Thomas: “Working with Ali Arsala has been a fantastic experience…”' },
]

export function AboutTestimonials() {
  const ref = useInView<HTMLElement>()
  return (
    <section ref={ref} className="am" data-nav-dark style={{ background: DARK, color: CREAM, padding: 'clamp(84px,10vw,140px) 0', overflow: 'hidden' }}>
      <style href="about-more" precedence="default">{CSS}</style>
      <div className="am-wrap">
        <div className="am-row">
          <h2 className="am-title" data-inview="" style={{ color: CREAM }}>
            Our work.<br /><span style={{ color: '#8e827c' }}>Their words.</span>
          </h2>
          <p className="am-lede" data-inview="" style={{ color: '#fbf9ef99' }}>
            Hear from the brands, creators, and production teams we’ve worked with—from the first brief to the final delivery.
          </p>
        </div>
      </div>
      <div className="am-stack" data-inview="" style={{ padding: '0 clamp(20px,4vw,48px) 12px' }}>
        {TESTIMONIALS.map(t => (
          <div key={t.src} className="am-stack-item">
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-designed testimonial card */}
            <img src={t.src} alt={t.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Thinking ─────────────────────────────────────────────────────── */

export function AboutThinking() {
  const ref = useInView<HTMLElement>()
  return (
    <section ref={ref} className="am" style={{ background: 'var(--bg)', padding: 'clamp(84px,10vw,140px) 0 clamp(40px,5vw,64px)' }}>
      <style href="about-more" precedence="default">{CSS}</style>
      <div className="am-wrap">
        <div className="am-head">
          <div data-inview="">
            <span className={`am-kicker ${plexMono.className}`} style={{ color: 'var(--fg-muted)' }}>The thinking behind the edit</span>
            <h2 className="am-title" style={{ color: 'var(--fg)' }}>Make it clear.<br />Make it felt.<br />Make it stay.</h2>
          </div>
          <p className="am-lede" data-inview="" style={{ color: 'var(--fg-muted)', maxWidth: '40ch' }}>
            We believe memorable videos begin with a clear idea. Every cut, animation, and sound choice should strengthen that idea, giving viewers something to understand, connect with, and remember. That’s the thinking we bring to every Filmfx Studio project.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── FAQ ──────────────────────────────────────────────────────────── */

const FAQ: [string, string][] = [
  ['How many revisions are included?', 'Each video includes 3–4 rounds of revisions. Additional rounds are available for a small fee, depending on the scope of the changes.'],
  ['Can you help with content ideas and scripting?', 'Yes. While video editing is our primary focus, we can help with basic scripting, content planning, and ideas tailored to your niche and audience.'],
  ['What is your turnaround time?', 'Short-form videos, including reels, shorts, and ads, typically take 48–56 hours. Long-form videos generally take 3–5 business days. We confirm the timeline based on your project’s requirements.'],
  ['How do I share my footage?', 'We provide a Google Drive or Frame.io folder for your footage, scripts, and references. You can also send your files using WeTransfer links.'],
  ['How will we communicate?', 'Your project manager stays in touch through email, WhatsApp, or Microsoft Teams. We can also coordinate tasks and feedback through Asana or Trello, depending on your preference.'],
  ['When do I make payment?', 'For individual projects, we issue the invoice after you approve the final video, with payment due shortly after delivery. Monthly clients are billed between the 1st and 10th of each month.'],
  ['Can you deliver videos in multiple formats?', 'Yes. We can deliver your video in vertical 9:16, square 1:1, widescreen 16:9, or another required format. Let us know where you plan to publish it before editing begins.'],
  ['Can you reuse my footage for future edits?', 'Yes. We can turn existing footage into fresh content. We store your footage for 30 days after final delivery, so let us know within that period if you’d like additional edits.'],
  ['Can you match my brand’s existing video style?', 'Absolutely. Share your previous videos, brand guidelines, or visual references. We’ll align the editing, colours, typography, and motion graphics with your established style.'],
  ['What do you do in AI?', 'We create AI-powered video ads for DTC and eCommerce brands. Our services include realistic AI UGC, AI avatar videos, product-focused ads, and creative variations designed for paid social campaigns.'],
  ['Can you create realistic AI avatar videos?', 'Yes. We create realistic AI avatar videos with natural-looking presenters, voiceovers, scripts, and brand-specific messaging tailored to your target audience.'],
  ['Who are your services for?', 'We primarily work with DTC, eCommerce, and consumer brands that need a consistent flow of engaging video creatives for platforms such as Meta, TikTok, and other paid social channels.'],
  ['Can you create multiple variations of the same ad?', 'Absolutely. We can create different hooks, angles, scripts, creators, and formats so brands can test multiple creative concepts and identify what performs best.'],
  ['Can you create videos for my existing product?', 'Yes. You can provide your product information, images, videos, website, or existing marketing assets, and we can turn them into engaging AI-powered video ads.'],
  ['Do you offer revisions?', 'Yes. We work with clients through a defined revision process to make sure the final creatives align with their brand, messaging, and campaign requirements.'],
  ['How can I get started?', 'Simply contact us with your brand details, product information, and creative requirements. We’ll discuss your goals and recommend the best AI video creative approach for your brand.'],
]

function FaqRow({ n, q, a }: { n: number; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${n}`
  return (
    <div className="am-faq-row" data-inview="" data-open={open ? '' : undefined}>
      <button type="button" className="am-faq-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
        <span className="am-faq-num">{String(n).padStart(2, '0')}</span>
        <span className="am-faq-q">
          {q}
          <span className="am-faq-plus" aria-hidden>+</span>
        </span>
      </button>
      <div id={id} className="am-faq-a" role="region">
        <div className="am-faq-a-inner"><p>{a}</p></div>
      </div>
    </div>
  )
}

export function AboutFAQ() {
  const ref = useInView<HTMLElement>()
  return (
    <section ref={ref} className="am" style={{ background: 'var(--bg)', padding: '0 0 clamp(84px,10vw,140px)' }}>
      <style href="about-more" precedence="default">{CSS}</style>
      <div className="am-wrap">
        {FAQ.map(([q, a], i) => <FaqRow key={q} n={i + 1} q={q} a={a} />)}
      </div>
    </section>
  )
}
