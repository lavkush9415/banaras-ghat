'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, MapPin, Phone, ArrowLeft, Share2, CheckCircle,
  Clock, Users, Wifi, Tv, Coffee, Car, Snowflake, Dumbbell,
  Utensils, Shirt, ChevronLeft, ChevronRight, X, ExternalLink,
  MessageCircle
} from 'lucide-react'
import { WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '@/components/AnimatedSection'

interface Hotel {
  id: number
  slug: string
  name: string
  category: string
  image: string
  images: string[]
  rating: number
  reviews: number
  pricePerNight: number
  location: string
  coordinates: { lat: number; lng: number }
  amenities: string[]
  badge: string
  description: string
  fullDescription: string
  roomTypes: { type: string; price: number; capacity: string; amenities: string[] }[]
  policies: { checkIn: string; checkOut: string; cancellation: string; payment: string; children: string }
  nearbyAttractions: { name: string; distance: string; type: string }[]
  guestReviews: { name: string; city: string; rating: number; date: string; comment: string }[]
}

interface Props {
  hotel: Hotel
  similarHotels: Hotel[]
}

const amenityIcons: Record<string, React.ReactNode> = {
  'Pool': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M2 20c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" strokeLinecap="round"/><path d="M2 16c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" strokeLinecap="round" opacity="0.5"/></svg>,
  'Spa': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 22c-2-3-6-5-10-5 0 4 3 8 10 10 7-2 10-6 10-10-4 0-8 2-10 5z"/></svg>,
  'Fine Dining': <Utensils className="w-5 h-5" />,
  'Ganga View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="8" r="4"/><path d="M12 22v-6"/><path d="M8 12h8"/></svg>,
  'Concierge': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  'Rooftop Restaurant': <Utensils className="w-5 h-5" />,
  'Yoga': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M5 21c.5-1.5 2-4 7-4s6.5 2.5 7 4"/><path d="M12 12v4"/></svg>,
  'River View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M2 12h20"/><path d="M6 8v8"/><path d="M18 8v8"/><path d="M10 6v12"/><path d="M14 6v12"/></svg>,
  'AC Rooms': <Snowflake className="w-5 h-5" />,
  'Clean Rooms': <CheckCircle className="w-5 h-5" />,
  'Free Breakfast': <Coffee className="w-5 h-5" />,
  'WiFi': <Wifi className="w-5 h-5" />,
  'City View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="4" y="8" width="16" height="12" rx="1"/><path d="M8 8V4h8v4"/></svg>,
  'Heritage Architecture': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M3 21h18"/><path d="M5 21V5l7-3 7 3v16"/><path d="M9 9h1"/><path d="M14 9h1"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>,
  'Private Terrace': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><path d="M12 9v12"/></svg>,
  'Ganga Puja': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>,
}

function getAmenityIcon(name: string, className = 'w-5 h-5') {
  const icon = amenityIcons[name]
  if (icon) return icon
  return <CheckCircle className={className} />
}

export default function HotelDetailsClient({ hotel, similarHotels }: Props) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const shareHotel = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel.name,
          text: hotel.description,
          url: window.location.href,
        })
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      <section className="pb-20 bg-white">
        <div className="container-custom">
          {/* Back Button */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-saffron-600 transition-colors font-medium"
            >
              <ArrowLeft size={16} />
              Back to Hotels
            </Link>
            <button
              onClick={shareHotel}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-saffron-600 transition-colors font-medium"
            >
              <Share2 size={16} />
              Share
            </button>
          </div>

          {/* Image Gallery */}
          <div className="grid md:grid-cols-4 gap-3 mb-10">
            <div
              className="md:col-span-2 md:row-span-2 relative h-64 md:h-[420px] rounded-3xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={hotel.images[0]}
                alt={hotel.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                View Gallery
              </div>
            </div>
            {hotel.images.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className="relative h-40 md:h-[200px] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(i + 1)}
              >
                <Image
                  src={img}
                  alt={`${hotel.name} ${i + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hotel Header */}
              <FadeIn>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {hotel.badge}
                      </span>
                      <span className="text-xs text-gray-400 bg-cream-100 px-2.5 py-1 rounded-full">{hotel.category}</span>
                    </div>
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800">
                      {hotel.name}
                    </h1>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-golden-400 text-golden-400" />
                        <span className="font-bold text-gray-800">{hotel.rating}</span>
                        <span className="text-gray-400 text-sm">({hotel.reviews} reviews)</span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={14} className="text-saffron-400" />
                        <a
                          href={`https://maps.google.com?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-saffron-600 transition-colors"
                        >
                          {hotel.location}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-saffron-600">₹{hotel.pricePerNight.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">per night</div>
                  </div>
                </div>
              </FadeIn>

              {/* Description */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">About This Hotel</h2>
                  <p className="text-gray-600 leading-relaxed">{hotel.fullDescription}</p>
                </div>
              </FadeIn>

              {/* Amenities */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Amenities & Services</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {hotel.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 bg-cream-50 rounded-2xl p-3.5 group hover:bg-saffron-50 transition-colors"
                      >
                        <div className="text-saffron-500 group-hover:scale-110 transition-transform">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Room Types */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Available Room Types</h2>
                  <div className="space-y-4">
                    {hotel.roomTypes.map((room, i) => (
                      <motion.div
                        key={room.type}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-cream-200 rounded-3xl p-5 hover:shadow-card-hover transition-shadow"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-playfair font-bold text-gray-800 text-lg">{room.type}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Users size={14} />
                              {room.capacity}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-saffron-600">₹{room.price.toLocaleString()}</div>
                            <div className="text-xs text-gray-400">per night</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((a) => (
                            <span key={a} className="flex items-center gap-1 text-xs bg-saffron-50 text-saffone-700 px-2.5 py-1 rounded-full">
                              <CheckCircle size={10} className="text-saffron-400" />
                              {a}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Hotel Policies */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Hotel Policies</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: <Clock size={18} />, label: 'Check-In', value: hotel.policies.checkIn },
                      { icon: <Clock size={18} />, label: 'Check-Out', value: hotel.policies.checkOut },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M3 10h18"/><path d="M5 6h14"/><path d="M8 14h8"/><path d="M6 18h12"/></svg>, label: 'Cancellation', value: hotel.policies.cancellation },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, label: 'Payment', value: hotel.policies.payment },
                      { icon: <Users size={18} />, label: 'Children', value: hotel.policies.children, className: 'sm:col-span-2' },
                    ].map((policy, i) => (
                      <div key={i} className={`bg-cream-50 rounded-2xl p-4 ${policy.className || ''}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-saffron-500 flex-shrink-0">
                            {policy.icon}
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 font-medium">{policy.label}</div>
                            <div className="text-sm text-gray-700 font-medium mt-0.5">{policy.value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Nearby Attractions */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Nearby Attractions</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {hotel.nearbyAttractions.map((attraction) => (
                      <div key={attraction.name} className="flex items-center gap-3 bg-cream-50 rounded-2xl p-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-saffron-500 flex-shrink-0">
                          {attraction.type === 'Ghat' ? <MapPin size={18} /> :
                           attraction.type === 'Temple' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M4 8h16"/><path d="M8 8v12"/><path d="M16 8v12"/><path d="M6 20h12"/><path d="M12 2l8 6H4z"/></svg> :
                           attraction.type === 'University' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.2 2 6 2s6-.9 6-2v-5"/></svg> :
                           <MapPin size={18} />}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">{attraction.name}</div>
                          <div className="text-xs text-gray-400">{attraction.distance} away</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Guest Reviews */}
              <FadeIn>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-gray-800 mb-4">Guest Reviews</h2>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="text-4xl font-bold text-gradient-saffron">{hotel.rating}</div>
                      <div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < Math.floor(hotel.rating) ? 'fill-golden-400 text-golden-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <div className="text-xs text-gray-400">{hotel.reviews} verified reviews</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {hotel.guestReviews.map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-cream-50 rounded-3xl p-5"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-gray-800">{review.name}</div>
                            <div className="text-xs text-gray-400">{review.city} · {review.date}</div>
                          </div>
                          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                            <Star size={12} className="fill-golden-400 text-golden-400" />
                            <span className="text-xs font-bold text-gray-800">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Column - Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-5">
                <FadeIn>
                  <div className="bg-white border border-cream-200 rounded-4xl p-6 shadow-card">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-saffron-600">₹{hotel.pricePerNight.toLocaleString()}</div>
                      <div className="text-gray-400 text-sm">per night</div>
                    </div>

                    <div className="space-y-3">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm"
                      >
                        <MessageCircle size={18} />
                        Enquire on WhatsApp
                      </a>
                      <a
                        href="tel:+919305756027"
                        className="w-full flex items-center justify-center gap-2 border-2 border-saffron-200 text-saffron-600 font-semibold py-3.5 rounded-2xl hover:bg-saffron-50 transition-all"
                      >
                        <Phone size={18} />
                        Call Now
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white font-semibold py-3.5 rounded-2xl hover:shadow-warm hover:scale-[1.02] transition-all"
                      >
                        Book Now
                      </a>
                    </div>

                    <div className="mt-5 pt-5 border-t border-cream-100 space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-green-500" />
                        Free cancellation available
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-green-500" />
                        Best price guaranteed
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle size={14} className="text-green-500" />
                        Instant confirmation
                      </div>
                    </div>

                    <div className="mt-5 pt-5 border-t border-cream-100">
                      <a
                        href={`https://maps.google.com?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-saffron-600 font-medium hover:underline"
                      >
                        <MapPin size={16} />
                        View on Google Maps
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* Similar Hotels */}
          {similarHotels.length > 0 && (
            <section className="mt-20 pt-10 border-t border-cream-200">
              <FadeIn className="text-center mb-10">
                <h2 className="font-playfair text-3xl font-bold text-gray-800">
                  Similar <span className="text-gradient-saffron">Hotels</span>
                </h2>
                <p className="text-gray-500 mt-2">Explore more handpicked accommodations in Varanasi</p>
              </FadeIn>

              <StaggerChildren className="grid md:grid-cols-3 gap-6">
                {similarHotels.map((h) => (
                  <motion.div key={h.id} variants={childVariants}>
                    <Link
                      href={`/hotels/${h.slug}`}
                      className="block bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={h.image}
                          alt={h.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 text-saffron-600 text-xs font-bold px-2.5 py-1 rounded-full">
                            {h.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-playfair font-bold text-gray-800 group-hover:text-saffron-600 transition-colors">
                          {h.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <MapPin size={11} className="text-saffron-400" />
                          {h.location}
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-cream-100">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-golden-400 text-golden-400" />
                            <span className="text-xs font-semibold text-gray-800">{h.rating}</span>
                            <span className="text-xs text-gray-400">({h.reviews})</span>
                          </div>
                          <div className="text-sm font-bold text-saffron-600">₹{h.pricePerNight.toLocaleString()}<span className="text-xs text-gray-400 font-normal">/night</span></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </StaggerChildren>
            </section>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <button
              onClick={() => setLightboxIndex((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-4xl aspect-video mx-4 rounded-2xl overflow-hidden"
            >
              <Image
                src={hotel.images[lightboxIndex]}
                alt={`${hotel.name} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="80vw"
              />
            </motion.div>

            <button
              onClick={() => setLightboxIndex((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {hotel.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? 'border-saffron-500 scale-110' : 'border-white/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}