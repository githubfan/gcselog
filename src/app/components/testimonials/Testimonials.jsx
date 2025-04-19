"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const testimonials = await fetch("/api/testimonials");

            if (!testimonials.ok) {
                toast.error("An error occured whilst fetching testimonials");
                return;
            }

            const response = await testimonials.json();

            setTestimonials(response);
        };

        fetchTestimonials();
    }, []);

    const roundHalf = (num) => {
        return (Math.round(num * 2) / 2).toFixed(1);
    };

    // Helper function to render stars
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<span key={i}>&#9733;</span>); // filled star
            } else if (rating >= i - 0.5) {
                stars.push(<span key={i}>&#9734;</span>); // empty star
            }
        }
        return stars;
    };

    // Determine grid class based on number of testimonials
    const gridClass =
        testimonials.length === 1
            ? "grid w-full grid-cols-3 gap-4 justify-items-center"
            : "grid w-full grid-cols-3 gap-4 justify-items-center";

    // Determine column span based on number of testimonials
    const colSpanClass =
        testimonials.length === 1 ? "col-span-3" : "col-span-1";

    return (
        <div>
            <div className={gridClass} style={{ padding: "1rem" }}>
                {testimonials && testimonials.length > 0 ? (
                    testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`${colSpanClass} flex flex-col gap-2 text-left text-xl font-medium rounded-lg bg-white text-black border border-black`}
                            style={{ padding: "2rem" }}
                        >
                            <div className="text-yellow-400 text-lg flex gap-4 items-center">
                                <div>
                                    {renderStars(roundHalf(testimonial.rating))}
                                </div>
                                <p className="text-base font-light ml-[1rem]">
                                    ({roundHalf(testimonial.rating)} / 5.0)
                                </p>
                            </div>
                            <p>{testimonial.testimonial}</p>
                            <span className="font-light">
                                {testimonial.author}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3">
                        <span>Loading testimonials...</span>
                    </div>
                )}
            </div>
        </div>
    );
}
