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
    name: 'WeddingCuts',
    gridLabel: 'Wedding video',
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
    bg: '#0B3D2E',
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
      'The morph studio is built for brands, creators, influencers, and businesses that want to win attention in the fastest-moving space online: short-form video. In a world where people scroll within seconds, every cut, caption, hook, sound, and transition needs to work instantly. The challenge is simple: make short videos that are clear, catchy, engaging, and impossible to ignore.',
      'FilmFX Studio created The morph studio to showcase high retention short video edits designed for platforms like Instagram Reels, TikTok, YouTube Shorts, and social media campaigns. From viral style edits to clean talking head videos, meme edits, product promos, event highlights, cinematic reels, and brand content, every video is crafted to grab attention and keep viewers watching. The morph studio focuses on sharp storytelling, fast paced editing, clean captions, trendy sounds, motion graphics, smooth transitions, color correction, and platform friendly formatting. The goal is not just to make videos look good — it is to make them perform.',
      'Short videos are no longer just content, they are the fastest way to build visibility, trust, and engagement. The morph studio turns raw footage into scroll-stopping videos that feel modern, creative, and made for today’s audience. Every edit is shaped with strong hooks, smooth pacing, visual rhythm, and audience retention in mind. From a simple idea to a polished reel, The morph studio helps brands and creators turn moments into high impact short videos.',
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
    bg: '#3B2FC9',
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
      'The Nexa Homes is a real estate video portfolio built to showcase properties with cinematic storytelling, clean editing, smooth transitions, and high end visual presentation. From luxury villas and apartments to commercial spaces and modern interiors, every video is crafted to make the property feel premium, inviting, and memorable.',
      'Through professional real estate video editing, color grading, motion graphics, location highlights, text overlays, music syncing, and social-media-ready formats, The Nexa Homes helps agents, builders, realtors, and property brands present their listings with confidence. Each edit is designed to capture attention, increase property visibility, improve buyer interest, and turn ordinary listings into high-performing visual content.',
      'A property video should do more than show rooms — it should create a feeling. The Nexa Homes focuses on highlighting architecture, space, lifestyle, details, and atmosphere through a clean cinematic approach. Whether it is an Instagram reel, YouTube property tour, drone showcase, luxury home walkthrough, or short real estate ad, our editing style makes every property look polished, professional, and ready to sell.',
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
      'The DocuCut is a documentary video editing portfolio built for brands, creators, filmmakers, nonprofits, and storytellers who want to turn real footage into powerful visual narratives. From interviews and archival clips to cinematic B-roll and emotional sound design, every edit is crafted to bring truth, depth, and meaning to the screen.',
      'Through documentary editing, story structure, color grading, sound cleanup, pacing, subtitles, and visual direction, we shape raw footage into engaging films that feel authentic, professional, and emotionally impactful. Whether it is a brand documentary, social impact film, mini-doc, YouTube documentary, founder story, or event-based documentary, our editing approach focuses on clarity, emotion, and audience retention while keeping the story honest and visually compelling.',
      'Documentaries are more than videos — they are real stories captured with purpose. Our documentary editing process transforms interviews, raw moments, natural sound, cinematic visuals, and real-life emotions into films that feel honest, immersive, and unforgettable. Every frame is selected with intention, every cut is shaped around the message, and every sequence is designed to keep viewers connected from beginning to end.',
      'From short-form documentary edits to full-length films, brand stories, awareness campaigns, founder journeys, and social impact videos, we create documentary content that informs, inspires, and builds trust. With clean storytelling, emotional pacing, professional sound design, smooth transitions, color correction, and SEO-friendly video structure, our documentary portfolio is designed for creators and brands who want their stories to leave a lasting impact.',
    ],
    bg: '#3B2FC9',
    cover: '/images/portfolio/ve-2.jpg',
    charmsDir: '/images/charms/documentaries',
    charmCount: 9,
  },
  {
    slug: 'promotional-videos',
    categorySlug: 'video-editing',
    name: 'Clara B Media',
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
      'Brands do not just need videos — they need promotional content that captures attention fast, explains the offer clearly, and makes people want to take action. In a digital world full of endless scrolling, every second matters. Clara B Media helps brands stand out with promotional videos that feel fresh, polished, and built for performance across Instagram, TikTok, YouTube, websites, ads, and social media campaigns.',
      'From product launches and service promos to brand awareness videos and campaign creatives, our edits are designed to highlight what makes a business valuable. We focus on strong hooks, smooth pacing, clean visuals, engaging motion graphics, powerful storytelling, and platform ready formatting so every promotional video feels professional, memorable, and conversion focused.',
      'Clara B Media brings together creative editing, smart marketing flow, and social-first visuals to help brands promote with confidence. Whether it is a short reel, product showcase, business promo, event highlight, ad creative, or campaign video, we turn raw ideas into high impact promotional content that builds trust, increases visibility, and helps brands grow online.',
      'Clara B Media creates promotional videos that help brands get noticed, remembered, and chosen. From product launches to social media ads, we craft clean, engaging, and conversion focused videos designed for modern platforms and fast moving audiences.',
    ],
    bg: '#3B2FC9',
    cover: '/images/portfolio/ve-3.jpg',
    charmsDir: '/images/charms/promotional-videos',
    charmCount: 6,
  },
  {
    slug: 'ai-videos',
    categorySlug: 'video-editing',
    name: 'Onyx.AI',
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
      'Onyx.AI is a creative AI video portfolio designed for the future of visual content. We create AI-generated videos, cinematic edits, product visuals, social media content, brand campaigns, and digital storytelling experiences that help brands communicate faster, smarter, and more creatively.',
      'By combining AI technology with professional video editing, motion graphics, visual effects, and design direction, Onyx.AI builds high-impact video content for modern platforms. Every project is crafted to feel visually strong, engaging, and ready for the next generation of digital marketing.',
    ],
    bg: '#3B2FC9',
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
      'At FilmFX Studio, we create long form videos that hold attention, build trust, and turn raw footage into powerful visual stories. From YouTube videos and podcasts to documentaries, interviews, brand films, tutorials, and corporate videos, every edit is crafted with clean structure, smooth pacing, cinematic flow, and audience retention in mind.',
      'Our long-form video editing process focuses on storytelling, clarity, sound design, color grading, motion graphics, subtitles, and seamless transitions. Whether the goal is to educate, entertain, promote, or inspire, we shape each video with a professional editing style that keeps viewers watching from the first second to the final frame.',
      'Long-form content is more than just a video — it is a complete viewing experience. At FilmFX Studio, we transform extended footage into polished, engaging, and platform ready videos designed for YouTube, websites, courses, podcasts, brand campaigns, and digital portfolios.',
      'From trimming unnecessary pauses to improving audio, adding branded visuals, syncing music, enhancing visuals, and creating a smooth story flow, we make every minute meaningful. Our edits help brands, creators, coaches, businesses, and agencies deliver content that feels premium, professional, and built for long-term audience growth.',
    ],
    bg: '#3B2FC9',
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
