'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from './AnimatedSection'

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-cream-50 to-saffron-50/30">
      <div className="container-custom">
        <FadeIn className="text-center mb-14">
          <span className="section-badge mb-4">
            <span>💬</span> Traveler Stories
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            What Our Guests <span className="text-gradient-saffron">Say</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Thousands of happy travelers have experienced the magic of Banaras through us.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={childVariants}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-golden-400 text-golden-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-cream-100">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.city} · {t.date}</div>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-xs bg-saffron-50 text-saffron-600 px-2.5 py-1 rounded-full font-medium">
                  📦 {t.package}
                </span>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
