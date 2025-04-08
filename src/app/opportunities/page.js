"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navigation/navbar"
import Footer from "../components/footer/footer";
import styles from "../globals.css"

export default function Blog(){
    return (
        <div>
        <Navbar />
        <header className="homepage-header ">
            <h1 className="header-title">other opportunities</h1>
            <p className="header-desc">Coming Soon!</p>
        </header>
        <Footer />
        </div>


   )
}