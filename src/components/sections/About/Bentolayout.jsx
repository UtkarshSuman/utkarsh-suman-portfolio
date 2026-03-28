import React from "react";
import AboutMe from "./AboutMe";
import TechStack from "./TechStack";
import TimeZone from "./TimeZone";
import LaunchCTA from "./LaunchCTA";
import "./BentoLayout.css";

export default function BentoLayout() {
  return (
    <div className="bento-grid">
      {/* Full-width on all screens */}
      <div className="bento-cell bento-about">
        <AboutMe />
      </div>

      {/* Side by side on desktop */}
      <div className="bento-cell bento-tech">
        <TechStack />
      </div>

      <div className="bento-cell bento-tz">
        <TimeZone />
      </div>

      {/* Full-width on all screens */}
      <div className="bento-cell bento-cta">
        <LaunchCTA />
      </div>
    </div>
  );
}