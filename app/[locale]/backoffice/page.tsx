import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DashboardStats } from '@/components/admin/DashboardStats'
import { RecentContacts } from '@/components/admin/RecentContacts'
import { RecentActivity } from '@/components/admin/RecentActivity'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'backoffice' })

  return {
    title: t('dashboard.title'),
  }
}

export default async function BackofficePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('backoffice')
  const session = await auth()

  // Fetch dashboard stats
  const [contactCount, newContactCount, userCount, recentContacts, recentActivity] =
    await Promise.all([
      prisma.contactSubmission.count(),
      prisma.contactSubmission.count({
        where: { status: 'NEW' },
      }),
      prisma.user.count({
        where: { isActive: true },
      }),
      prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          subject: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    ])

  const stats = [
    {
      label: t('dashboard.stats.totalContacts'),
      value: contactCount,
      icon: 'mail',
      trend: null,
    },
    {
      label: t('dashboard.stats.newContacts'),
      value: newContactCount,
      icon: 'inbox',
      trend: newContactCount > 0 ? 'up' : null,
    },
    {
      label: t('dashboard.stats.activeUsers'),
      value: userCount,
      icon: 'users',
      trend: null,
    },
    {
      label: t('dashboard.stats.boondSync'),
      value: 'OK',
      icon: 'refresh',
      trend: 'ok',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome message */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('dashboard.welcome', { name: session?.user?.name || 'Utilisateur' })}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {t('dashboard.subtitle')}
        </p>
      </div>

      {/* Stats grid */}
      <DashboardStats stats={stats} />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent contacts */}
        <RecentContacts contacts={recentContacts} locale={locale} />

        {/* Recent activity */}
        <RecentActivity activities={recentActivity} locale={locale} />
      </div>
    </div>
  )
}
