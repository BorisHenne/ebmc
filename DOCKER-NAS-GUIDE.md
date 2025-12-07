# 🐳 EBMC GROUP - Guide Docker pour NAS

## 🎯 Configuration spécifique UGreen DXP4800 Plus (UGos)

Ce guide est adapté pour le NAS **UGreen DXP4800 Plus** sous **UGos**.

**Particularités UGos :**
- Nécessite `sudo` pour les commandes Docker
- Ports par défaut modifiés pour éviter les conflits

---

## 📋 Prérequis

- **NAS** : UGreen DXP4800 Plus avec Docker installé
- **Docker Compose** v2+ (généralement inclus)
- **Ports disponibles** : 3080 (app), 3307 (MySQL), 8180 (Adminer)
- **RAM** : minimum 2 Go recommandé

---

## 🚀 Installation rapide (5 minutes)

### 1. Copier les fichiers sur le NAS

Via **SSH** :

```bash
# Se connecter en SSH au NAS
ssh user@NAS-IP

# Créer le dossier du projet
mkdir -p /volume1/docker/ebmc-group
cd /volume1/docker/ebmc-group

# Copier les fichiers (depuis votre PC)
scp -r ./ebmc-group/* user@NAS-IP:/volume1/docker/ebmc-group/
```

### 2. Configuration

```bash
# Copier le template d'environnement
cp .env.docker.example .env

# Éditer la configuration
nano .env
```

**Variables essentielles à modifier :**

```bash
# URL d'accès (IP de votre NAS UGreen)
NEXT_PUBLIC_APP_URL=http://192.168.1.XXX:3080
NEXTAUTH_URL=http://192.168.1.XXX:3080

# Mot de passe MySQL (CHANGER IMPÉRATIVEMENT)
MYSQL_ROOT_PASSWORD=votre_mot_de_passe_fort
MYSQL_PASSWORD=votre_mot_de_passe_fort

# Secret NextAuth (générer avec: openssl rand -base64 32)
NEXTAUTH_SECRET=votre_secret_genere
```

### 3. Lancement

```bash
# Rendre le script exécutable
chmod +x docker-setup.sh

# Initialisation complète (build + start + migrations)
./docker-setup.sh init

# OU manuellement avec sudo :
sudo docker compose up -d
sudo docker compose exec app npx prisma migrate deploy
sudo docker compose exec app npx prisma db seed
```

### 4. Accès

- **Application** : http://NAS-IP:3080
- **Adminer** : http://NAS-IP:8180 (gestion DB)

---

## 📦 Structure Docker

```
ebmc-group/
├── docker-compose.yml      # Configuration des services
├── Dockerfile              # Build de l'app Next.js
├── .env.docker.example     # Template variables d'environnement
├── .env                    # Votre configuration (à créer)
├── docker-setup.sh         # Script de gestion
└── docker/
    └── mysql/
        └── init/           # Scripts SQL d'initialisation
```

---

## 🎮 Commandes utiles

Le script `docker-setup.sh` utilise automatiquement `sudo docker compose` :

```bash
# Status des containers
./docker-setup.sh status

# Démarrer
./docker-setup.sh start

# Arrêter
./docker-setup.sh stop

# Redémarrer
./docker-setup.sh restart

# Voir les logs
./docker-setup.sh logs        # Tous
./docker-setup.sh logs app    # App seulement
./docker-setup.sh logs db     # DB seulement

# Reconstruire après modification du code
./docker-setup.sh rebuild

# Shell dans le container app
./docker-setup.sh shell

# Shell MySQL
./docker-setup.sh db

# Migrations Prisma
./docker-setup.sh migrate

# Seeder la base
./docker-setup.sh seed

# Nettoyage complet (ATTENTION: supprime les données)
./docker-setup.sh clean
```

### Commandes manuelles (si besoin)

```bash
# Toujours avec sudo sur UGos
sudo docker compose up -d
sudo docker compose down
sudo docker compose logs -f app
sudo docker compose exec app sh
sudo docker ps
```

---

## 🔧 Configuration UGreen UGos

### Via Interface Web UGos

1. Ouvrir l'interface web UGos
2. Aller dans **Docker** ou **Container Manager**
3. Importer le projet via l'interface ou utiliser SSH

### Via SSH (Recommandé)

```bash
# Connexion SSH
ssh user@NAS-IP

# Navigation vers le dossier
cd /volume1/docker/ebmc-group

# Commandes Docker (toujours avec sudo)
sudo docker compose up -d
sudo docker compose ps
sudo docker compose logs -f
```

### Ports utilisés

| Service | Port par défaut | Description |
|---------|-----------------|-------------|
| App (Next.js) | 3080 | Interface web |
| MySQL | 3307 | Base de données |
| Adminer | 8180 | Interface DB |

**Si ces ports sont aussi pris**, modifiez dans `.env` :
```bash
APP_PORT=3090
MYSQL_PORT=3308
ADMINER_PORT=8190
```

---

## 🌐 Configuration réseau

### Accès local uniquement (par défaut)

L'app est accessible uniquement sur le réseau local :
```
http://192.168.1.XXX:3080
```

### Avec nom de domaine local

1. Éditer `/etc/hosts` sur votre PC :
```
192.168.1.XXX  ebmc.local
```

2. Mettre à jour `.env` :
```bash
NEXT_PUBLIC_APP_URL=http://ebmc.local:3080
NEXTAUTH_URL=http://ebmc.local:3080
```

### Avec Traefik (HTTPS) - Optionnel

Pour activer le reverse proxy Traefik avec certificats Let's Encrypt :

```bash
# Configurer le domaine dans .env
DOMAIN=ebmc.votredomaine.com
ACME_EMAIL=admin@votredomaine.com

# Démarrer avec le profil proxy
sudo docker compose --profile proxy up -d
```

⚠️ **Nécessite** : un domaine public pointant vers votre NAS + ports 80/443 ouverts

---

## 🔒 Sécurité

### Mots de passe

**CHANGEZ TOUS LES MOTS DE PASSE par défaut !**

```bash
# Dans .env
MYSQL_ROOT_PASSWORD=MotDePasseTresComplexe123!
MYSQL_PASSWORD=AutreMotDePasseComplexe456!
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### Backup

```bash
# Backup de la base de données
sudo docker compose exec db mysqldump -u root -p ebmc_group > backup_$(date +%Y%m%d).sql

# Backup des volumes
sudo docker run --rm -v ebmc-mysql-data:/data -v $(pwd):/backup alpine tar czf /backup/mysql_backup.tar.gz -C /data .
```

### Firewall

Si votre NAS a un firewall, autorisez :
- Port 3080 (ou votre `APP_PORT`)
- Port 3307 seulement si accès DB externe nécessaire

---

## 🐛 Dépannage

### Container ne démarre pas

```bash
# Voir les logs détaillés
sudo docker compose logs app --tail=100

# Vérifier l'état
sudo docker compose ps -a
```

### Erreur de connexion à la base de données

```bash
# Vérifier que MySQL est prêt
sudo docker compose logs db

# Tester la connexion
sudo docker compose exec db mysql -u ebmc_user -p -e "SELECT 1"
```

### Erreur Prisma "Migration failed"

```bash
# Réinitialiser la DB (ATTENTION: perte de données)
sudo docker compose exec app npx prisma migrate reset --force
```

### Port déjà utilisé

```bash
# Changer le port dans .env
APP_PORT=3090
MYSQL_PORT=3308

# Redémarrer
sudo docker compose down
sudo docker compose up -d
```

### Permission denied sur UGos

```bash
# Toujours utiliser sudo
sudo docker compose ...

# Ou ajouter votre user au groupe docker (si supporté)
sudo usermod -aG docker $USER
# Puis se reconnecter
```

### Mémoire insuffisante

Si le build échoue par manque de RAM :

```bash
# Augmenter la limite swap du NAS
# Ou builder sur votre PC et transférer l'image :

# Sur votre PC
docker build -t ebmc-app .
docker save ebmc-app > ebmc-app.tar

# Sur le NAS
sudo docker load < ebmc-app.tar
```

---

## 📊 Monitoring

### Via Docker

```bash
# Stats en temps réel
sudo docker stats ebmc-app ebmc-db

# Espace disque volumes
sudo docker system df -v
```

### Via Interface UGos

Utilisez l'interface web UGos pour monitorer :
- CPU/RAM par container
- Logs en temps réel
- Gestion des volumes

---

## 🔄 Mise à jour

```bash
# Arrêter l'app
./docker-setup.sh stop

# Pull les changements (si Git)
git pull

# Rebuild et redémarrer
./docker-setup.sh rebuild

# Appliquer les migrations
./docker-setup.sh migrate
```

---

## 📝 Notes importantes

1. **Standalone mode** : Next.js est configuré en mode `standalone` pour optimiser la taille du container

2. **Prisma** : Le client Prisma est généré au build, pas besoin de `node_modules` complet en runtime

3. **Variables d'environnement** : Certaines sont nécessaires au build (`NEXT_PUBLIC_*`), d'autres au runtime

4. **OAuth en local** : Google/Apple/Microsoft OAuth ne fonctionneront qu'avec une URL publique ou en configurant les redirect URIs pour localhost

5. **Boond API** : Fonctionne en local si vous avez configuré les credentials dans `.env`

---

## 🆘 Support

- **Logs app** : `./docker-setup.sh logs app`
- **Shell debug** : `./docker-setup.sh shell`
- **Reset complet** : `./docker-setup.sh clean` puis `./docker-setup.sh init`
