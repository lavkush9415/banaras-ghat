'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { galleryImages } from '@/data/data'
import { FadeIn } from './AnimatedSection'
import { useState } from 'react'
import { X, ZoomIn } from 'lucide-react'

export default function GallerySection() {
  const [selected, setSelected] = useState<typeof galleryImages[0] | null>(null)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="section-badge mb-4"><span>📸</span> Photo Gallery</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Glimpses of <span className="text-gradient-saffron">Sacred Banaras</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Every frame tells a story of devotion, culture, and timeless beauty.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(img)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-card ${
                i === 0 || i === 6 ? 'md:col-span-2 md:row-span-2 h-64 md:h-auto' : 'h-40 md:h-52'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                  <ZoomIn size={18} className="text-saffron-600" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-white/90 text-gray-700 px-2.5 py-1 rounded-full font-medium">
                  {img.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden"
            >
              <Image src={selected.src.replace('600', '1200')} alt={selected.alt} fill className="object-cover" sizes="800px" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
