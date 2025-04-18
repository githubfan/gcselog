import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/footer/footer";
import styles from "../globals.css";
import { Suspense } from "react";
import SearchBox from "./search-box";
import ResourceCards from "./resource-cards";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {}

// This is now a server component
export default async function Subjects({ searchParams }) {
    // Get the search query from URL params
    const query = searchParams.query || "";

    // Fetch resources on the server
    const resources = await fetchResources(query);

    return (
        <div>
            <Navbar />
            <header className="homepage-header subject-header">
                <h1 className="header-title">subject resources</h1>
                <p className="header-desc">
                    resources from across the country, collated especially for
                    you.
                </p>
            </header>

            {/* Client component for search functionality */}
            <SearchBox defaultValue={query} />

            {/* Display resources with suspense for loading state */}
            <Suspense
                fallback={<p className="loading">Loading resources...</p>}
            >
                <ResourceCards resources={resources} />
            </Suspense>

            <Footer />
        </div>
    );
}

// Server-side function to fetch resources
async function fetchResources(query = "") {
    const res = await prisma.resource.findMany(
        // fetching resources by average rating
        {
            orderBy: {
                averageRating: "desc",
            },
        }
    );

    const allResources = res;

    // Filter resources based on query
    if (!query || query.trim() === "") {
        return allResources;
    }

    const normalizedQuery = query.trim().toLowerCase();
    const terms = normalizedQuery.split(/\s+/);

    return allResources.filter((resource) => {
        const combined = `
      ${resource.title}
      ${resource.subject}
      ${resource.examBoard}
      ${resource.level}
      ${resource.type}
      ${resource.description}
    `.toLowerCase();

        return terms.every((term) => combined.includes(term));
    });
}
