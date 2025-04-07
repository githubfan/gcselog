// src/app/api/search/route.js
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
  
    const whereClause = query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { subject: { contains: query, mode: "insensitive" } },
            { author: { contains: query, mode: "insensitive" } },
            { level: { contains: query, mode: "insensitive" } },
            { type: { contains: query, mode: "insensitive" } },
            { examBoard: { contains: query, mode: "insensitive" } },
          ],
        }
      : {};
  
    try {
      const results = await prisma.resource.findMany({
        where: whereClause,
        orderBy: {
          averageRating: "desc",
        },
      });
  
      return new Response(JSON.stringify(results), { status: 200 });
    } catch (error) {
      console.error("Search error:", error);
      return new Response(JSON.stringify({ error: "Search failed" }), { status: 500 });
    }
  }
  