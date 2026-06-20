import type { Metadata } from 'next'
import Image from 'next/image'
import { Clock, Users, CheckCircle, MessageCircle } from 'lucide-react'
import { boatRides, WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'

export const metadata: Metadata = {
  title: 'Boat Rides | Banaras Ghat — Ganga River Boat Tours Varanasi',
  description: 'Book sunrise boat rides, Ganga Aarti evening rides, and private luxury cruises on the sacred Ganga river in Varanasi.',
}

export default function BoatRidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-50 via-saffron-50 to-golden-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&q=80" alt="bg" fill className="object-cover" sizes="100vw" />
        </div>
        <div className="relative container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5"><span>⛵</span> Boat Rides</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              Sail the Sacred{' '}
              <span className="text-gradient-saffron italic">Ganga</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Experience the mystical beauty of Varanasi from the water — choose from our curated boat ride experiences.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Rides Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
            {boatRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white rounded-4xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={ride.image} alt={ride.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                      {ride.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-white font-semibold text-lg drop-shadow">{ride.title}</span>
                    <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full">
                      <Clock size={13} className="text-saffron-500" />
                      <span className="text-xs font-semibold text-gray-800">{ride.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-saffron-400" /> {ride.timing}</span>
                    <span className="flex items-center gap-1.5"><Users size={14} className="text-saffron-400" /> {ride.capacity}</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed mb-4 text-sm">{ride.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {ride.features.map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm bg-saffron-50 text-saffron-700 px-3 py-1.5 rounded-full">
                        <CheckCircle size={13} /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-cream-100">
                    <div>
                      <span className="text-2xl font-bold text-saffron-600">₹{ride.price}</span>
                      <span className="text-gray-400 text-sm ml-1">per person</span>
                    </div>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-2xl transition-all hover:scale-105 shadow-sm"
                    >
                      <MessageCircle size={16} /> Book Now
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
