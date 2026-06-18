import React from "react";
import { profile,socialLinks,footerColumns,copyrightText } from "../../../data/portfoliodata";
import "./Footer.css";

const iconMap = {
  github: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.6 1.7 5.5 2 5.5 2a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.1 8.4c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M12 17v-4.5a2.5 2.5 0 0 1 5 0V17M12 17v-7" strokeLinecap="round" />
    </svg>
  ),
  leetcode: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M13.5 4 7 10.5a2 2 0 0 0 0 3l4.5 4.5M9 13h8M16 17l-1.5 1.5a3 3 0 0 1-4.2 0L9 17"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M4 4l16 16M20 4 4 20M4 4h5l11 16h-5L4 4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  medium: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="6.5" cy="12" r="3.5" />
      <ellipse cx="15" cy="12" rx="2" ry="3.5" />
      <ellipse cx="20" cy="12" rx="1" ry="3.5" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function SocialIcon({ icon, url, label }) {
  return (
    <a
      href={url}
      className="footer-social-icon"
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {iconMap[icon] ?? null}
    </a>
  );
}

function FooterColumn({ title, links }) {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="footer-column">
      <h3 className="footer-column-title">{title}</h3>

      <ul className="footer-column-list">
        {links.map((link) => (
          <li key={link.label}>
            {link.target ? (
              <button
                type="button"
                className="footer-link footer-link-button"
                onClick={() => scrollToSection(link.target)}
              >
                {link.label}
              </button>
            ) : (
              <a
                href={link.url}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-header">
              <span className="footer-avatar">{profile.initials}</span>
              <span className="footer-name">{profile.name}</span>
            </div>
            <p className="footer-bio">{profile.bio}</p>
            <div className="footer-social-row">
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">{copyrightText}</p>
      </div>
    </footer>
  );
}