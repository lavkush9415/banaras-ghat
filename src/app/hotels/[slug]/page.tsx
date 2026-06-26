import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hotels } from '@/data/data'
import { FadeIn } from '@/components/AnimatedSection'
import HotelDetailsClient from './HotelDetailsClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hotel = hotels.find((h) => h.slug === params.slug)
  if (!hotel) return { title: 'Hotel Not Found' }
  return {
    title: `${hotel.name} | Heritage Tour & Travels — Varanasi Hotel`,
    description: hotel.description,
    openGraph: {
      title: `${hotel.name} — Book in Varanasi`,
      description: hotel.description,
      images: [{ url: hotel.image }],
    },
  }
}

export default function HotelDetailsPage({ params }: Props) {
  const hotel = hotels.find((h) => h.slug === params.slug)
  if (!hotel) { notFound() }

  const similarHotels = hotels.filter((h) => h.slug !== hotel.slug).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <a href="/" className="hover:text-saffron-600 transition-colors">Home</a>
            <span className="text-gray-300">/</span>
            <a href="/hotels" className="hover:text-saffron-600 transition-colors">Hotels</a>
            <span className="text-gray-300">/</span>
            <span className="text-saffron-600 font-semibold truncate max-w-[200px]">{hotel.name}</span>
          </nav>
        </div>
      </section>

      <HotelDetailsClient hotel={hotel} similarHotels={similarHotels} />
    </>
  )
}