import "./ProjectCard.css";
import projects from "./projectdata.js";
import Githubbutton from "../../ui/Githubbutton.jsx";
 
// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6.5H11M11 6.5L7.5 3M11 6.5L7.5 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
 
// ── Single project card ───────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const { title, description, image, liveLink, techStack } = project;
  const visibleStack = techStack.slice(0, 4);
  const overflowCount = techStack.length - 4;
 
  return (
    <article className="pc-card">
      {/* Image */}
      <div className="pc-card__img-wrap">
        <img className="pc-card__img" src={image} alt={`${title} preview`} />
        <div className="pc-card__img-overlay" />
 
        {/* Live badge */}
        <div className="pc-badge" aria-label="Live project">
          <span className="pc-badge__dot" />
          <span className="pc-badge__label">Live</span>
        </div>
      </div>
 
      {/* Body */}
      <div className="pc-card__body">
        <h3 className="pc-card__title">{title}</h3>
        <p className="pc-card__desc">{description}</p>
 
        <div className="pc-divider" />
 
        {/* Footer */}
        <div className="pc-card__footer">
          {/* Tech stack */}
          <div className="pc-stack" aria-label="Tech stack">
            {visibleStack.map((tech) => (
              <div
                key={tech.name}
                className="pc-stack__icon"
                data-name={tech.name}
                role="img"
                aria-label={tech.name}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  onError={(e) => {
                    // Fallback: show initials if icon fails to load
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.textContent = tech.name
                      .slice(0, 2)
                      .toUpperCase();
                    e.currentTarget.parentElement.style.fontSize = "9px";
                    e.currentTarget.parentElement.style.color = "#6b7280";
                    e.currentTarget.parentElement.style.fontFamily =
                      "var(--font-mono)";
                  }}
                />
              </div>
            ))}
 
            {overflowCount > 0 && (
              <div className="pc-stack__overflow" aria-label={`${overflowCount} more`}>
                +{overflowCount}
              </div>
            )}
          </div>
 
          {/* Live link */}
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-link"
            aria-label={`Visit ${title} live site`}
          >
            Check Live Site&nbsp;
            <ArrowRight />
          </a>
        </div>
      </div>
    </article>
  );
}
 
// ── Page / grid wrapper ───────────────────────────────────────────────────────
export default function ProjectCards() {
  return (
    <main id="projects" className="pc-page">
      
      {/* Section header */}
      <header className="pc-header">
        <p className="pc-header__eyebrow">// portfolio</p>
        <h2 className="pc-header__title">
          Things I've&nbsp;<span>built</span>
        </h2>
        <p className="pc-header__sub">
          side projects · experiments · open source
        </p>
      </header>
 
      {/* Cards */}
      <div className="pc-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <Githubbutton/>
    </main>
  );
}
 