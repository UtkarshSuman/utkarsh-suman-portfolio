import { useState, useEffect } from "react";

const texts = [
  "Open Source Contributor",
  "Full-Stack Developer",
  "Problem Solver",
  "Backend Development",
  "Always Building",
  "Web Development",
];

export default function RotatingBadge({ items = texts, interval = 2200 }) {
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState("active");

  useEffect(() => {
    const timer = setInterval(() => {
      setState("exit");

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        setState("active");
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval]);

  return (
    <div style={styles.pill}>
      <span style={styles.dot} />

      <span
        key={current}
        style={{
          ...styles.text,
          ...(state === "active" ? styles.enter : styles.exitAnim),
        }}
      >
        {items[current]}
      </span>
    </div>
  );
}

const styles = {
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "var(--badge-bg)",
    border: "1px solid var(--badge-border)",
    borderRadius: "100px",
    padding: "10px 22px",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    minWidth: "240px",
    justifyContent: "center",
    width: "50px",
    boxShadow: "var(--badge-shadow)",
    transition:
      "background .3s ease, border-color .3s ease, color .3s ease, box-shadow .3s ease",
  },

  dot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "var(--badge-dot)",
    flexShrink: 0,
    boxShadow: "0 0 8px var(--badge-dot-shadow)",
  },

  text: {
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "var(--badge-text)",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    transition: "opacity .35s ease, transform .35s ease, color .3s ease",
  },

  enter: {
    opacity: 1,
    transform: "translateY(0px)",
  },

  exitAnim: {
    opacity: 0,
    transform: "translateY(-10px)",
  },
};