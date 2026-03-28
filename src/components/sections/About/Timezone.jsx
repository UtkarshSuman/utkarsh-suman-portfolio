import React, { useState, useEffect, useRef } from "react";
import "./TimeZone.css";

export default function TimeZone() {
  const [time, setTime] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // UTC-5
      const utcOffset = now.getTime() + now.getTimezoneOffset() * 60000;
      const local = new Date(utcOffset - 5 * 3600000);
      setTime(
        local.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) cardRef.current?.classList.add("visible");
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tz-section" ref={cardRef}>
      <div className="tz-card">
        {/* Animated orbit rings */}
        <div className="tz-rings" aria-hidden="true">
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <div className="ring ring-3" />
        </div>

        {/* Content */}
        <div className="tz-content">
          <div className="tz-offset">UTC -5</div>
          <div className="tz-badge">ALWAYS ONLINE</div>
          <div className="tz-live-time">{time}</div>
          <h3 className="tz-title">Global Connectivity</h3>
          <p className="tz-desc">
            Flexible scheduling for partners across any planetary sector.
          </p>
        </div>
      </div>
    </section>
  );
}