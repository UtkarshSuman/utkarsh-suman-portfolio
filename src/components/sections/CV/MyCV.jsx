import { useState } from "react";
import "./MyCV.css";

/* ── Config — edit these to match your details ────────────
   Replace CV_FILE_PATH with the actual path to your CV PDF,
   e.g. "/assets/John_Doe_CV.pdf" or a public URL.
────────────────────────────────────────────────────────── */
const CONFIG = {
  name: "Your",
  nameBold: "Name",
  role: "Full-Stack Developer  ·  UI/UX Enthusiast  ·  Open to opportunities",
  cvFilePath: "/assets/your-cv.pdf",      // ← change this
  cvFileName: "YourName_CV_2025.pdf",     // ← downloaded file name
  stats: [
    { value: "3+", label: "Years exp." },
    { value: "20+", label: "Projects" },
    { value: "∞",  label: "Coffee" },
  ],
};

/* ── Arrow Down Icon ────────────────────────────────────── */
function ArrowDown({ downloaded }) {
  if (downloaded) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="#86ef4c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v10M6 10l4 4 4-4" stroke="#06080d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16h12" stroke="#06080d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Main Component ─────────────────────────────────────── */
export default function MyCV() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    if (downloaded) return;
    setDownloaded(true);
    // reset the button after 4s so it can be used again
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="cv-page">
      <div className="cv-card">

        {/* Tag */}
        <div className="cv-tag">
          <span className="cv-tag-dot" />
          Résumé · CV
        </div>

        {/* Name */}
        <h1 className="cv-name">
          {CONFIG.name}
          <em>{CONFIG.nameBold}</em>
        </h1>

        <p className="cv-role">{CONFIG.role}</p>

        {/* Divider */}
        <div className="cv-divider">
          <div className="cv-divider-line" />
          <span className="cv-divider-text">click to download</span>
          <div className="cv-divider-line" />
        </div>

        {/* Download Button */}
        <a
          href={CONFIG.cvFilePath}
          download={CONFIG.cvFileName}
          className={`cv-btn${downloaded ? " downloaded" : ""}`}
          onClick={handleDownload}
          aria-label="Download CV"
        >
          <div className="cv-btn-left">
            <span className="cv-btn-label">
              {downloaded ? "Downloaded!" : "Download"}
            </span>
            <span className="cv-btn-text">
              {downloaded ? "Check your downloads ✓" : "Get My CV  →  PDF"}
            </span>
          </div>
          <div className="cv-btn-icon">
            <ArrowDown downloaded={downloaded} />
          </div>
        </a>

        {/* Hint */}
        <p className="cv-hint">
          <span className="cv-hint-icon">📄</span>
          PDF · Updated 2025 · {CONFIG.cvFileName}
        </p>

        {/* Stats */}
        <div className="cv-stats">
          {CONFIG.stats.map((s) => (
            <div className="cv-stat" key={s.label}>
              <div className="cv-stat-value">{s.value}</div>
              <div className="cv-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}