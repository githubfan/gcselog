"use client";

import { SearchIcon } from "lucide-react";
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
        <div className="w-full bg-[#266F77] flex gap-4 items-center px-[1rem] rounded-lg">
            <SearchIcon className="w-5 h-5 md:h-10 mdw-10 text-[#FFFBEF] " />
            <input
                type="text"
                placeholder="Search for resources..."
                className={`py-[2rem] w-full bg-transparent text-[#FFFBEF] placeholder:text-[#FFFBEF]  font-medium text-xl md:text-2xl outline-none`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
