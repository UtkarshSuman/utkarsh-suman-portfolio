import React, { useState, useEffect } from "react";
import "./index.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import About from "./components/sections/About/About";
import Projects from "./components/sections/Projects/Projects";
import Experience from "./components/sections/Experience/Experience";
import CodingProfiles from "./components/sections/CodingProfiles/CodingProfiles";
import { codingProfiles } from "./data/portfolioData";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";
import HeroCard from "./components/sections/InfoCards/HeroCard";
import CTAProjectCard from "./components/sections/InfoCards/CTAProjectCard";
import FutureProjectCard from "./components/sections/InfoCards/FutureProjectCard";
import "./components/sections/InfoCards/cards.css"
import TechStackCard from "./components/sections/TechStack/TechStackCard";
import MyCV from "./components/sections/CV/MyCV";

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
      <Navbar activeSection={activeSection} />
      <Hero />
      <About />
      <MyCV/>
      <div className="main-layout">
      <div className="left-column">
        
        <HeroCard />
        <CTAProjectCard />
      </div>

      <div className="right-column">
        <FutureProjectCard/>
      </div>
    </div>
      <Projects />
      <Experience />
      <TechStackCard/>
      <CodingProfiles profiles={codingProfiles} />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

