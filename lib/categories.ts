// One entry per "What We Do" service — these are the 6 top-level category
// pages (e.g. /services/video-editing). Content below is placeholder copy
// reusing existing site assets; swap in real copy/images per category as
// they're finalized. Only "video-editing" has been designed/reviewed so far.
export type Category = {
  slug: string
  name: string
  year: string
  industry: string
  tagline: string
  description: string
  overview: string
  cover: string
  gallery: string[]
  credits: { role: string; name: string }[]
  testimonial: { quote: string; author: string; role: string; photo: string }
  accent: string
  nextSlug: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'video-editing',
    name: 'Video Editing',
    year: '2024',
    industry: 'Video Production',
    tagline: 'Cinematic edits that capture & convert.',
    description:
      'We don\'t just edit clips, we craft stories. From transitions to pacing, colour tone to sound flow, every frame is shaped to keep your audience hooked.',
    overview:
      'We partnered with FilmFX Studio to deliver a full suite of cinematic video edits — from brand promos and social reels to event highlights and corporate films. Each project was approached with a director\'s eye: precise pacing, purposeful transitions, and colour grading that amplifies the mood. The result is content that stops the scroll and stays in memory.',
    cover: '/images/covers/video-editing.png',
    gallery: [
      '/images/portfolio/we-ve-1.jpg',
      '/images/portfolio/we-ve-2.jpg',
      '/images/portfolio/we-ve-3.jpg',
      '/images/portfolio/we-ve-4.jpg',
      '/images/portfolio/ve-1.jpg',
      '/images/portfolio/ve-2.jpg',
      '/images/portfolio/ve-3.jpg',
      '/images/portfolio/ve-4.jpg',
    ],
    credits: [
      { role: 'Creative Director', name: 'Ayesha Khan' },
      { role: 'Lead Editor', name: 'Daniyal Ahmed' },
      { role: 'Colourist', name: 'Sara Malik' },
      { role: 'Sound Designer', name: 'Hamza Tariq' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio delivered a cinematic, high-quality edit ahead of schedule. Their attention to detail and fast communication made the whole process seamless.',
      author: 'TEO',
      role: 'Founder, Content Studio',
      photo: '/images/clients/teo.png',
    },
    accent: '#3B2FC9',
    nextSlug: 'graphic-design',
  },
  {
    slug: 'graphic-design',
    name: 'Graphic Design',
    year: '2024',
    industry: 'Brand & Design',
    tagline: 'Designs that speak before you do.',
    description:
      'Great design is silent marketing, and we make it loud. High-impact visuals from posters to branding and social creatives, designed to leave a lasting impression.',
    overview:
      'We worked with FilmFX Studio to build a cohesive visual language that communicates at a glance — social creatives, branding assets, print materials, and digital collateral, all unified by a bold, purposeful design system.',
    cover: '/images/covers/graphic-design.png',
    gallery: [
      '/images/portfolio/we-gd-1.jpg',
      '/images/portfolio/we-gd-2.jpg',
      '/images/portfolio/we-gd-3.jpg',
      '/images/portfolio/we-gd-4.jpg',
    ],
    credits: [
      { role: 'Creative Director', name: 'Ayesha Khan' },
      { role: 'Art Director', name: 'Bilal Farooq' },
      { role: 'Graphic Designer', name: 'Mahnoor Iqbal' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio created amazing custom designs that elevated our brand. Talented and creative team.',
      author: 'MATT',
      role: 'Creative Director',
      photo: '/images/clients/matt.png',
    },
    accent: '#C9302F',
    nextSlug: 'smm',
  },
  {
    slug: 'smm',
    name: 'Social Media Marketing',
    year: '2024',
    industry: 'Digital Marketing',
    tagline: 'We don\'t chase trends, we create them.',
    description:
      'Smart strategies and campaigns that make people stop scrolling and start engaging, building brand presence that turns audiences into loyal followers.',
    overview:
      'A full social media marketing strategy for FilmFX Studio — content calendars, campaign ideation, creative direction, and growth analytics, tailored per platform.',
    cover: '/images/covers/social-media.png',
    gallery: [
      '/images/portfolio/we-smm-1.jpg',
      '/images/portfolio/we-smm-2.jpg',
      '/images/portfolio/we-smm-3.jpg',
      '/images/portfolio/we-smm-4.jpg',
    ],
    credits: [
      { role: 'Strategy Lead', name: 'Bilal Farooq' },
      { role: 'Content Creator', name: 'Mahnoor Iqbal' },
      { role: 'Community Manager', name: 'Hamza Tariq' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio doubled our social media engagement in 2 months with smart, creative strategies.',
      author: 'J. THOMAS',
      role: 'Head of Growth',
      photo: '/images/clients/j-thomas.png',
    },
    accent: '#C96B14',
    nextSlug: 'sales-marketing',
  },
  {
    slug: 'sales-marketing',
    name: 'Sales & Business Development',
    year: '2024',
    industry: 'Business Growth',
    tagline: 'Marketing with one goal: results.',
    description:
      'Targeting the right audience, delivering the right message, and turning interest into action, helping your business grow faster, smarter, and stronger.',
    overview:
      'Targeted outreach strategies, pitch deck creation, lead generation campaigns, and sales funnel optimisation, combining storytelling with data-driven targeting.',
    cover: '/images/covers/business-dev.png',
    gallery: [
      '/images/portfolio/we-bd-1.jpg',
      '/images/portfolio/we-bd-2.jpg',
      '/images/portfolio/we-bd-3.jpg',
      '/images/portfolio/we-bd-4.jpg',
    ],
    credits: [
      { role: 'Growth Lead', name: 'Daniyal Ahmed' },
      { role: 'Sales Strategist', name: 'Sara Malik' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio boosted our leads quickly with smart marketing. Real growth, not just promises.',
      author: 'KEVIN',
      role: 'CEO, Growth Agency',
      photo: '/images/clients/boss-media.png',
    },
    accent: '#2563EB',
    nextSlug: 'website-development',
  },
  {
    slug: 'website-development',
    name: 'Website Development',
    year: '2024',
    industry: 'Web & Digital',
    tagline: 'Websites built to impress & convert.',
    description:
      'Your digital storefront, made unforgettable. Clean UI, smooth UX, speed optimisation and responsiveness: sites that turn visitors into customers.',
    overview:
      'End-to-end website builds — from UX wireframes to launch — with clean interfaces, fast performance, and conversion-focused design.',
    cover: '/images/covers/video-editing.png',
    gallery: [
      '/images/portfolio/wd-1.jpg',
      '/images/portfolio/wd-2.jpg',
      '/images/portfolio/wd-3.jpg',
      '/images/portfolio/wd-4.jpg',
    ],
    credits: [
      { role: 'Web Designer', name: 'Bilal Farooq' },
      { role: 'Front-end Developer', name: 'Daniyal Ahmed' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio built a site that helped us secure key partnerships. Truly outstanding work.',
      author: 'JASMINE',
      role: 'Founder, E-commerce Brand',
      photo: '/images/clients/avatar-4.png',
    },
    accent: '#7C3AED',
    nextSlug: 'staff-augmentation',
  },
  {
    slug: 'staff-augmentation',
    name: 'Staff Augmentation',
    year: '2024',
    industry: 'Talent & Operations',
    tagline: 'Expand your workforce effortlessly.',
    description:
      'Get the right talent exactly when you need it. Flexible team expansion, no stress of traditional hiring, your business keeps moving forward.',
    overview:
      'Flexible team expansion for FilmFX Studio\'s partners — sourcing, vetting, and onboarding the right talent fast, without the overhead of traditional hiring.',
    cover: '/images/covers/business-dev.png',
    gallery: [
      '/images/portfolio/we-sa-1.jpg',
      '/images/portfolio/we-sa-2.jpg',
      '/images/portfolio/we-sa-3.jpg',
      '/images/portfolio/we-sa-4.jpg',
    ],
    credits: [
      { role: 'Operations Lead', name: 'Sara Malik' },
      { role: 'Talent Manager', name: 'Mahnoor Iqbal' },
      { role: 'Project Manager', name: 'Fatima Noor' },
    ],
    testimonial: {
      quote:
        'FilmFX Studio helped us scale fast with the right talent, meet deadlines, and maintain quality.',
      author: 'ALBERT',
      role: 'Operations Director',
      photo: '/images/clients/avatar-5.png',
    },
    accent: '#DB2777',
    nextSlug: 'video-editing',
  },
]

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug)
}
