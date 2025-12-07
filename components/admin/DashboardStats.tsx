'use client'

import { motion } from 'framer-motion'
import { Mail, Inbox, Users, RefreshCw, TrendingUp, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Stat = {
  label: string
  value: number | string
  icon: string
  trend: 'up' | 'down' | 'ok' | null
}

const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  inbox: Inbox,
  users: Users,
  refresh: RefreshCw,
}

export function DashboardStats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon] || Mail

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white dark:bg-dark-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-xl flex items-center justify-center',
                      stat.trend === 'up' && 'bg-green-100 dark:bg-green-900/30',
                      stat.trend === 'ok' && 'bg-blue-100 dark:bg-blue-900/30',
                      !stat.trend && 'bg-gray-100 dark:bg-gray-800'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-6 w-6',
                        stat.trend === 'up' && 'text-green-600 dark:text-green-400',
                        stat.trend === 'ok' && 'text-blue-600 dark:text-blue-400',
                        !stat.trend && 'text-gray-600 dark:text-gray-400'
                      )}
                    />
                  </div>

                  {stat.trend && (
                    <div
                      className={cn(
                        'flex items-center gap-1 text-xs font-medium',
                        stat.trend === 'up' && 'text-green-600 dark:text-green-400',
                        stat.trend === 'ok' && 'text-blue-600 dark:text-blue-400'
                      )}
                    >
                      {stat.trend === 'up' && (
                        <>
                          <TrendingUp className="h-3 w-3" />
                          <span>Nouveau</span>
                        </>
                      )}
                      {stat.trend === 'ok' && (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Actif</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
