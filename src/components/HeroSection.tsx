'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stats, WHATSAPP_URL } from '@/data/data'
import { AnimatedCounter } from './AnimatedCounter'

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">

        <Image
          src="/bg.jpg"
          alt="Heritage Tour & Travels"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover brightness-110 contrast-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40" />
      </div>

      {/* Glow Effect */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-10 w-72 h-72 rounded-full bg-orange-400/20 blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 pt-24">

        <div className="max-w-4xl mx-auto text-center mt-10">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-orange-100 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-5 shadow-xl"
          >
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Spiritual Journey Starts Here
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-4 drop-shadow-2xl"
          >
            Experience the

            <span className="block mt-2 bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-200 bg-clip-text text-transparent italic">
              Soul of Banaras
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed max-w-2xl mx-auto mb-8 px-2"
          >
            Discover sacred ghats, sunrise boat rides, mesmerizing Ganga
            Aarti, spiritual temples, and luxury travel experiences curated
            specially for your unforgettable Banaras journey.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 shadow-2xl hover:scale-105"
            >
              Explore Packages
              <ArrowRight size={18} />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white px-5 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300"
            >
              Book Your Journey
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto mt-2"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{
                  y: -5,
                  scale: 1.03,
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 text-center shadow-2xl"
              >
                <div className="text-2xl sm:text-3xl mb-2">
                  {stat.icon}
                </div>

                <div className="text-xl sm:text-2xl font-bold text-orange-300">
                  <AnimatedCounter target={stat.value} />
                </div>

                <div className="text-[11px] sm:text-sm text-gray-100 mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/80">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="w-5 h-9 border-2 border-white/50 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-orange-400 rounded-full" />
        </motion.div>
      </motion.div>

    </section>
  )
}