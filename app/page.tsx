import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import LogoMarquee from '@/components/LogoMarquee'
import ZoomReveal from '@/components/ZoomReveal'
import Works from '@/components/Works'
import Services from '@/components/Services'
import About from '@/components/About'
import Team from '@/components/Team'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <LogoMarquee />
        <ZoomReveal />
        <Works />
        <Services />
        <About />
        <Team />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
