import Link from "next/link";
import "./navbar-styling.css"
import Image from "next/image";
const Navbar = () => {
    return (
        <nav className="navigation">
            <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" />
            <div className="menu-items">

                <Link className="link" href="/">
                    Subjects
                </Link>

                <Link className="link" href="/">
                    Submit Resources
                </Link>

                <Link className="link" href="/">
                    Blog
                </Link>

                <Link className="link" href="/">
                    Other Opportunities
                </Link>
            </div>
        </nav>

    )
}

export default Navbar;