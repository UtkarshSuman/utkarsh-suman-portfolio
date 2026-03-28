import React, { useState, useEffect } from "react";

const roles = [
  { title: "Software Developer", color: "#22c55e" },
  { title: "Full Stack Developer", color: "#3b82f6" },
  { title: "Backend Developer", color: "#a855f7" },
  { title: "AI/ML Engineer", color: "#ec4899" },
  { title: "Deep Learning Expert", color: "#f59e0b" },
  { title: "Web Developer", color: "#06b6d4" },
];

const RotatingRoleBadge = () => {
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
    <>
      <style>{`
        .role-badge-wrapper {
          display: flex;
          justify-content: center;
          padding: 0.3rem;
          margin-bottom: 2rem;
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 7px 18px;
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(226, 232, 240, 0.9);
          transition: all 0.3s ease;
        }

        .role-badge:hover {
          transform: translateY(-2px);
        }

        .role-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        .role-text-container {
          position: relative;
          height: 24px;
          overflow: hidden;
          margin-top: 4.6px;
        }

        .role-text {
          display: inline-block;
          white-space: nowrap;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .slide-out {
          transform: translateY(-20px);
          opacity: 0;
        }

        .slide-in {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

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
    </>
  );
};

export default RotatingRoleBadge;