import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { FadeIn } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'
import { WHATSAPP_URL } from '@/data/data'

export const metadata: Metadata = {
  title: 'Contact Us | Heritage Tour & Travels — Get in Touch',
  description: 'Contact Heritage Tour & Travels for tour bookings, hotel reservations, and travel inquiries. We respond within 30 minutes.',
}

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Call / WhatsApp',
    details: ['+91 94157 78214', 'Available 9 AM – 9 PM'],
    action: { label: 'Call Now', href: 'tel:+919415778214' },
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Email Us',
    details: ['info@banarasghat.com', 'Reply within 2 hours'],
    action: { label: 'Send Email', href: 'mailto:info@banarasghat.com' },
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Visit Our Office',
    details: ['Dashashwamedh Ghat Road', 'Varanasi — 221001, Uttar Pradesh'],
    action: { label: 'Get Directions', href: 'https://maps.google.com' },
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Working Hours',
    details: ['Mon – Sat: 9:00 AM – 9:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
    action: null,
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto">
            <span className="section-badge mb-5"><span>📞</span> Contact Us</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              We&apos;re Here to{' '}
              <span className="text-gradient-saffron italic">Help You</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Have a question or ready to book? Reach out to our team — we&apos;ll respond within 30 minutes!
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, i) => (
              <FadeIn key={info.title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-6 shadow-card hover:shadow-warm transition-all duration-300 text-center group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className="font-playfair font-bold text-gray-800 text-lg mb-3">{info.title}</h3>
                  <div className="flex-1">
                    {info.details.map((d) => (
                      <p key={d} className="text-gray-500 text-sm mb-1">{d}</p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action.href}
                      target={info.action.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="mt-4 inline-block bg-gradient-to-r from-saffron-500 to-golden-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-warm hover:scale-105 transition-all duration-300"
                    >
                      {info.action.label}
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* WhatsApp Banner */}
          <FadeIn>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-4xl p-8 md:p-12 text-center text-white mb-16 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10" />
              <div className="relative">
                <div className="text-5xl mb-4">💬</div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3">
                  Fastest Response on WhatsApp
                </h2>
                <p className="text-green-100 mb-6 max-w-lg mx-auto">
                  Chat with our travel experts instantly. Get personalized quotes, package details, and booking confirmations — all on WhatsApp.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-green-600 font-bold px-8 py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-green-500">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.112 1.527 5.84L.057 23.49a.5.5 0 0 0 .603.644l5.833-1.528A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.86 0-3.607-.504-5.107-1.382l-.363-.217-3.766.986.986-3.663-.234-.374A9.953 9.953 0 0 1 2 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CallbackForm />
    </>
  )
}
