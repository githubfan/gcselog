"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Frown, Smile } from "lucide-react";
import "../components/subject_cards/subject_card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubjectCard } from "../components/subject_cards/subject_card";

export default function ResourceCards({ resources }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const pathname = usePathname();
    const subjectValue = searchParams.get("subject");
    const examBoardValue = searchParams.get("examBoard");
    const resourceTypeValue = searchParams.get("type");

    // Ratings Logic
    async function rateResource(resourceId, value) {
        const response = await fetch("/api/rate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resourceId, value }),
        });

        const result = await response.json();
        if (!response.ok) {
            console.error(result.error || result.message);
            toast.error("You've already voted.", {
                position: "top-center",
                action: {
                    label: "Dismiss",
                },
                icon: <Frown />,
            });
        } else {
            console.log(result.message);
            toast.success("Thank you for your rating!", {
                position: "top-center",
                action: {
                    label: "Close",
                },
                icon: <Smile />,
            });
        }
    }

    const setSubjectTag = (t) => {
        const queryObj = {};

        if (t) queryObj.subject = t;
        if (examBoardValue) queryObj.examBoard = examBoardValue;
        if (resourceTypeValue) queryObj.type = resourceTypeValue;
        if (query) queryObj.query = query;

        routeUser(queryObj);
    };

    const setExamBoardTag = (t) => {
        const queryObj = {};

        if (subjectValue) queryObj.subject = subjectValue;
        if (t) queryObj.examBoard = t;
        if (resourceTypeValue) queryObj.type = resourceTypeValue;
        if (query) queryObj.query = query;

        routeUser(queryObj);
    };

    const routeUser = (queryObj) => {
        // Routes a user to new search parameters
        const searchParams = new URLSearchParams(queryObj).toString();
        router.push(searchParams ? `${pathname}?${searchParams}` : pathname);
    };

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {resources.length === 0 ? (
                <p className="col-span-full text-center py-8 text-gray-600">
                    No resources found.
                </p>
            ) : (
                resources?.map &&
                resources.map((resource, index) => (
                    <SubjectCard
                        index={index}
                        key={index}
                        resource={resource}
                        rateResource={rateResource}
                        setSubjectTag={setSubjectTag}
                        setExamBoardTag={setExamBoardTag}
                        className="font-sans bg-white rounded-[10px] border border-black p-4 col-span-1 mb-5 min-h-[450px]"
                    />
                ))
            )}
        </div>
    );
}
