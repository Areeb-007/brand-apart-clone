import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import LogoMarquee from '@/components/LogoMarquee'
import ZoomReveal from '@/components/ZoomReveal'
import Works from '@/components/Works'
import MoreWork from '@/components/MoreWork'
import Services from '@/components/Services'
import Pricing from '@/components/Pricing'
import About from '@/components/About'
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
        <MoreWork />
        <Services />
        <Pricing />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
