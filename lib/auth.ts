import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthConfig } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import type { Role } from "@prisma/client";
import { prisma } from "./db";

// =============================================================================
// Custom Boondmanager OAuth Provider
// =============================================================================
const BoondProvider = {
  id: "boondmanager",
  name: "Boondmanager",
  type: "oauth" as const,
  authorization: {
    url: `https://${process.env.BOOND_INSTANCE}.boondmanager.com/oauth/authorize`,
    params: {
      scope: "read write",
      response_type: "code",
    },
  },
  token: {
    url: `https://${process.env.BOOND_INSTANCE}.boondmanager.com/oauth/token`,
  },
  userinfo: {
    url: `https://${process.env.BOOND_INSTANCE}.boondmanager.com/api/current-user`,
    async request({ tokens, provider }: { tokens: any; provider: any }) {
      const response = await fetch(provider.userinfo.url, {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
          Accept: "application/json",
        },
      });
      const data = await response.json();
      return data.data;
    },
  },
  profile(profile: any) {
    return {
      id: profile.id.toString(),
      name: `${profile.attributes.firstName} ${profile.attributes.lastName}`,
      email: profile.attributes.email,
      image: profile.attributes.thumbnail,
      boondResourceId: profile.id.toString(),
    };
  },
  clientId: process.env.BOOND_CLIENT_ID!,
  clientSecret: process.env.BOOND_CLIENT_SECRET!,
};

// =============================================================================
// NextAuth Configuration
// =============================================================================
export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Apple OAuth
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),

    // Microsoft Entra ID (formerly Azure AD)
    MicrosoftEntraID({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      issuer: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID || "common"}/v2.0`,
    }),

    // Boondmanager Custom OAuth (cast to any for custom profile fields)
    BoondProvider as any,

    // Email Magic Link (backup)
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],

  pages: {
    signIn: "/connexion",
    signOut: "/deconnexion",
    error: "/erreur-auth",
    verifyRequest: "/verification-email",
    newUser: "/backoffice",
  },

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60, // 24 heures
  },

  callbacks: {
    // Vérifier si l'utilisateur est autorisé à se connecter
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.log("[Auth] Sign-in rejected: no email");
        return false;
      }

      // Vérifier si l'email est dans la whitelist
      const allowedUser = await prisma.allowedUser.findUnique({
        where: { email: user.email.toLowerCase() },
      });

      if (!allowedUser) {
        console.log(`[Auth] Sign-in rejected: ${user.email} not in whitelist`);
        return false;
      }

      // Mettre à jour le rôle de l'utilisateur si nécessaire
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email.toLowerCase() },
      });

      if (existingUser && existingUser.role !== allowedUser.role) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: allowedUser.role },
        });
      }

      // Mettre à jour boondResourceId si connexion via Boondmanager
      if (account?.provider === "boondmanager" && profile) {
        const boondProfile = profile as { id: string };
        if (existingUser) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { boondResourceId: boondProfile.id },
          });
        }
      }

      console.log(`[Auth] Sign-in approved: ${user.email} (${allowedUser.role})`);
      return true;
    },

    // Enrichir la session avec les données utilisateur
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: {
            id: true,
            role: true,
            boondResourceId: true,
            isActive: true,
          },
        });

        if (dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.boondResourceId = dbUser.boondResourceId;
          session.user.isActive = dbUser.isActive;
        }

        // Mettre à jour lastLoginAt
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }

      return session;
    },

    // Callback JWT (si on utilisait JWT strategy)
    async jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true, boondResourceId: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.boondResourceId = dbUser.boondResourceId;
        }
      }
      return token;
    },
  },

  events: {
    // Log des événements d'authentification
    async signIn({ user, account, isNewUser }) {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: isNewUser ? "USER_CREATED" : "USER_SIGN_IN",
          entity: "User",
          entityId: user.id,
          newValue: JSON.stringify({
            provider: account?.provider,
            isNewUser,
          }),
        },
      });
    },

    async signOut({ session }) {
      if (session?.userId) {
        await prisma.auditLog.create({
          data: {
            userId: session.userId,
            action: "USER_SIGN_OUT",
            entity: "User",
            entityId: session.userId,
          },
        });
      }
    },

    async createUser({ user }) {
      console.log(`[Auth] New user created: ${user.email}`);
    },

    async linkAccount({ user, account }) {
      console.log(`[Auth] Account linked: ${user.email} via ${account.provider}`);
    },
  },

  debug: process.env.NODE_ENV === "development",
};

// =============================================================================
// Export NextAuth handlers
// =============================================================================
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get current session (server-side)
 */
export async function getSession() {
  return await auth();
}

/**
 * Check if user has required role
 */
export function hasRole(userRole: Role | undefined, requiredRoles: Role[]): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

/**
 * Check if user is admin
 */
export function isAdmin(role: Role | undefined): boolean {
  return hasRole(role, ["SUPER_ADMIN", "ADMIN"]);
}

/**
 * Check if user can edit
 */
export function canEdit(role: Role | undefined): boolean {
  return hasRole(role, ["SUPER_ADMIN", "ADMIN", "EDITOR"]);
}
