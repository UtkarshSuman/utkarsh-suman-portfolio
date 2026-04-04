import React, { useEffect, useRef } from "react";
import "./TechStack.css";

const techs = ["React", "Javascript", "PostgreSQL", "Express", "Node.js"];

export default function TechStack() {
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
    <section className="tech-section" ref={cardRef}>
      <div className="tech-card">
        {/* Icon + title */}
        <div className="tech-header">
          <div className="tech-icon-wrap">
            {/* CPU / stack icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
              <rect x="9" y="9" width="6" height="6"/>
              <line x1="9" y1="2" x2="9" y2="4"/>
              <line x1="15" y1="2" x2="15" y2="4"/>
              <line x1="9" y1="20" x2="9" y2="22"/>
              <line x1="15" y1="20" x2="15" y2="22"/>
              <line x1="2" y1="9" x2="4" y2="9"/>
              <line x1="2" y1="15" x2="4" y2="15"/>
              <line x1="20" y1="9" x2="22" y2="9"/>
              <line x1="20" y1="15" x2="22" y2="15"/>
            </svg>
          </div>
          <span className="tech-title">Tech Stack</span>
        </div>

        {/* Pills */}
        <div className="tech-pills">
          {techs.map((t, i) => (
            <span key={t} className="tech-pill" style={{ animationDelay: `${i * 0.07}s` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Footer note */}
        <p className="tech-note">
          Constantly expanding the orbital reach of my capabilities.
        </p>
      </div>
    </section>
  );
}