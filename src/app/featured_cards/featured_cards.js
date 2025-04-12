"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons
// import the subject_cards-styling.css from the subject_cards folder



const FeaturedCard = ({resource, index, rateResource}) => {
    return (
        <div>
        <div key={index} className="card">
        <p className="resourceType">{resource.type}</p>
        <h3 className="resourceTitle">{resource.title}</h3>
        <div className="tags">
          <p className="tag studyLevel">{resource.level}</p>
          <p className="tag subject">{resource.subject}</p>
          <p className="tag examBoard">{resource.examBoard}</p>
        </div>
        <p className="resourceDescription">{resource.description}</p>
        <div className="linkAuthorContainer">
          <Link href={resource.link} target="_blank" rel="noopener noreferrer" className="accessButton">
            Get access now! <FontAwesomeIcon icon={faLocationArrow} className="faLocationArrow" />
          </Link>
          <p className="author">Uploaded by: <span className="authorName">{resource.author}</span></p>
        </div>
        <div className="ratingContent">
          <p className="ratingsIntro">Enjoyed this resource? Show your appreciation with a rating!</p>

          <div className="ratingButtons">
            <fieldset className="rating">

              <input type="radio" id={`star5-${index}`} name={`rating-${index}`} value="5" onClick={() => rateResource(resource.resourceId, 5)} />
              <label className="full" htmlFor={`star5-${index}`} title="5 stars"></label>

              <input type="radio" id={`star4half-${index}`} name={`rating-${index}`} value="4.5" onClick={() => rateResource(resource.resourceId, 4.5)} />
              <label className="half" htmlFor={`star4half-${index}`} title="4.5 stars"></label>

              <input type="radio" id={`star4-${index}`} name={`rating-${index}`} value="4" onClick={() => rateResource(resource.resourceId, 4)} />
              <label className="full" htmlFor={`star4-${index}`} title="4 stars"></label>

              <input type="radio" id={`star3half-${index}`} name={`rating-${index}`} value="3.5" onClick={() => rateResource(resource.resourceId, 3.5)} />
              <label className="half" htmlFor={`star3half-${index}`} title="3.5 stars"></label>

              <input type="radio" id={`star3-${index}`} name={`rating-${index}`} value="3" onClick={() => rateResource(resource.resourceId, 3)} />
              <label className="full" htmlFor={`star3-${index}`} title="3 stars"></label>

              <input type="radio" id={`star2half-${index}`} name={`rating-${index}`} value="2.5" onClick={() => rateResource(resource.resourceId, 2.5)} />
              <label className="half" htmlFor={`star2half-${index}`} title="2.5 stars"></label>

              <input type="radio" id={`star2-${index}`} name={`rating-${index}`} value="2" onClick={() => rateResource(resource.resourceId, 2)} />
              <label className="full" htmlFor={`star2-${index}`} title="2 stars"></label>

              <input type="radio" id={`star1half-${index}`} name={`rating-${index}`} value="1.5" onClick={() => rateResource(resource.resourceId, 1.5)} />
              <label className="half" htmlFor={`star1half-${index}`} title="1.5 stars"></label>

              <input type="radio" id={`star1-${index}`} name={`rating-${index}`} value="1" onClick={() => rateResource(resource.resourceId, 1)} />
              <label className="full" htmlFor={`star1-${index}`} title="1 star"></label>

              <input type="radio" id={`starhalf-${index}`} name={`rating-${index}`} value="0.5" onClick={() => rateResource(resource.resourceId, 0.5)} />
              <label className="half" htmlFor={`starhalf-${index}`} title="0.5 stars"></label>
            </fieldset>
          </div>

          <div className="ratingDesc ">
            This resource has an average rating of <span className="avgRating">{resource.averageRating.toFixed(1)}</span> out of 5 stars
          </div>
        </div>
</div>
        </div>
    );
}   

export default FeaturedCard;