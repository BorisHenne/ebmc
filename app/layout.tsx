import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://ebmcgroup.eu'),
  title: {
    default: 'EBMC GROUP - L\'union européenne de l\'expertise digitale',
    template: '%s | EBMC GROUP',
  },
  description:
    'Votre ESN de référence en Europe. Expertise SAP, ICT, Cybersécurité et Intelligence Artificielle. Depuis 2006, nous accompagnons les transformations numériques à fort enjeu.',
  keywords: [
    'ESN',
    'SAP',
    'S/4HANA',
    'ICT',
    'Cybersécurité',
    'Intelligence Artificielle',
    'Luxembourg',
    'Europe',
    'Consulting IT',
    'Transformation digitale',
  ],
  authors: [{ name: 'EBMC GROUP' }],
  creator: 'EBMC GROUP',
  publisher: 'EBMC GROUP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'en_GB',
    url: 'https://ebmcgroup.eu',
    siteName: 'EBMC GROUP',
    title: 'EBMC GROUP - L\'union européenne de l\'expertise digitale',
    description:
      'Votre ESN de référence en Europe. Expertise SAP, ICT, Cybersécurité et IA.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EBMC GROUP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EBMC GROUP - L\'union européenne de l\'expertise digitale',
    description:
      'Votre ESN de référence en Europe. Expertise SAP, ICT, Cybersécurité et IA.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1A2E' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
