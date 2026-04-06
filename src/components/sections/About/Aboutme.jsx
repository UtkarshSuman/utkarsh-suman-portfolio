import React, { useEffect, useRef } from "react";
import "./AboutMe.css";

export default function AboutMe() {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-section" ref={cardRef}>
      <div className="about-card">
        {/* Label */}
        <span className="about-label">ABOUT ME</span>

        {/* Headline */}
        <h2 className="about-headline">
          Crafting the future<br />of the web.
        </h2>

        {/* Body */}
        <p className="about-body">
          I'm a full-stack developer obsessed with performance and visual harmony.
          My approach combines the rigor of modern frameworks with a deep
          understanding of atmospheric design systems. I don't just write code;
          I engineer constellations of interactive data.
        </p>

        {/* Stats row */}
        <div className="about-stats">
          <div className="stat">
            <span className="stat-number">5+</span>
            <span className="stat-label">YEARS EXP.</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">40+</span>
            <span className="stat-label">PROJECTS</span>
          </div>
        </div>

        {/* Laptop image */}
        <div className="about-image-wrapper">
          <div className="about-image-glow" />
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
            alt="Code on laptop"
            className="about-image"
          />
        </div>
      </div>
    </section>
  );
}