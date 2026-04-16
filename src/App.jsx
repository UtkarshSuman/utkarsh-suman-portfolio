import React, { useState, useEffect } from "react";
import "./index.css";
import "./components/sections/InfoCards/cards.css"

import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Projects from "./components/sections/Projects/Projects";
import Experience from "./components/sections/Experience/Experience";
import { codingProfiles } from "./data/portfolioData";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";
import "./components/sections/InfoCards/cards.css"
import ProjectCards from "./components/sections/ProjectsCard/ProjectCard";
import CodingProfiles from "./components/sections/CodingProfiles/CodingProfile";
import WorkExperience from "./components/sections/Experience/Workexperience";



function App() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "projects",
        "experience",
        "coding",
        "contact",
      ];

      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
  <div className="app">

    {/*GLOBAL BACKGROUND */}
    <div className="bg-dots"></div>
    <div className="bg-blob bg-blob-l"></div>
    <div className="bg-blob bg-blob-r"></div>

    <Navbar activeSection={activeSection} />
    <Hero />
    <About />
    <ProjectCards />
         
    <WorkExperience />
    <CodingProfiles/>
   
    <Contact/>
   
    <Footer />
  </div>
  );
}

export default App;

