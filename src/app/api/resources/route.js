import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const resources = await prisma.resource.findMany( // fetching resources by average rating 
    {
      orderBy: {
        averageRating: 'desc',
      }
    }
  );
  return Response.json(resources);
}
