"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { Frown, Smile } from "lucide-react";
import "../components/subject_cards/subject_card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
                    <div
                        key={index}
                        className="w-full bg-white border-2 border-black rounded-lg p-3 md:p-4 flex flex-col h-full transition-transform hover:scale-[1.01] hover:shadow-md"
                    >
                        <div className="flex-1">
                            <div className="flex gap-4 items-center mb-2">
                                <p className="resourceType text-xs md:text-sm bg-blue-100 px-2 py-1 rounded-full text-blue-800 inline-block">
                                    {resource.type}
                                </p>
                                <p className="resourceType text-xs md:text-sm bg-blue-100 px-2 py-1 rounded-full text-blue-800 inline-block">
                                    {resource.level}
                                </p>
                            </div>
                            <h3
                                className="resourceTitle md:text-lg font-bold line-clamp-2 mb-2"
                                style={{
                                    fontSize: 40,
                                }}
                            >
                                {resource.title}
                            </h3>
                            <div className=" flex gap-1 md:gap-2 mt-1">
                                <p
                                    className="tag subject bg-gray-200 px-2 py-0.5 rounded-md text-xs md:text-sm cursor-pointer hover:bg-gray-300"
                                    onClick={() =>
                                        setSubjectTag(resource.subject)
                                    }
                                >
                                    {resource.subject}
                                </p>
                                <p
                                    className="tag examBoard bg-gray-200 px-2 py-0.5 rounded-md text-xs md:text-sm cursor-pointer hover:bg-gray-300"
                                    onClick={() =>
                                        setExamBoardTag(resource.examBoard)
                                    }
                                >
                                    {resource.examBoard}
                                </p>
                            </div>
                            <p className="resourceDescription mt-3 text-xs md:text-sm text-gray-700 line-clamp-3">
                                {resource.description}
                            </p>
                        </div>

                        <div className="mt-auto pt-3">
                            <div className="linkAuthorContainer flex flex-col gap-2">
                                <Link
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="accessButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 md:py-2 px-3 md:px-4 rounded text-center text-sm md:text-base flex items-center justify-center"
                                >
                                    Get access{" "}
                                    <FontAwesomeIcon
                                        icon={faLocationArrow}
                                        className="faLocationArrow ml-2"
                                    />
                                </Link>
                                <p className="author text-xs md:text-sm text-gray-600">
                                    By:{" "}
                                    <span className="authorName font-semibold">
                                        {resource.author}
                                    </span>
                                </p>
                            </div>

                            <div className="ratingContent mt-3">
                                <p className="ratingsIntro text-xs md:text-sm text-gray-700">
                                    Rate this resource:
                                </p>

                                <div className="ratingButtons flex items-center mt-1">
                                    <fieldset className="rating scale-100 origin-left">
                                        <input
                                            type="radio"
                                            id={`star5-${index}`}
                                            name={`rating-${index}`}
                                            value="5"
                                            onClick={() =>
                                                rateResource(
                                                    resource.resourceId,
                                                    5
                                                )
                                            }
                                        />
                                        <label
                                            className="full"
                                            htmlFor={`star5-${index}`}
                                            title="5 stars"
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
                                        />
                                        <label
                                            className="half"
                                            htmlFor={`star4half-${index}`}
                                            title="4.5 stars"
                                        ></label>
                                        <input
                                            type="radio"
                                            id={`star4-${index}`}
                                            name={`rating-${index}`}
                                            value="4"
                                            onClick={() =>
                                                rateResource(
                                                    resource.resourceId,
                                                    4
                                                )
                                            }
                                        />
                                        <label
                                            className="full"
                                            htmlFor={`star4-${index}`}
                                            title="4 stars"
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
                                        />
                                        <label
                                            className="half"
                                            htmlFor={`star3half-${index}`}
                                            title="3.5 stars"
                                        ></label>
                                        <input
                                            type="radio"
                                            id={`star3-${index}`}
                                            name={`rating-${index}`}
                                            value="3"
                                            onClick={() =>
                                                rateResource(
                                                    resource.resourceId,
                                                    3
                                                )
                                            }
                                        />
                                        <label
                                            className="full"
                                            htmlFor={`star3-${index}`}
                                            title="3 stars"
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
                                        />
                                        <label
                                            className="half"
                                            htmlFor={`star2half-${index}`}
                                            title="2.5 stars"
                                        ></label>
                                        <input
                                            type="radio"
                                            id={`star2-${index}`}
                                            name={`rating-${index}`}
                                            value="2"
                                            onClick={() =>
                                                rateResource(
                                                    resource.resourceId,
                                                    2
                                                )
                                            }
                                        />
                                        <label
                                            className="full"
                                            htmlFor={`star2-${index}`}
                                            title="2 stars"
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
                                        />
                                        <label
                                            className="half"
                                            htmlFor={`star1half-${index}`}
                                            title="1.5 stars"
                                        ></label>
                                        <input
                                            type="radio"
                                            id={`star1-${index}`}
                                            name={`rating-${index}`}
                                            value="1"
                                            onClick={() =>
                                                rateResource(
                                                    resource.resourceId,
                                                    1
                                                )
                                            }
                                        />
                                        <label
                                            className="full"
                                            htmlFor={`star1-${index}`}
                                            title="1 star"
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
                                        />
                                        <label
                                            className="half"
                                            htmlFor={`starhalf-${index}`}
                                            title="0.5 stars"
                                        ></label>
                                    </fieldset>
                                </div>

                                <div className="ratingDesc mt-1 text-xs md:text-sm text-gray-700">
                                    Average:{" "}
                                    <span className="avgRating font-semibold">
                                        {resource.averageRating.toFixed(1)}
                                    </span>
                                    /5
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
