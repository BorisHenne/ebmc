'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Kevin M.',
    role: 'Architecte SAP BTP',
    company: 'Grande Distribution',
    image: '/testimonials/kevin.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sophie L.',
    role: 'DSI',
    company: 'Industrie Pharmaceutique',
    image: '/testimonials/sophie.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marc D.',
    role: 'Responsable IT',
    company: 'Secteur Bancaire',
    image: '/testimonials/marc.jpg',
    rating: 5,
  },
  {
    id: 4,
    name: 'Elena R.',
    role: 'Chef de Projet',
    company: 'Énergie',
    image: '/testimonials/elena.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Thomas B.',
    role: 'CTO',
    company: 'FinTech',
    image: '/testimonials/thomas.jpg',
    rating: 5,
  },
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const t = useTranslations('home.testimonials')
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex-shrink-0 w-[400px] rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Quote icon */}
      <div className="absolute right-6 top-6 text-gray-100 transition-colors group-hover:text-primary/20">
        <Quote className="h-12 w-12" fill="currentColor" />
      </div>

      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Content */}
      <p className="mb-6 text-gray-600 leading-relaxed line-clamp-4">
        "{t(`items.${testimonial.id}.content`)}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-bold">
            {testimonial.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div>
          <p className="font-semibold text-dark">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>

      {/* Hover gradient line */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full rounded-b-2xl" />
    </motion.div>
  )
}

export function TestimonialsSection() {
  const t = useTranslations('home.testimonials')

  return (
    <section className="section-padding relative overflow-hidden bg-gray-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
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
      </div>

      {/* Testimonials marquee */}
      <div className="relative">
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-gray-50 to-transparent" />
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-gray-50 to-transparent" />

        {/* First row - scrolling left */}
        <div className="mb-6 flex gap-6 overflow-hidden">
          <motion.div
            animate={{ x: [0, -1600] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear',
              },
            }}
            className="flex gap-6"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={`row1-${testimonial.id}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Second row - scrolling right */}
        <div className="flex gap-6 overflow-hidden">
          <motion.div
            animate={{ x: [-1600, 0] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 45,
                ease: 'linear',
              },
            }}
            className="flex gap-6"
          >
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
              <TestimonialCard
                key={`row2-${testimonial.id}-${index}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats below testimonials */}
      <div className="container-ebmc">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center md:gap-16"
        >
          <div>
            <p className="text-3xl font-bold text-dark">98%</p>
            <p className="text-sm text-muted-foreground">{t('stat_satisfaction')}</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <p className="text-3xl font-bold text-dark">4.9/5</p>
            <p className="text-sm text-muted-foreground">{t('stat_rating')}</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <p className="text-3xl font-bold text-dark">150+</p>
            <p className="text-sm text-muted-foreground">{t('stat_clients')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
