import { LRUCache } from 'lru-cache'

type Options = {
  interval: number
  uniqueTokenPerInterval: number
}

type RateLimitResult = {
  check: (limit: number, token: string) => Promise<boolean>
}

export function rateLimit(options: Options): RateLimitResult {
  const tokenCache = new LRUCache<string, number[]>({
    max: options.uniqueTokenPerInterval || 500,
    ttl: options.interval || 60000,
  })

  return {
    check: async (limit: number, token: string): Promise<boolean> => {
      const now = Date.now()
      const windowStart = now - options.interval

      // Get existing requests for this token
      const tokenRequests = tokenCache.get(token) || []

      // Filter to only include requests within the current window
      const recentRequests = tokenRequests.filter((timestamp) => timestamp > windowStart)

      // Check if limit exceeded
      if (recentRequests.length >= limit) {
        return false
      }

      // Add current request
      recentRequests.push(now)
      tokenCache.set(token, recentRequests)

      return true
    },
  }
}

/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis or similar
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now()
    const windowStart = now - this.windowMs

    // Get existing requests
    let requests = this.requests.get(identifier) || []

    // Filter to current window
    requests = requests.filter((timestamp) => timestamp > windowStart)

    // Check limit
    if (requests.length >= this.maxRequests) {
      return true
    }

    // Add new request
    requests.push(now)
    this.requests.set(identifier, requests)

    // Cleanup old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup()
    }

    return false
  }

  private cleanup(): void {
    const now = Date.now()
    const windowStart = now - this.windowMs

    for (const [key, timestamps] of this.requests.entries()) {
      const valid = timestamps.filter((t) => t > windowStart)
      if (valid.length === 0) {
        this.requests.delete(key)
      } else {
        this.requests.set(key, valid)
      }
    }
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const windowStart = now - this.windowMs
    const requests = this.requests.get(identifier) || []
    const recentRequests = requests.filter((t) => t > windowStart)
    return Math.max(0, this.maxRequests - recentRequests.length)
  }

  getResetTime(identifier: string): number {
    const requests = this.requests.get(identifier) || []
    if (requests.length === 0) return 0
    const oldestRequest = Math.min(...requests)
    return Math.max(0, oldestRequest + this.windowMs - Date.now())
  }
}

// Export a default instance
export const apiRateLimiter = new RateLimiter(60000, 60) // 60 requests per minute
export const contactRateLimiter = new RateLimiter(60000, 5) // 5 contact submissions per minute
