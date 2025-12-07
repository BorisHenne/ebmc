# 🚀 EBMC GROUP - Premier Push GitHub

## Instructions pour initialiser le repo

### 1. Sur ton PC (où tu as extrait l'archive)

```bash
# Extraire l'archive
unzip ebmc-group-docker.zip
cd ebmc-group

# Initialiser Git
git init

# Ajouter le remote GitHub
git remote add origin https://github.com/BorisHenne/ebmc.git

# Créer la branche main
git branch -M main

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "🎉 Initial commit - EBMC GROUP Next.js 15

- Site vitrine multilingue (FR/EN)
- Backoffice avec auth OAuth multi-provider
- Docker config pour NAS UGreen
- CI/CD GitHub Actions
- Prisma + MySQL"

# Push vers GitHub
git push -u origin main
```

### 2. Si tu utilises SSH (recommandé)

```bash
# Vérifier ta clé SSH
ssh -T git@github.com

# Si pas de clé, en créer une
ssh-keygen -t ed25519 -C "ton@email.com"

# Ajouter la clé à GitHub : Settings > SSH Keys > New SSH Key
cat ~/.ssh/id_ed25519.pub

# Changer le remote en SSH
git remote set-url origin git@github.com:BorisHenne/ebmc.git
```

### 3. Workflow de développement

```bash
# Créer une branche pour tes modifs
git checkout -b feature/ma-feature

# Après modifications
git add .
git commit -m "✨ Description de la feature"
git push -u origin feature/ma-feature

# Merger dans main (via GitHub PR ou localement)
git checkout main
git merge feature/ma-feature
git push
```

### 4. Depuis le NAS UGreen

```bash
# SSH vers le NAS
ssh user@NAS-IP

# Aller dans le dossier Docker
cd /volume1/docker/ebmc-group

# Pull les derniers changements
git pull origin main

# Rebuild le container
./docker-setup.sh rebuild
```

---

## 📝 Conventions de Commit

Utilise les préfixes suivants :

| Emoji | Type | Description |
|-------|------|-------------|
| 🎉 | `init` | Premier commit |
| ✨ | `feat` | Nouvelle fonctionnalité |
| 🐛 | `fix` | Correction de bug |
| 📝 | `docs` | Documentation |
| 💄 | `style` | UI/CSS |
| ♻️ | `refactor` | Refactoring |
| 🔧 | `config` | Configuration |
| 🚀 | `deploy` | Déploiement |

---

## 🔒 Fichiers à NE PAS commit

Le `.gitignore` protège déjà ces fichiers :

- `.env` et `.env.local` (secrets)
- `node_modules/` (dépendances)
- `.next/` (build)
- `.vscode/` (config IDE perso)

**IMPORTANT** : Ne jamais commit de secrets ou credentials !
