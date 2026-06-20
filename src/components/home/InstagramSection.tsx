'use client'

import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { FadeIn } from '../AnimatedSection'
import { motion } from 'framer-motion'

const instaImages = [
  'https://images.unsplash.com/photo-1561361058-c24e019e4c3e?w=400&q=80',
  'https://images.unsplash.com/photo-1571016862988-b0a85fd7d6e6?w=400&q=80',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80',
  'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80',
  'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&q=80',
]

export default function InstagramSection() {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom">
        <FadeIn className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
              <Instagram size={20} className="text-white" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-gray-800">
              Follow <span className="text-gradient-saffron">@BanarasGhat</span>
            </h2>
          </div>
          <p className="text-gray-500">
            Join our Instagram community for daily inspiration from the sacred ghats of Varanasi.
          </p>
        </FadeIn>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3 mb-8">
          {instaImages.map((src, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className="relative aspect-square rounded-2xl overflow-hidden group shadow-card"
            >
              <Image src={src} alt={`Instagram post ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="15vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <Instagram size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        <FadeIn className="text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Instagram size={18} />
            Follow on Instagram
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
