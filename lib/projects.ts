export type Project = {
  slug: string
  name: string
  tagline: string
  year: string
  category: string
  description: string
  overview: string
  cover: string
  gallery: string[]
  testimonial: {
    quote: string
    author: string
    role: string
    photo: string
  }
  nextSlug: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'video-editing',
    name: 'Video Editing',
    tagline: 'Cinematic edits that capture and convert.',
    year: '2024',
    category: 'Video Editing',
    description:
      'We don\'t just cut clips — we craft stories. Every edit is shaped to hold attention, build emotion, and drive action.',
    overview:
      'We partnered with FilmFX Studio to deliver a full suite of cinematic video edits — from brand promos and social reels to event highlights and corporate films. Each project was approached with a director\'s eye: precise pacing, purposeful transitions, and colour grading that amplifies the mood. The result is content that stops the scroll and stays in memory.',
    cover: '/images/covers/video-editing.png',
    gallery: [
      '/images/portfolio/ve-1.jpg',
      '/images/portfolio/ve-2.jpg',
      '/images/portfolio/ve-3.jpg',
      '/images/portfolio/ve-4.jpg',
    ],
    testimonial: {
      quote:
        'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Their attention to detail and fast communication made the whole process seamless. Truly one of the best teams we\'ve worked with.',
      author: 'TEO',
      role: 'Founder, Content Studio',
      photo: '/images/testimonials/2.jpg',
    },
    nextSlug: 'graphic-design',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    tagline: 'Designs that speak before you do.',
    year: '2024',
    category: 'Graphic Design',
    description:
      'Great design is silent marketing — and we make it loud. From posters to full brand identities, every visual leaves a lasting impression.',
    overview:
      'We worked with FilmFX Studio to build a cohesive visual language that communicates at a glance. The project spanned social media creatives, branding assets, print materials, and digital collateral — all unified by a bold, purposeful design system that commands attention without shouting.',
    cover: '/images/covers/graphic-design.png',
    gallery: [
      '/images/portfolio/gd-1.jpg',
      '/images/portfolio/gd-2.jpg',
      '/images/portfolio/gd-3.jpg',
      '/images/portfolio/gd-4.jpg',
    ],
    testimonial: {
      quote:
        'FilmFX Studio created amazing custom designs that elevated our brand. Professional, easy to work with, and always open to collaborating — they made everything just right.',
      author: 'MATT',
      role: 'Creative Director',
      photo: '/images/testimonials/3.jpg',
    },
    nextSlug: 'social-media',
  },
  {
    slug: 'social-media',
    name: 'Social Media',
    tagline: 'We don\'t chase trends — we create them.',
    year: '2024',
    category: 'Social Media Marketing',
    description:
      'Smart strategies that make people stop scrolling and start engaging — building brand presence that turns audiences into loyal followers.',
    overview:
      'We developed a full social media marketing strategy for FilmFX Studio — content calendars, campaign ideation, creative direction, and growth analytics. Each platform was treated differently: reels optimised for virality, carousels designed for saves, stories crafted for connection. The outcome was sustained, organic growth backed by data and creativity.',
    cover: '/images/covers/social-media.png',
    gallery: [
      '/images/portfolio/smm-1.jpg',
      '/images/portfolio/smm-2.jpg',
      '/images/portfolio/smm-3.jpg',
      '/images/portfolio/smm-4.jpg',
    ],
    testimonial: {
      quote:
        'FilmFX Studio doubled our social media engagement in just 2 months with smart, creative strategies. They understand both the algorithm and the audience — a rare combination.',
      author: 'J. THOMAS',
      role: 'Head of Growth',
      photo: '/images/testimonials/4.jpg',
    },
    nextSlug: 'business-dev',
  },
  {
    slug: 'business-dev',
    name: 'Business Dev',
    tagline: 'Marketing with one goal: results.',
    year: '2024',
    category: 'Business Development',
    description:
      'Targeting the right audience, delivering the right message, and turning interest into action — helping your business grow faster and stronger.',
    overview:
      'We supported FilmFX Studio\'s business development efforts with targeted outreach strategies, pitch deck creation, lead generation campaigns, and sales funnel optimisation. Every touchpoint was designed to convert — from first impression to signed contract. The approach combined creative storytelling with data-driven targeting to generate real pipeline growth.',
    cover: '/images/covers/business-dev.png',
    gallery: [
      '/images/portfolio/sm-1.jpg',
      '/images/portfolio/sm-2.jpg',
      '/images/portfolio/sm-3.jpg',
      '/images/portfolio/sm-4.jpg',
    ],
    testimonial: {
      quote:
        'FilmFX Studio boosted our leads quickly with smart, targeted marketing. Real growth, not just promises — they truly care about your results and it shows in every deliverable.',
      author: 'KEVIN',
      role: 'CEO, Growth Agency',
      photo: '/images/testimonials/5.jpg',
    },
    nextSlug: 'video-editing',
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
