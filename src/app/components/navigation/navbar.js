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

                {/* <Link className="link" href="/">
                    Blog
                </Link> */}
                <Link className="link" href="/">
                    Other Opportunities
                </Link>
            
            </div>
                    {/* <h1>Test</h1> */}
            <button className="turqBtn">Get Access Now!</button>
        </nav>

    )
}

export default Navbar;