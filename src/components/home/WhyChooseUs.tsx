'use client'

import { motion } from 'framer-motion'
import { features } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '../AnimatedSection'
import { AnimatedCounter } from '../AnimatedCounter'

const stats2 = [
  { value: '5000+', label: 'Happy Travelers' },
  { value: '150+', label: 'Tour Packages' },
  { value: '10+', label: 'Years in Business' },
  { value: '4.9', label: 'Average Rating' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-gradient-to-br from-saffron-50 via-white to-golden-50">
      <div className="container-custom">
        <FadeIn className="text-center mb-14">
          <span className="section-badge mb-4"><span>✨</span> Why Banaras Ghat</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Why <span className="text-gradient-saffron">5000+ Travelers</span> Trust Us
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            We don&apos;t just organize trips — we create lifelong memories rooted in authenticity, safety, and unmatched service.
          </p>
        </FadeIn>

        {/* Stats Banner */}
        <FadeIn className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats2.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-3xl p-6 text-center shadow-card border border-cream-100"
            >
              <div className="font-playfair text-4xl font-bold text-gradient-saffron mb-1">
                <AnimatedCounter target={s.value} />
              </div>
              <div className="text-sm text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </FadeIn>

        {/* Features Grid */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={childVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-white rounded-3xl p-6 shadow-card hover:shadow-card-hover transition-all duration-500 group flex gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-saffron-50 to-golden-50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <div>
                <h3 className="font-playfair font-bold text-gray-800 text-lg mb-2 group-hover:text-saffron-600 transition-colors">
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
