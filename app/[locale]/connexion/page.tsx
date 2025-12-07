'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaMicrosoft } from 'react-icons/fa'
import { Mail, ArrowLeft, Loader2, AlertCircle, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundBeams } from '@/components/ui/background-beams'

export default function LoginPage() {
  const t = useTranslations('auth')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/backoffice'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [emailSent, setEmailSent] = useState(false)

  const handleOAuthSignIn = async (provider: string) => {
    setIsLoading(provider)
    try {
      await signIn(provider, { callbackUrl })
    } catch (error) {
      console.error('Sign in error:', error)
    }
    setIsLoading(null)
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading('email')
    try {
      const result = await signIn('email', {
        email,
        callbackUrl,
        redirect: false,
      })
      if (result?.ok) {
        setEmailSent(true)
      }
    } catch (error) {
      console.error('Email sign in error:', error)
    }
    setIsLoading(null)
  }

  const getErrorMessage = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      AccessDenied: t('errors.accessDenied'),
      Configuration: t('errors.configuration'),
      Verification: t('errors.verification'),
      Default: t('errors.default'),
    }
    return errorMessages[errorCode] || errorMessages.Default
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-dark-900 px-4">
      <BackgroundBeams className="opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToHome')}
        </Link>

        <Card className="bg-white/10 backdrop-blur-xl border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">E</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-white">{t('title')}</CardTitle>
            <CardDescription className="text-gray-300">
              {t('subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm">{getErrorMessage(error)}</p>
              </div>
            )}

            {/* OAuth Providers */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 border-0 h-12"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading !== null}
              >
                {isLoading === 'google' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <FcGoogle className="h-5 w-5 mr-2" />
                    {t('continueWith')} Google
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full bg-black hover:bg-gray-900 text-white border-0 h-12"
                onClick={() => handleOAuthSignIn('apple')}
                disabled={isLoading !== null}
              >
                {isLoading === 'apple' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <FaApple className="h-5 w-5 mr-2" />
                    {t('continueWith')} Apple
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full bg-[#2F2F2F] hover:bg-[#1F1F1F] text-white border-0 h-12"
                onClick={() => handleOAuthSignIn('azure-ad')}
                disabled={isLoading !== null}
              >
                {isLoading === 'azure-ad' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <FaMicrosoft className="h-5 w-5 mr-2 text-[#00A4EF]" />
                    {t('continueWith')} Microsoft
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8F5C] hover:from-[#E55A25] hover:to-[#FF7F4C] text-white border-0 h-12"
                onClick={() => handleOAuthSignIn('boondmanager')}
                disabled={isLoading !== null}
              >
                {isLoading === 'boondmanager' ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Briefcase className="h-5 w-5 mr-2" />
                    {t('continueWith')} Boondmanager
                  </>
                )}
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark-800 px-2 text-gray-400">{t('or')}</span>
              </div>
            </div>

            {/* Email Magic Link */}
            {emailSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 rounded-lg bg-green-500/20 border border-green-500/50"
              >
                <Mail className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-200 font-medium">{t('emailSent.title')}</p>
                <p className="text-green-300/80 text-sm mt-1">
                  {t('emailSent.description', { email })}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    {t('emailLabel')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    disabled={isLoading !== null}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading !== null || !email}
                >
                  {isLoading === 'email' ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      {t('sendMagicLink')}
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Footer note */}
            <p className="text-center text-xs text-gray-400">
              {t('accessNote')}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
