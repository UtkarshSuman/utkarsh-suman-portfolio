import React, { useState } from "react";
import "./DownloadCVButton.css";

const DownloadCVButton = ({ cvUrl = "/your-cv.pdf", fileName = "MyCV.pdf" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleDownload = () => {
    if (isLoading || isDone) return;

    setIsLoading(true);

    // Simulate download initiation delay (remove timeout in real use)
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsLoading(false);
      setIsDone(true);

      // Reset after 2.5s
      setTimeout(() => setIsDone(false), 2500);
    }, 800);
  };

  return (
    <button
      className={`cv-btn ${isLoading ? "cv-btn--loading" : ""} ${isDone ? "cv-btn--done" : ""}`}
      onClick={handleDownload}
      aria-label="Download CV"
    >
      {/* Animated background layer */}
      <span className="cv-btn__bg" />

      {/* Icon area */}
      <span className="cv-btn__icon-wrap">
        {!isLoading && !isDone && (
          <svg className="cv-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        )}

        {isLoading && (
          <svg className="cv-btn__spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="9" strokeWidth={2} strokeDasharray="56" strokeDashoffset="20" />
          </svg>
        )}

        {isDone && (
          <svg className="cv-btn__check" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>

      {/* Label */}
      <span className="cv-btn__label">
        {isLoading ? "Preparing..." : isDone ? "Got it!" : "Download CV"}
      </span>

      {/* Decorative corner accent */}
      <span className="cv-btn__corner cv-btn__corner--tl" />
      <span className="cv-btn__corner cv-btn__corner--br" />
    </button>
  );
};

export default DownloadCVButton;