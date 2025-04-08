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
        <Link href="/" className="logo-link" onClick={() => setMenuOpen(false)}>
            <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" />
            </Link>
            <div className={`menu-items ${menuOpen ? "active" : ""}`}>
                <Link className="link" href="/subjects" onClick={() => setMenuOpen(false)}>
                    Browse Subjects
                </Link>
                <Link className="link" href="https://forms.gle/VMnnSfxGhduHmJaB9" onClick={() => setMenuOpen(false)} target="_blank" rel="noopener noreferrer">
                    Submit Resources
                </Link>
                <Link className="link" href="/blog" onClick={() => setMenuOpen(false)}>
                    Blog
                </Link>
                <Link className="link" href="/opportunities" onClick={() => setMenuOpen(false)}>
                    Other Opportunities
                </Link>
                <Link className="turqBtn" href="/subjects" onClick={() => setMenuOpen(false)}>Access it Now!</Link>
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