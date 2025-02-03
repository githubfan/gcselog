import Image from "next/image";
import styles from "./globals.css";
import Navbar from "./components/navigation/navbar"
export default function Home() {
  return (
    <div className="main-div">

      <Navbar />
    <header className="homepage-header">
        <h1 className="header-title">Built by Students, for Students</h1>
        <p className="header-desc">A collaborative resource created by students, for students, across the country. By promoting open-source materials, we aim to provide students from all backgrounds with the tools they need to achieve their highest potential.</p>
      </header>
      </div>  
  );
}
