import { PrismaClient, Property } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// ✅ Fetch host by userId
export async function getHostByUserId(userId: string): Promise<Property | null> {
  return await prisma.property.findFirst({
    where: {
      ownerId: userId, // ✅ Only fetch the first property owned by this host
    },
  });
}

// ✅ Fetch all properties assigned to a host
export async function getPropertiesByHost(userId: string): Promise<Property[]> {
  return await prisma.property.findMany({
    where: {
      ownerId: userId, // ✅ Ensures hosts only see their own properties
    },
  });
}
