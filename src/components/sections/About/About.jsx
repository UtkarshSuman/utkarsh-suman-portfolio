import React from "react";
import "./About.css";
import { skills } from "../../../data/portfolioData";

function About() {
  return (
    <section id="about" className="about">
      <h2 className="section-title">About Me</h2>

      {skills.map((group, index) => (
        <div key={index}>
          <h3>{group.category}</h3>
          <div className="skills">
            {group.items.map((item, idx) => (
              <span key={idx}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default About;
