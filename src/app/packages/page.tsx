import type { Metadata } from 'next'
import PackageCard from '@/components/PackageCard'
import { packages } from '@/data/data'
import { FadeIn } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'

export const metadata: Metadata = {
  title: 'Tour Packages | Heritage Tour & Travels — Varanasi Travel Packages',
  description: 'Choose from 150+ curated Varanasi tour packages — spiritual tours, luxury experiences, honeymoon packages, and family trips.',
}

const categories = ['All', 'Spiritual', 'Luxury', 'Budget', 'Heritage', 'Romantic', 'Family']

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5"><span>🗺️</span> Tour Packages</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              Find Your Perfect{' '}
              <span className="text-gradient-saffron">Varanasi Experience</span>
            </h1>
            <p className="text-gray-500 text-lg">
              From quick weekend getaways to elaborate 5-day luxury journeys — we have a package crafted just for you.
            </p>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  cat === 'All'
                    ? 'bg-gradient-to-r from-saffron-500 to-golden-500 text-white shadow-warm'
                    : 'bg-white text-gray-600 hover:text-saffron-600 hover:bg-saffron-50 shadow-soft'
                }`}
              >
                {cat}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id}>
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </>
  )
}
