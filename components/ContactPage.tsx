'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Navigation from '@/components/Navigation'
import SiteFooter, { BOOK_CALL_HREF } from '@/components/SiteFooter'
import { plexMono } from '@/lib/fonts'

// Contact page — layout, form styling and motion ported from
// brandappart.com/contact: black hero with the title + "book a call" link
// on the left and the project form in a bordered card on the right
// (two-column underline fields, custom dropdowns, consent box, full-width
// cream submit), followed by the shared dark SiteFooter.
//
// NOTE: the form isn't wired to a backend yet — submitting validates and
// shows the confirmation state only. Hook `submitEnquiry` up to an email
// service / API route before going live.

const SERVICES = [
  'Video Editing',
  'Graphic Design',
  'Social Media Marketing',
  'Sales and Business Development',
  'Staff Augmentation',
]

// TODO: confirm real budget ranges with the client.
const BUDGETS = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500 – $5,000',
  '$5,000+',
]

type Fields = {
  name: string; email: string; company: string; website: string
  service: string; budget: string; message: string; consent: boolean
}
type Errors = Partial<Record<keyof Fields, string>>

// Placeholder until a backend is connected — replace with a POST of
// `fields` to an API route / email service.
async function submitEnquiry(fields: Fields) {
  void fields
  await new Promise(r => setTimeout(r, 600))
}

const CSS = `
.cf{--cream:#fbf9ef;--muted:#cabcb5;--mid:#8e827c;--line:#fbf9ef29;--line-soft:#fbf9ef14;--accent:#e77c24;
  background:#000;color:var(--cream);}
.cf-inner{display:grid;grid-template:"intro form" auto / minmax(0,1fr) minmax(0,1fr);gap:3em;padding:6.25em 6em 6.25em 12.625em;max-width:1440px;margin:0 auto;}
.cf-intro{grid-area:intro;display:flex;flex-direction:column;align-items:flex-start;gap:2em;}
.cf-title{font-family:var(--font-display);font-weight:700;letter-spacing:-.05em;line-height:.9;font-size:72px;max-width:9em;margin:0;text-wrap:balance;color:var(--cream);}
.cf-talk{display:flex;flex-wrap:wrap;align-items:center;gap:.5em 1em;}
.cf-talk-lead{color:var(--muted);font-size:16px;line-height:1.35;}
.cf-talk-link{display:inline-flex;align-items:center;gap:.5em;height:2.09em;color:var(--cream);text-decoration:none;transition:transform .24s cubic-bezier(.22,.61,.36,1);cursor:none;}
.cf-talk-link:hover{transform:translateY(-2px);}
.cf-talk-label{font-family:var(--font-display);text-transform:uppercase;letter-spacing:-.03em;font-size:13px;font-weight:900;line-height:.8;}
.cf-talk-dot{width:32px;height:32px;border-radius:50%;background:var(--cream);color:#171412;display:flex;align-items:center;justify-content:center;flex:none;}
.cf-form-col{grid-area:form;}
.cf-card{border:1px solid var(--line-soft);background:#fbf9ef0a;border-radius:12px;padding:3em;display:flex;flex-direction:column;}
.cf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2.25em 1.5em;}
.cf-field{display:flex;flex-direction:column;gap:.875em;min-width:0;position:relative;}
.cf-field--wide{grid-column:1/-1;}
.cf-label{color:var(--muted);font-size:11.2px;letter-spacing:.1em;text-transform:uppercase;line-height:1;margin:0;cursor:default;}
.cf-input{border:0;border-bottom:1px solid var(--line);width:100%;color:var(--cream);font:inherit;font-size:18px;line-height:1.3;background:transparent;border-radius:0;outline:none;margin:0;padding:0 0 .75em;display:block;transition:border-color .32s cubic-bezier(.22,.61,.36,1);}
.cf-input::placeholder{color:var(--mid);opacity:1;}
.cf-input:hover{border-bottom-color:var(--mid);}
.cf-input:focus,.cf-choice[data-open] .cf-input{border-bottom-color:var(--accent);}
.cf-input[aria-invalid=true]{border-bottom-color:#ff4b3e;}
.cf-input:-webkit-autofill{-webkit-text-fill-color:var(--cream);caret-color:var(--cream);transition:background-color 600000s;}
.cf-textarea{resize:vertical;min-height:7.5em;}
.cf-error{color:#ff4b3e;margin-top:-.375em;font-size:13px;line-height:1.3;}
.cf-choice-toggle{display:flex;align-items:center;justify-content:space-between;gap:1em;text-align:left;cursor:none;}
.cf-choice-placeholder{color:var(--mid);}
.cf-choice-value,.cf-choice-placeholder{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.cf-choice-arrow{width:12px;height:12px;flex:none;color:var(--muted);transition:transform .32s cubic-bezier(.22,.61,.36,1);}
.cf-choice[data-open] .cf-choice-arrow{transform:rotate(180deg);}
.cf-choice-panel{position:absolute;top:calc(100% + .5em);left:0;right:0;z-index:5;display:flex;flex-direction:column;gap:2px;margin:0;padding:6px;max-height:20em;overflow:auto;border:1px solid var(--line-soft);background:#171412;border-radius:12px;box-shadow:0 18px 40px #0008;}
.cf-choice-option{position:relative;display:flex;align-items:center;gap:.75em;margin:0;padding:.625em .75em;border-radius:8px;font-size:15px;line-height:1.2;cursor:none;transition:background-color .2s;}
.cf-choice-option:hover,.cf-choice-option:has(input:focus-visible){background:var(--line-soft);}
.cf-choice-option input,.cf-consent-input{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px;margin:0;}
.cf-choice-mark,.cf-consent-box{position:relative;flex:none;width:1em;height:1em;border:1px solid var(--line);border-radius:50%;transition:background-color .2s,border-color .2s;}
.cf-consent-box{border-radius:4px;width:1.125em;height:1.125em;margin-top:1px;}
.cf-choice-option input:checked+.cf-choice-mark,.cf-consent-input:checked+.cf-consent-box{border-color:var(--accent);background:var(--accent);}
.cf-choice-option input:checked+.cf-choice-mark:after{content:"";position:absolute;inset:.25em;border-radius:50%;background:#171412;}
.cf-consent-input:checked+.cf-consent-box:after{content:"";position:absolute;top:45%;left:50%;width:.3em;height:.55em;border:solid #171412;border-width:0 2px 2px 0;transform:translate(-50%,-50%) rotate(45deg);}
.cf-consent-input:focus-visible+.cf-consent-box,.cf-choice-option input:focus-visible+.cf-choice-mark{outline:2px solid var(--accent);outline-offset:2px;}
.cf-consent-input[aria-invalid=true]+.cf-consent-box{border-color:#ff4b3e;}
.cf-consent-row{display:flex;flex-direction:column;gap:.5em;margin-top:2em;}
.cf-consent-row .cf-error{margin-top:0;}
.cf-consent{display:flex;align-items:flex-start;gap:.75em;margin:0;color:var(--muted);font-size:14px;line-height:1.35;cursor:none;position:relative;}
.cf-submit{display:block;width:100%;margin-top:2.25em;padding:16px 0;border:0;border-radius:10.5px;background:var(--cream);color:#171412;font-family:var(--font-display);font-size:14px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;cursor:none;transition:opacity .2s,transform .24s;}
.cf-submit:hover{transform:translateY(-1px);}
.cf-submit:focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
.cf-submit:disabled{opacity:.6;cursor:progress;}
.cf-sent{display:flex;flex-direction:column;gap:1.25em;align-items:flex-start;}
.cf-sent-kicker{color:var(--accent);font-size:11.2px;letter-spacing:.1em;text-transform:uppercase;}
.cf-sent-title{font-family:var(--font-display);font-weight:700;letter-spacing:-.05em;line-height:.9;font-size:52px;margin:0;}
.cf-sent-body{max-width:26em;color:var(--muted);margin:0;font-size:18px;line-height:1.35;}
.cf [data-inview]:not(.--visible){opacity:0;transform:translateY(40px);}
.cf [data-inview].--visible{transition:transform .84s cubic-bezier(.22,.61,.36,1),opacity .84s cubic-bezier(.22,.61,.36,1);}
@media (max-width:991px){
  .cf-inner{grid-template:"intro" "form" / minmax(0,1fr);gap:2.5em;padding:5em 1.25em 3em 8.5em;}
  .cf-title{font-size:56px;}
  .cf-card{padding:2em;}
}
@media (max-width:767px){
  .cf-inner{padding-left:1.25em;padding-top:7em;}
  .cf-title{font-size:44px;}
  .cf-card{padding:1.5em 1.25em;}
  .cf-grid{grid-template-columns:minmax(0,1fr);gap:1.75em;}
}
@media (prefers-reduced-motion:reduce){.cf [data-inview]:not(.--visible){opacity:1;transform:none}}
`

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Custom single-select: underline "input" toggle + floating panel of radios.
function Choice({ id, label, placeholder, options, value, onChange }: {
  id: string; label: string; placeholder: string; options: string[]
  value: string; onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey  = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div ref={ref} className="cf-field cf-choice" data-open={open ? '' : undefined}>
      <span id={`${id}-label`} className={`cf-label ${plexMono.className}`}>{label}</span>
      <button
        type="button"
        className="cf-input cf-choice-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? 'cf-choice-value' : 'cf-choice-placeholder'}>{value || placeholder}</span>
        <svg className="cf-choice-arrow" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M6 1.5v9M2 6.5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="cf-choice-panel" role="radiogroup" aria-labelledby={`${id}-label`} hidden={!open}>
        {options.map(opt => (
          <label key={opt} className="cf-choice-option">
            <input
              type="radio" name={id} value={opt} checked={value === opt}
              onChange={() => { onChange(opt); setOpen(false) }}
            />
            <span className="cf-choice-mark" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  )
}

export default function ContactPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [fields, setFields] = useState<Fields>({
    name: '', email: '', company: '', website: '', service: '', budget: '', message: '', consent: false,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }))
  }

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll('[data-inview]')
    if (!els) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('--visible'); io.unobserve(en.target) } })
    }, { rootMargin: '0px 0px -10% 0px' })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Errors = {}
    if (!fields.name.trim()) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = 'Please enter a valid email address.'
    if (!fields.consent) next.consent = 'Please tick the box so we can reply.'
    setErrors(next)
    if (Object.keys(next).length) return
    setStatus('sending')
    await submitEnquiry(fields)
    setStatus('sent')
  }

  const mono = plexMono.className

  return (
    <>
      <Navigation />
      <style>{CSS}</style>

      <div ref={rootRef} className="cf" data-nav-dark>
        <div className="cf-inner">
          {/* ── Intro ── */}
          <div className="cf-intro" data-inview="">
            <h1 className="cf-title">Start a project with us</h1>
            <div className="cf-talk">
              <span className="cf-talk-lead">Prefer a conversation?</span>
              <Link href={BOOK_CALL_HREF} className="cf-talk-link">
                <span className="cf-talk-label">Book a call</span>
                <span className="cf-talk-dot"><Arrow /></span>
              </Link>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="cf-form-col" data-inview="" id="contact-form">
            <div className="cf-card">
              {status === 'sent' ? (
                <div className="cf-sent" role="status">
                  <span className={`cf-sent-kicker ${mono}`}>Message received</span>
                  <h2 className="cf-sent-title">Thanks, {fields.name.split(' ')[0]}.</h2>
                  <p className="cf-sent-body">We&apos;ve got your project details and will get back to you shortly.</p>
                </div>
              ) : (
                <form noValidate onSubmit={handleSubmit}>
                  <div className="cf-grid">
                    <div className="cf-field">
                      <label htmlFor="cf-name" className={`cf-label ${mono}`}>Full name</label>
                      <input id="cf-name" className="cf-input" type="text" autoComplete="name" placeholder="Your full name"
                        value={fields.name} onChange={e => set('name', e.target.value)} aria-invalid={!!errors.name} />
                      {errors.name && <span className="cf-error">{errors.name}</span>}
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-email" className={`cf-label ${mono}`}>Email address</label>
                      <input id="cf-email" className="cf-input" type="email" autoComplete="email" placeholder="you@company.com"
                        value={fields.email} onChange={e => set('email', e.target.value)} aria-invalid={!!errors.email} />
                      {errors.email && <span className="cf-error">{errors.email}</span>}
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-company" className={`cf-label ${mono}`}>Company / Brand</label>
                      <input id="cf-company" className="cf-input" type="text" autoComplete="organization" placeholder="Your company or brand name"
                        value={fields.company} onChange={e => set('company', e.target.value)} />
                    </div>
                    <div className="cf-field">
                      <label htmlFor="cf-website" className={`cf-label ${mono}`}>Website / Social link</label>
                      <input id="cf-website" className="cf-input" type="text" inputMode="url" autoComplete="url" placeholder="Your website or social profile"
                        value={fields.website} onChange={e => set('website', e.target.value)} />
                    </div>
                    <Choice id="cf-service" label="Service required" placeholder="Select a service"
                      options={SERVICES} value={fields.service} onChange={v => set('service', v)} />
                    <Choice id="cf-budget" label="Project budget" placeholder="Select your budget range"
                      options={BUDGETS} value={fields.budget} onChange={v => set('budget', v)} />
                    <div className="cf-field cf-field--wide">
                      <label htmlFor="cf-message" className={`cf-label ${mono}`}>Tell us about your project</label>
                      <textarea id="cf-message" className="cf-input cf-textarea"
                        placeholder="Share your vision, video type, and deadline. Include any footage or references to help us understand the style you’re looking for."
                        value={fields.message} onChange={e => set('message', e.target.value)} />
                    </div>
                  </div>

                  <div className="cf-consent-row">
                    <label className="cf-consent">
                      <input type="checkbox" className="cf-consent-input" checked={fields.consent}
                        onChange={e => set('consent', e.target.checked)} aria-invalid={!!errors.consent} />
                      <span className="cf-consent-box" />
                      I agree to Filmfx Studio using these details to respond to my enquiry.
                    </label>
                    {errors.consent && <span className="cf-error">{errors.consent}</span>}
                  </div>

                  <button type="submit" className="cf-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send project details'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  )
}
