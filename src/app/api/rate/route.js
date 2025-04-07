import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) { // Post Request to Database
  const { resourceId, userId, value } = await req.json(); // Extracting the resourceId, userId and value from the request body

  if (!resourceId || !userId || value == null) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  } // Checking if the resourceId, userId and value are present in the request body, and if not, returns a 400 error

  try {
    const existing = await prisma.rating.findUnique({
      where: {
        userId_resourceId: {
          userId,
          resourceId,
        },
      },
    }); // Checking if the user has already rated the resource

    if (existing) {
      return new Response(JSON.stringify({ message: "Already rated" }), { status: 400 });
    } // If the user has already rated the resource, returns a 400 error

    await prisma.rating.create({
      data: {
        resourceId,
        userId,
        rating: value,
      },
    });

    const ratings = await prisma.rating.findMany({ where: { resourceId } });
    const avg = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await prisma.resource.update({
      where: { resourceId },
      data: { averageRating: avg },
    });

    return new Response(JSON.stringify({ message: "Rated!" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
