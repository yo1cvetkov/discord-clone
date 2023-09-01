import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// globalThis.prisma is neccessary in development because without it with every minor change in code during the hot reload the new instance of prisma client will be created and that is not what we want in development

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
