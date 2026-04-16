import React, { useState, useEffect } from "react";
import "./Badges.css";
import { FileText, Grid } from "lucide-react";
const roles = [
  { title: "Software Development", color: "#22c55e" },
  { title: "Full Stack Development", color: "#3b82f6" },
  { title: "Backend Development", color: "#a855f7" },
  // { title: "AI/ML Engineer", color: "#ec4899" },
  // { title: "Deep Learning ", color: "#f59e0b" },
  { title: "Web Development", color: "#06b6d4" },
];

const Badges = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setAnimate(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[currentRoleIndex];

  return (
  <div className="hero-actions">
    <a href="#projects" className="btn btn-outline">
      <span className="btn-border-base" />
      <Grid size={15} />
      View projects
    </a>

    <div className="role-badge-wrapper">
      <div className="role-badge">
        <div
          className="role-indicator"
          style={{
            background: currentRole.color,
            boxShadow: `0 0 10px ${currentRole.color}88`,
          }}
        />
        <div className="role-text-container">
          <span
            key={currentRoleIndex}
            className={`role-text ${animate ? "slide-out" : "slide-in"}`}
          >
            {currentRole.title}
          </span>
        </div>
      </div>
    </div>

    <a href="/pdf/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-solid">
      <FileText size={15} />
      View my resume
    </a>
  </div>
  );
};

export default Badges;