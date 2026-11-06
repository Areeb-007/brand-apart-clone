import AboutPage from '@/components/AboutPage'
import SiteFooter from '@/components/SiteFooter'

export default function About() {
  return (
    <>
      <AboutPage />
      <SiteFooter heading={['Your next story', 'deserves a', 'great edit.']} ctaLabel="Let’s talk" />
    </>
  )
}
