'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown } from 'lucide-react'
import { faqs } from '@/data/data'
import { FadeIn } from './AnimatedSection'

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-14">
          <span className="section-badge mb-4">
            <span>❓</span> Frequently Asked Questions
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Everything You Need to <span className="text-gradient-saffron">Know</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Have questions about your Varanasi trip? We&apos;ve answered the most common ones below.
          </p>
        </FadeIn>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.id} delay={i * 0.05}>
              <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openId === faq.id ? 'border-saffron-200 bg-saffron-50/50 shadow-warm' : 'border-cream-200 bg-white'
              }`}>
                <button
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold transition-colors ${
                      openId === faq.id ? 'bg-saffron-500 text-white' : 'bg-cream-100 text-gray-500'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="font-semibold text-gray-800 text-sm md:text-base">{faq.question}</span>
                  </div>
                  <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className={openId === faq.id ? 'text-saffron-500' : 'text-gray-400'} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-saffron-100 pt-3 ml-10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
