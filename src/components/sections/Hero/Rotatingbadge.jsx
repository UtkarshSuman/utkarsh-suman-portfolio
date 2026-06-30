import { useState, useEffect } from "react";

const texts = [
  "Open Source Contributor",
  "Full-Stack Developer",
  "Problem Solver",
  "Always Building",
];

export default function RotatingBadge({ items = texts, interval = 2200 }) {
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState("active");
  const [darkMode, setDarkMode] = useState(
    document.documentElement.getAttribute("data-theme") === "dark"
  );

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(
        document.documentElement.getAttribute("data-theme") === "dark"
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
    <div
      style={{
        ...styles.pill,
        background: darkMode
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.88)",
        border: darkMode
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(15,23,42,0.08)",
        boxShadow: darkMode
          ? "none"
          : "0 8px 24px rgba(15,23,42,0.08)",
      }}
    >
      <span style={styles.dot} />

      <span
        key={current}
        style={{
          ...styles.text,
          color: darkMode ? "rgba(255,255,255,.75)" : "#334155",
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
    borderRadius: "100px",
    padding: "10px 22px",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    minWidth: "240px",
    justifyContent: "center",
    width: "50px",
    transition: "all 0.3s ease",
  },

  dot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
    boxShadow: "0 0 8px rgba(34,197,94,0.8)",
  },

  text: {
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    transition: "opacity 0.35s ease, transform 0.35s ease, color 0.3s ease",
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