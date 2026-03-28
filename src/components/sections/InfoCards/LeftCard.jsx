import React from "react";
import "./cards.css";

const LeftCard = () => {
  return (
    <div className="left-card">
      <img
        src="/laptop.png" // replace with your image
        alt="Laptop"
        className="laptop-img"
      />

      <div className="left-text">
        <h2>
          I prioritize client <br />
          collaboration, fostering <br />
          open communication
        </h2>
      </div>
    </div>
  );
};

export default LeftCard;