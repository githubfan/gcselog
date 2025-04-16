"use client";
import Link from "next/link";
import Image from "next/image";

// Importing the global CSS file
import styles from "./globals.css";

// Import all the components we need
import Navbar from "./components/navigation/navbar"
import Footer from "./components/footer/footer";
import SubjectCards from "./components/subject_cards/subject_card";

// Not used atm, will be implemented when resources are up and running 
import ResourcesCard from "./components/cards/resources-card";
import {useEffect, useState} from "react";

// import font awesome linkedin icon
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons



export default function Home() {


  return (
    <div className="main-div">
      <Navbar />
      <header className="homepage-header">
        <h1 className="header-title">Built by <span className="turqText">Students</span>, for <span className="purpText">Students</span></h1>
        <p className="header-desc">A collaborative resource created by students, for students, across the country. By promoting open-source materials, we aim to provide students from all backgrounds with the tools they need to achieve their highest potential.</p>
        <div className="btnContainer">
          <Link className="purpBtn" href="/subjects">Access Resources!</Link>
          <Link className="turqBtn" href="https://forms.gle/VMnnSfxGhduHmJaB9"  target="_blank" rel="noopener noreferrer">Submit Resources</Link>

        </div>
      </header>

      <section className="section featured-resources">
        <h2 className="section-title subject-title">Featured Resources</h2>
        
        <SubjectCards query="" limit={3} />  
        <Link href="/subjects" className="longBtn">
            Access All Subjects Now!
            </Link>
        </section>

      <section className="section about-us">
        <h2 className="section-title" id="about-us">So, what is GCSE Log?</h2>
        <p className="section-text">GCSE Log is a project maintained by <Link href="https://www.linkedin.com/in/abdul-rehman-a4b927237" target="_blank" rel="noopener noreferrer" className="linkedinLink">Abdul Rehman <FontAwesomeIcon icon={faLink} /> </Link> and <Link href="https://www.linkedin.com/in/joshuakalu/" target="_blank" rel="noopener noreferrer" className="linkedinLink">Josh Kalu <FontAwesomeIcon icon={faLink} /> </Link>.</p>
        <p className="section-text">It was started from our experience as GCSE students - desperately searching for resources to help us achieve the high marks we craved. However, we often found that many resources were locked behind paywalls, or difficult to find - as they were spread across the internet. As a result of this, we made our own resources - which ended in neither of us dropping below a Grade 8 at GCSE. </p>
        <p className="section-text">As A-Level students, many of these resources sit idly on computers - unused, and unneeded. So in response, we’ve decided to create a platform to share these. The future students of the world will experience the same thing we went through - and we’d love to make it easier for them to access items to enrich their studying. </p>
        <p className="section-text">By joining our mission, you have the chance to positively impact thousands of students across the country. The resources you've meticulously created can find a new purpose. Additionally, you can showcase this experience as volunteering for a non-profit organization on university or job applications. You will also gain access to a network of contributors, many of whom are high achieving students. It's a meaningful way to help others while advancing your own goals.</p>
        <p className="section-text">So, get involved today - and change the academic landscape for students just like you!</p>
        <h3 className="aboutusBold section-text">- Josh & Abdul</h3>
      </section>

    

        <section className=" featured-opportunities">
          <h2 className="section-title subject-title">Featured Opportunities</h2>
          <h3 className="comingSoon">Coming Soon!</h3>
          <br></br>
          <p className="csText">We are currently working on a new section of the website to provide students with opportunities to further their education. This will include work experience, summer schools, and other programs that can help students achieve their goals.</p>
          {/* <ResourcesCard resourceTitle="McLaren Work Experience" date="3rd May 2025"/>
          <ResourcesCard resourceTitle="Cambridge Summer School" date="5th October 2025"/>
          <ResourcesCard resourceTitle="Imperial Work Experience" date="22nd April 2025"/>
          <ResourcesCard resourceTitle="UCL Outreach Event" date="13th June 2025"/>
          <Link href="" className="longBtn">
            Access All Resources Now!
            </Link> */}
        </section>

        <section className="section subSec submit-resources">
        <h2 className="section-title subject-title">Submit a Resource</h2>
        <p className="section-text">Do you have unused flashcards lying about, or know of a program you think will benefit the GCSE Log community? Submit it to be added to the collection! </p>
        <br></br>
        <Link href="https://forms.gle/VMnnSfxGhduHmJaB9" className="purpBtn subResBtn">Submit a Resource</Link>
        </section>

        <Footer/>
    </div>
  );
}
