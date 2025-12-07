import type { Role } from "@prisma/client";
import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

// =============================================================================
// Extend NextAuth types
// =============================================================================

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      boondResourceId: string | null;
      isActive: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
    boondResourceId?: string | null;
    isActive: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: Role;
    boondResourceId: string | null;
  }
}

// =============================================================================
// Application Types
// =============================================================================

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: Role;
  boondResourceId: string | null;
  isActive: boolean;
  createdAt: Date;
  lastLoginAt: Date | null;
}

export interface AllowedUserInput {
  email: string;
  role: Role;
  note?: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string | null;
  action: string;
  entity: string;
  entityId: string | null;
  oldValue: string | null;
  newValue: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

// =============================================================================
// Permission Types
// =============================================================================

export type Permission =
  | "users:read"
  | "users:write"
  | "users:delete"
  | "contacts:read"
  | "contacts:write"
  | "contacts:delete"
  | "settings:read"
  | "settings:write"
  | "audit:read"
  | "boond:sync";

export const RolePermissions: Record<Role, Permission[]> = {
  SUPER_ADMIN: [
    "users:read",
    "users:write",
    "users:delete",
    "contacts:read",
    "contacts:write",
    "contacts:delete",
    "settings:read",
    "settings:write",
    "audit:read",
    "boond:sync",
  ],
  ADMIN: [
    "users:read",
    "users:write",
    "contacts:read",
    "contacts:write",
    "contacts:delete",
    "settings:read",
    "audit:read",
    "boond:sync",
  ],
  EDITOR: [
    "contacts:read",
    "contacts:write",
    "boond:sync",
  ],
  VIEWER: [
    "contacts:read",
  ],
};
