import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ZoomReveal from '@/components/ZoomReveal'
import Works from '@/components/Works'
import MoreWork from '@/components/MoreWork'
import Services from '@/components/Services'
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
        <ZoomReveal />
        <Works />
        <MoreWork />
        <Services />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
