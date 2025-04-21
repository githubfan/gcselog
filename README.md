This is a [GCSE Log](https://gcselog.com) - a project aiming to transform revision, allowing students to collaborate and share resources.

## Tech Stack
- NextJS 
- Supabase (Acting as the PostgreSQL database)
- Meilisearch (for nice fuzzy searching)

## Getting Started
Wish to suggest a change, or make your own local copy?

Create a .env file, and add a `DATABASE_URL` secret using a PostgreSQL databse.

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you wish to submit a resource, use [https://forms.gle/VMnnSfxGhduHmJaB9](this link). 


## How searching works
We now use Meilisearch for better searching through our resources. To make this more accessible for our developers, we've split Meilisearch into a microservice.
This application queries our Search API -- url https://search.gcselog.com -- to make any queries.

[https://github.com/ajjswift/gcselog-search](View the repository for the Search API)
