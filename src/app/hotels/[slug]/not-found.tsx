import Link from 'next/link'
import { ArrowLeft, SearchX } from 'lucide-react'

export default function HotelNotFound() {
  return (
    <section className="pt-32 pb-20 bg-white">
      <div className="container-custom">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-saffron-50 flex items-center justify-center mx-auto mb-6">
            <SearchX size={36} className="text-saffron-500" />
          </div>
          <h1 className="font-playfair text-3xl font-bold text-gray-800 mb-3">
            Hotel Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The hotel you are looking for does not exist or may have been removed.
          </p>
          <Link
            href="/hotels"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-warm hover:scale-105 transition-all"
          >
            <ArrowLeft size={16} />
            Browse All Hotels
          </Link>
        </div>
      </div>
    </section>
  )
}