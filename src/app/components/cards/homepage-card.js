import Link from "next/link";
import "./homepage-styling.css"
import Image from "next/image";

function HomepageCard(props) {
    return (
        <div className={props.color}>
            <h2 className="card-title">{props.subject}</h2>
            <p>Current Number of Resources: {props.resources}</p>
            <h3>Resource Content: </h3>
            <ul>
                <li>Notes</li>
                <li>Flashcards</li>
                <li>Past Papers</li>
            </ul>
            <br></br>
            <br></br>
            <br></br>
            <Link href={`${props.buttonLink}`} className="turqBtn">
            Access Now
            </Link>
        </div>
    )
}


export default HomepageCard;