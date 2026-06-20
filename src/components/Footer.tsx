'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'
import { navLinks, WHATSAPP_URL } from '@/data/data'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cream-50 to-cream-100 border-t border-cream-200">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-400 to-golden-500 flex items-center justify-center">
                <span className="text-white text-xl">🪔</span>
              </div>
              <div>
                <div className="font-playfair font-bold text-xl text-gray-800">Banaras Ghat</div>
                <div className="text-xs text-saffron-500 font-semibold tracking-widest uppercase">Spiritual Travel</div>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Your trusted partner for authentic spiritual journeys, luxury travel experiences, and unforgettable memories in the sacred city of Varanasi.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-500 hover:text-saffron-500 hover:shadow-warm transition-all duration-300 hover:scale-110">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-500 hover:text-saffron-500 hover:shadow-warm transition-all duration-300 hover:scale-110">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center text-gray-500 hover:text-saffron-500 hover:shadow-warm transition-all duration-300 hover:scale-110">
                <Youtube size={16} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-all duration-300 hover:scale-110">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.527 5.84L.057 23.49a.5.5 0 0 0 .603.644l5.833-1.528A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.607-.504-5.107-1.382l-.363-.217-3.766.986.986-3.663-.234-.374A9.953 9.953 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair font-bold text-gray-800 text-lg mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-saffron-600 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-300 group-hover:bg-saffron-500 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair font-bold text-gray-800 text-lg mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {['Tour Packages', 'Ganga Aarti Tours', 'Sunrise Boat Rides', 'Luxury Hotels', 'Airport Cabs', 'Heritage Walks', 'Photography Tours', 'Honeymoon Packages'].map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-500 flex items-center gap-2 group cursor-default">
                    <span className="w-1 h-1 rounded-full bg-saffron-300" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair font-bold text-gray-800 text-lg mb-5">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+919415778214" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-saffron-50 flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-100 transition-colors">
                  <Phone size={14} className="text-saffron-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Call / WhatsApp</div>
                  <div className="text-sm text-gray-700 group-hover:text-saffron-600 transition-colors font-medium">+91 94157 78214</div>
                </div>
              </a>
              <a href="mailto:info@banarasghat.com" className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-saffron-50 flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-100 transition-colors">
                  <Mail size={14} className="text-saffron-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Email</div>
                  <div className="text-sm text-gray-700 group-hover:text-saffron-600 transition-colors font-medium">info@banarasghat.com</div>
                </div>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-saffron-50 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-saffron-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">Office</div>
                  <div className="text-sm text-gray-700 font-medium">Dashashwamedh Ghat Road,<br />Varanasi — 221001, UP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream-200 py-5">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Banaras Ghat. All rights reserved. Crafted with 🧡 in Varanasi.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <Link href="#" className="hover:text-saffron-500 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-saffron-500 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-saffron-500 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
