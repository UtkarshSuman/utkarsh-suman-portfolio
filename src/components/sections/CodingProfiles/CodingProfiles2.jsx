import React, {
  useEffect, useRef, useState, useCallback
} from "react";
import codingProfilesData from "./Codingprofilesdata";
import "./CodingProfiles2.css";

/* ─────────────────────────────────────────
   SPLIT-REVEAL CARD
   Left side  → screenshot
   Right side → platform logo
   Vertical drag handle controls the split
───────────────────────────────────────── */
function SplitCard({ profile, index }) {
  const [sliderPct, setSliderPct] = useState(72); // start showing mostly screenshot
  const [dragging, setDragging] = useState(false);
  const [hintDone, setHintDone] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const cardRef = useRef(null);
  const isDragging = useRef(false);

  /* Scroll-triggered entrance */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setCardVisible(true); },
      { threshold: 0.15 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  // /* Hint animation: slide left then back after card enters */
  // useEffect(() => {
  //   if (!cardVisible || hintDone) return;
  //   const t1 = setTimeout(() => setSliderPct(30), 600);
  //   const t2 = setTimeout(() => setSliderPct(72), 1200);
  //   const t3 = setTimeout(() => setHintDone(true), 1300);
  //   return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  // }, [cardVisible, hintDone]);

  /* ── Pointer helpers ── */
  const getPct = useCallback((clientX) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return sliderPct;
    return Math.min(90, Math.max(10, ((clientX - rect.left) / rect.width) * 100));
  }, [sliderPct]);

  const onPointerDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    setDragging(true);
    cardRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
   
    setSliderPct(getPct(e.clientX));
  };

  const onPointerUp = () => {
    isDragging.current = false;
    setDragging(false);
  };

  const { accentColor } = profile;

  return (
    <div
      className={`sc-wrapper ${cardVisible ? "sc-visible" : ""}`}
      style={{ "--delay": `${index * 0.14}s`, "--accent": accentColor }}
    >
      <div
        className={`sc-card ${dragging ? "sc-dragging" : ""}`}
        ref={cardRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >

        {/* ── RIGHT SIDE: logo background ── */}
        <div className="sc-logo-side">
          <div className="sc-logo-glow"  />
          <img
            src={profile.logoUrl}
            alt={`${profile.platform} logo`}
            className="sc-logo-img"
            draggable={false}
          />
        </div>

        {/* ── LEFT SIDE: screenshot (clips to sliderPct) ── */}
        <div
          className="sc-screenshot-side"
          style={{ clipPath: `inset(0 0 0 ${sliderPct}%)` }}
        >
          <img
            src={profile.screenshotUrl}
            alt={`${profile.platform} screenshot`}
            className="sc-screenshot-img"
            draggable={false}
          />
          {/* Dark vignette on screenshot */}
          <div className="sc-screenshot-vignette" />

          {/* Stat chips overlaid on screenshot */}
          <div className="sc-chips">
            {profile.stats?.map((s) => (
              <div key={s.label} className="sc-chip" style={{ borderColor: `${accentColor}55` }}>
                <span className="sc-chip-val" style={{ color: accentColor }}>{s.value}</span>
                <span className="sc-chip-lbl">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── DRAG HANDLE ── */}
        <div
          className={`sc-handle ${dragging ? "sc-handle-active" : ""}`}
          style={{ left: `${sliderPct}%` }}
        >
          <div className="sc-handle-line" style={{ background: accentColor }} />
          <div className="sc-handle-knob" style={{ borderColor: accentColor, boxShadow: `0 0 16px ${accentColor}80, 0 0 4px ${accentColor}` }}>
            {/* Chevrons */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Drag hint label (fades after first hint) */}
        {!hintDone && cardVisible && (
          <div className="sc-hint">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="18 8 22 12 18 16"/>
              <polyline points="6 8 2 12 6 16"/>
            </svg>
            drag to reveal
          </div>
        )}
      </div>

      {/* ── CARD FOOTER ── */}
      <div className="sc-footer">
        <p className="sc-desc">{profile.description}</p>
        <a
          href={profile.link}
          target="_blank"
          rel="noopener noreferrer"
          className="sc-btn"
          style={{ "--btn-accent": accentColor }}
        >
          {profile.btnText}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION
───────────────────────────────────────── */
export default function CodingProfiles() {
  const { sectionTitle, profiles } = codingProfilesData;
  const [titleVis, setTitleVis] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVis(true); },
      { threshold: 0.5 }
    );
    if (titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  // Split title at "Coding" for the two-tone effect
  const titleParts = sectionTitle.split(/(Coding Profiles)/);

  return (
    <section id="coding" className="cp-section">
      <div className="cp-bg-dots" aria-hidden="true" />
      <div className="cp-blob cp-blob-l" aria-hidden="true" />
      <div className="cp-blob cp-blob-r" aria-hidden="true" />

      <div className="cp-container">
        {/* Title */}
        <h2
          className={`cp-title ${titleVis ? "cp-title-vis" : ""}`}
          ref={titleRef}
        >
          {titleParts.map((part, i) =>
            part === "Coding Profiles"
              ? <span key={i} className="cp-title-accent">{part}</span>
              : part
          )}
        </h2>

        {/* Cards */}
        <div className="cp-grid">
          {profiles.map((p, i) => (
            <SplitCard key={p.id} profile={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}