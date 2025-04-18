"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBox({ defaultValue = "" }) {
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState(defaultValue);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query) {
                router.push(`${pathname}?query=${encodeURIComponent(query)}`);
            } else {
                router.push(pathname);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [query, router, pathname]);

    return (
        <input
            type="text"
            placeholder="Search for resources..."
            className="searchBox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}
