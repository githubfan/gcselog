"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/navigation/navbar"
import Footer from "../components/footer/footer";
import HomepageCard from "../components/cards/homepage-card";
import ResourcesCard from "../components/cards/resources-card";
import styles from "../globals.css"
import SubjectCards from "../components/subject_cards/subject_card";
import {useEffect, useState} from "react";

export default function Subjects(){
    // Handing all searching functionality here
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
  
    // Debounce the search so it only updates after typing stops for 300ms
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedQuery(query), 300);
      return () => clearTimeout(handler);
    }, [query]);
    return (
        <div>
        <Navbar />
        <header className="homepage-header subject-header">
            <h1 className="header-title">subject resources</h1>
            <p className="header-desc">resources from across the country, collated especially for you.</p>
        </header>
        <input type="text" placeholder="Search for resources..." className="searchBox" value={query} onChange={(e) => setQuery(e.target.value)} />
        <SubjectCards query={debouncedQuery}/>
        <Footer />
        </div>


   )
}