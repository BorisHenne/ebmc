import { NextResponse } from 'next/server'
import { prisma, checkDatabaseHealth } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type HealthStatus = {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number
  checks: {
    database: {
      status: 'up' | 'down'
      latency?: number
      error?: string
    }
    memory: {
      used: number
      total: number
      percentage: number
    }
  }
}

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const startTime = Date.now()
  let dbStatus: HealthStatus['checks']['database'] = { status: 'down' }

  // Check database
  try {
    const dbStart = Date.now()
    const isHealthy = await checkDatabaseHealth()
    const dbLatency = Date.now() - dbStart

    if (isHealthy) {
      dbStatus = { status: 'up', latency: dbLatency }
    } else {
      dbStatus = { status: 'down', error: 'Database check failed' }
    }
  } catch (error) {
    dbStatus = {
      status: 'down',
      error: error instanceof Error ? error.message : 'Unknown database error',
    }
  }

  // Check memory
  const memoryUsage = process.memoryUsage()
  const memoryCheck = {
    used: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    total: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),
  }

  // Determine overall status
  let overallStatus: HealthStatus['status'] = 'healthy'
  if (dbStatus.status === 'down') {
    overallStatus = 'unhealthy'
  } else if (memoryCheck.percentage > 90) {
    overallStatus = 'degraded'
  }

  const health: HealthStatus = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    checks: {
      database: dbStatus,
      memory: memoryCheck,
    },
  }

  const statusCode = overallStatus === 'healthy' ? 200 : overallStatus === 'degraded' ? 200 : 503

  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Response-Time': `${Date.now() - startTime}ms`,
    },
  })
}
