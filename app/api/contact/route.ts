import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

// =============================================================================
// Validation Schema
// =============================================================================
const contactSchema = z.object({
  firstName: z.string().min(2, 'Prénom trop court').max(50, 'Prénom trop long'),
  lastName: z.string().min(2, 'Nom trop court').max(50, 'Nom trop long'),
  email: z.string().email('Email invalide'),
  company: z.string().max(100, 'Nom d\'entreprise trop long').optional(),
  phone: z
    .string()
    .regex(/^[+]?[\d\s\-().]+$/, 'Numéro de téléphone invalide')
    .optional()
    .or(z.literal('')),
  subject: z.enum(['general', 'sap', 'ict', 'cyber', 'careers', 'partnership'], {
    errorMap: () => ({ message: 'Sujet invalide' }),
  }),
  message: z
    .string()
    .min(10, 'Message trop court (minimum 10 caractères)')
    .max(5000, 'Message trop long (maximum 5000 caractères)'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter la politique de confidentialité',
  }),
  recaptchaToken: z.string().optional(),
  locale: z.enum(['fr', 'en']).default('fr'),
})

type ContactFormData = z.infer<typeof contactSchema>

// =============================================================================
// Rate Limiting
// =============================================================================
const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
})

// =============================================================================
// reCAPTCHA Verification
// =============================================================================
async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn('[Contact] reCAPTCHA secret key not configured')
    return true // Skip verification if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    })

    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('[Contact] reCAPTCHA verification failed:', error)
    return false
  }
}

// =============================================================================
// Make.com Webhook
// =============================================================================
async function triggerMakeWebhook(data: ContactFormData, submissionId: string) {
  if (!process.env.MAKE_WEBHOOK_CONTACT) {
    console.warn('[Contact] Make.com webhook URL not configured')
    return false
  }

  try {
    const response = await fetch(process.env.MAKE_WEBHOOK_CONTACT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: submissionId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        locale: data.locale,
        submittedAt: new Date().toISOString(),
        source: 'ebmc-website',
      }),
    })

    if (!response.ok) {
      throw new Error(`Make.com webhook returned ${response.status}`)
    }

    console.log('[Contact] Make.com webhook triggered successfully')
    return true
  } catch (error) {
    console.error('[Contact] Make.com webhook failed:', error)
    return false
  }
}

// =============================================================================
// POST Handler
// =============================================================================
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const isRateLimited = await limiter.check(10, ip) // 10 requests per minute

    if (!isRateLimited) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer plus tard.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate input
    const validationResult = contactSchema.safeParse(body)
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }))
      return NextResponse.json({ error: 'Validation échouée', errors }, { status: 400 })
    }

    const data = validationResult.data

    // Verify reCAPTCHA (if token provided)
    if (data.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(data.recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'Vérification reCAPTCHA échouée. Veuillez réessayer.' },
          { status: 400 }
        )
      }
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email.toLowerCase(),
        company: data.company || null,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
        locale: data.locale,
        ipAddress: ip,
        userAgent: request.headers.get('user-agent') || null,
        status: 'NEW',
      },
    })

    console.log(`[Contact] New submission: ${submission.id} from ${data.email}`)

    // Trigger Make.com webhook (async, don't wait)
    triggerMakeWebhook(data, submission.id).catch((error) => {
      console.error('[Contact] Background webhook error:', error)
    })

    // Return success
    return NextResponse.json(
      {
        success: true,
        message:
          data.locale === 'fr'
            ? 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
            : 'Your message has been sent successfully. We will get back to you as soon as possible.',
        id: submission.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Contact] Error processing submission:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

// =============================================================================
// OPTIONS Handler (CORS)
// =============================================================================
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
