import React from "react";
import "./cards.css";

const CTAProjectCard = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText("your@email.com");
    alert("Email copied!");
  };

  return (
    <div className="cta-card">
      <h2>Do you want to start a project together?</h2>

      <button onClick={copyEmail} className="cta-btn">
        Copy my email address
      </button>
    </div>
  );
};

export default CTAProjectCard;
