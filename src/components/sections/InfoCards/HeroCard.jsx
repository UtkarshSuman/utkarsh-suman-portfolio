import React from "react";
import "./cards.css";

const HeroCard = () => {
  return (
    <div className="hero-card">
      <h1>
        Tech enthusiast with a <br />
        passion for development.
      </h1>

      <div className="mini-widget">
        <div className="dot"></div>
        <div className="line short"></div>
        <div className="line"></div>
        <div className="line small"></div>
      </div>
    </div>
  );
};

export default HeroCard;
