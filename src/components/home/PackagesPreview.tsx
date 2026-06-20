'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { packages } from '@/data/data'
import PackageCard from '../PackageCard'
import { FadeIn, StaggerChildren, childVariants } from '../AnimatedSection'
import { motion } from 'framer-motion'

export default function PackagesPreview() {
  return (
    <section className="section-padding bg-[#fffdf9]">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <span className="section-badge mb-4">
            <span>🗺️</span> Popular Packages
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
            Curated <span className="text-gradient-saffron">Tour Packages</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From budget-friendly getaways to luxury spiritual retreats — discover Varanasi your way.
          </p>
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.slice(0, 6).map((pkg) => (
            <motion.div key={pkg.id} variants={childVariants}>
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </StaggerChildren>

        <FadeIn className="text-center mt-10">
          <Link
            href="/packages"
            className="btn-outline inline-flex items-center gap-2"
          >
            View All Packages <ArrowRight size={16} />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
