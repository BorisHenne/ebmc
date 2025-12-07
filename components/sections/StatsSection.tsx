'use client'

import { useTranslations } from 'next-intl'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { 
  Calendar, 
  Users, 
  Building2, 
  Trophy, 
  MapPin, 
  Briefcase 
} from 'lucide-react'

interface CounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
}

function Counter({ from = 0, to, duration = 2, suffix = '', prefix = '' }: CounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const [displayValue, setDisplayValue] = useState(from)

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [rounded])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        animate(count, to, { duration })
      }}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}

const stats = [
  {
    key: 'years',
    value: 19,
    suffix: '+',
    icon: Calendar,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    key: 'consultants',
    value: 210,
    suffix: '+',
    icon: Users,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    key: 'clients',
    value: 150,
    suffix: '+',
    icon: Building2,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    key: 'projects',
    value: 2500,
    suffix: '+',
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-600/10',
  },
  {
    key: 'countries',
    value: 4,
    suffix: '',
    icon: MapPin,
    color: 'text-green-600',
    bgColor: 'bg-green-600/10',
  },
  {
    key: 'certifications',
    value: 50,
    suffix: '+',
    icon: Trophy,
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
  },
]

export function StatsSection() {
  const t = useTranslations('home.stats')
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="section-padding relative overflow-hidden bg-light">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dot opacity-30" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container-ebmc relative" ref={containerRef}>
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

        {/* Stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg shadow-gray-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`mb-4 inline-flex rounded-xl ${stat.bgColor} p-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>

                {/* Value */}
                <div className="mb-2 text-4xl font-bold text-dark">
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>

                {/* Label */}
                <p className="text-muted-foreground">
                  {t(`items.${stat.key}`)}
                </p>

                {/* Decorative corner */}
                <div className={`absolute right-0 top-0 h-20 w-20 rounded-bl-[100px] ${stat.bgColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-muted-foreground">
            {t('cta_text')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
