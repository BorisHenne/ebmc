import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // ==========================================================================
  // Initial Allowed Users (whitelist for back-office access)
  // ==========================================================================
  const allowedUsers = [
    {
      email: 'admin@ebmcgroup.eu',
      role: 'SUPER_ADMIN' as Role,
      addedBy: 'system',
      notes: 'Super administrateur initial',
    },
    {
      email: 'boris@ebmcgroup.eu',
      role: 'SUPER_ADMIN' as Role,
      addedBy: 'system',
      notes: 'Développeur principal',
    },
    // Add more users as needed
  ]

  for (const user of allowedUsers) {
    const existing = await prisma.allowedUser.findUnique({
      where: { email: user.email },
    })

    if (!existing) {
      await prisma.allowedUser.create({
        data: user,
      })
      console.log(`✅ Added allowed user: ${user.email} (${user.role})`)
    } else {
      console.log(`⏭️  Allowed user already exists: ${user.email}`)
    }
  }

  // ==========================================================================
  // Initial Settings
  // ==========================================================================
  const settings = [
    {
      key: 'site_name',
      value: 'EBMC GROUP',
      description: 'Nom du site',
    },
    {
      key: 'contact_email',
      value: 'contact@ebmcgroup.eu',
      description: 'Email de contact principal',
    },
    {
      key: 'boond_sync_enabled',
      value: 'true',
      description: 'Synchronisation Boond activée',
    },
    {
      key: 'boond_sync_interval',
      value: '3600',
      description: 'Intervalle de sync Boond (en secondes)',
    },
    {
      key: 'make_webhook_enabled',
      value: 'true',
      description: 'Webhooks Make.com activés',
    },
    {
      key: 'maintenance_mode',
      value: 'false',
      description: 'Mode maintenance',
    },
  ]

  for (const setting of settings) {
    const existing = await prisma.setting.findUnique({
      where: { key: setting.key },
    })

    if (!existing) {
      await prisma.setting.create({
        data: setting,
      })
      console.log(`✅ Added setting: ${setting.key} = ${setting.value}`)
    } else {
      console.log(`⏭️  Setting already exists: ${setting.key}`)
    }
  }

  // ==========================================================================
  // Sample Contact Submission (for testing)
  // ==========================================================================
  if (process.env.NODE_ENV === 'development') {
    const sampleContact = await prisma.contactSubmission.findFirst({
      where: { email: 'test@example.com' },
    })

    if (!sampleContact) {
      await prisma.contactSubmission.create({
        data: {
          firstName: 'Jean',
          lastName: 'Dupont',
          email: 'test@example.com',
          company: 'Entreprise Test',
          phone: '+33 1 23 45 67 89',
          subject: 'general',
          message:
            'Ceci est un message de test pour vérifier le bon fonctionnement du formulaire de contact.',
          locale: 'fr',
          status: 'NEW',
        },
      })
      console.log('✅ Added sample contact submission')
    }
  }

  console.log('🌱 Database seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seed error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
