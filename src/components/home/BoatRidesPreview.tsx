'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Star } from 'lucide-react'
import { boatRides, WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '../AnimatedSection'

export default function BoatRidesPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="section-badge mb-4"><span>⛵</span> Boat Rides</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Sail the Sacred <span className="text-gradient-saffron">Ganga</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Experience the mystical Ganga river from the water — from serene sunrise rides to the magical Ganga Aarti.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boatRides.map((ride) => (
            <motion.div
              key={ride.id}
              variants={childVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group border border-cream-100"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={ride.image}
                  alt={ride.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 text-saffron-600 text-xs font-bold px-3 py-1 rounded-full">
                    {ride.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                  <Clock size={11} className="text-saffron-500" />
                  <span className="text-xs font-medium text-gray-800">{ride.duration}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-playfair font-bold text-gray-800 text-lg mb-1 group-hover:text-saffron-600 transition-colors">
                  {ride.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{ride.description}</p>
                <div className="text-xs text-saffron-600 font-medium mb-3">🕐 {ride.timing}</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ride.features.map((f) => (
                    <span key={f} className="text-xs bg-cream-50 text-gray-600 px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                  <div>
                    <span className="text-lg font-bold text-saffron-600">₹{ride.price}</span>
                    <span className="text-xs text-gray-400 ml-1">/ person</span>
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-green-500 text-white px-3 py-2 rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    Book
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-10">
          <Link href="/boat-rides" className="btn-outline inline-flex items-center gap-2">
            View All Rides <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
