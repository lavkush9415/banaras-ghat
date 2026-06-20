'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, User, Phone as PhoneIcon, ChevronDown, MessageSquare } from 'lucide-react'
import { FadeIn } from './AnimatedSection'
import { WHATSAPP_URL } from '@/data/data'

const services = [
  'Tour Package', 'Boat Ride', 'Hotel Booking', 'Cab Service',
  'Ganga Aarti Tour', 'Photography Tour', 'Honeymoon Package', 'Custom Tour',
]

export default function CallbackForm() {
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number'
    if (!form.service) e.service = 'Please select a service'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', phone: '', service: '', message: '' })
  }

  return (
    <section className="section-padding bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <FadeIn direction="left">
            <span className="section-badge mb-4">
              <span>📞</span> Request a Callback
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3 mb-4">
              Let Us Plan Your{' '}
              <span className="text-gradient-saffron">Dream Journey</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Fill in your details and our travel experts will call you back within 30 minutes to craft a personalized Varanasi experience just for you.
            </p>
            <div className="space-y-4">
              {[
                { icon: '⚡', title: '30-Minute Callback', desc: 'Our team calls you back quickly' },
                { icon: '🎯', title: 'Personalized Planning', desc: 'Custom itinerary crafted for you' },
                { icon: '💯', title: 'Zero Obligation', desc: 'Free consultation, no pressure' },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Right Form */}
          <FadeIn direction="right">
            <div className="bg-white rounded-4xl shadow-card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-saffron-50 to-golden-50 rounded-bl-full opacity-60" />

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    className="absolute inset-4 bg-white rounded-3xl flex flex-col items-center justify-center z-10 shadow-card"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                      className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
                    >
                      <CheckCircle size={40} className="text-green-500" />
                    </motion.div>
                    <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-2">Request Sent!</h3>
                    <p className="text-gray-500 text-center text-sm">Our team will call you back within 30 minutes. 🙏</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="font-playfair text-2xl font-bold text-gray-800 mb-6 relative z-10">
                Book a Free Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
                      placeholder="Enter your full name"
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl border bg-cream-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all text-sm ${errors.name ? 'border-red-300' : 'border-cream-200'}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                  <div className="relative">
                    <PhoneIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }) }}
                      placeholder="10-digit mobile number"
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl border bg-cream-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all text-sm ${errors.phone ? 'border-red-300' : 'border-cream-200'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service Interested In *</label>
                  <div className="relative">
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <select
                      value={form.service}
                      onChange={(e) => { setForm({ ...form, service: e.target.value }); setErrors({ ...errors, service: '' }) }}
                      className={`w-full pl-4 pr-10 py-3 rounded-2xl border bg-cream-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all text-sm appearance-none ${errors.service ? 'border-red-300' : 'border-cream-200'}`}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message (Optional)</label>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-4 top-3.5 text-gray-400" />
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your travel plans, dates, group size..."
                      rows={3}
                      className="w-full pl-11 pr-4 py-3 rounded-2xl border border-cream-200 bg-cream-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-saffron-300 transition-all text-sm resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-saffron-500 to-golden-500 text-white font-semibold py-3.5 rounded-2xl hover:shadow-warm hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Request Free Callback
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Or{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">
                    chat on WhatsApp
                  </a>{' '}
                  for instant response
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
