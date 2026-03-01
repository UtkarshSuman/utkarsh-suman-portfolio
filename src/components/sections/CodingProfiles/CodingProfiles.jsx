import React from "react";
import "./CodingProfiles.css";

function CodingProfiles({ profiles = [], title = "Coding Profiles" }) {
  return (
    <section id="coding" className="coding">
      <h2 className="section-title">{title}</h2>

      <div className="profiles-grid">
        {profiles.map((profile, index) => (
          <div key={index} className="profile-card">
            
            {/* Top Image (NOT clickable) */}
            {profile.icon && (
              <img
                src={profile.icon}
                alt={profile.platform}
                className="profile-icon"
              />
            )}

            {/* Solved Questions Text */}
            <p className="solved-text">
              I have solved <span>{profile.solved}</span> questions
            </p>

            {/* Button */}
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-btn"
            >
              Open {profile.platform}
            </a>

          </div>
        ))}
      </div>
    </section>
  );
}

export default CodingProfiles;