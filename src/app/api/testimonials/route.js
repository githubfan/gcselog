import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
    const testimonialCount = await prisma.testimonials.count();

    // If we have 3 or fewer testimonials, return all of them
    if (testimonialCount <= 3) {
        const testimonials = await prisma.testimonials.findMany();
        return Response.json(testimonials);
    }

    // Otherwise, get 3 random testimonials
    // Calculate a safe skip value that won't exceed available records
    const maxSkip = testimonialCount - 3;
    const skip = Math.floor(Math.random() * (maxSkip + 1));

    const testimonials = await prisma.testimonials.findMany({
        take: 3,
        skip: skip,
    });

    return Response.json(testimonials);
}
