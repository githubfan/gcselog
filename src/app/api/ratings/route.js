import { PrismaClient } from '@prisma/client';
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export async function POST(req) {
    const { resourceId } = await req.json();
    const cookieStore = await cookies();
    const userId = cookieStore.get("userid")?.value;

    const existing = await prisma.rating.findFirst({
        where: { resourceId, userId },
    });

    if (existing) {
        return new Response(JSON.stringify({ message: "Already voted" }), {
            status: 400,
        });
    }

    await prisma.rating.create({
        data: { resourceId, userId },
    });

    await prisma.resource.update({
        where: { id: resourceId },
        data: { upvotes: { increment: 1 } },
    });

    return new Response(JSON.stringify({ message: "Vote added" }), {
        status: 200,
    });
}
