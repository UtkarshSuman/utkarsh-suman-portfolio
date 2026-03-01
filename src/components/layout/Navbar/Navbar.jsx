import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Navbar.css";

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sections = ["about", "projects", "experience", "coding", "contact"];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      {sections.map((item) => (
        <div key={item} className="nav-item">
          <button
            onClick={() => scrollTo(item)}
            className={activeSection === item ? "active" : ""}
          >
            {item.toUpperCase()}
          </button>

          {activeSection === item && (
            <motion.div
              layoutId="activeIndicator"
              className="active-indicator"
            />
          )}
        </div>
      ))}
    </motion.nav>
  );
}

export default Navbar;

