import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css";

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const innerRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Measure navbar-inner and position dropdown exactly below it
  useEffect(() => {
    if (menuOpen && innerRef.current) {
      const rect = innerRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [menuOpen]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      const dropdown = document.querySelector(".mobile-menu");
      if (
        innerRef.current && !innerRef.current.contains(e.target) &&
        dropdown && !dropdown.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const sections = ["about", "projects", "experience", "coding", "contact"];

  const menuVariants = {
    closed: {
      opacity: 0,
      scaleY: 0.96,
      y: -4,
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    open: {
      opacity: 1,
      scaleY: 1,
      y: 0,
      transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.06 + i * 0.055, duration: 0.18 },
    }),
  };

  return (
    <>
      {/* ── MAIN NAVBAR (desktop unchanged) ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="navbar-inner" ref={innerRef}>
          {/* Brand  */}
          <div className="navbar-brand" onClick={() => scrollTo("about")}>
            <div className="logo-icon">US</div>
            <span className="logo-name">Utkarsh</span>
          </div>

          {/* Desktop nav links */}
          <div className="nav-links">
          {sections.map((item) => (
            <div key={item} className="nav-item">
              <button
                onClick={() => scrollTo(item)}
                className={activeSection === item ? "active" : ""}
              >
                {item.toUpperCase()}
              </button>
              {activeSection === item && (
                <motion.div layoutId="activeIndicator" className="active-indicator" />
              )}
            </div>
          ))}
          </div>

          {/* Hamburger */}
          <div
            className={`hamburger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown card — positioned below navbar via JS rect */}
            <motion.div
              className="mobile-menu"
              style={{
                position: "fixed",
                top: dropdownStyle.top,
                left: dropdownStyle.left,
                width: dropdownStyle.width,
                transformOrigin: "top center",
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
        
              

              {/* Divider */}
              <div className="mm-divider" />

              {/* Nav links */}
              <nav className="mm-links">
                {sections.map((item, i) => (
                  <motion.button
                    key={item}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    onClick={() => scrollTo(item)}
                    className={`mm-link ${activeSection === item ? "active" : ""}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                className="mm-cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.36, duration: 0.2 } }}
              >
                {/* <button className="book-call-btn">Book a Call</button> */}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;