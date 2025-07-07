import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // 開発中ならログを見るのもおすすめ
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
