// Subcategories nested under a category (e.g. /services/video-editing/wedding-video).
// Only wedding-video, short-form-videos and real-estate-videos have real
// client-provided copy + charm art so far — the other 4 Video Editing entries
// are placeholders (marked below) until that content is provided.
export type Subcategory = {
  slug: string
  categorySlug: string
  name: string          // portfolio/brand title, e.g. "WeddingCuts"
  igName: string
  igUrl: string
  tagline: string       // short type label, e.g. "Real Estate Video Editing" — '' if none
  bottomLine: string    // the main evocative line
  services: string[]
  description: string[] // paragraphs
  theme: 'black' | 'accent'
  cover: string
  charmsDir: string      // '' if no charm set yet
  charmCount: number
}

export const SUBCATEGORIES: Subcategory[] = [
  {
    slug: 'wedding-video',
    categorySlug: 'video-editing',
    name: 'WeddingCuts',
    igName: 'The Wedding Cuts',
    igUrl: 'https://www.instagram.com/theweddingcuts/',
    tagline: '',
    bottomLine: 'Capturing love stories with cinematic elegance',
    services: ['Wedding Video Editing', 'Cinematic Highlights', 'Reels', 'Teasers', 'Color Grading'],
    description: [
      'For WeddingCuts, wedding editing is more than arranging clips — it is about preserving the heartbeat of a love story. We take the most meaningful moments of a couple’s special day and shape them into cinematic wedding films filled with romance, elegance, and emotion.',
      'From dreamy bridal entries and emotional vows to golden-hour portraits and joyful celebrations, every frame is edited with intention. Through storytelling, music sync, soft color tones, smooth pacing, and cinematic finishing, WeddingCuts turns wedding memories into timeless films that feel as beautiful as the day itself.',
      'WeddingCuts turns real wedding moments into cinematic memories filled with love, emotion, and elegance. From romantic reels to full wedding highlight films, every edit is crafted with storytelling, music, color, and feeling — so couples can relive their special day forever.',
    ],
    theme: 'accent',
    cover: '/images/portfolio/we-ve-1.jpg',
    charmsDir: '/images/charms/wedding-video',
    charmCount: 4,
  },
  {
    slug: 'short-form-videos',
    categorySlug: 'video-editing',
    name: 'Morph Studio',
    igName: 'morph.studio0',
    igUrl: 'https://www.instagram.com/morph.studio0/',
    tagline: 'Short-Form Video Editing',
    bottomLine: 'Short videos that stop the scroll',
    services: [
      'UGC ads', 'Instagram Reels', 'TikTok edits', 'YouTube Shorts', 'Product promos',
      'Talking-head edits', 'Meme videos', 'Brand reels', 'High-retention social content',
    ],
    description: [
      'The morph studio is built for brands, creators, influencers, and businesses that want to win attention in the fastest-moving space online: short-form video. In a world where people scroll within seconds, every cut, caption, hook, sound, and transition needs to work instantly. The challenge is simple: make short videos that are clear, catchy, engaging, and impossible to ignore.',
      'FilmFX Studio created The morph studio to showcase high retention short video edits designed for platforms like Instagram Reels, TikTok, YouTube Shorts, and social media campaigns. From viral style edits to clean talking head videos, meme edits, product promos, event highlights, cinematic reels, and brand content, every video is crafted to grab attention and keep viewers watching. The morph studio focuses on sharp storytelling, fast paced editing, clean captions, trendy sounds, motion graphics, smooth transitions, color correction, and platform friendly formatting. The goal is not just to make videos look good — it is to make them perform.',
      'Short videos are no longer just content, they are the fastest way to build visibility, trust, and engagement. The morph studio turns raw footage into scroll-stopping videos that feel modern, creative, and made for today’s audience. Every edit is shaped with strong hooks, smooth pacing, visual rhythm, and audience retention in mind. From a simple idea to a polished reel, The morph studio helps brands and creators turn moments into high impact short videos.',
    ],
    theme: 'black',
    cover: '/images/portfolio/we-ve-2.jpg',
    charmsDir: '/images/charms/short-form-videos',
    charmCount: 9,
  },
  {
    slug: 'youtube-videos',
    categorySlug: 'video-editing',
    // placeholder — real content pending
    name: 'YouTube Videos',
    igName: '',
    igUrl: '',
    tagline: 'YouTube Video Editing',
    bottomLine: 'Long-form storytelling that keeps viewers watching.',
    services: ['YouTube Editing', 'Thumbnails', 'Intros & Outros', 'Sound Design', 'Color Grading'],
    description: [
      'Content coming soon — this page will showcase FilmFX Studio’s YouTube editing work once finalized.',
    ],
    theme: 'accent',
    cover: '/images/portfolio/ve-1.jpg',
    charmsDir: '',
    charmCount: 0,
  },
  {
    slug: 'real-estate-videos',
    categorySlug: 'video-editing',
    name: 'The Nexa Homes',
    igName: 'thenexahomes',
    igUrl: 'https://www.instagram.com/thenexahomes/',
    tagline: 'Real Estate Video Editing',
    bottomLine: 'Cinematic real estate videos that sell the lifestyle, not just the property.',
    services: [
      'Real estate reels', 'Luxury property tours', 'Apartment walkthroughs', 'Drone footage edits',
      'Listing videos', 'Interior showcases', 'Social media ads', 'Commercial property videos', 'Cinematic home highlights',
    ],
    description: [
      'The Nexa Homes is a real estate video portfolio built to showcase properties with cinematic storytelling, clean editing, smooth transitions, and high end visual presentation. From luxury villas and apartments to commercial spaces and modern interiors, every video is crafted to make the property feel premium, inviting, and memorable.',
      'Through professional real estate video editing, color grading, motion graphics, location highlights, text overlays, music syncing, and social-media-ready formats, The Nexa Homes helps agents, builders, realtors, and property brands present their listings with confidence. Each edit is designed to capture attention, increase property visibility, improve buyer interest, and turn ordinary listings into high-performing visual content.',
      'A property video should do more than show rooms — it should create a feeling. The Nexa Homes focuses on highlighting architecture, space, lifestyle, details, and atmosphere through a clean cinematic approach. Whether it is an Instagram reel, YouTube property tour, drone showcase, luxury home walkthrough, or short real estate ad, our editing style makes every property look polished, professional, and ready to sell.',
    ],
    theme: 'accent',
    cover: '/images/portfolio/we-ve-3.jpg',
    charmsDir: '/images/charms/real-estate-videos',
    charmCount: 2,
  },
  {
    slug: 'documentaries',
    categorySlug: 'video-editing',
    // placeholder — real content pending
    name: 'Documentaries',
    igName: '',
    igUrl: '',
    tagline: 'Documentary Editing',
    bottomLine: 'Real stories, told with cinematic depth.',
    services: ['Documentary Editing', 'Interview Cutdowns', 'Archival Footage', 'Sound Design', 'Color Grading'],
    description: [
      'Content coming soon — this page will showcase FilmFX Studio’s documentary editing work once finalized.',
    ],
    theme: 'black',
    cover: '/images/portfolio/ve-2.jpg',
    charmsDir: '',
    charmCount: 0,
  },
  {
    slug: 'promotional-videos',
    categorySlug: 'video-editing',
    // placeholder — real content pending
    name: 'Promotional Videos',
    igName: '',
    igUrl: '',
    tagline: 'Promo Video Editing',
    bottomLine: 'Bold promos that make brands impossible to ignore.',
    services: ['Brand Promos', 'Product Launches', 'Event Trailers', 'Motion Graphics', 'Sound Design'],
    description: [
      'Content coming soon — this page will showcase FilmFX Studio’s promotional video work once finalized.',
    ],
    theme: 'accent',
    cover: '/images/portfolio/ve-3.jpg',
    charmsDir: '',
    charmCount: 0,
  },
  {
    slug: 'ai-videos',
    categorySlug: 'video-editing',
    // placeholder — real content pending
    name: 'AI Videos',
    igName: '',
    igUrl: '',
    tagline: 'AI-Generated Video',
    bottomLine: 'Next-gen video, powered by AI.',
    services: ['AI Video Generation', 'AI Avatars', 'Voice Cloning', 'AI Motion Graphics'],
    description: [
      'Content coming soon — this page will showcase FilmFX Studio’s AI video work once finalized.',
    ],
    theme: 'black',
    cover: '/images/portfolio/ve-4.jpg',
    charmsDir: '',
    charmCount: 0,
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
