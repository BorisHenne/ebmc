'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { formatDistanceToNow } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import { Mail, ArrowRight, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Contact = {
  id: string
  name: string
  email: string
  subject: string
  status: string
  createdAt: Date
}

const statusColors: Record<string, string> = {
  NEW: 'text-blue-500 bg-blue-50 dark:bg-blue-900/30',
  PROCESSING: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30',
  SENT_TO_BOOND: 'text-purple-500 bg-purple-50 dark:bg-purple-900/30',
  REPLIED: 'text-green-500 bg-green-50 dark:bg-green-900/30',
  ARCHIVED: 'text-gray-500 bg-gray-50 dark:bg-gray-800',
}

const subjectLabels: Record<string, string> = {
  general: 'Général',
  sap: 'SAP',
  ict: 'ICT',
  cyber: 'Cybersécurité',
  careers: 'Carrières',
  partnership: 'Partenariat',
}

export function RecentContacts({
  contacts,
  locale,
}: {
  contacts: Contact[]
  locale: string
}) {
  const t = useTranslations('backoffice.dashboard')
  const dateLocale = locale === 'fr' ? fr : enUS

  return (
    <Card className="bg-white dark:bg-dark-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          {t('recentContacts')}
        </CardTitle>
        <Link href={`/${locale}/backoffice/contacts`}>
          <Button variant="ghost" size="sm" className="text-primary">
            {t('viewAll')}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {contacts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            {t('noContacts')}
          </p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/${locale}/backoffice/contacts/${contact.id}`}
                className="block p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white truncate">
                        {contact.name}
                      </p>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                          statusColors[contact.status]
                        )}
                      >
                        <Circle className="h-1.5 w-1.5 fill-current" />
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                      {contact.email}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {subjectLabels[contact.subject] || contact.subject} •{' '}
                      {formatDistanceToNow(new Date(contact.createdAt), {
                        addSuffix: true,
                        locale: dateLocale,
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
