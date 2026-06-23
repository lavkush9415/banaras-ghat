import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import PackagesPreview from '@/components/home/PackagesPreview'
import AartiSection from '@/components/home/AartiSection'
import BoatRidesPreview from '@/components/home/BoatRidesPreview'
import HotelsPreview from '@/components/home/HotelsPreview'
import CabPreview from '@/components/home/CabPreview'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import TestimonialsSection from '@/components/TestimonialsSection'
import GallerySection from '@/components/GallerySection'
import FAQSection from '@/components/FAQSection'
import CallbackForm from '@/components/CallbackForm'
import InstagramSection from '@/components/home/InstagramSection'

export const metadata: Metadata = {
  title: 'Heritage Tour & Travels | Spiritual Journeys & Luxury Travel in Varanasi',
  description: 'Experience the soul of Banaras — premium tour packages, Ganga Aarti boat rides, luxury hotels & cab services in Varanasi.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PackagesPreview />
      <AartiSection />
      <BoatRidesPreview />
      <HotelsPreview />
      <CabPreview />
      <WhyChooseUs />
      <TestimonialsSection />
      <GallerySection />
      <InstagramSection />
      <FAQSection />
      <CallbackForm />
    </>
  )
}
