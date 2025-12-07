'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Bell, Search, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { Session } from 'next-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

type User = Session['user']

export function BackofficeHeader({ user }: { user: User }) {
  const t = useTranslations('backoffice.header')
  const { theme, setTheme } = useTheme()
  const [notifications] = useState([
    { id: 1, message: 'Nouveau contact reçu', time: '5 min' },
    { id: 2, message: 'Sync Boond terminée', time: '1h' },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder={t('search')}
            className="pl-10 bg-gray-100 dark:bg-dark-700 border-0"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <LanguageSwitcher variant="compact" />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-gray-600 dark:text-gray-300"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-600 dark:text-gray-300 relative"
          >
            <Bell className="h-5 w-5" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </Button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50">
              <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t('notifications')}
                </h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-gray-500 dark:text-gray-400">
                    {t('noNotifications')}
                  </p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-dark-600 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-0"
                    >
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-600">
                <Button variant="ghost" className="w-full text-sm text-primary">
                  {t('viewAll')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
