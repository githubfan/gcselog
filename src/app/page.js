import Link from "next/link";
import Image from "next/image";
import styles from "./globals.css";
import Navbar from "./components/navigation/navbar"
import HomepageCard from "./components/cards/homepage-card";
import ResourcesCard from "./components/cards/resources-card";

export default function Home() {
  return (
    <div className="main-div">
      <Navbar />
      <header className="homepage-header">
        <h1 className="header-title">Built by Students, for Students</h1>
        <p className="header-desc">A collaborative resource created by students, for students, across the country. By promoting open-source materials, we aim to provide students from all backgrounds with the tools they need to achieve their highest potential.</p>
        <div className="btnContainer">
          <button className="turqBtn">Find out More</button>
          <button className="purpBtn">Submit Resources</button>
        </div>
      </header>

      <section className="section about-us">
        <h2 className="section-title">So, what is GCSE Log?</h2>
        <p>GCSE Log is a project maintained by Abdul Rehman, and Josh Kalu. </p>
        <p>It was started from our experience as GCSE students - desperately searching for resources to help us achieve the high marks we craved. However, we often found that many resources were locked behind paywalls, or difficult to find - as they were spread across the internet. As a result of this, we made our own resources - which ended in neither of us dropping below a Grade 8 at GCSE. </p>
        <p>As A-Level students, many of these resources sit idly on computers - unused, and unneeded. So in response, we’ve decided to create a platform to share these. The future students of the world will experience the same thing we went through - and we’d love to make it easier for them to access items to enrich their studying. </p>
        <p>By joining our mission, you have the chance to positively impact thousands of students across the country. The resources you've meticulously created can find a new purpose. Additionally, you can showcase this experience as volunteering for a non-profit organization on university or job applications. You will also gain access to a network of contributors, many of whom are high achieving students. It's a meaningful way to help others while advancing your own goals.</p>
        <p>So, get involved today - and change the academic landscape for students just like you!</p>
        <h3>- Josh & Abdul</h3>
      </section>

      <section className="section">
        <h2 className="section-title subject-title">Featured Subjects</h2>
        <div className="subj-card-container">
          <HomepageCard color="subject-card bio-grad" subject="Biology" buttonLink="https://google.com" resources="534" />
          <HomepageCard color="subject-card chem-grad" subject="Chemistry" resources="283" />
          <HomepageCard color="subject-card phys-grad" subject="Physics" resources="125" />
          <HomepageCard color="subject-card maths-grad" subject="Maths" resources="56" />
        </div>
        <Link href="" className="longBtn">
            Access All Subjects Now!
            </Link>
        </section>

        <section className="section">
          <h2 className="section-title subject-title">Featured Opportunities</h2>
          <br></br>
          <ResourcesCard resourceTitle="McLaren Work Experience" date="3rd May 2025"/>
          <ResourcesCard resourceTitle="Cambridge Summer School" date="5th October 2025"/>
          <ResourcesCard resourceTitle="Imperial Work Experience" date="22nd April 2025"/>
          <ResourcesCard resourceTitle="UCL Outreach Event" date="13th June 2025"/>
          <Link href="" className="longBtn">
            Access All Resources Now!
            </Link>
        </section>

        <section className="section subSec">
        <h2 className="section-title subject-title">Submit a Resource</h2>
        <p>Do you have unused flashcards lying about, or know of a program you think will benefit the GCSE Log community? Submit it to be added to the collection! </p>
        <br></br>
        <Link href="" className="purpBtn subResBtn">Submit a Resource</Link>
        </section>

        <footer className="homepage-footer">
        <img className="logo" src="GCSE Log Logo.png" alt="GCSE Log Logo" />
        <p>Built with ❤️ by Josh Kalu & Abdul Rehman  </p>
        </footer>
    </div>
  );
}
