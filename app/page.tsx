import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ZoomReveal from '@/components/ZoomReveal'
import Works from '@/components/Works'
import MoreWork from '@/components/MoreWork'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Team from '@/components/Team'
import CTA from '@/components/CTA'
import SiteFooter from '@/components/SiteFooter'

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
        <Team />
        <CTA />
      </main>
      {/* Navy to continue the CTA's scroll-in navy background as one block */}
      <SiteFooter background="#001941" />
    </>
  )
}
