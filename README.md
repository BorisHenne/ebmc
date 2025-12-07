# EBMC GROUP - Site Vitrine + Back-Office

> **Contexte** : App React/Next.js + Node hébergée sur Infomaniak, Boond comme CRM, Make.com pour l'orchestration, CI/CD via GitHub.

## 🎯 Vue d'ensemble

Site vitrine moderne pour EBMC GROUP avec :
- **Frontend** : Next.js 15 + Aceternity UI + Tailwind CSS + Framer Motion
- **Auth** : NextAuth.js (OAuth multi-providers : Boondmanager, Google, Apple, Microsoft)
- **Back-office** : Gestion utilisateurs, droits, contenus
- **Email** : Microservice Node.js SMTP sécurisé
- **i18n** : Multilingue FR/EN avec next-intl
- **CI/CD** : GitHub Actions → Infomaniak (SSH/rsync)

## 📁 Structure du Projet

```
ebmc-group/
├── app/
│   ├── [locale]/                 # Routes internationalisées
│   │   ├── (public)/             # Pages publiques
│   │   │   ├── page.tsx          # Accueil
│   │   │   ├── sap/page.tsx      # Page SAP
│   │   │   ├── ict/page.tsx      # Page ICT
│   │   │   ├── cybersecurite/page.tsx
│   │   │   ├── carrieres/page.tsx
│   │   │   └── contact/page.tsx
│   │   └── (admin)/              # Routes protégées
│   │       └── backoffice/
│   │           ├── layout.tsx
│   │           ├── page.tsx      # Dashboard
│   │           ├── users/page.tsx
│   │           └── settings/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── contact/route.ts
│   │   ├── users/route.ts
│   │   └── boond/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                       # Composants Aceternity UI
│   │   ├── aurora-background.tsx
│   │   ├── floating-dock.tsx
│   │   ├── card-spotlight.tsx
│   │   ├── wobble-card.tsx
│   │   ├── lamp.tsx
│   │   ├── sparkles.tsx
│   │   ├── world-map.tsx
│   │   ├── sticky-scroll-reveal.tsx
│   │   ├── moving-border.tsx
│   │   ├── background-beams.tsx
│   │   └── text-generate-effect.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ExpertiseCards.tsx
│   │   └── ContactForm.tsx
│   └── admin/
│       ├── Sidebar.tsx
│       ├── UserTable.tsx
│       └── RoleManager.tsx
├── lib/
│   ├── auth.ts                   # Config NextAuth
│   ├── boond.ts                  # Client API Boond
│   ├── db.ts                     # Prisma client
│   ├── mail.ts                   # Service email
│   ├── utils.ts                  # Utilitaires (cn, etc.)
│   └── permissions.ts            # Gestion des droits
├── types/
│   ├── user.ts
│   ├── boond.ts
│   └── next-auth.d.ts
├── messages/
│   ├── fr.json
│   └── en.json
├── prisma/
│   └── schema.prisma
├── database/
│   └── migrations/
├── public/
│   ├── logo-ebmc.svg
│   └── images/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── .docs/
│   ├── ARCHITECTURE.md
│   ├── AUTH_SETUP.md
│   └── DEPLOYMENT.md
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Installation

### 1. Prérequis

- Node.js 20+ LTS
- npm ou pnpm
- Compte GitHub
- Hébergement Infomaniak (Node.js ou Web+Database)
- Compte Boondmanager (API activée)
- Providers OAuth configurés

### 2. Installation locale

```bash
# Cloner le repo
git clone https://github.com/BorisHenne/ebmc.git
cd ebmc

# Installer les dépendances
npm install

# Copier et configurer les variables d'environnement
cp .env.local.example .env.local

# Générer le client Prisma
npx prisma generate

# Lancer les migrations (SQLite local ou MySQL Infomaniak)
npx prisma db push

# Lancer en développement
npm run dev
```

### 3. Variables d'environnement requises

```env
# Base de données
DATABASE_URL="mysql://user:password@host:3306/ebmc_db"

# NextAuth
NEXTAUTH_URL="https://ebmcgroup.eu"
NEXTAUTH_SECRET="[générer avec: openssl rand -base64 32]"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
APPLE_CLIENT_ID=""
APPLE_CLIENT_SECRET=""
MICROSOFT_CLIENT_ID=""
MICROSOFT_CLIENT_SECRET=""

# Boondmanager OAuth
BOOND_CLIENT_ID=""
BOOND_CLIENT_SECRET=""
BOOND_API_URL="https://[votre-instance].boondmanager.com/api"
BOOND_API_KEY=""

# Email SMTP (Infomaniak)
SMTP_HOST="mail.infomaniak.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
SMTP_FROM="contact@ebmcgroup.eu"

# Infomaniak
INFOMANIAK_SSH_HOST=""
INFOMANIAK_SSH_USER=""
INFOMANIAK_DEPLOY_PATH="/home/clients/[id]/web/ebmcgroup.eu"
```

## 🔐 Système d'authentification

### Providers OAuth supportés

| Provider | Type | Usage |
|----------|------|-------|
| Boondmanager | OAuth 2.0 | Consultants internes |
| Google | OAuth 2.0 | Connexion rapide |
| Apple | OAuth 2.0 | Utilisateurs Apple |
| Microsoft | OAuth 2.0 | Entreprises (Azure AD) |
| Email Magic Link | Passwordless | Backup |

### Rôles et permissions

| Rôle | Permissions |
|------|-------------|
| `SUPER_ADMIN` | Accès total, gestion utilisateurs, configuration |
| `ADMIN` | Gestion contenus, voir analytics |
| `EDITOR` | Modifier contenus, téléverser médias |
| `VIEWER` | Lecture seule back-office |

### Whitelist des emails autorisés

Seuls les emails listés dans la table `AllowedUser` peuvent accéder au back-office.

## 📦 Dépendances principales

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "next-auth": "^5.0.0-beta",
    "next-intl": "^3.20.0",
    "@prisma/client": "^5.20.0",
    "framer-motion": "^11.11.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.0",
    "zod": "^3.23.0",
    "nodemailer": "^6.9.0",
    "lucide-react": "^0.450.0"
  }
}
```

## 🎨 Design System (Aceternity UI)

### Composants utilisés

- **Backgrounds** : Aurora, Beams, Sparkles, Grid
- **Cards** : Wobble Card, Card Spotlight, 3D Card
- **Navigation** : Floating Dock, Sticky Navbar
- **Effects** : Lamp, Text Generate, Tracing Beam
- **Interactive** : World Map, Moving Border

### Palette EBMC

```css
:root {
  --ebmc-primary: #0066CC;      /* Bleu corporate */
  --ebmc-secondary: #00A3E0;    /* Bleu clair */
  --ebmc-accent: #FF6B35;       /* Orange énergie */
  --ebmc-dark: #1A1A2E;         /* Fond sombre */
  --ebmc-light: #F8F9FA;        /* Fond clair */
}
```

## 🌐 Internationalisation

Structure des fichiers de traduction dans `/messages/`:

```json
// fr.json
{
  "nav": {
    "home": "Accueil",
    "sap": "SAP",
    "ict": "ICT",
    "cyber": "Cybersécurité",
    "careers": "Carrières",
    "contact": "Contact"
  },
  "hero": {
    "title": "L'union européenne de l'expertise digitale",
    "subtitle": "Votre ESN de référence en Europe"
  }
}
```

## 🔄 Intégration Boond Manager

### Endpoints utilisés

- `GET /resources` - Liste des consultants
- `GET /candidates` - Candidats
- `POST /contacts` - Créer un contact (formulaire)
- OAuth flow pour authentification

### Webhook Make.com

```
App → POST /api/webhook/contact
    → Make.com scenario
        → Créer contact Boond
        → Envoyer email notification
        → Log dans Google Sheets
```

## 📤 Déploiement

### GitHub Actions → Infomaniak

Le workflow `.github/workflows/deploy.yml` :

1. Build Next.js (`npm run build`)
2. Export statique ou standalone
3. rsync vers Infomaniak via SSH
4. Redémarrage du service Node (pm2)

### Commandes manuelles

```bash
# Build production
npm run build

# Export statique (si applicable)
npm run export

# Déployer manuellement
rsync -avz --delete .next/ user@host:/path/to/web/
```

## 📊 Monitoring

- **Logs** : Winston + rotation fichiers
- **Métriques** : Temps de réponse API, erreurs Boond
- **Alerting** : Make.com → Slack/Email sur erreurs critiques

## 🧪 Tests

```bash
# Lancer les tests
npm run test

# Couverture
npm run test:coverage

# E2E avec Playwright
npm run test:e2e
```

## 📝 Licence

Projet propriétaire EBMC GROUP © 2025
