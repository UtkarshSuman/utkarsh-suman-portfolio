import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar1.css";

function Navbar({ activeSection }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [theme, setTheme]         = useState(() => localStorage.getItem("theme") || "dark");
  const innerRef                  = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  /* ── Apply theme to <html> so CSS vars cascade everywhere ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && innerRef.current) {
      const rect = innerRef.current.getBoundingClientRect();
      setDropdownStyle({ top: rect.bottom + 6, left: rect.left, width: rect.width });
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e) => {
      const dropdown = document.querySelector(".mobile-menu");
      if (
        innerRef.current && !innerRef.current.contains(e.target) &&
        dropdown && !dropdown.contains(e.target)
      ) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [menuOpen]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }
  };

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const sections = ["about", "projects", "experience", "coding", "contact"];

  const menuVariants = {
    closed: { opacity: 0, scaleY: 0.96, y: -4, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } },
    open:   { opacity: 1, scaleY: 1,    y: 0,  transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] } },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: (i) => ({ opacity: 1, x: 0, transition: { delay: 0.06 + i * 0.055, duration: 0.18 } }),
  };

  const isDark = theme === "dark";

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
      >
        <div className="navbar-inner" ref={innerRef}>

          {/* Brand */}
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

          {/* Desktop right-side actions */}
          <div className="nav-actions">
            {/* Theme toggle — desktop */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <a href="#contact" onClick={() => scrollTo("contact")} className="nav-book-call-btn">
              Book a call
              <ArrowUpRightIcon />
            </a>
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
            <motion.div
              className="menu-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="mobile-menu"
              style={{ position: "fixed", top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width, transformOrigin: "top center" }}
              variants={menuVariants} initial="closed" animate="open" exit="closed"
            >
              {/* Top row: status + CV + theme toggle */}
              <div className="mm-top-row">
                <div className="mm-status-badge">
                  <span className="mm-status-dot" />
                  Open to work
                </div>
                <div className="mm-top-right">
                  <a href="/cv.pdf" download className="mm-cv-btn">Download CV</a>
                  {/* Theme toggle — mobile */}
                  <button className="theme-toggle theme-toggle--sm" onClick={toggleTheme} aria-label="Toggle theme">
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </button>
                </div>
              </div>

              <div className="mm-divider" />

              <nav className="mm-links">
                {sections.map((item, i) => (
                  <motion.button
                    key={item} custom={i} variants={itemVariants} initial="closed" animate="open"
                    onClick={() => scrollTo(item)}
                    className={`mm-link ${activeSection === item ? "active" : ""}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.button>
                ))}
              </nav>

              <motion.div className="mm-cta"
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

/* ── Icon components ── */
function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1"  y1="12" x2="3"  y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/>
      <polyline points="7 7 17 7 17 17"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default Navbar;