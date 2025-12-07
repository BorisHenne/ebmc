import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/lib/i18n'

// Create the next-intl middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  localeDetection: true,
})

// Protected routes that require authentication
const protectedRoutes = ['/backoffice', '/admin']

// Auth routes (should redirect to backoffice if already authenticated)
const authRoutes = ['/connexion', '/login']

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  // Check if the pathname includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Extract the path without locale for route checking
  let pathWithoutLocale = pathname
  if (pathnameHasLocale) {
    const locale = pathname.split('/')[1]
    pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  }

  // Check if this is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  )

  // Check if this is an auth route
  const isAuthRoute = authRoutes.some((route) =>
    pathWithoutLocale.startsWith(route)
  )

  // Get session token from cookies
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value

  // Handle protected routes
  if (isProtectedRoute && !sessionToken) {
    const locale = pathnameHasLocale ? pathname.split('/')[1] : defaultLocale
    const loginUrl = new URL(`/${locale}/connexion`, request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute && sessionToken) {
    const locale = pathnameHasLocale ? pathname.split('/')[1] : defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/backoffice`, request.url))
  }

  // Apply internationalization middleware
  return intlMiddleware(request)
}

export const config = {
  // Match all pathnames except static files
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
