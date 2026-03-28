import { useState } from "react";

const GitHubButton = ({ username = "yourusername" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&display=swap');

        .github-btn-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
        }

        .github-btn-outer {
          position: relative;
          padding: 2px;
          border-radius: 999px;
          background: transparent;
        }

        .github-btn-outer::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 999px;
          background: conic-gradient(
            from var(--angle, 0deg),
            transparent 0deg,
            transparent 60deg,
            #00e5ff 80deg,
            #7b61ff 100deg,
            #00e5ff 120deg,
            transparent 140deg,
            transparent 360deg
          );
          animation: revolve 2.5s linear infinite;
          z-index: 0;
        }

        .github-btn-outer::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 999px;
          background: #060b18;
          z-index: 1;
        }

        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes revolve {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }

        .github-btn-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 999px;
          background: #060b18;
          color: #fff;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.3s ease, color 0.3s ease;
          border: none;
          outline: none;
          user-select: none;
        }

        .github-btn-inner:hover {
          background: #0d1526;
          color: #00e5ff;
        }

        .github-icon {
          width: 20px;
          height: 20px;
          fill: currentColor;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .github-btn-inner:hover .github-icon {
          transform: rotate(360deg);
        }

        .glow-pulse {
          position: absolute;
          inset: -8px;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(0,229,255,0.08) 0%, transparent 70%);
          z-index: 0;
          animation: glowPulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="github-btn-wrapper">
        <div className="github-btn-outer">
          <div className="glow-pulse" />
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn-inner"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg className="github-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
            </svg>
            Check my GitHub
          </a>
        </div>
      </div>
    </>
  );
};

export default GitHubButton;