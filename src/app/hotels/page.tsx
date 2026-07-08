import type { Metadata } from 'next'
import { hotels } from '@/data/data'
import { FadeIn } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'
import HotelsClient from './HotelsClient'

export const metadata: Metadata = {
  title: 'Hotels | Heritage Tour & Travels — Varanasi Hotel Bookings',
  description:
    'Book luxury heritage hotels, premium boutique stays, and budget accommodations in Varanasi through Heritage Tour & Travels.',
}

export default function HotelsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-cream-50 to-golden-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5">
              <span>🏨</span> Hotels &amp; Stays
            </span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              Stay in the Heart of{' '}
              <span className="text-gradient-saffron italic">Banaras</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Handpicked accommodations for every budget — from 5-star heritage palaces to charming
              boutique hotels.
            </p>
          </FadeIn>

          {/* Filter bar + hotel grid live inside HotelsClient (client component) */}
          <HotelsClient hotels={hotels} />
        </div>
      </section>

      {/* ── Callback Form ─────────────────────────────────────────────── */}
      <CallbackForm />
    </>
  )
}
