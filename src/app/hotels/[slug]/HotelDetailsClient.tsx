'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, MapPin, Phone, ArrowLeft, Share2, CheckCircle,
  Clock, Users, Wifi, Coffee, Snowflake, Utensils,
  ChevronLeft, ChevronRight, X, ExternalLink,
  MessageCircle, Images, Tag, BedDouble,
} from 'lucide-react'
import { WHATSAPP_URL } from '@/data/data'
import { FadeIn, StaggerChildren, childVariants } from '@/components/AnimatedSection'

// ─── Types ───────────────────────────────────────────────────────────────────

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
  hotelType?: string
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
  roomTypes: RoomType[]
  policies: { checkIn: string; checkOut: string; cancellation: string; payment: string; children: string }
  nearbyAttractions: { name: string; distance: string; type: string }[]
  guestReviews: { name: string; city: string; rating: number; date: string; comment: string }[]
}

interface Props {
  hotel: Hotel
  similarHotels: Hotel[]
}

// ─── Amenity icon lookup ──────────────────────────────────────────────────────

const amenityIcons: Record<string, React.ReactNode> = {
  'Pool': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M2 20c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" strokeLinecap="round"/><path d="M2 16c2-2 4-3 6-3s4 1 6 3 4 3 6 3 4-1 6-3" strokeLinecap="round" opacity="0.5"/></svg>,
  'Spa': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M12 22c-2-3-6-5-10-5 0 4 3 8 10 10 7-2 10-6 10-10-4 0-8 2-10 5z"/></svg>,
  'Fine Dining': <Utensils className="w-5 h-5 flex-shrink-0" />,
  'Ganga View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><circle cx="12" cy="8" r="4"/><path d="M12 22v-6"/><path d="M8 12h8"/></svg>,
  'Concierge': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  'Rooftop Restaurant': <Utensils className="w-5 h-5 flex-shrink-0" />,
  'Yoga': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M5 21c.5-1.5 2-4 7-4s6.5 2.5 7 4"/><path d="M12 12v4"/></svg>,
  'River View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M2 12h20"/><path d="M6 8v8"/><path d="M18 8v8"/><path d="M10 6v12"/><path d="M14 6v12"/></svg>,
  'AC Rooms': <Snowflake className="w-5 h-5 flex-shrink-0" />,
  'Clean Rooms': <CheckCircle className="w-5 h-5 flex-shrink-0" />,
  'Free Breakfast': <Coffee className="w-5 h-5 flex-shrink-0" />,
  'WiFi': <Wifi className="w-5 h-5 flex-shrink-0" />,
  'City View': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><rect x="4" y="8" width="16" height="12" rx="1"/><path d="M8 8V4h8v4"/></svg>,
  'Heritage Architecture': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><path d="M3 21h18"/><path d="M5 21V5l7-3 7 3v16"/><path d="M9 9h1"/><path d="M14 9h1"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>,
  'Private Terrace': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><path d="M12 9v12"/></svg>,
  'Ganga Puja': <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M6 12h12"/></svg>,
}

function getAmenityIcon(name: string) {
  return amenityIcons[name] ?? <CheckCircle className="w-5 h-5 flex-shrink-0" />
}

// ─── Room type badge colours ──────────────────────────────────────────────────

const ROOM_TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'Luxury':       { bg: 'bg-purple-100',  text: 'text-purple-700' },
  'Premium':      { bg: 'bg-blue-100',    text: 'text-blue-700' },
  'Deluxe':       { bg: 'bg-saffron-100', text: 'text-saffron-700' },
  'Twin Deluxe':  { bg: 'bg-golden-100',  text: 'text-golden-700' },
  'Super Deluxe': { bg: 'bg-peach-100',   text: 'text-peach-700' },
  'Suites':       { bg: 'bg-green-100',   text: 'text-green-700' },
  'Budget':       { bg: 'bg-gray-100',    text: 'text-gray-600' },
}

function RoomTypeBadge({ roomType }: { roomType: string }) {
  const colors = ROOM_TYPE_COLORS[roomType] ?? { bg: 'bg-cream-100', text: 'text-gray-600' }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${colors.bg} ${colors.text}`}>
      <Tag size={10} className="flex-shrink-0" />
      {roomType}
    </span>
  )
}

// ─── Room Card ───────────────────────────────────────────────────────────────

interface RoomCardProps {
  room: RoomType
  hotelName: string
  onOpenLightbox: (images: string[], index: number) => void
  index: number
}

function RoomCard({ room, hotelName, onOpenLightbox, index }: RoomCardProps) {
  const [activeImg, setActiveImg] = useState(0)

  const whatsappMsg = encodeURIComponent(
    `Hello Varanasi Heritage Tour and Travels, I'd like to book the ${room.type} at ${hotelName}. Please share availability and pricing.`
  )
  const whatsappLink = `https://wa.me/919305756027?text=${whatsappMsg}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      /* Card: full width, overflow hidden to clip children, no fixed widths */
      className="w-full max-w-full bg-white border border-cream-200 rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group"
    >
      {/*
        Layout:
          Mobile  (< md) → stacked: image on top, details below
          Desktop (≥ md) → side-by-side: image left, details right
      */}
      <div className="flex flex-col md:flex-row w-full">

        {/* ── Image column ──────────────────────────────────────────── */}
        {/*
          Mobile:  w-full, aspect-[4/3] so height = 75% of width
          Desktop: fixed width column, auto height stretches to match details panel
        */}
        <div className="w-full md:w-56 lg:w-64 md:flex-shrink-0 md:flex-grow-0">
          {/* Main image */}
          <div
            className="relative w-full aspect-[4/3] md:aspect-auto md:h-full md:min-h-[220px] overflow-hidden cursor-pointer"
            onClick={() => onOpenLightbox(room.images, activeImg)}
          >
            <Image
              src={room.images[activeImg] ?? room.images[0]}
              alt={`${room.type} — ${hotelName}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 256px"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            {/* View Gallery hint */}
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Images size={11} />
              View Gallery
            </div>
            {/* Room-type badge */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <RoomTypeBadge roomType={room.roomType} />
            </div>
          </div>

          {/* Thumbnail strip — scrollable, hidden scrollbar */}
          {room.images.length > 1 && (
            <div className="flex gap-1.5 p-2 bg-gray-50 overflow-x-auto scrollbar-hide">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-12 h-9 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeImg
                      ? 'border-saffron-500 scale-105'
                      : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="48px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details column ────────────────────────────────────────── */}
        {/*
          flex-1 + min-w-0 + overflow-hidden: ensures this column
          never grows wider than the remaining space.
        */}
        <div className="flex flex-col justify-between p-4 sm:p-5 flex-1 min-w-0 overflow-hidden">

          {/* Top content block */}
          <div className="min-w-0">

            {/*
              ── Title (full width, own row always) ──────────────────
              Never competes with price — price is on the row below.
            */}
            <h3 className="font-playfair font-bold text-gray-800 text-lg sm:text-xl leading-tight break-words min-w-0 mb-2">
              {room.type}
            </h3>

            {/*
              ── Capacity + Price row ─────────────────────────────────
              Price has flex-shrink-0 → it never gets clipped/cut.
              If both can't fit they wrap: capacity first, price below.
            */}
            <div className="flex items-center justify-between gap-x-3 gap-y-1 flex-wrap mb-3">
              {/* Capacity */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500 min-w-0">
                <BedDouble size={14} className="text-saffron-400 flex-shrink-0" />
                <span className="truncate">{room.capacity}</span>
              </div>
              {/* Price — flex-shrink-0 so ₹ NEVER gets cut */}
              <div className="flex-shrink-0 text-right">
                <span className="text-lg sm:text-xl font-bold text-saffron-600">
                  ₹{room.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-400 ml-1">/ night</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-3 break-words overflow-hidden">
              {room.description}
            </p>

            {/*
              ── Amenity badges ───────────────────────────────────────
              flex-wrap: badges wrap to next line when there's no room.
              whitespace-nowrap on each badge: the badge itself never
              breaks mid-word; wrapping happens between badges only.
              overflow-hidden on the container stops any stray overflow.
            */}
            <div className="flex flex-wrap gap-1.5 overflow-hidden">
              {room.amenities.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 text-xs bg-saffron-50 text-saffron-700 px-2.5 py-1 rounded-full font-medium whitespace-nowrap"
                >
                  <CheckCircle size={10} className="text-saffron-400 flex-shrink-0" />
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/*
            ── CTA Buttons ─────────────────────────────────────────────
            Mobile  (< sm): grid 1-col → full-width stacked buttons
            Desktop (≥ sm): grid 2-col → side-by-side buttons
            w-full on each anchor ensures they fill their grid cell.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-cream-100">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-2.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm"
            >
              <MessageCircle size={15} className="flex-shrink-0" />
              WhatsApp
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-sm font-semibold py-2.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-warm"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxState {
  images: string[]
  index: number
  label: string
}

function Lightbox({
  state,
  onClose,
}: {
  state: LightboxState
  onClose: () => void
}) {
  const [current, setCurrent] = useState(state.index)
  const prev = () => setCurrent((c) => (c === 0 ? state.images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === state.images.length - 1 ? 0 : c + 1))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/92 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Image — mx accounts for prev/next button widths on small screens */}
      <motion.div
        key={current}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl aspect-video mx-10 sm:mx-14 rounded-xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={state.images[current]}
          alt={`${state.label} ${current + 1}`}
          fill
          className="object-contain"
          sizes="90vw"
        />
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors z-10"
      >
        <ChevronRight size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
        {current + 1} / {state.images.length}
      </div>

      {/* Thumbnail row — scrollable, hidden scrollbar */}
      <div
        className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto scrollbar-hide px-2"
        onClick={(e) => e.stopPropagation()}
      >
        {state.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative w-11 h-8 sm:w-14 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              i === current ? 'border-saffron-500 scale-110' : 'border-white/30 opacity-60 hover:opacity-100'
            }`}
          >
            <Image src={img} alt="" fill className="object-cover" sizes="56px" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HotelDetailsClient({ hotel, similarHotels }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxState, setLightboxState] = useState<LightboxState>({
    images: hotel.images,
    index: 0,
    label: hotel.name,
  })

  const openHotelLightbox = (index: number) => {
    setLightboxState({ images: hotel.images, index, label: hotel.name })
    setLightboxOpen(true)
  }

  const openRoomLightbox = (images: string[], index: number) => {
    setLightboxState({ images, index, label: hotel.name })
    setLightboxOpen(true)
  }

  const shareHotel = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: hotel.name, text: hotel.description, url: window.location.href })
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <>
      {/*
        overflow-x-hidden on the section is the last-resort guard:
        nothing inside this section can cause a horizontal scrollbar.
      */}
      <section className="pb-12 md:pb-20 bg-white overflow-x-hidden">
        <div className="container-custom">

          {/* ── Back / Share ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-4 md:mb-6 pt-4">
            <Link
              href="/hotels"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-saffron-600 transition-colors font-medium"
            >
              <ArrowLeft size={16} className="flex-shrink-0" />
              <span>Back to Hotels</span>
            </Link>
            <button
              onClick={shareHotel}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-saffron-600 transition-colors font-medium"
            >
              <Share2 size={16} className="flex-shrink-0" />
              Share
            </button>
          </div>

          {/* ── Hotel Image Gallery ───────────────────────────────────── */}
          <div className="mb-6 md:mb-10 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
              {/* Main image: full 2-col width on mobile & desktop */}
              <div
                className="col-span-2 md:col-span-2 md:row-span-2 relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-auto md:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer group"
                onClick={() => openHotelLightbox(0)}
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
                <div className="absolute bottom-3 right-3 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  View Gallery
                </div>
              </div>

              {/* Sub-images */}
              {hotel.images.slice(1, 4).map((img, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[200px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => openHotelLightbox(i + 1)}
                >
                  <Image
                    src={img}
                    alt={`${hotel.name} ${i + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Main Content Grid ─────────────────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10">

            {/* ── Left column ───────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8 md:space-y-10 min-w-0 overflow-hidden">

              {/* Hotel Header */}
              <FadeIn>
                <div className="w-full min-w-0">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                      {hotel.badge}
                    </span>
                    <span className="inline-block text-xs text-gray-400 bg-cream-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {hotel.category}
                    </span>
                  </div>

                  {/* Hotel name */}
                  <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 break-words leading-tight mb-2">
                    {hotel.name}
                  </h1>

                  {/* Rating + location */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={15} className="fill-golden-400 text-golden-400 flex-shrink-0" />
                      <span className="font-bold text-gray-800 text-sm">{hotel.rating}</span>
                      <span className="text-gray-400 text-xs">({hotel.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm min-w-0">
                      <MapPin size={13} className="text-saffron-400 flex-shrink-0" />
                      <a
                        href={`https://maps.google.com?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-saffron-600 transition-colors break-words truncate"
                      >
                        {hotel.location}
                      </a>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-saffron-600">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">per night</span>
                  </div>
                </div>
              </FadeIn>

              {/* About */}
              <FadeIn>
                <div className="min-w-0">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                    About This Hotel
                  </h2>
                  <p className="text-gray-600 leading-relaxed break-words">{hotel.fullDescription}</p>
                </div>
              </FadeIn>

              {/* Amenities grid */}
              <FadeIn>
                <div className="min-w-0">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Amenities &amp; Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                    {hotel.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 bg-cream-50 rounded-2xl p-3 sm:p-3.5 group hover:bg-saffron-50 transition-colors min-w-0"
                      >
                        <div className="text-saffron-500 group-hover:scale-110 transition-transform flex-shrink-0">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-sm font-medium text-gray-700 break-words min-w-0">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* ── Room Cards ─────────────────────────────────────── */}
              <FadeIn>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
                    <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800">
                      Available Room Types
                    </h2>
                    <span className="text-xs text-gray-400 bg-cream-100 px-3 py-1.5 rounded-full font-medium whitespace-nowrap">
                      {hotel.roomTypes.length} room{hotel.roomTypes.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="space-y-4 sm:space-y-5">
                    {hotel.roomTypes.map((room, i) => (
                      <RoomCard
                        key={room.type}
                        room={room}
                        hotelName={hotel.name}
                        onOpenLightbox={openRoomLightbox}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Hotel Policies */}
              <FadeIn>
                <div className="min-w-0">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Hotel Policies
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { icon: <Clock size={18} />, label: 'Check-In', value: hotel.policies.checkIn },
                      { icon: <Clock size={18} />, label: 'Check-Out', value: hotel.policies.checkOut },
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                            <path d="M3 10h18"/><path d="M5 6h14"/><path d="M8 14h8"/><path d="M6 18h12"/>
                          </svg>
                        ),
                        label: 'Cancellation',
                        value: hotel.policies.cancellation,
                      },
                      {
                        icon: (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                          </svg>
                        ),
                        label: 'Payment',
                        value: hotel.policies.payment,
                      },
                      { icon: <Users size={18} />, label: 'Children', value: hotel.policies.children, wide: true },
                    ].map((policy, i) => (
                      <div
                        key={i}
                        className={`bg-cream-50 rounded-2xl p-3 sm:p-4 ${policy.wide ? 'sm:col-span-2' : ''}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-saffron-500 flex-shrink-0">
                            {policy.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs text-gray-400 font-medium">{policy.label}</div>
                            <div className="text-sm text-gray-700 font-medium mt-0.5 break-words">{policy.value}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Nearby Attractions */}
              <FadeIn>
                <div className="min-w-0">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Nearby Attractions
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {hotel.nearbyAttractions.map((attraction) => (
                      <div key={attraction.name} className="flex items-center gap-3 bg-cream-50 rounded-2xl p-3 sm:p-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-saffron-500 flex-shrink-0">
                          {attraction.type === 'Ghat' ? (
                            <MapPin size={18} />
                          ) : attraction.type === 'Temple' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                              <path d="M4 8h16"/><path d="M8 8v12"/><path d="M16 8v12"/><path d="M6 20h12"/><path d="M12 2l8 6H4z"/>
                            </svg>
                          ) : attraction.type === 'University' ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px]">
                              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.1 2.2 2 6 2s6-.9 6-2v-5"/>
                            </svg>
                          ) : (
                            <MapPin size={18} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 text-sm break-words">{attraction.name}</div>
                          <div className="text-xs text-gray-400">{attraction.distance} away</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Guest Reviews */}
              <FadeIn>
                <div className="min-w-0">
                  <h2 className="font-playfair text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Guest Reviews
                  </h2>
                  {/* Rating summary */}
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="text-4xl font-bold text-gradient-saffron leading-none">{hotel.rating}</div>
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

                  {/* Review cards */}
                  <div className="space-y-3 sm:space-y-4">
                    {hotel.guestReviews.map((review, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-cream-50 rounded-2xl sm:rounded-3xl p-4 sm:p-5 min-w-0"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div className="min-w-0">
                            <div className="font-semibold text-gray-800 break-words">{review.name}</div>
                            <div className="text-xs text-gray-400">
                              {review.city} · {review.date}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg flex-shrink-0">
                            <Star size={12} className="fill-golden-400 text-golden-400" />
                            <span className="text-xs font-bold text-gray-800">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic break-words">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* ── Right Sidebar (Booking Card) ─────────────────────── */}
            <div className="lg:col-span-1 min-w-0">
              {/*
                Mobile / tablet: renders in normal document flow below left column.
                Desktop (lg+): sticky sidebar.
              */}
              <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-5">
                <FadeIn>
                  <div className="bg-white border border-cream-200 rounded-3xl sm:rounded-4xl p-5 sm:p-6 shadow-card w-full">
                    {/* Price */}
                    <div className="text-center mb-5 sm:mb-6">
                      <div className="text-2xl sm:text-3xl font-bold text-saffron-600">
                        ₹{hotel.pricePerNight.toLocaleString()}
                      </div>
                      <div className="text-gray-400 text-sm">per night</div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 sm:space-y-3">
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-3.5 rounded-2xl transition-all hover:scale-[1.02] shadow-sm text-sm"
                      >
                        <MessageCircle size={18} className="flex-shrink-0" />
                        Enquire on WhatsApp
                      </a>
                      <a
                        href="tel:+919305756027"
                        className="w-full flex items-center justify-center gap-2 border-2 border-saffron-200 text-saffron-600 font-semibold py-3 sm:py-3.5 rounded-2xl hover:bg-saffron-50 transition-all text-sm"
                      >
                        <Phone size={18} className="flex-shrink-0" />
                        Call Now
                      </a>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white font-semibold py-3 sm:py-3.5 rounded-2xl hover:shadow-warm hover:scale-[1.02] transition-all text-sm"
                      >
                        Book Now
                      </a>
                    </div>

                    {/* Trust badges */}
                    <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-cream-100 space-y-2">
                      {[
                        'Free cancellation available',
                        'Best price guaranteed',
                        'Instant confirmation',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-gray-500">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                          <span className="break-words">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Map link */}
                    <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-cream-100">
                      <a
                        href={`https://maps.google.com?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-saffron-600 font-medium hover:underline flex-wrap"
                      >
                        <MapPin size={15} className="flex-shrink-0" />
                        <span>View on Google Maps</span>
                        <ExternalLink size={12} className="flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>

          {/* ── Similar Hotels ────────────────────────────────────────── */}
          {similarHotels.length > 0 && (
            <section className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-cream-200">
              <FadeIn className="text-center mb-6 sm:mb-10">
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800">
                  Similar <span className="text-gradient-saffron">Hotels</span>
                </h2>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                  Explore more handpicked accommodations in Varanasi
                </p>
              </FadeIn>

              <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {similarHotels.map((h) => (
                  <motion.div key={h.id} variants={childVariants} className="min-w-0">
                    <Link
                      href={`/hotels/${h.slug}`}
                      className="block bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 group w-full"
                    >
                      {/* Image with aspect ratio */}
                      <div className="relative w-full aspect-[16/9] overflow-hidden">
                        <Image
                          src={h.image}
                          alt={h.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 text-saffron-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                            {h.badge}
                          </span>
                        </div>
                      </div>
                      {/* Card body */}
                      <div className="p-3 sm:p-4 min-w-0">
                        <h3 className="font-playfair font-bold text-gray-800 group-hover:text-saffron-600 transition-colors break-words leading-tight mb-1">
                          {h.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 min-w-0">
                          <MapPin size={11} className="text-saffron-400 flex-shrink-0" />
                          <span className="truncate">{h.location}</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 pt-2 sm:pt-3 border-t border-cream-100 flex-wrap">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="fill-golden-400 text-golden-400" />
                            <span className="text-xs font-semibold text-gray-800">{h.rating}</span>
                            <span className="text-xs text-gray-400">({h.reviews})</span>
                          </div>
                          <div className="text-sm font-bold text-saffron-600 flex-shrink-0">
                            ₹{h.pricePerNight.toLocaleString()}
                            <span className="text-xs text-gray-400 font-normal">/night</span>
                          </div>
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

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            state={lightboxState}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}