'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Clock, Users, CheckCircle, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/data'

interface PackageCardProps {
  pkg: {
    id: number
    title: string
    subtitle: string
    image: string
    duration: string
    rating: number
    reviews: number
    price: number
    originalPrice: number
    category: string
    badge: string
    services: string[]
    highlights: string[]
  }
}

export default function PackageCard({ pkg }: PackageCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 group"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-warm">
            {pkg.badge}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Star size={12} className="fill-golden-400 text-golden-400" />
          <span className="text-xs font-bold text-gray-800">{pkg.rating}</span>
          <span className="text-xs text-gray-500">({pkg.reviews})</span>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white">
          <Clock size={13} />
          <span className="text-xs font-medium">{pkg.duration}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-playfair font-bold text-lg text-gray-800 group-hover:text-saffron-600 transition-colors leading-snug">
            {pkg.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{pkg.subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.services.slice(0, 4).map((s) => (
            <span key={s} className="text-xs bg-cream-100 text-gray-600 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={10} className="text-saffron-400" />
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-cream-100">
          <div>
            <div className="text-xs text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
            <div className="text-xl font-bold text-saffron-600">₹{pkg.price.toLocaleString()}</div>
            <div className="text-xs text-gray-400">per person</div>
          </div>
          <a
            href={`${WHATSAPP_URL}&text=I'm interested in: ${encodeURIComponent(pkg.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm"
          >
            <MessageCircle size={15} />
            Book Now
          </a>
        </div>
      </div>
    </motion.div>
  )
}
