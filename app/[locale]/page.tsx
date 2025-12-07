import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { HeroSection } from '@/components/sections/HeroSection'
import { ExpertiseSection } from '@/components/sections/ExpertiseSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection } from '@/components/sections/CTASection'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  
  return {
    title: locale === 'fr' 
      ? 'EBMC GROUP - L\'union européenne de l\'expertise digitale'
      : 'EBMC GROUP - The European Union of Digital Expertise',
    description: locale === 'fr'
      ? 'Votre ESN de référence en Europe. Expertise SAP, ICT, Cybersécurité et IA depuis 2006.'
      : 'Your reference IT consulting company in Europe. SAP, ICT, Cybersecurity and AI expertise since 2006.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'fr': '/fr',
        'en': '/en',
      },
    },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <HeroSection />
      <ExpertiseSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
