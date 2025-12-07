'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

const footerLinks = {
  services: [
    { key: 'sap', href: '/sap' },
    { key: 'ict', href: '/ict' },
    { key: 'cyber', href: '/cybersecurite' },
    { key: 'ia', href: '/intelligence-artificielle' },
  ],
  company: [
    { key: 'about', href: '/a-propos' },
    { key: 'careers', href: '/carrieres' },
    { key: 'contact', href: '/contact' },
    { key: 'news', href: '/actualites' },
  ],
  legal: [
    { key: 'privacy', href: '/confidentialite' },
    { key: 'terms', href: '/mentions-legales' },
    { key: 'cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/company/ebmcgroup', 
    icon: Linkedin 
  },
  { 
    name: 'Twitter', 
    href: 'https://twitter.com/ebmcgroup', 
    icon: Twitter 
  },
]

const locations = [
  { city: 'Bascharage', country: 'Luxembourg', type: 'Siège' },
  { city: 'Paris', country: 'France', type: 'Bureau' },
  { city: 'Bruxelles', country: 'Belgique', type: 'Bureau' },
  { city: 'Barcelone', country: 'Espagne', type: 'Innovation' },
]

export function Footer() {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-dark text-white">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      {/* Main footer content */}
      <div className="container-ebmc py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold">
                <span className="text-primary">EBMC</span>{' '}
                <span className="text-white">GROUP</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-white/60 leading-relaxed">
              {t('description')}
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:contact@ebmcgroup.eu"
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
              >
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@ebmcgroup.eu</span>
              </a>
              <a
                href="tel:+352000000"
                className="flex items-center gap-3 text-white/70 transition-colors hover:text-white"
              >
                <Phone className="h-5 w-5 text-primary" />
                <span>+352 xxx xxx xxx</span>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all hover:bg-primary hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('services.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    <span>{t(`services.${link.key}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('company.title')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 transition-colors hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                    <span>{t(`company.${link.key}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="mb-4 font-semibold text-white">{t('locations.title')}</h3>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location.city} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-white/80">{location.city}</p>
                    <p className="text-sm text-white/50">
                      {location.country} • {location.type}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-ebmc flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} EBMC GROUP. {t('copyright')}
          </p>
          
          {/* Legal links */}
          <div className="flex flex-wrap items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                {t(`legal.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications/Partners badges */}
      <div className="border-t border-white/5">
        <div className="container-ebmc py-6">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="badge bg-white/5 text-white/60">
              SAP Silver Partner
            </div>
            <div className="badge bg-white/5 text-white/60">
              ISO 27001
            </div>
            <div className="badge bg-white/5 text-white/60">
              RGPD Compliant
            </div>
            <div className="badge bg-white/5 text-white/60">
              NIS2 Ready
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
