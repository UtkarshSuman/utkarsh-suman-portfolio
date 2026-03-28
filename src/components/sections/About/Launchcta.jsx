import React, { useEffect, useRef } from "react";
import "./LaunchCTA.css";

export default function LaunchCTA() {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) cardRef.current?.classList.add("visible");
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cta-section" ref={cardRef}>
      <div className="cta-card">
        {/* Background glow blobs */}
        <div className="cta-blob cta-blob-1" aria-hidden="true" />
        <div className="cta-blob cta-blob-2" aria-hidden="true" />

        <div className="cta-content">
          <h2 className="cta-headline">
            Ready to launch a<br />project together?
          </h2>
          <p className="cta-body">
            Let's collaborate and create something that leaves a lasting
            impression in the digital sky.
          </p>
          <a href="#contact" className="cta-btn">
            Get In Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className="cta-arrow">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}