

import { useEffect, useRef, useState } from "react";
import { experiences } from "./Data";
import "./Workexperience.css";

/* ─────────────────────────────────────────────
   Hook — returns how far (0–100 %) the timeline
   line should be filled based on scroll position.
───────────────────────────────────────────────*/
function useTimelineFill(wrapRef) {
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = windowH * 0.5 - rect.top;
      const pct = Math.min(100, Math.max(0, (scrolled / rect.height) * 100));
      setFillPct(pct);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [wrapRef]);

  return fillPct;
}

/* ─────────────────────────────────────────────
   Vertical Timeline Line
   The ONLY scroll-driven element.
───────────────────────────────────────────────*/
function TimelineLine({ fillPct }) {
  return (
    <div className="wex-line-track">
      {/* Dim static rail */}
      <div className="wex-line-base" />

      {/* Colored fill — height driven by scroll */}
      <div
        className="wex-line-fill"
        style={{ height: `${fillPct}%` }}
      />

      {/* Glowing dot riding the fill tip */}
      <div
        className="wex-line-dot"
        style={{
          top: `${fillPct}%`,
          opacity: fillPct > 1 && fillPct < 99 ? 1 : 0,
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Milestone Dot
   Lights up (using per-company color) when the
   timeline line fill reaches this row.
───────────────────────────────────────────────*/
function MilestoneDot({ exp, wrapRef, rowRef }) {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const update = () => {
      const wrap = wrapRef.current;
      const row  = rowRef.current;
      if (!wrap || !row) return;

      const wrapRect = wrap.getBoundingClientRect();
      const rowRect  = row.getBoundingClientRect();
      const windowH  = window.innerHeight;

      const scrolled = windowH * 0.5 - wrapRect.top;
      const fillPct  = Math.min(100, Math.max(0, (scrolled / wrapRect.height) * 100));

      const dotOffsetPx = rowRect.top - wrapRect.top + rowRect.height / 2;
      const dotPct      = (dotOffsetPx / wrapRect.height) * 100;

      setLit(fillPct >= dotPct);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [wrapRef, rowRef]);

  return (
    <div
      className="wex-milestone-dot"
      style={{
        background:  lit ? exp.color : "#0a0a0f",
        borderColor: lit ? exp.color : "rgba(255,255,255,0.14)",
        boxShadow:   lit ? `0 0 0 5px ${exp.bg}, 0 0 20px ${exp.color}` : "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Date Badge — fully static, never moves
───────────────────────────────────────────────*/
function DateBadge({ exp, align }) {
  return (
    <div className={`wex-date-badge wex-date-badge--${align}`}>
      <span
        className="wex-date-range"
        style={{ color: exp.color }}
      >
        {exp.startDate} — {exp.endDate}
      </span>
      <span className="wex-date-dur">{exp.duration}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Experience Card — fully static, hover only
───────────────────────────────────────────────*/
function ExperienceCard({ exp }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="wex-card"
      style={{
        borderColor: hovered ? exp.accentBorder : "rgba(255,255,255,0.07)",
        background:  hovered ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.028)",
        boxShadow:   hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${exp.accentBorder}`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Per-company shimmer overlay */}
      <div
        className="wex-card-shimmer"
        style={{ background: `linear-gradient(135deg, ${exp.bg} 0%, transparent 60%)` }}
      />

      {/* Top row: logo + title + badge */}
      <div className="wex-card-top">
        <div
          className="wex-logo"
          style={{
            background: exp.bg,
            color:      exp.color,
            border:     `1px solid ${exp.accentBorder}`,
          }}
        >
          {exp.logo
            ? <img src={exp.logo} alt={exp.company} />
            : <span className="wex-logo-text">{exp.initials}</span>
          }
        </div>

        <div className="wex-card-meta">
          <div className="wex-company-name">{exp.company}</div>
          <div className="wex-role-title" style={{ color: exp.color }}>
            {exp.role}
          </div>
        </div>

        {exp.current && (
          <span className="wex-current-badge">
            <span className="wex-current-dot" />
            Current
          </span>
        )}
      </div>

      {/* Per-company accent divider */}
      <div
        className="wex-divider"
        style={{
          background: `linear-gradient(to right, ${exp.accentBorder}, transparent)`,
        }}
      />

      {/* Description */}
      <p className="wex-description">{exp.description}</p>

      {/* Skill tags */}
      <div className="wex-tags">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="wex-tag"
            style={{
              background: exp.bg,
              border:     `1px solid ${exp.accentBorder}`,
              color:      exp.color,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root Component
───────────────────────────────────────────────*/
export default function WorkExperience() {
  const wrapRef = useRef(null);
  const fillPct = useTimelineFill(wrapRef);

  // Pre-create row refs outside of .map() to respect Rules of Hooks
  const rowRefs = useRef(experiences.map(() => ({ current: null })));

  return (
    <section id="experience" className="wex-root">
      

      {/* ── Header ── */}
      <div className="wex-header">
        <span className="wex-header-label">Career Journey</span>
        <h2 className="wex-heading">
          Work <span className="wex-heading-accent">Experience</span>
        </h2>
        <p className="wex-subheading">
          A chronicle of companies, roles, and impact across my career.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div ref={wrapRef} className="wex-timeline-wrap">

        {/* The ONLY scroll-animated element */}
        <TimelineLine fillPct={fillPct} />

        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;

          if (!rowRefs.current[i]) rowRefs.current[i] = { current: null };
          const rowRef = rowRefs.current[i];

          return (
            <div
              key={exp.id}
              ref={(el) => { rowRef.current = el; }}
              className="wex-row"
            >
              {/* ── Left column ── */}
              <div className="wex-col">
                {isLeft ? (
                  <div className="wex-card-col wex-card-col--left">
                    <ExperienceCard exp={exp} />
                  </div>
                ) : (
                  <div className="wex-date-col wex-date-col--left">
                    <DateBadge exp={exp} align="right" />
                  </div>
                )}
              </div>

              {/* ── Centre milestone dot ── */}
              <div className="wex-center-col">
                <MilestoneDot exp={exp} wrapRef={wrapRef} rowRef={rowRef} />
              </div>

              {/* ── Right column ── */}
              <div className="wex-col">
                {isLeft ? (
                  <div className="wex-date-col wex-date-col--right">
                    <DateBadge exp={exp} align="left" />
                  </div>
                ) : (
                  <div className="wex-card-col wex-card-col--right">
                    <ExperienceCard exp={exp} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}