import Link from "next/link";
import "./navbar-styling.css"
import Image from "next/image";
const Navbar = () => {
    return (
        <nav className="navigation">
            {/* <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" /> */}
            <h1>GCSE Log</h1>
            <div className="menu-items">
                <Link className="link" href="/">
                    Browse Subjects
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
            <button className="turqBtn">Access it Now!</button>
            </div>
        </nav>

    )
}

export default Navbar;