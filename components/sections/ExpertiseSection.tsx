'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Database, Cloud, Shield, Brain } from 'lucide-react'
import { WobbleCard } from '@/components/ui/wobble-card'

const expertiseData = [
  {
    key: 'sap',
    year: '2006',
    icon: Database,
    href: '/sap',
    gradient: 'from-primary to-blue-700',
    accentColor: 'bg-primary',
  },
  {
    key: 'ict',
    year: '2019',
    icon: Cloud,
    href: '/ict',
    gradient: 'from-secondary to-cyan-600',
    accentColor: 'bg-secondary',
  },
  {
    key: 'cyber',
    year: '2025',
    icon: Shield,
    href: '/cybersecurite',
    gradient: 'from-accent to-orange-600',
    accentColor: 'bg-accent',
  },
  {
    key: 'ia',
    year: '2026',
    icon: Brain,
    href: '/intelligence-artificielle',
    gradient: 'from-purple-600 to-pink-600',
    accentColor: 'bg-purple-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function ExpertiseSection() {
  const t = useTranslations('home.expertise')

  return (
    <section className="section-padding bg-light relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="container-ebmc relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="badge-primary mb-4 inline-block">
            {t('badge')}
          </span>
          <h2 className="heading-2 mb-4 text-dark">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('description')}
          </p>
        </motion.div>

        {/* Expertise cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {expertiseData.map((expertise) => {
            const Icon = expertise.icon
            return (
              <motion.div key={expertise.key} variants={itemVariants}>
                <Link href={expertise.href} className="block h-full">
                  <WobbleCard
                    containerClassName="h-full min-h-[320px]"
                    className={`bg-gradient-to-br ${expertise.gradient} relative overflow-hidden`}
                  >
                    {/* Year badge */}
                    <div className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-sm font-bold text-white backdrop-blur-sm">
                      {expertise.year}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-6">
                      <div>
                        {/* Icon */}
                        <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                          <Icon className="h-8 w-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          {t(`cards.${expertise.key}.title`)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-white/80 line-clamp-3">
                          {t(`cards.${expertise.key}.description`)}
                        </p>
                      </div>

                      {/* Link */}
                      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                        <span>{t('learn_more')}</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-xl" />
                  </WobbleCard>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Timeline connector for desktop */}
        <div className="mt-12 hidden items-center justify-center gap-2 lg:flex">
          {expertiseData.map((expertise, index) => (
            <div key={expertise.key} className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${expertise.accentColor}`} />
              {index < expertiseData.length - 1 && (
                <div className="h-0.5 w-20 bg-gradient-to-r from-current to-transparent opacity-30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
