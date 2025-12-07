import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { motion } from 'framer-motion'
import { 
  Database, 
  Cloud, 
  Layers, 
  Code, 
  BarChart3, 
  Settings,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sap' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `/${locale}/sap`,
      languages: {
        fr: '/fr/sap',
        en: '/en/sap',
      },
    },
  }
}

const services = [
  {
    icon: Database,
    key: 'migration',
    features: ['brownfield', 'greenfield', 'selectiveData'],
  },
  {
    icon: Cloud,
    key: 'cloud',
    features: ['rise', 'hyperscalers', 'modular'],
  },
  {
    icon: Layers,
    key: 'modules',
    features: ['finance', 'logistics', 'hr'],
  },
  {
    icon: Code,
    key: 'development',
    features: ['abap', 'fiori', 'btp'],
  },
  {
    icon: BarChart3,
    key: 'data',
    features: ['integration', 'analytics', 'datasphere'],
  },
  {
    icon: Settings,
    key: 'methodology',
    features: ['activate', 'sprints', 'support'],
  },
]

export default async function SAPPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('sap')

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-dark-900 via-dark-800 to-primary/20 overflow-hidden">
        <Spotlight className="top-10 left-0" fill="#0066CC" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary mb-6">
              <Database className="h-4 w-4" />
              <span className="text-sm font-medium">{t('badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact?subject=sap`}>
                <Button size="lg" className="group">
                  {t('hero.cta')}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline-light">
                {t('hero.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.key}
                className="bg-white dark:bg-dark-800 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">
                    {t(`services.${service.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {t(`services.${service.key}.features.${feature}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">19+</div>
              <div className="text-primary-100">{t('stats.years')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">2500+</div>
              <div className="text-primary-100">{t('stats.consultants')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">Silver</div>
              <div className="text-primary-100">{t('stats.partner')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <div className="text-primary-100">{t('stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <Link href={`/${locale}/contact?subject=sap`}>
              <Button size="xl" variant="outline-light">
                {t('cta.button')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
