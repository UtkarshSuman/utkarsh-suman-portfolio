import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import { ArrowRight, Mail } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);
  const wrapRef  = useRef(null);
  const tracking = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img  = imageRef.current;
    if (!wrap || !img) return;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      const rotX  = -dy * 14;
      const rotY  =  dx * 14;
      const rotZ  =  dx * dy * 3;
      const scaleV = 1 + Math.abs(dx * dy) * 0.04;

      img.style.transform = `
        perspective(900px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        rotateZ(${rotZ}deg)
        scale3d(${scaleV},${scaleV},${scaleV})
      `;
    };

    const onEnter = () => {
      img.classList.add("is-tracking");
      tracking.current = true;
    };

    const onLeave = () => {
      img.classList.remove("is-tracking");
      tracking.current = false;
      img.style.transform = "";
    };

    wrap.addEventListener("mousemove",  onMove);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    return () => {
      wrap.removeEventListener("mousemove",  onMove);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,220 C360,280 1080,160 1440,220 L1440,320 L0,320 Z" />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,240 C400,300 1040,180 1440,240 L1440,320 L0,320 Z" />
        </svg>
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,260 C440,310 1000,200 1440,260 L1440,320 L0,320 Z" />
        </svg>
      </div>

      <div className="hero-content">
        {/* ── Text ── */}
        <div className="hero-text">
          <p className="hero-eyebrow">Get every single solution.</p>
          <h1 className="hero-heading">
            I'm Developer<br />
            <span>Utkarsh</span>
          </h1>
          <p className="hero-bio">
            Full-stack developer passionate about building scalable web
            applications and memorable digital experiences — from pixel-perfect
            frontends to robust backend systems.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary">
              Learn More <ArrowRight size={16} />
            </a>
            <a href="mailto:hi@utkarsh.dev" className="btn btn-ghost">
              Hire Me
            </a>
          </div>
        </div>

        {/* ── 4D Image ── */}
        <div className="hero-image-wrap" ref={wrapRef}>
          <div className="hero-glow"     aria-hidden="true" />
          <div className="hero-ring hero-ring--1" aria-hidden="true" />
          <div className="hero-ring hero-ring--2" aria-hidden="true" />

          <div className="hero-image-3d" ref={imageRef}>
            <img
              src="/images/me.jpeg"
              alt="Utkarsh — Full Stack Developer"
              className="hero-photo"
              draggable="false"
            />
            <div className="hero-gloss"     aria-hidden="true" />
            <div className="hero-scanlines" aria-hidden="true" />
            <div className="hero-rimlight"  aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;