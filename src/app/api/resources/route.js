import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get('query') || '';
  const tags = searchParams.get('tags') || '';
  const subject = searchParams.get('subject') || '';
  const examBoard = searchParams.get('examBoard') || '';
  const level = searchParams.get('level') || '';
  const type = searchParams.get('type') || '';
  const limit = parseInt(searchParams.get('limit')) || 20;
  const offset = parseInt(searchParams.get('offset')) || 0;
  const sort = searchParams.get('sort') || '';

  // Resources are no longer found through Postgres.
  /*   const resources = await prisma.resource.findMany( // fetching resources by average rating
    {
      orderBy: {
        averageRating: 'desc',
      }
    }
  ); */

  try {
    const searchUrl = new URL('https://search.gcselog.com/search');
    searchUrl.searchParams.append('query', query);
    searchUrl.searchParams.append('tags', tags);
    searchUrl.searchParams.append('subject', subject);
    searchUrl.searchParams.append('examBoard', examBoard);
    searchUrl.searchParams.append('level', level);
    searchUrl.searchParams.append('type', type);
    searchUrl.searchParams.append('limit', limit.toString());
    searchUrl.searchParams.append('offset', offset.toString());
    searchUrl.searchParams.append('sort', sort);

    const response = await fetch(searchUrl.toString(), {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      // Handle non-2xx responses from the external API
      const errorBody = await response.text();
      console.error('Error fetching from search API:', response.status, errorBody);
      return NextResponse.json(
        {
          message: 'Error fetching resources from external search API',
          status: response.status,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
