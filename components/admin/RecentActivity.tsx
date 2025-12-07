'use client'

import { useTranslations } from 'next-intl'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { Activity, LogIn, LogOut, UserPlus, Link as LinkIcon, Settings, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type AuditLog = {
  id: string
  action: string
  entity: string
  entityId: string | null
  createdAt: Date
  user: {
    name: string | null
    email: string | null
    image: string | null
  } | null
}

const actionIcons: Record<string, React.ElementType> = {
  USER_SIGN_IN: LogIn,
  USER_SIGN_OUT: LogOut,
  USER_CREATED: UserPlus,
  ACCOUNT_LINKED: LinkIcon,
  SETTINGS_UPDATED: Settings,
  CONTACT_CREATED: Mail,
}

const actionColors: Record<string, string> = {
  USER_SIGN_IN: 'text-green-500 bg-green-50 dark:bg-green-900/30',
  USER_SIGN_OUT: 'text-gray-500 bg-gray-50 dark:bg-gray-800',
  USER_CREATED: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
  ACCOUNT_LINKED: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
  SETTINGS_UPDATED: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
  CONTACT_CREATED: 'text-primary bg-primary/10 dark:bg-primary/20',
}

const actionLabels: Record<string, string> = {
  USER_SIGN_IN: 'Connexion',
  USER_SIGN_OUT: 'Déconnexion',
  USER_CREATED: 'Utilisateur créé',
  ACCOUNT_LINKED: 'Compte lié',
  SETTINGS_UPDATED: 'Paramètres modifiés',
  CONTACT_CREATED: 'Contact créé',
}

export function RecentActivity({
  activities,
  locale,
}: {
  activities: AuditLog[]
  locale: string
}) {
  const t = useTranslations('backoffice.dashboard')
  const dateLocale = locale === 'fr' ? fr : enUS

  return (
    <Card className="bg-white dark:bg-dark-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          {t('recentActivity')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {t('noActivity')}
          </p>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />

            <div className="space-y-4">
              {activities.map((activity, index) => {
                const Icon = actionIcons[activity.action] || Activity
                const colorClass = actionColors[activity.action] || 'text-gray-500 bg-gray-50 dark:bg-gray-800'
                const label = actionLabels[activity.action] || activity.action

                return (
                  <div
                    key={activity.id}
                    className="relative flex items-start gap-4 pl-2"
                  >
                    <div
                      className={cn(
                        'relative z-10 h-8 w-8 rounded-full flex items-center justify-center',
                        colorClass
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">
                          {activity.user?.name || activity.user?.email || 'Système'}
                        </span>{' '}
                        <span className="text-gray-500 dark:text-gray-400">
                          {label.toLowerCase()}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {formatDistanceToNow(new Date(activity.createdAt), {
                          addSuffix: true,
                          locale: dateLocale,
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
