import React from "react";
import "./Experience.css";
import { experiences } from "../../../data/portfolioData";

function Experience() {
  return (
    <section id="experience" className="experience">
      <h2 className="section-title">Work Experience</h2>

      {experiences.map((exp, index) => (
        <div key={index} className="exp-card">
          <h3>{exp.title}</h3>
          <p>{exp.company}</p>
          <p>{exp.period}</p>
        </div>
      ))}
    </section>
  );
}

export default Experience;
