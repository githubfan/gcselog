import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navigation/navbar";
import Footer from "../components/footer/footer";
import styles from "../globals.css";
import { Suspense } from "react";
import SearchBox from "./search-box";
import ResourceCards from "./resource-cards";
import { PrismaClient } from "@prisma/client";
import { toast } from "sonner";
import { Tags } from "./tag-cards";
const prisma = new PrismaClient();

export async function GET() {}

// This is now a server component
export default async function Subjects({ searchParams }) {
    // Get the search query from URL params
    const searchParameters = await searchParams;
    const query = searchParameters.query || "";
    const examBoard = searchParameters.examBoard || "";
    const subject = searchParameters.subject || "";
    const resourceType = searchParameters.type || "";


    console.log(query);

    // Fetch resources on the server
    const resources = await fetchResources({query, examBoard, subject, type: resourceType}) ?? [];
    const availableTags = await fetchTags() ?? [];

    return (
        <div>
            <Navbar />
            <div className="px-[8rem] flex flex-col gap-8">
                <header className="pt-[6rem] flex flex-col gap-8">
                    <h1 className="text-7xl text-[#64542A]">Subject Resources</h1>
                    <p className="text-lg " style={{fontFamily: 'Inter'}}>
                        Resources from across the country, collated specially for
                        you.
                    </p>
                </header>


                <SearchBox defaultValue={query} />
                
                <Suspense>
                    <Tags availableTags={availableTags} />
                </Suspense>
                {/* Client component for search functionality */}

                <div className="w-full pb-[2rem]">
                {/* Display resources with suspense for loading state */}
                <Suspense
                    fallback={<p className="loading">Loading resources...</p>}
                >
                    <ResourceCards resources={resources} />
                </Suspense>
                </div>

                </div>
                <Footer />
        </div>
    );
}

// Server-side function to fetch resources
async function fetchResources({
    query = "",
    tags = "",
    subject = "",
    examBoard = "",
    level = "",
    type = "",
    limit = 100,
    offset = 0,
    sort = ""
}) {

    const searchUrl = new URL('https://search.gcselog.com/search');
    query && searchUrl.searchParams.append('query', query);
    tags && searchUrl.searchParams.append('tags', tags);
    subject && searchUrl.searchParams.append('subject', subject);
    examBoard && searchUrl.searchParams.append('examBoard', examBoard);
    level && searchUrl.searchParams.append('level', level);
    type && searchUrl.searchParams.append('type', type);
    searchUrl.searchParams.append('limit', limit.toString());
    searchUrl.searchParams.append('offset', offset.toString());
    sort && searchUrl.searchParams.append('sort', sort);

    const response = await fetch(searchUrl.toString(), {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        // Handle non-2xx responses from the external API
        const errorBody = await response.text();
        console.error(
            "Error fetching from search API:",
            response.status,
            errorBody
        );
        toast.error("An error occured whilst fetching resources", {
            position: "top-center",
        });
    }

    const res = await response.json();

    const allResources = res.hits;

    // Filter resources based on query
    if (!query || query.trim() === "") {
        return allResources;
    }

    return allResources.filter((resource) => {
        const combined = `
      ${resource.title}
      ${resource.subject}
      ${resource.examBoard}
      ${resource.level}
      ${resource.type}
      ${resource.description}
    `.toLowerCase();
    return combined;
    });
}


async function fetchTags() {
    const tagsReq = await fetch('https://search.gcselog.com/filters', {
        method: 'GET',
        cache: 'force-cache'
    });

    if (!tagsReq.ok) {
        const errorBody = await response.text();
        console.error('Error fetching from tags API:', response.status, errorBody);
        toast.error('An error occured whilst fetching tags', {
            position: 'top-center'
        })
    }

    const tags = await tagsReq.json();

    return tags
}