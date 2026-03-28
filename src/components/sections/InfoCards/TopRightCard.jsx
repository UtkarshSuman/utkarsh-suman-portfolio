import React from "react";
import Galaxy from "./Galaxy";
import "./cards.css";

const TopRightCard = () => {
  return (
    <div className="top-right-card">
      <div className="galaxy-wrapper">
        <Galaxy
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>

      <div className="top-right-content">
        <h2>I'm very flexible with time zone communications</h2>
      </div>
    </div>
  );
};

export default TopRightCard;