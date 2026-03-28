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


// import React from "react";

// const ContactButton = () => {

//   const handleClick = () => {
//     const email = "your-email@gmail.com";
//     const subject = "Regarding Collaboration";
//     const body = "Hi Utkarsh,\n\nI would like to connect with you.";

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

//     window.open(gmailUrl, "_blank");
//   };

//   return (
//     <button 
//       onClick={handleClick}
//       style={{
//         padding: "10px 20px",
//         backgroundColor: "#ea4335",
//         color: "white",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer"
//       }}
//     >
//       Contact Me
//     </button>
//   );
// };

// export default ContactButton;