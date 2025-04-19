"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Frown, Smile } from "lucide-react";
import "../components/subject_cards/subject_card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function ResourceCards({ resources }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('query')
    const pathname = usePathname();
    const subjectValue = searchParams.get('subject')
    const examBoardValue = searchParams.get('examBoard')
    const resourceTypeValue = searchParams.get('type')

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
      
        routeUser(queryObj)
    };

    const setExamBoardTag = (t) => {
        const queryObj = {};
    
        if (subjectValue) queryObj.subject = subjectValue;
        if (t) queryObj.examBoard = t;
        if (resourceTypeValue) queryObj.type = resourceTypeValue;
        if (query) queryObj.query = query;
      
        routeUser(queryObj)
    }

    const routeUser = (queryObj) => {
        // Routes a user to new search parameters

        // Build the query string
        const searchParams = new URLSearchParams(queryObj).toString();


        router.push(searchParams ? `${pathname}?${searchParams}` : pathname);

    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.length === 0 ? (
                <p className="col-span-full text-center loading">
                    No resources found.
                </p>
            ) : (
                resources?.map && 
                resources.map((resource, index) => (
                    <div
                        key={index}
                        className="w-full bg-white border-2 border-black rounded-lg p-4"
                    >
                        <p className="resourceType">{resource.type}</p>
                        <h3 className="resourceTitle">{resource.title}</h3>
                        <div className="tags flex flex-wrap gap-2 mt-2">
                            <p className="tag studyLevel bg-gray-200 px-2 py-1 rounded-md text-sm">
                                {resource.level}
                            </p>
                            <p className="tag subject bg-gray-200 px-2 py-1 rounded-md text-sm cursor-pointer" onClick={() => setSubjectTag(resource.subject)}>
                                {resource.subject}
                            </p>
                            <p className="tag examBoard bg-gray-200 px-2 py-1 rounded-md text-sm cursor-pointer" onClick={() => setExamBoardTag(resource.examBoard)}>
                                {resource.examBoard}
                            </p>
                        </div>
                        <p className="resourceDescription mt-4 text-gray-700">
                            {resource.description}
                        </p>
                        <div className="linkAuthorContainer mt-4 flex justify-between items-center">
                            <Link
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="accessButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                            >
                                Get access now!{" "}
                                <FontAwesomeIcon
                                    icon={faLocationArrow}
                                    className="faLocationArrow ml-2"
                                />
                            </Link>
                            <p className="author text-sm text-gray-600">
                                Uploaded by:{" "}
                                <span className="authorName font-semibold">
                                    {resource.author}
                                </span>
                            </p>
                        </div>
                        <div className="ratingContent mt-4">
                            <p className="ratingsIntro text-sm text-gray-700">
                                Enjoyed this resource? Show your appreciation
                                with a rating!
                            </p>

                            <div className="ratingButtons flex items-center mt-2">
                                <fieldset className="rating">
                                    {" "}
                                    {/* This fieldset structure is crucial for your CSS */}
                                    <input
                                        type="radio"
                                        id={`star5-${index}`}
                                        name={`rating-${index}`}
                                        value="5"
                                        onClick={() =>
                                            rateResource(resource.resourceId, 5)
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="full"
                                        htmlFor={`star5-${index}`}
                                        title="5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star4half-${index}`}
                                        name={`rating-${index}`}
                                        value="4.5"
                                        onClick={() =>
                                            rateResource(
                                                resource.resourceId,
                                                4.5
                                            )
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="half"
                                        htmlFor={`star4half-${index}`}
                                        title="4.5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star4-${index}`}
                                        name={`rating-${index}`}
                                        value="4"
                                        onClick={() =>
                                            rateResource(resource.resourceId, 4)
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="full"
                                        htmlFor={`star4-${index}`}
                                        title="4 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star3half-${index}`}
                                        name={`rating-${index}`}
                                        value="3.5"
                                        onClick={() =>
                                            rateResource(
                                                resource.resourceId,
                                                3.5
                                            )
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="half"
                                        htmlFor={`star3half-${index}`}
                                        title="3.5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star3-${index}`}
                                        name={`rating-${index}`}
                                        value="3"
                                        onClick={() =>
                                            rateResource(resource.resourceId, 3)
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="full"
                                        htmlFor={`star3-${index}`}
                                        title="3 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star2half-${index}`}
                                        name={`rating-${index}`}
                                        value="2.5"
                                        onClick={() =>
                                            rateResource(
                                                resource.resourceId,
                                                2.5
                                            )
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="half"
                                        htmlFor={`star2half-${index}`}
                                        title="2.5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star2-${index}`}
                                        name={`rating-${index}`}
                                        value="2"
                                        onClick={() =>
                                            rateResource(resource.resourceId, 2)
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="full"
                                        htmlFor={`star2-${index}`}
                                        title="2 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star1half-${index}`}
                                        name={`rating-${index}`}
                                        value="1.5"
                                        onClick={() =>
                                            rateResource(
                                                resource.resourceId,
                                                1.5
                                            )
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="half"
                                        htmlFor={`star1half-${index}`}
                                        title="1.5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`star1-${index}`}
                                        name={`rating-${index}`}
                                        value="1"
                                        onClick={() =>
                                            rateResource(resource.resourceId, 1)
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="full"
                                        htmlFor={`star1-${index}`}
                                        title="1 star"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>

                                    <input
                                        type="radio"
                                        id={`starhalf-${index}`}
                                        name={`rating-${index}`}
                                        value="0.5"
                                        onClick={() =>
                                            rateResource(
                                                resource.resourceId,
                                                0.5
                                            )
                                        }
                                        // Removed Tailwind classes that interfered with star display
                                    />
                                    <label
                                        className="half"
                                        htmlFor={`starhalf-${index}`}
                                        title="0.5 stars"
                                        // Removed Tailwind classes that interfered with star display
                                    ></label>
                                </fieldset>
                            </div>

                            <div className="ratingDesc mt-2 text-sm text-gray-700">
                                This resource has an average rating of{" "}
                                <span className="avgRating font-semibold">
                                    {resource.averageRating.toFixed(1)}
                                </span>{" "}
                                out of 5 stars
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
