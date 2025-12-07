import { PrismaClient } from "@prisma/client";

// =============================================================================
// Prisma Client Singleton
// =============================================================================
// Évite les multiples instances en développement (hot reload)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Soft delete pattern
 */
export async function softDelete(
  model: "user" | "contactSubmission",
  id: string
): Promise<void> {
  if (model === "user") {
    await prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }
  // Add other models as needed
}

/**
 * Paginated query helper
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function getPaginationParams(params: PaginationParams) {
  const page = Math.max(1, params.page || 1);
  const limit = Math.min(100, Math.max(1, params.limit || 10));
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  params: { page: number; limit: number }
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / params.limit);

  return {
    data,
    meta: {
      total,
      page: params.page,
      limit: params.limit,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}

// =============================================================================
// Database Health Check
// =============================================================================

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("[DB] Connection check failed:", error);
    return false;
  }
}

// Alias for consistency
export const checkDatabaseHealth = checkDatabaseConnection;
