import React from "react";
import "./cards.css";

const BottomRightCard = () => {
  return (
    <div className="bottom-right-card">
      <p className="small-text">I constantly try to improve</p>

      <h2>My tech stack</h2>

      <div className="stack-grid">
        <div className="stack-item">ReactJS</div>
        <div className="stack-item">MongoDB</div>
        <div className="stack-item">Javascript</div>
        <div className="stack-item">Express</div>
      </div>
    </div>
  );
};

export default BottomRightCard;