import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "LI" },
  { label: "Twitter", href: "https://twitter.com", icon: "TW" },
];

const INPUT_FIELDS = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Vishwas Prajapati",
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "vishwas@example.com",
  },
  {
    id: "subject",
    label: "Subject",
    type: "text",
    placeholder: "Project Collaboration",
  },
];

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const AUTO_REPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTO_REPLY_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -300, y: -300 });

  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      setCursorPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    const targets = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const e = {};

    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Invalid email address.";
    }
    if (!formData.subject.trim()) e.subject = "Subject is required.";
    if (!formData.message.trim()) e.message = "Message is required.";
    else if (formData.message.trim().length < 20) {
      e.message = "Message must be at least 20 characters.";
    }

    return e;
  };

  const handleChange = ({ target: { id, value } }) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      // Send email to me
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      // Send auto-reply to user
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        AUTO_REPLY_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const charCount = formData.message.length;

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div
        ref={cursorRef}
        className="cursor-glow"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      <div className="contact-noise" aria-hidden="true" />
      <div className="contact-orb contact-orb-1" aria-hidden="true" />
      <div className="contact-orb contact-orb-2" aria-hidden="true" />

      <div className="grid-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="grid-line" />
        ))}
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <p className="eyebrow reveal">Get in touch</p>

          <h2 className="contact-heading reveal">
            Let's build
            <br />
            <span className="heading-accent">something great</span>
            <span className="heading-dot">.</span>
          </h2>

          <p className="contact-subtext reveal">
            Whether it's a freelance project, a full-time role, or just a chat
            about design and code, I'm all ears.
          </p>

          <div className="contact-details reveal">
            <a className="detail-link" href="mailto:utkarshsuman7@gmail.com">
              <span className="detail-icon">✉</span>
              <span>utkarshsuman7@gmail.com</span>
            </a>

            <a className="detail-link" href="tel:+919145872301">
              <span className="detail-icon">✆</span>
              <span>+91 914-587-2301</span>
            </a>

            <div className="detail-link">
              <span className="detail-icon">⌖</span>
              <span>Ghaziabad, Delhi-NCR</span>
            </div>
          </div>

          <div className="social-row reveal">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                className="social-chip"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
              >
                <span className="chip-icon">{icon}</span>
                <span className="chip-label">{label}</span>
              </a>
            ))}
          </div>

          <div className="mono-bg" aria-hidden="true">
            UTKARSH
          </div>
        </div>

        <div className="contact-form-wrap reveal">
          <div className="form-card">
            {status === "success" ? (
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Message sent!</h3>
                <p>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button className="btn-reset" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit} autoComplete="off">
                <div className="form-grid">
                  {INPUT_FIELDS.map(({ id, label, type, placeholder }) => (
                    <div
                      key={id}
                      className={`field-group ${focused === id ? "is-focused" : ""} ${errors[id] ? "has-error" : ""} ${id === "subject" ? "field-full" : ""}`}
                    >
                      <label htmlFor={id}>{label}</label>

                      <div className="input-wrap">
                        <input
                          id={id}
                          type={type}
                          value={formData[id]}
                          placeholder={placeholder}
                          onChange={handleChange}
                          onFocus={() => setFocused(id)}
                          onBlur={() => setFocused(null)}
                          aria-invalid={!!errors[id]}
                          aria-describedby={
                            errors[id] ? `${id}-err` : undefined
                          }
                        />
                        <span className="input-border" />
                      </div>

                      {errors[id] && (
                        <p
                          id={`${id}-err`}
                          className="field-error"
                          role="alert"
                        >
                          {errors[id]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div
                    className={`field-group field-full ${focused === "message" ? "is-focused" : ""} ${errors.message ? "has-error" : ""}`}
                  >
                    <label htmlFor="message">
                      Message
                      <span
                        className={`char-count ${charCount >= 500 ? "char-limit" : ""}`}
                      >
                        {charCount}/500
                      </span>
                    </label>

                    <div className="input-wrap">
                      <textarea
                        id="message"
                        rows={5}
                        maxLength={500}
                        value={formData.message}
                        placeholder="Tell me about your project, timeline, and anything else that's relevant..."
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        aria-invalid={!!errors.message}
                        aria-describedby={
                          errors.message ? "message-err" : undefined
                        }
                      />
                      <span className="input-border" />
                    </div>

                    {errors.message && (
                      <p id="message-err" className="field-error" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <p className="global-error" role="alert">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}

                <button
                  type="submit"
                  className={`submit-btn ${status === "sending" ? "is-sending" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
