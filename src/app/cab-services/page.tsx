import type { Metadata } from 'next'
import Image from 'next/image'
import { Car, Clock, Shield, CheckCircle, MessageCircle } from 'lucide-react'
import { cabServices, WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'

export const metadata: Metadata = {
  title: 'Cab Services | Heritage Tour & Travels — Airport Transfer & Sightseeing Cabs',
  description: 'Book reliable, safe, and comfortable cab services in Varanasi — airport transfers, city sightseeing, and outstation trips.',
}

const benefits = [
  { icon: <Shield className="w-5 h-5" />, title: 'Safe & Verified Drivers' },
  { icon: <Clock className="w-5 h-5" />, title: '24/7 Availability' },
  { icon: <Car className="w-5 h-5" />, title: 'Well-Maintained Vehicles' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'No Hidden Charges' },
]

export default function CabServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-50 via-cream-50 to-saffron-50 overflow-hidden">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5"><span>🚗</span> Cab Services</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              Travel Comfortably Across{' '}
              <span className="text-gradient-saffron italic">Varanasi</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Professional, punctual, and comfortable — our cab services ensure seamless travel throughout your Varanasi journey.
            </p>
          </FadeIn>

          <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-3xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-4 shadow-soft flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-xl bg-saffron-50 text-saffron-500 flex items-center justify-center">{b.icon}</div>
                <span className="text-xs font-semibold text-gray-700">{b.title}</span>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
            {cabServices.map((cab) => (
              <div key={cab.id} className="bg-white rounded-4xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={cab.image} alt={cab.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-saffron-600 text-sm font-bold px-3 py-1.5 rounded-full">{cab.badge}</span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-playfair text-2xl font-bold text-white">{cab.title}</h3>
                    <p className="text-white/80 text-sm">{cab.subtitle}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5"><Car size={14} className="text-saffron-400" /> {cab.vehicleType}</span>
                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-saffron-400" /> {cab.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {cab.features.map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-sm bg-cream-50 text-gray-600 px-3 py-1.5 rounded-full">
                        <CheckCircle size={12} className="text-saffron-400" /> {f}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-cream-100">
                    <div>
                      <span className="text-2xl font-bold text-saffron-600">₹{cab.price}</span>
                      <span className="text-gray-400 text-sm ml-1">onwards</span>
                    </div>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-2xl transition-all hover:scale-105 shadow-sm">
                      <MessageCircle size={16} /> Book Cab
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
