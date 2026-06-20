'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '../AnimatedSection'
import { WHATSAPP_URL } from '@/data/data'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AartiSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Images */}
          <FadeIn direction="left" className="relative">
            <div className="relative h-[480px]">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute top-0 left-0 w-4/5 h-72 rounded-3xl overflow-hidden shadow-card-hover"
              >
                <Image
                  src="https://images.unsplash.com/photo-1571016862988-b0a85fd7d6e6?w=800&q=80"
                  alt="Ganga Aarti Ceremony"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="absolute bottom-0 right-0 w-3/5 h-64 rounded-3xl overflow-hidden shadow-card-hover border-4 border-white"
              >
                <Image
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80"
                  alt="Evening Aarti at Varanasi Ghat"
                  fill
                  className="object-cover"
                  sizes="40vw"
                />
              </motion.div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 right-4 bg-white rounded-2xl shadow-warm p-4 text-center"
              >
                <div className="text-3xl mb-1">🪔</div>
                <div className="text-xs font-bold text-gray-800">Daily Aarti</div>
                <div className="text-xs text-saffron-500 font-semibold">6:45 PM</div>
              </motion.div>
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn direction="right">
            <span className="section-badge mb-5"><span>🕯️</span> Sacred Experience</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-5">
              The Magical{' '}
              <span className="text-gradient-saffron italic">Ganga Aarti</span>
              <br />Experience
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              Witness the grand Ganga Aarti ceremony at Dashashwamedh Ghat — an ancient ritual where hundreds of oil lamps illuminate the sacred river as priests perform elaborate fire offerings to the Ganga Mata.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Our exclusive boat ride puts you at the perfect vantage point to witness this mesmerizing spectacle up close, accompanied by devotional chants that fill the air with spiritual energy.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: '🎶', label: 'Live Devotional Music' },
                { icon: '🚢', label: 'Private Boat View' },
                { icon: '📿', label: 'Floating Diyas' },
                { icon: '📸', label: 'Photography Allowed' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white rounded-2xl p-3.5 shadow-soft">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/boat-rides" className="btn-primary inline-flex items-center gap-2">
                Book Aarti Ride <ArrowRight size={16} />
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2">
                Know More
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
