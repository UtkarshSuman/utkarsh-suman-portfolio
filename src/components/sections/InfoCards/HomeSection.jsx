import React from "react";
import LeftCard from "./LeftCard";
import TopRightCard from "./TopRightCard";
import BottomRightCard from "./BottomRightCard";
import "./cards.css";

const HomeSection = () => {
  return (
    <div className="home-container">
      <LeftCard />
      <div className="right-section">
        <TopRightCard />
        <BottomRightCard />
      </div>
    </div>
  );
};

export default HomeSection;