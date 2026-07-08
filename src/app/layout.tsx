import type { Metadata } from 'next'
import { Poppins, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Varanasi Heritage Tour & Travels | Spiritual Journeys & Luxury Travel in Varanasi",
  description:
    "Experience the soul of Banaras with premium tour packages, sacred Ganga Aarti experiences, luxury boat rides, and curated spiritual journeys.",

  icons: {
    icon: "/favicon.png",
  },

  openGraph: {
    title: "Varanasi Heritage Tour & Travels | Spiritual Journeys & Luxury Travel",
    description:
      "Discover the magic of Banaras — Ganga Aarti, sacred ghats, luxury boats, and unforgettable spiritual experiences.",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="font-poppins bg-[#fffdf9] text-gray-700 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
