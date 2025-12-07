'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const contactSchema = z.object({
  firstName: z.string().min(2, 'Minimum 2 caractères').max(50),
  lastName: z.string().min(2, 'Minimum 2 caractères').max(50),
  email: z.string().email('Email invalide'),
  company: z.string().max(100).optional(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-().]*$/, 'Numéro invalide')
    .optional()
    .or(z.literal('')),
  subject: z.enum(['general', 'sap', 'ict', 'cyber', 'careers', 'partnership']),
  message: z.string().min(10, 'Minimum 10 caractères').max(5000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

const subjects = [
  { value: 'general', labelKey: 'subjects.general' },
  { value: 'sap', labelKey: 'subjects.sap' },
  { value: 'ict', labelKey: 'subjects.ict' },
  { value: 'cyber', labelKey: 'subjects.cyber' },
  { value: 'careers', labelKey: 'subjects.careers' },
  { value: 'partnership', labelKey: 'subjects.partnership' },
]

type Props = {
  locale: string
  defaultSubject?: string
}

export function ContactForm({ locale, defaultSubject }: Props) {
  const t = useTranslations('contact.form')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: (defaultSubject as ContactFormData['subject']) || 'general',
      consent: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Une erreur est survenue')
      }

      setStatus('success')
      reset()
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('success.title')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t('success.message')}
        </p>
        <Button onClick={() => setStatus('idle')}>{t('success.button')}</Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-300">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" required error={!!errors.firstName}>
            {t('fields.firstName')}
          </Label>
          <Input
            id="firstName"
            {...register('firstName')}
            error={!!errors.firstName}
            placeholder={t('placeholders.firstName')}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" required error={!!errors.lastName}>
            {t('fields.lastName')}
          </Label>
          <Input
            id="lastName"
            {...register('lastName')}
            error={!!errors.lastName}
            placeholder={t('placeholders.lastName')}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email & Phone row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" required error={!!errors.email}>
            {t('fields.email')}
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            placeholder={t('placeholders.email')}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('fields.phone')}</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            error={!!errors.phone}
            placeholder={t('placeholders.phone')}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Company & Subject row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="company">{t('fields.company')}</Label>
          <Input
            id="company"
            {...register('company')}
            placeholder={t('placeholders.company')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" required error={!!errors.subject}>
            {t('fields.subject')}
          </Label>
          <select
            id="subject"
            {...register('subject')}
            className={cn(
              'flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-dark-800 dark:text-white',
              errors.subject && 'border-red-500'
            )}
          >
            {subjects.map((subject) => (
              <option key={subject.value} value={subject.value}>
                {t(subject.labelKey)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" required error={!!errors.message}>
          {t('fields.message')}
        </Label>
        <Textarea
          id="message"
          {...register('message')}
          error={!!errors.message}
          placeholder={t('placeholders.message')}
          rows={6}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Consent */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('consent')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {t('consent.text')}{' '}
            <a
              href="/privacy"
              target="_blank"
              className="text-primary hover:underline"
            >
              {t('consent.link')}
            </a>
          </span>
        </label>
        {errors.consent && (
          <p className="text-sm text-red-500">{errors.consent.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full md:w-auto"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            {t('sending')}
          </>
        ) : (
          <>
            <Send className="h-5 w-5 mr-2" />
            {t('submit')}
          </>
        )}
      </Button>
    </form>
  )
}
