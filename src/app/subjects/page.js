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

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 flex flex-col gap-4 md:gap-8 max-w-[1600px] mx-auto w-full">
                <header className="pt-16 md:pt-24 flex flex-col gap-3 md:gap-6">
                    <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-[#64542A] font-bold">
                        Subject Resources
                    </h1>
                    <p
                        className="text-base md:text-lg text-gray-700"
                        style={{ fontFamily: "Inter" }}
                    >
                        Resources from across the country, collated specially
                        for you.
                    </p>
                </header>

                <div className="w-full">
                    <SearchBox defaultValue={query} />
                </div>

                <Suspense
                    fallback={
                        <div className="h-12 animate-pulse bg-gray-200 rounded-md"></div>
                    }
                >
                    <ServerTagsSuspense />
                </Suspense>

                <div className="w-full pb-8 md:pb-12">
                    <Suspense
                        fallback={
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-64 animate-pulse bg-white rounded-lg"
                                    ></div>
                                ))}
                            </div>
                        }
                    >
                        <ServerResourcesSuspense
                            query={query}
                            examBoard={examBoard}
                            subject={subject}
                            resourceType={resourceType}
                        />
                    </Suspense>
                </div>
            </div>
            <Footer />
        </div>
    );
}

async function ServerResourcesSuspense({
    query,
    examBoard,
    subject,
    resourceType,
}) {
    const resources =
        (await fetchResources({
            query,
            examBoard,
            subject,
            type: resourceType,
        })) ?? [];

    return <ResourceCards resources={resources} />;
}

async function ServerTagsSuspense() {
    const availableTags = (await fetchTags()) ?? [];

    return <Tags availableTags={availableTags} />;
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
    sort = "",
}) {
    const searchUrl = new URL("https://search.gcselog.com/search");
    query && searchUrl.searchParams.append("query", query);
    tags && searchUrl.searchParams.append("tags", tags);
    subject && searchUrl.searchParams.append("subject", subject);
    examBoard && searchUrl.searchParams.append("examBoard", examBoard);
    level && searchUrl.searchParams.append("level", level);
    type && searchUrl.searchParams.append("type", type);
    searchUrl.searchParams.append("limit", limit.toString());
    searchUrl.searchParams.append("offset", offset.toString());
    sort && searchUrl.searchParams.append("sort", sort);

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
    const tagsReq = await fetch("https://search.gcselog.com/filters", {
        method: "GET",
        cache: "force-cache",
    });

    if (!tagsReq.ok) {
        const errorBody = await tagsReq.text();
        console.error(
            "Error fetching from tags API:",
            tagsReq.status,
            errorBody
        );
        toast.error("An error occured whilst fetching tags", {
            position: "top-center",
        });
    }

    const tags = await tagsReq.json();

    return tags;
}
