import "./footer-styling.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";


// Add Linkedin, Instagram & Tiktok Icons
const Footer = () => {
    return (
        <footer className="homepage-footer">
        <div className="img-container">
        <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" />
        </div>
        <div className="socials">
            <Link href="https://www.linkedin.com/company/gcse-log/" target="_blank" rel="noopener noreferrer">  
            < FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </Link>
            <Link href="https://www.instagram.com/gcselog/" target="_blank" rel="noopener noreferrer">
            < FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </Link>
            <Link href="https://www.tiktok.com/@gcselog" target="_blank" rel="noopener noreferrer">
            < FontAwesomeIcon icon={faTiktok} className="social-icon" />
            </Link>
        </div>
        <p>Built with ❤️ by Josh Kalu & Abdul Rehman  </p>
        </footer>
    )
}

export default Footer