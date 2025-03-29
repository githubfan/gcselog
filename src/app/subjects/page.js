"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navigation/navbar"
import Footer from "../components/footer/footer";
import HomepageCard from "../components/cards/homepage-card";
import ResourcesCard from "../components/cards/resources-card";
import styles from "../globals.css"
import SubjectCards from "../components/subject_cards/subject_card";

export default function Subjects(){
    return (
        <div>
        <Navbar />
        <header className="homepage-header">
            <h1 className="header-title">subject resources</h1>
            <p className="header-desc">resources from across the country, collated especially for you.</p>
        </header>
        <SubjectCards />
        <Footer />
        </div>


   )
}