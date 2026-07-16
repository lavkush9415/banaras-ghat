import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://varanasiheritagetourandtravels.com"),

  title: {
    default:
      "Varanasi Heritage Tour & Travels | Hotel Booking, Boat Ride, Cab & Tour Packages",
    template: "%s | Varanasi Heritage Tour & Travels",
  },

  description:
    "Book hotel booking, boat rides, cab services, airport transfers and customized Varanasi tour packages with Varanasi Heritage Tour & Travels. Experience Ganga Aarti, Kashi Vishwanath Temple, Sarnath and more.",

  keywords: [
    "Varanasi Tour Packages",
    "Varanasi Tour",
    "Boat Ride Varanasi",
    "Hotel Booking Varanasi",
    "Cab Service Varanasi",
    "Airport Transfer Varanasi",
    "Ganga Aarti",
    "Kashi Vishwanath",
    "Sarnath Tour",
    "Travel Agency Varanasi",
    "Varanasi Heritage Tour & Travels",
  ],

  authors: [{ name: "Varanasi Heritage Tour & Travels" }],

  creator: "Varanasi Heritage Tour & Travels",

  publisher: "Varanasi Heritage Tour & Travels",

  alternates: {
    canonical: "https://varanasiheritagetourandtravels.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },

  openGraph: {
    title:
      "Varanasi Heritage Tour & Travels | Hotel Booking, Boat Ride, Cab & Tour Packages",

    description:
      "Book hotels, boat rides, cab services and customized Varanasi tour packages with Varanasi Heritage Tour & Travels.",

    url: "https://varanasiheritagetourandtravels.com",

    siteName: "Varanasi Heritage Tour & Travels",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Varanasi Heritage Tour & Travels",
      },
    ],
  },

  twitter: {
  card: "summary_large_image",
  title: "Varanasi Heritage Tour & Travels | Hotel Booking, Boat Ride & Tour Packages",
  description:
    "Book hotels, boat rides, cab services and customized Varanasi tour packages.",
  images: ["/og.png"],
},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Varanasi Heritage Tour & Travels",
    url: "https://varanasiheritagetourandtravels.com",
    logo: "https://varanasiheritagetourandtravels.com/logo2.png",
    image: "https://varanasiheritagetourandtravels.com/og-image.jpg",
    telephone: "+91-9305756027",
    email: "glctechsolutions94@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Varanasi",
      addressRegion: "Uttar Pradesh",
      postalCode: "221001",
      addressCountry: "IN",
    },
    areaServed: [
      "Varanasi",
      "Sarnath",
      "Prayagraj",
      "Ayodhya",
    ],
    sameAs: [
      "https://www.instagram.com/",
      "https://www.facebook.com/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body className="font-poppins bg-[#fffdf9] text-gray-700 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />

        <Navbar />

        <main>{children}</main>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}