'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Mail,
  Users,
  Settings,
  FileText,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LogOut,
  RefreshCw,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import type { Session } from 'next-auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type User = Session['user']

const navigation = [
  { name: 'dashboard', href: '/backoffice', icon: LayoutDashboard },
  { name: 'contacts', href: '/backoffice/contacts', icon: Mail },
  { name: 'users', href: '/backoffice/users', icon: Users, adminOnly: true },
  { name: 'audit', href: '/backoffice/audit', icon: FileText, adminOnly: true },
  { name: 'analytics', href: '/backoffice/analytics', icon: BarChart3 },
  { name: 'boondSync', href: '/backoffice/boond', icon: RefreshCw, adminOnly: true },
  { name: 'settings', href: '/backoffice/settings', icon: Settings, adminOnly: true },
]

export function BackofficeSidebar({ user }: { user: User }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations('backoffice.sidebar')

  const isAdmin = user.role === 'SUPER_ADMIN' || user.role === 'ADMIN'

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || isAdmin
  )

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      className="relative bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-gray-700 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <Link href={`/${locale}/backoffice`} className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-white">E</span>
          </div>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden"
              >
                EBMC
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const href = `/${locale}${item.href}`
          const isActive =
            pathname === href ||
            (item.href !== '/backoffice' && pathname.startsWith(href))

          return (
            <Link
              key={item.name}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {t(item.name)}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || ''}
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-medium">
                {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name || 'Utilisateur'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.role}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          variant="ghost"
          className="w-full mt-3 justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={() => signOut({ callbackUrl: `/${locale}` })}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="ml-2 whitespace-nowrap overflow-hidden"
              >
                {t('logout')}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-white dark:bg-dark-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-500" />
        )}
      </button>
    </motion.aside>
  )
}
