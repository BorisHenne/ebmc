# EBMC GROUP - Prompt Claude Code

## Contexte du projet

Tu travailles sur le site vitrine + back-office d'**EBMC GROUP**, une ESN européenne spécialisée SAP/ICT/Cybersécurité basée au Luxembourg.

### Stack technique
- **Frontend** : Next.js 15 (App Router), React 19, TypeScript
- **Styling** : Tailwind CSS 3.4, Framer Motion, Aceternity UI
- **Auth** : NextAuth.js v5 beta (OAuth multi-provider)
- **Database** : Prisma ORM + SQLite (dev) / MySQL Infomaniak (prod)
- **i18n** : next-intl (FR/EN)
- **Hébergement** : Infomaniak (Node.js + PM2)
- **CRM** : Boondmanager API
- **Orchestration** : Make.com webhooks
- **CI/CD** : GitHub Actions

### Architecture

```
ebmc-group/
├── app/
│   ├── [locale]/                    # Routes internationalisées
│   │   ├── (public)/                # Pages publiques (site vitrine)
│   │   │   ├── sap/page.tsx         ✅ Créé
│   │   │   ├── ict/page.tsx         ❌ À créer
│   │   │   ├── cybersecurite/page.tsx ❌ À créer
│   │   │   ├── carrieres/page.tsx   ❌ À créer
│   │   │   └── contact/page.tsx     ✅ Créé
│   │   ├── backoffice/              # Back-office protégé
│   │   │   ├── layout.tsx           ✅ Créé
│   │   │   ├── page.tsx             ✅ Dashboard
│   │   │   ├── contacts/page.tsx    ❌ À créer (liste contacts)
│   │   │   ├── users/page.tsx       ❌ À créer (gestion users)
│   │   │   └── settings/page.tsx    ❌ À créer
│   │   ├── connexion/page.tsx       ✅ Page login OAuth
│   │   ├── layout.tsx               ✅ Layout avec providers
│   │   └── page.tsx                 ✅ Homepage
│   ├── api/
│   │   ├── auth/[...nextauth]/      ✅ NextAuth handler
│   │   ├── contact/route.ts         ✅ Formulaire contact
│   │   ├── health/route.ts          ✅ Health check
│   │   ├── users/route.ts           ❌ À créer (CRUD users)
│   │   └── boond/route.ts           ❌ À créer (sync Boond)
│   ├── layout.tsx                   ✅ Root layout + metadata
│   └── globals.css                  ✅ Tailwind + variables CSS
├── components/
│   ├── admin/                       ✅ 5 composants dashboard
│   ├── sections/                    ✅ 8 composants (Hero, Services, etc.)
│   ├── layout/                      ✅ Navbar, Footer, LanguageSwitcher
│   └── ui/                          ✅ 16 composants Aceternity/Radix
├── lib/
│   ├── auth.ts                      ✅ Config NextAuth + providers
│   ├── db.ts                        ✅ Prisma singleton + helpers
│   ├── i18n.ts                      ✅ Config next-intl
│   ├── utils.ts                     ✅ cn(), formatDate, etc.
│   ├── rate-limit.ts                ✅ Rate limiting API
│   ├── boond.ts                     ❌ À créer (client API Boond)
│   └── mail.ts                      ❌ À créer (Nodemailer SMTP)
├── messages/
│   ├── fr.json                      ✅ Traductions FR
│   └── en.json                      ✅ Traductions EN
├── prisma/
│   ├── schema.prisma                ✅ Modèles DB complets
│   └── seed.ts                      ✅ Données initiales
├── types/
│   └── next-auth.d.ts               ✅ Types étendus Session/User
├── middleware.ts                    ✅ Routage i18n + protection routes
├── .github/workflows/
│   ├── ci.yml                       ✅ Lint/test/build
│   └── deploy.yml                   ✅ Deploy Infomaniak
└── package.json                     ✅ Dépendances à jour
```

### Modèles Prisma (schema.prisma)

```prisma
model User {
  id, name, email, image, role (SUPER_ADMIN|ADMIN|EDITOR|VIEWER), 
  boondResourceId, isActive, lastLoginAt, accounts[], sessions[]
}

model AllowedUser {
  email (unique), role, addedBy, notes  // Whitelist back-office
}

model ContactSubmission {
  firstName, lastName, email, company, phone, subject, message,
  locale, status (NEW|PROCESSING|SENT_TO_BOOND|REPLIED|ARCHIVED),
  boondCandidateId, ipAddress, userAgent
}

model AuditLog {
  userId, action, entity, entityId, oldValue, newValue, ipAddress, userAgent
}

model Setting {
  key (unique), value, description
}
```

### Authentification (lib/auth.ts)

- **Providers** : Google, Apple, Microsoft Azure AD, Boondmanager (custom OAuth), Email Magic Link
- **Flow** : User → OAuth → signIn callback vérifie AllowedUser whitelist → enrichit session avec role
- **Rôles** : SUPER_ADMIN (tout), ADMIN (users+contacts+settings), EDITOR (contacts), VIEWER (lecture)

### Design System

**Palette EBMC** :
- Primary : #0066CC (bleu)
- Secondary : #00A3E0 (cyan)
- Accent : #FF6B35 (orange)
- Dark : #1A1A2E

**Composants Aceternity UI** : aurora-background, spotlight, wobble-card, text-generate-effect, moving-border, floating-dock, background-beams, sparkles

### Variables d'environnement (.env.local)

```bash
# Database
DATABASE_URL="file:./dev.db"  # ou mysql://... en prod

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"

# OAuth Providers
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
APPLE_CLIENT_ID, APPLE_CLIENT_SECRET, APPLE_TEAM_ID, APPLE_KEY_ID
MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_TENANT_ID
BOOND_CLIENT_ID, BOOND_CLIENT_SECRET, BOOND_INSTANCE, BOOND_API_USER, BOOND_API_TOKEN

# SMTP (Infomaniak)
SMTP_HOST="mail.infomaniak.com"
SMTP_PORT="587"
SMTP_USER, SMTP_PASSWORD, SMTP_FROM

# Make.com
MAKE_WEBHOOK_CONTACT, MAKE_WEBHOOK_CANDIDATE
```

---

## Tâches prioritaires

### 1. Pages vitrine manquantes

Créer les pages ICT, Cybersécurité et Carrières en suivant le modèle de `app/[locale]/(public)/sap/page.tsx` :
- Hero section avec Spotlight/BackgroundBeams
- Grid de services avec Cards
- Section stats
- CTA final

### 2. Client API Boondmanager (`lib/boond.ts`)

```typescript
// À implémenter :
- Authentification Basic Auth (prod) / JWT HMAC-SHA256 (sandbox)
- Pagination (30 items/page max)
- Endpoints : GET/POST resources, candidates, actions
- Gestion des erreurs et retry
- Cache optionnel
```

### 3. Service Email (`lib/mail.ts`)

```typescript
// À implémenter :
- Client Nodemailer avec config SMTP Infomaniak
- Templates : confirmation contact, magic link, notifications admin
- Queue simple pour fiabilité
```

### 4. Pages Back-office

**contacts/page.tsx** :
- DataTable avec filtres (status, date, subject)
- Actions : voir détail, changer status, envoyer vers Boond
- Pagination

**users/page.tsx** (admin only) :
- Liste AllowedUser avec rôles
- Ajouter/supprimer utilisateurs whitelist
- Modifier rôles

**settings/page.tsx** (admin only) :
- Paramètres Make.com webhooks
- Config Boond sync
- Mode maintenance

### 5. API Routes manquantes

```typescript
// api/users/route.ts
GET - Liste users (admin)
POST - Ajouter à whitelist (admin)
DELETE - Supprimer de whitelist (admin)
PATCH - Modifier rôle (admin)

// api/boond/route.ts
POST /api/boond/sync - Déclencher sync manuelle
GET /api/boond/status - Status dernière sync
POST /api/boond/webhook - Recevoir webhooks Boond
```

### 6. Tests

```bash
# Vitest - tests unitaires
- lib/utils.ts
- lib/auth.ts (helpers)
- API routes

# Playwright - tests E2E
- Flow connexion OAuth
- Soumission formulaire contact
- Navigation i18n
```

---

## Conventions de code

1. **Imports** : Utiliser les alias `@/` (ex: `@/components/ui/button`)
2. **Composants** : 
   - Server components par défaut
   - `'use client'` uniquement si nécessaire (hooks, events)
3. **Traductions** : Toutes les chaînes UI dans `messages/fr.json` et `messages/en.json`
4. **API Routes** : 
   - Validation Zod
   - Rate limiting pour endpoints publics
   - Audit logging pour actions sensibles
5. **Prisma** : 
   - Toujours utiliser le singleton `prisma` de `lib/db.ts`
   - Soft delete pour User (isActive: false)

---

## Commandes utiles

```bash
# Développement
npm run dev              # Start dev server
npm run db:studio        # Prisma Studio
npm run db:push          # Push schema changes
npm run db:seed          # Seed database

# Build & test
npm run build            # Build production
npm run lint             # ESLint
npm run type-check       # TypeScript check
npm run test             # Vitest

# Database
npx prisma migrate dev   # Create migration
npx prisma generate      # Generate client
```

---

## Notes importantes

1. **Boond API** : Pagination limitée à 30 items (pas 100). Les managers sont de type "resource".
2. **NextAuth v5** : Syntaxe beta, vérifier la doc pour les breaking changes
3. **Infomaniak** : Pas de Docker, utiliser PM2 pour le process Node.js
4. **Make.com** : Les webhooks doivent retourner 200 rapidement, traitement async
5. **i18n** : `setRequestLocale(locale)` obligatoire dans chaque page pour le static rendering

---

## Fichiers de référence

Pour comprendre les patterns existants, consulte :
- `app/[locale]/(public)/sap/page.tsx` - Structure page vitrine
- `app/[locale]/backoffice/page.tsx` - Dashboard admin
- `components/sections/ContactForm.tsx` - Formulaire avec validation
- `lib/auth.ts` - Configuration NextAuth complète
- `prisma/schema.prisma` - Tous les modèles DB
