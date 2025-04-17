"use client";
import { useEffect, useState } from "react";
import "./subject_cards-styling.css";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid"; // Importing uuidv4 for generating unique IDs

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons
import { toast } from "sonner";
import { Frown, Smile, SmileIcon } from "lucide-react";

// This component is responsible for displaying the subject cards on the subjects page. It fetches the data from the server and displays it in a card format. It also handles the search functionality and the rating system.
// The component uses the useEffect hook to fetch the data from the server and the useState hook to manage the state of the component. It also uses the uuidv4 function to generate unique IDs for each user.
const SubjectCards = ({ query = "", limit = null }) => {
    const [resources, setResources] = useState([]);
    const [userId, setUserId] = useState(null);
    const [allResources, setAllResources] = useState([]); // Store all resources
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let storedId = localStorage.getItem("userId");
        if (!storedId) {
            storedId = uuidv4(); // generate new ID if
            localStorage.setItem("userId", storedId);
        }
        setUserId(storedId);
    }, []);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            const res = await fetch(`/api/resources`); // Fetch all resources from the server
            const data = await res.json();
            setAllResources(data);
            setResources(data); // Initially show all resources
            setLoading(false);
        };

        fetchResources();
    }, []);

    // Filter resources on search query change
    useEffect(() => {
        const debounce = setTimeout(() => {
            const normalizedQuery = query.trim().toLowerCase();

            if (normalizedQuery.length === 0) {
                setResources(
                    limit ? allResources.slice(0, limit) : allResources
                );
            } else {
                const terms = normalizedQuery.split(/\s+/); // Excludes spaces
                // Filter resources based on the query
                const filtered = allResources.filter((resource) => {
                    const combined = `
        ${resource.title}
        ${resource.subject}
        ${resource.examBoard}
        ${resource.level}
        ${resource.type}
        ${resource.description}
      `.toLowerCase();

                    return terms.every((term) => combined.includes(term)); // Allows for searching across all terms
                });

                setResources(filtered);
            }
        }, 300); // debounce user input

        return () => clearTimeout(debounce);
    }, [query, allResources]);

    // Ratings Logic
    async function rateResource(resourceId, value) {
        const userId = localStorage.getItem("userId");

        const response = await fetch("/api/rate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resourceId, userId, value }),
        }); // Sending the rating to the server

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
            }); // Alert the user that the vote has been submitted.
        }
    }

    return (
        // Displaying the resources in a card format

        <div className="subjectCardContainer">
            <div className="cards-container">
                {loading ? (
                    <p className="loading">Loading resources...</p>
                ) : resources.length === 0 ? (
                    <p className="loading">No resources found.</p>
                ) : (
                    resources.map(
                        (
                            resource,
                            index // Maps resources into the structure needed
                        ) => (
                            <div key={index} className="card">
                                <p className="resourceType">{resource.type}</p>
                                <h3 className="resourceTitle">
                                    {resource.title}
                                </h3>
                                <div className="tags">
                                    <p className="tag studyLevel">
                                        {resource.level}
                                    </p>
                                    <p className="tag subject">
                                        {resource.subject}
                                    </p>
                                    <p className="tag examBoard">
                                        {resource.examBoard}
                                    </p>
                                </div>
                                <p className="resourceDescription">
                                    {resource.description}
                                </p>
                                <div className="linkAuthorContainer">
                                    <Link
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="accessButton"
                                    >
                                        Get access now!{" "}
                                        <FontAwesomeIcon
                                            icon={faLocationArrow}
                                            className="faLocationArrow"
                                        />
                                    </Link>
                                    <p className="author">
                                        Uploaded by:{" "}
                                        <span className="authorName">
                                            {resource.author}
                                        </span>
                                    </p>
                                </div>
                                <div className="ratingContent">
                                    <p className="ratingsIntro">
                                        Enjoyed this resource? Show your
                                        appreciation with a rating!
                                    </p>

                                    <div className="ratingButtons">
                                        <fieldset className="rating">
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

                                    <div className="ratingDesc ">
                                        This resource has an average rating of{" "}
                                        <span className="avgRating">
                                            {resource.averageRating.toFixed(1)}
                                        </span>{" "}
                                        out of 5 stars
                                    </div>
                                </div>
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default SubjectCards;
