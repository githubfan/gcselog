'use client'

import { useState } from "react";
import Link from "next/link";
import "./navbar-styling.css"
import Image from "next/image";
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navigation">
            <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" />

            <div className={`menu-items ${menuOpen ? "active" : ""}`}>
                <Link className="link" href="/subjects" onClick={() => setMenuOpen(false)}>
                    Browse Subjects
                </Link>
                <Link className="link" href="/" onClick={() => setMenuOpen(false)}>
                    Submit Resources
                </Link>
                <Link className="link" href="/" onClick={() => setMenuOpen(false)}>
                    Blog
                </Link>
                <Link className="link" href="/" onClick={() => setMenuOpen(false)}>
                    Other Opportunities
                </Link>
                <button className="turqBtn" onClick={() => setMenuOpen(false)}>Access it Now!</button>
            </div>

            <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </nav>

    )
}

export default Navbar;