import React from "react";
import AboutMe from "./Aboutme";
<<<<<<< HEAD
import TechStack from "./TechStack";
import TimeZone from "./TimeZone";
import LaunchCTA from "./LaunchCTA";
=======
import TechStack from "./Techstack";
import TimeZone from "./Timezone";
import LaunchCTA from "./Launchcta";
>>>>>>> 371d910068f5c41a6d78df2ca72820a2f2d0aa09
import "./Bentolayout.css";

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
