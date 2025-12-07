'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Spotlight } from '@/components/ui/spotlight'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { MovingBorder } from '@/components/ui/moving-border'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen overflow-hidden">
      <AuroraBackground>
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="rgba(0, 102, 204, 0.3)"
        />
        
        <div className="container-ebmc relative z-10 flex min-h-screen flex-col items-center justify-center py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MovingBorder
              borderRadius="9999px"
              className="bg-white/10 backdrop-blur-sm"
              containerClassName="mb-8"
              borderClassName="bg-[radial-gradient(var(--primary)_40%,transparent_60%)]"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {t('badge')}
              </span>
            </MovingBorder>
          </motion.div>

          {/* Title with text generate effect */}
          <div className="mb-6">
            <TextGenerateEffect
              words={t('title')}
              className="heading-1 text-white"
              duration={0.5}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mx-auto mb-10 max-w-3xl text-lg text-white/80 md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link href="#contact" className="btn-primary group">
              {t('cta_primary')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <button className="btn-ghost text-white hover:bg-white/10 group">
              <Play className="h-4 w-4" />
              {t('cta_secondary')}
            </button>
          </motion.div>

          {/* Stats preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { value: '19+', label: t('stats.years') },
              { value: '210+', label: t('stats.consultants') },
              { value: '4', label: t('stats.countries') },
              { value: '2500+', label: t('stats.projects') },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/50"
            >
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="h-12 w-6 rounded-full border-2 border-white/30 p-1">
                <motion.div
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-white/50"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </AuroraBackground>
    </section>
  )
}
