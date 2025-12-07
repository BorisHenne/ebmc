'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'
import { Sparkles } from '@/components/ui/sparkles'

export function CTASection() {
  const t = useTranslations('home.cta')

  return (
    <section className="section-padding relative overflow-hidden bg-dark">
      {/* Sparkles background */}
      <div className="absolute inset-0">
        <Sparkles
          id="cta-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
          particleColor="#ffffff"
          className="h-full w-full"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-accent/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container-ebmc relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge bg-white/10 text-white mb-6 inline-block">
              {t('badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="heading-2 mb-6 text-white"
          >
            {t('title')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 text-lg text-white/70"
          >
            {t('description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="btn bg-white text-dark hover:bg-white/90 shadow-xl shadow-white/10 group"
            >
              {t('cta_primary')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/carrieres"
              className="btn-ghost text-white hover:bg-white/10"
            >
              {t('cta_secondary')}
            </Link>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8"
          >
            <a
              href="mailto:contact@ebmcgroup.eu"
              className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <Mail className="h-5 w-5" />
              <span>contact@ebmcgroup.eu</span>
            </a>
            <a
              href="tel:+352000000"
              className="flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <Phone className="h-5 w-5" />
              <span>+352 xxx xxx xxx</span>
            </a>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="h-5 w-5" />
              <span>Bascharage, Luxembourg</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
