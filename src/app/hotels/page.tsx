import type { Metadata } from 'next'
import Image from 'next/image'
import { Star, MapPin, MessageCircle, CheckCircle } from 'lucide-react'
import { hotels, WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'

export const metadata: Metadata = {
  title: 'Hotels | Banaras Ghat — Varanasi Hotel Bookings',
  description: 'Book luxury heritage hotels, premium boutique stays, and budget accommodations in Varanasi through Banaras Ghat.',
}

const categories = ['All', 'Luxury', 'Premium', 'Budget']

export default function HotelsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-cream-50 to-golden-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5"><span>🏨</span> Hotels & Stays</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              Stay in the Heart of{' '}
              <span className="text-gradient-saffron italic">Banaras</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Handpicked accommodations for every budget — from 5-star heritage palaces to charming boutique hotels.
            </p>
          </FadeIn>
          <FadeIn className="flex justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button key={cat} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${cat === 'All' ? 'bg-gradient-to-r from-saffron-500 to-golden-500 text-white shadow-warm' : 'bg-white text-gray-600 hover:text-saffron-600 shadow-soft'}`}>
                {cat}
              </button>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-4xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group flex flex-col md:flex-row">
                <div className="relative md:w-56 h-52 md:h-auto flex-shrink-0 overflow-hidden">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="30vw" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-saffron-600 text-xs font-bold px-2.5 py-1 rounded-full">{hotel.badge}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-playfair font-bold text-gray-800 text-xl group-hover:text-saffron-600 transition-colors">{hotel.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2 bg-golden-50 px-2 py-1 rounded-lg">
                        <Star size={13} className="fill-golden-400 text-golden-400" />
                        <span className="text-sm font-bold text-gray-800">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                      <MapPin size={11} className="text-saffron-400" />
                      {hotel.location}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{hotel.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.map((a) => (
                        <span key={a} className="flex items-center gap-1 text-xs bg-cream-50 text-gray-600 px-2.5 py-1 rounded-full">
                          <CheckCircle size={10} className="text-saffron-400" /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-100">
                    <div>
                      <span className="text-2xl font-bold text-saffron-600">₹{hotel.pricePerNight.toLocaleString()}</span>
                      <span className="text-gray-400 text-sm ml-1">/night</span>
                    </div>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2.5 rounded-2xl transition-all hover:scale-105 text-sm">
                      <MessageCircle size={15} /> Book Room
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </>
  )
}
