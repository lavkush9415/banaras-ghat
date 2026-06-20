'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Car, Clock, ArrowRight } from 'lucide-react'
import { cabServices, WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '../AnimatedSection'

const badgeColors: Record<string, string> = {
  'On-Time Guaranteed': 'bg-green-100 text-green-700',
  'Most Booked': 'bg-saffron-100 text-saffron-700',
  'Outstation': 'bg-blue-100 text-blue-700',
  'Luxury': 'bg-golden-100 text-golden-700',
}

export default function CabPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="section-badge mb-4"><span>🚗</span> Cab Services</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Travel in Comfort & <span className="text-gradient-saffron">Style</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Reliable, safe, and comfortable cab services for airport transfers, city sightseeing, and outstation trips.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cabServices.map((cab) => (
            <motion.div
              key={cab.id}
              variants={childVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group border border-cream-100"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={cab.image}
                  alt={cab.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeColors[cab.badge] || 'bg-gray-100 text-gray-600'}`}>
                    {cab.badge}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-playfair font-bold text-gray-800 mb-0.5 group-hover:text-saffron-600 transition-colors">
                  {cab.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{cab.subtitle}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Car size={12} className="text-saffron-400" />
                    {cab.vehicleType}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-saffron-400" />
                    {cab.duration}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {cab.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-xs bg-cream-50 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                  <div>
                    <span className="text-xl font-bold text-saffron-600">₹{cab.price}</span>
                    <span className="text-xs text-gray-400 ml-1">onwards</span>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-500 text-white px-3.5 py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    Book Cab
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-10">
          <Link href="/cab-services" className="btn-outline inline-flex items-center gap-2">
            View All Services <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
