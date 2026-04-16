import { useRef } from "react";
import "./ProjectCard.css";
import projects from "./projectdata.js";

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5H11M11 6.5L7.5 3M11 6.5L7.5 10"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
        0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
        -1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305
        3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38
        1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405
        1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176
        .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22
        0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12
        c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function ProjectCard({ project }) {
  const { title, description, image, popLabel, liveLink, githubLink, techStack } = project;
  const cardRef  = useRef(null);
  const glareRef = useRef(null);
  const visibleStack  = techStack.slice(0, 4);
  const overflowCount = techStack.length - 4;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
    const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);
    const rx = (-dy * 11).toFixed(2);
    const ry = ( dx * 11).toFixed(2);
    card.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
    card.style.boxShadow  = `${(-ry * 2.2)}px ${(rx * 2.2)}px 52px rgba(0,0,0,.75), 0 0 0 1px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,.04)`;
    if (glareRef.current) {
      const gx = (((dx + 1) / 2) * 100).toFixed(0);
      const gy = (((dy + 1) / 2) * 100).toFixed(0);
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.09) 0%, transparent 62%)`;
      glareRef.current.style.opacity = "1";
    }
    card.classList.add("tilted");
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
    card.style.boxShadow = "none";
    card.classList.remove("tilted");
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div className="pc-card-wrap" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <article className="pc-card" ref={cardRef}>
        <div className="pc-glare" ref={glareRef} />

        {/* Image — clip div keeps corners clean; outer wrap allows pop-out overflow */}
        <div className="pc-card__img-wrap">
          <div className="pc-card__img-clip">
            <img className="pc-card__img" src={image} alt={`${title} preview`} />
            <div className="pc-card__img-overlay" />
          </div>

          <div className="pc-badge" aria-label="Live project">
            <span className="pc-badge__dot" />
            <span className="pc-badge__label">Live</span>
          </div>

          {/* Pop-out text labels that fade in on hover */}
          <div className="pc-img-poptext">
            <span className="pc-img-poptext__label">{popLabel}</span>
            <span className="pc-img-poptext__arrow">↗ preview</span>
          </div>
        </div>

        {/* Body */}
        <div className="pc-card__body">
          <h3 className="pc-card__title">{title}</h3>
          <p className="pc-card__desc">{description}</p>
          <div className="pc-divider" />
          <div className="pc-card__footer">
            <div className="pc-stack" aria-label="Tech stack">
              {visibleStack.map((tech) => (
                <div key={tech.name} className="pc-stack__icon" data-name={tech.name}
                  role="img" aria-label={tech.name}>
                  <img src={tech.icon} alt={tech.name}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.textContent = tech.name.slice(0, 2).toUpperCase();
                      Object.assign(e.currentTarget.parentElement.style, {
                        fontSize: "8px", color: "#6b7280", fontFamily: "monospace",
                      });
                    }}
                  />
                </div>
              ))}
              {overflowCount > 0 && (
                <div className="pc-stack__overflow">+{overflowCount}</div>
              )}
            </div>

            <div className="pc-btn-row">
              <a href={githubLink} target="_blank" rel="noopener noreferrer"
                className="pc-link github" aria-label={`GitHub repo for ${title}`}>
                <GithubIcon />
              </a>
              <a href={liveLink} target="_blank" rel="noopener noreferrer"
                className="pc-link live" aria-label={`Visit ${title} live`}>
                Live Site&nbsp;<ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function ProjectCards() {
  return (
    <main id="projects" className="pc-page">
      <div className="pc-bg-dots" />
      <div className="pc-blob pc-blob-l" />
      <div className="pc-blob pc-blob-r" />
      <header className="pc-header">
        <p className="pc-header__eyebrow">// portfolio</p>
        <h2 className="pc-header__title">Things I've&nbsp;<span>built</span></h2>
        <p className="pc-header__sub">side projects · experiments · open source</p>
      </header>
      <div className="pc-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}