import React from "react";
import "./cards.css";

const FutureProjectCard = () => {
  return (
    <div className="saas-card">
      <div className="saas-content">
        <div className="saas-text">
          <p className="label">The Inside Scoop</p>
          <h2>Currently building a SaaS Product</h2>
        </div>

        <div className="saas-image">
          <img src="/images/currentProject.webp" alt="Code Preview" />
        </div>
      </div>
    </div>
  );
};

export default FutureProjectCard;