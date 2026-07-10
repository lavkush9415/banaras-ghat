'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MapPin, CheckCircle, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

interface RoomType {
  type: string
  roomType: string
  price: number
  capacity: string
  description: string
  images: string[]
  amenities: string[]
}

interface Hotel {
  id: number
  slug: string
  name: string
  category: string
  hotelType: string
  image: string
  images: string[]
  rating: number
  reviews: number
  pricePerNight: number
  location: string
  amenities: string[]
  badge: string
  description: string
  roomTypes: RoomType[]
}

interface Props {
  hotels: Hotel[]
}

const FILTER_CATEGORIES = [
  'All',
  'Luxury',
  'Premium',
  'Budget',
  'Deluxe',
  'Twin Deluxe',
  'Super Deluxe',
  'Suites',
] as const

type FilterCategory = (typeof FILTER_CATEGORIES)[number]

/** Map filter labels → how we match against hotel data */
function matchesFilter(hotel: Hotel, filter: FilterCategory): boolean {
  if (filter === 'All') return true

  // Hotel-level type matches (Luxury, Premium, Budget)
  const hotelLevelFilters: FilterCategory[] = ['Luxury', 'Premium', 'Budget']
  if (hotelLevelFilters.includes(filter)) {
    return hotel.hotelType === filter
  }

  // Room-level type matches (Deluxe, Twin Deluxe, Super Deluxe, Suites)
  return hotel.roomTypes.some((r) => r.roomType === filter)
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.96,
    transition: { duration: 0.28, ease: 'easeIn' },
  },
}

export default function HotelsClient({ hotels }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = hotels.filter((h) => matchesFilter(h, activeFilter))

  const scrollFilters = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 160 : -160, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Filter Bar ─────────────────────────────────────────────── */}
      <div className="relative flex items-center gap-1 mt-8 px-0 sm:px-2">
        {/* Left arrow — mobile only */}
        <button
          onClick={() => scrollFilters('left')}
          aria-label="Scroll filters left"
          className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-500 hover:text-saffron-600 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Scrollable pill row */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-1 scroll-smooth min-w-0 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                whileTap={{ scale: 0.94 }}
                className={`flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-saffron-500 to-golden-500 text-white shadow-warm'
                    : 'bg-white text-gray-600 hover:text-saffron-600 shadow-soft hover:shadow-warm hover:scale-[1.03]'
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Right arrow — mobile only */}
        <button
          onClick={() => scrollFilters('right')}
          aria-label="Scroll filters right"
          className="md:hidden flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-500 hover:text-saffron-600 transition-colors"
        >
          <ChevronRight size={16} />
        </button>

        {/* Result count badge */}
        <div className="hidden md:flex flex-shrink-0 items-center gap-1.5 ml-2 text-xs text-gray-400 font-medium bg-cream-50 px-3 py-2 rounded-full">
          <SlidersHorizontal size={12} className="text-saffron-400" />
          {filtered.length} {filtered.length === 1 ? 'hotel' : 'hotels'}
        </div>
      </div>

      {/* ── Hotel Grid ─────────────────────────────────────────────── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((hotel) => (
              <motion.div
                key={hotel.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-4xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-500 group flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="relative w-full sm:w-44 md:w-48 lg:w-56 flex-shrink-0 overflow-hidden">
                  {/* Fixed aspect ratio on mobile, full height on sm+ */}
                  <div className="relative aspect-[16/9] sm:aspect-auto sm:h-full min-h-[180px]">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 176px, (max-width: 1024px) 192px, 224px"
                    />
                    {/* Badge — top left, always inside overflow-hidden parent */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/90 text-saffron-600 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {hotel.badge}
                      </span>
                    </div>
                    {/* Hotel type chip — bottom left */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {hotel.hotelType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex flex-col justify-between flex-1 min-w-0">
                  <div className="min-w-0">
                    {/* Hotel name + star rating */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-playfair font-bold text-gray-800 text-lg sm:text-xl group-hover:text-saffron-600 transition-colors min-w-0 break-words leading-tight">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0 bg-golden-50 px-2 py-1 rounded-lg">
                        <Star size={13} className="fill-golden-400 text-golden-400" />
                        <span className="text-sm font-bold text-gray-800">{hotel.rating}</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 sm:mb-3">
                      <MapPin size={11} className="text-saffron-400 flex-shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-2 sm:mb-3 line-clamp-2 sm:line-clamp-3">
                      {hotel.description}
                    </p>

                    {/* Amenity tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.amenities.slice(0, 4).map((a) => (
                        <span
                          key={a}
                          className="flex items-center gap-1 text-xs bg-cream-50 text-gray-600 px-2.5 py-1 rounded-full"
                        >
                          <CheckCircle size={10} className="text-saffron-400 flex-shrink-0" /> {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-cream-100">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-saffron-600">
                        ₹{hotel.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-gray-400 text-sm ml-1">/night</span>
                    </div>
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white font-semibold px-4 py-2.5 rounded-2xl transition-all hover:scale-105 text-sm hover:shadow-warm whitespace-nowrap"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* Empty state */
            <motion.div
              key="empty"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="col-span-full flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="text-5xl mb-4">🏨</div>
              <h3 className="font-playfair text-2xl font-bold text-gray-700 mb-2">
                No hotels found
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                No hotels currently listed under <span className="font-semibold text-saffron-500">{activeFilter}</span>.
                <br />Try a different category or{' '}
                <button
                  onClick={() => setActiveFilter('All')}
                  className="text-saffron-600 font-semibold hover:underline"
                >
                  view all hotels
                </button>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  )
}
