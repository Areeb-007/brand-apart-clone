// Subcategories nested under a category (e.g. /services/video-editing/wedding-video).
// Only wedding-video, short-form-videos and real-estate-videos have real
// client-provided copy + charm art so far — the other 4 Video Editing entries
// are placeholders (marked below) until that content is provided.
export type Subcategory = {
  slug: string
  categorySlug: string
  name: string          // portfolio/brand title, e.g. "WeddingCuts"
  gridLabel: string      // short type label shown on the category page's grid tile, e.g. "Wedding video"
  igName: string
  igUrl: string
  tagline: string       // short type label, e.g. "Real Estate Video Editing" — '' if none
  bottomLine: string    // the main evocative line
  services: string[]
  description: string[] // paragraphs
  bg: string             // hero background color — black is reserved for Morph Studio
  logo?: string          // optional brand logo image, rendered instead of the text title
  cover: string
  portfolioVideos?: string[] // optional grid of actual portfolio clips, shown as autoplay boxes
  charmsDir: string      // '' if no charm set yet
  charmCount: number
}

export const SUBCATEGORIES: Subcategory[] = [
  {
    slug: 'wedding-video',
    categorySlug: 'video-editing',
    name: 'The Wedding Cuts',
    gridLabel: 'Wedding video',
    igName: 'The Wedding Cuts',
    igUrl: 'https://www.instagram.com/theweddingcuts/',
    tagline: '',
    bottomLine: 'Capturing love stories with cinematic elegance',
    services: ['Wedding Video Editing', 'Cinematic Highlights', 'Reels', 'Teasers', 'Color Grading'],
    description: [
      'For The Wedding Cuts, editing is about preserving the heartbeat of a love story. From dreamy bridal entries to golden-hour portraits, every frame is shaped with storytelling, music sync, soft color tones, and cinematic finishing — turning real moments into timeless films couples can relive forever.',
    ],
    bg: '#02200B',
    cover: '/images/portfolio/we-ve-1.jpg',
    charmsDir: '/images/charms/wedding-video',
    charmCount: 4,
  },
  {
    slug: 'short-form-videos',
    categorySlug: 'video-editing',
    name: 'Morph Studio',
    gridLabel: 'Short form videos',
    igName: 'morph.studio0',
    igUrl: 'https://www.instagram.com/morph.studio0/',
    tagline: 'Short-Form Video Editing',
    bottomLine: 'Short videos that stop the scroll',
    services: [
      'UGC ads', 'Instagram Reels', 'TikTok edits', 'YouTube Shorts', 'Product promos',
      'Talking-head edits', 'Meme videos', 'Brand reels', 'High-retention social content',
    ],
    description: [
      'Morph Studio is built for brands and creators who need short-form video that works instantly — every cut, caption, hook, and transition designed to stop the scroll. From viral edits and talking-head videos to meme edits and brand reels, we focus on sharp storytelling, fast pacing, and platform-ready formatting that performs, not just looks good.',
    ],
    bg: '#000',
    logo: '/images/logos/morph-studio.png',
    cover: '/images/portfolio/we-ve-2.jpg',
    charmsDir: '/images/charms/short-form-videos',
    charmCount: 9,
  },
  {
    slug: 'youtube-videos',
    categorySlug: 'video-editing',
    // placeholder — real content pending
    name: 'YouTube Videos',
    gridLabel: 'Youtube videos',
    igName: '',
    igUrl: '',
    tagline: 'YouTube Video Editing',
    bottomLine: 'Long-form storytelling that keeps viewers watching.',
    services: ['YouTube Editing', 'Thumbnails', 'Intros & Outros', 'Sound Design', 'Color Grading'],
    description: [
      'Content coming soon — this page will showcase FilmFX Studio’s YouTube editing work once finalized.',
    ],
    bg: '#CC0012',
    cover: '/images/portfolio/ve-1.jpg',
    charmsDir: '',
    charmCount: 0,
  },
  {
    slug: 'real-estate-videos',
    categorySlug: 'video-editing',
    name: 'The Nexa Homes',
    gridLabel: 'Real estate videos',
    igName: 'thenexahomes',
    igUrl: 'https://www.instagram.com/thenexahomes/',
    tagline: 'Real Estate Video Editing',
    bottomLine: 'Cinematic real estate videos that sell the lifestyle, not just the property.',
    services: [
      'Real estate reels', 'Luxury property tours', 'Apartment walkthroughs', 'Drone footage edits',
      'Listing videos', 'Interior showcases', 'Social media ads', 'Commercial property videos', 'Cinematic home highlights',
    ],
    description: [
      'The Nexa Homes showcases properties through cinematic storytelling, clean editing, and high-end visual presentation — from luxury villas to commercial spaces. With professional color grading, motion graphics, and social-ready formats, every listing feels premium, inviting, and ready to sell.',
    ],
    bg: '#3B2FC9',
    cover: '/images/portfolio/we-ve-3.jpg',
    charmsDir: '/images/charms/real-estate-videos',
    charmCount: 2,
  },
  {
    slug: 'documentaries',
    categorySlug: 'video-editing',
    name: 'Documentaries',
    gridLabel: 'Documentaries',
    igName: '',
    igUrl: '',
    tagline: 'Film & Documentary Editing',
    bottomLine: 'Documentary video editing crafted to inform, inspire, and connect.',
    services: [
      'Brand documentaries', 'Mini-docs', 'Interview-based films', 'Social impact stories',
      'YouTube documentaries', 'Founder stories', 'Event documentaries', 'Nonprofit films',
      'Educational documentaries', 'Cinematic storytelling videos',
    ],
    description: [
      'The DocuCut turns real footage into powerful visual narratives — from interviews and archival clips to cinematic B-roll and emotional sound design. Every edit focuses on story structure, pacing, and honest visual direction, whether it’s a brand documentary, founder story, or social impact film.',
    ],
    bg: '#FFED02',
    cover: '/images/portfolio/ve-2.jpg',
    charmsDir: '/images/charms/documentaries',
    charmCount: 9,
  },
  {
    slug: 'promotional-videos',
    categorySlug: 'video-editing',
    name: 'Promotional Videos',
    gridLabel: 'Promotional videos',
    igName: '',
    igUrl: '',
    tagline: 'Promotional Video Production',
    bottomLine: 'Promotional videos that turn attention into action.',
    services: [
      'Product promos', 'Brand launches', 'Social ads', 'Reels', 'Shorts',
      'UGC ads', 'Website promos', 'Campaign videos',
    ],
    description: [
      'Clara B Media helps brands stand out with promotional videos that capture attention fast and make people act — built for Instagram, TikTok, YouTube, and ad campaigns. From product launches to brand awareness videos, every edit focuses on strong hooks, clean visuals, and conversion-focused pacing.',
    ],
    bg: '#0DEB24',
    cover: '/images/portfolio/ve-3.jpg',
    charmsDir: '/images/charms/promotional-videos',
    charmCount: 6,
  },
  {
    slug: 'ai-videos',
    categorySlug: 'video-editing',
    name: 'AI Videos',
    gridLabel: 'AI videos',
    igName: '',
    igUrl: '',
    tagline: 'AI Video Production',
    bottomLine: 'Where AI Meets Cinematic Creativity.',
    services: [
      'AI-generated videos', 'AI product videos', 'AI brand campaigns', 'Social media reels',
      'Motion graphics', 'Visual effects', 'Avatar videos', 'Talking head edits', 'Ad creatives',
      'Cinematic edits', 'Explainer videos', 'Promo videos', 'Marketing videos', 'Design animations',
      'AI-powered video editing',
    ],
    description: [
      'Onyx.AI is a creative AI video portfolio built for the future of visual content — AI-generated videos, cinematic edits, and digital storytelling that help brands communicate faster and smarter. Every project combines AI technology with professional editing and motion design for high-impact, modern content.',
    ],
    bg: '#8000FF',
    cover: '/images/portfolio/ve-4.jpg',
    portfolioVideos: Array.from({ length: 21 }, (_, i) => `/videos/ai-videos/clip-${i + 1}.mp4`),
    charmsDir: '/images/charms/ai-videos',
    charmCount: 5,
  },
  {
    slug: 'long-form-video',
    categorySlug: 'video-editing',
    name: 'Long Form Lab',
    gridLabel: 'Long form video',
    igName: '',
    igUrl: '',
    tagline: 'Long Form Video Editing',
    bottomLine: 'Long form editing focused on clarity, pace, and retention.',
    services: ['YouTube Videos', 'Podcasts', 'Interviews', 'Documentaries', 'Tutorials', 'Webinars', 'Courses', 'Brand Films'],
    description: [
      'Long Form Lab crafts long-form videos that hold attention and build trust — from YouTube videos and podcasts to documentaries and brand films. Every edit focuses on clean structure, smooth pacing, and audience retention, turning raw footage into a polished, platform-ready viewing experience.',
    ],
    bg: '#0003FF',
    cover: '/images/portfolio/ve-1.jpg',
    charmsDir: '/images/charms/long-form-video',
    charmCount: 4,
  },
]

export function getSubcategoriesFor(categorySlug: string): Subcategory[] {
  return SUBCATEGORIES.filter(s => s.categorySlug === categorySlug)
}

export function getSubcategory(categorySlug: string, slug: string): Subcategory | undefined {
  return SUBCATEGORIES.find(s => s.categorySlug === categorySlug && s.slug === slug)
}

export function charmPaths(sub: Subcategory): string[] {
  if (!sub.charmsDir || !sub.charmCount) return []
  return Array.from({ length: sub.charmCount }, (_, i) => `${sub.charmsDir}/charm-${i + 1}.png`)
}
