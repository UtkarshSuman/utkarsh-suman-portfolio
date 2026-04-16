import React from "react";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>© {year} Utkarsh Suman.  `Let's get it done`</p>
    </footer>
  );
}

export default Footer;
