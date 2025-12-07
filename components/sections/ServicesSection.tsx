'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Repeat,
  CloudCog,
  Boxes,
  Code,
  BarChart3,
  Layers,
  Server,
  Cpu,
  Database,
  GitBranch,
  ShieldCheck,
  Search,
  FileCheck,
  AlertTriangle,
  Lock,
  GraduationCap,
} from 'lucide-react'
import { BackgroundBeams } from '@/components/ui/background-beams'

const servicesData = {
  sap: {
    icon: Database,
    services: [
      { icon: Repeat, key: 'migration' },
      { icon: CloudCog, key: 'cloud' },
      { icon: Boxes, key: 'modules' },
      { icon: Code, key: 'development' },
      { icon: BarChart3, key: 'analytics' },
      { icon: Layers, key: 'methodology' },
    ],
    color: 'primary',
    href: '/sap',
  },
  ict: {
    icon: Server,
    services: [
      { icon: CloudCog, key: 'infrastructure' },
      { icon: Code, key: 'development' },
      { icon: Cpu, key: 'data_ia' },
      { icon: GitBranch, key: 'devops' },
    ],
    color: 'secondary',
    href: '/ict',
  },
  cyber: {
    icon: ShieldCheck,
    services: [
      { icon: Search, key: 'audit' },
      { icon: FileCheck, key: 'compliance' },
      { icon: AlertTriangle, key: 'soc' },
      { icon: Lock, key: 'zero_trust' },
      { icon: GraduationCap, key: 'training' },
    ],
    color: 'accent',
    href: '/cybersecurite',
  },
}

export function ServicesSection() {
  const t = useTranslations('home.services')

  return (
    <section className="section-padding relative bg-dark overflow-hidden">
      <BackgroundBeams className="opacity-40" />
      
      <div className="container-ebmc relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="badge bg-white/10 text-white mb-4 inline-block">
            {t('badge')}
          </span>
          <h2 className="heading-2 mb-4 text-white">
            {t('title')}
          </h2>
          <p className="text-lg text-white/70">
            {t('description')}
          </p>
        </motion.div>

        {/* Services tabs/sections */}
        <div className="space-y-12">
          {Object.entries(servicesData).map(([key, data], sectionIndex) => {
            const MainIcon = data.icon
            const colorClass = {
              primary: 'border-primary bg-primary/10 text-primary',
              secondary: 'border-secondary bg-secondary/10 text-secondary',
              accent: 'border-accent bg-accent/10 text-accent',
            }[data.color]
            
            const gradientClass = {
              primary: 'from-primary/20 to-transparent',
              secondary: 'from-secondary/20 to-transparent',
              accent: 'from-accent/20 to-transparent',
            }[data.color]

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="group"
              >
                <div className={`rounded-3xl border border-white/10 bg-gradient-to-br ${gradientClass} p-8 transition-all duration-300 hover:border-white/20`}>
                  {/* Section header */}
                  <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl border ${colorClass} p-3`}>
                        <MainIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {t(`${key}.title`)}
                        </h3>
                        <p className="text-sm text-white/60">
                          {t(`${key}.subtitle`)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={data.href}
                      className={`btn-ghost text-sm text-white hover:bg-white/10 group/link`}
                    >
                      {t('view_all')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  {/* Services grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.services.map((service, index) => {
                      const ServiceIcon = service.icon
                      return (
                        <motion.div
                          key={service.key}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="group/card relative rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/10"
                        >
                          <div className="mb-3 flex items-center gap-3">
                            <div className="rounded-lg bg-white/10 p-2">
                              <ServiceIcon className="h-5 w-5 text-white/80" />
                            </div>
                            <h4 className="font-semibold text-white">
                              {t(`${key}.services.${service.key}.title`)}
                            </h4>
                          </div>
                          <p className="text-sm text-white/60 line-clamp-2">
                            {t(`${key}.services.${service.key}.description`)}
                          </p>
                          
                          {/* Hover effect line */}
                          <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${
                            data.color === 'primary' ? 'from-primary to-primary/50' :
                            data.color === 'secondary' ? 'from-secondary to-secondary/50' :
                            'from-accent to-accent/50'
                          } transition-all duration-300 group-hover/card:w-full`} />
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
