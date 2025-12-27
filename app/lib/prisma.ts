import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// create adapter using DATABASE_URL from env
const connectionString = process.env.DATABASE_URL ?? process.env.NEXT_PUBLIC_DATABASE_URL ?? "";
if (!connectionString) {
  // Provide a helpful runtime hint if the env var is missing
  console.warn("Warning: DATABASE_URL is not set. Prisma adapter may fail to initialize.");
}
const adapter = new PrismaPg({ connectionString });

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
    // Pass the driver adapter instance for Postgres
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;