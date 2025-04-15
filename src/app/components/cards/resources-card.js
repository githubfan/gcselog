import Link from "next/link";
import "./resources-styling.css"
import Image from "next/image";

// This code needs to be updated, running similarly to the subjects page. Currently it is hardcoded.

function ResourcesCard(props) {
    return (
        <div className="resources-card">
            <h3 className="title">{props.resourceTitle}</h3>
            <p className="date">Apply by {props.date}</p>
            <Link href={`${props.buttonLink}`} className="turqBtn resourceBtn">Apply Now!</Link>
        </div>
    )
}


export default ResourcesCard;