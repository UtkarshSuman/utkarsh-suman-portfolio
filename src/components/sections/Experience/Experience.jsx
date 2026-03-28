import { useState, useEffect } from "react";
import  experiences  from "./Experiencedata";

// ─── Inline styles / CSS-in-JS approach for portability ───────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .we-root {
    --bg: #0d0f1a;
    --surface: #12152a;
    --card: #171b2e;
    --border: rgba(255,255,255,0.07);
    --accent: #7c6aff;
    --accent2: #a78bfa;
    --dot: #6b7280;
    --dot-active: #7c6aff;
    --text: #e2e8f0;
    --muted: #94a3b8;
    --date: rgba(255,255,255,0.18);
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    padding: 0;
  }

  /* NAV */
  .we-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    background: rgba(13,15,26,0.85);
    backdrop-filter: blur(12px);
    z-index: 100;
  }
  .we-nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.01em;
  }
  .we-avatar-circle {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 800; color: #fff;
    overflow: hidden;
    flex-shrink: 0;
  }
  .we-avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
  .we-nav-links {
    display: flex; gap: 36px;
    list-style: none;
    font-size: 0.9rem; color: var(--muted);
  }
  .we-nav-links li { cursor: pointer; transition: color .2s; }
  .we-nav-links li:hover { color: var(--text); }
  .we-nav-links li.active { color: var(--text); font-weight: 500; }
  .we-btn {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border: none; border-radius: 999px;
    padding: 10px 22px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500; font-size: 0.875rem;
    color: #fff; cursor: pointer;
    transition: opacity .2s, transform .15s;
  }
  .we-btn:hover { opacity: .88; transform: translateY(-1px); }

  /* HERO */
  .we-hero {
    text-align: center;
    padding: 72px 24px 48px;
    position: relative;
    overflow: hidden;
  }
  .we-hero::before {
    content: '';
    position: absolute;
    top: -80px; left: 50%;
    transform: translateX(-50%);
    width: 600px; height: 300px;
    background: radial-gradient(ellipse, rgba(124,106,255,0.18) 0%, transparent 70%);
    pointer-events: none;
  }
  .we-hero-photo {
    width: 80px; height: 80px;
    border-radius: 50%;
    margin: 0 auto 20px;
    border: 2px solid var(--accent);
    overflow: hidden;
    background: var(--surface);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.5rem; font-family: 'Syne', sans-serif; font-weight: 800;
  }
  .we-hero-photo img { width: 100%; height: 100%; object-fit: cover; }
  .we-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff 30%, var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
  }
  .we-hero-tagline {
    font-size: 1.05rem;
    color: var(--muted);
    max-width: 480px;
    margin: 0 auto 10px;
    line-height: 1.6;
  }
  .we-hero-desc {
    font-size: 0.9rem;
    color: rgba(148,163,184,0.7);
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* SECTION HEADING */
  .we-section-label {
    text-align: center;
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 700;
    margin: 48px 0 0;
    letter-spacing: -0.01em;
  }

  /* TIMELINE */
  .we-timeline {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 24px 80px;
    position: relative;
  }
  .we-timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 40px; bottom: 40px;
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--border) 10%, var(--border) 90%, transparent);
    transform: translateX(-50%);
  }

  /* ENTRY */
  .we-entry {
    display: grid;
    grid-template-columns: 1fr 40px 1fr;
    gap: 0 0;
    margin-bottom: 56px;
    align-items: start;
    opacity: 0;
    transform: translateY(24px);
    animation: fadeUp .5s ease forwards;
  }
  .we-entry:nth-child(1) { animation-delay: .1s; }
  .we-entry:nth-child(2) { animation-delay: .25s; }
  .we-entry:nth-child(3) { animation-delay: .4s; }
  .we-entry:nth-child(4) { animation-delay: .55s; }
  .we-entry:nth-child(5) { animation-delay: .7s; }

  @keyframes fadeUp {
    to { opacity: 1; transform: none; }
  }

  /* Even entries: date left, card right */
  .we-entry-date {
    text-align: right;
    padding-right: 36px;
    padding-top: 28px;
  }
  .we-entry:nth-child(even) .we-entry-date {
    order: 3;
    text-align: left;
    padding-right: 0;
    padding-left: 36px;
  }
  .we-entry:nth-child(even) .we-entry-dot { order: 2; }
  .we-entry:nth-child(even) .we-entry-card { order: 1; }

  .we-date-text {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1rem, 2vw, 1.4rem);
    font-weight: 700;
    color: var(--date);
    line-height: 1.2;
  }

  /* DOT */
  .we-entry-dot {
    display: flex;
    justify-content: center;
    padding-top: 34px;
    position: relative;
  }
  .we-dot-inner {
    width: 12px; height: 12px;
    border-radius: 50%;
    background: var(--surface);
    border: 2px solid var(--accent);
    box-shadow: 0 0 12px rgba(124,106,255,0.4);
    transition: transform .3s;
    cursor: default;
  }
  .we-entry:hover .we-dot-inner {
    transform: scale(1.4);
    box-shadow: 0 0 20px rgba(124,106,255,0.6);
  }

  /* CARD */
  .we-entry-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 24px;
    transition: border-color .25s, transform .25s, box-shadow .25s;
  }
  .we-entry-card:hover {
    border-color: rgba(124,106,255,0.35);
    transform: translateY(-3px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  }
  .we-card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;
  }
  .we-logo {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    font-weight: 700; font-size: 1rem;
    color: var(--accent2);
    font-family: 'Syne', sans-serif;
  }
  .we-logo img { width: 65%; height: 65%; object-fit: contain; }
  .we-card-title {
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.3;
  }
  .we-card-company {
    font-size: 0.8rem;
    color: var(--muted);
    margin-top: 2px;
  }
  .we-card-desc {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.7;
  }

  /* MOBILE */
  @media (max-width: 640px) {
    .we-timeline::before { left: 20px; }
    .we-entry { grid-template-columns: 40px 1fr; }
    .we-entry-date { display: none; }
    .we-entry-dot { order: 1 !important; padding-top: 24px; }
    .we-entry-card { order: 2 !important; }
    .we-entry:nth-child(even) .we-entry-card { order: 2 !important; }
    .we-nav { padding: 16px 20px; }
    .we-nav-links { display: none; }
  }
`;

// ─── Logo component ────────────────────────────────────────────────────────────
function CompanyLogo({ logo, fallback }) {
  const [err, setErr] = useState(false);
  return (
    <div className="we-logo">
      {logo && !err ? (
        <img src={logo} alt={fallback} onError={() => setErr(true)} />
      ) : (
        fallback
      )}
    </div>
  );
}

// ─── TimelineEntry ─────────────────────────────────────────────────────────────
function TimelineEntry({ exp }) {
  return (
    <div className="we-entry">
      <div className="we-entry-date">
        <div className="we-date-text">
          {exp.startDate} –<br />{exp.endDate}
        </div>
      </div>
      <div className="we-entry-dot">
        <div className="we-dot-inner" />
      </div>
      <div className="we-entry-card">
        <div className="we-card-header">
          <CompanyLogo logo={exp.logo} fallback={exp.logoFallback} />
          <div>
            <div className="we-card-title">{exp.title} — {exp.company}</div>
            <div className="we-card-company">{exp.startDate} · {exp.endDate}</div>
          </div>
        </div>
        <p className="we-card-desc">{exp.description}</p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function WorkExperience() {
  const [imgErr, setImgErr] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="we-root">

      {/* TIMELINE SECTION */}
      <h2 className="we-section-label">Work Experience</h2>
      <div className="we-timeline">
        {experiences.map((exp) => (
          <TimelineEntry key={exp.id} exp={exp} />
        ))}
      </div>
    </div>
  );
}