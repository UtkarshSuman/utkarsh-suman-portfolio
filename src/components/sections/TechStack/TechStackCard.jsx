import "./TechStackCard.css";
import { techStack } from "../../../data/portfolioData";

/* ── Single tech row with animated progress bar ─────────── */
function TechRow({ name, level, icon, color, rowIndex }) {
  return (
    <div className="tsc-tech">
      <div className="tsc-tech-meta">
        <span className="tsc-tech-icon">{icon}</span>
        <span className="tsc-tech-name">{name}</span>
        <span className="tsc-tech-pct">{level}%</span>
      </div>
      <div className="tsc-bar-track">
        <div
          className="tsc-bar-fill"
          style={{
            width: `${level}%`,
            "--delay": `${0.4 + rowIndex * 0.07}s`,
          }}
        />
      </div>
    </div>
  );
}

/* ── Category block ─────────────────────────────────────── */
function CategoryBlock({ category, icon, color, techs }) {
  return (
    <div className="tsc-category" style={{ "--cat-color": color }}>
      <div className="tsc-cat-header">
        <span className="tsc-cat-icon">{icon}</span>
        <span className="tsc-cat-name">{category}</span>
        <span className="tsc-cat-count">{techs.length} tools</span>
      </div>

      <div className="tsc-tech-list">
        {techs.map((tech, i) => (
          <TechRow
            key={tech.name}
            {...tech}
            color={color}
            rowIndex={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main Card ──────────────────────────────────────────── */
export default function TechStackCard() {
  const totalTechs = techStack.reduce((sum, cat) => sum + cat.techs.length, 0);

  return (
    <div className="tsc-page">
      <div className="tsc-card">

        {/* Header */}
        <div className="tsc-header">
          <div className="tsc-header-left">
            <span className="tsc-eyebrow">// portfolio</span>
            <h1 className="tsc-title">
              My <span>Tech Stack</span>
            </h1>
            <p className="tsc-subtitle">Tools I build with every day</p>
          </div>
          <div className="tsc-status">
            <span className="tsc-dot" />
            available for work
          </div>
        </div>

        {/* Category Grid */}
        <div className="tsc-grid">
          {techStack.map((cat) => (
            <CategoryBlock key={cat.category} {...cat} />
          ))}
        </div>

        {/* Footer */}
        <div className="tsc-footer">
          <span className="tsc-footer-text">// always learning · always building</span>
          <div className="tsc-total">
            <div className="tsc-total-pill">
              <strong>{totalTechs}</strong> technologies
            </div>
            <div className="tsc-total-pill">
              <strong>{techStack.length}</strong> domains
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}