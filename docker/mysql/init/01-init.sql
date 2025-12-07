-- =============================================================================
-- EBMC GROUP - MySQL Initialization Script
-- =============================================================================
-- Ce script est exécuté automatiquement au premier démarrage du container MySQL
-- =============================================================================

-- Configurer le charset
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;

-- Créer les tables Prisma (sera fait par prisma migrate, mais au cas où)
-- Ces tables seront créées/mises à jour par Prisma, ce fichier sert de backup

-- Note: Les tables suivantes seront créées automatiquement par Prisma:
-- - User
-- - Account
-- - Session
-- - VerificationToken
-- - AllowedUser
-- - ContactSubmission
-- - AuditLog
-- - Setting

-- Message de confirmation
SELECT 'EBMC GROUP database initialized successfully!' AS status;
