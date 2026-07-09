import type { Metadata } from 'next'
import { Outfit, Plus_Jakarta_Sans, Nunito } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  weight: ['300', '400', '500', '600', '700'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['800', '900'],
})

export const metadata: Metadata = {
  title: 'FilmFX Studio — Your Creative Partner for High-Impact Videos',
  description:
    'We help brands, creators, and businesses transform raw footage into polished videos, social media content, promos, wedding films, AI videos, and cinematic edits that capture attention and drive engagement.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} ${nunito.variable}`}>
      <body suppressHydrationWarning>
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
