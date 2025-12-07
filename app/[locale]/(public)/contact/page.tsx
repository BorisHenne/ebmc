import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'
import { Card, CardContent } from '@/components/ui/card'
import { BackgroundBeams } from '@/components/ui/background-beams'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ subject?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        fr: '/fr/contact',
        en: '/en/contact',
      },
    },
  }
}

const contactInfo = [
  {
    icon: MapPin,
    key: 'address',
    value: 'Bascharage, Luxembourg',
  },
  {
    icon: Phone,
    key: 'phone',
    value: '+352 xxx xxx xxx',
  },
  {
    icon: Mail,
    key: 'email',
    value: 'contact@ebmcgroup.eu',
  },
  {
    icon: Clock,
    key: 'hours',
    value: 'Lun - Ven: 9h00 - 18h00',
  },
]

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params
  const { subject } = await searchParams
  setRequestLocale(locale)
  const t = await getTranslations('contact')

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center bg-gradient-to-br from-dark-900 via-dark-800 to-primary/20 overflow-hidden">
        <BackgroundBeams className="opacity-30" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('info.title')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('info.subtitle')}
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.key} className="bg-white dark:bg-dark-800">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t(`info.${info.key}`)}
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map placeholder */}
              <Card className="bg-white dark:bg-dark-800 overflow-hidden">
                <div className="aspect-square bg-gray-200 dark:bg-dark-700 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Google Maps
                  </p>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-dark-800">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('form.title')}
                  </h2>
                  <ContactForm locale={locale} defaultSubject={subject} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
