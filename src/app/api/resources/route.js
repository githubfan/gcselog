import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
  const resources = await prisma.resource.findMany();
  return Response.json(resources);
}
