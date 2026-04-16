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
import HeroCard from "./components/sections/InfoCards/HeroCard";
import CTAProjectCard from "./components/sections/InfoCards/CTAProjectCard";
import FutureProjectCard from "./components/sections/InfoCards/FutureProjectCard";
import "./components/sections/InfoCards/cards.css"
import TechStackCard from "./components/sections/TechStack/TechStackCard";
import MyCV from "./components/sections/CV/MyCV";
import Badges from "./components/ui/Badges";
import GitHubButton from "./components/ui/Githubbutton";
import LeftCard from "./components/sections/InfoCards/LeftCard";
import TopRightCard from "./components/sections/InfoCards/TopRightCard";
import BottomRightCard from "./components/sections/InfoCards/BottomRightCard";
import ProjectCards from "./components/sections/ProjectsCard/ProjectCard";
import CodingProfiles from "./components/sections/CodingProfiles/CodingProfile";
import WorkExperience from "./components/sections/Experience/Workexperience";
import DownloadCVButton from "./components/ui/Downloadcvbutton";
import CVCard from "./components/ui/Cvcard";
import HeroSection from "./components/sections/Hero/HeroSection";


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

