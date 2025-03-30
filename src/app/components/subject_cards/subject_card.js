"use client"; 
import { useEffect, useState } from "react";
import "./subject_cards-styling.css";
import Link from "next/link";


const SubjectCards = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("gcse_log_json.json"); // Fetching Json File
        const data = await response.json(); // Setting Json File equal to data 
        setResources(data); // Update the state with the Json File
      } catch (error) {
        console.error("Error fetching JSON file:", error); // Error message if Json File is not fetched
      }
    };

    fetchResources();
  }, []); // Empty array to ensure that the effect runs only once

  return ( // Displaying the resources in a card format
    <div className="cards-container">
      {resources.length === 0 ? (
        <p>Loading resources...</p> // Fallback message while loading data
      ) : (

      
        resources.map((resource, index) => (
          <div key={index} className="card">
            <p className="resourceType">{resource["Resource Type"]}</p>
            <h3 className="resourceTitle">{resource["Resource Title"]}</h3>

            <div className="tags">
              <p className="tag studyLevel">{resource["Study Level"]}</p>
              <p className="tag subject">{resource["Subject"]}</p>
              <p className="tag examBoard">{resource["Exam Board"]}</p>
            </div>
            <div className="linkAuthorContainer">
            <Link href={resource["Link"]} target="_blank" rel="noopener noreferrer" className="accessButton">
                Get access now!            
            </Link>
            <p className="author">Uploaded by: {resource["Resource Author"]}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubjectCards;
