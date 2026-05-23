'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    slug: 'video-editing',
    title: 'Video Editing',
    tagline: 'WE CUT STORIES INTO CINEMA.',
    description: 'At FilmFX Studio, we don\'t just edit clips — we craft stories. From transitions to pacing, color tone to sound flow, we shape every frame to keep your audience hooked and your message unforgettable.',
    client: 'TEO',
    clientQuote: 'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Truly impressive work.',
    image: '/images/services-cards/video-editing.png',
    bg: '#E63B2E',
    carousel: ['/images/portfolio/ve-1.jpg', '/images/portfolio/ve-2.jpg', '/images/portfolio/ve-3.jpg', '/images/portfolio/ve-4.jpg'],
  },
  {
    slug: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'DESIGNS THAT SPEAK BEFORE YOU DO.',
    description: 'Great design is silent marketing — and we make it loud. At FilmFX Studio, we create aesthetic, high-impact visuals from posters to branding and social media creatives, designed to match your identity and leave a lasting impression.',
    client: 'MATT',
    clientQuote: 'FilmFX Studio created amazing custom designs that elevated our brand. Talented and creative team.',
    image: '/images/services-cards/graphic-designing.png',
    bg: '#5844D4',
    carousel: ['/images/portfolio/gd-1.jpg', '/images/portfolio/gd-2.jpg', '/images/portfolio/gd-3.jpg', '/images/portfolio/gd-4.jpg'],
  },
  {
    slug: 'smm',
    title: 'Social Media Marketing',
    tagline: 'WE DON\'T CHASE TRENDS — WE CREATE THEM.',
    description: 'Social media isn\'t just posting — it\'s positioning. We create smart strategies, content flow, and campaigns that make people stop scrolling and start engaging, building brand presence and turning audiences into loyal followers.',
    client: 'J. THOMAS',
    clientQuote: 'FilmFX Studio doubled our social media engagement in 2 months with smart, creative strategies and clear communication.',
    image: '/images/services-cards/smm.png',
    bg: '#11204B',
    carousel: ['/images/portfolio/smm-1.jpg', '/images/portfolio/smm-2.jpg', '/images/portfolio/smm-3.jpg', '/images/portfolio/smm-4.jpg'],
  },
  {
    slug: 'sales-marketing',
    title: 'Sales & Marketing',
    tagline: 'WE MARKET WITH ONE GOAL: RESULTS.',
    description: 'Marketing without sales is noise. Our sales marketing focuses on targeting the right audience, delivering the right message, and turning interest into action — helping your business grow faster, smarter, and stronger.',
    client: 'KEVIN',
    clientQuote: 'FilmFX Studio boosted our leads quickly with smart, well-executed marketing. They deliver real growth, not just promises.',
    image: '/images/services-cards/sales-marketing.png',
    bg: '#F96715',
    carousel: ['/images/portfolio/sm-1.jpg', '/images/portfolio/sm-2.jpg', '/images/portfolio/sm-3.jpg', '/images/portfolio/sm-4.jpg'],
  },
  {
    slug: 'website-development',
    title: 'Website Development',
    tagline: 'WEBSITES BUILT TO IMPRESS AND CONVERT.',
    description: 'Your website is your digital storefront — and we make it unforgettable. From clean UI to smooth UX, speed optimization to mobile responsiveness, we develop websites that feel premium and turn visitors into customers.',
    client: 'JASMINE',
    clientQuote: 'FilmFX Studio provided practical business insights and an actionable roadmap that helped us secure key partnerships.',
    image: '/images/services-cards/website-development.png',
    bg: '#8B7D5C',
    carousel: ['/images/portfolio/wd-1.jpg', '/images/portfolio/wd-2.jpg', '/images/portfolio/wd-3.jpg', '/images/portfolio/wd-4.jpg'],
  },
  {
    slug: 'staff-augmentation',
    title: 'Staff Augmentation',
    tagline: 'EXPAND YOUR WORKFORCE EFFORTLESSLY.',
    description: 'Get the right talent exactly when you need it. From skilled professionals to flexible team expansion, we help you scale your workforce without the stress of traditional hiring — so your business keeps moving forward.',
    client: 'ALBERT',
    clientQuote: 'FilmFX Studio helped us scale fast with the right talent, meet deadlines, and maintain quality.',
    image: '/images/services-cards/staff-augmentation.png',
    bg: '#1DB027',
    carousel: ['/images/portfolio/work-1.png', '/images/portfolio/work-2.png', '/images/portfolio/work-3.png', '/images/portfolio/work-4.png'],
  },
]

export default function Services() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    rowRefs.current.forEach((row) => {
      if (!row) return
      gsap.fromTo(
        row,
        { y: 48, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
    })
  }, [])

  return (
    <section id="services" style={{ padding: '100px 0 80px', background: 'var(--bg-card)' }}>
      {/* Header */}
      <div style={{ padding: '0 48px', marginBottom: '64px' }}>
        <p className="section-tag" style={{ marginBottom: '10px' }}>What We Do</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--fg)', maxWidth: '600px' }}>
          Services built for<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--fg-muted)' }}>ambitious brands.</span>
        </h2>
      </div>

      {/* Service rows */}
      {services.map((svc, i) => (
        <div
          key={svc.slug}
          ref={(el) => { rowRefs.current[i] = el }}
          style={{ borderTop: '1px solid var(--border)', padding: '0 48px' }}
        >
          {/* Service card image + info row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', padding: '56px 0 40px' }}>
            {/* Left: service card image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative', aspectRatio: '840/490', border: '1px solid var(--border)' }}>
              <Image
                src={svc.image}
                alt={svc.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>

            {/* Right: text + testimonial */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: 'var(--fg-muted)' }}>0{i + 1}</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--fg)', marginBottom: '8px' }}>{svc.title}</h3>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '16px' }}>{svc.tagline}</p>
              <p style={{ fontSize: '14px', color: 'var(--fg-muted)', lineHeight: 1.8, marginBottom: '28px' }}>{svc.description}</p>

              {/* Testimonial */}
              <div style={{ padding: '20px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '14px' }}>
                <p style={{ fontSize: '13px', color: 'var(--fg-muted)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '12px' }}>
                  &ldquo;{svc.clientQuote}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: svc.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                    {svc.client[0]}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--fg)', letterSpacing: '0.05em' }}>{svc.client}</span>
                  <div style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: '#FBBF24', fontSize: '12px' }}>★</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel strip */}
          <div style={{ overflow: 'hidden', paddingBottom: '40px', margin: '0 -48px', paddingLeft: '0' }}>
            <div className="service-strip">
              {[...svc.carousel, ...svc.carousel].map((src, j) => (
                <div key={j} style={{ width: '280px', height: '180px', borderRadius: '12px', overflow: 'hidden', position: 'relative', flexShrink: 0, marginRight: '12px', border: '1px solid var(--border)' }}>
                  <Image src={src} alt={`${svc.title} work ${j + 1}`} fill style={{ objectFit: 'cover' }} sizes="280px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
