import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient across hot-reloads in development.
// Next.js re-evaluates modules on every HMR update, so a plain
// `new PrismaClient()` would open a new connection pool each time and
// eventually exhaust the database's connection limit.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

export default prisma;
