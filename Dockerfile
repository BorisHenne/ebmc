# =============================================================================
# EBMC GROUP - Dockerfile Multi-Stage
# Next.js 15 + React 19 + Prisma (MySQL)
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Dependencies
# -----------------------------------------------------------------------------
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files AND prisma schema (needed for postinstall)
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Use npm install instead of npm ci to handle new packages not in lock file
RUN npm install --legacy-peer-deps

# -----------------------------------------------------------------------------
# Stage 2: Builder
# -----------------------------------------------------------------------------
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client (use local version from node_modules to avoid global version conflicts)
RUN ./node_modules/.bin/prisma generate

# Build the application
ENV NEXT_TELEMETRY_DISABLED=1

# Build args for URLs
ARG NEXT_PUBLIC_APP_URL
ARG NEXTAUTH_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3: Runner (Production)
# -----------------------------------------------------------------------------
FROM node:20-alpine AS runner

RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Run as non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy full node_modules for Prisma CLI and runtime
COPY --from=builder /app/node_modules ./node_modules

# Ensure public directory is readable (after all COPYs)
RUN mkdir -p ./public/images && chown -R nextjs:nodejs ./public && chmod -R 755 ./public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
