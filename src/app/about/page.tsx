import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Award, Heart, Shield, Users } from 'lucide-react'
import { FadeIn, StaggerChildren } from '@/components/AnimatedSection'
import CallbackForm from '@/components/CallbackForm'

export const metadata: Metadata = {
  title: 'About Us | Banaras Ghat — Your Varanasi Travel Partner',
  description: 'Learn about Banaras Ghat — a decade of curating authentic, spiritual, and luxury travel experiences in the sacred city of Varanasi.',
}

const team = [
  { name: 'Rajesh Kumar Singh', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', exp: '15 Years' },
  { name: 'Priya Mishra', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', exp: '10 Years' },
  { name: 'Amit Gupta', role: 'Lead Tour Guide', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', exp: '12 Years' },
  { name: 'Sunita Sharma', role: 'Customer Experience', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', exp: '8 Years' },
]

const values = [
  { icon: <Heart className="w-6 h-6" />, title: 'Authentic Experiences', desc: 'Every tour is crafted to provide genuine connections with Varanasi\'s culture, history, and spirituality.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Safety First', desc: 'All our staff are trained, licensed, and background-verified for your complete peace of mind.' },
  { icon: <Award className="w-6 h-6" />, title: 'Excellence Always', desc: 'We hold ourselves to the highest standards of quality and service in every interaction.' },
  { icon: <Users className="w-6 h-6" />, title: 'Community Focused', desc: 'We work with local artisans, boat operators, and guides to support the Varanasi community.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-saffron-50 via-cream-50 to-golden-50 overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-saffron-100/50 blur-3xl" />
        <div className="container-custom">
          <FadeIn className="text-center max-w-3xl mx-auto">
            <span className="section-badge mb-5"><span>🙏</span> Our Story</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-5">
              A Decade of Creating{' '}
              <span className="text-gradient-saffron italic">Sacred Memories</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Born from a deep love for Banaras and its timeless soul, Banaras Ghat was founded with one mission: to share the magic of Varanasi with the world — authentically, responsibly, and beautifully.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-card-hover h-80">
                  <Image
                    src="https://images.unsplash.com/photo-1561361058-c24e019e4c3e?w=800&q=80"
                    alt="Varanasi Ghats"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-white rounded-3xl shadow-warm p-5 text-center">
                  <div className="font-playfair text-4xl font-bold text-gradient-saffron">10+</div>
                  <div className="text-sm text-gray-500 font-medium">Years of Service</div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <span className="section-badge mb-4"><span>📖</span> Our Journey</span>
              <h2 className="font-playfair text-3xl font-bold text-gray-800 mt-3 mb-5">
                From Ghat to <span className="text-gradient-saffron">Glory</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">
                Founded in 2014 by Rajesh Kumar Singh — a native Banarasi and passionate travel enthusiast — Banaras Ghat started as a small boat tour service at Dashashwamedh Ghat. What began with two boats and a dream has grown into Varanasi&apos;s most trusted multi-service travel company.
              </p>
              <p className="text-gray-500 leading-relaxed mb-6">
                Today, we serve 5,000+ travelers annually with a comprehensive portfolio including tour packages, luxury boat rides, hotel bookings, cab services, and photography tours. Every experience we offer is infused with our deep respect for Banaras&apos;s spiritual heritage.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800">
              Our Core <span className="text-gradient-saffron">Values</span>
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-3xl p-6 shadow-card text-center hover:shadow-warm transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-saffron-50 text-saffron-500 flex items-center justify-center mx-auto mb-4">
                  {v.icon}
                </div>
                <h3 className="font-playfair font-bold text-gray-800 text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <FadeIn className="text-center mb-12">
            <span className="section-badge mb-4"><span>👥</span> Our Team</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-800 mt-3">
              The <span className="text-gradient-saffron">People</span> Behind the Magic
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 text-center group">
                <div className="relative h-56 overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 bg-white/90 text-saffron-600 text-xs font-bold px-2.5 py-1 rounded-full">
                    {member.exp} exp
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-playfair font-bold text-gray-800 text-lg">{member.name}</h3>
                  <p className="text-saffron-500 text-sm font-medium mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallbackForm />
    </>
  )
}
