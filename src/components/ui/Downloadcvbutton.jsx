import React, { useState, useRef, useEffect } from "react";
import "./Downloadcvbutton.css";


export default function Downloadcvbutton({ cvUrl = "./pdf/resume.pdf" }) {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [ripple, setRipple]   = useState(false);
  const menuRef  = useRef(null);
  const btnRef   = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handle = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current  && !btnRef.current.contains(e.target)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  /* Close on Escape */
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    setOpen(false);

    /* Programmatic download */
    const a = document.createElement("a");
    a.href     = cvUrl;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    /* Reset download state after animation */
    setTimeout(() => setDownloading(false), 2200);
  };

  const handleOpen = () => {
    setOpen(false);
    window.open(cvUrl, "_blank", "noopener,noreferrer");
  };

  const triggerRipple = () => {
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <div className="cvb-root">
      {/* ── Main trigger button ── */}
      <button
        ref={btnRef}
        className={`cvb-trigger ${open ? "cvb-open" : ""} ${downloading ? "cvb-downloading" : ""}`}
        onClick={() => { triggerRipple(); setOpen((v) => !v); }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="CV options"
      >
        {/* Animated border gradient ring */}
        <span className="cvb-ring" aria-hidden="true" />

        {/* Ripple */}
        {ripple && <span className="cvb-ripple" aria-hidden="true" />}

        {/* Icon area */}
        <span className="cvb-icon-wrap" aria-hidden="true">
          {downloading ? (
            /* Progress download icon */
            <svg className="cvb-icon cvb-spin" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          ) : (
            <svg className="cvb-icon" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          )}
        </span>

        {/* Label */}
        <span className="cvb-label">
          {downloading ? "Downloading…" : "My CV"}
        </span>

        {/* Chevron */}
        <span className={`cvb-chevron ${open ? "cvb-chevron-up" : ""}`} aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </span>
      </button>

      {/* ── Dropdown menu ── */}
      <div
        ref={menuRef}
        className={`cvb-menu ${open ? "cvb-menu-open" : ""}`}
        role="menu"
        aria-label="CV actions"
      >
        {/* Download option */}
        <button
          className="cvb-option cvb-option-download"
          role="menuitem"
          onClick={handleDownload}
        >
          <span className="cvb-opt-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </span>
          <span className="cvb-opt-text">
            <span className="cvb-opt-title">Download CV</span>
            <span className="cvb-opt-sub">Save as PDF</span>
          </span>
          <span className="cvb-opt-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </button>

        <div className="cvb-divider" />

        {/* Open option */}
        <button
          className="cvb-option cvb-option-open"
          role="menuitem"
          onClick={handleOpen}
        >
          <span className="cvb-opt-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </span>
          <span className="cvb-opt-text">
            <span className="cvb-opt-title">Open CV</span>
            <span className="cvb-opt-sub">View in new tab</span>
          </span>
          <span className="cvb-opt-arrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}