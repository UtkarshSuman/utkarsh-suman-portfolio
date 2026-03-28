import { useRef } from "react";
import "./Projects.css";
import { projects2 } from "../../../data/portfolioData";

/* ── Single Card ─────────────────────────────────────────── */
function ProjectCard({
  title,
  tagline,
  previewImage,
  liveUrl,
  tags,
  accentColor,
}) {
  const cardRef = useRef(null);

  /* spotlight effect – track mouse position inside card */
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <article
      className="project-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ "--accent": accentColor }}
    >
      {/* Header */}
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="card-tagline">{tagline}</p>
      </div>

      {/* Browser-style preview */}
      <div className="card-preview">
        <img src={previewImage} alt={`${title} preview`} loading="lazy" />
      </div>

      {/* Footer */}
      <footer className="card-footer">
        <a
          href={liveUrl}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Live Site
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        <div className="card-tags">
          <div className="accent-dot" />
          {tags.map((Icon, index) => (
            <span key={index} className="tech-icon" title={Icon.name}>
              <Icon />
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}

/* ── Grid ────────────────────────────────────────────────── */
export default function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects2.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
