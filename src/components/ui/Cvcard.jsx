import React, { useState, useRef, useEffect } from "react";
import "./CVCard.css";

/**
 * CVCard
 * Props:
 *   cvUrl      — path/URL to your PDF  e.g. "/Tushar_CV.pdf"
 *   name       — your name shown on the card
 *   role       — your role/title
 *   lastUpdated — e.g. "Jan 2025"
 */
export default function CVCard({
  cvUrl      = "/Utkarsh_CV.pdf",
  name       = "Utkarsh Suman",
  role       = "Full-Stack Developer",
  lastUpdated = "Jan 2025",
}) {
  const [downloading, setDownloading] = useState(false);
  const [downloadDone, setDownloadDone] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  /* 3-D tilt on mouse move */
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width  - 0.5) *  10;
    setTilt({ x, y });
  };

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    const a = document.createElement("a");
    a.href = cvUrl;
    a.download = `${name.replace(" ", "_")}_CV.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => {
      setDownloading(false);
      setDownloadDone(true);
      setTimeout(() => setDownloadDone(false), 2500);
    }, 1800);
  };

  const handleOpen = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`cvc-root ${hovered ? "cvc-hovered" : ""}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : "perspective(900px) rotateX(0) rotateY(0) translateY(0)",
      }}
    >
      {/* Animated corner glow */}
      <div className="cvc-glow-tl" aria-hidden="true" />
      <div className="cvc-glow-br" aria-hidden="true" />

      {/* ── Header row ── */}
      <div className="cvc-header">
        {/* PDF document icon */}
        <div className="cvc-icon-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <span className="cvc-header-label">Curriculum Vitae</span>

        {/* Live dot */}
        <span className="cvc-live-dot" aria-label="Available">
          <span className="cvc-dot-ring" />
        </span>
      </div>

      {/* ── Name block ── */}
      <div className="cvc-identity">
        <h3 className="cvc-name">{name}</h3>
        <p className="cvc-role">{role}</p>
      </div>

      {/* ── Mini stats row ── */}
      <div className="cvc-stats">
        <div className="cvc-stat">
          <span className="cvc-stat-val">PDF</span>
          <span className="cvc-stat-lbl">Format</span>
        </div>
        <div className="cvc-stat-sep" />
        <div className="cvc-stat">
          <span className="cvc-stat-val">2 pg</span>
          <span className="cvc-stat-lbl">Length</span>
        </div>
        <div className="cvc-stat-sep" />
        <div className="cvc-stat">
          <span className="cvc-stat-val">{lastUpdated}</span>
          <span className="cvc-stat-lbl">Updated</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="cvc-divider" />

      {/* ── Action buttons ── */}
      <div className="cvc-actions">
        {/* Download */}
        <button
          className={`cvc-btn cvc-btn-download ${downloading ? "cvc-btn-loading" : ""} ${downloadDone ? "cvc-btn-done" : ""}`}
          onClick={handleDownload}
          disabled={downloading}
        >
          <span className="cvc-btn-icon">
            {downloadDone ? (
              /* Checkmark */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : downloading ? (
              /* Spinner */
              <svg className="cvc-spin" width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              /* Download arrow */
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            )}
          </span>
          <span>{downloadDone ? "Downloaded!" : downloading ? "Saving…" : "Download CV"}</span>
        </button>

        {/* Open */}
        <button className="cvc-btn cvc-btn-open" onClick={handleOpen}>
          <span className="cvc-btn-icon">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </span>
          <span>Open CV</span>
        </button>
      </div>
    </div>
  );
}