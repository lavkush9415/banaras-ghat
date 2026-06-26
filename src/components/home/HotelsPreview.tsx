'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, MapPin, ArrowRight } from 'lucide-react'
import { hotels } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '../AnimatedSection'

const categoryColors: Record<string, string> = {
  Luxury: 'bg-golden-100 text-golden-700',
  Premium: 'bg-saffron-100 text-saffron-700',
  Budget: 'bg-green-100 text-green-700',
}

export default function HotelsPreview() {
  return (
    <section className="section-padding bg-cream-50/50">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="section-badge mb-4"><span>🏨</span> Handpicked Hotels</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Where Comfort Meets <span className="text-gradient-saffron">Spirituality</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From luxurious heritage palaces to cozy boutique stays — find the perfect accommodation for your Varanasi journey.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={childVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${categoryColors[hotel.category] || 'bg-gray-100 text-gray-600'}`}>
                    {hotel.badge}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star size={11} className="fill-golden-400 text-golden-400" />
                  <span className="text-xs font-bold text-gray-800">{hotel.rating}</span>
                  <span className="text-xs text-gray-500">({hotel.reviews})</span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-playfair font-bold text-gray-800 leading-snug group-hover:text-saffron-600 transition-colors mb-1">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                  <MapPin size={11} className="text-saffron-400" />
                  {hotel.location}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{hotel.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {hotel.amenities.slice(0, 3).map((a) => (
                    <span key={a} className="text-xs bg-cream-50 text-gray-600 px-2 py-0.5 rounded-full">{a}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-cream-100">
                  <div>
                    <span className="text-lg font-bold text-saffron-600">₹{hotel.pricePerNight.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-1">/night</span>
                  </div>
                  <Link
                    href={`/hotels/${hotel.slug}`}
                    className="text-xs bg-gradient-to-r from-saffron-500 to-golden-500 text-white px-3.5 py-2 rounded-xl font-semibold hover:shadow-warm transition-all hover:scale-105 inline-flex items-center gap-1"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-10">
          <Link href="/hotels" className="btn-outline inline-flex items-center gap-2">
            View All Hotels <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
